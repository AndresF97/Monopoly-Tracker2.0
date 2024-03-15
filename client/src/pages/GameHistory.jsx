import { ME, ALL_PROPERTIES } from "../utils/queries"
import { DELETE_GAME } from "../utils/mutations"
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import PlayerForm from "../components/PlayerForm"
import TokenList from "../assets/tokenList.json"
import PlayerCard from "../components/PlayerCard"

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GameHistory = () => {
    const { loading, data } = useQuery(ME, {
        fetchPolicy: "no-cache"
    })
    const data2 = useQuery(ALL_PROPERTIES, {
        fetchPolicy: "no-cache"
    })
    const [deleteGame, { error }] = useMutation(DELETE_GAME)
    const gameList = data?.me?.gameMaster || [];
    const currentProperties = data2?.data?.allProperties || []
    const [currentGameId, setcurrentGameIdState] = useState('')
    const [currentGameName, setCurrentGameName] = useState('')
    let [createPlayeForm, setCreatePlayerForm] = useState([])
    let [selectedGame, setSelectedGame] = useState([]);
    let [takenProperties, setTakenPropeties] = useState()
    let [playersLength, setPlayersLenth] = useState(0)
    let [avialableTokens, setAvialableTokens] = useState([])

    const onAddBtnClick = event => {
        // playersLength = playersLength + 1
        // setPlayersLenth(playersLength)
        // console.log(createPlayeForm)
        if (createPlayeForm.length > 5 || playersLength > 5) {
            alert("Thats to many player forms")
            return
        }else{
            playersLength = playersLength + 1
            setPlayersLenth(playersLength)
            console.log(createPlayeForm)
            setCreatePlayerForm(createPlayeForm.concat(<PlayerForm tokenList={avialableTokens} key={Math.floor(Math.random() * 100)} currentGameId={currentGameId}></PlayerForm>));
        }
        // setCreatePlayerForm(createPlayeForm.concat(<PlayerForm tokenList={avialableTokens} key={Math.floor(Math.random() * 100)} currentGameId={currentGameId}></PlayerForm>));
    };

    const stateCurrentGameInfo = (event) => {
        let gameName = event.target.textContent
        let gameId = event.target.getAttribute('data-id')
        setCurrentGameName(gameName)
        setcurrentGameIdState(gameId)
        const allGames = data?.me?.gameMaster
        let filterGame = allGames.filter((game) => game.name === gameName)
        selectedGame = selectedGame.concat(filterGame)
        setSelectedGame(selectedGame)
        playersLength = selectedGame[0].savedPlayers.length
        setPlayersLenth(playersLength)
    }
    const deleteGameFunc = async (event) => {
        event.stopPropagation()
        console.log(event.target.getAttribute('data-id'))
        let gameId = event.target.getAttribute('data-id')
        try {
            const { data } = await deleteGame({
                variables: { gameId }
            })
            window.location.reload()

        } catch (error) {
            console.error(error)
        }

    }
    const removePlayerForm = () => {
        // if(createPlayeForm.length){
        // playersLength = playersLength - 1
        setPlayersLenth(playersLength - 1)
        console.log(playersLength)
        setCreatePlayerForm(createPlayeForm.slice(0, -1))
        // }
        if (createPlayeForm < 1) {

            setCreatePlayerForm(createPlayeForm = [])
        }

    }
    const getAvailableProperties = (game, currentProperties) => {
        if (game && currentProperties) {
            let playerProperties = game.map((player) => {
                return (
                    player.playerPropreties
                )
            })
            let playerPropertiesThin = []
            playerProperties.map((properties) => {
                return playerPropertiesThin = playerPropertiesThin.concat(properties)
            })
            let takenPropertiesFromPlayer = []
            for (var i = 0; i < playerPropertiesThin.length; i++) {
                takenPropertiesFromPlayer.push(playerPropertiesThin[i].properties[0].name)
            }
            let newTakenProperties = currentProperties?.filter(item => !takenPropertiesFromPlayer.includes(item.name))
            setTakenPropeties(newTakenProperties)
        }
    }
    function getAvaliableTokens(currenPlayer, allTokens) {
        if (currenPlayer && allTokens) {
            // LOOK INTO THIS LATER
            let filteredToken = allTokens.filter(function (jsonToken) {
                return !currenPlayer.find(function (playerToken) {
                    return jsonToken.tokenName == playerToken.token
                })
            });
            setAvialableTokens(filteredToken)
        }
    }
    useEffect(() => {
        getAvailableProperties(selectedGame[0]?.savedPlayers, currentProperties)
        getAvaliableTokens(selectedGame[0]?.savedPlayers, TokenList)
    }, [currentProperties, selectedGame, TokenList])
    return (
        <main>
            {(currentGameName === '') ? (
                <section className="text-center m-5 flex justify-center">
                    <div className="border-2 border-gray-950 p-5 h-90 w-80 bg-green-300 p-3 my-[12%]">
                        <h1 className="text-xl mb-3 underline underline-offset-4">Game History</h1>
                        <>
                            {loading ? (
                                <h1>loading</h1>
                            ) : (
                                <section>
                                    <ul>
                                        {gameList?.map((game) => {
                                            // add link to create a new page for adding/updating player
                                            return (
                                                <li className="flex -mx-2 px-5" key={game._id} onClick={(event) => { stateCurrentGameInfo(event) }}>
                                                    <h2 className="w-1/2" data-id={game._id}>
                                                        <button className="text-white rounded bg-blue-600 border-2 border-white w-full px-0.5 py-0.5 hover:border border-black">
                                                            {game.name}
                                                        </button>
                                                    </h2>
                                                    {/* have to add functionality to delete a a game */}
                                                    <button className="w-1/2" data-id={game._id} onClick={(event) => { deleteGameFunc(event) }}>
                                                        <FontAwesomeIcon className="text-rose-600 hover:text-rose-800" icon={faTrash} />
                                                    </button>
                                                </li>
                                            )

                                        })}
                                    </ul>

                                </section>
                            )}
                        </>
                    </div>
                </section>
            ) : (
                <section >
                    <h4 className="text-center text-lg">
                        Game your updating
                        <br />
                        {currentGameName}</h4>
                    <div>
                        <h5 className="text-center text-sm">List of saved Players</h5>
                        <ul className="grid grid-flow-col auto-cols-max">

                            {selectedGame[0].savedPlayers?.map((player) => {
                                return (
                                    <li className="m-5" key={player._id}>
                                        <PlayerCard player={player} currentGameId={currentGameId} takenProperties={takenProperties} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="grid grid-flow-col auto-cols-max mx-5 mb-5">
                        {createPlayeForm}
                        <div className="m-5 flex justify-center flex-col border-2 border-black p-5  w-80 bg-green-300 ">
                            <button  className="btn border-2 border-black bg-yellow-300 text-white hover:bg-yellow-400" onClick={onAddBtnClick}>
                                Add Player
                            </button>
                            {(createPlayeForm.length > 0) ? (
                                <button className="btn border-2 border-black bg-rose-700 hover:bg-rose-800 mt-2 text-white"onClick={removePlayerForm}>Remove Form</button>
                            ) : (
                                <></>
                            )}
                            <button className="border-2 border-black btn bg-slate-300 text-white hover:bg-slate-400 mt-2"onClick={() => { window.location.reload() }}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </section>
            )}



        </main>
    )
}

export default GameHistory;