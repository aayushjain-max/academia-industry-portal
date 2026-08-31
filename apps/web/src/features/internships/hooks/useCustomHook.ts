import { useState } from 'react';

export const useInternships = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
