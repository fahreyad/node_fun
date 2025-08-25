import * as fs from "node:fs/promises";
import chalk from "chalk";
import path from "node:path";
export async function createFolder(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log(chalk.green(`Folder created: ${folderPath}`));
  } catch (error) {
    console.error(chalk.red(`Error creating folder: ${error.message}`));
  }
}

export async function deleteFolder(folderPath) {
  try {
    await fs.rm(folderPath, { recursive: true });
    console.log(chalk.green(`Folder deleted: ${folderPath}`));
  } catch (error) {
    console.error(chalk.red(`Error deleting folder: ${error.message}`));
  }
}

export async function createFile(filePath, content = "") {
  try {
    await fs.writeFile(filePath, content);
    console.log(chalk.green(`File created: ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Error creating file: ${error.message}`));
  }
}

export async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    console.log(chalk.green(`File read: ${filePath}`));
    console.log(chalk.blue(content));
    return content;
  } catch (error) {
    console.error(chalk.red(`Error reading file: ${error.message}`));
  }
}

export async function updateFile(filePath, content = "") {
  try {
    await fs.appendFile(filePath, content);
    console.log(chalk.green(`File updated: ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Error updating file: ${error.message}`));
  }
}

export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(chalk.green(`File deleted: ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Error deleting file: ${error.message}`));
  }
}

export async function listFilesInFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    console.log(chalk.green(`Files in folder ${folderPath}:`));
    const items = files.map((file) => {
      return {
        name: file.name,
        type: file.isDirectory() ? "folder" : "file",
        path: path.join(import.meta.dirname, file.name),
      };
    });
    return items;
  } catch (error) {
    console.error(chalk.red(`Error listing files: ${error.message}`));
  }
}
