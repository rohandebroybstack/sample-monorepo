#!/bin/bash
set -e

PRODUCT_NAME=$1
ENV=$2

export BSTACK_APP_ENV=$2
pnpm --filter ./apps/$1 run build --mode=$2