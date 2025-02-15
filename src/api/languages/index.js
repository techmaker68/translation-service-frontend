import apiService from "@/services/apiService";

export const getlanguages = async () => {
  return await apiService.get("/language");
};

export const savelanguage = async (data) => {
  return await apiService.post("/language", data);
};

export const gettranslation = async (id) => {
  return await apiService.get(`/language/${id}`);
};

export const updatelanguage = async (id, data) => {
  return await apiService.put(`/language/${id}`, data);
};
export const deletelanguage = async (id) => {
  return await apiService.delete(`/language/${id}`);
};
