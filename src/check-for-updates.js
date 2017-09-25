const fs = require('fs')
const npmAPI = require('api-npm')
const compareVersions = require('compare-versions')
const chalk = require('chalk')

module.exports = function (callback) {
  
  // Check for a .git folder — if we receive an error, it means none exists, therefore the package has likely been installed globally
  fs.access(__dirname+'/../.git', (err) => {
    if (err) {
      // Check for new version
      const currentVersion = require(__dirname+'/../package.json')
      npmAPI.getdetails('edwp', (data) => {
        try {
          const latestVersion = data['dist-tags'].latest
          if (latestVersion && currentVersion && compareVersions(latestVersion, currentVersion) > 0) {
            console.log(chalk.magenta("A new version of 'ed' is out! Type " + chalk.yellow('npm install -g edwp') + " to upgrade"))
          }
        } catch (err) {
          console.log(chalk.red('Error checking for latest version... ' + err.message))
        }
      })
    }
  })
}