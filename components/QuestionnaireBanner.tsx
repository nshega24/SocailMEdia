"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Users, Target, BarChartIcon as ChartBar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const features = [
  {
    icon: Users,
    title: "Grow Your Audience",
    description: "Connect with your target audience effectively",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Develop a winning social media strategy",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: ChartBar,
    title: "Track Success",
    description: "Measure and optimize your performance",
    color: "bg-green-500/10 text-green-500",
  },
]

export function QuestionnaireBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-gradient-to-b from-background via-background/80 to-background/50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/10" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-emerald-500/30 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative px-6 py-12 md:px-8 md:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Content */}
            <motion.div initial="initial" animate="animate" className="space-y-6">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium"
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span className="text-primary">Transform Your Social Media Presence</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
              >
                Complete Your Brand Profile
              </motion.h1>

              <motion.p variants={fadeInUp} className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
                Take your social media strategy to the next level. Our comprehensive questionnaire helps create a
                tailored approach that resonates with your audience and drives real results.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="shadow-md hover:shadow-lg transition-all duration-300"
                  asChild
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </motion.div>

              {/* Features Grid */}
              <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-3 pt-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="p-4 backdrop-blur-sm bg-white/5 border-primary/10 hover:border-primary/20 transition-colors duration-300">
                      <div className={`rounded-full w-10 h-10 ${feature.color} flex items-center justify-center mb-3`}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl transform rotate-6 scale-95" />
              <div className="absolute inset-0 bg-gradient-to-l from-primary/10 to-purple-500/10 rounded-3xl transform -rotate-3" />
              <div className="relative">
                <div className="aspect-square w-full max-w-md mx-auto">
                  <div className="absolute inset-0 rounded-2xl border border-primary/10 bg-white/5 backdrop-blur-sm p-8">
                    {/* Decorative Elements */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: "100%", opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="h-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20"
                          style={{ width: `${100 - i * 15}%` }}
                        />
                      ))}
                    </div>
                    {/* Floating Elements */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-12 w-12 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        style={{
                          top: `${20 + i * 30}%`,
                          right: `${10 + i * 20}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

