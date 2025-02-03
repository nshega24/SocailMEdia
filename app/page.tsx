import { MainHomeLanding } from "@/components/MainHomeLanding"
import { ThemeProvider } from "@/components/ThemeProvider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <MainHomeLanding />
      </div>
    </ThemeProvider>
  )
}

