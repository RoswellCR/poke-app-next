import { useState } from 'react';
import { GetStaticPaths } from 'next'
import { GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts/layout"
import { PokemonListResponse, SmallPokemon } from "../../interfaces";
import { Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';



interface Props {
  pokemon : Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  
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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //const { data } = await  // your fetch function here 
  
  //se crea un array con 30 elementos de tipo string
  const pokemon30 = [...Array(30)].map((value, index)=>`${index + 1}`)
  
  return {
    paths: pokemon30.map(id=>({
      params: {id: id}
    }))
    ,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  //console.log(params)
  const {id} = params as {id: string};
  
  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  //optimizando la data para extraer solo lo necesario
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


export default PokemonPage;