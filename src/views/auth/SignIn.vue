<template>
  <v-card width="400px" class="mx-auto">
    <v-card-title>Sign in</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          outlined
          placeholder="email"
          prepend-icon="mdi-account-circle"
        ></v-text-field>

        <v-text-field
          :type="showPassword ? 'text': 'password'"
          @click:append="showPassword = !showPassword"
          label="Password"
          outlined
          placeholder="password"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn width="100%" color="primary" class="mb-3 mr-2">Sign in</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  data: () => ({
    showPassword: false
  })
}
</script>
