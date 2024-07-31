
let params = {
    country:'KW' ,
    city: 'Al Jahrā’',

}

let cities = [
  {
    arName: "الاحمدي",
    name:"Al Aḩmadī"
  }
   ,
  {
    arName: "الفروانية",
    name:"Al Farwānīyah"
  } 
   ,

  {
    arName: "الجهراء",
    name:"Al Jahrā’"
  }
   ,

  {
    arName: "الكويت",
    name:"Al Kuwayt"
  }
  ,

  {
    arName: "مبارك الكبير",
    name:"Mubārak al Kabīr"
  }
  ,

  {
    arName: "حولي",
    name:"Ḩawallī"
  }

]


function fillCities(){
  for(city of cities){
    let content = `<option>${city.arName}</option>`;
    document.getElementById('city').innerHTML += content;
}
}
fillCities()

function updateDataOnCityChange(){
    document.getElementById('city').addEventListener('change' , function(){
      document.getElementById('cityName').innerHTML =  this.value

      let cityName = ''
    for (city of cities){
      if( city.arName == this.value){
        cityName = city.name
      } 
      getPrayerTimes(cityName)
    }
    })
    

  
}
updateDataOnCityChange()




function getPrayerTimes(cityName){
  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: {
      country: "KW" ,
      city: cityName
    }
}).then(function (response) {
    console.log(response.data)

    const timings = response.data.data.timings;
    fillPrayerTimes('fajr-time' , timings.Fajr)
    fillPrayerTimes('sunrise-time', timings.Sunrise)
    fillPrayerTimes('dhuhr-time' , timings.Dhuhr)
    fillPrayerTimes('asr-time' , timings.Asr)
    fillPrayerTimes('maghrib-time' , timings.Maghrib)
    fillPrayerTimes('isha-time' , timings.Isha)
    
    const weekDay = response.data.data.date.hijri.weekday.ar
    const gregorianDate =response.data.data.date.gregorian.date;
    const hijriDate = response.data.data.date.hijri.date
    const date = weekDay +'  |  ' + gregorianDate + '  |  ' + hijriDate +" هـ."
    document.getElementById('date').innerHTML = date

  }).catch(function (error) {
    alert('error')
  })

}
 

  function fillPrayerTimes(id , time){
    document.getElementById(id).innerHTML = time;
  }

