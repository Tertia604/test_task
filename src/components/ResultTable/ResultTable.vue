<template>
  <span
    class="result-table__materials"
    v-if="filterInfoData.length && (!selectItem || !selectPipe)"
    >Выберите лист и трубу</span
  >
  <div v-if="filterInfoData.length" class="result-table__all table">
    <table class="table__first">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Материал</th>
          <th>Ширина</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filterInfoData"
          @click="getInfoData(item)"
          :class="{ selected: item === selectItem }"
        >
          <th>{{ strName(item) }}</th>
          <td>{{ item.material }}</td>
          <td>{{ item.width }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table__second">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Ширина</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in pipes"
          @click="getPipeData(item)"
          :class="{ selected: item === selectPipe }"
        >
          <th>{{ item.name }}</th>
          <td>{{ item.width }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p v-else class="result-table__help">Начните искать...</p>

  <CalculateInfo
    :selectItem="selectItem"
    :selectPipe="selectPipe"
    :dataObject="{ ...dataObject, material: selectItem.material }"
    @buyItem="buyItem"
    v-if="dataObject && filterInfoData.length"
  />
</template>

<script>
import { computed, defineComponent, provide, ref, watch } from "vue";
import CalculateInfo from "@/components/ResultTable/CalculateInfo";

export default defineComponent({
  name: "ResultTable",
  components: {
    CalculateInfo,
  },
  props: ["filterInfoData", "dataObject", "infoData"],
  emits: ["buyItem", "selectItemPipe"],
  setup(props, { emit }) {
    const selectItem = ref(null);
    const selectPipe = ref(null);
    const selectMaterialRow = ref(null);
    const selectPipeRow = ref(null);

    const strName = computed(() => {
      return (item) => item.name.split(" ").slice(0, 2).join(" ");
    });

    const getInfoData = (item) => {
      selectItem.value = item;
      selectMaterialRow.value = item;
      emit("selectItemPipe", {
        selectItem: item,
        selectPipe: selectPipe.value,
      });
    };

    const getPipeData = (item) => {
      selectPipe.value = item;
      selectPipeRow.value = item;
      emit("selectItemPipe", {
        selectItem: selectItem.value,
        selectPipe: item,
      });
    };

    const pipes = computed(() => {
      return props.infoData.filter((item) => item.type === "pipe");
    });

    const buyItem = (payload) => {
      emit("buyItem", payload);
    };

    return {
      strName,
      getInfoData,
      getPipeData,
      selectItem,
      selectPipe,
      pipes,
      buyItem,
    };
  },
});
</script>

<style scoped lang="scss">
.result-table__all {
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-bottom: 20px;
  .table {
    &__first {
      width: 150%;
    }
    &__second {
      align-self: start;
    }
  }
}

.result-table__help {
  font-size: 18px;
}

.result-table__materials {
  font-size: 18px;
  color: red;
  display: inline-block;
  margin-bottom: 15px;
}

table {
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
      &:nth-child(even) {
        background-color: #e9ecef;
      }
      &.selected {
        background-color: rgba(0, 150, 105, 0.3);
      }
    }
  }
}
</style>
