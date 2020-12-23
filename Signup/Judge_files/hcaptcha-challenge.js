var hcaptcha = function() {
    "use strict";
  
    function t(t) {
      var e = this.constructor;
      return this.then(function(n) {
        return e.resolve(t()).then(function() {
          return n
        })
      }, function(n) {
        return e.resolve(t()).then(function() {
          return e.reject(n)
        })
      })
    }
    var e = setTimeout;
  
    function n() {}
  
    function i(t) {
      if (!(this instanceof i)) throw new TypeError("Promises must be constructed via new");
      if ("function" != typeof t) throw new TypeError("not a function");
      this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], h(t, this)
    }
  
    function s(t, e) {
      for (; 3 === t._state;) t = t._value;
      0 !== t._state ? (t._handled = !0, i._immediateFn(function() {
        var n = 1 === t._state ? e.onFulfilled : e.onRejected;
        if (null !== n) {
          var i;
          try {
            i = n(t._value)
          } catch (s) {
            return void r(e.promise, s)
          }
          o(e.promise, i)
        } else(1 === t._state ? o : r)(e.promise, t._value)
      })) : t._deferreds.push(e)
    }
  
    function o(t, e) {
      try {
        if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
        if (e && ("object" == typeof e || "function" == typeof e)) {
          var n = e.then;
          if (e instanceof i) return t._state = 3, t._value = e, void a(t);
          if ("function" == typeof n) return void h((s = n, o = e, function() {
            s.apply(o, arguments)
          }), t)
        }
        t._state = 1, t._value = e, a(t)
      } catch (l) {
        r(t, l)
      }
      var s, o
    }
  
    function r(t, e) {
      t._state = 2, t._value = e, a(t)
    }
  
    function a(t) {
      2 === t._state && 0 === t._deferreds.length && i._immediateFn(function() {
        t._handled || i._unhandledRejectionFn(t._value)
      });
      for (var e = 0, n = t._deferreds.length; e < n; e++) s(t, t._deferreds[e]);
      t._deferreds = null
    }
  
    function l(t, e, n) {
      this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
    }
  
    function h(t, e) {
      var n = !1;
      try {
        t(function(t) {
          n || (n = !0, o(e, t))
        }, function(t) {
          n || (n = !0, r(e, t))
        })
      } catch (i) {
        if (n) return;
        n = !0, r(e, i)
      }
    }
    i.prototype["catch"] = function(t) {
      return this.then(null, t)
    }, i.prototype.then = function(t, e) {
      var i = new this.constructor(n);
      return s(this, new l(t, e, i)), i
    }, i.prototype["finally"] = t, i.all = function(t) {
      return new i(function(e, n) {
        if (!t || "undefined" == typeof t.length) throw new TypeError("Promise.all accepts an array");
        var i = Array.prototype.slice.call(t);
        if (0 === i.length) return e([]);
        var s = i.length;
  
        function o(t, r) {
          try {
            if (r && ("object" == typeof r || "function" == typeof r)) {
              var a = r.then;
              if ("function" == typeof a) return void a.call(r, function(e) {
                o(t, e)
              }, n)
            }
            i[t] = r, 0 == --s && e(i)
          } catch (l) {
            n(l)
          }
        }
        for (var r = 0; r < i.length; r++) o(r, i[r])
      })
    }, i.resolve = function(t) {
      return t && "object" == typeof t && t.constructor === i ? t : new i(function(e) {
        e(t)
      })
    }, i.reject = function(t) {
      return new i(function(e, n) {
        n(t)
      })
    }, i.race = function(t) {
      return new i(function(e, n) {
        for (var i = 0, s = t.length; i < s; i++) t[i].then(e, n)
      })
    }, i._immediateFn = "function" == typeof setImmediate && function(t) {
      setImmediate(t)
    } || function(t) {
      e(t, 0)
    }, i._unhandledRejectionFn = function(t) {
      "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    };
    var c, u = function() {
      if ("undefined" != typeof self) return self;
      if ("undefined" != typeof window) return window;
      if ("undefined" != typeof global) return global;
      throw new Error("unable to locate global object")
    }();
    "Promise" in u ? u.Promise.prototype["finally"] || (u.Promise.prototype["finally"] = t) : u.Promise = i, Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
      return function(e, n) {
        if (null === this || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined");
        var i = t(this),
          s = i.length >>> 0,
          o = Math.min(0 | n, s);
        if (o < 0) o = Math.max(0, s + o);
        else if (o >= s) return -1;
        if (void 0 === e) {
          for (; o !== s; ++o)
            if (void 0 === i[o] && o in i) return o
        } else if (e != e) {
          for (; o !== s; ++o)
            if (i[o] != i[o]) return o
        } else
          for (; o !== s; ++o)
            if (i[o] === e) return o;
        return -1
      }
    }(Object)), Array.isArray || (Array.isArray = function(t) {
      return "[object Array]" === Object.prototype.toString.call(t)
    }), document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function(t) {
      if (document.querySelectorAll) return document.querySelectorAll("." + t);
      for (var e = document.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + t + "(\\s|$)"), i = [], s = 0; s < e.length; s++) n.test(e[s].className) && i.push(e[s]);
      return i
    }), String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
      return this.substr(!e || e < 0 ? 0 : +e, t.length) === t
    }), String.prototype.endsWith || (String.prototype.endsWith = function(t, e) {
      return (e === undefined || e > this.length) && (e = this.length), this.substring(e - t.length, e) === t
    });
    try {
      if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
        var d = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
        Object.defineProperty(Element.prototype, "textContent", {
          get: function() {
            return d.get.call(this)
          },
          set: function(t) {
            return d.set.call(this, t)
          }
        })
      }
    } catch (ki) {}
    Function.prototype.bind || (Function.prototype.bind = function(t) {
      if ("function" != typeof this) throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
      var e = Array.prototype.slice.call(arguments, 1),
        n = this,
        i = function() {},
        s = function() {
          return n.apply(this instanceof i ? this : t, e.concat(Array.prototype.slice.call(arguments)))
        };
      return this.prototype && (i.prototype = this.prototype), s.prototype = new i, s
    }), "function" != typeof Object.create && (Object.create = function(t, e) {
      function n() {}
      if (n.prototype = t, "object" == typeof e)
        for (var i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
      return new n
    }), Date.now || (Date.now = function() {
      return (new Date).getTime()
    }), window.console || (window.console = {});
    for (var p = ["error", "info", "log", "show", "table", "trace", "warn"], f = function(t) {}, m = p.length; --m > -1;) c = p[m], window.console[c] || (window.console[c] = f);
    if (window.atob) try {
      window.atob(" ")
    } catch (xi) {
      window.atob = function(t) {
        var e = function(e) {
          return t(String(e).replace(/[\t\n\f\r ]+/g, ""))
        };
        return e.original = t, e
      }(window.atob)
    } else {
      var y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        g = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
      window.atob = function(t) {
        if (t = String(t).replace(/[\t\n\f\r ]+/g, ""), !g.test(t)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
        var e, n, i;
        t += "==".slice(2 - (3 & t.length));
        for (var s = "", o = 0; o < t.length;) e = y.indexOf(t.charAt(o++)) << 18 | y.indexOf(t.charAt(o++)) << 12 | (n = y.indexOf(t.charAt(o++))) << 6 | (i = y.indexOf(t.charAt(o++))), s += 64 === n ? String.fromCharCode(e >> 16 & 255) : 64 === i ? String.fromCharCode(e >> 16 & 255, e >> 8 & 255) : String.fromCharCode(e >> 16 & 255, e >> 8 & 255, 255 & e);
        return s
      }
    }
    Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
        this.returnValue = !1
      }), Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
        this.cancelBubble = !0
      }),
      function(t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = t()
        }
      }(function() {
        return function t(e, n, i) {
          function s(r, a) {
            if (!n[r]) {
              if (!e[r]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(r, !0);
                if (o) return o(r, !0);
                var h = new Error("Cannot find module '" + r + "'");
                throw h.code = "MODULE_NOT_FOUND", h
              }
              var c = n[r] = {
                exports: {}
              };
              e[r][0].call(c.exports, function(t) {
                var n = e[r][1][t];
                return s(n || t)
              }, c, c.exports, t, e, n, i)
            }
            return n[r].exports
          }
          for (var o = "function" == typeof require && require, r = 0; r < i.length; r++) s(i[r]);
          return s
        }({
          1: [function(t, e, n) {
            function i(t) {
              this.name = "RavenConfigError", this.message = t
            }
            i.prototype = new Error, i.prototype.constructor = i, e.exports = i
          }, {}],
          2: [function(t, e, n) {
            var i = t(5);
            e.exports = {
              wrapMethod: function(t, e, n) {
                var s = t[e],
                  o = t;
                if (e in t) {
                  var r = "warn" === e ? "warning" : e;
                  t[e] = function() {
                    var t = [].slice.call(arguments),
                      a = i.safeJoin(t, " "),
                      l = {
                        level: r,
                        logger: "console",
                        extra: {
                          arguments: t
                        }
                      };
                    "assert" === e ? !1 === t[0] && (a = "Assertion failed: " + (i.safeJoin(t.slice(1), " ") || "console.assert"), l.extra.arguments = t.slice(1), n && n(a, l)) : n && n(a, l), s && Function.prototype.apply.call(s, o, t)
                  }
                }
              }
            }
          }, {
            5: 5
          }],
          3: [function(t, e, n) {
            (function(n) {
              function i() {
                return +new Date
              }
  
              function s(t, e) {
                return v(e) ? function(n) {
                  return e(n, t)
                } : e
              }
  
              function o() {
                for (var t in this.a = !("object" != typeof JSON || !JSON.stringify), this.b = !g(N), this.c = !g(U), this.d = null, this.e = null, this.f = null, this.g = null, this.h = null, this.i = null, this.j = {}, this.k = {
                    release: q.SENTRY_RELEASE && q.SENTRY_RELEASE.id,
                    logger: "javascript",
                    ignoreErrors: [],
                    ignoreUrls: [],
                    whitelistUrls: [],
                    includePaths: [],
                    headers: null,
                    collectWindowErrors: !0,
                    captureUnhandledRejections: !0,
                    maxMessageLength: 0,
                    maxUrlLength: 250,
                    stackTraceLimit: 50,
                    autoBreadcrumbs: !0,
                    instrument: !0,
                    sampleRate: 1,
                    sanitizeKeys: []
                  }, this.l = {
                    method: "POST",
                    referrerPolicy: R() ? "origin" : ""
                  }, this.m = 0, this.n = !1, this.o = Error.stackTraceLimit, this.p = q.console || {}, this.q = {}, this.r = [], this.s = i(), this.t = [], this.u = [], this.v = null, this.w = q.location, this.x = this.w && this.w.href, this.y(), this.p) this.q[t] = this.p[t]
              }
              var r = t(6),
                a = t(7),
                l = t(8),
                h = t(1),
                c = t(5),
                u = c.isErrorEvent,
                d = c.isDOMError,
                p = c.isDOMException,
                f = c.isError,
                m = c.isObject,
                y = c.isPlainObject,
                g = c.isUndefined,
                v = c.isFunction,
                b = c.isString,
                w = c.isArray,
                k = c.isEmptyObject,
                x = c.each,
                E = c.objectMerge,
                C = c.truncate,
                _ = c.objectFrozen,
                S = c.hasKey,
                O = c.joinRegExp,
                A = c.urlencode,
                $ = c.uuid4,
                L = c.htmlTreeAsString,
                T = c.isSameException,
                P = c.isSameStacktrace,
                M = c.parseUrl,
                I = c.fill,
                j = c.supportsFetch,
                R = c.supportsReferrerPolicy,
                B = c.serializeKeysForMessage,
                D = c.serializeException,
                F = c.sanitize,
                z = t(2).wrapMethod,
                H = "source protocol user pass host port path".split(" "),
                W = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
                q = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                N = q.document,
                U = q.navigator;
              o.prototype = {
                VERSION: "3.27.2",
                debug: !1,
                TraceKit: r,
                config: function(t, e) {
                  var n = this;
                  if (n.g) return this.z("error", "Error: Raven has already been configured"), n;
                  if (!t) return n;
                  var i = n.k;
                  e && x(e, function(t, e) {
                    "tags" === t || "extra" === t || "user" === t ? n.j[t] = e : i[t] = e
                  }), n.setDSN(t), i.ignoreErrors.push(/^Script error\.?$/), i.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), i.ignoreErrors = O(i.ignoreErrors), i.ignoreUrls = !!i.ignoreUrls.length && O(i.ignoreUrls), i.whitelistUrls = !!i.whitelistUrls.length && O(i.whitelistUrls), i.includePaths = O(i.includePaths), i.maxBreadcrumbs = Math.max(0, Math.min(i.maxBreadcrumbs || 100, 100));
                  var s = {
                      xhr: !0,
                      console: !0,
                      dom: !0,
                      location: !0,
                      sentry: !0
                    },
                    o = i.autoBreadcrumbs;
                  "[object Object]" === {}.toString.call(o) ? o = E(s, o) : !1 !== o && (o = s), i.autoBreadcrumbs = o;
                  var a = {
                      tryCatch: !0
                    },
                    l = i.instrument;
                  return "[object Object]" === {}.toString.call(l) ? l = E(a, l) : !1 !== l && (l = a), i.instrument = l, r.collectWindowErrors = !!i.collectWindowErrors, n
                },
                install: function() {
                  var t = this;
                  return t.isSetup() && !t.n && (r.report.subscribe(function() {
                    t.A.apply(t, arguments)
                  }), t.k.captureUnhandledRejections && t.B(), t.C(), t.k.instrument && t.k.instrument.tryCatch && t.D(), t.k.autoBreadcrumbs && t.E(), t.F(), t.n = !0), Error.stackTraceLimit = t.k.stackTraceLimit, this
                },
                setDSN: function(t) {
                  var e = this,
                    n = e.G(t),
                    i = n.path.lastIndexOf("/"),
                    s = n.path.substr(1, i);
                  e.H = t, e.h = n.user, e.I = n.pass && n.pass.substr(1), e.i = n.path.substr(i + 1), e.g = e.J(n), e.K = e.g + "/" + s + "api/" + e.i + "/store/", this.y()
                },
                context: function(t, e, n) {
                  return v(t) && (n = e || [], e = t, t = {}), this.wrap(t, e).apply(this, n)
                },
                wrap: function(t, e, n) {
                  function i() {
                    var i = [],
                      o = arguments.length,
                      r = !t || t && !1 !== t.deep;
                    for (n && v(n) && n.apply(this, arguments); o--;) i[o] = r ? s.wrap(t, arguments[o]) : arguments[o];
                    try {
                      return e.apply(this, i)
                    } catch (a) {
                      throw s.L(), s.captureException(a, t), a
                    }
                  }
                  var s = this;
                  if (g(e) && !v(t)) return t;
                  if (v(t) && (e = t, t = void 0), !v(e)) return e;
                  try {
                    if (e.M) return e;
                    if (e.N) return e.N
                  } catch (o) {
                    return e
                  }
                  for (var r in e) S(e, r) && (i[r] = e[r]);
                  return i.prototype = e.prototype, e.N = i, i.M = !0, i.O = e, i
                },
                uninstall: function() {
                  return r.report.uninstall(), this.P(), this.Q(), this.R(), this.S(), Error.stackTraceLimit = this.o, this.n = !1, this
                },
                T: function(t) {
                  this.z("debug", "Raven caught unhandled promise rejection:", t), this.captureException(t.reason, {
                    mechanism: {
                      type: "onunhandledrejection",
                      handled: !1
                    }
                  })
                },
                B: function() {
                  return this.T = this.T.bind(this), q.addEventListener && q.addEventListener("unhandledrejection", this.T), this
                },
                P: function() {
                  return q.removeEventListener && q.removeEventListener("unhandledrejection", this.T), this
                },
                captureException: function(t, e) {
                  if (e = E({
                      trimHeadFrames: 0
                    }, e || {}), u(t) && t.error) t = t.error;
                  else {
                    if (d(t) || p(t)) {
                      var n = t.name || (d(t) ? "DOMError" : "DOMException"),
                        i = t.message ? n + ": " + t.message : n;
                      return this.captureMessage(i, E(e, {
                        stacktrace: !0,
                        trimHeadFrames: e.trimHeadFrames + 1
                      }))
                    }
                    if (f(t)) t = t;
                    else {
                      if (!y(t)) return this.captureMessage(t, E(e, {
                        stacktrace: !0,
                        trimHeadFrames: e.trimHeadFrames + 1
                      }));
                      e = this.U(e, t), t = new Error(e.message)
                    }
                  }
                  this.d = t;
                  try {
                    var s = r.computeStackTrace(t);
                    this.V(s, e)
                  } catch (o) {
                    if (t !== o) throw o
                  }
                  return this
                },
                U: function(t, e) {
                  var n = Object.keys(e).sort(),
                    i = E(t, {
                      message: "Non-Error exception captured with keys: " + B(n),
                      fingerprint: [l(n)],
                      extra: t.extra || {}
                    });
                  return i.extra.W = D(e), i
                },
                captureMessage: function(t, e) {
                  if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t)) {
                    var n, i = E({
                      message: t += ""
                    }, e = e || {});
                    try {
                      throw new Error(t)
                    } catch (s) {
                      n = s
                    }
                    n.name = null;
                    var o = r.computeStackTrace(n),
                      a = w(o.stack) && o.stack[1];
                    a && "Raven.captureException" === a.func && (a = o.stack[2]);
                    var l = a && a.url || "";
                    if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(l)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(l))) {
                      if (this.k.stacktrace || e.stacktrace || "" === i.message) {
                        i.fingerprint = null == i.fingerprint ? t : i.fingerprint, (e = E({
                          trimHeadFrames: 0
                        }, e)).trimHeadFrames += 1;
                        var h = this.X(o, e);
                        i.stacktrace = {
                          frames: h.reverse()
                        }
                      }
                      return i.fingerprint && (i.fingerprint = w(i.fingerprint) ? i.fingerprint : [i.fingerprint]), this.Y(i), this
                    }
                  }
                },
                captureBreadcrumb: function(t) {
                  var e = E({
                    timestamp: i() / 1e3
                  }, t);
                  if (v(this.k.breadcrumbCallback)) {
                    var n = this.k.breadcrumbCallback(e);
                    if (m(n) && !k(n)) e = n;
                    else if (!1 === n) return this
                  }
                  return this.u.push(e), this.u.length > this.k.maxBreadcrumbs && this.u.shift(), this
                },
                addPlugin: function(t) {
                  var e = [].slice.call(arguments, 1);
                  return this.r.push([t, e]), this.n && this.F(), this
                },
                setUserContext: function(t) {
                  return this.j.user = t, this
                },
                setExtraContext: function(t) {
                  return this.Z("extra", t), this
                },
                setTagsContext: function(t) {
                  return this.Z("tags", t), this
                },
                clearContext: function() {
                  return this.j = {}, this
                },
                getContext: function() {
                  return JSON.parse(a(this.j))
                },
                setEnvironment: function(t) {
                  return this.k.environment = t, this
                },
                setRelease: function(t) {
                  return this.k.release = t, this
                },
                setDataCallback: function(t) {
                  var e = this.k.dataCallback;
                  return this.k.dataCallback = s(e, t), this
                },
                setBreadcrumbCallback: function(t) {
                  var e = this.k.breadcrumbCallback;
                  return this.k.breadcrumbCallback = s(e, t), this
                },
                setShouldSendCallback: function(t) {
                  var e = this.k.shouldSendCallback;
                  return this.k.shouldSendCallback = s(e, t), this
                },
                setTransport: function(t) {
                  return this.k.transport = t, this
                },
                lastException: function() {
                  return this.d
                },
                lastEventId: function() {
                  return this.f
                },
                isSetup: function() {
                  return !(!this.a || !this.g && (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this.z("error", "Error: Raven has not been configured.")), 1))
                },
                afterLoad: function() {
                  var t = q.RavenConfig;
                  t && this.config(t.dsn, t.config).install()
                },
                showReportDialog: function(t) {
                  if (N) {
                    if (!(t = E({
                        eventId: this.lastEventId(),
                        dsn: this.H,
                        user: this.j.user || {}
                      }, t)).eventId) throw new h("Missing eventId");
                    if (!t.dsn) throw new h("Missing DSN");
                    var e = encodeURIComponent,
                      n = [];
                    for (var i in t)
                      if ("user" === i) {
                        var s = t.user;
                        s.name && n.push("name=" + e(s.name)), s.email && n.push("email=" + e(s.email))
                      } else n.push(e(i) + "=" + e(t[i]));
                    var o = this.J(this.G(t.dsn)),
                      r = N.createElement("script");
                    r.async = !0, r.src = o + "/api/embed/error-page/?" + n.join("&"), (N.head || N.body).appendChild(r)
                  }
                },
                L: function() {
                  var t = this;
                  this.m += 1, setTimeout(function() {
                    t.m -= 1
                  })
                },
                $: function(t, e) {
                  var n, i;
                  if (this.b) {
                    for (i in e = e || {}, t = "raven" + t.substr(0, 1).toUpperCase() + t.substr(1), N.createEvent ? (n = N.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (n = N.createEventObject()).eventType = t, e) S(e, i) && (n[i] = e[i]);
                    if (N.createEvent) N.dispatchEvent(n);
                    else try {
                      N.fireEvent("on" + n.eventType.toLowerCase(), n)
                    } catch (s) {}
                  }
                },
                _: function(t) {
                  var e = this;
                  return function(n) {
                    if (e.aa = null, e.v !== n) {
                      var i;
                      e.v = n;
                      try {
                        i = L(n.target)
                      } catch (s) {
                        i = "<unknown>"
                      }
                      e.captureBreadcrumb({
                        category: "ui." + t,
                        message: i
                      })
                    }
                  }
                },
                ba: function() {
                  var t = this;
                  return function(e) {
                    var n;
                    try {
                      n = e.target
                    } catch (s) {
                      return
                    }
                    var i = n && n.tagName;
                    if (i && ("INPUT" === i || "TEXTAREA" === i || n.isContentEditable)) {
                      var o = t.aa;
                      o || t._("input")(e), clearTimeout(o), t.aa = setTimeout(function() {
                        t.aa = null
                      }, 1e3)
                    }
                  }
                },
                ca: function(t, e) {
                  var n = M(this.w.href),
                    i = M(e),
                    s = M(t);
                  this.x = e, n.protocol === i.protocol && n.host === i.host && (e = i.relative), n.protocol === s.protocol && n.host === s.host && (t = s.relative), this.captureBreadcrumb({
                    category: "navigation",
                    data: {
                      to: e,
                      from: t
                    }
                  })
                },
                C: function() {
                  var t = this;
                  t.da = Function.prototype.toString, Function.prototype.toString = function() {
                    return "function" == typeof this && this.M ? t.da.apply(this.O, arguments) : t.da.apply(this, arguments)
                  }
                },
                Q: function() {
                  this.da && (Function.prototype.toString = this.da)
                },
                D: function() {
                  function t(t) {
                    return function(e, i) {
                      for (var s = new Array(arguments.length), o = 0; o < s.length; ++o) s[o] = arguments[o];
                      var r = s[0];
                      return v(r) && (s[0] = n.wrap({
                        mechanism: {
                          type: "instrument",
                          data: {
                            "function": t.name || "<anonymous>"
                          }
                        }
                      }, r)), t.apply ? t.apply(this, s) : t(s[0], s[1])
                    }
                  }
  
                  function e(t) {
                    var e = q[t] && q[t].prototype;
                    e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (I(e, "addEventListener", function(e) {
                      return function(i, o, r, a) {
                        try {
                          o && o.handleEvent && (o.handleEvent = n.wrap({
                            mechanism: {
                              type: "instrument",
                              data: {
                                target: t,
                                "function": "handleEvent",
                                handler: o && o.name || "<anonymous>"
                              }
                            }
                          }, o.handleEvent))
                        } catch (l) {}
                        var h, c, u;
                        return s && s.dom && ("EventTarget" === t || "Node" === t) && (c = n._("click"), u = n.ba(), h = function(t) {
                          if (t) {
                            var e;
                            try {
                              e = t.type
                            } catch (n) {
                              return
                            }
                            return "click" === e ? c(t) : "keypress" === e ? u(t) : void 0
                          }
                        }), e.call(this, i, n.wrap({
                          mechanism: {
                            type: "instrument",
                            data: {
                              target: t,
                              "function": "addEventListener",
                              handler: o && o.name || "<anonymous>"
                            }
                          }
                        }, o, h), r, a)
                      }
                    }, i), I(e, "removeEventListener", function(t) {
                      return function(e, n, i, s) {
                        try {
                          n = n && (n.N ? n.N : n)
                        } catch (o) {}
                        return t.call(this, e, n, i, s)
                      }
                    }, i))
                  }
                  var n = this,
                    i = n.t,
                    s = this.k.autoBreadcrumbs;
                  I(q, "setTimeout", t, i), I(q, "setInterval", t, i), q.requestAnimationFrame && I(q, "requestAnimationFrame", function(t) {
                    return function(e) {
                      return t(n.wrap({
                        mechanism: {
                          type: "instrument",
                          data: {
                            "function": "requestAnimationFrame",
                            handler: t && t.name || "<anonymous>"
                          }
                        }
                      }, e))
                    }
                  }, i);
                  for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], r = 0; r < o.length; r++) e(o[r])
                },
                E: function() {
                  function t(t, n) {
                    t in n && v(n[t]) && I(n, t, function(n) {
                      return e.wrap({
                        mechanism: {
                          type: "instrument",
                          data: {
                            "function": t,
                            handler: n && n.name || "<anonymous>"
                          }
                        }
                      }, n)
                    })
                  }
                  var e = this,
                    n = this.k.autoBreadcrumbs,
                    i = e.t;
                  if (n.xhr && "XMLHttpRequest" in q) {
                    var s = q.XMLHttpRequest && q.XMLHttpRequest.prototype;
                    I(s, "open", function(t) {
                      return function(n, i) {
                        return b(i) && -1 === i.indexOf(e.h) && (this.ea = {
                          method: n,
                          url: i,
                          status_code: null
                        }), t.apply(this, arguments)
                      }
                    }, i), I(s, "send", function(n) {
                      return function() {
                        function i() {
                          if (s.ea && 4 === s.readyState) {
                            try {
                              s.ea.status_code = s.status
                            } catch (t) {}
                            e.captureBreadcrumb({
                              type: "http",
                              category: "xhr",
                              data: s.ea
                            })
                          }
                        }
                        for (var s = this, o = ["onload", "onerror", "onprogress"], r = 0; r < o.length; r++) t(o[r], s);
                        return "onreadystatechange" in s && v(s.onreadystatechange) ? I(s, "onreadystatechange", function(t) {
                          return e.wrap({
                            mechanism: {
                              type: "instrument",
                              data: {
                                "function": "onreadystatechange",
                                handler: t && t.name || "<anonymous>"
                              }
                            }
                          }, t, i)
                        }) : s.onreadystatechange = i, n.apply(this, arguments)
                      }
                    }, i)
                  }
                  n.xhr && j() && I(q, "fetch", function(t) {
                    return function() {
                      for (var n = new Array(arguments.length), i = 0; i < n.length; ++i) n[i] = arguments[i];
                      var s, o = n[0],
                        r = "GET";
                      if ("string" == typeof o ? s = o : "Request" in q && o instanceof q.Request ? (s = o.url, o.method && (r = o.method)) : s = "" + o, -1 !== s.indexOf(e.h)) return t.apply(this, n);
                      n[1] && n[1].method && (r = n[1].method);
                      var a = {
                        method: r,
                        url: s,
                        status_code: null
                      };
                      return t.apply(this, n).then(function(t) {
                        return a.status_code = t.status, e.captureBreadcrumb({
                          type: "http",
                          category: "fetch",
                          data: a
                        }), t
                      })["catch"](function(t) {
                        throw e.captureBreadcrumb({
                          type: "http",
                          category: "fetch",
                          data: a,
                          level: "error"
                        }), t
                      })
                    }
                  }, i), n.dom && this.b && (N.addEventListener ? (N.addEventListener("click", e._("click"), !1), N.addEventListener("keypress", e.ba(), !1)) : N.attachEvent && (N.attachEvent("onclick", e._("click")), N.attachEvent("onkeypress", e.ba())));
                  var o = q.chrome,
                    r = !(o && o.app && o.app.runtime) && q.history && q.history.pushState && q.history.replaceState;
                  if (n.location && r) {
                    var a = q.onpopstate;
                    q.onpopstate = function() {
                      var t = e.w.href;
                      if (e.ca(e.x, t), a) return a.apply(this, arguments)
                    };
                    var l = function(t) {
                      return function() {
                        var n = arguments.length > 2 ? arguments[2] : void 0;
                        return n && e.ca(e.x, n + ""), t.apply(this, arguments)
                      }
                    };
                    I(q.history, "pushState", l, i), I(q.history, "replaceState", l, i)
                  }
                  if (n.console && "console" in q && console.log) {
                    var h = function(t, n) {
                      e.captureBreadcrumb({
                        message: t,
                        level: n.level,
                        category: "console"
                      })
                    };
                    x(["debug", "info", "warn", "error", "log"], function(t, e) {
                      z(console, e, h)
                    })
                  }
                },
                R: function() {
                  for (var t; this.t.length;) {
                    var e = (t = this.t.shift())[0],
                      n = t[1],
                      i = t[2];
                    e[n] = i
                  }
                },
                S: function() {
                  for (var t in this.q) this.p[t] = this.q[t]
                },
                F: function() {
                  var t = this;
                  x(this.r, function(e, n) {
                    var i = n[0],
                      s = n[1];
                    i.apply(t, [t].concat(s))
                  })
                },
                G: function(t) {
                  var e = W.exec(t),
                    n = {},
                    i = 7;
                  try {
                    for (; i--;) n[H[i]] = e[i] || ""
                  } catch (s) {
                    throw new h("Invalid DSN: " + t)
                  }
                  if (n.pass && !this.k.allowSecretKey) throw new h("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                  return n
                },
                J: function(t) {
                  var e = "//" + t.host + (t.port ? ":" + t.port : "");
                  return t.protocol && (e = t.protocol + ":" + e), e
                },
                A: function(t, e) {
                  (e = e || {}).mechanism = e.mechanism || {
                    type: "onerror",
                    handled: !1
                  }, this.m || this.V(t, e)
                },
                V: function(t, e) {
                  var n = this.X(t, e);
                  this.$("handle", {
                    stackInfo: t,
                    options: e
                  }), this.fa(t.name, t.message, t.url, t.lineno, n, e)
                },
                X: function(t, e) {
                  var n = this,
                    i = [];
                  if (t.stack && t.stack.length && (x(t.stack, function(e, s) {
                      var o = n.ga(s, t.url);
                      o && i.push(o)
                    }), e && e.trimHeadFrames))
                    for (var s = 0; s < e.trimHeadFrames && s < i.length; s++) i[s].in_app = !1;
                  return i = i.slice(0, this.k.stackTraceLimit)
                },
                ga: function(t, e) {
                  var n = {
                    filename: t.url,
                    lineno: t.line,
                    colno: t.column,
                    "function": t.func || "?"
                  };
                  return t.url || (n.filename = e), n.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n["function"]) || /raven\.(min\.)?js$/.test(n.filename)), n
                },
                fa: function(t, e, n, i, s, o) {
                  var r, a = (t ? t + ": " : "") + (e || "");
                  if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e) && !this.k.ignoreErrors.test(a)) && (s && s.length ? (n = s[0].filename || n, s.reverse(), r = {
                      frames: s
                    }) : n && (r = {
                      frames: [{
                        filename: n,
                        lineno: i,
                        in_app: !0
                      }]
                    }), (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(n)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(n)))) {
                    var l = E({
                        exception: {
                          values: [{
                            type: t,
                            value: e,
                            stacktrace: r
                          }]
                        },
                        transaction: n
                      }, o),
                      h = l.exception.values[0];
                    null == h.type && "" === h.value && (h.value = "Unrecoverable error caught"), !l.exception.mechanism && l.mechanism && (l.exception.mechanism = l.mechanism, delete l.mechanism), l.exception.mechanism = E({
                      type: "generic",
                      handled: !0
                    }, l.exception.mechanism || {}), this.Y(l)
                  }
                },
                ha: function(t) {
                  var e = this.k.maxMessageLength;
                  if (t.message && (t.message = C(t.message, e)), t.exception) {
                    var n = t.exception.values[0];
                    n.value = C(n.value, e)
                  }
                  var i = t.request;
                  return i && (i.url && (i.url = C(i.url, this.k.maxUrlLength)), i.Referer && (i.Referer = C(i.Referer, this.k.maxUrlLength))), t.breadcrumbs && t.breadcrumbs.values && this.ia(t.breadcrumbs), t
                },
                ia: function(t) {
                  for (var e, n, i, s = ["to", "from", "url"], o = 0; o < t.values.length; ++o)
                    if ((n = t.values[o]).hasOwnProperty("data") && m(n.data) && !_(n.data)) {
                      i = E({}, n.data);
                      for (var r = 0; r < s.length; ++r) e = s[r], i.hasOwnProperty(e) && i[e] && (i[e] = C(i[e], this.k.maxUrlLength));
                      t.values[o].data = i
                    }
                },
                ja: function() {
                  if (this.c || this.b) {
                    var t = {};
                    return this.c && U.userAgent && (t.headers = {
                      "User-Agent": U.userAgent
                    }), q.location && q.location.href && (t.url = q.location.href), this.b && N.referrer && (t.headers || (t.headers = {}), t.headers.Referer = N.referrer), t
                  }
                },
                y: function() {
                  this.ka = 0, this.la = null
                },
                ma: function() {
                  return this.ka && i() - this.la < this.ka
                },
                na: function(t) {
                  var e = this.e;
                  return !(!e || t.message !== e.message || t.transaction !== e.transaction) && (t.stacktrace || e.stacktrace ? P(t.stacktrace, e.stacktrace) : t.exception || e.exception ? T(t.exception, e.exception) : !t.fingerprint && !e.fingerprint || Boolean(t.fingerprint && e.fingerprint) && JSON.stringify(t.fingerprint) === JSON.stringify(e.fingerprint))
                },
                oa: function(t) {
                  if (!this.ma()) {
                    var e = t.status;
                    if (400 === e || 401 === e || 429 === e) {
                      var n;
                      try {
                        n = j() ? t.headers.get("Retry-After") : t.getResponseHeader("Retry-After"), n = 1e3 * parseInt(n, 10)
                      } catch (s) {}
                      this.ka = n || (2 * this.ka || 1e3), this.la = i()
                    }
                  }
                },
                Y: function(t) {
                  var e = this.k,
                    n = {
                      project: this.i,
                      logger: e.logger,
                      platform: "javascript"
                    },
                    s = this.ja();
                  if (s && (n.request = s), t.trimHeadFrames && delete t.trimHeadFrames, (t = E(n, t)).tags = E(E({}, this.j.tags), t.tags), t.extra = E(E({}, this.j.extra), t.extra), t.extra["session:duration"] = i() - this.s, this.u && this.u.length > 0 && (t.breadcrumbs = {
                      values: [].slice.call(this.u, 0)
                    }), this.j.user && (t.user = this.j.user), e.environment && (t.environment = e.environment), e.release && (t.release = e.release), e.serverName && (t.server_name = e.serverName), t = this.pa(t), Object.keys(t).forEach(function(e) {
                      (null == t[e] || "" === t[e] || k(t[e])) && delete t[e]
                    }), v(e.dataCallback) && (t = e.dataCallback(t) || t), t && !k(t) && (!v(e.shouldSendCallback) || e.shouldSendCallback(t))) return this.ma() ? void this.z("warn", "Raven dropped error due to backoff: ", t) : void("number" == typeof e.sampleRate ? Math.random() < e.sampleRate && this.qa(t) : this.qa(t))
                },
                pa: function(t) {
                  return F(t, this.k.sanitizeKeys)
                },
                ra: function() {
                  return $()
                },
                qa: function(t, e) {
                  var n = this,
                    i = this.k;
                  if (this.isSetup()) {
                    if (t = this.ha(t), !this.k.allowDuplicates && this.na(t)) return void this.z("warn", "Raven dropped repeat event: ", t);
                    this.f = t.event_id || (t.event_id = this.ra()), this.e = t, this.z("debug", "Raven about to send:", t);
                    var s = {
                      sentry_version: "7",
                      sentry_client: "raven-js/" + this.VERSION,
                      sentry_key: this.h
                    };
                    this.I && (s.sentry_secret = this.I);
                    var o = t.exception && t.exception.values[0];
                    this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                      category: "sentry",
                      message: o ? (o.type ? o.type + ": " : "") + o.value : t.message,
                      event_id: t.event_id,
                      level: t.level || "error"
                    });
                    var r = this.K;
                    (i.transport || this._makeRequest).call(this, {
                      url: r,
                      auth: s,
                      data: t,
                      options: i,
                      onSuccess: function() {
                        n.y(), n.$("success", {
                          data: t,
                          src: r
                        }), e && e()
                      },
                      onError: function(i) {
                        n.z("error", "Raven transport failed to send: ", i), i.request && n.oa(i.request), n.$("failure", {
                          data: t,
                          src: r
                        }), i = i || new Error("Raven send failed (no additional details provided)"), e && e(i)
                      }
                    })
                  }
                },
                _makeRequest: function(t) {
                  var e = t.url + "?" + A(t.auth),
                    n = null,
                    i = {};
                  if (t.options.headers && (n = this.sa(t.options.headers)), t.options.fetchParameters && (i = this.sa(t.options.fetchParameters)), j()) {
                    i.body = a(t.data);
                    var s = E({}, this.l),
                      o = E(s, i);
                    return n && (o.headers = n), q.fetch(e, o).then(function(e) {
                      if (e.ok) t.onSuccess && t.onSuccess();
                      else {
                        var n = new Error("Sentry error code: " + e.status);
                        n.request = e, t.onError && t.onError(n)
                      }
                    })["catch"](function() {
                      t.onError && t.onError(new Error("Sentry error code: network unavailable"))
                    })
                  }
                  var r = q.XMLHttpRequest && new q.XMLHttpRequest;
                  r && (("withCredentials" in r || "undefined" != typeof XDomainRequest) && ("withCredentials" in r ? r.onreadystatechange = function() {
                    if (4 === r.readyState)
                      if (200 === r.status) t.onSuccess && t.onSuccess();
                      else if (t.onError) {
                      var e = new Error("Sentry error code: " + r.status);
                      e.request = r, t.onError(e)
                    }
                  } : (r = new XDomainRequest, e = e.replace(/^https?:/, ""), t.onSuccess && (r.onload = t.onSuccess), t.onError && (r.onerror = function() {
                    var e = new Error("Sentry error code: XDomainRequest");
                    e.request = r, t.onError(e)
                  })), r.open("POST", e), n && x(n, function(t, e) {
                    r.setRequestHeader(t, e)
                  }), r.send(a(t.data))))
                },
                sa: function(t) {
                  var e = {};
                  for (var n in t)
                    if (t.hasOwnProperty(n)) {
                      var i = t[n];
                      e[n] = "function" == typeof i ? i() : i
                    } return e
                },
                z: function(t) {
                  this.q[t] && (this.debug || this.k.debug) && Function.prototype.apply.call(this.q[t], this.p, [].slice.call(arguments, 1))
                },
                Z: function(t, e) {
                  g(e) ? delete this.j[t] : this.j[t] = E(this.j[t] || {}, e)
                }
              }, o.prototype.setUser = o.prototype.setUserContext, o.prototype.setReleaseContext = o.prototype.setRelease, e.exports = o
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            1: 1,
            2: 2,
            5: 5,
            6: 6,
            7: 7,
            8: 8
          }],
          4: [function(t, e, n) {
            (function(n) {
              var i = t(3),
                s = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                o = s.Raven,
                r = new i;
              r.noConflict = function() {
                return s.Raven = o, r
              }, r.afterLoad(), e.exports = r, e.exports.Client = i
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            3: 3
          }],
          5: [function(t, e, n) {
            (function(n) {
              function i(t) {
                switch (Object.prototype.toString.call(t)) {
                  case "[object Error]":
                  case "[object Exception]":
                  case "[object DOMException]":
                    return !0;
                  default:
                    return t instanceof Error
                }
              }
  
              function s(t) {
                return "[object DOMError]" === Object.prototype.toString.call(t)
              }
  
              function o(t) {
                return void 0 === t
              }
  
              function r(t) {
                return "[object Object]" === Object.prototype.toString.call(t)
              }
  
              function a(t) {
                return "[object String]" === Object.prototype.toString.call(t)
              }
  
              function l(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
              }
  
              function h() {
                if (!("fetch" in w)) return !1;
                try {
                  return new Headers, new Request(""), new Response, !0
                } catch (t) {
                  return !1
                }
              }
  
              function c(t, e) {
                var n, i;
                if (o(t.length))
                  for (n in t) d(t, n) && e.call(null, n, t[n]);
                else if (i = t.length)
                  for (n = 0; n < i; n++) e.call(null, n, t[n])
              }
  
              function u(t, e) {
                if ("number" != typeof e) throw new Error("2nd argument to `truncate` function should be a number");
                return "string" != typeof t || 0 === e ? t : t.length <= e ? t : t.substr(0, e) + "…"
              }
  
              function d(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
              }
  
              function p(t) {
                for (var e, n = [], i = 0, s = t.length; i < s; i++) a(e = t[i]) ? n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && n.push(e.source);
                return new RegExp(n.join("|"), "i")
              }
  
              function f(t) {
                var e, n, i, s, o, r = [];
                if (!t || !t.tagName) return "";
                if (r.push(t.tagName.toLowerCase()), t.id && r.push("#" + t.id), (e = t.className) && a(e))
                  for (n = e.split(/\s+/), o = 0; o < n.length; o++) r.push("." + n[o]);
                var l = ["type", "name", "title", "alt"];
                for (o = 0; o < l.length; o++) i = l[o], (s = t.getAttribute(i)) && r.push("[" + i + '="' + s + '"]');
                return r.join("")
              }
  
              function m(t, e) {
                return !!(!!t ^ !!e)
              }
  
              function y(t, e) {
                if (m(t, e)) return !1;
                var n = t.frames,
                  i = e.frames;
                if (void 0 === n || void 0 === i) return !1;
                if (n.length !== i.length) return !1;
                for (var s, o, r = 0; r < n.length; r++)
                  if (s = n[r], o = i[r], s.filename !== o.filename || s.lineno !== o.lineno || s.colno !== o.colno || s["function"] !== o["function"]) return !1;
                return !0
              }
  
              function g(t) {
                return function(t) {
                  return ~-encodeURI(t).split(/%..|./).length
                }(JSON.stringify(t))
              }
  
              function v(t) {
                if ("string" == typeof t) {
                  return u(t, 40)
                }
                if ("number" == typeof t || "boolean" == typeof t || void 0 === t) return t;
                var e = Object.prototype.toString.call(t);
                return "[object Object]" === e ? "[Object]" : "[object Array]" === e ? "[Array]" : "[object Function]" === e ? t.name ? "[Function: " + t.name + "]" : "[Function]" : t
              }
              var b = t(7),
                w = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                k = 3,
                x = 51200,
                E = 40;
              e.exports = {
                isObject: function(t) {
                  return "object" == typeof t && null !== t
                },
                isError: i,
                isErrorEvent: function(t) {
                  return "[object ErrorEvent]" === Object.prototype.toString.call(t)
                },
                isDOMError: s,
                isDOMException: function(t) {
                  return "[object DOMException]" === Object.prototype.toString.call(t)
                },
                isUndefined: o,
                isFunction: function(t) {
                  return "function" == typeof t
                },
                isPlainObject: r,
                isString: a,
                isArray: l,
                isEmptyObject: function(t) {
                  if (!r(t)) return !1;
                  for (var e in t)
                    if (t.hasOwnProperty(e)) return !1;
                  return !0
                },
                supportsErrorEvent: function() {
                  try {
                    return new ErrorEvent(""), !0
                  } catch (t) {
                    return !1
                  }
                },
                supportsDOMError: function() {
                  try {
                    return new DOMError(""), !0
                  } catch (t) {
                    return !1
                  }
                },
                supportsDOMException: function() {
                  try {
                    return new DOMException(""), !0
                  } catch (t) {
                    return !1
                  }
                },
                supportsFetch: h,
                supportsReferrerPolicy: function() {
                  if (!h()) return !1;
                  try {
                    return new Request("pickleRick", {
                      referrerPolicy: "origin"
                    }), !0
                  } catch (t) {
                    return !1
                  }
                },
                supportsPromiseRejectionEvent: function() {
                  return "function" == typeof PromiseRejectionEvent
                },
                wrappedCallback: function(t) {
                  return function(e, n) {
                    var i = t(e) || e;
                    return n && n(i) || i
                  }
                },
                each: c,
                objectMerge: function(t, e) {
                  return e ? (c(e, function(e, n) {
                    t[e] = n
                  }), t) : t
                },
                truncate: u,
                objectFrozen: function(t) {
                  return !!Object.isFrozen && Object.isFrozen(t)
                },
                hasKey: d,
                joinRegExp: p,
                urlencode: function(t) {
                  var e = [];
                  return c(t, function(t, n) {
                    e.push(encodeURIComponent(t) + "=" + encodeURIComponent(n))
                  }), e.join("&")
                },
                uuid4: function() {
                  var t = w.crypto || w.msCrypto;
                  if (!o(t) && t.getRandomValues) {
                    var e = new Uint16Array(8);
                    t.getRandomValues(e), e[3] = 4095 & e[3] | 16384, e[4] = 16383 & e[4] | 32768;
                    var n = function(t) {
                      for (var e = t.toString(16); e.length < 4;) e = "0" + e;
                      return e
                    };
                    return n(e[0]) + n(e[1]) + n(e[2]) + n(e[3]) + n(e[4]) + n(e[5]) + n(e[6]) + n(e[7])
                  }
                  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                    var e = 16 * Math.random() | 0;
                    return ("x" === t ? e : 3 & e | 8).toString(16)
                  })
                },
                htmlTreeAsString: function(t) {
                  for (var e, n = [], i = 0, s = 0, o = " > ".length; t && i++ < 5 && !("html" === (e = f(t)) || i > 1 && s + n.length * o + e.length >= 80);) n.push(e), s += e.length, t = t.parentNode;
                  return n.reverse().join(" > ")
                },
                htmlElementAsString: f,
                isSameException: function(t, e) {
                  return !m(t, e) && (t = t.values[0], e = e.values[0], t.type === e.type && t.value === e.value && ! function(t, e) {
                    return o(t) && o(e)
                  }(t.stacktrace, e.stacktrace) && y(t.stacktrace, e.stacktrace))
                },
                isSameStacktrace: y,
                parseUrl: function(t) {
                  if ("string" != typeof t) return {};
                  var e = t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                    n = e[6] || "",
                    i = e[8] || "";
                  return {
                    protocol: e[2],
                    host: e[4],
                    path: e[5],
                    relative: e[5] + n + i
                  }
                },
                fill: function(t, e, n, i) {
                  if (null != t) {
                    var s = t[e];
                    t[e] = n(s), t[e].M = !0, t[e].O = s, i && i.push([t, e, s])
                  }
                },
                safeJoin: function(t, e) {
                  if (!l(t)) return "";
                  for (var n = [], s = 0; s < t.length; s++) try {
                    n.push(String(t[s]))
                  } catch (i) {
                    n.push("[value cannot be serialized]")
                  }
                  return n.join(e)
                },
                serializeException: function C(t, e, n) {
                  if (!r(t)) return t;
                  n = "number" != typeof(e = "number" != typeof e ? k : e) ? x : n;
                  var i = function s(t, e) {
                    return 0 === e ? v(t) : r(t) ? Object.keys(t).reduce(function(n, i) {
                      return n[i] = s(t[i], e - 1), n
                    }, {}) : Array.isArray(t) ? t.map(function(t) {
                      return s(t, e - 1)
                    }) : v(t)
                  }(t, e);
                  return g(b(i)) > n ? C(t, e - 1) : i
                },
                serializeKeysForMessage: function(t, e) {
                  if ("number" == typeof t || "string" == typeof t) return t.toString();
                  if (!Array.isArray(t)) return "";
                  if (0 === (t = t.filter(function(t) {
                      return "string" == typeof t
                    })).length) return "[object has no keys]";
                  if (e = "number" != typeof e ? E : e, t[0].length >= e) return t[0];
                  for (var n = t.length; n > 0; n--) {
                    var i = t.slice(0, n).join(", ");
                    if (!(i.length > e)) return n === t.length ? i : i + "…"
                  }
                  return ""
                },
                sanitize: function(t, e) {
                  if (!l(e) || l(e) && 0 === e.length) return t;
                  var n, i = p(e),
                    o = "********";
                  try {
                    n = JSON.parse(b(t))
                  } catch (s) {
                    return t
                  }
                  return function a(t) {
                    return l(t) ? t.map(function(t) {
                      return a(t)
                    }) : r(t) ? Object.keys(t).reduce(function(e, n) {
                      return e[n] = i.test(n) ? o : a(t[n]), e
                    }, {}) : t
                  }(n)
                }
              }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            7: 7
          }],
          6: [function(t, e, n) {
            (function(n) {
              function i() {
                return "undefined" == typeof document || null == document.location ? "" : document.location.href
              }
              var s = t(5),
                o = {
                  collectWindowErrors: !0,
                  debug: !1
                },
                r = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                a = [].slice,
                l = "?",
                h = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
              o.report = function() {
                function t(e, n) {
                  var i = null;
                  if (!n || o.collectWindowErrors) {
                    for (var s in p)
                      if (p.hasOwnProperty(s)) try {
                        p[s].apply(null, [e].concat(a.call(arguments, 2)))
                      } catch (t) {
                        i = t
                      }
                    if (i) throw i
                  }
                }
  
                function e(e, r, a, c, d) {
                  var p = s.isErrorEvent(d) ? d.error : d,
                    f = s.isErrorEvent(e) ? e.message : e;
                  if (y) o.computeStackTrace.augmentStackTraceWithInitialElement(y, r, a, f), n();
                  else if (p && s.isError(p)) t(o.computeStackTrace(p), !0);
                  else {
                    var m, g = {
                        url: r,
                        line: a,
                        column: c
                      },
                      v = void 0;
                    if ("[object String]" === {}.toString.call(f))(m = f.match(h)) && (v = m[1], f = m[2]);
                    g.func = l, t({
                      name: v,
                      message: f,
                      url: i(),
                      stack: [g]
                    }, !0)
                  }
                  return !!u && u.apply(this, arguments)
                }
  
                function n() {
                  var e = y,
                    n = f;
                  f = null, y = null, m = null, t.apply(null, [e, !1].concat(n))
                }
  
                function c(t, e) {
                  var i = a.call(arguments, 1);
                  if (y) {
                    if (m === t) return;
                    n()
                  }
                  var s = o.computeStackTrace(t);
                  if (y = s, m = t, f = i, setTimeout(function() {
                      m === t && n()
                    }, s.incomplete ? 2e3 : 0), !1 !== e) throw t
                }
                var u, d, p = [],
                  f = null,
                  m = null,
                  y = null;
                return c.subscribe = function(t) {
                  d || (u = r.onerror, r.onerror = e, d = !0), p.push(t)
                }, c.unsubscribe = function(t) {
                  for (var e = p.length - 1; e >= 0; --e) p[e] === t && p.splice(e, 1)
                }, c.uninstall = function() {
                  d && (r.onerror = u, d = !1, u = void 0), p = []
                }, c
              }(), o.computeStackTrace = function() {
                function t(t) {
                  if ("undefined" != typeof t.stack && t.stack) {
                    for (var e, n, s, o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, r = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, a = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, h = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, c = /\((\S*)(?::(\d+))(?::(\d+))\)/, u = t.stack.split("\n"), d = [], p = (/^(.*) is undefined$/.exec(t.message), 0), f = u.length; p < f; ++p) {
                      if (n = o.exec(u[p])) {
                        var m = n[2] && 0 === n[2].indexOf("native");
                        n[2] && 0 === n[2].indexOf("eval") && (e = c.exec(n[2])) && (n[2] = e[1], n[3] = e[2], n[4] = e[3]), s = {
                          url: m ? null : n[2],
                          func: n[1] || l,
                          args: m ? [n[2]] : [],
                          line: n[3] ? +n[3] : null,
                          column: n[4] ? +n[4] : null
                        }
                      } else if (n = r.exec(u[p])) s = {
                        url: n[2],
                        func: n[1] || l,
                        args: [],
                        line: +n[3],
                        column: n[4] ? +n[4] : null
                      };
                      else {
                        if (!(n = a.exec(u[p]))) continue;
                        n[3] && n[3].indexOf(" > eval") > -1 && (e = h.exec(n[3])) ? (n[3] = e[1], n[4] = e[2], n[5] = null) : 0 !== p || n[5] || "undefined" == typeof t.columnNumber || (d[0].column = t.columnNumber + 1), s = {
                          url: n[3],
                          func: n[1] || l,
                          args: n[2] ? n[2].split(",") : [],
                          line: n[4] ? +n[4] : null,
                          column: n[5] ? +n[5] : null
                        }
                      }
                      if (!s.func && s.line && (s.func = l), s.url && "blob:" === s.url.substr(0, 5)) {
                        var y = new XMLHttpRequest;
                        if (y.open("GET", s.url, !1), y.send(null), 200 === y.status) {
                          var g = y.responseText || "",
                            v = (g = g.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                          if (v) {
                            var b = v[1];
                            "~" === b.charAt(0) && (b = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + b.slice(1)), s.url = b.slice(0, -4)
                          }
                        }
                      }
                      d.push(s)
                    }
                    return d.length ? {
                      name: t.name,
                      message: t.message,
                      url: i(),
                      stack: d
                    } : null
                  }
                }
  
                function e(t, e, n, i) {
                  var s = {
                    url: e,
                    line: n
                  };
                  if (s.url && s.line) {
                    if (t.incomplete = !1, s.func || (s.func = l), t.stack.length > 0 && t.stack[0].url === s.url) {
                      if (t.stack[0].line === s.line) return !1;
                      if (!t.stack[0].line && t.stack[0].func === s.func) return t.stack[0].line = s.line, !1
                    }
                    return t.stack.unshift(s), t.partial = !0, !0
                  }
                  return t.incomplete = !0, !1
                }
  
                function n(t, r) {
                  for (var a, h, c = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, u = [], d = {}, p = !1, f = n.caller; f && !p; f = f.caller)
                    if (f !== s && f !== o.report) {
                      if (h = {
                          url: null,
                          func: l,
                          line: null,
                          column: null
                        }, f.name ? h.func = f.name : (a = c.exec(f.toString())) && (h.func = a[1]), "undefined" == typeof h.func) try {
                        h.func = a.input.substring(0, a.input.indexOf("{"))
                      } catch (y) {}
                      d["" + f] ? p = !0 : d["" + f] = !0, u.push(h)
                    } r && u.splice(0, r);
                  var m = {
                    name: t.name,
                    message: t.message,
                    url: i(),
                    stack: u
                  };
                  return e(m, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description), m
                }
  
                function s(e, s) {
                  var a = null;
                  s = null == s ? 0 : +s;
                  try {
                    if (a = t(e)) return a
                  } catch (r) {
                    if (o.debug) throw r
                  }
                  try {
                    if (a = n(e, s + 1)) return a
                  } catch (r) {
                    if (o.debug) throw r
                  }
                  return {
                    name: e.name,
                    message: e.message,
                    url: i()
                  }
                }
                return s.augmentStackTraceWithInitialElement = e, s.computeStackTraceFromStackProp = t, s
              }(), e.exports = o
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            5: 5
          }],
          7: [function(t, e, n) {
            function i(t, e) {
              for (var n = 0; n < t.length; ++n)
                if (t[n] === e) return n;
              return -1
            }
  
            function s(t, e) {
              var n = [],
                s = [];
              return null == e && (e = function(t, e) {
                  return n[0] === e ? "[Circular ~]" : "[Circular ~." + s.slice(0, i(n, e)).join(".") + "]"
                }),
                function(o, r) {
                  if (n.length > 0) {
                    var a = i(n, this);
                    ~a ? n.splice(a + 1) : n.push(this), ~a ? s.splice(a, 1 / 0, o) : s.push(o), ~i(n, r) && (r = e.call(this, o, r))
                  } else n.push(r);
                  return null == t ? r instanceof Error ? function(t) {
                    var e = {
                      stack: t.stack,
                      message: t.message,
                      name: t.name
                    };
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    return e
                  }(r) : r : t.call(this, o, r)
                }
            }(e.exports = function(t, e, n, i) {
              return JSON.stringify(t, s(e, i), n)
            }).getSerialize = s
          }, {}],
          8: [function(t, e, n) {
            function i(t, e) {
              var n = (65535 & t) + (65535 & e);
              return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
            }
  
            function s(t, e, n, s, o, r) {
              return i(function(t, e) {
                return t << e | t >>> 32 - e
              }(i(i(e, t), i(s, r)), o), n)
            }
  
            function o(t, e, n, i, o, r, a) {
              return s(e & n | ~e & i, t, e, o, r, a)
            }
  
            function r(t, e, n, i, o, r, a) {
              return s(e & i | n & ~i, t, e, o, r, a)
            }
  
            function a(t, e, n, i, o, r, a) {
              return s(e ^ n ^ i, t, e, o, r, a)
            }
  
            function l(t, e, n, i, o, r, a) {
              return s(n ^ (e | ~i), t, e, o, r, a)
            }
  
            function h(t, e) {
              t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
              var n, s, h, c, u, d = 1732584193,
                p = -271733879,
                f = -1732584194,
                m = 271733878;
              for (n = 0; n < t.length; n += 16) s = d, h = p, c = f, u = m, d = o(d, p, f, m, t[n], 7, -680876936), m = o(m, d, p, f, t[n + 1], 12, -389564586), f = o(f, m, d, p, t[n + 2], 17, 606105819), p = o(p, f, m, d, t[n + 3], 22, -1044525330), d = o(d, p, f, m, t[n + 4], 7, -176418897), m = o(m, d, p, f, t[n + 5], 12, 1200080426), f = o(f, m, d, p, t[n + 6], 17, -1473231341), p = o(p, f, m, d, t[n + 7], 22, -45705983), d = o(d, p, f, m, t[n + 8], 7, 1770035416), m = o(m, d, p, f, t[n + 9], 12, -1958414417), f = o(f, m, d, p, t[n + 10], 17, -42063), p = o(p, f, m, d, t[n + 11], 22, -1990404162), d = o(d, p, f, m, t[n + 12], 7, 1804603682), m = o(m, d, p, f, t[n + 13], 12, -40341101), f = o(f, m, d, p, t[n + 14], 17, -1502002290), d = r(d, p = o(p, f, m, d, t[n + 15], 22, 1236535329), f, m, t[n + 1], 5, -165796510), m = r(m, d, p, f, t[n + 6], 9, -1069501632), f = r(f, m, d, p, t[n + 11], 14, 643717713), p = r(p, f, m, d, t[n], 20, -373897302), d = r(d, p, f, m, t[n + 5], 5, -701558691), m = r(m, d, p, f, t[n + 10], 9, 38016083), f = r(f, m, d, p, t[n + 15], 14, -660478335), p = r(p, f, m, d, t[n + 4], 20, -405537848), d = r(d, p, f, m, t[n + 9], 5, 568446438), m = r(m, d, p, f, t[n + 14], 9, -1019803690), f = r(f, m, d, p, t[n + 3], 14, -187363961), p = r(p, f, m, d, t[n + 8], 20, 1163531501), d = r(d, p, f, m, t[n + 13], 5, -1444681467), m = r(m, d, p, f, t[n + 2], 9, -51403784), f = r(f, m, d, p, t[n + 7], 14, 1735328473), d = a(d, p = r(p, f, m, d, t[n + 12], 20, -1926607734), f, m, t[n + 5], 4, -378558), m = a(m, d, p, f, t[n + 8], 11, -2022574463), f = a(f, m, d, p, t[n + 11], 16, 1839030562), p = a(p, f, m, d, t[n + 14], 23, -35309556), d = a(d, p, f, m, t[n + 1], 4, -1530992060), m = a(m, d, p, f, t[n + 4], 11, 1272893353), f = a(f, m, d, p, t[n + 7], 16, -155497632), p = a(p, f, m, d, t[n + 10], 23, -1094730640), d = a(d, p, f, m, t[n + 13], 4, 681279174), m = a(m, d, p, f, t[n], 11, -358537222), f = a(f, m, d, p, t[n + 3], 16, -722521979), p = a(p, f, m, d, t[n + 6], 23, 76029189), d = a(d, p, f, m, t[n + 9], 4, -640364487), m = a(m, d, p, f, t[n + 12], 11, -421815835), f = a(f, m, d, p, t[n + 15], 16, 530742520), d = l(d, p = a(p, f, m, d, t[n + 2], 23, -995338651), f, m, t[n], 6, -198630844), m = l(m, d, p, f, t[n + 7], 10, 1126891415), f = l(f, m, d, p, t[n + 14], 15, -1416354905), p = l(p, f, m, d, t[n + 5], 21, -57434055), d = l(d, p, f, m, t[n + 12], 6, 1700485571), m = l(m, d, p, f, t[n + 3], 10, -1894986606), f = l(f, m, d, p, t[n + 10], 15, -1051523), p = l(p, f, m, d, t[n + 1], 21, -2054922799), d = l(d, p, f, m, t[n + 8], 6, 1873313359), m = l(m, d, p, f, t[n + 15], 10, -30611744), f = l(f, m, d, p, t[n + 6], 15, -1560198380), p = l(p, f, m, d, t[n + 13], 21, 1309151649), d = l(d, p, f, m, t[n + 4], 6, -145523070), m = l(m, d, p, f, t[n + 11], 10, -1120210379), f = l(f, m, d, p, t[n + 2], 15, 718787259), p = l(p, f, m, d, t[n + 9], 21, -343485551), d = i(d, s), p = i(p, h), f = i(f, c), m = i(m, u);
              return [d, p, f, m]
            }
  
            function c(t) {
              var e, n = "",
                i = 32 * t.length;
              for (e = 0; e < i; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
              return n
            }
  
            function u(t) {
              var e, n = [];
              for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
              var i = 8 * t.length;
              for (e = 0; e < i; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
              return n
            }
  
            function d(t) {
              var e, n, i = "0123456789abcdef",
                s = "";
              for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), s += i.charAt(e >>> 4 & 15) + i.charAt(15 & e);
              return s
            }
  
            function p(t) {
              return unescape(encodeURIComponent(t))
            }
  
            function f(t) {
              return function(t) {
                return c(h(u(t), 8 * t.length))
              }(p(t))
            }
  
            function m(t, e) {
              return function(t, e) {
                var n, i, s = u(t),
                  o = [],
                  r = [];
                for (o[15] = r[15] = void 0, s.length > 16 && (s = h(s, 8 * t.length)), n = 0; n < 16; n += 1) o[n] = 909522486 ^ s[n], r[n] = 1549556828 ^ s[n];
                return i = h(o.concat(u(e)), 512 + 8 * e.length), c(h(r.concat(i), 640))
              }(p(t), p(e))
            }
            e.exports = function(t, e, n) {
              return e ? n ? m(e, t) : function(t, e) {
                return d(m(t, e))
              }(e, t) : n ? f(t) : function(t) {
                return d(f(t))
              }(t)
            }
          }, {}]
        }, {}, [4])(4)
      });
    var v = [{
        family: "UC Browser",
        patterns: ["(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)"]
      }, {
        family: "Opera",
        name_replace: "Opera Mobile",
        patterns: ["(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)", "(Opera)/(\\d+)\\.(\\d+).+Opera Mobi", "Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)", "Opera Mobi", "(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
      }, {
        family: "Opera",
        name_replace: "Opera Mini",
        patterns: ["(Opera Mini)(?:/att|)/?(\\d+|)(?:\\.(\\d+)|)(?:\\.(\\d+)|)", "(OPiOS)/(\\d+).(\\d+).(\\d+)"]
      }, {
        family: "Opera",
        name_replace: "Opera Neon",
        patterns: ["Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)"]
      }, {
        name_replace: "Opera",
        patterns: ["(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
      }, {
        family: "Firefox",
        name_replace: "Firefox Mobile",
        patterns: ["(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)", "(Fennec)/(\\d+)\\.(\\d+)(pre)", "(Fennec)/(\\d+)\\.(\\d+)", "(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)", "(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)"]
      }, {
        name_replace: "Coc Coc",
        patterns: ["(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
      }, {
        family: "QQ",
        name_replace: "QQ Mini",
        patterns: ["(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
      }, {
        family: "QQ",
        name_replace: "QQ Mobile",
        patterns: ["(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
      }, {
        name_replace: "QQ",
        patterns: ["(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)|)"]
      }, {
        family: "Edge",
        name: "Edge Mobile",
        patterns: ["Windows Phone .*(Edge)/(\\d+)\\.(\\d+)", "(EdgiOS|EdgA)/(\\d+)\\.(\\d+).(\\d+).(\\d+)"]
      }, {
        name_replace: "Edge",
        patterns: ["(Edge|Edg)/(\\d+)(?:\\.(\\d+)|)"]
      }, {
        patterns: ["(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
      }, {
        family: "Chrome",
        name_replace: "Chrome Mobile",
        patterns: ["Version/.+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)", " Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"]
      }, {
        family: "Yandex",
        name_replace: "Yandex Mobile",
        patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+).*Mobile"]
      }, {
        name_replace: "Yandex",
        patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)"]
      }, {
        patterns: ["(Vivaldi)/(\\d+)\\.(\\d+)", "(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)"]
      }, {
        name_replace: "Brave",
        patterns: ["(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome"]
      }, {
        family: "Chrome",
        patterns: ["(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
      }, {
        name_replace: "Internet Explorer Mobile",
        patterns: ["(IEMobile)[ /](\\d+)\\.(\\d+)"]
      }, {
        family: "Safari",
        name_replace: "Safari Mobile",
        patterns: ["(iPod|iPhone|iPad).+Version/(d+).(d+)(?:.(d+)|).*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews\\/\\d+\\.\\d+\\.\\d+?", "(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile.*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile", "(iPod|iPod touch|iPhone|iPad).* Safari", "(iPod|iPod touch|iPhone|iPad)"]
      }, {
        name_replace: "Safari",
        patterns: ["(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|).*Safari/"]
      }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(7|8).(0)"],
        major_replace: "11"
      }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(6)\\.(0)"],
        major_replace: "10"
      }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(5)\\.(0)"],
        major_replace: "9"
      }, {
        name_replace: "Internet Explorer",
        patterns: ["(Trident)/(4)\\.(0)"],
        major_replace: "8"
      }, {
        family: "Firefox",
        patterns: ["(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)", "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*|)"]
      }],
      b = [{
        family: "Windows",
        name_replace: "Windows Phone",
        patterns: ["(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)", "^UCWEB.*; (wds) (\\d+)\\.(d+)(?:\\.(\\d+)|);", "^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+)|);"]
      }, {
        family: "Windows",
        name_replace: "Windows Mobile",
        patterns: ["(Windows ?Mobile)"]
      }, {
        name_replace: "Android",
        patterns: ["(Android)[ \\-/](\\d+)(?:\\.(\\d+)|)(?:[.\\-]([a-z0-9]+)|)", "(Android) (d+);", "^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+)|);", "^(JUC).*; ?U; ?(?:Android|)(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+)|)", "(android)\\s(?:mobile\\/)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)|)|)", "(Silk-Accelerated=[a-z]{4,5})", "Puffin/[\\d\\.]+AT", "Puffin/[\\d\\.]+AP"]
      }, {
        name_replace: "Chrome OS",
        patterns: ["(x86_64|aarch64)\\ (\\d+)\\.(\\d+)\\.(\\d+).*Chrome.*(?:CitrixChromeApp)$", "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
      }, {
        name_replace: "Windows",
        patterns: ["(Windows 10)", "(Windows NT 6\\.4)", "(Windows NT 10\\.0)"],
        major_replace: "10"
      }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.3; ARM;)", "(Windows NT 6.3)"],
        major_replace: "8",
        minor_replace: "1"
      }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.2)"],
        major_replace: "8"
      }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.1)"],
        major_replace: "7"
      }, {
        name_replace: "Windows",
        patterns: ["(Windows NT 6\\.0)"],
        major_replace: "Vista"
      }, {
        name_replace: "Windows",
        patterns: ["(Windows (?:NT 5\\.2|NT 5\\.1))"],
        major_replace: "XP"
      }, {
        name_replace: "Mac OS X",
        patterns: ["((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+)|)|Mach-O)", "\\w+\\s+Mac OS X\\s+\\w+\\s+(\\d+).(\\d+).(\\d+).*", "(?:PPC|Intel) (Mac OS X)"]
      }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(10).(d+).*((?:i386|x86_64))"],
        major_replace: "10",
        minor_replace: "6"
      }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "7"
      }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "8"
      }, {
        name_replace: "Mac OS X",
        patterns: [" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)"],
        major_replace: "10",
        minor_replace: "9"
      }, {
        name_replace: "iOS",
        patterns: ["^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+)|);", "(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+)|)", "(iPhone|iPad|iPod); Opera", "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)", "\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+)|)", "\\((iOS);", "(iPod|iPhone|iPad)", "Puffin/[\\d\\.]+IT", "Puffin/[\\d\\.]+IP"]
      }, {
        family: "Chrome",
        name_replace: "Chromecast",
        patterns: ["(CrKey -)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey[ +]armv7l)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)"]
      }, {
        name_replace: "Debian",
        patterns: ["([Dd]ebian)"]
      }, {
        family: "Linux",
        name_replace: "Linux",
        patterns: ["(Linux Mint)(?:/(\\d+)|)"]
      }, {
        family: "Linux",
        patterns: ["(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)", "(Mandriva)(?: Linux|)/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d)|)", "(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "\\(linux-gnu\\)"]
      }, {
        family: "BlackBerry",
        name_replace: "BlackBerry OS",
        patterns: ["(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)", "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry)"]
      }, {
        patterns: ["(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Sailfish|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
      }],
      w = navigator.userAgent,
      k = {
        getAgent: function() {
          return w
        },
        getBrowser: function(t) {
          return E(t || w, v)
        },
        getOS: function(t) {
          return E(t || w, b)
        }
      };
  
    function x(t, e) {
      try {
        var n = new RegExp(e).exec(t);
        return n ? {
          name: n[1] || "Other",
          major: n[2] || "0",
          minor: n[3] || "0",
          patch: n[4] || "0"
        } : null
      } catch (xi) {
        return null
      }
    }
  
    function E(t, e) {
      for (var n = null, i = null, s = -1, o = !1; ++s < e.length && !o;) {
        n = e[s];
        for (var r = -1; ++r < n.patterns.length && !o;) o = null !== (i = x(t, n.patterns[r]))
      }
      return o ? (i.family = n.family || n.name_replace || i.name, n.name_replace && (i.name = n.name_replace), n.major_replace && (i.major = n.major_replace), n.minor_replace && (i.minor = n.minor_replace), n.patch_replace && (i.minor = n.patch_replace), i) : {
        family: "Other",
        name: "Other",
        major: "0",
        minor: "0",
        patch: "0"
      }
    }
  
    function C() {
      var t = this,
        e = k.getBrowser(),
        n = k.getAgent();
      this.agent = n.toLowerCase(), this.language = window.navigator.userLanguage || window.navigator.language, this.isCSS1 = "CSS1Compat" === (document.compatMode || ""), this.width = function() {
        return window.innerWidth && window.document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth
      }, this.height = function() {
        return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight
      }, this.scrollX = function() {
        return window.pageXOffset !== undefined ? window.pageXOffset : t.isCSS1 ? document.documentElement.scrollLeft : document.body.scrollLeft
      }, this.scrollY = function() {
        return window.pageYOffset !== undefined ? window.pageYOffset : t.isCSS1 ? document.documentElement.scrollTop : document.body.scrollTop
      }, this.type = "Edge" === e.family ? "edge" : "Internet Explorer" === e.family ? "ie" : "Chrome" === e.family ? "chrome" : "Safari" === e.family ? "safari" : "Firefox" === e.family ? "firefox" : e.family.toLowerCase(), this.version = 1 * (e.major + "." + e.minor) || 0, this.hasPostMessage = !!window.postMessage
    }
    C.prototype.hasEvent = function(t, e) {
      return "on" + t in (e || document.createElement("div"))
    }, C.prototype.getScreenDimensions = function() {
      var t = {};
      for (var e in window.screen) t[e] = window.screen[e];
      return delete t.orientation, t
    }, C.prototype.interrogateNavigator = function() {
      var t = {};
      for (var e in window.navigator) try {
        t[e] = window.navigator[e]
      } catch (ki) {}
      if (delete t.plugins, delete t.mimeTypes, t.plugins = [], window.navigator.plugins)
        for (var n = 0; n < window.navigator.plugins.length; n++) t.plugins[n] = window.navigator.plugins[n].filename;
      return t
    }, C.prototype.supportsCanvas = function() {
      var t = document.createElement("canvas");
      return !(!t.getContext || !t.getContext("2d"))
    }, C.prototype.supportsWebAssembly = function() {
      try {
        if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
          var t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
          if (t instanceof WebAssembly.Module) return new WebAssembly.Instance(t) instanceof WebAssembly.Instance
        }
      } catch (xi) {
        return !1
      }
    };
    var _ = {
        Browser: new C,
        System: new function() {
          var t, e, n = k.getOS(),
            i = k.getAgent();
          this.mobile = (t = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), e = !1, n && (e = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(n.name) >= 0), t && e), this.dpr = function() {
            return window.devicePixelRatio || 1
          }, this.mobile && n && "Windows" === n.family && i.indexOf("touch") < 0 && (this.mobile = !1), this.os = "iOS" === n.family ? "ios" : "Android" === n.family ? "android" : "Mac OS X" === n.family ? "mac" : "Windows" === n.family ? "windows" : "Linux" === n.family ? "linux" : n.family.toLowerCase(), this.version = function() {
            if (!n) return "unknown";
            var t = n.major;
            return n.minor && (t += "." + n.minor), n.patch && (t += "." + n.patch), t
          }()
        }
      },
      S = {
        host: null,
        file: null,
        sitekey: null,
        pingdom: "safari" === _.Browser.type && "windows" !== _.System.os && "mac" !== _.System.os && "ios" !== _.System.os && "android" !== _.System.os,
        assetDomain: "https://assets.hcaptcha.com",
        assetUrl: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static",
        width: null,
        height: null,
        mobile: null
      },
      O = {
        theme: {
          contrast: {
            hcolor: "#FFF",
            hfcolor: "#000"
          },
          light: {
            hcolor: "#00A3A8",
            hfcolor: "#FFF"
          }
        },
        text: "#555555",
        accent: "#926FC1",
        warn: {
          base: "#EB5757",
          hover: "#DE3F3F"
        },
        link: {
          base: "#25A29E",
          hover: "#207E7B"
        },
        white: "#fff",
        grey: {
          base: "#333",
          placeholder: "#f0eff0"
        },
        purple: "#65549b",
        hoverOff: "#25A29E",
        skipHoverOff: "#7D7C7C",
        hoverOn: "#207E7B",
        error: "#fc481e"
      },
      A = {
        language: null,
        reportapi: "https://accounts.hcaptcha.com",
        endpoint: "https://hcaptcha.com",
        endpointOverride: null,
        size: "normal",
        theme: "light",
        assethost: null,
        imghost: null,
        recaptchacompat: "true"
      };
  
    function $() {
      var t = this;
      this._bottom = 0, this._top = 0, this.storage = {}, this.add = function(e) {
        return t.storage[t._top] = e, t._top++, e
      }, this.remove = function() {
        if (!t.empty()) {
          var e = t._bottom,
            n = t.storage[e];
          return t.storage[e] = null, t._bottom++, n
        }
      }, this.empty = function() {
        return t._top === t._bottom
      }, this.size = function() {
        return t._top - t._bottom
      }
    }
    var L = {
      queue: $,
      depth: function Ei(t, e, n) {
        if ("object" == typeof t && t[e] && t[e].length > 0)
          for (var i = t[e].length; --i > -1;) Ei(t[e][i], e, n);
        t !== undefined && n(t)
      },
      breathe: function(t, e, n) {
        var i = new $,
          s = null;
        for (i.add(t), s = i.remove(); s;) {
          for (var o = 0; o < s[e].length; o++) i.add(s[e][o]);
          n(s), s = i.remove()
        }
      }
    };
  
    function T() {
      this.children = [], this._events = []
    }
    T.prototype.initComponent = function(t, e) {
      var n = new t(e);
      return n._parent = this, this.children.push(n), n
    }, T.prototype.destroy = function() {
      var t = this;
      try {
        L.depth(this, "children", function(e) {
          if (t !== e)
            for (var n = t.children.length; --n > -1;) t.children[n] === e && t.children.splice(n, 1);
          e._destroy && e._destroy(), e = null
        })
      } catch (xi) {
        throw new Error("Trouble destroying nodes: " + xi)
      }
      return null
    }, T.prototype._destroy = function() {
      this.onDestroy && this.onDestroy();
      for (var t = this._events.length || 0; --t > -1;) this._events.splice(t, 1);
      this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
    }, T.prototype.on = function(t, e) {
      for (var n = this._events.length, i = !1; --n > -1 && !1 === i;) this._events[n].event === t && (i = this._events[n]);
      !1 === i && (i = {
        event: t,
        listeners: []
      }, this._events.push(i)), i.listeners.push(e)
    }, T.prototype.off = function(t, e) {
      for (var n = this._events.length; --n > -1;)
        if (this._events[n].event === t) {
          for (var i = this._events[n].listeners.length; --i > -1;) this._events[n].listeners[i] === e && this._events[n].listeners[i].splice(i, 1);
          0 === this._events[n].listeners.length && this._events[n].splice(n, 1)
        }
    }, T.prototype.emit = function(t) {
      for (var e = Array.prototype.slice.call(arguments, 1), n = this._events.length; --n > -1;)
        if (this._events[n].event === t)
          for (var i = this._events[n].listeners.length; --i > -1;) this._events[n].listeners[i].apply(this, e)
    };
    var P = !0;
  
    function M(t) {
      var e = {
        message: t.name + ": " + t.message
      };
      t.stack && (e.stack_trace = {
        trace: t.stack
      }), j("report error", "internal", "debug", e), I("internal error", "error", S.file)
    }
  
    function I(t, e, n, i) {
      P && window.Raven && Raven.captureMessage(t, {
        level: e,
        logger: n
      })
    }
  
    function j(t, e, n, i) {
      P && window.Raven && Raven.captureBreadcrumb({
        message: t,
        category: e,
        level: n,
        data: i
      })
    }
  
    function R(t, e) {
      var n, i = "attempts" in (e = e || {}) ? e.attempts : 1,
        s = e.delay || 0,
        o = e.onFail;
      return n = function(e, n, r) {
        t().then(e, function(t) {
          var e = i-- > 0;
          o && (e = !1 !== o(t) && e), e ? setTimeout(r, s) : n(t)
        })
      }, new Promise(function(t, e) {
        n(t, e, function i() {
          n(t, e, i)
        })
      })
    }
    var B = {
        eventName: function(t) {
          var e = t;
          return "down" === t || "up" === t || "move" === t || "over" === t || "out" === t ? e = !_.System.mobile || "down" !== t && "up" !== t && "move" !== t ? "mouse" + t : "down" === t ? "touchstart" : "up" === t ? "touchend" : "touchmove" : "enter" === t && (e = "keydown"), e
        },
        actionName: function(t) {
          var e = t;
          return "touchstart" === e || "mousedown" === e ? e = "down" : "touchmove" === e || "mousemove" === e ? e = "move" : "touchend" === e || "mouseup" === e ? e = "up" : "mouseover" === e ? e = "over" : "mouseout" === e && (e = "out"), e
        },
        eventCallback: function(t, e, n) {
          var i = B.actionName(t);
          return function(s) {
            if (s = s || window.event, "down" === i || "move" === i || "up" === i || "over" === i || "out" === i || "click" === i) {
              var o = B.eventCoords(s),
                r = n.getBoundingClientRect();
              s.windowX = o.x, s.windowY = o.y, s.elementX = s.windowX - (r.x || r.left), s.elementY = s.windowY - (r.y || r.top)
            }
            s.keyNum = s.which || s.keyCode || 0, "enter" === t && 13 !== s.keyNum && 32 !== s.keyNum || (s.action = i, s.targetElement = n, e(s))
          }
        },
        eventCoords: function(t) {
          var e = {
            x: 0,
            y: 0
          };
          if (t.windowsPointer) return t;
          if (!t) return e;
          if (t.touches || t.changedTouches) {
            var n = (t.touches && t.touches.length >= 1 ? t.touches : t.changedTouches)[0];
            e.x = n.pageX || n.clientX, e.y = n.pageY || n.clientY
          } else e.x = t.pageX || t.clientX, e.y = t.pageY || t.clientY;
          return e
        }
      },
      D = ["Webkit", "Moz", "ms"],
      F = document.createElement("div").style,
      z = {};
  
    function H(t) {
      var e = z[t];
      return e || (t in F ? t : z[t] = function(t) {
        for (var e = t[0].toUpperCase() + t.slice(1), n = D.length; n--;)
          if ((t = D[n] + e) in F) return t
      }(t) || t)
    }
  
    function W(t, e, n) {
      if (this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, "object" == typeof t) {
        this.dom = t;
        var i = [],
          s = [];
        t.className && (s = t.className.split(" "));
        for (var o = 0; o < s.length; o++) "" !== s[o] && " " !== s[o] && i.push(s[o]);
        this._clss = i
      } else n !== undefined && null !== n || (n = !0), (t === undefined || "string" == typeof t && (t.indexOf("#") >= 0 || t.indexOf(".") >= 0)) && (t && (e = t), t = "div"), this.dom = document.createElement(t), e && (e.indexOf("#") >= 0 ? this.dom.id = e.split("#")[1] : (e.indexOf(".") >= 0 && (e = e.split(".")[1]), this.addClass.call(this, e)));
      !0 === n && (this._frag = document.createDocumentFragment(), this._frag.appendChild(this.dom))
    }
    W.prototype.createElement = function(t, e) {
      var n = new W(t, e, !1);
      return this.appendElement.call(this, n), this._nodes.push(n), n
    }, W.prototype.appendElement = function(t) {
      if (t === undefined) return M({
        name: "DomElement Add Child",
        message: "Child Element is undefined"
      });
      var e;
      e = t._frag !== undefined && null !== t._frag ? t._frag : t.dom !== undefined ? t.dom : t;
      try {
        t instanceof W && (t._parent = this), this.dom.appendChild(e)
      } catch (xi) {
        M({
          name: "DomElement Add Child",
          message: "Failed to append child."
        })
      }
      return this
    }, W.prototype.removeElement = function(t) {
      try {
        var e = t;
        if (t.dom) {
          e = e.dom;
          for (var n = t._nodes.length; --n > -1;) t.dom.removeChild(t._nodes[n].dom || t._nodes[n]), t._nodes.splice(n, 1)
        } else
          for (var i = this._nodes.length; --i > -1;) this._nodes[i] === e && this._nodes.splice(i, 1);
        e.parentNode === this.dom && this.dom.removeChild(e)
      } catch (xi) {
        M({
          name: "DomElement Remove Child",
          message: "Failed to remove child."
        })
      }
    }, W.prototype.addClass = function(t) {
      return !1 === this.hasClass.call(this, t) && (this._clss.push(t), this.dom.className = this._clss.join(" ")), this
    }, W.prototype.hasClass = function(t) {
      for (var e = !1, n = 0; n < this._clss.length; n++) this._clss[n] === t && (e = !0);
      return e
    }, W.prototype.removeClass = function(t) {
      for (var e = this._clss.length; --e > -1;) this._clss[e] === t && this._clss.splice(e, 1);
      return this.dom.className = this._clss.join(" "), this
    }, W.prototype.text = function(t) {
      if (this && this.dom) {
        if (!t) return this.dom.textContent;
        for (var e, n, i, s, o = /&(.*?);/g, r = /<[a-z][\s\S]*>/i; null !== (e = o.exec(t));) {
          !1 === r.test(e[0]) ? (i = e[0], s = void 0, (s = document.createElement("div")).innerHTML = i, n = s.textContent, t = t.replace(new RegExp(e[0], "g"), n)) : t = t.replace(e[0], "")
        }
        return this.dom.textContent = t, this
      }
    }, W.prototype.content = W.prototype.text, W.prototype.css = function(t) {
      var e;
      for (var n in t) {
        e = t[n];
        try {
          if ("opacity" !== n && "zIndex" !== n && "fontWeight" !== n && isFinite(e) && parseFloat(e) === e && (e += "px"), "ie" === _.Browser.type && 8 === _.Browser.version && "opacity" === n) this.dom.style.filter = "alpha(opacity=" + 100 * e + ")";
          else {
            var i = H(n);
            this.dom.style[i] = e
          }
        } catch (ki) {}
      }
      return this
    }, W.prototype.backgroundImage = function(t, e, n, i) {
      var s = e !== undefined && n !== undefined,
        o = {
          "-ms-high-contrast-adjust": "none"
        };
      if ("object" == typeof e && (i = e), i === undefined && (i = {}), s) {
        var r = t.width / t.height,
          a = e,
          l = a / r;
        i.cover && l < n && (a = (l = n) * r), i.contain && l > n && (a = (l = n) * r), o.width = a, o.height = l, i.center && (o.marginLeft = -a / 2, o.marginTop = -l / 2, o.position = "absolute", o.left = "50%", o.top = "50%"), (i.left || i.right) && (o.left = i.left || 0, o.top = i.top || 0)
      }
      "ie" === _.Browser.type && 8 === _.Browser.version ? o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t.src + "',sizingMethod='scale')" : (o.background = "url(" + t.src + ")", o.backgroundPosition = "50% 50%", o.backgroundRepeat = "no-repeat", o.backgroundSize = s ? a + "px " + l + "px" : i.cover ? "cover" : i.contain ? "contain" : "100%"), this.css.call(this, o)
    }, W.prototype.setAttribute = function(t, e) {
      var n;
      if ("object" == typeof t)
        for (var i in t) n = t[i], this.dom.setAttribute(i, n);
      else this.dom.setAttribute(t, e)
    }, W.prototype.removeAttribute = function(t, e) {
      var n;
      if ("object" == typeof t)
        for (var i in t) n = t[i], this.dom.removeAttribute(i, n);
      else this.dom.removeAttribute(t, e)
    }, W.prototype.addEventListener = function(t, e, n) {
      var i = {
        event: B.eventName(t),
        handler: B.eventCallback(t, e, this.dom),
        callback: e
      };
      this._listeners.push(i), this.dom.addEventListener ? this.dom.addEventListener(i.event, i.handler, n) : this.dom.attachEvent("on" + i.event, i.handler)
    }, W.prototype.removeEventListener = function(t, e, n) {
      for (var i, s = this._listeners.length; --s > -1;)(i = this._listeners[s]).event === t && i.callback === e && (this._listeners.splice(s, 1), this.dom.removeEventListener ? this.dom.removeEventListener(i.event, i.handler, n) : this.dom.detachEvent("on" + i.event, i.handler))
    }, W.prototype.focus = function() {
      this.dom.focus()
    }, W.prototype.blur = function() {
      this.dom.blur()
    }, W.prototype.html = function(t) {
      return t && (this.dom.innerHTML = t), this.dom.innerHTML
    }, W.prototype.__destroy = function() {
      for (var t, e = this._listeners.length; --e > -1;) t = this._listeners[e], this._listeners.splice(e, 1), this.dom.removeEventListener ? this.dom.removeEventListener(t.event, t.handler) : this.dom.detachEvent("on" + t.event, t.handler);
      return this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, t = null, null
    };
    var q = {
      self: function(t, e) {
        var n = {},
          i = Array.prototype.slice.call(arguments, 2);
        for (var s in e.apply(t, i), t) n[s] = t[s]
      },
      proto: function(t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t
      }
    };
  
    function N(t, e) {
      q.self(this, W, e || "div", t), this.children = [], this._events = []
    }
    q.proto(N, W), N.prototype.initComponent = function(t, e, n) {
      var i = new t(e);
      return i._parent = this, this.children.push(i), i.dom && (n !== undefined ? n.appendElement && n.appendElement(i) : this.appendElement(i)), i
    }, N.prototype.destroy = function() {
      var t = this;
      try {
        L.depth(this, "children", function(e) {
          if (t !== e)
            for (var n = t.children.length; --n > -1;) t.children[n] === e && t.children.splice(n, 1);
          e._destroy && e._destroy(), e = null
        })
      } catch (xi) {
        throw new Error("Trouble destroying nodes: " + xi)
      }
      return null
    }, N.prototype._destroy = function() {
      try {
        this.onDestroy && this.onDestroy(), this._parent.removeElement && this._parent.removeElement(this);
        for (var t = this._events.length; --t > -1;) this._events.splice(t, 1);
        this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
      } catch (xi) {
        M({
          name: "DomComponent",
          message: "Failed to destroy."
        })
      }
    }, N.prototype.on = function(t, e) {
      for (var n = this._events.length, i = !1; --n > -1 && !1 === i;) this._events[n].event === t && (i = this._events[n]);
      !1 === i && (i = {
        event: t,
        listeners: []
      }, this._events.push(i)), i.listeners.push(e)
    }, N.prototype.off = function(t, e) {
      for (var n = this._events.length; --n > -1;)
        if (this._events[n].event === t) {
          for (var i = this._events[n].listeners.length; --i > -1;) this._events[n].listeners[i] === e && this._events[n].listeners.splice(i, 1);
          0 === this._events[n].listeners.length && this._events.splice(n, 1)
        }
    }, N.prototype.emit = function(t) {
      for (var e = Array.prototype.slice.call(arguments, 1), n = this._events.length; --n > -1 && this._events;)
        if (this._events[n].event === t)
          for (var i = this._events[n].listeners.length; --i > -1;) this._events[n].listeners[i].apply(this, e)
    };
    var U = {
        af: "Afrikaans",
        sq: "Albanian",
        am: "Amharic",
        ar: "Arabic",
        hy: "Armenian",
        az: "Azerbaijani",
        eu: "Basque",
        be: "Belarusian",
        bn: "Bengali",
        bg: "Bulgarian",
        bs: "Bosnian",
        my: "Burmese",
        ca: "Catalan",
        ceb: "Cebuano",
        zh: "Chinese",
        "zh-CN": "Chinese Simplified",
        "zh-TW": "Chinese Traditional",
        co: "Corsican",
        hr: "Croatian",
        cs: "Czech",
        da: "Danish",
        nl: "Dutch",
        en: "English",
        eo: "Esperanto",
        et: "Estonian",
        fa: "Persian",
        fi: "Finnish",
        fr: "French",
        fy: "Frisian",
        gd: "Gaelic",
        gl: "Galacian",
        ka: "Georgian",
        de: "German",
        el: "Greek",
        gu: "Gujurati",
        ht: "Haitian",
        ha: "Hausa",
        haw: "Hawaiian",
        he: "Hebrew",
        hi: "Hindi",
        hmn: "Hmong",
        hu: "Hungarian",
        is: "Icelandic",
        ig: "Igbo",
        id: "Indonesian",
        ga: "Irish",
        it: "Italian",
        ja: "Japanese",
        jw: "Javanese",
        kn: "Kannada",
        kk: "Kazakh",
        km: "Khmer",
        rw: "Kinyarwanda",
        ky: "Kirghiz",
        ko: "Korean",
        ku: "Kurdish",
        lo: "Lao",
        la: "Latin",
        lv: "Latvian",
        lt: "Lithuanian",
        lb: "Luxembourgish",
        mk: "Macedonian",
        mg: "Malagasy",
        ms: "Malay",
        ml: "Malayalam",
        mt: "Maltese",
        mi: "Maori",
        mr: "Marathi",
        mn: "Mongolian",
        ne: "Nepali",
        no: "Norwegian",
        ny: "Nyanja",
        or: "Oriya",
        pl: "Polish",
        pt: "Portuguese",
        ps: "Pashto",
        pa: "Punjabi",
        ro: "Romanian",
        ru: "Russian",
        sm: "Samoan",
        sn: "Shona",
        sd: "Sindhi",
        si: "Singhalese",
        sr: "Serbian",
        sk: "Slovak",
        sl: "Slovenian",
        so: "Somani",
        st: "Southern Sotho",
        es: "Spanish",
        su: "Sundanese",
        sw: "Swahili",
        sv: "Swedish",
        tl: "Tagalog",
        tg: "Tajik",
        ta: "Tamil",
        tt: "Tatar",
        te: "Teluga",
        th: "Thai",
        tr: "Turkish",
        tk: "Turkmen",
        ug: "Uyghur",
        uk: "Ukrainian",
        ur: "Urdu",
        uz: "Uzbek",
        vi: "Vietnamese",
        cy: "Welsh",
        xh: "Xhosa",
        yi: "Yiddish",
        yo: "Yoruba",
        zu: "Zulu"
      },
      V = {
        zh: {
          "I am human": "我是人"
        },
        ar: {
          "I am human": "أنا الإنسان"
        },
        af: {
          "I am human": "Ek is menslike"
        },
        am: {
          "I am human": "እኔ ሰው ነኝ"
        },
        hy: {
          "I am human": "Ես մարդ եմ"
        },
        az: {
          "I am human": "Mən insanam"
        },
        eu: {
          "I am human": "Gizakia naiz"
        },
        bn: {
          "I am human": "আমি মানব নই"
        },
        bg: {
          "I am human": "Аз съм човек"
        },
        ca: {
          "I am human": "Sóc humà"
        },
        hr: {
          "I am human": "Ja sam čovjek"
        },
        cs: {
          "I am human": "Jsem člověk"
        },
        da: {
          "I am human": "Jeg er et menneske"
        },
        nl: {
          "I am human": "Ik ben een mens"
        },
        et: {
          "I am human": "Ma olen inimeste"
        },
        fi: {
          "I am human": "Olen ihminen"
        },
        fr: {
          "I am human": "Je suis humain"
        },
        gl: {
          "I am human": "Eu son humano"
        },
        ka: {
          "I am human": "მე ვარ ადამიანი"
        },
        de: {
          "I am human": "Ich bin ein Mensch"
        },
        el: {
          "I am human": "Είμαι άνθρωπος"
        },
        gu: {
          "I am human": "હું માનવ છું"
        },
        iw: {
          "I am human": ". אני אנושי"
        },
        hi: {
          "I am human": "मैं मानव हूं"
        },
        hu: {
          "I am human": "Nem vagyok robot"
        },
        is: {
          "I am human": "Ég er manneskja"
        },
        id: {
          "I am human": "Aku manusia"
        },
        it: {
          "I am human": "Sono un essere umano"
        },
        ja: {
          "I am human": "私は人間です"
        },
        kn: {
          "I am human": "ನಾನು ಮಾನವನು"
        },
        ko: {
          "I am human": "사람입니다"
        },
        lo: {
          "I am human": "ຂ້ອຍເປັນມະນຸດ"
        },
        lv: {
          "I am human": "Es esmu cilvēks"
        },
        lt: {
          "I am human": "Aš esu žmogaus"
        },
        ms: {
          "I am human": "Saya manusia"
        },
        ml: {
          "I am human": "ഞാൻ മനുഷ്യനാണ്"
        },
        mr: {
          "I am human": "मी मानवी आहे"
        },
        mn: {
          "I am human": "Би бол хүн"
        },
        no: {
          "I am human": "Jeg er menneskelig"
        },
        fa: {
          "I am human": "من انسانی هستم"
        },
        pl: {
          "I am human": "Jestem człowiekiem"
        },
        pt: {
          "I am human": "Sou humano"
        },
        ro: {
          "I am human": "Eu sunt om"
        },
        ru: {
          "I am human": "Я человек"
        },
        sr: {
          "I am human": "Ja sam ljudski"
        },
        si: {
          "I am human": "මම මිනිස්සු"
        },
        sk: {
          "I am human": "Ja som človek"
        },
        sl: {
          "I am human": "Jaz sem človeški"
        },
        es: {
          "I am human": "Soy humano"
        },
        sw: {
          "I am human": "Mimi ni binadamu"
        },
        sv: {
          "I am human": "Jag är människa"
        },
        ta: {
          "I am human": "நான் மனித"
        },
        te: {
          "I am human": "నేను మనిషిని"
        },
        th: {
          "I am human": "ผมมนุษย์"
        },
        tr: {
          "I am human": "Ben bir insanım"
        },
        uk: {
          "I am human": "Я людини"
        },
        ur: {
          "I am human": "میں انسان ہوں"
        },
        vi: {
          "I am human": "Tôi là con người"
        },
        zu: {
          "I am human": "Ngingumuntu"
        }
      },
      X = null,
      J = {
        translate: function(t) {
          var e = J.getBestTrans(V);
          return e && e[t] || t
        },
        getBestTrans: function(t) {
          var e = J.getLocale();
          return e in t ? t[e] : J.getShortLocale(e) in t ? t[J.getShortLocale(e)] : "en" in t ? t.en : null
        },
        getLocale: function() {
          var t = X || window.navigator.userLanguage || window.navigator.language,
            e = J.getShortLocale(t);
          return "in" === e && (t = "id"), "iw" === e && (t = "he"), "nb" === e && (t = "no"), "ji" === e && (t = "yi"), "zh-CN" === t && (t = "zh"), "jv" === e && (t = "jw"), U[t] ? t : U[e] ? e : "en"
        },
        setLocale: function(t) {
          X = t
        },
        getShortLocale: function(t) {
          return t.indexOf("-") >= 0 ? t.substring(0, t.indexOf("-")) : t
        },
        isShortLocale: function(t) {
          return 2 === t.length || 3 === t.length
        },
        addTable: function(t, e) {
          if (e || (e = Object.create(null)), V[t]) {
            var n = V[t];
            for (var i in e) n[i] = e[i]
          } else V[t] = e;
          return V[t]
        },
        getTable: function(t) {
          return V[t]
        },
        addTables: function(t) {
          for (var e in t) J.addTable(e, t[e]);
          return V
        },
        getTables: function() {
          return V
        }
      },
      K = {
        touchstart: "ts",
        touchend: "te",
        touchmove: "tm",
        touchcancel: "tc"
      },
      Y = {
        mousedown: "md",
        mouseup: "mu",
        mousemove: "mm"
      },
      G = {
        keydown: "kd",
        keyup: "ku"
      },
      Q = {
        devicemotion: "dm"
      },
      Z = function(t, e) {
        var n = Y[t],
          i = null;
        return function(t) {
          i = function(t) {
            return [t.windowX, t.windowY, Date.now()]
          }(t), e(n, i)
        }
      },
      tt = function(t, e) {
        var n = K[t],
          i = null;
        return function(t) {
          i = function(t) {
            for (var e, n = t.touches && t.touches.length >= 1 ? t.touches : t.changedTouches, i = [], s = 0; s < n.length; s++) e = B.eventCoords(n[s]), i.push([n[s].identifier, e.x, e.y]);
            return i.push(Date.now()), i
          }(t), e(n, i)
        }
      },
      et = function(t, e) {
        var n = G[t],
          i = null;
        return function(t) {
          i = function(t) {
            return [t.keyNum, Date.now()]
          }(t), e(n, i)
        }
      },
      nt = function(t, e) {
        var n = Q[t],
          i = null,
          s = [];
        return function(t) {
          null !== (i = function(t, e) {
            (t.acceleration === undefined || t.acceleration && t.acceleration.x === undefined) && (t.acceleration = {
              x: 0,
              y: 0,
              z: 0
            });
            (t.rotationRate === undefined || t.rotationRate && t.rotationRate.alpha === undefined) && (t.rotationRate = {
              alpha: 0,
              beta: 0,
              gamma: 0
            });
            var n = [t.acceleration.x, t.acceleration.y, t.acceleration.z, t.rotationRate.alpha, t.rotationRate.beta, t.rotationRate.gamma, Date.now()],
              i = [];
            if (0 === e.length) e = n, i = n;
            else {
              for (var s, o = 0, r = 0; r < 6; r++) s = e[r] - n[r], i.push(n[r]), o += Math.abs(s);
              if (i.push(Date.now()), e = n, o <= 0) return null
            }
            return {
              motion: i,
              prevmotion: e
            }
          }(t, s)) && (s = i.prevmotion, i = i.motion, e(n, i))
        }
      };
    var it = {},
      st = {},
      ot = 500,
      rt = 5e3,
      at = Date.now(),
      lt = !1,
      ht = !1,
      ct = null,
      ut = !0,
      dt = !0,
      pt = !1,
      ft = !0,
      mt = {
        record: function(t, e, n, i) {
          ut = t === undefined ? ut : t, dt = n === undefined ? dt : n, pt = e === undefined ? pt : e, ft = i === undefined ? ft : i, !1 === ht && (ct = new W(document.body), ut && (ct.addEventListener("mousedown", Z("mousedown", yt)), ct.addEventListener("mousemove", Z("mousemove", yt)), ct.addEventListener("mouseup", Z("mouseup", yt))), !0 === pt && (ct.addEventListener("keyup", et("keyup", yt)), ct.addEventListener("keydown", et("keydown", yt))), dt && !0 === _.Browser.hasEvent("touchstart", document.body) && (ct.addEventListener("touchstart", tt("touchstart", yt)), ct.addEventListener("touchmove", tt("touchmove", yt)), ct.addEventListener("touchend", tt("touchend", yt))), ft && !0 === _.Browser.hasEvent("devicemotion", window) && ct.addEventListener("devicemotion", nt("devicemotion", yt)), ht = !0), it.st = Date.now(), lt = !0
        },
        stop: function() {
          !1 !== lt && (lt = !1)
        },
        time: function() {
          return at
        },
        getData: function() {
          return it
        },
        setData: function(t, e) {
          it[t] || (it[t] = null), Array.isArray(it[t]) ? it[t].push(e) : it[t] = e
        },
        resetData: function() {
          it = {}, st = {}
        },
        circBuffPush: yt
      };
  
    function yt(t, e, n, i) {
      if (!1 !== lt)
        if (it[t]) {
          var s = n || ot,
            o = i || rt;
          if (it[t].length < o) it[t].push(e);
          else {
            var r = st[t];
            0 === r && (r = s);
            var a = (r + 1) % o;
            st[t] = a, it[t][r] = e
          }
        } else it[t] = [e], st[t] = 0
    }
    var gt = [],
      vt = !1,
      bt = !1;
  
    function wt(t) {
      var e = Array.prototype.slice.call(arguments, 1);
      !0 !== bt && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (gt.push({
        fn: t,
        args: e
      }), !1 === vt && function() {
        document.addEventListener ? (document.addEventListener("DOMContentLoaded", xt), window.addEventListener("load", xt)) : (document.attachEvent("onreadystatechange", kt), window.attachEvent("onload", xt));
        vt = !0
      }()) : setTimeout(function() {
        t(e)
      }, 1)
    }
  
    function kt() {
      "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || xt()
    }
  
    function xt() {
      if (!1 === bt) {
        for (var t = 0; t < gt.length; t++) gt[t].fn.apply(null, gt[t].args);
        gt = []
      }
      bt = !0, document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", xt), window.removeEventListener("load", xt)) : (document.detachEvent("onreadystatechange", kt), window.detachEvent("onload", xt))
    }
    var Et = new W(document),
      Ct = new W(window),
      _t = {
        __proto__: null,
        BaseComponent: T,
        DomComponent: N,
        Device: _,
        Extend: q,
        Motion: mt,
        Language: J,
        Dom: {
          __proto__: null,
          Window: Ct,
          Document: Et,
          Element: W,
          Ready: wt,
          Find: function(t) {
            for (var e, n, i = null, s = !1, o = t.split(" "), r = 0; r < o.length; r++)
              if ((e = o[r]).indexOf("#") >= 0 && (i = document.getElementById(e.replace("#", ""))), e.indexOf(".") >= 0)
                if (null === i && (i = document), s) {
                  for (var a = [], l = 0; l < i.length; l++) {
                    n = i[l].getElementsByClassName(e.replace(".", ""));
                    for (var h = 0; h < n.length; h++) a.push(n[h])
                  }
                  i = a, a = []
                } else i = i.getElementsByClassName(e.replace(".", "")), s = !0;
            if (!0 === s) {
              if (1 === i.length) return i[0];
              for (var c = [], u = 0; u < i.length; u++) c.push(i[u]);
              return c
            }
            return i
          }
        }
      };
  
    function St() {
      q.self(this, W, "canvas");
      var t = this;
      this.element = this.dom, this.ctx = this.element.getContext("2d"), this.scale = 1, this.dpr = window.devicePixelRatio || 1, this.clearColor = "#fff", this.ctx.roundedRect = function(e, n, i, s, o) {
        var r = i > 0 ? o : -o,
          a = s > 0 ? o : -o;
        t.ctx.beginPath(), t.ctx.moveTo(e + r, n), t.ctx.lineTo(e + i - r, n), t.ctx.quadraticCurveTo(e + i, n, e + i, n + a), t.ctx.lineTo(e + i, n + s - a), t.ctx.quadraticCurveTo(e + i, n + s, e + i - r, n + s), t.ctx.lineTo(e + r, n + s), t.ctx.quadraticCurveTo(e, n + s, e, n + s - a), t.ctx.lineTo(e, n + a), t.ctx.quadraticCurveTo(e, n, e + r, n), t.ctx.closePath()
      }
    }
  
    function Ot(t, e, n) {
      return Math.min(Math.max(t, e), n)
    }
  
    function At(t, e, n, i, s, o) {
      var r = (t - e) * (s - i) / (n - e) + i;
      return !1 === o ? r : Ot(r, Math.min(i, s), Math.max(i, s))
    }
  
    function $t(t) {
      return t * (Math.PI / 180)
    }
  
    function Lt(t) {
      return 180 * t / Math.PI
    }
    q.proto(St, W), St.prototype.dimensions = function(t, e) {
      this.css({
        width: t,
        height: e
      }), this.element.width = Math.round(t / this.scale) * this.dpr, this.element.height = Math.round(e / this.scale) * this.dpr, this.ctx.scale(this.dpr, this.dpr), this.width = Math.round(t / this.scale), this.height = Math.round(e / this.scale)
    }, St.prototype.clear = function() {
      this.ctx && this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }, St.prototype.draw = function() {
      this.ctx && (this.ctx.fillStyle = this.clearColor, this.ctx.fillRect(0, 0, this.element.width, this.element.height))
    }, St.prototype._destroy = function() {
      this.__destroy(), this.element = null, this.ctx = null, this.width = null, this.height = null
    };
    var Tt = {
      __proto__: null,
      clamp: Ot,
      range: At,
      toRadians: $t,
      toDegrees: Lt
    };
  
    function Pt(t) {
      t = t || {}, this.x = t.x || 0, this.y = t.y || 0, this.rotate = this.rotate.bind(this), this.getDistance = this.getDistance.bind(this), this.radius = 0, this.tolerance = 0, this.fill = !1, this.stroke = !1, this.fillColor = "#fff", this.strokeColor = "#fff", this.strokeWidth = 1
    }
  
    function Mt(t, e, n) {
      q.self(this, Pt, t), this.handleIn = new Pt(e), this.handleOut = new Pt(n), this.prev = null, this.next = null, this.index = 0
    }
  
    function It(t) {
      this._closed = !1, this.stroke = !1, this.fill = !1, this.fillColor = "#fff", this.strokeColor = "#fff", this.strokeWidth = 1, this.showPoints = !1, this.pointRadius = 0, this._head = null, this._tail = null, this.segments = [], this.addPoint = this.addPoint.bind(this), this.removePoint = this.removePoint.bind(this), this.forEachPoint = this.forEachPoint.bind(this), this.getBounding = this.getBounding.bind(this), this.getCenter = this.getCenter.bind(this), this.destroy = this.destroy.bind(this), t && t.length && this.addPoints(t)
    }
  
    function jt(t, e) {
      if (e.y <= t.y) {
        if (e.next.y > t.y && Rt(e, e.next, t) > 0) return 1
      } else if (e.next.y <= t.y && Rt(e, e.next, t) < 0) return -1;
      return 0
    }
  
    function Rt(t, e, n) {
      return (e.x - t.x) * (n.y - t.y) - (n.x - t.x) * (e.y - t.y)
    }
    Pt.prototype.rotate = function(t, e) {
      var n = $t(e),
        i = Math.sin(n),
        s = Math.cos(n),
        o = this.x - t.x,
        r = this.y - t.y;
      this.x = o * s - r * i + t.x, this.y = o * i + r * s + t.y
    }, Pt.prototype.getDistance = function(t) {
      return Math.sqrt(Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2))
    }, Pt.prototype.getAngle = function(t) {
      var e = t.x - this.x,
        n = t.y - this.y,
        i = Lt(Math.atan2(n, e));
      return i < 0 && (i += 360), i
    }, Pt.prototype.hitTest = function(t) {
      return this.radius + this.tolerance >= this.getDistance(t)
    }, Pt.prototype.restrict = function(t, e, n, i) {
      if ("x" !== t && "y" !== t) throw new Error("Point.restrict requires a value: x or y");
      return e + this[t] < n ? e = this[t] - n : e + this[t] > i && (e = i - this[t]), this[t] + e
    }, Pt.prototype.draw = function(t) {
      t.ctx.beginPath(), t.ctx.arc(this.x, this.y, this.radius / t.scale, 0, 2 * Math.PI, !1), this.fill && (t.ctx.fillStyle = this.fillColor, t.ctx.fill()), this.stroke && (t.ctx.strokeStyle = this.strokeColor, t.ctx.lineWidth = this.strokeWidth / t.scale, t.ctx.stroke())
    }, q.proto(Mt, Pt), Mt.prototype.set = function(t, e, n) {
      this.x = t.x || this.x, this.y = t.y || this.y, e === undefined ? (this.handleIn.x = this.x, this.handleIn.y = this.y) : (this.handleIn.x = e.x, this.handleIn.y = e.y), n === undefined ? (this.handleOut.x = this.x, this.handleOut.y = this.y) : (this.handleOut.x = n.x, this.handleOut.y = n.y)
    }, Mt.prototype.clone = function() {
      var t = {
          x: this.x,
          y: this.y
        },
        e = {
          x: this.handleIn.x,
          y: this.handleIn.y
        },
        n = {
          x: this.handleOut.x,
          y: this.handleOut.y
        },
        i = new Mt;
      return e.x === n.x && e.y === n.y ? i.set(t) : i.set(t, e, n), i.index = this.index, i.prev = this.prev, i.next = this.next, i.radius = this.radius, i.tolerance = this.tolerance, i.fill = this.fill, i.stroke = this.stroke, i.fillColor = this.fillColor, i.strokeColor = this.strokeColor, i.strokeWidth = this.strokeWidth, i
    }, Mt.prototype.move = function(t, e) {
      this.x += t, this.y += e, this.handleIn.x += t, this.handleIn.y += e, this.handleOut.x += t, this.handleOut.y += e
    }, Mt.prototype.render = function(t) {
      this.handleIn.x !== this.x && this.handleIn.y !== this.y && this.handleIn.draw(t), this.handleOut.x !== this.x && this.handleOut.y !== this.y && this.handleOut.draw(t), this.draw(t)
    }, It.prototype.addPoint = function(t) {
      var e;
      return t instanceof Mt ? e = t.clone() : ((e = new Mt).set(t), e.radius = this.pointRadius), e.index = this.segments.length, null === this._head ? (this._head = e, this._tail = e) : (e.prev = this._tail, this._tail.next = e, this._tail = e), this._head.prev = this._tail, this._tail.next = this._head, this.segments.push(e), e
    }, It.prototype.addPoints = function(t) {
      for (var e = 0; e < t.length; e++) this.addPoint(t[e]);
      t = null
    }, It.prototype.setPoints = function(t, e) {
      e === undefined && (e = 0);
      for (var n = e; n < t.length; n++) this.segments[n] === undefined ? this.addPoint(t[n]) : this.segments[n].set(t[n]);
      t = null, e = null
    }, It.prototype.setPointRadius = function(t) {
      for (var e = -1; ++e < this.segments.length;)(void 0).radius = t
    }, It.prototype.removePoint = function(t) {
      for (var e = this.segments.length, n = null; --e > -1 && null === n;) n = this.segments[e], t.x === n.x && t.y === n.y && (this.segments.splice(e, 1), n === this._head && n === this._tail ? (this._head = null, this._tail = null) : n === this.head ? (this._head = this._head.next, this._head.prev = null) : n === this._tail ? (this._tail = this._tail.prev, this._tail.next = null) : (n.prev.next = n.next, n.next.prev = n.prev));
      return n
    }, It.prototype.forEachPoint = function(t, e) {
      if (0 !== this.segments.length && this.segments)
        for (var n, i = !1, s = this.segments.length; --s > -1 && !i;) n = this.segments[e ? this.segments.length - 1 - s : s], t && (i = t(n))
    }, It.prototype.close = function(t) {
      this._closed = t
    }, It.prototype.isClosed = function() {
      return this._closed
    }, It.prototype.start = function() {
      return this._head
    }, It.prototype.end = function() {
      return this._tail
    }, It.prototype.rotate = function(t, e) {
      e === undefined && (e = this.getCenter());
      for (var n, i = -1; ++i < this.segments.length;)(n = this.segments[i]).handleIn.rotate(e, t), n.rotate(e, t), n.handleOut.rotate(e, t)
    }, It.prototype.move = function(t, e) {
      for (var n = -1; ++n < this.segments.length;) this.segments[n].move(t, e)
    }, It.prototype.getPoint = function(t) {
      return this.segments[t]
    }, It.prototype.getLength = function() {
      return this.segments.length
    }, It.prototype.getCenter = function() {
      var t = this.getBounding();
      return {
        x: (t.right - t.left) / 2 + t.left,
        y: (t.bottom - t.top) / 2 + t.top
      }
    }, It.prototype.getDimensions = function() {
      var t = this.getBounding();
      return {
        width: t.right - t.left,
        height: t.bottom - t.top
      }
    }, It.prototype.getBounding = function() {
      for (var t, e = null, n = null, i = null, s = null, o = -1; ++o < this.segments.length;) t = this.segments[o], (null === e || t.x < e) && (e = t.x), (null === n || t.x > n) && (n = t.x), (null === i || t.y < i) && (i = t.y), (null === s || t.y > s) && (s = t.y);
      return {
        left: e,
        top: i,
        bottom: s,
        right: n
      }
    }, It.prototype.draw = function(t) {
      t.ctx.beginPath();
      for (var e = -1, n = this.segments.length; ++e < n;) {
        var i = this.segments[e],
          s = i.x !== i.handleIn.x || i.y !== i.handleIn.y || i.prev.x !== i.prev.handleOut.x || i.prev.y !== i.prev.handleOut.y;
        if (0 === i.index) t.ctx.moveTo(i.x, i.y);
        else if (s) {
          t.ctx.bezierCurveTo(i.prev.handleOut.x, i.prev.handleOut.y, i.handleIn.x, i.handleIn.y, i.x, i.y), (i.next.x !== i.next.handleIn.x || i.next.y !== i.next.handleIn.y) && this._closed && this._tail === i && t.ctx.bezierCurveTo(i.handleOut.x, i.handleOut.y, i.next.handleIn.x, i.next.handleIn.y, i.next.x, i.next.y)
        } else t.ctx.lineTo(i.x, i.y)
      }
      this._closed && t.ctx.closePath(), this.fill && (t.ctx.fillStyle = this.fillColor, t.ctx.fill()), this.stroke && (t.ctx.strokeStyle = this.strokeColor, t.ctx.lineWidth = this.strokeWidth / t.scale, t.ctx.stroke()), !0 === this.showPoints && this.forEachPoint(function(e) {
        e.fill = !0, e.render(t)
      })
    }, It.prototype.hitTest = function(t, e) {
      e === undefined && (e = {});
      var n, i = !1,
        s = 0,
        o = !1;
      e.segment = e.segment === undefined || e.segment, e.path = e.path === undefined || e.path;
      for (var r = -1; ++r < this.segments.length;) n = this.segments[r], e.path && this._closed && (s += jt(t, n)), e.segment && n.hitTest(t) && (o = n);
      return e.path && 0 !== s && !1 === o ? i = {
        type: "path",
        geometry: this
      } : o && (i = {
        type: "segment",
        geometry: o
      }), i
    }, It.prototype.destroy = function() {
      for (var t = this.segments.length; --t > -1;) this.segments.splice(t, 1);
      return this._head = null, this._tail = null, this.segments = [], null
    };
    var Bt = {
      __proto__: null,
      Path: It,
      Segment: Mt,
      Point: Pt
    };
  
    function Dt(t) {
      this.r = 255, this.g = 255, this.b = 255, this.a = 1, this.h = 1, this.s = 1, this.l = 1, t && t.indexOf("#") >= 0 && (this.hex2rgb.call(this, t), this.rgb2hsl.call(this, this.r, this.g, this.b))
    }
  
    function Ft(t, e, n) {
      return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
    }
    Dt.prototype.hex2rgb = function(t) {
      var e = (t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(t, e, n, i) {
          return e + e + n + n + i + i
        })).replace("#", ""),
        n = parseInt(e, 16);
      return this.r = n >> 16, this.g = n >> 8 & 255, this.b = 255 & n, this
    }, Dt.prototype.hsl2rgb = function(t, e, n) {
      if (0 === e) return this.r = this.g = this.b = Math.round(255 * n), this;
      var i = n <= .5 ? n * (1 + e) : n + e - n * e,
        s = 2 * n - i;
      return this.r = Math.round(255 * Ft(s, i, t + 1 / 3)), this.g = Math.round(255 * Ft(s, i, t)), this.b = Math.round(255 * Ft(s, i, t - 1 / 3)), this.h = t, this.s = e, this.l = n, this
    }, Dt.prototype.rgb2hsl = function(t, e, n) {
      t /= 255, e /= 255, n /= 255;
      var i = Math.max(t, e, n),
        s = Math.min(t, e, n),
        o = null,
        r = null,
        a = (i + s) / 2;
      if (i === s) o = r = 0;
      else {
        var l = i - s;
        switch (r = a > .5 ? l / (2 - i - s) : l / (i + s), i) {
          case t:
            o = (e - n) / l + (e < n ? 6 : 0);
            break;
          case e:
            o = (n - t) / l + 2;
            break;
          case n:
            o = (t - e) / l + 4
        }
        o /= 6
      }
      return this.h = o, this.s = r, this.l = a, this
    }, Dt.prototype.getHex = function() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
    }, Dt.prototype.getRGBA = function() {
      return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
    }, Dt.prototype.clone = function() {
      var t = new Dt;
      return t.r = this.r, t.g = this.g, t.b = this.b, t.h = this.h, t.s = this.s, t.l = this.l, t
    }, Dt.prototype.mix = function(t, e) {
      t instanceof Dt || (t = new Dt(t));
      var n = new Dt;
      return n.r = Math.round(this.r + e * (t.r - this.r)), n.g = Math.round(this.g + e * (t.g - this.g)), n.b = Math.round(this.b + e * (t.b - this.b)), n.rgb2hsl(n.r, n.g, n.b), n
    }, Dt.prototype.blend = function(t, e) {
      var n;
      t instanceof Dt || (t = new Dt(t));
      for (var i = [], s = 0; s < e; s++) n = this.mix.call(this, t, s / e), i.push(n);
      return i
    }, Dt.prototype.lightness = function(t) {
      return t > 1 && (t /= 100), this.hsl2rgb.call(this, this.h, this.s, t), this
    }, Dt.prototype.saturation = function(t) {
      return t > 1 && (t /= 100), this.hsl2rgb.call(this, this.h, t, this.l), this
    }, Dt.prototype.hue = function(t) {
      return this.hsl2rgb.call(this, t /= 360, this.s, this.l), this
    };
    var zt = {
        _setup: !1,
        _af: null,
        _fps: 60,
        _singleFrame: 1 / 60,
        _lagThreshold: 500,
        _adjustedLag: 1 / 60 * 2,
        _startTime: 0,
        _lastTime: 0,
        _nextTime: 1 / 60,
        _elapsed: 0,
        _difference: 0,
        _renders: [],
        _paused: !1,
        _running: !1,
        _tick: !1,
        frame: 0,
        time: 0,
        requestFrame: null,
        cancelFrame: null,
        _init: function() {
          for (var t, e = window.requestAnimationFrame, n = window.cancelAnimationFrame, i = ["ms", "moz", "webkit", "o"], s = i.length; --s > -1 && !e;) e = window[i[s] + "RequestAnimationFrame"], n = window[i[s] + "CancelAnimationFrame"] || window[i[s] + "CancelRequestAnimationFrame"];
          e ? (zt.requestFrame = e.bind(window), zt.cancelFrame = n.bind(window)) : (zt.requestFrame = (t = Date.now(), function(e) {
            window.setTimeout(function() {
              e(Date.now() - t)
            }, 1e3 * zt._singleFrame)
          }), zt.cancelFrame = function(t) {
            return clearTimeout(t), null
          }), zt._setup = !0, zt._startTime = zt._lastTime = Date.now()
        },
        add: function(t, e) {
          zt._renders.push({
            callback: t,
            paused: !1 == !e || !1
          }), !1 == !e && zt.start()
        },
        remove: function(t) {
          for (var e = zt._renders.length; --e > -1;) zt._renders[e].callback === t && (zt._renders[e].paused = !0, zt._renders.splice(e, 1))
        },
        start: function(t) {
          if (!1 === zt._setup && zt._init(), t)
            for (var e = zt._renders.length; --e > -1;) zt._renders[e].callback === t && (zt._renders[e].paused = !1);
          !0 !== zt._running && (zt._paused = !1, zt._running = !0, zt._af = zt.requestFrame(zt._update))
        },
        stop: function(t) {
          if (t)
            for (var e = zt._renders.length; --e > -1;) zt._renders[e].callback === t && (zt._renders[e].paused = !0);
          else !1 !== zt._running && (zt._af = zt.cancelFrame(zt._af), zt._paused = !0, zt._running = !1)
        },
        elapsed: function() {
          return Date.now() - zt._startTime
        },
        fps: function(t) {
          return arguments.length ? (zt._fps = t, zt._singleFrame = 1 / (zt._fps || 60), zt._adjustedLag = 2 * zt._singleFrame, zt._nextTime = zt.time + zt._singleFrame, zt._fps) : zt._fps
        },
        isRunning: function() {
          return zt._running
        },
        _update: function() {
          if (!zt._paused && (zt._elapsed = Date.now() - zt._lastTime, zt._tick = !1, zt._elapsed > zt._lagThreshold && (zt._startTime += zt._elapsed - zt._adjustedLag), zt._lastTime += zt._elapsed, zt.time = (zt._lastTime - zt._startTime) / 1e3, zt._difference = zt.time - zt._nextTime, zt._difference > 0 && (zt.frame++, zt._nextTime += zt._difference + (zt._difference >= zt._singleFrame ? zt._singleFrame / 4 : zt._singleFrame - zt._difference), zt._tick = !0), zt._af = zt.requestFrame(zt._update), !0 === zt._tick && zt._renders.length > 0))
            for (var t = zt._renders.length; --t > -1;) zt._renders[t] && !1 === zt._renders[t].paused && zt._renders[t].callback(zt.time)
        }
      },
      Ht = {
        array: function(t) {
          if (0 === t.length) return t;
          for (var e, n, i = t.length; --i > -1;) n = Math.floor(Math.random() * (i + 1)), e = t[i], t[i] = t[n], t[n] = e;
          return t
        }
      };
  
    function Wt(t, e) {
      var n = t.substr(t.lastIndexOf(".") + 1, t.length);
      if (e || (e = {}), e.fallback && "svg" === n && "ie" === _.Browser.type && _.Browser.version <= 11 && (t = t.substr(0, t.indexOf(n)) + e.fallback), e.prefix && (t = e.prefix + "/" + t), A.assethost && t.indexOf(S.assetDomain) >= 0) t = A.assethost + t.replace(S.assetDomain, "");
      else if (A.imghost && t.indexOf("imgs") >= 0) {
        var i = t.indexOf(".ai") >= 0 ? t.indexOf(".ai") + 3 : t.indexOf(".com") + 4;
        t = A.imghost + t.substr(i, t.length)
      }
      this.attribs = {
        crossOrigin: e.crossOrigin || null
      }, this.src = t, this.ext = n, this.width = 0, this.height = 0, this.aspect = 0, this.loaded = !1, this.error = !1, this.element = null, this.cb = {
        load: [],
        error: []
      }
    }
  
    function qt(t, e, n) {
      for (var i = t[e], s = i.length, o = null; --s > -1;) o = i[s], i.splice(s, 1), o(n);
      "error" === e ? t.load = [] : t.error = []
    }
  
    function Nt(t, e) {
      if (e || (e = {}), e.prefix && (t = e.prefix + "/" + t), A.assethost && t.indexOf(S.assetDomain) >= 0) t = A.assethost + t.replace(S.assetDomain, "");
      else if (A.imghost && t.indexOf("imgs") >= 0) {
        var n = t.indexOf(".ai") >= 0 ? t.indexOf(".ai") + 3 : t.indexOf(".com") + 4;
        t = A.imghost + t.substr(n, t.length)
      }
      this.attribs = {
        defer: e.defer || null,
        async: e.async || null,
        crossOrigin: e.crossOrigin || null
      }, this.src = t, this.loaded = !1, this.error = !1, this.element = null, this.cb = {
        load: [],
        error: []
      }
    }
  
    function Ut(t, e, n) {
      for (var i = t[e], s = i.length, o = null; --s > -1;) o = i[s], i.splice(s, 1), o(n);
      "error" === e ? t.load = [] : t.error = []
    }
    Wt.prototype.load = function() {
      var t = this,
        e = this.attribs,
        n = this.src;
      return new Promise(function(i, s) {
        var o = new Image;
        t.element = o, e.crossOrigin && (o.crossOrigin = e.crossOrigin), o.onerror = function(e) {
          t.error = !0, o.onload = o.onerror = null;
          var i = (e.message || "Loading Error") + ": " + n;
          qt(t.cb, "error", i), s(i)
        }, o.onload = function() {
          t.loaded || (t.width = o.width, t.height = o.height, t.aspect = o.width / o.height, t.loaded = !0, o.onload = o.onerror = null, qt(t.cb, "load", t), i(t))
        }, o.src = n, o.complete && o.onload()
      })
    }, Wt.prototype.onload = function(t) {
      this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, Wt.prototype.onerror = function(t) {
      this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    }, Nt.prototype.load = function() {
      var t = this,
        e = this.attribs,
        n = this.src;
      return new Promise(function(i, s) {
        var o = document.createElement("script");
        t.element = o, o.onerror = function(e) {
          t.error = !0, o.onload = o.onreadystatechange = o.onerror = null;
          var i = (e.message || "Loading Error") + ": " + n;
          Ut(t.cb, "error", i), s(i)
        }, o.onload = o.onreadystatechange = function() {
          this.loaded || o.readyState && "loaded" !== o.readyState && "complete" !== o.readyState || (t.loaded = !0, o.onload = o.onreadystatechange = o.onerror = null, document.body.removeChild(o), Ut(t.cb, "load", t), i(t))
        }, o.type = "text/javascript", o.src = n, e.crossOrigin && (o.crossorigin = e.crossOrigin), e.async && (o.async = !0), e.defer && (o.defer = !0), document.body.appendChild(o), o.complete && o.onload()
      })
    }, Nt.prototype.onload = function(t) {
      this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, Nt.prototype.onerror = function(t) {
      this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    };
    var Vt = [],
      Xt = {
        add: function(t, e) {
          var n = function(t) {
            if (t.toLowerCase().match(/\.(?:jpg|gif|png|jpeg|svg)$/g)) return "image";
            if (t.toLowerCase().match(/\.(?:js)$/g)) return "script"
          }(t);
          return "image" === n ? Xt.image(t, e) : "script" === n ? Xt.script(t, e) : void 0
        },
        batch: function(t, e) {
          for (var n = [], i = -1; ++i < t.length;) {
            var s = t[i];
            n.push(Xt.add(s, e))
          }
          return Promise.all(n)["finally"](function() {
            n = []
          })
        },
        image: function(t, e) {
          var n = new Wt(t, e);
          return Vt.push(n), n.load()
        },
        script: function(t, e) {
          var n = new Nt(t, e);
          return Vt.push(n), n.load()
        },
        retrieve: function(t) {
          return new Promise(function(e, n) {
            for (var i = Vt.length, s = !1, o = null; --i > -1 && !s;) s = (o = Vt[i]).src.indexOf(t) >= 0 && o;
            if (!s) return e(null);
            o.onload(e), o.onerror(n)
          })
        }
      };
    var Jt = {
        decode: function(t) {
          try {
            var e = t.split(".");
            return {
              header: JSON.parse(atob(e[0])),
              payload: JSON.parse(atob(e[1])),
              signature: atob(e[2].replace(/_/g, "/").replace(/-/g, "+")),
              raw: {
                header: e[0],
                payload: e[1],
                signature: e[2]
              }
            }
          } catch (xi) {
            throw new Error("Token is invalid.")
          }
        },
        checkExpiration: function(t) {
          if (new Date(1e3 * t) <= new Date(Date.now())) throw new Error("Token is expired.");
          return !0
        }
      },
      Kt = {
        __proto__: null,
        Canvas: St,
        Geometry: Bt,
        Render: zt,
        Math: Tt,
        Color: Dt,
        Shuffle: Ht,
        Loader: Xt,
        JWT: Jt
      },
      Yt = function() {
        window.Raven && Raven.config("https://0f73e9316e6b4aee9e62a74c820604e0@sentry.io/1198795", {
          autoBreadcrumbs: {
            xhr: !0,
            dom: !0,
            sentry: !0
          },
          tags: {
            "site-host": S.host,
            "site-key": S.sitekey,
            "endpoint-url": A.endpoint,
            "asset-url": S.assetUrl
          },
          sampleRate: .1
        }), window.Raven && Raven.setUserContext({
          "Browser-Agent": _.Browser.agent,
          "Browser-Type": _.Browser.type,
          "Browser-Version": _.Browser.version,
          "System-OS": _.System.os,
          "System-Version": _.System.version,
          "Is-Mobile": _.System.mobile
        }), j("challenge_internal", "setup", "info"), window.onerror = function(t, e, n, i, s) {
          j(t, "global", "debug", {
            name: s.name || "Error",
            url: e,
            line: n,
            column: i,
            stack: s.stack || ""
          }), I(t, "global", "error")
        }
      };
  
    function Gt(t) {
      if (null === t) return "";
      var e = [];
      return function n(t, e) {
        var i, s;
        if ("object" == typeof t)
          for (s in t) !0 === Qt(i = t[s]) ? n(i, e) : e[e.length] = Zt(s, i);
        else if (!0 === Array.isArray(t))
          for (var o = 0; o < t.length; o++) !0 === Qt(i = t[o]) ? n(t, e) : e[e.length] = Zt(s, i);
        else e[e.length] = Zt(t)
      }(t, e), e.join("&")
    }
  
    function Qt(t) {
      return !0 === Array.isArray(t) || "object" == typeof t
    }
  
    function Zt(t, e) {
      return encodeURIComponent(t) + "=" + encodeURIComponent(null === e ? "" : e)
    }
    var te = {
        400: "Rate limited or network error. Please retry.",
        429: "Your computer or network has sent too many requests.",
        500: "Cannot contact hCaptcha. Check your connection and try again."
      },
      ee = {
        getText: function(t) {
          try {
            return J.translate(te[t])
          } catch (xi) {
            return !1
          }
        }
      },
      ne = "undefined" != typeof XDomainRequest && "withCredentials" in XMLHttpRequest.prototype == !1;
  
    function ie(t, e, n) {
      n = n || {};
      var i = {
        url: e,
        method: t.toUpperCase(),
        responseType: n.responseType || "string",
        dataType: n.dataType || null,
        withCredentials: n.withCredentials || !1,
        headers: n.headers || null,
        data: n.data || null
      };
      return i.legacy = i.withCredentials && ne, i.data && ("json" === i.dataType && "object" == typeof i.data && (i.data = JSON.stringify(i.data)), "query" === i.dataType && (i.data = Gt(i.data))), n.retry ? R(function() {
        return se(i)
      }, n.retry) : se(i)
    }
  
    function se(t) {
      var e = t.legacy ? new XDomainRequest : new XMLHttpRequest;
      return new Promise(function(n, i) {
        var s, o = function(s) {
          return function(o) {
            var r = e.response || e.responseText,
              a = e.statusText || "",
              l = e.status,
              h = e.readyState;
            if (4 === h || t.legacy) {
              if ("error" === s || l >= 400 && l <= 511) return void i({
                event: "network-error",
                endpoint: t.url,
                state: h,
                status: l,
                message: ee.getText(l || 400) || a
              });
              "json" === t.responseType && r && (r = JSON.parse(r)), n({
                state: h,
                status: l,
                body: r,
                message: a
              })
            }
          }
        };
        if ((e.onload = o("complete"), e.onerror = e.ontimeout = o("error"), e.open(t.method, t.url), !t.legacy) && (e.withCredentials = t.withCredentials, t.headers))
          for (var r in t.headers) s = t.headers[r], e.setRequestHeader(r, s);
        setTimeout(function() {
          e.send(t.data)
        }, 0)
      })
    }
    var oe = function(t, e) {
        if ("object" == typeof t && e === undefined && (t = (e = t).url), null === t) throw new Error("Url missing");
        return ie("POST", t, e)
      },
      re = null,
      ae = null,
      le = null,
      he = null,
      ce = {},
      ue = null,
      de = null,
      pe = {
        logAction: function(t) {
          ue = t
        },
        getTaskData: function(t, e) {
          t === undefined && (t = {});
          var n = {
            sitekey: S.sitekey,
            host: S.host,
            hl: J.getLocale()
          };
          return null !== ue && (n.action = ue, ue = null), null !== he && (n.extraData = JSON.stringify(he), he = null), t && (n.motionData = JSON.stringify(t)), null !== re && (ae = re, n.old_ekey = re), null !== de && (n.rqdata = de), e && (n.n = e.solved || null, n.c = e.spec ? JSON.stringify(e.spec) : null), new Promise(function(t, e) {
            try {
              oe({
                url: A.endpoint + "/getcaptcha",
                data: n,
                dataType: "query",
                responseType: "json",
                withCredentials: !0,
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/x-www-form-urlencoded"
                }
              }).then(function(e) {
                var n = e.body || null;
                if (!n) throw new Error("Missing response body.");
                !1 !== n.success ? (pe.setData(n), t(n)) : t(n)
              })["catch"](e)
            } catch (xi) {
              e(xi)
            }
          })
        },
        loadBundle: function(t) {
          return new Promise(function(e, n) {
            ce[t.request_type] ? e(ce[t.request_type]) : Xt.script(t.challenge_uri).then(function() {
              ce[t.request_type] = window[t.request_type], e(ce[t.request_type])
            })["catch"](function(t) {
              n({
                event: "bundle-error",
                message: "Failed to get challenge bundle.",
                reason: t
              })
            })
          })
        },
        checkAnswers: function(t, e, n) {
          var i = {
            job_mode: he.request_type,
            answers: t,
            serverdomain: S.host,
            sitekey: S.sitekey,
            motionData: JSON.stringify(e)
          };
          return n && (i.n = n.solved, i.c = JSON.stringify(n.spec)), new Promise(function(t, e) {
            try {
              oe({
                url: A.endpoint + "/checkcaptcha/" + he.key,
                data: i,
                dataType: "json",
                responseType: "json",
                withCredentials: !0,
                headers: {
                  "Content-type": "application/json;charset=UTF-8"
                }
              }).then(function(e) {
                var n = e.body || null;
                if (!n) throw new Error("Missing response body.");
                if (!1 === n.success) {
                  var i = (n["error-codes"] || [""]).join(", ");
                  throw new Error(i)
                }
                t(n)
              })["catch"](e)
            } catch (xi) {
              e(xi)
            }
          })
        },
        reportIssue: function(t, e, n) {
          var i = {
            taskdata: he,
            on_url: S.url,
            report_category: t,
            sid: le
          };
          if (e && (i.user_comments = e), ae && (i.last_ekey = ae), n && "fallback" !== he.request_type) {
            for (var s = he.tasklist, o = null, r = -1; ++r < s.length && !o;) s[r].task_key === n && (o = s[r]);
            i.taskdata.tasklist = [o]
          }
          return oe({
            url: A.reportapi + "/bug-report",
            data: i,
            dataType: "json",
            responseType: "json",
            withCredentials: !0,
            headers: {
              "Content-type": "application/json;charset=UTF-8"
            }
          })
        },
        getEKey: function() {
          return re
        },
        setData: function(t) {
          he = t, re = t.key, le || (le = re)
        },
        setRqData: function(t) {
          de = t
        },
        getRqData: function() {
          return de
        },
        getData: function() {
          return he
        }
      };
  
    function fe() {
      q.self(this, N, "refresh"), this.state = {
        visible: !0,
        locked: !1,
        mobile: !1
      }, this.image = {
        on: null,
        off: null
      }, this.addClass("button"), this.$on = this.createElement(".image-on"), this.$off = this.createElement(".image-off"), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.setLabel.call(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === _.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover)), this.$on.css({
        opacity: 0
      })
    }
  
    function me(t) {
      q.self(this, N, "button-submit"), this.state = {
        text: "Submit",
        type: "submit",
        label: "Submit Answers",
        locked: !1
      }, this.copy = this.createElement(".text"), this.addClass("button"), this.setAttribute("tabindex", 0), this.setCopy.call(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === _.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover))
    }
  
    function ye() {
      q.self(this, N, "help"), this.image = {
        on: null,
        off: null
      }, this.locked = !1, this.mobile = !1, this.selected = !1, this.addClass("button"), this.$on = this.createElement(".image-on"), this.$off = this.createElement(".image-off"), this.setAttribute("tabindex", 0), this.setAttribute("aria-expanded", !1), this.setAttribute("aria-haspopup", "listbox"), this.setAttribute("aria-owns", "menu"), this.setAttribute("role", "button"), this.setLabel.call(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === _.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover)), this.$on.css({
        opacity: 0
      })
    }
  
    function ge(t, e) {
      var n = t instanceof HTMLIFrameElement;
      try {
        n ? t.parentNode && t.contentWindow.postMessage(JSON.stringify(e), "*") : t.postMessage(JSON.stringify(e), "*")
      } catch (ki) {
        I(ki.message, "messaging", "error")
      }
    }
  
    function ve(t, e) {
      this.target = t, this.id = e, this.messages = [], this.incoming = [], this.waiting = []
    }
  
    function be(t, e) {
      var n = this,
        i = {},
        s = new Promise(function(t, e) {
          i.resolve = t, i.reject = e
        }),
        o = {
          source: "hcaptcha",
          label: t,
          id: n.id,
          promise: null,
          lookup: e
        };
      return s.then(function(t) {
        o.promise = "resolve", null !== t && (o.contents = t), ge(n.target, o)
      })["catch"](function(t) {
        o.promise = "reject", null !== t && (o.error = t), ge(n.target, o)
      }), i
    }
    q.proto(fe, N), fe.prototype.load = function() {
      var t = this;
      Xt.batch(["refresh-off.svg", "refresh-on.svg"], {
        prefix: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static/images",
        fallback: "png"
      }).then(function(e) {
        t.image.off = e[0], t.image.on = e[1], t.style.call(t, t.state.mobile)
      })["catch"](function() {
        j("refresh icon failed to load", "image", "info")
      })
    }, fe.prototype.style = function(t) {
      this.css({
        width: 25,
        height: 25,
        cursor: this.state.locked ? "default" : "pointer",
        display: this.state.visible ? "inline-block" : "none",
        border: "none",
        backgroundColor: "#fff"
      }), null !== this.image.on && (this.$on.backgroundImage(this.image.on, 25, 25, {
        cover: !0
      }), this.$off.backgroundImage(this.image.off, 25, 25, {
        cover: !0
      })), this.$on.css({
        "-ms-high-contrast-adjust": "none",
        position: "absolute",
        top: 0,
        left: 0
      }), this.$off.css({
        "-ms-high-contrast-adjust": "none",
        position: "absolute",
        top: 0,
        left: 0
      }), this.state.mobile = t, this.height = 25, this.width = 25
    }, fe.prototype.onHover = function(t) {
      null !== this.emit && !0 !== this.state.locked && (this.emit("hover", t), "ie" === _.Browser.type && 8 === _.Browser.version ? (this.$on.css({
        display: "over" === t.action ? "block" : "none"
      }), this.$off.css({
        display: "over" === t.action ? "none" : "block"
      })) : (this.$on.css({
        opacity: "over" === t.action ? 1 : 0
      }), this.$off.css({
        opacity: "over" === t.action ? 0 : 1
      })))
    }, fe.prototype.onSelect = function(t) {
      null !== this.emit && !0 !== this.state.locked && (this.selected = !this.selected, this.emit("click", t))
    }, fe.prototype.setLock = function(t) {
      this.state.locked = t, this.css({
        cursor: t ? "default" : "pointer"
      })
    }, fe.prototype.setLabel = function() {
      var t = J.translate("Refresh Challenge");
      this.setAttribute("title", t)
    }, fe.prototype.enable = function(t) {
      this.state.visible = t, this.css({
        display: t ? "inline-block" : "none"
      }), this.setLock.call(this, !t)
    }, q.proto(me, N), me.prototype.style = function(t) {
      var e = t ? 30 : 35;
      this.css({
        height: e,
        cursor: "pointer",
        minWidth: t ? 50 : 70,
        padding: "0px 5px",
        borderRadius: 4,
        border: "none"
      }), this.copy.css({
        color: O.white,
        width: "100%",
        height: "100%",
        textAlign: "center",
        position: "relative",
        pointerEvents: "none",
        lineHeight: e,
        fontSize: 14,
        fontWeight: 700,
        zIndex: 5
      }), this.height = e
    }, me.prototype.action = function(t) {
      var e = "Submit Answers",
        n = t.charAt(0).toUpperCase() + t.slice(1);
      "check" === t || "next" === t ? (this.css({
        backgroundColor: O.hoverOff
      }), "next" === t && (e = "Next Challenge")) : "report" === t ? (this.css({
        backgroundColor: O.hoverOff
      }), e = "Report Images") : (this.css({
        backgroundColor: O.skipHoverOff
      }), e = "Skip Challenge", t = "skip"), this.state.type = t, this.state.text = n, this.state.label = e, this.setCopy.call(this)
    }, me.prototype.onHover = function(t) {
      if (null !== this.emit && !0 !== this.state.locked) {
        var e = "check" === this.state.type || "next" === this.state.type;
        "over" === t.action ? this.css({
          backgroundColor: e ? O.hoverOn : "#5C5C5C"
        }) : this.css({
          backgroundColor: e ? O.hoverOff : "#7d7c7c"
        })
      }
    }, me.prototype.onSelect = function(t) {
      null !== this.emit && !0 !== this.state.locked && this.emit("click", t)
    }, me.prototype.setLock = function(t) {
      this.state.locked = t, this.css({
        cursor: t ? "default" : "pointer",
        backgroundColor: t ? "#e6e6e6" : O.hoverOff
      })
    }, me.prototype.setCopy = function() {
      var t = J.translate(this.state.text),
        e = J.translate(this.state.label);
      this.copy.text(t), this.setAttribute("title", e)
    }, me.prototype.getElement = function() {
      return this && this.dom || null
    }, q.proto(ye, N), ye.prototype.load = function() {
      var t = this;
      Xt.batch(["info-off.svg", "info-on.svg"], {
        prefix: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static/images",
        fallback: "png"
      }).then(function(e) {
        t.image.off = e[0], t.image.on = e[1], t.style.call(t, t.mobile)
      })["catch"](function() {
        j("info icon failed to load", "image", "info")
      })
    }, ye.prototype.style = function(t) {
      this.css({
        width: 25,
        height: 25,
        cursor: "pointer",
        display: "inline-block",
        border: "none",
        backgroundColor: "#fff"
      }), null !== this.image.on && (this.$on.backgroundImage(this.image.on, 25, 25, {
        cover: !0
      }), this.$off.backgroundImage(this.image.off, 25, 25, {
        cover: !0
      })), this.$on.css({
        "-ms-high-contrast-adjust": "none",
        position: "absolute",
        top: 0,
        left: 0
      }), this.$off.css({
        "-ms-high-contrast-adjust": "none",
        position: "absolute",
        top: 0,
        left: 0
      }), this.mobile = t, this.height = 25, this.width = 25
    }, ye.prototype.onHover = function(t) {
      null === this.emit || !0 === this.locked || this.selected || (this.emit("hover", t), "ie" === _.Browser.type && 8 === _.Browser.version ? (this.$on.css({
        display: "over" === t.action ? "block" : "none"
      }), this.$off.css({
        display: "over" === t.action ? "none" : "block"
      })) : (this.$on.css({
        opacity: "over" === t.action ? 1 : 0
      }), this.$off.css({
        opacity: "over" === t.action ? 0 : 1
      })))
    }, ye.prototype.onSelect = function(t) {
      null !== this.emit && !0 !== this.locked && (this.selected = !this.selected, this.setAttribute("aria-expanded", this.selected), this.setAttribute("tabindex", "-1"), this.emit("click", this.selected), "ie" === _.Browser.type && 8 === _.Browser.version ? (this.$on.css({
        display: this.selected ? "block" : "none"
      }), this.$off.css({
        display: this.selected ? "none" : "block"
      })) : (this.$on.css({
        opacity: this.selected ? 1 : 0
      }), this.$off.css({
        opacity: this.selected ? 0 : 1
      })))
    }, ye.prototype.reset = function(t) {
      this.selected = !1, this.setAttribute("aria-expanded", !1), this.setAttribute("tabindex", "0"), "ie" === _.Browser.type && 8 === _.Browser.version ? (this.$on.css({
        display: "none"
      }), this.$off.css({
        display: "block"
      })) : (this.$on.css({
        opacity: 0
      }), this.$off.css({
        opacity: 1
      }))
    }, ye.prototype.setLabel = function(t) {
      var e = J.translate("Get information about hCaptcha and accessibility options.");
      this.setAttribute("title", e)
    }, ye.prototype.setLock = function(t) {
      this.locked = t
    }, ve.prototype.setID = function(t) {
      this.id = t
    }, ve.prototype.contact = function(t, e) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      var n = this,
        i = Date.now().toString(36),
        s = {
          source: "hcaptcha",
          label: t,
          id: this.id,
          promise: "create",
          lookup: i
        };
      if (e) {
        if ("object" != typeof e) throw new Error("Message must be an object.");
        s.contents = e
      }
      return new Promise(function(e, o) {
        n.waiting.push({
          label: t,
          reject: o,
          resolve: e,
          lookup: i
        }), ge(n.target, s)
      })
    }, ve.prototype.listen = function(t, e) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      for (var n = this.messages.length, i = !1; --n > -1 && !1 === i;) this.messages[n].label === t && (i = this.messages[n]);
      !1 === i && (i = {
        label: t,
        listeners: []
      }, this.messages.push(i)), i.listeners.push(e)
    }, ve.prototype.answer = function(t, e) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      for (var n = this.incoming.length, i = !1; --n > -1 && !1 === i;) this.incoming[n].label === t && (i = this.incoming[n]);
      !1 === i && (i = {
        label: t,
        listeners: []
      }, this.incoming.push(i)), i.listeners.push(e)
    }, ve.prototype.send = function(t, e) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      var n = {
        source: "hcaptcha",
        label: t,
        id: this.id
      };
      if (e) {
        if ("object" != typeof e) throw new Error("Message must be an object.");
        n.contents = e
      }
      ge(this.target, n)
    }, ve.prototype.check = function(t, e) {
      for (var n = [].concat.apply([], [this.messages, this.incoming, this.waiting]), i = [], s = -1; ++s < n.length;)
        if (n[s].label === t) {
          if (e && n[s].lookup && e !== n[s].lookup) continue;
          i.push(n[s])
        } return i
    }, ve.prototype.respond = function(t) {
      for (var e, n, i = -1, s = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++i < o.length;)
        if (o[i].label === t.label) {
          if (t.lookup && o[i].lookup && t.lookup !== o[i].lookup) continue;
          var r = [];
          if (e = o[i], t.error && r.push(t.error), t.contents && r.push(t.contents), t.promise && "create" !== t.promise) {
            e[t.promise].apply(e[t.promise], r);
            for (var a = this.waiting.length, l = !1; --a > -1 && !1 === l;) this.waiting[a].label === e.label && this.waiting[a].lookup === e.lookup && (l = !0, this.waiting.splice(a, 1));
            continue
          }
          for (s = 0; s < e.listeners.length; s++) {
            if (n = e.listeners[s], "create" === t.promise) {
              var h = be.call(this, e.label, t.lookup);
              r.push(h)
            }
            n.apply(n, r)
          }
        } o = null
    }, ve.prototype.destroy = function() {
      return this.messages = null, this.incoming = null, this.waiting = null, null
    };
    var we = {
      chats: [],
      isSupported: function() {
        return !!window.postMessage
      },
      createChat: function(t, e) {
        var n = new ve(t, e);
        return we.chats.push(n), n
      },
      addChat: function(t) {
        we.chats.push(t)
      },
      removeChat: function(t) {
        for (var e = !1, n = we.chats.length; --n > -1 && !1 === e;) t.id === we.chats[n].id && t.target === we.chats[n].target && (e = we.chats[n], we.chats.splice(n, 1));
        return e
      },
      handle: function(t) {
        var e = t.data;
        if ("string" == typeof e) try {
          if (!(e.indexOf("hcaptcha") >= 0)) return;
          e = JSON.parse(e);
          for (var n, i = we.chats, s = -1; ++s < i.length;)(n = i[s]).id === e.id && n.respond(e)
        } catch (ki) {
          j("postMessage handler error", "postMessage", "debug", {
            event: t,
            error: ki
          })
        }
      }
    };
    window.addEventListener ? window.addEventListener("message", we.handle) : window.attachEvent("onmessage", we.handle);
    var ke = new ve(window.parent);
  
    function xe(t) {
      q.self(this, N, "list", "select");
      var e, n = this;
      for (var i in this.state = {
          selected: null
        }, t)(e = this.createElement("option")).text(t[i]), e.value = i;
      this.addEventListener("change", function(e) {
        var i, s = e.target.value;
        for (var o in t) s === t[o] && (i = o);
        n.emit("select", i)
      }), this.addEventListener("focus", function() {
        n.emit("focus", !0)
      }), this.addEventListener("blur", function() {
        n.emit("focus", !1)
      })
    }
    ke.init = function(t) {
      ke.setID(t), we.addChat(ke)
    }, q.proto(xe, N), xe.prototype.style = function() {
      this.css({
        cursor: "pointer",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        opacity: 0
      });
      for (var t = this._nodes, e = t.length, n = 0; n < e; n++) t[n].css({
        width: 150
      })
    }, xe.prototype.setLocale = function(t) {
      for (var e, n = this._nodes, i = n.length, s = 0; s < i; s++) t === n[s].value && (e = n[s].dom.textContent);
      this.dom.value = e
    }, xe.prototype.setLabel = function(t) {
      this.setAttribute("aria-roledescription", t)
    };
    var Ee = 37,
      Ce = 39,
      _e = 38,
      Se = 40,
      Oe = ("onwheel" in document || document, document, "ontouchstart" in document),
      Ae = navigator.maxTouchPoints && navigator.maxTouchPoints > 1,
      $e = !!window.navigator.msPointerEnabled,
      Le = "onkeydown" in document;
  
    function Te(t) {
      q.self(this, T), t || (t = {}), this.state = {
        pause: !1,
        action: null,
        position: {
          x: 0,
          y: 0
        },
        delta: {
          x: 0,
          y: 0
        }
      }, this.config = {
        element: t.element || null,
        keyStep: t.keyStep || 120,
        firefoxMult: t.firefoxMult || 15,
        touchMult: t.touchMult || 2,
        mouseMult: t.mouseMult || 1
      }, this.element = null, this.msBodyTouch = null, this.clamp = {
        enabled: !1,
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: 0,
          y: 0
        }
      }, this.onWheel = this.onWheel.bind(this), this.onKey = this.onKey.bind(this), this.onTouch = this.onTouch.bind(this)
    }
  
    function Pe(t) {
      q.self(this, N, "option"), this.state = {
        selected: !1,
        id: "option-" + t.index,
        value: t.value,
        key: t.key,
        index: t.index
      }, this.setAttribute("role", "option"), this.dom.id = this.state.id, this.$text = this.createElement(".text"), this.$text.text(t.value), this.onSelect = this.onSelect.bind(this), this.onHover = this.onHover.bind(this), this.addEventListener("up", this.onSelect), this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover), this.addEventListener("enter", this.onSelect)
    }
  
    function Me(t) {
      q.self(this, N, "language-list");
      var e = this;
      this.state = {
        listHeight: 0,
        viewHeight: 0,
        selected: null,
        current: null
      }, this.dom.id = "options-list", this.addClass("no-outline"), this.setAttribute("role", "listbox"), this.setAttribute("aria-labelledby", "language-selector");
      var n, i = function(t) {
          e.emit("select", t)
        },
        s = function(t) {
          e.state.current = e.children[t], e.emit("hover", t), e.highlight.call(e, t)
        },
        o = 0;
      for (var r in t)(n = this.initComponent(Pe, {
        key: r,
        value: t[r],
        index: o++
      })).on("select", i), n.on("hover", s)
    }
  
    function Ie() {
      q.self(this, N)
    }
  
    function je(t) {
      q.self(this, N, "language-view");
      var e = this;
      this.state = {
        itemHeight: 35,
        listHeight: 0,
        viewHeight: 0,
        hover: 0
      }, this.dom.id = "options-view", this.handle = this.initComponent(Ie), this.options = this.initComponent(Me, t), this.update = this.update.bind(this), this.options.on("select", function(t) {
        e.emit("select", t)
      }), this.options.on("hover", function(t) {
        e.state.hover = t
      })
    }
  
    function Re(t) {
      q.self(this, N, "list");
      var e = this;
      this.state = {
        visible: !1,
        selected: null,
        search: ""
      }, this.timer = null, this.addClass("button"), this.dom.id = "language-selector", this.setAttribute("tabindex", 0), this.setAttribute("aria-haspopup", "listbox"), this.setAttribute("aria-owns", "options-list"), this.setAttribute("aria-expanded", !1), this.setAttribute("role", "button"), this.$close = this.createElement(".close"), this.view = this.initComponent(je, t), this.scroll = this.initComponent(Te, {
        mouseMult: .5,
        keyStep: 35
      }), this.close = this.close.bind(this), this.onKeyPress = this.onKeyPress.bind(this), this.onOpen = this.onOpen.bind(this), this.onClose = this.onClose.bind(this), this.addEventListener("click", this.onOpen), this.addEventListener("keydown", this.onKeyPress), this.addEventListener("focus", function() {
        e.emit("focus", !0)
      }), this.addEventListener("blur", function() {
        e.emit("focus", !1)
      }), this.view.on("select", function(t) {
        e.close(), e.emit("select", t)
      }), this.scroll.on("update", this.view.update), this.style(), this.close()
    }
  
    function Be() {
      q.self(this, N, "display-language"), this.$text = this.createElement(".text"), this.$underline = this.createElement(".underline")
    }
  
    function De() {
      q.self(this, N, "language-selector");
      var t = this;
      this.state = {
        locked: !1
      };
      var e = J.getLocale(),
        n = _.System.mobile;
      this.list = this.initComponent(n ? xe : Re, U), this.display = this.initComponent(Be), this.display.setLocale(e), this.list.setLocale(e), this.setLabel.call(this), this.list.on("select", function(e) {
        J.setLocale(e), t.display.setLocale(e), t.list.setLocale(e), ke.send("challenge-language", {
          locale: e
        })
      }), this.display.addEventListener("click", function() {
        t.state.locked || t.list.onOpen && t.list.onOpen()
      }), this.list.on("open", function() {
        t.emit("open")
      });
      var i = function(e) {
        t.list.isVisible && t.list.isVisible() && t.list.close && t.list.close(), t.display.focus(e), t.emit("focus", e)
      };
      this.list.on("focus", i), this.list.on("blur", i)
    }
  
    function Fe(t) {
      q.self(this, N, "hcaptcha-logo"), this.mobile = !1, this.charity = t, this.image = null, this.color = this.createElement(".icon-color")
    }
  
    function ze(t) {
      q.self(this, N, "hcaptcha-logo"), this.mobile = !1, this.link = "https://www.hcaptcha.com/what-is-hcaptcha-about", this.config = t || {}, this.config.charity = this.config.charity !== undefined && this.config.charity, this.icon = this.initComponent(Fe, this.config.charity), this.onClick = this.onClick.bind(this), this.addEventListener("click", this.onClick)
    }
  
    function He() {
      q.self(this, N, "display-error"), this.visible = !1, this.setAttribute("aria-hidden", !0), this.setAttribute("role", "alert"), this.copy = this.createElement(".error-text"), this.appendElement(this.copy), this.setCopy.call(this), this.css({
        opacity: 0
      })
    }
  
    function We() {
      q.self(this, N, "Crumb"), this.$bg = this.createElement(".crumb-bg")
    }
  
    function qe() {
      q.self(this, N, "challenge-breadcrumbs"), this.width = 0, this.height = 0, this.crumbs = [], this.$wrapper = this.createElement(".crumbs-wrapper")
    }
    q.proto(Te, T), Te.prototype.init = function() {
      var t = this.config.element || document.body;
      t instanceof W || (t = new W(t)), this.element = t, this.addListeners.call(this)
    }, Te.prototype.pause = function(t) {
      this.state.pause = t
    }, Te.prototype.update = function(t) {
      if (!this.state.pause) {
        var e = this.state.position,
          n = this.state.delta,
          i = this.state.action;
        e.x += n.x, e.y += n.y, this.clamp.enabled && (e.x = Ot(e.x, this.clamp.min.x, this.clamp.max.x), e.y = Ot(e.y, this.clamp.min.y, this.clamp.max.y)), this.emit("update", {
          x: e.x,
          y: e.y,
          delta: n,
          action: i,
          original: t
        })
      }
    }, Te.prototype.addListeners = function() {
      var t = this.element,
        e = {
          passive: !1
        };
      ("ie" !== _.Browser.type || "ie" === _.Browser.type && 8 !== _.Browser.version) && (t.addEventListener("DOMMouseScroll", this.onWheel), t.addEventListener("wheel", this.onWheel, e)), t.addEventListener("mousewheel", this.onWheel, e), Oe && (t.addEventListener("touchstart", this.onTouch), t.addEventListener("touchmove", this.onTouch)), $e && Ae && (this.msBodyTouch = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", t.addEventListener("MSPointerDown", this.onTouch, !0), t.addEventListener("MSPointerMove", this.onTouch, !0)), Le && t.addEventListener("keydown", this.onKey)
    }, Te.prototype.removeListeners = function() {
      var t = this.element,
        e = {
          passive: !1
        };
      ("ie" === !_.Browser.type || "ie" === _.Browser.type && 8 !== _.Browser.version) && (t.removeEventListener("DOMMouseScroll", this.onWheel), t.removeEventListener("wheel", this.onWheel, e)), t.removeEventListener("mousewheel", this.onWheel, e), Oe && (t.removeEventListener("touchstart", this.onTouch), t.removeEventListener("touchmove", this.onTouch)), $e && Ae && (document.body.style.msTouchAction = this.msBodyTouch, t.removeEventListener("MSPointerDown", this.onTouch, !0), t.removeEventListener("MSPointerMove", this.onTouch, !0)), Le && t.removeEventListener("keydown", this.onKey)
    }, Te.prototype.onWheel = function(t) {
      if (!this.state.pause) {
        (t = window.event || t).preventDefault && t.preventDefault();
        var e = this.state.delta,
          n = this.config.mouseMult,
          i = this.config.firefoxMult;
        "detail" in t && "wheel" !== t.type && 0 !== t.detail ? (e.y = -1 * t.detail, e.y *= i) : "wheelDelta" in t && !("wheelDeltaY" in t) ? e.y = -1 * t.wheelDelta : (e.x = -1 * (t.deltaX || t.wheelDeltaX), e.y = -1 * (t.deltaY || t.wheelDeltaY), "firefox" === _.Browser.type && 1 === t.deltaMode && i && (e.x *= i, e.y *= i)), n && (e.x *= n, e.y *= n), this.state.action = "wheel", this.update.call(this, t)
      }
    }, Te.prototype.onTouch = function(t) {
      if (!this.state.pause) {
        var e = this.state.position,
          n = this.state.delta,
          i = this.config.touchMult,
          s = t.targetTouches[0];
        "move" === t.action ? (n.x = (s.pageX - e.x) * i, n.y = (s.pageY - e.y) * i) : (n.x = 0, n.y = 0), this.state.action = "touch", this.update.call(this, t)
      }
    }, Te.prototype.onKey = function(t) {
      if (!this.state.pause && !t.metaKey) {
        var e = this.state.delta,
          n = this.config.keyStep;
        switch (t.keyCode) {
          case Se:
            t.preventDefault && t.preventDefault(), e.x = 0, e.y = -n;
            break;
          case _e:
            t.preventDefault && t.preventDefault(), e.x = 0, e.y = n;
            break;
          case Ee:
            e.x = -n, e.y = 0;
            break;
          case Ce:
            e.x = n, e.y = 0;
            break;
          default:
            return e.x = 0, void(e.y = 0)
        }
        this.state.action = "keypress", this.update.call(this, t)
      }
    }, Te.prototype.clampX = function(t, e, n) {
      this.clamp.enabled = t, this.clamp.min.x = e || 0, this.clamp.max.x = n || 0
    }, Te.prototype.clampY = function(t, e, n) {
      this.clamp.enabled = t, this.clamp.min.y = e || 0, this.clamp.max.y = n || 0
    }, Te.prototype.reset = function() {
      this.state.position = {
        x: 0,
        y: 0
      }, this.state.delta = {
        x: 0,
        y: 0
      }
    }, Te.prototype.setPosX = function(t) {
      this.setPos.call(this, t, this.state.position.y)
    }, Te.prototype.setPosY = function(t) {
      this.setPos.call(this, this.state.position.x, t)
    }, Te.prototype.setPos = function(t, e) {
      this.clamp.enabled && (t = Ot(t, this.clamp.min.x, this.clamp.max.x), e = Ot(e, this.clamp.min.y, this.clamp.max.y)), this.state.position = {
        x: t,
        y: e
      }, this.state.delta = {
        x: 0,
        y: 0
      }, this.emit("update", {
        x: t,
        y: e,
        delta: this.state.delta,
        action: null
      })
    }, q.proto(Pe, N), Pe.prototype.getKey = function() {
      return this.state.key
    }, Pe.prototype.getValue = function() {
      return this.state.value
    }, Pe.prototype.getIndex = function() {
      return this.state.index
    }, Pe.prototype.getId = function() {
      return this.state.id
    }, Pe.prototype.style = function(t, e) {
      this.css({
        width: t,
        height: e
      }), this.$text.css({
        width: t,
        height: e,
        textAlign: "center",
        fontSize: 14,
        fontWeight: 500,
        color: "#555555",
        verticalAlign: "middle",
        display: "table-cell"
      })
    }, Pe.prototype.onHover = function(t) {
      this.emit("hover", this.state.index)
    }, Pe.prototype.onSelect = function() {
      this.emit("select", this.state.key)
    }, Pe.prototype.select = function(t) {
      this.state.selected = t, this.setAttribute("aria-selected", t), this.css({
        backgroundColor: t ? "#e0e0e0" : "#fff"
      })
    }, Pe.prototype.highlight = function(t) {
      this.setAttribute("aria-selected", t), this.css({
        backgroundColor: t ? "#f1f1f1" : "#fff"
      })
    }, Pe.prototype.isSelected = function() {
      return this.state.selected
    }, q.proto(Me, N), Me.prototype.style = function(t) {
      var e = this.children;
      this.listHeight = 35 * e.length, this.css({
        willChange: "transform",
        width: t,
        height: this.listHeight,
        position: "absolute",
        top: 0,
        left: 0
      });
      for (var n = 0; n < e.length; n++) e[n].style(t, 35), e[n].css({
        top: 35 * n,
        position: "absolute"
      })
    }, Me.prototype.update = function(t) {
      "ie" === _.Browser.type && 8 === _.Browser.version ? this.css({
        top: t
      }) : this.css({
        transform: "translateY(" + t + "px)"
      })
    }, Me.prototype.display = function(t) {
      this.setAttribute("aria-expanded", t), t ? this.focus() : this.blur()
    }, Me.prototype.setOption = function(t) {
      if (t) {
        for (var e = this.children, n = -1, i = e.length; ++n < i;) e[n] === t ? e[n].select(!0) : e[n].select(!1);
        this.setAttribute("aria-activedescendant", t.getId()), this.state.selected = this.state.current = t
      }
    }, Me.prototype.findByKey = function(t) {
      try {
        for (var e = this.children, n = null, i = -1, s = e.length; ++i < s && !n;) e[i].getKey() === t && (n = e[i]);
        return n
      } catch (xi) {
        return null
      }
    }, Me.prototype.findByValue = function(t) {
      try {
        t = t.toLowerCase();
        for (var e = this.children, n = null, i = -1, s = e.length; ++i < s;) 0 === e[i].getValue().toLowerCase().indexOf(t) && (n = e[i]);
        return n
      } catch (xi) {
        return null
      }
    }, Me.prototype.highlight = function(t) {
      var e = this.children[t];
      if (e) {
        for (var n = this.children, i = -1, s = n.length; ++i < s;) n[i].isSelected() || (n[i].getIndex() === t ? n[i].highlight(!0) : n[i].highlight(!1));
        this.state.current = e
      }
    }, Me.prototype.getCurrent = function() {
      return this.state.current
    }, q.proto(Ie, N), Ie.prototype.style = function(t) {
      this.css({
        willChange: "transform",
        width: 3,
        height: t,
        borderRadius: 2,
        backgroundColor: "#7d7c7c"
      })
    }, Ie.prototype.update = function(t) {
      "ie" === _.Browser.type && 8 === _.Browser.version ? this.css({
        top: t
      }) : this.css({
        transform: "translateY(" + t + "px)"
      })
    }, q.proto(je, N), je.prototype.style = function() {
      this.css({
        width: 148,
        height: 198,
        overflow: "hidden",
        zIndex: 100,
        position: "absolute",
        borderRadius: 4,
        border: "1px solid #d7d7d7",
        bottom: 20,
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2px"
      }), this.handle.style(20), this.handle.css({
        position: "absolute",
        top: 2,
        right: 1,
        zIndex: 10
      }), this.options.style(150), this.listHeight = this.options.children.length * this.state.itemHeight, this.viewHeight = 200
    }, je.prototype.getOption = function(t) {
      if (t) return this.options.findByKey(t)
    }, je.prototype.highlightOption = function(t) {
      if (t) {
        var e = t.getIndex();
        this.options.highlight(e), this.state.hover = e
      }
    }, je.prototype.setSelected = function(t) {
      t && (this.state.hover = t.getIndex(), this.options.setOption(t))
    }, je.prototype.getSelected = function() {
      return this.options.getCurrent()
    }, je.prototype.getOptionPos = function(t) {
      if (t) return t.getIndex() * this.state.itemHeight
    }, je.prototype.lookupOption = function(t) {
      if (t) return this.options.findByValue(t)
    }, je.prototype.getScrollHeight = function() {
      return this.listHeight - this.viewHeight
    }, je.prototype.display = function(t) {
      this.css({
        display: t ? "block" : "none"
      }), this.options.display(t)
    }, je.prototype.update = function(t) {
      var e = -(this.listHeight - this.viewHeight),
        n = (At(t.y, 0, e, 0, 1) || 0) * (this.viewHeight - 20 - 6);
      if (this.handle.update(n), this.options.update(t.y), "keypress" === t.action && 0 !== t.delta.y) {
        var i = this.state.hover + (t.delta.y > 0 ? -1 : 1);
        i >= 0 && i < this.options.children.length && (this.state.hover = i, this.options.highlight(i))
      }
    }, q.proto(Re, N), Re.prototype.setup = function() {
      this.scroll.init()
    }, Re.prototype.style = function() {
      var t = "ie" === _.Browser.type && _.Browser.version <= 9 ? "rgba(0,0,0,0)" : "transparent";
      this.css({
        cursor: "pointer",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
        backgroundColor: t
      }), this.$close.css({
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 50,
        backgroundColor: t
      }), this.view.style();
      var e = this.view.getScrollHeight();
      this.scroll.clampY(!0, -e, 0)
    }, Re.prototype.setLocale = function(t) {
      var e = this.view.getOption(t);
      if (e) {
        var n = this.view.getOptionPos(e);
        this.view.setSelected(e), this.scroll.setPosY(-n)
      }
    }, Re.prototype.onOpen = function(t) {
      if (!this.state.visible) {
        this.$close.addEventListener("click", this.onClose), this.removeEventListener("click", this.onOpen), this.setAttribute("aria-expanded", !0);
        var e = this.view.getSelected();
        if (e) {
          var n = this.view.getOptionPos(e);
          this.scroll.setPosY(-n)
        } else this.scroll.setPosY(0);
        this.emit("open"), this.scroll.pause(!1), this.view.display(!0), this.$close.css({
          display: "block"
        }), this.state.visible = !0
      }
    }, Re.prototype.onClose = function(t) {
      t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), this.close()
    }, Re.prototype.onKeyPress = function(t) {
      var e = this,
        n = [13, 32];
      if (!this.state.visible && [38, 40].concat(n).indexOf(t.keyCode) >= 0) this.onOpen();
      else {
        if (n.indexOf(t.keyCode) >= 0) {
          var i = this.view.getSelected();
          return this.emit("select", i.getKey()), void this.close()
        }
        this.timer && clearTimeout(this.timer), this.timer = setTimeout(function() {
          e.state.search = ""
        }, 500), this.state.search += String.fromCharCode(t.keyCode);
        var s = this.view.lookupOption(this.state.search);
        if (s) {
          var o = this.view.getOptionPos(s);
          this.view.highlightOption(s), this.scroll.setPosY(-o)
        }
      }
    }, Re.prototype.close = function() {
      var t = this;
      this.view.display(!1), this.setAttribute("aria-expanded", !1), this.setAttribute("tabindex", 0), this.$close.css({
        display: "none"
      }), this.scroll.pause(!0), this.state.visible = !1, this.$close.removeEventListener("click", this.onClose), setTimeout(function() {
        t.addEventListener && t.addEventListener("click", t.onOpen)
      }, 1)
    }, Re.prototype.isVisible = function() {
      return this.state.visible
    }, Re.prototype.setLabel = function(t) {
      var e = this.view.getSelected(),
        n = "";
      e && (n = e.getValue()), this.setAttribute("aria-roledescription", t + " " + n)
    }, q.proto(Be, N), Be.prototype.style = function() {
      return this.css({
        width: 26,
        height: 16,
        position: "absolute",
        cursor: "pointer",
        zIndex: -1
      }), this.$text.css({
        width: 26,
        textAlign: "center",
        fontSize: 11,
        color: "#555555",
        fontWeight: 600,
        position: "absolute"
      }), this.$underline.css({
        backgroundColor: "#00B9BF",
        width: 20,
        height: 1,
        position: "absolute",
        left: 3,
        bottom: 0
      }), {
        width: 26,
        height: 16
      }
    }, Be.prototype.setLocale = function(t) {
      var e = J.getShortLocale(t);
      this.$text.text(e.toUpperCase())
    }, Be.prototype.focus = function(t) {
      this.css({
        outline: t ? "1px #0074BF solid" : "none"
      })
    }, q.proto(De, N), De.prototype.style = function(t) {
      var e = this.display.style();
      this.css({
        width: e.width,
        height: e.height,
        position: "absolute",
        top: t ? 5 : 10,
        left: 0,
        zIndex: 100
      }), this.list.style(e.width, e.height)
    }, De.prototype.setup = function() {
      this.list.setup && this.list.setup()
    }, De.prototype.focus = function() {
      this.list.focus()
    }, De.prototype.close = function() {
      this.list.close && this.list.close()
    }, De.prototype.isOpen = function() {
      return this.list.isVisible && this.list.isVisible()
    }, De.prototype.setLabel = function() {
      var t = J.translate("Select a language:");
      this.list.setLabel(t)
    }, De.prototype.updateLocale = function() {
      var t = J.getLocale();
      this.display.setLocale(t), this.list.setLocale(t)
    }, De.prototype.enable = function(t) {
      this.css({
        display: t ? "block" : "none "
      })
    }, De.prototype.setLock = function(t) {
      this.state.locked = t, this.list.setAttribute("disabled", t)
    }, q.proto(Fe, N), Fe.prototype.load = function() {
      var t = this,
        e = this.charity ? "https://assets.hcaptcha.com/captcha/v1/31b26e4/static/images/icon-charity.svg" : "https://assets.hcaptcha.com/captcha/v1/31b26e4/static/images/icon.svg";
      Xt.image(e, {
        fallback: "png"
      }).then(function(e) {
        t.image = e, t.style.call(t, t.mobile)
      })["catch"](function() {
        j("info icon failed to load", "image", "info")
      })
    }, Fe.prototype.style = function(t) {
      return this.css({
        width: 32,
        height: 32,
        position: "absolute",
        top: 0,
        left: 0
      }), this.color.css({
        "-ms-high-contrast-adjust": "none",
        width: 32,
        height: 32,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 5
      }), null !== this.image && this.color.backgroundImage(this.image, 32, 32, {
        cover: !0,
        center: !0
      }), {
        width: 32,
        height: 32
      }
    }, Fe.prototype.hover = function(t) {
      "ie" !== _.Browser.type || _.Browser.version
    }, q.proto(ze, N), ze.prototype.load = function() {
      this.icon.load()
    }, ze.prototype.style = function(t) {
      t !== undefined && (this.mobile = t);
      var e = this.icon.style(this.mobile);
      this.css({
        width: e.width,
        height: e.height,
        left: "50%",
        marginLeft: -e.width / 2,
        cursor: "pointer",
        position: "absolute"
      }), this.height = e.height
    }, ze.prototype.onClick = function(t) {
      if (null !== this.fireEvent) {
        var e = this.link + "?site=" + S.host + "&key=" + S.sitekey + "&r=a1";
        window.open(e)
      }
    }, q.proto(He, N), He.prototype.style = function(t) {
      this.css({
        fontSize: t,
        color: O.error,
        width: "100%",
        textAlign: "right"
      })
    }, He.prototype.display = function(t) {
      this.css({
        opacity: t ? 1 : 0
      }), this.visible = t, this.setAttribute("aria-hidden", !t)
    }, He.prototype.setCopy = function() {
      var t = J.translate("Please try again.");
      this.copy.text(t)
    }, q.proto(We, N), We.prototype.style = function(t) {
      this.css({
        width: t,
        height: t,
        overflow: "hidden",
        borderRadius: "50%"
      }), this.$bg.css({
        width: t,
        height: t
      })
    }, We.prototype.active = function(t) {
      this.$bg.css({
        backgroundColor: t ? "#00B9BF" : "#d5d5d5"
      })
    }, We.prototype.hide = function() {
      this.css({
        opacity: 0
      })
    }, q.proto(qe, N), qe.prototype.createCrumbs = function(t) {
      this.display = !0;
      for (var e = null, n = 0; n < t; n++) e = this.initComponent(We, null, this.$wrapper), this.crumbs.push(e)
    }, qe.prototype.removeCrumbs = function() {
      if (this.display = !1, 0 !== this.crumbs.length) {
        for (var t = -1; ++t < this.crumbs.length;) this.crumbs[t].destroy();
        this.crumbs = []
      }
    }, qe.prototype.style = function(t, e) {
      for (var n = e ? 6 : 7, i = e ? 4 : 5, s = -1; ++s < this.crumbs.length;) this.crumbs[s].style(n), this.crumbs[s].css({
        left: s * n + s * i,
        top: 0,
        position: "absolute"
      });
      this.css({
        width: t,
        height: n
      });
      var o = this.crumbs.length * n + i * (this.crumbs.length - 1);
      this.$wrapper.css({
        width: o,
        height: n,
        position: "absolute",
        left: (t - o) / 2
      }), this.height = n, this.width = t, this.mobile = e
    }, qe.prototype.setIndex = function(t) {
      for (var e = -1; ++e < this.crumbs.length;) this.crumbs[e].active(t === e)
    }, qe.prototype.hide = function() {
      for (var t = -1; ++t < this.crumbs.length;) this.crumbs[t].hide()
    };
    var Ne = {
      on: null,
      off: null
    };
  
    function Ue() {
      q.self(this, N, "button-close"), this.locked = !1, this.mobile = !1, this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.addClass("button"), this.$on = this.createElement(".close-image"), this.$off = this.createElement(".close-image"), this.setLabel.call(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === _.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover)), "ie" === _.Browser.type && 8 === _.Browser.version ? this.$on.css({
        display: "none"
      }) : this.$on.css({
        opacity: 0
      })
    }
  
    function Ve() {
      q.self(this, N, "header"), this.state = {
        visible: !0
      }, this.$title = this.createElement("h2", "#modal-title"), this.$underline = this.createElement(".underline"), this.setAttribute("role", "heading")
    }
  
    function Xe() {
      q.self(this, N, "modal");
      var t = this;
      this.state = {
        visible: !1,
        curr: null,
        prev: null
      }, this.addClass("no-outline"), this.setAttribute("role", "dialog"), this.setAttribute("aria-modal", !0), this.setAttribute("tabindex", "0"), this.header = this.initComponent(Ve), this.header.on("close", function() {
        t.emit("close")
      }), this.$content = this.createElement("#modal-content"), this.$content.addClass("content"), this.setAttribute("aria-describeby", "#modal-content"), this.close = this.initComponent(Ue), this.close.on("click", function() {
        t.emit("close")
      }), this.addEventListener("keydown", function(e) {
        t.dom && 9 === e.keyNum && (e.shiftKey ? document.activeElement === t.dom && (t.close.focus(), e.preventDefault && e.preventDefault()) : document.activeElement === t.close.dom && (t.focus(), e.preventDefault && e.preventDefault()))
      }), this.addEventListener("focus", function() {
        t.css({
          border: "1px solid #0074BF"
        })
      }), this.addEventListener("blur", function() {
        t.css({
          border: "1px solid #d7d7d7"
        })
      })
    }
  
    function Je(t) {
      q.self(this, N, "link", "a");
      var e = this;
      this.state = {
        link: t.link,
        text: t.text
      }, this.state.link && (this.setAttribute("href", this.state.link), this.setAttribute("target", "_blank"));
      var n = function(t) {
        e.state.link || e.emit("click")
      };
      if (this.addEventListener("enter", n), this.addEventListener("click", n), !1 === _.System.mobile) {
        var i = function(t) {
          e.css({
            color: "over" === t.action ? O.hoverOn : O.hoverOff
          })
        };
        this.addEventListener("over", i), this.addEventListener("out", i)
      }
    }
  
    function Ke(t) {
      q.self(this, N, "copy", "p");
      var e = this;
      t || (t = {}), this.state = {
        text: t.text || "",
        link: t.link || !1,
        linkText: t.linkText || "",
        linkTo: t.linkTo || null,
        replaceText: t.replaceText || null
      }, this.state.link && (this.link = new Je({
        text: this.state.linkText,
        link: this.state.linkTo
      }), this.state.linkTo && this.link.on("click", function() {
        e.emit("click")
      }))
    }
    q.proto(Ue, N), Ue.size = Ue.prototype.size = 30, Ue.prototype.load = function() {
      if (!Ne.on) {
        var t = this;
        Xt.batch(["close-off.svg", "close-on.svg"], {
          prefix: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static/images",
          fallback: "png"
        }).then(function(e) {
          Ne.off = e[0], Ne.on = e[1], t.style.call(t)
        })["catch"](function() {
          j("refresh icon failed to load", "image", "info")
        })
      }
    }, Ue.prototype.style = function() {
      var t = this.size;
      this.css({
        width: t,
        height: t,
        cursor: "pointer",
        display: "block",
        backgroundColor: "#fff",
        borderRadius: 4,
        border: "none"
      }), null !== Ne.on && (this.$on.backgroundImage(Ne.on, 12, 12, {
        cover: !0
      }), this.$off.backgroundImage(Ne.off, 12, 12, {
        cover: !0
      })), this.$on.css({
        position: "absolute",
        left: (t - 12) / 2,
        top: (t - 12) / 2
      }), this.$off.css({
        position: "absolute",
        left: (t - 12) / 2,
        top: (t - 12) / 2
      })
    }, Ue.prototype.onHover = function(t) {
      null !== this.emit && !0 !== this.locked && (this.css({
        backgroundColor: "over" === t.action ? "#f5f5f5" : "#fff"
      }), this.emit("hover", t), "ie" === _.Browser.type && 8 === _.Browser.version ? (this.$on.css({
        display: "over" === t.action ? "block" : "none"
      }), this.$off.css({
        display: "over" === t.action ? "none" : "block"
      })) : (this.$on.css({
        opacity: "over" === t.action ? 1 : 0
      }), this.$off.css({
        opacity: "over" === t.action ? 0 : 1
      })))
    }, Ue.prototype.onSelect = function(t) {
      null !== this.emit && !0 !== this.locked && (this.selected = !this.selected, this.emit("click", t))
    }, Ue.prototype.lock = function(t) {
      this.locked = t, this.css({
        opacity: t ? .25 : .5
      })
    }, Ue.prototype.setLabel = function(t) {
      var e = J.translate("Close Modal");
      this.setAttribute("title", e)
    }, q.proto(Ve, N), Ve.prototype.style = function(t, e) {
      var n = e ? 40 : 44;
      return this.$title.css({
        color: O.text,
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 700,
        textAlign: "left",
        fontSize: e ? 15 : 16,
        display: this.state.visible ? "table-cell" : "none",
        verticalAlign: "middle",
        paddingTop: 2,
        height: n,
        width: t - Ue.size
      }), this.$underline.css({
        backgroundColor: O.hoverOff,
        width: t,
        height: 1,
        top: n,
        position: "absolute"
      }), this.css({
        width: t,
        height: n,
        position: "relative",
        top: 0
      }), {
        height: n,
        width: t
      }
    }, Ve.prototype.setCopy = function(t) {
      var e = J.translate(t);
      this.$title.text(e)
    }, Ve.prototype.display = function(t) {
      this.state.visible = t, this.css({
        display: t ? "table-cell" : "none"
      })
    }, Ve.prototype.isVisible = function() {
      return this.state.visible
    }, q.proto(Xe, N), Xe.prototype.style = function(t, e) {
      var n = t < 300;
      this.css({
        width: t,
        height: e,
        position: "relative",
        margin: "0 auto",
        backgroundColor: "#fff",
        display: this.header ? "block" : "table",
        borderRadius: 4,
        zIndex: 10,
        overflow: "hidden",
        border: "1px solid #d7d7d7",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2px",
        padding: "0px 20px"
      }), this.header.isVisible() ? (this.header.style(t, n), this.$content.css({
        display: "block",
        height: "auto",
        marginTop: 15
      })) : this.$content.css({
        display: "table-cell",
        verticalAlign: "middle",
        marginTop: 0,
        height: e
      }), this.close.style(), this.close.css({
        position: "absolute",
        right: 20,
        top: n ? 5 : 7
      })
    }, Xe.prototype.setTitle = function(t) {
      t ? (this.header.display(!0), this.header.setCopy(t)) : this.header.display(!1)
    }, Xe.prototype.load = function() {
      this.close.load()
    }, q.proto(Je, N), Je.prototype.style = function(t) {
      this.css({
        color: O.hoverOff,
        fontWeight: 500,
        fontSize: t,
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        lineHeight: t
      })
    }, Je.prototype.translate = function() {
      var t = J.translate(this.state.text);
      this.text(t)
    }, q.proto(Ke, N), Ke.prototype.style = function(t, e) {
      e || (e = "center"), this.css({
        width: "100%",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: t,
        textAlign: e,
        fontWeight: 500,
        color: O.text,
        lineHeight: t + 6,
        display: "inline"
      }), this.state.link && (this.link.style(t), this.link.css({
        display: "inline"
      }))
    }, Ke.prototype.translate = function() {
      var t = J.translate(this.state.text);
      if (this.state.link)
        if (this.link.translate(), this.state.replaceText) {
          var e = t.split("{{" + this.state.replaceText + "}}"),
            n = document.createTextNode(e[0]);
          if (this.appendElement(n), this.appendElement(this.link), "" !== e[1]) {
            var i = document.createTextNode(e[1]);
            this.appendElement(i)
          }
        } else {
          var s = document.createTextNode(t + " ");
          this.appendElement(s), this.appendElement(this.link)
        }
      else this.content(t)
    };
    var Ye = "hCaptcha is a service that reduces bots and spam by asking simple questions. Please follow the instructions at the top of the screen for each challenge. For more information visit {{site-url}}";
  
    function Ge() {
      q.self(this, N, "instructions"), this.copy = this.initComponent(Ke, {
        text: Ye,
        link: !0,
        linkText: "hcaptcha.com",
        linkTo: "https://www.hcaptcha.com/what-is-hcaptcha-about?r=a2",
        replaceText: "site-url"
      })
    }
  
    function Qe() {
      q.self(this, N, "feedback");
      var t = this;
      this.$info = this.createElement("span"), this.$link = this.createElement(".feedback-link"), this.$link.setAttribute("tabindex", "0"), this.$link.setAttribute("role", "link");
      var e = function(e) {
        t.emit("click")
      };
      if (this.$link.addEventListener("enter", e), this.$link.addEventListener("click", e), !1 === _.System.mobile) {
        var n = function(e) {
          t.$link.css({
            color: "over" === e.action ? O.hoverOn : O.hoverOff
          })
        };
        this.$link.addEventListener("over", n), this.$link.addEventListener("out", n)
      }
    }
  
    function Ze() {
      q.self(this, N, "information");
      var t = this;
      this.instructions = this.initComponent(Ge, null, this.$content), this.feedback = this.initComponent(Qe, null, this.$content), this.feedback.on("click", function() {
        t.emit("change", "feedback")
      })
    }
  
    function tn(t) {
      q.self(this, N, "checkmark");
      var e = this;
      this.state = {
        locked: !1,
        selected: !1,
        text: t.text,
        value: t.value
      }, this.$wrapper = this.createElement(".wrapper"), this.$input = this.$wrapper.createElement(".checkbox"), this.$input.bg = this.$input.createElement(".checkbox-bg"), this.$input.check = this.$input.createElement(".checkbox-mark"), this.$input.check.css({
        opacity: 0
      }), this.$text = this.$wrapper.createElement(".checkbox-text"), this.$text.dom.id = "checkmark-" + this.state.value, this.$input.setAttribute("tabindex", "0"), this.$input.setAttribute("role", "button"), this.$input.setAttribute("aria-pressed", !1), this.$input.setAttribute("aria-labelledby", this.$text.dom.id);
      var n = function(t) {
        e.emit("select", e)
      };
      this.$wrapper.addEventListener("up", n), this.$wrapper.addEventListener("enter", n)
    }
  
    function en(t) {
      q.self(this, N, "options"), this.state = {
        visible: !0
      }, this.handeSelect = this.handeSelect.bind(this), this.$wrapper = this.createElement(".column-wrapper"), this.$left = this.$wrapper.createElement(".column-left"), this.$right = this.$wrapper.createElement(".column-right"), this.options = [];
      for (var e = null, n = null, i = 0; i < t.length; i++) n = i >= t.length / 2 ? this.$right : this.$left, (e = this.initComponent(tn, t[i], n)).setCopy(), e.on("select", this.handeSelect), this.options.push(e)
    }
  
    function nn(t) {
      q.self(this, N, "comment");
      var e = this;
      this.state = {
        visible: !1,
        placeholder: t
      }, this.$textarea = this.createElement("textarea", ".comment-textarea"), this.setPlaceholder.call(this), this.$textarea.addEventListener("input", function(t) {
        e.emit("change", t.target.value)
      })
    }
  
    function sn(t) {
      q.self(this, N, "button-" + t.value), this.state = {
        visible: !0,
        locked: !1,
        value: t.value,
        text: t.text,
        lockText: null,
        desc: t.desc,
        color: t.color
      }, this.$copy = this.createElement(".send-text"), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.$copy.setAttribute("tabindex", 0), this.$copy.setAttribute("role", "button"), this.$copy.addEventListener("click", this.onSelect), this.$copy.addEventListener("enter", this.onSelect), !1 === _.System.mobile && (this.$copy.addEventListener("over", this.onHover), this.$copy.addEventListener("out", this.onHover))
    }
    q.proto(Ge, N), Ge.prototype.style = function(t) {
      this.copy.style(t, "left")
    }, Ge.prototype.setCopy = function() {
      this.copy.translate()
    }, q.proto(Qe, N), Qe.prototype.style = function(t, e) {
      var n = Math.floor(At(t, 250, 300, 11, 13));
      this.css({
        textAlign: "center",
        color: "#707070",
        fontSize: n,
        fontWeight: 500,
        width: t,
        margin: "0 auto"
      }), this.$link.css({
        color: O.hoverOff,
        fontWeight: 500,
        marginLeft: 3,
        cursor: "pointer",
        display: "inline-block"
      })
    }, Qe.prototype.setCopy = function(t, e) {
      var n = J.translate("Having a problem?"),
        i = J.translate("Give feedback."),
        s = J.translate("Provide feedback regarding the hCaptcha service.");
      this.$info.text(n), this.$link.text(i), this.$link.setAttribute("aria-label", s)
    }, q.proto(Ze, N), Ze.prototype.style = function(t, e, n) {
      this.instructions.style(n), this.instructions.css({
        marginBottom: 10
      }), this.feedback.style(t)
    }, Ze.prototype.setCopy = function() {
      this.instructions.setCopy(), this.feedback.setCopy()
    }, q.proto(tn, N), tn.prototype.style = function(t) {
      var e = At(t, 125, 150, 13, 14),
        n = t - 27;
      this.css({
        height: "auto",
        marginTop: 5,
        marginBottom: 5,
        position: "relative"
      }), this.$wrapper.css({
        cursor: "pointer",
        height: "auto",
        width: "auto",
        position: "relative",
        display: "inline-block"
      }), this.$input.css({
        position: "relative",
        display: "inline-block",
        width: 15,
        height: 15,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #b3b3b3",
        float: "left"
      }), this.$input.check.css({
        position: "absolute",
        top: 2,
        left: 2,
        zIndex: 10,
        width: 11,
        height: 11,
        borderRadius: 1,
        backgroundColor: "#33D1CB"
      }), this.$input.bg.css({
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: 15,
        height: 15,
        backgroundColor: "#f7f7f7"
      }), this.$text.css({
        position: "relative",
        display: "inline-block",
        width: n,
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: e,
        fontWeight: 500,
        color: "#707070",
        float: "right",
        marginLeft: 10,
        marginTop: 1,
        wordBreak: "break-word"
      })
    }, tn.prototype.toggle = function(t) {
      this.state.locked || (this.state.selected = t, this.$input.check.css({
        opacity: t ? 1 : 0
      }), this.$input.setAttribute("aria-pressed", t))
    }, tn.prototype.lock = function(t) {
      this.state.locked = t
    }, tn.prototype.setCopy = function() {
      var t = J.translate(this.state.text);
      this.$text.text(t)
    }, q.proto(en, N), en.prototype.style = function(t, e) {
      var n = At(t, 280, 350, 125, 150);
      this.css({
        position: "relative",
        width: t,
        display: "inline-block"
      }), this.$wrapper.css({
        width: 2 * n,
        margin: "0 auto"
      }), this.$left.css({
        width: n,
        display: "inline-block",
        float: "left"
      }), this.$right.css({
        width: n,
        display: "inline-block",
        float: "right"
      });
      for (var i = 0; i < this.options.length; i++) this.options[i].style(n)
    }, en.prototype.handeSelect = function(t) {
      if (this.state.visible) {
        for (var e = !1, n = 0; n < this.options.length; n++)(e = this.options[n] === t) && e === t.state.selected && (e = !e), this.options[n].toggle(e);
        this.emit("update", t)
      }
    }, en.prototype.visible = function(t) {
      this.state.visible = t, this.css({
        display: t ? "inline-block" : "none"
      });
      for (var e = 0; e < this.options.length; e++) this.options[e].lock(!t)
    }, en.prototype.setCopy = function() {
      for (var t = 0; t < this.options.length; t++) this.options[t].setCopy()
    }, q.proto(nn, N), nn.prototype.style = function(t, e) {
      this.$textarea.css({
        fontFamily: "helvetica, arial, sans-serif",
        width: t - 30,
        height: 50,
        borderRadius: 4,
        backgroundColor: "#f7f7f7",
        color: "#7d7d7d",
        border: "1px solid #dedede",
        fontSize: e ? 12 : 14,
        lineHeight: e ? 16 : 18,
        fontWeight: 500,
        boxSizing: "border-box",
        MozBoxSizing: "border-box",
        padding: "8px 12px",
        position: "absolute",
        left: "50%",
        marginLeft: -(t - 30) / 2
      }), this.css({
        height: 50,
        width: t,
        position: "relative",
        display: this.state.visible ? "inline-block" : "none"
      })
    }, nn.prototype.visible = function(t) {
      this.state.visible = t, this.css({
        display: t ? "block" : "none"
      })
    }, nn.prototype.disable = function(t) {
      this.state.visible && (this.$textarea.dom.disabled = !t, this.$textarea.css({
        backgroundColor: t ? "#f7f7f7" : "#efefef"
      }))
    }, nn.prototype.getValue = function() {
      return this.$textarea.dom.value
    }, nn.prototype.setValue = function(t) {
      this.$textarea.dom.value = t
    }, nn.prototype.setPlaceholder = function() {
      this.$textarea.setAttribute("placeholder", J.translate(this.state.placeholder))
    }, q.proto(sn, N), sn.prototype.style = function(t, e) {
      this.css({
        width: "auto",
        height: 15,
        cursor: "pointer",
        display: "block",
        margin: "0 auto",
        textAlign: "center",
        borderRadius: 4,
        padding: "10px 15px"
      }), this.$copy.css({
        color: this.state.locked ? O.text : this.state.color.base,
        fontSize: 15,
        fontWeight: 500,
        display: "inline-block"
      })
    }, sn.prototype.onHover = function(t) {
      !this.state.locked && this.state.visible && (this.css({
        backgroundColor: "over" === t.action ? "#f5f5f5" : "#fff"
      }), this.$copy.css({
        color: "over" === t.action ? this.state.color.hover : this.state.color.base
      }))
    }, sn.prototype.onSelect = function(t) {
      !this.state.locked && this.state.visible && this.emit("click", t)
    }, sn.prototype.visible = function(t) {
      this.state.visible = t, this.css({
        display: t ? "block" : "none"
      })
    }, sn.prototype.lock = function(t, e) {
      this.state.locked = t, this.$copy.setAttribute("aria-label", e || this.state.desc), this.$copy.css({
        color: t ? O.text : this.state.color.base
      })
    }, sn.prototype.lock = function(t, e) {
      this.state.locked = t, this.state.lockText = e, this.$copy.setAttribute("aria-label", e || this.state.desc), this.$copy.css({
        color: t ? O.text : this.state.color.base
      })
    }, sn.prototype.setCopy = function() {
      var t = J.translate(this.state.text),
        e = J.translate(this.state.locked && this.state.lockText ? this.state.lockText : this.state.desc);
      this.$copy.text(t), this.$copy.setAttribute("aria-label", e)
    };
    var on = "Please describe your issue.",
      rn = [{
        text: "Too Difficult",
        value: "difficulty"
      }, {
        text: "Inappropriate",
        value: "content"
      }, {
        text: "Software Bug",
        value: "software"
      }, {
        text: "Other",
        value: "other"
      }];
  
    function an() {
      q.self(this, N, "feedback");
      var t = this;
      this.selected = null, this.options = this.initComponent(en, rn), this.comment = this.initComponent(nn, on), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(sn, {
        text: "Cancel",
        value: "cancel",
        desc: "Cancel Response",
        color: O.warn
      }, this.$buttons), this.send = this.initComponent(sn, {
        text: "Send",
        value: "send",
        desc: "Send Response",
        color: O.link
      }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.displayComment.bind(this)), this.comment.visible(!1), this.cancel.on("click", function() {
        t.emit("close")
      })
    }
    q.proto(an, N), an.prototype.style = function(t, e, n) {
      this.$buttons.css({
        width: n ? 180 : 200,
        height: n ? 15 : 20,
        position: "relative",
        margin: "0 auto",
        marginTop: 15,
        marginBottom: 10
      }), this.options.style(t, n), this.options.css({
        marginBottom: 10
      }), this.comment.style(t, e, n), this.comment.css({
        marginBottom: 10
      }), this.send.style(), this.cancel.style(t, n), this.cancel.css({
        position: "absolute",
        left: 0
      }), this.send.css({
        position: "absolute",
        right: 0
      })
    }, an.prototype.sendMessage = function() {
      var t = "",
        e = "",
        n = this.comment.getValue();
      this.selected && (t = this.selected.state.text, e = this.selected.state.value), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1);
      var i = "software" === e || "other" === e ? "feedback" : "content" === e ? "report" : "accessibility";
      this.emit("change", "thanks", {
        response: i
      }), pe.reportIssue(t, n)["catch"](function(t) {})
    }, an.prototype.displayComment = function(t) {
      var e = t.state.selected,
        n = t.state.value,
        i = ("software" === n || "other" === n) && e;
      this.selected = e ? t : null, this.comment.visible(i), this.comment.disable(i), this.send.lock(null === this.selected)
    }, an.prototype.setCopy = function() {
      this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    };
    var ln = "Please provide details and steps to reproduce.",
      hn = [{
        text: "Can't Solve",
        value: "captcha_solve"
      }, {
        text: "Can't Click",
        value: "captcha_usability"
      }, {
        text: "Off Screen",
        value: "captcha_position"
      }, {
        text: "Other",
        value: "other"
      }];
  
    function cn() {
      q.self(this, N, "software-bug");
      var t = this;
      this.selected = null, this.options = this.initComponent(en, hn), this.comment = this.initComponent(nn, ln, this), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(sn, {
        text: "Cancel",
        value: "cancel",
        desc: "Cancel Response",
        color: O.warn
      }, this.$buttons), this.send = this.initComponent(sn, {
        text: "Send",
        value: "send",
        desc: "Send Response",
        color: O.link
      }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.storeAnswer.bind(this)), this.cancel.on("click", function() {
        t.emit("close")
      })
    }
    q.proto(cn, N), cn.prototype.style = function(t, e, n) {
      this.$buttons.css({
        width: n ? 180 : 200,
        height: n ? 15 : 20,
        position: "relative",
        margin: "0 auto",
        marginTop: 15,
        marginBottom: 15
      }), this.options.style(t, n), this.options.css({
        marginBottom: 10
      }), this.comment.style(t, e, n), this.comment.css({
        marginBottom: 10,
        margin: "0 auto"
      }), this.send.style(), this.cancel.style(t, n), this.cancel.css({
        position: "absolute",
        left: 0
      }), this.send.css({
        position: "absolute",
        right: 0
      })
    }, cn.prototype.sendMessage = function() {
      var t = "",
        e = this.comment.getValue();
      this.selected && (t = this.selected.state.text), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1), this.emit("change", "thanks", {
        response: "feedback"
      }), pe.reportIssue(t, e)["catch"](function(t) {})
    }, cn.prototype.storeAnswer = function(t) {
      var e = t.state.selected,
        n = "other" === t.state.value && e;
      this.comment.visible(n), this.selected = e ? t : null, this.send.lock(null === this.selected)
    }, cn.prototype.setCopy = function(t) {
      this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    };
    var un = "Please describe your issue.",
      dn = [{
        text: "Inappropriate",
        value: "inappropriate"
      }, {
        text: "Violent",
        value: "violent"
      }, {
        text: "Offensive",
        value: "offensive"
      }, {
        text: "Other",
        value: "other"
      }];
  
    function pn(t) {
      q.self(this, N, "report");
      var e = this;
      this.selected = null, this.task_key = t.key || "", this.options = this.initComponent(en, dn), this.comment = this.initComponent(nn, un), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(sn, {
        text: "Cancel",
        value: "cancel",
        desc: "Cancel Response",
        color: O.warn
      }, this.$buttons), this.send = this.initComponent(sn, {
        text: "Send",
        value: "send",
        desc: "Send Response",
        color: O.link
      }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.comment.visible(!0), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.storeAnswer.bind(this)), this.cancel.on("click", function() {
        e.emit("close")
      })
    }
  
    function fn() {
      q.self(this, N, "thanks-feedback");
      var t = this;
      this.$copy = this.createElement(".feedback-thanks"), this.$resolve = this.createElement(".feedback-resolve"), this.$option = this.createElement(".accessibility-option"), this.$option.link = this.$option.createElement("a", ".option-link"), this.$bug = this.createElement(".feedback-bug"), this.$bug.link = this.createElement("a", ".bug-link"), this.$option.link.setAttribute("tabindex", 0), this.$bug.link.setAttribute("tabindex", 0);
      var e = function(t) {
        window.open("https://www.hcaptcha.com/reporting-bugs")
      };
      this.$bug.link.addEventListener("enter", e), this.$bug.link.addEventListener("down", e);
      var n = function(t) {
        window.open("https://hcaptcha.com/accessibility")
      };
      if (this.$option.link.addEventListener("keydown", n), this.$option.link.addEventListener("enter", n), !1 === _.System.mobile) {
        var i = function(e) {
          t.$bug.link.css({
            color: "over" === e.action ? O.hoverOn : O.hoverOff
          })
        };
        this.$bug.link.addEventListener("over", i), this.$bug.link.addEventListener("out", i);
        var s = function(e) {
          t.$option.link.css({
            color: "over" === e.action ? O.hoverOn : O.hoverOff
          })
        };
        this.$option.link.addEventListener("over", s), this.$option.link.addEventListener("out", s)
      }
    }
  
    function mn() {
      q.self(this, N, "thanks-accessibility");
      var t = this;
      this.$sorry = this.createElement(".accessibility-text"), this.$option = this.createElement(".accessibility-option"), this.$avoid = this.createElement(".accessibility-avoid");
      var e = function(t) {
        window.open("https://hcaptcha.com/accessibility")
      };
      if (this.$option.addEventListener("enter", e), this.$option.addEventListener("down", e), !1 === _.System.mobile) {
        var n = function(e) {
          t.$option.css({
            color: "over" === e.action ? O.hoverOn : O.hoverOff
          })
        };
        this.$option.addEventListener("over", n), this.$option.addEventListener("out", n)
      }
    }
  
    function yn() {
      q.self(this, N, "thanks-feedback"), this.$copy = this.createElement(".feedback-thanks"), this.$resolve = this.createElement(".feedback-resolve")
    }
  
    function gn(t) {
      q.self(this, N, "thanks"), "feedback" === t.response ? this.copy = this.initComponent(fn, null, this.$content) : "accessibility" === t.response ? this.copy = this.initComponent(mn, null, this.$content) : "report" === t.response && (this.copy = this.initComponent(yn, null, this.$content))
    }
    q.proto(pn, N), pn.prototype.style = function(t, e, n) {
      this.$buttons.css({
        width: n ? 180 : 200,
        height: n ? 15 : 40,
        position: "relative",
        margin: "0 auto",
        marginTop: 5,
        marginBottom: 10
      }), this.options.style(t, n), this.options.css({
        marginBottom: 10
      }), this.comment.style(t, e, n), this.comment.css({
        marginBottom: 10
      }), this.send.style(), this.cancel.style(t, n), this.cancel.css({
        position: "absolute",
        left: 0
      }), this.send.css({
        position: "absolute",
        right: 0
      })
    }, pn.prototype.sendMessage = function() {
      var t = this.task_key,
        e = "",
        n = this.comment.getValue();
      this.selected && (e = this.selected.state.text), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1), this.emit("change", "thanks", {
        response: "report"
      }), pe.reportIssue(e, n, t)["catch"](function(t) {})
    }, pn.prototype.storeAnswer = function(t) {
      var e = t.state.selected;
      this.selected = e ? t : null, this.send.lock(null === this.selected)
    }, pn.prototype.setCopy = function() {
      this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    }, q.proto(fn, N), fn.prototype.style = function(t, e) {
      var n = At(t, 280, 310, 260, 310),
        i = At(t, 280, 300, 12, 13),
        s = i + 4;
      this.css({
        fontFamily: "helvetica, arial, sans-serif",
        fontWeight: 500,
        textAlign: "center",
        fontSize: i + 1,
        lineHeight: i + 4,
        color: "#707070",
        width: t
      }), this.$copy.css({
        width: n,
        margin: "0 auto",
        fontWeight: 600,
        marginBottom: 2
      }), this.$resolve.css({
        fontSize: i,
        lineHeight: s,
        width: n,
        margin: "0 auto",
        marginBottom: 10
      }), this.$option.css({
        fontSize: i,
        lineHeight: s,
        marginBottom: 10
      }), this.$option.link.css({
        fontSize: i,
        lineHeight: s,
        color: O.hoverOff,
        cursor: "pointer"
      }), this.$bug.css({
        fontSize: i - 1,
        lineHeight: s - 1,
        width: n,
        margin: "0 auto",
        marginBottom: -2
      }), this.$bug.link.css({
        fontSize: i - 1,
        lineHeight: s - 1,
        width: n,
        margin: "0 auto",
        color: O.hoverOff,
        cursor: "pointer"
      })
    }, fn.prototype.setCopy = function() {
      var t = J.translate("Thank you for your feedback."),
        e = J.translate("We'll resolve your issue as quickly as we can."),
        n = J.translate("Reporting a functionality issue?"),
        i = J.translate("See how to report issues with detailed logs."),
        s = J.translate("Please also try turning off your ad blocker.‍"),
        o = J.translate("Our accessibility option may help.");
      this.$copy.text(t), this.$resolve.text(e), this.$bug.text(n + " "), this.$bug.link.text(i), this.$option.text(s + " "), this.$option.link.text(o);
      var r = J.translate("View our accessibility option."),
        a = J.translate("Give a detailed report of a bug you've encountered.");
      this.$option.link.setAttribute("aria-label", r), this.$bug.link.setAttribute("aria-label", a)
    }, q.proto(mn, N), mn.prototype.style = function(t, e) {
      var n = At(t, 280, 310, 260, 310),
        i = At(t, 280, 300, 12, 13),
        s = i + 4;
      this.css({
        fontFamily: "helvetica, arial, sans-serif",
        fontWeight: 500,
        fontSize: i + 1,
        lineHeight: s,
        textAlign: "center",
        color: "#707070",
        width: t
      }), this.$sorry.css({
        fontWeight: 600,
        width: n,
        margin: "0 auto",
        marginBottom: 2
      }), this.$option.css({
        fontSize: i,
        lineHeight: s,
        color: O.hoverOff,
        cursor: "pointer",
        marginBottom: 10
      }), this.$avoid.css({
        width: n,
        textAlign: "center",
        fontSize: i,
        lineHeight: s,
        margin: "0 auto"
      })
    }, mn.prototype.setCopy = function() {
      var t = J.translate("Sorry to hear that!"),
        e = J.translate("Our accessibility option may help."),
        n = J.translate("This lets you avoid future questions by registering and setting a cookie."),
        i = J.translate("Please also try turning off your ad blocker.‍");
      this.$sorry.text(t + " "), this.$option.text(e), this.$avoid.text(n + " " + i)
    }, q.proto(yn, N), yn.prototype.style = function(t, e) {
      var n = At(t, 280, 310, 260, 310),
        i = At(t, 280, 300, 12, 13),
        s = i + 4;
      this.css({
        fontFamily: "helvetica, arial, sans-serif",
        fontWeight: 500,
        textAlign: "center",
        fontSize: i + 1,
        lineHeight: i + 4,
        color: "#707070",
        width: t
      }), this.$copy.css({
        width: n,
        margin: "0 auto",
        fontWeight: 600,
        marginBottom: 2
      }), this.$resolve.css({
        fontSize: i,
        lineHeight: s,
        width: n,
        margin: "0 auto",
        marginBottom: 10
      })
    }, yn.prototype.setCopy = function() {
      var t = {
        thanks: J.translate("Thank you for your feedback."),
        resolve: J.translate("We will look into the issue immediately.")
      };
      this.$copy.text(t.thanks), this.$resolve.text(t.resolve)
    }, q.proto(gn, Xe), gn.prototype.style = function(t, e, n) {
      this.copy.style(t, n)
    }, gn.prototype.setCopy = function() {
      this.copy.setCopy()
    }, gn.prototype.setFocus = function() {
      this.copy.focus()
    };
    var vn = {
        getCookie: function(t) {
          var e = document.cookie.replace(/ /g, "").split(";");
          try {
            for (var n = "", i = e.length; i-- && !n;) e[i].indexOf(t) >= 0 && (n = e[i]);
            return n
          } catch (xi) {
            return ""
          }
        },
        hasCookie: function(t) {
          return !!vn.getCookie(t)
        },
        supportsAPI: function() {
          try {
            return "hasStorageAccess" in document && "requestStorageAccess" in document
          } catch (xi) {
            return !1
          }
        },
        hasAccess: function() {
          return new Promise(function(t) {
            document.hasStorageAccess().then(function() {
              t(!0)
            })["catch"](function() {
              t(!1)
            })
          })
        },
        requestAccess: function() {
          try {
            return document.requestStorageAccess()
          } catch (xi) {
            return Promise.resolve()
          }
        }
      },
      bn = {
        none: null,
        blocked: null,
        found: null
      };
  
    function wn() {
      q.self(this, N, "cookie-icon"), this.size = 0, this.$none = this.createElement(".icon-none"), this.$blocked = this.createElement(".icon-blocked"), this.$found = this.createElement(".icon-found"), "ie" === _.Browser.type && 8 === _.Browser.version ? (this.$none.css({
        display: "none"
      }), this.$blocked.css({
        display: "none"
      }), this.$found.css({
        display: "none"
      })) : (this.$none.css({
        opacity: 0
      }), this.$blocked.css({
        opacity: 0
      }), this.$found.css({
        opacity: 0
      }))
    }
    q.proto(wn, N), wn.prototype.load = function() {
      if (!bn.none) {
        var t = this;
        Xt.batch(["cookie-none.svg", "cookie-blocked.svg", "cookie-found.svg"], {
          prefix: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static/images",
          fallback: "png"
        }).then(function(e) {
          bn.none = e[0], bn.blocked = e[1], bn.found = e[2], t.style.call(t)
        })["catch"](function() {
          j("Cookie icon failed to load", "image", "info")
        })
      }
    }, wn.prototype.style = function() {
      this.css({
        width: 18,
        height: 18,
        display: "inline",
        position: "relative",
        background: "rgba(0,0,0,0)"
      }), null !== bn.none && (this.$none.backgroundImage(bn.none, 18, 18, {
        cover: !0
      }), this.$blocked.backgroundImage(bn.blocked, 18, 18, {
        cover: !0
      }), this.$found.backgroundImage(bn.found, 18, 18, {
        cover: !0
      })), this.$none.css({
        "-ms-high-contrast-adjust": "none",
        position: "absolute",
        left: 0,
        top: 0
      }), this.$blocked.css({
        "-ms-high-contrast-adjust": "none",
        position: "absolute",
        left: 0,
        top: 0
      }), this.$found.css({
        "-ms-high-contrast-adjust": "none",
        position: "absolute",
        left: 0,
        top: 0
      }), this.size = 18
    }, wn.prototype.display = function(t) {
      "ie" === _.Browser.type && 8 === _.Browser.version ? (this.$none.css({
        display: "none" === t ? "block" : "none"
      }), this.$blocked.css({
        display: "blocked" === t ? "block" : "none"
      }), this.$found.css({
        display: "found" === t ? "block" : "none"
      })) : (this.$none.css({
        opacity: "none" === t ? 1 : 0
      }), this.$blocked.css({
        opacity: "blocked" === t ? 1 : 0
      }), this.$found.css({
        opacity: "found" === t ? 1 : 0
      }))
    };
    var kn = {
        noCookie: {
          noAccess: "Accessibility cookie is not set. {{retrieve-cookie}}",
          hasAccess: "Cookies are disabled or the accessibility cookie is not set. {{enable-cookies}}"
        },
        hasCookie: "Accessibility cookie is set. For help, please email {{support}}"
      },
      xn = "support@hcaptcha.com",
      En = "Enable cross-site cookies.",
      Cn = "Retrieve accessibility cookie.";
  
    function _n() {
      q.self(this, N, "status");
      var t = this;
      this.state = {
        hasCookie: !1,
        hasAccess: !1,
        allowedAccess: !1
      }, this.$header = this.createElement(".header"), this.$header.copy = this.$header.createElement(".text"), this.$header.setAttribute("aria-hidden", !0), this.icon = this.initComponent(wn, null, this.$header), this.retrieve = this.initComponent(Ke, {
        text: kn.noCookie.noAccess,
        link: !0,
        linkText: Cn,
        linkTo: "https://dashboard.hcaptcha.com/signup?type=accessibility",
        replaceText: "retrieve-cookie"
      }), this.disabled = this.initComponent(Ke, {
        text: kn.noCookie.hasAccess,
        link: !0,
        linkText: En,
        replaceText: "enable-cookies"
      }), this.help = this.initComponent(Ke, {
        text: kn.hasCookie,
        link: !0,
        linkText: xn,
        linkTo: "mailto:" + xn,
        replaceText: "support"
      }), this.retrieve.dom.id = "status-retrieve", this.disabled.dom.id = "status-disabled", this.help.dom.id = "status-help", this.disabled.on("click", function() {
        vn.requestAccess().then(function() {
          t.setType()
        })
      }), this.icon.load()
    }
    q.proto(_n, N), _n.prototype.style = function(t) {
      this.css({
        fontSize: t,
        color: "#555555"
      }), this.$header.css({
        fontWeight: 600,
        marginBottom: 5
      }), this.$header.copy.css({
        display: "inline",
        position: "relative"
      }), this.icon.style(), this.icon.css({
        top: -2,
        marginLeft: 5
      }), this.retrieve.style(t, "left"), this.disabled.style(t, "left"), this.help.style(t, "left");
      var e = this.state.hasCookie;
      this.help.css({
        display: e ? "block" : "none"
      });
      var n = !this.state.hasCookie && (!this.hasAccess || this.state.hasAccess && !this.state.allowedAccess);
      this.retrieve.css({
        display: n ? "block" : "none"
      });
      var i = !this.state.hasCookie && this.state.hasAccess && !this.state.allowedAccess;
      this.disabled.css({
        display: i ? "block" : "none"
      })
    }, _n.prototype.checkAccess = function() {
      var t = this;
      ke.contact("get-ac").then(function(e) {
        t.state.hasCookie = !!e, vn.supportsAPI() ? (t.state.hasAccess = !0, vn.hasAccess().then(function(e) {
          t.state.allowedAccess = e, t.setType()
        })) : (t.state.hasAccess = !1, t.setType())
      })
    }, _n.prototype.setType = function() {
      this.$header.copy.text(J.translate("Status:"));
      var t = this.state.hasCookie;
      this.help.css({
        display: t ? "block" : "none"
      });
      var e = !this.state.hasCookie && (!this.hasAccess || this.state.hasAccess && !this.state.allowedAccess);
      this.retrieve.css({
        display: e ? "block" : "none"
      });
      var n = !this.state.hasCookie && this.state.hasAccess && !this.state.allowedAccess;
      this.disabled.css({
        display: n ? "block" : "none"
      });
      var i = this.state.hasCookie ? "found" : this.state.hasAccess ? "blocked" : "none";
      this.icon.display(i)
    }, _n.prototype.translate = function() {
      this.$header.copy.text(J.translate("Status:")), this.retrieve.translate(), this.disabled.translate(), this.help.translate()
    };
    var Sn = "To bypass our visual challenge, we offer an accessibility cookie.",
      On = "Learn more about hCaptcha Accessibility.";
  
    function An() {
      q.self(this, N, "accessibility"), this.copy = this.initComponent(Ke, {
        text: Sn,
        link: !0,
        linkText: On,
        linkTo: "https://hcaptcha.com/accessibility"
      }), this.status = this.initComponent(_n), this.status.checkAccess()
    }
  
    function $n() {
      q.self(this, N, "challenge-modal"), this.modalContent = null, this.state = {
        visible: !1,
        curr: null,
        prev: null
      }, this.config = {
        width: 0,
        height: 0,
        mobile: !1
      }, this.display = this.display.bind(this), this.close = this.close.bind(this), this.$container = this.createElement(".container"), this.modal = this.initComponent(Xe, null, this.$container), this.modal.on("close", this.close), this.$bg = this.createElement(".modal-bg"), this.$bg.addEventListener("click", this.close);
      var t = _.Browser.ie && 8 === _.Browser.version;
      this.css({
        visibility: "hidden",
        display: t ? "none" : "table",
        zIndex: -1
      })
    }
    q.proto(An, N), An.prototype.style = function(t, e, n) {
      this.copy.style(n, "left"), this.copy.css({
        position: "relative",
        display: "inline"
      });
      var i = J.getLocale();
      this.status.style(n), this.status.css({
        marginTop: "my" === i ? 5 : 15
      })
    }, An.prototype.setCopy = function() {
      this.copy.translate(), this.status.translate()
    }, q.proto($n, N), $n.prototype.style = function(t, e, n) {
      var i = At(t, 300, 450, 290, 375),
        s = At(e, 275, 300, 240, 250),
        o = i - 2 * At(t, 300, 450, 20, 25),
        r = _.Browser.ie && 8 === _.Browser.version;
      if (this.css({
          position: "absolute",
          width: "100%",
          height: "100%",
          display: r && !this.state.visible ? "none" : "table",
          top: 0,
          left: 0
        }), this.$container.css({
          display: "table-cell",
          verticalAlign: "middle"
        }), this.modal.style(o, s), this.$bg.css({
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundColor: "#000",
          opacity: 0,
          zindex: 0,
          cursor: "pointer"
        }), this.config.width = o, this.config.height = s, this.config.mobile = n, this.modalContent) {
        var a = Math.floor(At(o, 250, 275, 12, 14));
        this.modalContent.style(o, s, a)
      }
    }, $n.prototype.close = function() {
      if (this.state.visible) {
        this.state.visible = !1, this.modalContent && (this.modalContent.off("close", this.close), this.modalContent = this.modalContent.destroy());
        var t = _.Browser.ie && 8 === _.Browser.version;
        this.css({
          visibility: "hidden",
          display: t ? "none" : "table",
          zIndex: -1
        }), "report_image" === this.state.prev && "thanks" === this.state.curr && this.emit("refresh"), this.emit("close")
      }
    }, $n.prototype.display = function(t, e) {
      var n = null;
      this.modalContent && (this.modalContent = this.modalContent.destroy()), this.state.prev = this.state.curr, this.state.curr = t;
      var i = null;
      "info" === t ? (n = Ze, i = "Information") : "feedback" === t ? (n = an, i = "Feedback") : "report_bug" === t ? (n = cn, i = "Software Bug") : "report_image" === t ? (n = pn, i = "Tell Us Why") : t.indexOf("thanks") >= 0 ? n = gn : t.indexOf("accessibility") >= 0 && (n = An, i = "Accessibility"), this.state.visible && (this.modal.destroy(), this.modal = this.initComponent(Xe, null, this.$container), this.modal.on("close", this.close));
      var s = this.initComponent(n, e, this.modal.$content);
      this.modal.setTitle(i), s.setCopy(), s.on("close", this.close), s.on("change", this.display);
      var o = Math.floor(At(this.config.width, 250, 275, 14, 15));
      s.style(this.config.width, this.config.height, o), this.modal.style(this.config.width, this.config.height), this.css({
        visibility: "visible",
        display: "table",
        zIndex: 200
      }), this.modal.focus(), this.state.visible = !0, this.modalContent = s
    }, $n.prototype.isOpen = function() {
      return this.state.visible
    }, $n.prototype.load = function() {
      this.modal.load()
    };
    var Ln = new $n;
  
    function Tn(t) {
      q.self(this, N, "option"), this.state = {
        text: t.text,
        value: t.value,
        type: t.type,
        color: t.color || "#555555",
        desc: t.desc,
        locked: !1,
        visible: !0
      }, this.addClass("button"), this.$wrapper = this.createElement(".wrapper"), this.$copy = this.$wrapper.createElement(".copy"), this.$bg = this.createElement(".bg"), t.last || (this.$line = this.$wrapper.createElement(".line")), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), "modal" === this.state.type && (this.setAttribute("aria-expanded", !1), this.setAttribute("aria-haspopup", !0)), this.onSelect = this.onSelect.bind(this), this.onHover = this.onHover.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === _.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover))
    }
    q.proto(Tn, N), Tn.prototype.style = function(t) {
      var e = t ? 135 : 160,
        n = t ? 35 : 40,
        i = e + 30;
      return this.css({
        width: i,
        height: n,
        display: this.state.visible ? "block" : "none",
        position: "relative",
        cursor: "pointer",
        left: 0,
        overflow: "hidden"
      }), this.$wrapper.css({
        width: e,
        height: n,
        padding: "0px 15px",
        zIndex: 10,
        position: "relative"
      }), this.$line && this.$line.css({
        width: e,
        height: 1,
        backgroundColor: "#E6E6E6",
        bottom: 0,
        zIndex: 0,
        position: "absolute"
      }), this.$copy.css({
        width: e,
        height: "100%",
        color: this.state.color,
        fontSize: t ? 12 : 14,
        lineHeight: n,
        display: "table-cell",
        verticalAlign: "middle",
        textAlign: "center"
      }), this.$bg.css({
        width: i + 2,
        opacity: 0,
        height: n + 2,
        position: "absolute",
        backgroundColor: "#f5f5f5",
        top: 0,
        left: 0
      }), {
        width: i,
        height: n
      }
    }, Tn.prototype.onHover = function(t) {
      !this.state.locked && this.state.visible && this.$bg.css({
        opacity: "over" === t.action ? 1 : 0
      })
    }, Tn.prototype.onSelect = function(t) {
      !this.state.locked && this.state.visible && (Ln.isOpen && Ln.close(), "link" === this.state.type ? window.open(this.state.value) : "modal" === this.state.type && Ln.display(this.state.value), this.$bg.css({
        opacity: 0
      }), this.emit("click", this.state.value))
    }, Tn.prototype.lock = function(t) {
      this.state.locked = t, this.setAttribute("tabindex", t ? -1 : 0), this.css({
        pointerEvents: t ? "none" : "auto"
      }), this.$bg.css({
        opacity: 0
      })
    }, Tn.prototype.visible = function(t) {
      this.state.visible = t, this.css({
        display: t ? "block" : "none"
      }), this.setAttribute("tabindex", t ? 0 : -1)
    }, Tn.prototype.setCopy = function() {
      var t = J.translate(this.state.text),
        e = J.translate(this.state.desc);
      this.$copy.text(t), this.setAttribute("aria-label", e)
    };
    var Pn = [{
      text: "Accessibility",
      value: "accessibility",
      type: "modal",
      desc: "Accessibility. Visit this menu entry to learn how to enable hCaptcha accessibility, which allows you to bypass the challenge via an emailed link"
    }, {
      text: "Report Image",
      value: "report_image",
      type: "custom",
      desc: "Report an image to hCaptcha.",
      color: "#EB5757"
    }, {
      text: "Report Bug",
      value: "report_bug",
      type: "modal",
      desc: "Report a software bug or issue to hCaptcha."
    }, {
      text: "Information",
      value: "info",
      type: "modal",
      desc: "Get information about hCaptcha and accessibility options."
    }];
  
    function Mn() {
      q.self(this, N, "menu"), this.state = {
        index: -1,
        mobile: !1,
        visible: !1,
        list: []
      }, this.$background = this.createElement(".menu-background"), this.visible = this.visible.bind(this), this.visible(!1), this.addEventListener("keydown", In.bind(this))
    }
    q.proto(Mn, N), Mn.prototype.style = function(t) {
      this.css({
        width: "auto",
        zIndex: 10,
        position: "absolute"
      });
      var e = this.state.list,
        n = 0,
        i = 0;
      if (e.length > 0)
        for (var s = null, o = 0; o < e.length; o++) s = e[o].style(t), e[o].state.visible && (n = s.width, i += s.height);
      return this.css({
        width: n - 2,
        height: i - 2,
        overflow: "hidden",
        zIndex: 100,
        position: "absolute",
        borderRadius: 4,
        border: "1px solid #d7d7d7",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2px"
      }), this.$background.css({
        borderRadius: 4,
        backgroundColor: "#fff",
        width: n,
        height: i,
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0
      }), this.state.mobile = t, {
        width: n,
        height: i
      }
    }, Mn.prototype.visible = function(t) {
      var e = this;
      this.state.visible = t, this.state.index = 0;
      var n = _.Browser.ie && 8 === _.Browser.version;
      this.css({
        display: !t && n ? "none" : "block",
        visibility: t ? "visible" : "hidden"
      });
      var i, s = this.state.list;
      if (t) {
        var o = null,
          r = null;
        for (i = 0; i < Pn.length; i++) "report_image" === (r = Pn[i]).value && null !== pe.getRqData() || (r.last = i === Pn.length - 1, (o = this.initComponent(Tn, r)).setCopy(), o.on("click", function(t) {
          e.visible(!1), e.emit("select", t), e.state.index = i
        }), s.push(o));
        this.style.call(this, this.state.mobile), s[0].focus()
      } else {
        for (i = this.state.list.length; --i > -1;) s[i] && s[i].destroy(), s.splice(i, 0);
        this.state.list = []
      }
    }, Mn.prototype.setCopy = function() {
      if (0 !== this.state.list.length)
        for (var t = this.state.list, e = 0; e < t.length; e++) t[e].setCopy()
    }, Mn.prototype.isVisible = function() {
      return this.state.visible || !1
    };
    var In = function(t) {
      var e = t.keyNum,
        n = this.state.index,
        i = n;
      38 === e ? i -= 1 : 40 === e && (i += 1), i < 0 || i > this.state.list.length - 1 || n !== i && (this.state.list[i] && this.state.list[i].focus(), this.state.index = i)
    };
  
    function jn(t, e) {
      q.self(this, N, "challenge-interface");
      var n = this;
      this.state = {
        action: null,
        locked: !1,
        visible: !1
      }, this.config = e || {}, this.language = this.initComponent(De), this.logo = this.initComponent(ze, this.config), this.menu = this.initComponent(Mn), this.text = this.initComponent(He), this.breadcrumbs = this.initComponent(qe), this.btn = {
        info: this.initComponent(ye),
        refresh: this.initComponent(fe),
        submit: this.initComponent(me)
      }, this.setAction = this.setAction.bind(this), this.focusMenuBtn = this.focusMenuBtn.bind(this), this.btn.info.on("click", function(t) {
        n.language.isOpen() && n.language.close(), n.menu.visible(t)
      }), this.btn.info.addEventListener("focus", function() {
        n.menu.isVisible() && n.menu.visible(!1)
      }), this.btn.info.addEventListener("blur", function() {
        n.menu.isVisible() || n.btn.info.reset()
      }), this.btn.refresh.on("click", function() {
        n.emit("refresh")
      }), this.btn.refresh.addEventListener("focus", function(t) {
        n.menu.isVisible() && (n.menu.visible(!1), n.btn.info.reset())
      }), this.btn.submit.on("click", function() {
        n.emit("submit")
      }), this.menu.on("select", function(t) {
        "report_image" === t && n.emit("report"), n.btn.info.reset()
      }), this.language.on("open", function() {
        n.menu.isVisible() && n.menu.visible(!1)
      }), this.language.on("focus", function(t) {
        t && n.menu.isVisible() && (n.menu.visible(!1), n.btn.info.reset())
      })
    }
    q.proto(jn, N), jn.prototype.load = function() {
      this.btn.info.load(), this.btn.refresh.load(), this.logo.load(), this.language.setup()
    }, jn.prototype.style = function(t, e, n) {
      var i = e ? 60 : 70,
        s = e ? 10 : 11;
      return this.breadcrumbs.display && (this.breadcrumbs.style(t, e), this.breadcrumbs.css({
        position: "absolute",
        top: e ? 12 : 20
      }), s = e ? 8 : 17, i = e ? 60 : 80), this.language.style(e), this.btn.refresh.style(e), this.btn.submit.style(e), this.btn.info.style(e), this.text.style(e ? 11 : 12), this.logo.style(t < 400), this.menu.style(e), this.menu.css({
        position: "absolute",
        left: 0,
        bottom: this.btn.submit.height + n
      }), this.btn.info.css({
        position: "absolute",
        left: 0,
        bottom: (this.btn.submit.height - this.btn.info.height) / 2
      }), this.btn.refresh.css({
        position: "absolute",
        bottom: (this.btn.submit.height - this.btn.refresh.height) / 2,
        left: this.btn.refresh.width + 10
      }), this.btn.submit.css({
        position: "absolute",
        display: "block",
        right: 0,
        bottom: 0
      }), this.logo.css({
        bottom: (this.btn.submit.height - this.logo.height) / 2
      }), this.text.css({
        position: "absolute",
        top: s
      }), this.css({
        width: t,
        height: i,
        position: "relative",
        left: n,
        top: n
      }), {
        width: t,
        height: i
      }
    }, jn.prototype.setupLogo = function(t, e) {
      t && (this.logo.destroy(), this.logo = this.initComponent(ze, {
        charity: !0
      }), this.logo.load()), this.logo.link = e || this.logo.link
    }, jn.prototype.setAction = function(t) {
      this.state.action = t, this.btn.submit.action(t)
    }, jn.prototype.displayFail = function(t) {
      this.text.display(t)
    }, jn.prototype.isOpen = function() {
      return this.menu.isVisible() || this.language.isOpen()
    }, jn.prototype.close = function(t) {
      this.menu.isVisible() ? (this.btn.info.reset(), this.menu.visible(!1), t && this.focusMenuBtn()) : this.language.isOpen() && (this.language.close(), t && this.language.focus())
    }, jn.prototype.focusMenuBtn = function() {
      this.btn.info.focus()
    }, jn.prototype.enableLanguageSelector = function(t) {
      this.language.enable(t)
    }, jn.prototype.enableRefresh = function(t) {
      this.btn.refresh.enable(t)
    }, jn.prototype.translate = function() {
      this.menu.setCopy(), this.text.setCopy(), this.language.setLabel(), this.btn.info.setLabel(), this.btn.refresh.setLabel(), this.btn.submit.setCopy()
    }, jn.prototype.lockState = function(t) {
      this.state.locked = t, this.language.setLock(t), this.btn.info.setLock(t), this.btn.refresh.setLock(t), this.btn.submit.setLock(t)
    }, jn.prototype.isLocked = function() {
      return this.state.locked
    };
    var Rn = new jn;
  
    function Bn(t, e) {
      q.self(this, N, null, ".challenge-container"), this.handleResize = null, this.handleCheck = null, this.handleFocus = null, this.handleSubmit = null, this.config = e || {}
    }
    q.proto(Bn, N), Bn.prototype.style = function(t, e, n) {
      this.css({
        width: t,
        height: e,
        position: "relative",
        top: n,
        left: n,
        zIndex: 0
      })
    }, Bn.prototype.mount = function(t) {
      var e = this;
      this.appendElement(t), Rn.setAction("check"), this.handleResize = function() {
        e.emit("resize")
      }, this.handleCheck = function(e) {
        var n = "skip";
        e && (n = t.breadcrumbs && t.served < t.breadcrumbs ? "next" : "check"), Rn.setAction(n)
      }, this.handleFocus = function() {
        e.emit("focus-check")
      }, this.handleSubmit = function() {
        Rn.emit("submit")
      }, t.on && t.on("display-check", this.handleCheck), t.on && t.on("challenge-resize", this.handleResize), t.on && t.on("focus-check", this.handleFocus), t.on && t.on("submit", this.handleSubmit), this.isMounted = !0
    }, Bn.prototype.unmount = function(t) {
      if (t.destroy) try {
        t.off && t.off("display-check", this.handleCheck), t.off && t.off("challenge-resize", this.handleResize), t.off && t.off("focus-check", this.handleFocus), t.off && t.off("submit", this.handleSubmit), t.destroy()
      } catch (ki) {} else this.removeElement(t);
      return this.isMounted = !1, null
    };
    var Dn = new Bn,
      Fn = null,
      zn = function() {
        return !!Fn
      },
      Hn = function(t, e) {
        return new Promise(function(n, i) {
          try {
            (!Fn || Fn && Fn.type !== e.request_type) && (Fn && Dn.unmount(Fn), Fn = new t, Dn.mount(Fn)), Rn.breadcrumbs.removeCrumbs(), Fn.setup(e).then(n)["catch"](function(t) {
              var e = t;
              t instanceof Error && (e = {
                event: "challenge-error",
                message: "Challenge encountered an error during setup.",
                reason: t.toString()
              }), i(e)
            }), Fn.breadcrumbs && "number" == typeof Fn.breadcrumbs && Fn.breadcrumbs > 1 && (Rn.breadcrumbs.createCrumbs(Fn.breadcrumbs), Rn.breadcrumbs.setIndex(Fn.served))
          } catch (ki) {
            Dn.isMounted || (Fn = null), i({
              event: "challenge-error",
              message: "Creating challenge failed.",
              reason: ki.toString()
            })
          }
        })
      },
      Wn = function(t, e) {
        return Fn ? new Promise(function(n, i) {
          try {
            Fn.style(t, e).then(function(t) {
              var e = Rn.style(t.width, t.mobile, 10);
              Dn.style(t.width, t.height, 10);
              var i = {
                width: t.width + 20,
                height: t.height + 20 + e.height
              };
              Ln.style(i.width, i.height, t.mobile), n({
                width: i.width,
                height: i.height,
                mobile: t.mobile
              })
            })["catch"](function(t) {
              i(t)
            })
          } catch (xi) {
            i(xi)
          }
        }) : Promise.resolve({
          width: 0,
          height: 0,
          mobile: !1
        })
      },
      qn = function() {
        Fn && Fn.submit()
      },
      Nn = function() {
        return Fn.served
      },
      Un = function() {
        return Fn ? Fn.breadcrumbs : 0
      },
      Vn = function() {
        return !(!Fn || !Fn.breadcrumbs)
      },
      Xn = function() {
        return Fn.report && "function" == typeof Fn.report
      },
      Jn = function() {
        return new Promise(function(t, e) {
          var n = function(e) {
            Fn.off("report-image", n), t(e)
          };
          Fn.report(!0), Fn.on("report-image", n)
        })
      },
      Kn = function() {
        Fn && Fn.report && Fn.report(!1)
      },
      Yn = function() {
        Fn && (Fn = Dn.unmount(Fn))
      },
      Gn = function() {
        Fn && Fn.translate && Fn.translate()
      },
      Qn = function(t) {
        Fn && Fn.setFocus && Fn.setFocus(t || 0)
      },
      Zn = Object.create(null),
      ti = null,
      ei = null,
      ni = null,
      ii = {
        solve: function(t) {
          return ti = null, ei = t, ni = new Promise(function(e, n) {
            try {
              var i = Jt.decode(t.req);
              j("Solve Proof", "proof", "info", t);
              var s = i.payload.l + "/" + t.type + ".js";
              (function(t, e) {
                return new Promise(function(n, i) {
                  var s = Zn[t];
                  s ? n(s) : Xt.script(e).then(function() {
                    s = window[t], Zn[t] = s, n(s)
                  })["catch"](i)
                })
              })(t.type, s).then(function(e) {
                return "function" != typeof e ? Promise.reject(new Error("Script is not a function")) : e(t.req)
              }).then(function(t) {
                ti = t, e(t)
              })["catch"](function(t) {
                var n = t.name || "Proof Error",
                  i = t.message || "Error";
                j(i, "proof", "debug", {
                  stack: t.stack || ""
                }), I(n + ": " + i, "proof", "error"), ti = "fail", e()
              })["finally"](function() {
                ni = null
              })
            } catch (ki) {
              I("JWT Failed: " + JSON.stringify(ki), "error", "proof"), e(), ni = null
            }
          })
        },
        getResult: function() {
          return new Promise(function(t, e) {
            function n() {
              var e = ti,
                n = ei;
              return ti = null, ei = null, t({
                solved: e,
                spec: n
              })
            }
            if (!ni) return n();
            ni["finally"](n)
          })
        }
      };
    var si = null,
      oi = !1,
      ri = "challenge",
      ai = {
        init: function() {
          si = new W(document.body), Rn.load(), Ln.load(), si.appendElement(Dn), si.appendElement(Rn), si.appendElement(Ln), si.setAttribute("aria-hidden", !0), Ln.on("close", function() {
            oi && Rn.focusMenuBtn(), Kn(!1)
          })
        },
        create: function(t, e) {
          return new Promise(function(n, i) {
            pe.getTaskData(t, e).then(function(t) {
              return t.pass || !1 === t.success ? t : (t.key && ke.send("challenge-key", {
                key: t.key
              }), Rn.enableLanguageSelector(null === pe.getRqData()), Rn.enableRefresh(null === pe.getRqData()), pe.loadBundle(t).then(function(e) {
                oi = !0, si.removeAttribute("aria-hidden"), mt.resetData(), mt.record(!0, !0, !0, !0), mt.setData("dct", Date.now());
                var n = Hn(e, pe.getData());
                return t.c && ii.solve(t.c), Wn(S.browserWidth, S.browserHeight).then(function(t) {
                  ke.contact("challenge-ready", t).then(function() {
                    oi && ("info" === ri ? (Rn.btn.info.focus(), ri = "challenge") : Qn())
                  })
                })["catch"](function(t) {
                  throw t
                }), n
              }).then(function(t) {
                return new Promise(function(e, n) {
                  Promise.all([ii.getResult(), ke.contact("check-api")]).then(function(n) {
                    e({
                      answers: t,
                      proof: n[0],
                      motionData: n[1]
                    })
                  })
                })
              }).then(function(t) {
                mt.stop();
                var e = t.answers,
                  n = t.proof,
                  i = mt.getData();
                return i.topLevel = t.motionData, pe.checkAnswers(e, i, n)
              }))
            }).then(function(t) {
              t.c && ii.solve(t.c), n(t)
            })["catch"](function(t) {
              i(t)
            })
          })
        },
        size: function(t, e) {
          return Wn(t, e)
        },
        submit: function() {
          return Vn() && Nn() !== Un() || "skip" !== Rn.action ? new Promise(function(t, e) {
            try {
              if (qn(), Vn()) {
                var n = Nn();
                Rn.breadcrumbs.setIndex(n)
              }
              t("challenge-complete")
            } catch (ki) {
              e(ki)
            }
          }) : Promise.resolve("challenge-skip")
        },
        displayReport: function() {
          return new Promise(function(t, e) {
            var n = pe.getData();
            try {
              if (!zn()) return void t();
              if (!Xn()) {
                var i = null;
                if ("fallback" === n.request_type) i = n.key;
                else {
                  var s = Vn() ? Nn() - 1 : 0;
                  i = n.tasklist[s].task_key
                }
                return void t(i)
              }
              Jn().then(function(e) {
                t(e)
              }), Rn.breadcrumbs && Rn.breadcrumbs.hide()
            } catch (xi) {
              e(xi)
            }
          })
        },
        hideReport: function(t) {
          Kn(!1)
        },
        close: function() {
          si.setAttribute("aria-hidden", !0), Yn(), Rn.displayFail(!1), Rn.breadcrumbs.removeCrumbs(), Rn.close(!1), Ln.close(), oi = !1
        },
        translateInterface: function(t) {
          if (t && t.locale && t.table) try {
            t.table && J.addTable(t.locale, t.table), Rn.translate()
          } catch (xi) {
            I("Failed to update text translations: " + JSON.stringify(xi), "error", "translation")
          }
        },
        translateBundle: function() {
          Gn()
        },
        isVisible: function() {
          return oi
        },
        setFocus: function(t) {
          ri = t
        },
        triggerFocus: function(t, e) {
          "submit" === t ? Rn.btn.submit.focus() : Qn(e)
        }
      },
      li = null,
      hi = 2,
      ci = 0,
      ui = null,
      di = 2e3,
      pi = null,
      fi = function(t) {
        for (var e, n, i, s = {}, o = t ? t.indexOf("&") >= 0 ? t.split("&") : [t] : [], r = 0; r < o.length; r++) o[r].indexOf("=") >= 0 && (e = o[r].split("="), n = decodeURIComponent(e[0]), "false" !== (i = decodeURIComponent(e[1])) && "true" !== i || (i = "true" === i), s[n] = i);
        return s
      }(window.location.hash.slice(1));
  
    function mi(t) {
      ui && (ui = clearTimeout(ui)), Rn.lockState(!1), ii.getResult().then(function(e) {
        return ai.create(t, e)
      }).then(function(t) {
        if (t.pass) ke.send("challenge-closed", {
          event: "challenge-passed",
          response: t.generated_pass_UUID,
          expiration: t.expiration
        });
        else if (!1 === t.success) {
          var e = t["error-codes"] || [];
          if (e.indexOf("expired-session") >= 0 || e.indexOf("client-fail") >= 0) return void yi();
          ke.send("challenge-closed", {
            event: "network-error",
            message: (t["error-codes"] || [""]).join(", ")
          })
        } else Rn.displayFail(!0), yi()
      })["catch"](function(t) {
        var e = t instanceof Error ? {
          event: "challenge-error",
          message: t.message || ""
        } : t;
        pe.logAction(e.event), ("challenge-error" === e.event || "bundle-error" === e.event) && ci <= hi ? (ci += 1, yi()) : (ci = 0, ke.send("challenge-closed", e))
      })
    }
  
    function yi() {
      if (null !== pe.getRqData()) return Rn.lockState(!0), void(ui = setTimeout(function() {
        ke.send("challenge-closed", {
          event: "challenge-error"
        })
      }, di));
      mi(mt.getData())
    }
  
    function gi(t, e) {
      S.browserWidth = t.width, S.browserHeight = t.height, ai.size(t.width, t.height).then(function(t) {
        e.resolve(t), j("challenge resized", "challenge", "info", t)
      })
    }
  
    function vi() {
      j("challenge refresh", "challenge", "info"), pe.logAction("challenge-refresh"), yi()
    }
  
    function bi() {
      ai.submit().then(function(t) {
        pe.logAction(t), "challenge-skip" !== t || yi()
      })["catch"](function(t) {
        M(t), pe.logAction("challenge-error"), yi()
      })
    }
  
    function wi() {
      ai.displayReport().then(function(t) {
        if (t) {
          var e = function() {
            vi(), Ln.off("refresh", e)
          };
          Ln.display("report_image", {
            key: t
          }), Ln.on("refresh", e)
        }
      })["catch"](function(t) {
        M(t), vi()
      })
    }
    return fi.sentry && Yt(),
      function(t) {
        S.host = t.host, S.sitekey = t.sitekey, S.file = "challenge", li = t.id, t.sentry !== undefined && "undefined" !== t.sentry && (e = t.sentry, P = e);
        var e;
        t.endpoint !== undefined && "undefined" !== t.endpoint && (A.endpoint = t.endpoint);
        t.reportapi !== undefined && "undefined" !== t.reportapi && (A.reportapi = t.reportapi);
        t.assethost !== undefined && "undefined" !== t.assethost && (A.assethost = t.assethost);
        t.imghost !== undefined && "undefined" !== t.imghost && (A.imghost = t.imghost);
        t.hl !== undefined && "undefined" !== t.hl && (A.language = t.hl, J.setLocale(A.language), Rn.language.updateLocale());
        A.theme = t.theme || A.theme
      }(fi), wt(function() {
        ai.init(), ke.init(li), pi = new W(document.body), ke.answer("create-challenge", function(t) {
          var e = {};
          if (t) {
            t.rqdata && pe.setRqData(t.rqdata), t.width && (S.browserWidth = t.width, S.browserHeight = t.height), t.manifest && (e = t.manifest), "enter" === t.action ? (ai.setFocus("info"), pi.addClass("using-kb")) : pi.hasClass("using-kb") && pi.removeClass("using-kb");
            var n = t.charity && !0 === t.charity;
            Rn.setupLogo(n, t.link)
          }
          _.System.mobile && ai.setFocus("info"), mi(e)
        }), ke.answer("close-challenge", function() {
          null !== pe.getRqData() && pe.setRqData(null), ui && (ui = clearTimeout(ui)), ai.close()
        }), ke.answer("resize-challenge", gi), ke.answer("challenge-translate", function(t) {
          ai.translateInterface(t), ai.isVisible() && ("en" !== t.locale ? yi() : ai.translateBundle())
        }), ke.answer("challenge-update", function(t) {
          t.endpoint && (A.endpoint = t.endpoint)
        }), ke.answer("solve-proof", function(t, e) {
          ii.solve(t), e.resolve()
        }), ke.contact("get-url").then(function(t) {
          S.url = t
        }), ke.answer("challenge-data", function(t) {
          t.rqdata && pe.setRqData(t.rqdata)
        }), Rn.on("refresh", vi), Rn.on("submit", bi), Rn.on("report", wi), Dn.on("resize", function() {
          ke.send("challenge-resize")
        }), Dn.on("focus-check", function() {
          pi.addClass("using-kb"), ai.triggerFocus("submit")
        }), pi.addEventListener("down", function(t) {
          Rn.isLocked() || Rn.displayFail(!1)
        }), pi.addEventListener("keydown", function(t) {
          27 === t.keyNum && (Ln.isOpen() ? (Ln.close(), ai.hideReport()) : Rn.isOpen() ? Rn.close(!0) : (ke.send("challenge-closed", {
            event: "challenge-escaped"
          }), ai.close()))
        }), pi.addEventListener("down", function() {
          pi.hasClass("using-kb") && pi.removeClass("using-kb")
        }), pi.addEventListener("keydown", function(t) {
          9 === t.keyNum && (pi.addClass("using-kb"), t.shiftKey || document.activeElement === Rn.btn.submit.getElement() && (ai.triggerFocus("challenge", 0), t.preventDefault && t.preventDefault()))
        }), pi.addEventListener("keydown", function(t) {
          if (document.activeElement === Rn.btn.submit.getElement()) {
            var e = t.keyNum;
            37 === e || 38 === e ? (pi.addClass("using-kb"), ai.triggerFocus("challenge", -1), t.preventDefault && t.preventDefault()) : 39 !== e && 40 !== e || (pi.addClass("using-kb"), ai.triggerFocus("challenge", 0), t.preventDefault && t.preventDefault())
          }
        }), mt.resetData(), ke.send("challenge-loaded")
      }), {
        core: _t,
        lib: Kt,
        context: {
          Config: A,
          Color: O
        }
      }
  }();