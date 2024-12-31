<template>
  <div class="account">
    <BasicLayout>
      <h1>Bienvenido a los ajustes</h1>

      <div class="account__section">
        <p class="title">
          Cambiar nombre
          <span v-if="user.displayName">({{ user.displayName }})</span>
        </p>
        <ChangeName></ChangeName>
      </div>
      <div class="account__section">
        <p class="title">
          Cambiar Email <span>({{ user.email }})</span>
        </p>
        <ChangeEmail></ChangeEmail>
      </div>
      <div class="account__section">
        <p class="title">
          Cambiar contraseña <span>({{ user.password }})</span>
        </p>
        <ChangePassword></ChangePassword>
      </div>
    </BasicLayout>
  </div>
</template>

<script>
import BasicLayout from "@/layouts/BasicLayout.vue";
import ChangeName from "@/components/account/ChangeName.vue";
import ChangeEmail from "@/components/account/ChangeEmail.vue";
import ChangePassword from "@/components/account/ChangePassword.vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Account",
  components: {
    BasicLayout,
    ChangeName,
    ChangeEmail,
    ChangePassword,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    return { user };
  },
};
</script>

<style lang="scss" scoped>
.account {
  h1 {
    margin: 50px 0;
    text-align: center;
  }
  &__section {
    position: relative;
    padding: 10px;
    border: 1px solid #16212b;
    padding-top: 25px;
    margin-top: 40px;

    .title {
      position: absolute;
      top: -12px;
      background-color: #16212b;
      color: #fff;
      padding: 2px 10px;
    }
  }
}
</style>
