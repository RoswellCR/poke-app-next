import { Container, Text, Image } from "@nextui-org/react"
//import Image from 'next/image'

export const NoFavorites = () => {
  return (
    <Container
    css={{
      display: 'flex',
      flexDirection: 'column',
      // 100 view height menos 100px del navbar
      height: 'calc(100vh - 100px)',
      alignItems: 'center',
      justifyContent:'center',
      alignSelf:'center',
    }}
    >
      <Text h1>No hay favoritos</Text>
      <Image 
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}
        alt='No favorites'
        width={250}
        height={250}
        css={{opacity:0.3}}
        />
    </Container>
  )
}
