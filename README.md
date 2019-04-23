# Frontend Timeview with React, Redux & TypeScript


### Branches
- [`feature-tslint`](https://github.com/rokoroku/react-redux-typescript-boilerplate/tree/feature/tslint): yarn + tslint + prettier integrated branch.

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 2.7
- [x] [React](https://facebook.github.io/react/) 16.3
- [x] [Redux](https://github.com/reactjs/redux) 3.7
- [x] [React Router](https://github.com/ReactTraining/react-router) 4.2
- [x] [React Router Redux](https://github.com/reactjs/react-router-redux) 5
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [TodoMVC example](http://todomvc.com)

### Build tools

- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [CSS next](https://github.com/MoOx/postcss-cssnext)
  - [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [ExtractText Plugin](https://github.com/webpack/extract-text-webpack-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)
- [x] [Prettier](https://github.com/prettier/prettier)

## Setup

```
$ npm install
```

## Running

```
$ npm start
```

## Build

```
$env:__API_PATH__ = "http://app.timeview.com.br:8081/api"
$env:__AUTH_PATH__ = "http://app.timeview.com.br:8081"
$env:__WS_PATH__ = "ws://app.timeview.com.br:8081/connect"
npm run build
```

## Prettier

```
$ npm run prettier
```

# License

MIT
