<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center mb-4">Image Upload Demo</h1>
        <image-upload></image-upload>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageUpload from '@/components/ImageUpload.vue'

export default {
  layout: 'default',
  components: {
    ImageUpload,
  },
}
</script>