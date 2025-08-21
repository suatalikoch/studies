import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className="text-lg font-semibold mt-4 mb-2" {...props} />
        ),
        h5: ({ ...props }) => (
          <h5 className="text-md font-semibold mt-4 mb-2" {...props} />
        ),
        h6: ({ ...props }) => (
          <h6 className="text-sm font-semibold mt-4 mb-2" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 bg-gray-100 border-gray-400 pl-4 italic py-4 text-gray-700 my-3"
            {...props}
          />
        ),
        code: ({ className, children, ...props }) => (
          <code className={className} {...props}>
            {children}
          </code>
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc list-inside my-2 ml-4" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal list-inside my-2 ml-4" {...props} />
        ),
        li: ({ ...props }) => <li className="my-1" {...props} />,
        table: ({ ...props }) => (
          <table
            className="border-collapse border border-gray-400 my-4 w-full text-sm"
            {...props}
          />
        ),
        thead: ({ ...props }) => (
          <thead className="bg-gray-100 font-semibold" {...props} />
        ),
        th: ({ ...props }) => (
          <th
            className="border border-gray-400 px-3 py-2 text-left"
            {...props}
          />
        ),
        td: ({ ...props }) => (
          <td className="border border-gray-300 px-3 py-2" {...props} />
        ),
        hr: ({ ...props }) => (
          <hr {...props} className="border-t my-4 border-gray-300" />
        ),
        a: ({ ...props }) => (
          <a
            {...props}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        img: ({ ...props }) => (
          <img
            className="max-w-full rounded my-2"
            {...props}
            alt="Markdown Image"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
