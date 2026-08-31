import { useState } from 'react';

export const useStudents = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
