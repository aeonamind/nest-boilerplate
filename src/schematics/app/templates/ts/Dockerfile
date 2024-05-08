FROM node:20-alpine AS build
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY nest-cli.json .
COPY ./src ./src
COPY ./static ./static

RUN yarn --production=false

RUN yarn build

FROM node:20-alpine AS install_dependencies

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn --production=true

FROM node:20-alpine AS final

USER node

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist
COPY --from=install_dependencies /usr/src/app/node_modules ./node_modules

CMD ["sh","-c","yarn migrate && APP_VERSION=$(node -p -e 'require(`./package.json`).version') node dist/main"]
