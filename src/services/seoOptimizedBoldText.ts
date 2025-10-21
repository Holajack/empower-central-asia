/**
 * SEO-Optimized Bold Text Handler
 * 
 * Implements intelligent bold text usage that enhances SEO rather than hindering it.
 * Only applies bold text where it truly emphasizes important points and keywords.
 */

export interface BoldTextOptimizationConfig {
  maxBoldPercentage: number; // Maximum percentage of content that should be bold (default: 0.5%)
  preserveKeywords: boolean; // Keep bold on important SEO keywords
  preserveHeadings: boolean; // Don't remove bold from headings
  preserveEmphasis: boolean; // Keep bold where it genuinely adds emphasis
  removeRedundantBold: boolean; // Remove bold from repeated words
  minDistanceBetweenBold: number; // Minimum words between bold text
}

export interface BoldTextAnalysis {
  totalWords: number;
  boldInstances: number;
  boldPercentage: number;
  redundantBoldWords: string[];
  keywordBoldInstances: number;
  recommendedChanges: BoldTextRecommendation[];
  seoImpact: 'positive' | 'neutral' | 'negative';
}

export interface BoldTextRecommendation {
  type: 'remove' | 'keep' | 'add';
  text: string;
  reason: string;
  seoImpact: 'high' | 'medium' | 'low';
  position: number;
}

/**
 * SEO-Optimized Bold Text Processor
 */
export class SEOBoldTextOptimizer {
  private config: BoldTextOptimizationConfig;
  private seoKeywords: string[] = [];

  constructor(config?: Partial<BoldTextOptimizationConfig>) {
    this.config = {
      maxBoldPercentage: 0.5, // 0.5% of content - very selective
      preserveKeywords: true,
      preserveHeadings: true,
      preserveEmphasis: true,
      removeRedundantBold: true,
      minDistanceBetweenBold: 15, // At least 15 words between bold text
      ...config
    };
  }

  /**
   * Optimize bold text usage for SEO
   */
  public optimizeContent(content: string, primaryKeywords: string[] = []): {
    optimizedContent: string;
    analysis: BoldTextAnalysis;
    improvementSummary: string;
  } {
    this.seoKeywords = primaryKeywords.map(k => k.toLowerCase());
    
    const originalAnalysis = this.analyzeBoldUsage(content);
    let optimizedContent = content;

    // Only optimize if bold usage is excessive (> 0.5%)
    if (originalAnalysis.boldPercentage > this.config.maxBoldPercentage) {
      optimizedContent = this.performOptimization(content);
    }

    const finalAnalysis = this.analyzeBoldUsage(optimizedContent);
    const improvementSummary = this.generateImprovementSummary(originalAnalysis, finalAnalysis);

    return {
      optimizedContent,
      analysis: finalAnalysis,
      improvementSummary
    };
  }

  /**
   * Analyze current bold text usage
   */
  public analyzeBoldUsage(content: string): BoldTextAnalysis {
    const words = content.split(/\s+/);
    const totalWords = words.length;
    const boldMatches = content.match(/\*\*([^*]+)\*\*/g) || [];
    const boldInstances = boldMatches.length;
    const boldPercentage = (boldInstances / totalWords) * 100;

    // Extract bold words and find redundancies
    const boldWords = boldMatches.map(match => 
      match.replace(/\*\*/g, '').toLowerCase().trim()
    );
    
    const wordCounts: { [key: string]: number } = {};
    boldWords.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    const redundantBoldWords = Object.keys(wordCounts).filter(word => wordCounts[word] > 2);
    const keywordBoldInstances = boldWords.filter(word => 
      this.seoKeywords.some(keyword => word.includes(keyword))
    ).length;

    const seoImpact = this.assessSEOImpact(boldPercentage, keywordBoldInstances, redundantBoldWords.length);
    const recommendedChanges = this.generateRecommendations(content, boldMatches);

    return {
      totalWords,
      boldInstances,
      boldPercentage,
      redundantBoldWords,
      keywordBoldInstances,
      recommendedChanges,
      seoImpact
    };
  }

  /**
   * Perform the actual optimization
   */
  private performOptimization(content: string): string {
    let optimized = content;

    // Step 1: Remove bold from redundant words
    if (this.config.removeRedundantBold) {
      optimized = this.removeRedundantBold(optimized);
    }

    // Step 2: Ensure minimum distance between bold text
    optimized = this.enforceMinimumDistance(optimized);

    // Step 3: Preserve important emphasis
    if (this.config.preserveKeywords) {
      optimized = this.preserveKeywordBold(optimized);
    }

    // Step 4: Remove excessive bold to meet percentage target
    optimized = this.reduceToTargetPercentage(optimized);

    return optimized;
  }

