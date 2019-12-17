<template>
  <div>
    <input type="text" v-model="model.textInput" />
  </div>
</template>

<script>
  export default {
    name: 'ModalInput',
    components: {},
    data: () => ({
      model: {
        textInput: ''
      }
    }),

    created() {
      this.model = this.$attrs['extraParams'];
    }
  }
</script>
