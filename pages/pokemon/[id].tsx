import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticPaths } from 'next'
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from 'querystring';
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts/layout"
import { PokemonListResponse, SmallPokemon } from "../../interfaces";
import { Pokemon } from '../../interfaces';


interface Props {
  pokemon : Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
  
  const router = useRouter();
  console.log(pokemon);

  return (
     <Layout title='X pokemon'>
         
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
              ghost
              >
                Guardar en favorito  
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
  
  //se crea un array con 151 elementos de tipo string
  const pokemon151 = [...Array(151)].map((value, index)=>`${index + 1}`)
  return {
    paths: pokemon151.map(id=>({
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

  return {
      props: {
         pokemon: data  
      }
  }
}


export default PokemonPage;