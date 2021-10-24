const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer 0FRXPDNSReFAJvIxhNkjOPD8AFTkQquzb4OMv1T8lnO7FmSsjQqECtxq57oamOCA'
    }
  };
  
  fetch('https://api.iconfinder.com/v4/icons/search?query=&count=10', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

