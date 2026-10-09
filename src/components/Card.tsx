import { Suit, type Card } from "../types/types"
import Clubs from "../assets/clubs.svg?react"
import Hearts from "../assets/hearts.svg?react"
import Spades from "../assets/spades.svg?react"
import Diamonds from "../assets/diamonds.svg?react"

export interface CardProps {
  card: Card
  positionInStack: number
}

const suitSymbols = {
    [Suit.CLUBS]: Clubs,
    [Suit.HEARTS]: Hearts,
    [Suit.SPADES]: Spades,
    [Suit.DIAMONDS]: Diamonds
}

export function Card({ card, positionInStack }: CardProps) {
  const SuitSymbol = suitSymbols[card.suit]
  const containerClasses = `flex flex-col h-33 w-20 p-1 bg-white rounded-md gap-4 border-1 border-gray-400 ${positionInStack > 0 ? '-mt-27' : ''}`
  const numberClasses = `text-lg text-${card.color}-500 font-bold`

  let cardSymbol = `${card.number}`
  switch (card.number) {
    case 1:
        cardSymbol = 'A'
        break
    case 11:
        cardSymbol = 'J'
        break
    case 12:
        cardSymbol = 'Q'
        break
    case 13:
        cardSymbol = 'K'
        break
  }

  return (
    <div className={containerClasses}>
        <div className="flex justify-between">
            <span className={numberClasses}>{cardSymbol}</span>
            <SuitSymbol className="w-3" />
        </div>
        <div className="flex justify-center"><SuitSymbol className="w-10" /></div>
    </div>
  )
}
