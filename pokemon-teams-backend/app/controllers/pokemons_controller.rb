class PokemonsController < ApplicationController

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: new_pokemon 
    end

    def destroy
        deleted_pokemon = Pokemon.find(params[:id])
        Pokemon.find(params[:id]).destroy
        render json: deleted_pokemon
    end
end
