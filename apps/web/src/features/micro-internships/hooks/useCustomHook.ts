import { useState } from 'react';

export const useMicrointernships = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
