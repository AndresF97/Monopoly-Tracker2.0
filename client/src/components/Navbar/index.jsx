import { Link } from "react-router-dom"
import Auth from "../../utils/auth"
import NavLogo from "../../assets/images/MTNavLogo.png"
const Navbar = () => {
    return (
        <header>
            <nav>
            <ul class="flex justify-between">
                <li>
                    <Link class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" to="/">Home</Link>
                </li>
                <li className="mr-5">
                    <Link class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" to="/" ><img className="h-20 w-30"src={NavLogo}/></Link>
                </li>
                <li>
                    
                    
                </li>
                {Auth.loggedIn() ? (
                        <>
                            <li className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed"><Link to="/History">History</Link></li>
                            {/* Log out functionality */}
                            <li onClick={Auth.logOut} className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed"><a>Log out</a></li>
                        </>
                    ) : (
                        <>
                        </>
                    )}
            </ul>

            </nav>
        </header>
    )

}

export default Navbar;
