const form = document.querySelector('form');
const input = document.querySelector('input');
const notice = document.querySelector('.search p');
const img = document.querySelector('.temp img');
const temp = document.querySelector('.temp span');
const city = document.querySelector('.city');
const date = document.querySelector('.date');

let today = new Date().toLocaleDateString();
date.innerText = `${today}`;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = input.value;
  notice.innerText = 'Loading...';

  fetch(`/weather?address=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        notice.innerText = data.error;
      } else {
        notice.innerText = '';
        img.setAttribute('src', data.imgUrl);
        temp.innerText = data.temperture;
        city.innerText = data.location;
      }
    });
});
