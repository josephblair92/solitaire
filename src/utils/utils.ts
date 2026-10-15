import { type Card, Suit, SuitColor } from "../types/types"

const suitColors = {
  [Suit.CLUBS]: SuitColor.BLACK,
  [Suit.SPADES]: SuitColor.BLACK,
  [Suit.HEARTS]: SuitColor.RED,
  [Suit.DIAMONDS]: SuitColor.RED
}

export const getSuitColor = (suit: Suit) => {
  return suitColors[suit]
}

export const getCardKey = ({ number, suit }: Card) => `${suit}-${number}`
