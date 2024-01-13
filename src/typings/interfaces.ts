import { EMentionType } from './enums';
import { ID, USER_ID } from './types';

/** Человек учавствующий в вечеринке */
export interface IPerson {
  id: ID;
  name: string;
  paysFor?: string[];
  userId?: USER_ID;
}

/** Человек и то сколько он заплатил */
export interface IPersonPaid {
  personId: ID;
  amount: number;
  description?: string;
}

/** Чек */
export interface ICheck {
  id: ID;
  personsPaid: IPersonPaid[];
  title?: string;
  // id "упомянутых" людей в чеке; один и тот же человек может быть упомянут несколько раз
  personsMentioned: ID[];
  // упомянутые люди участвуют в чеке или нет ИЛИ участвуют все из вечеринки
  mentionType: EMentionType;
}

/** Вечеринка */
export interface IParty {
  id: ID;
  partyPersonsAmount: number;
  persons: IPerson[];
  checks: ICheck[];
  title?: string;
}
