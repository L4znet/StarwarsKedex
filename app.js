let search_button = document.querySelector(".search-button");
let search_input = document.querySelector("#search-input");
let search_results = document.querySelector(".search-results");
let results = document.querySelector(".results");
const myHeaders = new Headers();
let alreeady_started = false;

const createContent = () => {
  const clicked_result = document.createElement("div");
  const content = document.createElement("p");
  content.setAttribute("class", "content");
  const title = document.createElement("p");
  title.setAttribute("class", "title");
  clicked_result.appendChild(title);
  content.innerHTML = `Eye color : <p class="eye_color"></p>
      Skin color : <p class="skin_color"></p> 
      Hair color : <p class="hair_color"></p>
      Birth year : <p class="birth_year"></p> 
      Mass : <p class="mass"></p> 
      Gender :<p class="gender"></p>
      Homeworld : <p class="homeworld"></p>
      Films : <p class="films"></p> 
      Species : <p class="species"></p> 
      Vehicles : <p class="vehicles"></p> 
      Starships : <p class="starships"></p>`;
  clicked_result.appendChild(content);
  results.appendChild(clicked_result);
  clicked_result.setAttribute(
    "class",
    "clicked-result nes-container is-dark with-title"
  );
};

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
          document.querySelector("." + field).innerHTML = data.title;
        } else {
          document.querySelector("." + field).innerHTML = data.name;
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
          document.querySelector("." + field).innerHTML = poperty_string;
        });
      }
    }
  } else {
    document.querySelector("." + field).innerHTML = "Unknown";
  }
};

const search = (search = "", title) => {
  if (search != "") {
    getData(search, "").then((data) => {
      if (data.count <= 0) {
        alreeady_started = false;
        search_input.value = "";
        const no_result = document.createElement("div");
        const no_result_title = document.createElement("p");
        const content = document.createElement("p");
        no_result.setAttribute("class", "nes-container with-title is-centered");
        // Si on a trouvé aucun résultat
        results.innerHTML = "";

        no_result_title.innerHTML = "Pas de résultat";
        no_result_title.setAttribute("class", "title");
        content.innerHTML =
          "Aucun résultat n'a été trouvé pour la recherche : " + search;
        no_result.appendChild(no_result_title);
        no_result.appendChild(content);
        results.appendChild(no_result);
        results = document.querySelector(".results");

        setTimeout(() => {
          document.location.reload();
        }, 2000);
      } else {
        // Si on a trouvé des résultats
        let title = document.querySelector(".title");
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
            showDetails(data.results[e.toElement.id], title);
          });
        }
      }
    });
  } else {
    alert("Veuillez saisir quelque chose...");
  }
};

const progressBar = (search_value, title) => {
  search_results.innerHTML = "";
  const progress = document.createElement("progress");

  let clicked_result = document.querySelector(".clicked-result");

  progress.setAttribute("class", "nes-progress is-success");
  progress.setAttribute("value", "0");
  progress.setAttribute("max", "100");
  results.appendChild(progress);

  let elem = document.querySelector(".nes-progress");
  let width = 1;
  let id = setInterval(frame, 20);
  clicked_result.remove();
  function frame() {
    if (width >= 100) {
      search(search_value, title);
      clearInterval(id);
      elem.remove();
      createContent();
    } else {
      width++;
      elem.setAttribute("value", width);
    }
  }
};

const showDetails = (starwarsPeople, title) => {
  // Pour afficher le reste des données
  title.innerText = starwarsPeople.name;

  let type = ["starships", "vehicles", "films", "species", "homeworld"];
  let data = [
    starwarsPeople.starships,
    starwarsPeople.vehicles,
    starwarsPeople.films,
    starwarsPeople.species,
    starwarsPeople.homeworld,
  ];

  displayAnnexe(starwarsPeople.starships, "starships", title);
  displayAnnexe(starwarsPeople.vehicles, "vehicles", title);
  displayAnnexe(starwarsPeople.films, "films", title);
  displayAnnexe(starwarsPeople.species, "species", title);
  displayAnnexe(starwarsPeople.homeworld, "homeworld", title);

  document.querySelector(".eye_color").innerHTML = starwarsPeople.eye_color;
  document.querySelector(".skin_color").innerHTML = starwarsPeople.skin_color;
  document.querySelector(".hair_color").innerHTML = starwarsPeople.hair_color;
  document.querySelector(".birth_year").innerHTML = starwarsPeople.birth_year;
  document.querySelector(".mass").innerHTML = starwarsPeople.mass;
  document.querySelector(".gender").innerHTML = starwarsPeople.gender;
};

search_button.addEventListener("click", () => {
  progressBar(search_input.value, document.querySelector(".title"));
});
search_input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    progressBar(search_input.value, document.querySelector(".title"));
  }
});
s;
