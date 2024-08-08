// import type { PassengerState, Passenger } from "@/types";
// import { defineStore } from "pinia";
// export const usePassengerStore = defineStore('passenger', {
//     state: (): PassengerState => ({
//         passenger: null
//     }),
//     actions: {
//         setPassenger(passenger: Passenger): void{
//             this.passenger = passenger
//         }
//     }
// })

import { defineStore } from 'pinia';
import { ref } from 'vue';
import PassengerService from '@/services/PassengerService';
import { type Passenger } from '@/types';

export const usePassengerStore = defineStore('passenger', () => {
  const passenger = ref<Passenger | null>(null);

  const setPassenger = (data: Passenger) => {
    passenger.value = data;
  };

  return { passenger, setPassenger };
});
