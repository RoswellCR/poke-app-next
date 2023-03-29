import Head from "next/head"
import { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import { Navbar } from "../ui";

interface MyProps {
    children: ReactNode,
    title?: string
}

const origin = (typeof window === 'undefined') ? '': window.location.origin;


export const Layout:FC<MyProps> = ({children, title}:MyProps ) => {
  
  
  return (
    <>
        <Head>
            <title>{ title || 'Listado de pokemon' }</title>
            <meta name="author" content="Rosbel CR" />
            <meta name="description" content={`Info del pokemon  ${title}`}/>
            <meta name="keywords" content={`${title}, pokemon , pokedex`}/>

            <meta property="og:title" content={`Información sobre ${title}`} />
            <meta property="og:description" content="Página del pokemon" />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head> 
    
        <Navbar/> 
    
        <main style={{
          padding: '0px 20px'
        }}>
            {children}
        </main>
    </>
  )
}
