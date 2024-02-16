import { ME, ALL_PROPERTIES } from "../utils/queries"
import { DELETE_GAME, REMOVE_ONE_PLAYER_FROM_GAME, UPDATE_PLAYER_INFO} from "../utils/mutations"
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import PlayerForm from "../components/PlayerForm"
import TokenList from "../assets/tokenList.json"
// import PropertiesCard from "../components/PropertiesCard"
import PlayerCard from "../components/PlayerCard"

const GameHistory = () => {
    // TODO:
    // TEST OUT UPDATE QUERY
    // MAKE SURE QUERY WORK WITH PROPERTIE
    // NOTE:
    // MIGHT NEED TO CHANGE PROPERTIES TO UPDATE EACHONE
    // CREATE AWAY TO DELET EACH PROPERTY FROM USER
    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    const data2 = useQuery(ALL_PROPERTIES, {
        fetchPolicy: "no-cache"
    })
    const [deleteGame,{error}] = useMutation(DELETE_GAME)
    // const [removeOnePlayerFromGame, {erro}] = useMutation(REMOVE_ONE_PLAYER_FROM_GAME)
    // const [upddatePlayerInfo, {err}] = useMutation(UPDATE_PLAYER_INFO)
    const gameList = data?.me?.gameMaster || [];
    const currentProperties = data2?.data?.allProperties || []
    const [currentGameId, setcurrentGameIdState] = useState('')
    const [currentGameName, setCurrentGameName] = useState('')
    let [createPlayeForm,setCreatePlayerForm] = useState([])
    let [selectedGame,setSelectedGame]= useState([]);
    let [takenProperties, setTakenPropeties] = useState()
    let [playersLength, setPlayersLenth] = useState(0)
    let [avialableTokens, setAvialableTokens] = useState([])

    const onAddBtnClick = event => {
        playersLength = playersLength + 1
        setPlayersLenth(playersLength)
        console.log(createPlayeForm)
        if(createPlayeForm.length > 5 || playersLength > 5){
            alert("Thats to many player forms")
            return
        }
        setCreatePlayerForm(createPlayeForm.concat(<PlayerForm tokenList={avialableTokens} key={Math.floor(Math.random()* 100)} currentGameId={currentGameId}></PlayerForm>));
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
    }
    const deleteGameFunc = async (event) =>{
        event.stopPropagation()
        console.log(event.target.getAttribute('data-id'))
        let gameId = event.target.getAttribute('data-id')
        try{
            const {data} = await deleteGame({
                variables:{gameId}
            })
            window.location.reload()

        }catch(error){
            console.error(error)
        }

    }
    const removePlayerForm = () =>{
        // if(createPlayeForm.length){
            playersLength = playersLength - 1
            setPlayersLenth(playersLength)
            setCreatePlayerForm(createPlayeForm.splice(-1))
        // }
        if(createPlayeForm < 1){
            
            setCreatePlayerForm(createPlayeForm = [] )
        }

    }
    const getAvailableProperties =  (game, currentProperties )=>{
        if(game && currentProperties){
        let playerProperties = game.map((player)=>{
            return(
                player.playerPropreties
            )
        })
        let playerPropertiesThin =[]
        playerProperties.map((properties)=>{
            return playerPropertiesThin = playerPropertiesThin.concat(properties)
        })
        let takenPropertiesFromPlayer = []
        for(var i  = 0; i < playerPropertiesThin.length;i++){
            takenPropertiesFromPlayer.push(playerPropertiesThin[i].properties[0].name)
        }
        let newTakenProperties =  currentProperties?.filter(item => !takenPropertiesFromPlayer.includes(item.name))
        setTakenPropeties(newTakenProperties)
        }
    }
    function getAvaliableTokens(currenPlayer, allTokens){
        if(currenPlayer && allTokens){
            // LOOK INTO THIS LATER
            let filteredToken = allTokens.filter(function(jsonToken){
                return !currenPlayer.find(function(playerToken){
                    return jsonToken.tokenName == playerToken.token
                })
            });
            setAvialableTokens(filteredToken)
        }
    }
    useEffect( ()=>{
        getAvailableProperties(selectedGame[0]?.savedPlayers, currentProperties)
        getAvaliableTokens(selectedGame[0]?.savedPlayers,TokenList)
    },[currentProperties, selectedGame,TokenList])
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
                                             <button data-id={game._id} onClick={(event)=>{deleteGameFunc(event)}}>Delete</button>
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
                                <PlayerCard player={player} currentGameId={currentGameId} takenProperties={takenProperties}/>
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
                    <button onClick={removePlayerForm}>Remove Form</button>
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