import { IPerson } from '../typings';
import { anonId } from '../mockData';

export const getPersonInfo = (
  persons: IPerson[] | null | undefined,
  personId: string | null | undefined,
): IPerson => ({
  id: 'not_fount',
  name: 'Not found',
  ...(persons?.find(({ id }) => id === personId) ||
    (personId === anonId ? { id: anonId, name: 'Анонимус' } : {})),
});
