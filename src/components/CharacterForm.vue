<template>
  <div>
    <div class="container">
      <div class="imageBox">
        <vue-drop-zone
          @vdropzone-error="onDropZone1Error"
          @vdropzone-success="onImageUploadSuccess"
          ref="dropzone1"
          id="dropzone1"
          :options="dropZoneOptions"
          :useCustomSlot="true"
        >
          <div class="dz-message" data-dz-message>
            <!-- We need set useCustomSlot=true for message below to take effect. -->
            <span>Drop image here to upload.</span>
          </div>
        </vue-drop-zone>
        <p v-show="hasError">{{ errorMsg }}</p>
      </div>
      <div class="imageBox">
        <img :src="image2" alt="Image 2" />
      </div>
      <div class="imageBox">
        <img :src="image3" alt="Image 3" />
      </div>
      <div class="imageBox submit-form">
        <form class="form-entry" @submit="onSubmitForm">
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
            <label for="serves">Total Serves:</label>
            <input id="serves" type="number" v-model="serves" required />
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface DropZoneUploadResponse {
  id: string | number;
  name: string;
}

interface FileStatus {
  status: string;
}

import Vue from "vue";
import vue2Dropzone from "vue2-dropzone/dist/vue2Dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";

export default Vue.extend({
  name: "CharacterForm",
  components: { vueDropZone: vue2Dropzone },
  data: () => {
    return {
      name: "Enter Name",
      dateAdded: new Date().toISOString().substring(0, 10),
      isfavorite: true,
      serves: 1,
      image1: require("@/assets/starwars/yoda.png"),
      image2: require("@/assets/starwars/r2d2.png"),
      image3: require("@/assets/starwars/darthvader.png"),
      image4: require("@/assets/starwars/bb8.png"),
      hasError: false,
      errorMsg: "",
      dropZoneOptions: {
        url: "http://localhost:1337/upload",
        thumbnailWidth: 350,
        thumbnailHeight: 250,
        thumbnailMethod: "contain",
        maxFilesize: 0.5,
        paramName: "files",
        acceptedFiles: "image/jpg, image/png, image/jpeg",
        maxFiles: 1,
        autoProcessQueue: false,
        parallelUploads: 3,
        addRemoveLinks: true,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE1NTkyOTAzLCJleHAiOjE2MTgxODQ5MDN9.oHK5uTEPNN7ncMHPOGl2lGPMprfLmV0tN50LDaz-vIw",
          "Cache-Control": "",
          "X-Requested-With": ""
        }
      }
    };
  },
  methods: {
    getDropzoneInstance() {
      return this.$refs.dropzone1 as InstanceType<typeof vue2Dropzone>;
    },
    onSubmitForm(e: Event) {
      e.preventDefault();
      const dropzone = this.getDropzoneInstance();
      dropzone.processQueue();
      console.log("processing images first!");
    },
    onImageUploadSuccess(
      file: FileStatus,
      responses: DropZoneUploadResponse[]
    ): void {
      if (file.status !== "success") {
        //TODO: Error
        return;
      }
      const ids: number[] = [];
      responses.map(resp => {
        console.log(resp);
        ids.push(+resp.id);
      });

      axios
        .post(
          "http://localhost:1337/meals",
          {
            Name: this.name,
            Added: this.dateAdded,
            IsFavorite: this.isfavorite,
            Serves: this.serves,
            Image: ids?.length > 0 ? ids[0] : null
          },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0NTU4MjQyLCJleHAiOjE2MTcxNTAyNDJ9.tBj3jiL0FCy99fVsQDJUPYRKxt30rv1Ed_k_hpO1w-M"
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
    onDropZone1Error(file: File, msg: string, xhr: XMLHttpRequest) {
      console.log(file, msg, xhr);
      this.hasError = true;
      this.errorMsg = msg;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  height: 720px;
  width: 1000px;
  text-align: center;
  margin-left: calc((100% - 1000px) / 2);
}

.container .imageBox {
  width: 49%;
  height: 50%;
  border: 1px solid black;
}

.container img {
  max-width: 100%;
  /* display: block; */
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  height: calc(100% - (4px * 2));
}

#dropzone1 {
  height: 100%;
  width: 100%;
  color: black;
  background: white;
}

.submitButton {
  margin-top: 20px;
}

.form-entry {
  text-align: left;
  margin-left: 5%;
  margin-top: 5%;
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
  margin-left: 5px;
}

label {
  display: table-cell;
}

.form-group {
  display: flex;
  vertical-align: middle;
}
</style>
