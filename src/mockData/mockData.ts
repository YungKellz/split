import { EMentionType, ICheck, IParty, IPerson } from '../typings';

// Id анонимного участника
export const anonId = 'anon_id';

// Валюта
export const currency = '₽';

// Люди упомянутые в вечеринке
const persons: IPerson[] = [
  {
    id: '1_andrey',
    name: 'Андрей',
    paysFor: ['6'],
    userId: '1337v',
  },
  {
    id: '2_nikita',
    name: 'Никита',
    paysFor: ['7'],
  },
  {
    id: '3_danila',
    name: 'Данила',
    paysFor: ['5'],
  },
  {
    id: '4_george',
    name: 'Гоша',
    // paysFor: ['8'],
  },
  {
    id: '5',
    name: 'Даша',
  },
  {
    id: '6',
    name: 'Вика',
  },
  {
    id: '7',
    name: 'Аня',
  },
  {
    id: '8',
    name: 'Саша',
  },
];

const checks: ICheck[] = [
  {
    id: 'check_1',
    personsPaid: [
      { personId: '1_andrey', amount: 30000, description: 'за икру' },
      { personId: '1_andrey', amount: 10000 },
      { personId: '2_nikita', amount: 1600 },
      { personId: '3_danila', amount: 4400 },
      { personId: '4_george', amount: 3200 },
    ],
    personsMentioned: ['1_andrey', '2_nikita', '3_danila', '4_george'],
    mentionType: EMentionType.include,
  },
  {
    id: 'check_2',
    title: 'За пиво',
    personsPaid: [{ personId: '1_andrey', amount: 8800 }],
    personsMentioned: ['7', '5'],
    mentionType: EMentionType.exclude,
  },
  {
    id: 'check_3',
    title: 'За мясо',
    personsPaid: [{ personId: '4_george', amount: 3600 }],
    personsMentioned: [],
    mentionType: EMentionType.everybody,
  },
];

export const party: IParty = {
  id: 'party_1',
  partyPersonsAmount: 10,
  persons,
  checks,
};
