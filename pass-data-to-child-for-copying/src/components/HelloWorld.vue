<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
      data: { ...this.content }
    };
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
