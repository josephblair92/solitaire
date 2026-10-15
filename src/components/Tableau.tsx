import { Suit, type TableauPile } from "../types/types"
import { CardStack } from "./CardStack"

export interface TableauProps {
  piles: TableauPile[]
  onDoubleClick: (stackIndex: number, cardIndex: number, suit: Suit) => void
}

export function Tableau({ piles, onDoubleClick }: TableauProps) {
  return (
    <div className="flex justify-around w-full sm:p-4">
      {piles.map((pile, index) => (
        <CardStack
          key={`tableauPile-${index}`}
          stackIndex={index}
          cards={pile.cards}
          faceDownUntilIndex={pile.numFaceDownCards}
          onDoubleClick={onDoubleClick}
        />
      ))}
    </div>
  )
}
