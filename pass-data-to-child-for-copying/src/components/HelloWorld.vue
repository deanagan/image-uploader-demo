<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group>
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="name">Name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="name" v-model="data.name"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="number">Number:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="number" v-model="data.number"></b-form-input>
            </b-col>
          </b-row>
        </b-container>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    content: Object
  },
  data: function() {
    return {
      data: { ...this.content },
      show: true
    };
  },
  methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.data))
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.data.name = '';
        this.data.number = '';

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
  }
}
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
</style>
