import os from "node:os";
import chalk from "chalk";

function monitor() {
  const oldCpus = os.cpus();

  setTimeout(() => {
    const newCpus = os.cpus();
    const cpuUsage = newCpus.map((cpu, index) => {
      return {
        core: index,
        usages: calculate(oldCpus[index], newCpus[index]) + "%",
      };
    });
    console.clear();
    console.log(
      chalk.green("===================CPU Usage:=====================")
    );
    console.table(cpuUsage);
    console.log(
      chalk.green("===================Memory Usage:=====================")
    );
    const memoryUsage = {
      total: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
      free: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
      used:
        ((os.totalmem() - os.freemem()) / (1024 * 1024 * 1024)).toFixed(2) +
        " GB",
    };
    console.table(memoryUsage);
  }, 1000);
}
function calculate(oldCpu, newCpu) {
  const oldTotal = Object.values(oldCpu.times).reduce((a, b) => a + b);
  const newTotal = Object.values(newCpu.times).reduce((a, b) => a + b);
  const idle = newCpu.times.idle - oldCpu.times.idle;
  const total = newTotal - oldTotal;
  const used = total - idle;
  return ((100 * used) / total).toFixed(1);
}
setInterval(monitor, 1000);
