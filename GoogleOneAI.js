/**
 * Loon 版 Google One AI 响应体改写脚本
 *
 * 等价于 Surge 的 [Body Rewrite]:
 * http-response ^https://one\.google\.com/ai\? g1\.ios\.30tb\.ai\.pro\.m g1.ai.ultra.3months_ip_90p.acq g1\.ios\.20tb\.m\.v2 g1.20tb.3months_ip_90p.acq
 *
 * 即把响应体中出现的套餐标识：
 *   g1.ios.30tb.ai.pro.m -> g1.ai.ultra.3months_ip_90p.acq
 *   g1.ios.20tb.m.v2     -> g1.20tb.3months_ip_90p.acq
 */

let body = $response.body;

// 防御：body 为空或非字符串（binary 模式）时原样放行
if (typeof body !== "string" || body.length === 0) {
  $done({});
}

body = body
  .replace(/g1\.ios\.30tb\.ai\.pro\.m/g, "g1.ai.ultra.3months_ip_90p.acq")
  .replace(/g1\.ios\.20tb\.m\.v2/g, "g1.20tb.3months_ip_90p.acq");

$done({ body: body });
