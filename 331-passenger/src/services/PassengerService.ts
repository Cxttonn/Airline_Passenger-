import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/cxttonn/mock-server',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getPassengers(perPage: number, page: number) {
    return apiClient.get(`/passengers?_limit=${perPage}&_page=${page}`);
  },
  getPassenger(id: number) {
    return apiClient.get(`/passengers/${id}`);
  },
};
