
const toggleFavorite = (id: number) =>{
    //console.log('toglle llamado');
    let favorites : number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if(favorites.includes(id)){
        favorites = favorites.filter(pokeId => pokeId !==id)
    } else {
        favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites) );
}

const existInFavorites = (id: number): boolean => {
    //comprobar para si se ejecuta en el server retorne false
    if (typeof window === 'undefined') return false;

    const favorites : number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);
}

const pokemons = () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

export default {
    toggleFavorite,
    existInFavorites,
    pokemons
}