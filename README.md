# 这是什么？
这是飞书多维表格仪表盘插件-html开发模板。
关于仪表盘插件，您可以在[多维表格仪表盘插件开发指南](https://bytedance.larkoffice.com/docx/X0DRdskrpoxf8kxfFj1csLtNnmc)中了解更多信息 ）。


# 开始
- `npm i` 安装依赖包。
- `npm run dev` 启动项目
- 编辑 [index.ts](#src/index.ts) 并观看实时更新！
- 编辑完成后，`npm run build` 打包项目。
- 然后可以选择上架飞书多维表格仪表盘插件市场，给所有人使用。或者使用您自己的服务器部署，供您公司内部使用。

## 国际化
本模板使用[jquery-i18next](https://locize.com/blog/jquery-i18next/)进行国际化。
- 在js文件中通过$.t()调用，如中文环境下:
```js
console.log($.t('content', {num:888})) // '这是中文内容888'
console.log($.t('title')) // '这是中文标题'
```

- 在标签中使用:
通过将属性data-i18n设置为某个语言配置的key，在使用该语言的时候，将使用该key对应的值覆盖标签的内容，从而实现国际化。
data-i18n-options用于插值，同$.t函数的第二个参数，将替换语言配置中被{{}}包裹的变量。

```html
<h1 data-i18n="title">默认标题</h1>

<h2 data-i18n="content" data-i18n-options='{"num":888}'> </h2>
```

如果要在input等不含子元素的元素中使用，则需要给data-i18n属性值加上 [希望赋值的标签属性] 前缀，
比如，给input的placeholder属性进行国际化配置：

```html
<input data-i18n="[placeholder]title"/>

```




# What is this?
This is the Feishu Multi-dimensional Table Dashboard Plugin-html development template.
For dashboard plugins, you can learn more in the [Multi-dimensional Table Dashboard Plugin Development Guide](https://bytedance.larkoffice.com/docx/X0DRdskrpoxf8kxfFj1csLtNnmc) ).

# Get Started
- `npm i` installs dependency packages.
- `npm run dev` starts the project
- Edit [index.ts](#src/index.ts) and watch the real-time updates!
- After editing, `npm run build` packages the project.
- Then you can choose to list it on the Feishu Multi-dimensional Table Dashboard Plugin Market for everyone to use. Or use your own server deployment for internal use in your company.

## Internationalization
This template uses [jquery-i18next](https://locize.com/blog/jquery-i18next/) for internationalization.
- Called in js file by $.t(), such as in Chinese environment:
```js
console.log($.t('content', {num:888})) // 'This is Chinese content 888'
console.log($.t('title')) // 'This is Chinese title'
```

- Used in tags:
By setting the attribute data-i18n to a key in a language configuration, when using the language, the value corresponding to the key will be used to overwrite the content of the tag, thereby achieving internationalization.
data-i18n-options is used for interpolation, the same as the second parameter of the $.t function, which will replace the variables wrapped by {{}} in the language configuration.

```html
<h1 data-i18n="title">Default title</h1>

<h2 data-i18n="content" data-i18n-options='{"num":888}'> </h2>
```

If you want to use it in an element without child elements such as input, you need to add the prefix [the tag attribute you want to assign] to the data-i18n attribute value.
For example, configure the internationalization of the placeholder attribute of input:

```html
<input data-i18n="[placeholder]title"/>

```