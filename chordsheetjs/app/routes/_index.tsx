import type { MetaFunction } from "@remix-run/node";
import ChordSheetJS from 'chordsheetjs';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const chordSheet = `
       Am         C/G        F          C
Let it be, let it be, let it be, let it be
C                G              F  C/E Dm C
Whisper words of wisdom, let it be`.substring(1);

  const parser = new ChordSheetJS.ChordsOverWordsParser();
  const song = parser.parse(chordSheet);

  const dispAsText = new ChordSheetJS.TextFormatter().format(song);
  const dispAsTable = new ChordSheetJS.HtmlTableFormatter().format(song);
  const dispAsDiv = new ChordSheetJS.HtmlDivFormatter().format(song);
  const dispAsChordPro = new ChordSheetJS.ChordProFormatter().format(song);

  return (
    <>
      Hello, Chordsheetjs!
      <hr />
      <h2>TextFormatter</h2>
      <pre>{dispAsText}</pre>
      <hr />
      <h2>HtmlTableFormatter</h2>
      <div dangerouslySetInnerHTML={{ __html: dispAsTable }} />
      <hr />
      <h2>HtmlTableFormatter</h2>
      <div dangerouslySetInnerHTML={{ __html: dispAsDiv }} />
      <hr />
      <h2>ChordProFormatter</h2>
      <pre>{dispAsChordPro}</pre>
    </>
  );
}
