//SELECCION DE ELEMENTOS DEL DOM
const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

//VARIABLES DE CONTROL
let offset = 1;
let limit = 8;

//EVENT LISTENERS
    //PAGINA ANTERIOR
    previous.addEventListener('click', () => {
        if (offset != 1) {
            offset -= 9;
            removeChildNodes(pokemonContainer);
            fetchPokemons(offset, limit);
        }
    })

    //PAGINA SIGUIENTE
    next.addEventListener('click', () => {
        offset += 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    })

//FUNCIONES
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json()) //convertir a json
    .then(data => {
        createPokemon(data);
        spinner.style.display = "none";
    })
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    //TARJETA COMPLETA
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");

        //TARJETA FRONTAL Y POSTERIOR
        const cardContainer = document.createElement('div');
        cardContainer.classList.add("card-container");
        flipCard.appendChild(cardContainer);

            //PARTE FRONTAL
            const card = document.createElement('div');
            card.classList.add('pokemon-block');

                //CONTENEDOR DEL SPRITE
                const spriteContainer = document.createElement("div");
                spriteContainer.classList.add("img-container");
            
                    //SPRITE POKEMON
                    const sprite = document.createElement('img');
                    sprite.src = pokemon.sprites.front_default;
                    
                spriteContainer.appendChild(sprite);

                //ID POKEDEX
                const number = document.createElement('p');
                number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

                //NOMBRE DEL POKEMON
                const name = document.createElement('p');
                name.classList.add('name');
                name.textContent = pokemon.name;

            //ENSAMBLAJE DE LA PARTE FRONTAL
            card.appendChild(spriteContainer);
            card.appendChild(number);
            card.appendChild(name);

            //PARTE POSTERIOR DE LA TARJETA
            const cardBack = document.createElement('div');
            cardBack.classList.add('pokemon-block-back');

                //TIPOS DEL POKEMON
                const types = document.createElement('p');
                types.classList.add('name');
                types.textContent = "Tipos: " + pokemon.types.map(type => type.type.name).join(', ');

            cardBack.appendChild(types);

        //ENSAMBLAJE DE LA TARJETA COMPLETA
        cardContainer.appendChild(card);
        cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

//REMOVER TARJETAS QUE NO CORRESPONDEN A LA PAGINA ACTUAL
function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//INICIO DE LA APP
fetchPokemons(offset, limit);