  /**
   * Remove bold from words that appear too frequently
   */
  private removeRedundantBold(content: string): string {
    const boldMatches = content.match(/\*\*([^*]+)\*\*/g) || [];
    const wordCounts: { [key: string]: number } = {};
    
    // Count occurrences of each bold word
    boldMatches.forEach(match => {
      const word = match.replace(/\*\*/g, '').toLowerCase().trim();
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    let optimized = content;

    // Remove bold from words that appear more than twice (unless they're keywords)
    Object.keys(wordCounts).forEach(word => {
      if (wordCounts[word] > 2 && !this.isImportantKeyword(word)) {
        // Keep bold on first occurrence only
        let replacementCount = 0;
        const regex = new RegExp(`\\*\\*(${this.escapeRegex(word)})\\*\\*`, 'gi');
        
        optimized = optimized.replace(regex, (match, capturedWord) => {
          replacementCount++;
          return replacementCount === 1 ? match : capturedWord; // Keep first, remove others
        });
      }
    });

    return optimized;
  }

  /**
   * Ensure minimum distance between bold text instances
   */
  private enforceMinimumDistance(content: string): string {
    const words = content.split(/\s+/);
    let lastBoldPosition = -this.config.minDistanceBetweenBold;
    
    let result = '';
    let currentPosition = 0;
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      if (word.includes('**')) {
        const distance = i - lastBoldPosition;
        
        if (distance < this.config.minDistanceBetweenBold && lastBoldPosition >= 0) {
          // Too close to previous bold text, remove bold
          const cleanWord = word.replace(/\*\*/g, '');
          result += (i > 0 ? ' ' : '') + cleanWord;
        } else {
          // Keep the bold text
          result += (i > 0 ? ' ' : '') + word;
          lastBoldPosition = i;
        }
      } else {
        result += (i > 0 ? ' ' : '') + word;
      }
    }
    
    return result;
  }

  /**
   * Preserve bold on important keywords
   */
  private preserveKeywordBold(content: string): string {
    // This ensures that SEO keywords keep their bold formatting
    let preserved = content;
    
    this.seoKeywords.forEach(keyword => {
      // Find instances where keyword was unbold and restore bold
      const keywordRegex = new RegExp(`\\b${this.escapeRegex(keyword)}\\b`, 'gi');
      const matches = preserved.match(keywordRegex) || [];
      
      // Only bold the first 2 instances of each keyword
      let keywordCount = 0;
      preserved = preserved.replace(keywordRegex, (match) => {
        keywordCount++;
        if (keywordCount <= 2 && !match.includes('**')) {
          return `**${match}**`;
        }
        return match;
      });
    });
    
    return preserved;
  }

  /**
   * Reduce bold usage to target percentage
   */
  private reduceToTargetPercentage(content: string): string {
    const analysis = this.analyzeBoldUsage(content);
    
    if (analysis.boldPercentage <= this.config.maxBoldPercentage) {
      return content; // Already at target
    }

    const boldMatches = content.match(/\*\*([^*]+)\*\*/g) || [];
    const targetBoldCount = Math.ceil((this.config.maxBoldPercentage / 100) * analysis.totalWords);
    
    if (boldMatches.length <= targetBoldCount) {
      return content; // Already at target
    }

    // Prioritize which bold text to keep
    const prioritizedBold = this.prioritizeBoldText(boldMatches, content);
    const keepBold = prioritizedBold.slice(0, targetBoldCount);
    
    let optimized = content;
    
    // Remove bold from non-priority instances
    boldMatches.forEach(boldText => {
      if (!keepBold.includes(boldText)) {
        const cleanText = boldText.replace(/\*\*/g, '');
        optimized = optimized.replace(boldText, cleanText);
      }
    });
    
    return optimized;
  }

  /**
   * Prioritize which bold text to keep based on SEO importance
   */
  private prioritizeBoldText(boldMatches: string[], content: string): string[] {
    return boldMatches.sort((a, b) => {
      const scoreA = this.calculateBoldImportanceScore(a, content);
      const scoreB = this.calculateBoldImportanceScore(b, content);
      return scoreB - scoreA; // Higher score first
    });
  }

  /**
   * Calculate importance score for bold text
   */
  private calculateBoldImportanceScore(boldText: string, content: string): number {
    const text = boldText.replace(/\*\*/g, '').toLowerCase();
    let score = 0;
    
    // Higher score for SEO keywords
    if (this.seoKeywords.some(keyword => text.includes(keyword))) {
      score += 100;
    }
    
    // Higher score for text in headings
    if (this.isInHeading(boldText, content)) {
      score += 50;
    }
    
    // Higher score for longer phrases (more likely to be meaningful emphasis)
    score += text.split(' ').length * 5;
    
    // Higher score for unique words (less redundant)
    const wordCount = (content.toLowerCase().match(new RegExp(this.escapeRegex(text), 'g')) || []).length;
    score += Math.max(0, 20 - wordCount * 5);
    
    // Higher score for words that appear early in content (likely more important)
    const position = content.toLowerCase().indexOf(text);
    if (position < content.length * 0.3) { // First 30% of content
      score += 15;
    }
    
    return score;
  }

  /**
   * Check if bold text is within a heading
   */
  private isInHeading(boldText: string, content: string): boolean {
    const lines = content.split('\n');
    return lines.some(line => 
      line.includes(boldText) && line.trim().startsWith('#')
    );
  }

  /**
   * Check if word is an important SEO keyword
   */
  private isImportantKeyword(word: string): boolean {
    return this.seoKeywords.some(keyword => 
      word.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * Assess SEO impact of current bold usage
   */
  private assessSEOImpact(boldPercentage: number, keywordBoldInstances: number, redundantWords: number): 'positive' | 'neutral' | 'negative' {
    if (boldPercentage > 2.0 || redundantWords > 3) {
      return 'negative'; // Excessive bold hurts SEO
    }
    
    if (boldPercentage <= 0.5 && keywordBoldInstances > 0) {
      return 'positive'; // Strategic keyword emphasis helps SEO
    }
    
    return 'neutral';
  }

  /**
   * Generate recommendations for improvement
   */
  private generateRecommendations(content: string, boldMatches: string[]): BoldTextRecommendation[] {
    const recommendations: BoldTextRecommendation[] = [];
    
    // Check for excessive usage
    const analysis = this.analyzeBoldUsage(content);
    if (analysis.boldPercentage > 1.0) {
      recommendations.push({
        type: 'remove',
        text: 'excessive bold formatting',
        reason: 'Bold text exceeds 1% of content, which may be seen as spam by search engines',
        seoImpact: 'high',
        position: 0
      });
    }
    
    // Check for missing keyword emphasis
    this.seoKeywords.forEach(keyword => {
      const keywordInBold = boldMatches.some(bold => 
        bold.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!keywordInBold) {
        recommendations.push({
          type: 'add',
          text: keyword,
          reason: 'Primary keyword should be emphasized at least once for SEO',
          seoImpact: 'medium',
          position: 0
        });
      }
    });
    
    return recommendations;
  }

  /**
   * Generate improvement summary
   */
  private generateImprovementSummary(before: BoldTextAnalysis, after: BoldTextAnalysis): string {
    if (before.boldInstances === after.boldInstances) {
      return 'No optimization needed - bold text usage is already optimal for SEO.';
    }
    
    const reduction = before.boldInstances - after.boldInstances;
    const percentageImprovement = ((reduction / before.boldInstances) * 100).toFixed(1);
    
    return [
      `✅ Reduced bold text instances from ${before.boldInstances} to ${after.boldInstances}`,
      `📊 Bold text percentage: ${before.boldPercentage.toFixed(2)}% → ${after.boldPercentage.toFixed(2)}%`,
      `🎯 SEO improvement: ${percentageImprovement}% reduction`,
      `🔍 SEO impact changed from '${before.seoImpact}' to '${after.seoImpact}'`,
      after.seoImpact === 'positive' ? '🚀 Optimized for search engine rankings!' : ''
    ].filter(Boolean).join('\n');
  }

  /**
   * Escape special regex characters
   */
  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

/**
 * Quick utility functions for common use cases
 */
export const SEOBoldUtils = {
  /**
   * Quick optimization for blog content
   */
  optimizeForSEO: (content: string, keywords: string[] = []): string => {
    const optimizer = new SEOBoldTextOptimizer({
      maxBoldPercentage: 0.5,
      preserveKeywords: true,
      removeRedundantBold: true
    });
    
    return optimizer.optimizeContent(content, keywords).optimizedContent;
  },

  /**
   * Analyze bold text without optimization
   */
  analyzeBoldUsage: (content: string): BoldTextAnalysis => {
    const optimizer = new SEOBoldTextOptimizer();
    return optimizer.analyzeBoldUsage(content);
  },

  /**
   * Check if content needs optimization
   */
  needsOptimization: (content: string): boolean => {
    const analysis = SEOBoldUtils.analyzeBoldUsage(content);
    return analysis.boldPercentage > 1.0 || analysis.seoImpact === 'negative';
  },

  /**
   * Get SEO score based on bold usage
   */
  getBoldSEOScore: (content: string, keywords: string[] = []): number => {
    const optimizer = new SEOBoldTextOptimizer();
    const analysis = optimizer.analyzeBoldUsage(content);
    
    let score = 100;
    
    // Penalty for excessive bold
    if (analysis.boldPercentage > 2.0) score -= 40;
    else if (analysis.boldPercentage > 1.0) score -= 20;
    else if (analysis.boldPercentage > 0.5) score -= 10;
    
    // Penalty for redundancy
    score -= analysis.redundantBoldWords.length * 10;
    
    // Bonus for keyword emphasis
    if (keywords.length > 0) {
      const keywordScore = (analysis.keywordBoldInstances / keywords.length) * 20;
      score += Math.min(keywordScore, 20);
    }
    
    return Math.max(0, Math.min(100, score));
  }
};

export default {
  SEOBoldTextOptimizer,
  SEOBoldUtils
};