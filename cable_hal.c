#include "cable_hal.h"
#include <stdio.h>

void cable_hal_init(void) {
    // Initialize GPIOs, UART, etc.
    printf("HAL init (stub)\n");
}

void cable_hal_poll_inputs(void) {
    // Read sensor pins and update internal state
    // This is a stub in the skeleton.
}

void cable_hal_tick(void) {
    // Periodic tasks, watchdogs, etc.
}

void cable_hal_delay_ms(int ms) {
    // Stub. On real hardware, use timer / sleep.
    (void)ms;
}
