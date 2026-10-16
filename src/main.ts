// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/rocketImage.svg?no-inline";
import earthPlanet from "./assets/earthPlanet.svg?no-inline";
import greyPlanet from "./assets/greyPlanet.svg?no-inline";
import redPlanet from "./assets/redPlanet.svg?no-inline";
import tanPlanet from "./assets/tanPlanet.svg?no-inline";
import brownPlanet from "./assets/brownPlanet.svg?no-inline";

let currencyPerClick = 1;
let currencyPerSec = 0;
let currency = 0;

//let astronautsOwned = 0;

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Space Clicker";

const shipButton = document.createElement("img"); // Main Button
shipButton.src = tileUrl;
shipButton.alt = "Rocket"; // Cash Display
shipButton.width = 96;
shipButton.height = 256;

shipButton.alt = "Fuel Button";
shipButton.width = 96;
shipButton.height = 96;

const dataText = document.createElement("p");
dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;

const currencyText = document.createElement("p");
currencyText.textContent = `Space Data Analyzed: ${currency}`;

// Planets

const planetTextHeader = document.createElement("h2");
planetTextHeader.textContent = "[PLANETARY RESEARCH]";

const earthButton = document.createElement("img");
earthButton.src = earthPlanet;
earthButton.alt = "earth";
earthButton.width = 64;
earthButton.height = 64;
earthButton.style.visibility = "hidden";

const tanButton = document.createElement("img");
tanButton.src = tanPlanet;
tanButton.alt = "tanPlanet";
tanButton.width = 64;
tanButton.height = 64;
tanButton.style.visibility = "hidden";

const brownButton = document.createElement("img");
brownButton.src = brownPlanet;
brownButton.alt = "brownPlanet";
brownButton.width = 64;
brownButton.height = 64;
brownButton.style.visibility = "hidden";

const greyButton = document.createElement("img");
greyButton.src = greyPlanet;
greyButton.alt = "greyPlanet";
greyButton.width = 32;
greyButton.height = 32;
greyButton.style.visibility = "hidden";

const redButton = document.createElement("img");
redButton.src = redPlanet;
redButton.alt = "redPlanet";
redButton.width = 32;
redButton.height = 32;
redButton.style.visibility = "hidden";

// Main Clicker
shipButton.addEventListener("click", () => {
  currency += currencyPerClick;
  checkPlanet();
  dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;
  currencyText.textContent = `Space Data Analyzed: ${currency}`;
});

// Clicker Upgrades
earthButton.addEventListener("click", () => {
  checkPlanet();
  currencyPerClick += 5;
  dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;
});

tanButton.addEventListener("click", () => {
  checkPlanet();
  currencyPerClick += 10;
  dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;
});

brownButton.addEventListener("click", () => {
  checkPlanet();
  currencyPerClick += 20;
  dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;
});

greyButton.addEventListener("click", () => {
  checkPlanet();
  currencyPerClick += 30;
  dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;
});

redButton.addEventListener("click", () => {
  checkPlanet();
  currencyPerClick += 50;
  dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;
});

function checkPlanet(){
  if (currency >= 50){
    earthButton.style.visibility = "visible";
  } else {
    earthButton.style.visibility = "hidden";
  }
  if (currency >= 100){
    tanButton.style.visibility = "visible";
  } else {
    tanButton.style.visibility = "hidden";
  }
  if (currency >= 250){
    brownButton.style.visibility = "visible";
  } else {
    brownButton.style.visibility = "hidden";
  }
  if (currency >= 500){
    greyButton.style.visibility = "visible";
  } else {
    greyButton.style.visibility = "hidden";
  }
  if (currency >= 750){
    redButton.style.visibility = "visible";
  } else {
    redButton.style.visibility = "hidden";
  }
}

let previoustime = 0;

function timeElapse(time: number) {
  if (previoustime === 0) previoustime = time;

  const seconds = (time - previoustime) / 1000;
  previoustime = time;

  currency += currencyPerSec * seconds;
  currencyText.textContent = `Space Data Analyzed: ${Math.floor(currency)}`;
  requestAnimationFrame(timeElapse);
}

requestAnimationFrame(timeElapse);

// old function

const upgradeCostIncrease = 1.15;

const upgrades = [
  { name: "Fuel", cost: 15, count: 0, passive: 1 },
  { name: "Astronaut", cost: 100, count: 0, passive: 5 },
  { name: "Satellite", cost: 500, count: 0, passive: 20 },
];

function buyUpgrade(upgrade: typeof upgrades[number]) {
  if (currency >= upgrade.cost) {
    currency -= upgrade.cost;
    upgrade.count++;
    currencyPerSec += upgrade.passive;
    upgrade.cost = Math.ceil(upgrade.cost * upgradeCostIncrease);
  }
}

//create button based on upgrade stuff

for (const upgrade of upgrades) {
  const button = document.createElement("button");
  button.textContent = `Buy ${upgrade.name} (${upgrade.cost}) Space Data`;

  button.addEventListener("click", () => {
    buyUpgrade(upgrade);

    button.textContent =
      `Buy ${upgrade.name} (${upgrade.cost}) Space Data, count: ${upgrade.count}`;
  });
  app.append(button);
}

app.append(
  heading,
  shipButton,
  currencyText,
  dataText,
  planetTextHeader,
  earthButton,
  tanButton,
  brownButton,
  greyButton,
  redButton,
);
