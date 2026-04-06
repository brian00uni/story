"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export default function ScrollText() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 각 라인별 속도 다르게
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])

  return (
    <section
      ref={ref}
      style={{
        // height: "200vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "40px",
        overflow: "hidden",
      }}
    >
      <motion.div style={{ x: x1 }} className="line">
        SCROLL TEXT SCROLL TEXT SCROLL TEXT
      </motion.div>

      <motion.div style={{ x: x2 }} className="line">
        REACT MOTION ANIMATION REACT MOTION
      </motion.div>

      <motion.div style={{ x: x3 }} className="line">
        PARALLAX TEXT EFFECT PARALLAX TEXT
      </motion.div>
    </section>
  )
}