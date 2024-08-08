<script setup lang="ts">
  import { ref, onMounted, defineProps } from 'vue';
  import PassengerService from '@/services/PassengerService';
  import { type Airline } from '@/types';
  
  const props = defineProps<{ id: string }>();
  const airline = ref<Airline | null>(null);
  
  const fetchAirline = async () => {
    try {
      const response = await PassengerService.getAirline(parseInt(props.id));
      airline.value = response.data;
    } catch (error) {
      console.error('Error fetching airline details:', error);
    }
  };
  
  onMounted(fetchAirline);
  </script>
  
  <template>
    <div v-if="airline">
      <h1>{{ airline.name }}</h1>
      <p>Country: {{ airline.country }}</p>
      <p>Slogan: {{ airline.slogan }}</p>
      <p>Headquarters: {{ airline.head_quaters }}</p>
      <img :src="airline.logo" alt="Logo" />
    </div>
  </template>