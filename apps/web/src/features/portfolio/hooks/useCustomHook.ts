import { useState } from 'react';

export const usePortfolio = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
