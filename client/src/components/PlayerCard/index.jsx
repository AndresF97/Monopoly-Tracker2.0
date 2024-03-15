import { useState } from 'react'
import PropertiesCard from '../PropertiesCard'
import { useMutation } from '@apollo/client'
import { REMOVE_ONE_PLAYER_FROM_GAME, UPDATE_PLAYER_INFO } from "../../utils/mutations"

const PlayerCard = ({ player, currentGameId, takenProperties }) => {
    // TODO:
    // - UPDATE GRID IS NOT RESPONSIVE
    const [currentPlayer, setCurrentPlayer] = useState({_id: player._id,name: player.name,token:player.token,money:player.money,position:player.position})
    const [removeOnePlayerFromGame, { error }] = useMutation(REMOVE_ONE_PLAYER_FROM_GAME)
    const [updatePlayerInfo, {err}] = useMutation(UPDATE_PLAYER_INFO)
    const [showPlayerUpdateForm, setShowPlayerUpdateForm] = useState(false)
    const deletePlayer = async (event) => {
        let playerId = currentPlayer._id
        let gameId = currentGameId
        try {
            const { data } = await removeOnePlayerFromGame({
                variables: { gameId, playerId }
            })
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }
    const updatePlayerFunc = async (event) => {
        event.preventDefault()
        try{
            console.log(currentPlayer)
            currentPlayer.money = parseInt(currentPlayer.money)
            const {data} = await updatePlayerInfo({
                variables:{...currentPlayer,playerId:currentPlayer._id}
            })
            console.log(data)
            window.location.reload()

        }catch(err){
            console.error(err)
        }
    }
    const handleInputChange= (event)=>{
        const {name, value } = event.target
        setCurrentPlayer({...currentPlayer, [name]:value})
    }
    return (
        <section className="border-2 border-black p-5 h-90 w-80 bg-green-300 p-3 my-[8%]">
            <form className='text-center bg-rose-90'>
                <div className='flex justify-center '>
                    <img className='w-20 h-20 bg-white rounded-full' src={require(`../../assets/images/${currentPlayer.token}.png`)} alt="" />
                </div>
                <p className='text-center text-sm underline underline-offset-4'>{currentPlayer.name}</p>

                {showPlayerUpdateForm ? (
                    <section className=''>
                        <label>Money</label>
                        <br></br>
                        <input
                            type="text"
                            placeholder={currentPlayer.money}
                            name='money'
                            value={currentPlayer.money}
                            onChange={handleInputChange}
                        ></input>
                        <br></br>
                        <label>Position</label>
                        <br></br>
                        <input
                            type="text"
                            placeholder={currentPlayer.position}
                            name='position'
                            value={currentPlayer.position}
                            onChange={handleInputChange}
                        ></input>
                        <br></br>
                    </section>

                ) : (
                    <section className='px-5 my-1 bg-slate-100 mx-1 rounded-md'>
                        <p>Money:{currentPlayer.money}</p>
                        <p>Position:{currentPlayer.position}</p>
                    </section>
                )}

                <PropertiesCard playerProperties={player.playerPropreties} takenProperties={takenProperties} playerId={currentPlayer._id}/>
                <br></br>
                {showPlayerUpdateForm ? (
                    <>
                        <button className="btn bg-purple-600 text-white border-2 border-black hover:bg-purple-700 mr-2" onClick={(event) => { updatePlayerFunc(event) }}>Update</button>
                        <button className="btn bg-yellow-300 text-white border-2 border-black hover:bg-yellow-400" onClick={(event)=>{ event.preventDefault(); setShowPlayerUpdateForm(false)}}>Player Info</button>
                    </>
                ) : (
                    <>

                        <button className="btn bg-purple-600 text-white border-2 border-black hover:bg-purple-700 mr-2" onClick={(event)=>{ event.preventDefault(); setShowPlayerUpdateForm(true)}}>Update</button>
                        <button className="btn bg-rose-600 text-white border-2 border-black hover:bg-rose-700" onClick={(event) => deletePlayer(event)}>Delete</button>
                    </>
                )}

            </form>
        </section>
    )
}


export default PlayerCard;