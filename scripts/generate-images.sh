#!/bin/bash
# Generate images for Impact-Edu.ai using MuleRouter Nano Banana Pro
# Usage: ./scripts/generate-images.sh

API_KEY="sk-mr-79b55da79b32496b83194ea6704f3cc0f0011b80c3624f6670ebc963169a51ef"
BASE_URL="https://api.mulerouter.ai/vendors/google/v1/nano-banana-pro/generation"
OUTPUT_DIR="/Users/dereklomas/impactedu/public/images/generated"
mkdir -p "$OUTPUT_DIR"

# Submit an image generation task
submit_task() {
  local name="$1"
  local prompt="$2"
  local aspect="${3:-3:4}"

  echo "Submitting: $name"
  result=$(curl -s --request POST \
    --url "$BASE_URL" \
    --header "Authorization: Bearer ${API_KEY}" \
    --header "Content-Type: application/json" \
    --data "{\"prompt\": \"$prompt\", \"aspect_ratio\": \"$aspect\"}")

  task_id=$(echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('task_id',''))" 2>/dev/null)

  if [ -n "$task_id" ] && [ "$task_id" != "" ]; then
    echo "  Task ID: $task_id"
    echo "$name=$task_id" >> "$OUTPUT_DIR/tasks.txt"
  else
    echo "  ERROR: $result"
  fi
}

# Clear previous task list
> "$OUTPUT_DIR/tasks.txt"

# Research page section illustrations
submit_task "research-01-learning-priorities" \
  "Documentary-style overhead photograph of a wooden desk covered with educational materials, old textbook open showing traditional curriculum next to a modern tablet, pencils, sticky notes with handwritten questions, warm natural light from left, paper texture visible, cream and warm brown color palette with one burnt orange accent note, shallow depth of field, academic workspace aesthetic, natural grain" \
  "16:9"

submit_task "research-02-measurement" \
  "Flat lay photograph of printed assessment worksheets spread across a light wooden table, handwritten student answers visible on paper, one worksheet has pencil-drawn branching arrows showing adaptive pathways, scattered pencil shavings, an eraser, a ruler, warm overhead lighting, paper textures prominent, cream and off-white palette with subtle orange annotation marks, documentary still life aesthetic, academic precision" \
  "16:9"

submit_task "research-03-ai-tools" \
  "Documentary photograph of a teacher desk in a real classroom, laptop open showing a simple data dashboard with learning curves, stack of graded papers beside it, red pen, coffee cup, warm afternoon light through classroom windows, background blurred students at desks, warm earth tones cream and brown palette, authentic not staged lived-in workspace feel" \
  "16:9"

submit_task "research-04-equity" \
  "Documentary photograph of students sitting on floor writing on paper in a developing-world classroom, warm golden sunlight streaming through open windows, children focused on handwritten math worksheets, warm earth tones throughout, documentary color grade, dignity and engagement visible in the scene, authentic educational setting" \
  "16:9"

# About page workspace
submit_task "about-workspace" \
  "Environmental photograph of a research workspace table from above, assessment printouts with psychometric data charts spread across surface, laptop showing learning curves, handwritten field notes in a notebook, printed academic papers with highlighted passages, warm desk lamp lighting mixed with natural window light, cream paper color palette, lived-in academic workspace, documentary aesthetic" \
  "4:3"

# Homepage hero image (as fallback if video doesn't work)
submit_task "hero-image" \
  "Cinematic overhead shot of a child hand writing mathematics on lined paper with pencil on a warm wooden desk, handwritten numbers and equations visible, warm golden light from a classroom window, paper grain texture prominent, cream and amber warm tones, documentary color grade, medium format film quality, shallow depth of field" \
  "16:9"

echo ""
echo "All tasks submitted. Task IDs saved to $OUTPUT_DIR/tasks.txt"
echo "Run ./scripts/download-images.sh to check status and download."
