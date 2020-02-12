var fs = require('fs');

exports.create = (name) => {
      try {
            fs.writeFile(name, '', (err) => {
                  if (err) throw err;
            });
            return 'Create "' + name + '" OK';
      } catch (err) {
            return 'Create "' + name + '" KO';
      }

};

exports.read = (name) => {
      try {
            fs.readFile(name, (err, data) => {
                  if (err) throw err;
            });
            return 'Read "' + name + '" OK';
      } catch (err) {
            return 'Read "' + name + '" KO';
      }

};

exports.update = (name, content) => {
      try {
            fs.writeFile(name, new Buffer(content, "base64"), (err) => {
                  if (err) throw err;
            });
            return 'Update "' + name + '" OK';
      } catch (err) {
            return 'Update "' + name + '" KO';
      }

};

exports.delete = (name) => {
      try {
            fs.unlink(name,
                  function (err) {
                        if (err) throw err;
                  });
            return 'Delete "' + name + '" OK';
      } catch (err) {
            return 'Delete "' + name + '" KO';
      }

};