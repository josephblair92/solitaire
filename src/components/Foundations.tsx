import type { Suit } from "../types/types"
import { Foundation } from "./Foundation"

export interface FoundationsProps {
  foundationCardsPlaced: Record<Suit, number>
}

export function Foundations({ foundationCardsPlaced }: FoundationsProps) {
  return (
    <div className="flex gap-8">
      {(Object.entries(foundationCardsPlaced) as Array<[Suit, number]>).map(
        ([suit, count]) => (
          <Foundation
            key={`foundations-${suit}`}
            suit={suit}
            numCardsPlaced={count}
          />
        )
      )}
    </div>
  )
}
