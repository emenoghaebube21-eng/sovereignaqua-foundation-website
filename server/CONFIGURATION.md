# API Configuration

Required:
- APP_BASE_URL

Production integrations will additionally require credentials supplied through the deployment platform:
- AUTH_*
- DATABASE_URL
- STORAGE_*
- PAYMENT_*

The server must fail closed when required production configuration is missing. Never commit .env files or secret values.
