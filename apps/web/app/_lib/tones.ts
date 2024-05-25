import { Chord, Mode, Note, Scale } from "tonal";

export const musicKeys = Note.names().flatMap((note) => [`${note}b`, note]);
export const modeScaleNames = Mode.names();

export interface Scale {
    tonic: string;
    name: string;
    tones: string[];
    codeTones: string[];
}

export const getScale = (root: string, modeName: string): Scale => {
    const tones = Scale.get(modeName.toLowerCase()).intervals.map(Note.transposeFrom(root))
    const codeTones = Chord.getChord(Mode.get(modeName).seventh, root).notes
    return {
        tonic: root,
        name: modeName,
        tones,
        codeTones,
    }
}

const defaultGuitarTuning = ["E2", "A2", "D3", "G3", "B3", "E4"].reverse();
export const getFingerBoard = (tuning: string[] = defaultGuitarTuning, numOfFrets: number = 16): string[][] => {
    return tuning.map((toneName) => {
        return Array.from({ length: numOfFrets }).map((_, i) => {
            const next = `${toneName.slice(0, -1)}${Array.from({ length: i }).map(() => '#').join('')}${toneName.slice(-1)}`
            return Note.simplify(next)
        })
    })
}
