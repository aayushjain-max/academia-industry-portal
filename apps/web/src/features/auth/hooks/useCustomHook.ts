import { useState } from 'react';

export const useAuth = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
