
const accesskey = "cBN1S4RDSOgG0ACK78d10yvMdwpqFtbsanNAkGSVCD4";

const formEl = document.querySelector("form");
const inputl = document.getElementById("searchinput");
const searchresults = document.querySelector(".inputx");
let inputdata = "";
let page = 1;
console.log(inputl);

async function searchimage() {
  inputdata = inputl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  console.log(results);
  if (page === 1) {
    searchresults.innerHTML = `<div></div>`
  }

  results.map((result) => {
    const imgwrap = document.createElement("div");
    imgwrap.classList.add("searchresults");
    const image = document.createElement("img");
    image.src = result.urls.small;
    imgwrap.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.innerHTML;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;

    imgwrap.appendChild(image);
    imgwrap.appendChild(imagelink);
    searchresults.appendChild(imgwrap);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchimage();
});