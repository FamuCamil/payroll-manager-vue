<template>
  <div class="payroll-list">
    <p class="payroll-list__not-found" v-if="payrolls?.length === 0">
      No tienes ninguna nómina, añade una
    </p>
    <div
      class="payroll-list__payroll"
      v-for="payroll in payrolls"
      :key="payroll.id"
    >
      <p>{{ formatDate(payroll.dateString) }}</p>
      <div class="action">
        <a :href="payroll.payrollUrl" target="_blank" class="ui button positive"
          >Descargar</a
        >
        <button class="ui button red" @click="deletePayroll(payroll.id)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db, collection } from "@/utils/firebase";
import { query, getDocs, deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import "moment/locale/es";

export default {
  name: "PayrollList",
  props: {
    payrolls: Array,
    getPayrolls: Function,
  },
  setup(props) {
    const formatDate = (date) => {
      return moment(date).format("MMMM [del] YYYY");
    };

    const deletePayroll = async (id) => {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("Usuario no autenticado");

      try {
        const docRef = doc(db, userId, id);
        await deleteDoc(docRef);
        props.getPayrolls();
      } catch (error) {
        console.log(error);
      }
    };

    return { formatDate, deletePayroll };
  },
};
</script>

<style lang="scss" scoped>
.payroll-list {
  &__not-found {
    text-align: center;
    font-size: 20px;
  }

  &__payroll {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;

    p {
      margin: 0;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>
