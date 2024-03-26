const fromHoursToSeconds = (numberOfHours: number): number => {
  return numberOfHours * HOUR_TO_MINUTES * MINUTE_TO_SECONDS;
};

const HOUR_TO_MINUTES: number = 60;

const MINUTE_TO_SECONDS: number = 60;

const DURATION_LIMIT_IN_HOURS: number = 8;

const DURATION_LIMIT_IN_SECONDS: number = fromHoursToSeconds(DURATION_LIMIT_IN_HOURS);

export { DURATION_LIMIT_IN_SECONDS };
