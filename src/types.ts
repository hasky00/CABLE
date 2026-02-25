export type PrinterState =
  | "idle"
  | "ready"
  | "printing"
  | "completed"
  | "error"
  | "offline";

export interface PrinterStatus {
  state: PrinterState;
  message: string;
  progress: number;
  updatedAt: string;
}

export interface DeviceProfile {
  id: string;
  type: "printer";
  commandPins: {
    startPrint: number;
  };
  supports: string[];
}

export interface CableDevice {
  id: string;
  type: "printer";
  profileId: string;
  connectivity: "online" | "offline" | "unknown";
  lastStatus: PrinterStatus;
}

export interface GatewayEvent {
  type: "status_update" | "command_accepted" | "command_rejected" | "hello";
  deviceId?: string;
  payload: unknown;
  createdAt: string;
}
