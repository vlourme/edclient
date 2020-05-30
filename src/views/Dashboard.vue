<template>
  <div class="dashboard">
    <v-container fluid>
      <h1 class="display-2">Compte</h1>
      <br />
      <v-card elevation="3">
        <v-card-text>
          Email (compte): {{ profile.email }}
          <br />
          Classe: {{ profile.classeLibelle }} &mdash; <b>{{ profile.classeCode }}</b>
          <br />
          Type de compte: {{ profile.typeCompte === 'E' ? "Elève" : profile.typeCompte }}
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["profile", "school"])
  }
};
</script>