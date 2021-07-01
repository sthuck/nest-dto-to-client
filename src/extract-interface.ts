import {
  ArrayLiteralExpression,
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
      const fnName = extendsStatement.getChildAtIndex(0);
      const args = extendsStatement.getChildAtIndex(2);
      debugger;
      if (fnName.getText() === `PartialType`) {
        i.extends = [`Partial<${args.getText()}>`];
      } else if (['OmitType', 'PickType'].includes(fnName.getText())) {
        try {
          debugger;
          const extendedClass = args.getChildAtIndex(0).getText();

          const keys = args.getFirstDescendantByKind(
            SyntaxKind.ArrayLiteralExpression,
          );
          const keysJoined = keys
            .getElements()
            .map((n) => n.getText())
            .join('|');

          const type = fnName.getText() === 'OmitType' ? 'Omit' : 'Pick';
          i.extends = [`${type}<${extendedClass}, ${keysJoined}>`];
        } catch (e) {
          console.log(args.getText());
          throw e;
        }
      } else {
        throw 'unhandled case';
      }
    } else {
      i.extends = [e.getText()];
    }
  }
  i.isExported = true;
  outputFile.addInterface(i);
}
