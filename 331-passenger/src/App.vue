<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore()
const {message} = storeToRefs(store)

const router = useRouter();
const route = useRoute();

const pageSize = ref(parseInt(route.query.pageSize as string) || 10);

const updatePageSize = () => {
  router.push({ name: 'event-list-view', query: { ...route.query, pageSize: pageSize.value, page: 1 } });
};

watch(
  () => route.query.pageSize,
  (newVal) => {
    pageSize.value = parseInt(newVal as string) || 10;
  }
);
</script>

<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
      <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
        <div class="pagination-controls">
          <label for="pageSize">Events per page:</label>
          <select id="pageSize" v-model="pageSize" @change="updatePageSize">
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.pagination-controls {
  margin-top: 20px;
}
h2{
  font-size: 20px;
}

@keyframes yellofade{
  from{
    background-color: yellow;
  }
  to{
    background-color: transparent;
  }
}
#flashMessage{
  animation: yellofade 3s ease-in-out;
}
</style>
