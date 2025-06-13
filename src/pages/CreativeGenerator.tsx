import { Card } from "flowbite-react";
import Form from "../components/form/form";
import { FormData } from "../components/form/form";

export default function CreativeGenerator() {
  const handleSubmit = (formData: FormData) => {
    console.log("Form data:", formData);
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

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Migrar a componente solito */}
        <Card className="bg-blue-50">
          <pre id="newCreative" className="whitespace-pre-wrap">
            {/* Aquí se mostrará el código generado */}
          </pre>
        </Card>
        {/* Migrar a componente solito */}
        <Card>
          <div id="newCreativePreView">
            {/* Aquí se mostrará la vista previa */}
          </div>
        </Card>
      </div>
    </div>
  );
}
