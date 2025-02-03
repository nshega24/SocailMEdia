interface HSL {
  h: number
  s: number
  l: number
}

export const hexToHSL = (H: string): HSL => {
  // Default to black if input is undefined or invalid
  if (!H || typeof H !== "string") {
    return { h: 0, s: 0, l: 0 }
  }

  // Remove '#' if present
  H = H.replace("#", "")

  let r = 0,
    g = 0,
    b = 0
  if (H.length === 3) {
    r = Number.parseInt(H[0] + H[0], 16)
    g = Number.parseInt(H[1] + H[1], 16)
    b = Number.parseInt(H[2] + H[2], 16)
  } else if (H.length === 6) {
    r = Number.parseInt(H.substring(0, 2), 16)
    g = Number.parseInt(H.substring(2, 4), 16)
    b = Number.parseInt(H.substring(4, 6), 16)
  } else {
    // Invalid hex color, return black
    return { h: 0, s: 0, l: 0 }
  }

  r /= 255
  g /= 255
  b /= 255
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin
  let h = 0,
    s = 0,
    l = 0

  if (delta === 0) h = 0
  else if (cmax === r) h = ((g - b) / delta) % 6
  else if (cmax === g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)
  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { h, s, l }
}

export const hslToHex = ({ h, s, l }: HSL): string => {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export const getContrastColor = (hexcolor: string): string => {
  // Default to black if input is undefined or invalid
  if (!hexcolor || typeof hexcolor !== "string") {
    return "#000000"
  }

  // Remove '#' if present
  hexcolor = hexcolor.replace("#", "")

  // Check if the hexcolor is valid
  if (hexcolor.length !== 6) {
    return "#000000"
  }

  // Convert to RGB
  const r = Number.parseInt(hexcolor.substr(0, 2), 16)
  const g = Number.parseInt(hexcolor.substr(2, 2), 16)
  const b = Number.parseInt(hexcolor.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

