import Transaction from '../models/TransactionModel'; // Import the Transaction model
import DailyTransactionSummary from '../models/DailyTransactionSummaryModel'; // Import the summary model
import cron from 'node-cron';

async function calculateDailySummaries() {
    try {
      // Aggregate transactions by date
      const dailyData = await Transaction.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$date' },
            },
            totalCashAtHand: { $sum: '$amountAtHand' },
            totalSentToAccount: { $sum: '$amountSentToAccount' },
            totalTransactions: { $sum: 1 },
            totalAmount: { $sum: '$totalAmount' },
          },
        },
      ]);
  
      console.log('Aggregated daily data:', dailyData);
  
      // Update summaries
      for (const data of dailyData) {
        const date = new Date(data._id);
        const summary = {
          date,
          totalTransactions: data.totalTransactions,
          totalAmount: data.totalAmount,
          totalSentToAccount: data.totalSentToAccount,
          totalCashAtHand: data.totalCashAtHand,
        };
  
        // Update or insert the daily summary
        await DailyTransactionSummary.findOneAndUpdate(
          { date },
          summary,
          { upsert: true, new: true }
        );
      }
  
      console.log('Daily summaries updated successfully.');
    } catch (error) {
      console.error('Error calculating daily summaries:', error);
    }
  }
  
  // Set up the cron job to update summaries daily at midnight
  cron.schedule('0 0 * * *', () => {
    console.log('Running daily summary update...');
    calculateDailySummaries();
  });