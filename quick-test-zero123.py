"""
🚀 Quick Start - Stable Zero123
نموونەیەکی خێرا بۆ تاقیکردنەوە
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_sample_image():
    """دروستکردنی وێنەیەکی نموونە بۆ تاقیکردنەوە"""
    
    # Create a simple 3D-looking shape
    img = Image.new('RGB', (512, 512), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw a simple cube-like shape
    # Front face
    draw.polygon([(150, 200), (350, 200), (350, 400), (150, 400)], fill='#3498db', outline='black')
    
    # Top face (perspective)
    draw.polygon([(150, 200), (256, 150), (456, 150), (350, 200)], fill='#5dade2', outline='black')
    
    # Right face
    draw.polygon([(350, 200), (456, 150), (456, 350), (350, 400)], fill='#2874a6', outline='black')
    
    # Add text
    try:
        draw.text((200, 450), "Test Object", fill='black')
    except:
        pass
    
    # Save
    img.save('input.png')
    print("✅ وێنەی نموونە دروست کرا: input.png")
    return 'input.png'

def quick_test():
    """تاقیکردنەوەیەکی خێرا"""
    
    print("=" * 60)
    print("🚀 تاقیکردنەوەی خێرای Stable Zero123")
    print("=" * 60)
    print()
    
    # Check if input image exists
    if not os.path.exists('input.png'):
        print("📸 دروستکردنی وێنەی نموونە...")
        create_sample_image()
        print()
    
    print("🔄 دەستپێکردنی Zero123...")
    print()
    
    try:
        import sys
        sys.path.insert(0, 'C:\\A')
        from zero123_converter import Zero123Converter
        
        # Initialize
        converter = Zero123Converter()
        
        # Generate views (fewer for quick test)
        print("\n📸 دروستکردنی دیمەنەکان...")
        views = converter.generate_views(
            image_path='input.png',
            num_views=6,  # 6 دیمەن تەنها بۆ خێرایی
            output_dir='quick_test_output'
        )
        
        # Create 3D
        print("\n🎯 دروستکردنی مۆدێلی سێدوری...")
        converter.create_point_cloud(
            views,
            'quick_test_output/model.obj'
        )
        
        print("\n" + "=" * 60)
        print("✅ تاقیکردنەوە سەرکەوتوو بوو!")
        print("   دیمەنەکان: quick_test_output/")
        print("   مۆدێلی سێدوری: quick_test_output/model.obj")
        print("=" * 60)
        
    except ImportError as e:
        print("❌ هەڵە: پێویستەکان دانەمەزراون")
        print(f"   {str(e)}")
        print("\n💡 تکایە بەکار بهێنە: setup-zero123.bat")
    except Exception as e:
        print(f"❌ هەڵە: {str(e)}")
        print("\n💡 سەیری ZERO123_README.md بکە بۆ یارمەتی")

if __name__ == "__main__":
    quick_test()
