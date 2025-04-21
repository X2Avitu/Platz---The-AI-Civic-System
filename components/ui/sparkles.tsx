"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  className,
  particleDensity,
}: {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  className?: string
  particleDensity?: number
}) => {
  const [particles, setParticles] = useState<
    {
      x: number
      y: number
      size: number
      delay: number
    }[]
  >([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [])

  useEffect(() => {
    const particlesCount = Math.min(
      Math.max(
        Math.floor((dimensions.width * dimensions.height) / (particleDensity ? 1000 * particleDensity : 10000)),
        10,
      ),
      100,
    )

    const particlesArray = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize || 4) + (minSize || 1),
      delay: Math.random() * 1000,
    }))

    setParticles(particlesArray)
  }, [dimensions, maxSize, minSize, particleDensity])

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn("h-full w-full", className)}
      style={{
        background: background || "transparent",
      }}
    >
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [
                `${particle.x}%`,
                `${particle.x + (Math.random() * 10 - 5)}%`,
                `${particle.x + (Math.random() * 10 - 5)}%`,
              ],
              y: [
                `${particle.y}%`,
                `${particle.y + (Math.random() * 10 - 5)}%`,
                `${particle.y + (Math.random() * 10 - 5)}%`,
              ],
            }}
            transition={{
              duration: speed || 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay / 1000,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: particleColor || "#fff",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
