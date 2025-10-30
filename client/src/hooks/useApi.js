// src/hooks/useApi.js
import { useCallback, useState } from 'react';

export const useApi = (serviceFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const res = await serviceFn(...args);
        setData(res);
        return res;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [serviceFn]
  );

  return { data, loading, error, execute };
};