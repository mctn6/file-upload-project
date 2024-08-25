<template>
    <v-footer
      color="primary"
      dark
    >
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            class="text-center"
          >
            <p class="white--text mb-0">
              © {{ new Date().getFullYear() }} Image Upload App. All rights reserved.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
</template>

<script>

</script>

<style scoped>
.v-footer {
  background-color: #2a2a2a;
}

.v-list-item-title {
  font-weight: 500;
}
</style>
