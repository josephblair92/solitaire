import type * as Types from "../types/types";
import { Card } from "./Card";
import { FaceDownCard } from "./FaceDownCard";

export interface StockProps {
    cards: Types.Card[]
}

export function Stock ({ cards }: StockProps) {
    return (
        <div className="flex gap-3">
            <FaceDownCard />
            <Card location="stock" card={cards[0]} />
        </div>
    )
}