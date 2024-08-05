<script setup lang="ts">
// import {ref, onMounted} from 'vue'
// import { type Event } from '@/types';
// import EventService from '@/services/EventService'
// import { useRouter } from 'vue-router';
// import { usePassengerStore } from '@/stores/passenger';
import { usePassengerStore } from '@/stores/passenger'
import { storeToRefs } from 'pinia';

// const event = ref<Event | null>(null)
// const props = defineProps({
//     id: {
//         type: String,
//         required: true
//     }
// })
// const router = useRouter()
const store = usePassengerStore()
const {passenger} = storeToRefs(store)

// onMounted(() => {
//     EventService.getEvent(parseInt(props.id))
//     .then((response) => {
//         event.value = response.data
//     })
//     .catch((error) => {
//         if (error.response && error.response.status === 404){
//         router.push({
//             name: '404-resource-view',
//             params: {resource: 'event'}
//         })
//     } else {
//         router.push({name: 'network-error-view'})
//     }
//     })
//     })

</script>
<template>
    <div v-if="passenger">
        <h1>{{ passenger.title }}</h1>
        <nav>
            <RouterLink :to="{name: 'passenger-detail-view'}">Details</RouterLink> |
            <RouterLink :to="{name: 'passenger-register-view'}">Register</RouterLink> |
            <RouterLink :to="{name: 'passenger-edit-view'}">Edit</RouterLink>
        </nav>
        <RouterView :passenger="passenger" />
    </div>
</template>