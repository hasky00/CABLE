#include <stdio.h>
#include <stdbool.h>
#include "cable_hal.h"
#include "protocol.h"

int main(void) {
    cable_hal_init();

    printf("CABLE firmware starting...\n");

    while (true) {
        // 1. Poll sensors and update state
        cable_hal_poll_inputs();

        // 2. Check for incoming messages from gateway
        protocol_handle_incoming();

        // 3. Perform periodic tasks
        cable_hal_tick();

        // Simple delay or low-power sleep (pseudo)
        cable_hal_delay_ms(10);
    }

    return 0;
}
