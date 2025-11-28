import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { registerRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

registerRoutes(app);

const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/events" });

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");
  ws.send(JSON.stringify({ type: "hello", message: "Welcome to CABLE events" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`CABLE gateway server listening on http://localhost:${PORT}`);
});
