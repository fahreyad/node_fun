import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import chalk from "chalk";
import {
  createFolder,
  deleteFolder,
  createFile,
  updateFile,
  deleteFile,
  readFile,
  listFilesInFolder,
} from "./fs.js";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});
async function menu() {
  console.log(chalk.blue("=============== File Manager ==============="));
  const items = [
    "Create Folder",
    "Create File",
    "Read File",
    "Update File",
    "Delete File",
    "Delete Folder",
    "List Files in Folder",
    "Exit",
  ];
  items.forEach((item, index) => {
    console.log(chalk.green(`${index + 1}. ${item}`));
  });
  console.log(chalk.blue("============================================="));
  const answer = await rl.question(chalk.yellow("Select an option: "));

  switch (answer) {
    case "1":
      const folderName = await rl.question(chalk.yellow("Enter folder name: "));
      await createFolder(folderName);
      break;
    case "2":
      const fileName = await rl.question(chalk.yellow("Enter file name: "));
      const fileContent = await rl.question(
        chalk.yellow("Enter file content: ")
      );
      await createFile(fileName, fileContent);
      break;
    case "3":
      const fileToRead = await rl.question(
        chalk.yellow("Enter file name to read: ")
      );
      await readFile(fileToRead);
      break;
    case "4":
      const fileToUpdate = await rl.question(
        chalk.yellow("Enter file name to update: ")
      );
      const newContent = await rl.question(chalk.yellow("Enter new content: "));
      await updateFile(fileToUpdate, `\n${newContent}`);
      break;
    case "5":
      const fileToDelete = await rl.question(
        chalk.yellow("Enter file name to delete: ")
      );
      await deleteFile(fileToDelete);
      break;
    case "6":
      const folderToDelete = await rl.question(
        chalk.yellow("Enter folder name to delete: ")
      );
      await deleteFolder(folderToDelete);
      break;
    case "7":
      const folderToList = await rl.question(
        chalk.yellow("Enter folder name to list files: ")
      );
      const items = await listFilesInFolder(folderToList || "./");
      items.forEach((item) => {
        console.log(
          chalk[item.type === "folder" ? "blue" : "green"](item.name)
        );
      });
      break;
    case "8":
      console.log(chalk.green("Exiting..."));
      rl.close();
      break;
    default:
      console.log(chalk.red("Invalid option. Please try again."));
      break;
  }
}
menu();
