<template>
<v-card width="400px" class="mx-auto pb-4">
    <v-card-title>Sign up for Capturoo</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="firstname"
          type="text"
          label="Firstname"
          outlined
          placeholder="Firstname"
          prepend-icon="mdi-account-details"
          required
          :error-messages="errorFirstname"
          :rules="firstnameRules"
        ></v-text-field>

        <v-text-field
          v-model="lastname"
          type="text"
          label="Lastname"
          outlined
          placeholder="Lastname"
          prepend-icon="mdi-account-details"
          required
          :error-messages="errorLastname"
          :rules="lastnameRules"
        ></v-text-field>

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
        @click="createAccountAndSignIn"
        :loading="loading"
        :disabled="loading"
        width="100%"
        color="primary"
        class="mb-3 mr-2"
      >Create Account</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import firebase from 'firebase/app'

export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      email: '',
      errorMessageEmail: '',
      emailRules: [
        (v: string) => !!v || 'Email is required'
      ],
      password: '',
      errorMessagePassword: '',
      passwordRules: [
        (v: string) => !!v || 'Password is required'
      ],
      firstname: '',
      errorMessageFirstname: '',
      firstnameRules: [
        (v: string) => !!v || 'Firstname is required'
      ],
      lastname: '',
      errorMessageLastname: '',
      lastnameRules: [
        (v: string) => !!v || 'Lastname is required'
      ]
    }
  },
  computed: {
    errorFirstname() {
      if (this.errorMessageFirstname) {
        return this.errorMessageFirstname
      }
      return ''
    },
    errorLastname() {
      if (this.errorMessageLastname) {
        return this.errorMessageLastname
      }
      return ''
    },
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
    async createAccountAndSignIn() {
      try {
        this.loading = true
        await this.$store.dispatch('createAccount', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        })
        await this.$store.dispatch('signInWithEmailAndPassword', {
          email: this.email,
          password: this.password
        })
        await this.$router.replace({ name: 'home' })
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
