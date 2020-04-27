<template>
  <v-app>
    <c-navbar class="pb-4"></c-navbar>

    <v-content class="mx-4 pb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';

export default Vue.extend({
  name: 'App',

  components: {
    'c-navbar': Navbar
  },

  data: () => ({
    //
  }),
});
</script>
