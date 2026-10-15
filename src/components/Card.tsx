import { Suit, type Card } from "../types/types"
import Clubs from "../assets/clubs.svg?react"
import Hearts from "../assets/hearts.svg?react"
import Spades from "../assets/spades.svg?react"
import Diamonds from "../assets/diamonds.svg?react"
import { useDraggable } from "@dnd-kit/react"
import { getCardKey } from "../utils/utils"

export interface CardProps {
  card: Card
  location: string
  onDoubleClick?: () => void
}

const suitSymbols = {
  [Suit.CLUBS]: Clubs,
  [Suit.HEARTS]: Hearts,
  [Suit.SPADES]: Spades,
  [Suit.DIAMONDS]: Diamonds
}

export function Card({ card, location, onDoubleClick }: CardProps) {
  const { ref } = useDraggable({
    id: `${location}_${getCardKey(card)}`
  })

  const textColors: Record<string, string> = {
    red: "text-red-500",
    black: "text-black-500"
  }

  const SuitSymbol = suitSymbols[card.suit]
  const containerClasses = `flex flex-col h-17 sm:h-33 w-11 sm:w-20 p-1 bg-white rounded-md gap-2 sm:gap-4 border-1 border-gray-400 col-span-full [grid-row:calc(sibling-child())]`
  const numberClasses = `text-sm sm:text-lg ${textColors[card.color]} font-bold`

  let cardSymbol = `${card.number}`
  switch (card.number) {
    case 1:
      cardSymbol = "A"
      break
    case 11:
      cardSymbol = "J"
      break
    case 12:
      cardSymbol = "Q"
      break
    case 13:
      cardSymbol = "K"
      break
  }

  return (
    <div className={containerClasses} ref={ref} onDoubleClick={onDoubleClick}>
      <div className="flex justify-between">
        <span className={numberClasses}>{cardSymbol}</span>
        <SuitSymbol className="w-2 sm:w-3" />
      </div>
      <div className="flex justify-center">
        <SuitSymbol className="w-5 sm:w-10" />
      </div>
    </div>
  )
}
