function HashTable(limit = 8) {
  this._limit = limit;
  this._storage = {};
  this._count = 0;

  this.print = function () {
    console.log(this._storage);
  }
};

// hashing function; add function to String class prototype
String.prototype.hashCode = function (max = 4) {
  let hash = 0;
  if (!this.length) return hash;

  for (let i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // conversion to 32-bit int
  }

  return Math.abs(max ? hash % max : hash);
};

HashTable.prototype.add = function (key, value) {
  let index = key.hashCode();
  let tuple = [key, value];
  let bucket = this._storage;

  if (bucket[index] === undefined) {
    bucket[index] = [
      tuple
    ];
  }
  else {
    let inserted = false;
    for (let i = 0; i < bucket[index].length; i++) {
      if (bucket[index][i][0] === key) {
        bucket[index][i][1] = value;
        inserted = true;
      }
    }

    if (inserted === false) {
      bucket[index].push(tuple);
    }
  }
};

HashTable.prototype.remove = function (key) {
  let index = key.hashCode();
  let bucket = this._storage;

  if(bucket[index].length === 1 && bucket[index][0][0] === key){
    delete bucket[index];
  }else{
    for(let i = 0; i < bucket[index].length; i++){
      if(bucket[index][i][0] === key){
        delete bucket[index];
      }
    }
  }
};

HashTable.prototype.lookup = function(key){
  let index = key.hashCode();
  let bucket = this._storage;

  if(bucket[index] === undefined){
    return 'Not found';
  }

  // iteratively search through the bucket for a match
  for(let i = 0; i < bucket[index].length; i++){
    if(bucket[index][i][0] === key){
      return bucket[index][i][1]; // this should be the value
    }
  }
}