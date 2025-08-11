import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcons from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contents/navigation";

const Header = () => {
  const location= useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black/30 z-50">
      <div className="container px-3 mx-auto flex items-center h-full">
        <Link className="flex" to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden lg:flex space-x-4 items-center gap-1 ml-5">
          {navigation.map((nav, index) => {
            return (
              <div key={nav.label}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100 font-bold"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form
            className="flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-700"
            onSubmit={handleSubmit}
          >
            <input
              display="flex"
              type="text"
              placeholder=" Search here... "
              className="bg-transparent px-4 py-1 outline-none border-none rounded-md items-center hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />

            <button className="text-white text-2xl " onClick={handleSubmit}>
              <IoSearchOutline />
            </button>
          </form>

          <div className="w-8 h-8 rounded-1xl overflow-hidden cursor-pointer active:scale-75 transition">
            <img src={userIcons} alt="User Icon" width="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
