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
      <div className="inline-grid auto-rows-4 sm:auto-rows-5 gap-2" ref={ref}>
        {cards.map((card, index) => 
            index >= faceDownUntilIndex 
                ? <Card location={`${stackKey}-${index}`} key={getCardKey(card)} card={card} onDoubleClick={() => onDoubleClick(stackIndex, index, card.suit)} />
                : <FaceDownCard key={getCardKey(card)} />
        )}
      </div>
    )
    else return <div ref={ref}>
        <EmptyCardStackPlaceholder />
    </div>
}