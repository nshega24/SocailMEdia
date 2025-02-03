"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface FormProgressProps {
  currentStep: string
  steps: {
    id: string
    title: string
    description: string
    isComplete: boolean
  }[]
}

export function FormProgress({ currentStep, steps }: FormProgressProps) {
  return (
    <div className="hidden lg:block sticky top-4 h-fit">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-start gap-4 p-4 rounded-lg transition-colors ${
              currentStep === step.id ? "bg-primary/10 shadow-sm" : step.isComplete ? "bg-secondary/5" : "bg-background"
            }`}
          >
            <div
              className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center text-sm border-2 ${
                step.isComplete
                  ? "bg-primary border-primary text-primary-foreground"
                  : currentStep === step.id
                    ? "border-primary"
                    : "border-muted-foreground/20"
              }`}
            >
              {step.isComplete ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <div className="space-y-1">
              <p className={`text-sm font-medium ${currentStep === step.id ? "text-primary" : "text-foreground/80"}`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

