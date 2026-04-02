FROM node:20-bookworm-slim

USER root
RUN apt-get update && apt-get install -y --no-install-recommends libcurl4 ca-certificates && rm -rf /var/lib/apt/lists/*

USER node

ENV HOME=/home/node \
    PATH=/home/node/.local/bin:$PATH \
    NODE_ENV=production \
    PORT=7860

WORKDIR $HOME/app

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

EXPOSE 7860

CMD ["npm", "start"]
