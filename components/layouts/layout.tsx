import Head from "next/head"
import { FC, ReactNode } from "react";
import { Navbar } from "../ui";

interface MyProps {
    children: ReactNode,
    title?: string
}

export const Layout:FC<MyProps> = ({children, title}:MyProps ) => {
  return (
    <>
        <Head>
            <title>{ title || 'Listado de pokemon' }</title>
            <meta name="author" content="Rosbel CR" />
            <meta name="description" content={`Info del pokemon  ${title}`}/>
            <meta name="keywords" content={`${title}, pokemon , pokedex`}/>
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
