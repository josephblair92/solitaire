import type * as Types from "../types/types";
import { Card } from "./Card";
import { FaceDownCard } from "./FaceDownCard";

export interface StockProps {
    cards: Types.Card[]
    advanceStock: () => void
}

export function Stock ({ cards, advanceStock }: StockProps) {
    return (
        <div className="flex gap-3">
            <FaceDownCard onClick={advanceStock} />
            <Card location="stock" card={cards[0]} />
        </div>
    )
}