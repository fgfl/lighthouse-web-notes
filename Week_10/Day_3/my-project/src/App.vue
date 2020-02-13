<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="msg"><p>what is this???</p></HelloWorld>
    <Form @animalSubmit="onAnimalSubmit" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Form from './components/Form';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Form
  },
  data() {
    return {
      msg: 'Andy Wonderland is a great name'
    };
  },
  methods: {
    onAnimalSubmit(data) {
      console.log(data);
    } 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
