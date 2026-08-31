import { useState } from 'react';

export const useIndustry = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
