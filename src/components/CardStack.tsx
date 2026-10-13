import type * as Types from "../types/types";
import { getCardKey } from "../utils/utils";
import { Card } from "./Card";
import { EmptyCardStackPlaceholder } from "./EmptyCardStackPlaceholder";
import { FaceDownCard } from "./FaceDownCard";
import { useDroppable } from "@dnd-kit/react";

export interface CardStackProps {
    cards: Types.Card[]
    faceDownUntilIndex?: number
    stackIndex: number
    onDoubleClick: (stackIndex: number, cardIndex: number, suit: Types.Suit) => void
}

export function CardStack ({ cards, faceDownUntilIndex = 0, stackIndex, onDoubleClick }: CardStackProps) {
    const stackKey = `tableau-${stackIndex}`
    const { ref } = useDroppable({ id: stackKey })
    if (cards.length) return (
      <div className="flex flex-col gap-2" ref={ref}>
        {cards.map((card, index) => 
            index >= faceDownUntilIndex 
                ? <Card location={`${stackKey}-${index}`} key={getCardKey(card)} positionInStack={index} card={card} onDoubleClick={() => onDoubleClick(stackIndex, index, card.suit)} />
                : <FaceDownCard key={getCardKey(card)} positionInStack={index} />
        )}
      </div>
    )
    else return <div ref={ref}>
        <EmptyCardStackPlaceholder />
    </div>
}