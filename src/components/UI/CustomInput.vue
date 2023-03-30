<template>
  <input
    @input="updateInput"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  props: {
    modelValue: [String, Number],
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
  },
  setup(props, { emit }) {
    const updateInput = (e) => {
      emit("update:modelValue", e.target.value);
    };

    return {
      updateInput,
    };
  },
});
</script>

<style scoped lang="scss">
input {
  border: 1px solid forestgreen;
  padding: 10px 15px;
  outline: none;
}
</style>
