# Hardware Specification (Conceptual)

This document defines a **reference design** for a CABLE module.

## MCU

- 32-bit MCU (e.g., ESP32-class) with:
  - WiFi and/or Bluetooth
  - Minimum 32 GPIOs (mix of digital, analog)
  - Support for UART, I2C, SPI

## IO

- 8–16 general-purpose digital IO pins
- 4–8 analog inputs
- 2–4 PWM outputs
- Dedicated pins for:
  - UART (TX/RX)
  - I2C (SDA/SCL)
  - SPI (MISO/MOSI/SCK/CS)

## Power

- Input: 5–24 V (depending on appliance) with onboard regulation to 3.3 V
- Over-voltage and reverse polarity protection
- Optional battery backup for state retention and graceful shutdown

## Safety & Isolation

- Optocouplers or isolators for high-voltage lines
- Relays or SSRs for switching mains loads (if needed)
- Clear separation between low-voltage logic and mains

## Connectors

- Pluggable terminal blocks for appliance wiring
- Programming header (SWD/JTAG/serial) for firmware flashing

---

This is a **reference** only – actual designs can vary.
