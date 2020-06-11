module.exports = {
  //publicPath: "./static",
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    host: "0.0.0.0",
    port: 8081, // 端口号
    https: false, 
    //open: true, //配置自动启动浏览器
    
    //代理
    proxy: {
      "/proxy": {
        target: "http://localhost:8080", // 要访问的接口域名
        ws: true, // 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/proxy": "" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        }
      } 
		}
  },
	transpileDependencies:["vuetify-datetime-picker","vuetify",]
}