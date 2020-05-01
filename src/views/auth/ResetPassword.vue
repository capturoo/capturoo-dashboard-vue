<template>
  <v-card width="400px" class="mx-auto pb-4">
    <v-card-title>Send password reset</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          type="email"
          label="Email"
          outlined
          placeholder="email"
          prepend-icon="mdi-account-circle"
          required
          :error-messages="errorEmail"
          :rules="emailRules"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        @click="sendPasswordResetEmail"
        :loading="loading"
        :disabled="loading"
        width="100%"
        color="primary"
        class="mb-3 mr-2"
      >Send password reset</v-btn>
    </v-card-actions>

    <router-link
      :to="{ name: 'signin' }"
      class="pl-2 pb-12"
    >
      Sign In
    </router-link>
  </v-card>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loading: false,
      email: '',
      errorMessageEmail: '',
      emailRules: [
        (v: string) => !!v || 'Email is required'
      ],
    }
  },
  computed: {
    errorEmail() {
      if (this.errorMessageEmail) {
        return this.errorMessageEmail
      }
      return ''
    }
  },
  methods: {
    async sendPasswordResetEmail() {
      try {
        this.loading = true
        await this.$store.dispatch('sendPasswordResetEmail', { email: this.email })
        this.$router.replace({ name: 'password-reset-sent' })
      } catch (err) {
        this.loading = false
        console.error(err)
        if (err.code === 'auth/invalid-email') {
          this.errorMessageEmail = err.message
        } else if (err.code === 'auth/user-not-found') {
          this.$router.replace({ name: 'password-reset-sent' })
        }
      }
    }
  }
}
</script>
