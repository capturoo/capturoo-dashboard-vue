<template>
  <div>
    <div class="mb-3">
      <router-link :to="{ name: 'leads-overview' }">
        <v-btn
          :disabled="disabled"
          text
          class="primary--text float-left pl-0 ml-0">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <span class="pb-4 ml-4 title font-weight-light">Create a lead</span>
    </div>

    <v-divider></v-divider>

    <v-container fluid>
      <p class="text--secondary">Leads are not creating directly from the dashboard, but instead via your capture page.</p>
    </v-container>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    disabled: false
  })
}
</script>
