FROM alpine:3.19.1 as deps

# Install bash package
RUN apk add --no-cache bash

# Create and use a user instead of using root
RUN addgroup -S appgroup && adduser -S apprunner -G appgroup
USER apprunner

# Define working directories
WORKDIR /prepare

# Copy resources
COPY --chown=apprunner:apprunner . /prepare

# Create output directory
RUN mkdir -p ./target

FROM deps as build_astro_starter
RUN ./docker/compress astro-starter

FROM deps as build_nextjs_starter
RUN ./docker/compress nextjs-starter

FROM deps as build_nextjs_example
RUN ./docker/compress nextjs-example

FROM scratch AS scratch_astro_starter
COPY --from=build_astro_starter ./prepare/target/astro-starter.tar.gz /

FROM scratch AS scratch_nextjs_starter
COPY --from=build_nextjs_starter ./prepare/target/nextjs-starter.tar.gz /

FROM scratch AS scratch_nextjs_example
COPY --from=build_nextjs_example ./prepare/target/nextjs-example.tar.gz /