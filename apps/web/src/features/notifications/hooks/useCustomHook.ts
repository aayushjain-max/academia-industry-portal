import { useState } from 'react';

export const useNotifications = () => {
  const [data, setData] = useState(null);
  return { data, setData };
};
