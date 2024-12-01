<template>
  <div class="register">
    <h1>Crear cuenta</h1>

    <form class="ui form">
      <div class="field">
        <input type="text" placeholder="Correo electrónico" />
      </div>
      <div class="field">
        <input type="password" placeholder="Contraseña" />
      </div>
      <div class="field">
        <input type="password" placeholder="Repetir contraseña" />
      </div>
      <button type="submit" class="ui button positive fluid">Registrar</button>
    </form>

    <p @click="changeForm">Iniciar sesión</p>
  </div>
</template>

<script>
export default {
  name: "Register",
  props: {
    changeForm: Function,
  },
};
</script>

<style lang="scss" scoped>
.register {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 30px -5px rgba(0, 0, 0, 0.45);
  width: 400px;
  border-radius: 10px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  form {
    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }

  p {
    text-align: center;
    margin-top: 30px;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
</style>
