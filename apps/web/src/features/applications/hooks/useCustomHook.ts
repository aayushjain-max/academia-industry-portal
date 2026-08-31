import { useState } from 'react';

export const useApplications = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
