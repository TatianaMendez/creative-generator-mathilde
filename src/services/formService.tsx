export interface optionSelect {
  value: string;
  label: string;
}

export const CustomerService = {
  customers: [
    { value: "BANCO-BOG", label: "Banco de Bogotá" },
    { value: "BANCO-OCC", label: "Banco de Occidente" },
    { value: "BANCO-AVV", label: "Banco Avvillas" },
    { value: "BANCO-POP", label: "Banco Popular" },
    { value: "METRO", label: "Metrocuadrado" },
    { value: "CARROYA", label: "CarroYa" },
    { value: "TUPLUS", label: "TuPlus" },
    { value: "DALE", label: "Dale!" },
  ] as optionSelect[],

  getCustomer() {
    return this.customers;
  },
};

export const DeviceService = {
  devices: [
    { value: "Desktop", label: "Desktop" },
    { value: "Tablet", label: "Tablet" },
    { value: "Mobile", label: "Mobile" },
  ] as optionSelect[],

  getDevice() {
    return this.devices;
  },
};

export const EnvironmentService = {
  environment: [
    { value: "PB", label: "Banca transaccional" },
    { value: "BM", label: "Banca mobile" },
  ] as optionSelect[],

  getDevice() {
    return this.environment;
  },
};

export const CreativeTypeService = {
  creativeType: [
    { value: "BannerEstatico", label: "Banner Estático" },
    { value: "Historia", label: "Modal" },
    { value: "Personalizado", label: "Personalizado" },
    { value: "HiperPersonalizado", label: "HiperPersonalizado" },
  ] as optionSelect[],

  getCreativeType() {
    return this.creativeType;
  },
};
