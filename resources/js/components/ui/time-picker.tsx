import * as React from "react";
import { ChevronDown, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  time?: string; // Time in "HH:mm" format
  onTimeChange: (time?: string) => void;
}

export function TimePicker({ time, onTimeChange }: TimePickerProps) {
  const [inputTime, setInputTime] = React.useState(time || "");
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  // Validate time format (HH:mm)
  const isValidTime = (time: string) => {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  };

  // Handle manual time input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputTime(value);

    if (isValidTime(value)) {
      onTimeChange(value);
    }
  };

  // Handle time selection from dropdown
  const handleTimeSelect = (selectedTime: string) => {
    setInputTime(selectedTime);
    onTimeChange(selectedTime);
    setIsPopoverOpen(false); // Close the popover after selection
  };

  // Generate time options for the dropdown
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !time && "text-muted-foreground")}
        >
          <Clock className="mr-2 size-4" />
          {time || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex flex-col gap-2">
          {/* Manual Time Input */}
          <Input
            type="text"
            placeholder="HH:mm"
            value={inputTime}
            onChange={handleInputChange}
            className="w-full"
          />
          {/* Time Dropdown */}
          <div className="max-h-48 overflow-y-auto">
            {timeOptions.map((option) => (
              <Button
                key={option}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleTimeSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
