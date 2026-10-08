import { Card } from "./components/Card"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"

function App() {
  const card: Types.Card = {
    number: 4,
    suit: Types.Suit.DIAMONDS,
    color: getSuitColor(Types.Suit.DIAMONDS)
  }
  return (
    <>
      <Card card={card} />
    </>
  )
}

export default App
