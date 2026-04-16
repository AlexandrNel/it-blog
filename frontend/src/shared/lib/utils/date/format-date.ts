import {
  format,
  formatDistance,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (value: string) => {
  const now = new Date();
  const later = new Date(value);
  const distance = formatDistance(later, now, { locale: ru, addSuffix: true });
  const yesterday = format(later, "вчера в p", { locale: ru });
  const thisYearDate = format(later, "dd MMMM в p", { locale: ru });
  const lastYearsDate = format(later, "dd MMMM y в p", { locale: ru });
  if (isToday(later)) {
    return distance;
  } else if (isYesterday(later)) {
    return yesterday;
  } else if (isThisYear(later)) {
    return thisYearDate;
  } else return lastYearsDate;
};
