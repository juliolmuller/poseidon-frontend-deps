import {
  __esm
} from "./chunk-5537U2Q2.js";

// node_modules/clsx/dist/clsx.m.js
function r(e) {
  var t, f, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_m_default;
var init_clsx_m = __esm({
  "node_modules/clsx/dist/clsx.m.js"() {
    clsx_m_default = clsx;
  }
});

export {
  clsx,
  clsx_m_default,
  init_clsx_m
};
//# sourceMappingURL=chunk-6CPOZ5NC.js.map
