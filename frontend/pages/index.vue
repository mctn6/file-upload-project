<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <h1 className="text-center pb-2">Image Upload Demo</h1>
        <image-upload />
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