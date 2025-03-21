const addCard = function (){
    
    const cardName = document.getElementById("card-name").value
    const cardDescription = document.getElementById("card-description").value
    const cardExpansion = document.getElementById("card-expansion").value
    const cardImg = document.getElementById("card-img").value
    const cardPrice = document.getElementById("card-price").value

    if (!cardName || !cardDescription || !cardExpansion || !cardImg || !cardPrice) {
        alert("Compila tutti i campi!");
        return;
    }

    const card = {
        name: cardName,
        description: cardDescription,
        brand: cardExpansion,
        imageUrl: cardImg,
        price: cardPrice,
    }
      

        fetch("https://striveschool-api.herokuapp.com/api/product/",{
            method: "post",
            body: JSON.stringify(card),
            headers: {
                'Content-Type': 'application/json',
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjgwZDM4MzRiZjAwMTUwMDA3MDEiLCJpYXQiOjE3NDI1NDY5NTgsImV4cCI6MTc0Mzc1NjU1OH0.vzKUGLaAgCnRP8e36hrgdDL4GwQ-6neRNOSeYfI-mgI"
            }
            }).then((response)=>{
                if(response.ok){
                    alert('SALVATAGGIO COMPLETATO!')
                }else{
                    throw new Error('ricevuta response non ok dal backend')
                }
            })
            .catch((err) => {
                console.log('errore nel salvataggio!', err)
              })
}

document.getElementById("save-button").addEventListener("click", function (e) {
    e.preventDefault();  
    addCard();  
});


const getCard = function(){
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "get",
    headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjgwZDM4MzRiZjAwMTUwMDA3MDEiLCJpYXQiOjE3NDI1NDY5NTgsImV4cCI6MTc0Mzc1NjU1OH0.vzKUGLaAgCnRP8e36hrgdDL4GwQ-6neRNOSeYfI-mgI"
    }
    })
    .then((response) =>{
        if(response.ok){
            console.log("va tutto bene",response) 
            return response.json()
        }else{
            throw new Error ("non funziona nulla")
        }
    })
    .then((data) =>{
        const select = document.getElementById("select-otpion")
        const selectDelete = document.getElementById("select-delete")
        selectDelete.innerHTML =""
        select.innerHTML = ""
        data.forEach(card => {
            const newOption = document.createElement("option")
            newOption.innerText = card.name
            newOption.value = card._id
            select.appendChild(newOption)
            const newOptionDelete = document.createElement("option")
            newOptionDelete.innerText = card.name
            newOptionDelete.value = card._id
            selectDelete.appendChild(newOptionDelete)
        });
    })
    .catch((error) => console.log("Errore nel caricamento dei dati:", error)) 
}

getCard()

const modifiCard = function(e){
    e.preventDefault()
    const cardNameModifi = document.getElementById("card-name-modifi").value
    const cardExpansionModifi = document.getElementById("card-expansion-modifi").value
    const cardSelected = document.getElementById("select-otpion").value

    if (!cardNameModifi || !cardExpansionModifi || !cardSelected) {
        alert("Compila tutti i campi!");
        return;
    }

    const modifiedCard = {
        name: cardNameModifi,
        brand: cardExpansionModifi
    }
    fetch(`https://striveschool-api.herokuapp.com/api/product/${cardSelected}`, {
        method: "put",
        body: JSON.stringify(modifiedCard),
    headers: {
        'Content-Type': 'application/json',
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
    .then((data) =>{
        getCard()
    })
    .catch((error) => console.log("Errore nel caricamento dei dati:", error)) 
}

const deleteCard = function(e){
    e.preventDefault()
    const cardDeleted = document.getElementById("select-delete").value

    fetch(`https://striveschool-api.herokuapp.com/api/product/${cardDeleted}`,{
        method: "delete",
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjgwZDM4MzRiZjAwMTUwMDA3MDEiLCJpYXQiOjE3NDI1NDY5NTgsImV4cCI6MTc0Mzc1NjU1OH0.vzKUGLaAgCnRP8e36hrgdDL4GwQ-6neRNOSeYfI-mgI"
        }
    })
    .then((result) =>{
        if(result.ok){
            alert("Carta eliminata")
        }else{
            throw new Error ("ci sono problemi")
        }
    })
    .then((data) =>{
        getCard()
    })
    .catch((error) => console.log("Errore nella delete", error))
    
}

const reset = function(){
    const cardName = document.getElementById("card-name").value
    const cardDescription = document.getElementById("card-description").value
    const cardExpansion = document.getElementById("card-expansion").value
    const cardImg = document.getElementById("card-img").value
    const cardPrice = document.getElementById("card-price").value

    cardName.value = '';
    cardDescription.value = '';
    cardExpansion.value = '';
    cardImg.value = '';
    cardPrice.value = '';
}