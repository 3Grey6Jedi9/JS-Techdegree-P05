const gallery = document.getElementById('gallery');

function getUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://randomuser.me/api/', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var user = response.results[0];

      let HTML = `<div class="card">
        <div class="card-img-container">
          <img class="card-img" src=${user.picture.medium} alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
      </div>`;

      gallery.insertAdjacentHTML("beforeend", HTML);
    } else {
      console.log('Request failed. Status:', xhr.status);
    }
  };

  xhr.onerror = function() {
    console.log('Request failed. Network error.');
  };

  xhr.send();
}

for (let i = 0; i < 12; i++) {
  getUsers();
}
