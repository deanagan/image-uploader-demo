<template>
  <div class="submit-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" v-model="name" placeholder="Name" required />
    </div>
    <div class="form-group">
      <label for="dateAdded">Date Added:</label>
      <input type="date" id="dateAdded" v-model="dateAdded" required />
    </div>
    <div class="form-group">
      <label for="isfavorite">Is Favorite?:</label>
      <input
        type="checkbox"
        id="isfavorite"
        v-model="isfavorite"
        value="true"
      />
    </div>
    <div class="form-group">
      <label for="storyPoints">Story Points:</label>
      <b-form-input id="storyPoints" type="number" v-model="serves" required />
    </div>

    <!-- <div class="form-group">
      <label for="typeOfMeal">Meal Type:</label>
      <select id="typeOfMeal" class="select" v-model="selected">
        <option v-for="(option, id) in options" :value="option.id" :key="id">
          {{ option.Type }}
        </option>
      </select>
    </div> -->
    <b-button fab dark color="indigo" @click="newDetailForm">
      +
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// import axios from "axios";

export default Vue.extend({
  name: "TaskDetailForm",
  props: ["options"],
  methods: {
    newDetailForm() {
      this.$emit("new-detail");
    },
  },
  watch: {
    options: function(n, o) {
      console.log("Testing!!!");
      console.log(n, o);
    }
  },
  // mounted: function() {
    // axios
    //   .get("http://localhost:1337/meal-types", {
    //     headers: {
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0NTU4MjQyLCJleHAiOjE2MTcxNTAyNDJ9.tBj3jiL0FCy99fVsQDJUPYRKxt30rv1Ed_k_hpO1w-M"
    //     }
    //   })
    //   .then(response => {
    //     response.data.map((e) => {
    //       this.options.push(e);
    //       console.log(e);
    //     });
    //   })
    //   .catch((error: Error) => {
    //     console.log(error);
    //   });
  // },
  data: function() {
    return {
      detail: {
        selected: new String(),
        dateAdded: new Date().toISOString().substring(0, 10),
        isfavorite: true,
      }
    };
  }
});
</script>
