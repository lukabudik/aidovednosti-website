import { parse } from 'csv-parse/sync';

export interface CourseDate {
  date: Date;
  type: string;
  location: string;
  cityLocative: string;
  focus: string;
  deadline: Date | null;
}

function parseDate(dateStr: string): Date {
  // Handle dates with timestamps
  if (dateStr.includes('.') && dateStr.length <= 10) {
    const [day, month, year] = dateStr.split('.');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  
  // Handle full timestamps
  if (dateStr.includes('.') && dateStr.includes(':')) {
    return new Date(dateStr);
  }
  
  return new Date(dateStr);
}

export async function parseCourseDates(): Promise<CourseDate[]> {
  try {
    const response = await fetch('/data/kurzy.csv');
    const fileContent = await response.text();
    
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    const now = new Date();
    return records
      .filter((record: any) => 
        record['Timestamp startdate'] && 
        record['Lokalita'] &&
        record['Locative'] &&
        record['Zaměření']
      )
      .map((record: any) => {
        const startDate = parseDate(record['Timestamp startdate']);
        return {
          date: startDate,
          type: record['Typ'] || 'Dotace',
          location: record['Lokalita'],
          cityLocative: record['Locative'],
          focus: record['Zaměření'],
          deadline: startDate instanceof Date ? new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000) : null
        };
      })
      .filter((record: CourseDate) => record.date > now && (record.deadline ? record.deadline > now : true))
      .sort((a: CourseDate, b: CourseDate) => {
        if (!a.deadline || !b.deadline) return 0;
        return a.deadline.getTime() - b.deadline.getTime();
      });
  } catch (error) {
    console.error('Error parsing CSV file:', error);
    return [];
  }
}
