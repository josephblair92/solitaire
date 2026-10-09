import { Suit, type Card } from "../types/types"
import Clubs from "../assets/clubs.svg?react"
import Hearts from "../assets/hearts.svg?react"
import Spades from "../assets/spades.svg?react"
import Diamonds from "../assets/diamonds.svg?react"

export interface CardProps {
  card: Card
}

const suitSymbols = {
    [Suit.CLUBS]: Clubs,
    [Suit.HEARTS]: Hearts,
    [Suit.SPADES]: Spades,
    [Suit.DIAMONDS]: Diamonds
}

export function Card({ card }: CardProps) {
  const SuitSymbol = suitSymbols[card.suit]
  const numberClasses = `text-lg text-${card.color}-500 font-bold`
  return (
    <div className="flex flex-col h-33 w-20 p-1 bg-white rounded-md gap-4">
        <span className={numberClasses}>{card.number}</span>
        <div className="flex justify-center"><SuitSymbol className="w-10" /></div>
    </div>
  )
}
