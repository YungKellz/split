import React from 'react';
import { Party } from '../components';
import { party } from '../mockData';

export function MainPage() {
  return (
    <div>
      <Party {...party} />
    </div>
  );
}
