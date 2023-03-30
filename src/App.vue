<template>
  <main class="main container">
    <section class="data">
      <DataInput
        :infoData="infoData"
        :infoConfig="infoConfig"
        :numBuy="numBuy"
        :selectItemPipeValue="selectItemPipeValue"
        @openCart="openCart"
        @filterMaterials="filterMaterials"
        @getDataObject="getDataObject"
      />
    </section>
    <section class="result-table">
      <ResultTable
        :filterInfoData="filterInfoData"
        :dataObject="dataObject"
        :infoData="infoData"
        @buyItem="buyItem"
        @selectItemPipe="selectItemPipe"
      />
      <CustomModal
        v-model:show="show"
        :itemCart="itemCart"
        @deleteItemCart="deleteItemCart"
      ></CustomModal>
    </section>
  </main>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import getInfo from "@/composables/getInfo";

import DataInput from "@/components/DataInput/DataInput";
import ResultTable from "@/components/ResultTable/ResultTable";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    ResultTable,
    DataInput,
  },
  setup() {
    const infoData = ref([]);
    const infoConfig = ref([]);
    const filterInfoData = ref([]);
    const dataObject = ref();
    const show = ref(false);
    const itemCart = ref([]);
    const selectItemPipeValue = ref();

    const filterMaterials = (payload) => {
      filterInfoData.value = payload;
    };

    const getDataObject = (object) => {
      dataObject.value = object;
    };

    const diveData = async () => {
      infoData.value = await getInfo("data");
      infoConfig.value = await getInfo("config");
    };
    diveData();

    const openCart = (showModal) => {
      show.value = showModal;
    };

    const buyItem = (buyItem) => {
      itemCart.value.push([...buyItem]);
    };

    const numBuy = computed(() => {
      return itemCart.value.length;
    });

    const selectItemPipe = (payload) => {
      selectItemPipeValue.value = payload;
    };

    const deleteItemCart = (payload) => {
      itemCart.value.splice(itemCart.value.indexOf(payload), 1);
    };

    return {
      infoData,
      infoConfig,
      filterInfoData,
      filterMaterials,
      getDataObject,
      dataObject,
      buyItem,
      show,
      openCart,
      itemCart,
      numBuy,
      selectItemPipe,
      selectItemPipeValue,
      deleteItemCart,
    };
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  .data {
    //border: 1px solid red;
    padding: 20px 20px 0;
    height: 140px;
    margin-bottom: 40px;
  }
  .result-table {
    //border: 1px solid red;
    padding: 0 20px 20px;
  }
}
</style>
