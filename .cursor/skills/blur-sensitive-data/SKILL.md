---
name: blur-sensitive-data
description: Blurs sensitive text (names, addresses, prices, emails, PII) in screenshot images with individual translucent blurs per text element. Use when the user asks to blur, redact, or hide sensitive data in a screenshot, or when adding screenshots that contain PII to documentation.
---

# Blur sensitive data in screenshots

Apply individual translucent Gaussian blurs to sensitive text in screenshot images. Each piece of text gets its own blur — the result preserves the color tone (blue links, gray addresses, dark prices) while making the text unreadable. This avoids large opaque blocks.

## When to apply

- User asks to "blur", "redact", or "hide" sensitive info in a screenshot
- User provides a screenshot with account names, addresses, prices, emails, or other PII
- Per `CLAUDE.md`: "Blur or replace sensitive data (PII) in screenshots"

## Workflow

### 1. Identify what to blur

Ask the user (or infer from context) which regions contain sensitive data. Common targets:

| Data type | How to identify |
|---|---|
| Account names | Blue link text in a list/table column |
| Addresses | Gray text below account names |
| Prices / amounts | Dollar amounts in a column |
| Email addresses | Text containing `@` |
| Phone numbers | Numeric sequences |
| Person names | Text in name columns |

### 2. Determine the pixel column ranges

Open the image and identify the x-coordinate range for each column of sensitive data. Use the image viewer or read the image to estimate.

### 3. Detect text positions automatically

Use this Python pattern to scan for text pixels in a given x-range. It detects rows of dark or colored pixels (text) against a light background.

```python
from PIL import Image, ImageFilter

img = Image.open('screenshot.png')
pixels = img.load()

def detect_text_regions(image, x_start, x_end, y_start, y_end, threshold=500):
    """Find vertical spans of text by scanning for dark/colored pixels."""
    pixels = image.load()
    regions = []
    in_text = False
    text_start = 0
    for y in range(y_start, y_end):
        has_text = False
        for x in range(x_start, x_end, 2):
            r, g, b = pixels[x, y][:3]
            if (r + g + b) < threshold:
                has_text = True
                break
        if has_text and not in_text:
            in_text = True
            text_start = y
        elif not has_text and in_text:
            in_text = False
            regions.append((text_start, y))
    if in_text:
        regions.append((text_start, y_end))
    return regions
```

**Threshold tuning:**
- `threshold=500` works for most text (dark gray/black/blue on white)
- For very light gray text, lower to ~400
- For colored text on colored backgrounds, adjust per case

### 4. Apply translucent blur to each region

Blur each detected text region individually with padding. The blur smudges the text but preserves color.

```python
def translucent_blur(image, box, blur_radius=6, passes=4):
    """Blur a region so text is unreadable but color shows through."""
    x1, y1, x2, y2 = box
    pad = 4
    cx1 = max(0, x1 - pad)
    cy1 = max(0, y1 - pad)
    cx2 = min(image.width, x2 + pad)
    cy2 = min(image.height, y2 + pad)
    region = image.crop((cx1, cy1, cx2, cy2))
    for _ in range(passes):
        region = region.filter(ImageFilter.GaussianBlur(blur_radius))
    image.paste(region, (cx1, cy1))
```

### 5. Full script template

Combine detection and blurring for each sensitive column:

```python
from PIL import Image, ImageFilter

img = Image.open('INPUT_PATH')
pixels = img.load()

def detect_text_regions(image, x_start, x_end, y_start, y_end, threshold=500):
    pixels = image.load()
    regions = []
    in_text = False
    text_start = 0
    for y in range(y_start, y_end):
        has_text = False
        for x in range(x_start, x_end, 2):
            r, g, b = pixels[x, y][:3]
            if (r + g + b) < threshold:
                has_text = True
                break
        if has_text and not in_text:
            in_text = True
            text_start = y
        elif not has_text and in_text:
            in_text = False
            regions.append((text_start, y))
    if in_text:
        regions.append((text_start, y_end))
    return regions

def translucent_blur(image, box, blur_radius=6, passes=4):
    x1, y1, x2, y2 = box
    pad = 4
    cx1, cy1 = max(0, x1 - pad), max(0, y1 - pad)
    cx2, cy2 = min(image.width, x2 + pad), min(image.height, y2 + pad)
    region = image.crop((cx1, cy1, cx2, cy2))
    for _ in range(passes):
        region = region.filter(ImageFilter.GaussianBlur(blur_radius))
    image.paste(region, (cx1, cy1))

# Define columns to blur: (x_start, x_end, y_start, y_end)
# Adjust these coordinates based on the screenshot
COLUMNS_TO_BLUR = [
    (185, 240, 148, 600),   # e.g. prices column
    (480, 690, 148, 600),   # e.g. account names + addresses
]

for x1, x2, y_start, y_end in COLUMNS_TO_BLUR:
    regions = detect_text_regions(img, x1, x2, y_start, y_end)
    for y1, y2 in regions:
        translucent_blur(img, (x1, y1 - 2, x2, y2 + 2))

img.save('OUTPUT_PATH')
```

### 6. Verify the result

Read the output image to confirm:
- All sensitive text is unreadable
- Color tones are preserved (blue for links, gray for addresses, etc.)
- Each text element has its own individual blur (no big blocks)
- Non-sensitive content (headers, dates, statuses, UI elements) is untouched

If any text is still readable, widen the x-range or lower the detection threshold.

## Tuning parameters

| Parameter | Default | Effect |
|---|---|---|
| `blur_radius` | 6 | Higher = more blur spread. Use 8-10 for larger text |
| `passes` | 4 | More passes = less readable. 3-5 is the sweet spot |
| `pad` | 4 | Padding around detected text. Increase if text edges leak |
| `threshold` | 500 | RGB sum threshold for "is this a text pixel?". Lower = catches lighter text |

## Common pitfalls

- **Text still readable**: increase `passes` to 5-6 or `blur_radius` to 8
- **Blur covers too much**: narrow the x-range for the column, or raise `threshold`
- **Missed text at edges**: the detection scans every 2nd pixel for speed. If sparse text is missed, change `range(x_start, x_end, 2)` to `range(x_start, x_end)`
- **Headers getting blurred**: set `y_start` below the header row
