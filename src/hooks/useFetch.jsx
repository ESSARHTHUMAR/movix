import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading("Loading...");
    setError(null);
    setData(null);

    fetchDataFromApi(url)
        .then((res) => {
            setLoading(false);
            setData(res);
        })
        .catch((error) => {
            setLoading(false);
            setError("something went wrong...");
        })
  }, [url]);

  return {data, loading, error}
};

export default useFetch