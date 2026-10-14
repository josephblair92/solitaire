export type FaceDownCardProps = {
    onClick?: () => void
}

export function FaceDownCard ({ onClick }: FaceDownCardProps) {
    const classes = "h-33 w-20 bg-blue-500 border-white border-3 rounded-md"
    return <div className={classes} onClick={onClick} />
}