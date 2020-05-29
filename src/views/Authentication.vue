<template>
  <v-app id="login">
    <!-- Loading Overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- Message Snackbar -->
    <v-snackbar :timeout="3000" v-model="snackbar">{{ text }}</v-snackbar>

    <!-- Content -->
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col md="10" sm="12" lg="6">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Veuillez vous connecter</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Identifiant"
                  name="login"
                  prepend-icon="mdi-account"
                  v-model="username"
                  type="text"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Mot de passe"
                  name="password"
                  prepend-icon="mdi-lock"
                  v-model="password"
                  type="password"
                  @keyup.enter="login"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">Se connecter</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
//import axios from "axios";
import { mapActions } from "vuex";

export default {
  data: () => {
    return {
      overlay: false,
      snackbar: false,
      text: "",
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["auth"]),

    /**
     * Login method
     */
    async login() {
      // Initializing
      console.log(`[Login] Testing connection with username: ${this.username}`);

      // Checking before testing
      if (!this.username || !this.password) {
        console.log("[Login] Aborting, username/password are not filled.");

        // Push to snackbar
        this.snackbar = true;
        this.text = "Les champs ne sont pas remplis.";
        return;
      }

      // Enabling overlay
      this.overlay = true;

      // Authenticate
      const response = await this.auth([this.username, this.password]);

      // Disable overlay
      this.overlay = false;

      // Checking response
      if (!response.status) {
        // Push to snackbar
        this.snackbar = true;
        this.text = response.message;

        return;
      }

      // Push to snackbar
      this.snackbar = true;
      this.text = "Connexion réussie. Redirection...";

      // Redirect
      this.$router.push("/");
    }
  }
};
</script>
