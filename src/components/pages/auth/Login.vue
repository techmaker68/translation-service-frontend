<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow-lg w-100">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <span class="text-center mb-4"
        >Doesn't have an account? <router-link to="/register"> Register </router-link>
      </span>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/auth";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/Index";
import { mapStores } from "pinia";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await login({
          email: this.email,
          password: this.password,
        });
        this.authStore.login(response.data);
        this.$router.push("/translations");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    },
  },
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
}
.card {
  border-radius: 10px;
}
</style>
