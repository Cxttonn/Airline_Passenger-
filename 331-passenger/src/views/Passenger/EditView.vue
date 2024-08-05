<script setup lang="ts">
import { toRefs } from 'vue';
import { type Event } from '@/types';

//ข้อ 1.6 lab04
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';



const props = defineProps <{
    event: Event
    id: String
}>()


//eslint-disable-next-line @typescript-eslint/no-unused-vars
const {event} = toRefs(props)

//ข้อ 1.6 lab04: Initialize router 
const router = useRouter();
const store = useMessageStore()
// define the edit function
const edit = () => {
   store.updateMessage('Data has been updated')
   setTimeout(() =>{
    store.resetMessage()
   },3000)
   router.push({name: 'event-detail-view', params: {id: props.event.id}})
}
</script>
<template>
        <p>Edit event here</p>
        <button @click="edit">Edit</button>
</template>


