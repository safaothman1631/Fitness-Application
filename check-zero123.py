"""
✅ چێک کردنی دامەزراندن
"""

print("=" * 60)
print("📦 چێککردنی پێداویستییەکان بۆ Stable Zero123")
print("=" * 60)
print()

# Check Python version
import sys
print(f"✅ Python: {sys.version.split()[0]}")

# Check packages
packages = {
    'torch': 'PyTorch',
    'diffusers': 'Diffusers',
    'transformers': 'Transformers',
    'accelerate': 'Accelerate',
    'PIL': 'Pillow',
    'numpy': 'NumPy',
    'trimesh': 'Trimesh',
    'scipy': 'SciPy'
}

installed = []
missing = []

for package, name in packages.items():
    try:
        if package == 'PIL':
            import PIL
            version = PIL.__version__
        else:
            module = __import__(package)
            version = module.__version__ if hasattr(module, '__version__') else '✓'
        print(f"✅ {name}: {version}")
        installed.append(name)
    except ImportError:
        print(f"❌ {name}: دانەمەزراوە")
        missing.append(name)

print()
print("=" * 60)

if missing:
    print(f"⚠️  {len(missing)} پێداویستی دانەمەزراوە:")
    for m in missing:
        print(f"   - {m}")
    print("\n💡 بۆ دامەزراندن:")
    print("   setup-zero123.bat")
else:
    print(f"✅ هەموو پێداویستییەکان دامەزراون ({len(installed)} پاکێج)")
    
    # Check CUDA
    import torch
    print()
    if torch.cuda.is_available():
        print(f"✅ CUDA بەردەستە")
        print(f"   GPU: {torch.cuda.get_device_name(0)}")
        print(f"   بیرەوەری GPU: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")
    else:
        print(f"⚠️  CUDA بەردەست نییە - لەسەر CPU کار دەکات")
        print(f"   (زۆر هێواش دەبێت - پێشنیار ناکرێت)")

print()
print("=" * 60)

# Installation command
print("\n📝 بۆ بەکارهێنان:")
print("   python test-zero123-simple.py")
print()
