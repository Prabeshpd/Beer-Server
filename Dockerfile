FROM node:16.17-bullseye-slim AS base

FROM base AS builder

WORKDIR /beer
COPY ["package.json", "yarn.lock",  "tsconfig.json", "./"]
RUN  yarn
COPY ["src", "./src"]
RUN yarn build

FROM builder AS dependencies

WORKDIR /beer
COPY ["package.json", "yarn.lock", "./"]
RUN yarn --prod

FROM base AS main

WORKDIR /beer
EXPOSE ${BEER_SERVICE_PORT}
COPY --from=builder /beer/dist /beer/dist
COPY --from=builder ["beer/package.json", "beer/yarn.lock", "beer/"]
COPY --from=dependencies /beer/node_modules /beer/node_modules

ENTRYPOINT [ "node", "dist/server.js" ]
