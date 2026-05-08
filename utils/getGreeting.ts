export function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 6 && hour < 12) {
    return 'Доброго ранку';
  }

  if (hour >= 12 && hour < 18) {
    return 'Доброго дня';
  }

  if (hour >= 18 && hour < 24) {
    return 'Доброго вечора';
  }

  return 'Доброї ночі';
}
