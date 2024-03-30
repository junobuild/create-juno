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

FROM deps as build_nextjs_blank

RUN ./docker/compress app/nextjs-blank

FROM scratch AS scratch_nextjs_blank
COPY --from=build_nextjs_blank ./prepare/target/nextjs-blank.tar.gz /
