<template>
  <v-container class="my-5">
    AAA
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      description: '',
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.uploadForm.validate()) {
        // Handle file submission
        console.log('File:', this.file);
        console.log('Description:', this.description);
      }
    },
    cancel() {
      // Reset form
      this.file = null;
      this.description = '';
    },
  },
};
</script>

<style scoped>
.my-5 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
