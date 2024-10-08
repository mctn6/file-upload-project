<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <h1 className="text-center pb-2">Image Upload App</h1>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-card>
              <v-card-title>Upload Image</v-card-title>
              <v-card-text>
                <v-file-input
                  v-model="file"
                  accept="image/*"
                  label="Select an image"
                  prepend-icon="mdi-camera"
                  @change="previewImage"
                >
                  <template v-slot:selection="{ fileNames }">
                    <template v-for="fileName in fileNames" :key="fileName">
                      <v-chip class="me-2" color="primary" size="small" label>
                        {{ fileName }}
                      </v-chip>
                    </template>
                  </template></v-file-input
                >
                <v-img
                  v-if="imageUrl"
                  :src="imageUrl"
                  max-height="200"
                  contain
                ></v-img>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  @click="uploadImage"
                  :disabled="!file"
                  :loading="loading"
                  variant="outlined"
                >
                  Upload
                </v-btn>
                <v-btn
                  color="error"
                  @click="resetForm"
                  :disabled="!file"
                  :loading="loading"
                   variant="outlined"
                >
                  Remove
                </v-btn>
              </v-card-actions>
              <v-snackbar v-model="snackbar" :color="snackbarColor" top>
                {{ snackbarText }}
              </v-snackbar>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card>
              <v-card-title>Your Uploads</v-card-title>
              <v-list v-if="userUploads.length > 0">
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
                      :loading="loading"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-title class="d-flex align-center justify-center">
                    <span class="text-grey">No uploads available</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  layout: "default",
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
      formData.append("file", this.file);
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
        this.fetchUserUploads();
      }
    },
    async fetchUserUploads() {
      try {
        const response = await axios.get(
          `${this.$config.public.baseAPI}/list`
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
      const imagePath = image.id;

      try {
        const response = await axios.get(
          `${this.$config.public.baseAPI}/download/${imagePath}`,
          {
            responseType: "blob",
          }
        );

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
