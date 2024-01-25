import React from 'react';
import { EMentionType, ICheck, IParty } from '../../typings';
import { getPersonInfo, getPersonsInfoInCheck } from '../../utils';
import styles from './styles.module.css';
import { currency } from '../../mockData';
import { SummaryTable } from '../SummaryTable';

interface ILocalCheck {
  check: ICheck;
  party: Pick<IParty, 'persons' | 'partyPersonsAmount'>; // TODO: Прокинуть через стор
  index: number;
}

/** Карточка чека */
export function Check({ check, party, index }: ILocalCheck) {
  const { title, personsPaid = [], personsMentioned, mentionType } = check;
  const { persons = [], partyPersonsAmount } = party;
  // заголовок чека по умолчанию
  const defaultTitle = `Чек №${index + 1}`;

  // сумма за чек
  const summary = personsPaid.reduce(
    (previousValue, { amount }) => previousValue + (amount || 0),
    0,
  );
  // информация о количестве участников в чеке и их список имен
  const personsInfo = getPersonsInfoInCheck(
    mentionType,
    personsMentioned,
    partyPersonsAmount,
    persons,
  );
  return (
    <div className={styles.checkContainer}>
      <span className={styles.title}>{title || defaultTitle}</span>
      <span>
        Сумма: {summary}
        {currency}
      </span>
      <span>
        Метод формирования чека:{' '}
        {mentionType === EMentionType.everybody
          ? 'Все'
          : mentionType === EMentionType.include
            ? `Только ${personsInfo.personsNamesList}`
            : `Все кроме ${personsInfo.personsExcludedNamesList}`}
      </span>
      {personsInfo.personsAmount !== partyPersonsAmount ? (
        <span>
          Участвуют {personsInfo.personsAmount}/{partyPersonsAmount} ({personsInfo.personsNamesList}
          )
        </span>
      ) : null}

      {personsPaid.map(({ personId, amount, description }, index) => {
        const personInfo = getPersonInfo(persons, personId);
        return (
          <div key={`person_paid_id_${personInfo.id}_${index}`}>
            👳🏻‍♂️ {personInfo.name} вкинул {amount}
            {currency}
            {description ? ` (${description})` : undefined}
          </div>
        );
      })}
      <SummaryTable partyPersonsAmount={partyPersonsAmount} persons={persons} checks={check} />
    </div>
  );
}
