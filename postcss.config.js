let environment = {
  plugins: [
    require('tailwindcss')("tailwind.config.js"),
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    }),
  ]
}

if (process.env.RAILS_ENV === "production") {
  environment.plugins.push(
    require('@fullhuman/postcss-purgecss')({
      content: [
        './app/**/*.html.erb',
        './app/helpers/**/*.rb',
        './app/javascript/**/*.js',
        './app/javascript/**/*.scss',
        './app/javascript/**/*.jsx',
        './node_modules/codemirror/**/**/*.css',
        './node_modules/codemirror/**/**/*.js',
        './node_modules/@uiw/react-md-editor/**/**/*.js',
        './node_modules/@uiw/react-md-editor/**/**/*.css'
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    })
  )
}

module.exports = environment