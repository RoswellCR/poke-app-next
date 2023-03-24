import { FC } from "react";
import { Grid, Card } from "@nextui-org/react";
import FavoriteCardpokemon from './FavoriteCardpokemon';

interface Props {
    favoritePokemons: number[]
}

const FavoritePokemons:FC<Props> = ({favoritePokemons}) => {
  
    
    return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
               {
                favoritePokemons.map(id => (
                  <FavoriteCardpokemon id={id} key={id} />
                ))
               } 
            </Grid.Container>
  )
}

export default FavoritePokemons;