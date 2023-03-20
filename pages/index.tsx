import { Button } from "@nextui-org/react";
import { NextPage } from "next"
import { Layout } from "../components/layouts/layout";

 const Home: NextPage = () => {
    return (
        <Layout title='Listado de pokemons'>
            
            <Button color="gradient">Hola Mundo</Button>

        </Layout>
    )
}

export default Home;