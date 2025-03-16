import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service | Voxploit",
    description: "Terms of Service for Voxploit - AI-powered red-teaming platform",
}

export default function TermsPage() {
    return (
        <div className="container max-w-4xl py-12">
            <div className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
                    <p className="text-lg text-muted-foreground">
                        Welcome to Voxploit! By accessing and using Voxploit, you agree to these Terms of Service. Please read them
                        carefully.
                    </p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                        By using Voxploit, you agree to comply with these Terms and our Privacy Policy. If you disagree with any
                        part of these terms, please do not access or use Voxploit.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
                    <p className="text-muted-foreground">
                        Voxploit is an interactive platform designed to improve users&apos; red-teaming and prompt-engineering
                        skills through chatbot and voicebot challenges. You engage with advanced AI scenarios to uncover hidden
                        values.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">3. User Conduct</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Users must not misuse Voxploit by engaging in illegal, harmful, or disruptive activities.</li>
                        <li>Attempts to disrupt or compromise platform integrity will result in termination of access.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">4. User Data</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Voxploit collects and stores username, transcripts, and score data for leaderboard purposes.</li>
                        <li>
                            Personal user information is managed internally through Clerk; Voxploit itself does not directly store
                            identifiable personal information beyond usernames.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property</h2>
                    <p className="text-muted-foreground">
                        All content, including AI scenarios, analytics, and the Voxploit platform itself, is proprietary and
                        protected by copyright.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">6. Changes to Terms</h2>
                    <p className="text-muted-foreground">
                        Voxploit reserves the right to update these terms at any time. Continued use of Voxploit after such updates
                        constitutes your agreement to the new terms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">7. Termination</h2>
                    <p className="text-muted-foreground">
                        We may terminate or suspend your access immediately, without prior notice, for violating these terms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">8. Disclaimer</h2>
                    <p className="text-muted-foreground">
                        Voxploit is provided &quot;as is,&quot; without warranties of any kind, either expressed or implied.
                    </p>
                </section>
            </div>
        </div>
    )
}

