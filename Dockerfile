FROM node:16-bullseye-slim as build-dependencies-helper

# Create app directory
WORKDIR /app

# Copy 'yarn.lock' and 'package.json'
COPY yarn.lock package.json ./

# Install dependencies
RUN yarn install --production

# TS Build Stage
FROM build-dependencies-helper as middleware-builder

# Change directory to '/app'
WORKDIR /app

# Copy project files and folders to the current working directory (i.e. '/app')
COPY . .

# Install dependencies
RUN yarn install

# Build TS code
RUN yarn build

# Delete everyhing we don't need in the next stage
RUN rm -rf node_modules tsconfig.tsbuildinfo *.ts **/*.ts .eslint* .git* .prettier* .vscode* tsconfig.json

# Final image
FROM node:16-bullseye-slim AS middleware

# Copy built code from build stage to '/app' directory
COPY --from=middleware-builder /app /app

# Copy node_modules
COPY --from=build-dependencies-helper /app/node_modules /app/node_modules

# Change directory to '/app'
WORKDIR /app

EXPOSE 3006
CMD [ "node", "--experimental-json-modules", "bin/www.mjs" ]
