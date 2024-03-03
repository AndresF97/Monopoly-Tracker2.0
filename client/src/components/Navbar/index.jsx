import { Link } from "react-router-dom"
import Auth from "../../utils/auth"
import NavLogo from "../../assets/images/MTNavLogo.png"
const Navbar = () => {
    return (
        <header>
            {/* TODO */}
            {/* Might need to comeback here and do this */}
            <nav>
            <ul class="flex justify-between  bg-neutral-200 text-center text-white dark:bg-neutral-600">
                <li className="inline-block mt-3 ml-3 text-white mr-[10%]">
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/" ><img className="h-20 w-30"src={NavLogo}/></Link>
                </li>
                <li className="inline-block mt-3 text-white ml-[10%]">
                {Auth.loggedIn() ? (
                        <span>
                            <Link className="py-2 px-4 text-gray-400"Link to="/History">History</Link>
                            {/* Log out functionality */}
                            <Link onClick={Auth.logOut} className="py-2 px-4 text-gray-400">Log out</Link>
                        </span>
                    ) : (
                        <>
                        </>
                    )}
                </li>
            </ul>

            </nav>
        </header>
    )

}

export default Navbar;
