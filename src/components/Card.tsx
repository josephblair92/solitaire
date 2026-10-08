import type { Card } from "../types/types"

export interface CardProps {
  card: Card
}

export function Card({ card }: CardProps) {
  return (
    <div>
      <span className={`text-${card.color}-500`}>{card.number} {card.suit}</span>
    </div>
  )
}
