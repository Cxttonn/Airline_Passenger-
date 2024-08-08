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

