//SELECCION DE ELEMENTOS DEL DOM
const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector("#spinner");

//VARIABLES DE CONTROL
let offset = 1;
let limit = 17;

//FUNCIONES
function fetchType(id) {
    fetch(`https://pokeapi.co/api/v2/type/${id}/`)
    .then(res => res.json()) //convertir a json
    .then(data => {
        createPokemon(data);
        spinner.style.display = "none";
    })
}

function fetchTypes(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchType(i);
    }
}

function createPokemon(pokemon) {
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");
    flipCard.appendChild(cardContainer);

    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');

    const types = document.createElement('p');

    cardBack.appendChild(types);

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//INICIO DE LA APP
fetchTypes(offset, limit);