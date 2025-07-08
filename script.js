// script.js

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gallery = document.getElementById('imageGallery');


const API_KEY = 'zd0KWpTeAu53is28npOGZtlmbQ8bnEgmfoJ0dZgfxbC9c7BCmZhGLlui'; 
const BASE_URL = 'https://api.pexels.com/v1/search';
const CURATED_URL = 'https://api.pexels.com/v1/curated';
// Show random popular photos on page load
window.addEventListener('DOMContentLoaded', () => {
  fetchPopularImages();
});

function fetchPopularImages() {
  // Pexels curated endpoint supports pagination, so pick a random page for variety
  const maxPages = 50; // Pexels allows up to 1000 curated photos, 12 per page
  const randomPage = Math.floor(Math.random() * maxPages) + 1;
  fetch(`${CURATED_URL}?per_page=12&page=${randomPage}`, {
    headers: {
      Authorization: API_KEY
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      displayImages(data.photos);
    })
    .catch(error => {
      console.error('Error fetching curated images:', error);
      gallery.innerHTML = `<p>Oops! Something went wrong loading popular images.</p>`;
    });
}

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
