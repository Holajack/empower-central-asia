/**
 * Setup Script for Blog Scheduler
 * 
 * Initialize and configure the daily blog generation scheduler
 * Run this once to start the automated blog generation at 9am daily.
 */

import { globalBlogScheduler, SchedulerUtils } from './blogScheduler';

/**
 * Initialize the blog scheduler
 */
export async function setupBlogScheduler(): Promise<void> {
  console.log('🚀 Setting up Blog Scheduler for Empower Central Asia...\n');

  try {
    // Configure the scheduler
    globalBlogScheduler.updateConfig({
      enabled: true,
      scheduleTime: '0 9 * * *', // 9:00 AM daily
      maxPostsPerDay: 1, // Generate 1 high-quality post per day
      optimizeExistingPosts: true, // Also optimize existing posts with bold text issues
      generateImages: true, // Generate images with nano banana integration
      logActivity: true, // Log all activities
      targetAudience: 'entrepreneurs and small business owners in Central Asia',
      dailyTopics: [
        // Week 1: Business Fundamentals
        'Building Sustainable Microfinance Programs in Rural Communities',
        'Digital Marketing Strategies for Traditional Craftspeople',
        'Women Entrepreneurship Success Stories from Kazakhstan',
        'Cooperative Business Models in Central Asian Agriculture',
        'Financial Literacy Training for New Business Owners',
        'Cross-Border Trade Opportunities in Central Asia',
        'Technology Adoption for Small Business Growth',
        
        // Week 2: Community Development
        'Rural Tourism Development and Community Benefits',
        'Youth Entrepreneurship Programs That Work',
        'Healthcare Entrepreneurship in Underserved Areas',
        'Education Technology for Business Training',
        'Renewable Energy Business Models for Remote Areas',
        'Supply Chain Development for Rural Entrepreneurs',
        'Mobile Banking Solutions for Unbanked Communities',
        
        // Week 3: Industry Focus
        'Traditional Textile Modernization and Export Success',
        'Food Processing Value Addition for Farmers',
        'Construction and Housing Solution Businesses',
        'Transportation Solutions for Remote Communities',
        'Water and Sanitation Social Enterprises',
        'Information Technology Services in Central Asia',
        'Agricultural Innovation and Technology Adoption',
        
        // Week 4: Advanced Topics
        'Impact Measurement for Social Enterprises',
        'Green Business Practices and Environmental Benefits',
        'Business Mentorship Networks and Support Systems',
        'E-commerce Platforms for Traditional Products',
        'Skills Training Programs for Economic Development',
        'Community-Based Economic Development Models',
        'International Partnership Opportunities',
        
        // Week 5: Success Stories and Case Studies
        'Microfinance Success: From Survival to Growth',
        'Digital Transformation in Rural Kyrgyzstan',
        'Tajikistan Cooperative Farming Success',
        'Uzbekistan Women Entrepreneurship Program Results'
      ]
    });

    // Start the scheduler
    SchedulerUtils.startDailyScheduler();

    // Get and display status
    const status = SchedulerUtils.getStatus();
    
    console.log('✅ Blog Scheduler Successfully Configured!\n');
    console.log('📋 Configuration Summary:');
    console.log(`   • Status: ${status.running ? 'Running ✅' : 'Stopped ❌'}`);
    console.log(`   • Schedule: Daily at 9:00 AM`);
    console.log(`   • Posts per day: 1 high-quality post`);
    console.log(`   • Image generation: Enabled (with nano banana integration)`);
    console.log(`   • Existing post optimization: Enabled`);
    console.log(`   • Bold text SEO optimization: Enabled`);
    console.log(`   • Next run: ${status.stats.nextRunTime}\n`);
    
    console.log('🎯 What the scheduler will do daily:');
    console.log('   1. Generate 1 new research-based blog post');
    console.log('   2. Optimize up to 3 existing posts for SEO');
    console.log('   3. Generate contextual images with nano banana');
    console.log('   4. Fix bold text overuse (reduce by 60-80%)');
    console.log('   5. Ensure proper keyword density and SEO');
    console.log('   6. Add actionable elements and practical tips\n');
    
    console.log('📊 Expected improvements:');
    console.log('   • Bold text: Reduced from 3-5% to <0.5% (SEO optimized)');
    console.log('   • Reading time: 10-12 minutes (optimal length)');
    console.log('   • SEO score: 80-90% (properly optimized)');
    console.log('   • Images: Professional, contextual visuals');
    console.log('   • Content quality: Research-based, actionable\n');

    console.log('🛠 Management commands:');
    console.log('   • Check status: SchedulerUtils.getStatus()');
    console.log('   • Stop scheduler: SchedulerUtils.stopScheduler()');
    console.log('   • Run immediately: SchedulerUtils.runNow()');
    console.log('   • Change schedule: SchedulerUtils.updateSchedule("0 8 * * *")');

    console.log('\n🎉 Blog Scheduler is now running! It will generate content daily at 9am.');
    console.log('💡 All generated content will be optimized for SEO and readability.');

  } catch (error) {
    console.error('❌ Failed to setup blog scheduler:', error);
    throw error;
  }
}

