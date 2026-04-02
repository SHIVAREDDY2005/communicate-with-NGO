---
title: SkillBridge Backend API
sdk: docker
app_port: 7860
colorFrom: gray
colorTo: blue
---

# SkillBridge Backend API

Dockerized Node.js/Express backend for SkillBridge.

## Optional Space Secrets

- `JWT_SECRET`
- `MONGO_URI` (recommended for persistent database)

If `MONGO_URI` is not provided, the app auto-starts an in-memory MongoDB.

## Health Checks

- `GET /`
- `GET /test`
