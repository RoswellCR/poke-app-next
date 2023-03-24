import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Container, Text, Image, Grid, Card } from '@nextui-org/react';

import { Layout } from '../../components/layouts/layout';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import FavoritePokemons from '../../components/pokemon/FavoritePokemons';


 const FavoritesPage:NextPage = () => {
  
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  
  //se ejecuta del lado del cliente una vez renderizda la UI
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
    
    
  }, [])
  

  return (
    <Layout title='Favorite Pokemons'>
        
        {
          favoritePokemons.length ===0 ? <NoFavorites /> 
          : (
            <FavoritePokemons favoritePokemons={favoritePokemons}/>
          )
        }

    </Layout>
  )
}

export default FavoritesPage;

