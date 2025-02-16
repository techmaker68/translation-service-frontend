<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Translations</h2>
      <div>
        <button @click="logoutUser" class="btn btn-danger me-2">Logout</button>
        <button @click="showForm" class="btn btn-primary me-2">
          Add New Translation
        </button>
        <button @click="exportJsonData" class="btn btn-primary">
          Export
        </button>
      </div>
    </div>

    <!-- Search Inputs -->
    <div class="d-flex gap-2 align-items-center mb-3">
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        placeholder="Search by key, content, or tags"
        @keyup.enter="searchTranslations"
      />
      <button @click="searchTranslations" class="btn btn-primary">Search</button>
      <button @click="clearSearch" class="btn btn-secondary">Clear</button>
    </div>

    <article-form
      v-if="showArticleForm"
      @close="hideForm"
      @submit="fetchTranslations"
      :currentArticle="currentArticle"
    ></article-form>

    <!-- Translation List -->
    <ul class="list-group">
      <li v-for="translation in translations" :key="translation.id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <p><strong>Language:</strong> {{ translation.lang.name }}</p>
            <p><strong>Key:</strong> {{ translation.key }}</p>
            <p><strong>Content:</strong> {{ translation.content }}</p>
            <p>
              <strong>Created date:</strong> {{ new Date(translation?.created_at) }}
            </p>
            <div v-if="translation.tags && translation.tags.length">
              <p><strong>Tags:</strong></p>
              <ul>
                <li v-for="(tag, index) in translation.tags" :key="index">
                  {{ tag }}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button @click="editTranslation(translation)" class="btn btn-warning me-2">
              Edit
            </button>
            <button @click="deleteTranslation(translation.id)" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <!-- Previous Button -->
        <li class="page-item" :class="{ disabled: !pagination.prev }">
          <button class="page-link" @click="fetchTranslations(pagination.prev)" :disabled="!pagination.prev">
             Previous
          </button>
        </li>

        <!-- Page Numbers -->
        <li
          v-for="page in pagination.links"
          :key="page.label"
          class="page-item"
          :class="{ active: page.active, disabled: !page.url }"
        >
          <button class="page-link" @click="fetchTranslations(page.url)" v-if="page.url">
            {{ page.label }}
          </button>
          <span class="page-link" v-else>{{ page.label }}</span>
        </li>

        <!-- Next Button -->
        <li class="page-item" :class="{ disabled: !pagination.next }">
          <button class="page-link" @click="fetchTranslations(pagination.next)" :disabled="!pagination.next">
            Next 
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ArticleForm from "./ArticleForm.vue";
import {
  gettranslations,
  searchTranslations,
  deletetranslations,
  exportTranslations
} from "@/api/translations";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/Index";
import { mapStores } from "pinia";

export default {
  components: {
    ArticleForm
  },
  data() {
    return {
      translations: [],
      showArticleForm: false,
      currentArticle: null,
      searchQuery: "",
      pagination: {
        prev: null,
        next: null,
        links: []
      }
    };
  },
  methods: {
    async fetchTranslations(url = "/translations") {
      try {
        this.currentArticle = null;

        // Fetch translations with pagination
        const response = this.searchQuery
          ? await searchTranslations({ query: this.searchQuery })
          : await gettranslations(url);

        this.translations = response.data.data;
        this.pagination.prev = response.data.links.prev;
        this.pagination.next = response.data.links.next;
        this.pagination.links = response.data.meta.links;
      } catch (error) {
        console.error("Failed to fetch translations:", error);
      }
    },
    async deleteTranslation(id) {
      try {
        await deletetranslations(id);
        toast("Record Deleted Successfully");
        this.fetchTranslations();
      } catch (error) {
        console.error("Failed to delete translation:", error);
      }
    },
    async exportJsonData() {
      try {
        const response = await exportTranslations();
        const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (error) {
        console.error("Failed to export translations:", error);
      }
    },
    showForm() {
      this.showArticleForm = true;
    },
    hideForm() {
      this.showArticleForm = false;
    },
    editTranslation(article) {
      this.currentArticle = article;
      this.showForm();
    },
    logoutUser() {
      this.authStore.logout();
      this.$router.push("/");
    },
    searchTranslations() {
      this.fetchTranslations(); // Fetch filtered data from API
    },
    clearSearch() {
      this.searchQuery = "";
      this.fetchTranslations();
    },
  

  },
  created() {
    this.fetchTranslations();
  },
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.list-group-item {
  border: none;
  border-bottom: 1px solid #ddd;
}

.pagination .page-link {
  cursor: pointer;
}
</style>
