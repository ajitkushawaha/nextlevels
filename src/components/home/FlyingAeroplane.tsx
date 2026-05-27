// "use client"

// import { useEffect, useRef } from 'react'

// interface SmokeParticle {
//   x: number
//   y: number
//   vx: number
//   vy: number
//   alpha: number
//   size: number
// }

// export default function FlyingAeroplane() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const particlesRef = useRef<SmokeParticle[]>([])

//   // Ref to hold movement and tracking variables to ensure smooth 60fps frame rate without re-renders
//   const posRef = useRef({
//     currX: 0,
//     currY: 0,
//     targetX: 0,
//     targetY: 0,
//     isHovering: false,
//     width: 90, // Size of the SVG plane
//     height: 90,
//     initialized: false,
//     flipX: 1, // 1 for right, -1 for left
//     angle: 0,
//     lastSpawnX: 0,
//     lastSpawnY: 0,
//     idleFrameCount: 0,
//     lastMouseX: 0,
//     lastMouseY: 0,
//     introPhase: true,
//     introFrameCount: 0
//   })

//   useEffect(() => {
//     const el = containerRef.current
//     if (!el) return

//     // Position and canvas sizing update relative to the viewport
//     const updateDimensions = () => {
//       const w = window.innerWidth
//       const h = window.innerHeight

//       // Update canvas dimensions to match the full viewport
//       if (canvasRef.current) {
//         canvasRef.current.width = w
//         canvasRef.current.height = h
//       }

//       // Default home spot (parked in header, top-right side)
//       const defaultX = Math.min(w * 0.75, w - 180) + 70
//       const defaultY = 60

//       if (!posRef.current.initialized) {
//         // Initialize position centered on the header home spot
//         posRef.current.currX = defaultX - posRef.current.width / 2
//         posRef.current.currY = defaultY - posRef.current.height / 2
//         posRef.current.initialized = true

//         el.style.left = '0px'
//         el.style.top = '0px'
//       }
//     }

//     // Initialize and bind listeners
//     updateDimensions()
//     window.addEventListener('resize', updateDimensions)

//     const handleMouseMove = (e: MouseEvent) => {
//       const p = posRef.current
//       p.isHovering = true
//       p.lastMouseX = e.clientX
//       p.lastMouseY = e.clientY
//     }

//     const handleMouseLeave = () => {
//       posRef.current.isHovering = false
//     }

//     // Listen globally on window/document to fly over the entire page
//     // window.addEventListener('mousemove', handleMouseMove)
//     // document.addEventListener('mouseleave', handleMouseLeave)

//     let animationFrameId: number

//     const tick = () => {
//       const p = posRef.current
//       const particles = particlesRef.current

//       const w = window.innerWidth
//       const h = window.innerHeight

//       // Responsive default home spot (parked in header, top-right side)
//       const defaultX = Math.min(w * 0.75, w - 180) + 35
//       const defaultY = 40

//       // Update existing particles in the array
//       for (let i = particles.length - 1; i >= 0; i--) {
//         const pt = particles[i]
//         pt.x += pt.vx
//         pt.y += pt.vy
//         pt.alpha -= 0.015 // fade speed
//         pt.size += 0.2 // grow/dispersion size

//         if (pt.alpha <= 0) {
//           particles.splice(i, 1)
//         }
//       }

//       // Handle Intro Phase Flight Path
//       if (p.introPhase) {
//         p.introFrameCount++
//         const frame = p.introFrameCount

//         if (frame <= 90) {
//           // Phase 1: Parked in header (bobbing, facing right)
//           p.targetX = defaultX - p.width / 2
//           p.targetY = defaultY - p.height / 2
//           p.flipX = 1
//         } else if (frame <= 150) {
//           // Phase 2: Takeoff and swoop down: from parked to (W*0.5 + R, H*0.45)
//           const t = (frame - 90) / 60
//           const startX = defaultX - p.width / 2
//           const startY = defaultY - p.height / 2
//           const R = Math.min(w * 0.15, 120)
//           const endX = w * 0.5 + R - p.width / 2
//           const endY = h * 0.45 - p.height / 2

//           p.targetX = startX * (1 - t * t) + endX * t * t
//           p.targetY = startY * (1 - t) * (1 - t) + endY * t * (2 - t)
//         } else if (frame <= 270) {
//           // Phase 3: Loop-the-loop: counterclockwise around center (W*0.5, H*0.45)
//           const t = (frame - 150) / 120
//           const angle = t * 2 * Math.PI
//           const R = Math.min(w * 0.15, 120)

//           const centerX = w * 0.5 - p.width / 2
//           const centerY = h * 0.45 - p.height / 2

