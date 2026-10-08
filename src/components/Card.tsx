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
  const textColor = `text-${card.color}-400`
  return (
    <div>
      <span className={textColor}>
        {card.number}
        <SuitSymbol className="w-6" />
      </span>
    </div>
  )
}
