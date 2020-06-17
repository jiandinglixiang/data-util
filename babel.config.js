module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator', // var foo = object.foo ?? "default";
    '@babel/plugin-proposal-optional-chaining' // const safe = obj?.qux?.baz; // undefined
  ]
}
