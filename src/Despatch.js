const Despatch = async (url, method, data) => {

  const response = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) {
      throw Error('Could not fetch from ' + url)
    }
    return res.json();
  })
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('fetch aborted')
    } 
  })

  return await response
}

export default Despatch;