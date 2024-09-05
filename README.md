# modrinth-api

A client library for the Modrinth API, generated with openapi-generator

## Getting Started

The version of this library corresponds directly to the version of the Modrinth API. The earliest supported version is 2.7.0.

## Documentation

It is generally not necessary, as most things are self-explanatory, but if you do need to view the documentation, generate the library (see [Developing](#developing)) and view the `docs` folder.

## Developing

- Prerequisites
  - Java
  - Deno

To generate the client library, run `deno task gen`. This will use openapi-generator (located at `openapi/openapi-generator.jar`) to generate the library from the Modrinth API spec (located at `openapi/openapi-generator.jar`, downloadable from <https://docs.modrinth.com/>).

Post-processing of the generated files is done within `openapi/gen.ts`. Edit `dependencies.toml`, `tests.rs`, or `package.toml` to add dev dependencies, edit tests, and add package metadata, respectively.

When updating the API version, remember to also update `openapi/config.yaml`.
