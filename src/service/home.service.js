export async function getHomes() {
  return fetch("https://home-search-api.herokuapp.com/api/homes")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}
