let pokemons = [' '];
const listaPokemon = document.getElementById('pokedexl_ist_render_container')

/**fetch pokemon name and id */
async function getAllNames() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1010';
    let response = await fetch(url);
    let responseAsJson = await response.json();

    for (let i = 0; i < responseAsJson.results.length; i++) {
        pokemons.push({
            id: i + 1,
            name: responseAsJson.results[i].name,
            types: []
        });
    };

    let data = [];

    for (let i = 1; i <= 1010; i++) {
        let response2 = await fetch(URL + i);
        let responseAsJson2 = await response2.json();
        data.push(responseAsJson2);
    }

    for (const d of data) {
        renderCard(d);
    }

    getAllTypes();
};

/**fetch pokemon types */
async function getAllTypes() {
    for (let i = 0; i < 18; i++) {
        let url = 'https://pokeapi.co/api/v2/type/' + (i + 1)
        let response = await fetch(url)
        let responseAsJson = await response.json()

        const pokemonInType = responseAsJson.pokemon
        
        for(j = 0; j < pokemonInType.length; j++) {
            const pokemonId = pokemonInType[j].pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');

            if(pokemonId <= pokemons.length && pokemons[pokemonId]) {
                pokemons[pokemonId].types.push(responseAsJson.name);
            };
        };
    };

    loadingCompletion();
};

/**hide loading div after completion */
function loadingCompletion() {
    const loadingDiv = document.getElementById('loading-div');
    loadingDiv.classList.add('hideLoading');
    evento_botones_clase()
    setTimeout(function() {
        loadingDiv.classList.replace('hideLoading', 'hide');
        document.body.style.overflow = 'unset';
    }, 500);

    pokemons.splice(0, 1);
    currentList = pokemons;

    updatePokemonList();
};
