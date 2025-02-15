<template>
  <div class="container mt-5">
    <div class="card p-4 shadow-lg w-100 mx-auto">
      <h2 class="text-center mb-4">
        {{ currentArticle ? "Edit" : "Add" }} Translation
      </h2>
      <form @submit.prevent="submitTranslation">

        <!-- Language Selection -->
        <div class="mb-3">
          <label for="language_id" class="form-label">Language:</label>
          <select class="form-control" v-model="language_id" required>
            <option value="" disabled>Select Language</option>
            <option v-for="language in languages" :key="language.id" :value="language.id">
              {{ language.name }}
            </option>
          </select>
        </div>
        <!-- Translation Key -->
        <div class="mb-3">
          <label for="translation_key" class="form-label">Translation Key:</label>
          <input type="text" class="form-control" id="translation_key" v-model="translation_key" required />
        </div>

        <!-- Content -->
        <div class="mb-3">
          <label for="content" class="form-label">Content:</label>
          <textarea class="form-control" id="content" v-model="content" required></textarea>
        </div>

        <!-- Tags -->
        <div class="mb-3">
          <label for="tags" class="form-label">Tags (comma-separated):</label>
          <input type="text" class="form-control" id="tags" v-model="tags" required />
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">
            {{ currentArticle ? "Update" : "Create" }}
          </button>
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { savetranslations, updatetranslations } from "@/api/translations";
import { getlanguages } from "@/api/languages";
import { toast } from "vue3-toastify";

export default {
  props: ["currentArticle"],
  emits: ["submit", "close"],
  data() {
    return {
      id: this.currentArticle ? this.currentArticle.id : "",
      translation_key: this.currentArticle ? this.currentArticle.key : "",
      language_id: this.currentArticle ? this.currentArticle.language_id : "",
      content: this.currentArticle ? this.currentArticle.content : "",
      tags: this.currentArticle ? this.currentArticle.tags : "",
      languages: []
    };
  },
  methods: {
    async submitTranslation() {
      const translationData = {
        translation_key: this.translation_key,
        language_id: this.language_id,
        content: this.content,
        tags: this.tags
      };

      try {
        if (this.currentArticle) {
          await updatetranslations(this.id, translationData);
          toast.success("Translation Updated Successfully!");
        } else {
          await savetranslations(translationData);
          toast.success("Translation Added Successfully!");
        }
        this.$emit("submit");
        this.$emit("close");
      } catch (error) {
        console.error("Failed to submit translation:", error);
      }
    },
    async fetchLanguages() {
      try {
        const response = await getlanguages();
        this.languages = response.data.data;
      } catch (error) {
        console.error("Failed to fetch languages:", error);
      }
    }
  },
  created() {
    this.fetchLanguages();
  }
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
