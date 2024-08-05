<script setup lang="ts">
import {ref, onMounted, defineProps} from 'vue'
import { type Passenger } from '@/types';
import PassengerService from '@/services/PassengerService'
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
<template>
    <div v-if="passenger">
        <h1>{{ passenger.name }}</h1>
        <p>{{ passenger.departure_time }} on {{ passenger.departure_date }} @ {{ passenger.destination}}</p>
        <p>{{ passenger.flight }}</p>
    </div>
</template>