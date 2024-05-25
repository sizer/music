"use client";

import { Button, Colors } from "@sizer/musicui";
import { musicKeys } from "../_lib/tones";
import { useState } from "react";
import { useRouter } from "next/navigation";

const availableScales = [
    ["Major",
        undefined,
        undefined,
        "Major Pentatonic",
        undefined,
        undefined,
        undefined,
    ],
    ["Minor",
        "Minor Pentatonic",
        "Melodic Minor",
        "Harmonic Minor",
        undefined,
        undefined,
        undefined,
    ],
    ["Ionian",
        "Dorian",
        "Phrygian",
        "Lydian",
        "Mixolydian",
        "Aeolian",
        "Locrian"],
]

export const ScaleSelector = () => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const router = useRouter();

    return (
        <div style={{
            position: "relative"
        }}>
            {
                selectedKey ? (
                    <div
                        style={{
                            backgroundColor: Colors.Green600,
                            color: Colors.White,
                            fontWeight: "bold",
                            padding: '1rem',
                            display: "grid",
                            gridAutoFlow: "column",
                            gridTemplateRows: "repeat(7, auto)",
                            gap: '1rem 2rem',
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%'
                        }}
                    >
                        {
                            availableScales.flatMap((scaleSet) =>
                                scaleSet.map((scaleName) => (
                                    scaleName ?
                                        <div
                                            key={scaleName}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => router.push(`${selectedKey} ${scaleName}`)}
                                        >
                                            {selectedKey} {scaleName}
                                        </div>
                                        :
                                        <div />
                                ))
                            )
                        }
                    </div>
                ) : null
            }
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: ".25rem",
            }}>
                {
                    musicKeys.map((keyName) => (
                        <Button
                            key={keyName}
                            onClick={() => selectedKey === keyName ? setSelectedKey(null) : setSelectedKey(keyName)}
                        >{keyName}</Button>
                    ))
                }
            </div>
        </div >
    )
}