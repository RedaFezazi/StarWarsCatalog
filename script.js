// Selecting characters
const list = document.querySelector("#list");
const personDetails = document.querySelector("#person");
const nameElement = document.querySelector("#name");
const heightElement = document.querySelector("#height");
const massElement = document.querySelector("#Mass");
const hairColorElement = document.querySelector("#hairColor");
const skinColorElement = document.querySelector("#skinColor");
const eyeColorElement = document.querySelector("#eyeColor");
const birthYearElement = document.querySelector("#birthYear");
const genderElement = document.querySelector("#gender");

// Selecting planet details
const planetDetails = document.querySelector("#planet");
const planetNameElement = document.querySelector("#planetName");
const rotationPeriodElement = document.querySelector("#rotationPeriod");
const orbitalPeriodElement = document.querySelector("#orbitalPeriod");
const diameterElement = document.querySelector("#diameter");
const climateElement = document.querySelector("#climate");
const gravityElement = document.querySelector("#gravity");
const terrainElement = document.querySelector("#terrain");

// Selecting buttons
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");
let count = 1;

leftButton.disabled = true;
rightButton.disabled = true;

const fetchChars = (num) => {
  list.style.background = "url(./assets/loading.gif) no-repeat center/cover";
  list.innerHTML = "";
  rightButton.disabled = false;
  leftButton.disabled = count === 1;
  rightButton.disabled = count === 9;

  fetch(`https://swapi.dev/api/people/?page=${num}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (let item of data.results) {
        let pElement = document.createElement("button");
        let textNode = document.createTextNode(`${item.name}`);
        pElement.onclick = () => fetchData(item.url);
        pElement.appendChild(textNode);
        list.appendChild(pElement);
      }
    })
    .catch((error) => console.error("Error:", error));
};

const fetchPlanetData = (url2) => {
  fetch(url2)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      planetDetails.style.background = "";

      planetNameElement.textContent = data.name;
      rotationPeriodElement.textContent =
        "Rotation Period: " + data.rotation_period + " hours";
      orbitalPeriodElement.textContent =
        "Orbital Period: " + data.orbital_period + " days";
      diameterElement.textContent = "Diameter: " + data.diameter + " km";
      climateElement.textContent = "Climate: " + data.climate;
      gravityElement.textContent = "Gravity: " + data.gravity;
      terrainElement.textContent = "Terrain: " + data.terrain;
    })
    .catch((error) => console.error("Error:", error));
};
const fetchData = (url) => {
  planetDetails.style.background =
    "url(./assets/loading.gif) no-repeat center/cover";
  personDetails.style.background =
    "url(./assets/loading.gif) no-repeat center/cover";

  const data = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      personDetails.style.background = "";

      nameElement.textContent = data.name;
      heightElement.textContent = "Height: " + data.height + " cm";
      massElement.textContent = "Mass: " + data.mass + " kg";
      hairColorElement.textContent = "Hair Color: " + data.hair_color;
      skinColorElement.textContent = "Skin Color: " + data.skin_color;
      eyeColorElement.textContent = "Eye Color: " + data.eye_color;
      birthYearElement.textContent = "Birth Year: " + data.birth_year;
      genderElement.textContent = "Gender: " + data.gender;

      fetchPlanetData(data.homeworld);
    })
    .catch((error) => console.error("Error:", error));
};

fetchChars(count);
fetchData(`https://swapi.dev/api/people/1/`);

rightButton.addEventListener("click", () => {
  count++;
  fetchChars(count);
});

leftButton.addEventListener("click", () => {
  count--;
  fetchChars(count);
});
