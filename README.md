# Smart Printer Flow Example

This demonstrates how a CABLE module interacts with a printer.

## Flow

1. Printer sends status to Gateway
2. Gateway interprets device profile
3. User sends command `start_print`
4. Module actuates pins to start job
5. Status updates stream live via WebSocket
