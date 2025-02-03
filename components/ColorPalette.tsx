"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { hexToHSL, hslToHex, getContrastColor } from "@/lib/colorUtils"

interface ColorPaletteProps {
  brandColor: string
  secondaryBrandColor: string
  textFontColor: string
  selectedFont: string
  onColorSelect: (color: string) => void
  compact?: boolean
}

const PRIMARY_DELTAS = [
  { name: "Rich Black", deltaH: -5, deltaS: -20, deltaL: -40 },
  { name: "Dark Green", deltaH: -3, deltaS: -15, deltaL: -30 },
  { name: "Bangladesh Green", deltaH: 0, deltaS: -10, deltaL: -20 },
  { name: "Mountain Meadow", deltaH: 0, deltaS: 0, deltaL: 0 },
  { name: "Caribbean Green", deltaH: 5, deltaS: 10, deltaL: 20 },
  { name: "Anti-Flash White", deltaH: 10, deltaS: -80, deltaL: 40 },
]

const SECONDARY_DELTAS = [
  { name: "Pine", deltaH: -5, deltaS: -10, deltaL: -10 },
  { name: "Basil", deltaH: -3, deltaS: -5, deltaL: -5 },
  { name: "Forest", deltaH: 0, deltaS: 0, deltaL: 0 },
  { name: "Frog", deltaH: 5, deltaS: 10, deltaL: 10 },
  { name: "Mint", deltaH: 10, deltaS: 15, deltaL: 15 },
  { name: "Light Mint", deltaH: 15, deltaS: -40, deltaL: 30 },
]

export function ColorPalette({
  brandColor,
  secondaryBrandColor,
  textFontColor,
  selectedFont,
  onColorSelect,
  compact = false,
}: ColorPaletteProps) {
  const safeColor = (color: string) => (color && typeof color === "string" ? color : "#000000")
  const safeBrandColor = safeColor(brandColor)
  const safeSecondaryBrandColor = safeColor(secondaryBrandColor)
  const [selectedPalette, setSelectedPalette] = useState<"primary" | "secondary">("primary")
  const [primaryColors, setPrimaryColors] = useState<{ name: string; hex: string }[]>([])
  const [secondaryColors, setSecondaryColors] = useState<{ name: string; hex: string }[]>([])

  useEffect(() => {
    updatePrimaryPalette()
    updateSecondaryPalette()
  }, [safeBrandColor, safeSecondaryBrandColor]) // Updated dependency array

  const updatePrimaryPalette = () => {
    const baseHSL = hexToHSL(safeBrandColor)
    const newColors = PRIMARY_DELTAS.map((delta) => {
      const newH = (baseHSL.h + delta.deltaH + 360) % 360
      const newS = Math.max(0, Math.min(100, baseHSL.s + delta.deltaS))
      const newL = Math.max(0, Math.min(100, baseHSL.l + delta.deltaL))
      return {
        name: delta.name,
        hex: hslToHex({ h: newH, s: newS, l: newL }),
      }
    })
    setPrimaryColors(newColors)
  }

  const updateSecondaryPalette = () => {
    const baseHSL = hexToHSL(safeSecondaryBrandColor)
    const newColors = SECONDARY_DELTAS.map((delta) => {
      const newH = (baseHSL.h + delta.deltaH + 360) % 360
      const newS = Math.max(0, Math.min(100, baseHSL.s + delta.deltaS))
      const newL = Math.max(0, Math.min(100, baseHSL.l + delta.deltaL))
      return {
        name: delta.name,
        hex: hslToHex({ h: newH, s: newS, l: newL }),
      }
    })
    setSecondaryColors(newColors)
  }

  const colors = selectedPalette === "primary" ? primaryColors : secondaryColors
  const typographyColors =
    selectedPalette === "primary"
      ? { aa: primaryColors[2]?.hex, ff: primaryColors[0]?.hex, xx: primaryColors[4]?.hex }
      : { aa: secondaryColors[2]?.hex, ff: secondaryColors[0]?.hex, xx: secondaryColors[4]?.hex }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-${compact ? "3" : "6"}`}
    >
      <h4 className={`text-${compact ? "base" : "lg"} font-semibold text-primary`}>
        Branding & Design Guidelines Preview:
      </h4>

      <RadioGroup
        defaultValue="primary"
        value={selectedPalette}
        onValueChange={(value) => setSelectedPalette(value as "primary" | "secondary")}
        className="flex space-x-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
          <RadioGroupItem value="primary" id="primary" />
          <Label htmlFor="primary">Primary Colors</Label>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
          <RadioGroupItem value="secondary" id="secondary" />
          <Label htmlFor="secondary">Secondary Colors</Label>
        </motion.div>
      </RadioGroup>

      <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
        <CardContent className={`p-${compact ? "3" : "6"}`}>
          {/* Typography Grid */}
          <motion.div
            className={`grid grid-cols-3 gap-${compact ? "2" : "4"} mb-${compact ? "3" : "6"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { letter: "Aa", style: typographyColors.aa, label: "Axiforma Regular" },
              { letter: "Ff", style: typographyColors.ff, label: "Axiforma Medium" },
              { letter: "Xx", style: typographyColors.xx, label: "Axiforma Semi Bold" },
            ].map((item, index) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{
                  backgroundColor: item.style,
                  color: getContrastColor(item.style),
                  fontFamily: selectedFont,
                }}
              >
                <h1 className="text-4xl mb-2">{item.letter}</h1>
                <p className="text-xs leading-relaxed opacity-90">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  1234567890!@#$%^&*
                </p>
                <h3 className="text-sm mt-2 opacity-80">{item.label}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Color Grid */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className={`text-${compact ? "lg" : "xl"} font-semibold mb-${compact ? "2" : "4"} text-primary`}>
              {selectedPalette === "primary" ? "Primary Colors" : "Secondary Colors"}
            </h3>
            <div className={`grid grid-cols-3 md:grid-cols-6 gap-${compact ? "2" : "4"}`}>
              {colors.map((color, index) => (
                <motion.div
                  key={color.hex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: color.hex,
                    color: getContrastColor(color.hex),
                    fontFamily: selectedFont,
                  }}
                  onClick={() => onColorSelect(color.hex)}
                  tabIndex={0}
                  role="button"
                >
                  <h4 className="text-sm font-medium mb-1">{color.name}</h4>
                  <p className="text-xs opacity-90">{color.hex}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

