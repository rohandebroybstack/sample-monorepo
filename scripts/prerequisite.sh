#!/bin/bash
set -e

PRODUCT_NAME=$1
ENV=$2

pnpm install --frozen-lockfile
pnpm build:package