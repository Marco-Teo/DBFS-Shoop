
const getCard = function(){
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "get",
    headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjgwZDM4MzRiZjAwMTUwMDA3MDEiLCJpYXQiOjE3NDI1NDY5NTgsImV4cCI6MTc0Mzc1NjU1OH0.vzKUGLaAgCnRP8e36hrgdDL4GwQ-6neRNOSeYfI-mgI"
    }
    })
    .then((response) =>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error ("non funziona nulla")
        }
    })
    .then((data)=>{
        const rowElement = document.getElementById("card-container")
        rowElement.innerHTML=``
        let i = 0
        data.forEach(card => {
            const colomunElement = document.createElement("div")
            colomunElement.classList.add("col", "col-12", "col-md-3")
            colomunElement.id = i
            colomunElement.innerHTML=`<div class="card">
  <img src="${card.imageUrl}" class="card-img-top" alt="${card.name}">
  <div class="card-body">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text">${card.description} puoi trovare qeusta carta nell'espansione: ${card.brand}</p>
    <a href="./backoffice.html" class="btn btn-primary">Modifica</a>
  </div>
  <p class="card-text">€${card.price}</p>
</div>`
              rowElement.appendChild(colomunElement)
              i++
        });
    })
    .catch((error) => console.log("Errore nel caricamento dei dati:", error)) 
}

getCard()
