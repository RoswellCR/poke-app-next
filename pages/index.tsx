import { NextPage, GetStaticProps } from "next"
import { pokeApi } from "../api";
import { Layout } from "../components/layouts/layout";
import { PokemonListResponse } from "../interfaces";

 const Home: NextPage = (props) => {
    console.log(props)

    return (
        <Layout title='Listado de pokemons'>
            
            <ul>
                <li>Pokemon</li>
                <li>Pokemon</li>
                <li>Pokemon</li>
                <li>Pokemon</li>
                <li>Pokemon</li>
            </ul>

        </Layout>
    )
}


export const getStaticProps: GetStaticProps = async (props) => {
    // const { data } = await  // your fetch function here 
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    //console.log({data});

    console.log(props)
    return {
        props: {
            pokemons: data.results
        }
    }
}


export default Home;