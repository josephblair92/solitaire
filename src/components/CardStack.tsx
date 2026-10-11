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
}

export function CardStack ({ cards, faceDownUntilIndex = 0, stackIndex }: CardStackProps) {
    const stackKey = `tableau-${stackIndex}`
    const { ref } = useDroppable({ id: stackKey })
    if (cards.length) return (
      <div className="flex flex-col gap-2" ref={ref}>
        {cards.map((card, index) => 
            index >= faceDownUntilIndex 
                ? <Card location={stackKey} key={getCardKey(card)} positionInStack={index} card={card} />
                : <FaceDownCard key={getCardKey(card)} positionInStack={index} />
        )}
      </div>
    )
    else return <EmptyCardStackPlaceholder />
}