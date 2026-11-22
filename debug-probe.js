/**
 * Loon 调试探针（自证版）：
 * 命中 one.google.com 的响应时，直接在 HTML 里注入可见标记——
 * 1. 页面顶部红条 "G1 MITM OK"
 * 2. 页面标题加前缀 "[G1✓]"
 * 同时写 $console 日志。只用于调试，定位后删除。
 */
(function () {
  var finish = typeof $done === "function" ? $done : function () {};

  var url = (typeof $request !== "undefined" && $request && $request.url) ? $request.url : "(no url)";

  if (typeof $console !== "undefined" && $console && typeof $console.log === "function") {
    $console.log("[G1Probe] " + url);
  }
  if (typeof $notification !== "undefined" && $notification && typeof $notification.post === "function") {
    $notification.post("G1 探针", "", url);
  }

  if (typeof $response !== "undefined" && $response && typeof $response.body === "string") {
    var body = $response.body;

    // 标题前缀（HTML 页面必然有 <title>，不受通知权限影响）
    body = body.replace(/<title>/i, "<title>[G1✓] ");

    // 顶部红条
    if (body.indexOf("</body>") !== -1) {
      var banner = '<div style="position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#e53935;color:#fff;font-size:16px;font-weight:bold;padding:6px 10px;text-align:center;">G1 MITM OK &#10003;</div>';
      body = body.replace("</body>", banner + "</body>");
    }

    finish({ body: body });
    return;
  }

  finish({});
})();
