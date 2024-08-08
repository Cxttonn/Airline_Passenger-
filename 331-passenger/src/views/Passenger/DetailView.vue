<!-- <script setup lang="ts">
import { toRefs, defineProps } from 'vue';
import { type Passenger } from '@/types';

const props = defineProps<{
    passenger: Passenger
    id: String
}>()
const {passenger} = toRefs(props)
</script>
<template>
    <p>{{ passenger.name }}</p>
</template>

 -->

 <script setup lang="ts">
import { defineProps } from 'vue';
import { type Passenger } from '@/types';

const props = defineProps<{
  passenger: Passenger
}>();

console.log('PassengerDetailView props:', props);
</script>

<template>
  <div v-if="props.passenger">
    <h1>{{ props.passenger.name }}</h1>
    <p>Trips: {{ props.passenger.trips }}</p>
    <ul v-if="props.passenger.airline.length">
      <li v-for="airline in props.passenger.airline" :key="airline._id">
        <router-link :to="{ name: 'airline-detail-view', params: { airlineId: airline._id } }">{{ airline.name }}</router-link>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
