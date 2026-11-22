/**
 * Loon 调试版：G1 响应体改写
 * 每次被触发都会弹通知，报告触发 URL、body 大小、两个特征串各命中几次。
 * 定位完成后换回正式版。
 */
(function () {
  var finish = typeof $done === "function" ? $done : function () {};
  var notify = function (sub, body) {
    if (typeof $notification !== "undefined" && $notification && typeof $notification.post === "function") {
      $notification.post("G1 调试", sub, body);
    }
  };

  // 无响应上下文（手动运行、预执行等）：放行
  if (typeof $response === "undefined" || $response === null) {
    finish({});
    return;
  }

  var url = (typeof $request !== "undefined" && $request && $request.url) ? $request.url : "(unknown)";
  var body = $response.body;

  if (typeof body !== "string" || body.length === 0) {
    notify("body 异常", "url=" + url + "\nbodyType=" + (typeof body));
    finish({});
    return;
  }

  var c1 = (body.match(/g1\.ios\.30tb\.ai\.pro\.m/g) || []).length;
  var c2 = (body.match(/g1\.ios\.20tb\.m\.v2/g) || []).length;

  notify("已触发", "url=" + url + "\nlen=" + body.length + "\n30tb命中=" + c1 + "  20tb命中=" + c2);

  var newBody = body
    .replace(/g1\.ios\.30tb\.ai\.pro\.m/g, "g1.ai.ultra.3months_ip_90p.acq")
    .replace(/g1\.ios\.20tb\.m\.v2/g, "g1.20tb.3months_ip_90p.acq");

  finish({ body: newBody });
})();
