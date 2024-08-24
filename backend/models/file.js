const files = [];

class File {
  constructor({ name, path }) {
    this.name = name;
    this.path = path;
  }

  save() {
    files.push(this);
  }

  static find() {
    return Promise.resolve(files);
  }
}

module.exports = File;