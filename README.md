# Qeb-Hwt

Try http://qeb-hwt.thoth-station.ninja/?adviser_document_id=ff78f479

## Quick-start
```bash
npm install yarn -g # ensure you have yarn on your machine globally
git clone https://github.com/goern/qeb-hwt-website # clone the project
cd qeb-hwt-website # navigate into the project directory
yarn # install patternfly-react-seed dependencies
yarn build # build the project
yarn start # start the development server
```
## Development Scripts

Install development/build dependencies
`yarn`

Start the development server
`yarn start`

Run a production build
`yarn build`

Run the test suite
`yarn test`

Run the linter
`yarn lint`

Run the code formatter
`yarn format`

Launch a tool to inspect the bundle size
`yarn bundle-profile:analyze`

## Configurations
* [TypeScript Config](./tsconfig.json)
* [Webpack Config](./webpack.common.js)
* [Jest Config](./jest.config.js)
* [Editor Config](./.editorconfig)

## Raster Image Support

To use an image asset that's shipped with patternfly core, you'll prefix the paths with "@assets". `@assets` is an alias for the patternfly assets directory in node_modules.

For example:
```js
import imgSrc from '@assets/images/g_sizing.png';
<img src={imgSrc} alt="Some image" />
```

You can use a similar technique to import assets from your local app, just prefix the paths with "@app". `@app` is an alias for the main src/app directory.

```js
import loader from '@app/assets/images/loader.gif';
<img src={loader} alt="Content loading />
```

## Vector Image Support
Inlining SVG in the app's markup is also possible.

```js
import logo from '@app/assets/images/logo.svg';
<span dangerouslySetInnerHTML={{__html: logo}} />
```

You can also use SVG when applying background images with CSS. To do this, your SVG's must live under a `bgimages` directory (this directory name is configurable in [webpack.common.js](./webpack.common.js#L5)). This is necessary because you may need to use SVG's in several other context (inline images, fonts, icons, etc.) and so we need to be able to differentiate between these usages so the appropriate loader is invoked.
```css
body {
  background: url(./assets/bgimages/img_avatar.svg);
}
```

## Code Quality Tools
* For accessibility compliance, we use [react-axe](https://github.com/dequelabs/react-axe)
* To keep our bundle size in check, we use [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* To keep our code formatting in check, we use [prettier](https://github.com/prettier/prettier)
* To keep our code logic and test coverage in check, we use [jest](https://github.com/facebook/jest)
* To ensure code styles remain consistent, we use [eslint](https://eslint.org/)

### Linter Supper
Currently, eslint and tslint are both supported. This is temporary. We will be removing support for tslint at some point in the near future, given tslint's roadmap to deprecate itself in favor of a more unified developer experience across TypeScript and JavaScript languages.
