// Creating the AJAX request

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://randomuser.me/api/', true); // Explain true


const gallery = document.getElementById('gallery');

xhr.onload = function() { // See main xhr methods

    if (xhr.status === 200) {

        // Parsing the response

        var response = JSON.parse(xhr.responseText);

        // Getting the results array containing user data

        var results = response.results;

        // Iterating over each user and creating the associated cards.

        let count = 0;

        for(let i = 0; i < results.length; i++) {

            if (count >= 12) {

                break;

            }

            let user = results[i];

            let HTML = `<div class="card">
         <div class="card-img-container">
         <img class="card-img" src=${user.picture.medium} alt="profile picture">
         </div>
         <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first + ' ' + user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city + ', ' + user.location.state}</p>
            
         </div>
         </div>`

            gallery.insertAdjacentHTML("beforeend", HTML);
            count++
        }

        } else {


        console.log('Request failed. Status:', xhr.status);

    }


    }

xhr.onerror = function(){

    console.log('Request failed. Network error.');

};

// Sending the request

xhr.send();