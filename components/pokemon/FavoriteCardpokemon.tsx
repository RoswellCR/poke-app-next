import { FC } from "react";
import { useRouter } from "next/router";
import { Grid, Card } from "@nextui-org/react"

interface Props {
    id: number
}

const FavoriteCardpokemon:FC<Props> = ({id}) => {
    
    const router = useRouter();

    const onFavoriteClick = () =>{
        router.push(`/pokemon/${id}`);
        
    }

    return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id} onClick={onFavoriteClick}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
}

export default FavoriteCardpokemon