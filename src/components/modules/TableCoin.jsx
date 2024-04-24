import chartDown from "../../assets/chart-down.svg"
import chartUp from "../../assets/chart-up.svg"

import RiseLoader from "react-spinners/RiseLoader"

import styles from "../modules/TableCoin.module.css"
import { marketCahrt } from "../../services/cryptoApi"


function TableCoin({coins, isLoading, setChart, currency}) {

  return (
<div className={styles.container}>
  {isLoading ? (
    <RiseLoader color="#E9290F" size={70}/>
  ) : (
    <table className={styles.table}>
    <thead>
      <tr>
        <th>Coin</th>
        <th>Name</th>
        <th>Price</th>
        <th>24h</th>
        <th>Total Volume</th>
        <th></th>
      </tr>
    </thead>
  
    <tbody>
      {coins.map((coin) => (
    <TableRow coin={coin} key={coin.id} setChart={setChart} currency={currency}/>
      ))}
      </tbody>



    </table>
  )}
  </div>
  )}


export default TableCoin



const TableRow = ({coin, setChart, currency}) => {
  const {id, image, symbol, name, current_price, price_change_percentage_24h: price_change, total_volume} = coin

  const showHandler = async () => {
    try {
    const res = await fetch(marketCahrt(id))
    const json = await res.json()
    setChart({...json, coin}) } catch(error) {
      setChart(null)
    }
  }
  
  return(
      <tr>
        <td className={styles.symbol}>
        <div onClick={showHandler}>
        <img src={image} alt="" />
        <span>{symbol.toUpperCase()}</span>
        </div>
        </td>
        <td>{name}</td>
        <td><span>{currency==="usd" ? "$" : currency === "jpy" ? "¥" : currency=== "eur" ? "€" : null}</span>{current_price.toLocaleString()} </td>
        <td className={price_change > 0 ? styles.succes : styles.error}>{price_change.toFixed(2)}</td>
        <td>{total_volume.toLocaleString()}</td>
        <td><img src={price_change > 0 ? chartUp : chartDown} alt="" /></td>
        </tr>
      )}