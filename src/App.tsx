import "./styles.css"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"
import { CardStack } from "./components/CardStack"
import { useState } from "react"
import { Card } from "./components/Card"

const shuffle = (arr: Array<any>) => {
  let currentIndex = arr.length
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    const tmp = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = tmp
  }
}

const initGameState = () => {
  const cards: Types.Card[] = []
  for (const [_key, val] of Object.entries(Types.Suit)) {
    const color = getSuitColor(val)
    cards.push(...Array.from({ length: 13 }, (_val, index) => ({
      number: index + 1,
      suit: val,
      color
    })))
  }
  shuffle(cards)
  console.log(cards)
  return cards
}

function App() {
  const [gameState, setGameState] = useState(initGameState())
  console.log(gameState)
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
      <div className="flex gap-2 p-2 flex-wrap">
        {/* <CardStack cards={cards} />
        <CardStack cards={[]} />
        <CardStack cards={[...cards, ...cards]} faceDownUntilIndex={3} /> */}
        {gameState.map(card => <Card card={card} positionInStack={0} />)}
      </div>
    </div>
  )
}

export default App
