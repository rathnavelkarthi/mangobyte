import os
from PIL import Image, ImageDraw

def create_mangobite_icon(size, is_maskable=False):
    # Base image
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    bg_color = (27, 12, 23, 255) # Aubergine deep #1b0c17
    copper = (190, 90, 44, 255) # Copper #be5a2c
    copper_light = (190, 90, 44, 140)
    paper = (236, 229, 222, 255) # #ece5de

    if is_maskable:
        # Full bleed square for Android maskable icon
        draw.rectangle([0, 0, size, size], fill=bg_color)
    else:
        # Rounded squircle
        corner_radius = int(size * 0.2)
        draw.rounded_rectangle([0, 0, size, size], radius=corner_radius, fill=bg_color)

    center = size / 2.0
    scale = size / 512.0

    # Grid background dots
    grid_step = max(int(24 * scale), 8)
    for x in range(grid_step, size, grid_step):
        for y in range(grid_step, size, grid_step):
            draw.point((x, y), fill=(190, 90, 44, 30))

    # Outer dashed-like circle
    r1 = 170 * scale
    draw.ellipse([center - r1, center - r1, center + r1, center + r1], outline=copper_light, width=max(1, int(2 * scale)))

    # Mid circle
    r2 = 125 * scale
    draw.ellipse([center - r2, center - r2, center + r2, center + r2], outline=(190, 90, 44, 180), width=max(1, int(2 * scale)))

    # Inner circle
    r3 = 70 * scale
    draw.ellipse([center - r3, center - r3, center + r3, center + r3], outline=copper, width=max(2, int(3 * scale)))

    # Crosshairs
    margin = 40 * scale
    lw = max(1, int(2 * scale))
    draw.line([center, margin, center, size - margin], fill=copper_light, width=lw)
    draw.line([margin, center, size - margin, center], fill=copper_light, width=lw)

    # Center dot
    r_center = 24 * scale
    draw.ellipse([center - r_center, center - r_center, center + r_center, center + r_center], fill=copper)

    # White cross in center
    cw = 12 * scale
    clw = max(1, int(2.5 * scale))
    draw.line([center, center - cw, center, center + cw], fill=paper, width=clw)
    draw.line([center - cw, center, center + cw, center], fill=paper, width=clw)

    # Corner brackets
    bracket_offset = 120 * scale
    bracket_len = 16 * scale
    corners = [
        (center - bracket_offset, center - bracket_offset, 1, 1),
        (center + bracket_offset, center - bracket_offset, -1, 1),
        (center - bracket_offset, center + bracket_offset, 1, -1),
        (center + bracket_offset, center + bracket_offset, -1, -1),
    ]
    for cx, cy, dx, dy in corners:
        draw.line([cx, cy, cx + dx * bracket_len, cy], fill=paper, width=max(1, int(1.5 * scale)))
        draw.line([cx, cy, cx, cy + dy * bracket_len], fill=paper, width=max(1, int(1.5 * scale)))

    return img

out_dir = r'c:\Users\rathn\OneDrive\Pictures\mangobyte\apps\web\public\icons'
os.makedirs(out_dir, exist_ok=True)

# 192x192
create_mangobite_icon(192).save(os.path.join(out_dir, 'icon-192.png'))
# 512x512
create_mangobite_icon(512).save(os.path.join(out_dir, 'icon-512.png'))
# Maskable 512x512
create_mangobite_icon(512, is_maskable=True).save(os.path.join(out_dir, 'icon-maskable-512.png'))
# Apple touch icon 180x180
create_mangobite_icon(180).save(os.path.join(out_dir, 'apple-touch-icon.png'))
# Favicon 64x64
create_mangobite_icon(64).save(os.path.join(out_dir, 'favicon-64.png'))

print('Generated all PWA icons successfully.')
