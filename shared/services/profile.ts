import {http} from '@shared/http';
import {Info} from '@shared/stores/auth';

export async function save_profile({
  type,
  ...body
}: {
  type: string;
} & Partial<Info>): Promise<Info> {
  const {data} = await http.put('/user/update/profile', {...body, role: type});
  return data;
}
