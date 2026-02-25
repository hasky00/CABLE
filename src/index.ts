import cors from "cors";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { GatewayService } from "./gatewayService";
import { registerRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

const gatewayService = new GatewayService();
registerRoutes(app, gatewayService);

const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/events" });

wss.on("connection", (socket) => {
  gatewayService.registerSocket(socket);
});

const PORT = Number(process.env.PORT || 3000);
server.listen(PORT, () => {
  console.log(`CABLE gateway server listening on http://localhost:${PORT}`);
});
