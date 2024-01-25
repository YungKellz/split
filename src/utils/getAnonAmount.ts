/** Возвращает строку вида "Анонимус" или "Анонимус х{N}" где N количество анонимусов больше 1 */
export const getAnonAmount = (partySize: number, personsSize: number): string => {
  return partySize > personsSize
    ? partySize - personsSize === 1
      ? 'Анонимус'
      : `Анонимус x${partySize - personsSize}`
    : '';
};
