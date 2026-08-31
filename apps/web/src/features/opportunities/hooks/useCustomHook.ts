import { useState } from 'react';

export const useOpportunities = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
