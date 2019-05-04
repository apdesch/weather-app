import { useState, useEffect } from 'react';

const useFetch = (url, param = '') => {
  const [loading, setLoader] = useState(true);
  const [data, setData] = useState({ message: '' });
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${url}${param}`);
      const data = await res.json();
      setData(data);
      setLoader(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => { fetchData(); }, [param]);

  return { data, loading, error }
};

export default useFetch;
