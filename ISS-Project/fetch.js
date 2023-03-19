let url = "https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000 //setting time page will refresh
let maxFailedAttempts = 3

let issMarker
let icon= L.icon({
    iconUrl: 'space.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})

let map = L.map('iss-map').setView([0, 0], 1) //set deault map to lat and long 0 and full world view with 1
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// if fetch works then '.then' is called
// if it doesn't work then 


iss(maxFailedAttempts) // call function one time to start
//otherwise the first function on the page is setInterval which will just show no data until it pulls the iss function after 10 seconds

//setInterval(iss, update) // will request updated data every 10 seconds


//setInterval can cause issues because it will continue to make requests every x amount of time
//which is great in a perfect processing world!
//but in reality sometimes a server can take a while to respond so requests can get backlogged or stacked
//so commented out setInterval and added the finally to the iss function


// doot

function iss(attempts) {

    if (attempts <= 0) {
        alert('Attempts to connect to server failed after several attempts')
        return
    }

    fetch(url).then( ( respons) => {  //first then makes the request
        return respons.json() //parse out all the info and call the json function to only return json info and then we use it for issData - this is also a promise
    }).then ( (issData) => { //second then processes the data it requested
        console.log(issData) //make sure we actually have the json data we need
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        // create marker if it doesn't exist
        // mover marker if it does exist

        if (!issMarker) {//if there is no marker
            //create one:
            issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`


    }).catch ( (err) => { //catch all errors
        attempts-- //subtract 1 from number of attempts
        console.log('ERROR BABY!', err)
    })
    .finally( () => {
        //finally runs whether the fetch() worked or failed
        // in this case it will call the iss function again after a delay of update milliseconds
        // useful for intermitent internet problems
        setTimeout(iss, update, attempts)
        //within this iss function we are calling the iss function again at the very end
        //this is called a recurrsive function
        //THIS format makes sure we're requesting new info 10 seconds (update) AFTER a the last request was completed
    })
}
//fetch doesn't use callback functions, it returns a promise
//a promise is something that's an object


