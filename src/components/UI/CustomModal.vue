<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <div
        v-for="(item, index) in itemCart"
        class="content"
        v-if="itemCart.length > 0"
      >
        <div v-for="i in item" class="content__info">
          <span class="content__text">{{ i[0] }}</span>
          <span class="content__price">Цена {{ i[1] }}</span>
        </div>
        <button @click="deleteItemCart(index)">Delete</button>
      </div>
      <p v-else>Корзина пустая</p>

      <button @click="hideDialog">Закрыть</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "CustomModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    itemCart: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const hideDialog = () => {
      emit("update:show", false);
    };

    const deleteItemCart = (index) => {
      emit("deleteItemCart", index);
    };

    return {
      hideDialog,
      deleteItemCart,
    };
  },
});
</script>

<style scoped lang="scss">
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;

  display: flex;
  &__content {
    width: 30%;
    margin: auto;
    background: white;
    border-radius: 12px;

    display: flex;
    flex-direction: column;

    padding: 30px 30px 10px;
    .content {
      margin-bottom: 15px;
      border: 1px solid forestgreen;
      padding: 10px;
      &__info {
        display: flex;
        span {
        }
        .content__text {
          width: 65%;
        }
        .content__price {
        }
      }
    }
    button {
      margin-top: 20px;
      align-self: center;
      padding: 10px 15px;
      color: forestgreen;
      border: 1px solid forestgreen;
      background: none;
      cursor: pointer;
      transition: all 0.15s;
      &:hover,
      &:active {
        background-color: forestgreen;
        color: white;
      }
    }
  }
}
</style>
