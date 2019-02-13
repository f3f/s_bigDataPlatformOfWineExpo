# 目录结构
* dist   打包的目标文件夹
* node_modules   Node模块安装文件夹
* resource   图形等其他资源目录
* src   源码文件夹
    * common   项目中的通用代码
    * index   首页测试代码
    * vendor   供应商代码
        * jusfoun   供应的库和代码
        * threejs   THREE.js供应的库和代码，注意THREE已在Node模块库中，此处仅存放THREE库中并未包含的工具类代码

* bower.json   Bower配置文件
* gulpfile.js   Gulp任务配置文件
* package.json
* webpack.config.js   Webpack配置文件

# 代码打包
使用Gulp任务驱动Webpack进行打包。   
本测试环境的命令为Gulp dev，该命令会调用dev任务下的所有分支任务，比如文件拷贝替换、调用Webpack对js文件进行打包等工作。   
实际JS文件打包由Webpack进行，其会将第三方库打入单独的vendor.js文件中，将index业务功能相关的代码打入index.js中。   


# CommonJS模拟器
一般使用CommonJS的项目需要打包之后才能执行，为了方便开发调试，九次方可视化部提供了一个CommonJS模拟器，   
可在不打包的情况下在浏览器中模拟出Node的CommonJS模块依赖环境，并正常运行所有代码。   
使用步骤：   

* 在HTMl中引入CommonJS模拟器代码（vendor/jusfoun/commonjs-simulator.min.js）   
* 为真正的入口js编写模拟入口，并在HTML中引入   
    * 声明Node模块目录，用以自动化查找公共库，如require("jquery")   
    * 引入真实的入口，如require("./index.js")   
    * 建议模拟入口名称为真实入口名称前加下划线   
    * 打包时请使用真实入口   
    * 在实际代码中请遵守如下规则   
        * require的路径不得为完全限定路径，如require("file:///path/to/file")、require("/path/to/file")   
        * require的路径应相对于使用require的文件路径   
        * require的路径如果不包含路径分隔符（如"/"），则优先视为Node模块   



# Require
目前模拟器以及Webpack配置可require的对象有

* JavaScript文件
* JSON文件，得到的便是JSON文件中所定义的对象
* CSS文件，会在当前页面中注入CSS样式
* OBJ格式文件（3D模型），获取的是文件的文本信息，可供下一步解析处理

后续将扩展其他的特性。






