import React from "react";

interface Props {
  startDateStr: string;
  endDateStr: string;
}

const DateChecker = (startDate: string, endDate: string) => {
  const parseDate = (dateStr: string): Date => {
    return new Date(dateStr);
  };

  const checkConsecutiveDays = (
    startDateStr: string,
    endDateStr: string
  ): string[] => {
    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return [startDateStr];
    } else {
      const daysBetween: string[] = [];
      for (let i = 1; i < diffDays; i++) {
        const tempDate = new Date(startDate);
        tempDate.setDate(startDate.getDate() + i);
        daysBetween.push(tempDate.toISOString().split("T")[0]);
      }
      return daysBetween;
    }
  };

  return checkConsecutiveDays(startDate, endDate);
};

export default DateChecker;
