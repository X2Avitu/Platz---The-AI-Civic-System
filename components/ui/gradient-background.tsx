"use client"

import { useEffect, useRef } from "react"

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width: number, height: number, dpr: number;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

       // Reinitialize blobs if dimensions change significantly (optional, but good practice)
       // Comment out if you don't want blobs to reset on resize
       initializeBlobs();
    }


    // Create gradient colors
    const colors = [
      { r: 80, g: 200, b: 120 },  // Light green
      { r: 46, g: 174, b: 96 },   // Medium green
      { r: 20, g: 148, b: 92 },   // Emerald green
      { r: 0, g: 128, b: 96 },    // Teal green
    ]

    // Create blobs distributed across the entire page
    let blobs: any[] = []; // Define blobs array outside

    const initializeBlobs = () => {
        blobs = []; // Clear existing blobs
        if (!width || !height) return; // Ensure dimensions are set

        // Create blobs for the top section
        for (let i = 0; i < 4; i++) {
          blobs.push({
            x: Math.random() * width,
            y: Math.random() * (height * 0.5), // Use calculated width/height
            radius: 150 + Math.random() * 250,
            // Slower initial speeds for a gentler effect
            xSpeed: (Math.random() - 0.5) * 0.4,
            ySpeed: (Math.random() - 0.5) * 0.4,
            colorIndex: i % colors.length,
          })
        }

        // Create blobs for the middle and bottom sections
        for (let i = 0; i < 6; i++) {
          blobs.push({
            x: Math.random() * width,
            y: height * 0.5 + Math.random() * (height * 0.5), // Use calculated width/height
            radius: 150 + Math.random() * 250,
            xSpeed: (Math.random() - 0.5) * 0.4,
            ySpeed: (Math.random() - 0.5) * 0.4,
            colorIndex: i % colors.length,
          })
        }
    }


    setCanvasDimensions() // Initial setup
    // initializeBlobs(); // Initial blob creation is now handled by setCanvasDimensions
    window.addEventListener("resize", setCanvasDimensions)

    // Animation
    let animationFrameId: number
    const render = () => {
      if (!ctx || !width || !height) return; // Check if context and dimensions are valid

      // Clear canvas
      ctx.clearRect(0, 0, width, height) // Use calculated width/height

      // Draw and update blobs
      blobs.forEach((blob) => {
        // Update position
        blob.x += blob.xSpeed
        blob.y += blob.ySpeed

        // Bounce off edges using calculated width/height
        const buffer = blob.radius * 0.2; // Smaller buffer to keep blobs more visible
        if (blob.x < -buffer) {
          blob.x = -buffer;
          blob.xSpeed *= -1;
        } else if (blob.x > width + buffer) {
          blob.x = width + buffer;
          blob.xSpeed *= -1;
        }

        if (blob.y < -buffer) {
          blob.y = -buffer;
          blob.ySpeed *= -1;
        } else if (blob.y > height + buffer) {
          blob.y = height + buffer;
          blob.ySpeed *= -1;
        }

        // Draw gradient blob with adjusted opacity/falloff
        const color = colors[blob.colorIndex]
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)

        // Adjusted opacity for a softer, more blended look
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.25)`) // Lower center opacity
        gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`) // Softer edge falloff
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.beginPath()
        ctx.fillStyle = gradient
        // Use globalCompositeOperation for smoother blending if desired (optional)
        // ctx.globalCompositeOperation = 'lighter'; // or 'screen'
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
        // ctx.globalCompositeOperation = 'source-over'; // Reset composite operation if used
      })

      animationFrameId = window.requestAnimationFrame(render)
    }

    render() // Start animation

    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, []) // Empty dependency array ensures this runs once on mount

  // Removed style={{ filter: 'blur(100px)' }} as blur is better handled by gradient stops
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" /> // Added slight opacity to canvas itself
}