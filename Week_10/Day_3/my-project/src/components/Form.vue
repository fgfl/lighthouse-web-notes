<template>
  <div class="form">
    <input type="text" v-model="animal"/>
    <button type="button" @click="formSubmit">Add an Animal</button>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      animal: ''
    };
  },
  methods: {
    formSubmit() {
      console.log(this.animal);
      this.$emit('animalSubmit', this.animal);
    }
  }
}
</script>

<style scoped>

</style>
