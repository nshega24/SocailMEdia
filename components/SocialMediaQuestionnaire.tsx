"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ColorPalette } from "./ColorPalette"
import { ExamplePostPreview } from "./ExamplePostPreview"
import { updatePreview, previewLogo } from "@/lib/questionnaireUtils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionnaireTabContent } from "./QuestionnaireTabContent"
import { FormProgress } from "./FormProgress"
import { ChevronUp, ChevronDown } from "lucide-react"
import type React from "react"

const steps = [
  {
    id: "account",
    title: "Account Setup",
    description: "Configure your social media accounts and platforms",
    isComplete: false,
  },
  {
    id: "branding",
    title: "Brand Identity",
    description: "Define your visual identity and design guidelines",
    isComplete: false,
  },
  {
    id: "content",
    title: "Content Strategy",
    description: "Plan your content calendar and posting schedule",
    isComplete: false,
  },
  {
    id: "engagement",
    title: "Engagement Rules",
    description: "Set up interaction and approval guidelines",
    isComplete: false,
  },
  {
    id: "metrics",
    title: "Performance Tracking",
    description: "Define success metrics and reporting preferences",
    isComplete: false,
  },
  {
    id: "additional",
    title: "Additional Details",
    description: "Provide any other relevant information",
    isComplete: false,
  },
]

