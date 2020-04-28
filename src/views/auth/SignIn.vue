<template>
  <v-card width="400px" class="mx-auto">
    <v-card-title>Sign in</v-card-title>
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

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text': 'password'"
          @click:append="showPassword = !showPassword"
          label="Password"
          outlined
          placeholder="password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          required
          :error-messages="errorPassword"
          :rules="passwordRules"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="signIn"
        :loading="loading"
        :disabled="loading"
        width="100%"
        color="primary"
        class="mb-3 mr-2"
      >Sign in</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      email: '',
      password: '',
      errorMessageEmail: '',
      errorMessagePassword: '',
      emailRules: [
        (v: string) => !!v || 'Email is required'
      ],
      passwordRules: [
        (v: string) => !!v || 'Password is required'
      ]
    }
  },
  computed: {
    errorEmail() {
      if (this.errorMessageEmail) {
        return this.errorMessageEmail
      }
      return ''
    },
    errorPassword() {
      if (this.errorMessagePassword) {
        return this.errorMessagePassword
      }
      return ''
    }
  },
  methods: {
    async signIn() {
      try {
        this.loading = true
        await this.$store.dispatch('signInWithEmailAndPassword', {
          email: this.email,
          password: this.password
        })
        await this.$router.replace({ name: 'home' })
      } catch (err) {
        this.loading = false
        console.dir(err)
        if (err.code === 'auth/invalid-email') {
          this.errorMessageEmail = 'Please sign in with valid email address.';
        } if (err.code === 'auth/wrong-password') {
          this.errorMessagePassword = 'Password is incorrect';
        } else if (err.code === 'auth/user-not-found') {
          this.errorMessagePassword = 'Your email and password combination is incorrect.';
        } else if (err.message === 'auth/account-not-found') {
          this.errorMessageEmail = 'Please register again with email and password.';
        } else {
          console.error(err);
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
