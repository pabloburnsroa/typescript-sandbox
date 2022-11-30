import fs from 'fs';

abstract class DirectoryScraper {
  constructor(public dirPath: string) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce<Record<string, unknown>>(
        (acc: Record<string, unknown>, file: string) => {
          if (this.isJSONFile(file)) {
            acc[file] = this.readJSON(`${this.dirPath}/${file}`);
          } else {
            acc[file] = this.readText(`${this.dirPath}/${file}`);
          }
          return acc;
        },
        {}
      );
  }

  abstract isJSONFile(file: string): boolean;
  abstract readText(file: string): string;
  abstract readJSON(file: string): unknown;
}

class FileReader extends DirectoryScraper {
  isJSONFile(file: string): boolean {
    return file.endsWith('.json');
  }
  readText(file: string): string {
    return fs.readFileSync(file, 'utf-8').toString();
  }

  readJSON(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, 'utf-8').toString());
  }
}

const dirScraper = new FileReader('./data');
const output = dirScraper.scanFiles();
console.log(output);
