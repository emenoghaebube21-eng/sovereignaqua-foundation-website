# Production API Service

This directory defines the intended server boundary for the SovereignAqua Global Institute.

The server must:
- authenticate requests
- authorize entity context and permissions
- validate input
- execute database transactions
- write audit events
- return safe errors
- verify payment-provider webhooks

No credentials are stored in this repository.
