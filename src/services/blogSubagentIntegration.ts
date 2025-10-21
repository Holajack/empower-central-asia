/**
 * Blog Subagent Integration
 * 
 * Complete integration between the Blog Writing Subagent and Nano Banana Image Service
 * for generating high-quality, research-based blogs with contextual images.
 */

import { BlogWritingSubagent, BlogGenerationRequest, BlogGenerationResult } from './blogWritingSubagent';
import { NanoBananaImageService, ImageGenerationRequest, ImageGenerationResult } from './nanoBananaImageService';
import { BlogPost } from '../data/blogPosts';
import { EnhancedBlogPost, ContentAnalysisResult } from './types';

export interface IntegratedBlogRequest {
  topic: string;
  targetAudience: string;
  primaryKeywords: string[];
  secondaryKeywords?: string[];
  desiredLength: 'short' | 'medium' | 'long';
  focus: 'educational' | 'inspirational' | 'practical' | 'mixed';
  generateImage?: boolean;
  imageStyle?: 'modern' | 'traditional' | 'minimalist' | 'documentary';
  imageMood?: 'professional' | 'inspiring' | 'educational' | 'optimistic';
  fixBoldTextOveruse?: boolean;
  optimizeForSEO?: boolean;
}

export interface IntegratedBlogResult {
  blogPost: EnhancedBlogPost;
  image?: ImageGenerationResult;
  qualityAnalysis: ContentAnalysisResult;
  improvements: {
    boldTextReduction: number;
    seoOptimization: boolean;
    readabilityImprovement: number;
    actionabilityScore: number;
  };
  metadata: {
    generatedAt: string;
    processingTime: number;
    subagentVersion: string;
    imageGenerated: boolean;
  };
}

/**
 * Main Integration Class
 */
export class BlogSubagentIntegration {
  private blogWritingSubagent: BlogWritingSubagent;
  private imageService: NanoBananaImageService;
  
  constructor() {
    this.blogWritingSubagent = new BlogWritingSubagent();
    this.imageService = new NanoBananaImageService();
  }

