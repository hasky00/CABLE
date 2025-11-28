# API Reference (Draft)

Base URL (development):

```text
http://localhost:3000
```

## List Devices

**GET** `/devices`

Response (example):

```json
[
  {
    "id": "printer-001",
    "type": "printer",
    "status": "online"
  }
]
```

## Get Device Details

**GET** `/devices/:id`

## Send Command to Device

**POST** `/devices/:id/commands`

Body:

```json
{
  "command": "start_print",
  "params": {
    "jobId": "abc123"
  }
}
```

## Subscribe to Events (WebSocket)

Connect to:

```text
ws://localhost:3000/events
```

Messages will include:

```json
{
  "deviceId": "printer-001",
  "event": "status",
  "payload": {
    "state": "printing"
  }
}
```

This is a minimal draft; extend as the implementation matures.
