<template>
  <div>
    <div ref="childForm" class="container">
      <div class="imageBox">
        <vue-drop-zone
          @vdropzone-error="onDropZoneError"
          @vdropzone-success="
            (file, response) => onImageUploadSuccess(1, file, response)
          "
          ref="dropzone1"
          id="dropzone1"
          :options="dropZone1Options"
          :useCustomSlot="true"
        >
          <div class="dz-message" data-dz-message>
            <!-- We need set useCustomSlot=true for message below to take effect. -->
            <span>Drop image here to upload.</span>
          </div>
        </vue-drop-zone>
      </div>
      <div class="imageBox">
        <vue-drop-zone
          @vdropzone-error="onDropZoneError"
          @vdropzone-success="
            (file, response) => onImageUploadSuccess(2, file, response)
          "
          ref="dropzone2"
          id="dropzone2"
          :options="dropZone2Options"
          :useCustomSlot="true"
        >
          <div class="dz-message" data-dz-message>
            <span>Drop image here to upload.</span>
          </div>
        </vue-drop-zone>
      </div>
      <div class="imageBox">
        <vue-drop-zone
          @vdropzone-error="onDropZoneError"
          @vdropzone-success="
            (file, response) => onImageUploadSuccess(3, file, response)
          "
          ref="dropzone3"
          id="dropzone3"
          :options="dropZone3Options"
          :useCustomSlot="true"
        >
          <div class="dz-message" data-dz-message>
            <!-- We need set useCustomSlot=true for message below to take effect. -->
            <span>Drop image here to upload.</span>
          </div>
        </vue-drop-zone>
      </div>
      <div class="imageBox">
        <!-- <TaskDetailForm :options="options" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface DropZoneUploadResponse {
  id: string | number;
  name: string;
}

interface FileDetail {
  status: string;
}

import Vue from "vue";
import vue2Dropzone from "vue2-dropzone/dist/vue2Dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";
import { TaskType } from "@/interfaces/task-type";
// import TaskDetailForm from "@/components/TaskDetailForm.vue";

const dropZoneOptions = Object.freeze({
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
});

export default Vue.extend({
  name: "TaskForm",
  components: {
    vueDropZone: vue2Dropzone
    // TaskDetailForm: TaskDetailForm
  },
  props: ["tasks"],
  watch: {
    tasks: function(o, n) {
      // eslint-disable-next-line prettier/prettier
      console.log("tasks updated!");
      console.log(o, n);

      const file = { size: 514.12, name: "bb8.png", type: "image/png" };
      const url = "http://localhost:1337/uploads/bb8_115fc666a4.png";

      (this.$refs.dropzone3 as InstanceType<
        typeof vue2Dropzone
      >).manuallyAddFile(file, url);
    }
  },
  data: () => {
    return {
      name: "Enter Name",
      dropZonesToWaitOn: 0,
      dropZonesToProcess: [],
      droppedImageIds: [0, 0, 0],
      options: new Array<TaskType>(),
      dropZone1Options: JSON.parse(JSON.stringify(dropZoneOptions)),
      dropZone2Options: JSON.parse(JSON.stringify(dropZoneOptions)),
      dropZone3Options: JSON.parse(JSON.stringify(dropZoneOptions))
    };
  },
  // mounted() {},
  methods: {
    hasImageDropped(dropZone: InstanceType<typeof vue2Dropzone>) {
      return dropZone.getQueuedFiles().length > 0;
    },
    processNextDropZone() {
      const dropZoneToProcess = this.dropZonesToProcess.find(dropzone =>
        this.hasImageDropped(dropzone)
      ) as InstanceType<typeof vue2Dropzone>;
      if (dropZoneToProcess) {
        dropZoneToProcess.processQueue();
      } else {
        this.onAllImagesUploadSuccess();
      }
    },
    submitForm() {
      const dropzones = [
        this.$refs.dropzone1,
        this.$refs.dropzone2,
        this.$refs.dropzone3
      ];
      Array.prototype.push.apply(this.dropZonesToProcess, dropzones);

      this.dropZonesToWaitOn = dropzones.filter(dropzone =>
        this.hasImageDropped(dropzone)
      ).length;

      console.log("processing images first!");
      this.processNextDropZone();
    },
    onImageUploadSuccess(
      dropZoneNumber: number,
      file: FileDetail,
      responses: DropZoneUploadResponse[]
    ): void {
      console.log(`Image Upload done for dropzone${dropZoneNumber}`);
      console.log(file, responses);

      this.droppedImageIds[dropZoneNumber - 1] = +responses[0].id;
      this.processNextDropZone();
    },
    onAllImagesUploadSuccess(): void {
      axios
        .post(
          "http://localhost:1337/meals",
          {
            Name: this.name,
            Image: this.droppedImageIds[0] || null,
            Image2: this.droppedImageIds[1] || null,
            Image3: this.droppedImageIds[2] || null,
            Date: "03-03-2020"
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
    onDropZoneError(file: File, msg: string, xhr: XMLHttpRequest) {
      console.log(file, msg, xhr);
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

#dropzone1 #dropzone2 #dropzone3 {
  height: 100%;
  width: 100%;
  color: black;
  background: white;
}

.vue-dropzone {
  border: none;
  height: 90%;
  width: 100%;
}

.submitButton {
  margin-top: 20px;
}

.submit-form {
  margin-left: 10px;
  margin-top: 10px;
}

.select {
  margin-left: 4px;
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
