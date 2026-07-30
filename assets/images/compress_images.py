from pathlib import Path
from PIL import Image
import os

SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg"}

current_folder = Path(__file__).parent

print(f"Scanning: {current_folder}\n")

for image_path in current_folder.rglob("*"):
    if not image_path.is_file():
        continue

    if image_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
        continue

    try:
        before = os.path.getsize(image_path)

        with Image.open(image_path) as img:
            if image_path.suffix.lower() == ".png":
                img.save(
                    image_path,
                    format="PNG",
                    optimize=True,
                    compress_level=9,
                )
            else:
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                img.save(
                    image_path,
                    format="JPEG",
                    quality=85,
                    optimize=True,
                    progressive=True,
                )

        after = os.path.getsize(image_path)

        print(
            f"{image_path.relative_to(current_folder)} "
            f"{before/1024:.1f} KB → {after/1024:.1f} KB"
        )

    except Exception as e:
        print(f"Failed: {image_path}")
        print(e)

print("\nFinished!")