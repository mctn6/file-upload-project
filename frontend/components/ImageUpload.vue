<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>Upload Image {{ $config.hello }}</v-card-title>
    <v-card-text>
      <v-file-input
        v-model="file"
        accept="image/*"
        label="Select an image"
        prepend-icon="mdi-camera"
        @change="previewImage"
      ></v-file-input>
      <v-img
        v-if="imageUrl"
        :src="imageUrl"
        max-height="200"
        contain
      ></v-img>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="uploadImage" :disabled="!file" :loading="loading">
        Upload
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top>
      {{ snackbarText }}
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      file: null,
      imageUrl: null,
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success',
    }
  },
  methods: {
    previewImage() {
      if (this.file) {
        this.imageUrl = URL.createObjectURL(this.file)
      }
    },
    resetForm(){
      this.file = null;
      this.imageUrl = null;
    },
    async uploadImage() {
      if (!this.file) return

      this.loading = true
      const formData = new FormData()
      formData.append('image', this.file)

      try {
        const response = await axios.post(`${this.$config.public.baseAPI}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        console.log('Upload successful:', response.data)
        this.snackbarText = 'Image uploaded successfully!'
        this.snackbarColor = 'success'
        this.snackbar = true
     
      } catch (error) {
        console.error('Upload failed:', error)
        this.snackbarText = 'Failed to upload image. Please try again.'
        this.snackbarColor = 'error'
        this.snackbar = true
      } finally {
        this.loading = false
        this.resetForm()
      }
    },
  },
}
</script>