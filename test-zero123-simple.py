"""
🎨 Stable Zero123 Simple Test
تاقیکردنەوەیەکی سادە بۆ Zero123
"""

import torch
from PIL import Image, ImageDraw
import os

def create_test_image():
    """دروستکردنی وێنەیەکی نموونە"""
    print("📸 دروستکردنی وێنەی نموونە...")
    
    img = Image.new('RGB', (512, 512), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw a simple 3D cube
    # Front face
    draw.polygon([(150, 200), (350, 200), (350, 400), (150, 400)], fill='#3498db', outline='black', width=3)
    
    # Top face
    draw.polygon([(150, 200), (256, 150), (456, 150), (350, 200)], fill='#5dade2', outline='black', width=3)
    
    # Right face
    draw.polygon([(350, 200), (456, 150), (456, 350), (350, 400)], fill='#2874a6', outline='black', width=3)
    
    img.save('test_cube.png')
    print("✅ وێنە دروست کرا: test_cube.png")
    return 'test_cube.png'

def test_zero123():
    """تاقیکردنەوەی Zero123"""
    
    print("\n" + "=" * 60)
    print("🎨 تاقیکردنەوەی Stable Zero123")
    print("=" * 60)
    
    # Check PyTorch
    print(f"\n📦 بەرنامەکان:")
    print(f"   PyTorch: {torch.__version__}")
    print(f"   CUDA Available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"   GPU: {torch.cuda.get_device_name(0)}")
    
    # Create test image
    image_path = create_test_image()
    
    # Try to load Zero123
    print(f"\n🔄 بارکردنی مۆدێلی Zero123...")
    
    try:
        from diffusers import DiffusionPipeline
        
        print("   دابەزاندنی مۆدێل لە HuggingFace...")
        print("   (ئەمە کاتێکی زۆر دەخایەنێت بۆ یەکەم جار - ~2GB)")
        
        # Load Zero123 model
        pipe = DiffusionPipeline.from_pretrained(
            "stabilityai/stable-zero123-diffusion",
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            variant="fp16" if torch.cuda.is_available() else None
        )
        
        device = "cuda" if torch.cuda.is_available() else "cpu"
        pipe = pipe.to(device)
        
        print(f"\n✅ مۆدێل بارکرا لەسەر: {device}")
        
        # Load test image
        input_image = Image.open(image_path).convert("RGB")
        
        # Generate one view
        print(f"\n📸 دروستکردنی دیمەنێک...")
        
        output = pipe(
            image=input_image,
            num_inference_steps=30,  # کەمتر بۆ خێرایی
            guidance_scale=7.5,
        ).images[0]
        
        output.save('test_output_view.png')
        print(f"✅ دیمەن دروست کرا: test_output_view.png")
        
        print("\n" + "=" * 60)
        print("✅ تاقیکردنەوە سەرکەوتوو بوو!")
        print("   وێنەی سەرەکی: test_cube.png")
        print("   دیمەنی دروست کراو: test_output_view.png")
        print("=" * 60)
        
    except ImportError as e:
        print(f"\n❌ کێشە لە دامەزراندنی پێداویستییەکان")
        print(f"   {str(e)}")
        print("\n💡 تکایە ئەمانە جێبەجێ بکە:")
        print("   pip install diffusers transformers accelerate")
        
    except Exception as e:
        print(f"\n❌ هەڵە: {str(e)}")
        print("\n💡 ئەگەر GPU نیت، مۆدێلەکە لەسەر CPU کار دەکات")
        print("   بەڵام زۆر هێواش دەبێت (چەند دەقیقە بۆ هەر دیمەنێک)")

if __name__ == "__main__":
    test_zero123()
