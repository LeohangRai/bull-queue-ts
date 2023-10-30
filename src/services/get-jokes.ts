import axios from 'axios';
const JOKES_API =
  'https://v2.jokeapi.dev/joke/Programming?type=single&format=json';

export async function getRandomJokeFromApi() {
  try {
    const response = await axios.get(JOKES_API);
    if (response.status === 200) {
      return response?.data?.joke ? response.data.joke + '\n\n' : '';
    }
    return '';
  } catch (error) {
    return '';
  }
}
