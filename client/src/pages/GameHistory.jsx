import {ME} from "../utils/queries"
import {useQuery} from "@apollo/client"
const GameHistory = () =>{

    const {loading, data} = useQuery(ME,{
        fetchPolicy:"no-cache"
    })
    console.log(data)

    const gameList = data?.me?.gameMaster || []
    console.log(gameList)
    return (
        <>
        <h1>Game History</h1>
        {loading?(
            <h1>loading</h1>
        ):(
            <section>
                {gameList?.map((game)=>{
                    // add link to create a new page for adding/updating player
                return (
                    <h2 key={game._id}>{game.name}</h2>
                    )
                
                })}
            </section>
        )}
        
        </>
    )
}

export default GameHistory;