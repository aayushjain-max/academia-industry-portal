import { useState } from 'react';

export const useProjects = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
