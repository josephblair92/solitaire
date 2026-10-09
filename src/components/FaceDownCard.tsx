export type FaceDownCardProps = {
    positionInStack?: number
}

export function FaceDownCard ({ positionInStack = 0 }: FaceDownCardProps) {
    const classes = `h-33 w-20 bg-blue-500 border-white border-3 rounded-md ${positionInStack > 0 ? '-mt-27' : ''}`
    return <div className={classes} />
}