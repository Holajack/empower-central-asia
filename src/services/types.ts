/**
 * Type definitions for the Blog Writing Subagent
 * 
 * This file contains all TypeScript type definitions used by the
 * Blog Writing Subagent to ensure type safety and proper integration.
 */

// Re-export main types from blogWritingSubagent
export {
  ResearchSource,
  SEOAnalysis,
  ContentStructure,
  ContentSection,
  ContentSubSection,
  ActionableElement,
  ImagePrompt,
  BlogGenerationRequest,
  BlogGenerationResult,
  ContentMetrics,
  QualityAssessment
} from './blogWritingSubagent';

// Additional utility types for enhanced functionality

/**
 * Extended blog post interface with subagent-specific metadata
 */
export interface EnhancedBlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  
  // Subagent-specific additions
  qualityScore?: number;
  seoScore?: number;
  boldTextRatio?: number;
  actionabilityScore?: number;
  generatedBy?: 'subagent' | 'manual';
  lastOptimized?: string;
  keywordsUsed?: string[];
  researchSources?: string[];
}

/**
 * Content optimization settings
 */
export interface OptimizationSettings {
  boldTextOptimization: boolean;
  maxBoldTextRatio: number; // default: 1.0 (1%)
  targetReadingTime: number; // in minutes
  seoOptimization: boolean;
  keywordDensityTarget: number; // default: 1.5
  readabilityTarget: number; // default: 75
  actionabilityRequired: boolean;
  minActionableElements: number; // default: 3
}

/**
 * Blog content analysis results
 */
export interface ContentAnalysisResult {
  overallScore: number;
  breakdown: {
    boldTextUsage: {
      score: number;
      current: number;
      recommended: number;
      status: 'optimal' | 'moderate' | 'excessive';
    };
    readability: {
      score: number;
      fleschKincaid: number;
      avgSentenceLength: number;
      avgWordsPerParagraph: number;
    };
    seoOptimization: {
      score: number;
      keywordDensity: number;
      titleOptimization: boolean;
      metaDescriptionPresent: boolean;
      internalLinks: number;
    };
    actionability: {
      score: number;
      actionableElements: number;
      practicalSteps: number;
      resources: number;
    };
    structure: {
      score: number;
      headingHierarchy: boolean;
      listUsage: number;
      paragraphLength: 'optimal' | 'too-long' | 'too-short';
    };
  };
  recommendations: ContentRecommendation[];
}

/**
 * Content improvement recommendations
 */
export interface ContentRecommendation {
  type: 'critical' | 'important' | 'suggestion';
  category: 'bold-text' | 'readability' | 'seo' | 'actionability' | 'structure';
  issue: string;
  solution: string;
  priority: number; // 1-10, 10 being highest priority
  estimatedImpact: 'high' | 'medium' | 'low';
}

/**
 * Batch processing configuration
 */
export interface BatchProcessingConfig {
  posts: EnhancedBlogPost[];
  optimizationSettings: OptimizationSettings;
  outputFormat: 'updated-posts' | 'analysis-only' | 'both';
  preserveOriginal: boolean;
  generateReports: boolean;
}

/**
 * Batch processing results
 */
export interface BatchProcessingResult {
  totalProcessed: number;
  successful: number;
  failed: number;
  overallImprovement: {
    boldTextReduction: number; // percentage
    readabilityImprovement: number;
    seoScoreIncrease: number;
    actionabilityIncrease: number;
  };
  updatedPosts?: EnhancedBlogPost[];
  analysisReports?: ContentAnalysisResult[];
  errors?: ProcessingError[];
}

/**
 * Processing error information
 */
export interface ProcessingError {
  postId: number;
  postTitle: string;
  errorType: string;
  errorMessage: string;
  timestamp: string;
}

/**
 * Research database entry
 */
export interface ResearchDatabaseEntry {
  topic: string;
  sources: ResearchSource[];
  lastUpdated: string;
  reliability: number; // 0-10 scale
  coverage: string[]; // topics covered
}

/**
 * SEO keyword configuration
 */
export interface SEOKeywordConfig {
  topic: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longtailKeywords: string[];
  competitiveDifficulty: 'low' | 'medium' | 'high';
  searchVolume: 'low' | 'medium' | 'high';
  lastAnalyzed: string;
}

/**
 * Image prompt configuration
 */
export interface ImagePromptConfig {
  nanoBananaIntegration: {
    enabled: boolean;
    style: 'subtle' | 'moderate' | 'prominent';
    elements: ('colors' | 'shapes' | 'patterns' | 'logos')[];
  };
  defaultStyle: string;
  defaultMood: string;
  qualityLevel: 'standard' | 'high' | 'premium';
}

/**
 * Content template configuration
 */
export interface ContentTemplate {
  name: string;
  description: string;
  structure: {
    introduction: string;
    mainSections: string[];
    conclusion: string;
    callToAction: string;
  };
  targetAudience: string;
  recommendedLength: 'short' | 'medium' | 'long';
  focus: 'educational' | 'inspirational' | 'practical' | 'mixed';
}

/**
 * Subagent configuration settings
 */
export interface SubagentConfig {
  optimization: OptimizationSettings;
  seoKeywords: SEOKeywordConfig[];
  imagePrompts: ImagePromptConfig;
  templates: ContentTemplate[];
  researchDatabase: ResearchDatabaseEntry[];
  outputSettings: {
    includeMetrics: boolean;
    includeAnalysis: boolean;
    includeImagePrompts: boolean;
    includeRecommendations: boolean;
  };
}

/**
 * Blog generation statistics
 */
