import { useState } from 'react';

export const useCertifications = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
