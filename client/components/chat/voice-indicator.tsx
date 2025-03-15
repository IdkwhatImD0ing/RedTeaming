"use client"

export function VoiceIndicator() {
    return (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full bg-card border border-border/40 rounded-t-lg px-3 py-1 flex items-center gap-2">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-1 bg-primary animate-sound-wave"
                        style={{
                            height: `${Math.random() * 12 + 4}px`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    ></div>
                ))}
            </div>
            <span className="text-xs font-medium">Listening...</span>
        </div>
    )
}

