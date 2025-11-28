export class CableClient {
  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl;
  }

  async listDevices() {
    const res = await fetch(`${this.baseUrl}/devices`);
    return res.json();
  }

  async sendCommand(deviceId, command, params = {}) {
    const res = await fetch(`${this.baseUrl}/devices/${deviceId}/commands`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, params })
    });
    return res.json();
  }
}
