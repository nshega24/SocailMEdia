"use client"

import { motion } from "framer-motion"
import { ClipboardList } from "lucide-react"

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
        <ClipboardList className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
        Social Media Management Questionnaire
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Complete this questionnaire to help us understand your social media needs and create a tailored strategy for
        your brand.
      </p>
    </motion.div>
  )
}

