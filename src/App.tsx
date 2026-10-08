import "./styles.css"
import { Card } from "./components/Card"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"

function App() {
  const cards = [
    {
      number: 4,
      suit: Types.Suit.DIAMONDS,
      color: getSuitColor(Types.Suit.DIAMONDS)
    },
    {
      number: 7,
      suit: Types.Suit.CLUBS,
      color: getSuitColor(Types.Suit.CLUBS)
    },
    {
      number: 2,
      suit: Types.Suit.DIAMONDS,
      color: getSuitColor(Types.Suit.DIAMONDS)
    },
    {
      number: 10,
      suit: Types.Suit.SPADES,
      color: getSuitColor(Types.Suit.SPADES)
    }
  ]
  return (
    <>
      {cards.map(card => <Card card={card} />)}
    </>
  )
}

export default App
