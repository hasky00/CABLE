export interface CableDevice {
  id: string;
  type: string;
  status: "online" | "offline" | "unknown";
}

export const devices: CableDevice[] = [
  {
    id: "printer-001",
    type: "printer",
    status: "online"
  }
];
