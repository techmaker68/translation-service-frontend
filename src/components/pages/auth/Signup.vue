<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow-lg w-100">
      <h2 class="text-center mb-4">Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="name"
            required
          />
          <span class="text text-danger text-center mb-4" v-if="error.name">
            {{ error.name[0] }}
          </span>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
          />
          <span class="text text-danger text-center mb-4" v-if="error.email">
            {{ error.email[0] }}
          </span>
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
          <span class="text text-danger text-center mb-4" v-if="error.password">
            {{ error.password[0] }}
          </span>
        </div>
        <div class="mb-3">
          <label for="password_confirmation" class="form-label"
            >Confirm Password:</label
          >
          <input
            type="password"
            class="form-control"
            id="password_confirmation"
            v-model="password_confirmation"
            required
          />
          <span
            class="text text-danger text-center mb-4"
            v-if="error.confirm_password"
          >
            {{ error.confirm_password[0] }}
          </span>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
      </form>
      <span class="text-center mb-4"
        >Already have an account?
        <router-link to="/"> Signin </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/auth";
import { useAuthStore } from "@/stores/Index";
import { toast } from "vue3-toastify";

export default {
  setup() {
    const authStore = useAuthStore();
    const handleLogin = async (data) => {
      authStore.login(data);
    };

    return { handleLogin };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      error: [],
    };
  },
  methods: {
    async signup() {
      try {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
          confirm_password: this.password_confirmation,
        };
        const response = await register(data);
        this.handleLogin(response.data.data);
        this.$router.push("/articles");
      } catch (err) {
        this.error = err.response.data.errors;
        console.log("err", err.response.data.errors);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
.card {
  border-radius: 10px;
}
</style>
