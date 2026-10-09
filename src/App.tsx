import { Tableau } from "./components/Tableau"
import "./styles.css"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"
import { useState } from "react"

interface GameState {
  tableau: Types.TableauPile[]
  stock: Types.Card[]
  foundationCardsPlaced: Record<Types.Suit, number>
}

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
  const NUM_TABLEAU_PILES = 7
  const tableau = []
  for (let i = 0; i < NUM_TABLEAU_PILES; i++) {
    tableau.push({
      cards: [...cards.splice(0, i + 1)],
      numFaceDownCards: i
    })
  }
  return {
    tableau,
    stock: [...cards],
    foundationCardsPlaced: {
      clubs: 0,
      hearts: 0,
      spades: 0,
      diamonds: 0
    }
  }
}

function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState())
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
    <div className="bg-green-500 h-screen w-screen">
      <div className="flex gap-2 p-2 flex-wrap">
        {/* <CardStack cards={cards} />
        <CardStack cards={[]} />
        <CardStack cards={[...cards, ...cards]} faceDownUntilIndex={3} /> */}
        {/* {gameState.map(card => <Card card={card} positionInStack={0} />)} */}
      </div>
      <Tableau piles={gameState.tableau} />
    </div>
  )
}

export default App
