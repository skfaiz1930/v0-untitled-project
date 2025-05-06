"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coins } from "lucide-react"

interface CoinAnimationProps {
  amount: number
  onComplete?: () => void
}

export default function CoinAnimation({ amount, onComplete }: CoinAnimationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.5, y: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-yellow-100 dark:bg-yellow-900/70 text-yellow-800 dark:text-yellow-200 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"
          >
            <Coins className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-lg font-bold">+{amount} coins</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
