#!/bin/bash

export NEW_RELIC_NO_CONFIG_FILE=true

if [ -z "$NEW_RELIC_LICENSE_KEY" ] || [ -z "$NEW_RELIC_APP_NAME" ]; then
  export NEW_RELIC_ENABLED=false
  echo "Don't enable newrelic because some variable is not set"
  return 0
fi

export NEW_RELIC_ENABLED=true
export NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
export NEW_RELIC_LOG=stdout

echo "Enable newrelic"