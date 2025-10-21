/**
 * Blog Scheduler Service
 * 
 * Automatically runs the blog subagent daily at 9am to generate new content
 * and optimize existing posts for better SEO performance.
 */

import cron from 'node-cron';
import { blogSubagentIntegration, IntegratedBlogRequest } from './blogSubagentIntegration';
import { blogPosts, BlogPost } from '../data/blogPosts';

export interface SchedulerConfig {
  enabled: boolean;
  scheduleTime: string; // cron format
  dailyTopics: string[];
  targetAudience: string;
  maxPostsPerDay: number;
  optimizeExistingPosts: boolean;
  generateImages: boolean;
  logActivity: boolean;
}

export interface SchedulerStats {
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  lastRunTime: string | null;
  nextRunTime: string | null;
  postsGenerated: number;
  postsOptimized: number;
}

/**
 * Blog Scheduler Class
 */
export class BlogScheduler {
  private config: SchedulerConfig;
  private stats: SchedulerStats;
  private isRunning: boolean = false;
  private cronJob: cron.ScheduledTask | null = null;

  constructor(config?: Partial<SchedulerConfig>) {
    this.config = {
      enabled: true,
      scheduleTime: '0 9 * * *', // 9:00 AM daily
      dailyTopics: this.getDefaultTopics(),
      targetAudience: 'entrepreneurs and small business owners in Central Asia',
      maxPostsPerDay: 1,
      optimizeExistingPosts: true,
      generateImages: true,
      logActivity: true,
      ...config
    };

    this.stats = {
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      lastRunTime: null,
      nextRunTime: null,
      postsGenerated: 0,
      postsOptimized: 0
    };
  }

  /**
   * Start the scheduler
   */
  public start(): void {
    if (this.cronJob) {
      this.log('Scheduler already running');
      return;
    }

    if (!this.config.enabled) {
      this.log('Scheduler is disabled');
      return;
    }

    this.cronJob = cron.schedule(this.config.scheduleTime, async () => {
      await this.runDailyTask();
    }, {
      scheduled: true,
      timezone: 'America/New_York' // Adjust timezone as needed
    });

    this.stats.nextRunTime = this.getNextRunTime();
    this.log(`Blog scheduler started. Next run: ${this.stats.nextRunTime}`);
  }

  /**
   * Stop the scheduler
   */
  public stop(): void {
    if (this.cronJob) {
      this.cronJob.destroy();
      this.cronJob = null;
      this.log('Blog scheduler stopped');
    }
  }

