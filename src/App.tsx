import { Foundations } from "./components/Foundations"
import { Stock } from "./components/Stock"
import { Tableau } from "./components/Tableau"
import "./styles.css"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"
import { useState } from "react"
import { DragDropProvider } from "@dnd-kit/react"

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
      clubs: 4,
      hearts: 0,
      spades: 0,
      diamonds: 12
    }
  }
}

function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState())

  return (
    <DragDropProvider>
      <div className="flex flex-col p-5 gap-10 bg-green-500 h-screen w-screen">
        <div className="flex justify-between">
          <Stock cards={gameState.stock}/>
          <Foundations foundationCardsPlaced={gameState.foundationCardsPlaced} />
        </div>
        <Tableau piles={gameState.tableau} />
      </div>
    </DragDropProvider>
  )
}

export default App
