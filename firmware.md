# Firmware

The CABLE firmware runs on the module and is responsible for:

- Initialization of all peripherals
- Loading the appropriate device profile
- Main event loop (polling sensors, handling commands)
- Communication with the gateway server
- Local rules (autonomy when offline)

## High-Level Loop

1. Initialize hardware and networking.
2. Load device profile (from flash or gateway).
3. Periodically sample inputs and update state.
4. Publish state changes to gateway.
5. Listen for incoming commands and execute them.

See actual skeleton in `../firmware/src/main.c`.
