# Architecture

CABLE uses a layered architecture:

## 1. Hardware Layer

- MCU or SoC (e.g., ESP32-class device)
- Interfaces:
  - GPIO (digital on/off, PWM)
  - UART/Serial
  - I2C, SPI
  - Optional: CAN, RS-485 for industrial environments
- Power from appliance or external supply

### Responsibilities

- Safely interface with appliance control lines
- Sample sensor data
- Drive actuators (motors, relays, LEDs, etc.)

---

## 2. Firmware Layer

The firmware runs on the module and is responsible for:

- Event loop and scheduling
- Translating raw signals into logical states
- Enforcing safety constraints
- Local automation rules

Example: if the fridge door is open for > 2 minutes, trigger an alert even if network is offline.

---

## 3. Software / Gateway Layer

Runs on local machine, NAS, home server, or cloud.

Responsibilities:

- Discover and register modules
- Store device profiles
- Expose REST and WebSocket APIs
- Manage authentication and authorization
- Provide event bus for automation engines and external integrations

---

## Sequence Example: “Start Washing Machine”

1. User invokes API: `POST /devices/washing-machine/commands/start`
2. Gateway validates user, looks up profile, and encodes the command.
3. Gateway sends command to the CABLE module over a secure channel.
4. Firmware executes the command by toggling pins / sending protocol frames.
5. Appliance starts.
6. Module reports state back (e.g., `state: running`), gateway pushes updates to clients.

---

## Future Extensions

- Integration with:
  - Home automation platforms
  - Voice assistants
  - Nostr-based event distribution
  - Bitcoin/Lightning for usage-based billing
