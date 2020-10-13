# form-making-render

#### Description
formmaking渲染引擎二次开发 1

#### 使用方法test

1.  npm install 安装
2.  引入<render-from :configdata="configdata"></render-from>组件
3.  组件需要传入流控引擎的数据 configdata
4.  隐藏条件编写可以直接写if条件判断语句，也可以写一个function，也可以只写一个语句，但是所有的属性均需按以下格式：
    this.models.xxx  this.models为固定前缀，不可不写也不可写其他属性，xxx为每个组件唯一的model值