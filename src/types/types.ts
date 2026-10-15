export const Suit = {
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  SPADES: "spades"
} as const

export type Suit = (typeof Suit)[keyof typeof Suit]

export const SuitColor = {
  RED: "red",
  BLACK: "black"
}

export type SuitColor = (typeof SuitColor)[keyof typeof SuitColor]

export type Card = {
  number: number
  suit: Suit
  color: SuitColor
}

export interface TableauPile {
  cards: Card[]
  numFaceDownCards: number
}