export interface GenerationStatistics {
  totalGenerated: number;
  averageQualityScore: number;
  averageGenerationTime: number; // in seconds
  topPerformingTopics: string[];
  commonIssues: string[];
  improvementTrends: {
    boldTextOptimization: number;
    seoScores: number;
    readabilityScores: number;
    actionabilityScores: number;
  };
}

/**
 * Content calendar integration
 */
export interface ContentCalendarEntry {
  scheduledDate: string;
  topic: string;
  targetAudience: string;
  keywords: string[];
  assignedAuthor: string;
  status: 'planned' | 'in-progress' | 'review' | 'approved' | 'published';
  generatedBy: 'subagent' | 'manual';
  priority: 'high' | 'medium' | 'low';
  estimatedReadTime: string;
}

/**
 * Export utility type for blog post updates
 */
export type BlogPostUpdate = Partial<EnhancedBlogPost> & {
  id: number; // ID is required for updates
};

/**
 * Utility types for function parameters
 */
export type BoldTextOptimizationOptions = {
  maxRatio?: number;
  preserveEmphasis?: boolean;
  removeShortBold?: boolean;
  minDistanceBetweenBold?: number;
};

export type SEOOptimizationOptions = {
  primaryKeyword: string;
  secondaryKeywords?: string[];
  targetDensity?: number;
  includeInternalLinks?: boolean;
  optimizeTitle?: boolean;
  generateMetaDescription?: boolean;
};

export type ContentStructureOptions = {
  maxParagraphLength?: number;
  requireHeadingHierarchy?: boolean;
  minListItems?: number;
  includeTableOfContents?: boolean;
};

/**
 * Event types for subagent lifecycle
 */
export interface SubagentEvent {
  type: 'generation-started' | 'generation-completed' | 'optimization-applied' | 'error-occurred';
  timestamp: string;
  data: any;
}

export type SubagentEventHandler = (event: SubagentEvent) => void;

/**
 * Plugin interface for extending subagent functionality
 */
export interface SubagentPlugin {
  name: string;
  version: string;
  description: string;
  initialize: (config: any) => void;
  process: (content: string, options: any) => Promise<string>;
  cleanup?: () => void;
}

/**
 * Validation schemas
 */
export interface ValidationSchema {
  requiredFields: string[];
  fieldTypes: Record<string, string>;
  constraints: Record<string, any>;
}

// Type guards for runtime type checking
export const isBlogGenerationRequest = (obj: any): obj is BlogGenerationRequest => {
  return obj && 
    typeof obj.topic === 'string' &&
    typeof obj.targetAudience === 'string' &&
    Array.isArray(obj.primaryKeywords) &&
    ['short', 'medium', 'long'].includes(obj.desiredLength) &&
    ['educational', 'inspirational', 'practical', 'mixed'].includes(obj.focus);
};

export const isContentMetrics = (obj: any): obj is ContentMetrics => {
  return obj &&
    typeof obj.wordCount === 'number' &&
    typeof obj.boldTextInstances === 'number' &&
    typeof obj.readingTime === 'string';
};

export const isQualityAssessment = (obj: any): obj is QualityAssessment => {
  return obj &&
    typeof obj.overallScore === 'number' &&
    obj.overallScore >= 0 && obj.overallScore <= 100 &&
    ['optimal', 'moderate', 'excessive'].includes(obj.boldTextUsage) &&
    ['shallow', 'moderate', 'comprehensive'].includes(obj.contentDepth);
};

// Default configurations
export const DEFAULT_OPTIMIZATION_SETTINGS: OptimizationSettings = {
  boldTextOptimization: true,
  maxBoldTextRatio: 1.0,
  targetReadingTime: 10,
  seoOptimization: true,
  keywordDensityTarget: 1.5,
  readabilityTarget: 75,
  actionabilityRequired: true,
  minActionableElements: 3
};

export const DEFAULT_IMAGE_PROMPT_CONFIG: ImagePromptConfig = {
  nanoBananaIntegration: {
    enabled: true,
    style: 'subtle',
    elements: ['colors', 'shapes']
  },
  defaultStyle: 'Modern, professional',
  defaultMood: 'Inspiring, hopeful',
  qualityLevel: 'high'
};

// Constants
export const BLOG_CATEGORIES = [
  'Microfinance',
  'Entrepreneurship',
  'Business Development',
  'Financial Literacy',
  'Community Development',
  'Digital Marketing',
  'Sustainable Business',
  'Rural Development',
  'Technology Adoption',
  'Economic Development'
] as const;

export const CENTRAL_ASIA_REGIONS = [
  'Kazakhstan',
  'Kyrgyzstan', 
  'Tajikistan',
  'Uzbekistan',
  'Turkmenistan'
] as const;

export const QUALITY_SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 60,
  POOR: 0
} as const;

export const BOLD_TEXT_RATIOS = {
  OPTIMAL: 1.0,
  MODERATE: 2.0,
  EXCESSIVE: 3.0
} as const;

// Utility type for creating constrained string literals
export type BlogCategory = typeof BLOG_CATEGORIES[number];
export type CentralAsiaRegion = typeof CENTRAL_ASIA_REGIONS[number];

export default {
  // Main types
  EnhancedBlogPost,
  OptimizationSettings,
  ContentAnalysisResult,
  BatchProcessingConfig,
  SubagentConfig,
  
  // Utility functions
  isBlogGenerationRequest,
  isContentMetrics,
  isQualityAssessment,
  
  // Default configurations
  DEFAULT_OPTIMIZATION_SETTINGS,
  DEFAULT_IMAGE_PROMPT_CONFIG,
  
  // Constants
  BLOG_CATEGORIES,
  CENTRAL_ASIA_REGIONS,
  QUALITY_SCORE_THRESHOLDS,
  BOLD_TEXT_RATIOS
};