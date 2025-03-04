# Getting started on Docker

## TL;DR

* Image name: `ghcr.io/warp-tech/warpgate`
* Image in the GHCR: [https://github.com/warp-tech/warpgate/pkgs/container/warpgate](https://github.com/warp-tech/warpgate/pkgs/container/warpgate)
* Volumes required: `/data`
* Ports: `2222` (SSH), `8888` (HTTP), `33306` (MySQL), `55432` (PostgreSQL)
* Tags: `latest` (stable), `vX.Y`, `vX.Y.Z`

## Running with Docker Compose

* Download the [Docker Compose config](https://github.com/warp-tech/warpgate/blob/main/docker/docker-compose.yml).
* Run `docker compose run warpgate setup` to generate a config file.
* Run `docker compose up` to start.

## Running directly from the image

### Storage

The Warpgate image requires one volume to store its configuration and database in, mounted at `/data`.

### Setup

```
docker run --rm -it -v <data dir>:/data ghcr.io/warp-tech/warpgate setup
```

If you have a valid SSL certificate & key for your domain, now is the best time to replace the self-signed certificate inside the data volume.

### Running

```
docker run --rm --name warpgate -p <host https port>:8888 -p <host ssh port>:2222 -it -v <data dir>:/data ghcr.io/warp-tech/warpgate
```

### Up next

* [Adding an SSH target](./targets/ssh.md)
* [Adding an HTTP target](./targets/http.md)
