const PlayerForm =  ({currentGameId})=>{
    console.log(currentGameId)
    return (
        <section>
            <h3>Player Form</h3 >
            <form>
                <label>Name of Player:</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <label>Token of Player:</label>
                <input type="text"></input>
                <br></br>
                <label>Money:</label>
                <input type="text"></input>
                <br></br>
                <label>Position:</label>
                <input type="text"></input>
            </form>
        </section>
        
    )
}

export default PlayerForm;