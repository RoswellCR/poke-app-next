import { useState } from 'react';
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import confetti from 'canvas-confetti';
import { Pokemon, PokemonListResponse } from "../../interfaces"
import pokeApi from '../../api/pokeApi';
import { Layout } from '../../components/layouts/layout';
import { localFavorites } from '../../utils';



interface Props{
    pokemon : Pokemon
}

const PokemonByNamePage:NextPage<Props> = ({pokemon}) => {
  
  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));


  //const router = useRouter();
  //console.log(pokemon);


  const onToggleFavorite=()=>{
    //console.log('toggle')
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites);
    
    if(isInFavorites) return;
    
    confetti({
      zIndex: 999,
      particleCount:100,
      spread: 160,
      angle: -100,
      origin: {
        x:1,
        y:0
      }
    })

  }
  
  return (
    <Layout title={pokemon.name}>
        
     <Grid.Container css={{marginTop: '5px'}} gap={2}>
       <Grid xs = {12} sm={4}>
         <Card.Body>
           <Card.Image 
             src={pokemon.sprites.other?.dream_world.front_default || '/mp-image.png'}
             alt={pokemon.name}
             width="100%"
             height={200}
           />
         </Card.Body>
       </Grid>
       <Grid>
         <Card>
           <Card.Header css={{display:'flex', justifyContent:'space-between'}}>
             <Text h1 transform='capitalize'>{pokemon.name}</Text>
             <Button
             color={'gradient'}
             ghost = {!isInFavorites}
             onPress={onToggleFavorite}
             >
               {!isInFavorites? 'Guardar en favorito' : 'Favorito'}  
             </Button>
           </Card.Header>
           <Card.Body>
             <Text size={30}>Sprites:</Text>
             <Container direction='row' display='flex' gap={10}>
               <Image 
                 src={pokemon.sprites.front_default}
                 alt={pokemon.name}
                 width={100}
                 height={100}
               />
               <Image 
                 src={pokemon.sprites.back_default}
                 alt={pokemon.name}
                 width={100}
                 height={100}
               />
               <Image 
                 src={pokemon.sprites.front_shiny}
                 alt={pokemon.name}
                 width={100}
                 height={100}
               />
               <Image 
                 src={pokemon.sprites.back_shiny}
                 alt={pokemon.name}
                 width={100}
                 height={100}
               />
             </Container>
           </Card.Body>
         </Card>
       </Grid>
     </Grid.Container>

   </Layout>
 )
}

export default PokemonByNamePage;

// argumentos dinamicos permitidos para entrar en la ruta de la pagina 
export const getStaticPaths : GetStaticPaths = async (ctx) =>{

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=30')
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name) 

    
    return {
        paths: pokemonNames.map(name=>({
            params : {name: name}

        }))
        ,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params})=>{
    //{name} equivalente al nombre del archivo dinamico  [name].tsx
    const {name} = params as {name: string};

    
    const {data} = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

    //optimizando la data para solo extraer lo necesario
    const pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites
    }


    return {
        props: {
            pokemon: pokemon
        }
    }

}