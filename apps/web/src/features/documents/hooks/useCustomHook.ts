import { useState } from 'react';

export const useDocuments = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
