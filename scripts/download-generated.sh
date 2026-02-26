#!/bin/bash
# Download completed MuleRouter images for Impact-Edu.ai
# Usage: ./scripts/download-generated.sh

API_KEY="sk-mr-79b55da79b32496b83194ea6704f3cc0f0011b80c3624f6670ebc963169a51ef"
BASE_URL="https://api.mulerouter.ai/vendors/google/v1/nano-banana-pro/generation"
OUTPUT_DIR="/Users/dereklomas/impactedu/public/images/generated"
TASKS_FILE="$OUTPUT_DIR/tasks.txt"

if [ ! -f "$TASKS_FILE" ]; then
  echo "No tasks file found. Run generate-images.sh first."
  exit 1
fi

while IFS='=' read -r name task_id; do
  [ -z "$name" ] && continue
  echo "Checking $name ($task_id)..."

  result=$(curl -s --request GET \
    --url "${BASE_URL}/${task_id}" \
    --header "Authorization: Bearer ${API_KEY}")

  task_status=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('task_info',{}).get('status','unknown'))" 2>/dev/null)
  echo "  Status: $task_status"

  if [ "$task_status" = "completed" ]; then
    image_url=$(echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['images'][0] if d.get('images') else '')" 2>/dev/null)
    if [ -n "$image_url" ]; then
      echo "  Downloading..."
      curl -sL "$image_url" -o "${OUTPUT_DIR}/${name}.png"
      echo "  -> Saved to ${name}.png"
    fi
  fi
  echo ""
done < "$TASKS_FILE"

echo "Done. Check $OUTPUT_DIR for results."
