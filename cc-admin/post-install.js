const fs = require("fs-extra");
const ora = require("ora");
const { exec } = require("child_process");

const mainPath = "./modules";
const moduleDependencies = [];
const spinner = ora("Checking module dependencies").start();

try {
  const modules = fs.readdirSync(mainPath);
  for (const folder of modules || []) {
    if (!fs.lstatSync(`${mainPath}/${folder}`).isDirectory()) continue;
    if (!fs.existsSync(`${mainPath}/${folder}/module.json`)) continue;

    const moduleConfig = require(`${mainPath}/${folder}/module.json`);
    if (!moduleConfig.dependencies) continue;

    for (const lib in moduleConfig.dependencies) {
      moduleDependencies.push(`${lib}@${moduleConfig.dependencies[lib]}`);
    }
  }

  spinner.succeed("Checking module depencies done.");

  if (!moduleDependencies.length) return true;

  spinner.start(`Install module dependencies`);

  exec(`npm install --no-save ${moduleDependencies.join(" ")}`, err => {
    if (err) {
      return spinner.fail(`Install module dependencies failed ${err.message}`);
    }
    spinner.succeed("Install module dependencies done.");
    return true;
  });
} catch (e) {
  spinner.succeed('No modules folder')
}