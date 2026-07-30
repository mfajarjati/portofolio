from pathlib import Path
from PIL import Image
import io
import os

SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg"}

# ==========================
# TARGET SIZE
# ==========================
MIN_SIZE_KB = 100
MAX_SIZE_KB = 500

MIN_BYTES = MIN_SIZE_KB * 1024
MAX_BYTES = MAX_SIZE_KB * 1024

current_folder = Path(__file__).parent

print(f"Scanning: {current_folder}\n")


def compress_jpeg(image: Image.Image, output_path: Path):
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    low = 20
    high = 95

    best_bytes = None

    while low <= high:
        quality = (low + high) // 2

        buffer = io.BytesIO()

        image.save(
            buffer,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )

        size = buffer.tell()

        if size > MAX_BYTES:
            high = quality - 1
        else:
            best_bytes = buffer.getvalue()
            low = quality + 1

    if best_bytes is None:
        buffer = io.BytesIO()
        image.save(
            buffer,
            format="JPEG",
            quality=20,
            optimize=True,
            progressive=True,
        )
        best_bytes = buffer.getvalue()

    with open(output_path, "wb") as f:
        f.write(best_bytes)


def compress_png(image: Image.Image, output_path: Path):
    # Optimasi PNG biasa
    image.save(
        output_path,
        format="PNG",
        optimize=True,
        compress_level=9,
    )

    if os.path.getsize(output_path) <= MAX_BYTES:
        return

    # Jika masih besar, ubah ke palette 256 warna
    palette_img = image.convert("P", palette=Image.ADAPTIVE, colors=256)

    palette_img.save(
        output_path,
        format="PNG",
        optimize=True,
        compress_level=9,
    )


for image_path in current_folder.rglob("*"):

    if not image_path.is_file():
        continue

    if image_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
        continue

    try:

        before = os.path.getsize(image_path)

        with Image.open(image_path) as img:

            if image_path.suffix.lower() == ".png":
                compress_png(img, image_path)
            else:
                compress_jpeg(img, image_path)

        after = os.path.getsize(image_path)

        print(
            f"{image_path.relative_to(current_folder)} "
            f"{before/1024:.1f} KB → {after/1024:.1f} KB"
        )

    except Exception as e:
        print(f"Failed: {image_path}")
        print(e)

print("\nFinished!")