import React from 'react';
import { createNarration } from '@narration/core';

export * from '@narration/core';

export const useNarration : typeof createNarration = (...args) => {
  const [narration] = React.useState(() => createNarration(...args));
  console.log(narration)

  return narration;
}