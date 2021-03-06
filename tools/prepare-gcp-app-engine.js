const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
console.log('Prepare GCP App Engine: ', new Date().toISOString());

const { serviceName } = yargs(process.argv).argv;
if (!serviceName) {
  console.error('Missing serviceName args. Eg: --serviceName=explore-api');
  process.exit(1);
}

const PACKAGE_JSON_PATH = path.join('package.json');
const NEW_PACKAGE_JSON_PATH = path.join(
  'dist',
  'apps',
  serviceName,
  'package.json'
);

function main() {
  const packageJson = fs.readFileSync(PACKAGE_JSON_PATH).toString();
  const scripts = {
    start: 'node main.js',
  };

  const newPackageJson = {
    ...JSON.parse(packageJson),
    scripts,
  };

  fs.writeFileSync(
    NEW_PACKAGE_JSON_PATH,
    JSON.stringify(newPackageJson, null, 2)
  );

  console.log(
    'Updated package.json: ',
    fs.readFileSync(NEW_PACKAGE_JSON_PATH).toString()
  );
}

main();
