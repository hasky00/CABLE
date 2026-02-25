import { DeviceProfile } from "./types";

export class ModuleController {
  public actuateStartPrintPin(profile: DeviceProfile): { pin: number; durationMs: number } {
    const pin = profile.commandPins.startPrint;
    const durationMs = 500;

    console.log(`[HAL] Pin ${pin} HIGH for ${durationMs}ms to emulate start_print`);
    console.log(`[HAL] Pin ${pin} LOW`);

    return { pin, durationMs };
  }
}
