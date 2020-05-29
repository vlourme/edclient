<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list rounded>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Panneau de bord</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>EcoleDirecte</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer app>
      <div v-if="isLogged">
        Connecté en tant que
        {{ profile.firstName + ' ' + profile.lastName }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["isLogged"]),
    ...mapGetters(["profile"])
  },
  methods: {
    ...mapActions(["deauth"]),

    /**
     * Logout method
     */
    logout() {
      // Deauth
      this.deauth();

      // Redirect to authentication page
      this.$router.push("/authentication");
    }
  }
};
</script>