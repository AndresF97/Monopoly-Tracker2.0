import Login from "../components/Login"
import Signup from "../components/SignUp"

const HomePage = ()=>{

    return (
        <>
        <h1>Home Page!</h1>
        {/* create swicth case to make sure login or sign up are render depending what the user want to do */}
        <Login/>
        <Signup/>
        </>
    )
}

export default HomePage;
