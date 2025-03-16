import type { Metadata } from "next"

// This file contains reusable metadata configurations
// that can be imported in layout.tsx or page.tsx files

export const siteConfig = {
    name: "Voxploit",
    description:
        "An interactive, AI-powered platform designed to sharpen your red-teaming and prompt-engineering skills through dynamic chatbot and voicebot challenges.",
    url: "https://voxploit.com",
}

export function createMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
    path = "",
    openGraphImage = "/og-image.png",
}: {
    title?: string
    description?: string
    path?: string
    openGraphImage?: string
}): Metadata {
    const url = `${siteConfig.url}${path}`

    return {
        title: {
            default: title,
            template: `%s | ${siteConfig.name}`,
        },
        description,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url,
            title,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: openGraphImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [openGraphImage],
            creator: "@voxploit",
        },
        robots: {
            index: true,
            follow: true,
        },
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon-16x16.png",
            apple: "/apple-touch-icon.png",
        },
    }
}

