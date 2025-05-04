"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  xVelocity: number
  yVelocity: number
  rotationVelocity: number
}

export default function NudgeConfetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Generate confetti pieces
    const colors = [
      "#60A5FA", // blue
      "#6EE7B7", // mint
      "#FCA5A5", // coral
      "#F9A8D4", // pink
      "#C4B5FD", // purple
    ]

    const pieces: ConfettiPiece[] = []
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        xVelocity: -2 + Math.random() * 4,
        yVelocity: 3 + Math.random() * 5,
        rotationVelocity: -3 + Math.random() * 6,
      })
    }

    setConfetti(pieces)

    // Animate confetti
    const interval = setInterval(() => {
      setConfetti((prevConfetti) => {
        return prevConfetti
          .map((piece) => ({
            ...piece,
            y: piece.y + piece.yVelocity,
            x: piece.x + piece.xVelocity,
            rotation: piece.rotation + piece.rotationVelocity,
          }))
          .filter((piece) => piece.y < window.innerHeight + 100)
      })
    }, 50)

    // Clean up
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  )
}
