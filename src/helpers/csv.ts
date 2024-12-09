import csvParser from "csv-parser";
import csvWriter from "csv-write-stream";
import * as async from "async";

import { createWriteStream, createReadStream } from "fs";

/**
 * Reads a CSV file and returns its contents as an array of objects.
 *
 * @param {string} filePath - The path to the CSV file.
 * @return {Promise<any[]>} A promise that resolves to an array of objects representing the CSV data.
 */
export const readCsv = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      const response: any[] = [];
      createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => {
          // Do something with each row of data
          response.push(data);
        })
        .on("end", () => {
          // All rows have been read
          resolve(response);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

/**
 * Creates a CSV header in the specified file path.
 *
 * @param {string} filePath - The path of the file where the CSV header will be created.
 * @return {Promise<any>} A promise that resolves with a writer object, or rejects with an error.
 */
const WriteCSVHeader = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const writer = csvWriter();
      writer.pipe(createWriteStream(filePath, { flags: "a" }));

      resolve(writer);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

/**
 * Writes rows of data to the provided writer.
 *
 * @param {any} writer - The writer to write the data to.
 * @param {any[] | object} data - The data to write. It can be an array of objects or a single object.
 * @return {Promise<void>} A promise that resolves when the writing is completed successfully, or rejects with an error.
 */
const WriteRows = (writer: any, data: any[] | object): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        if (Array.isArray(data)) {
          async.each(data, async (item) => {
            await writer.write(item);
          });
        } else {
          await writer.write(data);
        }
      }
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

/**
 * Commit the CSV file.
 *
 * @param {any} writer - The writer object used to write the CSV file.
 * @return {Promise<void>} A promise that resolves when the CSV file has been committed successfully, or rejects if there was an error.
 */
const CommitCSV = (writer: any): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await writer.end();
      resolve();
    } catch (err) {
      console.log(err);
      reject();
    }
  });
};

export default { readCsv, WriteCSVHeader, WriteRows, CommitCSV };
