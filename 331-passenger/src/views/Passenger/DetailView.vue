<script setup lang="ts">
import { toRefs, defineProps } from 'vue';
import { type Passenger } from '@/types';

const props = defineProps<{
    passenger: Passenger
    id: String
}>()
const {passenger} = toRefs(props)
</script>
<template>
    <p>Passport Number: {{ passenger.passport_number }}</p>
    <p>{{ passenger.departure_time }} on {{ passenger.departure_date }} @ {{ passenger.destination }}</p>
    <p>Flight: {{ passenger.flight }}    Seat Number: {{ passenger.seat_number }}</p>
</template>