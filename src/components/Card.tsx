import { Suit, type Card } from "../types/types"
import Clubs from "../assets/clubs.svg?react"
import Hearts from "../assets/hearts.svg?react"
import Spades from "../assets/spades.svg?react"
import Diamonds from "../assets/diamonds.svg?react"
import { useDraggable } from "@dnd-kit/react";
import { getCardKey } from "../utils/utils"

export interface CardProps {
  card: Card
  positionInStack?: number
  location: string
}

const suitSymbols = {
    [Suit.CLUBS]: Clubs,
    [Suit.HEARTS]: Hearts,
    [Suit.SPADES]: Spades,
    [Suit.DIAMONDS]: Diamonds
}

export function Card ({ card, positionInStack = 0, location }: CardProps) {

  const { ref } = useDraggable({
      id: `${location}_${getCardKey(card)}`
  })

  const textColors: Record<string, string> = {
    red: 'text-red-500',
    black: 'text-black-500'
  }

  const SuitSymbol = suitSymbols[card.suit]
  const containerClasses = `flex flex-col h-33 w-20 p-1 bg-white rounded-md gap-4 border-1 border-gray-400`
  const numberClasses = `text-lg ${textColors[card.color]} font-bold`

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
    <div className={containerClasses} style={{ translate: `0px ${positionInStack * -6.75}rem` }} ref={ref}>
        <div className="flex justify-between">
            <span className={numberClasses}>{cardSymbol}</span>
            <SuitSymbol className="w-3" />
        </div>
        <div className="flex justify-center"><SuitSymbol className="w-10" /></div>
    </div>
  )
}
