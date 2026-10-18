// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/rocketImage.svg?no-inline";
import "./style.css";

let currencyPerClick = 1;
let currencyPerSec = 0;
let currency = 0;

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Space Clicker";

const shipButton = document.createElement("img"); // Main Button
shipButton.src = tileUrl;
shipButton.alt = "Rocket"; // Cash Display
shipButton.width = 96;
shipButton.height = 256;

const dataText = document.createElement("p");
dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;

const currencyText = document.createElement("p");
currencyText.textContent = `Space Data Analyzed: ${currency}`;

const currencyPerSecText = document.createElement("p");
currencyPerSecText.textContent = `Data Per Second: ${currencyPerSec}`;

//Format

const topSection = document.createElement("div");
topSection.id = "top";

const mainSection = document.createElement("div");
mainSection.id = "main";

const upgradeSection = document.createElement("div");
upgradeSection.id = "upgrades";

const planetSection = document.createElement("div");
planetSection.id = "planets";

function updateCurrencyText() {
  currencyText.textContent = `Space Data Analyzed: ${Math.floor(currency)}`;
}

// Planets

const planetTextHeader = document.createElement("h2");
planetTextHeader.textContent = "[PLANETARY RESEARCH]";

const upgradeTextHeader = document.createElement("h2");
upgradeTextHeader.textContent = "[SPACE UPGRADES]";

// Main Clicker
shipButton.addEventListener("click", () => {
  currency += currencyPerClick;

  updateButtons();
  updateCurrencyText();
});

let previoustime = 0;

function timeElapse(time: number) {
  if (previoustime === 0) previoustime = time;

  const seconds = (time - previoustime) / 1000;
  previoustime = time;

  currency += currencyPerSec * seconds;
  updateCurrencyText();
  updateButtons();

  requestAnimationFrame(timeElapse);
}

requestAnimationFrame(timeElapse);

const upgradeCostIncrease = 1.15;

const upgrades = [
  { name: "Fuel", cost: 15, count: 0, passive: 1 },
  { name: "Astronaut", cost: 100, count: 0, passive: 5 },
  { name: "Satellite", cost: 500, count: 0, passive: 20 },
  { name: "Research Center", cost: 2000, count: 0, passive: 80 },
  { name: "Space Station", cost: 10000, count: 0, passive: 200 },
  { name: "Moon Base", cost: 50000, count: 0, passive: 1000 },
  { name: "Rocket Factory", cost: 250000, count: 0, passive: 5000 },
  { name: "Nasa", cost: 1000000, count: 0, passive: 20000 },
  { name: "Mar Colony", cost: 5000000, count: 0, passive: 100000 },
  { name: "Dyson Sphere", cost: 25000000, count: 0, passive: 500000 },
  { name: "Wormhole Generator", cost: 100000000, count: 0, passive: 2000000 },
  { name: "Galactic Empire", cost: 1000000000, count: 0, passive: 15000000 },
];

function buyUpgrade(upgrade: typeof upgrades[number]) {
  if (currency >= upgrade.cost) {
    currency -= upgrade.cost;
    upgrade.count++;
    currencyPerSec += upgrade.passive;
    currencyPerSecText.textContent = `Data Per Second: ${currencyPerSec}`;
    upgrade.cost = Math.ceil(upgrade.cost * upgradeCostIncrease);

    updateCurrencyText();
    updateButtons();
  }
}

const planets = [
  { name: "Our Planet", cost: 250, count: 0, passive: 5 },
  { name: "Desert Planet", cost: 450, count: 0, passive: 10 },
  { name: "Rock Planet", cost: 850, count: 0, passive: 20 },
  { name: "Dark Planet", cost: 1250, count: 0, passive: 30 },
  { name: "Red Planet", cost: 2050, count: 0, passive: 50 },
];

function buyPlanets(planets: typeof upgrades[number]) {
  if (currency >= planets.cost) {
    currency -= planets.cost;
    planets.count++;
    currencyPerClick += planets.passive;
    planets.cost = Math.ceil(planets.cost * upgradeCostIncrease);
    updateCurrencyText();
    updateButtons();
    dataText.textContent = `Current Active Data Research: ${currencyPerClick}`;
  }
}

// each section divide
topSection.append(heading, currencyText, dataText, currencyPerSecText);
mainSection.append(shipButton, upgradeSection);
planetSection.append(planetTextHeader);
upgradeSection.append(upgradeTextHeader);

//create button based on upgrade stuff
for (const upgrade of planets) {
  const planetButton = document.createElement("button");
  planetButton.disabled = currency < upgrade.cost;

  planetButton.textContent = `Buy ${upgrade.name} (${upgrade.cost}) Space Data`;

  planetButton.addEventListener("click", () => {
    buyPlanets(upgrade);

    planetButton.textContent =
      `Buy ${upgrade.name} (${upgrade.cost}) Space Data, count: ${upgrade.count}`;
  });

  planetSection.append(planetButton);
}

for (const upgrade of upgrades) {
  const button = document.createElement("button");
  button.disabled = currency < upgrade.cost;
  button.textContent = `Buy ${upgrade.name} (${upgrade.cost}) Space Data`;

  button.addEventListener("click", () => {
    buyUpgrade(upgrade);

    button.textContent =
      `Buy ${upgrade.name} (${upgrade.cost}) Space Data, count: ${upgrade.count}`;
  });
  upgradeSection.append(button);
}

function updateButtons() {
  planetSection.querySelectorAll("button").forEach((button, i) => {
    button.disabled = currency < planets[i].cost;
  });

  upgradeSection.querySelectorAll("button").forEach((button, i) => {
    button.disabled = currency < upgrades[i].cost;
  });
}

app.append(topSection, mainSection, planetSection);
