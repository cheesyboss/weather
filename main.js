const api = {
    key: "b01c7e9ce266aefd1332b12cb6295b37",
    base: "https://api.openweathermap.org/data/2.5/",
    bas: "https://api.openweathermap.org/data/2.5/forecast/"
  }
  
  const searchBox = document.querySelector('.search-box');
  searchBox.addEventListener("keypress", setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchBox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }


  const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

  // Show time
  function showTime() {
      let today = new Date (),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();


    // SET AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM'


    // 12 hr Format
    hour = hour % 24 || 24;

    // output the time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);

  }

  // Add zeros
  function addZero(n){
      return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }


  //TIMEZONE

  function setBgGreet() {
    let today = new Date(),
      hour = today.getHours();

      if(hour < 12) {
          //Morning
          document.body.style.backgroundImage = "url('img/morning.jpg')"
          greeting.textContent = 'Good Morning';


      } else if(hour < 18) {
          //Afternoon
          document.body.style.backgroundImage = "url('img/afternoon.jpg')"
          greeting.textContent = 'Good Afternoon';
          document.body.style.color = 'white';
          document.getElementById("greeting").style.textAlign = "center";

      } else {
          //Evening
          document.body.style.backgroundImage = "url('img/sunset2.jpg')"
          greeting.textContent = 'Good Evening';
          document.body.style.color = 'white';
      }

}


  showTime();
  setBgGreet();
  