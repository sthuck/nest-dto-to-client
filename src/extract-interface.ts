import {
  ArrayLiteralExpression,
  CallExpression,
  ClassDeclaration,
  Node,
  SourceFile,
  SyntaxKind,
} from 'ts-morph';

export function ExtractInterface(c: ClassDeclaration, outputFile: SourceFile) {
  const i = c.extractInterface();
  const e = c.getExtends();
  if (e) {
    const [extendsStatement] = e.getChildren();

    if (Node.isCallExpression(extendsStatement)) {
      i.extends = [extractInterfaceFromCallStatement(extendsStatement)];
    } else {
      i.extends = [e.getText()];
    }
  }
  i.isExported = true;
  outputFile.addInterface(i);
}

const OmitPickTemplateHelper = (args: Node[]) => {
  const extendedClass = args[0];
  let extendedClassStr = Node.isCallExpression(extendedClass)
    ? extractInterfaceFromCallStatement(extendedClass)
    : extendedClass.getText();

  let keys = args[1];

  if (Node.isAsExpression(keys)) {
    keys = keys.getChildrenOfKind(SyntaxKind.ArrayLiteralExpression)[0];
  }

  if (Node.isArrayLiteralExpression(keys)) {
    const keysJoined = keys
      .getElements()
      .map((n) => n.getText())
      .join('|');
    return [extendedClassStr, keysJoined];
  }
  const argsText = `[${args.map((n) => n.getText()).join(',')}]`;
  throw new Error('No array literal for Omit/Pick type ' + argsText);
};

type NestToNativeTypeConvert = {
  template(args: Node[]): string;
};

const FnMap: Record<string, NestToNativeTypeConvert> = {
  PartialType: {
    template: (args: Node[]) => {
      const child = args[0];
      const content = Node.isCallExpression(child)
        ? extractInterfaceFromCallStatement(child)
        : child.getText();
      return `Partial<${content}>`;
    },
  },
  OmitType: {
    template: (args: Node[]) => {
      const [extendedClassStr, keysJoined] = OmitPickTemplateHelper(args);
      return `Omit<${extendedClassStr}, ${keysJoined}>`;
    },
  },
  PickType: {
    template: (args: Node[]) => {
      const [extendedClassStr, keysJoined] = OmitPickTemplateHelper(args);
      return `Pick<${extendedClassStr}, ${keysJoined}>`;
    },
  },
};

function extractInterfaceFromCallStatement(extendsStatement: CallExpression) {
  const [fnName, ...args] = extendsStatement.forEachChildAsArray();

  const typeConvert = FnMap[fnName.getText()];
  return typeConvert.template(args);
}
