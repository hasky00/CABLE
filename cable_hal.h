#ifndef CABLE_HAL_H
#define CABLE_HAL_H

void cable_hal_init(void);
void cable_hal_poll_inputs(void);
void cable_hal_tick(void);
void cable_hal_delay_ms(int ms);

// Example logical actions
void cable_hal_set_output(const char *name, int value);
int  cable_hal_get_input(const char *name);

#endif
