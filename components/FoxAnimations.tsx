"use client"

import React, { useEffect, useState } from "react"

/**
 * Scenes / states:
 *
 * 1) Running Fox (right -> left)
 * 2) Blank (3s delay)
 * 3) Jumping Fox (bottom-left, flipped)
 * 4) Blank (3s delay)
 * 5) Running Fox (left -> right, flipped)
 * 6) Blank (3s delay)
 * 7) Jumping Fox (bottom-right, normal)
 * 8) Blank (3s delay)
 */
const scenes = [
  { type: "running-fox", direction: "rtl", duration: 6000 },
  { type: "none", duration: 3000 },
  { type: "jumping-fox", position: "left", duration: 8000 },
  { type: "none", duration: 3000 },
  { type: "running-fox", direction: "ltr", duration: 6000 },
  { type: "none", duration: 3000 },
  { type: "jumping-fox", position: "right", duration: 8000 },
  { type: "none", duration: 3000 },
]

export function FoxAnimations() {
  const [sceneIndex, setSceneIndex] = useState(0)

  useEffect(() => {
    let isCancelled = false
    let timer: ReturnType<typeof setTimeout>

    function scheduleNextScene() {
      const currentScene = scenes[sceneIndex]
      timer = setTimeout(() => {
        if (!isCancelled) {
          setSceneIndex((prev) => (prev + 1) % scenes.length)
        }
      }, currentScene.duration)
    }

    scheduleNextScene()

    return () => {
      isCancelled = true
      clearTimeout(timer)
    }
  }, [sceneIndex])

  const scene = scenes[sceneIndex]

  // Defaults: no GIF
  let src = ""
  let containerClass = ""
  let flip = false

  if (scene.type === "running-fox") {
    src = "/assets/running-fox.gif"
    if (scene.direction === "rtl") {
      containerClass = "fox-run-rtl"
    } else {
      containerClass = "fox-run-ltr"
      flip = true
    }
  } else if (scene.type === "jumping-fox") {
    src = "/assets/jumping-fox.gif"
    if (scene.position === "left") {
      containerClass = "fox-jump-left"
      flip = true
    } else {
      containerClass = "fox-jump-right"
    }
  } else {
    // type === "none": show nothing
    return null
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 999999,
          pointerEvents: "none",
        }}
        className={containerClass}
      >
        <img src={src} alt="Animated Fox" className={flip ? "fox-flip" : ""} />
      </div>

      <style jsx global>{`
        /* Keyframes */
        @keyframes fox-run-rtl {
          0% {
            transform: translateX(110vw) translateY(-50%);
          }
          100% {
            transform: translateX(-150px) translateY(-50%);
          }
        }

        @keyframes fox-run-ltr {
          0% {
            transform: translateX(-150px) translateY(-50%);
          }
          100% {
            transform: translateX(110vw) translateY(-50%);
          }
        }

        @keyframes fox-jump-fade {
          0%,
          100% {
            opacity: 0;
          }
          10%,
          90% {
            opacity: 1;
          }
        }

        .fox-run-rtl {
          top: 50%;
          animation: fox-run-rtl 6s linear forwards;
        }

        .fox-run-ltr {
          top: 50%;
          animation: fox-run-ltr 6s linear forwards;
        }

        .fox-flip {
          transform: scaleX(-1);
        }

        .fox-jump-left {
          position: fixed;
          left: 2rem;
          bottom: 0;
          animation: fox-jump-fade 8s ease-in-out forwards;
        }

        .fox-jump-right {
          position: fixed;
          right: 2rem;
          bottom: 0;
          animation: fox-jump-fade 8s ease-in-out forwards;
        }

        /* Larger sizes */
        .fox-run-rtl img,
        .fox-run-ltr img {
          width: 200px; /* Running fox at 200px wide */
          height: auto;
        }

        .fox-jump-left img,
        .fox-jump-right img {
          width: 250px; /* Jumping fox at 250px wide */
          height: auto;
        }
      `}</style>
    </>
  )
}
