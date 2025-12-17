# Results Banner Images

## How to Add Your Result Images

1. **Save your result banner images** in this folder (`frontend/src/assets/results/`)

2. **Replace the placeholder files** with your actual images:
   - `result-banner-1.jpg` - Replace with the first result banner image (Class X and XII toppers)
   - `result-banner-2.jpg` - Replace with the second result banner image (Grade 10, 12 toppers with NEET results)

3. **Supported formats**: JPG, JPEG, PNG

4. **Recommended image size**: 1920x1080 pixels or similar 16:9 aspect ratio for best display

5. **File naming**: Keep the same filenames (`result-banner-1.jpg`, `result-banner-2.jpg`) or update the imports in `ResultsPage.tsx`

## Adding More Banner Images

To add more result banners:

1. Save additional images in this folder (e.g., `result-banner-3.jpg`)

2. Update `frontend/src/pages/achievements/ResultsPage.tsx`:
   ```typescript
   // Add import at the top
   import resultBanner3 from "@/assets/results/result-banner-3.jpg";
   
   // Add to bannerImages array
   const bannerImages = [
       { src: resultBanner1, alt: "..." },
       { src: resultBanner2, alt: "..." },
       { src: resultBanner3, alt: "Your description here", fallback: "..." }
   ];
   ```

The slider will automatically adjust to show all images!
