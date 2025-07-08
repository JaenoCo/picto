// script.js

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gallery = document.getElementById('imageGallery');

const API_KEY = 'zd0KWpTeAu53is28npOGZtlmbQ8bnEgmfoJ0dZgfxbC9c7BCmZhGLlui'; 
const BASE_URL = 'https://api.pexels.com/v1/search';

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query !== '') {
    fetchImages(query);
  }
});

//get images from pexels
function fetchImages(query) {
  fetch(`${BASE_URL}?query=${encodeURIComponent(query)}&per_page=12`, {
    headers: {
      Authorization: API_KEY
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`); //error handling
      }
      return res.json();
    })
    .then(data => {
      displayImages(data.photos);
    })
    .catch(error => {
      console.error('Error fetching data from Pexels API:', error); //error handling
      gallery.innerHTML = `<p>Oops! Something went wrong. Please try again later.</p>`;
    });
}

function displayImages(photos) {
  gallery.innerHTML = ''; // Clear previous images
  if (photos.length === 0) {
    gallery.innerHTML = `<p>No images found. Try a different keyword!</p>`;
    return;
  }

  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt;
    img.title = `Photo by ${photo.photographer}`;
    gallery.appendChild(img);
  });
}
