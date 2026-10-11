import type { Suit } from "../types/types";
import { getSuitColor } from "../utils/utils";
import { Card } from "./Card";
import { EmptyCardStackPlaceholder } from "./EmptyCardStackPlaceholder";
import { useDroppable } from "@dnd-kit/react";

export interface FoundationProps {
    suit: Suit
    numCardsPlaced: number
}

export function Foundation ({ suit, numCardsPlaced }: FoundationProps) {
    const { ref } = useDroppable({ id: `foundation-${suit}` })
    return <div ref={ref}>
        {numCardsPlaced > 0
                ? <Card location={`foundation-${suit}`} card={{ suit, number: numCardsPlaced, color: getSuitColor(suit) }} />
                : <EmptyCardStackPlaceholder />
        }
    </div>
}