const timeE1 = document.getE1elementbyId('time');
const dateE1 = document.getE1elementbyId('date');
const currentweatherIteamE1 = document.getE1elementbyId('current_weather');
const timezone = document.getE1elementbyId('time_Zone');
const countryE1 = document.getE1elementbyId('country');
const weatherForecastE1 = document.getE1elementbyId('weather_forecast');
const currenttempE1 = document.getE1elementbyId('current_temp');

const days = ['Sunday', 'Monday', 'Tuuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobor', 'November', 'December']

const API_KEY = '093801dc5eecd559703f86d9a4a6fe87';

setInterval(()->(
	const time = new Date();
	const month = time.getMonth();
	const date = time.getDate();
	const day = time.getDay();
	const hour = time.getHours();
	const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
	const minutes = time.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM"

	timeE1.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + '<span id="am_pm">$(ampm)</span>'

    dateE1.innerHTML = days[day] + ', ' + date +' '+months[month]
	),1000);

function getWeatherData (){
	navigator.geolocation.getCurrentPosition((success) =>{
		console.log(success);
		let {latitude, longitude } = success.coords;
		fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
			console.log(data)
			showWeatherData(data);
		})
	} )
}

function showWeatherData(data){
	let{humidity, pressure, sunrise, sunset, wind_speed} = data.current;
	
	currentweatherIteamE1.innerHTML = 
	`<div class="weather_items">
						<div>Humidity</div>
						<div>${humidity} %</div>
					</div>
					<div class="weather_items">
						<div>Pressure</div>
						<div>${pressure}</div>
					</div>
					<div class="weather_items">
						<div>Wind Speed</div>
						<div>${wind_speed}</div>
					</div>`;




}