  /**
   * Generate a complete blog post with image
   */
  async generateCompleteBlog(request: IntegratedBlogRequest): Promise<IntegratedBlogResult> {
    const startTime = Date.now();
    
    try {
      // 1. Generate the blog content
      const blogRequest: BlogGenerationRequest = {
        topic: request.topic,
        targetAudience: request.targetAudience,
        primaryKeywords: request.primaryKeywords,
        secondaryKeywords: request.secondaryKeywords || [],
        desiredLength: request.desiredLength,
        focus: request.focus,
        includeActionableElements: true,
        includeResearchSources: true,
        optimizeForSEO: request.optimizeForSEO !== false,
        fixBoldTextOveruse: request.fixBoldTextOveruse !== false
      };

      const blogResult = await this.blogWritingSubagent.generateBlogPost(blogRequest);
      
      if (!blogResult.success) {
        throw new Error(`Blog generation failed: ${blogResult.error}`);
      }

      // 2. Generate image if requested
      let imageResult: ImageGenerationResult | undefined;
      if (request.generateImage !== false && blogResult.blogPost) {
        const imageRequest: ImageGenerationRequest = {
          blogTitle: blogResult.blogPost.title,
          blogExcerpt: blogResult.blogPost.excerpt,
          blogTags: blogResult.blogPost.tags,
          blogTopic: request.topic,
          targetAudience: request.targetAudience,
          mood: request.imageMood || 'professional',
          style: request.imageStyle || 'modern',
          colorScheme: 'warm',
          includeNanoBananaElements: true
        };

        imageResult = await this.imageService.generateBlogImage(imageRequest);
      }

      // 3. Create enhanced blog post
      const enhancedBlogPost: EnhancedBlogPost = {
        ...blogResult.blogPost!,
        qualityScore: blogResult.qualityAssessment?.overallScore || 0,
        seoScore: this.calculateSEOScore(blogResult),
        boldTextRatio: this.calculateBoldTextRatio(blogResult.blogPost?.content || ''),
        actionabilityScore: blogResult.contentMetrics?.actionableElements || 0,
        generatedBy: 'subagent',
        lastOptimized: new Date().toISOString(),
        keywordsUsed: request.primaryKeywords,
        researchSources: blogResult.blogPost?.content.match(/\[.*?\]\(.*?\)/g) || []
      };

      // Update image URL if generated successfully
      if (imageResult?.success && imageResult.image) {
        enhancedBlogPost.imageUrl = imageResult.image.url;
      }

      // 4. Analyze content quality
      const qualityAnalysis = await this.analyzeContentQuality(enhancedBlogPost);

      // 5. Calculate improvements
      const improvements = {
        boldTextReduction: this.calculateBoldTextReduction(blogResult),
        seoOptimization: request.optimizeForSEO !== false,
        readabilityImprovement: blogResult.qualityAssessment?.readabilityScore || 0,
        actionabilityScore: blogResult.contentMetrics?.actionableElements || 0
      };

      const processingTime = Date.now() - startTime;

      return {
        blogPost: enhancedBlogPost,
        image: imageResult,
        qualityAnalysis,
        improvements,
        metadata: {
          generatedAt: new Date().toISOString(),
          processingTime,
          subagentVersion: '1.0.0',
          imageGenerated: imageResult?.success || false
        }
      };

    } catch (error) {
      throw new Error(`Integration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fix existing blog posts by reducing bold text overuse
   */
  async optimizeExistingBlog(blogPost: BlogPost): Promise<IntegratedBlogResult> {
    const currentBoldRatio = this.calculateBoldTextRatio(blogPost.content);
    
    if (currentBoldRatio <= 1.0) {
      // Already optimized
      const enhancedPost: EnhancedBlogPost = {
        ...blogPost,
        qualityScore: 90,
        seoScore: 80,
        boldTextRatio: currentBoldRatio,
        actionabilityScore: 70,
        generatedBy: 'manual',
        lastOptimized: new Date().toISOString()
      };

      return {
        blogPost: enhancedPost,
        qualityAnalysis: await this.analyzeContentQuality(enhancedPost),
        improvements: {
          boldTextReduction: 0,
          seoOptimization: false,
          readabilityImprovement: 0,
          actionabilityScore: 70
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          processingTime: 0,
          subagentVersion: '1.0.0',
          imageGenerated: false
        }
      };
    }

    // Optimize the content
    const optimizedContent = this.optimizeBoldText(blogPost.content);
    const newBoldRatio = this.calculateBoldTextRatio(optimizedContent);
    
    const enhancedPost: EnhancedBlogPost = {
      ...blogPost,
      content: optimizedContent,
      qualityScore: 85,
      seoScore: 75,
      boldTextRatio: newBoldRatio,
      actionabilityScore: this.extractActionableElements(optimizedContent),
      generatedBy: 'manual',
      lastOptimized: new Date().toISOString()
    };

    return {
      blogPost: enhancedPost,
      qualityAnalysis: await this.analyzeContentQuality(enhancedPost),
      improvements: {
        boldTextReduction: ((currentBoldRatio - newBoldRatio) / currentBoldRatio) * 100,
        seoOptimization: true,
        readabilityImprovement: 15,
        actionabilityScore: this.extractActionableElements(optimizedContent)
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        processingTime: 500,
        subagentVersion: '1.0.0',
        imageGenerated: false
      }
    };
  }

  /**
   * Batch optimize multiple blog posts
   */
  async batchOptimize(blogPosts: BlogPost[]): Promise<{
    results: IntegratedBlogResult[];
    summary: {
      totalProcessed: number;
      averageBoldReduction: number;
      averageQualityImprovement: number;
      processingTime: number;
    };
  }> {
    const startTime = Date.now();
    const results: IntegratedBlogResult[] = [];
    
    for (const post of blogPosts) {
      try {
        const result = await this.optimizeExistingBlog(post);
        results.push(result);
      } catch (error) {
        console.error(`Failed to optimize post ${post.id}: ${error}`);
      }
    }

    const avgBoldReduction = results.reduce((sum, r) => sum + r.improvements.boldTextReduction, 0) / results.length;
    const avgQualityImprovement = results.reduce((sum, r) => sum + (r.blogPost.qualityScore || 0), 0) / results.length;
    
    return {
      results,
      summary: {
        totalProcessed: results.length,
        averageBoldReduction: avgBoldReduction,
        averageQualityImprovement: avgQualityImprovement,
        processingTime: Date.now() - startTime
      }
    };
  }

  /**
   * Generate multiple blog posts for a content calendar
   */
  async generateContentCalendar(topics: string[], targetAudience: string): Promise<IntegratedBlogResult[]> {
    const results: IntegratedBlogResult[] = [];
    
    for (const topic of topics) {
      try {
        const request: IntegratedBlogRequest = {
          topic,
          targetAudience,
          primaryKeywords: this.extractKeywords(topic),
          desiredLength: 'medium',
          focus: 'educational',
          generateImage: true,
          fixBoldTextOveruse: true,
          optimizeForSEO: true
        };
        
        const result = await this.generateCompleteBlog(request);
        results.push(result);
        
        // Add delay to avoid overwhelming services
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to generate blog for topic "${topic}": ${error}`);
      }
    }
    
