import type * as Types from "../types/types";
import { getCardKey } from "../utils/utils";
import { Card } from "./Card";
import { EmptyCardStackPlaceholder } from "./EmptyCardStackPlaceholder";
import { FaceDownCard } from "./FaceDownCard";

export interface CardStackProps {
    cards: Types.Card[]
    faceDownUntilIndex?: number
    stackIndex: number
}

export function CardStack ({ cards, faceDownUntilIndex = 0, stackIndex }: CardStackProps) {
    if (cards.length) return (
      <div className="flex flex-col gap-2">
        {cards.map((card, index) => 
            index >= faceDownUntilIndex 
                ? <Card location={`tableau-${stackIndex}`} key={getCardKey(card)} positionInStack={index} card={card} />
                : <FaceDownCard key={getCardKey(card)} positionInStack={index} />
        )}
      </div>
    )
    else return <EmptyCardStackPlaceholder />
}