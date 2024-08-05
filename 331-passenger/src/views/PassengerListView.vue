<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import EventSummary from '@/components/EventSummary.vue';
import { type Event } from '@/types';
import { ref, computed, watch, onMounted,watchEffect } from 'vue';
import EventService from '@/services/EventService';
import { useRoute, useRouter } from 'vue-router';
import nProgress from 'nprogress'

// Initialize route and router
const route = useRoute();
const router = useRouter();

// Define state variables
const events = ref<Event[] | null>(null);
const totalEvents = ref(0);
const pageSize = ref(parseInt(route.query.pageSize as string) || 2); // Default to 2 if not provided
const page = ref(parseInt(route.query.page as string) || 1);

// Compute whether there is a next page
const hasNextPage = computed(() => {
  // const totalPages = Math.ceil(totalEvents.value / pageSize.value);
  const totalPages = Math.ceil(totalEvents.value / 3);
  return page.value < totalPages;
});

const props = defineProps({
    page: {
      type: Number,
      required: true
    }
  })
  
  onMounted(() => {
    watchEffect(() => {
      // events.value = null
      // nProgress.start()
      EventService.getEvents(3, page.value)
        .then((response) => {
          events.value = response.data
          totalEvents.value = response.headers['x-total-count']
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
        // .finally(() => {
        //   nProgress.done()
        // })
    })
  })

// Fetch events based on the current page size and page number
const fetchEvents = async () => {
  try {
    const response = await EventService.getEvents(pageSize.value, page.value);
    events.value = response.data;
    totalEvents.value = parseInt(response.headers['x-total-count']);
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }
};

// Watch route query parameters and update page size and page number
watch(
  [() => route.query.pageSize, () => route.query.page],
  ([newPageSize, newPage]) => {
    pageSize.value = parseInt(newPageSize as string) || 2;
    page.value = parseInt(newPage as string) || 1;
    fetchEvents();
  }
);

// Fetch events on component mount
onMounted(fetchEvents);
</script>

<template>
  <h1>Events For Good</h1>
  <div class="event">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <EventSummary v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="pagination">
    <RouterLink
      id="page-prev"
      :to="{ name: 'event-list-view', query: { pageSize: pageSize, page: page - 1 } }"
      rel="prev"
      v-if="page > 1"
    >
      &#60; Prev Page
    </RouterLink>
    <RouterLink
      id="page-next"
      :to="{ name: 'event-list-view', query: { pageSize: pageSize, page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
    >
      Next Page &#62;
    </RouterLink>
  </div>
</template>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center; /* Center the pagination buttons */
  gap: 100px; /* Add some space between the buttons */
  margin-top: 20px;
}

.pagination a {
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
