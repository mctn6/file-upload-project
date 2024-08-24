<template>
    <v-app>
      <app-header @toggle-drawer="drawer = !drawer"></app-header>
  
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
          <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
  
      <app-footer></app-footer>
    </v-app>
  </template>
  
  <script>
  import AppHeader from '@/components/AppHeader.vue'
  import AppFooter from '@/components/AppFooter.vue'
  
  export default {
    name: 'DefaultLayout',
    components: {
      AppHeader,
      AppFooter
    },
    data() {
      return {
        drawer: false,
        menuItems: [
          { title: 'Home', icon: 'mdi-home', to: '/' },
          { title: 'Upload', icon: 'mdi-cloud-upload', to: '/upload' },
          { title: 'Gallery', icon: 'mdi-image', to: '/gallery' },
        ],
      }
    },
  }
  </script>