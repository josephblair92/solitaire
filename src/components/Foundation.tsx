import type { Suit } from "../types/types"
import { getCardKey, getSuitColor } from "../utils/utils"
import { Card } from "./Card"
import { EmptyCardStackPlaceholder } from "./EmptyCardStackPlaceholder"
import { useDroppable } from "@dnd-kit/react"

export interface FoundationProps {
  suit: Suit
  numCardsPlaced: number
}

export function Foundation({ suit, numCardsPlaced }: FoundationProps) {
  const { ref } = useDroppable({ id: `foundation-${suit}` })
  const card = { suit, number: numCardsPlaced, color: getSuitColor(suit) }
  return (
    <div ref={ref}>
      {numCardsPlaced > 0 ? (
        <Card
          key={getCardKey(card)}
          location={`foundation-${suit}`}
          card={card}
        />
      ) : (
        <EmptyCardStackPlaceholder />
      )}
    </div>
  )
}
