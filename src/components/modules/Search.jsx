import { useEffect, useState } from "react"
import { searchCoin } from "../../services/cryptoApi"
import { RiseLoader } from "react-spinners"

import styles from "./Search.module.css"

function Search({currency, setCurrency, setChart}) {

  const [text, setText] = useState("")
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const [newChart, setNewChart] = useState(null)


  useEffect(() => {
    const controller = new AbortController()

    setCoins([])
    if (!text) {
      setIsLoading(false); return
    }
    const search = async () => {
      setIsLoading(true)
      try{
      const res = await fetch(searchCoin(text), {
        signal: controller.signal
      })
      const json = await res.json()
      // console.log(json)
      setIsLoading(false)
      if (json.coins) {
        setCoins(json.coins) } else {
          alert(json.status.error_message)
        } 
    } catch(error){
      if (error.name !== "AbortError") {
        alert(error.message)
      }
    }
    }

    search()
    return () => controller.abort()
  }, [text])



  return (
    <div className={styles.searchBox}>
        <input type="text" placeholder="Search a coin!" value={text} onChange={(e) => setText(e.target.value)}/>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="jpy">JPY</option>
            <option value="eur">EUR</option>
        </select>


        {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading ? (<RiseLoader color="#E9290F" size={25}/>) : null}
            {coins.map((coin) => (
            <li key={coin.id}>
              <img src={coin.thumb}/>
              <p>{coin.name}</p>
              </li>))}
        </div> ) }
        </div> 
  )
}

export default Search
