"""
Quick Demo: Image to 3D Converter
Using Stability AI API
"""

import os
import sys
import requests
from PIL import Image, ImageDraw

def create_demo_image():
    """Creates a demo image"""
    print("🎨 Creating demo image...")
    
    # Create a simple image
    img = Image.new('RGB', (512, 512), color='white')
    draw = ImageDraw.Draw(img)
    
    # چەند شێوەیەک بکێشە
    # گۆڵگە
    draw.ellipse([156, 156, 356, 356], fill='#FF6B6B', outline='#C92A2A', width=3)
    # چاوان
    draw.ellipse([206, 206, 246, 246], fill='white')
    draw.ellipse([266, 206, 306, 246], fill='white')
    draw.ellipse([216, 216, 236, 236], fill='black')
    draw.ellipse([276, 216, 296, 236], fill='black')
    # دەم
    draw.arc([206, 246, 306, 316], start=0, end=180, fill='#C92A2A', width=3)
    
    demo_path = "demo_face.png"
    img.save(demo_path)
    print(f"✅ Demo image created: {demo_path}")
    return demo_path

def convert_image_to_3d(api_key, image_path, output_path=None, model="point-aware"):
    """
    Convert image to 3D
    
    Args:
        api_key: Stability AI API key
        image_path: Image path
        output_path: Output path (GLB file)
        model: "fast" or "point-aware"
    """
    
    # Check if image exists
    if not os.path.exists(image_path):
        print(f"❌ Image not found: {image_path}")
        return False
    
    # Set output filename
    if output_path is None:
        base_name = os.path.splitext(os.path.basename(image_path))[0]
        output_path = f"{base_name}_3d.glb"
    
    # Set endpoint based on model
    if model == "fast":
        endpoint = "https://api.stability.ai/v2beta/3d/stable-fast-3d"
        credits = 10
    else:  # point-aware
        endpoint = "https://api.stability.ai/v2beta/3d/stable-point-aware-3d"
        credits = 4
    
    print(f"\n📸 Image: {image_path}")
    print(f"⚙️  Model: {model}")
    print(f"💰 Cost: {credits} credits")
    print(f"📦 Output: {output_path}")
    print(f"\n🔄 Sending request to Stability AI...")
    
    try:
        # Read image
        with open(image_path, "rb") as image_file:
            # Send request
            response = requests.post(
                endpoint,
                headers={
                    "authorization": f"Bearer {api_key}",
                },
                files={
                    "image": image_file
                },
                data={
                    "texture_resolution": 1024,
                    "foreground_ratio": 0.85,
                },
                timeout=120
            )
        
        # Check response
        if response.status_code == 200:
            # Write GLB file
            with open(output_path, 'wb') as f:
                f.write(response.content)
            
            print(f"\n✅ Success!")
            print(f"📦 3D file created: {output_path}")
            print(f"📊 Size: {len(response.content) / 1024:.1f} KB")
            print(f"\n👁️  To view:")
            print(f"   - Blender: File → Import → glTF")
            print(f"   - Online: https://3dviewer.net")
            return True
            
        elif response.status_code == 401:
            print(f"❌ Invalid or inactive API Key")
            print(f"   Go to: https://platform.stability.ai/account/keys")
            return False
            
        elif response.status_code == 402:
            print(f"❌ Insufficient credits")
            print(f"   Go to: https://platform.stability.ai/account/credits")
            return False
            
        elif response.status_code == 413:
            print(f"❌ Image too large (over 10MB)")
            return False
            
        else:
            print(f"❌ Error: {response.status_code}")
            try:
                error_data = response.json()
                print(f"   {error_data}")
            except:
                print(f"   {response.text[:200]}")
            return False
            
    except requests.Timeout:
        print(f"❌ Request timeout (over 2 minutes)")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def main():
    print("🎨 Image to 3D - Quick Demo")
    print("=" * 60)
    
    # Check API Key
    api_key = input("\n🔑 Do you have an API Key? (yes to continue, no for demo): ").strip().lower()
    
    if api_key in ['بەڵێ', 'yes', 'y']:
        # Request API Key
        api_key = input("\n🔑 Enter your API Key: ").strip()
        
        if not api_key:
            print("❌ You must enter an API Key")
            return
        
        # Request image path
        image_path = input("📸 Enter image path: ").strip().strip('"').strip("'")
        
        if not image_path:
            print("❌ You must enter an image path")
            return
        
    else:
        # Quick demo without API Key
        print("\n📌 Quick Demo:")
        print("   1. A sample image will be created")
        print("   2. You need an API Key for real conversion")
        print("   3. Get one at: https://platform.stability.ai/account/keys")
        
        # Create demo image
        image_path = create_demo_image()
        
        print(f"\n✅ Ready!")
        print(f"📸 Demo image: {image_path}")
        print(f"\nFor real conversion:")
        print(f"   python demo-image-to-3d.py")
        print(f"   Then type 'yes' and enter your API Key")
        return
    
    # Model selection
    print(f"\n⚙️  Select model:")
    print(f"   1. Fast (10 credits) - Faster")
    print(f"   2. Point-Aware (4 credits) - Cheaper, better quality")
    model_choice = input("Choice (1 or 2): ").strip()
    
    model = "fast" if model_choice == "1" else "point-aware"
    
    # Convert
    success = convert_image_to_3d(api_key, image_path, model=model)
    
    if success:
        print(f"\n🎉 Complete!")
    else:
        print(f"\n⚠️  Failed")

if __name__ == "__main__":
    main()
