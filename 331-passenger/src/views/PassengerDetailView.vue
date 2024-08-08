<script setup lang="ts">
import {ref, onMounted, defineProps} from 'vue'
import { type Passenger } from '@/types';
import { useRoute } from 'vue-router';
import PassengerService from '@/services/PassengerService'

const route = useRoute();
const passenger = ref<Passenger | null>(null)
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
onMounted(() => {
    PassengerService.getPassenger(parseInt(props.id))
    .then((response) => {
        passenger.value = response.data
    })
    .catch((error) => {
        console.error('There was an error!' , error)
    })
})
</script>
<!-- <script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import PassengerService from '@/services/PassengerService';
import { useRoute } from 'vue-router';
import { type Passenger } from '@/types';

const route = useRoute();
const passenger = ref<Passenger | null>(null);

const fetchPassenger = async () => {
  try {
    const response = await PassengerService.getPassenger(parseInt(route.params.id as string));
    passenger.value = response.data;
  } catch (error) {
    console.error('Error fetching passenger details:', error);
  }
};

onMounted(fetchPassenger);
</script>

<template>
    <div v-if="passenger">
      <h1>{{ passenger.name }}</h1>
      <p>Trips: {{ passenger.trips }}</p>
      <div v-if="passenger.airline.length">
        <h2>Airlines:</h2>
        <div v-for="airline in passenger.airline" :key="airline._id">
          <RouterLink :to="{ name: 'airline-detail-view', params: { id: airline._id } }">
            {{ airline.name }}
          </RouterLink>
        </div>
      </div>
      <router-view />
    </div>
  </template> -->

  <!-- <template>
    <div v-if="passenger">
      <h1>{{ passenger.name }}</h1>
      <p>Trips: {{ passenger.trips }}</p>
      <ul v-if="passenger.airline.length">
        <li v-for="airline in passenger.airline" :key="airline._id">
          <RouterLink :to="{ name: 'airline-detail-view', params: { id: airline._id } }">
            {{ airline.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import PassengerService from '@/services/PassengerService';
  import { type Passenger } from '@/types';
  
  const route = useRoute();
  const passenger = ref<Passenger | null>(null);
  
  onMounted(async () => {
    const id = route.params.id;
    try {
      const response = await PassengerService.getPassenger(parseInt(id as string));
      passenger.value = response.data;
    } catch (error) {
      console.error('Error fetching passenger details:', error);
    }
  });
  </script> -->



  