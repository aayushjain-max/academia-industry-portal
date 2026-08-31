import { useState } from 'react';

export const useInstitutions = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
