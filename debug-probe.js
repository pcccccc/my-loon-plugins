/**
 * Loon 调试探针：对 one.google.com 的所有响应弹通知，报告 URL 和 body 大小。
 * 只观察不修改，定位问题后删除。
 */
(function () {
  var finish = typeof $done === "function" ? $done : function () {};
  var notify = function (body) {
    if (typeof $notification !== "undefined" && $notification && typeof $notification.post === "function") {
      $notification.post("G1 探针", "", body);
    }
  };

  var url = (typeof $request !== "undefined" && $request && $request.url) ? $request.url : "(no url)";
  var body = (typeof $response !== "undefined" && $response) ? $response.body : undefined;
  var info = (typeof body === "string") ? ("len=" + body.length) : ("bodyType=" + (typeof body));

  notify(url + "\n" + info);
  finish({});
})();