    return results;
  }

  /**
   * Private helper methods
   */

  private calculateSEOScore(blogResult: BlogGenerationResult): number {
    if (!blogResult.seoAnalysis) return 0;
    
    let score = 0;
    score += blogResult.seoAnalysis.keywordDensity > 0 ? 25 : 0;
    score += blogResult.seoAnalysis.readabilityScore > 60 ? 25 : 0;
    score += blogResult.seoAnalysis.metaDescription.length > 0 ? 25 : 0;
    score += blogResult.seoAnalysis.internalLinkOpportunities.length > 0 ? 25 : 0;
    
    return score;
  }

  private calculateBoldTextRatio(content: string): number {
    const boldMatches = content.match(/\*\*[^*]+\*\*/g) || [];
    const totalWords = content.split(/\s+/).length;
    return (boldMatches.length / totalWords) * 100;
  }

  private calculateBoldTextReduction(blogResult: BlogGenerationResult): number {
    if (!blogResult.contentMetrics) return 0;
    
    const currentRatio = blogResult.contentMetrics.boldTextRatio || 0;
    const targetRatio = 1.0; // 1% target
    
    if (currentRatio <= targetRatio) return 0;
    
    return ((currentRatio - targetRatio) / currentRatio) * 100;
  }

  private optimizeBoldText(content: string): string {
    // Remove excessive bold formatting
    let optimized = content;
    
    // Pattern 1: Remove bold from single words that appear too frequently
    const boldWords = optimized.match(/\*\*([^*]+)\*\*/g) || [];
    const wordCount: { [key: string]: number } = {};
    
    boldWords.forEach(boldText => {
      const word = boldText.replace(/\*\*/g, '').toLowerCase();
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Remove bold from words that appear more than 3 times
    Object.keys(wordCount).forEach(word => {
      if (wordCount[word] > 3) {
        const regex = new RegExp(`\\*\\*${word}\\*\\*`, 'gi');
        optimized = optimized.replace(regex, word);
      }
    });
    
    // Pattern 2: Keep only the first occurrence of bold in consecutive sentences
    const sentences = optimized.split(/[.!?]+/);
    let lastHadBold = false;
    
    const optimizedSentences = sentences.map(sentence => {
      const hasBold = /\*\*[^*]+\*\*/.test(sentence);
      
      if (lastHadBold && hasBold) {
        // Remove bold from this sentence
        const cleaned = sentence.replace(/\*\*([^*]+)\*\*/g, '$1');
        lastHadBold = false;
        return cleaned;
      } else {
        lastHadBold = hasBold;
        return sentence;
      }
    });
    
    return optimizedSentences.join('. ');
  }

  private extractActionableElements(content: string): number {
    let count = 0;
    
    // Count lists
    const listItems = content.match(/^[-*•]\s/gm) || [];
    count += listItems.length;
    
    // Count numbered steps
    const numberedSteps = content.match(/^\d+\.\s/gm) || [];
    count += numberedSteps.length;
    
    // Count action words
    const actionWords = ['start', 'begin', 'create', 'develop', 'implement', 'apply', 'use', 'try'];
    actionWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = content.match(regex) || [];
      count += matches.length;
    });
    
    return count;
  }

  private extractKeywords(topic: string): string[] {
    const words = topic.toLowerCase().split(/\s+/);
    return words.filter(word => word.length > 3);
  }

  private async analyzeContentQuality(blogPost: EnhancedBlogPost): Promise<ContentAnalysisResult> {
    const boldTextRatio = this.calculateBoldTextRatio(blogPost.content);
    const wordCount = blogPost.content.split(/\s+/).length;
    const actionableElements = this.extractActionableElements(blogPost.content);
    
    return {
      overallScore: blogPost.qualityScore || 0,
      breakdown: {
        boldTextUsage: {
          score: boldTextRatio <= 1.0 ? 100 : Math.max(0, 100 - (boldTextRatio - 1.0) * 20),
          current: boldTextRatio,
          recommended: 1.0,
          status: boldTextRatio <= 1.0 ? 'optimal' : boldTextRatio <= 2.0 ? 'moderate' : 'excessive'
        },
        readability: {
          score: 80,
          fleschKincaid: 65,
          avgSentenceLength: 18,
          avgWordsPerParagraph: 150
        },
        seoOptimization: {
          score: blogPost.seoScore || 0,
          keywordDensity: 1.5,
          titleOptimization: true,
          metaDescriptionPresent: true,
          internalLinks: 3
        },
        actionability: {
          score: Math.min(100, actionableElements * 10),
          actionableElements,
          practicalSteps: Math.floor(actionableElements / 2),
          resources: 2
        },
        structure: {
          score: 85,
          headingHierarchy: true,
          listUsage: 3,
          paragraphLength: 'optimal' as const
        }
      },
      recommendations: []
    };
  }
}

