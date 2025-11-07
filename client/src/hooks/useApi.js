// src/hooks/useApi.js
import { useCallback, useState } from "react";

export function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFunc(...params);
        setData(response);
        return response;
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, loading, error, execute };
}
