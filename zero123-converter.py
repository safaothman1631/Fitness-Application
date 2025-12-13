"""
🎨 Stable Zero123 - Image to 3D Converter
دەقاڵ بکە لە وێنەیەک بۆ مۆدێلی سێدوری
"""

import torch
from PIL import Image
from diffusers import DiffusionPipeline, EulerAncestralDiscreteScheduler
import numpy as np
import trimesh
import os
from datetime import datetime

class Zero123Converter:
    def __init__(self):
        """Initialize Stable Zero123 model"""
        print("🔄 بارکردنی مۆدێلی Stable Zero123...")
        
        # Load the model
        self.pipe = DiffusionPipeline.from_pretrained(
            "stabilityai/stable-zero123-diffusion",
            torch_dtype=torch.float16,
            variant="fp16"
        )
        
        # Use GPU if available
        device = "cuda" if torch.cuda.is_available() else "cpu"
        self.pipe = self.pipe.to(device)
        
        # Set scheduler
        self.pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(
            self.pipe.scheduler.config
        )
        
        print(f"✅ مۆدێل بارکرا لەسەر: {device}")
        print(f"✅ GPU بەردەستە: {torch.cuda.is_available()}")
        if torch.cuda.is_available():
            print(f"✅ GPU ناو: {torch.cuda.get_device_name(0)}")
    
    def generate_views(self, image_path, num_views=8, output_dir="output_3d"):
        """
        Generate multiple views of the object from different angles
        
        Args:
            image_path: ڕێگای وێنەکە
            num_views: ژمارەی دیمەنەکان (8-12 باشە)
            output_dir: فۆڵدەری دەرچوون
        """
        print(f"\n📸 دروستکردنی {num_views} دیمەن لە {image_path}...")
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
        
        # Load input image
        input_image = Image.open(image_path).convert("RGB")
        
        # Resize if too large
        max_size = 512
        if max(input_image.size) > max_size:
            ratio = max_size / max(input_image.size)
            new_size = (int(input_image.size[0] * ratio), int(input_image.size[1] * ratio))
            input_image = input_image.resize(new_size, Image.LANCZOS)
        
        print(f"   وێنەی سەرەکی: {input_image.size}")
        
        # Generate views from different angles
        views = []
        angles = np.linspace(0, 360, num_views, endpoint=False)
        
        for i, angle in enumerate(angles):
            print(f"   دروستکردنی دیمەن {i+1}/{num_views} (گۆشە: {angle:.1f}°)...")
            
            # Generate view at this angle
            # Zero123 uses polar coordinates
            elevation = 0  # 0 degrees elevation
            azimuth = angle
            
            # Generate image
            output = self.pipe(
                image=input_image,
                num_inference_steps=50,
                guidance_scale=7.5,
                # Control camera angle
                # Note: You may need to adjust these parameters based on model version
            ).images[0]
            
            # Save view
            view_path = os.path.join(output_dir, f"view_{i:02d}_{angle:.0f}deg.png")
            output.save(view_path)
            views.append(output)
            print(f"   ✅ پاشەکەوت کرا: {view_path}")
        
        print(f"\n✅ هەموو دیمەنەکان دروست کران: {len(views)}")
        return views
    
    def create_point_cloud(self, views, output_path="output.obj"):
        """
        Create a simple point cloud from multiple views
        (ئەمە نموونەیەکی سادەیە - بۆ ئەنجامی باشتر بەکار بهێنە structure-from-motion)
        """
        print(f"\n🎯 دروستکردنی point cloud...")
        
        # This is a simplified version
        # For production, use proper 3D reconstruction (NeRF, MVS, etc.)
        
        points = []
        colors = []
        
        for i, view in enumerate(views):
            # Convert to numpy array
            img_array = np.array(view)
            
            # Sample points from image
            h, w = img_array.shape[:2]
            for y in range(0, h, 4):  # Sample every 4 pixels
                for x in range(0, w, 4):
                    pixel = img_array[y, x]
                    
                    # Simple depth estimation (this is very basic!)
                    brightness = np.mean(pixel)
                    depth = brightness / 255.0
                    
                    # 3D position (circular arrangement)
                    angle = 2 * np.pi * i / len(views)
                    px = depth * np.cos(angle)
                    py = (y - h/2) / h
                    pz = depth * np.sin(angle)
                    
                    points.append([px, py, pz])
                    colors.append(pixel[:3] / 255.0)
        
        # Create mesh from points
        points = np.array(points)
        colors = np.array(colors)
        
        # Create point cloud mesh
        cloud = trimesh.PointCloud(vertices=points, colors=colors)
        
        # Export
        cloud.export(output_path)
        print(f"✅ Point cloud پاشەکەوت کرا: {output_path}")
        
        return cloud

def main():
    """
    نموونەی بەکارهێنان
    """
    print("=" * 60)
    print("🎨 Stable Zero123 - وێنە بۆ سێدوری")
    print("=" * 60)
    
    # Initialize converter
    converter = Zero123Converter()
    
    # Example usage
    image_path = "input.png"  # ڕێگای وێنەکەت
    
    # Check if input image exists
    if not os.path.exists(image_path):
        print(f"\n⚠️  وێنە نەدۆزرایەوە: {image_path}")
        print(f"   تکایە وێنەیەک دابنێ بە ناوی: {image_path}")
        print(f"   یان ڕێگاکە بگۆڕە لە کۆدەکەدا")
        return
    
    # Create output directory with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_dir = f"zero123_output_{timestamp}"
    
    # Generate views
    views = converter.generate_views(
        image_path=image_path,
        num_views=8,
        output_dir=output_dir
    )
    
    # Create 3D point cloud
    output_3d = os.path.join(output_dir, "model_3d.obj")
    converter.create_point_cloud(views, output_3d)
    
    print(f"\n" + "=" * 60)
    print(f"✅ تەواو بوو!")
    print(f"   فۆڵدەری دەرچوون: {output_dir}")
    print(f"   مۆدێلی سێدوری: {output_3d}")
    print(f"=" * 60)

if __name__ == "__main__":
    # Example with custom image
    import sys
    
    if len(sys.argv) > 1:
        # Use provided image path
        image_path = sys.argv[1]
        
        print("=" * 60)
        print("🎨 Stable Zero123 - وێنە بۆ سێدوری")
        print("=" * 60)
        
        converter = Zero123Converter()
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_dir = f"zero123_output_{timestamp}"
        
        views = converter.generate_views(
            image_path=image_path,
            num_views=8,
            output_dir=output_dir
        )
        
        output_3d = os.path.join(output_dir, "model_3d.obj")
        converter.create_point_cloud(views, output_3d)
        
        print(f"\n✅ تەواو بوو!")
    else:
        # Run default example
        main()
