"""
🚀 Image to 3D - Stability AI API
Fast and Complete Image to 3D Conversion
"""

import requests
import os
from datetime import datetime

class Image3DConverter:
    def __init__(self, api_key=None):
        """Initialize with Stability AI API key"""
        
        # Get API key from parameter or environment
        self.api_key = api_key or os.getenv('STABILITY_API_KEY')
        
        if not self.api_key:
            print("⚠️  API Key not found!")
            print("\nHow to set it up:")
            print("  1. Create API Key at: https://platform.stability.ai/account/keys")
            print("  2. Use one of these methods:")
            print("     - In code: converter = Image3DConverter('sk-YOUR-KEY')")
            print("     - Environment Variable: set STABILITY_API_KEY=sk-YOUR-KEY")
            raise ValueError("API Key is required!")
        
        self.base_url = "https://api.stability.ai/v2beta/3d"
        print(f"✅ API Key set")
    
    def image_to_3d(self, image_path, output_path=None, model="fast"):
        """
        Convert image to 3D
        
        Args:
            image_path: Image path (PNG/JPG)
            output_path: Output path (GLB)
            model: "fast" (10 credits) or "point-aware" (4 credits)
        """
        
        print(f"\n{'='*60}")
        print(f"🎨 Converting Image to 3D")
        print(f"{'='*60}")
        
        # Check if image exists
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found: {image_path}")
        
        print(f"📸 Image: {image_path}")
        print(f"⚙️  Model: {model}")
        
        # Choose endpoint
        if model == "fast":
            endpoint = f"{self.base_url}/stable-fast-3d"
            credits = "10 credits"
        elif model == "point-aware":
            endpoint = f"{self.base_url}/stable-point-aware-3d"
            credits = "4 credits"
        else:
            raise ValueError("model must be 'fast' or 'point-aware'")
        
        print(f"💰 Cost: {credits}")
        print(f"\n🔄 Sending request to Stability AI...")
        
        # Prepare request
        with open(image_path, 'rb') as f:
            files = {'image': f}
            data = {
                'texture_resolution': '1024',
                'foreground_ratio': '0.85' if model == "fast" else '1.3'
            }
            
            headers = {
                'Authorization': f'Bearer {self.api_key}'
            }
            
            # Send request
            try:
                response = requests.post(
                    endpoint,
                    headers=headers,
                    files=files,
                    data=data,
                    timeout=120
                )
                
                # Check response
                if response.status_code == 200:
                    print(f"✅ Request successful!")
                    
                    # Save 3D file
                    if output_path is None:
                        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                        output_path = f"model_3d_{timestamp}.glb"
                    
                    with open(output_path, 'wb') as f:
                        f.write(response.content)
                    
                    file_size = len(response.content) / 1024 / 1024
                    print(f"\n{'='*60}")
                    print(f"✅ Complete!")
                    print(f"   3D File: {output_path}")
                    print(f"   Size: {file_size:.2f} MB")
                    print(f"{'='*60}")
                    
                    return output_path
                    
                else:
                    print(f"\n❌ Error: {response.status_code}")
                    print(f"   Response: {response.text}")
                    
                    if response.status_code == 401:
                        print("\n💡 API Key is invalid or inactive")
                    elif response.status_code == 402:
                        print("\n💡 Insufficient credits")
                        print("   Visit: https://platform.stability.ai/account")
                    elif response.status_code == 413:
                        print("\n💡 Image is too large")
                        print("   Size must be less than 10MB")
                    
                    return None
                    
            except requests.exceptions.Timeout:
                print("\n❌ Request timeout (over 2 minutes)")
                print("   Please try again")
                return None
                
            except Exception as e:
                print(f"\n❌ Error: {str(e)}")
                return None
    
    def check_balance(self):
        """Check credit balance"""
        
        print(f"\n{'='*60}")
        print(f"💰 Checking Balance")
        print(f"{'='*60}")
        
        try:
            response = requests.get(
                "https://api.stability.ai/v1/user/balance",
                headers={
                    'Authorization': f'Bearer {self.api_key}'
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                credits = data.get('credits', 0)
                print(f"✅ Your credits: {credits:.2f}")
                return credits
            else:
                print(f"❌ Could not retrieve balance")
                return None
                
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return None


def main():
    """Usage example"""
    
    print("\n" + "="*60)
    print("🎨 Image to 3D - Stability AI")
    print("="*60)
    
    # Setup API key
    api_key = input("\n🔑 Enter API Key (or press Enter for environment variable): ").strip()
    
    if not api_key:
        api_key = os.getenv('STABILITY_API_KEY')
        if not api_key:
            print("\n❌ API Key not found!")
            print("\n💡 How to create an API Key:")
            print("   1. Go to: https://platform.stability.ai/account/keys")
            print("   2. Click 'Create API Key'")
            print("   3. Copy the key (sk-...)")
            print("\n   Then run this program again")
            return
    
    try:
        # Initialize converter
        converter = Image3DConverter(api_key)
        
        # Check balance
        converter.check_balance()
        
        # Get image path
        image_path = input("\n📸 Enter image path: ").strip()
        
        if not image_path:
            print("\n💡 Creating sample image...")
            # Create sample
            from PIL import Image, ImageDraw
            img = Image.new('RGB', (512, 512), 'white')
            draw = ImageDraw.Draw(img)
            draw.ellipse([100, 100, 400, 400], fill='#3498db', outline='black', width=5)
            draw.ellipse([200, 150, 300, 250], fill='white', outline='black', width=3)
            img.save('sample_input.png')
            image_path = 'sample_input.png'
            print(f"✅ Sample image created: {image_path}")
        
        # Choose model
        print("\n⚙️  Select model:")
        print("   1. Fast (10 credits) - Faster")
        print("   2. Point-Aware (4 credits) - Cheaper, better quality")
        
        choice = input("\nChoice (1 or 2): ").strip()
        model = "fast" if choice == "1" else "point-aware"
        
        # Convert
        output = converter.image_to_3d(image_path, model=model)
        
        if output:
            print(f"\n🎉 Success!")
            print(f"\n💡 To view the model:")
            print(f"   - Open in Blender")
            print(f"   - Or: https://3dviewer.net")
            print(f"   - Or: https://gltf-viewer.donmccurdy.com")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")


if __name__ == "__main__":
    main()
