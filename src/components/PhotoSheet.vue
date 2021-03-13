<template>
  <div>
    <div class="container">
      <div class="imageBox">
        <vue-drop-zone
          @vdropzone-error="
            (file, msg, xhr) => onDropZone1Error(file, msg, xhr)
          "
          ref="dropzone1"
          id="dropzone1"
          :options="dropZoneOptions"
          :useCustomSlot="true"
        >
        </vue-drop-zone>
      </div>
      <div class="imageBox">
        <img :src="image2" alt="Image 2" />
      </div>
      <div class="imageBox">
        <img :src="image3" alt="Image 3" />
      </div>
      <div class="imageBox">
        <submit-form />
      </div>
    </div>
    <!-- <button class="submitButton" @click="onSubmitImages()">Submit</button> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import vue2Dropzone from "vue2-dropzone/dist/vue2Dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import SubmitForm from "@/components/SubmitForm.vue";

export default Vue.extend({
  name: "PhotoSheet",
  components: { vueDropZone: vue2Dropzone, SubmitForm: SubmitForm },
  data: () => {
    return {
      image1: require("@/assets/starwars/yoda.png"),
      image2: require("@/assets/starwars/r2d2.png"),
      image3: require("@/assets/starwars/darthvader.png"),
      image4: require("@/assets/starwars/bb8.png"),
      hasError: false,
      errorMsg: "",
      dropZoneOptions: {
        url: "http://localhost:1337/Meals/image",
        // url: "https://httpbin.org/post",
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
    onSubmitImages() {
      const dropzone = this.getDropzoneInstance();
      dropzone.processQueue();
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
  color: white;
  background: white;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.submitButton {
  margin-top: 20px;
}
</style>
