import { Link } from "react-router-dom"
import Auth from "../../utils/auth"
import NavLogo from "../../assets/images/MTNavLogo.png"
const Navbar = () => {
    return (
        <header>
            {/* TODO */}
            {/* Might need to comeback here and do this */}
            <nav>
            <ul class="flex justify-between  bg-neutral-200 text-center text-black dark:bg-neutral-600">
                <li className="inline-block mt-3 ml-3 text-black mr-[10%]">
                    <Link className="hover:text-white hover:underline hover:decoration-white" to="/">Home</Link>
                </li>
                <li>
                    <Link to="/" ><img className="h-20 w-30"src={NavLogo}/></Link>
                </li>
                <li className="inline-block mt-3 ml-[10%]">
                {Auth.loggedIn() ? (
                        <span>
                            <Link className="py-2 px-4 hover:text-white hover:underline hover:decoration-white" to="/History">History</Link>
                            {/* Log out functionality */}
                            <Link onClick={Auth.logOut} className="py-2 px-4 hover:text-white hover:underline hover:decoration-white">Log out</Link>
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
