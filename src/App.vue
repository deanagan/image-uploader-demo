<template>
  <div id="app">
    <img class="topLogo" alt="logo" src="@/assets/starwars/starwars.png" />
    <character-submission />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CharacterSubmission from "./components/CharacterSubmission.vue";

export default Vue.extend({
  name: "App",
  components: {
    CharacterSubmission
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topLogo {
  width: 120px;
  height: 80px;
}
</style>
