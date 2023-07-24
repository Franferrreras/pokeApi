window.onload = iniciar;

const list_api = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
const poke_api = `https://pokeapi.co/api/v2/pokemon/`

const pokemons_list = ['bulbasaur','ivysaur','venusaur','charmander','charmeleon', 'charizard','squirtle', 'wartortle', 'blastoise','caterpie']


function iniciar () {
    cargarApi();
    cargar_data_pokemon()
}

function generar_select(pokemons_api) {
    let select = document.getElementById("select_pokemon")

    for (let pokemon of pokemons_api.results) {
        let option = document.createElement("option")

        option.innerHTML = pokemon.name;
        option.setAttribute("value", pokemon.name)
        
        select.appendChild(option);
    }
    select.onchange = cargar_data_pokemon;
    
}
let count  = 0;
// function cargar_data_pokemon() {
//     console.log(count);

//     if (count == 0) {
//         count ++;
//         fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur`)
//         .then((resp) => resp.json())
//         .then( (data) => {
//             console.log(data)
//             generar_ficha(data)
//         })
//         .catch( error => console.log(error))
//         return
//     }

//     let pokemon = document.getElementById("select_pokemon").value
//     console.log(pokemon)

//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     .then((resp) => resp.json())
//     .then( (data) => {
//         console.log(data)
//         generar_ficha(data)
//     })
//     .catch( error => console.log(error))
// }
async function cargar_data_pokemon() {
    console.log(count);

    try {
        let pokemonData;
        if (count === 0) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur`);
            pokemonData = await response.json();
            count++;
        } else {
            const pokemon = document.getElementById("select_pokemon").value;
            console.log(pokemon);

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            pokemonData = await response.json();
        }

        console.log(pokemonData);
        generar_ficha(pokemonData);
    } catch (error) {
        console.log(error);
    }
}

let myChart;

function generar_ficha(pokemon_data) {
    let poke_detail = document.getElementById("poke_detail")
    poke_detail.innerHTML = "";

    let card = document.createElement("div")
    card.className = "card"

    let div = document.createElement("div")
    div.className = "img-container"


    let img = document.createElement("img")
    img.setAttribute("src", pokemon_data.sprites.front_shiny)
    img.setAttribute("alt","")

    div.appendChild(img)

    let cardContent = document.createElement("div")
    cardContent.className = "card-content"

    let h3 = document.createElement("h3")
    h3.innerHTML = pokemon_data.name.toUpperCase()

    let p = document.createElement("p")
    p.innerHTML = "Esto es un texto descriptivo del pokemon"

    cardContent.appendChild(h3)
    cardContent.appendChild(p)

    card.appendChild(div)
    card.appendChild(cardContent)

    poke_detail.appendChild(card)


    const ctx = document.getElementById('myChart');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
        labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
        datasets: [{
            label: pokemon_data.name + ' stats',
            data: [
                pokemon_data.stats[0].base_stat, 
                pokemon_data.stats[1].base_stat, 
                pokemon_data.stats[2].base_stat, 
                pokemon_data.stats[3].base_stat, 
                pokemon_data.stats[4].base_stat, 
                pokemon_data.stats[5].base_stat],
            borderWidth: 1,
            pointBackgroundColor: ['#FF0000', '#FFA500', '#008000', '#0000FF', '#EE82EE','#FFFF00'],
            borderColor: ['#C2C2C2 '],
            borderCapStyle: ['red'],
            fill: false
        }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                    }
                }
        }
    });

    

}

function cargarApi() {

    fetch(list_api )
    .then ( response => response.json())
    .then( (data) => {
        console.log(data)
        generar_select(data);
    })
    .catch( error => console.log(error))
}
