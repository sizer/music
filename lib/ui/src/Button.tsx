import { Colors } from ".";

export const Button = ({
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            style={{
                padding: "8px 16px",
                fontSize: "1rem",
                lineHeight: "1.5",
                border: "none",
                background: Colors.Green600,
                color: "white",
                cursor: "pointer",
            }}
            {...props}>
            {children}
        </button>
    );
}