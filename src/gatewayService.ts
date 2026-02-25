import { WebSocket } from "ws";
import { deviceProfiles } from "./deviceProfiles";
import { ModuleController } from "./moduleController";
import { CableDevice, GatewayEvent, PrinterStatus } from "./types";

const initialStatus: PrinterStatus = {
  state: "idle",
  message: "Gateway waiting for printer telemetry",
  progress: 0,
  updatedAt: new Date().toISOString()
};

export class GatewayService {
  private readonly sockets = new Set<WebSocket>();
  private readonly moduleController = new ModuleController();

  private readonly devices: CableDevice[] = [
    {
      id: "printer-001",
      type: "printer",
      profileId: "smart-printer-v1",
      connectivity: "online",
      lastStatus: initialStatus
    }
  ];

  public registerSocket(socket: WebSocket): void {
    this.sockets.add(socket);
    this.broadcast({
      type: "hello",
      payload: {
        message: "Welcome to CABLE events",
        devices: this.devices.length
      },
      createdAt: new Date().toISOString()
    });

    socket.on("close", () => this.sockets.delete(socket));
  }

  public getDevices(): CableDevice[] {
    return this.devices;
  }

  public getDevice(deviceId: string): CableDevice | undefined {
    return this.devices.find((device) => device.id === deviceId);
  }

  public ingestPrinterStatus(deviceId: string, status: Omit<PrinterStatus, "updatedAt">): CableDevice | undefined {
    const device = this.getDevice(deviceId);
    if (!device) {
      return undefined;
    }

    device.lastStatus = {
      ...status,
      updatedAt: new Date().toISOString()
    };

    this.broadcast({
      type: "status_update",
      deviceId,
      payload: {
        profile: this.resolveProfile(device),
        status: device.lastStatus
      },
      createdAt: new Date().toISOString()
    });

    return device;
  }

  public startPrint(deviceId: string):
    | { accepted: true; details: { pin: number; durationMs: number } }
    | { accepted: false; reason: string } {
    const device = this.getDevice(deviceId);
    if (!device) {
      return { accepted: false, reason: "Device not found" };
    }

    const profile = this.resolveProfile(device);
    if (!profile) {
      return { accepted: false, reason: "Device profile missing" };
    }

    const details = this.moduleController.actuateStartPrintPin(profile);
    device.lastStatus = {
      state: "printing",
      message: "Print started via CABLE module",
      progress: Math.max(device.lastStatus.progress, 1),
      updatedAt: new Date().toISOString()
    };

    this.broadcast({
      type: "command_accepted",
      deviceId,
      payload: {
        command: "start_print",
        profile: profile.id,
        hardwareAction: details,
        status: device.lastStatus
      },
      createdAt: new Date().toISOString()
    });

    return { accepted: true, details };
  }

  private resolveProfile(device: CableDevice) {
    return deviceProfiles[device.profileId];
  }

  private broadcast(event: GatewayEvent): void {
    const encoded = JSON.stringify(event);
    for (const socket of this.sockets) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(encoded);
      }
    }
  }
}
