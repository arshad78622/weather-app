document.addEventListener('DOMContentLoaded', () => {
  const apikey = "091d9af83a66ac603cca984f8649636e";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  const searchBox = document.querySelector('#input1');
  const searchBtn = document.querySelector('#button1');
  const weatherIcon=document.querySelector('.image')


  async function checkWeather(city) {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apikey}&units=imperial`); 
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      console.log(data);
      
      document.querySelector('.temp').innerHTML = `${Math.round((data.main.temp-30)/2)} °C`;
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
      document.querySelector('.wind').innerHTML = `Wind: ${Math.round(data.wind.speed * 3.6)} km/h`; 
      
      if(data.weather[0].main=='Clouds'){
        weatherIcon.src="./clouds.png"
      }
      else if(data.weather[0].main=='Clear'){
        weatherIcon.src="./clear.png"
      }
      else if(data.weather[0].main=='Rain'){
        weatherIcon.src="./rain.png"
      }
      else if(data.weather[0].main=='Drizzle'){
        weatherIcon.src="./drizzle.png"
      }
      else if(data.weather[0].main=='Mist'){
        weatherIcon.src="./mist.png"
      }

    } catch (error) {
      console.error(error);
      document.querySelector('.city').innerHTML = 'City not found';
      document.querySelector('.temp').innerHTML = '';
      document.querySelector('.humidity').innerHTML = '';
      document.querySelector('.wind').innerHTML = '';
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
});
