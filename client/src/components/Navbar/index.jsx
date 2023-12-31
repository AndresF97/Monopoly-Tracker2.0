import {Link} from "react-router-dom"
import Auth from "../../utils/auth"
const Navbar = () =>{
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {Auth.loggedIn() ? (
                        <>
                        <li><Link to="/History">History</Link></li>
                        {/* Log out functionality */}
                        <li onClick={Auth.logOut}><a>Log out</a></li>
                        </>
                    ):(
                        <>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )

}

export default Navbar;
