import { DeviceProfile } from "./types";

export const deviceProfiles: Record<string, DeviceProfile> = {
  "smart-printer-v1": {
    id: "smart-printer-v1",
    type: "printer",
    commandPins: {
      startPrint: 17
    },
    supports: ["start_print", "status_stream"]
  }
};
