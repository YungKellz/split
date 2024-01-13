import { EMentionType, ICheck, ID, IPerson } from '../typings';

import { anonId } from '../mockData';

interface IGetOweSchema {
  partyPersonsAmount: number;
  persons: Pick<IPerson, 'id' | 'paysFor'>[];
  checks: ICheck | ICheck[];
  isPayFor: boolean;
}

type TOweSchema = Record<ID, Record<ID, number>>;

/** Возвращает схему кто сколько кому должен, для указанного чека/чеков */
export const getOweSchema = ({
  partyPersonsAmount: partyPersonsAmountRaw,
  persons,
  checks: checksRaw,
  isPayFor,
}: IGetOweSchema): TOweSchema => {
  // схема долга где первый ключ этот тот кто должен, второй - кому должен, итоговое value - сколько
  // например если Никита должен Андрею 2000, а Андрей должен 1000 Даниле, то схема будет
  // oweSchema = {
  //   "nikita_id": { "andrey_id": 2000, "danila_id": 0 },
  //   "andrey_id": { "nikita_id": 0, "danila_id": 1000 },
  //   "danila_id": { "andrey_id": 0, "nikita_id": 0 },
  // };
  const oweSchema: TOweSchema = {};

  // получаем массив id указанных сотрудников для вечеринки
  const personsIds = persons.map(({ id }) => id);

  // на всякий случай сверяем участников и их количество
  const partyPersonsAmount =
    partyPersonsAmountRaw < personsIds.length ? personsIds.length : partyPersonsAmountRaw;

  // количество анонимных участников
  const anonCount = partyPersonsAmount - personsIds.length;

  // добавляем в массив участников анонимуса, который будет должен платить за всех анонимусов вечеринки
  const personsIdsWithAnon: ID[] = [...personsIds, ...(anonCount > 0 ? [anonId] : [])];

  // составляем схему связей всех со всеми
  personsIdsWithAnon.forEach((fromId) => {
    oweSchema[fromId] = {};
    personsIdsWithAnon.forEach((toId) => {
      if (fromId !== toId) {
        oweSchema[fromId][toId] = 0;
      }
    });
  });

  const checks: ICheck[] = Array.isArray(checksRaw) ? checksRaw : [checksRaw];

  checks.forEach((check) => {
    const { personsPaid, mentionType = EMentionType.exclude, personsMentioned = [] } = check;
    // id
    const checkPersonsPaidIds = Array.from(new Set(personsPaid.map(({ personId }) => personId)));

    // кто кому
    switch (mentionType) {
      // если в чеке в формате "Участвуют все с вечеринки"
      case EMentionType.everybody:
        personsPaid.forEach(({ personId: toId, amount }) => {
          personsIdsWithAnon.forEach((fromId) => {
            if (fromId !== toId) {
              oweSchema[fromId][toId] +=
                // ((fromId === anonId ? anonCount : 1) * amount) / partyPersonsAmount;
                amount / partyPersonsAmount;
            }
          });
        });
        break;

      // если чек в формате "Все кроме указанных"
      case EMentionType.exclude:
        personsPaid.forEach(({ personId: toId, amount }) => {
          personsIdsWithAnon.forEach((fromId) => {
            if (fromId !== toId) {
              oweSchema[fromId][toId] +=
                // ((fromId === anonId ? anonCount : 1) * amount) /
                amount / (partyPersonsAmount - personsMentioned.length);
            }
          });
        });
        break;

      // если чек в формате "Только указанные"
      case EMentionType.include:
        personsPaid.forEach(({ personId: toId, amount }) => {
          // на всякий случай включаем заплативших в список упомянутых
          const personsMentionedUpdated = Array.from(
            new Set([...checkPersonsPaidIds, ...personsMentioned]),
          );
          personsMentionedUpdated.forEach((fromId) => {
            if (fromId !== toId) {
              oweSchema[fromId][toId] += amount / personsMentionedUpdated.length;
            }
          });
        });
        break;
      default:
        break;
    }
  });

  // Pays for (переводит долги людей на тех кто за них платит, например Никита платит за Аню, и поэтому он должен Андрею не 200, а 400)
  if (isPayFor) {
    // idNoPay - человек, долг которого оплатит другой.
    // idNoPayOwedTo - тот кому idNoPay был должен.
    // idPay - человек, который платит за idNoPay.

    persons.forEach(({ id: idPay, paysFor }) => {
      paysFor?.forEach((idNoPay) => {
        Object.entries(oweSchema[idNoPay]).forEach(([idNoPayOwedTo, amount]) => {
          oweSchema[idNoPay][idNoPayOwedTo] = 0;
          if (idPay !== idNoPayOwedTo) {
            oweSchema[idPay][idNoPayOwedTo] += amount;
          }
        });
      });
    });
  }

  // Размен (если Никита должен Андрею 200, а Андрей Никите 1000, то после размена останется только что Андрей должен Никите 800)
  personsIds.forEach((idFirst) => {
    personsIds.forEach((idSecond) => {
      if (idFirst !== idSecond) {
        const fToS = oweSchema[idFirst][idSecond] || 0;
        const sToF = oweSchema[idSecond][idFirst] || 0;
        if (fToS > sToF) {
          oweSchema[idSecond][idFirst] = 0;
          oweSchema[idFirst][idSecond] -= sToF;
        } else if (fToS < sToF) {
          oweSchema[idFirst][idSecond] = 0;
          oweSchema[idSecond][idFirst] -= fToS;
        } else if (fToS === sToF) {
          oweSchema[idFirst][idSecond] = 0;
          oweSchema[idSecond][idFirst] = 0;
        }
      }
    });
  });
  const finalOweSchema: TOweSchema = {};

  // Удаление нулевых зависимостей
  Object.entries(oweSchema).forEach(([k, v]) => {
    const owes = Object.entries(v).filter(([, val]) => val);
    if (owes.length) {
      finalOweSchema[k] = {};
      owes.forEach(([key, val]) => {
        finalOweSchema[k][key] = val;
      });
    }
  });

  return finalOweSchema;
};
