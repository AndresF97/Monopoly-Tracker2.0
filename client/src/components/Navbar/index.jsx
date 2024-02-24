import { Link } from "react-router-dom"
import Auth from "../../utils/auth"
import NavLogo from "../../assets/images/MTNavLogo.png"
const Navbar = () => {
    return (
        <header>
            {/* Might need to comeback here and do this */}
            <nav>
            <ul class="flex justify-between  bg-neutral-200 text-center text-white dark:bg-neutral-600">
                <li className="inline-block mt-3 ml-3 text-white">
                    <Link to="/">Home</Link>
                </li>
                <li className="mr-5">
                    <Link to="/" ><img className="h-20 w-30"src={NavLogo}/></Link>
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
