import { useState } from 'react';

export const useAnalytics = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
