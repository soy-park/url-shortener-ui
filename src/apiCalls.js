export const getUrls = () => {
  return fetch("http://localhost:3001/api/v1/urls")
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status}, ${response.statusText}`)
    }
      return response.json()
  }) 
}

export const addUrl = (newUrl) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify(newUrl),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}, ${response.statusText}`);
      } else {
        return response.json();
      }
    })
}
