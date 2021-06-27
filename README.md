## Setup Puppeteer with Typescript

<p align="center">
 <a href="#dependency">Dependency</a> -
 <a href="#usage">Usage</a> 
</p>

## Dependency
<p>
 <a href="https://www.typescriptlang.org/" target="_blank"> 
  <img src="https://github.com/williambrito98/setup-puppeteer-with-typescript/blob/master/src/icons/typescript-icon.png" width="40px"/ alt="typescript">
 </a>
 <a href="https://nodejs.org/en/" target="_blank">
  <img src="https://github.com/williambrito98/setup-puppeteer-with-typescript/blob/master/src/icons/nodejs-icon.png" width="40px" / alt="node js">
 </a> 
 <a href="https://pptr.dev/" target="_blank">
  <img src="https://github.com/williambrito98/setup-puppeteer-with-typescript/blob/master/src/icons/puppeteer-icon.png" width="40px"/ alt="puppeteer">
 </a>
 <a href="https://babeljs.io/" target="_blank"> 
  <img src="https://github.com/williambrito98/setup-puppeteer-with-typescript/blob/master/src/icons/babel-icon.png" width="40px"/ alt="babel">
 </a> 
 <a href="https://eslint.org/" target="_blank"> 
  <img src="https://github.com/williambrito98/setup-puppeteer-with-typescript/blob/master/src/icons/eslint-icon.svg" width="40px" / alt="eslint">
 </a> 
</p>


## Usage

Run typescript
```
  npx ts-node ./src/index.ts
```
Compile Tyscript

```
  ./node_modules/.bin/babel src --extensions \".ts\" --out-dir dist --copy-files --no-copy-ignored
```

After compiling, the js files will be in the dist folder
