import { useState } from 'react';

export const useVerification = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
