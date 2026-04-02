#!/bin/sh
export NODE_OPTIONS='--require ./polyfill.cjs'
exec node_modules/.bin/next start
