<template>
  <div>
    <h1>Estamos en Home</h1>
    <button @click="logout">Cerrar sesión</button>
  </div>
</template>

<script>
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
// @ is an alias to /src
export default {
  name: "HomeView",
  setup() {
    const logout = () => {
      signOut(auth);
    };

    return { logout };
  },
};
</script>
