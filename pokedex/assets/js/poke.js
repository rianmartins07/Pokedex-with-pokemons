
$("#nome").keypress(function (e) { 
    let pokemonName = $("#nome").val();
    if (e.originalEvent.charCode === 13){
        fetchPokemon(pokemonName)
    }
});


function findPokemon() {
    let pokemonName = $("#nome").val();
    fetchPokemon(pokemonName)


}

function hideLeftSide(){
$(".container-2").animate({
    opacity: "toggle",
    right: "+=50px",
    width: "toggle",
    
})
}

function onLoad(){
    $(".container-2").hide();
}