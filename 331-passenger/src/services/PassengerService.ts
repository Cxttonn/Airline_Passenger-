import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getPassengers(pageSize: number, page: number) {
    return apiClient.get(`/passenger?page=${page}&size=${pageSize}`);
  },
  getPassenger(id: number) {
    return apiClient.get(`/passenger/${id}`);
  },
  // getPassenger(id: number) {
  //   return apiClient.get(`https://api.instantwebtools.net/v1/passenger/${id}`);
  // },
  getAirline(id: number) {
    return apiClient.get(`/airlines/${id}`);
  }
};
