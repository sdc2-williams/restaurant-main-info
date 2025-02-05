import http from 'k6/http';
import { sleep } from 'k6';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const options = {
  vus: 50,
  duration: '2m',
  rps: 1000,
};

export default function () {
  http.get(`http://localhost:2000/api/restaurant/${randomInt(9000000, 10000000)}/`);
}
