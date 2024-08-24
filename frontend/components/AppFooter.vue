<template>
    <v-footer app color="primary" dark padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="primary py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Image Upload App</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter',
    data: () => ({
      links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
    }),
  }
  </script>