import { Document, Model } from "mongoose";

// Define what each month's data looks like
interface MonthData {
  month: string;
  count: number;
}

// Generic function to generate count data for last 12 months
export async function generateLast12MonthData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
    
  const last12Months: MonthData[] = [];

  // Get the current date
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  // Loop backward through the last 12 months
  for (let i = 11; i >= 0; i--) {
    // Define end date for the current month window (approx every 28 days)
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );

    // Define start date (28 days before endDate)
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );

    // Create a readable label for the month (e.g. "Oct 2025")
    const monthLabel = endDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    // Count how many documents were created in that month
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate, // greater than or equal to startDate
        $lt: endDate,    // less than endDate
      },
    });

    // Store this month’s data
    last12Months.push({ month: monthLabel, count });
  }

  // Return an object containing the data
  return { last12Months };
}
