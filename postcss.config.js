module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
}

// 今天 demo 完會再做處理
// let environment = {
//   plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//     require('postcss-import'),
//     require('postcss-flexbugs-fixes'),
//     require('postcss-preset-env')({
//       autoprefixer: {
//         flexbox: 'no-2009'
//       },
//       stage: 3
//     }),
//   ]
// }

// if (process.env.RAILS_ENV === "production") {
//   environment.plugins.push(
//     require('@fullhuman/postcss-purgecss')({
//       content: [
//         './app/**/**/*.html.erb',
//         './app/**/**/*.rb',
//         './app/**/**/*.js',
//         './app/**/**/*.scss',
//         './app/**/**/*.jsx',
//       ],
//       defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
//     })
//   )
// }

// module.exports = environment