import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROPERTY_TO_PLAYTER, REMOVE_PROPERTY_FROM_PLAYER } from "../../utils/mutations";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PropertiesCard = ({ playerProperties, takenProperties, playerId }) => {
    const [addPropertyToPlayer, {error}] = useMutation(ADD_PROPERTY_TO_PLAYTER);
    const [removePropertyFromPlayer, {err}] = useMutation(REMOVE_PROPERTY_FROM_PLAYER)
    const [propertyId,setSelectedPropertyId] =useState('')
    const [showProperties, setShowProperties] = useState(false)
    const addPropertyToPlayerFunc = async (event)=>{
        event.preventDefault();
        try{
            const {data} = await addPropertyToPlayer({
                variables:{propertyId,playerId}
            })
            window.location.reload()
        }catch(err){
            console.error(err)
        }
    }
    const deletePropertyFunc = async (event)=>{
        let propertyId = event.target.getAttribute('data-propertyid');
        try{
            const {data} = await removePropertyFromPlayer({
                variables:{propertyId, playerId}
            })
            console.log(data)
            window.location.reload();
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        if(takenProperties){
            setSelectedPropertyId(takenProperties[0]?._id)
            console.log(playerProperties[0])
        }
    },[takenProperties])
    return (
        <section >
            {showProperties ? (
                <div className="bg-slate-100 rounded-md m-2">
                    <label>Properties:</label>
                    <ul>
                        {playerProperties?.map((item) => {
                            return (
                                <li key={Math.floor(Math.random() * 100) + item.properties[0].name}>{item.properties[0].name} <button data-propertyid={item._id} onClick={(event)=>{event.preventDefault(); deletePropertyFunc(event)}}><FontAwesomeIcon className="text-rose-600 hover:text-rose-800" icon={faTrash} /></button></li>
                            )
                        })}
                    </ul>
                    <label>Add Property </label>
                    <br></br>
                    <select onChange={ (event)=>{setSelectedPropertyId(event.target.value)}}>
                    <option disabled selected value> Select Property </option>
                        {takenProperties?.map((propertie) => {
                            return (
                                <option
                                    key={Math.floor(Math.random() * 100) + propertie.name}
                                    data-color={propertie.hex}
                                    value={propertie._id}>
                                    {propertie.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <button className="btn border-2 border-black bg-lime-200 m-2 hover:bg-lime-300"onClick={(event)=>{addPropertyToPlayerFunc(event)}}>Add property</button>
                    <button className="btn bg-sky-400 text-white border-2 border-black hover:bg-sky-500 mb-2" onClick={(event) => { event.preventDefault(); setShowProperties(false) }}>Hide propreties</button>
                </div>
            ) : (
                <>
                    <br></br>
                    <button className="btn bg-sky-400 text-white border-2 border-black hover:bg-sky-500" onClick={(event) => { event.preventDefault(); setShowProperties(true) }}>Show propreties</button>
                </>
            )}
        </section>
    )
}

export default PropertiesCard;