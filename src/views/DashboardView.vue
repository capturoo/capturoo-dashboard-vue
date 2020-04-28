<template>
  <v-container fluid>
    <v-content class="mx-4 pb-4">
      <c-navbar class="pb-4"></c-navbar>

      <router-view name="dashboard"></router-view>
    </v-content>
  </v-container>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    'c-navbar': Navbar
  }
}
</script>
