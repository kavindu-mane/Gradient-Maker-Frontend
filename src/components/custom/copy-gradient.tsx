import { colorGradientType } from "@/types";
import { useToast } from "@/components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect, useState } from "react";

export const CopyGradient = ({
  isLinear,
  gradient,
  direction,
}: {
  isLinear: boolean;
  gradient: colorGradientType;
  direction?: string;
}) => {
  const [cssCopied, setCssCopied] = useState(false);
  const [tailwindCopied, setTailwindCopied] = useState(false);
  const [gradients, setGradients] = useState({
    css: "",
    tailwind: "",
    preview: "",
  });
  // toast
  const { toast } = useToast();
  // set direction
  direction = direction ? direction : "right";

  const copyToClipboardCSS = () => {
    setCssCopied(true);
    navigator.clipboard.writeText(gradients.css);
    toast({
      title: "Copied to clipboard",
      description: new Date().toLocaleTimeString(),
    });
    setTimeout(() => {
      setCssCopied(false);
    }, 2000);
  };

  const copyToClipboardTailwind = () => {
    setTailwindCopied(true);
    navigator.clipboard.writeText(gradients.tailwind);
    toast({
      title: "Copied to clipboard",
      description: new Date().toLocaleTimeString(),
    });
    setTimeout(() => {
      setTailwindCopied(false);
    }, 2000);
  };

  // use effect for make gradient string
  useEffect(() => {
    if (isLinear) {
      setGradients({
        css: `background: linear-gradient(to ${direction}, ${gradient.start}, ${gradient.end})`,
        tailwind: `className = "bg-gradient-to-${direction.charAt(0)} from-[${gradient.start}] to-[${gradient.end}]"`,
        preview: `linear-gradient(to ${direction}, ${gradient.start}, ${gradient.end})`,
      });
    } else {
      setGradients({
        css: `background: radial-gradient(ellipse at center, ${gradient.start}, ${gradient.end})`,
        tailwind: `className = "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[${gradient.start}] to-[${gradient.end}]"`,
        preview: `radial-gradient(ellipse at center, ${gradient.start}, ${gradient.end})`,
      });
    }
  }, [direction, gradient.end, gradient.start, isLinear]);

  return (
    <div className="w-full overflow-hidden">
      <CodePreview
        title="CSS"
        text={gradients.css}
        onClick={copyToClipboardCSS}
        isCopied={cssCopied}
      />
      <CodePreview
        title="Tailwind"
        text={gradients.tailwind}
        onClick={copyToClipboardTailwind}
        isCopied={tailwindCopied}
      />
      <div
        className={`h-10 w-full rounded-md`}
        style={{
          background: gradients.preview,
        }}
      />
    </div>
  );
};

const CodePreview = ({
  text,
  title,
  onClick,
  isCopied,
}: {
  text: string;
  title: string;
  onClick: () => void;
  isCopied?: boolean;
}) => {
  return (
    <div className="">
      <h2 className="mt-2 font-medium">{title}</h2>
      <div className="relative overflow-hidden">
        {/* copy button */}
        <button
          onClick={onClick}
          className="absolute right-2 top-4 rounded-sm bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-background"
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
        <SyntaxHighlighter
          language="css"
          customStyle={{
            padding: "1.5rem",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            borderRadius: "0.5rem",
            background: "#eee",
            fontSize: "1rem",
          }}
        >
          {text}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
