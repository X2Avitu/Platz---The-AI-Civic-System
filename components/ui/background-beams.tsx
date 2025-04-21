"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({
  className,
  ...props
}: {
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrameId: number

    const render = () => {
      if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height)

        const centerX = mousePosition.x !== 0 ? mousePosition.x : canvas.width / 2
        const centerY = mousePosition.y !== 0 ? mousePosition.y : canvas.height / 2

        const gradient = context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          Math.max(canvas.width, canvas.height) / 1.5,
        )

        gradient.addColorStop(0, "rgba(255, 236, 0, 0.05)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition])

  return <canvas ref={canvasRef} className={cn("pointer-events-none absolute inset-0 z-0", className)} {...props} />
}
