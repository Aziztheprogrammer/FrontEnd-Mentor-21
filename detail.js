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

// Load Content
function loadContent() {
	let data = JSON.parse(localStorage.getItem("countryData"))[0];

	// Add Country Flag
	let flag = document.querySelector(".flag");
	flag.src = data.flags.png;
	flag.alt = data.flags.alt;

	// Add Country Name
	let countryName = document.querySelector(".country__name");
	countryName.textContent = data.name.common;
	flag.alt = data.flags.alt;

	// Add Details
	let countryProperties = document.querySelectorAll(".info ul > li");
	countryProperties.forEach((el, index) => {
		let propertyValue;
		switch (el.dataset.prop) {
			case "Native Name":
				propertyValue = data.name.nativeName[Object.keys(data.name.nativeName)[0]].common;
				break;
			case "Population":
				propertyValue = data.population;
				break;
			case "Region":
				propertyValue = data.region;
				break;
			case "Sub Region":
				propertyValue = data.subregion;
				break;
			case "Capital":
				propertyValue = data.capital.join(", ");
				break;
			case "Top Level Domain":
				propertyValue = data.tld.join(", ");
				break;
			case "Currencies":
				propertyValue = Object.keys(data.currencies).join(", ");
				break;
			case "Languages":
				propertyValue = [];
				for (let key of Object.keys(data.languages)) {
					propertyValue.push(data.languages[key]);
				}
				propertyValue = propertyValue.join(", ");
		}

		el.textContent = `${el.dataset.prop} : ${propertyValue}`;
	});

	// Add Border Countries
	let bordersList = data.borders;
	for (let border of bordersList) {
		let borderCountry = document.createElement("span");
		borderCountry.textContent = border;
		borderCountry.classList.add("shadow-lg");
		document.querySelector(".border__countries").append(borderCountry);
	}


}

window.onload = loadContent;