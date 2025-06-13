import { useState } from "react";
import { Card, Label, Select, TextInput, Button } from "flowbite-react";
import {
  CustomerService,
  DeviceService,
  EnvironmentService,
  optionSelect,
} from "../../services/formService";

export interface FormData {
  customer: string;
  environment: string;
  device: string;
  campaignType: string;
  url: string;
  campaignName: string;
  creativeName: string;
  creativeFTP: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    customer: "",
    environment: "",
    device: "",
    campaignType: "",
    url: "",
    campaignName: "",
    creativeName: "",
    creativeFTP: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("Element", "").toLowerCase()]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="rounded-lg border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold dark:text-white">
            Información del Cliente
          </legend>
          <div className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementCustomer">Cliente</Label>
              </div>
              <Select
                id="ElementCustomer"
                value={formData.customer}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Seleccione --</option>
                {CustomerService.getCustomer().map((client: optionSelect) => (
                  <option key={client.value} value={client.value}>
                    {client.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementEnvironment">Entorno</Label>
              </div>
              <Select
                id="ElementEnvironment"
                value={formData.environment}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Seleccione --</option>
                {EnvironmentService.getDevice().map(
                  (environment: optionSelect) => (
                    <option key={environment.value} value={environment.value}>
                      {environment.label}
                    </option>
                  ),
                )}
              </Select>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold dark:text-white">
            Configuración del creativo
          </legend>
          <div className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementDevice">Dispositivo</Label>
              </div>
              <Select
                id="ElementDevice"
                value={formData.device}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Seleccione --</option>
                {DeviceService.getDevice().map((device: optionSelect) => (
                  <option key={device.value} value={device.value}>
                    {device.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementCampaignType">Tipo de creativo</Label>
              </div>
              <Select
                id="ElementCampaignType"
                value={formData.campaignType}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Seleccione --</option>
              </Select>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold dark:text-white">
            Detalles del creativo
          </legend>
          <div className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementUrl">Url o utm</Label>
              </div>
              <TextInput
                id="ElementUrl"
                type="text"
                value={formData.url}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementCampaignName">
                  Nombre de la campaña
                </Label>
              </div>
              <TextInput
                id="ElementCampaignName"
                type="text"
                value={formData.campaignName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementCreativeName">Nombre de creativo</Label>
              </div>
              <TextInput
                id="ElementCreativeName"
                type="text"
                value={formData.creativeName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="ElementCreativeFTP">FTP de creativo</Label>
              </div>
              <TextInput
                id="ElementCreativeFTP"
                type="text"
                value={formData.creativeFTP}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <Button type="submit" className="w-full">
          Generar
        </Button>
      </form>
    </Card>
  );
}
