const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
        displayTrainers(trainers)
    })
}

fetchTrainers()

function displayTrainers(trainers) {
    trainers.forEach(trainer => {
        let div =document.createElement('div')
        div.dataset.id = trainer.id
        div.setAttribute('class', 'card')

        let p = document.createElement('p')
        p.textContent = trainer.name

        let addBtn = document.createElement('button')
        addBtn.setAttribute('data-trainer-id', trainer.id)
        addBtn.textContent = "Add Pokemon"

        let ul = document.createElement('ul')
        ul.setAttribute('id', `${trainer.id}l`)

        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement('li')
            li.textContent = `${pokemon.nickname} (${pokemon.species})`
            let releaseBtn = document.createElement('button')
            releaseBtn.setAttribute('class', 'release')
            releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
            releaseBtn.textContent = 'Release'
            releaseBtn.addEventListener('click', () => {
                releasePokemon(pokemon)
                li.remove()
            })
            li.append(releaseBtn)
            ul.append(li)
        })


        addBtn.addEventListener('click', (e) => {
            let poke =ul.getElementsByTagName('li')
            if (poke.length < 6){
                addPokemon(trainer)
            }
        })

        // trainer.pokemons.forEach(pokemon => {
        //     let li = document.createElement('li')
        //     li.textContent = `${pokemon.nickname} (${pokemon.species})`
        //     let releaseBtn = document.createElement('button')
        //     releaseBtn.setAttribute('class', 'release')
        //     releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        //     releaseBtn.textContent = 'Release'
        //     releaseBtn.addEventListener('click', () => {
        //         releasePokemon(pokemon)
        //         li.remove()
        //     })
            // li.append(releaseBtn)
            // ul.append(li)
        // })

        div.append(p, addBtn, ul)


        main.appendChild(div)
    })
}

function addPokemon(trainer) {
    console.log(trainer.pokemons.length)
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'trainer_id': trainer.id
        })
    })
    .then(res => res.json())
    .then(pokemon => {
        let ul = document.getElementById(`${trainer.id}l`)
        // ul.innerHTML = ''
        let li = document.createElement('li')
        li.textContent = `${pokemon.nickname} (${pokemon.species})`
        let releaseBtn = document.createElement('button')
        releaseBtn.setAttribute('class', 'release')
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        releaseBtn.textContent = 'Release'
        releaseBtn.addEventListener('click', () => {
            releasePokemon(pokemon)
            li.remove()
        })
        li.append(releaseBtn)
        ul.append(li)
        // let poke =ul.getElementsByTagName('li')
        // console.log(poke.length)
    })

}

function releasePokemon(pokemon) {
    fetch((`${POKEMONS_URL}/${pokemon.id}`), {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {

    })
}


{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}