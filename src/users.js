const apiUrl = 'https://reqres.in/api';
const perPage = 3;

function load(pageNum = 1) {
  const url = `${apiUrl}/users?page=${pageNum}&per_page=${perPage}`;

  return fetch(url)
    .then(res => {
      if(!res.ok) {
        throw new Error(`API returned status code ${res.status}`);
      }
      return res.json();
    })
    .then(results => results.data)
    .catch(err => {
      console.warn(err);
      // We have no users to process, return an empty array
      return [];
    });
}

module.exports.load = load;
