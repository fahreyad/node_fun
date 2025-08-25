const name = process.argv[2];

const hours = new Date().getHours();

function greeting(hours) {
  if (hours <= 10 && hours > 4) {
    return "Good morning";
  } else if (hours < 16 && hours > 10) {
    return "Good afternoon";
  } else if (hours < 4 && hours >= 19) {
    return "Good night";
  } else {
    return "Good evening";
  }
}
const greetingMessage = greeting(hours);
console.log(`Hello ${name}, ${greetingMessage}`);
