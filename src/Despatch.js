const Despatch = ( url, method, data ) => {
  
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(url, requestOptions)
        .then(res => {
          if(!res.ok) {
            throw Error('Could not fetch from '+url)
          }
          return res.json();        
        })
        .then(data => {
            console.log('response:');
            console.log(data);

        /* setData(data);
          setIsLoading(false);
          setError(null);*/
        })
        .catch(err => {
          if(err.name === 'AbortError')
          {
            console.log('fetch aborted');
          } else {
          /* setError(err.message);s
            setIsLoading(false);*/
          }
        });
    return ( 
        data
    );

}
 
export default Despatch;