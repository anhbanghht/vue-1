<template>
  <div>
    <b-form-checkbox v-model="model.checkBox" @change="changeValue($event)">Confirm</b-form-checkbox>
  </div>
</template>

<script>
  export default {
    name: 'ModalCheckBox',
    components: {},
    data: () => ({
      model: {
        checkBox: false
      }
    }),

    created() {
      this.model = this.$attrs['extraParams'];
    },

    methods: {
      changeValue(checkBox) {
        this.model['disable'] = !checkBox;
      }
    }
  }
</script>


