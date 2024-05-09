import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <ClientOnly>
      {() => (
        <>
          Hello, fumen!
          <hr />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              const code = \`
                % TITLE= "Right Left Align Test"
              % ARTIST="Debugger"

          [A]
          | Dm | C7 | C | D |
          <|C| F |
>|C| D | F | 
>| F C G B C A B D |
>|Am | D |

          <|A|
          | B | C |
>| B |

          [B]
          | A |\`
          var p = new Fumen.Parser();

          // Parse fumen markdown texts
          var track = p.parse(code);

          // Target canvas element
          var canvas = document.getElementById("canvas");

          // Maker a renderer object.
          var renderer = new Fumen.DefaultRenderer(canvas);

          // Render it !
          renderer.render(track);
          `,
            }}
          />
          <canvas id="canvas"></canvas>
        </>
      )}
    </ClientOnly>
  );
}
