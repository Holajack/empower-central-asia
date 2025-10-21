/**
 * Nano Banana Image Generation Service
 * 
 * Integrates with the Blog Writing Subagent to generate contextual images
 * using nano banana's AI image generation capabilities.
 */

export interface ImageGenerationRequest {
  blogTitle: string;
  blogExcerpt: string;
  blogTags: string[];
  blogTopic: string;
  targetAudience: string;
  mood?: 'professional' | 'inspiring' | 'educational' | 'optimistic';
  style?: 'modern' | 'traditional' | 'minimalist' | 'documentary';
  colorScheme?: 'warm' | 'cool' | 'neutral' | 'vibrant';
  includeText?: boolean;
  includeNanoBananaElements?: boolean;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  altText: string;
  title: string;
  dimensions: {
    width: number;
    height: number;
  };
  fileSize?: string;
  generatedAt: string;
  qualityScore: number;
  style: string;
}

export interface ImageGenerationResult {
  success: boolean;
  image?: GeneratedImage;
  error?: string;
  suggestions?: string[];
}

/**
 * Core Nano Banana Image Generation Service
 */
export class NanoBananaImageService {
  private apiEndpoint: string;
  private apiKey: string;
  
  constructor(apiEndpoint?: string, apiKey?: string) {
    this.apiEndpoint = apiEndpoint || process.env.NANO_BANANA_API_ENDPOINT || 'https://api.nanobanana.com/v1/generate';
    this.apiKey = apiKey || process.env.NANO_BANANA_API_KEY || '';
  }

  /**
   * Generate an image for a blog post
   */
  async generateBlogImage(request: ImageGenerationRequest): Promise<ImageGenerationResult> {
    try {
      const prompt = this.createImagePrompt(request);
      
      // Mock implementation - replace with actual nano banana API call
      const mockImage = await this.mockImageGeneration(prompt, request);
      
      return {
        success: true,
        image: mockImage,
        suggestions: this.generateImageSuggestions(request)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        suggestions: ['Try with simpler keywords', 'Reduce complexity of the prompt']
      };
    }
  }

  /**
   * Create a contextual image prompt based on blog content
   */
  private createImagePrompt(request: ImageGenerationRequest): string {
    const {
      blogTitle,
      blogTags,
      blogTopic,
      mood = 'professional',
      style = 'modern',
      colorScheme = 'warm',
      includeNanoBananaElements = true
    } = request;

    // Base prompt elements
    const baseElements = [
      this.getTopicVisuals(blogTopic),
      this.getMoodAdjectives(mood),
      this.getStyleElements(style),
      this.getColorSchemeElements(colorScheme)
    ];

    // Add Central Asia context if relevant
    const centralAsiaKeywords = ['kazakhstan', 'kyrgyzstan', 'tajikistan', 'uzbekistan', 'turkmenistan', 'central asia'];
    const hasCentralAsiaContext = blogTags.some(tag => 
      centralAsiaKeywords.some(keyword => tag.toLowerCase().includes(keyword))
    ) || centralAsiaKeywords.some(keyword => blogTitle.toLowerCase().includes(keyword));

    if (hasCentralAsiaContext) {
      baseElements.push('Central Asian cultural elements, traditional patterns, mountain landscapes');
    }

    // Add nano banana elements subtly
    if (includeNanoBananaElements) {
      baseElements.push('subtle yellow accents, curved organic shapes, natural flowing lines');
    }

    // Construct the final prompt
    const prompt = `${baseElements.join(', ')}, high quality, professional photography style, suitable for blog header, ${this.getBusinessContext(blogTopic)}`;

    return prompt;
  }

  /**
   * Get visual elements based on blog topic
   */
  private getTopicVisuals(topic: string): string {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('microfinance') || topicLower.includes('finance')) {
      return 'hands counting coins, small business storefront, calculator and financial documents';
    }
    
    if (topicLower.includes('entrepreneur') || topicLower.includes('business')) {
      return 'small business owners at work, handshake, office workspace, growth charts';
    }
    
    if (topicLower.includes('digital marketing') || topicLower.includes('technology')) {
      return 'laptop computer, social media icons, digital connectivity, smartphone';
    }
    
