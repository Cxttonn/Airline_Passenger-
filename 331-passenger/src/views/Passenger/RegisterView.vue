<script setup lang="ts">
import { toRefs } from 'vue';
import { type Passenger } from '@/types';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
const props = defineProps <{
    passenger: Passenger
    id: String
}>()
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const {passenger} = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
    store.updateMessage('You are successfully registered for' + props.passenger.title)
    setTimeout(() => {
        store.resetMessage()
    }, 3000)
    router.push({name: 'event-detail-view', params: {id: props.passenger.id}})
}
</script>
<template>
        <p>Register event here</p>
        <button @click="register">Register</button>
</template>