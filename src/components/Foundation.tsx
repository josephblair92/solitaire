import type { Suit } from "../types/types";
import { getSuitColor } from "../utils/utils";
import { Card } from "./Card";
import { EmptyCardStackPlaceholder } from "./EmptyCardStackPlaceholder";

export interface FoundationProps {
    suit: Suit
    numCardsPlaced: number
}

export function Foundation ({ suit, numCardsPlaced }: FoundationProps) {
    return numCardsPlaced > 0
        ? <Card card={{ suit, number: numCardsPlaced, color: getSuitColor(suit) }} />
        : <EmptyCardStackPlaceholder />
}