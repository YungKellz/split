import { EMentionType, ICheck, IParty } from '../typings';
import { getPersonInfo } from './getPersonInfo';
import { getAnonAmount } from './getAnonAmount';

/** Возвращает количество людей в чеке, а также список их имен */
export const getPersonsInfoInCheck = (
  mentionType: ICheck['mentionType'],
  personsMentioned: ICheck['personsMentioned'],
  partyPersonsAmount: IParty['partyPersonsAmount'],
  persons: IParty['persons'],
): { personsAmount: number; personsNamesList: string; personsExcludedNamesList?: string } => {
  switch (mentionType) {
    case EMentionType.everybody:
      return {
        personsAmount: partyPersonsAmount,
        personsNamesList: [
          ...persons.map(({ name }) => name),
          getAnonAmount(partyPersonsAmount, persons.length),
        ].join(', '),
      };
    case EMentionType.exclude:
      return {
        personsAmount: partyPersonsAmount - personsMentioned.length,
        personsNamesList: [
          ...persons.filter((p) => !personsMentioned.includes(p.id)).map(({ name }) => name),
          getAnonAmount(partyPersonsAmount, persons.length),
        ].join(', '),
        personsExcludedNamesList: personsMentioned
          .map((id) => getPersonInfo(persons, id).name)
          .join(', '),
      };
    case EMentionType.include:
      return {
        personsAmount: personsMentioned.length,
        personsNamesList: [
          ...persons.filter((p) => personsMentioned.includes(p.id)).map(({ name }) => name),
        ].join(', '),
      };
    default:
      return {
        personsAmount: 0,
        personsNamesList: '',
      };
  }
};