//           p.targetX = centerX + R * Math.cos(angle)
//           p.targetY = centerY + R * Math.sin(angle)
//         } else if (frame <= 330) {
//           // Phase 4: Exit loop and fly to home or follow cursor
//           const t = (frame - 270) / 60
//           const R = Math.min(w * 0.15, 120)
//           const startX = w * 0.5 + R - p.width / 2
//           const startY = h * 0.45 - p.height / 2

//           let endX = defaultX - p.width / 2
//           let endY = defaultY - p.height / 2

//           /*
//           if (p.isHovering) {
//             const planeCenterX = startX + p.width / 2
//             const dxToMouse = p.lastMouseX - planeCenterX
//             const tempFlipX = dxToMouse > 0 ? 1 : -1
//             const offsetX = tempFlipX === 1 ? -60 : 60
//             const offsetY = 25
//             endX = p.lastMouseX + offsetX - p.width / 2
//             endY = p.lastMouseY + offsetY - p.height / 2
//           }
//           */

//           p.targetX = startX + (endX - startX) * t
//           p.targetY = startY + (endY - startY) * t
//         } else {
//           // Intro complete!
//           p.introPhase = false
//         }
//       }

//       // If we are not in the intro phase, target the mouse or the header home position
//       if (!p.introPhase) {
//         /*
//         if (p.isHovering) {
//           const planeCenterX = p.currX + p.width / 2
//           const dxToMouse = p.lastMouseX - planeCenterX

//           // Face the cursor
//           if (Math.abs(dxToMouse) > 5) {
//             p.flipX = dxToMouse > 0 ? 1 : -1
//           }

//           const offsetX = p.flipX === 1 ? -60 : 60
//           const offsetY = 25

//           p.targetX = p.lastMouseX + offsetX - p.width / 2
//           p.targetY = p.lastMouseY + offsetY - p.height / 2
//         } else {
//         */
//         // Returning back to header parking spot
//         p.targetX = defaultX - p.width / 2
//         p.targetY = defaultY - p.height / 2

//         const planeCenterX = p.currX + p.width / 2
//         const dxToHome = defaultX - planeCenterX

//         if (Math.abs(dxToHome) > 15) {
//           p.flipX = dxToHome > 0 ? 1 : -1
//         } else {
//           p.flipX = 1 // Face right when resting/parked
//         }
//         /*
//         }
//         */
//       }

//       // Smooth movement interpolation (lerping)
//       const dx = p.targetX - p.currX
//       const dy = p.targetY - p.currY

//       p.currX += dx * 0.07 // smooth easing speed (lower = softer/more trailing)
//       p.currY += dy * 0.07

//       // Detect horizontal flight direction during intro phase
//       if (p.introPhase) {
//         if (p.introFrameCount <= 90) {
//           p.flipX = 1
//         } else if (Math.abs(dx) > 0.5) {
//           p.flipX = dx > 0 ? 1 : -1
//         }
//       }

//       // Steer/rotate nose based on speed and flight path
//       // Since the SVG flip is applied to the child, we must multiply targetAngle by p.flipX
//       // so that it tilts correctly (nose down when descending, nose up when climbing) in both directions.
//       // We use a larger multiplier (0.8) and cap (60 degrees) so the plane tilts clearly during vertical climbs/dives.
//       const baseTilt = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI) * 0.8
//       const targetAngle = p.flipX * Math.min(Math.max(baseTilt, -60), 60)
//       p.angle += (targetAngle - p.angle) * 0.15

//       // Calculate plane center and engine exhaust tail coordinate
//       const centerX = p.currX + p.width / 2
//       const centerY = p.currY + p.height / 2
//       const angleRad = p.angle * (Math.PI / 180)

//       const cos = Math.cos(angleRad)
//       const sin = Math.sin(angleRad)

//       // Calculate precise tail offset (using SVG tail tip coordinates: localX = -32, localY = -2)
//       const tailX = centerX - 32 * p.flipX * cos + 2 * sin
//       const tailY = centerY - 32 * p.flipX * sin - 2 * cos

//       // Calculate velocity magnitude
//       const speed = Math.hypot(dx, dy)

//       // Spawn new particles (heavier trail when moving, small puffs when idling)
//       let shouldSpawn = false
//       // if ((p.isHovering || p.introPhase) && speed > 2.5) {
//       if ((p.introPhase) && speed > 2.5) {
//         // Space out particles based on distance travelled to avoid clumped rendering
//         const distSinceLast = Math.hypot(p.currX - p.lastSpawnX, p.currY - p.lastSpawnY)
//         if (distSinceLast > 6) {
//           shouldSpawn = true
//           p.lastSpawnX = p.currX
//           p.lastSpawnY = p.currY
//         }
//       } else {
//         // Idle puffing (breath of engine) when stopped or parked
//         p.idleFrameCount++
//         if (p.idleFrameCount >= 25) {
//           shouldSpawn = true
//           p.idleFrameCount = 0
//         }
//       }

