// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const currencyPerClick = 1;
let currencyPerSec = 0;
let currency = 0;

/*let earthPlanetsOwned = 0;
let brownPlanetsOwned = 0;
let greyPlanetsOwned = 0;
let redPlanetsOwned = 0;
let tanPlanetsOwned = 0;
*/

let fuelOwned = 0;
const fuelPassive = 1;
let fuelPumpCost = 15;
const fuelPumpCostIncrease = 1.15;

//let astronautsOwned = 0;

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Space Clicker";

const shipButton = document.createElement("img"); // Main Button
shipButton.src = tileUrl;
shipButton.alt = "Rocket"; // Cash Display
shipButton.width = 96;
shipButton.height = 96;

const fuelButton = document.createElement("button"); // Fuel
shipButton.src = tileUrl;
shipButton.alt = "Placeholder";
shipButton.width = 96;
shipButton.height = 96;

const currencyText = document.createElement("p");
currencyText.textContent = currency.toString();

// Main Clicker
shipButton.addEventListener("click", () => {
  console.log("click");
  currency += currencyPerClick;
  currencyText.textContent = currency.toString();
});

// Clicker Upgrades (placeholder names)

//player click the button then upgrade it
fuelButton.addEventListener("click", passiveFuel);

//passive income increase from currency happen every sec
setInterval(() => {
  currency += currencyPerSec;
}, 1000);

function passiveFuel() {
  if (currency >= fuelPumpCost) {
    currency -= fuelPumpCost;

    fuelOwned += 1;
    fuelPumpCost = Math.ceil(fuelPumpCost * fuelPumpCostIncrease);

    currencyPerSec += fuelPassive;
  }
}

app.append(heading, shipButton, fuelButton, currencyText);
