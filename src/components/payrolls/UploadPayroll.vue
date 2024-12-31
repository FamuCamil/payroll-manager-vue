<template>
  <div class="upload-payroll">
    <button class="ui button primary" @click="showCloseForm">
      Nueva nómina
    </button>

    <form
      class="ui form upload-payroll__form"
      :class="{ open: showForm }"
      @submit.prevent="handlerSubmit"
    >
      <div class="field">
        <label for="file" class="ui icon button">
          <i class="file icon" />
          Seleccionar nómina
          <span v-if="file">({{ file.name }})</span>
        </label>
        <input
          type="file"
          id="file"
          style="display: none"
          @change="uploadFile"
        />
      </div>
      <div class="field">
        <div class="ui calendar">
          <div class="ui input left icon">
            <input type="date" @change="changeDate" :value="date" />
          </div>
        </div>
      </div>
      <button class="ui button positive">Subir nómina</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/utils/firebase";

export default {
  name: "UploadPayroll",
  setup() {
    let showForm = ref(false);
    let file = ref(null);
    let date = ref(null);
    let loading = ref(false);
    let error = ref(null);

    const showCloseForm = () => {
      showForm.value = !showForm.value;
    };

    const uploadFile = (e) => {
      const fileTemp = e.target.files[0];
      error.value = null;

      if (fileTemp.type === "application/pdf") {
        file.value = fileTemp;
      } else {
        error.value = "Fichero no válido";
      }
    };

    const handlerSubmit = () => {
      // console.log("subiendo nomina");
      if (file.value && date.value) {
        loading.value = true;
        try {
          const nameFile = uuidv4();
        } catch (error) {
          console.log(error);
        }
      }
    };

    const changeDate = (e) => {
      date.value = e.target.value;
    };

    return {
      showForm,
      showCloseForm,
      file,
      date,
      loading,
      error,
      uploadFile,
      handlerSubmit,
      changeDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload-payroll {
  > .ui.button.primary {
    margin-bottom: 30px;
  }
  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;

    &.open {
      height: 200px;
    }
  }
}
</style>
