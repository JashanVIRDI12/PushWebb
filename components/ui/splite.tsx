'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-paper">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}

interface SplineSceneLazyProps extends SplineSceneProps {
  /** Render immediately when the scene starts in the initial viewport. */
  eager?: boolean
  /** Unmount WebGL when scrolled out of view to free GPU memory */
  unmountWhenHidden?: boolean
  /** Delay before first load (ms) — spreads startup work in dev */
  loadDelay?: number
  /** Start the expensive WebGL scene on the visitor's first interaction. */
  deferUntilInteraction?: boolean
}

/**
 * Loads Spline only when the section is near the viewport.
 * Unmounts when scrolled away so only one WebGL context runs at a time.
 */
export function SplineSceneLazy({
  scene,
  className,
  eager = false,
  unmountWhenHidden = true,
  loadDelay = 0,
  deferUntilInteraction = false,
}: SplineSceneLazyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(eager)
  const [ready, setReady] = useState(loadDelay === 0)
  const [activated, setActivated] = useState(!deferUntilInteraction)

  useEffect(() => {
    if (loadDelay <= 0) return
    const timer = window.setTimeout(() => setReady(true), loadDelay)
    return () => window.clearTimeout(timer)
  }, [loadDelay])

  useEffect(() => {
    if (!deferUntilInteraction || activated) return

    const activate = () => setActivated(true)
    const events: Array<keyof WindowEventMap> = [
      'pointermove',
      'pointerdown',
      'touchstart',
      'keydown',
      'scroll',
    ]

    events.forEach((eventName) => {
      window.addEventListener(eventName, activate, { passive: true, once: true })
    })

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, activate))
    }
  }, [activated, deferUntilInteraction])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        } else if (unmountWhenHidden) {
          setVisible(false)
        }
      },
      { rootMargin: '120px', threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [unmountWhenHidden])

  const shouldRender = ready && visible && activated

  return (
    <div ref={ref} className={className ?? 'w-full h-full'}>
      {shouldRender ? (
        <SplineScene scene={scene} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-paper">
          <span className="loader" />
        </div>
      )}
    </div>
  )
}
