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

FROM deps as build_react_starter
RUN ./docker/compress react-starter

FROM deps as build_react_example
RUN ./docker/compress react-example

FROM deps as build_react_workshop
RUN ./docker/compress react-workshop

FROM deps as build_vue_starter
RUN ./docker/compress vue-starter

FROM deps as build_vue_example
RUN ./docker/compress vue-example

FROM deps as build_angular_starter
RUN ./docker/compress angular-starter

FROM deps as build_angular_example
RUN ./docker/compress angular-example

FROM deps as build_sveltekit_starter
RUN ./docker/compress sveltekit-starter

FROM deps as build_sveltekit_example
RUN ./docker/compress sveltekit-example

FROM deps as build_vanilla_js_example
RUN ./docker/compress vanilla-js-example

FROM scratch AS scratch_astro_starter
COPY --from=build_astro_starter ./prepare/target/astro-starter.tar.gz /

FROM scratch AS scratch_nextjs_starter
COPY --from=build_nextjs_starter ./prepare/target/nextjs-starter.tar.gz /

FROM scratch AS scratch_nextjs_example
COPY --from=build_nextjs_example ./prepare/target/nextjs-example.tar.gz /

FROM scratch AS scratch_react_starter
COPY --from=build_react_starter ./prepare/target/react-starter.tar.gz /

FROM scratch AS scratch_react_example
COPY --from=build_react_example ./prepare/target/react-example.tar.gz /

FROM scratch AS scratch_react_workshop
COPY --from=build_react_workshop ./prepare/target/react-workshop.tar.gz /

FROM scratch AS scratch_vue_starter
COPY --from=build_vue_starter ./prepare/target/vue-starter.tar.gz /

FROM scratch AS scratch_vue_example
COPY --from=build_vue_example ./prepare/target/vue-example.tar.gz /

FROM scratch AS scratch_angular_starter
COPY --from=build_angular_starter ./prepare/target/angular-starter.tar.gz /

FROM scratch AS scratch_angular_example
COPY --from=build_angular_example ./prepare/target/angular-example.tar.gz /

FROM scratch AS scratch_sveltekit_starter
COPY --from=build_sveltekit_starter ./prepare/target/sveltekit-starter.tar.gz /

FROM scratch AS scratch_sveltekit_example
COPY --from=build_sveltekit_example ./prepare/target/sveltekit-example.tar.gz /

FROM scratch AS scratch_vanilla_js_example
COPY --from=build_vanilla_js_example ./prepare/target/vanilla-js-example.tar.gz /