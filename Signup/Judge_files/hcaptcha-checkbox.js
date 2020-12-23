! function() {
    "use strict";
  
    function e(e) {
      var t = this.constructor;
      return this.then(function(n) {
        return t.resolve(e()).then(function() {
          return n
        })
      }, function(n) {
        return t.resolve(e()).then(function() {
          return t.reject(n)
        })
      })
    }
    var t = setTimeout;
  
    function n() {}
  
    function r(e) {
      if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
      if ("function" != typeof e) throw new TypeError("not a function");
      this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], u(e, this)
    }
  
    function i(e, t) {
      for (; 3 === e._state;) e = e._value;
      0 !== e._state ? (e._handled = !0, r._immediateFn(function() {
        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
        if (null !== n) {
          var r;
          try {
            r = n(e._value)
          } catch (i) {
            return void a(t.promise, i)
          }
          o(t.promise, r)
        } else(1 === e._state ? o : a)(t.promise, e._value)
      })) : e._deferreds.push(t)
    }
  
    function o(e, t) {
      try {
        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
        if (t && ("object" == typeof t || "function" == typeof t)) {
          var n = t.then;
          if (t instanceof r) return e._state = 3, e._value = t, void s(e);
          if ("function" == typeof n) return void u((i = n, o = t, function() {
            i.apply(o, arguments)
          }), e)
        }
        e._state = 1, e._value = t, s(e)
      } catch (c) {
        a(e, c)
      }
      var i, o
    }
  
    function a(e, t) {
      e._state = 2, e._value = t, s(e)
    }
  
    function s(e) {
      2 === e._state && 0 === e._deferreds.length && r._immediateFn(function() {
        e._handled || r._unhandledRejectionFn(e._value)
      });
      for (var t = 0, n = e._deferreds.length; t < n; t++) i(e, e._deferreds[t]);
      e._deferreds = null
    }
  
    function c(e, t, n) {
      this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
    }
  
    function u(e, t) {
      var n = !1;
      try {
        e(function(e) {
          n || (n = !0, o(t, e))
        }, function(e) {
          n || (n = !0, a(t, e))
        })
      } catch (r) {
        if (n) return;
        n = !0, a(t, r)
      }
    }
    r.prototype["catch"] = function(e) {
      return this.then(null, e)
    }, r.prototype.then = function(e, t) {
      var r = new this.constructor(n);
      return i(this, new c(e, t, r)), r
    }, r.prototype["finally"] = e, r.all = function(e) {
      return new r(function(t, n) {
        if (!e || "undefined" == typeof e.length) throw new TypeError("Promise.all accepts an array");
        var r = Array.prototype.slice.call(e);
        if (0 === r.length) return t([]);
        var i = r.length;
  
        function o(e, a) {
          try {
            if (a && ("object" == typeof a || "function" == typeof a)) {
              var s = a.then;
              if ("function" == typeof s) return void s.call(a, function(t) {
                o(e, t)
              }, n)
            }
            r[e] = a, 0 == --i && t(r)
          } catch (c) {
            n(c)
          }
        }
        for (var a = 0; a < r.length; a++) o(a, r[a])
      })
    }, r.resolve = function(e) {
      return e && "object" == typeof e && e.constructor === r ? e : new r(function(t) {
        t(e)
      })
    }, r.reject = function(e) {
      return new r(function(t, n) {
        n(e)
      })
    }, r.race = function(e) {
      return new r(function(t, n) {
        for (var r = 0, i = e.length; r < i; r++) e[r].then(t, n)
      })
    }, r._immediateFn = "function" == typeof setImmediate && function(e) {
      setImmediate(e)
    } || function(e) {
      t(e, 0)
    }, r._unhandledRejectionFn = function(e) {
      "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    };
    var l, h = function() {
      if ("undefined" != typeof self) return self;
      if ("undefined" != typeof window) return window;
      if ("undefined" != typeof global) return global;
      throw new Error("unable to locate global object")
    }();
    "Promise" in h ? h.Promise.prototype["finally"] || (h.Promise.prototype["finally"] = e) : h.Promise = r, Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
      return function(t, n) {
        if (null === this || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined");
        var r = e(this),
          i = r.length >>> 0,
          o = Math.min(0 | n, i);
        if (o < 0) o = Math.max(0, i + o);
        else if (o >= i) return -1;
        if (void 0 === t) {
          for (; o !== i; ++o)
            if (void 0 === r[o] && o in r) return o
        } else if (t != t) {
          for (; o !== i; ++o)
            if (r[o] != r[o]) return o
        } else
          for (; o !== i; ++o)
            if (r[o] === t) return o;
        return -1
      }
    }(Object)), Array.isArray || (Array.isArray = function(e) {
      return "[object Array]" === Object.prototype.toString.call(e)
    }), document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function(e) {
      if (document.querySelectorAll) return document.querySelectorAll("." + e);
      for (var t = document.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + e + "(\\s|$)"), r = [], i = 0; i < t.length; i++) n.test(t[i].className) && r.push(t[i]);
      return r
    }), String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
      return this.substr(!t || t < 0 ? 0 : +t, e.length) === e
    }), String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
      return (t === undefined || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e
    });
    try {
      if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
        var d = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
        Object.defineProperty(Element.prototype, "textContent", {
          get: function() {
            return d.get.call(this)
          },
          set: function(e) {
            return d.set.call(this, e)
          }
        })
      }
    } catch (mt) {}
    Function.prototype.bind || (Function.prototype.bind = function(e) {
      if ("function" != typeof this) throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
      var t = Array.prototype.slice.call(arguments, 1),
        n = this,
        r = function() {},
        i = function() {
          return n.apply(this instanceof r ? this : e, t.concat(Array.prototype.slice.call(arguments)))
        };
      return this.prototype && (r.prototype = this.prototype), i.prototype = new r, i
    }), "function" != typeof Object.create && (Object.create = function(e, t) {
      function n() {}
      if (n.prototype = e, "object" == typeof t)
        for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
      return new n
    }), Date.now || (Date.now = function() {
      return (new Date).getTime()
    }), window.console || (window.console = {});
    for (var f, p, m = ["error", "info", "log", "show", "table", "trace", "warn"], v = function(e) {}, g = m.length; --g > -1;) l = m[g], window.console[l] || (window.console[l] = v);
    if (window.atob) try {
      window.atob(" ")
    } catch (vt) {
      window.atob = (f = window.atob, (p = function(e) {
        return f(String(e).replace(/[\t\n\f\r ]+/g, ""))
      }).original = f, p)
    } else {
      var y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        b = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
      window.atob = function(e) {
        if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !b.test(e)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
        var t, n, r;
        e += "==".slice(2 - (3 & e.length));
        for (var i = "", o = 0; o < e.length;) t = y.indexOf(e.charAt(o++)) << 18 | y.indexOf(e.charAt(o++)) << 12 | (n = y.indexOf(e.charAt(o++))) << 6 | (r = y.indexOf(e.charAt(o++))), i += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === r ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
        return i
      }
    }
  
    function w() {
      var e = this;
      this._bottom = 0, this._top = 0, this.storage = {}, this.add = function(t) {
        return e.storage[e._top] = t, e._top++, t
      }, this.remove = function() {
        if (!e.empty()) {
          var t = e._bottom,
            n = e.storage[t];
          return e.storage[t] = null, e._bottom++, n
        }
      }, this.empty = function() {
        return e._top === e._bottom
      }, this.size = function() {
        return e._top - e._bottom
      }
    }
    Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
        this.returnValue = !1
      }), Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
        this.cancelBubble = !0
      }),
      function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = e()
        }
      }(function() {
        return function e(t, n, r) {
          function i(a, s) {
            if (!n[a]) {
              if (!t[a]) {
                var c = "function" == typeof require && require;
                if (!s && c) return c(a, !0);
                if (o) return o(a, !0);
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND", u
              }
              var l = n[a] = {
                exports: {}
              };
              t[a][0].call(l.exports, function(e) {
                var n = t[a][1][e];
                return i(n || e)
              }, l, l.exports, e, t, n, r)
            }
            return n[a].exports
          }
          for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
          return i
        }({
          1: [function(e, t, n) {
            function r(e) {
              this.name = "RavenConfigError", this.message = e
            }
            r.prototype = new Error, r.prototype.constructor = r, t.exports = r
          }, {}],
          2: [function(e, t, n) {
            var r = e(5);
            t.exports = {
              wrapMethod: function(e, t, n) {
                var i = e[t],
                  o = e;
                if (t in e) {
                  var a = "warn" === t ? "warning" : t;
                  e[t] = function() {
                    var e = [].slice.call(arguments),
                      s = r.safeJoin(e, " "),
                      c = {
                        level: a,
                        logger: "console",
                        extra: {
                          arguments: e
                        }
                      };
                    "assert" === t ? !1 === e[0] && (s = "Assertion failed: " + (r.safeJoin(e.slice(1), " ") || "console.assert"), c.extra.arguments = e.slice(1), n && n(s, c)) : n && n(s, c), i && Function.prototype.apply.call(i, o, e)
                  }
                }
              }
            }
          }, {
            5: 5
          }],
          3: [function(e, t, n) {
            (function(n) {
              function r() {
                return +new Date
              }
  
              function i(e, t) {
                return y(t) ? function(n) {
                  return t(n, e)
                } : t
              }
  
              function o() {
                for (var e in this.a = !("object" != typeof JSON || !JSON.stringify), this.b = !g(H), this.c = !g(X), this.d = null, this.e = null, this.f = null, this.g = null, this.h = null, this.i = null, this.j = {}, this.k = {
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
                    referrerPolicy: B() ? "origin" : ""
                  }, this.m = 0, this.n = !1, this.o = Error.stackTraceLimit, this.p = q.console || {}, this.q = {}, this.r = [], this.s = r(), this.t = [], this.u = [], this.v = null, this.w = q.location, this.x = this.w && this.w.href, this.y(), this.p) this.q[e] = this.p[e]
              }
              var a = e(6),
                s = e(7),
                c = e(8),
                u = e(1),
                l = e(5),
                h = l.isErrorEvent,
                d = l.isDOMError,
                f = l.isDOMException,
                p = l.isError,
                m = l.isObject,
                v = l.isPlainObject,
                g = l.isUndefined,
                y = l.isFunction,
                b = l.isString,
                w = l.isArray,
                k = l.isEmptyObject,
                x = l.each,
                E = l.objectMerge,
                S = l.truncate,
                _ = l.objectFrozen,
                C = l.hasKey,
                O = l.joinRegExp,
                j = l.urlencode,
                A = l.uuid4,
                I = l.htmlTreeAsString,
                T = l.isSameException,
                M = l.isSameStacktrace,
                P = l.parseUrl,
                L = l.fill,
                R = l.supportsFetch,
                B = l.supportsReferrerPolicy,
                D = l.serializeKeysForMessage,
                U = l.serializeException,
                N = l.sanitize,
                F = e(2).wrapMethod,
                W = "source protocol user pass host port path".split(" "),
                z = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
                q = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                H = q.document,
                X = q.navigator;
              o.prototype = {
                VERSION: "3.27.2",
                debug: !1,
                TraceKit: a,
                config: function(e, t) {
                  var n = this;
                  if (n.g) return this.z("error", "Error: Raven has already been configured"), n;
                  if (!e) return n;
                  var r = n.k;
                  t && x(t, function(e, t) {
                    "tags" === e || "extra" === e || "user" === e ? n.j[e] = t : r[e] = t
                  }), n.setDSN(e), r.ignoreErrors.push(/^Script error\.?$/), r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), r.ignoreErrors = O(r.ignoreErrors), r.ignoreUrls = !!r.ignoreUrls.length && O(r.ignoreUrls), r.whitelistUrls = !!r.whitelistUrls.length && O(r.whitelistUrls), r.includePaths = O(r.includePaths), r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                  var i = {
                      xhr: !0,
                      console: !0,
                      dom: !0,
                      location: !0,
                      sentry: !0
                    },
                    o = r.autoBreadcrumbs;
                  "[object Object]" === {}.toString.call(o) ? o = E(i, o) : !1 !== o && (o = i), r.autoBreadcrumbs = o;
                  var s = {
                      tryCatch: !0
                    },
                    c = r.instrument;
                  return "[object Object]" === {}.toString.call(c) ? c = E(s, c) : !1 !== c && (c = s), r.instrument = c, a.collectWindowErrors = !!r.collectWindowErrors, n
                },
                install: function() {
                  var e = this;
                  return e.isSetup() && !e.n && (a.report.subscribe(function() {
                    e.A.apply(e, arguments)
                  }), e.k.captureUnhandledRejections && e.B(), e.C(), e.k.instrument && e.k.instrument.tryCatch && e.D(), e.k.autoBreadcrumbs && e.E(), e.F(), e.n = !0), Error.stackTraceLimit = e.k.stackTraceLimit, this
                },
                setDSN: function(e) {
                  var t = this,
                    n = t.G(e),
                    r = n.path.lastIndexOf("/"),
                    i = n.path.substr(1, r);
                  t.H = e, t.h = n.user, t.I = n.pass && n.pass.substr(1), t.i = n.path.substr(r + 1), t.g = t.J(n), t.K = t.g + "/" + i + "api/" + t.i + "/store/", this.y()
                },
                context: function(e, t, n) {
                  return y(e) && (n = t || [], t = e, e = {}), this.wrap(e, t).apply(this, n)
                },
                wrap: function(e, t, n) {
                  function r() {
                    var r = [],
                      o = arguments.length,
                      a = !e || e && !1 !== e.deep;
                    for (n && y(n) && n.apply(this, arguments); o--;) r[o] = a ? i.wrap(e, arguments[o]) : arguments[o];
                    try {
                      return t.apply(this, r)
                    } catch (s) {
                      throw i.L(), i.captureException(s, e), s
                    }
                  }
                  var i = this;
                  if (g(t) && !y(e)) return e;
                  if (y(e) && (t = e, e = void 0), !y(t)) return t;
                  try {
                    if (t.M) return t;
                    if (t.N) return t.N
                  } catch (o) {
                    return t
                  }
                  for (var a in t) C(t, a) && (r[a] = t[a]);
                  return r.prototype = t.prototype, t.N = r, r.M = !0, r.O = t, r
                },
                uninstall: function() {
                  return a.report.uninstall(), this.P(), this.Q(), this.R(), this.S(), Error.stackTraceLimit = this.o, this.n = !1, this
                },
                T: function(e) {
                  this.z("debug", "Raven caught unhandled promise rejection:", e), this.captureException(e.reason, {
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
                captureException: function(e, t) {
                  if (t = E({
                      trimHeadFrames: 0
                    }, t || {}), h(e) && e.error) e = e.error;
                  else {
                    if (d(e) || f(e)) {
                      var n = e.name || (d(e) ? "DOMError" : "DOMException"),
                        r = e.message ? n + ": " + e.message : n;
                      return this.captureMessage(r, E(t, {
                        stacktrace: !0,
                        trimHeadFrames: t.trimHeadFrames + 1
                      }))
                    }
                    if (p(e)) e = e;
                    else {
                      if (!v(e)) return this.captureMessage(e, E(t, {
                        stacktrace: !0,
                        trimHeadFrames: t.trimHeadFrames + 1
                      }));
                      t = this.U(t, e), e = new Error(t.message)
                    }
                  }
                  this.d = e;
                  try {
                    var i = a.computeStackTrace(e);
                    this.V(i, t)
                  } catch (o) {
                    if (e !== o) throw o
                  }
                  return this
                },
                U: function(e, t) {
                  var n = Object.keys(t).sort(),
                    r = E(e, {
                      message: "Non-Error exception captured with keys: " + D(n),
                      fingerprint: [c(n)],
                      extra: e.extra || {}
                    });
                  return r.extra.W = U(t), r
                },
                captureMessage: function(e, t) {
                  if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e)) {
                    var n, r = E({
                      message: e += ""
                    }, t = t || {});
                    try {
                      throw new Error(e)
                    } catch (i) {
                      n = i
                    }
                    n.name = null;
                    var o = a.computeStackTrace(n),
                      s = w(o.stack) && o.stack[1];
                    s && "Raven.captureException" === s.func && (s = o.stack[2]);
                    var c = s && s.url || "";
                    if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(c)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(c))) {
                      if (this.k.stacktrace || t.stacktrace || "" === r.message) {
                        r.fingerprint = null == r.fingerprint ? e : r.fingerprint, (t = E({
                          trimHeadFrames: 0
                        }, t)).trimHeadFrames += 1;
                        var u = this.X(o, t);
                        r.stacktrace = {
                          frames: u.reverse()
                        }
                      }
                      return r.fingerprint && (r.fingerprint = w(r.fingerprint) ? r.fingerprint : [r.fingerprint]), this.Y(r), this
                    }
                  }
                },
                captureBreadcrumb: function(e) {
                  var t = E({
                    timestamp: r() / 1e3
                  }, e);
                  if (y(this.k.breadcrumbCallback)) {
                    var n = this.k.breadcrumbCallback(t);
                    if (m(n) && !k(n)) t = n;
                    else if (!1 === n) return this
                  }
                  return this.u.push(t), this.u.length > this.k.maxBreadcrumbs && this.u.shift(), this
                },
                addPlugin: function(e) {
                  var t = [].slice.call(arguments, 1);
                  return this.r.push([e, t]), this.n && this.F(), this
                },
                setUserContext: function(e) {
                  return this.j.user = e, this
                },
                setExtraContext: function(e) {
                  return this.Z("extra", e), this
                },
                setTagsContext: function(e) {
                  return this.Z("tags", e), this
                },
                clearContext: function() {
                  return this.j = {}, this
                },
                getContext: function() {
                  return JSON.parse(s(this.j))
                },
                setEnvironment: function(e) {
                  return this.k.environment = e, this
                },
                setRelease: function(e) {
                  return this.k.release = e, this
                },
                setDataCallback: function(e) {
                  var t = this.k.dataCallback;
                  return this.k.dataCallback = i(t, e), this
                },
                setBreadcrumbCallback: function(e) {
                  var t = this.k.breadcrumbCallback;
                  return this.k.breadcrumbCallback = i(t, e), this
                },
                setShouldSendCallback: function(e) {
                  var t = this.k.shouldSendCallback;
                  return this.k.shouldSendCallback = i(t, e), this
                },
                setTransport: function(e) {
                  return this.k.transport = e, this
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
                  var e = q.RavenConfig;
                  e && this.config(e.dsn, e.config).install()
                },
                showReportDialog: function(e) {
                  if (H) {
                    if (!(e = E({
                        eventId: this.lastEventId(),
                        dsn: this.H,
                        user: this.j.user || {}
                      }, e)).eventId) throw new u("Missing eventId");
                    if (!e.dsn) throw new u("Missing DSN");
                    var t = encodeURIComponent,
                      n = [];
                    for (var r in e)
                      if ("user" === r) {
                        var i = e.user;
                        i.name && n.push("name=" + t(i.name)), i.email && n.push("email=" + t(i.email))
                      } else n.push(t(r) + "=" + t(e[r]));
                    var o = this.J(this.G(e.dsn)),
                      a = H.createElement("script");
                    a.async = !0, a.src = o + "/api/embed/error-page/?" + n.join("&"), (H.head || H.body).appendChild(a)
                  }
                },
                L: function() {
                  var e = this;
                  this.m += 1, setTimeout(function() {
                    e.m -= 1
                  })
                },
                $: function(e, t) {
                  var n, r;
                  if (this.b) {
                    for (r in t = t || {}, e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1), H.createEvent ? (n = H.createEvent("HTMLEvents")).initEvent(e, !0, !0) : (n = H.createEventObject()).eventType = e, t) C(t, r) && (n[r] = t[r]);
                    if (H.createEvent) H.dispatchEvent(n);
                    else try {
                      H.fireEvent("on" + n.eventType.toLowerCase(), n)
                    } catch (i) {}
                  }
                },
                _: function(e) {
                  var t = this;
                  return function(n) {
                    if (t.aa = null, t.v !== n) {
                      var r;
                      t.v = n;
                      try {
                        r = I(n.target)
                      } catch (i) {
                        r = "<unknown>"
                      }
                      t.captureBreadcrumb({
                        category: "ui." + e,
                        message: r
                      })
                    }
                  }
                },
                ba: function() {
                  var e = this;
                  return function(t) {
                    var n;
                    try {
                      n = t.target
                    } catch (i) {
                      return
                    }
                    var r = n && n.tagName;
                    if (r && ("INPUT" === r || "TEXTAREA" === r || n.isContentEditable)) {
                      var o = e.aa;
                      o || e._("input")(t), clearTimeout(o), e.aa = setTimeout(function() {
                        e.aa = null
                      }, 1e3)
                    }
                  }
                },
                ca: function(e, t) {
                  var n = P(this.w.href),
                    r = P(t),
                    i = P(e);
                  this.x = t, n.protocol === r.protocol && n.host === r.host && (t = r.relative), n.protocol === i.protocol && n.host === i.host && (e = i.relative), this.captureBreadcrumb({
                    category: "navigation",
                    data: {
                      to: t,
                      from: e
                    }
                  })
                },
                C: function() {
                  var e = this;
                  e.da = Function.prototype.toString, Function.prototype.toString = function() {
                    return "function" == typeof this && this.M ? e.da.apply(this.O, arguments) : e.da.apply(this, arguments)
                  }
                },
                Q: function() {
                  this.da && (Function.prototype.toString = this.da)
                },
                D: function() {
                  function e(e) {
                    return function(t, r) {
                      for (var i = new Array(arguments.length), o = 0; o < i.length; ++o) i[o] = arguments[o];
                      var a = i[0];
                      return y(a) && (i[0] = n.wrap({
                        mechanism: {
                          type: "instrument",
                          data: {
                            "function": e.name || "<anonymous>"
                          }
                        }
                      }, a)), e.apply ? e.apply(this, i) : e(i[0], i[1])
                    }
                  }
  
                  function t(e) {
                    var t = q[e] && q[e].prototype;
                    t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (L(t, "addEventListener", function(t) {
                      return function(r, o, a, s) {
                        try {
                          o && o.handleEvent && (o.handleEvent = n.wrap({
                            mechanism: {
                              type: "instrument",
                              data: {
                                target: e,
                                "function": "handleEvent",
                                handler: o && o.name || "<anonymous>"
                              }
                            }
                          }, o.handleEvent))
                        } catch (c) {}
                        var u, l, h;
                        return i && i.dom && ("EventTarget" === e || "Node" === e) && (l = n._("click"), h = n.ba(), u = function(e) {
                          if (e) {
                            var t;
                            try {
                              t = e.type
                            } catch (n) {
                              return
                            }
                            return "click" === t ? l(e) : "keypress" === t ? h(e) : void 0
                          }
                        }), t.call(this, r, n.wrap({
                          mechanism: {
                            type: "instrument",
                            data: {
                              target: e,
                              "function": "addEventListener",
                              handler: o && o.name || "<anonymous>"
                            }
                          }
                        }, o, u), a, s)
                      }
                    }, r), L(t, "removeEventListener", function(e) {
                      return function(t, n, r, i) {
                        try {
                          n = n && (n.N ? n.N : n)
                        } catch (o) {}
                        return e.call(this, t, n, r, i)
                      }
                    }, r))
                  }
                  var n = this,
                    r = n.t,
                    i = this.k.autoBreadcrumbs;
                  L(q, "setTimeout", e, r), L(q, "setInterval", e, r), q.requestAnimationFrame && L(q, "requestAnimationFrame", function(e) {
                    return function(t) {
                      return e(n.wrap({
                        mechanism: {
                          type: "instrument",
                          data: {
                            "function": "requestAnimationFrame",
                            handler: e && e.name || "<anonymous>"
                          }
                        }
                      }, t))
                    }
                  }, r);
                  for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < o.length; a++) t(o[a])
                },
                E: function() {
                  function e(e, n) {
                    e in n && y(n[e]) && L(n, e, function(n) {
                      return t.wrap({
                        mechanism: {
                          type: "instrument",
                          data: {
                            "function": e,
                            handler: n && n.name || "<anonymous>"
                          }
                        }
                      }, n)
                    })
                  }
                  var t = this,
                    n = this.k.autoBreadcrumbs,
                    r = t.t;
                  if (n.xhr && "XMLHttpRequest" in q) {
                    var i = q.XMLHttpRequest && q.XMLHttpRequest.prototype;
                    L(i, "open", function(e) {
                      return function(n, r) {
                        return b(r) && -1 === r.indexOf(t.h) && (this.ea = {
                          method: n,
                          url: r,
                          status_code: null
                        }), e.apply(this, arguments)
                      }
                    }, r), L(i, "send", function(n) {
                      return function() {
                        function r() {
                          if (i.ea && 4 === i.readyState) {
                            try {
                              i.ea.status_code = i.status
                            } catch (e) {}
                            t.captureBreadcrumb({
                              type: "http",
                              category: "xhr",
                              data: i.ea
                            })
                          }
                        }
                        for (var i = this, o = ["onload", "onerror", "onprogress"], a = 0; a < o.length; a++) e(o[a], i);
                        return "onreadystatechange" in i && y(i.onreadystatechange) ? L(i, "onreadystatechange", function(e) {
                          return t.wrap({
                            mechanism: {
                              type: "instrument",
                              data: {
                                "function": "onreadystatechange",
                                handler: e && e.name || "<anonymous>"
                              }
                            }
                          }, e, r)
                        }) : i.onreadystatechange = r, n.apply(this, arguments)
                      }
                    }, r)
                  }
                  n.xhr && R() && L(q, "fetch", function(e) {
                    return function() {
                      for (var n = new Array(arguments.length), r = 0; r < n.length; ++r) n[r] = arguments[r];
                      var i, o = n[0],
                        a = "GET";
                      if ("string" == typeof o ? i = o : "Request" in q && o instanceof q.Request ? (i = o.url, o.method && (a = o.method)) : i = "" + o, -1 !== i.indexOf(t.h)) return e.apply(this, n);
                      n[1] && n[1].method && (a = n[1].method);
                      var s = {
                        method: a,
                        url: i,
                        status_code: null
                      };
                      return e.apply(this, n).then(function(e) {
                        return s.status_code = e.status, t.captureBreadcrumb({
                          type: "http",
                          category: "fetch",
                          data: s
                        }), e
                      })["catch"](function(e) {
                        throw t.captureBreadcrumb({
                          type: "http",
                          category: "fetch",
                          data: s,
                          level: "error"
                        }), e
                      })
                    }
                  }, r), n.dom && this.b && (H.addEventListener ? (H.addEventListener("click", t._("click"), !1), H.addEventListener("keypress", t.ba(), !1)) : H.attachEvent && (H.attachEvent("onclick", t._("click")), H.attachEvent("onkeypress", t.ba())));
                  var o = q.chrome,
                    a = !(o && o.app && o.app.runtime) && q.history && q.history.pushState && q.history.replaceState;
                  if (n.location && a) {
                    var s = q.onpopstate;
                    q.onpopstate = function() {
                      var e = t.w.href;
                      if (t.ca(t.x, e), s) return s.apply(this, arguments)
                    };
                    var c = function(e) {
                      return function() {
                        var n = arguments.length > 2 ? arguments[2] : void 0;
                        return n && t.ca(t.x, n + ""), e.apply(this, arguments)
                      }
                    };
                    L(q.history, "pushState", c, r), L(q.history, "replaceState", c, r)
                  }
                  if (n.console && "console" in q && console.log) {
                    var u = function(e, n) {
                      t.captureBreadcrumb({
                        message: e,
                        level: n.level,
                        category: "console"
                      })
                    };
                    x(["debug", "info", "warn", "error", "log"], function(e, t) {
                      F(console, t, u)
                    })
                  }
                },
                R: function() {
                  for (var e; this.t.length;) {
                    var t = (e = this.t.shift())[0],
                      n = e[1],
                      r = e[2];
                    t[n] = r
                  }
                },
                S: function() {
                  for (var e in this.q) this.p[e] = this.q[e]
                },
                F: function() {
                  var e = this;
                  x(this.r, function(t, n) {
                    var r = n[0],
                      i = n[1];
                    r.apply(e, [e].concat(i))
                  })
                },
                G: function(e) {
                  var t = z.exec(e),
                    n = {},
                    r = 7;
                  try {
                    for (; r--;) n[W[r]] = t[r] || ""
                  } catch (i) {
                    throw new u("Invalid DSN: " + e)
                  }
                  if (n.pass && !this.k.allowSecretKey) throw new u("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                  return n
                },
                J: function(e) {
                  var t = "//" + e.host + (e.port ? ":" + e.port : "");
                  return e.protocol && (t = e.protocol + ":" + t), t
                },
                A: function(e, t) {
                  (t = t || {}).mechanism = t.mechanism || {
                    type: "onerror",
                    handled: !1
                  }, this.m || this.V(e, t)
                },
                V: function(e, t) {
                  var n = this.X(e, t);
                  this.$("handle", {
                    stackInfo: e,
                    options: t
                  }), this.fa(e.name, e.message, e.url, e.lineno, n, t)
                },
                X: function(e, t) {
                  var n = this,
                    r = [];
                  if (e.stack && e.stack.length && (x(e.stack, function(t, i) {
                      var o = n.ga(i, e.url);
                      o && r.push(o)
                    }), t && t.trimHeadFrames))
                    for (var i = 0; i < t.trimHeadFrames && i < r.length; i++) r[i].in_app = !1;
                  return r = r.slice(0, this.k.stackTraceLimit)
                },
                ga: function(e, t) {
                  var n = {
                    filename: e.url,
                    lineno: e.line,
                    colno: e.column,
                    "function": e.func || "?"
                  };
                  return e.url || (n.filename = t), n.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n["function"]) || /raven\.(min\.)?js$/.test(n.filename)), n
                },
                fa: function(e, t, n, r, i, o) {
                  var a, s = (e ? e + ": " : "") + (t || "");
                  if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t) && !this.k.ignoreErrors.test(s)) && (i && i.length ? (n = i[0].filename || n, i.reverse(), a = {
                      frames: i
                    }) : n && (a = {
                      frames: [{
                        filename: n,
                        lineno: r,
                        in_app: !0
                      }]
                    }), (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(n)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(n)))) {
                    var c = E({
                        exception: {
                          values: [{
                            type: e,
                            value: t,
                            stacktrace: a
                          }]
                        },
                        transaction: n
                      }, o),
                      u = c.exception.values[0];
                    null == u.type && "" === u.value && (u.value = "Unrecoverable error caught"), !c.exception.mechanism && c.mechanism && (c.exception.mechanism = c.mechanism, delete c.mechanism), c.exception.mechanism = E({
                      type: "generic",
                      handled: !0
                    }, c.exception.mechanism || {}), this.Y(c)
                  }
                },
                ha: function(e) {
                  var t = this.k.maxMessageLength;
                  if (e.message && (e.message = S(e.message, t)), e.exception) {
                    var n = e.exception.values[0];
                    n.value = S(n.value, t)
                  }
                  var r = e.request;
                  return r && (r.url && (r.url = S(r.url, this.k.maxUrlLength)), r.Referer && (r.Referer = S(r.Referer, this.k.maxUrlLength))), e.breadcrumbs && e.breadcrumbs.values && this.ia(e.breadcrumbs), e
                },
                ia: function(e) {
                  for (var t, n, r, i = ["to", "from", "url"], o = 0; o < e.values.length; ++o)
                    if ((n = e.values[o]).hasOwnProperty("data") && m(n.data) && !_(n.data)) {
                      r = E({}, n.data);
                      for (var a = 0; a < i.length; ++a) t = i[a], r.hasOwnProperty(t) && r[t] && (r[t] = S(r[t], this.k.maxUrlLength));
                      e.values[o].data = r
                    }
                },
                ja: function() {
                  if (this.c || this.b) {
                    var e = {};
                    return this.c && X.userAgent && (e.headers = {
                      "User-Agent": X.userAgent
                    }), q.location && q.location.href && (e.url = q.location.href), this.b && H.referrer && (e.headers || (e.headers = {}), e.headers.Referer = H.referrer), e
                  }
                },
                y: function() {
                  this.ka = 0, this.la = null
                },
                ma: function() {
                  return this.ka && r() - this.la < this.ka
                },
                na: function(e) {
                  var t = this.e;
                  return !(!t || e.message !== t.message || e.transaction !== t.transaction) && (e.stacktrace || t.stacktrace ? M(e.stacktrace, t.stacktrace) : e.exception || t.exception ? T(e.exception, t.exception) : !e.fingerprint && !t.fingerprint || Boolean(e.fingerprint && t.fingerprint) && JSON.stringify(e.fingerprint) === JSON.stringify(t.fingerprint))
                },
                oa: function(e) {
                  if (!this.ma()) {
                    var t = e.status;
                    if (400 === t || 401 === t || 429 === t) {
                      var n;
                      try {
                        n = R() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After"), n = 1e3 * parseInt(n, 10)
                      } catch (i) {}
                      this.ka = n || (2 * this.ka || 1e3), this.la = r()
                    }
                  }
                },
                Y: function(e) {
                  var t = this.k,
                    n = {
                      project: this.i,
                      logger: t.logger,
                      platform: "javascript"
                    },
                    i = this.ja();
                  if (i && (n.request = i), e.trimHeadFrames && delete e.trimHeadFrames, (e = E(n, e)).tags = E(E({}, this.j.tags), e.tags), e.extra = E(E({}, this.j.extra), e.extra), e.extra["session:duration"] = r() - this.s, this.u && this.u.length > 0 && (e.breadcrumbs = {
                      values: [].slice.call(this.u, 0)
                    }), this.j.user && (e.user = this.j.user), t.environment && (e.environment = t.environment), t.release && (e.release = t.release), t.serverName && (e.server_name = t.serverName), e = this.pa(e), Object.keys(e).forEach(function(t) {
                      (null == e[t] || "" === e[t] || k(e[t])) && delete e[t]
                    }), y(t.dataCallback) && (e = t.dataCallback(e) || e), e && !k(e) && (!y(t.shouldSendCallback) || t.shouldSendCallback(e))) return this.ma() ? void this.z("warn", "Raven dropped error due to backoff: ", e) : void("number" == typeof t.sampleRate ? Math.random() < t.sampleRate && this.qa(e) : this.qa(e))
                },
                pa: function(e) {
                  return N(e, this.k.sanitizeKeys)
                },
                ra: function() {
                  return A()
                },
                qa: function(e, t) {
                  var n = this,
                    r = this.k;
                  if (this.isSetup()) {
                    if (e = this.ha(e), !this.k.allowDuplicates && this.na(e)) return void this.z("warn", "Raven dropped repeat event: ", e);
                    this.f = e.event_id || (e.event_id = this.ra()), this.e = e, this.z("debug", "Raven about to send:", e);
                    var i = {
                      sentry_version: "7",
                      sentry_client: "raven-js/" + this.VERSION,
                      sentry_key: this.h
                    };
                    this.I && (i.sentry_secret = this.I);
                    var o = e.exception && e.exception.values[0];
                    this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                      category: "sentry",
                      message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                      event_id: e.event_id,
                      level: e.level || "error"
                    });
                    var a = this.K;
                    (r.transport || this._makeRequest).call(this, {
                      url: a,
                      auth: i,
                      data: e,
                      options: r,
                      onSuccess: function() {
                        n.y(), n.$("success", {
                          data: e,
                          src: a
                        }), t && t()
                      },
                      onError: function(r) {
                        n.z("error", "Raven transport failed to send: ", r), r.request && n.oa(r.request), n.$("failure", {
                          data: e,
                          src: a
                        }), r = r || new Error("Raven send failed (no additional details provided)"), t && t(r)
                      }
                    })
                  }
                },
                _makeRequest: function(e) {
                  var t = e.url + "?" + j(e.auth),
                    n = null,
                    r = {};
                  if (e.options.headers && (n = this.sa(e.options.headers)), e.options.fetchParameters && (r = this.sa(e.options.fetchParameters)), R()) {
                    r.body = s(e.data);
                    var i = E({}, this.l),
                      o = E(i, r);
                    return n && (o.headers = n), q.fetch(t, o).then(function(t) {
                      if (t.ok) e.onSuccess && e.onSuccess();
                      else {
                        var n = new Error("Sentry error code: " + t.status);
                        n.request = t, e.onError && e.onError(n)
                      }
                    })["catch"](function() {
                      e.onError && e.onError(new Error("Sentry error code: network unavailable"))
                    })
                  }
                  var a = q.XMLHttpRequest && new q.XMLHttpRequest;
                  a && (("withCredentials" in a || "undefined" != typeof XDomainRequest) && ("withCredentials" in a ? a.onreadystatechange = function() {
                    if (4 === a.readyState)
                      if (200 === a.status) e.onSuccess && e.onSuccess();
                      else if (e.onError) {
                      var t = new Error("Sentry error code: " + a.status);
                      t.request = a, e.onError(t)
                    }
                  } : (a = new XDomainRequest, t = t.replace(/^https?:/, ""), e.onSuccess && (a.onload = e.onSuccess), e.onError && (a.onerror = function() {
                    var t = new Error("Sentry error code: XDomainRequest");
                    t.request = a, e.onError(t)
                  })), a.open("POST", t), n && x(n, function(e, t) {
                    a.setRequestHeader(e, t)
                  }), a.send(s(e.data))))
                },
                sa: function(e) {
                  var t = {};
                  for (var n in e)
                    if (e.hasOwnProperty(n)) {
                      var r = e[n];
                      t[n] = "function" == typeof r ? r() : r
                    } return t
                },
                z: function(e) {
                  this.q[e] && (this.debug || this.k.debug) && Function.prototype.apply.call(this.q[e], this.p, [].slice.call(arguments, 1))
                },
                Z: function(e, t) {
                  g(t) ? delete this.j[e] : this.j[e] = E(this.j[e] || {}, t)
                }
              }, o.prototype.setUser = o.prototype.setUserContext, o.prototype.setReleaseContext = o.prototype.setRelease, t.exports = o
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            1: 1,
            2: 2,
            5: 5,
            6: 6,
            7: 7,
            8: 8
          }],
          4: [function(e, t, n) {
            (function(n) {
              var r = e(3),
                i = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                o = i.Raven,
                a = new r;
              a.noConflict = function() {
                return i.Raven = o, a
              }, a.afterLoad(), t.exports = a, t.exports.Client = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            3: 3
          }],
          5: [function(e, t, n) {
            (function(n) {
              function r(e) {
                switch (Object.prototype.toString.call(e)) {
                  case "[object Error]":
                  case "[object Exception]":
                  case "[object DOMException]":
                    return !0;
                  default:
                    return e instanceof Error
                }
              }
  
              function i(e) {
                return "[object DOMError]" === Object.prototype.toString.call(e)
              }
  
              function o(e) {
                return void 0 === e
              }
  
              function a(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
              }
  
              function s(e) {
                return "[object String]" === Object.prototype.toString.call(e)
              }
  
              function c(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
              }
  
              function u() {
                if (!("fetch" in w)) return !1;
                try {
                  return new Headers, new Request(""), new Response, !0
                } catch (e) {
                  return !1
                }
              }
  
              function l(e, t) {
                var n, r;
                if (o(e.length))
                  for (n in e) d(e, n) && t.call(null, n, e[n]);
                else if (r = e.length)
                  for (n = 0; n < r; n++) t.call(null, n, e[n])
              }
  
              function h(e, t) {
                if ("number" != typeof t) throw new Error("2nd argument to `truncate` function should be a number");
                return "string" != typeof e || 0 === t ? e : e.length <= t ? e : e.substr(0, t) + "…"
              }
  
              function d(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
              }
  
              function f(e) {
                for (var t, n = [], r = 0, i = e.length; r < i; r++) s(t = e[r]) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
                return new RegExp(n.join("|"), "i")
              }
  
              function p(e) {
                var t, n, r, i, o, a = [];
                if (!e || !e.tagName) return "";
                if (a.push(e.tagName.toLowerCase()), e.id && a.push("#" + e.id), (t = e.className) && s(t))
                  for (n = t.split(/\s+/), o = 0; o < n.length; o++) a.push("." + n[o]);
                var c = ["type", "name", "title", "alt"];
                for (o = 0; o < c.length; o++) r = c[o], (i = e.getAttribute(r)) && a.push("[" + r + '="' + i + '"]');
                return a.join("")
              }
  
              function m(e, t) {
                return !!(!!e ^ !!t)
              }
  
              function v(e, t) {
                if (m(e, t)) return !1;
                var n = e.frames,
                  r = t.frames;
                if (void 0 === n || void 0 === r) return !1;
                if (n.length !== r.length) return !1;
                for (var i, o, a = 0; a < n.length; a++)
                  if (i = n[a], o = r[a], i.filename !== o.filename || i.lineno !== o.lineno || i.colno !== o.colno || i["function"] !== o["function"]) return !1;
                return !0
              }
  
              function g(e) {
                return function(e) {
                  return ~-encodeURI(e).split(/%..|./).length
                }(JSON.stringify(e))
              }
  
              function y(e) {
                if ("string" == typeof e) {
                  return h(e, 40)
                }
                if ("number" == typeof e || "boolean" == typeof e || void 0 === e) return e;
                var t = Object.prototype.toString.call(e);
                return "[object Object]" === t ? "[Object]" : "[object Array]" === t ? "[Array]" : "[object Function]" === t ? e.name ? "[Function: " + e.name + "]" : "[Function]" : e
              }
              var b = e(7),
                w = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                k = 3,
                x = 51200,
                E = 40;
              t.exports = {
                isObject: function(e) {
                  return "object" == typeof e && null !== e
                },
                isError: r,
                isErrorEvent: function(e) {
                  return "[object ErrorEvent]" === Object.prototype.toString.call(e)
                },
                isDOMError: i,
                isDOMException: function(e) {
                  return "[object DOMException]" === Object.prototype.toString.call(e)
                },
                isUndefined: o,
                isFunction: function(e) {
                  return "function" == typeof e
                },
                isPlainObject: a,
                isString: s,
                isArray: c,
                isEmptyObject: function(e) {
                  if (!a(e)) return !1;
                  for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
                  return !0
                },
                supportsErrorEvent: function() {
                  try {
                    return new ErrorEvent(""), !0
                  } catch (e) {
                    return !1
                  }
                },
                supportsDOMError: function() {
                  try {
                    return new DOMError(""), !0
                  } catch (e) {
                    return !1
                  }
                },
                supportsDOMException: function() {
                  try {
                    return new DOMException(""), !0
                  } catch (e) {
                    return !1
                  }
                },
                supportsFetch: u,
                supportsReferrerPolicy: function() {
                  if (!u()) return !1;
                  try {
                    return new Request("pickleRick", {
                      referrerPolicy: "origin"
                    }), !0
                  } catch (e) {
                    return !1
                  }
                },
                supportsPromiseRejectionEvent: function() {
                  return "function" == typeof PromiseRejectionEvent
                },
                wrappedCallback: function(e) {
                  return function(t, n) {
                    var r = e(t) || t;
                    return n && n(r) || r
                  }
                },
                each: l,
                objectMerge: function(e, t) {
                  return t ? (l(t, function(t, n) {
                    e[t] = n
                  }), e) : e
                },
                truncate: h,
                objectFrozen: function(e) {
                  return !!Object.isFrozen && Object.isFrozen(e)
                },
                hasKey: d,
                joinRegExp: f,
                urlencode: function(e) {
                  var t = [];
                  return l(e, function(e, n) {
                    t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                  }), t.join("&")
                },
                uuid4: function() {
                  var e = w.crypto || w.msCrypto;
                  if (!o(e) && e.getRandomValues) {
                    var t = new Uint16Array(8);
                    e.getRandomValues(t), t[3] = 4095 & t[3] | 16384, t[4] = 16383 & t[4] | 32768;
                    var n = function(e) {
                      for (var t = e.toString(16); t.length < 4;) t = "0" + t;
                      return t
                    };
                    return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
                  }
                  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16)
                  })
                },
                htmlTreeAsString: function(e) {
                  for (var t, n = [], r = 0, i = 0, o = " > ".length; e && r++ < 5 && !("html" === (t = p(e)) || r > 1 && i + n.length * o + t.length >= 80);) n.push(t), i += t.length, e = e.parentNode;
                  return n.reverse().join(" > ")
                },
                htmlElementAsString: p,
                isSameException: function(e, t) {
                  return !m(e, t) && (e = e.values[0], t = t.values[0], e.type === t.type && e.value === t.value && ! function(e, t) {
                    return o(e) && o(t)
                  }(e.stacktrace, t.stacktrace) && v(e.stacktrace, t.stacktrace))
                },
                isSameStacktrace: v,
                parseUrl: function(e) {
                  if ("string" != typeof e) return {};
                  var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                    n = t[6] || "",
                    r = t[8] || "";
                  return {
                    protocol: t[2],
                    host: t[4],
                    path: t[5],
                    relative: t[5] + n + r
                  }
                },
                fill: function(e, t, n, r) {
                  if (null != e) {
                    var i = e[t];
                    e[t] = n(i), e[t].M = !0, e[t].O = i, r && r.push([e, t, i])
                  }
                },
                safeJoin: function(e, t) {
                  if (!c(e)) return "";
                  for (var n = [], i = 0; i < e.length; i++) try {
                    n.push(String(e[i]))
                  } catch (r) {
                    n.push("[value cannot be serialized]")
                  }
                  return n.join(t)
                },
                serializeException: function S(e, t, n) {
                  if (!a(e)) return e;
                  n = "number" != typeof(t = "number" != typeof t ? k : t) ? x : n;
                  var r = function i(e, t) {
                    return 0 === t ? y(e) : a(e) ? Object.keys(e).reduce(function(n, r) {
                      return n[r] = i(e[r], t - 1), n
                    }, {}) : Array.isArray(e) ? e.map(function(e) {
                      return i(e, t - 1)
                    }) : y(e)
                  }(e, t);
                  return g(b(r)) > n ? S(e, t - 1) : r
                },
                serializeKeysForMessage: function(e, t) {
                  if ("number" == typeof e || "string" == typeof e) return e.toString();
                  if (!Array.isArray(e)) return "";
                  if (0 === (e = e.filter(function(e) {
                      return "string" == typeof e
                    })).length) return "[object has no keys]";
                  if (t = "number" != typeof t ? E : t, e[0].length >= t) return e[0];
                  for (var n = e.length; n > 0; n--) {
                    var r = e.slice(0, n).join(", ");
                    if (!(r.length > t)) return n === e.length ? r : r + "…"
                  }
                  return ""
                },
                sanitize: function(e, t) {
                  if (!c(t) || c(t) && 0 === t.length) return e;
                  var n, r = f(t),
                    o = "********";
                  try {
                    n = JSON.parse(b(e))
                  } catch (i) {
                    return e
                  }
                  return function s(e) {
                    return c(e) ? e.map(function(e) {
                      return s(e)
                    }) : a(e) ? Object.keys(e).reduce(function(t, n) {
                      return t[n] = r.test(n) ? o : s(e[n]), t
                    }, {}) : e
                  }(n)
                }
              }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            7: 7
          }],
          6: [function(e, t, n) {
            (function(n) {
              function r() {
                return "undefined" == typeof document || null == document.location ? "" : document.location.href
              }
              var i = e(5),
                o = {
                  collectWindowErrors: !0,
                  debug: !1
                },
                a = "undefined" != typeof window ? window : void 0 !== n ? n : "undefined" != typeof self ? self : {},
                s = [].slice,
                c = "?",
                u = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
              o.report = function() {
                function e(t, n) {
                  var r = null;
                  if (!n || o.collectWindowErrors) {
                    for (var i in f)
                      if (f.hasOwnProperty(i)) try {
                        f[i].apply(null, [t].concat(s.call(arguments, 2)))
                      } catch (e) {
                        r = e
                      }
                    if (r) throw r
                  }
                }
  
                function t(t, a, s, l, d) {
                  var f = i.isErrorEvent(d) ? d.error : d,
                    p = i.isErrorEvent(t) ? t.message : t;
                  if (v) o.computeStackTrace.augmentStackTraceWithInitialElement(v, a, s, p), n();
                  else if (f && i.isError(f)) e(o.computeStackTrace(f), !0);
                  else {
                    var m, g = {
                        url: a,
                        line: s,
                        column: l
                      },
                      y = void 0;
                    if ("[object String]" === {}.toString.call(p))(m = p.match(u)) && (y = m[1], p = m[2]);
                    g.func = c, e({
                      name: y,
                      message: p,
                      url: r(),
                      stack: [g]
                    }, !0)
                  }
                  return !!h && h.apply(this, arguments)
                }
  
                function n() {
                  var t = v,
                    n = p;
                  p = null, v = null, m = null, e.apply(null, [t, !1].concat(n))
                }
  
                function l(e, t) {
                  var r = s.call(arguments, 1);
                  if (v) {
                    if (m === e) return;
                    n()
                  }
                  var i = o.computeStackTrace(e);
                  if (v = i, m = e, p = r, setTimeout(function() {
                      m === e && n()
                    }, i.incomplete ? 2e3 : 0), !1 !== t) throw e
                }
                var h, d, f = [],
                  p = null,
                  m = null,
                  v = null;
                return l.subscribe = function(e) {
                  d || (h = a.onerror, a.onerror = t, d = !0), f.push(e)
                }, l.unsubscribe = function(e) {
                  for (var t = f.length - 1; t >= 0; --t) f[t] === e && f.splice(t, 1)
                }, l.uninstall = function() {
                  d && (a.onerror = h, d = !1, h = void 0), f = []
                }, l
              }(), o.computeStackTrace = function() {
                function e(e) {
                  if ("undefined" != typeof e.stack && e.stack) {
                    for (var t, n, i, o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, u = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, l = /\((\S*)(?::(\d+))(?::(\d+))\)/, h = e.stack.split("\n"), d = [], f = (/^(.*) is undefined$/.exec(e.message), 0), p = h.length; f < p; ++f) {
                      if (n = o.exec(h[f])) {
                        var m = n[2] && 0 === n[2].indexOf("native");
                        n[2] && 0 === n[2].indexOf("eval") && (t = l.exec(n[2])) && (n[2] = t[1], n[3] = t[2], n[4] = t[3]), i = {
                          url: m ? null : n[2],
                          func: n[1] || c,
                          args: m ? [n[2]] : [],
                          line: n[3] ? +n[3] : null,
                          column: n[4] ? +n[4] : null
                        }
                      } else if (n = a.exec(h[f])) i = {
                        url: n[2],
                        func: n[1] || c,
                        args: [],
                        line: +n[3],
                        column: n[4] ? +n[4] : null
                      };
                      else {
                        if (!(n = s.exec(h[f]))) continue;
                        n[3] && n[3].indexOf(" > eval") > -1 && (t = u.exec(n[3])) ? (n[3] = t[1], n[4] = t[2], n[5] = null) : 0 !== f || n[5] || "undefined" == typeof e.columnNumber || (d[0].column = e.columnNumber + 1), i = {
                          url: n[3],
                          func: n[1] || c,
                          args: n[2] ? n[2].split(",") : [],
                          line: n[4] ? +n[4] : null,
                          column: n[5] ? +n[5] : null
                        }
                      }
                      if (!i.func && i.line && (i.func = c), i.url && "blob:" === i.url.substr(0, 5)) {
                        var v = new XMLHttpRequest;
                        if (v.open("GET", i.url, !1), v.send(null), 200 === v.status) {
                          var g = v.responseText || "",
                            y = (g = g.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                          if (y) {
                            var b = y[1];
                            "~" === b.charAt(0) && (b = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + b.slice(1)), i.url = b.slice(0, -4)
                          }
                        }
                      }
                      d.push(i)
                    }
                    return d.length ? {
                      name: e.name,
                      message: e.message,
                      url: r(),
                      stack: d
                    } : null
                  }
                }
  
                function t(e, t, n, r) {
                  var i = {
                    url: t,
                    line: n
                  };
                  if (i.url && i.line) {
                    if (e.incomplete = !1, i.func || (i.func = c), e.stack.length > 0 && e.stack[0].url === i.url) {
                      if (e.stack[0].line === i.line) return !1;
                      if (!e.stack[0].line && e.stack[0].func === i.func) return e.stack[0].line = i.line, !1
                    }
                    return e.stack.unshift(i), e.partial = !0, !0
                  }
                  return e.incomplete = !0, !1
                }
  
                function n(e, a) {
                  for (var s, u, l = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, h = [], d = {}, f = !1, p = n.caller; p && !f; p = p.caller)
                    if (p !== i && p !== o.report) {
                      if (u = {
                          url: null,
                          func: c,
                          line: null,
                          column: null
                        }, p.name ? u.func = p.name : (s = l.exec(p.toString())) && (u.func = s[1]), "undefined" == typeof u.func) try {
                        u.func = s.input.substring(0, s.input.indexOf("{"))
                      } catch (v) {}
                      d["" + p] ? f = !0 : d["" + p] = !0, h.push(u)
                    } a && h.splice(0, a);
                  var m = {
                    name: e.name,
                    message: e.message,
                    url: r(),
                    stack: h
                  };
                  return t(m, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), m
                }
  
                function i(t, i) {
                  var s = null;
                  i = null == i ? 0 : +i;
                  try {
                    if (s = e(t)) return s
                  } catch (a) {
                    if (o.debug) throw a
                  }
                  try {
                    if (s = n(t, i + 1)) return s
                  } catch (a) {
                    if (o.debug) throw a
                  }
                  return {
                    name: t.name,
                    message: t.message,
                    url: r()
                  }
                }
                return i.augmentStackTraceWithInitialElement = t, i.computeStackTraceFromStackProp = e, i
              }(), t.exports = o
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
          }, {
            5: 5
          }],
          7: [function(e, t, n) {
            function r(e, t) {
              for (var n = 0; n < e.length; ++n)
                if (e[n] === t) return n;
              return -1
            }
  
            function i(e, t) {
              var n = [],
                i = [];
              return null == t && (t = function(e, t) {
                  return n[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, r(n, t)).join(".") + "]"
                }),
                function(o, a) {
                  if (n.length > 0) {
                    var s = r(n, this);
                    ~s ? n.splice(s + 1) : n.push(this), ~s ? i.splice(s, 1 / 0, o) : i.push(o), ~r(n, a) && (a = t.call(this, o, a))
                  } else n.push(a);
                  return null == e ? a instanceof Error ? function(e) {
                    var t = {
                      stack: e.stack,
                      message: e.message,
                      name: e.name
                    };
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t
                  }(a) : a : e.call(this, o, a)
                }
            }(t.exports = function(e, t, n, r) {
              return JSON.stringify(e, i(t, r), n)
            }).getSerialize = i
          }, {}],
          8: [function(e, t, n) {
            function r(e, t) {
              var n = (65535 & e) + (65535 & t);
              return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
            }
  
            function i(e, t, n, i, o, a) {
              return r(function(e, t) {
                return e << t | e >>> 32 - t
              }(r(r(t, e), r(i, a)), o), n)
            }
  
            function o(e, t, n, r, o, a, s) {
              return i(t & n | ~t & r, e, t, o, a, s)
            }
  
            function a(e, t, n, r, o, a, s) {
              return i(t & r | n & ~r, e, t, o, a, s)
            }
  
            function s(e, t, n, r, o, a, s) {
              return i(t ^ n ^ r, e, t, o, a, s)
            }
  
            function c(e, t, n, r, o, a, s) {
              return i(n ^ (t | ~r), e, t, o, a, s)
            }
  
            function u(e, t) {
              e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
              var n, i, u, l, h, d = 1732584193,
                f = -271733879,
                p = -1732584194,
                m = 271733878;
              for (n = 0; n < e.length; n += 16) i = d, u = f, l = p, h = m, d = o(d, f, p, m, e[n], 7, -680876936), m = o(m, d, f, p, e[n + 1], 12, -389564586), p = o(p, m, d, f, e[n + 2], 17, 606105819), f = o(f, p, m, d, e[n + 3], 22, -1044525330), d = o(d, f, p, m, e[n + 4], 7, -176418897), m = o(m, d, f, p, e[n + 5], 12, 1200080426), p = o(p, m, d, f, e[n + 6], 17, -1473231341), f = o(f, p, m, d, e[n + 7], 22, -45705983), d = o(d, f, p, m, e[n + 8], 7, 1770035416), m = o(m, d, f, p, e[n + 9], 12, -1958414417), p = o(p, m, d, f, e[n + 10], 17, -42063), f = o(f, p, m, d, e[n + 11], 22, -1990404162), d = o(d, f, p, m, e[n + 12], 7, 1804603682), m = o(m, d, f, p, e[n + 13], 12, -40341101), p = o(p, m, d, f, e[n + 14], 17, -1502002290), d = a(d, f = o(f, p, m, d, e[n + 15], 22, 1236535329), p, m, e[n + 1], 5, -165796510), m = a(m, d, f, p, e[n + 6], 9, -1069501632), p = a(p, m, d, f, e[n + 11], 14, 643717713), f = a(f, p, m, d, e[n], 20, -373897302), d = a(d, f, p, m, e[n + 5], 5, -701558691), m = a(m, d, f, p, e[n + 10], 9, 38016083), p = a(p, m, d, f, e[n + 15], 14, -660478335), f = a(f, p, m, d, e[n + 4], 20, -405537848), d = a(d, f, p, m, e[n + 9], 5, 568446438), m = a(m, d, f, p, e[n + 14], 9, -1019803690), p = a(p, m, d, f, e[n + 3], 14, -187363961), f = a(f, p, m, d, e[n + 8], 20, 1163531501), d = a(d, f, p, m, e[n + 13], 5, -1444681467), m = a(m, d, f, p, e[n + 2], 9, -51403784), p = a(p, m, d, f, e[n + 7], 14, 1735328473), d = s(d, f = a(f, p, m, d, e[n + 12], 20, -1926607734), p, m, e[n + 5], 4, -378558), m = s(m, d, f, p, e[n + 8], 11, -2022574463), p = s(p, m, d, f, e[n + 11], 16, 1839030562), f = s(f, p, m, d, e[n + 14], 23, -35309556), d = s(d, f, p, m, e[n + 1], 4, -1530992060), m = s(m, d, f, p, e[n + 4], 11, 1272893353), p = s(p, m, d, f, e[n + 7], 16, -155497632), f = s(f, p, m, d, e[n + 10], 23, -1094730640), d = s(d, f, p, m, e[n + 13], 4, 681279174), m = s(m, d, f, p, e[n], 11, -358537222), p = s(p, m, d, f, e[n + 3], 16, -722521979), f = s(f, p, m, d, e[n + 6], 23, 76029189), d = s(d, f, p, m, e[n + 9], 4, -640364487), m = s(m, d, f, p, e[n + 12], 11, -421815835), p = s(p, m, d, f, e[n + 15], 16, 530742520), d = c(d, f = s(f, p, m, d, e[n + 2], 23, -995338651), p, m, e[n], 6, -198630844), m = c(m, d, f, p, e[n + 7], 10, 1126891415), p = c(p, m, d, f, e[n + 14], 15, -1416354905), f = c(f, p, m, d, e[n + 5], 21, -57434055), d = c(d, f, p, m, e[n + 12], 6, 1700485571), m = c(m, d, f, p, e[n + 3], 10, -1894986606), p = c(p, m, d, f, e[n + 10], 15, -1051523), f = c(f, p, m, d, e[n + 1], 21, -2054922799), d = c(d, f, p, m, e[n + 8], 6, 1873313359), m = c(m, d, f, p, e[n + 15], 10, -30611744), p = c(p, m, d, f, e[n + 6], 15, -1560198380), f = c(f, p, m, d, e[n + 13], 21, 1309151649), d = c(d, f, p, m, e[n + 4], 6, -145523070), m = c(m, d, f, p, e[n + 11], 10, -1120210379), p = c(p, m, d, f, e[n + 2], 15, 718787259), f = c(f, p, m, d, e[n + 9], 21, -343485551), d = r(d, i), f = r(f, u), p = r(p, l), m = r(m, h);
              return [d, f, p, m]
            }
  
            function l(e) {
              var t, n = "",
                r = 32 * e.length;
              for (t = 0; t < r; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
              return n
            }
  
            function h(e) {
              var t, n = [];
              for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
              var r = 8 * e.length;
              for (t = 0; t < r; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
              return n
            }
  
            function d(e) {
              var t, n, r = "0123456789abcdef",
                i = "";
              for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
              return i
            }
  
            function f(e) {
              return unescape(encodeURIComponent(e))
            }
  
            function p(e) {
              return function(e) {
                return l(u(h(e), 8 * e.length))
              }(f(e))
            }
  
            function m(e, t) {
              return function(e, t) {
                var n, r, i = h(e),
                  o = [],
                  a = [];
                for (o[15] = a[15] = void 0, i.length > 16 && (i = u(i, 8 * e.length)), n = 0; n < 16; n += 1) o[n] = 909522486 ^ i[n], a[n] = 1549556828 ^ i[n];
                return r = u(o.concat(h(t)), 512 + 8 * t.length), l(u(a.concat(r), 640))
              }(f(e), f(t))
            }
            t.exports = function(e, t, n) {
              return t ? n ? m(t, e) : function(e, t) {
                return d(m(e, t))
              }(t, e) : n ? p(e) : function(e) {
                return d(p(e))
              }(e)
            }
          }, {}]
        }, {}, [4])(4)
      });
    var k = {
      queue: w,
      depth: function gt(e, t, n) {
        if ("object" == typeof e && e[t] && e[t].length > 0)
          for (var r = e[t].length; --r > -1;) gt(e[t][r], t, n);
        e !== undefined && n(e)
      },
      breathe: function(e, t, n) {
        var r = new w,
          i = null;
        for (r.add(e), i = r.remove(); i;) {
          for (var o = 0; o < i[t].length; o++) r.add(i[t][o]);
          n(i), i = r.remove()
        }
      }
    };
  
    function x() {
      this.children = [], this._events = []
    }
    x.prototype.initComponent = function(e, t) {
      var n = new e(t);
      return n._parent = this, this.children.push(n), n
    }, x.prototype.destroy = function() {
      var e = this;
      try {
        k.depth(this, "children", function(t) {
          if (e !== t)
            for (var n = e.children.length; --n > -1;) e.children[n] === t && e.children.splice(n, 1);
          t._destroy && t._destroy(), t = null
        })
      } catch (vt) {
        throw new Error("Trouble destroying nodes: " + vt)
      }
      return null
    }, x.prototype._destroy = function() {
      this.onDestroy && this.onDestroy();
      for (var e = this._events.length || 0; --e > -1;) this._events.splice(e, 1);
      this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
    }, x.prototype.on = function(e, t) {
      for (var n = this._events.length, r = !1; --n > -1 && !1 === r;) this._events[n].event === e && (r = this._events[n]);
      !1 === r && (r = {
        event: e,
        listeners: []
      }, this._events.push(r)), r.listeners.push(t)
    }, x.prototype.off = function(e, t) {
      for (var n = this._events.length; --n > -1;)
        if (this._events[n].event === e) {
          for (var r = this._events[n].listeners.length; --r > -1;) this._events[n].listeners[r] === t && this._events[n].listeners[r].splice(r, 1);
          0 === this._events[n].listeners.length && this._events[n].splice(n, 1)
        }
    }, x.prototype.emit = function(e) {
      for (var t = Array.prototype.slice.call(arguments, 1), n = this._events.length; --n > -1;)
        if (this._events[n].event === e)
          for (var r = this._events[n].listeners.length; --r > -1;) this._events[n].listeners[r].apply(this, t)
    };
    var E = [{
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
      S = [{
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
      _ = navigator.userAgent,
      C = {
        getAgent: function() {
          return _
        },
        getBrowser: function(e) {
          return j(e || _, E)
        },
        getOS: function(e) {
          return j(e || _, S)
        }
      };
  
    function O(e, t) {
      try {
        var n = new RegExp(t).exec(e);
        return n ? {
          name: n[1] || "Other",
          major: n[2] || "0",
          minor: n[3] || "0",
          patch: n[4] || "0"
        } : null
      } catch (vt) {
        return null
      }
    }
  
    function j(e, t) {
      for (var n = null, r = null, i = -1, o = !1; ++i < t.length && !o;) {
        n = t[i];
        for (var a = -1; ++a < n.patterns.length && !o;) o = null !== (r = O(e, n.patterns[a]))
      }
      return o ? (r.family = n.family || n.name_replace || r.name, n.name_replace && (r.name = n.name_replace), n.major_replace && (r.major = n.major_replace), n.minor_replace && (r.minor = n.minor_replace), n.patch_replace && (r.minor = n.patch_replace), r) : {
        family: "Other",
        name: "Other",
        major: "0",
        minor: "0",
        patch: "0"
      }
    }
  
    function A() {
      var e = this,
        t = C.getBrowser(),
        n = C.getAgent();
      this.agent = n.toLowerCase(), this.language = window.navigator.userLanguage || window.navigator.language, this.isCSS1 = "CSS1Compat" === (document.compatMode || ""), this.width = function() {
        return window.innerWidth && window.document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth
      }, this.height = function() {
        return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight
      }, this.scrollX = function() {
        return window.pageXOffset !== undefined ? window.pageXOffset : e.isCSS1 ? document.documentElement.scrollLeft : document.body.scrollLeft
      }, this.scrollY = function() {
        return window.pageYOffset !== undefined ? window.pageYOffset : e.isCSS1 ? document.documentElement.scrollTop : document.body.scrollTop
      }, this.type = "Edge" === t.family ? "edge" : "Internet Explorer" === t.family ? "ie" : "Chrome" === t.family ? "chrome" : "Safari" === t.family ? "safari" : "Firefox" === t.family ? "firefox" : t.family.toLowerCase(), this.version = 1 * (t.major + "." + t.minor) || 0, this.hasPostMessage = !!window.postMessage
    }
    A.prototype.hasEvent = function(e, t) {
      return "on" + e in (t || document.createElement("div"))
    }, A.prototype.getScreenDimensions = function() {
      var e = {};
      for (var t in window.screen) e[t] = window.screen[t];
      return delete e.orientation, e
    }, A.prototype.interrogateNavigator = function() {
      var e = {};
      for (var t in window.navigator) try {
        e[t] = window.navigator[t]
      } catch (mt) {}
      if (delete e.plugins, delete e.mimeTypes, e.plugins = [], window.navigator.plugins)
        for (var n = 0; n < window.navigator.plugins.length; n++) e.plugins[n] = window.navigator.plugins[n].filename;
      return e
    }, A.prototype.supportsCanvas = function() {
      var e = document.createElement("canvas");
      return !(!e.getContext || !e.getContext("2d"))
    }, A.prototype.supportsWebAssembly = function() {
      try {
        if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
          var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
          if (e instanceof WebAssembly.Module) return new WebAssembly.Instance(e) instanceof WebAssembly.Instance
        }
      } catch (vt) {
        return !1
      }
    };
    var I = {
        Browser: new A,
        System: new function() {
          var e, t, n = C.getOS(),
            r = C.getAgent();
          this.mobile = (e = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), t = !1, n && (t = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(n.name) >= 0), e && t), this.dpr = function() {
            return window.devicePixelRatio || 1
          }, this.mobile && n && "Windows" === n.family && r.indexOf("touch") < 0 && (this.mobile = !1), this.os = "iOS" === n.family ? "ios" : "Android" === n.family ? "android" : "Mac OS X" === n.family ? "mac" : "Windows" === n.family ? "windows" : "Linux" === n.family ? "linux" : n.family.toLowerCase(), this.version = function() {
            if (!n) return "unknown";
            var e = n.major;
            return n.minor && (e += "." + n.minor), n.patch && (e += "." + n.patch), e
          }()
        }
      },
      T = {
        host: null,
        file: null,
        sitekey: null,
        pingdom: "safari" === I.Browser.type && "windows" !== I.System.os && "mac" !== I.System.os && "ios" !== I.System.os && "android" !== I.System.os,
        assetDomain: "https://assets.hcaptcha.com",
        assetUrl: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static",
        width: null,
        height: null,
        mobile: null
      },
      M = {
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
  
    function P(e) {
      var t = {
        message: e.name + ": " + e.message
      };
      e.stack && (t.stack_trace = {
        trace: e.stack
      }), R("report error", "internal", "debug", t), L("internal error", "error", T.file)
    }
  
    function L(e, t, n, r) {
      window.Raven && Raven.captureMessage(e, {
        level: t,
        logger: n
      })
    }
  
    function R(e, t, n, r) {
      window.Raven && Raven.captureBreadcrumb({
        message: e,
        category: t,
        level: n,
        data: r
      })
    }
    var B = {
      UUID: function(e) {
        return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(e) || !1
      },
      UUIDv4: function(e) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e) || !1
      }
    };
  
    function D(e, t) {
      var n, r = "attempts" in (t = t || {}) ? t.attempts : 1,
        i = t.delay || 0,
        o = t.onFail;
      return n = function(t, n, a) {
        e().then(t, function(e) {
          var t = r-- > 0;
          o && (t = !1 !== o(e) && t), t ? setTimeout(a, i) : n(e)
        })
      }, new Promise(function(e, t) {
        n(e, t, function r() {
          n(e, t, r)
        })
      })
    }
    var U = {
        eventName: function(e) {
          var t = e;
          return "down" === e || "up" === e || "move" === e || "over" === e || "out" === e ? t = !I.System.mobile || "down" !== e && "up" !== e && "move" !== e ? "mouse" + e : "down" === e ? "touchstart" : "up" === e ? "touchend" : "touchmove" : "enter" === e && (t = "keydown"), t
        },
        actionName: function(e) {
          var t = e;
          return "touchstart" === t || "mousedown" === t ? t = "down" : "touchmove" === t || "mousemove" === t ? t = "move" : "touchend" === t || "mouseup" === t ? t = "up" : "mouseover" === t ? t = "over" : "mouseout" === t && (t = "out"), t
        },
        eventCallback: function(e, t, n) {
          var r = U.actionName(e);
          return function(i) {
            if (i = i || window.event, "down" === r || "move" === r || "up" === r || "over" === r || "out" === r || "click" === r) {
              var o = U.eventCoords(i),
                a = n.getBoundingClientRect();
              i.windowX = o.x, i.windowY = o.y, i.elementX = i.windowX - (a.x || a.left), i.elementY = i.windowY - (a.y || a.top)
            }
            i.keyNum = i.which || i.keyCode || 0, "enter" === e && 13 !== i.keyNum && 32 !== i.keyNum || (i.action = r, i.targetElement = n, t(i))
          }
        },
        eventCoords: function(e) {
          var t = {
            x: 0,
            y: 0
          };
          if (e.windowsPointer) return e;
          if (!e) return t;
          if (e.touches || e.changedTouches) {
            var n = (e.touches && e.touches.length >= 1 ? e.touches : e.changedTouches)[0];
            t.x = n.pageX || n.clientX, t.y = n.pageY || n.clientY
          } else t.x = e.pageX || e.clientX, t.y = e.pageY || e.clientY;
          return t
        }
      },
      N = ["Webkit", "Moz", "ms"],
      F = document.createElement("div").style,
      W = {};
  
    function z(e) {
      var t = W[e];
      return t || (e in F ? e : W[e] = function(e) {
        for (var t = e[0].toUpperCase() + e.slice(1), n = N.length; n--;)
          if ((e = N[n] + t) in F) return e
      }(e) || e)
    }
  
    function q(e, t, n) {
      if (this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, "object" == typeof e) {
        this.dom = e;
        var r = [],
          i = [];
        e.className && (i = e.className.split(" "));
        for (var o = 0; o < i.length; o++) "" !== i[o] && " " !== i[o] && r.push(i[o]);
        this._clss = r
      } else n !== undefined && null !== n || (n = !0), (e === undefined || "string" == typeof e && (e.indexOf("#") >= 0 || e.indexOf(".") >= 0)) && (e && (t = e), e = "div"), this.dom = document.createElement(e), t && (t.indexOf("#") >= 0 ? this.dom.id = t.split("#")[1] : (t.indexOf(".") >= 0 && (t = t.split(".")[1]), this.addClass.call(this, t)));
      !0 === n && (this._frag = document.createDocumentFragment(), this._frag.appendChild(this.dom))
    }
    q.prototype.createElement = function(e, t) {
      var n = new q(e, t, !1);
      return this.appendElement.call(this, n), this._nodes.push(n), n
    }, q.prototype.appendElement = function(e) {
      if (e === undefined) return P({
        name: "DomElement Add Child",
        message: "Child Element is undefined"
      });
      var t;
      t = e._frag !== undefined && null !== e._frag ? e._frag : e.dom !== undefined ? e.dom : e;
      try {
        e instanceof q && (e._parent = this), this.dom.appendChild(t)
      } catch (vt) {
        P({
          name: "DomElement Add Child",
          message: "Failed to append child."
        })
      }
      return this
    }, q.prototype.removeElement = function(e) {
      try {
        var t = e;
        if (e.dom) {
          t = t.dom;
          for (var n = e._nodes.length; --n > -1;) e.dom.removeChild(e._nodes[n].dom || e._nodes[n]), e._nodes.splice(n, 1)
        } else
          for (var r = this._nodes.length; --r > -1;) this._nodes[r] === t && this._nodes.splice(r, 1);
        t.parentNode === this.dom && this.dom.removeChild(t)
      } catch (vt) {
        P({
          name: "DomElement Remove Child",
          message: "Failed to remove child."
        })
      }
    }, q.prototype.addClass = function(e) {
      return !1 === this.hasClass.call(this, e) && (this._clss.push(e), this.dom.className = this._clss.join(" ")), this
    }, q.prototype.hasClass = function(e) {
      for (var t = !1, n = 0; n < this._clss.length; n++) this._clss[n] === e && (t = !0);
      return t
    }, q.prototype.removeClass = function(e) {
      for (var t = this._clss.length; --t > -1;) this._clss[t] === e && this._clss.splice(t, 1);
      return this.dom.className = this._clss.join(" "), this
    }, q.prototype.text = function(e) {
      if (this && this.dom) {
        if (!e) return this.dom.textContent;
        for (var t, n, r, i, o = /&(.*?);/g, a = /<[a-z][\s\S]*>/i; null !== (t = o.exec(e));) {
          !1 === a.test(t[0]) ? (r = t[0], i = void 0, (i = document.createElement("div")).innerHTML = r, n = i.textContent, e = e.replace(new RegExp(t[0], "g"), n)) : e = e.replace(t[0], "")
        }
        return this.dom.textContent = e, this
      }
    }, q.prototype.content = q.prototype.text, q.prototype.css = function(e) {
      var t;
      for (var n in e) {
        t = e[n];
        try {
          if ("opacity" !== n && "zIndex" !== n && "fontWeight" !== n && isFinite(t) && parseFloat(t) === t && (t += "px"), "ie" === I.Browser.type && 8 === I.Browser.version && "opacity" === n) this.dom.style.filter = "alpha(opacity=" + 100 * t + ")";
          else {
            var r = z(n);
            this.dom.style[r] = t
          }
        } catch (mt) {}
      }
      return this
    }, q.prototype.backgroundImage = function(e, t, n, r) {
      var i = t !== undefined && n !== undefined,
        o = {
          "-ms-high-contrast-adjust": "none"
        };
      if ("object" == typeof t && (r = t), r === undefined && (r = {}), i) {
        var a = e.width / e.height,
          s = t,
          c = s / a;
        r.cover && c < n && (s = (c = n) * a), r.contain && c > n && (s = (c = n) * a), o.width = s, o.height = c, r.center && (o.marginLeft = -s / 2, o.marginTop = -c / 2, o.position = "absolute", o.left = "50%", o.top = "50%"), (r.left || r.right) && (o.left = r.left || 0, o.top = r.top || 0)
      }
      "ie" === I.Browser.type && 8 === I.Browser.version ? o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e.src + "',sizingMethod='scale')" : (o.background = "url(" + e.src + ")", o.backgroundPosition = "50% 50%", o.backgroundRepeat = "no-repeat", o.backgroundSize = i ? s + "px " + c + "px" : r.cover ? "cover" : r.contain ? "contain" : "100%"), this.css.call(this, o)
    }, q.prototype.setAttribute = function(e, t) {
      var n;
      if ("object" == typeof e)
        for (var r in e) n = e[r], this.dom.setAttribute(r, n);
      else this.dom.setAttribute(e, t)
    }, q.prototype.removeAttribute = function(e, t) {
      var n;
      if ("object" == typeof e)
        for (var r in e) n = e[r], this.dom.removeAttribute(r, n);
      else this.dom.removeAttribute(e, t)
    }, q.prototype.addEventListener = function(e, t, n) {
      var r = {
        event: U.eventName(e),
        handler: U.eventCallback(e, t, this.dom),
        callback: t
      };
      this._listeners.push(r), this.dom.addEventListener ? this.dom.addEventListener(r.event, r.handler, n) : this.dom.attachEvent("on" + r.event, r.handler)
    }, q.prototype.removeEventListener = function(e, t, n) {
      for (var r, i = this._listeners.length; --i > -1;)(r = this._listeners[i]).event === e && r.callback === t && (this._listeners.splice(i, 1), this.dom.removeEventListener ? this.dom.removeEventListener(r.event, r.handler, n) : this.dom.detachEvent("on" + r.event, r.handler))
    }, q.prototype.focus = function() {
      this.dom.focus()
    }, q.prototype.blur = function() {
      this.dom.blur()
    }, q.prototype.html = function(e) {
      return e && (this.dom.innerHTML = e), this.dom.innerHTML
    }, q.prototype.__destroy = function() {
      for (var e, t = this._listeners.length; --t > -1;) e = this._listeners[t], this._listeners.splice(t, 1), this.dom.removeEventListener ? this.dom.removeEventListener(e.event, e.handler) : this.dom.detachEvent("on" + e.event, e.handler);
      return this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, e = null, null
    };
    var H = {
      self: function(e, t) {
        var n = {},
          r = Array.prototype.slice.call(arguments, 2);
        for (var i in t.apply(e, r), e) n[i] = e[i]
      },
      proto: function(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e
      }
    };
  
    function X(e, t) {
      H.self(this, q, t || "div", e), this.children = [], this._events = []
    }
    H.proto(X, q), X.prototype.initComponent = function(e, t, n) {
      var r = new e(t);
      return r._parent = this, this.children.push(r), r.dom && (n !== undefined ? n.appendElement && n.appendElement(r) : this.appendElement(r)), r
    }, X.prototype.destroy = function() {
      var e = this;
      try {
        k.depth(this, "children", function(t) {
          if (e !== t)
            for (var n = e.children.length; --n > -1;) e.children[n] === t && e.children.splice(n, 1);
          t._destroy && t._destroy(), t = null
        })
      } catch (vt) {
        throw new Error("Trouble destroying nodes: " + vt)
      }
      return null
    }, X.prototype._destroy = function() {
      try {
        this.onDestroy && this.onDestroy(), this._parent.removeElement && this._parent.removeElement(this);
        for (var e = this._events.length; --e > -1;) this._events.splice(e, 1);
        this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
      } catch (vt) {
        P({
          name: "DomComponent",
          message: "Failed to destroy."
        })
      }
    }, X.prototype.on = function(e, t) {
      for (var n = this._events.length, r = !1; --n > -1 && !1 === r;) this._events[n].event === e && (r = this._events[n]);
      !1 === r && (r = {
        event: e,
        listeners: []
      }, this._events.push(r)), r.listeners.push(t)
    }, X.prototype.off = function(e, t) {
      for (var n = this._events.length; --n > -1;)
        if (this._events[n].event === e) {
          for (var r = this._events[n].listeners.length; --r > -1;) this._events[n].listeners[r] === t && this._events[n].listeners.splice(r, 1);
          0 === this._events[n].listeners.length && this._events.splice(n, 1)
        }
    }, X.prototype.emit = function(e) {
      for (var t = Array.prototype.slice.call(arguments, 1), n = this._events.length; --n > -1 && this._events;)
        if (this._events[n].event === e)
          for (var r = this._events[n].listeners.length; --r > -1;) this._events[n].listeners[r].apply(this, t)
    };
    var J = {
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
      Y = {
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
      $ = null,
      K = {
        translate: function(e) {
          var t = K.getBestTrans(Y);
          return t && t[e] || e
        },
        getBestTrans: function(e) {
          var t = K.getLocale();
          return t in e ? e[t] : K.getShortLocale(t) in e ? e[K.getShortLocale(t)] : "en" in e ? e.en : null
        },
        getLocale: function() {
          var e = $ || window.navigator.userLanguage || window.navigator.language,
            t = K.getShortLocale(e);
          return "in" === t && (e = "id"), "iw" === t && (e = "he"), "nb" === t && (e = "no"), "ji" === t && (e = "yi"), "zh-CN" === e && (e = "zh"), "jv" === t && (e = "jw"), J[e] ? e : J[t] ? t : "en"
        },
        setLocale: function(e) {
          $ = e
        },
        getShortLocale: function(e) {
          return e.indexOf("-") >= 0 ? e.substring(0, e.indexOf("-")) : e
        },
        isShortLocale: function(e) {
          return 2 === e.length || 3 === e.length
        },
        addTable: function(e, t) {
          if (t || (t = Object.create(null)), Y[e]) {
            var n = Y[e];
            for (var r in t) n[r] = t[r]
          } else Y[e] = t;
          return Y[e]
        },
        getTable: function(e) {
          return Y[e]
        },
        addTables: function(e) {
          for (var t in e) K.addTable(t, e[t]);
          return Y
        },
        getTables: function() {
          return Y
        }
      },
      V = {
        touchstart: "ts",
        touchend: "te",
        touchmove: "tm",
        touchcancel: "tc"
      },
      Q = {
        mousedown: "md",
        mouseup: "mu",
        mousemove: "mm"
      },
      G = {
        keydown: "kd",
        keyup: "ku"
      },
      Z = {
        devicemotion: "dm"
      },
      ee = function(e, t) {
        var n = Q[e],
          r = null;
        return function(e) {
          r = function(e) {
            return [e.windowX, e.windowY, Date.now()]
          }(e), t(n, r)
        }
      },
      te = function(e, t) {
        var n = V[e],
          r = null;
        return function(e) {
          r = function(e) {
            for (var t, n = e.touches && e.touches.length >= 1 ? e.touches : e.changedTouches, r = [], i = 0; i < n.length; i++) t = U.eventCoords(n[i]), r.push([n[i].identifier, t.x, t.y]);
            return r.push(Date.now()), r
          }(e), t(n, r)
        }
      },
      ne = function(e, t) {
        var n = G[e],
          r = null;
        return function(e) {
          r = function(e) {
            return [e.keyNum, Date.now()]
          }(e), t(n, r)
        }
      },
      re = function(e, t) {
        var n = Z[e],
          r = null,
          i = [];
        return function(e) {
          null !== (r = function(e, t) {
            (e.acceleration === undefined || e.acceleration && e.acceleration.x === undefined) && (e.acceleration = {
              x: 0,
              y: 0,
              z: 0
            });
            (e.rotationRate === undefined || e.rotationRate && e.rotationRate.alpha === undefined) && (e.rotationRate = {
              alpha: 0,
              beta: 0,
              gamma: 0
            });
            var n = [e.acceleration.x, e.acceleration.y, e.acceleration.z, e.rotationRate.alpha, e.rotationRate.beta, e.rotationRate.gamma, Date.now()],
              r = [];
            if (0 === t.length) t = n, r = n;
            else {
              for (var i, o = 0, a = 0; a < 6; a++) i = t[a] - n[a], r.push(n[a]), o += Math.abs(i);
              if (r.push(Date.now()), t = n, o <= 0) return null
            }
            return {
              motion: r,
              prevmotion: t
            }
          }(e, i)) && (i = r.prevmotion, r = r.motion, t(n, r))
        }
      };
    var ie = {},
      oe = {},
      ae = 500,
      se = 5e3,
      ce = Date.now(),
      ue = !1,
      le = !1,
      he = null,
      de = !0,
      fe = !0,
      pe = !1,
      me = !0,
      ve = {
        record: function(e, t, n, r) {
          de = e === undefined ? de : e, fe = n === undefined ? fe : n, pe = t === undefined ? pe : t, me = r === undefined ? me : r, !1 === le && (he = new q(document.body), de && (he.addEventListener("mousedown", ee("mousedown", ge)), he.addEventListener("mousemove", ee("mousemove", ge)), he.addEventListener("mouseup", ee("mouseup", ge))), !0 === pe && (he.addEventListener("keyup", ne("keyup", ge)), he.addEventListener("keydown", ne("keydown", ge))), fe && !0 === I.Browser.hasEvent("touchstart", document.body) && (he.addEventListener("touchstart", te("touchstart", ge)), he.addEventListener("touchmove", te("touchmove", ge)), he.addEventListener("touchend", te("touchend", ge))), me && !0 === I.Browser.hasEvent("devicemotion", window) && he.addEventListener("devicemotion", re("devicemotion", ge)), le = !0), ie.st = Date.now(), ue = !0
        },
        stop: function() {
          !1 !== ue && (ue = !1)
        },
        time: function() {
          return ce
        },
        getData: function() {
          return ie
        },
        setData: function(e, t) {
          ie[e] || (ie[e] = null), Array.isArray(ie[e]) ? ie[e].push(t) : ie[e] = t
        },
        resetData: function() {
          ie = {}, oe = {}
        },
        circBuffPush: ge
      };
  
    function ge(e, t, n, r) {
      if (!1 !== ue)
        if (ie[e]) {
          var i = n || ae,
            o = r || se;
          if (ie[e].length < o) ie[e].push(t);
          else {
            var a = oe[e];
            0 === a && (a = i);
            var s = (a + 1) % o;
            oe[e] = s, ie[e][a] = t
          }
        } else ie[e] = [t], oe[e] = 0
    }
    var ye = [],
      be = !1,
      we = !1;
  
    function ke() {
      "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || xe()
    }
  
    function xe() {
      if (!1 === we) {
        for (var e = 0; e < ye.length; e++) ye[e].fn.apply(null, ye[e].args);
        ye = []
      }
      we = !0, document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", xe), window.removeEventListener("load", xe)) : (document.detachEvent("onreadystatechange", ke), window.detachEvent("onload", xe))
    }
    new q(document), new q(window);
  
    function Ee() {
      H.self(this, q, "canvas");
      var e = this;
      this.element = this.dom, this.ctx = this.element.getContext("2d"), this.scale = 1, this.dpr = window.devicePixelRatio || 1, this.clearColor = "#fff", this.ctx.roundedRect = function(t, n, r, i, o) {
        var a = r > 0 ? o : -o,
          s = i > 0 ? o : -o;
        e.ctx.beginPath(), e.ctx.moveTo(t + a, n), e.ctx.lineTo(t + r - a, n), e.ctx.quadraticCurveTo(t + r, n, t + r, n + s), e.ctx.lineTo(t + r, n + i - s), e.ctx.quadraticCurveTo(t + r, n + i, t + r - a, n + i), e.ctx.lineTo(t + a, n + i), e.ctx.quadraticCurveTo(t, n + i, t, n + i - s), e.ctx.lineTo(t, n + s), e.ctx.quadraticCurveTo(t, n, t + a, n), e.ctx.closePath()
      }
    }
  
    function Se(e) {
      e = e || {}, this.x = e.x || 0, this.y = e.y || 0, this.rotate = this.rotate.bind(this), this.getDistance = this.getDistance.bind(this), this.radius = 0, this.tolerance = 0, this.fill = !1, this.stroke = !1, this.fillColor = "#fff", this.strokeColor = "#fff", this.strokeWidth = 1
    }
  
    function _e(e, t, n) {
      H.self(this, Se, e), this.handleIn = new Se(t), this.handleOut = new Se(n), this.prev = null, this.next = null, this.index = 0
    }
  
    function Ce(e, t) {
      var n = e.substr(e.lastIndexOf(".") + 1, e.length);
      if (t || (t = {}), t.fallback && "svg" === n && "ie" === I.Browser.type && I.Browser.version <= 11 && (e = e.substr(0, e.indexOf(n)) + t.fallback), t.prefix && (e = t.prefix + "/" + e), M.assethost && e.indexOf(T.assetDomain) >= 0) e = M.assethost + e.replace(T.assetDomain, "");
      else if (M.imghost && e.indexOf("imgs") >= 0) {
        var r = e.indexOf(".ai") >= 0 ? e.indexOf(".ai") + 3 : e.indexOf(".com") + 4;
        e = M.imghost + e.substr(r, e.length)
      }
      this.attribs = {
        crossOrigin: t.crossOrigin || null
      }, this.src = e, this.ext = n, this.width = 0, this.height = 0, this.aspect = 0, this.loaded = !1, this.error = !1, this.element = null, this.cb = {
        load: [],
        error: []
      }
    }
  
    function Oe(e, t, n) {
      for (var r = e[t], i = r.length, o = null; --i > -1;) o = r[i], r.splice(i, 1), o(n);
      "error" === t ? e.load = [] : e.error = []
    }
  
    function je(e, t) {
      if (t || (t = {}), t.prefix && (e = t.prefix + "/" + e), M.assethost && e.indexOf(T.assetDomain) >= 0) e = M.assethost + e.replace(T.assetDomain, "");
      else if (M.imghost && e.indexOf("imgs") >= 0) {
        var n = e.indexOf(".ai") >= 0 ? e.indexOf(".ai") + 3 : e.indexOf(".com") + 4;
        e = M.imghost + e.substr(n, e.length)
      }
      this.attribs = {
        defer: t.defer || null,
        async: t.async || null,
        crossOrigin: t.crossOrigin || null
      }, this.src = e, this.loaded = !1, this.error = !1, this.element = null, this.cb = {
        load: [],
        error: []
      }
    }
  
    function Ae(e, t, n) {
      for (var r = e[t], i = r.length, o = null; --i > -1;) o = r[i], r.splice(i, 1), o(n);
      "error" === t ? e.load = [] : e.error = []
    }
    H.proto(Ee, q), Ee.prototype.dimensions = function(e, t) {
      this.css({
        width: e,
        height: t
      }), this.element.width = Math.round(e / this.scale) * this.dpr, this.element.height = Math.round(t / this.scale) * this.dpr, this.ctx.scale(this.dpr, this.dpr), this.width = Math.round(e / this.scale), this.height = Math.round(t / this.scale)
    }, Ee.prototype.clear = function() {
      this.ctx && this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }, Ee.prototype.draw = function() {
      this.ctx && (this.ctx.fillStyle = this.clearColor, this.ctx.fillRect(0, 0, this.element.width, this.element.height))
    }, Ee.prototype._destroy = function() {
      this.__destroy(), this.element = null, this.ctx = null, this.width = null, this.height = null
    }, Se.prototype.rotate = function(e, t) {
      var n = function(e) {
          return e * (Math.PI / 180)
        }(t),
        r = Math.sin(n),
        i = Math.cos(n),
        o = this.x - e.x,
        a = this.y - e.y;
      this.x = o * i - a * r + e.x, this.y = o * r + a * i + e.y
    }, Se.prototype.getDistance = function(e) {
      return Math.sqrt(Math.pow(this.x - e.x, 2) + Math.pow(this.y - e.y, 2))
    }, Se.prototype.getAngle = function(e) {
      var t = e.x - this.x,
        n = e.y - this.y,
        r = 180 * Math.atan2(n, t) / Math.PI;
      return r < 0 && (r += 360), r
    }, Se.prototype.hitTest = function(e) {
      return this.radius + this.tolerance >= this.getDistance(e)
    }, Se.prototype.restrict = function(e, t, n, r) {
      if ("x" !== e && "y" !== e) throw new Error("Point.restrict requires a value: x or y");
      return t + this[e] < n ? t = this[e] - n : t + this[e] > r && (t = r - this[e]), this[e] + t
    }, Se.prototype.draw = function(e) {
      e.ctx.beginPath(), e.ctx.arc(this.x, this.y, this.radius / e.scale, 0, 2 * Math.PI, !1), this.fill && (e.ctx.fillStyle = this.fillColor, e.ctx.fill()), this.stroke && (e.ctx.strokeStyle = this.strokeColor, e.ctx.lineWidth = this.strokeWidth / e.scale, e.ctx.stroke())
    }, H.proto(_e, Se), _e.prototype.set = function(e, t, n) {
      this.x = e.x || this.x, this.y = e.y || this.y, t === undefined ? (this.handleIn.x = this.x, this.handleIn.y = this.y) : (this.handleIn.x = t.x, this.handleIn.y = t.y), n === undefined ? (this.handleOut.x = this.x, this.handleOut.y = this.y) : (this.handleOut.x = n.x, this.handleOut.y = n.y)
    }, _e.prototype.clone = function() {
      var e = {
          x: this.x,
          y: this.y
        },
        t = {
          x: this.handleIn.x,
          y: this.handleIn.y
        },
        n = {
          x: this.handleOut.x,
          y: this.handleOut.y
        },
        r = new _e;
      return t.x === n.x && t.y === n.y ? r.set(e) : r.set(e, t, n), r.index = this.index, r.prev = this.prev, r.next = this.next, r.radius = this.radius, r.tolerance = this.tolerance, r.fill = this.fill, r.stroke = this.stroke, r.fillColor = this.fillColor, r.strokeColor = this.strokeColor, r.strokeWidth = this.strokeWidth, r
    }, _e.prototype.move = function(e, t) {
      this.x += e, this.y += t, this.handleIn.x += e, this.handleIn.y += t, this.handleOut.x += e, this.handleOut.y += t
    }, _e.prototype.render = function(e) {
      this.handleIn.x !== this.x && this.handleIn.y !== this.y && this.handleIn.draw(e), this.handleOut.x !== this.x && this.handleOut.y !== this.y && this.handleOut.draw(e), this.draw(e)
    }, Ce.prototype.load = function() {
      var e = this,
        t = this.attribs,
        n = this.src;
      return new Promise(function(r, i) {
        var o = new Image;
        e.element = o, t.crossOrigin && (o.crossOrigin = t.crossOrigin), o.onerror = function(t) {
          e.error = !0, o.onload = o.onerror = null;
          var r = (t.message || "Loading Error") + ": " + n;
          Oe(e.cb, "error", r), i(r)
        }, o.onload = function() {
          e.loaded || (e.width = o.width, e.height = o.height, e.aspect = o.width / o.height, e.loaded = !0, o.onload = o.onerror = null, Oe(e.cb, "load", e), r(e))
        }, o.src = n, o.complete && o.onload()
      })
    }, Ce.prototype.onload = function(e) {
      this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }, Ce.prototype.onerror = function(e) {
      this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    }, je.prototype.load = function() {
      var e = this,
        t = this.attribs,
        n = this.src;
      return new Promise(function(r, i) {
        var o = document.createElement("script");
        e.element = o, o.onerror = function(t) {
          e.error = !0, o.onload = o.onreadystatechange = o.onerror = null;
          var r = (t.message || "Loading Error") + ": " + n;
          Ae(e.cb, "error", r), i(r)
        }, o.onload = o.onreadystatechange = function() {
          this.loaded || o.readyState && "loaded" !== o.readyState && "complete" !== o.readyState || (e.loaded = !0, o.onload = o.onreadystatechange = o.onerror = null, document.body.removeChild(o), Ae(e.cb, "load", e), r(e))
        }, o.type = "text/javascript", o.src = n, t.crossOrigin && (o.crossorigin = t.crossOrigin), t.async && (o.async = !0), t.defer && (o.defer = !0), document.body.appendChild(o), o.complete && o.onload()
      })
    }, je.prototype.onload = function(e) {
      this.error || (this.loaded ? e(this) : this.cb.load.push(e))
    }, je.prototype.onerror = function(e) {
      this.loaded && !this.error || (this.error ? e(this) : this.cb.error.push(e))
    };
    var Ie = [],
      Te = {
        add: function(e, t) {
          var n = function(e) {
            if (e.toLowerCase().match(/\.(?:jpg|gif|png|jpeg|svg)$/g)) return "image";
            if (e.toLowerCase().match(/\.(?:js)$/g)) return "script"
          }(e);
          return "image" === n ? Te.image(e, t) : "script" === n ? Te.script(e, t) : void 0
        },
        batch: function(e, t) {
          for (var n = [], r = -1; ++r < e.length;) {
            var i = e[r];
            n.push(Te.add(i, t))
          }
          return Promise.all(n)["finally"](function() {
            n = []
          })
        },
        image: function(e, t) {
          var n = new Ce(e, t);
          return Ie.push(n), n.load()
        },
        script: function(e, t) {
          var n = new je(e, t);
          return Ie.push(n), n.load()
        },
        retrieve: function(e) {
          return new Promise(function(t, n) {
            for (var r = Ie.length, i = !1, o = null; --r > -1 && !i;) i = (o = Ie[r]).src.indexOf(e) >= 0 && o;
            if (!i) return t(null);
            o.onload(t), o.onerror(n)
          })
        }
      };
  
    function Me(e, t) {
      var n = e instanceof HTMLIFrameElement;
      try {
        n ? e.parentNode && e.contentWindow.postMessage(JSON.stringify(t), "*") : e.postMessage(JSON.stringify(t), "*")
      } catch (mt) {
        L(mt.message, "messaging", "error")
      }
    }
  
    function Pe(e, t) {
      this.target = e, this.id = t, this.messages = [], this.incoming = [], this.waiting = []
    }
  
    function Le(e, t) {
      var n = this,
        r = {},
        i = new Promise(function(e, t) {
          r.resolve = e, r.reject = t
        }),
        o = {
          source: "hcaptcha",
          label: e,
          id: n.id,
          promise: null,
          lookup: t
        };
      return i.then(function(e) {
        o.promise = "resolve", null !== e && (o.contents = e), Me(n.target, o)
      })["catch"](function(e) {
        o.promise = "reject", null !== e && (o.error = e), Me(n.target, o)
      }), r
    }
    Pe.prototype.setID = function(e) {
      this.id = e
    }, Pe.prototype.contact = function(e, t) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      var n = this,
        r = Date.now().toString(36),
        i = {
          source: "hcaptcha",
          label: e,
          id: this.id,
          promise: "create",
          lookup: r
        };
      if (t) {
        if ("object" != typeof t) throw new Error("Message must be an object.");
        i.contents = t
      }
      return new Promise(function(t, o) {
        n.waiting.push({
          label: e,
          reject: o,
          resolve: t,
          lookup: r
        }), Me(n.target, i)
      })
    }, Pe.prototype.listen = function(e, t) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      for (var n = this.messages.length, r = !1; --n > -1 && !1 === r;) this.messages[n].label === e && (r = this.messages[n]);
      !1 === r && (r = {
        label: e,
        listeners: []
      }, this.messages.push(r)), r.listeners.push(t)
    }, Pe.prototype.answer = function(e, t) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      for (var n = this.incoming.length, r = !1; --n > -1 && !1 === r;) this.incoming[n].label === e && (r = this.incoming[n]);
      !1 === r && (r = {
        label: e,
        listeners: []
      }, this.incoming.push(r)), r.listeners.push(t)
    }, Pe.prototype.send = function(e, t) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      var n = {
        source: "hcaptcha",
        label: e,
        id: this.id
      };
      if (t) {
        if ("object" != typeof t) throw new Error("Message must be an object.");
        n.contents = t
      }
      Me(this.target, n)
    }, Pe.prototype.check = function(e, t) {
      for (var n = [].concat.apply([], [this.messages, this.incoming, this.waiting]), r = [], i = -1; ++i < n.length;)
        if (n[i].label === e) {
          if (t && n[i].lookup && t !== n[i].lookup) continue;
          r.push(n[i])
        } return r
    }, Pe.prototype.respond = function(e) {
      for (var t, n, r = -1, i = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++r < o.length;)
        if (o[r].label === e.label) {
          if (e.lookup && o[r].lookup && e.lookup !== o[r].lookup) continue;
          var a = [];
          if (t = o[r], e.error && a.push(e.error), e.contents && a.push(e.contents), e.promise && "create" !== e.promise) {
            t[e.promise].apply(t[e.promise], a);
            for (var s = this.waiting.length, c = !1; --s > -1 && !1 === c;) this.waiting[s].label === t.label && this.waiting[s].lookup === t.lookup && (c = !0, this.waiting.splice(s, 1));
            continue
          }
          for (i = 0; i < t.listeners.length; i++) {
            if (n = t.listeners[i], "create" === e.promise) {
              var u = Le.call(this, t.label, e.lookup);
              a.push(u)
            }
            n.apply(n, a)
          }
        } o = null
    }, Pe.prototype.destroy = function() {
      return this.messages = null, this.incoming = null, this.waiting = null, null
    };
    var Re = {
      chats: [],
      isSupported: function() {
        return !!window.postMessage
      },
      createChat: function(e, t) {
        var n = new Pe(e, t);
        return Re.chats.push(n), n
      },
      addChat: function(e) {
        Re.chats.push(e)
      },
      removeChat: function(e) {
        for (var t = !1, n = Re.chats.length; --n > -1 && !1 === t;) e.id === Re.chats[n].id && e.target === Re.chats[n].target && (t = Re.chats[n], Re.chats.splice(n, 1));
        return t
      },
      handle: function(e) {
        var t = e.data;
        if ("string" == typeof t) try {
          if (!(t.indexOf("hcaptcha") >= 0)) return;
          t = JSON.parse(t);
          for (var n, r = Re.chats, i = -1; ++i < r.length;)(n = r[i]).id === t.id && n.respond(t)
        } catch (mt) {
          R("postMessage handler error", "postMessage", "debug", {
            event: e,
            error: mt
          })
        }
      }
    };
    window.addEventListener ? window.addEventListener("message", Re.handle) : window.attachEvent("onmessage", Re.handle);
    var Be = function() {
        window.Raven && Raven.config("https://0f73e9316e6b4aee9e62a74c820604e0@sentry.io/1198795", {
          autoBreadcrumbs: {
            xhr: !0,
            dom: !0,
            sentry: !0
          },
          tags: {
            "site-host": T.host,
            "site-key": T.sitekey,
            "endpoint-url": M.endpoint,
            "asset-url": T.assetUrl
          },
          sampleRate: .1
        }), window.Raven && Raven.setUserContext({
          "Browser-Agent": I.Browser.agent,
          "Browser-Type": I.Browser.type,
          "Browser-Version": I.Browser.version,
          "System-OS": I.System.os,
          "System-Version": I.System.version,
          "Is-Mobile": I.System.mobile
        }), R("checkbox_internal", "setup", "info"), window.onerror = function(e, t, n, r, i) {
          R(e, "global", "debug", {
            name: i.name || "Error",
            url: t,
            line: n,
            column: r,
            stack: i.stack || ""
          }), L(e, "global", "error")
        }
      },
      De = "10000000-ffff-ffff-ffff-000000000001",
      Ue = {
        sitekey: function(e) {
          return B.UUIDv4(e) || "00000000-0000-0000-0000-000000000000" === e || e === De
        },
        dummykey: function(e) {
          return e === De
        }
      };
  
    function Ne(e) {
      if (null === e) return "";
      var t = [];
      return function n(e, t) {
        var r, i;
        if ("object" == typeof e)
          for (i in e) !0 === Fe(r = e[i]) ? n(r, t) : t[t.length] = We(i, r);
        else if (!0 === Array.isArray(e))
          for (var o = 0; o < e.length; o++) !0 === Fe(r = e[o]) ? n(e, t) : t[t.length] = We(i, r);
        else t[t.length] = We(e)
      }(e, t), t.join("&")
    }
  
    function Fe(e) {
      return !0 === Array.isArray(e) || "object" == typeof e
    }
  
    function We(e, t) {
      return encodeURIComponent(e) + "=" + encodeURIComponent(null === t ? "" : t)
    }
    var ze = {
        400: "Rate limited or network error. Please retry.",
        429: "Your computer or network has sent too many requests.",
        500: "Cannot contact hCaptcha. Check your connection and try again."
      },
      qe = {
        getText: function(e) {
          try {
            return K.translate(ze[e])
          } catch (vt) {
            return !1
          }
        }
      },
      He = "undefined" != typeof XDomainRequest && "withCredentials" in XMLHttpRequest.prototype == !1;
  
    function Xe(e, t, n) {
      n = n || {};
      var r = {
        url: t,
        method: e.toUpperCase(),
        responseType: n.responseType || "string",
        dataType: n.dataType || null,
        withCredentials: n.withCredentials || !1,
        headers: n.headers || null,
        data: n.data || null
      };
      return r.legacy = r.withCredentials && He, r.data && ("json" === r.dataType && "object" == typeof r.data && (r.data = JSON.stringify(r.data)), "query" === r.dataType && (r.data = Ne(r.data))), n.retry ? D(function() {
        return Je(r)
      }, n.retry) : Je(r)
    }
  
    function Je(e) {
      var t = e.legacy ? new XDomainRequest : new XMLHttpRequest;
      return new Promise(function(n, r) {
        var i, o = function(i) {
          return function(o) {
            var a = t.response || t.responseText,
              s = t.statusText || "",
              c = t.status,
              u = t.readyState;
            if (4 === u || e.legacy) {
              if ("error" === i || c >= 400 && c <= 511) return void r({
                event: "network-error",
                endpoint: e.url,
                state: u,
                status: c,
                message: qe.getText(c || 400) || s
              });
              "json" === e.responseType && a && (a = JSON.parse(a)), n({
                state: u,
                status: c,
                body: a,
                message: s
              })
            }
          }
        };
        if ((t.onload = o("complete"), t.onerror = t.ontimeout = o("error"), t.open(e.method, e.url), !e.legacy) && (t.withCredentials = e.withCredentials, e.headers))
          for (var a in e.headers) i = e.headers[a], t.setRequestHeader(a, i);
        setTimeout(function() {
          t.send(e.data)
        }, 0)
      })
    }
    var Ye = function(e, t) {
        if ("object" == typeof e && t === undefined && (e = (t = e).url), null === e) throw new Error("Url missing");
        return Xe("GET", e, t)
      },
      $e = function(e, t, n) {
        var r = I.Browser.supportsCanvas() >>> 0,
          i = I.Browser.supportsWebAssembly() >>> 0;
        return new Promise(function(o, a) {
          Ye({
            url: M.endpoint + "/checksiteconfig?host=" + t + "&sitekey=" + e + "&sc=" + r + "&swa=" + i,
            responseType: "json",
            withCredentials: !0,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-cache"
            },
            retry: n
          }).then(function(e) {
            var t = e.body || null;
            if (!t) throw new Error("Missing response body.");
            if (!1 === t.success) {
              var n = (t["error-codes"] || []).join(", ");
              a(n)
            } else !t.pass && t.error ? a(t.error) : o(t)
          })["catch"](a)
        })
      },
      Ke = null,
      Ve = null,
      Qe = null,
      Ge = null,
      Ze = null,
      et = null,
      tt = null,
      nt = null,
      rt = null,
      it = "https://www.hcaptcha.com/what-is-hcaptcha-about";
  
    function ot(e) {
      function t(t) {
        var n = "click" === t.type,
          r = "keydown" === t.type && (13 === t.which || "Enter" === t.key);
        (n || r) && window.open(e.dom.getAttribute("data-href"), "_blank")
      }
      e.addEventListener("keydown", t), e.addEventListener("click", t), e.setAttribute("role", "link"), e.setAttribute("tabindex", 0)
    }
  
    function at() {
      H.self(this, x), this.state = {
        warning: !1,
        error: !1,
        ticked: !1
      }
    }
    H.proto(at, x), at.prototype.setup = function() {
      Qe = new q(document.getElementById("anchor")), Ke = new q(document.getElementById("checkbox")), Ge = new q(document.getElementById("checkbox-label")), Ze = new q(document.getElementById("config-error")), tt = new q(document.getElementById("logo")), Ve = new q(document.getElementById("icon")), et = new q(document.getElementById("config-warning")), nt = new q(document.getElementById("privacy-link")), rt = new q(document.getElementById("terms-link")), "invisible" !== M.size ? Qe.setAttribute("aria-hidden", !1) : Qe.setAttribute("aria-hidden", !0), Ke.setAttribute("aria-expanded", !1), Ke.setAttribute("aria-haspopup", !0), Ke.setAttribute("tabindex", "0"), Ke.setAttribute("aria-live", "assertive"), tt.setAttribute("tabindex", "0"), Ze.setAttribute("aria-hidden", !0), Ze.setAttribute("aria-live", "polite"), et.setAttribute("aria-hidden", !0), et.setAttribute("aria-live", "polite"), Qe.addClass("anchor"), Qe.addClass("compact" === M.size ? "compact" : " normal"), Qe.addClass("dark" === M.theme ? "dark" : " light"), Qe.addEventListener("click", this.select.bind(this)), Qe.addEventListener("enter", this.select.bind(this));
      var e = it + "?site=" + T.host + "&key=" + T.sitekey + "&r=a0";
      tt.setAttribute("data-href", e), ot(tt), ot(nt), ot(rt), Ke.css({
        "-ms-high-contrast-adjust": "none"
      }), Ve.css({
        "-ms-high-contrast-adjust": "none"
      }), Te.retrieve("dark" === M.theme ? "images/logo-small-dark-theme" : "images/logo-small").then(function(e) {
        Ve.backgroundImage(e)
      })
    }, at.prototype.select = function(e) {
      var t = this;
      if (Qe.hasClass("disabled")) return !0;
      var n = (e.target || e.srcElement).id || "";
      return "terms-link" == n || "privacy-link" == n || "logo" == n || "icon" == n || (!!Ke.hasClass("active") || (Ke.addClass("active"), Te.retrieve("images/pulse").then(function(e) {
        t.state.ticked || Ke.backgroundImage(e, {
          contain: !0
        })
      }), Qe.setAttribute("aria-hidden", !0), Ke.setAttribute("aria-checked", "mixed"), Ke.setAttribute("aria-expanded", !0), Ke.setAttribute("tabindex", "-1"), tt.setAttribute("tabindex", "-1"), void this.emit("select", e.action)))
    }, at.prototype.getLocation = function() {
      var e = Ke.dom.getBoundingClientRect(),
        t = e.bottom - e.top,
        n = e.right - e.left;
      return {
        left: e.left,
        right: e.right,
        top: e.top,
        bottom: e.bottom,
        width: n,
        height: t,
        x: e.left + n / 2,
        y: e.top + t / 2
      }
    }, at.prototype.reset = function() {
      this.state.ticked = !1, "invisible" !== M.size ? Qe.setAttribute("aria-hidden", !1) : Qe.setAttribute("aria-hidden", !0), Ke.setAttribute("aria-checked", !1), Ke.setAttribute("aria-expanded", !1), Ke.setAttribute("tabindex", "0"), tt.setAttribute("tabindex", "0"), Ke.setAttribute("aria-label", K.translate("hCaptcha checkbox. Select in order to trigger the challenge, or to bypass it if you have an accessibility cookie.")), Ke.focus(), Ke.removeClass("active"), Ke.removeClass("checked"), Qe.removeClass("disabled"), Ke.dom.style.background = ""
    }, at.prototype.tick = function() {
      var e = this;
      this.state.ticked = !0, "invisible" !== M.size ? Qe.setAttribute("aria-hidden", !1) : Qe.setAttribute("aria-hidden", !0), Ke.setAttribute("aria-checked", !0), Ke.setAttribute("aria-expanded", !1), Ke.setAttribute("aria-label", K.translate("hCaptcha checkbox. You are verified I am human.")), Ke.setAttribute("tabindex", "0"), tt.setAttribute("tabindex", "0"), Ke.focus(), Ke.removeClass("active"), Te.retrieve("images/check").then(function(t) {
        e.state.ticked && Ke.backgroundImage(t, {
          contain: !0
        })
      }), Ke.addClass("checked"), Qe.addClass("disabled")
    }, at.prototype.translate = function() {
      var e = "hCaptcha checkbox. Select in order to trigger the challenge, or to bypass it if you have an accessibility cookie.";
      this.state.ticked && (e = "hCaptcha checkbox. You are verified I am human."), Ge.text(K.translate("I am human")), Ke.setAttribute("aria-label", K.translate(e)), nt.text(K.translate("Privacy")), nt.setAttribute("aria-label", K.translate("hCaptcha Privacy Policy")), rt.text(K.translate("Terms")), rt.setAttribute("aria-label", K.translate("hCaptcha Terms of Service")), this.state.warning && et.text(K.translate(this.state.warning)), this.state.error && Ze.text(K.translate(this.state.error))
    }, at.prototype.setWarning = function(e, t) {
      this.state.warning = e;
      var n = e ? K.translate(e) : "";
      "invisible" !== M.size && et.setAttribute("aria-hidden", t || !e), e ? (Ke.setAttribute("aria-describedby", "config-warning"), et.setAttribute("aria-label", n)) : (Ke.removeAttribute("aria-describedby"), et.removeAttribute("aria-label")), et.text(n), et.css({
        opacity: e ? 1 : 0,
        display: t ? "none" : "block"
      })
    }, at.prototype.setStatus = function(e, t) {
      if (e && e.indexOf("invalid-challenge") >= 0) {
        var n = e.replace(/-/g, " ");
        e = n.charAt(0).toUpperCase() + n.slice(1) + "."
      }
      var r = e ? K.translate(e) : "";
      "invisible" !== M.size && Ze.setAttribute("aria-hidden", t || !e), e ? (Ke.setAttribute("aria-describedby", "config-error"), Ze.setAttribute("aria-label", r)) : (Ke.removeAttribute("aria-describedby"), Ze.removeAttribute("aria-label")), Ze.text(r), Ze.css({
        opacity: e ? 1 : 0,
        display: t ? "none" : "block"
      }), this.state.error = e
    }, at.prototype.setLogoLink = function(e) {
      it = e
    }, at.prototype.getLogoLink = function() {
      return it
    };
    var st = null,
      ct = null,
      ut = new at,
      lt = null,
      ht = {
        init: function(e) {
          var t;
          ct = e.id, ut.setup(), (lt = new q(document.body)).css({
            display: "block"
          }), (t = lt).addEventListener("down", function() {
            t.hasClass("using-kb") && t.removeClass("using-kb")
          }), t.addEventListener("keydown", function(e) {
            9 === e.keyNum && t.addClass("using-kb")
          })
        },
        getID: function() {
          return ct
        },
        getCharity: function() {
          return st
        },
        getLink: function() {
          return ut.getLogoLink()
        },
        getSitekey: function() {
          return T.sitekey
        },
        checkSiteConfig: function() {
          return new Promise(function(e) {
            $e(T.sitekey, T.host, {
              attempts: 3,
              delay: 5e3,
              onFail: function(e) {
                return R("/checksiteconfig error", "request", "debug", e), e instanceof Error || 400 === e.status
              }
            }).then(function(t) {
              R("/checksiteconfig success", "request", "info", t), ut.setStatus(!1), t.charity !== undefined && (st = t.charity), t.brand_uri !== undefined && ut.setLogoLink(t.brand_uri), e(t)
            }, function(e) {
              ut.setStatus(e.message)
            })
          })
        },
        translate: function(e) {
          if (e && e.locale && e.table) try {
            K.addTable(e.locale, e.table), ut.translate()
          } catch (vt) {
            L("Failed to update text translations: " + JSON.stringify(vt), "error", "translation")
          }
        },
        tick: function() {
          ut.tick()
        },
        click: function() {
          ut.click()
        }
      };
    var dt = null,
      ft = function(e) {
        for (var t, n, r, i = {}, o = e ? e.indexOf("&") >= 0 ? e.split("&") : [e] : [], a = 0; a < o.length; a++) o[a].indexOf("=") >= 0 && (t = o[a].split("="), n = decodeURIComponent(t[0]), "false" !== (r = decodeURIComponent(t[1])) && "true" !== r || (r = "true" === r), i[n] = r);
        return i
      }(window.location.hash.slice(1));
    ! function(e) {
      T.host = e.host, T.sitekey = e.sitekey, T.file = "challenge", M.size = e.size || M.compact, M.theme = e.theme || M.theme, e.endpoint !== undefined && "undefined" !== e.endpoint && (M.endpoint = e.endpoint);
      e.reportapi !== undefined && "undefined" !== e.reportapi && (M.reportapi = e.reportapi);
      e.assethost !== undefined && "undefined" !== e.assethost && (M.assethost = e.assethost);
      e.imghost !== undefined && "undefined" !== e.imghost && (M.imghost = e.imghost);
      e.hl !== undefined && "undefined" !== e.hl && (M.language = e.hl, K.setLocale(e.hl))
    }(ft), ft.sentry && Be();
    var pt = "dark" === ft.theme ? "logo-small-dark-theme.png" : "logo-small.png";
    Te.batch([pt, "pulse.svg", "check.png"], {
        prefix: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static/images",
        fallback: "gif"
      }),
      function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        !0 !== we && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (ye.push({
          fn: e,
          args: t
        }), !1 === be && (document.addEventListener ? (document.addEventListener("DOMContentLoaded", xe), window.addEventListener("load", xe)) : (document.attachEvent("onreadystatechange", ke), window.attachEvent("onload", xe)), be = !0)) : setTimeout(function() {
          e(t)
        }, 1)
      }(function() {
        ht.init(ft);
        var e = ht.getSitekey(),
          t = Ue.sitekey(e),
          n = Ue.dummykey(e);
        t || n ? n && ut.setWarning("This hCaptcha is for testing only. Please contact the site admin if you see this.") : ut.setWarning("The sitekey for this hCaptcha is incorrect. Please contact the site admin if you see this."), (dt = Re.createChat(window.parent, ht.getID())).listen("checkbox-translate", ht.translate), dt.listen("checkbox-click", ht.click), dt.listen("checkbox-tick", ht.tick), dt.listen("checkbox-reset", function() {
            ut.reset(), ve.resetData(), ve.record()
          }), dt.listen("checkbox-location", function(e) {
            var t = ut.getLocation();
            e.resolve(t)
          }), dt.listen("checkbox-status", function(e) {
            ut.setStatus(e.text, e.a11yOnly)
          }), ut.on("select", function(e) {
            setTimeout(function() {
              ve.stop(), dt.send("checkbox-selected", {
                manifest: ve.getData(),
                charity: ht.getCharity(),
                link: ht.getLink(),
                action: e
              })
            }, 1)
          }),
          function r() {
            ht.checkSiteConfig().then(function(e) {
              if (e.endpoint && !ft.endpoint) return M.endpoint = M.endpointOverride = e.endpoint, void r();
              M.endpointOverride && !e.endpoint && (e.endpoint = M.endpointOverride), dt.send("checkbox-setup", e)
            })
          }(), ve.resetData(), ve.record(!0, !0, !0, !0), dt.send("checkbox-loaded", ut.getLocation())
      })
  }();