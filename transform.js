export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source)
  const getFirstPath = () => root.find(j.Program).get('body', 0);

  const hasAnyFakerImports = true;
  const importsAnythingFromFakerAlready = true;

  if (hasAnyFakerImports) {  // if faker isn't used in this file, skip it
    if (importsAnythingFromFakerAlready) {
      findAndInsertFaker(root);
    } else {
      insertFakerAtTop(root);
    }
    removeOldFaker(root);
  }

  return root.toSource({quote: 'single'});

  function findAndInsertFaker(root) {
    root
    .find(j.ImportSpecifier)
    .forEach(path => {
      if (isImportingFromFaker(path)) {
        if (isImportingFaker(path)) {
          // noop
        } else {
          insertSpecifier(path)
        }
      }
    })
  }

  function insertNewFaker(root) {
    root
      .find(j.ImportDeclaration)
      .forEach(path => {
        if (isAlreadyImportingSomethingFromFaker(path)) {
          insertFakerAtTop()
          // this should be inserting into, not inserting after
        } else {
          insertFakerAtTop()
        }
      })
  }

  function removeOldFaker(root) {
    root
      .find(j.ImportSpecifier)
      .forEach(path => {
        if (isImportingFaker(path) && isImportingFromEmberCliMirage(path)) {
          removeSpecifierOrImportDeclaration(path)
        }
      })
  }

  function insertFakerAtTop(root) {
    j(getFirstPath()).insertBefore(standardFakerImport())
  }

  function standardFakerImport() {
    return j.importDeclaration(
      [
        j.importSpecifier(j.identifier("faker"))
      ],
      j.literal('faker')
    );
  }

  function isImportingFaker(path) {
    return path.node.imported.name === "faker"
  }

  function isAlreadyImportingSomethingFromFaker(path) {
    return path.node.source.value === "faker"
  }

  function isImportingFromEmberCliMirage(path) {
    return path.parent.node.source.value === "ember-cli-mirage"
  }

  function isImportingFromFaker(path) {
    return path.parent.node.source.value === "faker"
  }

  function isOnlySpecifierInImportDeclaration(path) {
    return path.parent.node.specifiers.length === 1
  }

  function removeSpecifierOrImportDeclaration(path) {
    if (isOnlySpecifierInImportDeclaration(path)) {
      j(path.parent).remove(); // remove entire import declaration
    } else {
      j(path).remove(); // remove just the one specifier
    }
  }

  function insertSpecifier(path) {
    path.parent.get('specifiers').push(
      j.importSpecifier(j.identifier("faker"))
    )
  }
}
