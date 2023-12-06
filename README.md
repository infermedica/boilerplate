## ⚙️ Requirements
- **Node** minimum version `16.13.2`
- Additionally, instead of **npm** we decided to use [pnpm](https://pnpm.io/)

## 💡 Env file
This is basic environment variables file type:
   - `.env` -  holds the environment values. Here or in `.env.local` should add your **Infermedica's API** `APP_KEY`, `APP_ID` and `MODEL`
## ⚡️ Quick start
1. Install `Node`
2. Install `pnpm`
3. Install dependencies `pnpm install`
4. Create `.env.local`, add `VITE_APP_ID`, `VITE_APP_KEY` and `MODEL` with data from your [Infermedica's App](https://developer.infermedica.com/) developer panel
5. Start the project, `pnpm run dev`


## 📂 About project
[Infermedica Component Library](https://github.com/infermedica/component-library) allows to make application faster. When we connect [Infermedica API](https://developer.infermedica.com/) and Infermedica Component Library we make a comprehensive solution to create an application using Infermedica API. We want to improve API Developer Experience with a set of functions to handle API reference.

This project base on Vue 3, TypeScript and Vite.

---

### 🤖 Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### 📎 Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