    if (topicLower.includes('cooperative') || topicLower.includes('community')) {
      return 'group of people working together, community gathering, collaborative workspace';
    }
    
    if (topicLower.includes('rural') || topicLower.includes('agriculture')) {
      return 'rural landscape, farming activities, traditional market, village setting';
    }
    
    return 'professional business environment, collaboration, success and growth';
  }

  /**
   * Get mood-specific adjectives
   */
  private getMoodAdjectives(mood: string): string {
    switch (mood) {
      case 'inspiring':
        return 'uplifting, hopeful, bright lighting, positive energy';
      case 'educational':
        return 'clean, informative, clear, focused, academic';
      case 'optimistic':
        return 'bright, cheerful, positive, encouraging, successful';
      case 'professional':
      default:
        return 'professional, clean, trustworthy, competent';
    }
  }

  /**
   * Get style-specific elements
   */
  private getStyleElements(style: string): string {
    switch (style) {
      case 'traditional':
        return 'traditional design elements, classic composition, timeless feel';
      case 'minimalist':
        return 'clean lines, minimal elements, lots of white space, simple';
      case 'documentary':
        return 'realistic, authentic, candid moments, photojournalistic';
      case 'modern':
      default:
        return 'contemporary design, modern aesthetic, sleek presentation';
    }
  }

  /**
   * Get color scheme elements
   */
  private getColorSchemeElements(colorScheme: string): string {
    switch (colorScheme) {
      case 'cool':
        return 'cool blue and green tones, calming colors';
      case 'neutral':
        return 'neutral grays and browns, subtle color palette';
      case 'vibrant':
        return 'vibrant colors, high saturation, energetic palette';
      case 'warm':
      default:
        return 'warm golden and orange tones, inviting colors';
    }
  }

  /**
   * Get business context elements
   */
  private getBusinessContext(topic: string): string {
    return 'business development context, economic empowerment theme, international development setting';
  }

  /**
   * Generate image suggestions for improvement
   */
  private generateImageSuggestions(request: ImageGenerationRequest): string[] {
    const suggestions = [
      'Consider adding local cultural elements for better regional relevance',
      'Try different color schemes to match your brand guidelines',
      'Experiment with more specific business contexts'
    ];

    if (request.blogTags.includes('Rural Development')) {
      suggestions.push('Include rural landscape elements for better context');
    }

    if (request.blogTags.includes('Technology')) {
      suggestions.push('Add subtle technology elements like smartphones or laptops');
    }

    return suggestions;
  }

  /**
   * Mock image generation (replace with actual API call)
   */
  private async mockImageGeneration(prompt: string, request: ImageGenerationRequest): Promise<GeneratedImage> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUrls = [
      'https://images.unsplash.com/photo-1559223607-a43c990c692c',
      'https://images.unsplash.com/photo-1593526613712-7b4b9a707330',
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf'
    ];

    const randomUrl = mockUrls[Math.floor(Math.random() * mockUrls.length)];

    return {
      url: randomUrl,
      prompt: prompt,
      altText: this.generateAltText(request),
      title: this.generateImageTitle(request),
      dimensions: {
        width: 1200,
        height: 630
      },
      fileSize: '245 KB',
      generatedAt: new Date().toISOString(),
      qualityScore: Math.floor(Math.random() * 20) + 80, // 80-100
      style: request.style || 'modern'
    };
  }

  /**
   * Generate SEO-friendly alt text
   */
  private generateAltText(request: ImageGenerationRequest): string {
    const topicContext = this.getAltTextContext(request.blogTopic);
    return `${topicContext} - ${request.blogTitle}`;
  }

  /**
   * Generate image title
   */
  private generateImageTitle(request: ImageGenerationRequest): string {
    return `Illustration for: ${request.blogTitle}`;
  }

  /**
   * Get alt text context based on topic
   */
  private getAltTextContext(topic: string): string {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('microfinance')) {
      return 'Microfinance and small business development illustration';
    }
    if (topicLower.includes('entrepreneur')) {
      return 'Entrepreneurship and business growth illustration';
    }
    if (topicLower.includes('digital')) {
      return 'Digital marketing and technology illustration';
    }
    if (topicLower.includes('community')) {
      return 'Community development and cooperation illustration';
    }
    
    return 'Business development and economic empowerment illustration';
  }

  /**
   * Batch generate images for multiple blog posts
   */
  async batchGenerateImages(requests: ImageGenerationRequest[]): Promise<ImageGenerationResult[]> {
    const results: ImageGenerationResult[] = [];
    
    for (const request of requests) {
      try {
        const result = await this.generateBlogImage(request);
        results.push(result);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        results.push({
          success: false,
          error: `Failed to generate image for: ${request.blogTitle}`,
          suggestions: ['Try again with simpler parameters']
        });
      }
    }
    
    return results;
  }

  /**
   * Get image generation statistics
   */
  getGenerationStats(): {
    totalGenerated: number;
    successRate: number;
    avgQualityScore: number;
    topStyles: string[];
  } {
    // Mock stats - in real implementation, track these metrics
    return {
      totalGenerated: 0,
      successRate: 0.95,
      avgQualityScore: 87.5,
      topStyles: ['modern', 'professional', 'inspiring']
    };
  }
}

