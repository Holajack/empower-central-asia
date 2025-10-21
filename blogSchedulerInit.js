#!/usr/bin/env node

/**
 * Blog Scheduler Initialization Script
 * 
 * Run this file to start the daily blog generation scheduler at 9am
 * 
 * Usage:
 *   node blogSchedulerInit.js
 *   npm run blog-scheduler
 */

const { QuickSetup } = require('./src/services/setupBlogScheduler');

console.log('🎯 Empower Central Asia - Blog Scheduler Initialization');
console.log('=' .repeat(60));

async function main() {
  try {
    // Check if we want to run a test instead
    const args = process.argv.slice(2);
    
    if (args.includes('--test') || args.includes('-t')) {
      console.log('🧪 Running in test mode...\n');
      await QuickSetup.test();
      return;
    }
    
    if (args.includes('--help') || args.includes('-h')) {
      QuickSetup.help();
      return;
    }
    
    // Normal startup
    await QuickSetup.start();
    
    // Keep the process running to maintain the scheduler
    console.log('\n🔄 Keeping scheduler running...');
    console.log('💡 Press Ctrl+C to stop the scheduler');
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n👋 Shutting down blog scheduler...');
      const { SchedulerUtils } = require('./src/services/blogScheduler');
      SchedulerUtils.stopScheduler();
      console.log('✅ Scheduler stopped. Goodbye!');
      process.exit(0);
    });
    
    // Keep alive
    setInterval(() => {
      // Check scheduler status every hour and log
      const { SchedulerUtils } = require('./src/services/blogScheduler');
      const status = SchedulerUtils.getStatus();
      
      if (status.running) {
        console.log(`⏰ [${new Date().toLocaleTimeString()}] Scheduler active - Next run: ${status.stats.nextRunTime}`);
      }
    }, 3600000); // Every hour
    
  } catch (error) {
    console.error('❌ Failed to initialize blog scheduler:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure you have installed dependencies: npm install node-cron');
    console.log('2. Check that all service files are present in src/services/');
    console.log('3. Verify your Node.js version is >= 14');
    console.log('4. Run with --test flag to diagnose issues');
    
    process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});