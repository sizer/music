import { availableScales, getFingerBoard, getScale, musicKeys } from "../_lib/tones";
import React from "react";
import { FingerBoard } from "./FingerBoard";
import { ScaleSelector } from "./ScaleSelector";

export function generateStaticParams() {
    const scaleNames = musicKeys.flatMap(key =>
        availableScales.flatMap(scaleSet =>
            scaleSet.filter(v => v).map(scale =>
                `${key} ${scale}`.replaceAll(" ", "_")
            )
        )
    );
    return scaleNames.map(scaleName => ({ scaleName }));
}

export default function Page({ params }: { params: { scaleName: string } }) {
    const { scaleName: scaleNameParam } = params;
    const scaleName = scaleNameParam.replaceAll(/_/g, " ");
    const scale = getScale(scaleName.split(" ")[0], scaleName.split(" ").slice(1).join(" "));
    const fingerBoard = getFingerBoard();

    return (
        <>
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                }}>

                <h1
                    style={{
                        margin: 0,
                        padding: '1rem'
                    }}
                >{scaleName}</h1>

                <div
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <FingerBoard scale={scale} tuning={fingerBoard} />
                </div>

                <div style={{
                    overflowX: "scroll",
                    padding: "1rem",
                }}>
                    <ScaleSelector />
                </div>
            </div>
        </>
    );
}
