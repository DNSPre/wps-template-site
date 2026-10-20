# WPS Template 交互原型

打开 index.html 即可预览。运行 npm test 检查交互逻辑，npm run build 重建首页。

## GitHub Pages

推送后，在仓库 Settings → Pages 选择 Deploy from a branch，main 分支，/ (root) 目录，使用生成的网址分享。

## 演示范围

登录、支付、客户端同步为演示与适配接口，尚未接入真实服务，不会实际收款。付费素材标记为产品交互示例。

## 素材

OpenMoji 沿用原授权，字体包包含 SIL OFL 授权文件。WPS 品牌归权利人所有，本原型不是官方服务。

## Locale 路由

对齐 https://www.wps.ai/en-us/locale/ 的小写语言-地区路径：en-us、zh-hk、tl-ph 等。本站已有的额外地区版本继续保留；内部语言标识仍使用 BCP 47。首页 /zh-hk/，地区选择 /zh-hk/locale/，资源列表 /zh-hk/resources/；详情继续保留 #resource-ID。

旧 ?locale=、?lang=&market= 链接会在页面加载后迁移到对应路径，保留资源与其他查询参数。明确的路径 locale 优先于查询参数与本地偏好。

构建时生成各地区的静态入口，共用 site-runtime 中的脚本与样式，直接刷新不依赖服务器重写；outputs 中保留可离线使用的单文件原型。
