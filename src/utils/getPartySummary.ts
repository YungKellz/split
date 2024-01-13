import { ICheck } from '../typings';

export const getPartySummary = (checks: ICheck[]) => {
  return checks.reduce(
    (sum, check) => sum + check.personsPaid.reduce((s, p) => s + p.amount, 0),
    0,
  );
};
