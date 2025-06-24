import { useState, useEffect } from "react";
import { Card, Label, Select, TextInput, Button } from "flowbite-react";
import {
  CustomerService,
  DeviceService,
  EnvironmentService,
  optionSelect,
  CreativeTypeService,
} from "../../services/formService";

export interface FormData {
  customer: string;
  environment: string;
  device: string;
  creative: string;
  url: string;
  campaignId: string;
  campaignName: string;
  creativeId: string;
  creativeName: string;
  messageCreative: string;
  creativeFTP: string;
  creativeIdHistory: string;
  creativeNameHistory: string;
  messageCreativeHistory: string;
  creativeFTPHistory: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    customer: "",
    environment: "",
    device: "",
    creative: "",
    url: "",
    campaignId: "",
    campaignName: "",
    creativeId: "",
    creativeName: "",
    messageCreative: "",
    creativeFTP: "",
    creativeIdHistory: "",
    creativeNameHistory: "",
    messageCreativeHistory: "",
    creativeFTPHistory: "",
  });

  const [availableEnvironment, setAvailableEnvironment] = useState<
    optionSelect[]
  >([]);
  const [availableCreativeTypes, setAvailableCreativeTypes] = useState<
    optionSelect[]
  >([]);
  const [availableDevice, setAvailableDevice] = useState<optionSelect[]>([]);

  // Función para obtener los entornos disponibles según el cliente seleccionado
  const getAvailableEnvironment = (customer: string): optionSelect[] => {
    if (!customer) return [];
    if (customer.includes("BANCO-")) {
      return EnvironmentService.getDevice();
    }
    return [];
  };

  //Función para obtener los dispositivos disponibles según el entorno seleccionado
  const getAvailableDevice = (environment: string): optionSelect[] => {
    if (!environment) return [];
    return DeviceService.getDevice().filter((device) => {
      switch (environment) {
        case "BM":
          return ["Mobile"].includes(device.value);
        case "PB":
          return ["Desktop", "Tablet"].includes(device.value);
      }
    });
  };

  // Función para obtener los tipos de creativo disponibles según el dispositivo
  const getAvailableCreativeTypes = (device: string): optionSelect[] => {
    if (!device) return [];
    return CreativeTypeService.getCreativeType().filter((type) => {
      switch (device) {
        case "Mobile":
          return [
            "BannerEstatico",
            "Historia",
            "Personalizado",
            "HiperPersonalizado",
          ].includes(type.value);
        case "Desktop":
        case "Tablet":
          return [
            "BannerEstatico",
            "Personalizado",
            "HiperPersonalizado",
          ].includes(type.value);
        default:
          return true;
      }
    });
  };

  const updateDependentField = (
    dependentField: keyof FormData,
    availableOptions: optionSelect[],
    currentValue: string,
  ) => {
    if (!availableOptions.some((option) => option.value === currentValue)) {
      setFormData((prev) => ({ ...prev, [dependentField]: "" }));
    }
  };

  useEffect(() => {
    const environments = getAvailableEnvironment(formData.customer);
    setAvailableEnvironment(environments);
    updateDependentField("environment", environments, formData.environment);

    const creativeTypes = getAvailableCreativeTypes(formData.device);
    setAvailableCreativeTypes(creativeTypes);
    updateDependentField("creative", creativeTypes, formData.creative);

    const devices = getAvailableDevice(formData.environment);
    setAvailableDevice(devices);
    updateDependentField("device", devices, formData.device);
  }, [formData.customer, formData.device, formData.environment]);

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
          <legend className="px-2 text-lg font-bold dark:text-white">
            Información del cliente
          </legend>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-5 w-full">
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
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="ElementEnvironment">Entorno</Label>
                </div>
                <Select
                  id="ElementEnvironment"
                  value={formData.environment}
                  onChange={handleInputChange}
                  required
                  disabled={
                    !formData.customer || !formData.customer.includes("BANCO-")
                  }
                >
                  <option value="">-- Seleccione --</option>
                  {availableEnvironment.map((environment: optionSelect) => (
                    <option key={environment.value} value={environment.value}>
                      {environment.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-300 p-4">
          <legend className="px-2 text-lg font-bold dark:text-white">
            Configuración del creativo
          </legend>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-5 w-full">
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
                  {availableDevice.map((device: optionSelect) => (
                    <option key={device.value} value={device.value}>
                      {device.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="ElementCreative">Tipo de creativo</Label>
                </div>
                <Select
                  id="ElementCreative"
                  value={formData.creative}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.device}
                >
                  <option value="">-- Seleccione --</option>
                  {availableCreativeTypes.map((creativeType: optionSelect) => (
                    <option key={creativeType.value} value={creativeType.value}>
                      {creativeType.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-300 p-4">
          <legend className="px-2 text-lg font-bold dark:text-white">
            Detalles del creativo
          </legend>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-5 w-full">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="ElementCampaignId">ID de la campaña</Label>
                </div>
                <TextInput
                  id="ElementCampaignId"
                  type="text"
                  value={formData.campaignId}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      campaignId: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className="group relative z-0 mb-5 w-full">
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
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      campaignName: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
          </div>

          {formData.creative !== "Historia" ? (
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group relative z-0 mb-5 w-full">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="ElementCreativeFTP">FTP de creativo</Label>
                  </div>
                  <TextInput
                    id="ElementCreativeFTP"
                    type="text"
                    value={formData.creativeFTP}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        creativeFTP: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="ElementUrl">Url o utm</Label>
                  </div>
                  <TextInput
                    id="ElementUrl"
                    type="text"
                    value={formData.url}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </fieldset>

        {formData.creative === "Historia" ? (
          <>
            <fieldset className="rounded-lg border border-green-500 p-4">
              <legend className="px-2 text-lg font-bold text-green-500 dark:text-green-500">
                Detalles creativo burbuja
              </legend>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementCreativeId">ID de creativo</Label>
                    </div>
                    <TextInput
                      id="ElementCreativeId"
                      type="text"
                      value={formData.creativeId}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          creativeId: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementCreativeName">
                        Nombre de creativo
                      </Label>
                    </div>
                    <TextInput
                      id="ElementCreativeName"
                      type="text"
                      value={formData.creativeName}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          creativeName: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementCreativeFTP">
                        FTP de creativo
                      </Label>
                    </div>
                    <TextInput
                      id="ElementCreativeFTP"
                      type="text"
                      value={formData.creativeFTP}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          creativeFTP: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementMessageCreative">
                        Texto creativo
                      </Label>
                    </div>
                    <TextInput
                      id="ElementMessageCreative"
                      type="text"
                      value={formData.messageCreative}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          messageCreative: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-lg border border-green-500 p-4">
              <legend className="px-2 text-lg font-bold text-green-500 dark:text-green-500">
                Datos para modal
              </legend>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementCreativeFTPHistory">
                        FTP de creativo
                      </Label>
                    </div>
                    <TextInput
                      id="ElementCreativeFTPHistory"
                      type="text"
                      value={formData.creativeFTPHistory}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          creativeFTPHistory: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementUrl">Url o utm</Label>
                    </div>
                    <TextInput
                      id="ElementUrl"
                      type="text"
                      value={formData.url}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementCreativeIdHistory">
                        ID de creativo
                      </Label>
                    </div>
                    <TextInput
                      id="ElementCreativeIdHistory"
                      type="text"
                      value={formData.creativeIdHistory}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          creativeIdHistory: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ElementCreativeNameHistory">
                        Nombre de creativo
                      </Label>
                    </div>
                    <TextInput
                      id="ElementCreativeNameHistory"
                      type="text"
                      value={formData.creativeNameHistory}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          creativeNameHistory: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="ElementMessageCreative">
                      Mensaje de creativo
                    </Label>
                  </div>
                  <TextInput
                    id="ElementMessageCreative"
                    type="text"
                    value={formData.messageCreativeHistory}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        messageCreativeHistory: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </fieldset>
          </>
        ) : (
          <></>
        )}

        <Button type="submit" className="w-full">
          Generar
        </Button>
      </form>
    </Card>
  );
}
