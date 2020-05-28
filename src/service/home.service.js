export async function getHomes() {
  return fetch("https://home-search-api.herokuapp.com/api/homes")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}

export async function getHome(id) {
  return fetch(`https://home-search-api.herokuapp.com/api/homes/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}

export async function updateHome(id, home) {
  return fetch(`https://home-search-api.herokuapp.com/api/homes/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
    body: JSON.stringify(home),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}

export async function createHome(home) {
  return fetch(`https://home-search-api.herokuapp.com/api/homes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
    body: JSON.stringify(home),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}
