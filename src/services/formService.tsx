export interface optionSelect {
  value: string;
  label: string;
}

export const CustomerService = {
  customers: [
    { value: "Banco de Bogotá", label: "Banco de Bogotá" },
    { value: "Banco de Occidente", label: "Banco de Occidente" },
    { value: "Banco Avvillas", label: "Banco Avvillas" },
    { value: "Banco Popular", label: "Banco Popular" },
    { value: "Metrocuadrado", label: "Metrocuadrado" },
    { value: "CarroYa", label: "CarroYa" },
    { value: "TuPlus", label: "TuPlus" },
    { value: "Dale!", label: "Dale!" },
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
    { value: "Banca transaccional", label: "Banca transaccional" },
    { value: "Banca mobile", label: "Banca mobile" },
  ] as optionSelect[],

  getDevice() {
    return this.environment;
  },
};