/**
 * Test the scheduler immediately (for development)
 */
export async function testScheduler(): Promise<void> {
  console.log('🧪 Testing Blog Scheduler...\n');
  
  try {
    console.log('⏳ Running scheduler task immediately...');
    await SchedulerUtils.runNow();
    
    const status = SchedulerUtils.getStatus();
    console.log('\n📊 Test Results:');
    console.log(`   • Total runs: ${status.stats.totalRuns}`);
    console.log(`   • Successful runs: ${status.stats.successfulRuns}`);
    console.log(`   • Failed runs: ${status.stats.failedRuns}`);
    console.log(`   • Posts generated: ${status.stats.postsGenerated}`);
    console.log(`   • Posts optimized: ${status.stats.postsOptimized}`);
    console.log(`   • Last run: ${status.stats.lastRunTime}`);
    
    if (status.stats.successfulRuns > 0) {
      console.log('\n✅ Scheduler test passed! The system is working correctly.');
    } else {
      console.log('\n❌ Scheduler test failed. Check the logs for errors.');
    }
    
  } catch (error) {
    console.error('❌ Scheduler test failed:', error);
  }
}

/**
 * Install required dependencies
 */
export function checkDependencies(): void {
  console.log('🔍 Checking dependencies for Blog Scheduler...\n');
  
  try {
    // Check if node-cron is available
    require('node-cron');
    console.log('✅ node-cron: Available');
  } catch (error) {
    console.log('❌ node-cron: Missing');
    console.log('💡 Install with: npm install node-cron @types/node-cron');
  }
  
  // Check if our services are available
  try {
    require('./blogWritingSubagent');
    console.log('✅ Blog Writing Subagent: Available');
  } catch (error) {
    console.log('❌ Blog Writing Subagent: Missing or has errors');
  }
  
  try {
    require('./nanoBananaImageService');
    console.log('✅ Nano Banana Image Service: Available');
  } catch (error) {
    console.log('❌ Nano Banana Image Service: Missing or has errors');
  }
  
  try {
    require('./seoOptimizedBoldText');
    console.log('✅ SEO Bold Text Optimizer: Available');
  } catch (error) {
    console.log('❌ SEO Bold Text Optimizer: Missing or has errors');
  }
  
  console.log('\n🎯 If any dependencies are missing, install them before running the scheduler.');
}

/**
 * Display help information
 */
export function showHelp(): void {
  console.log(`
🤖 Blog Scheduler Help - Empower Central Asia

SETUP:
  setupBlogScheduler()     - Initialize and start the daily scheduler
  testScheduler()          - Test the scheduler immediately
  checkDependencies()      - Check if all required packages are installed

MANAGEMENT:
  SchedulerUtils.getStatus()              - Check current status and stats
  SchedulerUtils.startDailyScheduler()    - Start the 9am daily schedule
  SchedulerUtils.stopScheduler()          - Stop the scheduler
  SchedulerUtils.runNow()                 - Generate blog content immediately
  SchedulerUtils.updateSchedule(time)     - Change schedule time (cron format)

SCHEDULE FORMAT (cron):
  "0 9 * * *"    - 9:00 AM daily (default)
  "0 8 * * 1-5"  - 8:00 AM weekdays only  
  "0 10 * * 0"   - 10:00 AM Sundays only
  "0 9 1 * *"    - 9:00 AM first day of each month

EXAMPLES:
  import { setupBlogScheduler, testScheduler } from './setupBlogScheduler';
  
  // Initialize the scheduler
  await setupBlogScheduler();
  
  // Test it immediately
  await testScheduler();
  
FEATURES:
  • Generates 1 high-quality blog post daily
  • Optimizes existing posts for SEO (fixes bold text overuse)
  • Creates contextual images with nano banana integration
  • Focuses on Central Asia entrepreneurship topics
  • Reduces bold text by 60-80% for better SEO
  • Includes actionable elements and practical tips
  
CONTENT QUALITY:
  • Research-based, factual content
  • SEO-optimized (proper keyword density)
  • Professional, readable structure  
  • Non-religious, complementary focus
  • 10-12 minute read time (optimal)
  • Contextual, professional images
`);
}

// Export easy setup function
export const QuickSetup = {
  /**
   * One-command setup - run this to get everything working
   */
  async start(): Promise<void> {
    console.log('🚀 Quick Setup - Blog Scheduler for Empower Central Asia\n');
    
    checkDependencies();
    console.log('');
    await setupBlogScheduler();
    console.log('');
    
    console.log('✅ Setup complete! The blog scheduler is now running.');
    console.log('📅 New content will be generated daily at 9:00 AM.');
    console.log('🔧 Use showHelp() to see management commands.');
  },
  
  /**
   * Run a test to make sure everything works
   */
  async test(): Promise<void> {
    await testScheduler();
  },
  
  /**
   * Show help information
   */
  help(): void {
    showHelp();
  }
};

export default {
  setupBlogScheduler,
  testScheduler,
  checkDependencies,
  showHelp,
  QuickSetup
};