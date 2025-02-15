import { ref } from "vue";
import { defineStore } from "pinia";
import apiService from "@/services/apiService";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);

  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = (data) => {
    const token = data.token;
    localStorage.setItem("token", JSON.stringify(token));
    apiService.setAuthToken(token);
    setUser(data.user); 
  };

  const register = (data) => {
    const token = data.access_token;
    localStorage.setItem("token", JSON.stringify(token));
    apiService.setAuthToken(token);
    setUser(data.user); 
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    apiService.setAuthToken(null);
  };

  return { user, login, register, logout, setUser };
});
