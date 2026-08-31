import { useState } from 'react';

export const useAssessments = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
