let search_button = document.querySelector(".search-button");
let search_input = document.querySelector("#search-input");
let search_results = document.querySelector(".search-results");
let title = document.querySelector(".title");
let result = document.querySelector(".search-result");
const myHeaders = new Headers();

const init = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

async function getData(search_value = "", url = "") {
  if (search_value == "") {
    let response = await fetch(`${url}`);
    return await response.json();
  } else if (url == "") {
    const response = await fetch(
      `https://swapi.dev/api/people?search=${search_value}`
    );

    return await response.json();
  }
}

const displayAnnexe = (url_obj, field) => {
  let poperty_table = [];

  if (url_obj.length > 0) {
    if (typeof url_obj == "string") {
      getData("", url_obj).then((data) => {
        if (data.name == undefined) {
          document.querySelector("." + field).innerHTML =
            field + " : " + data.title;
        } else {
          document.querySelector("." + field).innerHTML =
            field + " : " + data.name;
        }
      });
    } else {
      for (const [key, url] of Object.entries(url_obj)) {
        getData("", url).then((data) => {
          if (data.name == undefined) {
            poperty_table.push(data.title);
          } else {
            poperty_table.push(data.name);
          }
          poperty_string = poperty_table.join(", ");
          document.querySelector("." + field).innerHTML =
            field + " : " + poperty_string;
        });
      }
    }
  } else {
    document.querySelector("." + field).innerHTML = field + " : " + "unknow";
  }
};

const search = (search = "", data, url) => {
  switch (data) {
    case "people":
      if (search != "") {
        getData(search, "").then((data) => {
          if (data.count <= 0) {
            search_input.value = "";
            // Si on a trouvé aucun résultat
            title.innerText = "Pas de résultat";
          } else {
            // Si on a trouvé des résultats
            for (let i = 0; i < data.results.length; i++) {
              const li_result = document.createElement("li");

              li_result.setAttribute(
                "class",
                "search-result nes-btn nes-container"
              );
              li_result.setAttribute("id", i);

              let element = data.results[i];
              search_input.value = "";
              title.innerText = "";

              li_result.innerText = element.name;
              search_results.appendChild(li_result);
              li_result.addEventListener("click", (e) => {
                showDetails(data.results[e.toElement.id]);
              });
            }
          }
        });
      } else {
        alert("Veuillez saisir quelque chose...");
      }
      break;
    default:
      displayAnnexe(url, data);
      break;
  }
};

const showDetails = (starwarsPeople) => {
  // Pour afficher le reste des données
  title.innerText = starwarsPeople.name;
  search("", "starships", starwarsPeople.starships);
  search("", "vehicles", starwarsPeople.vehicles);
  search("", "species", starwarsPeople.species);
  search("", "films", starwarsPeople.films);
  search("", "homeworld", starwarsPeople.homeworld);

  for (i = 0; i < 12; i++) {
    document.querySelector(".eye_color").innerHTML =
      "Eye Color : " + starwarsPeople.eye_color;
    document.querySelector(".skin_color").innerHTML =
      "Skin Color : " + starwarsPeople.skin_color;
    document.querySelector(".hair_color").innerHTML =
      "Hair Color : " + starwarsPeople.hair_color;
    document.querySelector(".birth_year").innerHTML =
      "Birth Year : " + starwarsPeople.birth_year;
    document.querySelector(".mass").innerHTML = "Mass : " + starwarsPeople.mass;
    document.querySelector(".gender").innerHTML =
      "Gender : " + starwarsPeople.gender;
  }
};

search_button.addEventListener("click", () => {
  search(search_input.value, "people", "");
});
search_input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    search(search_input.value, "people", "");
  }
});
