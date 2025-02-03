import { PageWrapper } from "@/components/PageWrapper"
import { QuestionnaireBanner } from "@/components/QuestionnaireBanner"
import SocialMediaQuestionnaire from "@/components/SocialMediaQuestionnaire"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function QuestionnairePage() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="mb-4">
          <Button variant="outline" asChild>
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
        <QuestionnaireBanner />
        <SocialMediaQuestionnaire />
      </div>
    </PageWrapper>
  )
}

