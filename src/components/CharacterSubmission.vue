<template>
  <div id="app">
    <form class="form-entry" @submit="onSubmitForm">
      <CharacterForm ref="charForm" />

      <button class="btn-submit" type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CharacterForm from "@/components/CharacterForm.vue";

export default Vue.extend({
  name: "CharacterSubmission",
  components: {
    CharacterForm
  },
  methods: {
    onSubmitForm(e: Event) {
      e.preventDefault();
      const charForm = this.$refs.charForm as InstanceType<
        typeof CharacterForm
      >;

      charForm.submitForm();
    }
  }
});
</script>

<style>
.form-entry {
  text-align: left;
  margin-left: 5%;
  margin-top: 5%;
}

.btn-submit {
  margin-left: 48%;
  margin-top: 40px;
  margin-bottom: 10px;
}
</style>
