#!/usr/bin/env bash

# cd to the root of the repo
cd "$(git rev-parse --show-toplevel)"

yarn build:forge

cp -r artifacts contracts/