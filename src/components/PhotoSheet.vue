<template>
  <div>
    <div class="container">
      <div class="imageBox">
        <vue-drop-zone
          @vdropzone-complete="response => onDropComplete(response)"
          @vdropzone-error="(file, msg, xhr) => onDropError(file, msg, xhr)"
          @vdropzone-queue-complete="() => onFileQueued()"
          @vdropzone-file-added="file => onFileAdded(file)"
          @vdropzone-success="
            (file, response) => onClickDropZone(file, response)
          "
          ref="dropzone1"
          id="dropzone1"
          :options="dropZoneOptions"
          :useCustomSlot="true"
        >
        </vue-drop-zone>
        <p v-show="hasError">{{ errorMsg }}</p>
      </div>
      <div class="imageBox">
        <img :src="image2" alt="Image 2" />
      </div>
      <div class="imageBox">
        <img :src="image3" alt="Image 3" />
      </div>
      <div class="imageBox">
        <img :src="image4" />
      </div>
    </div>
    <button @click="submitImages()">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import vue2Dropzone from "vue2-dropzone/dist/vue2Dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default Vue.extend({
  name: "PhotoSheet",
  components: { vueDropZone: vue2Dropzone },
  data: () => {
    return {
      image1: require("@/assets/starwars/yoda.png"),
      image2: require("@/assets/starwars/r2d2.png"),
      image3: require("@/assets/starwars/darthvader.png"),
      image4: require("@/assets/starwars/bb8.png"),
      hasError: false,
      errorMsg: "",
      dropZoneOptions: {
        // url: "http://localhost:1337/upload",
        url: "https://httpbin.org/post",
        thumbnailWidth: 350,
        thumbnailMethod: "contain",
        maxFilesize: 0.5,
        paramName: "files",
        acceptedFiles: "image/jpg, image/png, image/jpeg",
        maxFiles: 1,
        autoProcessQueue: false,
        parallelUploads: 3,
        addRemoveLinks: true,
        headers: {
          Authorization: "Bearer tbd",
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
    submitImages() {
      const dropzone = this.getDropzoneInstance();
      dropzone.processQueue();
    },
    onDropError(file: File, msg: string, xhr: XMLHttpRequest) {
      console.log(file, msg, xhr);
      this.hasError = true;
      this.errorMsg = msg;
    },
    onDropComplete(response: string) {
      console.log(response);
    },
    onFileQueued() {
      console.log("File Queued");
    },
    onFileAdded(file: File) {
      console.log(file);
      const dropzone = this.getDropzoneInstance();
      const acceptedFiles = dropzone.getAcceptedFiles();
      if (this.hasError) {
        const rejectedFiles = dropzone.getRejectedFiles();
        dropzone.removeFile(rejectedFiles[0]);
      }
      this.hasError = false;

      if (acceptedFiles.length > 0) {
        //this.lastFile = acceptedFiles[0];
        dropzone.removeFile(acceptedFiles[0]);
      }
    },
    onClickDropZone(file: File, response: Response) {
      console.log(file, response);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  height: 600px;
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
</style>
