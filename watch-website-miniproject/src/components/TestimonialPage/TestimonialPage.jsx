import React, { useRef, useEffect } from "react";

const cards = [
    {
        id: 1,
        title: "“Elegance and Precision” — Asha K.",
        meta: "Asha K. • July 5, 2025",
        excerpt:
            "I gifted the Swarovski piece to myself and it instantly became my go-to. The crystal detailing catches light in the most flattering way and the movement keeps perfect time — classy enough for gala nights, subtle enough for daily wear.",
        img: "https://static.helioswatchstore.com/media/magefan_blog/b11_500_x_350.jpg",
    },
    {
        id: 2,
        title: "“Built Like a Tank” — Rohit S.",
        meta: "Rohit S. • June 26, 2025",
        excerpt:
            "I wear my G-Shock for work, gym and weekend hikes — zero scratches so far. The shock resistance and battery life are absurdly good. If you want a worry-free daily watch, this one’s unbeatable.",
        img: "https://static.helioswatchstore.com/media/magefan_blog/fossil500_x_350.jpg",
    },
    {
        id: 3,
        title: "“Sleek & Subtle” — Priya M.",
        meta: "Priya M. • May 15, 2025",
        excerpt:
            "The minimalist dial is gorgeous — thin case, clean lines and a strap that feels premium. It pairs perfectly with both office blazers and weekend denim. I get compliments every time I wear it.",
        img: "https://static.helioswatchstore.com/media/magefan_blog/nb500_x_350_copy.jpg",
    },
    {
        id: 4,
        title: "“A Time Capsule” — Arjun D.",
        meta: "Arjun D. • May 2, 2025",
        excerpt:
            "A vintage look that still feels modern — the domed crystal and aged-lume give it character. It’s become my conversation starter at dinners. Comfortable, well-built, and full of charm.",
        img: "https://static.helioswatchstore.com/media/magefan_blog/dw500_x_350_copy.jpg",
    },
]

