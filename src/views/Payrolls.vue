<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>Mis nóminas</h1>
      <UploadPayroll :getPayrolls="getPayrolls" />
      <PayrollList :payrolls="payrolls" :getPayrolls="getPayrolls" />
      <!-- <div v-for="payroll in payrolls" :key="payroll.id">
        <p>Nomina: {{ payroll.id }} | Fecha: {{ payroll.dateString }}</p>
        <button class="ui button primary">Descargar</button>
      </div> -->
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth, db, collection } from "@/utils/firebase";
import { query, orderBy, getDocs } from "firebase/firestore";
import BasicLayout from "@/layouts/BasicLayout.vue";
import UploadPayroll from "@/components/payrolls/UploadPayroll.vue";
import PayrollList from "@/components/payrolls/PayrollList.vue";
export default {
  name: "Payrolls",
  components: {
    BasicLayout,
    UploadPayroll,
    PayrollList,
  },

  setup() {
    let payrolls = ref(null);
    const currentUser = auth.currentUser.uid;

    onMounted(() => {
      getPayrolls();
    });

    const getPayrolls = async () => {
      const q = query(collection(db, currentUser), orderBy("date", "desc"));
      const response = await getDocs(q);

      const result = [];

      response.forEach((doc) => {
        //console.log(doc.data());
        const data = doc.data();
        data.id = doc.id;
        result.push(data);
      });
      payrolls.value = result;
    };

    return { payrolls, getPayrolls };
  },
};
</script>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;
}
</style>
