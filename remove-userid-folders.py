import shutil
import os

paths_to_remove = [
    r"C:\A\app\api\settings\[userId]",
    r"C:\A\app\api\users\[userId]"
]

for path in paths_to_remove:
    if os.path.exists(path):
        try:
            shutil.rmtree(path)
            print(f"✅ Removed: {path}")
        except Exception as e:
            print(f"❌ Error removing {path}: {e}")
    else:
        print(f"⚠️  Does not exist: {path}")
