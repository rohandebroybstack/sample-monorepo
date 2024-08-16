#!/bin/bash

SUFFIX=$1

if ! command -v zip >/dev/null 2>&1 ;then
  apk add --update --no-cache zip
fi

if ! command -v jq >/dev/null 2>&1 ;then
  brew install jq
fi

version=`jq '.version' dist/manifest.json`
final_version=`echo "$version" | tr -d '"'`

name="${final_version}${SUFFIX}"
zip_name="[WS]${final_version}${SUFFIX}"

echo "Creating build artifact for ${name}"

mv dist $name
zip -r "${zip_name}.zip" $name -x "*/.*" -x "*/*.map"
rm -rf $name