  /**
   * Run the daily blog generation task
   */
  private async runDailyTask(): Promise<void> {
    if (this.isRunning) {
      this.log('Task already running, skipping...');
      return;
    }

    this.isRunning = true;
    this.stats.totalRuns++;
    this.stats.lastRunTime = new Date().toISOString();

    try {
      this.log('Starting daily blog generation task...');

      // 1. Generate new blog posts
      if (this.config.maxPostsPerDay > 0) {
        await this.generateDailyPosts();
      }

      // 2. Optimize existing posts
      if (this.config.optimizeExistingPosts) {
        await this.optimizeExistingPosts();
      }

      this.stats.successfulRuns++;
      this.log('Daily task completed successfully');

    } catch (error) {
      this.stats.failedRuns++;
      this.log(`Daily task failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      this.isRunning = false;
      this.stats.nextRunTime = this.getNextRunTime();
    }
  }

  /**
   * Generate new blog posts for today
   */
  private async generateDailyPosts(): Promise<void> {
    const topicsToday = this.selectDailyTopics();
    
    for (let i = 0; i < Math.min(topicsToday.length, this.config.maxPostsPerDay); i++) {
      try {
        const topic = topicsToday[i];
        this.log(`Generating blog post: ${topic}`);

        const request: IntegratedBlogRequest = {
          topic,
          targetAudience: this.config.targetAudience,
          primaryKeywords: this.extractKeywords(topic),
          desiredLength: 'medium',
          focus: this.inferFocus(topic),
          generateImage: this.config.generateImages,
          fixBoldTextOveruse: true,
          optimizeForSEO: true
        };

        const result = await blogSubagentIntegration.generateCompleteBlog(request);
        
        if (result.blogPost) {
          // Here you would save the blog post to your database/file system
          await this.saveBlogPost(result.blogPost);
          this.stats.postsGenerated++;
          this.log(`Successfully generated: ${result.blogPost.title}`);
        }

      } catch (error) {
        this.log(`Failed to generate post for topic "${topicsToday[i]}": ${error}`);
      }
    }
  }

  /**
   * Optimize existing blog posts that need improvement
   */
  private async optimizeExistingPosts(): Promise<void> {
    // Find posts with high bold text usage (> 2%)
    const postsNeedingOptimization = blogPosts.filter(post => {
      const boldMatches = post.content.match(/\*\*[^*]+\*\*/g) || [];
      const totalWords = post.content.split(/\s+/).length;
      const boldRatio = (boldMatches.length / totalWords) * 100;
      return boldRatio > 2.0; // Posts with > 2% bold text
    });

    if (postsNeedingOptimization.length === 0) {
      this.log('No existing posts need optimization');
      return;
    }

    // Optimize up to 3 posts per day to avoid overwhelming the system
    const postsToOptimize = postsNeedingOptimization.slice(0, 3);

    for (const post of postsToOptimize) {
      try {
        this.log(`Optimizing existing post: ${post.title}`);
        
        const result = await blogSubagentIntegration.optimizeExistingBlog(post);
        
        if (result.blogPost) {
          await this.updateBlogPost(result.blogPost);
          this.stats.postsOptimized++;
          this.log(`Optimized: ${post.title} (${result.improvements.boldTextReduction.toFixed(1)}% bold text reduction)`);
        }

      } catch (error) {
        this.log(`Failed to optimize post "${post.title}": ${error}`);
      }
    }
  }

  /**
   * Select topics for today based on rotation and priority
   */
  private selectDailyTopics(): string[] {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const topicIndex = dayOfYear % this.config.dailyTopics.length;
    
    // Return topics starting from today's index
    return [
      this.config.dailyTopics[topicIndex],
      this.config.dailyTopics[(topicIndex + 1) % this.config.dailyTopics.length]
    ];
  }

  /**
   * Extract keywords from topic
   */
  private extractKeywords(topic: string): string[] {
    return topic.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 3); // Max 3 primary keywords
  }

  /**
   * Infer focus type from topic
   */
  private inferFocus(topic: string): 'educational' | 'inspirational' | 'practical' | 'mixed' {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('how to') || topicLower.includes('guide') || topicLower.includes('steps')) {
      return 'practical';
    }
    if (topicLower.includes('success') || topicLower.includes('achievement') || topicLower.includes('story')) {
      return 'inspirational';
    }
    if (topicLower.includes('understanding') || topicLower.includes('basics') || topicLower.includes('fundamentals')) {
      return 'educational';
    }
    
    return 'mixed';
  }

  /**
   * Save blog post (implement based on your data storage)
   */
  private async saveBlogPost(blogPost: any): Promise<void> {
    // This would integrate with your actual database/file system
    // For now, we'll log that it would be saved
    this.log(`Would save blog post: ${blogPost.title}`);
    
    // Example: Add to the existing blogPosts array (in real app, save to database)
    // blogPosts.push({
    //   ...blogPost,
    //   id: Math.max(...blogPosts.map(p => p.id)) + 1
    // });
  }

  /**
   * Update existing blog post (implement based on your data storage)
   */
  private async updateBlogPost(blogPost: any): Promise<void> {
    // This would integrate with your actual database/file system
    this.log(`Would update blog post: ${blogPost.title}`);
    
    // Example: Update in the existing blogPosts array (in real app, update database)
    // const index = blogPosts.findIndex(p => p.id === blogPost.id);
    // if (index !== -1) {
    //   blogPosts[index] = blogPost;
    // }
  }

  /**
   * Get next run time
   */
  private getNextRunTime(): string {
    if (!this.cronJob) return 'Not scheduled';
    
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 9:00 AM
    
    return tomorrow.toISOString();
  }

  /**
   * Log activity if enabled
   */
  private log(message: string): void {
    if (this.config.logActivity) {
      const timestamp = new Date().toISOString();
      console.log(`[BlogScheduler ${timestamp}] ${message}`);
    }
  }

  /**
   * Get default daily topics
   */
  private getDefaultTopics(): string[] {
    return [
      'Microfinance Success Stories in Central Asia',
      'Digital Marketing Strategies for Rural Entrepreneurs',
      'Women Entrepreneurship in Kazakhstan',
      'Sustainable Business Models for Small Communities',
      'Financial Literacy for New Business Owners',
      'Cooperative Business Structures in Kyrgyzstan',
      'Technology Adoption in Tajikistan Businesses',
      'Export Opportunities for Central Asian Entrepreneurs',
      'Rural Tourism Business Development',
      'Agricultural Innovation and Entrepreneurship',
      'Youth Entrepreneurship Programs',
      'Cross-Border Trade Opportunities',
      'Renewable Energy Business Models',
      'E-commerce for Traditional Craftspeople',
      'Business Mentorship and Support Networks',
      'Impact Measurement for Social Enterprises',
      'Supply Chain Development for Remote Areas',
      'Mobile Banking and Financial Services',
      'Skills Training for Economic Development',
      'Community-Based Economic Development',
      'Green Business Practices in Central Asia',
      'Traditional Crafts Modernization',
      'Food Processing and Value Addition',
      'Transportation and Logistics Solutions',
      'Healthcare Entrepreneurship in Rural Areas',
      'Education Technology for Business Training',
      'Water and Sanitation Business Models',
      'Construction and Housing Solutions',
      'Textile and Fashion Industry Development',
      'Information Technology Services Growth'
    ];
  }

  /**
   * Public methods for configuration and monitoring
   */

  public updateConfig(newConfig: Partial<SchedulerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.cronJob && newConfig.scheduleTime) {
      this.stop();
      this.start();
    }
  }

  public getStats(): SchedulerStats {
    return { ...this.stats };
  }

  public getConfig(): SchedulerConfig {
    return { ...this.config };
  }

  public isSchedulerRunning(): boolean {
    return this.cronJob !== null;
  }

  public forceRun(): Promise<void> {
    return this.runDailyTask();
  }
}

/**
 * Global scheduler instance
 */
export const globalBlogScheduler = new BlogScheduler({
  enabled: true,
  scheduleTime: '0 9 * * *', // 9:00 AM daily
  maxPostsPerDay: 1,
  optimizeExistingPosts: true,
  generateImages: true,
  logActivity: true
});

/**
 * Easy setup functions
 */
export const SchedulerUtils = {
  /**
   * Start the daily blog scheduler
   */
  startDailyScheduler: () => {
    globalBlogScheduler.start();
  },

  /**
   * Stop the scheduler
   */
  stopScheduler: () => {
    globalBlogScheduler.stop();
  },

  /**
   * Run immediately (for testing)
   */
  runNow: () => {
    return globalBlogScheduler.forceRun();
  },

  /**
   * Get scheduler status
   */
  getStatus: () => {
    return {
      running: globalBlogScheduler.isSchedulerRunning(),
      stats: globalBlogScheduler.getStats(),
      config: globalBlogScheduler.getConfig()
    };
  },

  /**
   * Update schedule time
   */
  updateSchedule: (cronTime: string) => {
    globalBlogScheduler.updateConfig({ scheduleTime: cronTime });
  }
};

export default {
  BlogScheduler,
  globalBlogScheduler,
  SchedulerUtils
};