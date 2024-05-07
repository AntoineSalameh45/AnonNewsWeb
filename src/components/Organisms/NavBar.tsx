const NavBar = () => {
    return (
        <div>
            <hr/>
            <ul className="flex self-center px-4 py-2 justify-around">
                <li className="px-4"><a href='/'>Home</a></li>
                <li className="px-4"><a href='/explore'>Explore</a></li>
                <li className="px-4"><a href='/weather'>Weather</a></li>
                <li className="px-4"><a href='/finance'>Finance</a></li>
            </ul>
            <hr/>
        </div>
    )
};

export default NavBar;