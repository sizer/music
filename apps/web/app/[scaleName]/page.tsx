import { getFingerBoard, getScale } from "../_lib/tones";
import React from "react";
import { FingerBoard } from "./FingerBoard";
import { ScaleSelector } from "./ScaleSelector";

export default function Page({ params }: { params: { scaleName: string } }) {
    const { scaleName: scaleNameParam } = params;
    const scaleName = decodeURIComponent(scaleNameParam);
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
                    alignItems: "center",
                }}>

                <h1>{scaleName}</h1>

                <div style={{
                    margin: "1rem 0",
                }}>
                    <FingerBoard scale={scale} tuning={fingerBoard} />
                </div>

                <div style={{
                    margin: "auto 1rem 1rem 1rem",
                    overflowX: "scroll",
                }}>
                    <ScaleSelector />
                </div>
            </div>
        </>
    );
}
