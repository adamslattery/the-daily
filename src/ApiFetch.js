const ApiFetch = async (url) => {
  //const [data, setData] = useState();
  //const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(null);

  let data = null;
  let isLoading = true;
  let error = null;

  const abortCont = new AbortController()

  await fetch(url, { signal: abortCont.signal })
    .then(res => {
      if (!res.ok) {
        throw Error('Could not fetch from ' + url)
      }
      return res.json();
    })
    .then(response => {
      data = response;
      isLoading = false;
      error = null;

    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted')
      } else {
        error = err.message;
        isLoading = false;
      }
    });

  return { data, isLoading, error }
};

export default ApiFetch;