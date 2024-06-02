"use client"

import { Note, Pcset, note } from "tonal";
import { Scale } from "../_lib/tones";
import { Colors } from "@sizer/musicui";
import { useElementSize } from "../_lib/useElementSize";

interface Props {
    scale: Scale;
    tuning: string[][];
}

const isToneIncluded = (tones: string[]) => Pcset.isNoteIncludedIn(tones)
const dispToneName = (tones: string[]) => (tone: string): string => {
    const scaleTone = tones.find((t) => note(t).height === note(Note.get(tone).pc).height)
    return scaleTone ? Note.simplify(scaleTone) : ''
}

const Background = ({ height }: { height: number }) => <div style={{
    backgroundColor: Colors.Wood300,
    borderLeft: "2px solid #6A6A6A",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: height,
}}>
    {/* Frame of Strings */}
    {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
            style={{
                height: height / 6,
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
            }}
        >
            <hr
                key={i}
                style={{
                    width: "100%",
                    margin: 0
                }}
            />
        </div>
    ))}
</div>

const PositionMarker = ({ fletIndex }: { fletIndex: number }) => <>
    {
        [3, 5, 7, 9, 12, 15].includes(fletIndex) ? (
            <>
                <div
                    style={{
                        backgroundColor: Colors.Black,
                        border: `0.5px solid ${Colors.White}`,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                    }}
                />
            </>
        ) : null
    }
    {
        [12].includes(fletIndex) ? (
            <div
                style={{
                    backgroundColor: Colors.Black,
                    border: `0.5px solid ${Colors.White}`,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                }}
            />
        ) : null
    }
</>

const Flets = ({ numOfFrets, width, height }: { numOfFrets: number, width: number, height: number }) => <div
    style={{
        height,
        display: "flex",
        flexDirection: "row",
        gap: 0,
        position: "absolute",
        top: 0
    }}>
    {/* Frame of flets */}
    {Array.from({ length: numOfFrets }, (_, i) => i).map((_, i) => {
        const fletNum = ++i;
        return (
            <div
                key={fletNum}
                style={{
                    width: Math.floor(width / numOfFrets),
                    boxSizing: "border-box",
                    borderRight: "2px solid #6A6A6A",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <PositionMarker fletIndex={fletNum} />
            </div>
        )
    })}
</div>

const calcFingerBoardSize = (width: number): [number, number] => {
    const oneRem = 16;
    const ratio = .275;
    const height = Math.floor((width - oneRem * 8) * ratio);
    return [height / ratio, height];
}

export const FingerBoard = ({ scale, tuning }: Props & React.HTMLAttributes<HTMLDivElement>) => {
    const { width: elWidth = 0, height = 0, ref } = useElementSize<HTMLDivElement>();
    const [boardWidth, boardHeight] = calcFingerBoardSize(elWidth);

    const numOfFrets = 15;
    const { tones: scaleTones, codeTones } = scale;
    const isRootTone = isToneIncluded([scaleTones[0]]);
    const isScaleTone = isToneIncluded(scaleTones);
    const isCodeTone = isToneIncluded(codeTones);
    const dispByScaleTone = dispToneName(scaleTones);

    return (
        // Container calcs width and height
        <div
            ref={ref}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    position: "relative",
                    height: boardHeight,
                    width: boardWidth
                }}>
                <Background height={boardHeight} />
                <Flets numOfFrets={numOfFrets} width={boardWidth} height={boardHeight} />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        gap: 0,
                        position: "absolute",
                        top: 0,
                        marginLeft: Math.floor(boardWidth / numOfFrets) * -1,
                    }}>
                    {tuning.map((byString, i) => (
                        <div
                            key={i}
                            style={{
                                height: boardHeight / 6,
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                            }}>
                            {
                                byString.map((tone) => {
                                    const diameter = (boardHeight / 6) - 12;
                                    return (<div
                                        key={`${i}-${tone}`}
                                        style={{
                                            width: Math.floor(boardWidth / numOfFrets),
                                            display: "flex",
                                            flexDirection: "column",
                                            flexWrap: "nowrap",
                                            justifyContent: "center",
                                        }}>
                                        {
                                            isScaleTone(tone) ? (
                                                <div
                                                    style={{
                                                        width: diameter,
                                                        height: diameter,
                                                        lineHeight: `${diameter}px`,
                                                        borderRadius: "50%",
                                                        border: isRootTone(tone) ? `2px solid #059E5E` : undefined,
                                                        margin: "0 auto",
                                                        backgroundColor: isCodeTone(tone) ? Colors.Green600 : Colors.White,
                                                        color: isCodeTone(tone) ? Colors.White : Colors.Green300,
                                                        fontSize: diameter - 12,
                                                        textAlign: "center",
                                                    }}>
                                                    {dispByScaleTone(tone)}
                                                </div>
                                            ) : null
                                        }
                                    </div>)
                                })
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
