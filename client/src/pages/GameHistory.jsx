import { ME } from "../utils/queries"
import { useState, Fragment } from "react"
import { useQuery } from "@apollo/client"
import PlayerForm from "../components/PlayerForm"
const GameHistory = () => {

    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    // console.log(data?.me)
    const gameList = data?.me?.gameMaster || []
    const [currentGameId, setcurrentGameIdState] = useState('')
    const [currentGameName, setCurrentGameName] = useState('')
    let [createPlayeForm,setCreatePlayerForm] = useState([])
    let [selectedGame,setSelectedGame]= useState([]);
    let [playersLength, setPlayersLenth] = useState(0)

    const onAddBtnClick = event => {
        playersLength = playersLength + 1
        setPlayersLenth(playersLength)
        console.log(playersLength)
        if(createPlayeForm.length > 5 || playersLength > 5){
            alert("Thats to many player forms")
            return
        }
        setCreatePlayerForm(createPlayeForm.concat(<PlayerForm key={Math.floor(Math.random()* 100)} currentGameId={currentGameId}></PlayerForm>));
    };

    const stateCurrentGameInfo = (event)=>{
        let gameName = event.target.textContent
        let gameId = event.target.getAttribute('data-id')
        setCurrentGameName(gameName)
        setcurrentGameIdState(gameId)
        const allGames = data?.me?.gameMaster
        let filterGame = allGames.filter((game)=> game.name === gameName)
        selectedGame = selectedGame.concat(filterGame)
        setSelectedGame(selectedGame)
        playersLength = selectedGame[0].savedPlayers.length
        setPlayersLenth(playersLength)
        console.log(playersLength)
        // console.log(selectedGame)
        
    }
    return (
        <>
        {(currentGameName === '') ? (
            <section>
                     <h1>Game History</h1>
                     <>
                         {loading ? (
                             <h1>loading</h1>
                         ) : (
                             <section>
                                 <ul>
                                 {gameList?.map((game) => {
                                     // add link to create a new page for adding/updating player
                                     return (
                                         <li key={game._id} onClick={(event)=>{stateCurrentGameInfo(event)}}>
                                             <h2 data-id={game._id}>{game.name}</h2>
                                             {/* have to add functionality to delete a a game */}
                                             <button>Delete</button>
                                         </li>
                                     )
             
                                 })}
                                 </ul>
                             </section>
                         )}
                         </>
            </section>
        ):(
            <section>
                <h4>Game your updating: {currentGameName}</h4>
                <div>
                    <h5>List of saved Players:</h5>
                    <ul>
                        
                    {selectedGame[0].savedPlayers?.map((player)=>{
                        return (
                            <li key={player._id}>
                                <div>
                                    <p>Name: {player.name}</p>
                                    <p>Token: {player.token}</p>
                                    <p>Money: {player.money}</p>
                                    <p>Position: {player.position}</p>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>

                   <div>
                        {createPlayeForm}
                    </div>
                <button onClick={onAddBtnClick}>
                    Add Player
                </button>
                {(createPlayeForm.length > 0 ) ?(
                    // add  functionality to remove a form
                    <button>Remove Form</button>
                ):(
                    <></>
                )}
            
                <button onClick={()=>{window.location.reload()}}>
                    Go Back
                </button>
            </section>
        )}

   

        </>
    )
}

export default GameHistory;