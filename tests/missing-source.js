"use strict";
const fcopy = require('..');
const t = require('tap');
const fs = require('fs');
const path = require('path');
const PREFIX = path.basename(__filename, '.js');
if (!fs.existsSync(__dirname + '/tmp')) fs.mkdirSync(__dirname + '/tmp');

t.test('copying non-node existent file fails', function (callback) {
    const F1 = __dirname + '/tmp/' + PREFIX + '-1-does-not-exist1'
    const F2 = __dirname + '/tmp/' + PREFIX + '-1-does-not-exist2'

    if (fs.existsSync(F1)) fs.unlinkSync(F1);
    if (fs.existsSync(F2)) fs.unlinkSync(F2);

    return fcopy(F1, F2)
        .then(() => t.fail('expected call to fail'))
        .catch(ex => t.ok(ex.code, 'ENOENT'));
})

t.test('copying non-node existent file does not overwrite target', function (callback) {
    const F1 = __dirname + '/tmp/' + PREFIX + '-2-does-not-exist'
    const F2 = __dirname + '/tmp/' + PREFIX + '-2-exists'
    var CONTENTS = 'world';

    if (fs.existsSync(F1)) fs.unlinkSync(F1);
    fs.writeFileSync(F2, CONTENTS);

    return fcopy(F1, F2)
        .catch((ex) => {
            var data = fs.readFileSync(F2).toString();
            t.ok(data, CONTENTS)
        });
})
