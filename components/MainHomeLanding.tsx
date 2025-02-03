"use client"

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion"
import { ArrowRight, Sparkles, Users, Target, BarChartIcon, Zap, Star, CheckCircle, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const features = [
  {
    icon: Users,
    title: "Audience Growth",
    description: "Expand your reach and engage with your target audience effectively.",
    color: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/20 dark:text-blue-300",
  },
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Develop and execute winning social media strategies.",
    color: "bg-purple-500/10 text-purple-600 dark:bg-purple-400/20 dark:text-purple-300",
  },
  {
    icon: BarChartIcon,
    title: "Performance Tracking",
    description: "Measure, analyze, and optimize your social media performance.",
    color: "bg-green-500/10 text-green-600 dark:bg-green-400/20 dark:text-green-300",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline your workflow with powerful automation tools.",
    color: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-400/20 dark:text-yellow-300",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechInnovate",
    content:
      "The social media management tools provided by this platform have revolutionized our marketing efforts. We've seen a 200% increase in engagement!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthSpark",
    content:
      "I was skeptical at first, but the results speak for themselves. Our social media presence has never been stronger, and it's directly impacting our bottom line.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    company: "CreativeVibe",
    content:
      "The automation features save me hours each week, allowing me to focus on creating better content and strategies. It's a game-changer!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function MainHomeLanding() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative overflow-hidden animated-background">
      <ThemeToggle />

      {/* Animated background gradient */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: useTransform(
            useMotionValue(mousePosition.x),
            (mouseX) =>
              `radial-gradient(600px circle at ${mouseX}px ${mousePosition.y}px, rgba(29,78,216,0.15), transparent 80%)`,
          ),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div initial="initial" animate="animate" className="space-y-8">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium"
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary dark:text-primary-foreground" />
                <span className="text-primary dark:text-primary-foreground">
                  Revolutionize Your Social Media Presence
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 dark:from-primary-foreground dark:to-purple-300">
                  Elevate Your Brand
                </span>{" "}
                <span className="inline-block text-foreground dark:text-primary-foreground">
                  with Smart Social Media Management
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="max-w-[600px] text-lg text-muted-foreground dark:text-gray-300 sm:text-xl"
              >
                Harness the power of AI-driven strategies and automation to skyrocket your social media performance and
                connect with your audience like never before.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground dark:text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/questionnaire">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="shadow-md hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 group"
                >
                  Watch Demo
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/5 dark:to-purple-500/5 rounded-3xl transform rotate-6 scale-95" />
              <div className="absolute inset-0 bg-gradient-to-l from-primary/10 to-purple-500/10 dark:from-primary/5 dark:to-purple-500/5 rounded-3xl transform -rotate-3" />
              <motion.div
                className="relative aspect-square w-full max-w-md mx-auto"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Social Media Dashboard"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-2xl dark:shadow-primary/20"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary dark:text-foreground">
              Powerful Features for Your Social Media Success
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive toolkit empowers you to take control of your social media presence and drive meaningful
              results.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "rounded-lg p-6 bg-opacity-10 dark:bg-opacity-20 hover:bg-opacity-20 dark:hover:bg-opacity-30 transition-all duration-300",
                    feature.color,
                  )}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <feature.icon className={cn("h-10 w-10 mb-4", feature.color.split(" ")[1])} />
                  <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">{feature.title}</h3>
                  <p className="text-muted-foreground dark:text-gray-300">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/5 to-background dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary dark:text-foreground">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our social media
              management services.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/5 -z-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary dark:text-foreground">
              Ready to Transform Your Social Media Strategy?
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8">
              Take the first step towards social media success. Start your free trial today and experience the power of
              our AI-driven platform.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground dark:text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/questionnaire">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary dark:text-foreground">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              Our social media management platform offers unique benefits that set us apart from the competition.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "AI-Powered Insights", description: "Leverage machine learning for data-driven decisions" },
              { title: "Time-Saving Automation", description: "Streamline your workflow and focus on strategy" },
              { title: "Customizable Reporting", description: "Generate beautiful, insightful reports with ease" },
              { title: "Multi-Platform Support", description: "Manage all your social accounts in one place" },
              { title: "Real-Time Analytics", description: "Monitor performance and adjust strategies on the fly" },
              { title: "24/7 Expert Support", description: "Get help whenever you need it from our dedicated team" },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle className="h-8 w-8 text-primary dark:text-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-primary dark:text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground dark:text-gray-300">{benefit.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/10 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-primary dark:text-foreground">
              Transform Your Social Media Strategy Today
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8">
              Join thousands of businesses that have already revolutionized their social media presence. Start your free
              trial now and see the difference for yourself.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground dark:text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/questionnaire">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function TestimonialCard({ testimonial, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useSpring({ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 })

  return (
    <motion.div ref={ref} style={mainControls}>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center mb-4">
          <Image
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <div>
            <h4 className="font-semibold text-primary dark:text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground dark:text-gray-300 mb-4">{testimonial.content}</p>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

