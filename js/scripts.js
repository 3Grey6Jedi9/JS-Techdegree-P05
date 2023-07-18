const gallery = document.getElementById('gallery');


let users = []; // I define users as a global variable so I can play the index of their elements.




// I define the function getUsers to fetch all the data from the API.

function getUsers() {
  return fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed. Status:', response.status);
      }
      return response.json();
    })
    .then(data => {
      const users = data.results;
      return users;
    })
    .catch(error => {
      console.error('Request failed. Network error:', error);
    });
}


// End of getUsers function



// createCard: This function creates all the cards once I have fetched the information.

function createCard(user, index) {


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


  const card = document.querySelector('.card:last-child');
  const userCopy = {...user};

  card.addEventListener('click', function() {

    showModal(userCopy);

  });

}





// fetchUsersAndCreateCards: This function call all the promises and create the cards.

function fetchUsersAndCreateCards() {
  getUsers()
    .then(data => {
      users = data; // Storing the users globally
      data.forEach((user, index) => {
        createCard(user, index); // Passing the index to createCard
      });
    });
}











// showModal: This function will create the modal window, as well as the action associate with it.

function showModal(user) {



  const existingModal = document.querySelector('.modal-container');
  if (existingModal) {
    existingModal.remove(); // Removing the existing modal so I do not overlap them
  }

  //Creating the modal container

  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';


  // Creating the modal content

  const modalContent = document.createElement('div');
  modalContent.className = 'modal';

  // Creating the modal toggle container

  const modalToggleContainer = document.createElement('div');
  modalToggleContainer.className = 'modal-btn-container'

  // Creating the previous button

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.id = 'modal-prev';
  prevButton.className = 'modal-prev btn';
  prevButton.textContent = 'Prev';

  // Creating the next button

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.id = 'modal-next';
  nextButton.className = 'modal-next btn';
  nextButton.textContent = 'Next';

  // Append the toggle buttons to the modal toggle container

  modalToggleContainer.appendChild(prevButton);
  modalToggleContainer.appendChild(nextButton);


  // Appending the modal toggle container to the modal content

  modalContent.appendChild(modalToggleContainer);



  // Creating the close button

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.id = 'modal-close-btn';
  closeButton.className = 'modal-close-btn';
  closeButton.innerHTML = '<strong>X</strong>';





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
  modalPhone.textContent = formatPhoneNumber(user.phone)


  // Creating the modal address

  const modalAddress = document.createElement('p');
  modalAddress.className = 'modal-text';
  modalAddress.textContent = user.location.street.number + ' ' + user.location.street.name + ', ' + user.location.city + ', ' + user.location.state + ' ' + user.location.postcode;

  // Creating the modal birthday

  const modalBirthday = document.createElement('p');
  modalBirthday.className = 'modal-text';
  modalBirthday.textContent = 'Birthday: ' + user.dob.date.slice(5,7)+'/'+user.dob.date.slice(8,10)+'/'+user.dob.date.slice(0,4);

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

  modalContent.appendChild(modalInfoContainer);




  // Appending elements to the modal container

  modalContainer.appendChild(modalContent);
  modalContent.appendChild(closeButton);


  // Appending the modal container to the document body

  document.body.appendChild(modalContainer);

  // Giving action to the buttons

closeButton.addEventListener('click', function(event) {
  const closeButtonClicked = event.target.closest('#modal-close-btn');
  if (closeButtonClicked) {
    const modalContainer = event.target.closest('.modal-container');
    modalContainer.remove(); // Closing the modal window when the close button is clicked
  }
});

modalContent.addEventListener('click', function(event) {
  const prevButtonClicked = event.target.id === 'modal-prev';
  const nextButtonClicked = event.target.id === 'modal-next';

  if (prevButtonClicked) {
    const currentIndex = users.findIndex((u) => u.name === user.name);
    const prevIndex = (currentIndex - 1 + users.length) % users.length;
    const prevUser = users[prevIndex];
    showModal(prevUser);
  } else if (nextButtonClicked) {
    const currentIndex = users.findIndex((u) => u.name === user.name);
    const nextIndex = (currentIndex + 1) % users.length;
    const nextUser = users[nextIndex];
    showModal(nextUser);
  }
});



}

// End of the showmodal function (it starts around line 115)







function formatPhoneNumber(phoneNumber) {

  // Removing all non-digit characters from the phone number

  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Extracting the area code (first 3 digits)

  const areaCode = digitsOnly.slice(0,3);

  // Extracting the next 3 digits

  const nextThreeDigits = digitsOnly.slice(3,6);

  // Extracting the last 4 digits

  const lastFourDigits = digitsOnly.slice(6);

  // Formating the phone number in the pattern (xxx) xxx-xxxx

  const formattedPhoneNumber = `(${areaCode}) ${nextThreeDigits}-${lastFourDigits}`;

  return formattedPhoneNumber

}









// Configurating the search tool


const searchContainer = document.getElementsByClassName('search-container')[0];

const HTMLSearchForm = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`

searchContainer.insertAdjacentHTML("beforeend", HTMLSearchForm);


const searchInput = document.getElementById('search-input');
const cardsContainer = document.getElementById('gallery');


searchInput.addEventListener('input', function(event){

    const searchItem = event.target.value.toLowerCase();
    const cards = cardsContainer.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {

      const card = cards[i];
      const nameElement = card.querySelector('.card-name');
      const name = nameElement.textContent.toLowerCase();

      if(name.includes(searchItem)) {
        card.style.display = 'flex';

    } else {

        card.style.display = 'none';

      }}

});





// Calling all to execute the script

fetchUsersAndCreateCards();







