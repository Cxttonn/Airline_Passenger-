<!-- <script setup lang="ts">
import PassengerCard from '@/components/PassengerCard.vue';
import { type Passenger } from '@/types';
import { ref, computed, watch, onMounted,watchEffect } from 'vue';
import PassengerService from '@/services/PassengerService';
import { useRoute, useRouter } from 'vue-router';
import nProgress from 'nprogress'


const route = useRoute();
const router = useRouter();


const passengers = ref<Passenger[] | null>(null);
const totalPassengers = ref(0);
const pageSize = ref(parseInt(route.query.pageSize as string) || 2); 
const page = ref(parseInt(route.query.page as string) || 1);


const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassengers.value / pageSize.value);
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
      passengers.value = null
      nProgress.start()
      PassengerService.getPassengers(3, page.value)
        .then((response) => {
          passengers.value = response.data
          totalPassengers.value = response.headers['x-total-count']
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
        .finally(() => {
          nProgress.done()
        })
    })
  })


const fetchPassengers = async () => {
  try {
    const response = await PassengerService.getPassengers(pageSize.value, page.value);
    passengers.value = response.data;
    totalPassengers.value = parseInt(response.headers['x-total-count']);
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }
}


watch(
  [() => route.query.pageSize, () => route.query.page],
  ([newPageSize, newPage]) => {
    pageSize.value = parseInt(newPageSize as string) || 2;
    page.value = parseInt(newPage as string) || 1;
    fetchPassengers();
  }
);


onMounted(fetchPassengers);
</script>

<template>
  <h1>Passengers</h1>
  <div class="passenger">
    <PassengerCard v-for="passenger in passengers" :key="passenger._id" :passenger="passenger" />
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
  justify-content: center;
  gap: 100px;
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
</style> -->

<template>
  <div>
    <h1>Passengers</h1>
    <div class="passenger">
      <div
        v-for="passenger in passengers"
        :key="passenger._id"
        class="passenger-item"
        @click="viewPassengerDetails(passenger._id)"
      >
        <PassengerCard :passenger="passenger" />
      </div>
    </div>
    <div class="pagination">
      <RouterLink
        v-if="page > 1"
        :to="{ name: 'passenger-list-view', query: { pageSize: pageSize, page: page - 1 } }"
      >
        &#60; Prev Page
      </RouterLink>
      <RouterLink
        v-if="hasNextPage"
        :to="{ name: 'passenger-list-view', query: { pageSize: pageSize, page: page + 1 } }"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import PassengerCard from '@/components/PassengerCard.vue';
import { ref, computed, watch, onMounted } from 'vue';
import PassengerService from '@/services/PassengerService';
import { useRoute, useRouter } from 'vue-router';
import nProgress from 'nprogress';

const route = useRoute();
const router = useRouter();

const passengers = ref([]);
const totalPassengers = ref(0);
const pageSize = ref(parseInt(route.query.pageSize as string) || 10);
const page = ref(parseInt(route.query.page as string) || 1);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassengers.value / pageSize.value);
  return page.value < totalPages;
});

const fetchPassengers = async () => {
  try {
    nProgress.start();
    const response = await PassengerService.getPassengers(pageSize.value, page.value);
    passengers.value = response.data.data; // Ensure you're accessing the correct property
    totalPassengers.value = response.data.totalPassengers; // Ensure you're accessing the correct property
  } catch (error) {
    console.error('Failed to fetch passengers:', error);
  } finally {
    nProgress.done();
  }
};

const viewPassengerDetails = (id: string) => {
  router.push({ name: 'passenger-detail-view', params: { id } });
};

watch(
  [() => route.query.pageSize, () => route.query.page],
  () => {
    pageSize.value = parseInt(route.query.pageSize as string) || 10;
    page.value = parseInt(route.query.page as string) || 1;
    fetchPassengers();
  }
);

onMounted(fetchPassengers);
</script>

<style scoped>
/* Add your styles here */
</style>
