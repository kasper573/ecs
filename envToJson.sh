#!/bin/bash

input=$1
output=$2

# Recreate output
rm -f "$output"
touch "$output"

# Add assignment
echo "{" >> "$output"

# Read each line in .env input
# Each line represents key=value pairs
lastLine=$(wc -l < "$input")
currentLine=0
while read -r line || [[ -n "$line" ]]; do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    key=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    envValue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!key}")
  # Otherwise use value from .env input
  [[ -z $value ]] && value=${envValue}

  # Append configuration property to JS input
  echo -n "  \"$key\": \"$value\"" >> "$output"
  if [[ $currentLine -ne $lastLine ]]; then
    echo "," >> "$output"
  else
    echo "" >> "$output"
  fi
  currentLine=$(("$currentLine" + 1))
done < "$input"

echo "}" >> "$output"