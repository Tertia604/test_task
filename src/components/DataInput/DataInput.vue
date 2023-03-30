<template>
  <div class="data__input input">
    <CustomInput
      placeholder="Поиск по материалу..."
      type="text"
      v-model="queryMaterial"
      @input="onSearchMaterials"
      class="input__firstInput"
    />
    <div class="input__secondInput">
      <div>
        <label>Ширина</label>
        <CustomInput
          type="number"
          v-model.number="width"
          placeholder="Введите ширину..."
          :step="widthStep"
          @input="validateWidth"
        />
      </div>
      <span v-if="width < 5 && width !== ''" style="width: 100%"
        >Ширина быть больше 5</span
      >
    </div>

    <div class="input__thirdInput">
      <div>
        <label>Длина</label>
        <CustomInput
          type="number"
          v-model.number="length"
          placeholder="Введите длину..."
          :step="lengthStep"
          @input="validateLength"
        />
      </div>
      <span v-if="length < 5 && length !== ''" style="width: 100%"
        >Длина быть больше 5</span
      >
    </div>
    <select v-model="selectFrame" class="input__select">
      <option value="" disabled>Выберите прочность</option>
      <option v-for="frame in uniqueFrames" :key="frame" :value="frame">
        {{ frame }}
      </option>
    </select>
    <button
      @click="submitData"
      :disabled="!validateCalculate"
      class="input__calculate"
    >
      Рассчитать
    </button>
    <button class="input__openCart" @click="openCart" :disabled="!numBuy">
      Корзина <span v-if="numBuy">{{ numBuy > 0 ? numBuy : "" }}</span>
    </button>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "DataInput",
  props: ["infoData", "infoConfig", "numBuy", "selectItemPipeValue"],
  emits: ["filterMaterials", "openCart", "getDataObject"],
  setup(props, { emit }) {
    const queryMaterial = ref("");
    const width = ref("");
    const length = ref("");
    const selectFrame = ref("");
    const showCart = ref(false);

    const materials = computed(() => {
      return props.infoData.filter(
        (item) => item.material === "plastic" || item.material === "metal"
      );
    });

    const filterMaterials = computed(() => {
      if (!queryMaterial.value) {
        return [];
      }
      return materials.value.filter((item) => {
        return item.material
          .toLowerCase()
          .includes(queryMaterial.value.toLowerCase());
      });
    });

    const onSearchMaterials = () => {
      emit("filterMaterials", filterMaterials.value);
    };

    const uniqueFrames = computed(() => {
      const frames = [];
      props.infoConfig.forEach((item) => {
        if (item.type === "frame") {
          frames.push(item.name);
        }
      });
      return [...new Set(frames)];
    });

    const submitData = () => {
      emit("getDataObject", {
        width: width.value,
        length: length.value,
        selectFrame: selectFrame.value,
      });
    };

    const openCart = () => {
      showCart.value = true;
      emit("openCart", showCart.value);
    };

    const validateCalculate = computed(() => {
      return (
        queryMaterial.value &&
        width.value >= filterSize.value[1]?.min &&
        length.value >= filterSize.value[0]?.min &&
        selectFrame.value &&
        props.selectItemPipeValue.selectItem &&
        props.selectItemPipeValue.selectPipe
      );
    });

    onSearchMaterials();

    const filterSize = computed(() => {
      return props.infoConfig.filter((item) => item.type === "size");
    });

    const widthStep = computed(() => {
      return filterSize.value[1]?.step;
    });

    const lengthStep = computed(() => {
      return filterSize.value[0]?.step;
    });

    const validateWidth = computed(() => {
      if (width.value >= filterSize.value[1]?.max) {
        width.value = filterSize.value[1]?.max;
      }
    });

    const validateLength = computed(() => {
      if (length.value >= filterSize.value[0]?.max) {
        length.value = filterSize.value[0]?.max;
      }
    });

    return {
      queryMaterial,
      onSearchMaterials,
      width,
      length,
      selectFrame,
      uniqueFrames,
      showCart,
      openCart,
      submitData,
      validateCalculate,

      filterSize,

      validateWidth,
      validateLength,

      widthStep,
      lengthStep,

      filterMaterials,
    };
  },
});
</script>

<style scoped lang="scss">
.data__input {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  column-gap: 30px;
  row-gap: 30px;
  .input {
    &__secondInput,
    &__thirdInput {
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        align-self: start;
        height: 40px;
      }
      div {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      span {
        font-size: 18px;
        color: red;
      }
    }
    &__firstInput,
    &__select,
    &__calculate {
      align-self: start;
      height: 40px;
    }
    &__secondInput {
      display: flex;
      flex-direction: column;
      grid-row: 2/-1;
    }
    &__thirdInput {
      grid-row: 2/-1;
      column-gap: 2/3;
      display: flex;
      flex-direction: column;
    }
    &__select {
      grid-row: 2/-1;
      column-gap: 3/4;
      border: 1px solid forestgreen;
      outline: none;
    }
    &__calculate {
      grid-row: 2/-1;
      column-gap: 4/-1;
    }
    &__openCart {
      grid-column: 4/-1;
      grid-row: 1;
      span {
        padding: 3px 7px;
        border: none;
        border-radius: 100px;
        background-color: rgba(0, 150, 105, 0.3);
        color: white;
      }
    }
  }
}
</style>