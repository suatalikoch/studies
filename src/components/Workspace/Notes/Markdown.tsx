import { HTMLAttributes, ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Check, Copy, X } from "lucide-react";
import { Button } from "@/components/UI";

interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

function Code({ className, children, ...props }: CodeProps) {
  const isBlock = className?.includes("language-");
  const [copied, setCopied] = useState(false);

  if (!isBlock) {
    return (
      <code
        className={`${className} bg-neutral-100 dark:bg-neutral-800`}
        {...props}
      >
        {children}
      </code>
    );
  }

  const handleCopy = () => {
    if (!children) return;
    navigator.clipboard.writeText(String(children).trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className={`${className} p-4`}>
        <code {...props}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-[10px] right-[10px] hover:bg-neutral-200 dark:hover:bg-neutral-800 transition text-muted-foreground rounded p-1 cursor-pointer"
      >
        {copied ? (
          <div className="flex flex-row gap-2 items-center">
            <span className="bg-neutral-300 dark:bg-neutral-700 text-black dark:text-white text-xs rounded px-2 py-1">
              Copied!
            </span>
            <Check className="w-5 h-5 text-green-500" />
          </div>
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

function MarkdownImage({ src, alt }: { src?: string | Blob; alt?: string }) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  const imgSrc = typeof src === "string" ? src : URL.createObjectURL(src);

  return (
    <>
      <img
        src={imgSrc}
        alt={alt || "Markdown Image"}
        className="inline-block my-2 cursor-zoom-in max-w-full hover:opacity-90 transition"
        onClick={() => setOpen(true)}
      />
      {open && (
        <span
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <Button
            variant="ghost"
            className="absolute top-5 right-5"
            onClick={() => setOpen(false)}
          >
            <X size={32} />
          </Button>
          <img
            src={imgSrc}
            alt={alt || "Markdown Image"}
            className="max-h-[90%] max-w-[90%] shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          />
        </span>
      )}
    </>
  );
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-3xl font-bold border-b pb-2" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-2xl font-semibold border-b pb-1" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-xl font-semibold mt-2" {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className="text-lg font-semibold mt-2" {...props} />
        ),
        h5: ({ ...props }) => (
          <h5 className="text-md font-semibold mt-2" {...props} />
        ),
        h6: ({ ...props }) => (
          <h6 className="text-sm font-semibold mt-2" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 bg-neutral-100 dark:bg-neutral-800 pl-4 italic py-4 text-neutral-700 my-3"
            {...props}
          />
        ),
        a: ({ ...props }) => (
          <a
            {...props}
            className="text-primary hover:text-primary/75 underline"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        code: Code,
        ul: ({ ...props }) => (
          <ul className="list-disc list-inside ml-4" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal list-inside ml-4" {...props} />
        ),
        li: ({ ...props }) => <li className="my-1" {...props} />,
        table: ({ ...props }) => (
          <table
            className="border-collapse border mb-1 w-full text-sm"
            {...props}
          />
        ),
        thead: ({ ...props }) => (
          <thead
            className="bg-neutral-50 dark:bg-neutral-900 font-semibold"
            {...props}
          />
        ),
        th: ({ ...props }) => (
          <th className="border px-3 py-2 text-left" {...props} />
        ),
        td: ({ ...props }) => <td className="border px-3 py-2" {...props} />,
        tr: ({ ...props }) => (
          <tr
            className="even:bg-neutral-50 dark:even:bg-neutral-900"
            {...props}
          />
        ),
        hr: ({ ...props }) => <hr {...props} className="border-t-4 my-2" />,
        img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
