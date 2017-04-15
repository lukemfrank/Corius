// storageMock.js
// a LocalStorage mock

 export default function() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },

    getItem: function(key) {
      return storage[key];
    },

    removeItem: function(key) {
      delete storage[key];
    },

    get length() {
      return Object.keys(storage).length;
    },

    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
};
