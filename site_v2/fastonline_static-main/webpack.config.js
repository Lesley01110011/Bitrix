const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pages = require("./src/js/pages");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";

module.exports = {
  mode,
  target,
  entry: path.resolve(__dirname, "./src/js/index.js"),

  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "js/bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "docs"),
    },
    client: {
      overlay: true,
      progress: true,
    },
    open: true,
    watchFiles: [
      "src/*.html",
      "src/pages/*.html",
      "src/includes/*.html",
      "src/css/*.css",
      "src/js/pages.js",
      "src/js/sprite.js",
    ],
    hot: true,
    compress: false,
    port: 9000,
  },
  plugins: [
    ...pages,
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!.git"],
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets/favicon",
          to: "./assets/favicon/",
          noErrorOnMissing: true,
        },
        {
          from: "src/assets/images",
          to: "./assets/images/",
          noErrorOnMissing: true,
        },

        {
          from: "src/assets/favicons",
          to: "./assets/favicons/",
          noErrorOnMissing: true,
        },
        {
          from: "src/assets/fonts",
          to: "./assets/fonts/",
          noErrorOnMissing: true,
        },
      ],
    }),
    new SpriteLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(?:ico|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(jpeg|jpg|png|webp|gif)$/i,
        type: "asset/resource",
        use: devMode
          ? []
          : [
              "file-loader",
              {
                loader: "image-webpack-loader",
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/inline",
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: "sprite.svg",
          publicPath: "/assets/",
        },
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
