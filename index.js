const { readdirSync, statSync, readFileSync, appendFileSync } = require("fs");

const FILE_TO_EXCLUDE = "README.md";
const NEW_FILE = "./newFile.js";

const excludeFileFromList = (list) =>
  list.filter((e) => !e.includes(FILE_TO_EXCLUDE));

const numberOfFilesAndDirectories = (path = "./", total = 0) => {
  try {
    const list = excludeFileFromList(readdirSync(path));
    total += list.length;
    for (const element of list) {
      const newPath = `${path}${element}`;
      const stats = statSync(newPath);

      if (stats.isDirectory()) {
        total += numberOfFilesAndDirectories(`${newPath}/`);
      }
    }
    return total;
  } catch (error) {
    console.info("> error: ", error.message);
  }
};

console.info(
  "> number of files and directories: ",
  numberOfFilesAndDirectories()
);

const numberOfFiles = (path = "./", total = 0) => {
  try {
    const list = excludeFileFromList(readdirSync(path));
    for (const element of list) {
      const newPath = `${path}${element}`;
      const stats = statSync(newPath);

      !stats.isDirectory() && (total += 1);

      if (stats.isDirectory()) {
        total += numberOfFiles(`${newPath}/`);
      }
    }
    return total;
  } catch (error) {
    console.info("> error: ", error.message);
  }
};

console.info("> number of files: ", numberOfFiles());

const totalFilesSize = (path = "./", total = 0) => {
  try {
    const list = excludeFileFromList(readdirSync(path));
    for (const element of list) {
      const newPath = `${path}${element}`;
      const stats = statSync(newPath);

      !stats.isDirectory() && (total += stats.size);

      if (stats.isDirectory()) {
        total += totalFilesSize(`${newPath}/`);
      }
    }
    return total;
  } catch (error) {
    console.info("> error: ", error.message);
  }
};

console.info("> total files size: ", `${totalFilesSize()} bytes`);

const appendIntoNewFile = (path = "./") => {
  try {
    const list = excludeFileFromList(readdirSync(path));
    for (const element of list) {
      const newPath = `${path}${element}`;
      const stats = statSync(newPath);

      if (!stats.isDirectory()) {
        const fileContent = readFileSync(newPath).toString();
        appendFileSync(NEW_FILE, fileContent);
      }

      if (stats.isDirectory()) {
        appendIntoNewFile(`${newPath}/`);
      }
    }
  } catch (error) {
    console.info("> error: ", error.message);
  }
};
