import type React from "react"

const originalPrimaryColors = [
  { name: "Rich Black", hex: "#002F1F" },
  { name: "Dark Green", hex: "#032221" },
  { name: "Bangladesh Green", hex: "#03624C" },
  { name: "Mountain Meadow", hex: "#2CC295" },
  { name: "Caribbean Green", hex: "#00DFB1" },
  { name: "Anti-Flash White", hex: "#F1F7F6" },
]

const originalSecondaryColors = [
  { name: "Pine", hex: "#063028" },
  { name: "Basil", hex: "#08453A" },
  { name: "Forest", hex: "#095544" },
  { name: "Frog", hex: "#17876D" },
  { name: "Mint", hex: "#2F8C8C" },
  { name: "Light Mint", hex: "#A7E3E3" },
]

function lightenDarkenColor(col: string, amt: number): string {
  let usePound = false
  if (col[0] === "#") {
    col = col.slice(1)
    usePound = true
  }
  const num = Number.parseInt(col, 16)
  let r = (num >> 16) + amt
  r = Math.max(Math.min(255, r), 0)
  let g = ((num >> 8) & 0x00ff) + amt
  g = Math.max(Math.min(255, g), 0)
  let b = (num & 0x0000ff) + amt
  b = Math.max(Math.min(255, b), 0)
  return (
    (usePound ? "#" : "") +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  )
}

function getContrastColor(hexcolor: string): string {
  if (hexcolor[0] === "#") hexcolor = hexcolor.slice(1)
  const r = Number.parseInt(hexcolor.substr(0, 2), 16)
  const g = Number.parseInt(hexcolor.substr(2, 2), 16)
  const b = Number.parseInt(hexcolor.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? "#000000" : "#FFFFFF"
}

function isContrastSufficient(bgColor: string, textColor: string): boolean {
  if (bgColor[0] == "#") bgColor = bgColor.slice(1)
  if (textColor[0] == "#") textColor = textColor.slice(1)
  const r1 = Number.parseInt(bgColor.substr(0, 2), 16)
  const g1 = Number.parseInt(bgColor.substr(2, 2), 16)
  const b1 = Number.parseInt(bgColor.substr(4, 2), 16)
  const r2 = Number.parseInt(textColor.substr(0, 2), 16)
  const g2 = Number.parseInt(textColor.substr(2, 2), 16)
  const b2 = Number.parseInt(textColor.substr(4, 2), 16)
  const brightness1 = (r1 * 299 + g1 * 587 + b1 * 114) / 1000
  const brightness2 = (r2 * 299 + g2 * 587 + b2 * 114) / 1000
  return Math.abs(brightness1 - brightness2) > 125
}

export function updatePreview(
  brandColor: string,
  secondaryBrandColor: string,
  textFontColor: string,
  selectedFont: string,
) {
  const fontPreview = document.getElementById("fontPreview")
  if (fontPreview) {
    fontPreview.style.fontFamily = selectedFont
    fontPreview.style.color = textFontColor
  }

  const examplePost = document.getElementById("examplePostPreview")
  if (examplePost) {
    examplePost.style.fontFamily = selectedFont
    const headerText = examplePost.querySelector("#exampleHeaderText")
    if (headerText instanceof HTMLElement) {
      headerText.style.color = brandColor
    }
    const cardHeader = examplePost.querySelector(".card-header")
    if (cardHeader instanceof HTMLElement) {
      cardHeader.style.borderBottomColor = brandColor
    }
    const cardBody = examplePost.querySelector(".card-body")
    if (cardBody instanceof HTMLElement) {
      cardBody.style.color = textFontColor
    }
  }

  const brandingContainer = document.querySelector(".branding-guidelines")
  if (brandingContainer instanceof HTMLElement) {
    brandingContainer.style.fontFamily = selectedFont
    brandingContainer.style.color = textFontColor
    const colorTitles = brandingContainer.querySelectorAll(".color-title")
    colorTitles.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.color = brandColor
      }
    })
  }

  document.querySelectorAll(".branding-guidelines .font-box h1").forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.color = textFontColor
    }
  })
  document.querySelectorAll(".branding-guidelines .font-box p").forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.color = textFontColor
    }
  })
  document.querySelectorAll(".example-card .card-body p").forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.color = textFontColor
    }
  })
}