export default function TestimonialPage() {
    const scroller = useRef(null)
    const isDown = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const rafRef = useRef(null)
    const targetScroll = useRef(null)
    const lastMoveTime = useRef(0)
    const lastMoveX = useRef(0)
    const velocity = useRef(0)

    useEffect(() => {
        const el = scroller.current
        if (!el) return

        //disable browser smooth for programmatic adustment; we will handle smoothing in RAF
        el.style.scrollBehavior = 'auto'

        const handleUp = () => {
            isDown.current = false
            el.classList && el.classList.remove('cursor-grabbing')

        }
        window.addEventListener('mouseup', handleUp)
        window.addEventListener('touchend', handleUp)

        return () => {
            window.removeEventListener('mouseup', handleUp)
            window.removeEventListener('touchend', handleUp)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const ensureRafRunning = () => {
        if (rafRef.current) return
        const el = scroller.current
        let last = performance.now()

        const loop = (now) => {
            const dt = now - last
            last = now
            if (targetScroll.current === null) {
                rafRef.current = null
                return
            }
            const current = el.scrollLeft
            const lerpAlpha = 1 - Math.pow(0.001, dt)
            const next = current + (targetScroll.current - current) * lerpAlpha

            el.scrollLeft = next

            if (Math.abs(targetScroll.current - next) < 0.5 && !isDown.current && Math.abs(velocity.current) < 0.02) {
                el.scrollLeft = targetScroll.current
                targetScroll.current = null
                rafRef.current = null
                return
            }
            rafRef.current = requestAnimationFrame(loop)

        }

        rafRef.current = requestAnimationFrame(loop)
    }

    const startMomentum = () => {
        const el = scroller.current
        if (!el) return

        if (Math.abs(velocity.current) < 0.02) {
            velocity.current = 0
            targetScroll.current = null
            return
        }

        targetScroll.current = el.scrollLeft
        ensureRafRunning()

        let last = performance.now()
        const friction = 0.0008

        const step = (now) => {
            const dt = now - last
            last = now

            targetScroll.current += velocity.current * dt
            const factor = Math.exp(-friction * dt)
            velocity.current *= factor

            if (Math.abs(velocity.current) > 0.02) {
                rafRef.current = requestAnimationFrame(step)
            } else {
                setTimeout(() => {
                    targetScroll.current = Math.round(targetScroll.current)
                    velocity.current = 0
                }, 0);
                rafRef.current = null
            }
        }

        if (rafRef.current) {
            rafRef.current = requestAnimationFrame(step)
        } else {
            rafRef.current = requestAnimationFrame(step)
        }
    }

    const onMouseDown = (e) => {
        const el = scroller.current
        if (!el) return

        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }

        isDown.current = true
        el.classList.add('cursor-grabbing')

        startX.current = e.current - el.offsetLeft
        scrollLeft.current = el.scrollLeft

        targetScroll.current = el.scrollLeft
        lastMoveTime.current = performance.now()
        lastMoveX.current = e.clientX
        velocity.current = 0

        ensureRafRunning()
    }

    const onMouseLeave = () => {
        isDown.current = false
        scroller.current && scroller.current.classList.remove('cursor-grabbing')
        startMomentum()
    }

    const onMouseUp = () => {
        isDown.current = false
        scroller.current && scroller.current.classList.remove('cursor-grabbing')
        startMomentum()
    }

    const onMouseMove = (e) => {
        if (!isDown.current) return
        e.preventDefault()
        const el = scroller.current
        const x = e.clientX - el.offsetLeft
        const walk = (x - startX.current) * 1

        targetScroll.current = scrollLeft.current - walk

        const now = performance.now()
        const dt = Math.max(1, now - lastMoveTime.current)
        const instantV = (e.clientX - lastMoveX.current)

        velocity.current = instantV * 0.6 + velocity.current * 0.4
        lastMoveTime.current = now
        lastMoveX.current = e.clientX

        ensureRafRunning()
    }

    const onTouchStart = (e) => {
        const el = scroller.current
        if (!el) return
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }

        isDown.current = true
        startX.current = e.touches[0].clientX - el.offsetLeft
        scrollLeft.current = el.scrollLeft

        targetScroll.current = el.scrollLeft
        lastMoveTime.current = performance.now()
        lastMoveX.current = e.touches[0].clientX
        velocity.current = 0

        ensureRafRunning()
    }

    const onTouchMove = (e) => {
        if (!isDown.current) return
        const el = scroller.current
        const x = e.touches[0].clientX - el.offsetLeft
        const walk = (x - startX.current) * 1

        targetScroll.current = scrollLeft.current - walk

        // velocity px/ms
        const now = performance.now()
        const dt = Math.max(1, now - lastMoveTime.current)
        const instantV = (e.touches[0].clientX - lastMoveX.current) / dt
        velocity.current = instantV * 0.6 + velocity.current * 0.4
        lastMoveTime.current = now
        lastMoveX.current = e.touches[0].clientX

        ensureRafRunning()
    }

    const onTouchEnd = () => {
        isDown.current = false
        scroller.current && scroller.current.classList.remove('cursor-grabbing')
        startMomentum()
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
                <h2
                    className="text-3xl md:text-4xl text-center font-extralight text-gray-900 tracking-wide mb-10"
                    style={{ fontFamily: "'Playfair Display',serif" }}
                >
                    THE WATCH JOURNAL
                </h2>
                {/* Horimontal scroller  */}
                <div
                    ref={scroller}
                    className="flex gap-8 overflow-x-auto pb-6 px-2 md:px-6 snap-x snap-mandatory cursor-grab"
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        touchAction: 'pan-y'
                    }}
                >
                    {cards.map((c) => (
                        <article
                            key={c.id}
                            className="snap-center flex-shrink-2 min-w-[92%] md:min-w-[48%] lg:min-w-[49%] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row"
                            aria-roledescription="card"
                        >
                            {/* Left image block  */}
                            <div className="w-full lg:w-5/12 min-h-[220px] md:min-h-[300px] overflow-hidden relative rounded-t-2xl lg:rounded-l-2xl">
                                <img
                                    src={c.img}
                                    alt={c.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" fill="%236b7280" font-size="20" text-anchor="middle" dy=".3em">Image unavailable</text></svg>'
                                    }}
                                />

                            </div>
                            {/* Right content  */}
                            <div className="w-full lg:w-7/12 p-8 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 mb-3">
                                            {c.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-6">{c.meta}</p>
                                        <p className="text-gray-600 leading-relaxed">{c.excerpt}</p>
                                    </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <style>
                {`
                .container ::-webkit-scrollbar {display:none;}
                .container {-ms-overflow-style:none;scrollbar-width:none}`}
            </style>
        </section>
    )


}