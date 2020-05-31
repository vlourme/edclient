<template>
  <div class="dashboard">
    <v-container fluid>
      <h1 class="display-1">Compte</h1>
      <br />
      <v-card elevation="3">
        <v-card-text>
          Email du compte: {{ profile.email }}
          <br />
          Email perso lié à la messagerie: {{ settings.mailPerso }}
          <br />
          <div v-if="settings.mailPro">
            Email pro lié à la messagerie: {{ settings.mailPro }}
            <br />
          </div>
          Classe: {{ profile.classeLibelle }} &mdash;
          <b>{{ profile.classeCode }}</b>
          <br />
          Type de compte: {{ profile.typeCompte === 'E' ? "Elève" : profile.typeCompte }}
        </v-card-text>
      </v-card>
      <br />
      <h1 class="display-1">Messages</h1>
      <br />
      <v-card elevation="3">
        <v-data-table sort-by="date" sort-desc :headers="messagesHeader" :items="messagesList"></v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => {
    return {
      messagesHeader: [
        { 
          text: 'Expéditeur',
          value: 'from'
        },
        {
          text: 'Sujet',
          value: 'subject'
        },
        {
          text: 'Date',
          value: 'date'
        }
      ],
      messagesList: []
    };
  },
  computed: {
    ...mapGetters(["profile", "school", "messages", "settings"])
  },
  methods: {
    ...mapActions(["fetchMessages"])
  },
  beforeMount() {
    // Get messages
    this.fetchMessages();

    // Set messages
    this.messages.received.forEach(message => {
      this.messagesList.push({
        'from': message.from.name,
        'subject': message.subject,
        'date': message.date
      })
    })
  }
};
</script>