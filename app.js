const APIKey = `bbf877193f9eb468639faa3c3092c326`;

const weatherBox = document.querySelector(".weather_box");
const form = document.querySelector("form");
const city = document.querySelector('input[type="text"]');
const btn = document.querySelector('input[type="submit"]');

// console.log(form);
// console.log(city);
// console.log(btn);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityValue = city.value;
    // console.log(cityValue);

    getWeatherCity(cityValue);
});


async function getWeatherCity(cityValue) {
    await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${APIKey}&units=metric`
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // console.log(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            if (data.cod == "404") {
                // console.log(data.message);
                weatherBox.innerHTML = data.message;
            } else {
                weatherBox.innerHTML = `
                  <div class="imgs">
                    <img id="image_icon" src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png' alt="Icon Weather">
                  </div>
                  <p id="temp">${data.main.temp}°C</p>
                  <p id="sun">${data.weather[0].description}</p>
                  <div class="weather_choice">
                     <p>Feels Like: <span id="feel"> ${data.main.feels_like}°C</span></p>
                     <p>Humidity: <span id="humidity">${data.main.humidity}%</span></p>
                     <p>Wind Speed: <span id="wind">${data.wind.speed} m/s</span></p>
                  </div>
           `;
            }
        })
        .catch((error) => console.log("Error"));
}
