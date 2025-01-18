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
      <button class="ui button positive" :class="{ loading }">
        Subir nómina
      </button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { auth, db, addDoc, collection } from "@/utils/firebase";
import { supabase } from "@/utils/supabase";

export default {
  name: "UploadPayroll",
  props: {
    getPayrolls: Function,
  },
  setup(props) {
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

    const handlerSubmit = async () => {
      if (file.value && date.value) {
        loading.value = true;
        try {
          const nameFile = uuidv4();
          const idUser = auth.currentUser.uid;
          //! ruta de donde se guardará el archivo: idUsuario/nombreArchivo.pdf
          const filePath = `${idUser}/${nameFile}.pdf`;

          await supabase.storage.from("payrolls").upload(filePath, file.value);

          const payrollUrl = await supabase.storage
            .from("payrolls")
            .getPublicUrl(filePath);

          await addDoc(collection(db, idUser), {
            payrollUrl: payrollUrl.data.publicUrl,
            date: new Date(date.value),
            dateString: date.value,
          });
          props.getPayrolls();
        } catch (error) {
          console.log(error);
        }
        loading.value = false;
        file.value = null;
        date.value = null;
        showForm.value = false;
        error.value = null;
        document.getElementById("file").value = "";
      } else {
        error.value = "Sube una nómina y selecciona una fecha";
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
