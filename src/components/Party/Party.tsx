import React from 'react';
import { IParty } from '../../typings';

import styles from './styles.module.css';
import { Check } from '../Check';
import { SummaryTable } from '../SummaryTable';
import { getPartySummary, getAnonAmount, getPersonInfo } from '../../utils';

interface ILocalParty extends IParty {}

export function Party({ partyPersonsAmount, checks, persons, title }: ILocalParty) {
  const anonString = getAnonAmount(partyPersonsAmount, persons.length);
  return (
    <div className={styles.partyContainer}>
      <h1>{title || 'Вечеринка'}</h1>
      <span>Приняло участие {partyPersonsAmount} человек</span>
      <span>
        {persons.map(({ name }) => name).join(', ')}
        {anonString ? `, ${anonString}` : ''}
      </span>
      <span>
        Взаимосвязи: <br />
        <ul>
          {persons
            .filter(({ paysFor }) => paysFor)
            .map(({ name, paysFor, id }) => (
              <li key={`pays_for_by_${id}`}>
                {name} платит за{' '}
                {(paysFor || []).map((id) => getPersonInfo(persons, id).name).join(', ')}
              </li>
            ))}
        </ul>
      </span>
      <span>Потратили {getPartySummary(checks)}</span>
      <div>
        Чеки были следующие{' '}
        {checks.map((check, index) => (
          <Check
            check={check}
            party={{ partyPersonsAmount, persons }}
            index={index}
            key={`check_id_${check.id}`}
          />
        ))}
      </div>
      <SummaryTable partyPersonsAmount={partyPersonsAmount} checks={checks} persons={persons} />
    </div>
  );
}
