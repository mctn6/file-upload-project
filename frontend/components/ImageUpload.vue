<template>
  <v-card class="mx-auto">
    <v-card-title>Upload Image</v-card-title>
    <v-card-text>
      <v-file-input
        v-model="file"
        accept="image/*"
        label="Select an image"
        prepend-icon="mdi-camera"
        @change="previewImage"
      ></v-file-input>
      <v-img v-if="imageUrl" :src="imageUrl" max-height="200" contain></v-img>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        @click="uploadImage"
        :disabled="!file"
        :loading="loading"
      >
        Upload
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top>
      {{ snackbarText }}
    </v-snackbar>

    <!-- User Uploads List -->
    <v-card-title v-if="userUploads.length > 0">Your Uploads</v-card-title>
    <v-list>
      <v-list-item
        v-for="upload in userUploads"
        :key="upload.id"
        :title="upload.name"
        :subtitle="upload.uploadDate"
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-download"
            variant="text"
            @click="downloadImage(upload)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      imageUrl: null,
      loading: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success",
      userUploads: [],
    };
  },
  mounted() {
    this.fetchUserUploads();
  },
  methods: {
    previewImage() {
      if (this.file) {
        this.imageUrl = URL.createObjectURL(this.file);
      }
    },
    resetForm() {
      this.file = null;
      this.imageUrl = null;
    },
    async uploadImage() {
      if (!this.file) return;
      this.loading = true;
      const formData = new FormData();
      formData.append("image", this.file);
      try {
        const response = await axios.post(
          `${this.$config.public.baseAPI}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload successful:", response.data);
        this.snackbarText = "Image uploaded successfully!";
        this.snackbarColor = "success";
        this.snackbar = true;

        // Fetch updated list of uploads
        await this.fetchUserUploads();
      } catch (error) {
        console.error("Upload failed:", error);
        this.snackbarText = "Failed to upload image. Please try again.";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loading = false;
        this.resetForm();
      }
    },
    async fetchUserUploads() {
      try {
        const response = await axios.get(
          `${this.$config.public.baseAPI}/files`
        );
        this.userUploads = response.data;
      } catch (error) {
        console.error("Failed to fetch user uploads:", error);
        this.snackbarText = "Failed to fetch user uploads. Please try again.";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
    async downloadImage(image) {
      const imagePath = image.path?.split("\\").pop();
    
      try {
        const response = await axios.get(`${this.$config.public.baseAPI}/download/${imagePath}`, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
       
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = image.name;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error("Download failed:", error);
        this.snackbarText = "Failed to download image. Please try again.";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
  },
};
</script>
