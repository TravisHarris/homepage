
	/*--------------------
		Clock
	--------------------*/

let fullTime = false;
const twentyFourHourSwitch = document.getElementById("twentyFourHourSwitch");

let startClock = () => {
	let date = new Date();
	let hours = date.getHours();
	let mins = date.getMinutes();
	mins = addZero(mins);
	if(!fullTime){
		hours = twelveHour(hours);
	}
	document.getElementById("time").innerHTML = `${hours}:${mins}`;
	let t = setTimeout(startClock, 500)
}

function addZero(min) {
	if(min < 10){
		min = `0${min}`;
	}
	return min;
}

function twelveHour(hour) {
	if(hour > 12) {
		hour = hour - 12;
	}
	else if(hour === 0){
		hour = 12;
	}
	return hour;
}

function set24HourTime() {
	if(twentyFourHourSwitch.checked) {
		fullTime = true;
	}
	else {
		fullTime = false;
	}
}

set24HourTime();
startClock();

	/*--------------------
		Weather
	--------------------*/

let tempUnits = "metric";
let weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=Newcastle,CA&units=${tempUnits}&APPID=98783f1a9bafb2eec2305ae8a2ac5c59`;
let weather = document.getElementById("weather");
const weatherLocation = document.getElementById("weatherLocation");

function setWeatherApi() {
	let location = weatherLocation.value;
	weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${tempUnits}&APPID=98783f1a9bafb2eec2305ae8a2ac5c59`;
}

function setTempUnits(){
	if(unitSwitch.checked){
		tempUnits = "imperial";
	}else{
		tempUnits = "metric";
	}
	getWeather();
}

function getWeather() {
	setWeatherApi();
	$.getJSON(weatherApi, displayWeather);
}

function displayWeather(data) {

	let weatherId = "";
	let id = data.weather[0].id;

	if(id >= 900 ){
		if(id <= 902 || id >= 958){ // high wind/storm/hurricane/tornado
			weatherId = "&#127786;";
		}
		else if(id >= 951 && id <= 957){ // wind
			weatherId = "&#127987;";
		}
		else if(id === 905){ // wind
			weatherId = "&#127987;";
		}
		else if(id === 903){ // extreme cold
			weatherId = "&#10052;";
		}
		else if(id === 904){ // extreme hot
			weatherId = "&#9788;";
		}
		else if(id === 906){ // hail
			weatherId = "&#127784;";
		}
	}
	else if(id >= 801){ // clouds
		weatherId = "&#9729;";
	}
	else if(id >= 800){ // clear
		weatherId = "&#9788;";
	}
	else if(id >= 701){ // atmosphere
		weatherId = "&#68184;";
	}
	else if(id >= 600){ // snow
		weatherId = "&#127784;";
	}
	else if(id >= 500){ // rain
		weatherId = "&#127783;";
	}
	else if(id >= 300){ // drizzle
		weatherId = "&#127782;";
	}
	else if(id >= 200){ // thunderstorm
		weatherId = "&#9928;";
	}

	$("#weather").html(`
		<h1 class="weatherType">${weatherId}</h1>
		<h1 class="temperature">${data.main.temp}&#176;</h1>
		<h3 class="location">${data.name}</h3>
	`);
}

// change location when enter button pressed while focused on weatherLocation text box

weatherLocation.addEventListener("keyup", (event) => {
	if (event.which == 13) {
		weatherLocation.blur();
	}
});

getWeather();

	/*--------------------
		Customization
	--------------------*/

const customizeButton = document.getElementById("gear");
let customizeMode = false;
const menu = document.getElementById("menu");

customizeButton.addEventListener("click", (event) => {
	event.preventDefault();
	if(customizeMode){
		customizeMode = false;
		customizeButton.style.transform = "rotate(0deg)";
		menu.style.display = "none";
	}
	else {
		customizeMode = true;
		customizeButton.style.transform = "rotate(30deg)";
		menu.style.display = "block";
	}
});

function toggleElement(element, elementSwitch) {
	if(elementSwitch.checked){
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
};

	/*--------------------
		Time switch
	--------------------*/

let clock = document.getElementById("time");
const clockSwitch = document.getElementById("timeSwitch");


// on first page load check if box is checked or not

toggleElement(clock, clockSwitch);

clockSwitch.addEventListener("click", () => {
	toggleElement(clock, clockSwitch);
});

	/*--------------------
		24 hour time switch
	--------------------*/

twentyFourHourSwitch.addEventListener("click", () => {
	set24HourTime();
});

	/*--------------------
		Weather switch
	--------------------*/

const weatherSwitch = document.getElementById("weatherSwitch");

// on first page load check if box is chacked or not

toggleElement(weather, weatherSwitch);

weatherSwitch.addEventListener("click", () => {
	toggleElement(weather, weatherSwitch);
});

	/*--------------------
		Temperature Units switch
	--------------------*/

const unitSwitch = document.getElementById("unitSwitch");

setTempUnits();

unitSwitch.addEventListener("click", () =>{
	setTempUnits();
});