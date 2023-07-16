import { BASE_URL } from './env.constants';

export async function getService(uri: string) {
  const response = await fetch(`${BASE_URL}${uri}`);

  return await response.json();
}