export function updateColorPalettes() {
  const userTextColor = (document.getElementById("textFontColor") as HTMLInputElement)?.value || "#000000"
  const brandColorInput = document.getElementById("brandColor") as HTMLInputElement
  const selectedPrimary = brandColorInput?.value || "#008000"
  const defaultPrimary = brandColorInput?.defaultValue || "#008000"

  let primaryPalette
  if (selectedPrimary === defaultPrimary) {
    primaryPalette = originalPrimaryColors
  } else {
    const primaryOffsets = [0, -20, -40, 20, 40, 60]
    primaryPalette = primaryOffsets.map((offset, index) => ({
      name: originalPrimaryColors[index].name,
      hex: lightenDarkenColor(selectedPrimary, offset),
    }))
  }

  const primaryContainer = document.querySelector("#primaryColors .color-grid")
  if (primaryContainer) {
    primaryContainer.innerHTML = ""
    primaryPalette.forEach((color) => {
      const computedContrast = getContrastColor(color.hex)
      const finalTextColor = isContrastSufficient(color.hex, userTextColor) ? userTextColor : computedContrast
      const box = document.createElement("div")
      box.classList.add("color-box")
      box.style.backgroundColor = color.hex
      box.style.color = finalTextColor
      box.style.cursor = "pointer"
      box.innerHTML = `<h4>${color.name}</h4><p>HEX: ${color.hex.toUpperCase()}</p>`
      box.onclick = () => {
        updateExamplePreviewColor(color.hex, finalTextColor)
      }
      primaryContainer.appendChild(box)
    })
  }

  const secondaryColorInput = document.getElementById("secondaryBrandColor") as HTMLInputElement
  const selectedSecondary = secondaryColorInput?.value || "#063028"
  const defaultSecondary = secondaryColorInput?.defaultValue || "#063028"

  let secondaryPalette
  if (selectedSecondary === defaultSecondary) {
    secondaryPalette = originalSecondaryColors
  } else {
    const secondaryOffsets = [0, -10, -20, 10, 20, 30]
    secondaryPalette = secondaryOffsets.map((offset, index) => ({
      name: originalSecondaryColors[index].name,
      hex: lightenDarkenColor(selectedSecondary, offset),
    }))
  }

  const secondaryContainer = document.querySelector("#secondaryColors .color-grid")
  if (secondaryContainer) {
    secondaryContainer.innerHTML = ""
    secondaryPalette.forEach((color) => {
      const computedContrast = getContrastColor(color.hex)
      const finalTextColor = isContrastSufficient(color.hex, userTextColor) ? userTextColor : computedContrast
      const box = document.createElement("div")
      box.classList.add("color-box")
      box.style.backgroundColor = color.hex
      box.style.color = finalTextColor
      box.style.cursor = "pointer"
      box.innerHTML = `<h4>${color.name}</h4><p>HEX: ${color.hex.toUpperCase()}</p>`
      box.onclick = () => {
        updateExamplePreviewColor(color.hex, finalTextColor)
      }
      secondaryContainer.appendChild(box)
    })
  }
}

function updateExamplePreviewColor(bgColor: string, textColor: string) {
  const examplePost = document.getElementById("examplePostPreview")
  if (examplePost) {
    examplePost.style.backgroundColor = bgColor
    const cardBody = examplePost.querySelector(".card-body")
    if (cardBody instanceof HTMLElement) {
      cardBody.style.color = textColor
    }
    const headerText = document.getElementById("exampleHeaderText")
    if (headerText) {
      headerText.style.color = textColor
    }
  }
}

export function updateTypographyColors() {
  const selected =
    (document.querySelector('input[name="colorSelection"]:checked') as HTMLInputElement)?.value || "primary"
  const typographyAa = document.getElementById("typographyAa")
  const typographyFf = document.getElementById("typographyFf")
  const typographyXx = document.getElementById("typographyXx")

  if (selected === "primary") {
    if (typographyAa instanceof HTMLElement) {
      typographyAa.style.backgroundColor = "#03624C"
      typographyAa.style.color = getContrastColor("#03624C")
    }
    if (typographyFf instanceof HTMLElement) {
      typographyFf.style.backgroundColor = "#002F1F"
      typographyFf.style.color = getContrastColor("#002F1F")
    }
    if (typographyXx instanceof HTMLElement) {
      typographyXx.style.backgroundColor = "#00DFB1"
      typographyXx.style.color = getContrastColor("#00DFB1")
    }
  } else {
    if (typographyAa instanceof HTMLElement) {
      typographyAa.style.backgroundColor = "#095544"
      typographyAa.style.color = getContrastColor("#095544")
    }
    if (typographyFf instanceof HTMLElement) {
      typographyFf.style.backgroundColor = "#063028"
      typographyFf.style.color = getContrastColor("#063028")
    }
    if (typographyXx instanceof HTMLElement) {
      typographyXx.style.backgroundColor = "#2F8C8C"
      typographyXx.style.color = getContrastColor("#2F8C8C")
    }
  }
}

export function toggleColorSection(selection: string) {
  const primary = document.getElementById("primaryColors")
  const secondary = document.getElementById("secondaryColors")
  if (selection === "primary") {
    if (primary) primary.style.display = "block"
    if (secondary) secondary.style.display = "none"
  } else {
    if (primary) primary.style.display = "none"
    if (secondary) secondary.style.display = "block"
  }
  updateTypographyColors()
}

export function previewLogo(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0]
  const logoPreviewContainer = document.getElementById("logoPreviewContainer")
  const exampleImageContainer = document.getElementById("exampleImageContainer")
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (logoPreviewContainer) {
        logoPreviewContainer.innerHTML = `<img src="${e.target?.result}" alt="Logo Preview">`
      }
      if (exampleImageContainer) {
        exampleImageContainer.innerHTML = `<img src="${e.target?.result}" alt="Example Post Logo">`
      }
    }
    reader.readAsDataURL(file)
  } else {
    if (logoPreviewContainer) {
      logoPreviewContainer.innerHTML = "No logo uploaded."
    }
    if (exampleImageContainer) {
      exampleImageContainer.innerHTML = "Size: 1200 x 627"
    }
  }
}

