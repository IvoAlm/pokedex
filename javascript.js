	

document.addEventListener('alpine:init', () => {
    Alpine.data('pokedexAlpine', () => ({
        acrescentar:  1,
		interval: null,
		contarImagem: 1,
		numPesquisa: '',
        dataPokemon: [],
        imagePokemon:'',
        nomePokemon:'',
        mainImagePokemon:'',
        pokemonName:'',
        pokemonNumber:'',
        pokemonWeight:'',
        pokemonType:'',
        buttonGlass:'',
        miniButtonGlass5:'',


        alterarNumPokedex(num) {
            this.numPesquisa = this.numPesquisa + num
        },

        search() {
            this.acrescentar = parseInt(this.numPesquisa);
            this.escolherPokemon(this.acrescentar);
            this.reset();
        },

        reset() {
            this.numPesquisa = ""
        },

        turnOn() {
            this.escolherPokemon(1);
            this.acrescentar = 1
            this.buttonGlass = "miniButtonGlassOn";
            this.miniButtonGlass5 = 'miniButtonGlassOnGreen';
        },

        turnOff() {
            this.acrescentar = 0
            clearInterval(this.interval)
            this.imagePokemon = '';
            this.mainImagePokemon = '';
            this.pokemonName = '';
            this.pokemonWeight = '';
            this.pokemonType = '';
            this.pokemonNumber = '';
            this.buttonGlass = '';
            this.miniButtonGlass5 = ''
        },

        escolherPokemon(pokemonId){
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(response => response.json())
            .then(data => { this.dataPokemon = data;
                this.mainImagePokemon = this.dataPokemon.sprites.front_default;
                this.pokemonName = 'Nome: ' + this.dataPokemon.species.name;
                this.pokemonWeight = 'Weight: ' + this.dataPokemon.weight;
                this.pokemonType = 'Type: ' + this.dataPokemon.types[0].type.name;
                this.pokemonNumber = 'Pokémon nº' + this.dataPokemon.id;
                if(this.interval) {
                    clearInterval(this.interval);
                }

                this.interval = setInterval(()=>{
                    this.trocaImagem(this.dataPokemon);
                    this.contarImagem++;
                }, 1000);
            }) 
        },

        trocaImagem(pokemon){	
            if(this.contarImagem == 1) {
                this.imagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`;
                this.nomePokemon = pokemon.name
            } else if ( this.contarImagem == 2) {
               this.imagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`
                this.nomePokemon = pokemon.name
            } else if (this.contarImagem == 3) {
               this.imagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`
                this.nomePokemon = pokemon.name
            } else {
               this.imagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
                this.nomePokemon = pokemon.name
                this.contarImagem = 1;
            }
        },


        nextPokemon(){
            this.acrescentar += 1;
            this.escolherPokemon(this.acrescentar);
        },


        backPokemon(){
            this.acrescentar -= 1;

            if (this.acrescentar < 0){
            this.acrescentar = 1;
            }
            this.escolherPokemon(this.acrescentar);
        },	
    }))
})
        
