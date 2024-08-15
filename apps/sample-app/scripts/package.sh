#!/bin/bash

SUFFIX=$2
MOVE_TO_ROOT=$1

if ! command -v zip >/dev/null 2>&1 ;then
  apk add --update --no-cache zip
fi

if ! command -v jq >/dev/null 2>&1 ;then
  brew install jq
fi

cd "dist"

version=`jq '.version' manifest.json`
final_version=`echo "$version" | tr -d '"'`

name="${final_version}${SUFFIX}"

echo "Creating build artifact for ${name}"

if [ "$MOVE_TO_ROOT" == "true" ]; then
  # Build for local development
  zip -r "${name}.zip" . -x "*/.*" -x "*/*.map"
  mv "${name}.zip" ../
else
  # build for env like dev-staging, qa, production
  current_time=$(date "+%Y-%b-%d-%H.%M.%S-%Z")
  name_for_s3="${name}-[${current_time}]"
  zip -r "${name_for_s3}.zip" . -x "*/.*" -x "*/*.map"
  cp ${name_for_s3}.zip "$WORKSPACE/$name.zip"
fi
