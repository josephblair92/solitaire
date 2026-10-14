import { Foundations } from "./components/Foundations"
import { Stock } from "./components/Stock"
import { Tableau } from "./components/Tableau"
import "./styles.css"
import * as Types from "./types/types"
import { getSuitColor } from "./utils/utils"
import { useState } from "react"
import { DragDropProvider } from "@dnd-kit/react"
import { GameWinModal } from "./components/GameWinModal"

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
  const [winModalDismissed, setWinModalDismissed] = useState(false)
  const gameWon = Object.values(gameState.foundationCardsPlaced).every(val => val === 13)

  const isValidTableauCardPlacement = (cardToPlace: Types.Card, targetCard?: Types.Card) => {
    return !targetCard
      ? cardToPlace.number === 13
      : cardToPlace.number === targetCard.number - 1 && cardToPlace.color !== targetCard.color
  }

  const isValidFoundationCardPlacement = (cardToPlace: Types.Card, target: Types.Suit) => {
    return cardToPlace.suit === target && gameState.foundationCardsPlaced[target] === cardToPlace.number - 1
  }

  const advanceStock = () => {
    setGameState(prevGameState => {
      return {
        ...prevGameState,
        stock: [
          ...prevGameState.stock.slice(1),
          prevGameState.stock[0]
        ]
      }
    })
  }

  const handleMoveCardBetweenTableauPiles = (sourceLocation: string, destStack: number) => {
    const sourceStackIndex = parseInt(sourceLocation.split('-')[1])
    const cardIndex = parseInt(sourceLocation.split('-')[2])
    const cardToPlace = gameState.tableau[sourceStackIndex].cards[cardIndex]
    const targetCard = gameState.tableau[destStack].cards.at(-1)

    if (!isValidTableauCardPlacement(cardToPlace, targetCard)) return

    setGameState(prevGameState => {
      return {
        ...prevGameState,
        tableau: [...prevGameState.tableau.map((pile, index) => {
          if (index === sourceStackIndex) {
            return {
              ...pile,
              numFaceDownCards: cardIndex === pile.numFaceDownCards ? pile.numFaceDownCards - 1 : pile.numFaceDownCards,
              cards: [...pile.cards.slice(0, cardIndex)]
            }
          } else if (index === destStack) {
            return {
              ...pile,
              cards: [...pile.cards, ...prevGameState.tableau[sourceStackIndex].cards.slice(cardIndex)]
            }
          } else {
            return pile
          }
        })]
      }
    })
  }

  const handleMoveCardFromTableauToFoundation = (sourceStackIndex: number, cardIndex: number, suit: string) => {
    if (cardIndex !== gameState.tableau[sourceStackIndex].cards.length - 1) return
    const cardToPlace = gameState.tableau[sourceStackIndex].cards[cardIndex]

    if (!isValidFoundationCardPlacement(cardToPlace, suit as Types.Suit)) return

    setGameState(prevGameState => {
      return {
        ...prevGameState,
        tableau: [...prevGameState.tableau.map((pile, index) => {
          if (index === sourceStackIndex) {
            return {
              ...pile,
              numFaceDownCards: cardIndex === pile.numFaceDownCards ? pile.numFaceDownCards - 1 : pile.numFaceDownCards,
              cards: [...pile.cards.slice(0, cardIndex)]
            }
          } else {
            return pile
          }
        })],
        foundationCardsPlaced: {
          ...prevGameState.foundationCardsPlaced,
          [suit]: prevGameState.tableau[sourceStackIndex].cards[cardIndex].number
        }
      }
    })
  }

  const handleMoveCardFromStockToFoundation = (suit: string) => {
    const cardToPlace = gameState.stock[0]
    if (!isValidFoundationCardPlacement(cardToPlace, suit as Types.Suit)) return
    setGameState(prevGameState => {
      const card = prevGameState.stock[0]
      return {
        ...prevGameState,
        stock: [
          ...prevGameState.stock.slice(1)
        ],
        foundationCardsPlaced: {
          ...prevGameState.foundationCardsPlaced,
          [card.suit]: card.number
        }
      }
    })
  }

  const handleMoveCardFromStockToTableau = (destStack: number) => {
    const cardToPlace = gameState.stock[0]
    const targetCard = gameState.tableau[destStack].cards.at(-1)

    if (!isValidTableauCardPlacement(cardToPlace, targetCard)) return

    setGameState(prevGameState => {
      return {
        ...prevGameState,
        stock: [
          ...prevGameState.stock.slice(1)
        ],
        tableau: [...prevGameState.tableau.map((pile, index) => {
          if (index === destStack) {
            return {
              ...pile,
              cards: [...pile.cards, prevGameState.stock[0]]
            }
          } else {
            return pile
          }
        })]
      }
    })
  }

  const handleMoveCardFromFoundationToTableau = (sourceLocation: string, destStack: number) => {
    const suit = sourceLocation.split('-')[1] as Types.Suit
    const cardToPlace = {
      suit,
      color: getSuitColor(suit),
      number: gameState.foundationCardsPlaced[suit]
    }
    const targetCard = gameState.tableau[destStack].cards.at(-1)

    if (!isValidTableauCardPlacement(cardToPlace, targetCard)) return

    setGameState(prevGameState => {
      return {
        ...prevGameState,
        foundationCardsPlaced: {
          ...prevGameState.foundationCardsPlaced,
          [suit]: prevGameState.foundationCardsPlaced[suit] - 1
        },
        tableau: [...prevGameState.tableau.map((pile, index) => {
          if (index === destStack) {
            return {
              ...pile,
              cards: [...pile.cards, cardToPlace]
            }
          } else {
            return pile
          }
        })]
      }
    })
  }

  const onTableauCardDoubleClick = (stackIndex: number, cardIndex: number, suit: Types.Suit) => {
    handleMoveCardFromTableauToFoundation(stackIndex, cardIndex, suit)
  }

  const handleDragEvent = (source: string, dest: string) => {
    const [sourceLocation, sourceCard] = source.split('_')
    const [sourceLocationType] = sourceLocation.split('-')
    const [destType, destLocation] = dest.split('-')
    if (sourceLocationType === 'tableau' && destType === 'tableau') {
      handleMoveCardBetweenTableauPiles(sourceLocation, parseInt(destLocation))  
    } else if (sourceLocationType === 'tableau' && destType === 'foundation') {
      const sourceStackIndex = parseInt(sourceLocation.split('-')[1])
      const cardIndex = parseInt(sourceLocation.split('-')[2])
      handleMoveCardFromTableauToFoundation(sourceStackIndex, cardIndex, destLocation)
    } else if (sourceLocationType === 'stock' && destType === 'foundation') {
      handleMoveCardFromStockToFoundation(destLocation)
    } else if (sourceLocationType === 'stock' && destType === 'tableau') {
      handleMoveCardFromStockToTableau(parseInt(destLocation))
    } else if (sourceLocationType === 'foundation' && destType === 'tableau') {
      handleMoveCardFromFoundationToTableau(sourceLocation, parseInt(destLocation))
    }
  }

  return (
    <DragDropProvider onDragEnd={event => {
      if (event.canceled) return
      const source = event.operation.source?.id
      const target = event.operation.target?.id
      if (!source || !target) return
      handleDragEvent(source.toString(), target.toString())
    }}>
      <div className="flex flex-col p-5 gap-10 bg-green-500 h-full w-full">
        <div className="flex justify-between">
          <Stock cards={gameState.stock} advanceStock={advanceStock} onDoubleClick={handleMoveCardFromStockToFoundation} />
          <Foundations foundationCardsPlaced={gameState.foundationCardsPlaced} />
        </div>
        <Tableau piles={gameState.tableau} onDoubleClick={onTableauCardDoubleClick} />
        <GameWinModal isOpen={gameWon && !winModalDismissed} onClose={() => setWinModalDismissed(true)} />
      </div>
    </DragDropProvider>
  )
}

export default App
