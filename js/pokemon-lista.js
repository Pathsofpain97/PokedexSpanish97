let currentlyShowingAmount = 0;
let maxIndex = 29;
let currentList = [];

const typeColors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
    'shadow': '#0E2E4C'
};

/**actualizar la lista de pokemon a */
function updatePokemonList() {
    if (currentlyShowingAmount <= maxIndex) {
        renderPokemonListItem(currentlyShowingAmount);
    };
};

function renderCard(data){
    listaPokemon.insertAdjacentHTML('beforeend', `<div onclick="openInfo(${data.id})" class="pokemon-render-result-container container center column">
        <img class="search-pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png">
         <span class="bold font-size-12">N° ${data.id}</span>
            <h3>${dressUpPayloadValue(data.name)}</h3>
                  ${getTypeContainers(data.types)}
        </div>`);
}

/**renderizar */
function renderPokemonListItem(index) {
    if (currentList[index]) {
        listaPokemon.insertAdjacentHTML('beforeend', `<div onclick="openInfo(${currentList[index].id})" class="pokemon-render-result-container container center column">
        <img class="search-pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentList[index].id}.png">
         <span class="bold font-size-12">N° ${currentList[index].id}</span>
            <h3>${dressUpPayloadValue(currentList[index].name)}</h3>
                  ${getTypeContainers(currentList[index].types)}
        </div>`);

        currentlyShowingAmount += 1;

        updatePokemonList();
    };
};

function increaseMaxIndex(by) {
    if (maxIndex + by <= currentList.length) {
        maxIndex += by;
    } else {
        maxIndex = currentList.length - 1;
    };
};

/**obtener tipos de contenedores para información de pokemon */
function getTypeContainers(typesArray) {
    let htmlToReturn = '<div class="row">';
    typesArray.map(e => {
        if(e.type !== undefined)
        {
            htmlToReturn += `<div class="type-container" style="background: ${typeColors[e.type.name]};">
            ${dressUpPayloadValue(e.type.name)}
            </div>`; 
        }
    })
    return htmlToReturn + '</div>';
};

/**al pulsar la tecla de entrada de búsqueda*/
function search() {
    setTimeout(function () {
        let searchResults = [];

        for (let i = 0; i < pokemons.length; i++) {
            if (pokemons[i].name) {
                if (pokemons[i].name.replaceAll('-', ' ').includes(document.getElementById('search-input').value.toLowerCase())) {
                    searchResults.push(pokemons[i]);
                };
            };
        };
        console.log(searchResults)
        listaPokemon.innerHTML = '';

        currentList = searchResults;
        currentlyShowingAmount = 0;
        maxIndex = 0;

        increaseMaxIndex(30);
        updatePokemonList();
    }, 1);
};


/** Scroll */
window.addEventListener('scroll', function () {
    addNewScrollPokemon();
    updateBackToTopVisibility();
});

/**agregue un nuevo pokemon de desplazamiento cuando se alcance el fondo */
function addNewScrollPokemon() {
    if (window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
        increaseMaxIndex(30);
        updatePokemonList();
    };
};

/**hacer visible el botón de volver al principio */
function updateBackToTopVisibility() {
    if(window.scrollY > window.innerHeight) {
        document.getElementById('back-to-top-button').classList.remove('hide');
    } else {
        document.getElementById('back-to-top-button').classList.add('hide');
    };
};

function backToTop() {
    window.scrollTo(0, 0);
};


/**disfrazar el valor de la carga útil */
function dressUpPayloadValue(texto) {
    let splitStr = texto.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
};