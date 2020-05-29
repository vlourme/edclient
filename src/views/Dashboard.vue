<template>
  <div class="dashboard">
    <h1>{{ profile }}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["profile"])
  }
};
</script>