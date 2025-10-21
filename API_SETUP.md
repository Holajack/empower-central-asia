# 🔑 API Setup Guide - Nano Banana Integration

## 🎨 Setting Up Nano Banana API

The blog scheduler includes nano banana image generation. Here's how to configure it:

### **Step 1: Get Your API Credentials**

1. Go to your nano banana dashboard
2. Create a new API key for blog image generation
3. Copy your API endpoint and key

### **Step 2: Configure Environment Variables**

Create a `.env` file in your project root:

```bash
# Create .env file
cp .env.example .env
```

Then edit `.env` with your credentials:

```bash
# Nano Banana API Configuration
NANO_BANANA_API_ENDPOINT=https://api.nanobanana.com/v1/generate
NANO_BANANA_API_KEY=nb_your_actual_api_key_here

# Optional: Custom settings
NANO_BANANA_DEFAULT_STYLE=modern
NANO_BANANA_DEFAULT_QUALITY=high
NANO_BANANA_TIMEOUT=30000
```

### **Step 3: Alternative Configuration Methods**

#### **Option A: Environment Variables (Recommended)**
```bash
export NANO_BANANA_API_KEY="your_key_here"
export NANO_BANANA_API_ENDPOINT="your_endpoint_here"
```

#### **Option B: Direct Code Configuration**
```javascript
import { NanoBananaImageService } from './src/services/nanoBananaImageService';

const imageService = new NanoBananaImageService(
  'https://api.nanobanana.com/v1/generate', // endpoint
  'your_api_key_here' // API key
);
```

#### **Option C: Update the Service File**
Edit `/src/services/nanoBananaImageService.ts`:

```javascript
constructor(apiEndpoint?: string, apiKey?: string) {
  this.apiEndpoint = apiEndpoint || 'https://your-nano-banana-endpoint.com/v1/generate';
  this.apiKey = apiKey || 'your_api_key_here';
}
```

---

## 🧪 Testing the API Connection

### **Test Image Generation:**

```bash
# Test the scheduler with image generation
npm run blog-scheduler:test
```

Or test programmatically:

```javascript
import { nanoBananaImageService } from './src/services/nanoBananaImageService';

// Test API connection
const testRequest = {
  blogTitle: 'Test Blog Post',
  blogExcerpt: 'Testing nano banana integration',
  blogTags: ['test', 'entrepreneurship'],
  blogTopic: 'business development',
  targetAudience: 'entrepreneurs'
};

const result = await nanoBananaImageService.generateBlogImage(testRequest);
console.log('API Test Result:', result.success ? '✅ Connected' : '❌ Failed');
```

---

## 🛠 Fallback Options

### **If You Don't Have Nano Banana API Yet:**

#### **Option 1: Disable Image Generation**
```javascript
// In blogScheduler.ts or setupBlogScheduler.ts
globalBlogScheduler.updateConfig({
  generateImages: false // Disable image generation
});
```

#### **Option 2: Use Mock Mode (Default)**
The system already includes a mock mode that uses Unsplash images:

```javascript
// Current mock implementation automatically uses:
const mockUrls = [
  'https://images.unsplash.com/photo-1559223607-a43c990c692c',
  'https://images.unsplash.com/photo-1593526613712-7b4b9a707330',
  'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6',
  // ... more professional business images
];
```

#### **Option 3: Alternative Image Services**
You can easily modify the service to use other AI image generators:

```javascript
// Replace the mockImageGeneration function with:
// - OpenAI DALL-E
// - Midjourney API  
// - Stable Diffusion
// - Any other image generation service
```

---

## 📊 API Usage Monitoring

### **Track API Calls:**
```javascript
import { nanoBananaImageService } from './src/services/nanoBananaImageService';

// Get usage statistics
const stats = nanoBananaImageService.getGenerationStats();
console.log('Images generated:', stats.totalGenerated);
console.log('Success rate:', stats.successRate);
console.log('Average quality:', stats.avgQualityScore);
```

### **Log API Responses:**
The scheduler automatically logs all image generation attempts:

```
[BlogScheduler] Generating image for: Digital Marketing for Rural Entrepreneurs
[BlogScheduler] Image generated successfully: https://generated-image-url.com
[BlogScheduler] Image generation failed: API rate limit exceeded
```

---

## 🔒 Security Best Practices

### **Keep API Keys Secure:**

✅ **DO:**
- Use environment variables
- Add `.env` to `.gitignore`
- Use different keys for dev/prod
- Rotate keys regularly

❌ **DON'T:**
- Commit API keys to git
- Share keys in code or docs
- Use production keys in development
- Hard-code credentials

### **Example .gitignore:**
```bash
# Environment variables
.env
.env.local
.env.production

# API keys and secrets
*.key
secrets/
```

---

## 🚨 Troubleshooting

### **Common Issues:**

#### **"API key not found" Error**
```bash
# Check if environment variables are loaded
echo $NANO_BANANA_API_KEY

# Or check in Node.js
console.log('API Key:', process.env.NANO_BANANA_API_KEY);
```

#### **"Endpoint not responding" Error**
```bash
# Test the endpoint directly
curl -X POST https://api.nanobanana.com/v1/generate \
  -H "Authorization: Bearer your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test image"}'
```

#### **"Rate limit exceeded" Error**
The system includes automatic rate limiting:
```javascript
// In batchGenerateImages, there's a built-in delay:
await new Promise(resolve => setTimeout(resolve, 500)); // 500ms between calls
```

#### **Image Generation Fails**
The scheduler will continue working even if image generation fails:
```javascript
// Graceful fallback to Unsplash images
if (!imageResult?.success) {
  console.log('Using fallback image...');
  blogPost.imageUrl = this.selectFallbackImage(topic);
}
```

---

## 🎯 Quick Setup Checklist

- [ ] Get nano banana API credentials
- [ ] Create `.env` file with API key
- [ ] Test API connection: `npm run blog-scheduler:test`
- [ ] Verify images are generating in test output
- [ ] Start daily scheduler: `npm run blog-scheduler`
- [ ] Monitor logs for successful image generation

---

## 📞 Need Help?

### **If you don't have nano banana API access yet:**
1. The system works perfectly without it (uses Unsplash images)
2. You can add the API later without any code changes
3. Just set the environment variables when ready

### **If you have API issues:**
1. Check the logs for specific error messages
2. Test the endpoint directly with curl
3. Verify your API key is active and has credits
4. Check rate limits and usage quotas

The blog scheduler will work great even without nano banana API - it just won't have the custom branded images yet! 🎨