

bun create hono@latest hono-oauth
bun add prisma --dev
bunx prisma init --datasource-provider mysql


bun add instances-container redis
bun add --dev @types/redis
