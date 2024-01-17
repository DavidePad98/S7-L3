const library = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        console.log("Contenuto ricevuto");
        return response.json();
      }
      if (response.status >= 100 && response.status < 200) {
        console.log("Informazioni per il client");
      }
      if (response.status >= 300 && response.status < 399) {
        console.log("Redirezione");
      }
      if (response.status >= 400 && response.status < 499) {
        console.log("Richiesta errata");
      }
      if (response.status >= 500 && response.status < 599) {
        console.log("Errore sul server");
      } else throw new Error();
    })
    .then((libraryObj) => {
      console.log("libraryObj", libraryObj);
      const newCol = document.getElementById("new-col");
      libraryObj.forEach((book) => {
        const newCard = document.createElement("div");
        newCard.classList.add("col");
        newCard.innerHTML = `<div class="card" style=' height:100%;'>
<img src="${book.img}" class="card-img-top img-fluid" alt="...">
<div class="card-body d-flex flex-column justify-content-between">
<div>
<h6>${book.category}</h6>
<h5 class="card-title">${book.title}</h5>
<h3>${book.price}$</h3>
</div>
  <div class='d-flex flex-column'>
  <button class="btn btn-primary my-2" onclick='saveCard(event)'>Compra ora</button>
  <button class="btn btn-danger" onclick='eliminaCard(event)'>Scarta</button>
  </div>
</div>
</div> `;
        newCol.appendChild(newCard);
      });
    })
    .catch((error) => console.log("Si è verificato un errore!", error));
};

const savedBooks = [];

const saveCard = (event) => {
  const colElement = event.target.closest(".col");
  const titleElement = colElement.querySelector(".card-title");
  const bookTitle = titleElement.textContent;
  const listShipping = document.getElementById("lista-acquisti");
  const newLi = document.createElement("li");
  newLi.innerHTML = `
       <a class="dropdown-item" href="#">${bookTitle}</a>       `;
  listShipping.appendChild(newLi);
  //   ------
  savedBooks.push(bookTitle);
  localStorage.setItem("savedTitles", JSON.stringify(savedBooks));
  console.log("Titoli salvati:", savedBooks);
};

const eliminaCard = (event) => {
  event.target.closest(".col").remove();
};

library();
