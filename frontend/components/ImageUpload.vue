<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>Upload Image</v-card-title>
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
      <v-btn color="primary" @click="uploadImage" :disabled="!file">
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      imageUrl: null,
    }
  },
  methods: {
    previewImage() {
      if (this.file) {
        this.imageUrl = URL.createObjectURL(this.file)
      }
    },
    uploadImage() {
      // Implement your image upload logic here
      console.log('Uploading image:', this.file)
      // You would typically send this file to your server or a third-party service
    },
  },
}
</script>