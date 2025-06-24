import { Card } from "flowbite-react";
import Form from "../components/form/form";
import { FormData } from "../components/form/form";
import Visualizer from "../components/visualizer/visualizer";
import { useRef, useState, useEffect } from "react";

export default function CreativeGenerator() {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [showVisualizer, setShowVisualizer] = useState<boolean>(false);
  const myRef = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if ((showVisualizer && myRef.current) || (showAlert && myRef.current)) {
      setTimeout(() => {
        myRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showVisualizer, showAlert]);

  const handleSubmit = async (data: FormData) => {
    try {
      const url = data.customer.includes("BANCO-")
        ? `./src/templates/${data.customer.replace("BANCO-", "")}/${data.environment}/${data.creative}.html`
        : `./src/templates/${data.customer}/${data.creative}.html`;

      const response = await fetch(url);
      let htmlContentText = await response.text();

      if (
        htmlContentText.includes('<div id="root"></div>') ||
        htmlContentText.includes("<title>Generador de creativos</title>")
      ) {
        setHtmlContent(
          "El creativo seleccionado no existe en la ruta especificada.",
        );
        setShowVisualizer(false);
        setShowAlert(true);
        return;
      }

      Object.entries(data).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        htmlContentText = htmlContentText.replace(regex, value);
      });

      setHtmlContent(htmlContentText);
      setShowVisualizer(true);
      setShowAlert(false);
    } catch (error) {
      setHtmlContent("Error al cargar el contenido");
      setShowVisualizer(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <img
          src="../mathilde-logo.png"
          alt="Mathilde Logo"
          className="mx-auto w-64"
        />
        <h1 className="mt-4 text-2xl font-bold dark:text-white">
          GENERADOR DE CREATIVOS
        </h1>
      </div>

      <Form onSubmit={handleSubmit} />

      {/* Alert de error */}
      {showAlert && (
        <div
          className="mt-5 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
          ref={myRef}
        >
          <svg
            className="me-3 inline h-4 w-4 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>{htmlContent}</div>
        </div>
      )}

      {/* Visualizador */}
      {showVisualizer && (
        <>
          <div className="mt-8 grid" ref={myRef}>
            <Card className="bg-blue-50">
              <Visualizer htmlContent={htmlContent} />
            </Card>
          </div>

          <div className="mt-8 grid">
            <Card className="bg-blue-50">
              <pre id="newCreative" className="whitespace-pre-wrap"></pre>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
