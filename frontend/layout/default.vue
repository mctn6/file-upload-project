<template>
    <v-app>
      <Header/>
      <main>
        <v-content>
          <v-container fluid>
            <nuxt/>
          </v-container>
        </v-content>
      </main>
      <Footer/>
    </v-app>
  </template>
  
  <script>
  import Header from '/components/Header.vue'
  import Footer from '/components/Footer.vue'
  
  export default {
    components: {
        Header,
        Footer
    }
  }
  </script>
  
  <style scoped>
  
  </style>