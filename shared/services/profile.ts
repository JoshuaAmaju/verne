import {http} from '@shared/http';
import {Info} from '@shared/stores/auth';

export async function save_profile(body: Partial<Info>): Promise<Info> {
  const {data} = await http.put('/user/update/profile', body);
  return data;
}
