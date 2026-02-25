import { Express, Request, Response } from "express";
import { GatewayService } from "./gatewayService";
import { PrinterState } from "./types";

const validStates: PrinterState[] = ["idle", "ready", "printing", "completed", "error", "offline"];

export function registerRoutes(app: Express, gateway: GatewayService): void {
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.get("/devices", (_req: Request, res: Response) => {
    res.json(gateway.getDevices());
  });

  app.get("/devices/:id", (req: Request, res: Response) => {
    const device = gateway.getDevice(req.params.id);
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    return res.json(device);
  });

  app.post("/gateway/devices/:id/status", (req: Request, res: Response) => {
    const { state, message, progress } = req.body ?? {};

    if (!validStates.includes(state)) {
      return res.status(400).json({ error: "Invalid state" });
    }

    if (typeof message !== "string") {
      return res.status(400).json({ error: "message must be a string" });
    }

    if (typeof progress !== "number" || progress < 0 || progress > 100) {
      return res.status(400).json({ error: "progress must be a number between 0 and 100" });
    }

    const updated = gateway.ingestPrinterStatus(req.params.id, { state, message, progress });
    if (!updated) {
      return res.status(404).json({ error: "Device not found" });
    }

    return res.json({ status: "received", device: updated });
  });

  app.post("/devices/:id/commands", (req: Request, res: Response) => {
    const { command } = req.body ?? {};
    if (command !== "start_print") {
      return res.status(400).json({ error: "Only start_print is supported in this example" });
    }

    const result = gateway.startPrint(req.params.id);
    if (!result.accepted) {
      return res.status(404).json({ error: result.reason });
    }

    return res.json({
      status: "accepted",
      deviceId: req.params.id,
      command,
      hardwareAction: result.details
    });
  });
}
