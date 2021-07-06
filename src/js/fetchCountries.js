export default
function getCountryName(country) {
    return fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(r => {
        if (r.ok) {
            return r.json();
      }
  })
}