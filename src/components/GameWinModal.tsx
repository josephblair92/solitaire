import { useEffect, useRef } from "react"

export interface GameWinModalProps {
  isOpen: boolean
  onClose: () => void
  onReset: () => void
}

export function GameWinModal({ isOpen, onClose, onReset }: GameWinModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const onCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onClose()
  }

  if (!isOpen) return <></>

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <dialog
        ref={ref}
        onCancel={onCancel}
        className="flex flex-col m-auto w-80 h-60 rounded-lg border-1 border-gray-500 shadow-xl bg-blue-300 backdrop:bg-black/50"
      >
        <div className="flex grow justify-center items-center">
          <p className="text-4xl font-bold">You win!</p>
        </div>
        <footer>
          <div className="flex gap-2 justify-center p-2">
            <button className="bg-green-400" onClick={onReset}>
              Play Again
            </button>
            <button className="bg-red-400" onClick={onClose}>
              Dismiss
            </button>
          </div>
        </footer>
      </dialog>
    </div>
  )
}
