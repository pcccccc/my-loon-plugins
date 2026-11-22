# my-loon-plugins

个人 Loon 插件与脚本合集。

## 导入

Loon → 配置 → 插件 → `+` → 粘贴链接导入：

```
https://raw.githubusercontent.com/pcccccc/my-loon-plugins/main/GoogleOneAI.plugin
```

## 文件说明

| 文件 | 类型 | 说明 |
|---|---|---|
| `GoogleOneAI.plugin` | 插件 | 页面响应体文本替换（需配合 MITM 证书） |
| `GoogleOneAI.js` | 脚本 | 上插件的配套脚本，勿删 |

## 注意

- 需要在 Loon 中生成并安装 CA 证书，并在系统设置中开启完全信任；
- 插件内的 MITM hostname 会自动合并进主配置，无需手动追加。
