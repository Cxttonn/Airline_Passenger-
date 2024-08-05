<script setup lang="ts">
import PassengerCard from '@/components/PassengerCard.vue';
import { type Passenger } from '@/types';
import { ref, computed, watch, onMounted,watchEffect } from 'vue';
import PassengerService from '@/services/PassengerService';
import { useRoute, useRouter } from 'vue-router';
import nProgress from 'nprogress'

// Initialize route and router
const route = useRoute();
const router = useRouter();

// Define state variables
const passengers = ref<Passenger[] | null>(null);
const totalPassengers = ref(0);
const pageSize = ref(parseInt(route.query.pageSize as string) || 2); // Default to 2 if not provided
const page = ref(parseInt(route.query.page as string) || 1);

// Compute whether there is a next page
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassengers.value / pageSize.value);
//   const totalPages = Math.ceil(totalPassengers.value / 3);
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
      PassengerService.getPassengers(pageSize, page.value)
        .then((response) => {
          passengers.value = response.data
          totalPassengers.value = response.headers['x-total-count']
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
const fetchPassengers = async () => {
  try {
    const response = await PassengerService.getPassengers(pageSize.value, page.value);
    passengers.value = response.data;
    totalPassengers.value = parseInt(response.headers['x-total-count']);
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
    fetchPassengers();
  }
);

// Fetch events on component mount
onMounted(fetchPassengers);
</script>

<template>
  <h1>Passengers</h1>
  <div class="passenger">
    <PassengerCard v-for="passenger in passengers" :key="passenger.passport_number" :passenger="passenger" />
    <!-- <EventSummary v-for="passenger in passengers" :key="event.id" :event="event" /> -->
  </div>
  <div class="pagination">
    <RouterLink
      id="page-prev"
      :to="{ name: 'passenger-list-view', query: { pageSize: pageSize, page: page - 1 } }"
      rel="prev"
      v-if="page > 1"
    >
      &#60; Prev Page
    </RouterLink>
    <RouterLink
      id="page-next"
      :to="{ name: 'passenger-list-view', query: { pageSize: pageSize, page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
    >
      Next Page &#62;
    </RouterLink>
  </div>
</template>

<style scoped>
.passenger {
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
