const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers(){
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainers => trainers.forEach( trainer => buildTrainers(trainer)))

}
getTrainers()

function buildTrainers(trainer){
    let main = document.querySelector('main')
    let trainerCard = document.createElement('div')
    let addPokemonButton = document.createElement('button')
    let trainerName = document.createElement('p')
    let pokemonList = document.createElement('ul')

    trainerCard.className = 'card'
    trainerCard.dataset.id = trainer.id
    trainerName.textContent = trainer.name 
    addPokemonButton.dataset.trainerId = trainer.id 
    addPokemonButton.textContent = 'Add Pokemon'

    addPokemonButton.addEventListener('click', () => {
        fetch(POKEMONS_URL, {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'   
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })   
        } )
        .then(res => res.json())
        .then(pokemon => {
            trainer.pokemons.push(pokemon)
            displayPokemon(pokemon, pokemonList)
            if (pokemonList.children.length >= 6){
                addPokemonButton.disabled = true
            }})
        

    })
    
    trainer.pokemons.forEach(pokemon => displayPokemon(pokemon, pokemonList))
    if (trainer.pokemons.length >= 6){
        addPokemonButton.disabled = true
    }

    trainerCard.append(trainerName, addPokemonButton, pokemonList)
    main.appendChild(trainerCard) 

}

function displayPokemon(pokemon, pokemonList){
   
        let pokemonLi = document.createElement('li')
        let releaseButton = document.createElement('button')

        pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species}) `
        releaseButton.className = 'release'
        releaseButton.textContent = 'Release'
        releaseButton.dataset.pokemonId = pokemon.id

        pokemonLi.appendChild(releaseButton)
        pokemonList.appendChild(pokemonLi)

        releaseButton.addEventListener('click', ()=>{
            fetch(`${POKEMONS_URL}/${pokemon.id}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(() => {
                pokemonLi.remove()
                if (pokemonList.parentElement.querySelector('button').disabled){
                    pokemonList.parentElement.querySelector('button').disabled = false
                }
            })
        } )

    
}