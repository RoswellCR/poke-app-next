import { Grid } from "@nextui-org/react";
import { NextPage, GetStaticProps } from "next"
import { pokeApi } from "../api";
import { Layout } from "../components/layouts/layout";
import { PokemonCard } from "../components/pokemon/PokemonCard";
import { PokemonListResponse, SmallPokemon } from "../interfaces";



interface Props  {
    pokemons: SmallPokemon[]
}

 const Home: NextPage<Props> = (props) => {
    //console.log(props)

    return (
        <Layout title='Listado de pokemons'>
            
            <Grid.Container gap={2} justify='flex-start'>
                {
                props.pokemons.map((pokemon) =>(
                    <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                )) 
                }
            </Grid.Container>

        </Layout>
    )
}


export const getStaticProps: GetStaticProps = async (props) => {
    // const { data } = await  // your fetch function here 
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=30');
    //console.log(data);

    //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/130.svg
    
    const pokemons : SmallPokemon[] = data.results.map((poke , i)=>({
        ...poke,
        id: i + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
            
        }
    ))

    return {
        props: {
            pokemons
        }
    }
}


export default Home;