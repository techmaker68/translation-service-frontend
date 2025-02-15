import apiService from "@/services/apiService";

export const gettranslations = async () => {
  return await apiService.get("/translations");
};

export const savetranslations = async (data) => {
  return await apiService.post("/translations", data);
};

export const gettranslation = async (id) => {
  return await apiService.get(`/translations/${id}`);
};

export const updatetranslations = async (id, data) => {
  return await apiService.put(`/translations/${id}`, data);
};
export const deletetranslations = async (id) => {
  return await apiService.delete(`/translations/${id}`);
};
export const searchTranslations = async (data) => {
  return await apiService.post("/translations/search", data);
};
export const exportTranslations = async () => {
  return await apiService.get("/translations/export");
};