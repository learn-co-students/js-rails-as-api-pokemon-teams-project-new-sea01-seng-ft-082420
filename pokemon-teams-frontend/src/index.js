const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){

  fetchTrainers()
 
  function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then (resp => resp.json())
     .then (trainers => trainers.forEach(trainer => buildCard(trainer)))
  }

    function addPokemon(trainer_id){
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({trainer_id: trainer_id})
      })
      .then(resp => resp.json())
      .then(pokemon => {
        let d = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
        console.log(pokemon)
      })
    }

  function deletePokemon(pokemon_id){
    fetch(`${POKEMONS_URL}/${pokemon_id}`,{
    method: 'DELETE'
    })
    .then(resp =>resp.json())
    .then(()=>{
      let releasedPokemon = document.querySelector(`[data-pokemon-id="${pokemon_id}"]`)
      releasedPokemon.parentNode.remove()
    })
  }
  

  function buildCard(trainer){
    let main = document.querySelector('main')
    let div = document.createElement('div')
    div.className ='card'
    div.setAttribute('data-id', trainer.id)
    div.textContent = trainer.name
    main.appendChild(div)

    let btn = document.createElement('button')
    btn.textContent ='Add Pokemon'
    btn.setAttribute('data-trainer-id', trainer.id)
    div.appendChild(btn)

    let ul = document.createElement('ul')
    div.appendChild(ul)
    
    trainer.pokemons.forEach(pokemon => {
      let li = document.createElement('li')
      li.textContent = `${pokemon.nickname} (${pokemon.species})`
      ul.appendChild(li)

      let releaseBtn = document.createElement('button')
      releaseBtn.className ='release'
      releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
      releaseBtn.innerText = 'Release'
      li.appendChild(releaseBtn)

      releaseBtn.addEventListener('click', ()=> deletePokemon(pokemon.id))

      btn.addEventListener('click', () => addPokemon(trainer.id))

    })
  }

  
  



   
   
  
  


})