//       if (shouldSpawn) {
//         // Particles drift slightly backwards and upwards
//         // Calculate the direction opposite to plane's heading
//         const headingAngle = angleRad + (p.flipX === -1 ? Math.PI : 0)
//         const driftAngle = headingAngle + Math.PI + (Math.random() - 0.5) * 0.35
//         const pSpeed = (speed > 2.5 ? speed * 0.12 : 0.4) + Math.random() * 0.4

//         particles.push({
//           x: tailX,
//           y: tailY + (Math.random() - 0.5) * 4,
//           vx: Math.cos(driftAngle) * pSpeed,
//           vy: Math.sin(driftAngle) * pSpeed - 0.15, // slight lift
//           alpha: 0.65 + Math.random() * 0.15,
//           size: 3 + Math.random() * 3
//         })
//       }

//       // Draw trail particles on the canvas element
//       const canvas = canvasRef.current
//       if (canvas) {
//         const ctx = canvas.getContext('2d')
//         if (ctx) {
//           ctx.clearRect(0, 0, canvas.width, canvas.height)

//           for (const pt of particles) {
//             ctx.beginPath()
//             ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)

//             // Magical glowing gold-white radial gradient cloud particle
//             const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.size)
//             grad.addColorStop(0, `rgba(255, 255, 255, ${pt.alpha})`)
//             grad.addColorStop(0.3, `rgba(246, 218, 115, ${pt.alpha * 0.7})`)
//             grad.addColorStop(0.7, `rgba(215, 162, 58, ${pt.alpha * 0.25})`)
//             grad.addColorStop(1, 'rgba(215, 162, 58, 0)')

//             ctx.fillStyle = grad
//             ctx.fill()
//           }
//         }
//       }

//       // Breathing/floating motion: Bob slightly more when slow/stopped, and reduce it when high-speed
//       const floatAmplitude = Math.max(0, 4.5 - speed * 0.08)
//       const floatY = Math.sin(Date.now() / 600) * floatAmplitude

//       // Apply transforms using CSS transform for GPU-acceleration (smooth 60+ FPS)
//       if (el) {
//         el.style.transform = `translate3d(${p.currX}px, ${p.currY + floatY}px, 0) rotate(${p.angle}deg)`

//         // Find the SVG element and update its scale flip directly in the DOM
//         const svg = el.querySelector('svg')
//         if (svg) {
//           svg.style.transform = `scaleX(${p.flipX})`
//         }
//       }

//       animationFrameId = requestAnimationFrame(tick)
//     }

//     tick()

//     return () => {
//       window.removeEventListener('resize', updateDimensions)
//       // window.removeEventListener('mousemove', handleMouseMove)
//       // document.removeEventListener('mouseleave', handleMouseLeave)
//       cancelAnimationFrame(animationFrameId)
//     }
//   }, [])

//   return (
//     <>
//       {/* High-performance canvas for rendering smoke particles behind the plane */}
//       <canvas
//         ref={canvasRef}
//         className="fixed inset-0 z-[59] pointer-events-none"
//       />

//       {/* Elegant SVG plane container */}
//       <div
//         ref={containerRef}
//         className="fixed z-[60] pointer-events-none w-[90px] h-[90px]"
//         style={{
//           willChange: 'transform'
//         }}
//       >
//         <svg
//           viewBox="0 0 64 64"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-full h-full filter drop-shadow-[0_5px_12px_rgba(215,162,58,0.35)]"
//           style={{
//             transform: 'scaleX(1)',
//             transformOrigin: 'center',
//             willChange: 'transform'
//           }}
//         >
//           <path
//             d="M54 28.5H38.2L28.4 12.8c-.5-.8-1.4-1.3-2.4-1.3h-3.5c-.7 0-1.2.7-.9 1.4l6.5 15.6H17.2l-3.8-5.7c-.4-.6-1.1-1-1.8-1H9.2c-.6 0-1.1.6-1 1.2l1.9 6.5-1.9 6.5c-.1.6.4 1.2 1 1.2h2.4c.7 0 1.4-.4 1.8-1l3.8-5.7h11l-6.5 15.6c-.3.7.2 1.4.9 1.4h3.5c1 0 1.9-.5 2.4-1.3l9.8-15.7H54c4.1 0 4.1-6 0-6z"
//             fill="url(#planeGoldGradient)"
//           />
//           <defs>
//             <linearGradient id="planeGoldGradient" x1="8" y1="32" x2="56" y2="32" gradientUnits="userSpaceOnUse">
//               <stop offset="0%" stopColor="#f6da73" />
//               <stop offset="50%" stopColor="#d7a23a" />
//               <stop offset="100%" stopColor="#b5821c" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>
//     </>
//   )
// }
