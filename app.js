
const time = document.querySelector(".time");
const timezoneLocation = document.querySelector(".timezone");
const weaterDegree = document.querySelector(".weather-degree");
const degreeNumber = document.querySelector(".degree-number");
const degreeCelsius = document.querySelector(".degree-celsius");
const degreeFahrenheit = document.querySelector(".degree-fahrenheit");



const getCoordinates = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

async function getAddress() {
  const position = await getCoordinates();
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=dc74a68c1cf81a3931523137b2fcd6b8`;
}

const finalApi = getAddress();

finalApi
  .then((api) => fetch(api))
  .then((response) => {
    return response.json();
  })
  .then(data => {
    const {temp, weather} = data.current;
    const {timezone} = data;
    degreeNumber.textContent = temp + 'K';
    timezoneLocation.textContent += timezone;
    
    degreeNumber.addEventListener('click', changeDegrees);
        
    
    let degreesKelvin = parseFloat(degreeNumber.textContent);
    let degreesCelsius = degreesKelvin - 273.15;
    let degreesFahrenheit = degreesKelvin * 9/5 - 459.67;
    degreesCelsius = degreesCelsius.toFixed(2) + 'C';
    degreesFahrenheit = degreesFahrenheit.toFixed(2) + 'F';

    function changeDegrees(){
      let currentDegrees = degreeNumber.textContent; 
        
      if (currentDegrees.includes('K')) {
        degreeNumber.textContent = degreesCelsius;
      } 

      if (currentDegrees.includes('C')){
        degreeNumber.textContent = degreesFahrenheit;
      }

      if(currentDegrees.includes('F')) {
        degreeNumber.textContent = degreesKelvin + 'K';
      }

    }
  } )
  .catch((err) => {
    console.log(err);
  });


//-----Clock-----//

setInterval(() => {
  let currentTime = new Date();
  let minutes = 
    currentTime.getMinutes() < 10 ? "0" + currentTime.getMinutes() 
      : currentTime.getMinutes();
  let hours =
    currentTime.getHours() < 10 ? "0" + currentTime.getHours()
      : currentTime.getHours();

  time.textContent = hours + ":" + minutes;
}, 1000);