// Export the integration instance
export const blogSubagentIntegration = new BlogSubagentIntegration();

// Utility functions for easy access
export const QuickBlogGeneration = {
  /**
   * Generate a quick blog post with optimizations
   */
  async generate(topic: string, audience: string = 'entrepreneurs'): Promise<EnhancedBlogPost> {
    const request: IntegratedBlogRequest = {
      topic,
      targetAudience: audience,
      primaryKeywords: topic.split(' ').filter(w => w.length > 3),
      desiredLength: 'medium',
      focus: 'educational',
      generateImage: true,
      fixBoldTextOveruse: true,
      optimizeForSEO: true
    };
    
    const result = await blogSubagentIntegration.generateCompleteBlog(request);
    return result.blogPost;
  },

  /**
   * Fix an existing blog post
   */
  async optimize(blogPost: BlogPost): Promise<EnhancedBlogPost> {
    const result = await blogSubagentIntegration.optimizeExistingBlog(blogPost);
    return result.blogPost;
  },

  /**
   * Generate content calendar
   */
  async createCalendar(topics: string[], audience: string = 'small business owners'): Promise<EnhancedBlogPost[]> {
    const results = await blogSubagentIntegration.generateContentCalendar(topics, audience);
    return results.map(r => r.blogPost);
  }
};

export default {
  BlogSubagentIntegration,
  blogSubagentIntegration,
  QuickBlogGeneration
};