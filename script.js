import got from "./data.js";
let body = document.querySelector("body");

let nameTab = document.createElement("div");
nameTab.className = "nameTab";

let cardsContainer = document.createElement("div");
cardsContainer.className = "cardsContainer";
let cardFlex = document.createElement("div");
cardFlex.className = "cardFlex";
cardsContainer.appendChild(cardFlex);

function makeCard(housename, data) {
  let card = document.createElement("div");
  card.className = "card";
  card.id = housename.toLowerCase();
  let dp = document.createElement("img");
  dp.src = data.image;
  dp.className = "dp";
  card.appendChild(dp);
  let name = document.createElement("div");
  name.textContent = data.name;
  name.className = "name";
  card.appendChild(name);
  let desc = document.createElement("div");
  desc.textContent = data.description;
  desc.className = "desc";
  card.appendChild(desc);
  let knowMore = document.createElement("a");
  knowMore.href = data.wikiLink;
  knowMore.className = "knowMore";
  knowMore.textContent = "KNOW MORE!";
  card.appendChild(knowMore);
  cardFlex.appendChild(card);
}

got.houses.forEach((detail) => {
  let tab = document.createElement("div");
  tab.className = "tab";
  tab.setAttribute("clicked", "false");
  tab.textContent = detail.name.toUpperCase();
  nameTab.appendChild(tab);
});
body.appendChild(nameTab);
body.appendChild(cardsContainer);

got.houses.forEach((data) => {
  data.people.forEach((item) => {
    makeCard(data.name, item);
  });
});

let cards = document.querySelectorAll(".card");

nameTab.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.className === "tab") {
    if (event.target.getAttribute("clicked") === "false") {
      Array.from(nameTab.children).forEach((tab) => {
        tab.style.backgroundColor = "black";
        tab.style.color = "white";
        tab.setAttribute("clicked", "false");
      });
      event.target.style.backgroundColor = "white";
      event.target.style.color = "black";
      event.target.setAttribute("clicked", "true");
      Array.from(cards).forEach((item) => {
        item.style.display = "none";
      });
      let selectedCards = document.querySelectorAll(
        `#${event.target.textContent.toLowerCase()}`
      );
      Array.from(selectedCards).forEach((item) => {
        item.style.display = "flex";
      });
    } else {
      event.target.style.backgroundColor = "black";
      event.target.style.color = "white";
      event.target.setAttribute("clicked", "false");
      Array.from(cards).forEach((item) => {
        item.style.display = "flex";
      });
    }
  }
});

let search = document.querySelector(".inputclass");
search.addEventListener("input", (event) => {
  Array.from(cards).forEach((item) => {
    if (event.target.value !== "") {
      if (!item.id.toLowerCase().includes(event.target.value.toLowerCase())) {
        console.log(event.target.value.toLowerCase());
        console.log(item.id.toLowerCase());
        item.style.display = "none";
      } else {
        item.style.display = "flex";
      }
    }else{
        Array.from(nameTab.children).forEach((tab) => {
            tab.style.backgroundColor = "black";
            tab.style.color = "white";
            tab.setAttribute("clicked", "false");
          });
    }
  });
});
