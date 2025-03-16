import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | Voxploit",
    description: "Privacy Policy for Voxploit - AI-powered red-teaming platform",
}

export default function PrivacyPage() {
    return (
        <div className="container max-w-4xl py-12">
            <div className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground">
                        Your privacy is important to Voxploit. This Privacy Policy explains how we handle user data.
                    </p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Information Collection and Use</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>
                            Voxploit stores usernames, user-generated transcripts from chatbot interactions, and score data to provide
                            leaderboards and analytics.
                        </li>
                        <li>
                            Personal identifiable information (PII) beyond usernames is managed and stored internally by Clerk and is
                            not publicly accessible or stored in our public databases.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>We implement industry-standard security measures to protect stored user data.</li>
                        <li>Despite these efforts, no electronic transmission or storage method is completely secure.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Third-party Services</h2>
                    <p className="text-muted-foreground">
                        Clerk manages user authentication and stores personal information internally. Please review Clerk&apos;s
                        privacy policies separately.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Analytics and Leaderboards</h2>
                    <p className="text-muted-foreground">
                        Voxploit uses user data (username, scores, transcripts) to generate leaderboards and performance analytics.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">User Rights</h2>
                    <p className="text-muted-foreground">
                        Users may request deletion of stored transcripts and scores by contacting our support.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Cookies and Tracking</h2>
                    <p className="text-muted-foreground">
                        Voxploit may use cookies to enhance user experience and collect usage analytics.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Children&apos;s Privacy</h2>
                    <p className="text-muted-foreground">
                        Voxploit does not knowingly collect personal information from children under 13.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Changes to this Privacy Policy</h2>
                    <p className="text-muted-foreground">
                        Voxploit may update this Privacy Policy periodically. Users will be notified of significant changes.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
                    <p className="text-muted-foreground">
                        If you have questions about our Privacy Policy or data handling practices, please contact us at{" "}
                        <a href="mailto:billzhangsc@gmail.com" className="text-primary hover:underline">
                            billzhangsc@gmail.com
                        </a>
                        .
                    </p>
                </section>
            </div>
        </div>
    )
}

