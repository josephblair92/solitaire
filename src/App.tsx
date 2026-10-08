import "./styles.css"
import { Card } from "./components/Card"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"

function App() {
  const card1: Types.Card = {
    number: 4,
    suit: Types.Suit.DIAMONDS,
    color: getSuitColor(Types.Suit.DIAMONDS)
  }
  const card2: Types.Card = {
    number: 7,
    suit: Types.Suit.CLUBS,
    color: getSuitColor(Types.Suit.CLUBS)
  }
  return (
    <>
      <Card card={card1} />
      <Card card={card2} />
    </>
  )
}

export default App
