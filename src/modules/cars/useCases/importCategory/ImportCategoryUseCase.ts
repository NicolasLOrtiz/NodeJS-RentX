import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

type IImportCategory = [name: string, description: string];

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      const parserFile = parse();

      stream.pipe(parserFile);

      parserFile
        .on("data", async (line: IImportCategory): Promise<void> => {
          const [name, description] = line;

          categories.push([name, description]);
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map((category) => {
      const [name, description] = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory)
        return this.categoriesRepository.create({ name, description });

      return null;
    });
  }
}

export { ImportCategoryUseCase };
