"use client"

import { Note, Pcset, note } from "tonal";
import { Scale } from "../_lib/tones";
import { Colors } from "@sizer/musicui";

interface Props {
    scale: Scale;
    tuning: string[][];
}

const isToneIncluded = (tones: string[]) => Pcset.isNoteIncludedIn(tones)
const dispToneName = (tones: string[]) => (tone: string): string => {
    const scaleTone = tones.find((t) => note(t).height === note(Note.get(tone).pc).height)
    return scaleTone ? Note.simplify(scaleTone) : ''
}

const Background = () => <div style={{
    padding: '.5rem 0',
    backgroundColor: Colors.Wood300,
    borderLeft: "2px solid #6A6A6A",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    gap: "1rem",
}}>
    {/* Frame of Strings */}
    {[1, 2, 3, 4, 5, 6].map((i) => (
        <hr
            key={i}
            style={{
                width: "100%",
                margin: 0
            }}
        />
    ))}
</div>

const PositionMarker = ({ fletIndex }: { fletIndex: number }) => <>
    {
        [3, 5, 7, 9, 12, 15].includes(fletIndex) ? (
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

const Flets = ({ numOfFrets, width }: { numOfFrets: number, width: number }) => <div
    style={{
        height: 108,
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

export const FingerBoard = ({ scale, tuning, ...props }: Props & React.HTMLAttributes<HTMLDivElement>) => {
    const width = props.style?.width ? +props.style?.width : 535;
    const numOfFrets = 15;
    const { tones: scaleTones, codeTones } = scale;
    const isRootTone = isToneIncluded([scaleTones[0]]);
    const isScaleTone = isToneIncluded(scaleTones);
    const isCodeTone = isToneIncluded(codeTones);
    const dispByScaleTone = dispToneName(scaleTones);

    return (
        <div style={{
            position: "relative",
            height: 108,
            width
        }}>
            <Background />
            <Flets numOfFrets={numOfFrets} width={width} />

            {/* Notes */}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    gap: 0,
                    position: "absolute",
                    top: 0,
                    marginLeft: Math.floor(width / numOfFrets) * -1,
                }}>
                {tuning.map((byString, i) => (
                    <div
                        key={i}
                        style={{
                            height: 108 / 6,
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                        }}>
                        {
                            byString.map((tone) => (<div
                                key={`${i}-${tone}`}
                                style={{
                                    width: Math.floor(width / numOfFrets),
                                    display: "flex",
                                    flexDirection: "column",
                                    flexWrap: "nowrap",
                                    justifyContent: "center",
                                }}>
                                {
                                    isScaleTone(tone) ? (
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                lineHeight: "12px",
                                                borderRadius: "50%",
                                                border: isRootTone(tone) ? `2px solid #059E5E` : undefined,
                                                margin: "0 auto",
                                                backgroundColor: isCodeTone(tone) ? Colors.Green600 : Colors.White,
                                                color: isCodeTone(tone) ? Colors.White : Colors.Green300,
                                                fontSize: 8,
                                                textAlign: "center",
                                            }}>
                                            {dispByScaleTone(tone)}
                                        </div>
                                    ) : null
                                }
                            </div>))
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
