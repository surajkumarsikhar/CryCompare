import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext()

const CoinContextProvider = (props)=>{

    const apiKey = import.meta.env.VITE_COIN_API;

    const [allCoin,setAllCoin] = useState([])
    const [currency,setCurrency] = useState({
        nam:"usd",
        symbol:"$"
    })

    const fetchAllCoins = async() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.nam}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchAllCoins();
    },[currency])

    const contextValue = {
        allCoin,
        currency,
        setCurrency
    }
    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;