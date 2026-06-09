export const SUCCESS_MESSAGES = [
  "Bra jobbat! 🎉",
  "Check på det ✓",
  "Snyggt jobbat! 👌",
  "Heja dig! 🎉",
  "Där satt den! 🚀",
  "Badabing badaboom! 💥",
  "Katching! 🏆",
  "High five! 🙌",
  "Let's goooooo! 🚀",
  ""
];

export const getRandomSuccessMessage = (): string => {
  return SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
};
