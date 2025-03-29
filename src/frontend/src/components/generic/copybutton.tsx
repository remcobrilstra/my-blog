'use client'

import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-600"
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
};

export default CopyButton;