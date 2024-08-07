<script setup lang="ts">
import { usePassengerStore } from '@/stores/passenger'
import { storeToRefs } from 'pinia';

const store = usePassengerStore()
const {passenger} = storeToRefs(store)

</script>
<template>
    <div v-if="passenger">
        <h1>{{ passenger?.name }}</h1>
        <nav>
            <RouterLink :to="{name: 'passenger-detail-view'}">Details</RouterLink> |
            <RouterLink :to="{name: 'passenger-register-view'}">Register</RouterLink> |
            <RouterLink :to="{name: 'passenger-edit-view'}">Edit</RouterLink>
        </nav>
        <RouterView :passenger="passenger" />
    </div>
</template>