const { readdirSync } = require('fs');

module.exports = readdirSync('./server/controllers')
    .filter(name => name !== 'index.js')
    .reduce((controllersAccumulator, file) => Object.assign(
        controllersAccumulator,
        {
            [`${file.replace('.controller.js', '')}Controller`]: readdirSync('./server/controllers')
                .filter(name => name !== 'index.js' && name === file)
                .map(fileName => require(`./${fileName}`))
                .reduce((_previousFile, controllerFile) => controllerFile, {}),
        },
    ), {});
