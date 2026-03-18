---
name: side-by-side-images
description: Places two images side by side in Docusaurus MDX with matching heights. Use when the user asks to put two photos "side by side", "next to each other", or "beside each other" in a docs page.
---

# Side-by-side images

Place two images side by side in a Docusaurus MDX file, automatically sizing them so they render at the same height.

## When to apply

- User asks to place two images "side by side", "next to each other", or "beside each other"
- User asks to put photos in a row or in columns

## Workflow

### 1. Identify the two images

Get the file paths for both images. They should be in an `img/` folder relative to the doc, or the user will provide them.

### 2. Calculate equal-height width percentages

Use Python with Pillow to read both image dimensions and compute the width each image needs so they render at the same height.

```python
python3 -c "
from PIL import Image
img1 = Image.open('PATH_TO_IMAGE_1')
img2 = Image.open('PATH_TO_IMAGE_2')
r1 = img1.size[0] / img1.size[1]  # aspect ratio of image 1
r2 = img2.size[0] / img2.size[1]  # aspect ratio of image 2
available = 95  # leave 5% for the gap
pct1 = round(r1 / (r1 + r2) * available)
pct2 = round(r2 / (r1 + r2) * available)
print(f'Image 1: {pct1}%  Image 2: {pct2}%')
"
```

The formula: given aspect ratios `r1 = w1/h1` and `r2 = w2/h2`, widths proportional to aspect ratios produce equal rendered heights:

- `pct1 = r1 / (r1 + r2) * 95`
- `pct2 = r2 / (r1 + r2) * 95`

The `95` leaves room for the 16px flex gap.

### 3. Generate the MDX markup

Use this template, replacing the paths and percentages:

```mdx
<div style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
<img src={require('./img/FOLDER/IMAGE_1.png').default} alt="ALT_TEXT_1" style={{width: 'PCT1%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
<img src={require('./img/FOLDER/IMAGE_2.png').default} alt="ALT_TEXT_2" style={{width: 'PCT2%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
</div>
```

Key details:
- `alignItems: 'flex-start'` keeps images top-aligned
- The `require().default` pattern is required for Docusaurus image imports
- The border, radius, and shadow match the project standard from `CLAUDE.md`

### 4. Insert into the target file

Replace or add the markup at the location the user specifies in the `.mdx` file.

## Edge cases

- **Very different aspect ratios** (e.g. one image is 10:1 and the other is 1:1): one image will be extremely narrow. Warn the user and suggest stacking them vertically instead if either percentage falls below 15%.
- **User wants a specific image wider**: adjust the `available` split manually. For example, to make image 2 take more space, increase its percentage and decrease image 1's by the same amount.
- **More than two images**: extend the formula. For n images with aspect ratios r1..rn: `pct_i = r_i / sum(r1..rn) * (100 - (n-1) * gap_pct)`.
