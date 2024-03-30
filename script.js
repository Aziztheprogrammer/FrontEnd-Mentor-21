// Fetching API
var obj;
fetch("https://restcountries.com/v3.1/all")
	.then(response => response.json())
	.then(data => obj = data)
	.then(() => loadContent(16, obj))
	.catch(error => console.log(`Error Is : ${error}`));

// Theme Colors
let lightMode = {
	elements: "hsl(0, 0%, 100%)",
	text: "hsl(200, 15%, 8%)",
	inputs: "hsl(0, 0%, 52%)",
	background: "hsl(0, 0%, 98%)"
}

let darkMode = {
	elements: "hsl(209, 23%, 22%)",
	text: "hsl(0, 0%, 100%)",
	background: "hsl(207, 26%, 17%)",
	inputs: "hsl(209, 23%, 22%)"
}


// Theme Switcher Function
let mode = "lightMode";

function themeSwitcher() {
	let switchCheckbox = document.getElementById("theme__switcher");
	switchCheckbox.checked ? mode = darkMode: mode = lightMode;
	for (let key of Object.keys(mode)) {
		document.documentElement.style.setProperty(`--${key}`, mode[key]);
	}
}

window.onload = themeSwitcher;
document.querySelector(".theme").addEventListener("click", themeSwitcher);

// Content Loader
function loadContent(maxCountries = 8, countriesList) {
	let contriesContainer = document.querySelector(".content");
	maxCountries >= 16 ? maxCountries = 16: true;

	for (let i = 0; i <= (maxCountries - 1); i++) {
		// Create Country Div
		let country = document.createElement("div");
		country.classList.add("country", "shadow-lg");
		country.setAttribute("countryName", countriesList[i].name.common);
		contriesContainer.append(country);

		country.addEventListener("click", sendData);

		// Add Country Flag
		let flag = document.createElement("img");
		flag.classList.add("flag");
		flag.src = countriesList[i].flags.png;
		flag.alt = countriesList[i].flags.alt;
		country.append(flag);

		// Add Country Details
		let details = document.createElement("div");
		details.classList.add("details");
		country.append(details);

		let countryName = document.createElement("h1");
		countryName.classList.add("country__name");
		countryName.textContent = countriesList[i].name.common;
		details.append(countryName);

		let population = document.createElement("small");
		population.textContent = `Population : ${countriesList[i].population}`
		details.append(population);

		let region = document.createElement("small");
		region.textContent = `Region : ${countriesList[i].region}`
		details.append(region);

		let capital = document.createElement("small");
		capital.textContent = `Capital : ${obj[i].capital}`
		details.append(capital);
	}
}

// clear Content Function
function clearContent() {
	document.querySelectorAll(".country").forEach((el) => {
		el.remove();
	});
} 

// Search Country 
let searchBar = document.getElementById("search");	

function onSearch() {
	clearContent();
	let filteredObj;

	new Promise((resolve, reject) => {
		if (searchBar.value.trim() == "") {
			filteredObj = obj;
		} else {
			filteredObj = obj.filter((el) => {
				return el.name.common.toLowerCase()
					.includes(searchBar.value.toLowerCase())
			})
		}
		resolve();
	}).then(loadContent(filteredObj.length, filteredObj))
}

searchBar.addEventListener("input", onSearch);

// Filter By Region
let regionOptions = document.querySelectorAll("select > option");

function onFilter() {
	clearContent();

	let selectedValue;
	let filteredByRegion;

	regionOptions.forEach((el) => {
		if (el.selected) {
			selectedValue = el.value;
		}
	});

	filteredByRegion = obj.filter((el) => {
		return el.region == selectedValue;
	});
	
	loadContent(filteredByRegion.length, filteredByRegion);

}

document.querySelector("select").addEventListener("change", onFilter)

// Send Country Data
function sendData() {
	let countries = document.querySelectorAll(".country");

	let countryDataObj = obj.filter((el,index) => {
		return el.name.common == this.getAttribute("countryName");
	});
	localStorage.setItem("countryData", JSON.stringify(countryDataObj))

	window.location.href = "detail.html";
}