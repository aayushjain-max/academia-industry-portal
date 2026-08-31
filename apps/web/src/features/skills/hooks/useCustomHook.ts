import { useState } from 'react';

export const useSkills = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
