"use strict";
const { VueLoaderPlugin } = require("vue-loader");

module.exports = [
  //{
  //  //Default
  //  entry: "./vue_src/index.js",
  //  output: {
  //    path: __dirname + "/dist",
  //    filename: "bundle.js"
  //  },
  //  mode: "production",
  //  module: {
  //    rules: [
  //      {
  //        test: /\.js$/,
  //        exclude: /node_modules/,
  //        use: {
  //          loader: "babel-loader"
  //        }
  //      },
  //      {
  //        test: /\.vue$/,
  //        loader: "vue-loader"
  //      }
  //    ]
  //  },
  //  resolve: {
  //    alias: {
  //      vue$: "vue/dist/vue.esm.js"
  //    },
  //    extensions: ["*", ".js", ".vue", ".json"]
  //  },
  //  plugins: [new VueLoaderPlugin()]
  //},
  //{
  //  //prueba 1
  //  entry: "./vue_src/index.js",
  //  output: {
  //    path: __dirname + "/dist/indicadores/surtido_embarque",
  //    filename: "bundle.js"
  //  },
  //  mode: "production",
  //  module: {
  //    rules: [
  //      {
  //        test: /\.js$/,
  //        exclude: /node_modules/,
  //        use: {
  //          loader: "babel-loader"
  //        }
  //      },
  //      {
  //        test: /\.vue$/,
  //        loader: "vue-loader"
  //      }
  //    ]
  //  },
  //  resolve: {
  //    alias: {
  //      vue$: "vue/dist/vue.esm.js"
  //    },
  //    extensions: ["*", ".js", ".vue", ".json"]
  //  },
  //  plugins: [new VueLoaderPlugin()]
  //},
  //{
  //  //surtido embarque
  //  entry: "./src/scripts/VueJS/surtido_embarque/app.js",
  //  output: {
  //    path: __dirname + "/dist/surtido_embarque",
  //    filename: "surtido.js"
  //  },
  //  mode: "production",
  //  module: {
  //    rules: [
  //      {
  //        test: /\.js$/,
  //        exclude: /node_modules/,
  //        use: {
  //          loader: "babel-loader"
  //        }
  //      },
  //      {
  //        test: /\.vue$/,
  //        loader: "vue-loader"
  //      }
  //    ]
  //  },
  //  resolve: {
  //    alias: {
  //      vue$: "vue/dist/vue.esm.js"
  //    },
  //    extensions: ["*", ".js", ".vue", ".json"]
  //  },
  //  plugins: [new VueLoaderPlugin()]
  //},
  //{
  //  //surtido embarque Monitor
  //  entry: "./src/scripts/VueJS/indicadores/MonitorEmbarques/app.js",
  //  output: {
  //    path: __dirname + "/dist/indicadores/MonitorEmbarques",
  //    filename: "Monitor.js"
  //  },
  //  mode: "production",
  //  module: {
  //    rules: [
  //      {
  //        test: /\.js$/,
  //        exclude: /node_modules/,
  //        use: {
  //          loader: "babel-loader"
  //        }
  //      },
  //      {
  //        test: /\.vue$/,
  //        loader: "vue-loader"
  //      }
  //    ]
  //  },
  //  resolve: {
  //    alias: {
  //      vue$: "vue/dist/vue.esm.js"
  //    },
  //    extensions: ["*", ".js", ".vue", ".json"]
  //  },
  //  plugins: [new VueLoaderPlugin()]
  //},
  //{
  //  //Precio Competencia Monitor
  //  entry: "./src/scripts/VueJS/indicadores/PreciosCompetencia/App.js",
  //  output: {
  //    path: __dirname + "/dist/indicadores/PreciosCompetencia",
  //    filename: "Monitor.js"
  //  },
  //  mode: "production",
  //  module: {
  //    rules: [
  //      {
  //        test: /\.js$/,
  //        exclude: /node_modules/,
  //        use: {
  //          loader: "babel-loader"
  //        }
  //      },
  //      {
  //        test: /\.vue$/,
  //        loader: "vue-loader"
  //      }
  //    ]
  //  },
  //  resolve: {
  //    alias: {
  //      vue$: "vue/dist/vue.esm.js"
  //    },
  //    extensions: ["*", ".js", ".vue", ".json"]
  //  },
  //  plugins: [new VueLoaderPlugin()]
  //},
  //{
  //  //Precio Competencia Monitor
  //  entry: "./src/scripts/VueJS/indicadores/AnalisisCambioPrecios/app.js",
  //  output: {
  //    path: __dirname + "/dist/indicadores/AnalisisCambioPrecio",
  //    filename: "app.js"
  //  },
  //  mode: "production",
  //  module: {
  //    rules: [
  //      {
  //        test: /\.js$/,
  //        exclude: /node_modules/,
  //        use: {
  //          loader: "babel-loader"
  //        }
  //      },
  //      {
  //        test: /\.vue$/,
  //        loader: "vue-loader"
  //      }
  //    ]
  //  },
  //  resolve: {
  //    alias: {
  //      vue$: "vue/dist/vue.esm.js"
  //    },
  //    extensions: ["*", ".js", ".vue", ".json"]
  //  },
  //  plugins: [new VueLoaderPlugin()]
  //},
  //{// Monitor Orden De Compra Interna
  //    entry: './src/scripts/VueJS/indicadores/MonitorOrdenCompraInterna/app.js',
  //    output: {
  //        path: __dirname + '/dist/indicadores/MonitorOrdenCompraInterna',
  //        filename: 'app.js'
  //    },
  //  mode: 'production',
  //    module: {
  //        rules: [
  //            {
  //                test: /\.js$/,
  //                exclude: /node_modules/,
  //                use: {
  //                    loader: 'babel-loader'
  //                }
  //            },
  //            {
  //                test: /\.vue$/,
  //                loader: 'vue-loader'
  //            }
  //        ]
  //    },
  //    resolve: {
  //        alias: {
  //            'vue$': 'vue/dist/vue.esm.js'
  //        },
  //        extensions: ['*', '.js', '.vue', '.json']
  //    },
  //    plugins: [
  //        new VueLoaderPlugin(),
  //    ]
  //},
  //{
  //  //Monitor Orden De Compra Interna
  //  entry:
  //    "./src/scripts/ReactJS/indicadores/MonitorOrdenCompraInterna/index.jsx",
  //  output: {
  //    path: __dirname + "/dist/indicadores/MonitorOrdenCompraInterna",
  //    filename: "bundle.js"
  //  },
  //  mode: "production",
  //  module: {
  //    rules: [
  //      {
  //        test: /\.(js|jsx)$/,
  //        exclude: /node_modules/,
  //        use: {
  //          loader: "babel-loader"
  //        }
  //      }
  //    ]
  //  },
  //  resolve: {
  //    extensions: ["*", ".js", ".vue", ".jsx", ".json"]
  //  }
  //  },
  //  {
  //      //Monitor Orden De Compra Interna
  //      entry:
  //          "./src/scripts/ReactJS/indicadores/EstadosDeResultados/index.jsx",
  //      output: {
  //          path: __dirname + "/dist/indicadores/EstadosDeResultados",
  //          filename: "bundle.js"
  //      },
  //      mode: "production",
  //      module: {
  //          rules: [
  //              {
  //                  test: /\.(js|jsx)$/,
  //                  exclude: /node_modules/,
  //                  use: {
  //                      loader: "babel-loader"
  //                  }
  //              }
  //          ]
  //      },
  //      resolve: {
  //          extensions: ["*", ".js", ".vue", ".jsx", ".json"]
  //      }
  //  },
  //  {
  //      //Monitor Flujo Inventario
  //      entry:
  //          "./src/scripts/ReactJS/indicadores/MonitorFlujoInventario/index.jsx",
  //      output: {
  //          path: __dirname + "/dist/indicadores/MonitorFlujoInventario",
  //          filename: "bundle.js"
  //      },
  //      mode: "production",
  //      module: {
  //          rules: [
  //              {
  //                  test: /\.(js|jsx)$/,
  //                  exclude: /node_modules/,
  //                  use: {
  //                      loader: "babel-loader"
  //                  }
  //              }
  //          ]
  //      },
  //      resolve: {
  //          extensions: ["*", ".js", ".vue", ".jsx", ".json"]
  //      }
  //  },
    {
        // Monitor TDC Sucursales
        entry: ['babel-polyfill',"./src/scripts/ReactJS/indicadores/MonitorTDCSucursales/Index.jsx"],
        output: {
            path: __dirname + "/dist/indicadores/MonitorTDCSucursales",
            filename: "bundle.js"
        },
        mode: "production",
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',

                    },
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".json","ts","tsx"]
        }
    }
    //{
    //    // Menus de Accesos
    //    entry:
    //        "./src/scripts/ReactJS/Accesos/Menus/Index.jsx",
    //    output: {
    //        path: __dirname + "/dist/Accesos/Menus",
    //        filename: "bundle.js"
    //    },
    //    mode: "production",//development
    //    module: {
    //        rules: [
    //            {
    //                test: /\.(js|jsx|ts|tsx)?$/,
    //                exclude: /node_modules/,
    //                use: {
    //                    loader: 'babel-loader',

    //                },
    //            }
    //        ]
    //    },
    //    resolve: {
    //        extensions: ["*", ".js", ".jsx", ".json", "ts", "tsx"]
    //    }
    //}
    //{
    //    // Monitor Cajas
    //    entry:
    //        "./src/scripts/ReactJS/indicadores/Monitor_cajas/Index.jsx",
    //    output: {
    //        path: __dirname + "/dist/indicadores/Monitor_cajas",
    //        filename: "bundle.js"
    //    },
    //    mode: "development",//development production
    //    module: {
    //        rules: [
    //            {
    //                test: /\.(js|jsx|ts|tsx)?$/,
    //                exclude: /node_modules/,
    //                use: {
    //                    loader: 'babel-loader',

    //                },
    //            }
    //        ]
    //    },
    //    resolve: {
    //        extensions: ["*", ".js", ".jsx", ".json", "ts", "tsx"]
    //    }
    //}
];
