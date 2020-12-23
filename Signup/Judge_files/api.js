var hcaptcha = function() {
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
  
    function o(e) {
      if (!(this instanceof o)) throw new TypeError("Promises must be constructed via new");
      if ("function" != typeof e) throw new TypeError("not a function");
      this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], l(e, this)
    }
  
    function i(e, t) {
      for (; 3 === e._state;) e = e._value;
      0 !== e._state ? (e._handled = !0, o._immediateFn(function() {
        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
        if (null !== n) {
          var o;
          try {
            o = n(e._value)
          } catch (i) {
            return void a(t.promise, i)
          }
          r(t.promise, o)
        } else(1 === e._state ? r : a)(t.promise, e._value)
      })) : e._deferreds.push(t)
    }
  
    function r(e, t) {
      try {
        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
        if (t && ("object" == typeof t || "function" == typeof t)) {
          var n = t.then;
          if (t instanceof o) return e._state = 3, e._value = t, void s(e);
          if ("function" == typeof n) return void l((i = n, r = t, function() {
            i.apply(r, arguments)
          }), e)
        }
        e._state = 1, e._value = t, s(e)
      } catch (c) {
        a(e, c)
      }
      var i, r
    }
  
    function a(e, t) {
      e._state = 2, e._value = t, s(e)
    }
  
    function s(e) {
      2 === e._state && 0 === e._deferreds.length && o._immediateFn(function() {
        e._handled || o._unhandledRejectionFn(e._value)
      });
      for (var t = 0, n = e._deferreds.length; t < n; t++) i(e, e._deferreds[t]);
      e._deferreds = null
    }
  
    function c(e, t, n) {
      this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
    }
  
    function l(e, t) {
      var n = !1;
      try {
        e(function(e) {
          n || (n = !0, r(t, e))
        }, function(e) {
          n || (n = !0, a(t, e))
        })
      } catch (o) {
        if (n) return;
        n = !0, a(t, o)
      }
    }
    o.prototype["catch"] = function(e) {
      return this.then(null, e)
    }, o.prototype.then = function(e, t) {
      var o = new this.constructor(n);
      return i(this, new c(e, t, o)), o
    }, o.prototype["finally"] = e, o.all = function(e) {
      return new o(function(t, n) {
        if (!e || "undefined" == typeof e.length) throw new TypeError("Promise.all accepts an array");
        var o = Array.prototype.slice.call(e);
        if (0 === o.length) return t([]);
        var i = o.length;
  
        function r(e, a) {
          try {
            if (a && ("object" == typeof a || "function" == typeof a)) {
              var s = a.then;
              if ("function" == typeof s) return void s.call(a, function(t) {
                r(e, t)
              }, n)
            }
            o[e] = a, 0 == --i && t(o)
          } catch (c) {
            n(c)
          }
        }
        for (var a = 0; a < o.length; a++) r(a, o[a])
      })
    }, o.resolve = function(e) {
      return e && "object" == typeof e && e.constructor === o ? e : new o(function(t) {
        t(e)
      })
    }, o.reject = function(e) {
      return new o(function(t, n) {
        n(e)
      })
    }, o.race = function(e) {
      return new o(function(t, n) {
        for (var o = 0, i = e.length; o < i; o++) e[o].then(t, n)
      })
    }, o._immediateFn = "function" == typeof setImmediate && function(e) {
      setImmediate(e)
    } || function(e) {
      t(e, 0)
    }, o._unhandledRejectionFn = function(e) {
      "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    };
    var h, d = function() {
      if ("undefined" != typeof self) return self;
      if ("undefined" != typeof window) return window;
      if ("undefined" != typeof global) return global;
      throw new Error("unable to locate global object")
    }();
    "Promise" in d ? d.Promise.prototype["finally"] || (d.Promise.prototype["finally"] = e) : d.Promise = o, Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
      return function(t, n) {
        if (null === this || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined");
        var o = e(this),
          i = o.length >>> 0,
          r = Math.min(0 | n, i);
        if (r < 0) r = Math.max(0, i + r);
        else if (r >= i) return -1;
        if (void 0 === t) {
          for (; r !== i; ++r)
            if (void 0 === o[r] && r in o) return r
        } else if (t != t) {
          for (; r !== i; ++r)
            if (o[r] != o[r]) return r
        } else
          for (; r !== i; ++r)
            if (o[r] === t) return r;
        return -1
      }
    }(Object)), Array.isArray || (Array.isArray = function(e) {
      return "[object Array]" === Object.prototype.toString.call(e)
    }), document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function(e) {
      if (document.querySelectorAll) return document.querySelectorAll("." + e);
      for (var t = document.getElementsByTagName("*"), n = new RegExp("(^|\\s)" + e + "(\\s|$)"), o = [], i = 0; i < t.length; i++) n.test(t[i].className) && o.push(t[i]);
      return o
    }), String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
      return this.substr(!t || t < 0 ? 0 : +t, e.length) === e
    }), String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
      return (t === undefined || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e
    });
    try {
      if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
        var u = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
        Object.defineProperty(Element.prototype, "textContent", {
          get: function() {
            return u.get.call(this)
          },
          set: function(e) {
            return u.set.call(this, e)
          }
        })
      }
    } catch (ut) {}
    Function.prototype.bind || (Function.prototype.bind = function(e) {
      if ("function" != typeof this) throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
      var t = Array.prototype.slice.call(arguments, 1),
        n = this,
        o = function() {},
        i = function() {
          return n.apply(this instanceof o ? this : e, t.concat(Array.prototype.slice.call(arguments)))
        };
      return this.prototype && (o.prototype = this.prototype), i.prototype = new o, i
    }), "function" != typeof Object.create && (Object.create = function(e, t) {
      function n() {}
      if (n.prototype = e, "object" == typeof t)
        for (var o in t) t.hasOwnProperty(o) && (n[o] = t[o]);
      return new n
    }), Date.now || (Date.now = function() {
      return (new Date).getTime()
    }), window.console || (window.console = {});
    for (var p, m, f = ["error", "info", "log", "show", "table", "trace", "warn"], g = function(e) {}, y = f.length; --y > -1;) h = f[y], window.console[h] || (window.console[h] = g);
    if (window.atob) try {
      window.atob(" ")
    } catch (pt) {
      window.atob = (p = window.atob, (m = function(e) {
        return p(String(e).replace(/[\t\n\f\r ]+/g, ""))
      }).original = p, m)
    } else {
      var v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        w = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
      window.atob = function(e) {
        if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !w.test(e)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
        var t, n, o;
        e += "==".slice(2 - (3 & e.length));
        for (var i = "", r = 0; r < e.length;) t = v.indexOf(e.charAt(r++)) << 18 | v.indexOf(e.charAt(r++)) << 12 | (n = v.indexOf(e.charAt(r++))) << 6 | (o = v.indexOf(e.charAt(r++))), i += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === o ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
        return i
      }
    }
    Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
      this.returnValue = !1
    }), Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
      this.cancelBubble = !0
    });
    var b = [],
      _ = [],
      C = {
        add: function(e) {
          b.push(e)
        },
        remove: function(e) {
          for (var t = !1, n = b.length; --n > -1 && !1 === t;) b[n].id === e.id && (t = b[n], b.splice(n, 1));
          return t
        },
        each: function(e) {
          for (var t = -1; ++t < b.length;) e(b[t])
        },
        isValidId: function(e) {
          for (var t = !1, n = -1; ++n < b.length && !1 === t;) b[n].id === e && (t = !0);
          return t
        },
        getByIndex: function(e) {
          for (var t = !1, n = -1; ++n < b.length && !1 === t;) n === e && (t = b[n]);
          return t
        },
        getById: function(e) {
          for (var t = !1, n = -1; ++n < b.length && !1 === t;) b[n].id === e && (t = b[n]);
          return t
        },
        getCaptchaIdList: function() {
          var e = [];
          return C.each(function(t) {
            e.push(t.id)
          }), e
        },
        pushSession: function(e, t) {
          _.push([e, t])
        },
        getSession: function() {
          return _
        }
      };
  
    function x(e, t) {
      "object" != typeof e || t || (t = e, e = null);
      var n = !1;
      if (!(n = e ? C.getById(e) : C.getByIndex(0))) throw e ? Error("[hCaptcha] invalid captcha id: " + e) : Error("[hCaptcha] no captchas exist.");
      n.onReady(n.initChallenge, t)
    }
  
    function k() {
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
    var E = {
        queue: k,
        depth: function mt(e, t, n) {
          if ("object" == typeof e && e[t] && e[t].length > 0)
            for (var o = e[t].length; --o > -1;) mt(e[t][o], t, n);
          e !== undefined && n(e)
        },
        breathe: function(e, t, n) {
          var o = new k,
            i = null;
          for (o.add(e), i = o.remove(); i;) {
            for (var r = 0; r < i[t].length; r++) o.add(i[t][r]);
            n(i), i = o.remove()
          }
        }
      },
      S = [{
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
      O = [{
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
      I = navigator.userAgent,
      B = {
        getAgent: function() {
          return I
        },
        getBrowser: function(e) {
          return T(e || I, S)
        },
        getOS: function(e) {
          return T(e || I, O)
        }
      };
  
    function P(e, t) {
      try {
        var n = new RegExp(t).exec(e);
        return n ? {
          name: n[1] || "Other",
          major: n[2] || "0",
          minor: n[3] || "0",
          patch: n[4] || "0"
        } : null
      } catch (pt) {
        return null
      }
    }
  
    function T(e, t) {
      for (var n = null, o = null, i = -1, r = !1; ++i < t.length && !r;) {
        n = t[i];
        for (var a = -1; ++a < n.patterns.length && !r;) r = null !== (o = P(e, n.patterns[a]))
      }
      return r ? (o.family = n.family || n.name_replace || o.name, n.name_replace && (o.name = n.name_replace), n.major_replace && (o.major = n.major_replace), n.minor_replace && (o.minor = n.minor_replace), n.patch_replace && (o.minor = n.patch_replace), o) : {
        family: "Other",
        name: "Other",
        major: "0",
        minor: "0",
        patch: "0"
      }
    }
  
    function A() {
      var e = this,
        t = B.getBrowser(),
        n = B.getAgent();
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
      } catch (ut) {}
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
      } catch (pt) {
        return !1
      }
    };
    var $ = {
        Browser: new A,
        System: new function() {
          var e, t, n = B.getOS(),
            o = B.getAgent();
          this.mobile = (e = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), t = !1, n && (t = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(n.name) >= 0), e && t), this.dpr = function() {
            return window.devicePixelRatio || 1
          }, this.mobile && n && "Windows" === n.family && o.indexOf("touch") < 0 && (this.mobile = !1), this.os = "iOS" === n.family ? "ios" : "Android" === n.family ? "android" : "Mac OS X" === n.family ? "mac" : "Windows" === n.family ? "windows" : "Linux" === n.family ? "linux" : n.family.toLowerCase(), this.version = function() {
            if (!n) return "unknown";
            var e = n.major;
            return n.minor && (e += "." + n.minor), n.patch && (e += "." + n.patch), e
          }()
        }
      },
      M = {
        host: null,
        file: null,
        sitekey: null,
        pingdom: "safari" === $.Browser.type && "windows" !== $.System.os && "mac" !== $.System.os && "ios" !== $.System.os && "android" !== $.System.os,
        assetDomain: "https://assets.hcaptcha.com",
        assetUrl: "https://assets.hcaptcha.com/captcha/v1/31b26e4/static",
        width: null,
        height: null,
        mobile: null
      },
      j = {
        language: null,
        reportapi: "https://accounts.hcaptcha.com",
        endpoint: "https://hcaptcha.com",
        endpointOverride: null,
        size: "normal",
        theme: "light",
        assethost: null,
        imghost: null,
        recaptchacompat: "true"
      },
      L = "Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> to complete this captcha.";
  
    function R(e, t) {
      e.style.width = "304px", e.style.height = "78px", e.style.backgroundColor = "#f9e5e5", e.style.position = "relative", e.innerHTML = "";
      var n = document.createElement("div");
      n.style.width = "284px", n.style.position = "absolute", n.style.top = "12px", n.style.left = "10px", n.style.fontFamily = "arial, sans-serif", n.style.color = "#7c0a06", n.style.fontSize = "14px", n.style.fontWeight = "normal", n.style.lineHeight = "18px", n.innerHTML = t || L, e.appendChild(n)
    }
    var D = !0;
  
    function z(e) {
      var t = {
        message: e.name + ": " + e.message
      };
      e.stack && (t.stack_trace = {
        trace: e.stack
      }), N("report error", "internal", "debug", t), W("internal error", "error", M.file)
    }
  
    function W(e, t, n, o) {
      D && window.Raven && Raven.captureMessage(e, {
        level: t,
        logger: n
      })
    }
  
    function N(e, t, n, o) {
      D && window.Raven && Raven.captureBreadcrumb({
        message: e,
        category: t,
        level: n,
        data: o
      })
    }
  
    function U() {
      try {
        (function(e) {
          var t = [].slice.call(arguments, 1);
          "string" == typeof e ? window[e] ? "function" == typeof window[e] ? window[e].apply(null, t) : console.log("[hCaptcha] Callback '" + e + "' is not a function.") : console.log("[hCaptcha] Callback '" + e + "' is not defined.") : "function" == typeof e ? e.apply(null, t) : console.log("[hcaptcha] Invalid callback '" + e + "'.")
        }).apply(null, arguments)
      } catch (ut) {
        console.error("[hCaptcha] There was an error in your callback."), console.error(ut)
      }
    }
  
    function F(e, t) {
      var n, o = "attempts" in (t = t || {}) ? t.attempts : 1,
        i = t.delay || 0,
        r = t.onFail;
      return n = function(t, n, a) {
        e().then(t, function(e) {
          var t = o-- > 0;
          r && (t = !1 !== r(e) && t), t ? setTimeout(a, i) : n(e)
        })
      }, new Promise(function(e, t) {
        n(e, t, function o() {
          n(e, t, o)
        })
      })
    }
    var H = {
        eventName: function(e) {
          var t = e;
          return "down" === e || "up" === e || "move" === e || "over" === e || "out" === e ? t = !$.System.mobile || "down" !== e && "up" !== e && "move" !== e ? "mouse" + e : "down" === e ? "touchstart" : "up" === e ? "touchend" : "touchmove" : "enter" === e && (t = "keydown"), t
        },
        actionName: function(e) {
          var t = e;
          return "touchstart" === t || "mousedown" === t ? t = "down" : "touchmove" === t || "mousemove" === t ? t = "move" : "touchend" === t || "mouseup" === t ? t = "up" : "mouseover" === t ? t = "over" : "mouseout" === t && (t = "out"), t
        },
        eventCallback: function(e, t, n) {
          var o = H.actionName(e);
          return function(i) {
            if (i = i || window.event, "down" === o || "move" === o || "up" === o || "over" === o || "out" === o || "click" === o) {
              var r = H.eventCoords(i),
                a = n.getBoundingClientRect();
              i.windowX = r.x, i.windowY = r.y, i.elementX = i.windowX - (a.x || a.left), i.elementY = i.windowY - (a.y || a.top)
            }
            i.keyNum = i.which || i.keyCode || 0, "enter" === e && 13 !== i.keyNum && 32 !== i.keyNum || (i.action = o, i.targetElement = n, t(i))
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
      X = ["Webkit", "Moz", "ms"],
      Y = document.createElement("div").style,
      q = {};
  
    function J(e) {
      var t = q[e];
      return t || (e in Y ? e : q[e] = function(e) {
        for (var t = e[0].toUpperCase() + e.slice(1), n = X.length; n--;)
          if ((e = X[n] + t) in Y) return e
      }(e) || e)
    }
  
    function V(e, t, n) {
      if (this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, "object" == typeof e) {
        this.dom = e;
        var o = [],
          i = [];
        e.className && (i = e.className.split(" "));
        for (var r = 0; r < i.length; r++) "" !== i[r] && " " !== i[r] && o.push(i[r]);
        this._clss = o
      } else n !== undefined && null !== n || (n = !0), (e === undefined || "string" == typeof e && (e.indexOf("#") >= 0 || e.indexOf(".") >= 0)) && (e && (t = e), e = "div"), this.dom = document.createElement(e), t && (t.indexOf("#") >= 0 ? this.dom.id = t.split("#")[1] : (t.indexOf(".") >= 0 && (t = t.split(".")[1]), this.addClass.call(this, t)));
      !0 === n && (this._frag = document.createDocumentFragment(), this._frag.appendChild(this.dom))
    }
    V.prototype.createElement = function(e, t) {
      var n = new V(e, t, !1);
      return this.appendElement.call(this, n), this._nodes.push(n), n
    }, V.prototype.appendElement = function(e) {
      if (e === undefined) return z({
        name: "DomElement Add Child",
        message: "Child Element is undefined"
      });
      var t;
      t = e._frag !== undefined && null !== e._frag ? e._frag : e.dom !== undefined ? e.dom : e;
      try {
        e instanceof V && (e._parent = this), this.dom.appendChild(t)
      } catch (pt) {
        z({
          name: "DomElement Add Child",
          message: "Failed to append child."
        })
      }
      return this
    }, V.prototype.removeElement = function(e) {
      try {
        var t = e;
        if (e.dom) {
          t = t.dom;
          for (var n = e._nodes.length; --n > -1;) e.dom.removeChild(e._nodes[n].dom || e._nodes[n]), e._nodes.splice(n, 1)
        } else
          for (var o = this._nodes.length; --o > -1;) this._nodes[o] === t && this._nodes.splice(o, 1);
        t.parentNode === this.dom && this.dom.removeChild(t)
      } catch (pt) {
        z({
          name: "DomElement Remove Child",
          message: "Failed to remove child."
        })
      }
    }, V.prototype.addClass = function(e) {
      return !1 === this.hasClass.call(this, e) && (this._clss.push(e), this.dom.className = this._clss.join(" ")), this
    }, V.prototype.hasClass = function(e) {
      for (var t = !1, n = 0; n < this._clss.length; n++) this._clss[n] === e && (t = !0);
      return t
    }, V.prototype.removeClass = function(e) {
      for (var t = this._clss.length; --t > -1;) this._clss[t] === e && this._clss.splice(t, 1);
      return this.dom.className = this._clss.join(" "), this
    }, V.prototype.text = function(e) {
      if (this && this.dom) {
        if (!e) return this.dom.textContent;
        for (var t, n, o, i, r = /&(.*?);/g, a = /<[a-z][\s\S]*>/i; null !== (t = r.exec(e));) {
          !1 === a.test(t[0]) ? (o = t[0], i = void 0, (i = document.createElement("div")).innerHTML = o, n = i.textContent, e = e.replace(new RegExp(t[0], "g"), n)) : e = e.replace(t[0], "")
        }
        return this.dom.textContent = e, this
      }
    }, V.prototype.content = V.prototype.text, V.prototype.css = function(e) {
      var t;
      for (var n in e) {
        t = e[n];
        try {
          if ("opacity" !== n && "zIndex" !== n && "fontWeight" !== n && isFinite(t) && parseFloat(t) === t && (t += "px"), "ie" === $.Browser.type && 8 === $.Browser.version && "opacity" === n) this.dom.style.filter = "alpha(opacity=" + 100 * t + ")";
          else {
            var o = J(n);
            this.dom.style[o] = t
          }
        } catch (ut) {}
      }
      return this
    }, V.prototype.backgroundImage = function(e, t, n, o) {
      var i = t !== undefined && n !== undefined,
        r = {
          "-ms-high-contrast-adjust": "none"
        };
      if ("object" == typeof t && (o = t), o === undefined && (o = {}), i) {
        var a = e.width / e.height,
          s = t,
          c = s / a;
        o.cover && c < n && (s = (c = n) * a), o.contain && c > n && (s = (c = n) * a), r.width = s, r.height = c, o.center && (r.marginLeft = -s / 2, r.marginTop = -c / 2, r.position = "absolute", r.left = "50%", r.top = "50%"), (o.left || o.right) && (r.left = o.left || 0, r.top = o.top || 0)
      }
      "ie" === $.Browser.type && 8 === $.Browser.version ? r.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e.src + "',sizingMethod='scale')" : (r.background = "url(" + e.src + ")", r.backgroundPosition = "50% 50%", r.backgroundRepeat = "no-repeat", r.backgroundSize = i ? s + "px " + c + "px" : o.cover ? "cover" : o.contain ? "contain" : "100%"), this.css.call(this, r)
    }, V.prototype.setAttribute = function(e, t) {
      var n;
      if ("object" == typeof e)
        for (var o in e) n = e[o], this.dom.setAttribute(o, n);
      else this.dom.setAttribute(e, t)
    }, V.prototype.removeAttribute = function(e, t) {
      var n;
      if ("object" == typeof e)
        for (var o in e) n = e[o], this.dom.removeAttribute(o, n);
      else this.dom.removeAttribute(e, t)
    }, V.prototype.addEventListener = function(e, t, n) {
      var o = {
        event: H.eventName(e),
        handler: H.eventCallback(e, t, this.dom),
        callback: t
      };
      this._listeners.push(o), this.dom.addEventListener ? this.dom.addEventListener(o.event, o.handler, n) : this.dom.attachEvent("on" + o.event, o.handler)
    }, V.prototype.removeEventListener = function(e, t, n) {
      for (var o, i = this._listeners.length; --i > -1;)(o = this._listeners[i]).event === e && o.callback === t && (this._listeners.splice(i, 1), this.dom.removeEventListener ? this.dom.removeEventListener(o.event, o.handler, n) : this.dom.detachEvent("on" + o.event, o.handler))
    }, V.prototype.focus = function() {
      this.dom.focus()
    }, V.prototype.blur = function() {
      this.dom.blur()
    }, V.prototype.html = function(e) {
      return e && (this.dom.innerHTML = e), this.dom.innerHTML
    }, V.prototype.__destroy = function() {
      for (var e, t = this._listeners.length; --t > -1;) e = this._listeners[t], this._listeners.splice(t, 1), this.dom.removeEventListener ? this.dom.removeEventListener(e.event, e.handler) : this.dom.detachEvent("on" + e.event, e.handler);
      return this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, e = null, null
    };
    var Q = {
      self: function(e, t) {
        var n = {},
          o = Array.prototype.slice.call(arguments, 2);
        for (var i in t.apply(e, o), e) n[i] = e[i]
      },
      proto: function(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e
      }
    };
  
    function K(e, t) {
      Q.self(this, V, t || "div", e), this.children = [], this._events = []
    }
    Q.proto(K, V), K.prototype.initComponent = function(e, t, n) {
      var o = new e(t);
      return o._parent = this, this.children.push(o), o.dom && (n !== undefined ? n.appendElement && n.appendElement(o) : this.appendElement(o)), o
    }, K.prototype.destroy = function() {
      var e = this;
      try {
        E.depth(this, "children", function(t) {
          if (e !== t)
            for (var n = e.children.length; --n > -1;) e.children[n] === t && e.children.splice(n, 1);
          t._destroy && t._destroy(), t = null
        })
      } catch (pt) {
        throw new Error("Trouble destroying nodes: " + pt)
      }
      return null
    }, K.prototype._destroy = function() {
      try {
        this.onDestroy && this.onDestroy(), this._parent.removeElement && this._parent.removeElement(this);
        for (var e = this._events.length; --e > -1;) this._events.splice(e, 1);
        this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
      } catch (pt) {
        z({
          name: "DomComponent",
          message: "Failed to destroy."
        })
      }
    }, K.prototype.on = function(e, t) {
      for (var n = this._events.length, o = !1; --n > -1 && !1 === o;) this._events[n].event === e && (o = this._events[n]);
      !1 === o && (o = {
        event: e,
        listeners: []
      }, this._events.push(o)), o.listeners.push(t)
    }, K.prototype.off = function(e, t) {
      for (var n = this._events.length; --n > -1;)
        if (this._events[n].event === e) {
          for (var o = this._events[n].listeners.length; --o > -1;) this._events[n].listeners[o] === t && this._events[n].listeners.splice(o, 1);
          0 === this._events[n].listeners.length && this._events.splice(n, 1)
        }
    }, K.prototype.emit = function(e) {
      for (var t = Array.prototype.slice.call(arguments, 1), n = this._events.length; --n > -1 && this._events;)
        if (this._events[n].event === e)
          for (var o = this._events[n].listeners.length; --o > -1;) this._events[n].listeners[o].apply(this, t)
    };
    var G = {
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
      Z = {
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
      ee = null,
      te = {
        translate: function(e) {
          var t = te.getBestTrans(Z);
          return t && t[e] || e
        },
        getBestTrans: function(e) {
          var t = te.getLocale();
          return t in e ? e[t] : te.getShortLocale(t) in e ? e[te.getShortLocale(t)] : "en" in e ? e.en : null
        },
        getLocale: function() {
          var e = ee || window.navigator.userLanguage || window.navigator.language,
            t = te.getShortLocale(e);
          return "in" === t && (e = "id"), "iw" === t && (e = "he"), "nb" === t && (e = "no"), "ji" === t && (e = "yi"), "zh-CN" === e && (e = "zh"), "jv" === t && (e = "jw"), G[e] ? e : G[t] ? t : "en"
        },
        setLocale: function(e) {
          ee = e
        },
        getShortLocale: function(e) {
          return e.indexOf("-") >= 0 ? e.substring(0, e.indexOf("-")) : e
        },
        isShortLocale: function(e) {
          return 2 === e.length || 3 === e.length
        },
        addTable: function(e, t) {
          if (t || (t = Object.create(null)), Z[e]) {
            var n = Z[e];
            for (var o in t) n[o] = t[o]
          } else Z[e] = t;
          return Z[e]
        },
        getTable: function(e) {
          return Z[e]
        },
        addTables: function(e) {
          for (var t in e) te.addTable(t, e[t]);
          return Z
        },
        getTables: function() {
          return Z
        }
      },
      ne = {
        touchstart: "ts",
        touchend: "te",
        touchmove: "tm",
        touchcancel: "tc"
      },
      oe = {
        mousedown: "md",
        mouseup: "mu",
        mousemove: "mm"
      },
      ie = {
        keydown: "kd",
        keyup: "ku"
      },
      re = {
        devicemotion: "dm"
      },
      ae = function(e, t) {
        var n = oe[e],
          o = null;
        return function(e) {
          o = function(e) {
            return [e.windowX, e.windowY, Date.now()]
          }(e), t(n, o)
        }
      },
      se = function(e, t) {
        var n = ne[e],
          o = null;
        return function(e) {
          o = function(e) {
            for (var t, n = e.touches && e.touches.length >= 1 ? e.touches : e.changedTouches, o = [], i = 0; i < n.length; i++) t = H.eventCoords(n[i]), o.push([n[i].identifier, t.x, t.y]);
            return o.push(Date.now()), o
          }(e), t(n, o)
        }
      },
      ce = function(e, t) {
        var n = ie[e],
          o = null;
        return function(e) {
          o = function(e) {
            return [e.keyNum, Date.now()]
          }(e), t(n, o)
        }
      },
      le = function(e, t) {
        var n = re[e],
          o = null,
          i = [];
        return function(e) {
          null !== (o = function(e, t) {
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
              o = [];
            if (0 === t.length) t = n, o = n;
            else {
              for (var i, r = 0, a = 0; a < 6; a++) i = t[a] - n[a], o.push(n[a]), r += Math.abs(i);
              if (o.push(Date.now()), t = n, r <= 0) return null
            }
            return {
              motion: o,
              prevmotion: t
            }
          }(e, i)) && (i = o.prevmotion, o = o.motion, t(n, o))
        }
      };
    var he = {},
      de = {},
      ue = 500,
      pe = 5e3,
      me = Date.now(),
      fe = !1,
      ge = !1,
      ye = null,
      ve = !0,
      we = !0,
      be = !1,
      _e = !0,
      Ce = {
        record: function(e, t, n, o) {
          ve = e === undefined ? ve : e, we = n === undefined ? we : n, be = t === undefined ? be : t, _e = o === undefined ? _e : o, !1 === ge && (ye = new V(document.body), ve && (ye.addEventListener("mousedown", ae("mousedown", xe)), ye.addEventListener("mousemove", ae("mousemove", xe)), ye.addEventListener("mouseup", ae("mouseup", xe))), !0 === be && (ye.addEventListener("keyup", ce("keyup", xe)), ye.addEventListener("keydown", ce("keydown", xe))), we && !0 === $.Browser.hasEvent("touchstart", document.body) && (ye.addEventListener("touchstart", se("touchstart", xe)), ye.addEventListener("touchmove", se("touchmove", xe)), ye.addEventListener("touchend", se("touchend", xe))), _e && !0 === $.Browser.hasEvent("devicemotion", window) && ye.addEventListener("devicemotion", le("devicemotion", xe)), ge = !0), he.st = Date.now(), fe = !0
        },
        stop: function() {
          !1 !== fe && (fe = !1)
        },
        time: function() {
          return me
        },
        getData: function() {
          return he
        },
        setData: function(e, t) {
          he[e] || (he[e] = null), Array.isArray(he[e]) ? he[e].push(t) : he[e] = t
        },
        resetData: function() {
          he = {}, de = {}
        },
        circBuffPush: xe
      };
  
    function xe(e, t, n, o) {
      if (!1 !== fe)
        if (he[e]) {
          var i = n || ue,
            r = o || pe;
          if (he[e].length < r) he[e].push(t);
          else {
            var a = de[e];
            0 === a && (a = i);
            var s = (a + 1) % r;
            de[e] = s, he[e][a] = t
          }
        } else he[e] = [t], de[e] = 0
    }
    var ke = [],
      Ee = !1,
      Se = !1;
  
    function Oe() {
      "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || Ie()
    }
  
    function Ie() {
      if (!1 === Se) {
        for (var e = 0; e < ke.length; e++) ke[e].fn.apply(null, ke[e].args);
        ke = []
      }
      Se = !0, document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", Ie), window.removeEventListener("load", Ie)) : (document.detachEvent("onreadystatechange", Oe), window.detachEvent("onload", Ie))
    }
    new V(document);
    var Be = new V(window);
  
    function Pe(e, t) {
      var n = e instanceof HTMLIFrameElement;
      try {
        n ? e.parentNode && e.contentWindow.postMessage(JSON.stringify(t), "*") : e.postMessage(JSON.stringify(t), "*")
      } catch (ut) {
        W(ut.message, "messaging", "error")
      }
    }
  
    function Te(e, t) {
      this.target = e, this.id = t, this.messages = [], this.incoming = [], this.waiting = []
    }
  
    function Ae(e, t) {
      var n = this,
        o = {},
        i = new Promise(function(e, t) {
          o.resolve = e, o.reject = t
        }),
        r = {
          source: "hcaptcha",
          label: e,
          id: n.id,
          promise: null,
          lookup: t
        };
      return i.then(function(e) {
        r.promise = "resolve", null !== e && (r.contents = e), Pe(n.target, r)
      })["catch"](function(e) {
        r.promise = "reject", null !== e && (r.error = e), Pe(n.target, r)
      }), o
    }
    Te.prototype.setID = function(e) {
      this.id = e
    }, Te.prototype.contact = function(e, t) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      var n = this,
        o = Date.now().toString(36),
        i = {
          source: "hcaptcha",
          label: e,
          id: this.id,
          promise: "create",
          lookup: o
        };
      if (t) {
        if ("object" != typeof t) throw new Error("Message must be an object.");
        i.contents = t
      }
      return new Promise(function(t, r) {
        n.waiting.push({
          label: e,
          reject: r,
          resolve: t,
          lookup: o
        }), Pe(n.target, i)
      })
    }, Te.prototype.listen = function(e, t) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      for (var n = this.messages.length, o = !1; --n > -1 && !1 === o;) this.messages[n].label === e && (o = this.messages[n]);
      !1 === o && (o = {
        label: e,
        listeners: []
      }, this.messages.push(o)), o.listeners.push(t)
    }, Te.prototype.answer = function(e, t) {
      if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
      for (var n = this.incoming.length, o = !1; --n > -1 && !1 === o;) this.incoming[n].label === e && (o = this.incoming[n]);
      !1 === o && (o = {
        label: e,
        listeners: []
      }, this.incoming.push(o)), o.listeners.push(t)
    }, Te.prototype.send = function(e, t) {
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
      Pe(this.target, n)
    }, Te.prototype.check = function(e, t) {
      for (var n = [].concat.apply([], [this.messages, this.incoming, this.waiting]), o = [], i = -1; ++i < n.length;)
        if (n[i].label === e) {
          if (t && n[i].lookup && t !== n[i].lookup) continue;
          o.push(n[i])
        } return o
    }, Te.prototype.respond = function(e) {
      for (var t, n, o = -1, i = 0, r = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++o < r.length;)
        if (r[o].label === e.label) {
          if (e.lookup && r[o].lookup && e.lookup !== r[o].lookup) continue;
          var a = [];
          if (t = r[o], e.error && a.push(e.error), e.contents && a.push(e.contents), e.promise && "create" !== e.promise) {
            t[e.promise].apply(t[e.promise], a);
            for (var s = this.waiting.length, c = !1; --s > -1 && !1 === c;) this.waiting[s].label === t.label && this.waiting[s].lookup === t.lookup && (c = !0, this.waiting.splice(s, 1));
            continue
          }
          for (i = 0; i < t.listeners.length; i++) {
            if (n = t.listeners[i], "create" === e.promise) {
              var l = Ae.call(this, t.label, e.lookup);
              a.push(l)
            }
            n.apply(n, a)
          }
        } r = null
    }, Te.prototype.destroy = function() {
      return this.messages = null, this.incoming = null, this.waiting = null, null
    };
    var $e = {
      chats: [],
      isSupported: function() {
        return !!window.postMessage
      },
      createChat: function(e, t) {
        var n = new Te(e, t);
        return $e.chats.push(n), n
      },
      addChat: function(e) {
        $e.chats.push(e)
      },
      removeChat: function(e) {
        for (var t = !1, n = $e.chats.length; --n > -1 && !1 === t;) e.id === $e.chats[n].id && e.target === $e.chats[n].target && (t = $e.chats[n], $e.chats.splice(n, 1));
        return t
      },
      handle: function(e) {
        var t = e.data;
        if ("string" == typeof t) try {
          if (!(t.indexOf("hcaptcha") >= 0)) return;
          t = JSON.parse(t);
          for (var n, o = $e.chats, i = -1; ++i < o.length;)(n = o[i]).id === t.id && n.respond(t)
        } catch (ut) {
          N("postMessage handler error", "postMessage", "debug", {
            event: e,
            error: ut
          })
        }
      }
    };
    window.addEventListener ? window.addEventListener("message", $e.handle) : window.attachEvent("onmessage", $e.handle);
    var Me = {
        getCookie: function(e) {
          var t = document.cookie.replace(/ /g, "").split(";");
          try {
            for (var n = "", o = t.length; o-- && !n;) t[o].indexOf(e) >= 0 && (n = t[o]);
            return n
          } catch (pt) {
            return ""
          }
        },
        hasCookie: function(e) {
          return !!Me.getCookie(e)
        },
        supportsAPI: function() {
          try {
            return "hasStorageAccess" in document && "requestStorageAccess" in document
          } catch (pt) {
            return !1
          }
        },
        hasAccess: function() {
          return new Promise(function(e) {
            document.hasStorageAccess().then(function() {
              e(!0)
            })["catch"](function() {
              e(!1)
            })
          })
        },
        requestAccess: function() {
          try {
            return document.requestStorageAccess()
          } catch (pt) {
            return Promise.resolve()
          }
        }
      },
      je = function(e) {
        for (var t, n, o, i = {}, r = e ? e.indexOf("&") >= 0 ? e.split("&") : [e] : [], a = 0; a < r.length; a++) r[a].indexOf("=") >= 0 && (t = r[a].split("="), n = decodeURIComponent(t[0]), "false" !== (o = decodeURIComponent(t[1])) && "true" !== o || (o = "true" === o), i[n] = o);
        return i
      },
      Le = function(e) {
        var t = [];
        for (var n in e) t.push([encodeURIComponent(n), encodeURIComponent(e[n])].join("="));
        return t.join("&")
      };
  
    function Re(e, t) {
      this.id = e, this.width = null, this.height = null, this.mobile = !1, this.ready = !1, this.listeners = [], this.config = t, this._visible = !1, this._selected = !1, this.$iframe = new V("iframe"), this._host = M.host || window.location.hostname;
      var n = M.assetUrl;
      j.assethost && (n = j.assethost + M.assetUrl.replace(M.assetDomain, "")), this.$iframe.dom.src = n + "/hcaptcha-challenge.html#id=" + this.id + "&host=" + this._host + (t ? "&" + Le(this.config) : ""), this.$iframe.dom.title = "Main content of the hCaptcha challenge", this.$iframe.dom.frameBorder = 0, this.$iframe.dom.scrolling = "no", this.setupParentContainer(t), this._hasCustomContainer ? (this._hideIframe(), this._parent.appendChild(this.$iframe.dom)) : (this.$container = new V("div"), this.$wrapper = this.$container.createElement("div"), this.$overlay = this.$container.createElement("div"), this.$arrow = this.$container.createElement("div"), this.$arrow.fg = this.$arrow.createElement("div"), this.$arrow.bg = this.$arrow.createElement("div"), this.style.call(this), this.$wrapper.appendElement(this.$iframe), this._parent.appendChild(this.$container.dom), this.$container.setAttribute("aria-hidden", !0)), this.chat = $e.createChat(this.$iframe.dom, e), this.$iframe.dom.contentWindow.focus()
    }
  
    function De(e, t, n) {
      this.id = t, this.response = null, this.location = {
        tick: null,
        offset: null,
        bounding: null
      }, this.config = n, this._ticked = !0, this.$container = e instanceof V ? e : new V(e), this._host = M.host || window.location.hostname, this.$iframe = new V("iframe");
      var o = M.assetUrl;
      j.assethost && (o = j.assethost + M.assetUrl.replace(M.assetDomain, "")), this.$iframe.dom.src = o + "/hcaptcha-checkbox.html#id=" + this.id + "&host=" + this._host + (n ? "&" + Le(this.config) : ""), this.$iframe.dom.title = "widget containing checkbox for hCaptcha security challenge", this.$iframe.dom.tabIndex = this.config.tabindex || 0, this.$iframe.dom.frameBorder = "0", this.$iframe.dom.scrolling = "no", this.config.size && "invisible" == this.config.size && this.$iframe.setAttribute("aria-hidden", "true"), this.$iframe.setAttribute("data-hcaptcha-widget-id", t), this.$iframe.setAttribute("data-hcaptcha-response", ""), this.$container.appendElement(this.$iframe), "off" !== j.recaptchacompat && (this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + t), this.$textArea0.dom.name = "g-recaptcha-response", this.$textArea0.css({
        display: "none"
      })), this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + t), this.$textArea1.dom.name = "h-captcha-response", this.$textArea1.css({
        display: "none"
      }), this.chat = $e.createChat(this.$iframe.dom, t)
    }
  
    function ze(e, t, n) {
      if (!n.sitekey) throw new We("Missing sitekey", "https://hcaptcha.com/docs/configuration#jsapi");
      this.id = t, this.visible = !1, this.overflow = {
        override: !1,
        cssUsed: !0,
        value: null,
        scroll: 0
      }, this.onError = null, this.onPass = null, this.onExpire = null, this.onChalExpire = null, this.onOpen = null, this.onClose = null, this._ready = !1, this._listeners = [], this.config = n, this._userEscaped = !1, this._userClosed = !1, this._userPassed = !1, this._responseTimer = null, this._expiredChallenge = !1, this._expiredResponse = !1, this.challenge = new Re(t, n), this.checkbox = new De(e, t, n), this.initChallenge = this.initChallenge.bind(this), this.closeChallenge = this.closeChallenge.bind(this), this.displayChallenge = this.displayChallenge.bind(this)
    }
  
    function We(e, t) {
      var n = "[hCaptcha] " + e;
      t && (n += " - " + t), this.message = "hCaptcha has failed to initialize. Please see the developer tools console for more information.", this.reason = n
    }
  
    function Ne(e) {
      if (null === e) return "";
      var t = [];
      return function n(e, t) {
        var o, i;
        if ("object" == typeof e)
          for (i in e) !0 === Ue(o = e[i]) ? n(o, t) : t[t.length] = Fe(i, o);
        else if (!0 === Array.isArray(e))
          for (var r = 0; r < e.length; r++) !0 === Ue(o = e[r]) ? n(e, t) : t[t.length] = Fe(i, o);
        else t[t.length] = Fe(e)
      }(e, t), t.join("&")
    }
  
    function Ue(e) {
      return !0 === Array.isArray(e) || "object" == typeof e
    }
  
    function Fe(e, t) {
      return encodeURIComponent(e) + "=" + encodeURIComponent(null === t ? "" : t)
    }
    Re.prototype.setupParentContainer = function(e) {
      var t, n = e["challenge-container"];
      n && (t = "string" == typeof n ? document.getElementById(n) : n), t ? (this._hasCustomContainer = !0, this._parent = t) : (this._hasCustomContainer = !1, this._parent = document.body)
    }, Re.prototype._hideIframe = function() {
      var e = {};
      "ie" !== $.Browser.type || "ie" === $.Browser.type && 8 !== $.Browser.version ? (e.opacity = 0, e.visibility = "hidden") : e.display = "none", this.$iframe.setAttribute("aria-hidden", !0), this.$iframe.css(e)
    }, Re.prototype._showIframe = function() {
      var e = {};
      "ie" !== $.Browser.type || "ie" === $.Browser.type && 8 !== $.Browser.version ? (e.opacity = 1, e.visibility = "visible") : e.display = "block", this.$iframe.removeAttribute("aria-hidden"), this.$iframe.css(e)
    }, Re.prototype.style = function() {
      if (this._hasCustomContainer) this.$iframe.css({
        border: 0,
        position: "relative",
        backgroundColor: "#fff"
      });
      else {
        var e = {
          backgroundColor: "#fff",
          border: "1px solid rgb(208, 208, 208)",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 4px",
          borderRadius: 4,
          left: -1e4,
          top: -1e4,
          zIndex: -9999999999999,
          position: "absolute"
        };
        "ie" !== $.Browser.type || "ie" === $.Browser.type && 8 !== $.Browser.version ? (e.transition = "opacity 0.15s ease-out", e.opacity = 0, e.visibility = "hidden") : e.display = "none", this.$container.css(e), this.$wrapper.css({
          position: "relative"
        }), this.$overlay.css({
          width: "100%",
          height: "100%",
          position: "fixed",
          pointerEvents: "none",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "#fff",
          opacity: .05
        }), this.$arrow.css({
          borderWidth: 11,
          position: "absolute",
          pointerEvents: "none",
          marginTop: -11,
          zIndex: 1,
          right: "100%"
        }), this.$arrow.fg.css({
          borderWidth: 10,
          borderStyle: "solid",
          borderColor: "transparent rgb(255, 255, 255) transparent transparent",
          position: "relative",
          top: 10,
          zIndex: 1
        }), this.$arrow.bg.css({
          borderWidth: 11,
          borderStyle: "solid",
          borderColor: "transparent rgb(208, 208, 208) transparent transparent",
          position: "relative",
          top: -11,
          zIndex: 0
        }), this.$iframe.css({
          border: 0,
          zIndex: 2e9,
          position: "relative"
        })
      }
    }, Re.prototype.setup = function(e) {
      return this.chat.send("create-challenge", e)
    }, Re.prototype.sendProof = function(e) {
      return this.chat.contact("solve-proof", e)
    }, Re.prototype.sendTranslation = function(e) {
      var t = {
        locale: e,
        table: te.getTable(e) || {}
      };
      this.chat && this.chat.send("challenge-translate", t)
    }, Re.prototype.isVisible = function() {
      return this._visible
    }, Re.prototype.getDimensions = function(e, t) {
      return this._visible ? this.chat.contact("resize-challenge", {
        width: e,
        height: t
      }) : Promise.resolve(null)
    }, Re.prototype.show = function() {
      if (!0 !== this._visible)
        if (this._visible = !0, this._hasCustomContainer) this._showIframe();
        else {
          var e = {
            zIndex: 9999999999999
          };
          "ie" !== $.Browser.type || "ie" === $.Browser.type && 8 !== $.Browser.version ? (e.opacity = 1, e.visibility = "visible") : e.display = "block", this.$container.css(e), this.$container.removeAttribute("aria-hidden"), this.$overlay.css({
            pointerEvents: "auto",
            cursor: "pointer"
          }), this.$iframe.dom.contentWindow.focus()
        }
    }, Re.prototype.close = function() {
      if (this._visible = !1, this._hasCustomContainer) return this._hideIframe(), void this.chat.send("close-challenge");
      var e = {
        left: -1e4,
        top: -1e4,
        zIndex: -9999999999999
      };
      "ie" !== $.Browser.type || "ie" === $.Browser.type && 8 !== $.Browser.version ? (e.opacity = 0, e.visibility = "hidden") : e.display = "none", this.$container.css(e), this._hasCustomContainer || this.$overlay.css({
        pointerEvents: "none",
        cursor: "default"
      }), this.chat.send("close-challenge"), this.$container.setAttribute("aria-hidden", !0)
    }, Re.prototype.size = function(e, t, n) {
      this.width = e, this.height = t, this.mobile = n, this.$iframe.css({
        width: e,
        height: t
      }), this._hasCustomContainer || (this.$wrapper.css({
        width: e,
        height: t
      }), n ? this.$overlay.css({
        opacity: .5
      }) : this.$overlay.css({
        opacity: .05
      }))
    }, Re.prototype.position = function(e) {
      if (!this._hasCustomContainer && e) {
        var t = window.document.documentElement,
          n = $.Browser.scrollY(),
          o = $.Browser.width(),
          i = $.Browser.height(),
          r = this.mobile || "invisible" === this.config.size || e.offset.left + e.tick.x <= e.tick.width / 2,
          a = Math.round(e.bounding.top) + n !== e.offset.top,
          s = this.height > t.clientHeight,
          c = r ? (o - this.width) / 2 : e.bounding.left + e.tick.right + 10;
        (c + this.width + 10 > o || c < 0) && (c = (o - this.width) / 2, r = !0);
        var l = (t.scrollHeight < t.clientHeight ? t.clientHeight : t.scrollHeight) - this.height - 10,
          h = r ? (i - this.height) / 2 + n : e.bounding.top + e.tick.y + n - this.height / 2;
        a && h < n && (h = n + 10), a && h + this.height >= n + i && (h = n + i - (this.height + 10)), h = Math.max(Math.min(h, l), 10);
        var d = e.bounding.top + e.tick.y + n - h - 10,
          u = this.height - 10 - 30;
        return d = Math.max(Math.min(d, u), 10), this.$container.css({
          left: c,
          top: h
        }), this.$arrow.fg.css({
          display: r ? "none" : "block"
        }), this.$arrow.bg.css({
          display: r ? "none" : "block"
        }), this.$arrow.css({
          top: d
        }), this.top = h, s
      }
    }, Re.prototype.destroy = function() {
      this._visible && this.close.call(this), this._hasCustomContainer ? this._parent.removeChild(this.$iframe.dom) : (this._parent.removeChild(this.$container.dom), this.$container = this.$container.__destroy()), this.$iframe = this.$iframe.__destroy(), $e.removeChat(this.chat), this.chat = this.chat.destroy()
    }, Re.prototype.setReady = function(e) {
      if (this.ready = e, this.ready)
        for (var t, n = this.listeners.length; --n > -1;) t = this.listeners[n], this.listeners.splice(n, 1), t()
    }, Re.prototype.onReady = function(e) {
      var t = Array.prototype.slice.call(arguments, 1),
        n = function() {
          e.apply(null, t)
        };
      this.ready ? n() : this.listeners.push(n)
    }, Re.prototype.onOverlayClick = function(e) {
      this._hasCustomContainer || this.$overlay.addEventListener("click", e)
    }, Re.prototype.setEndpoint = function(e) {
      this.chat && this.chat.send("challenge-update", {
        endpoint: e
      })
    }, Re.prototype.setData = function(e) {
      this.chat && this.chat.send("challenge-data", e)
    }, De.prototype.setResponse = function(e) {
      this.response = e, this.$iframe.dom.setAttribute("data-hcaptcha-response", e), "off" !== j.recaptchacompat && (this.$textArea0.dom.value = e), this.$textArea1.dom.value = e
    }, De.prototype.style = function() {
      switch (this.config.size) {
        case "compact":
          this.$iframe.css({
            width: 164,
            height: 144
          });
          break;
        case "invisible":
          this.$iframe.css({
            display: "none"
          });
          break;
        default:
          this.$iframe.css({
            width: 303,
            height: 78,
            overflow: "hidden"
          })
      }
    }, De.prototype.reset = function() {
      this._ticked = !1, this.chat && this.chat.send("checkbox-reset")
    }, De.prototype.sendTranslation = function(e) {
      var t = {
        locale: e,
        table: te.getTable(e) || {}
      };
      this.chat && this.chat.send("checkbox-translate", t)
    }, De.prototype.status = function(e, t) {
      this.chat && this.chat.send("checkbox-status", {
        text: e || null,
        a11yOnly: t || !1
      })
    }, De.prototype.tick = function() {
      this._ticked = !0, this.chat && this.chat.send("checkbox-tick")
    }, De.prototype.getTickLocation = function() {
      return this.chat.contact("checkbox-location")
    }, De.prototype.getOffset = function() {
      var e = this.$iframe.dom;
      e.offsetParent || (e = e.parentElement);
      for (var t = 0, n = 0; e;) t += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
      return {
        top: n,
        left: t
      }
    }, De.prototype.getBounding = function() {
      return this.$iframe.dom.getBoundingClientRect()
    }, De.prototype.destroy = function() {
      this._ticked && this.reset(), this.$container.removeElement(this.$iframe), this.$container.removeElement(this.$textArea1), "off" !== j.recaptchacompat && (this.$container.removeElement(this.$textArea0), this.$textArea0 = this.$textArea0.__destroy()), this.$textArea1 = this.$textArea1.__destroy(), this.$container = this.$container.__destroy(), this.$iframe = this.$iframe.__destroy(), $e.removeChat(this.chat), this.chat = this.chat.destroy()
    }, ze.prototype.initChallenge = function(e) {
      e || (e = {});
      var t = e.manifest || null,
        n = e.charity || null,
        o = e.link || null,
        i = e.action || "",
        r = e.rqdata || null,
        a = $.Browser.width(),
        s = $.Browser.height();
      null !== this._responseTimer && (clearTimeout(this._responseTimer), this._responseTimer = null), t || (t = Object.create(null));
      var c = Ce.getData();
      Ce.resetData(), t.topLevel = c, t.session = C.getSession(), t.widgetList = C.getCaptchaIdList(), t.widgetId = this.id, t.href = window.location.href, this._userClosed && (t.clickedOutside = !0), this._expiredChallenge && (t.expiredPopup = !0), this._expiredResponse && (t.expiredCaptcha = !0), this._userEscaped && (t.escPressed = !0), this._userEscaped = !1, this._userClosed = !1, this._expiredChallenge = !1, this._expiredResponse = !1, this.checkbox.setResponse(""), this.challenge.setup({
        manifest: t,
        width: a,
        height: s,
        charity: n,
        link: o,
        action: i,
        rqdata: r
      })
    }, ze.prototype.displayChallenge = function(e) {
      var t = this;
      this.visible = !0;
      var n = this.checkbox,
        o = this.challenge,
        i = $.Browser.height();
      if (!("ie" === $.Browser.type && 8 === $.Browser.version)) {
        var r = window.getComputedStyle(document.body).getPropertyValue("overflow-y");
        this.overflow.override = "hidden" === r, this.overflow.override && (this.overflow.cssUsed = "" === document.body.style.overflow && "" === document.body.style.overflowY, this.overflow.cssUsed || (this.overflow.value = "" === r ? "auto" : r), this.overflow.scroll = $.Browser.scrollY(), document.body.style.overflowY = "auto")
      }
      return new Promise(function(t) {
        n.status(), n.getTickLocation().then(function(r) {
          (o.size(e.width, e.height, e.mobile), o.show(), n.location.bounding = n.getBounding(), n.location.tick = r, n.location.offset = n.getOffset(), o.position(n.location)) && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = Math.abs(o.height - i) + o.top);
          t()
        })
      }).then(function() {
        t.onOpen && U(t.onOpen)
      })
    }, ze.prototype.resize = function(e, t, n) {
      var o = this,
        i = this.checkbox,
        r = this.challenge;
      r.getDimensions(e, t).then(function(e) {
        e && r.size(e.width, e.height, e.mobile), i.location.bounding = i.getBounding(), i.location.offset = i.getOffset(), $.System.mobile && !n || r.position(i.location)
      })["catch"](function(e) {
        o.closeChallenge.call(o, {
          event: "challenge-error",
          message: "Captcha resize caused error.",
          error: e
        })
      })
    }, ze.prototype.position = function() {
      var e = this.checkbox,
        t = this.challenge;
      $.System.mobile || (e.location.bounding = e.getBounding(), t.position(e.location))
    }, ze.prototype.reset = function() {
      this.checkbox.reset(), this.checkbox.setResponse(""), null !== this._responseTimer && (clearTimeout(this._responseTimer), this._responseTimer = null), this._userEscaped = !1, this._userClosed = !1, this._userPassed = !1, this._expiredResponse = !1, this._expiredChallenge = !1
    }, ze.prototype.closeChallenge = function(e) {
      this.visible = !1;
      var t = this,
        n = this.checkbox,
        o = this.challenge;
      this.overflow.override && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll, this.overflow.override = !1, this.overflow.scroll = 0, document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
      var i = e.response || "";
      switch (n.setResponse(i), o.close(), e.event) {
        case "challenge-escaped":
          this._userEscaped = !0, n.reset(), t.onClose && U(t.onClose);
          break;
        case "challenge-expired":
          this._expiredChallenge = !0, n.reset(), n.status("hCaptcha window closed due to timeout.", !0), t.onChalExpire && U(t.onChalExpire);
          break;
        case "challenge-error":
        case "bundle-error":
        case "network-error":
          n.reset(), "network-error" === e.event && n.status(e.message), this.onError && U(this.onError, e.message || "");
          break;
        case "challenge-passed":
          n.tick(), this.onPass && U(this.onPass, i), typeof e.expiration !== undefined && (t._responseTimer = setTimeout(function() {
            try {
              n.reset(), n.setResponse(""), n.status("hCaptcha security token has expired. Please complete the challenge again.", !0)
            } catch (pt) {}
            t.onExpire && U(t.onExpire), t._responseTimer = null, t._expiredResponse = !0
          }, 1e3 * e.expiration))
      }
    }, ze.prototype.updateTranslation = function(e) {
      var t = this.checkbox,
        n = this.challenge;
      t.sendTranslation(e), n.sendTranslation(e)
    }, ze.prototype.isReady = function() {
      return this._ready
    }, ze.prototype.setReady = function(e) {
      if (this._ready = e, this._ready)
        for (var t, n = this._listeners.length; --n > -1;) t = this._listeners[n], this._listeners.splice(n, 1), t()
    }, ze.prototype.onReady = function(e) {
      var t = Array.prototype.slice.call(arguments, 1),
        n = function() {
          e.apply(null, t)
        };
      this._ready ? n() : this._listeners.push(n)
    }, ze.prototype.destroy = function() {
      (null !== this._responseTimer && (clearTimeout(this._responseTimer), this._responseTimer = null), this.overflow.override) && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll, this.overflow.override = !1, this.overflow.scroll = 0, document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
      this.challenge.destroy(), this.checkbox.destroy(), this.challenge = null, this.checkbox = null
    };
    var He = {
        400: "Rate limited or network error. Please retry.",
        429: "Your computer or network has sent too many requests.",
        500: "Cannot contact hCaptcha. Check your connection and try again."
      },
      Xe = {
        getText: function(e) {
          try {
            return te.translate(He[e])
          } catch (pt) {
            return !1
          }
        }
      },
      Ye = "undefined" != typeof XDomainRequest && "withCredentials" in XMLHttpRequest.prototype == !1;
  
    function qe(e, t, n) {
      n = n || {};
      var o = {
        url: t,
        method: e.toUpperCase(),
        responseType: n.responseType || "string",
        dataType: n.dataType || null,
        withCredentials: n.withCredentials || !1,
        headers: n.headers || null,
        data: n.data || null
      };
      return o.legacy = o.withCredentials && Ye, o.data && ("json" === o.dataType && "object" == typeof o.data && (o.data = JSON.stringify(o.data)), "query" === o.dataType && (o.data = Ne(o.data))), n.retry ? F(function() {
        return Je(o)
      }, n.retry) : Je(o)
    }
  
    function Je(e) {
      var t = e.legacy ? new XDomainRequest : new XMLHttpRequest;
      return new Promise(function(n, o) {
        var i, r = function(i) {
          return function(r) {
            var a = t.response || t.responseText,
              s = t.statusText || "",
              c = t.status,
              l = t.readyState;
            if (4 === l || e.legacy) {
              if ("error" === i || c >= 400 && c <= 511) return void o({
                event: "network-error",
                endpoint: e.url,
                state: l,
                status: c,
                message: Xe.getText(c || 400) || s
              });
              "json" === e.responseType && a && (a = JSON.parse(a)), n({
                state: l,
                status: c,
                body: a,
                message: s
              })
            }
          }
        };
        if ((t.onload = r("complete"), t.onerror = t.ontimeout = r("error"), t.open(e.method, e.url), !e.legacy) && (t.withCredentials = e.withCredentials, e.headers))
          for (var a in e.headers) i = e.headers[a], t.setRequestHeader(a, i);
        setTimeout(function() {
          t.send(e.data)
        }, 0)
      })
    }
    var Ve = {
      request: qe,
      get: function(e, t) {
        if ("object" == typeof e && t === undefined && (e = (t = e).url), null === e) throw new Error("Url missing");
        return qe("GET", e, t)
      },
      post: function(e, t) {
        if ("object" == typeof e && t === undefined && (e = (t = e).url), null === e) throw new Error("Url missing");
        return qe("POST", e, t)
      }
    };
  
    function Qe(e) {
      if ("en" === e) return Promise.resolve();
      var t = M.assetUrl + "/i18n/" + e + ".json";
      return new Promise(function(n, o) {
        Ve.get(t, {
          responseType: "json"
        }).then(function(t) {
          te.addTable(e, t.body), n(t.body)
        })["catch"](function(e) {
          o(e)
        })
      })
    }
    var Ke = 0,
      Ge = ["sitekey", "theme", "type", "size", "tabindex", "endpoint", "reportapi", "recaptchacompat", "challenge-container"],
      Ze = "Your browser is missing or has disabled Cross-Window Messaging. Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> or enable it for hCaptcha.com",
      et = "Your browser plugins or privacy policies are blocking the hCaptcha service. Please disable them for hCaptcha.com";
    var tt = {
      render: function(e, t) {
        if ("string" == typeof e && (e = document.getElementById(e)), e && 1 === e.nodeType)
          if (function(e) {
              if (!(e && "challenge-container" in e)) return !0;
              var t = e["challenge-container"];
              return "string" == typeof t && (t = document.getElementById(t)), !!t && 1 === t.nodeType
            }(t)) {
            if (!1 !== $e.isSupported()) {
              for (var n, o, i = e.getElementsByTagName("iframe"), r = -1; ++r < i.length && !n;)(o = i[r].getAttribute("data-hcaptcha-widget-id")) && (n = !0);
              if (n) return console.error("Only one captcha is permitted per parent container."), o;
              var a = function(e, t) {
                  for (var n = ["sitekey", "theme", "type", "size", "tabindex", "callback", "expired-callback", "chalexpired-callback", "error-callback", "open-callback", "close-callback", "endpoint", "challenge-container"], o = {}, i = 0; i < n.length; i++) {
                    var r = n[i],
                      a = t && t[r];
                    a || (a = e.getAttribute("data-" + r)), a && (o[r] = a)
                  }
                  return o
                }(e, t),
                s = Ke++ + Math.random().toString(36).substr(2),
                c = {
                  sentry: D,
                  reportapi: j.reportapi,
                  recaptchacompat: j.recaptchacompat
                };
              j.endpointOverride && (c.endpoint = j.endpointOverride), null !== j.language && (c.hl = te.getLocale()), j.assethost && (c.assethost = j.assethost), j.imghost && (c.imghost = j.imghost);
              for (var l = 0; l < Ge.length; l++) {
                var h = Ge[l];
                h in a && (c[h] = a[h])
              }
              if (e instanceof HTMLButtonElement || e instanceof HTMLInputElement) {
                var d = new V("div", ".h-captcha");
                d.css({
                  display: "none"
                });
                for (var u = null, p = 0; p < e.attributes.length; p++)(u = e.attributes[p]).name.startsWith("data-") && d.setAttribute(u.name, u.value);
                var m = e.tagName.toLowerCase() + "[data-hcaptcha-widget-id='" + s + "']";
                e.setAttribute("data-hcaptcha-widget-id", s), d.setAttribute("data-hcaptcha-source-id", m), e.parentNode.insertBefore(d.dom, e), e.onclick = function(e) {
                  return e.preventDefault(), x(s)
                }, e = d, c.size = "invisible"
              }
              try {
                var f = new ze(e, s, c);
                f.challenge.style(), f.checkbox.style()
              } catch (ut) {
                var g = et;
                return ut instanceof We && (g = ut.message, console.error(ut.reason)), void R(e, g)
              }
              return a.callback && (f.onPass = a.callback), a["expired-callback"] && (f.onExpire = a["expired-callback"]), a["chalexpired-callback"] && (f.onChalExpire = a["chalexpired-callback"]), a["open-callback"] && (f.onOpen = a["open-callback"]), a["close-callback"] && (f.onClose = a["close-callback"]), a["error-callback"] && (f.onError = a["error-callback"]), f.checkbox.chat.listen("checkbox-selected", function(e) {
                f.onReady(f.initChallenge, e)
              }), f.checkbox.chat.listen("checkbox-loaded", function(e) {
                f.checkbox.location.bounding = f.checkbox.getBounding(), f.checkbox.location.tick = e, f.checkbox.location.offset = f.checkbox.getOffset();
                var t = te.getLocale();
                f.checkbox.sendTranslation(t)
              }), f.checkbox.chat.listen("checkbox-setup", function(e) {
                f.challenge.onReady(function() {
                  !j.endpointOverride && e.endpoint && f.challenge.setEndpoint(e.endpoint), e.c ? f.challenge.sendProof(e.c).then(function() {
                    f.setReady(!0)
                  }) : f.setReady(!0)
                })
              }), f.challenge.chat.listen("challenge-loaded", function() {
                f.challenge.setReady(!0);
                var e = te.getLocale();
                f.challenge.sendTranslation(e)
              }), f.challenge.chat.answer("challenge-ready", function(e, t) {
                f.displayChallenge(e).then(t.resolve)
              }), f.challenge.chat.listen("challenge-resize", function() {
                var e = $.Browser.width(),
                  t = $.Browser.height();
                f.resize(e, t)
              }), f.challenge.chat.listen("challenge-closed", f.closeChallenge), f.challenge.chat.answer("get-url", function(e) {
                e.resolve(window.location.href)
              }), f.challenge.chat.answer("check-api", function(e) {
                var t = Ce.getData();
                Ce.resetData(), e.resolve(t)
              }), f.challenge.chat.listen("challenge-key", function(e) {
                C.pushSession(e.key, f.id)
              }), f.challenge.onOverlayClick(function() {
                f.closeChallenge({
                  event: "challenge-escaped"
                })
              }), f.challenge.chat.listen("challenge-language", function(e) {
                var t = e.locale;
                te.setLocale(t), Qe(t).then(function(e) {
                  C.each(function(e) {
                    if (e) try {
                      e.updateTranslation(t)
                    } catch (ut) {
                      W("Failed to update text translation: " + JSON.stringify(ut), "error", "translation")
                    }
                  })
                })["catch"](function(e) {
                  W("Language failed to load: " + t, "error", "api")
                })
              }), f.challenge.chat.answer("get-ac", function(e) {
                e.resolve(Me.hasCookie("hc_accessibility"))
              }), C.add(f), s
            }
            R(e, Ze)
          } else console.log("[hCaptcha] render: invalid challenge container '" + t["challenge-container"] + "'.");
        else console.log("[hCaptcha] render: invalid container '" + e + "'.")
      },
      reset: function(e) {
        var t;
        if (e) {
          if (!(t = C.getById(e))) throw Error("[hCaptcha] invalid captcha id: " + e);
          t.reset()
        } else {
          if (!(t = C.getByIndex(0))) throw Error("[hCaptcha] no captchas exist.");
          t.reset()
        }
      },
      remove: function(e) {
        var t = e ? C.getById(e) : C.getByIndex(0);
        if (!t) throw e ? Error("[hCaptcha] invalid captcha id: " + e) : Error("[hCaptcha] no captchas exist.");
        C.remove(t), t.destroy(), t = null
      },
      execute: x,
      getResponse: function(e) {
        var t, n;
        if ((n = e ? C.getById(e) : C.getByIndex(0)) && (t = n.checkbox.response || ""), void 0 !== t) return t;
        throw e ? new Error("[hCaptcha] invalid captcha id: " + e) : new Error("[hCaptcha] no captchas exist.")
      },
      getRespKey: function(e) {
        var t = "",
          n = null;
        n = e ? C.getById(e) : C.getByIndex(0);
        try {
          for (var o = C.getSession(), i = o.length, r = !1; --i > -1 && !r;)(r = o[i][1] === n.id) && (t = o[i][0])
        } catch (a) {
          t = ""
        }
        return t
      },
      close: function(e) {
        var t = !1;
        if (!(t = e ? C.getById(e) : C.getByIndex(0))) throw e ? Error("[hCaptcha] invalid captcha id: " + e) : Error("[hCaptcha] no captchas exist.");
        t.closeChallenge({
          event: "challenge-escaped"
        })
      },
      setData: function(e, t) {
        if ("object" != typeof e || t || (t = e, e = null), !t || "object" != typeof t) throw Error("[hCaptcha] invalid data supplied");
        var n = !1;
        if (!(n = e ? C.getById(e) : C.getByIndex(0))) throw e ? Error("[hCaptcha] invalid captcha id: " + e) : Error("[hCaptcha] no captchas exist.");
        var o = n.challenge.setData.bind(n.challenge);
        n.onReady(o, t)
      },
      nodes: C
    };
    M.file = "hcaptcha";
    var nt = document.currentScript,
      ot = !1,
      it = !1,
      rt = $.Browser.width() / $.Browser.height(),
      at = window.hcaptcha || !1;
  
    function st() {
      var e = $.Browser.width(),
        t = $.Browser.height(),
        n = $.System.mobile && rt !== e / t;
      rt = e / t, ht(), tt.nodes.each(function(o) {
        o.visible && o.resize(e, t, n)
      })
    }
  
    function ct(e) {
      e.preventDefault && e.preventDefault(), lt(), tt.nodes.each(function(e) {
        e.visible && e.position()
      })
    }
  
    function lt() {
      Ce.circBuffPush("xy", [$.Browser.scrollX(), $.Browser.scrollY(), document.documentElement.clientWidth / window.innerWidth, Date.now()])
    }
  
    function ht() {
      Ce.circBuffPush("wn", [$.Browser.width(), $.Browser.height(), $.System.dpr(), Date.now()])
    }! function(e) {
      var t = Array.prototype.slice.call(arguments, 1);
      !0 !== Se && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (ke.push({
        fn: e,
        args: t
      }), !1 === Ee && (document.addEventListener ? (document.addEventListener("DOMContentLoaded", Ie), window.addEventListener("load", Ie)) : (document.attachEvent("onreadystatechange", Oe), window.attachEvent("onload", Ie)), Ee = !0)) : setTimeout(function() {
        e(t)
      }, 1)
    }(function() {
      at || (function() {
        var e;
        e = nt ? [nt] : document.getElementsByTagName("script");
        var t = -1,
          n = !1,
          o = null,
          i = null;
        for (; ++t < e.length && !1 === n;) e[t] && e[t].src && (o = e[t].src.split("?"), i = o[0], /\/(hcaptcha|1\/api)\.js$/.test(i) && (n = e[t]));
        if (!1 === n) return;
        var r = je(o[1]);
        ot = r.onload || !1, it = r.render || !1, j.language = r.hl || null, r.endpoint && (j.endpointOverride = r.endpoint);
        j.reportapi = r.reportapi || j.reportapi, j.assethost = r.assethost || null, j.imghost = r.imghost || null, j.recaptchacompat = r.recaptchacompat || j.recaptchacompat, M.host = r.host || window.location.hostname, j.language ? te.setLocale(j.language) : te.setLocale(window.navigator.userLanguage || window.navigator.language);
        a = r.sentry === undefined || r.sentry, D = a, "off" === j.recaptchacompat ? console.log("recaptchacompat disabled") : window.grecaptcha = dt;
        var a
      }(), function() {
        var e = te.getLocale();
        if (e.indexOf("en") >= 0) return;
        Qe(e).then(function(t) {
          tt.nodes.each(function(t) {
            if (t) try {
              t.updateTranslation(e)
            } catch (ut) {
              W("Failed to update text translation: " + JSON.stringify(ut), "error", "translation")
            }
          })
        })["catch"](function(t) {
          W("Language failed to load: " + e, "error", "api")
        })
      }(), !1 === it || "onload" === it ? function(e) {
        for (var t = document.getElementsByClassName("h-captcha"), n = [], o = 0; o < t.length; o++) n.push(t[o]);
        var i = [];
        if ("off" !== j.recaptchacompat)
          for (var r = document.getElementsByClassName("g-recaptcha"), a = 0; a < r.length; a++) i.push(r[a]);
        for (var s = [].concat(n, i), c = 0; c < s.length; c++) e(s[c])
      }(tt.render) : "explicit" !== it && console.log("hcaptcha: invalid render parameter '" + it + "', using 'explicit' instead."), ot && setTimeout(function() {
        U(ot)
      }, 1), Be.addEventListener("resize", st), Be.addEventListener("scroll", ct), function() {
        Ce.resetData();
        try {
          Ce.record(), Ce.setData("sc", $.Browser.getScreenDimensions()), Ce.setData("nv", $.Browser.interrogateNavigator()), Ce.setData("dr", document.referrer), ht(), lt()
        } catch (ut) {}
      }())
    });
    var dt = {
      render: tt.render,
      remove: tt.remove,
      execute: tt.execute,
      reset: tt.reset,
      close: tt.close,
      setData: tt.setData,
      getResponse: tt.getResponse,
      getRespKey: tt.getRespKey
    };
    return dt
  }();