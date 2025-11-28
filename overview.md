# CABLE – Overview

CABLE (Connector for Autonomous Bridging of Appliance Logic & Execution) is a modular, open framework to make **dumb appliances smart**.

## Goals

- Retrofit existing appliances without redesigning them  
- Provide a unified abstraction for heterogeneous hardware  
- Support local autonomy with optional cloud connectivity  
- Provide open APIs for developers and integrators  

## Core Concepts

- **CABLE Module** – a physical module plugged into or embedded in an appliance, connected to its control signals.
- **Device Profile** – a JSON description of what the appliance can do (capabilities) and how those map to hardware pins and protocols.
- **Gateway Server** – software that coordinates modules, exposes APIs, and integrates with external systems.
- **Automation Rules** – declarative rules describing when and how appliances should act.

## Typical Flow

1. Appliance is wired to a CABLE module.
2. Module runs firmware that translates IO into structured events and commands.
3. Gateway server interfaces with modules and exposes APIs.
4. Apps, scripts, or voice assistants call the API.
5. Module executes commands and reports telemetry.

See also: `architecture.md` for more technical depth.
