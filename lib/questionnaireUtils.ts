import type React from "react"

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
}

export function previewLogo(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0]
  const logoPreviewContainer = document.getElementById("logoPreviewContainer")
  const exampleImageContainer = document.getElementById("exampleImageContainer")
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (logoPreviewContainer) {
        logoPreviewContainer.innerHTML = `<img src="${e.target?.result}" alt="Logo Preview" class="max-w-full max-h-[100px] object-contain">`
      }
      if (exampleImageContainer) {
        exampleImageContainer.innerHTML = `<img src="${e.target?.result}" alt="Example Post Logo" class="w-full h-full object-cover">`
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

