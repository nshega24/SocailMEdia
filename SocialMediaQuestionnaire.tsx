"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import styles from "./SocialMediaQuestionnaire.module.css"
import {
  updatePreview,
  toggleColorSection,
  previewLogo,
  updateColorPalettes,
  updateTypographyColors,
  getContrastColor,
} from "./questionnaireUtils"

export default function SocialMediaQuestionnaire() {
  const [brandColor, setBrandColor] = useState("#008000")
  const [secondaryBrandColor, setSecondaryBrandColor] = useState("#063028")
  const [textFontColor, setTextFontColor] = useState("#000000")
  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")

  useEffect(() => {
    updatePreview(brandColor, secondaryBrandColor, textFontColor, selectedFont)
    updateColorPalettes()
    updateTypographyColors()
  }, [brandColor, secondaryBrandColor, textFontColor, selectedFont])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Social Media Management Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {/* Section 1: Account and Platform Details */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>1. Account and Platform Details</legend>
          <Card className={styles.section}>
            <CardContent>
              <div className={styles.formGroup}>
                <Label htmlFor="existingAccounts">Do you have existing social media accounts?</Label>
                <Select>
                  <SelectTrigger id="existingAccounts">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="accountDetails">If yes, please provide the account names/handles:</Label>
                <Textarea id="accountDetails" placeholder="e.g., LinkedIn: your-company, Facebook: your-company" />
              </div>

              <div className={styles.formGroup}>
                <Label>Which platforms do you need new accounts created for?</Label>
                <div className={styles.checkboxGroup}>
                  {["LinkedIn", "Facebook", "Instagram", "X"].map((platform) => (
                    <div key={platform} className={styles.checkboxItem}>
                      <Checkbox id={`platform-${platform}`} />
                      <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="platformPriority">Which platform is your highest priority for engagement?</Label>
                <Input id="platformPriority" placeholder="e.g., Facebook" />
              </div>
            </CardContent>
          </Card>
        </fieldset>

        {/* Section 2: Branding and Design Guidelines */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>2. Branding and Design Guidelines</legend>
          <div className={styles.brandingGrid}>
            {/* Left Column: Branding Inputs */}
            <div className={styles.brandingInputs}>
              <div className={styles.formGroup}>
                <Label htmlFor="brandIdentity">Key elements of your brand identity:</Label>
                <Textarea id="brandIdentity" placeholder="Enter your brand identity details here." />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="brandStyle">Do you have a brand style guide?</Label>
                <Textarea id="brandStyle" placeholder="Enter your brand style details here." />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="brandLogo">Upload your Brand Logo:</Label>
                <Input type="file" id="brandLogo" accept="image/*" onChange={(e) => previewLogo(e)} />
                <div id="logoPreviewContainer" className={styles.logoPreviewContainer}>
                  No logo uploaded.
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="brandImages">Upload Additional Brand Images:</Label>
                <Input type="file" id="brandImages" accept="image/*" multiple />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="brandColor">Select your Primary Brand Color:</Label>
                <Input
                  type="color"
                  id="brandColor"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="secondaryBrandColor">Select your Secondary Brand Color:</Label>
                <Input
                  type="color"
                  id="secondaryBrandColor"
                  value={secondaryBrandColor}
                  onChange={(e) => setSecondaryBrandColor(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="fontSelection">Select your preferred Font:</Label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger id="fontSelection">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                    <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                    <SelectItem value="'Georgia', serif">Georgia</SelectItem>
                    <SelectItem value="'Verdana', sans-serif">Verdana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="textFontColor">Select your Text Font Color:</Label>
                <Input
                  type="color"
                  id="textFontColor"
                  value={textFontColor}
                  onChange={(e) => setTextFontColor(e.target.value)}
                />
              </div>

              <div className={styles.previewContainer}>
                <h4>Font Preview:</h4>
                <div id="fontPreview" className={styles.fontPreview}>
                  This is an example preview.
                </div>
              </div>
            </div>
            {/* Right Column: Example Post Preview Card */}
            <div className={styles.exampleCardContainer}>
              <h4>Example Post Preview:</h4>
              <Card id="examplePostPreview" className={styles.exampleCard}>
                <div className={styles.cardHeader}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span id="exampleHeaderText">LinkedIn Example</span>
                </div>
                <div className={styles.cardBody}>
                  <div id="exampleImageContainer" className={styles.imageContainer}>
                    Size: 1200 x 627
                  </div>
                  <h4>Empowering Businesses with Smart Automation</h4>
                  <p>
                    Your revolutionizing social media management with cutting-edge automation solutions. Our AI-powered
                    tools help brands grow, engage, and optimize their online presence effortlessly. From content
                    scheduling to advanced analytics, we streamline your digital strategy for maximum impact. Join us in
                    transforming the way businesses connect and thrive online. #SocialMediaAutomation #DigitalGrowth
                    #AIpoweredMarketing
                  </p>
                </div>
              </Card>
            </div>
          </div>
          {/* Branding & Design Guidelines Preview */}
          <div className={styles.brandingPreview}>
            <h4>Branding &amp; Design Guidelines Preview:</h4>
            <RadioGroup defaultValue="primary" onValueChange={toggleColorSection}>
              <div className={styles.radioGroup}>
                <RadioGroupItem value="primary" id="primary" />
                <Label htmlFor="primary">Primary Colors</Label>
              </div>
              <div className={styles.radioGroup}>
                <RadioGroupItem value="secondary" id="secondary" />
                <Label htmlFor="secondary">Secondary Colors</Label>
              </div>
            </RadioGroup>
            <Card>
              <CardContent className={styles.brandingGuidelines}>
                <div className={styles.typographyGrid}>
                  <div
                    id="typographyAa"
                    className={styles.fontBox}
                    style={{ backgroundColor: "#03624C", color: "#FFFFFF" }}
                  >
                    <h1>Aa</h1>
                    <p>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      <br />
                      abcdefghijklmnopqrstuvwxyz
                      <br />
                      1234567890!@#$%^&*
                    </p>
                    <h3>Axiforma Regular</h3>
                  </div>
                  <div
                    id="typographyFf"
                    className={styles.fontBox}
                    style={{ backgroundColor: "#002F1F", color: "#FFFFFF" }}
                  >
                    <h1>Ff</h1>
                    <p>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      <br />
                      abcdefghijklmnopqrstuvwxyz
                      <br />
                      1234567890!@#$%^&*
                    </p>
                    <h3>Axiforma Medium</h3>
                  </div>
                  <div
                    id="typographyXx"
                    className={styles.fontBox}
                    style={{ backgroundColor: "#00DFB1", color: "#000000" }}
                  >
                    <h1>Xx</h1>
                    <p>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      <br />
                      abcdefghijklmnopqrstuvwxyz
                      <br />
                      1234567890!@#$%^&*
                    </p>
                    <h3>Axiforma Semi Bold</h3>
                  </div>
                </div>
                <div id="primaryColors" className={styles.colorsContainer}>
                  <div className={styles.colorTitle}>Primary Colors</div>
                  <div className={styles.colorGrid}>
                    {[
                      { name: "Rich Black", hex: "#002F1F" },
                      { name: "Dark Green", hex: "#032221" },
                      { name: "Bangladesh Green", hex: "#03624C" },
                      { name: "Mountain Meadow", hex: "#2CC295" },
                      { name: "Caribbean Green", hex: "#00DFB1" },
                      { name: "Anti-Flash White", hex: "#F1F7F6" },
                    ].map((color) => (
                      <div
                        key={color.hex}
                        className={styles.colorBox}
                        style={{ backgroundColor: color.hex, color: getContrastColor(color.hex) }}
                      >
                        <h4>{color.name}</h4>
                        <p>{color.hex.toUpperCase()}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div id="secondaryColors" className={`${styles.colorsContainer} ${styles.secondaryColors}`}>
                  <div className={styles.colorTitle}>Secondary Colors</div>
                  <div className={styles.colorGrid}>
                    {[
                      { name: "Pine", hex: "#063028" },
                      { name: "Basil", hex: "#08453A" },
                      { name: "Forest", hex: "#095544" },
                      { name: "Frog", hex: "#17876D" },
                      { name: "Mint", hex: "#2F8C8C" },
                      { name: "Light Mint", hex: "#A7E3E3" },
                    ].map((color) => (
                      <div
                        key={color.hex}
                        className={styles.colorBox}
                        style={{ backgroundColor: color.hex, color: getContrastColor(color.hex) }}
                      >
                        <h4>{color.name}</h4>
                        <p>{color.hex.toUpperCase()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </fieldset>

        {/* Section 3: Content Strategy and Posting Schedule */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>3. Content Strategy and Posting Schedule</legend>
          <Card className={styles.section}>
            <CardContent>
              <div className={styles.formGroup}>
                <Label htmlFor="topics">Provide topics for a 3-month plan (4 posts per month):</Label>
                <Textarea id="topics" placeholder="Example: Month 1: - Post 1: Topic... - Post 2: Topic..." />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="postingFrequency">Posting Frequency:</Label>
                <Input id="postingFrequency" placeholder="e.g., 4 posts per month" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="postingDays">Preferred Posting Day &amp; Time:</Label>
                <Input type="datetime-local" id="postingDays" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="postingTimes">Preferred Posting Times:</Label>
                <Input id="postingTimes" placeholder="e.g., Monday at 10:00 AM, Wednesday at 2:00 PM" />
              </div>
              <div className={styles.formGroup}>
                <Label>Content Mix (select all that apply):</Label>
                <div className={styles.checkboxGroup}>
                  {[
                    "Educational Posts",
                    "Case Studies",
                    "Success Stories",
                    "Behind-the-Scenes",
                    "User-Generated Content",
                  ].map((content) => (
                    <div key={content} className={styles.checkboxItem}>
                      <Checkbox id={`content-${content}`} />
                      <Label htmlFor={`content-${content}`}>{content}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="targetAudience">Describe your primary target audience:</Label>
                <Textarea id="targetAudience" placeholder="Demographics, interests, location" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="toneOfVoice">Preferred Tone of Voice:</Label>
                <Input id="toneOfVoice" placeholder="e.g., Professional and Inspirational" />
              </div>
            </CardContent>
          </Card>
        </fieldset>

        {/* Section 4: Engagement and Interaction Guidelines */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>4. Engagement and Interaction Guidelines</legend>
          <Card className={styles.section}>
            <CardContent>
              <div className={styles.formGroup}>
                <Label htmlFor="approvalProcess">Who is the primary contact for content approval?</Label>
                <Input id="approvalProcess" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="approvalTurnaround">Expected turnaround time for content approval:</Label>
                <Input id="approvalTurnaround" placeholder="e.g., 24-48 hours" />
              </div>
            </CardContent>
          </Card>
        </fieldset>

        {/* Section 5: Metrics and Performance Tracking */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>5. Metrics and Performance Tracking</legend>
          <Card className={styles.section}>
            <CardContent>
              <div className={styles.formGroup}>
                <Label htmlFor="socialMediaGoals">What are your primary goals for these social media campaigns?</Label>
                <Textarea id="socialMediaGoals" placeholder="e.g., brand awareness, lead generation, engagement" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="KPIs">Which key metrics are most important to you?</Label>
                <Input id="KPIs" placeholder="e.g., impressions, reach, engagement rate, conversions" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="reportingFrequency">Preferred Reporting Frequency:</Label>
                <Select>
                  <SelectTrigger id="reportingFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </fieldset>

        {/* Section 6: Additional Considerations */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>6. Additional Considerations</legend>
          <Card className={styles.section}>
            <CardContent>
              <div className={styles.formGroup}>
                <Label htmlFor="campaignIntegration">
                  Are there any ongoing or upcoming campaigns to integrate with the social media strategy?
                </Label>
                <Textarea id="campaignIntegration" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="budget">
                  Do you have a dedicated budget for social media advertising or boosted posts?
                </Label>
                <Select>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="internalResources">Do you have internal resources we will be coordinating with?</Label>
                <Textarea id="internalResources" placeholder="e.g., graphic designers, copywriters" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="internalResourcesAttachment">Upload Attachment for Internal Resources:</Label>
                <Input type="file" id="internalResourcesAttachment" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="compliance">
                  Are there any legal or regulatory compliance issues we need to consider?
                </Label>
                <Textarea id="compliance" />
              </div>
            </CardContent>
          </Card>
        </fieldset>

        <Button type="submit">Submit Questionnaire</Button>
      </form>
    </div>
  )
}

