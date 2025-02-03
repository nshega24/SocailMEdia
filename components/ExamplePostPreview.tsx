import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Facebook, Heart, MessageCircle, Share2 } from "lucide-react"
import { getContrastColor } from "@/lib/colorUtils"
import Image from "next/image"

interface ExamplePostPreviewProps {
  brandColor: string
  textFontColor: string
  selectedFont: string
  selectedPaletteColor: string
  logoUrl?: string
}

const socialMediaPlatforms = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "#0A66C2",
    content:
      "Revolutionize your social media management with cutting-edge automation solutions. #SocialMediaAutomation #DigitalGrowth",
    interactions: { likes: 142, comments: 28, shares: 56 },
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    content:
      "Unlock the power of AI-driven social media strategies. Transform your online presence today! 🚀 #SocialMediaMarketing",
    interactions: { likes: 328, comments: 47, shares: 89 },
  },
]

const MotionCard = motion(Card)

export function ExamplePostPreview({
  brandColor,
  textFontColor,
  selectedFont,
  selectedPaletteColor,
  logoUrl,
}: ExamplePostPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-2 pb-4 mb-4 border-b"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
            Social Media Preview
          </h4>
          <div className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-primary to-brand text-white rounded-full shadow-md">
            Live Demo
          </div>
        </div>
        <p className="text-muted-foreground">
          Experience the power of our social media management tools across platforms.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <AnimatePresence>
          {socialMediaPlatforms.map((platform, index) => (
            <MotionCard
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/10 group"
              style={{ fontFamily: selectedFont }}
            >
              <CardHeader className="p-4 flex items-center space-x-3 border-b" style={{ borderColor: platform.color }}>
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {logoUrl ? (
                    <Image
                      src={logoUrl || "/placeholder.svg"}
                      alt="Brand Logo"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400">Logo</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <platform.icon className="w-4 h-4 mr-1" style={{ color: platform.color }} />
                    <span>{platform.name}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent
                className="p-4 space-y-3 relative"
                style={{
                  backgroundColor: selectedPaletteColor,
                  color: getContrastColor(selectedPaletteColor),
                }}
              >
                <motion.div
                  className="bg-white rounded-lg overflow-hidden aspect-video relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {logoUrl ? (
                    <Image
                      src={logoUrl || "/placeholder.svg"}
                      alt="Post Image"
                      layout="fill"
                      objectFit="contain"
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-gray-500 font-semibold text-lg">Your Content Here</span>
                    </div>
                  )}
                </motion.div>
                <p className="text-sm leading-relaxed font-medium">{platform.content}</p>
                <div className="flex flex-wrap gap-1">
                  {platform.content.match(/#\w+/g)?.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ backgroundColor: platform.color, color: "#FFFFFF" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center border-t">
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 text-sm"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{platform.interactions.likes}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 text-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{platform.interactions.comments}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 text-sm"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>{platform.interactions.shares}</span>
                  </motion.button>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    Boost Post
                  </Button>
                </motion.div>
              </CardFooter>
            </MotionCard>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

