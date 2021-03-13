<template>
  <div class="submit-form">
    <form class="form-entry" @submit="onSubmitForm">
      <!-- Name -->

      <label for="name">Name:</label>
      <input type="text" v-model="name" placeholder="Name" required autofocus />

      <!-- Images -->
      <label for="image1">Image 1:</label>
      <input type="file" id="image1" />
      <label for="image2">Image 2:</label>
      <input type="file" id="image2" />
      <label for="image3">Image 3:</label>
      <input type="file" id="image3" />

      <!-- Date Added -->
      <label for="dateAdded">Date Added:</label>
      <input
        type="date"
        id="dateAdded"
        v-model="dateAdded"
        required
        autofocus
      />

      <!-- Is Favorite -->
      <label for="isfavorite">Is Favorite?:</label>
      <input
        type="checkbox"
        id="isfavorite"
        v-model="isfavorite"
        value="true"
        autofocus
      />

      <!-- Number of Serves -->
      <label for="isfavorite">Total Serves:</label>
      <input type="number" v-model="serves" required autofocus />

      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";

export default Vue.extend({
  name: "SubmitForm",
  data: () => {
    return {
      name: "Name",
      dateAdded: new Date().toISOString().substring(0, 10),
      isfavorite: true,
      serves: 1,
      image1: File,
      image2: File,
      image3: File
    };
  },
  methods: {
    onSubmitForm(e: Event) {
      console.log("submit form");
      e.preventDefault();
      axios
        .post(
          "http://localhost:1337/meals",
          {
            Name: this.name,
            Added: this.dateAdded,
            IsFavorite: this.isfavorite,
            Serves: this.serves
          },
          {
            headers: {
              Authorization:
                "Bearer [token here]",
              // "Content-Type": "multipart/form-data",
              // Accept: "application/vnd.api+json"
            }
          }
        )
        .then((response: AxiosResponse) => {
          console.log(response);
        })
        .catch((error: Error) => {
          console.log(error);
        });
      // .finally(() => {
      //   this.loading = false
      // });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit-form {
  text-align: left;
  margin-left: 5%;
  margin-top: 4px;
}

form {
  display: block;
  text-align: left;
  width: 100%;
}

button {
  display: block;
}

input {
  margin-bottom: 8px;
  display: table-cell;
}

label {
  display: table-cell;
}
</style>
