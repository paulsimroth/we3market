import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {

    const connectHandler = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const user = provider.getSigner();
        const account = await user.getAddress();
        console.log("connectHandler; Account: ", account);
        setAccount(account);
    };

    return (
        <nav>
            <div className="nav__brand">
                <h1>Web3 Shop</h1>
            </div>

            <input
                type="text"
                className="nav__search"
            />

            {account ? (
                <button
                type="button"
                className='nav__connect'
                >
                {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                type="button"
                className='nav__connect'
                onClick={connectHandler}
                >
                Connect
                </button>
            )}

            <ul className="nav__links">
                <li><a href="#Clothing & Jewelry">Clothing & Jewelry</a></li>
                <li><a href="#Electronics">Electronics</a></li>
                <li><a href="#Games & Toys">Games & Toys</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;