

const fetchPokemon = (namePokemon) => {

  namePokemon = namePokemon.toLowerCase()

  let nome;
  let tipo1, tipo2

  var objPoke = []
  var pokemon = {}
 
  if (namePokemon ==='ronaldo'){
    namePokemon = 'snorlax';
  }

  $.ajax(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`).done(function (response) {

    nome = response.name

    tipo1 = response.types[0] ? response.types[0].type.name : null;
    tipo2 = response.types[1] ? response.types[1].type.name : null;


    pokemon['name'] = nome;
    pokemon['type'] = tipo1;

    if (tipo2) {
      pokemon['type2'] = tipo2;
    }

    objPoke.push(pokemon)

    let lisPokemons

    lisPokemons = (`

    <div class="card ${response.types[0].type.name}">
    <div class="pokemon-name-2">
      <h2 class="card-title">${response.name}</h2>
      <h2 class="hp-pokemon">HP ${response.stats[0].base_stat}</h2>
    </div>
    <img class="card-image" alt="${response.name}"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png">


    <p class="card-subtitle">${objPoke[0].type} ` + (tipo2 ? `| ${response.types[1].type.name}` : '') + ` </p>

    <div class="card-info">
      <div class="base-stats">
        <div class="attack">
          <div class="h2">
            Base - stats
          </div>
          <img src="./images/shield.png">
        </div>
        <div class="pokemon-atribute">
          <div class="pokemon-atribute-name">
            <p>Attack:</p>
            <p>Defense:</p>
            <p>Special-attack:</p>
            <p>Special-defense:</p>
            <p>Speed:</p>
          </div>
          <div class="pokemon-atribute-value">
            <p>${response.stats[1].base_stat}</p>
            <p>${response.stats[2].base_stat}</p>
            <p>${response.stats[3].base_stat}</p>
            <p>${response.stats[4].base_stat}</p>
            <p>${response.stats[5].base_stat}</p>
          </div>
          <img src="./images/shield.png">
        </div>

      </div>

      <div class="pokemon-ability">
        <div class="abilities">
        <img src="./images/livro-de-magia.png" alt="">
          <div class="h2">
            Abilities
          </div>

        </div>
        <div class="pokemon-ability-name">
          <div class="pokemon-ability-realy-name">
            <p>${response.abilities[0].ability.name}</p>
            <p>${response.abilities[1].ability.name}</p>
          </div>

          <img src="./images/livro-de-magia.png" alt="">

        </div>
      </div>
    </div>

  </div>

          `)
    $('.pokemon-place-img').html(lisPokemons)


  }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
    $("#nome").attr('placeholder', 'Pokemon não encontrado')
    $("#nome").val('')
    setTimeout(function () {
      $("#nome").attr('placeholder', 'Insira o nome do pokemon')
    }, 3000)
  })
}




