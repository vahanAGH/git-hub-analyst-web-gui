# Github analyst web application GUI

### Description
This is demo SPA app as client for analysis of GitHub repositories activities
This project is pure JS(Angular) app and was generated with [Angular CLI](https://github.com/angular/angular-cli).

### Pre-requirement
- [Nodejs](https://nodejs.org/en/) at least v10.15.3 should be in host machine
- [Angular CLI](https://github.com/angular/angular-cli) at least v7.3.9. should be installed on host machine.
  To install `Angula CLI` run `npm install -g @angular/cli` in cmd or shell.
 
## Prepare app to run
Run the following command in project dir `git-hub-analyst-web-gui`.
```
npm install
```
Please note that in `git-hub-analyst-web-gui/src/environments` dir there are config files 'environment.prod.ts'
and `environment.ts` for production and development env. Please change the `apiUrl` property in this files to point
to back-end app URL if needed.

## Development server
 - This application using 4200 port by default for development.
   Please make sure that 4200 port is not used by other app on host machine.
 - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/<project_name>` directory. Use the `--prod` flag for a production build.

## Running the app
 - You can follow the 'Development server' chapter to run app as development server.
 - You can put deploy (in our case it is copy/paste) files from `dist/<project_name>` directory in appropriate dir of any web or app server.
   E.g. if you want to deploy `git-hub-analyst-web-gui` app in back-end server please copy files from `dist/<project_name>` 
   to `git-hub-analyst/src/main/resources/static` folder before build (package) `git-hub-analyst` app.
