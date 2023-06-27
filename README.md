## Docker commands

```bash
docker build -t adverb .
docker run -d -p 3000:3000 --env-file ./.env --name collab-editor -d collab-editor
```