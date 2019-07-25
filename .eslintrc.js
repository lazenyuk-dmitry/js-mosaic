module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-new": "off",
        "no-undef": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-unresolved": "off",
        "global-require": "off"
    }
};
