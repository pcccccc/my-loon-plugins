/**
 * Loon 版 Google One AI 响应体改写脚本
 *
 * 等价于 Surge 的 [Body Rewrite]:
 * http-response ^https://one\.google\.com/ai\? g1\.ios\.30tb\.ai\.pro\.m g1.ai.ultra.3months_ip_90p.acq g1\.ios\.20tb\.m\.v2 g1.20tb.3months_ip_90p.acq
 *
 * 即把响应体中出现的套餐标识：
 *   g1.ios.30tb.ai.pro.m -> g1.ai.ultra.3months_ip_90p.acq
 *   g1.ios.20tb.m.v2     -> g1.20tb.3months_ip_90p.acq
 *
 * 兼容性说明：
 * - $response 仅在 http-response 事件真正携带响应时注入；手动运行/预加载等场景下
 *   不存在，直接放行，避免 "Can't find variable: $response" 异常。
 * - 使用 IIFE 包裹，避免 Loon 在同一 JS 上下文重复执行时顶层变量重复声明。
 */
(function () {
  var finish = typeof $done === "function" ? $done : function () {};

  // 无响应上下文（手动运行、预执行、cron 等）：原样放行
  if (typeof $response === "undefined" || $response === null) {
    finish({});
    return;
  }

  var body = $response.body;

  // 无 body 或非字符串（binary 模式等）：原样放行
  if (typeof body !== "string" || body.length === 0) {
    finish({});
    return;
  }

  var newBody = body
    .replace(/g1\.ios\.30tb\.ai\.pro\.m/g, "g1.ai.ultra.3months_ip_90p.acq")
    .replace(/g1\.ios\.20tb\.m\.v2/g, "g1.20tb.3months_ip_90p.acq");

  finish({ body: newBody });
})();
