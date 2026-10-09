import "./styles.css"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"
import { CardStack } from "./components/CardStack"

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
      suit: Types.Suit.HEARTS,
      color: getSuitColor(Types.Suit.HEARTS)
    },
    {
      number: 10,
      suit: Types.Suit.SPADES,
      color: getSuitColor(Types.Suit.SPADES)
    },
    {
      number: 1,
      suit: Types.Suit.HEARTS,
      color: getSuitColor(Types.Suit.HEARTS)
    },
    {
      number: 12,
      suit: Types.Suit.SPADES,
      color: getSuitColor(Types.Suit.SPADES)
    }
  ]
  return (
    <div className="bg-green-500 h-screen">
      <div className="flex gap-2 p-2">
        <CardStack cards={cards} />
        <CardStack cards={[]} />
        <CardStack cards={[...cards, ...cards]} faceDownUntilIndex={3} />
      </div>
    </div>
  )
}

export default App
