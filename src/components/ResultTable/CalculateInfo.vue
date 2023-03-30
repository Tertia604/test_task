<template>
  <div class="result-table__calculate-info calculate-info">
    <div class="calculate-info__text">
      <p>Прочность: {{ dataObject?.selectFrame }}</p>
      <p>Площадь конструкции: {{ square }}м2</p>
    </div>

    <table class="calculate-info__table-price">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Ед.</th>
          <th>Количество</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{{ selectItem.name }}</th>
          <td>{{ selectItem.unit }}</td>
          <td>{{ calculationFrame }}</td>
          <td>{{ fixPrice(calculationFrame, selectItem?.price) }}</td>
        </tr>
        <tr>
          <th>{{ selectPipe.name }}</th>
          <td>{{ selectPipe.unit }}</td>
          <td>{{ calculatePipe }}</td>
          <td>{{ fixPrice(calculatePipe, selectPipe?.price) }}</td>
        </tr>
        <tr>
          <th>Саморез</th>
          <td>шт</td>
          <td>{{ calculateScrew }}</td>
          <td>{{ fixPrice(calculateScrew, 1.1) }}</td>
        </tr>
        <tr>
          <th>Итого</th>
          <td></td>
          <td></td>
          <td>
            {{ totalPrice }}
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addToCart" class="calculate-info__btn">
      Добавить в корзину
    </button>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "CalculateInfo",
  props: ["selectItem", "selectPipe", "dataObject"],
  emits: ["buyItem"],
  setup(props, { emit }) {
    const { dataObject, selectItem, selectPipe } = props;

    const square = computed(() => {
      return dataObject.width * dataObject.length;
    });

    const calculationFrame = computed(() => {
      return Math.floor(square.value / (1 * props.selectItem.width));
    });

    const calculatePipe = computed(() => {
      const a =
        (dataObject.width / props.selectItem.width + 1) * dataObject.length;
      const b = (dataObject.length + 1) * dataObject.width;
      return Math.floor(a + b);
    });

    const calculateScrew = computed(() => {
      if (dataObject.material === "plastic") {
        return Math.floor(calculationFrame?.value * 10);
      } else {
        return Math.floor(calculationFrame?.value * 5);
      }
    });

    const fixPrice = (sum, price) => {
      return (sum * price).toFixed(2);
    };

    const totalPrice = computed(() => {
      return (
        +fixPrice(calculationFrame.value, selectItem?.price) +
        +fixPrice(calculateScrew.value, 1.1) +
        +fixPrice(calculatePipe.value, selectPipe?.price)
      );
    });

    const addToCart = () => {
      const buyItem = new Map();
      buyItem
        .set(
          selectItem.name,
          fixPrice(calculationFrame.value, selectItem?.price)
        )
        .set(selectPipe.name, fixPrice(calculatePipe.value, selectPipe?.price))
        .set("Саморез", fixPrice(calculateScrew.value, 1.1))
        .set("Итого", totalPrice.value);
      emit("buyItem", buyItem);
    };

    return {
      square,
      calculationFrame,
      calculateScrew,
      calculatePipe,
      fixPrice,
      totalPrice,
      addToCart,
    };
  },
});
</script>

<style scoped lang="scss">
.result-table__calculate-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .calculate-info {
    &__text {
      font-size: 18px;
    }
    &__table-price {
      border-collapse: collapse;
      font-size: 18px;
      width: 100%;
      th,
      td {
        padding: 16px 24px;
        text-align: left;
      }
      tr {
        width: 100%;
      }
      thead {
        tr {
          background-color: #087f5b;
          color: white;
          th:not(:first-child) {
            text-align: center;
          }
        }
        th {
          width: 25%;
        }
      }
      tbody {
        tr {
          &:hover {
            cursor: pointer;
            border: none;
            box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
          }

          td {
            text-align: center;
          }

          &:nth-child(odd) {
            background-color: #f8f9fa;
          }
        }

        tr:nth-child(even) {
          background-color: #e9ecef;
        }
      }
    }
    &__btn {
      align-self: end;
      background: none;
      border: 1px solid forestgreen;
      color: forestgreen;
      padding: 10px 15px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover,
      &:active {
        background-color: forestgreen;
        color: white;
      }
    }
  }
}
</style>
