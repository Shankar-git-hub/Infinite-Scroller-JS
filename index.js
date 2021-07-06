const loader = document.getElementById("loader");
const imageContainer = document.getElementById("image-container");
const apiKey = "lEmQfY92eDy4dU_yH_JvkpuYgPK12I8CD5q8f_rq08s";
const count = 30;
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photoArray = [];
let totalImage = 0;
let ready = false;
let imageLoaded = 0;

// Function to check image is loaded or not
function checkImageLoaded() {
  imageLoaded++;
  if (imageLoaded === totalImage) {
    loader.hidden = true;
    ready = true;
  }
}

// function for set attributes

function setAttribute(elements, attributes) {
  for (const key in attributes) {
    elements.setAttribute(key, attributes[key]);
  }
}

// Populate photos on the screen

function displayPhotos() {
  totalImage = photoArray.length;
  photoArray.forEach((photos) => {
    // Create an anchor element
    let item = document.createElement("a");

    setAttribute(item, {
      href: photos.links.html,
      target: "_blank",
    });
    // Create an image element
    let image = document.createElement("img");

    setAttribute(image, {
      src: photos.urls.regular,
      alt: photos.alt_description,
      title: photos.alt_description,
    });
    image.addEventListener("load", checkImageLoaded());
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

// Fetch photos from Unsplash API Using below function.

async function getPhotos() {
  let response = await fetch(url);
  let jsonData = await response.json();
  photoArray = jsonData;
  displayPhotos();
}

// On load
getPhotos();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imageLoaded = 0;
    getPhotos();
  }
});