/**
 * Utility functions for image generation
 */
export class ImageGenerationUtils {
  /**
   * Convert blog post to image generation request
   */
  static blogPostToImageRequest(blogPost: {
    title: string;
    excerpt: string;
    tags: string[];
    content: string;
  }): ImageGenerationRequest {
    const topic = ImageGenerationUtils.extractMainTopic(blogPost.content);
    const targetAudience = ImageGenerationUtils.inferAudience(blogPost.tags);
    
    return {
      blogTitle: blogPost.title,
      blogExcerpt: blogPost.excerpt,
      blogTags: blogPost.tags,
      blogTopic: topic,
      targetAudience: targetAudience,
      mood: ImageGenerationUtils.inferMood(blogPost.content),
      style: 'modern',
      colorScheme: 'warm',
      includeNanoBananaElements: true
    };
  }

  /**
   * Extract main topic from content
   */
  private static extractMainTopic(content: string): string {
    const topics = [
      'microfinance', 'entrepreneurship', 'business development',
      'digital marketing', 'community development', 'financial literacy'
    ];
    
    const contentLower = content.toLowerCase();
    const foundTopic = topics.find(topic => contentLower.includes(topic));
    
    return foundTopic || 'business development';
  }

  /**
   * Infer target audience from tags
   */
  private static inferAudience(tags: string[]): string {
    if (tags.some(tag => tag.toLowerCase().includes('rural'))) {
      return 'rural entrepreneurs';
    }
    if (tags.some(tag => tag.toLowerCase().includes('women'))) {
      return 'women entrepreneurs';
    }
    if (tags.some(tag => tag.toLowerCase().includes('small business'))) {
      return 'small business owners';
    }
    
    return 'aspiring entrepreneurs';
  }

  /**
   * Infer mood from content
   */
  private static inferMood(content: string): 'professional' | 'inspiring' | 'educational' | 'optimistic' {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('success story') || contentLower.includes('achievement')) {
      return 'inspiring';
    }
    if (contentLower.includes('how to') || contentLower.includes('guide')) {
      return 'educational';
    }
    if (contentLower.includes('opportunity') || contentLower.includes('growth')) {
      return 'optimistic';
    }
    
    return 'professional';
  }

  /**
   * Validate image generation request
   */
  static validateRequest(request: ImageGenerationRequest): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (!request.blogTitle || request.blogTitle.trim().length === 0) {
      errors.push('Blog title is required');
    }
    
    if (!request.blogTopic || request.blogTopic.trim().length === 0) {
      errors.push('Blog topic is required');
    }
    
    if (!request.targetAudience || request.targetAudience.trim().length === 0) {
      errors.push('Target audience is required');
    }
    
    if (request.blogTags.length === 0) {
      errors.push('At least one tag is required');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export the service instance
export const nanoBananaImageService = new NanoBananaImageService();

// Export default configuration
export const DEFAULT_IMAGE_CONFIG = {
  mood: 'professional' as const,
  style: 'modern' as const,
  colorScheme: 'warm' as const,
  includeNanoBananaElements: true,
  includeText: false
};

export default {
  NanoBananaImageService,
  ImageGenerationUtils,
  nanoBananaImageService,
  DEFAULT_IMAGE_CONFIG
};