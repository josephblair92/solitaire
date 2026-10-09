import type * as Types from "../types/types";
import { Card } from "./Card";
import { EmptyCardStackPlaceholder } from "./EmptyCardStackPlaceholder";
import { FaceDownCard } from "./FaceDownCard";

export interface CardStackProps {
    cards: Types.Card[]
    faceDownUntilIndex?: number
}

export function CardStack ({ cards, faceDownUntilIndex = 0 }: CardStackProps) {
    if (cards.length) return (
      <div className="flex flex-col gap-2">
        {cards.map((card, index) => 
            index >= faceDownUntilIndex 
                ? <Card positionInStack={index} card={card} />
                : <FaceDownCard positionInStack={index} />
        )}
      </div>
    )
    else return <EmptyCardStackPlaceholder />
}