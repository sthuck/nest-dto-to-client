import { Project } from 'ts-morph';
import { ExtractInterface } from './extract-interface';
import * as path from 'path';

export const main = async (tsConfigPath) => {
  const project = new Project({ tsConfigFilePath: tsConfigPath });
  const files = project.getSourceFiles();
  const dtos = files.filter((f) => f.getBaseName().includes('.dto.ts'));
  const newProject = new Project({ useInMemoryFileSystem: true });

  for (const dtoFile of dtos) {
    const name = dtoFile.getBaseName();
    const outputFile = newProject.createSourceFile(name);

    const imports = dtoFile.getImportDeclarations();
    imports.forEach((i) => {
      const importedFrom = i.getModuleSpecifier().getLiteralValue();
      if (importedFrom.includes('.dto')) {
        const importStructure = i.getStructure();
        importStructure.moduleSpecifier =
          '.' + path.sep + path.basename(importStructure.moduleSpecifier);
        outputFile.addImportDeclaration(importStructure);
      }
    });

    await Promise.all(
      dtoFile.getClasses().map(async (c) => {
        ExtractInterface(c, outputFile);
      }),
    );
  }

  const result = newProject.getSourceFiles().map((file) => {
    const text = file.getFullText();
    const name = file.getBaseName();
    return { text, name };
  });

  return result;
};
