import type { Card } from "../types/types"

export interface CardProps {
  card: Card
}

export function Card({ card }: CardProps) {
  return (
    <div>
      {card.number} {card.suit}
    </div>
  )
}
