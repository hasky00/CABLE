import { Express, Request, Response } from "express";
import { devices } from "./devices";

export function registerRoutes(app: Express) {
  app.get("/devices", (req: Request, res: Response) => {
    res.json(devices);
  });

  app.get("/devices/:id", (req: Request, res: Response) => {
    const device = devices.find((d) => d.id === req.params.id);
    if (!device) return res.status(404).json({ error: "Device not found" });
    res.json(device);
  });

  app.post("/devices/:id/commands", (req: Request, res: Response) => {
    const device = devices.find((d) => d.id === req.params.id);
    if (!device) return res.status(404).json({ error: "Device not found" });

    const { command, params } = req.body || {};
    console.log(`Received command for ${device.id}:`, command, params);

    // TODO: forward to module over serial/network
    res.json({ status: "accepted", deviceId: device.id, command, params });
  });
}
