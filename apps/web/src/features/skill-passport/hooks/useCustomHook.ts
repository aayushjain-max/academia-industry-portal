import { useState } from 'react';

export const useSkillpassport = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
