<template>
  <form class="ui form change-password" @submit.prevent="onChangePassword">
    <div class="three fields">
      <div class="field">
        <input
          type="password"
          placeholder="Contraseña actual"
          v-model="formData.password"
          :class="{ error: formError.password }"
        />
      </div>
      <div class="field">
        <input
          type="password"
          placeholder="Nueva contraseña"
          v-model="formData.newPassword"
          :class="{ error: formError.newPassword }"
        />
      </div>
      <div class="field">
        <input
          type="password"
          placeholder="Repte la nueva contraseña"
          v-model="formData.newPasswordRepeat"
          :class="{ error: formError.newPasswordRepeat }"
        />
      </div>
    </div>
    <p v-if="messageError">{{ messageError }}</p>
    <button class="ui button primary" type="submit" :class="{ loading }">
      Actualizar
    </button>
  </form>
</template>

<script>
import { reauthenticate } from "@/utils/firebaseFunctions";
import { auth } from "@/utils/firebase";
import { ref } from "vue";
import * as Yup from "yup";
import { updatePassword } from "firebase/auth";

export default {
  name: "ChangePassword",
  setup() {
    let formData = {};
    let formError = ref({});
    let loading = ref(false);
    let messageError = ref("");

    const schemaForm = Yup.object().shape({
      password: Yup.string().required(true),
      newPassword: Yup.string().required(true),
      newPasswordRepeat: Yup.string()
        .required(true)
        .oneOf([Yup.ref("newPassword")], true),
    });

    const onChangePassword = async () => {
      formError.value = {};
      messageError.value = "";
      loading.value = true;

      try {
        await schemaForm.validate(formData, { abortEarly: false });
        try {
          const { password, newPassword } = formData;
          await reauthenticate(password);
          await updatePassword(auth.currentUser, newPassword); //video 94
          auth.signOut();
        } catch (error) {
          console.log(error);
          messageError.value = error.message;
        }
      } catch (err) {
        err.inner.forEach((error) => {
          formError.value[error.path] = error.message;
        });
      }
      loading.value = false;
    };

    return { onChangePassword, formData, formError, loading, messageError };
  },
};
</script>

<style lang="scss" scoped>
.ui.form.change-password {
  text-align: center;

  input.error {
    border-color: #faa;
    background-color: #ffeded;
  }

  .ui.button {
    margin: 20px 0 0 0;
  }
}
</style>
