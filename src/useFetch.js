import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {   
      const abortCont = new AbortController();
      console.log(url);

      fetch(url, {signal: abortCont.signal })
        .then(res => {
          if(!res.ok) {
            throw Error('Could not fetch from '+url)
          }
          return res.json();        
        })
        .then(data => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          if(err.name === 'AbortError')
          {
            console.log('fetch aborted');
          } else {
            setError(err.message);
            setIsLoading(false);
          }
        });
      return () => abortCont.abort();
    }, []);

  return { data, isLoading, error }
};

export default useFetch;