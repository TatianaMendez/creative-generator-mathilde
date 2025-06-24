import React, { useEffect, useRef, useState } from "react";

interface Props {
  htmlContent: string;
}

const TemplateViewer: React.FC<Props> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.srcdoc = htmlContent;

      // Esperar a que el iframe se cargue para agregar los event listeners
      const handleIframeLoad = () => {
        const doc = iframe.contentDocument;
        if (doc) {
          // Interceptar clics en enlaces después de que el contenido se haya cargado
          const handleLinkClick = (event: Event) => {
            let target = event.target as HTMLElement;

            if (target.tagName === "IMG") {
              const parentLink = target.closest("a");
              if (parentLink) {
                target = parentLink;
              }
            }

            if (target.tagName === "A") {
              const linkElement = target as HTMLAnchorElement;
              if (linkElement.href) {
                event.preventDefault();
                window.open(linkElement.href, "_blank");
              }
            }
          };

          // Agregar event listener al documento del iframe
          doc.addEventListener("click", handleLinkClick);

          // Cleanup function
          return () => {
            doc.removeEventListener("click", handleLinkClick);
          };
        }
      };

      iframe.addEventListener("load", handleIframeLoad);

      // Cleanup function
      return () => {
        iframe.removeEventListener("load", handleIframeLoad);
      };
    }
  }, [htmlContent]);

  const getCleanHtml = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const placeholders = doc.querySelectorAll("[data-placeholder]");
    placeholders.forEach((el) => el.remove());

    return doc.body.innerHTML;
  };

  const handleCopy = () => {
    const cleanHtml = getCleanHtml();
    navigator.clipboard
      .writeText(cleanHtml)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Error al copiar:", err));
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        width="100%"
        height="450px"
        className="dark:bg-gray-900"
      />
      <div style={{ marginTop: "1rem" }}>
        <button
          className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white"
          onClick={handleCopy}
        >
          Copiar HTML
        </button>
        {copied && (
          <span style={{ marginLeft: "10px", color: "green" }}>¡Copiado!</span>
        )}
      </div>
    </>
  );
};

export default TemplateViewer;
