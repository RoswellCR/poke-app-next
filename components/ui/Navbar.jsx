import Image from "next/image";
import NextLink from "next/link";
import { Link, Spacer, Text, useTheme } from "@nextui-org/react"


export const Navbar = () => {
  
  const {theme} = useTheme()

    return (
    <div style ={{
        display:'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0x 20px',
        backgroundColor: theme.colors.gray400.value
    }}>
        <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        alt="icono de la app"
        width={70}
        height={70}
        />
        
        <NextLink href="/" passHref legacyBehavior>
          <Link href="/">
            <Text color="white" h2>P</Text>
            <Text color="white" h3>okemon</Text>
          </Link>
        </NextLink>
        
        <Spacer css={{flex: '1' }}/>
        
        <NextLink href="/favorites" passHref legacyBehavior >
          <Link href="/favorites" css={{marginRight: '20px'}} >
            <Text color="white" >Favorites</Text>
          </Link>
        </NextLink>  
    </div>
  )
}


