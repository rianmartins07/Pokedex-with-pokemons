
$("#nome").keypress(function (e) {
    let pokemonName = $("#nome").val();
    if (e.originalEvent.charCode === 13) {
        fetchPokemon(`${pokemonName}`)
    }
});


function findPokemon() {
    let pokemonName = $("#nome").val();
    fetchPokemon(`${pokemonName}`)

}

var cont = 1

function countClick(mov = 0) {
    if (mov == 0) {
        cont--;
    } else if (mov == 1) {
        cont++
    }
    if (cont <= 0) {
        cont = 75

    } else if (cont > 75) {
        cont = 1;
    }
    showPokemons(cont)


}

function hideLeftSide(container = '') {

    let valueOpen = $(`.container-2${container}`).is(':visible');
    let valueContainer2 = $(`.container-2`).is(':visible');
    let valueContainer2Evolutions = $(`.container-2-evolutions`).is(':visible');

    if (container == '') {
        if (valueOpen) {
            close(container)
            $('#bt-poke').attr('src', './images/right-arrow.png');
  
        } else if (valueContainer2Evolutions) {
            close('-evolutions')
            ('#bt-evolve').attr('src', './images/right-arrow.png');
            showPokemons()
            setTimeout(open(container), 1000)
            $('#bt-poke').attr('src', './images/left-arrow.png');
        } else {

            showPokemons()
            setTimeout(open(container), 1000)
            $('#bt-poke').attr('src', './images/left-arrow.png');
        }
    }
    
    if (container == '-evolutions') {

        if (valueOpen) {
            close(container)
            $('#bt-evolve').attr('src', './images/right-arrow.png');
            console.log('right')
        } else if (valueContainer2) {
            close();
            $('#bt-poke').attr('src', './images/right-arrow.png');
            console.log('right')
            showEvolutions();
            setTimeout(open(container), 1000)
            $('#bt-evolve').attr('src', './images/left-arrow.png');
            console.log('left')
            
        } else {
            showEvolutions();
            setTimeout(open(container), 1000)
            $('#bt-evolve').attr('src', './images/left-arrow.png');
            console.log('left')
            
        }

    }




}

function open(container = '') {

    $(`.container-2${container}`).animate({
        opacity: "1",
        right: "+=50px",
        width: "toggle",
    })
    $(`.container-2${container}`).css('z-index', "2");

}
function close(container = '') {

    $(`.container-2${container}`).animate({
        opacity: "0.5",
        right: "+=50px",
        width: "toggle",
    })
    $(`.container-2${container}`).css('z-index', "1");  

}

function showPokemons(cont = 1) {


    let max = (cont * 12)
    let min = max - 11


    let i, j = 1
    let variableToHtml
    let variableNamePokemon
    let positions = []

    //(valueToggleRightSide)




    for (min; min <= max; min++) {


        $.ajax(`https://pokeapi.co/api/v2/pokemon/${min}`).done(function (response) {


            variableNamePokemon = response.name
            variableToHtml = `
                    <div id="${response.id}" onclick= fetchPokemon('${response.id}')>
                        <div class="mouse-hover">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png"
                            alt="" class="pokemon-table-unique-img" id="${response.id}">
                        </div>
                            <div class="pokemon-table-unique-name">
                            ${variableNamePokemon}
                        </div>
                    </div>
                        `



            $(`.all-pokemon-table-unique-${j}`).html(variableToHtml);


            j++
        })

        j = 1;
    }

}





function efectBlur() {

    $(".border-2px-solid-black-width-height").on({
        mouseover: function () {
            let id = this.id
            $(`.border-2px-solid-black-width-height #${id}`).css({
                transform: "scale(1.1)",
                transition: "all 0.5s",
                cursor: "pointer"
            });
        }, mouseleave: function () {
            let id = this.id
            $(`.border-2px-solid-black-width-height #${id}`).css({
                transform: "scale(1)",
                transition: "all 0.5s",
                cursor: "pointer"
            })
        }
    }, `div div img`)
}



function showEvolutions() {

    let containerVisible = $('.container-2').is(':visible');

    var id = $(".card").attr("id");


    if (id == undefined) {
        alert("Nenhum pokemon selecionado!!");
    } else {

      
        $.ajax(`https://pokeapi.co/api/v2/pokemon-species/${id}`).done(function (response) {
            let urlEvolution = response.evolution_chain.url

            ajaxEvolutionChain(urlEvolution, response.id);


        }).fail(function () {
            alert("Nenhum pokemon selecionado!!");

        });

    }


}


function ajaxEvolutionChain(url, id) {
    $.ajax(url).done(function (response) {
        let Evolution = [], i = 0;

        Evolution[0] = response.chain.species.name;
        Evolution[1] = response.chain.evolves_to[0] ? response.chain.evolves_to[0].species.name : null;
        Evolution[2] = response.chain.evolves_to[0].evolves_to[0] ? response.chain.evolves_to[0].evolves_to[0].species.name : null;

        
        var url_evolution = `https://pokeapi.co/api/v2/pokemon/`
        
        let tablePokemon = `
                      <div class="table-evolutions">
                        
                     </div>
                    `
        $('.container-2-evolutions').html(tablePokemon)
        for (i = 0; i < 3; i++) {
            
            if (Evolution[i]) {
                $.ajax(url_evolution + Evolution[i]).done(function (response) {
                let evolution_img = [];
                let pokemons
                    evolution_img = response.sprites.other['official-artwork'].front_default;
                    
                   
                        pokemons = `   
                            <div class="table-evolutions-item">
                            <div class="table-evolutions-item-pokemon">
                                <div class="mouse-hover">
                                    <img src="${evolution_img}"
                                        alt="" class="pokemon-table-unique-img" id="table-evolutions-item-pokemon">
                                </div>
                                <div class="table-evolutions-item-pokemon-name" id="${i}">
                                    ${response.name}
                                </div>
                            </div>
                        </div>       

                    `
                    
                    $('.table-evolutions').append(pokemons);
                    
                }).fail(function () {

                })
            } else {
                break;
            }
        }



    }).fail(function () {
        alert("Nenhum pokemon selecionado!!");

    });

   
}






efectBlur()
function onLoad() {
    $('.container-2').hide();
    $('.container-2-evolutions').hide();
}
