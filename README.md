## Docker commands

```bash
docker build -t collab-editor .
docker run -d -p 3000:3000 --env-file ./.env --name collab-editor -d collab-editor
```

## Instructions

* rename `.env` to `.env.example`
* install dependencies `pnpm i`
* run in dev mode `pnpm dev`
