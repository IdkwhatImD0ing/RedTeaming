'use client'
import React, { createContext, useState, useContext } from "react";

type LevelContextType = {
    level: string;
    setLevel: (level: string) => void;
};

const LevelContext = createContext<LevelContextType>({
    level: "level_one",
    setLevel: () => { },
});

export function LevelProvider({ children }: { children: React.ReactNode }) {
    const [level, setLevel] = useState("level_one");
    return (
        <LevelContext.Provider value={{ level, setLevel }}>
            {children}
        </LevelContext.Provider>
    );
}

export function useLevel() {
    return useContext(LevelContext);
}
