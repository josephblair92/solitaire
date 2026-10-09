import { type TableauPile } from "../types/types"
import { CardStack } from "./CardStack"

export interface TableauProps {
    piles: TableauPile[]
}

export function Tableau ({ piles }: TableauProps) {
    return (
        <div className="flex justify-around w-full p-4">
            {piles.map(pile => <CardStack cards={pile.cards} />)}
        </div>
    )
}