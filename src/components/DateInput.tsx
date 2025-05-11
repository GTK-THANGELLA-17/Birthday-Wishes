
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  isDarkMode?: boolean;
  minYear?: number;
  maxYear?: number;
}

export default function DateInput({
  value,
  onChange,
  isDarkMode = false,
  minYear = 2003, // Default to 2003
  maxYear = 2006  // Default to 2006
}: DateInputProps) {
  // Create date limits based on min and max years
  const fromDate = new Date(minYear, 0, 1);
  const toDate = new Date(maxYear, 11, 31);
  
  return (
    <div className="date-input-container">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                : 'bg-white border-gray-200 hover:bg-gray-100'
            } transition-colors duration-300`}
          >
            <CalendarIcon className={`mr-2 h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            {format(value, 'PPP')}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`w-auto p-0 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800 text-white' 
              : 'bg-white border-gray-200'
          } shadow-xl rounded-lg`}
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => date && onChange(date)}
            disabled={(date) => 
              date < fromDate || date > toDate
            }
            initialFocus
            className={cn(
              "p-3 pointer-events-auto", 
              isDarkMode 
                ? "bg-gray-900 text-white" 
                : "bg-white"
            )}
          />
        </PopoverContent>
      </Popover>
      <p className={`text-xs mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>
        Select a date between 2003-2006
      </p>
    </div>
  );
}
