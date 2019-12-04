In the 1.0 release of Ember CLI Mirage, the Faker library was no longer automatically bundled. This codemod helps transition apps from importing `faker` through `ember-cli-mirage`, to instead importing it directly from `faker`.

# Usage

## 1. Install faker and ember-auto-import

The easiest way to install Faker into your Ember app is to install the `faker` package directly from npm, and to use Ember Auto Import to make it easily available to your Ember app.

```sh
yarn add faker # or npm install faker --save-dev
ember install ember-auto-import
git add . && git commit -m "Adds faker, ember-auto-import"
```

## 2. Run the codemod

You can now run this command in your terminal to apply the codemod to your application's files.

```sh
npx jscodeshift ./mirage -t https://raw.githubusercontent.com/miragejs/ember-cli-mirage-faker-codemod/master/transform.js
```

The codemod updates faker import statements found in the directory you specify. The previous example applied changes to the `./mirage` directory.

You may also use faker elsewhere in your app, for example your tests directory:

```sh
npx jscodeshift ./tests -t https://raw.githubusercontent.com/miragejs/ember-cli-mirage-faker-codemod/master/transform.js
```

You can also apply it to your entire app and check `git diff` to double-check the work:

```sh
npx jscodeshift ./ -t https://raw.githubusercontent.com/miragejs/ember-cli-mirage-faker-codemod/master/transform.js
```

If you find any bugs or have any questions, please open an issue!

# Background and credit 

For more background on the situation, see [this github issue](https://github.com/samselikoff/ember-cli-mirage/issues/1037#issuecomment-411452618).

Thanks to @caseywatts for doing most of the work!