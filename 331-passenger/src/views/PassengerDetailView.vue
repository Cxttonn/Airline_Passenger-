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
    PassengerService.getPassenger(props.id)
    .then((response) => {
        passenger.value = response.data
    })
    .catch((error) => {
        console.error('There was an error!' , error)
    })
})
</script>
<template>
    <div v-if="passenger">
        <!-- <h1>{{ passenger.name }}</h1> -->
        <h1>{{ passenger?.name }}</h1>
      <!-- <p>Trips: {{ passenger?.trips }}</p>
      <p v-if="passenger?.airline.length">Airline: {{ passenger.airline[0].name }}</p>
      <p v-if="passenger?.airline.length">Destination: {{ passenger.airline[0].head_quaters }}</p> -->
    </div>
</template>




  