export default function SocialMediaQuestionnaire() {
  const [brandColor, setBrandColor] = useState("#2CC295")
  const [secondaryBrandColor, setSecondaryBrandColor] = useState("#095544")
  const [textFontColor, setTextFontColor] = useState("#333333")
  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedPaletteColor, setSelectedPaletteColor] = useState("#2CC295")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string>("")
  const [currentStep, setCurrentStep] = useState("account")
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    updatePreview(brandColor, secondaryBrandColor, textFontColor, selectedFont)
  }, [brandColor, secondaryBrandColor, textFontColor, selectedFont])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    console.log("Form submitted")
  }

  const handleColorSelect = (color: string) => {
    setSelectedPaletteColor(color)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogoUrl(result)
        previewLogo(event)
      }
      reader.readAsDataURL(file)
    } else {
      setLogoUrl("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Progress Sidebar */}
        <div className="lg:col-span-3">
          <FormProgress currentStep={currentStep} steps={steps} />
        </div>

        {/* Main Form Content */}
        <div className="lg:col-span-9">
          <Card className="relative overflow-hidden bg-white dark:bg-gray-800 shadow-xl">
            <motion.div className="absolute right-4 top-4 z-10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                {showPreview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">{showPreview ? "Hide Preview" : "Show Preview"}</span>
              </Button>
            </motion.div>
            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b dark:border-gray-700"
                >
                  <div className="p-6">
                    <ExamplePostPreview
                      brandColor={brandColor}
                      textFontColor={textFontColor}
                      selectedFont={selectedFont}
                      selectedPaletteColor={selectedPaletteColor}
                      logoUrl={logoUrl}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Existing Tabs and Form Content */}
            <Tabs
              defaultValue="account"
              value={currentStep}
              onValueChange={(value) => setCurrentStep(value)}
              className="w-full"
            >
              <div className="px-6 pt-6">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="branding">Branding</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="additional">Additional</TabsTrigger>
                </TabsList>
              </div>
              <div className="w-full rounded-md border dark:border-gray-700 p-4 mt-4">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <TabsContent value="account">
                    <QuestionnaireTabContent
                      title="Account and Platform Details"
                      description="Tell us about your existing social media presence and which platforms you'd like to focus on."
                    >
                      <div className="space-y-6">
                        <div>
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

                        <div>
                          <Label htmlFor="accountDetails">If yes, please provide the account names/handles:</Label>
                          <Textarea
                            id="accountDetails"
                            placeholder="e.g., LinkedIn: your-company, Facebook: your-company"
                          />
                        </div>

                        <div>
                          <Label>Which platforms do you need new accounts created for?</Label>
                          <div className="flex flex-wrap gap-4 mt-2">
                            {["LinkedIn", "Facebook", "Instagram", "X"].map((platform) => (
                              <div key={platform} className="flex items-center space-x-2">
                                <Checkbox id={`platform-${platform}`} />
                                <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="platformPriority">
                            Which platform is your highest priority for engagement?
                          </Label>
                          <Input id="platformPriority" placeholder="e.g., Facebook" />
                        </div>
                      </div>
                    </QuestionnaireTabContent>
                  </TabsContent>
                  <TabsContent value="branding">
                    <QuestionnaireTabContent
                      title="Branding and Design"
                      description="Define your brand's visual identity and design guidelines."
                    >
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div>
                            <Label htmlFor="brandLogo" className="block mb-2 text-sm font-medium">
                              Logo:
                            </Label>
                            <Input
                              type="file"
                              id="brandLogo"
                              accept="image/*"
                              onChange={handleLogoUpload}
                              className="w-full text-sm"
                            />
                            <div
                              id="logoPreviewContainer"
                              className="mt-2 h-[50px] border border-dashed border-gray-300 dark:border-gray-600 p-1 text-center text-xs text-gray-500 dark:text-gray-400 italic flex items-center justify-center"
                            >
                              No logo
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="primaryBrandColor" className="block mb-2 text-sm font-medium">
                              Primary:
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="color"
                                id="primaryBrandColor"
                                value={brandColor}
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="w-8 h-8 p-0.5 rounded-md"
                              />
                              <Input
                                type="text"
                                value={brandColor}
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="flex-grow text-sm"
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="secondaryBrandColor" className="block mb-2 text-sm font-medium">
                              Secondary:
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="color"
                                id="secondaryBrandColor"
                                value={secondaryBrandColor}
                                onChange={(e) => setSecondaryBrandColor(e.target.value)}
                                className="w-8 h-8 p-0.5 rounded-md"
                              />
                              <Input
                                type="text"
                                value={secondaryBrandColor}
                                onChange={(e) => setSecondaryBrandColor(e.target.value)}
                                className="flex-grow text-sm"
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="fontSelection" className="block mb-2 text-sm font-medium">
                              Font:
                            </Label>
                            <Select value={selectedFont} onValueChange={setSelectedFont}>
                              <SelectTrigger id="fontSelection" className="text-sm">
                                <SelectValue placeholder="Select" />
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
                          <div>
                            <Label htmlFor="textFontColor" className="block mb-2 text-sm font-medium">
                              Text Color:
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="color"
                                id="textFontColor"
                                value={textFontColor}
                                onChange={(e) => setTextFontColor(e.target.value)}
                                className="w-8 h-8 p-0.5 rounded-md"
                              />
                              <Input
                                type="text"
                                value={textFontColor}
                                onChange={(e) => setTextFontColor(e.target.value)}
                                className="flex-grow text-sm"
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                        </div>
                        <ColorPalette
                          brandColor={brandColor}
                          secondaryBrandColor={secondaryBrandColor}
                          textFontColor={textFontColor}
                          selectedFont={selectedFont}
                          onColorSelect={handleColorSelect}
                          compact={true}
                        />
                      </div>
                    </QuestionnaireTabContent>
                  </TabsContent>
                  <TabsContent value="content">
                    <QuestionnaireTabContent
                      title="Content Strategy"
                      description="Plan your content calendar and posting schedule."
                    >
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="topics">Provide topics for a 3-month plan (4 posts per month):</Label>
                          <Textarea id="topics" placeholder="Example: Month 1: - Post 1: Topic... - Post 2: Topic..." />
                        </div>
                        <div>
                          <Label htmlFor="postingFrequency">Posting Frequency:</Label>
                          <Input id="postingFrequency" placeholder="e.g., 4 posts per month" />
                        </div>
                        <div>
                          <Label htmlFor="postingDays">Preferred Posting Day & Time:</Label>
                          <Input type="datetime-local" id="postingDays" />
                        </div>
                        <div>
                          <Label htmlFor="postingTimes">Preferred Posting Times:</Label>
                          <Input id="postingTimes" placeholder="e.g., Monday at 10:00 AM, Wednesday at 2:00 PM" />
                        </div>
                        <div>
                          <Label>Content Mix (select all that apply):</Label>
                          <div className="flex flex-wrap gap-4 mt-2">
                            {[
                              "Educational Posts",
                              "Case Studies",
                              "Success Stories",
                              "Behind-the-Scenes",
                              "User-Generated Content",
                            ].map((content) => (
                              <div key={content} className="flex items-center space-x-2">
                                <Checkbox id={`content-${content}`} />
                                <Label htmlFor={`content-${content}`}>{content}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="targetAudience">Describe your primary target audience:</Label>
                          <Textarea id="targetAudience" placeholder="Demographics, interests, location" />
                        </div>
                        <div>
                          <Label htmlFor="toneOfVoice">Preferred Tone of Voice:</Label>
                          <Input id="toneOfVoice" placeholder="e.g., Professional and Inspirational" />
                        </div>
                      </div>
                    </QuestionnaireTabContent>
                  </TabsContent>
                  <TabsContent value="engagement">
                    <QuestionnaireTabContent
                      title="Engagement Guidelines"
                      description="Set up your content approval process and interaction guidelines."
                    >
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="approvalProcess">Who is the primary contact for content approval?</Label>
                          <Input id="approvalProcess" />
                        </div>
                        <div>
                          <Label htmlFor="approvalTurnaround">Expected turnaround time for content approval:</Label>
                          <Input id="approvalTurnaround" placeholder="e.g., 24-48 hours" />
                        </div>
                      </div>
                    </QuestionnaireTabContent>
                  </TabsContent>
                  <TabsContent value="metrics">
                    <QuestionnaireTabContent
                      title="Performance Metrics"
                      description="Define your success metrics and reporting preferences."
                    >
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="socialMediaGoals">
                            What are your primary goals for these social media campaigns?
                          </Label>
                          <Textarea
                            id="socialMediaGoals"
                            placeholder="e.g., brand awareness, lead generation, engagement"
                          />
                        </div>
                        <div>
                          <Label htmlFor="KPIs">Which key metrics are most important to you?</Label>
                          <Input id="KPIs" placeholder="e.g., impressions, reach, engagement rate, conversions" />
                        </div>
                        <div>
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
                      </div>
                    </QuestionnaireTabContent>
                  </TabsContent>
                  <TabsContent value="additional">
                    <QuestionnaireTabContent
                      title="Additional Information"
                      description="Provide any other relevant details about your social media strategy."
                    >
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="campaignIntegration">
                            Are there any ongoing or upcoming campaigns to integrate with the social media strategy?
                          </Label>
                          <Textarea id="campaignIntegration" />
                        </div>
                        <div>
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
                        <div>
                          <Label htmlFor="internalResources">
                            Do you have internal resources we will be coordinating with?
                          </Label>
                          <Textarea id="internalResources" placeholder="e.g., graphic designers, copywriters" />
                        </div>
                        <div>
                          <Label htmlFor="internalResourcesAttachment">Upload Attachment for Internal Resources:</Label>
                          <Input
                            type="file"
                            id="internalResourcesAttachment"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="compliance">
                            Are there any legal or regulatory compliance issues we need to consider?
                          </Label>
                          <Textarea id="compliance" />
                        </div>
                      </div>
                    </QuestionnaireTabContent>
                  </TabsContent>
                </form>
              </div>
            </Tabs>
          </Card>

          <motion.div
            className="mt-6 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
            }}
          >
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = steps.findIndex((step) => step.id === currentStep)
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id)
                }
              }}
              disabled={currentStep === "account"}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                const currentIndex = steps.findIndex((step) => step.id === currentStep)
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1].id)
                }
              }}
              disabled={currentStep === "additional"}
            >
              Next
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

