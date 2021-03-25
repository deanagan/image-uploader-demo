<template>
  <div id="app">
    <form ref="form" class="form-entry" @submit="onSubmitForm">
      <TaskForm :tasks="tasks" />
      <button class="btn-submit" type="submit">
        Submit
      </button>
    </form>
    <!-- <button class="btn-add" @click="addMore">
      Add More
    </button> -->
    <button @click="addstuff">Add Stuff</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TaskForm from "@/components/TaskForm.vue";
import { TaskType } from "@/interfaces/task-type";

export default Vue.extend({
  name: "CharacterSubmission",
  components: {
    TaskForm
  },
  methods: {
    addstuff() {
      this.tasks.push({
        id: 1,
        name: "Test",
        description: "Quick Brown FOx",
        done: false,
        needby: "2020-10-4",
        storypoints: 25
      });
    },
    onSubmitForm(e: Event) {
      e.preventDefault();
      //   const charForm = this.$refs.charForm as InstanceType<
      //     typeof CharacterForm
      //   >;

      //charForm.submitForm();

      //console.log(this.$refs.extras.$children);
      console.log((this.$refs.extras as HTMLElement).children.length);
      const extraForms = (this.$refs.extras as HTMLElement).children;
      for (const item of extraForms) {
        // const CharFormComponentClass = Vue.extend(CharacterForm);
        // (item as InstanceType<Vue.extend(CharacterForm)>).hello();
        console.log(item);
        // .$refs.childForm.hello();
        // this.$refs
      }
    },
    delete(counter: InstanceType<typeof TaskForm>) {
      console.log(counter);
    }
  },
  data: function() {
    return {
      tasks: new Array<TaskType>()
    };
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
