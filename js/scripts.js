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




const cards = document.querySelectorAll('.card');

function showModal(user) {

  //Creating the modal container

  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';


  // Creating the modal content

  const modalContent = document.createELement('div');
  modalContent.className = 'modal';

  // Creating the close button

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.id = 'modal-close-btn';
  closeButton.className = 'modal-close-btn';
  closeButton.innerHTML = '<strong>X</strong>';
  closeButton.addEventListener('click', function(){

    modalContainer.remove(); // Closing the modal window when the button is clicked

  })


  // Creating the modal info container

  const modalInfoContainer = document.createElement('div');
  modalInfoContainer.className = 'modal-info-container';

  // Creating the modal image

  const modalImg = document.createElement('img');
  modalImg.className = 'modal-img';
  modalImg.src = user.picture.medium;
  modalImg.alt = 'profile picture';

  // Creating the modal name

  const modalName = document.createElement('h3');
  modalName.id = 'name';
  modalName.className = 'modal-name cap';
  modalName.textContent = user.name.first + ' ' + user.name.last;


  // Creating the modal email

  const modalEmail = document.createElement('p');
  modalEmail.className = 'modal-text';
  modalEmail.textContent = user.email;


  // Creating the modal city

  const modalCity = document.createElement('p');
  modalCity.className = 'modal-text cap';
  modalCity.textContent = user.location.city;


  // Creating the modal phone

  const modalPhone = document.createElement('p');
  modalPhone.className = 'modal-text';
  modalPhone.textContent = user.phone;


  // Creating the modal address

  const modalAddress = document.createElement('p');
  modalAddress.className = 'modal-text';
  modalAddress.textContent = user.location.street.number + ' ' + user.location.steet.name + ', ' + user.location.city + ', ' + user.location.state + ' ' + user.location.postcode;

  // Creating the modal birthday

  const modalBirthday = document.createElement('p');
  modalBirthday.className = 'modal-text';
  modalBirthday.textContent = 'Birthday: ' + user.dob.date.slice(0,10);

  // Appending the elements to the modal info container

  modalInfoContainer.appendChild(modalImg);
  modalInfoContainer.appendChild(modalName);
  modalInfoContainer.appendChild(modalEmail);
  modalInfoContainer.appendChild(modalCity);
  modalInfoContainer.appendChild(document.createElement('hr'));
  modalInfoContainer.appendChild(modalPhone);
  modalInfoContainer.appendChild(modalAddress);
  modalInfoContainer.appendChild(modalBirthday);


  // Appending elements to the modal content

  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalInfoContainer);


  // Appending elements to the modal container

  modalContainer.appendChild(modalContent);

  // Appending the modal container to the document body

  gallery.insertAdjacentElement('afterend', modalContainer);

}

