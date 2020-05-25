export async function getHomes() {
  return fetch("http://home-search-api.herokuapp.com/api/homes")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}
