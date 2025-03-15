import { ModeSelectionCard } from "@/components/mode-selection-card"
import { Mic, MessageSquare } from "lucide-react"

export default function ModeSelectionPage() {
    return (
        <div className="flex flex-col items-center justify-center bg-background p-4 h-full">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        <span className="text-primary">Vox</span>ploit
                    </h1>
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                        Select your preferred mode to begin red-teaming and prompt-engineering challenges
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <ModeSelectionCard
                        title="Chat Mode"
                        description="Text-based challenges to hone your written prompt engineering skills and red-teaming techniques."
                        icon={<MessageSquare className="h-10 w-10" />}
                        href="/text"
                        accentColor="secondary"
                    />
                    <ModeSelectionCard
                        title="Voice Mode"
                        description="Engage with AI through voice interactions, perfect for testing verbal prompt engineering techniques."
                        icon={<Mic className="h-10 w-10" />}
                        href="/voice"
                        accentColor="primary"
                    />
                </div>

                <div className="text-center mt-12 text-sm text-foreground/60">
                    <p>Choose the mode that best suits your testing approach</p>
                </div>
            </div>
        </div>
    )
}
