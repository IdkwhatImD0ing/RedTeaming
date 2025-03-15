"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Create particles
        const particlesArray: Particle[] = []
        const numberOfParticles = 50

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string

            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 3 + 1
                this.speedX = (Math.random() - 0.5) * 0.5
                this.speedY = (Math.random() - 0.5) * 0.5

                // Use Voxploit colors
                const colors = ["#D72631", "#FF7F11", "#0F7DC2"]
                this.color = colors[Math.floor(Math.random() * colors.length)]
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > canvas.width) this.x = 0
                else if (this.x < 0) this.x = canvas.width

                if (this.y > canvas.height) this.y = 0
                else if (this.y < 0) this.y = canvas.height
            }

            draw() {
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle())
            }
        }

        init()

        const connect = () => {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x
                    const dy = particlesArray[a].y - particlesArray[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        const opacity = 1 - distance / 150
                        ctx.strokeStyle = `rgba(47, 52, 64, ${opacity * 0.2})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update()
                particlesArray[i].draw()
            }

            connect()
            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full bg-background opacity-30" />
}

