import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { ICheck, IParty, IPerson } from '../../typings';
import { getOweSchema, getPersonInfo } from '../../utils';
import { anonId, currency } from '../../mockData';

interface ISummaryTable {
  checks: ICheck | ICheck[];
  persons: IPerson[];
  partyPersonsAmount: IParty['partyPersonsAmount'];
}

export function SummaryTable({ checks, persons, partyPersonsAmount }: ISummaryTable) {
  const [show, setShow] = useState(false);

  const oweSchema = getOweSchema({
    checks,
    persons,
    partyPersonsAmount,
    isPayFor: true,
  });

  const columns = Object.keys(oweSchema).map((id) => ({
    title: `${id === anonId ? 'Каждый ' : ''}${getPersonInfo(persons, id).name}`,
    dataIndex: id,
    key: id,
  }));

  const dataSourceObj: Record<string, any> = { key: 'key' };
  Object.entries(oweSchema).forEach(([id, obj]) => {
    dataSourceObj[id] = Object.entries(obj)
      .filter(([, v]) => v)
      .map(([id, amount]) => `${getPersonInfo(persons, id).name} ${amount}${currency}`)
      .join(', ');
  });

  return (
    <div>
      <Button onClick={() => setShow((p) => !p)}>
        {show ? 'Скрыть распределение' : 'Показать распределение'}
      </Button>
      <br />
      <br />
      {show && <Table columns={columns} dataSource={[dataSourceObj]} />}
    </div>
  );
}
