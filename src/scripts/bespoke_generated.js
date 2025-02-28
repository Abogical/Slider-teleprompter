!(function () {
  'use strict';
  var e = function (e, t) {
    var n,
      r = 1 === (e.parent || e).nodeType ? e.parent || e : document.querySelector(e.parent || e),
      a = [].filter.call('string' == typeof e.slides ? r.querySelectorAll(e.slides) : e.slides || r.children, function (e) {
        return 'SCRIPT' !== e.nodeName;
      }),
      s = {},
      i = function (e, t) {
        return ((t = t || {}).index = a.indexOf(e)), (t.slide = e), t;
      },
      o = function (e, t) {
        s[e] = (s[e] || []).filter(function (e) {
          return e !== t;
        });
      },
      l = function (e, t) {
        return (s[e] || []).reduce(function (e, n) {
          return e && !1 !== n(t);
        }, !0);
      },
      c = function (e, t) {
        a[e] && (n && l('deactivate', i(n, t)), (n = a[e]), l('activate', i(n, t)));
      },
      d = function (e, t) {
        var r = a.indexOf(n) + e;
        l(e > 0 ? 'next' : 'prev', i(n, t)) && c(r, t);
      },
      u = {
        off: o,
        on: function (e, t) {
          return (s[e] || (s[e] = [])).push(t), o.bind(null, e, t);
        },
        fire: l,
        slide: function (e, t) {
          if (!arguments.length) return a.indexOf(n);
          l('slide', i(a[e], t)) && c(e, t);
        },
        next: d.bind(null, 1),
        prev: d.bind(null, -1),
        parent: r,
        slides: a,
        destroy: function (e) {
          l('destroy', i(n, e)), (s = {});
        },
      };
    return (
      (t || []).forEach(function (e) {
        e(u);
      }),
      n || c(0),
      u
    );
  };
  function t(e) {
    e.parent.classList.add('bespoke-marp-parent'),
      e.slides.forEach((e) => e.classList.add('bespoke-marp-slide')),
      e.on('activate', (t) => {
        const n = t.slide,
          r = !n.classList.contains('bespoke-marp-active');
        e.slides.forEach((e) => {
          e.classList.remove('bespoke-marp-active'), e.setAttribute('aria-hidden', 'true');
        }),
          n.classList.add('bespoke-marp-active'),
          n.removeAttribute('aria-hidden'),
          r && (n.classList.add('bespoke-marp-active-ready'), document.body.clientHeight, n.classList.remove('bespoke-marp-active-ready'));
      });
  }
  function n(e) {
    let t = 0,
      n = 0;
    Object.defineProperty(e, 'fragments', {
      enumerable: !0,
      value: e.slides.map((e) => [null, ...e.querySelectorAll('[data-marpit-fragment]')]),
    });
    const r = (r) => void 0 !== e.fragments[t][n + r],
      a = (r, a) => {
        (t = r),
          (n = a),
          e.fragments.forEach((e, t) => {
            e.forEach((e, n) => {
              if (null == e) return;
              const s = t < r || (t === r && n <= a);
              e.setAttribute('data-bespoke-marp-fragment', s ? 'active' : 'inactive'),
                t === r && n === a
                  ? e.setAttribute('data-bespoke-marp-current-fragment', 'current')
                  : e.removeAttribute('data-bespoke-marp-current-fragment');
            });
          }),
          (e.fragmentIndex = a);
        const s = {
          slide: e.slides[r],
          index: r,
          fragments: e.fragments[r],
          fragmentIndex: a,
        };
        e.fire('fragment', s);
      };
    e.on('next', ({ fragment: s = !0 }) => {
      if (s) {
        if (r(1)) return a(t, n + 1), !1;
        const s = t + 1;
        e.fragments[s] && a(s, 0);
      } else {
        const r = e.fragments[t].length;
        if (n + 1 < r) return a(t, r - 1), !1;
        const s = e.fragments[t + 1];
        s && a(t + 1, s.length - 1);
      }
    }),
      e.on('prev', ({ fragment: s = !0 }) => {
        if (r(-1) && s) return a(t, n - 1), !1;
        const i = t - 1;
        e.fragments[i] && a(i, e.fragments[i].length - 1);
      }),
      e.on('slide', ({ index: t, fragment: n }) => {
        let r = 0;
        if (void 0 !== n) {
          const a = e.fragments[t];
          if (a) {
            const { length: e } = a;
            r = -1 === n ? e - 1 : Math.min(Math.max(n, 0), e - 1);
          }
        }
        a(t, r);
      }),
      a(0, 0);
  }
  var r,
    a = { exports: {} };
  (r = a),
    (function () {
      var e = 'undefined' != typeof window && void 0 !== window.document ? window.document : {},
        t = r.exports,
        n = (function () {
          for (
            var t,
              n = [
                ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
                [
                  'webkitRequestFullscreen',
                  'webkitExitFullscreen',
                  'webkitFullscreenElement',
                  'webkitFullscreenEnabled',
                  'webkitfullscreenchange',
                  'webkitfullscreenerror',
                ],
                [
                  'webkitRequestFullScreen',
                  'webkitCancelFullScreen',
                  'webkitCurrentFullScreenElement',
                  'webkitCancelFullScreen',
                  'webkitfullscreenchange',
                  'webkitfullscreenerror',
                ],
                [
                  'mozRequestFullScreen',
                  'mozCancelFullScreen',
                  'mozFullScreenElement',
                  'mozFullScreenEnabled',
                  'mozfullscreenchange',
                  'mozfullscreenerror',
                ],
                ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError'],
              ],
              r = 0,
              a = n.length,
              s = {};
            r < a;
            r++
          )
            if ((t = n[r]) && t[1] in e) {
              for (r = 0; r < t.length; r++) s[n[0][r]] = t[r];
              return s;
            }
          return !1;
        })(),
        a = { change: n.fullscreenchange, error: n.fullscreenerror },
        s = {
          request: function (t, r) {
            return new Promise(
              function (a, s) {
                var i = function () {
                  this.off('change', i), a();
                }.bind(this);
                this.on('change', i);
                var o = (t = t || e.documentElement)[n.requestFullscreen](r);
                o instanceof Promise && o.then(i).catch(s);
              }.bind(this)
            );
          },
          exit: function () {
            return new Promise(
              function (t, r) {
                if (this.isFullscreen) {
                  var a = function () {
                    this.off('change', a), t();
                  }.bind(this);
                  this.on('change', a);
                  var s = e[n.exitFullscreen]();
                  s instanceof Promise && s.then(a).catch(r);
                } else t();
              }.bind(this)
            );
          },
          toggle: function (e, t) {
            return this.isFullscreen ? this.exit() : this.request(e, t);
          },
          onchange: function (e) {
            this.on('change', e);
          },
          onerror: function (e) {
            this.on('error', e);
          },
          on: function (t, n) {
            var r = a[t];
            r && e.addEventListener(r, n, !1);
          },
          off: function (t, n) {
            var r = a[t];
            r && e.removeEventListener(r, n, !1);
          },
          raw: n,
        };
      n
        ? (Object.defineProperties(s, {
            isFullscreen: {
              get: function () {
                return Boolean(e[n.fullscreenElement]);
              },
            },
            element: {
              enumerable: !0,
              get: function () {
                return e[n.fullscreenElement];
              },
            },
            isEnabled: {
              enumerable: !0,
              get: function () {
                return Boolean(e[n.fullscreenEnabled]);
              },
            },
          }),
          t ? (r.exports = s) : (window.screenfull = s))
        : t
        ? (r.exports = { isEnabled: !1 })
        : (window.screenfull = { isEnabled: !1 });
    })();
  var s = a.exports;
  function i(e) {
    (e.fullscreen = () => {
      s.isEnabled && s.toggle(document.body);
    }),
      document.addEventListener('keydown', (t) => {
        ('f' !== t.key && 'F11' !== t.key) || t.altKey || t.ctrlKey || t.metaKey || !s.isEnabled || (e.fullscreen(), t.preventDefault());
      });
  }
  function o(e = 2e3) {
    return (t) => {
      let n;
      function r() {
        n && clearTimeout(n),
          (n = setTimeout(() => {
            t.parent.classList.add('bespoke-marp-inactive'), t.fire('marp-inactive');
          }, e)),
          t.parent.classList.contains('bespoke-marp-inactive') && (t.parent.classList.remove('bespoke-marp-inactive'), t.fire('marp-active'));
      }
      document.addEventListener('mousedown', r),
        document.addEventListener('mousemove', r),
        document.addEventListener('touchend', r),
        setTimeout(r, 0);
    };
  }
  const l = ['AUDIO', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'VIDEO'];
  function c(e) {
    e.parent.addEventListener('keydown', (e) => {
      if (!e.target) return;
      const t = e.target;
      (l.includes(t.nodeName) || 'true' === t.contentEditable) && e.stopPropagation();
    });
  }
  function d(e) {
    window.addEventListener('load', () => {
      for (const t of e.slides) {
        const e = t.querySelector('[data-marp-fitting]') ? '' : 'hideable';
        t.setAttribute('data-bespoke-marp-load', e);
      }
    });
  }
  var u;
  function f({ interval: e = 250 } = {}) {
    return (t) => {
      document.addEventListener('keydown', (e) => {
        if (' ' === e.key && e.shiftKey) t.prev();
        else if ('ArrowLeft' === e.key || 'ArrowUp' === e.key || 'PageUp' === e.key) t.prev({ fragment: !e.shiftKey });
        else if (' ' !== e.key || e.shiftKey)
          if ('ArrowRight' === e.key || 'ArrowDown' === e.key || 'PageDown' === e.key) t.next({ fragment: !e.shiftKey });
          else if ('End' === e.key) t.slide(t.slides.length - 1, { fragment: -1 });
          else {
            if ('Home' !== e.key) return;
            t.slide(0);
          }
        else t.next();
        e.preventDefault();
      });
      let n,
        r,
        a = 0;
      t.parent.addEventListener('wheel', (s) => {
        let i = !1;
        const o = (e, t) => {
          e &&
            (i =
              i ||
              (function (e, t) {
                return (
                  (function (e, t) {
                    const n = t === u.X ? 'Width' : 'Height';
                    return e[`client${n}`] < e[`scroll${n}`];
                  })(e, t) &&
                  (function (e, t) {
                    const { overflow: n } = e,
                      r = e[`overflow${t}`];
                    return 'auto' === n || 'scroll' === n || 'auto' === r || 'scroll' === r;
                  })(getComputedStyle(e), t)
                );
              })(e, t)),
            (null == e ? void 0 : e.parentElement) && o(e.parentElement, t);
        };
        if ((0 !== s.deltaX && o(s.target, u.X), 0 !== s.deltaY && o(s.target, u.Y), i)) return;
        s.preventDefault();
        const l = Math.sqrt(Math.pow(s.deltaX, 2) + Math.pow(s.deltaY, 2));
        if (void 0 !== s.wheelDelta) {
          if (void 0 === s.webkitForce && Math.abs(s.wheelDelta) < 40) return;
          if (s.deltaMode === s.DOM_DELTA_PIXEL && l < 4) return;
        } else if (s.deltaMode === s.DOM_DELTA_PIXEL && l < 12) return;
        r && clearTimeout(r),
          (r = setTimeout(() => {
            n = 0;
          }, e));
        const c = Date.now() - a < e,
          d = l <= n;
        if (((n = l), c || d)) return;
        let f;
        (s.deltaX > 0 || s.deltaY > 0) && (f = 'next'), (s.deltaX < 0 || s.deltaY < 0) && (f = 'prev'), f && (t[f](), (a = Date.now()));
      });
    };
  }
  !(function (e) {
    (e.X = 'X'), (e.Y = 'Y');
  })(u || (u = {}));
  const p = (...e) => history.replaceState(...e),
    m = 'data-bespoke-view',
    g = 'presenter',
    h = 'next',
    v = ['', g, h],
    b = (e, { protocol: t, host: n, pathname: r, hash: a } = location) => {
      const s = e.toString();
      return `${t}//${n}${r}${s ? '?' : ''}${s}${a}`;
    },
    w = () => {
      const e = document.body.getAttribute(m);
      if (v.includes(e)) return e;
      throw new Error('View mode is not assigned.');
    },
    y = (e) => new URLSearchParams(location.search).get(e),
    k = (e, t = {}) => {
      var n;
      const r = Object.assign({ location: location, setter: p }, t),
        a = new URLSearchParams(r.location.search);
      for (const t of Object.keys(e)) {
        const n = e[t];
        'string' == typeof n ? a.set(t, n) : a.delete(t);
      }
      try {
        r.setter(Object.assign({}, null !== (n = window.history.state) && void 0 !== n ? n : {}), '', b(a, r.location));
      } catch (e) {
        console.error(e);
      }
    },
    E = {
      available: (() => {
        try {
          return localStorage.setItem('bespoke-marp', 'bespoke-marp'), localStorage.removeItem('bespoke-marp'), !0;
        } catch (e) {
          return console.warn('Warning: Using localStorage is restricted in the current host so some features may not work.'), !1;
        }
      })(),
      get: (e) => {
        try {
          return localStorage.getItem(e);
        } catch (e) {
          return null;
        }
      },
      set: (e, t) => {
        try {
          return localStorage.setItem(e, t), !0;
        } catch (e) {
          return !1;
        }
      },
      remove: (e) => {
        try {
          return localStorage.removeItem(e), !0;
        } catch (e) {
          return !1;
        }
      },
    };
  function x(e = '.bespoke-marp-osc') {
    const t = document.querySelector(e);
    if (!t) return () => {};
    const n = (e, n) => {
      t.querySelectorAll(`[data-bespoke-marp-osc=${JSON.stringify(e)}]`).forEach(n);
    };
    return (
      s.isEnabled || n('fullscreen', (e) => (e.style.display = 'none')),
      E.available ||
        n('presenter', (e) => {
          (e.disabled = !0), (e.title = 'Presenter view is disabled due to restricted localStorage.');
        }),
      (e) => {
        t.addEventListener('click', (t) => {
          if (t.target instanceof HTMLElement) {
            const { bespokeMarpOsc: n } = t.target.dataset;
            switch ((n && t.target.blur(), n)) {
              case 'next':
                e.next({ fragment: !t.shiftKey });
                break;
              case 'prev':
                e.prev({ fragment: !t.shiftKey });
                break;
              case 'fullscreen':
                'function' == typeof e.fullscreen && s.isEnabled && e.fullscreen();
                break;
              case 'presenter':
                e.openPresenterView();
            }
          }
        }),
          e.parent.appendChild(t),
          e.on('activate', ({ index: t }) => {
            n('page', (n) => (n.textContent = `Page ${t + 1} of ${e.slides.length}`));
          }),
          e.on('fragment', ({ index: t, fragments: r, fragmentIndex: a }) => {
            n('prev', (e) => (e.disabled = 0 === t && 0 === a)), n('next', (n) => (n.disabled = t === e.slides.length - 1 && a === r.length - 1));
          }),
          e.on('marp-active', () => t.removeAttribute('aria-hidden')),
          e.on('marp-inactive', () => t.setAttribute('aria-hidden', 'true')),
          s.isEnabled && s.onchange(() => n('fullscreen', (e) => e.classList.toggle('exit', s.isEnabled && s.isFullscreen)));
      }
    );
  }
  function L(e) {
    window.addEventListener('message', (t) => {
      if (t.origin !== window.origin) return;
      const [n, r] = t.data.split(':');
      if ('navigate' === n) {
        const [t, n] = r.split(',');
        let a = Number.parseInt(t, 10),
          s = Number.parseInt(n, 10) + 1;
        s >= e.fragments[a].length && ((a += 1), (s = 0)), e.slide(a, { fragment: s });
      }
    });
  }
  function S(e) {
    if (!((e) => e.syncKey && 'string' == typeof e.syncKey)(e))
      throw new Error('The current instance of Bespoke.js is invalid for Marp bespoke presenter plugin.');
    Object.defineProperties(e, {
      openPresenterView: { enumerable: !0, value: M },
      presenterUrl: { enumerable: !0, get: I },
    }),
      E.available &&
        document.addEventListener('keydown', (t) => {
          'p' !== t.key || t.altKey || t.ctrlKey || t.metaKey || (t.preventDefault(), e.openPresenterView());
        });
  }
  function M() {
    const e = Math.max(Math.floor(0.85 * window.innerWidth), 640),
      t = Math.max(Math.floor(0.85 * window.innerHeight), 360);
    return window.open(this.presenterUrl, `bespoke-marp-presenter-${this.syncKey}`, `width=${e},height=${t},menubar=no,toolbar=no`);
  }
  function I() {
    const e = new URLSearchParams(location.search);
    return e.set('view', 'presenter'), e.set('sync', this.syncKey), b(e);
  }
  var P = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  let O = (e) => String(e).replace(/[&<>"']/g, (e) => `&${F[e]};`),
    F = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' },
    $ = 'dangerouslySetInnerHTML',
    A = { className: 'class', htmlFor: 'for' },
    T = {};
  function q(e, t) {
    let n = [],
      r = '';
    t = t || {};
    for (let e = arguments.length; e-- > 2; ) n.push(arguments[e]);
    if ('function' == typeof e) return (t.children = n.reverse()), e(t);
    if (e) {
      if (((r += '<' + e), t)) for (let e in t) !1 !== t[e] && null != t[e] && e !== $ && (r += ` ${A[e] ? A[e] : O(e)}="${O(t[e])}"`);
      r += '>';
    }
    if (-1 === P.indexOf(e)) {
      if (t[$]) r += t[$].__html;
      else
        for (; n.length; ) {
          let e = n.pop();
          if (e)
            if (e.pop) for (let t = e.length; t--; ) n.push(e[t]);
            else r += !0 === T[e] ? e : O(e);
        }
      r += e ? `</${e}>` : '';
    }
    return (T[r] = !0), r;
  }
  const K = ({ children: e }) => q(null, null, ...e),
    N = 'bespoke-marp-presenter-container',
    C = 'bespoke-marp-presenter-next',
    D = 'bespoke-marp-presenter-next-container',
    j = 'bespoke-marp-presenter-note-container',
    X = 'bespoke-marp-presenter-info-container',
    R = 'bespoke-marp-presenter-info-page',
    U = 'bespoke-marp-presenter-info-page-text',
    B = 'bespoke-marp-presenter-info-page-prev',
    V = 'bespoke-marp-presenter-info-page-next',
    Y = 'bespoke-marp-presenter-info-time',
    H = 'bespoke-marp-presenter-info-timer';
  function z(e) {
    const { title: t } = document;
    document.title = '[Presenter view]' + (t ? ` - ${t}` : '');
    const n = {},
      r = (e) => ((n[e] = n[e] || document.querySelector(`.${e}`)), n[e]);
    document.body.appendChild(
      ((e) => {
        const t = document.createElement('div');
        return (
          (t.className = N),
          t.appendChild(e),
          t.insertAdjacentHTML(
            'beforeend',
            q(
              K,
              null,
              q('div', { class: D }, q('iframe', { class: C, src: '?view=next' })),
              q('div', { class: j }),
              q(
                'div',
                { class: X },
                q(
                  'div',
                  { class: R },
                  q('button', { class: B, tabindex: '-1', title: 'Previous' }, 'Previous'),
                  q('span', { class: U }),
                  q('button', { class: V, tabindex: '-1', title: 'Next' }, 'Next')
                ),
                q('time', { class: Y, title: 'Current time' }),
                q('div', { class: H })
              )
            )
          ),
          t
        );
      })(e.parent)
    ),
      ((e) => {
        r(D).addEventListener('click', () => e.next());
        const t = r(C),
          n =
            ((a = t),
            (e, t) => {
              var n;
              return null === (n = a.contentWindow) || void 0 === n
                ? void 0
                : n.postMessage(`navigate:${e},${t}`, 'null' === window.origin ? '*' : window.origin);
            });
        var a;
        t.addEventListener('load', () => {
          r(D).classList.add('active'), n(e.slide(), e.fragmentIndex), e.on('fragment', ({ index: e, fragmentIndex: t }) => n(e, t));
        });
        const s = document.querySelectorAll('.bespoke-marp-note');
        s.forEach((e) => {
          e.addEventListener('keydown', (e) => e.stopPropagation()), r(j).appendChild(e);
        }),
          e.on('activate', () => s.forEach((t) => t.classList.toggle('active', t.dataset.index == e.slide()))),
          e.on('activate', ({ index: t }) => {
            r(U).textContent = `${t + 1} / ${e.slides.length}`;
          });
        const i = r(B),
          o = r(V);
        i.addEventListener('click', (t) => {
          i.blur(), e.prev({ fragment: !t.shiftKey });
        }),
          o.addEventListener('click', (t) => {
            o.blur(), e.next({ fragment: !t.shiftKey });
          }),
          e.on('fragment', ({ index: t, fragments: n, fragmentIndex: r }) => {
            (i.disabled = 0 === t && 0 === r), (o.disabled = t === e.slides.length - 1 && r === n.length - 1);
          });
        const l = () => (r(Y).textContent = new Date().toLocaleTimeString());
        l(), setInterval(l, 250);
      })(e);
  }
  function _(e) {
    const t = w();
    return t === h && e.appendChild(document.createElement('span')), { '': S, [g]: z, [h]: L }[t];
  }
  function J(e) {
    e.on('activate', (t) => {
      document.querySelectorAll('.bespoke-progress-parent > .bespoke-progress-bar').forEach((n) => {
        n.style.flexBasis = (100 * t.index) / (e.slides.length - 1) + '%';
      });
    });
  }
  const W = (e) => {
    const t = Number.parseInt(e, 10);
    return Number.isNaN(t) ? null : t;
  };
  function G(e = {}) {
    const t = Object.assign({ history: !0 }, e);
    return (e) => {
      let n = !0;
      const r = (e) => {
          const t = n;
          try {
            return (n = !0), e();
          } finally {
            n = t;
          }
        },
        a = (t = { fragment: !0 }) => {
          ((t, n) => {
            const { fragments: r, slides: a } = e,
              s = Math.max(0, Math.min(t, a.length - 1)),
              i = Math.max(0, Math.min(n || 0, r[s].length - 1));
            (s === e.slide() && i === e.fragmentIndex) || e.slide(s, { fragment: i });
          })((W(location.hash.slice(1)) || 1) - 1, t.fragment ? W(y('f') || '') : null);
        };
      e.on('fragment', ({ index: e, fragmentIndex: r }) => {
        n ||
          k(
            { f: 0 === r || r.toString() },
            {
              location: Object.assign(Object.assign({}, location), {
                hash: `#${e + 1}`,
              }),
              setter: (...e) => (t.history ? history.pushState(...e) : history.replaceState(...e)),
            }
          );
      }),
        setTimeout(() => {
          a(),
            window.addEventListener('hashchange', () =>
              r(() => {
                a({ fragment: !1 }), k({ f: void 0 });
              })
            ),
            window.addEventListener('popstate', () => {
              n || r(() => a());
            }),
            (n = !1);
        }, 0);
    };
  }
  function Q(e = {}) {
    var t;
    const n = e.key || (null === (t = window.history.state) || void 0 === t ? void 0 : t.marpBespokeSyncKey) || Math.random().toString(36).slice(2),
      r = `bespoke-marp-sync-${n}`;
    var a;
    (a = { marpBespokeSyncKey: n }), k({}, { setter: (e, ...t) => p(Object.assign(Object.assign({}, e), a), ...t) });
    const s = () => {
        const e = E.get(r);
        return e ? JSON.parse(e) : Object.create(null);
      },
      i = (e) => {
        const t = s(),
          n = Object.assign(Object.assign({}, t), e(t));
        return E.set(r, JSON.stringify(n)), n;
      },
      o = () => {
        window.removeEventListener('pageshow', o), i((e) => ({ reference: (e.reference || 0) + 1 }));
      };
    return (e) => {
      o(), Object.defineProperty(e, 'syncKey', { value: n, enumerable: !0 });
      let t = !0;
      setTimeout(() => {
        e.on('fragment', (e) => {
          t && i(() => ({ index: e.index, fragmentIndex: e.fragmentIndex }));
        });
      }, 0),
        window.addEventListener('storage', (n) => {
          if (n.key === r && n.oldValue && n.newValue) {
            const r = JSON.parse(n.oldValue),
              a = JSON.parse(n.newValue);
            if (r.index !== a.index || r.fragmentIndex !== a.fragmentIndex)
              try {
                (t = !1), e.slide(a.index, { fragment: a.fragmentIndex });
              } finally {
                t = !0;
              }
          }
        });
      const a = () => {
        const { reference: e } = s();
        void 0 === e || e <= 1 ? E.remove(r) : i(() => ({ reference: e - 1 }));
      };
      window.addEventListener('pagehide', (e) => {
        e.persisted && window.addEventListener('pageshow', o), a();
      }),
        e.on('destroy', a);
    };
  }
  function Z({ slope: e = Math.tan((-35 * Math.PI) / 180), swipeThreshold: t = 30 } = {}) {
    return (n) => {
      let r;
      const a = n.parent,
        s = (e) => {
          const t = a.getBoundingClientRect();
          return {
            x: e.pageX - (t.left + t.right) / 2,
            y: e.pageY - (t.top + t.bottom) / 2,
          };
        };
      a.addEventListener(
        'touchstart',
        (e) => {
          r = 1 === e.touches.length ? s(e.touches[0]) : void 0;
        },
        { passive: !0 }
      ),
        a.addEventListener('touchmove', (e) => {
          if (r)
            if (1 === e.touches.length) {
              e.preventDefault();
              const t = s(e.touches[0]),
                n = t.x - r.x,
                a = t.y - r.y;
              (r.delta = Math.sqrt(Math.pow(Math.abs(n), 2) + Math.pow(Math.abs(a), 2))), (r.radian = Math.atan2(n, a));
            } else r = void 0;
        }),
        a.addEventListener(
          'touchend',
          (a) => {
            if (r) {
              if (r.delta && r.delta >= t && r.radian) {
                let t = r.radian - e;
                (t = ((t + Math.PI) % (2 * Math.PI)) - Math.PI), n[t < 0 ? 'next' : 'prev'](), a.stopPropagation();
              }
              r = void 0;
            }
          },
          { passive: !0 }
        );
    };
  }
  function ee(e, t, n, r) {
    return new (n || (n = Promise))(function (a, s) {
      function i(e) {
        try {
          l(r.next(e));
        } catch (e) {
          s(e);
        }
      }
      function o(e) {
        try {
          l(r.throw(e));
        } catch (e) {
          s(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? a(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(i, o);
      }
      l((r = r.apply(e, t || [])).next());
    });
  }
  let te;
  const ne = () => (void 0 === te && (te = 'wakeLock' in navigator && navigator.wakeLock), te),
    re = () =>
      ee(void 0, void 0, void 0, function* () {
        const e = ne();
        if (e)
          try {
            return yield e.request('screen');
          } catch (e) {
            console.warn(e);
          }
        return null;
      });
  function ae() {
    return ee(this, void 0, void 0, function* () {
      if (!ne()) return;
      let e;
      const t = () => {
        e && 'visible' === document.visibilityState && re();
      };
      return document.addEventListener('visibilitychange', t), document.addEventListener('fullscreenchange', t), (e = yield re()), e;
    });
  }
  !(function (r = document.getElementById('p')) {
    document.body.setAttribute(
      m,
      (() => {
        const e = y('view');
        return e === h || e === g ? e : '';
      })()
    );
    const a =
        ((e) => {
          const t = y(e);
          return k({ [e]: void 0 }), t;
        })('sync') || void 0,
      s = !1,
      l = !0;
    e(
      r,
      ((...e) => {
        const t = v.findIndex((e) => w() === e);
        if (t < 0) throw new Error('Invalid view');
        return e.map(([e, n]) => e[t] && n).filter((e) => e);
      })(
        [[l, l, s], Q({ key: a })],
        [[l, l, l], _(r)],
        [[l, l, s], c],
        [[l, l, l], t],
        [[l, s, s], o()],
        [[l, l, l], d],
        [[l, l, l], G({ history: !1 })],
        [[l, l, s], f()],
        [[l, l, s], i],
        [[l, s, s], J],
        [[l, l, s], Z()],
        [[l, s, s], x()],
        [[l, l, l], n],
        [[l, l, s], ae]
      )
    );
  })();
})();
!(function () {
  'use strict';
  const t = 'marpitSVGPolyfill:setZoomFactor,',
    e = Symbol();
  let r, o;
  function n(n) {
    const i = ('object' == typeof n && n.target) || document,
      a = 'object' == typeof n ? n.zoom : n;
    window[e] ||
      (Object.defineProperty(window, e, { configurable: !0, value: !0 }),
      window.addEventListener('message', ({ data: e, origin: r }) => {
        if (r === window.origin)
          try {
            if (e && 'string' == typeof e && e.startsWith(t)) {
              const [, t] = e.split(','),
                r = Number.parseFloat(t);
              Number.isNaN(r) || (o = r);
            }
          } catch (t) {
            console.error(t);
          }
      }));
    let l = !1;
    Array.from(i.querySelectorAll('svg[data-marpit-svg]'), (t) => {
      var e, n, i, s;
      t.style.transform || (t.style.transform = 'translateZ(0)');
      const c = a || o || t.currentScale || 1;
      r !== c && ((r = c), (l = c));
      const d = t.getBoundingClientRect(),
        { length: u } = t.children;
      for (let r = 0; r < u; r += 1) {
        const o = t.children[r],
          a = o.getScreenCTM();
        if (a) {
          const t = null !== (n = null === (e = o.x) || void 0 === e ? void 0 : e.baseVal.value) && void 0 !== n ? n : 0,
            r = null !== (s = null === (i = o.y) || void 0 === i ? void 0 : i.baseVal.value) && void 0 !== s ? s : 0,
            l = o.firstElementChild,
            { style: u } = l;
          u.transformOrigin || (u.transformOrigin = `${-t}px ${-r}px`),
            (u.transform = `scale(${c}) matrix(${a.a}, ${a.b}, ${a.c}, ${a.d}, ${a.e - d.left}, ${a.f - d.top}) translateZ(0.0001px)`);
        }
      }
    }),
      !1 !== l &&
        Array.from(i.querySelectorAll('iframe'), ({ contentWindow: e }) => {
          null == e || e.postMessage(`${t}${l}`, 'null' === window.origin ? '*' : window.origin);
        });
  }
  (r = 1), (o = void 0);
  const i = (t, e, r) => {
    if (t.getAttribute(e) !== r) return t.setAttribute(e, r), !0;
  };
  function a({ once: t = !1, target: e = document } = {}) {
    const r = 'Apple Computer, Inc.' === navigator.vendor ? [n] : [];
    let o = !t;
    const a = () => {
      for (const t of r) t({ target: e });
      !(function (t = document) {
        Array.from(t.querySelectorAll('svg[data-marp-fitting="svg"]'), (t) => {
          var e;
          const r = t.firstChild,
            o = r.firstChild,
            { scrollWidth: n, scrollHeight: a } = o;
          let l,
            s = 1;
          if (
            (t.hasAttribute('data-marp-fitting-code') && (l = null === (e = t.parentElement) || void 0 === e ? void 0 : e.parentElement),
            t.hasAttribute('data-marp-fitting-math') && (l = t.parentElement),
            l)
          ) {
            const t = getComputedStyle(l),
              e = Math.ceil(l.clientWidth - parseFloat(t.paddingLeft || '0') - parseFloat(t.paddingRight || '0'));
            e && (s = e);
          }
          const c = Math.max(n, s),
            d = Math.max(a, 1),
            u = `0 0 ${c} ${d}`;
          i(r, 'width', `${c}`),
            i(r, 'height', `${d}`),
            i(t, 'preserveAspectRatio', getComputedStyle(t).getPropertyValue('--preserve-aspect-ratio') || 'xMinYMin meet'),
            i(t, 'viewBox', u) && t.classList.toggle('__reflow__');
        });
      })(e),
        o && window.requestAnimationFrame(a);
    };
    return (
      a(),
      () => {
        o = !1;
      }
    );
  }
  const l = Symbol(),
    s = document.currentScript;
  ((t = document) => {
    if ('undefined' == typeof window) throw new Error("Marp Core's browser script is valid only in browser context.");
    if (t[l]) return t[l];
    const e = a({ target: t }),
      r = () => {
        e(), delete t[l];
      };
    Object.defineProperty(t, l, { configurable: !0, value: r });
  })(s ? s.getRootNode() : document);
})();
