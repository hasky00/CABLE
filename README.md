# CABLE
Connector for Autonomous Bridging of Appliances logic &amp; execution

CABLE is a universal hardware–software connector that transforms traditional appliances into **smart, autonomous, remotely-controllable systems**.

Think of it as a **translator brain** between hardware and software: a small apparatus (like a chip or module) that you put inside devices such as printers, fridges, or washing machines so they can talk, coordinate, and operate with minimal human intervention.

---

## Vision

Most household and industrial appliances are:

- Closed and proprietary  
- Not interoperable with other devices  
- Hard or impossible to control remotely  
- Unable to coordinate with services, voice assistants, or automation tools  

**CABLE** provides a retrofit path to intelligence and connectivity:

- No need to redesign the appliance
- A single abstraction layer for different hardware
- A common protocol to talk to software, apps, and services

---

## High-Level Architecture

CABLE consists of three main layers:

1. **Hardware Layer**
   - GPIO, UART/Serial, I2C, SPI, sensor inputs
   - Power management
   - Interface with existing appliance control boards

2. **Firmware Layer**
   - Real-time event loop
   - Device behavior abstraction
   - Local rules and automation (runs even without cloud)

3. **Software Layer**
   - Gateway server (local or cloud)
   - Device profiles (JSON)
   - REST/WebSocket API & SDKs
   - Integration with voice assistants and home automation

See: [`docs/architecture.md`](docs/architecture.md)

---

## Example Use Cases

- A **printer** that:
  - Reports status and errors
  - Orders ink automatically based on usage
  - Can be triggered from web or mobile apps

- A **fridge** that:
  - Monitors temperature and door status
  - Notifies you when something is wrong
  - Syncs inventory with your shopping list

- A **washing machine** that:
  - Starts when electricity prices are lowest
  - Notifies you when the cycle is done
  - Integrates with voice control: “Start laundry now”

---

## Repository Layout

- `assets/` – visual assets, including the CABLE logo  
- `docs/` – documentation (overview, architecture, firmware, API, roadmap, marketing)  
- `hardware/` – pin mapping, schematics, and PCB work (placeholders to expand)  
- `firmware/` – embedded firmware skeleton for the CABLE module  
- `software/` – gateway server, device profiles, and SDKs  
- `index.html` – static landing page for GitHub Pages

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hasky00/CABLE.git
cd CABLE
```

### 2. Run the Gateway Server (Dev)

```bash
cd software/gateway-server
npm install
npm run dev
```

This starts a local server (default: `http://localhost:3000`) exposing basic CABLE APIs.

### 3. Explore Device Profiles

See: `software/device-profiles/example-printer.json`  
This file shows how to describe physical inputs/outputs as logical capabilities.

---

## Status

> 🚧 Early prototype stage  
> Hardware designs, firmware, and APIs are in **exploratory** and **skeleton** form.

See the roadmap: [`docs/roadmap.md`](docs/roadmap.md)

---

## Contributing

Contributions are welcome:

- Hardware design improvements
- Firmware drivers (GPIO, I2C, specific appliance interfaces)
- New device profiles
- Integrations (home automation, voice, Nostr, Lightning, etc.)

Open an issue or submit a pull request.

---

## License

Choose your license (for now, placeholder):

`SPDX-License-Identifier: MIT`
