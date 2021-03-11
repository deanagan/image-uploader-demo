<template>
  <div class="photosheet">
    <table class="table">
      <tbody>
        <tr>
          <td>
            <table class="lefttable">
              <tbody>
                <tr>
                  <td class="leftCells" style="border-bottom: 1px solid black;">
                    <img
                      class="leftImage"
                      :src="image3"
                      blank-color="white"
                      alt=""
                    />
                    <!-- <vue-dropzone
                      @vdropzone-complete="response => onDropComplete(response)"
                      @vdropzone-error="(file,msg,xhr) => onDropError(file, msg, xhr)"
                      @vdropzone-queue-complete="() => onFileQueued()"
                      @vdropzone-file-added="file => onFileAdded(file)"
                      @vdropzone-success="(file, response) => onClickImage(file, response)"
                      ref="dropzone1"
                      id="dropzone1"
                      :options="dropZoneOptions"
                    />
                    <p v-show="hasError">{{ errorMsg }}</p>
                    -->
                  </td>
                </tr>
                <tr>
                  <td class="leftCells bottomLeftCell">
                    <img
                      class="leftImage"
                      :src="image2"
                      blank-color="white"
                      alt=""
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <img
              class="rightImage"
              :src="image1"
              style="border: none; margin: auto"
              alt=""
            />
          </td>
        </tr>
      </tbody>
    </table>
    <button @submit="submitImages()">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PhotoSheet",
  data: () => {
    return {
      image1: require("@/assets/starwars/yoda.png"),
      image2: require("@/assets/starwars/r2d2.png"),
      image3: require("@/assets/starwars/darthvader.png")
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.photosheet {
  margin-top: 5px;
  margin-bottom: 15px;
  overflow-y: auto;
  margin-left: 30%;
}

.lefttable {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  text-align: center;
}

.leftCells {
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
}

.leftImage {
  object-fit: contain;
  max-width: 470px;
  max-height: 330px;
  height: 100%;
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
  margin-top: 5px;
  margin-bottom: 5px;
}

.rightImage {
  object-fit: contain;
  width: 470px;
  max-height: 500px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
