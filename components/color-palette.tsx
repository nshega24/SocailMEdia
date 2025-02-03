"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Original color palettes from the code
const PRIMARY_COLORS = [
  { name: "Rich Black", hex: "#002F1F" },
  { name: "Dark Green", hex: "#032221" },
  { name: "Bangladesh Green", hex: "#03624C" },
  { name: "Mountain Meadow", hex: "#2CC295" },
  { name: "Caribbean Green", hex: "#00DFB1" },
  { name: "Anti-Flash White", hex: "#F1F7F6" },
]

const SECONDARY_COLORS = [
  { name: "Pine", hex: "#063028" },
  { name: "Basil", hex: "#08453A" },
  { name: "Forest", hex: "#095544" },
  { name: "Frog", hex: "#17876D" },
  { name: "Mint", hex: "#2F8C8C" },
  { name: "Light Mint", hex: "#A7E3E3" },
]

export function ColorPalette() {
  const [selectedPalette, setSelectedPalette] = useState<"primary" | "secondary">("primary")

  const colors = selectedPalette === "primary" ? PRIMARY_COLORS : SECONDARY_COLORS
  const typographyColors =
    selectedPalette === "primary"
      ? { aa: "#03624C", ff: "#002F1F", xx: "#00DFB1" }
      : { aa: "#095544", ff: "#063028", xx: "#2F8C8C" }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h4 className="text-lg font-semibold mb-3">Branding & Design Guidelines Preview:</h4>

      <RadioGroup
        defaultValue="primary"
        value={selectedPalette}
        onValueChange={(value) => setSelectedPalette(value as "primary" | "secondary")}
        className="flex items-center gap-4 mb-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="primary" id="primary" />
          <Label htmlFor="primary">Primary Colors</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="secondary" id="secondary" />
          <Label htmlFor="secondary">Secondary Colors</Label>
        </div>
      </RadioGroup>

      <Card>
        <CardContent className="p-6">
          {/* Typography Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { letter: "Aa", style: typographyColors.aa, label: "Axiforma Regular" },
              { letter: "Ff", style: typographyColors.ff, label: "Axiforma Medium" },
              { letter: "Xx", style: typographyColors.xx, label: "Axiforma Semi Bold" },
            ].map((item) => (
              <div
                key={item.letter}
                className="bg-background border rounded-lg p-4 text-center"
                style={{ backgroundColor: item.style }}
              >
                <h1 className="text-4xl mb-2 text-white">{item.letter}</h1>
                <p className="text-xs text-white/90 leading-relaxed">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  1234567890!@#$%^&*
                </p>
                <h3 className="text-sm mt-2 text-white/80">{item.label}</h3>
              </div>
            ))}
          </div>

          {/* Color Grid */}
          <div>
            <div className="text-lg font-semibold mb-3">
              {selectedPalette === "primary" ? "Primary Colors" : "Secondary Colors"}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {colors.map((color) => (
                <div
                  key={color.hex}
                  className="rounded-lg p-4 text-center shadow transition-transform hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                >
                  <h4 className="text-sm font-medium mb-1 text-white">{color.name}</h4>
                  <p className="text-xs text-white/90">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

