
const imageContainer = document.getElementById("imageContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchinput");

const accessKey = "cBN1S4RDSOgG0ACK78d10yvMdwpqFtbsanNAkGSVCD4"; 
const count = 15;


async function fetchImages(query = "nature") {
  imageContainer.innerHTML = "Loading...";
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${accessKey}`
    );
    const data = await response.json();
    imageContainer.innerHTML = "";

    data.forEach((imgData) => {
      const card = document.createElement("div");
      card.classList.add("image-card");

      const img = document.createElement("img");
      img.src = imgData.urls.regular;
      img.alt = imgData.alt_description || "Image";

      const link = document.createElement("a");
      link.href = imgData.links.html;
      link.target = "_blank";
      link.appendChild(img);

      card.appendChild(link);
      imageContainer.appendChild(card);
    });
  } catch (error) {
    imageContainer.innerHTML = "Unable to load images.";
    console.error("Error fetching images:", error);
  }
}

// Load default
fetchImages();

// Search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  }
});
