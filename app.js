let search_button = document.querySelector(".search-button");
let search_input = document.querySelector("#search-input");
let search_results = document.querySelector(".search-results");
let title = document.querySelector(".title");
let result = document.querySelector(".result");
const myHeaders = new Headers();

const init = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

async function getPeople(search_value) {
  let response = await fetch(
    `https://swapi.dev/api/people?search=${search_value}`
  );
  return await response.json();
}

const showDetails = (starwarsPeople) => {
  title.innerText = starwarsPeople.name;
  document.querySelector(".gender").innerText =
    "Gender :" + starwarsPeople.gender;
  document.querySelector(".hair").innerText =
    "Hair Color :" + starwarsPeople.hair_color;
  document.querySelector(".height").innerText =
    "Height :" + starwarsPeople.height;
  document.querySelector(".eye_color").innerText =
    "Eye Color :" + starwarsPeople.eye_color;
  document.querySelector(".skin_color").innerText =
    "Skin Color :" + starwarsPeople.skin_color;
};

search_button.addEventListener("click", () => {
  search_results.innerHTML = "";
  if (search_input.value != "") {
    getPeople(search_input.value).then((data) => {
      console.log(data);
      if (data.count <= 0) {
        li_result.innerText = "Pas de résultat";
        result.innerText = "Pas de résultat";
        search_results.appendChild(li_result);
      } else {
        for (let i = 0; i < data.results.length; i++) {
          const li_result = document.createElement("li");

          li_result.setAttribute(
            "class",
            "search-result nes-btn nes-container"
          );
          li_result.setAttribute("id", i);

          let element = data.results[i];
          li_result.innerText = element.name;
          search_results.appendChild(li_result);

          li_result.addEventListener("click", (e) => {
            showDetails(data.results[e.toElement.id]);
          });
        }
      }
    });
  }
});
