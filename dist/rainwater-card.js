var At = "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";
const U = globalThis, B = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = /* @__PURE__ */ Symbol(), J = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (B && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = J.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && J.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (i) => new ht(typeof i == "string" ? i : i + "", void 0, V), St = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, s, o) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new ht(e, i, V);
}, kt = (i, t) => {
  if (B) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), s = U.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, i.appendChild(r);
  }
}, Y = B ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Et(e);
})(i) : i;
const { is: Ct, defineProperty: Mt, getOwnPropertyDescriptor: Pt, getOwnPropertyNames: Ht, getOwnPropertySymbols: Tt, getPrototypeOf: Lt } = Object, z = globalThis, X = z.trustedTypes, Nt = X ? X.emptyScript : "", Ut = z.reactiveElementPolyfillSupport, M = (i, t) => i, q = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Nt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, pt = (i, t) => !Ct(i, t), Q = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: pt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, r, e);
      s !== void 0 && Mt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: s, set: o } = Pt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const c = s?.call(this);
      o?.call(this, n), this.requestUpdate(t, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = Lt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, r = [...Ht(e), ...Tt(e)];
      for (const s of r) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, s] of e) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const s = this._$Eu(e, r);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) e.unshift(Y(s));
    } else t !== void 0 && e.push(Y(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return kt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : q).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = r.getPropertyOptions(s), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : q;
      this._$Em = s;
      const c = n.fromAttribute(e, o.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, s = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (s === !1 && (o = this[t]), r ??= n.getPropertyOptions(t), !((r.hasChanged ?? pt)(o, e) || r.useDefault && r.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: s, wrapped: o }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, o] of r) {
        const { wrapped: n } = o, c = this[s];
        n !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[M("elementProperties")] = /* @__PURE__ */ new Map(), A[M("finalized")] = /* @__PURE__ */ new Map(), Ut?.({ ReactiveElement: A }), (z.reactiveElementVersions ??= []).push("2.1.2");
const W = globalThis, tt = (i) => i, O = W.trustedTypes, et = O ? O.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ut = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + v, Ot = `<${mt}>`, w = document, H = () => w.createComment(""), T = (i) => i === null || typeof i != "object" && typeof i != "function", G = Array.isArray, Rt = (i) => G(i) || typeof i?.[Symbol.iterator] == "function", I = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, it = />/g, $ = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, ot = /"/g, ft = /^(?:script|style|textarea|title)$/i, gt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), C = gt(1), nt = gt(2), E = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), x = w.createTreeWalker(w, 129);
function vt(i, t) {
  if (!G(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const zt = (i, t) => {
  const e = i.length - 1, r = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = k;
  for (let c = 0; c < e; c++) {
    const a = i[c];
    let h, d, l = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, d = n.exec(a), d !== null); ) u = n.lastIndex, n === k ? d[1] === "!--" ? n = rt : d[1] !== void 0 ? n = it : d[2] !== void 0 ? (ft.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = $) : d[3] !== void 0 && (n = $) : n === $ ? d[0] === ">" ? (n = s ?? k, l = -1) : d[1] === void 0 ? l = -2 : (l = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? $ : d[3] === '"' ? ot : st) : n === ot || n === st ? n = $ : n === rt || n === it ? n = k : (n = $, s = void 0);
    const m = n === $ && i[c + 1].startsWith("/>") ? " " : "";
    o += n === k ? a + Ot : l >= 0 ? (r.push(h), a.slice(0, l) + ut + a.slice(l) + v + m) : a + v + (l === -2 ? c : m);
  }
  return [vt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class L {
  constructor({ strings: t, _$litType$: e }, r) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const c = t.length - 1, a = this.parts, [h, d] = zt(t, e);
    if (this.el = L.createElement(h, r), x.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = x.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(ut)) {
          const u = d[n++], m = s.getAttribute(l).split(v), f = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: f[2], strings: m, ctor: f[1] === "." ? It : f[1] === "?" ? Ft : f[1] === "@" ? qt : D }), s.removeAttribute(l);
        } else l.startsWith(v) && (a.push({ type: 6, index: o }), s.removeAttribute(l));
        if (ft.test(s.tagName)) {
          const l = s.textContent.split(v), u = l.length - 1;
          if (u > 0) {
            s.textContent = O ? O.emptyScript : "";
            for (let m = 0; m < u; m++) s.append(l[m], H()), x.nextNode(), a.push({ type: 2, index: ++o });
            s.append(l[u], H());
          }
        }
      } else if (s.nodeType === 8) if (s.data === mt) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = s.data.indexOf(v, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const r = w.createElement("template");
    return r.innerHTML = t, r;
  }
}
function S(i, t, e = i, r) {
  if (t === E) return t;
  let s = r !== void 0 ? e._$Co?.[r] : e._$Cl;
  const o = T(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(i), s._$AT(i, e, r)), r !== void 0 ? (e._$Co ??= [])[r] = s : e._$Cl = s), s !== void 0 && (t = S(i, s._$AS(i, t.values), s, r)), t;
}
class Dt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: r } = this._$AD, s = (t?.creationScope ?? w).importNode(e, !0);
    x.currentNode = s;
    let o = x.nextNode(), n = 0, c = 0, a = r[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new N(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new jt(o, this, t)), this._$AV.push(h), a = r[++c];
      }
      n !== a?.index && (o = x.nextNode(), n++);
    }
    return x.currentNode = w, s;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, r, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), T(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Rt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = L.createElement(vt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new Dt(s, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new L(t)), e;
  }
  k(t) {
    G(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const o of t) s === e.length ? e.push(r = new N(this.O(H()), this.O(H()), this, this.options)) : r = e[s], r._$AI(o), s++;
    s < e.length && (this._$AR(r && r._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const r = tt(t).nextSibling;
      tt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, s, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
  }
  _$AI(t, e = this, r, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = S(this, t, e, 0), n = !T(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = S(this, c[r + a], e, a), h === E && (h = this._$AH[a]), n ||= !T(h) || h !== this._$AH[a], h === p ? t = p : t !== p && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class It extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ft extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class qt extends D {
  constructor(t, e, r, s, o) {
    super(t, e, r, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? p) === E) return;
    const r = this._$AH, s = t === p && r !== p || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== p && (r === p || s);
    s && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Bt = W.litHtmlPolyfillSupport;
Bt?.(L, N), (W.litHtmlVersions ??= []).push("3.3.3");
const Vt = (i, t, e) => {
  const r = e?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    r._$litPart$ = s = new N(t.insertBefore(H(), o), o, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
const K = globalThis;
class P extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
P._$litElement$ = !0, P.finalized = !0, K.litElementHydrateSupport?.({ LitElement: P });
const Wt = K.litElementPolyfillSupport;
Wt?.({ LitElement: P });
(K.litElementVersions ??= []).push("4.2.2");
const Gt = {
  title: "Rainwater",
  history_days: 7,
  show_history: !0
}, Kt = {
  title: "Title",
  entity: "Total stored water",
  capacity: "Total storage capacity",
  reserve: "Protected reserve",
  history_days: "History period",
  show_history: "Show volume history"
}, Zt = {
  entity: "A single sensor containing the combined stored volume.",
  capacity: "Optional. Enables percentage, fill level and remaining headroom.",
  reserve: "Optional. Water below this volume is treated as protected reserve.",
  history_days: "Number of days displayed in the volume trend."
};
function Jt() {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        name: "entity",
        required: !0,
        selector: { entity: { domain: "sensor" } }
      },
      {
        type: "grid",
        name: "",
        flatten: !0,
        column_min_width: "220px",
        schema: [
          {
            name: "capacity",
            selector: {
              number: {
                min: 1,
                max: 1e7,
                step: 100,
                unit_of_measurement: "L",
                mode: "box"
              }
            }
          },
          {
            name: "reserve",
            selector: {
              number: {
                min: 0,
                max: 1e7,
                step: 100,
                unit_of_measurement: "L",
                mode: "box"
              }
            }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        flatten: !0,
        column_min_width: "220px",
        schema: [
          {
            name: "history_days",
            selector: {
              number: {
                min: 1,
                max: 30,
                step: 1,
                unit_of_measurement: "days",
                mode: "box"
              }
            }
          },
          { name: "show_history", selector: { boolean: {} } }
        ]
      }
    ],
    computeLabel: (i) => i.name ? Kt[i.name] : void 0,
    computeHelper: (i) => i.name ? Zt[i.name] : void 0,
    assertConfig: (i) => yt(i)
  };
}
function yt(i) {
  if (!i.entity || typeof i.entity != "string")
    throw new Error("Total stored water is required.");
  if (i.capacity !== void 0 && i.capacity <= 0)
    throw new Error("Total storage capacity must be greater than zero.");
  if (i.reserve !== void 0 && i.reserve < 0)
    throw new Error("Protected reserve cannot be negative.");
}
function $t(i) {
  return {
    ...Gt,
    ...i,
    type: i.type || "custom:rainwater-card"
  };
}
function Yt(i) {
  const e = Object.values(i?.states ?? {}).find((r) => {
    const s = `${r.entity_id} ${r.attributes.friendly_name ?? ""}`.toLowerCase();
    return s.includes("total water volume") || s.includes("total_water_volume") || s.includes("rainwater total");
  });
  return $t({
    type: "custom:rainwater-card",
    entity: e?.entity_id ?? ""
  });
}
const Xt = 3.785411784, Qt = 4.54609;
function te(i, t) {
  return t ? i?.states[t] : void 0;
}
function ee(i) {
  if (!i || ["unknown", "unavailable", "none", ""].includes(i.state.toLowerCase()))
    return;
  const t = Number(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function _t(i) {
  const t = ee(i);
  if (t === void 0) return;
  switch ((i?.attributes.unit_of_measurement ?? "L").trim().toLowerCase().replace("³", "3")) {
    case "kl":
      return t * 1e3;
    case "m3":
      return t * 1e3;
    case "gal":
    case "us gal":
      return t * Xt;
    case "imp gal":
      return t * Qt;
    default:
      return t;
  }
}
function g(i, t, e = {}) {
  if (i === void 0 || !Number.isFinite(i)) return "—";
  const r = Math.abs(i), s = e.compact !== !1 && r >= 1e3, o = s ? i / 1e3 : i, n = s ? r >= 1e4 ? 1 : 2 : 0;
  return `${new Intl.NumberFormat(t, {
    maximumFractionDigits: n,
    minimumFractionDigits: s && r < 1e4 ? 1 : 0,
    signDisplay: e.signed ? "always" : "auto"
  }).format(o)} ${s ? "kL" : "L"}`;
}
function lt(i, t) {
  return i === void 0 || !Number.isFinite(i) ? "—" : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(i)}%`;
}
const ct = 96;
function dt(i, t) {
  return i ? Math.max(
    0,
    _t({
      ...i,
      attributes: {
        ...t?.attributes,
        ...i.attributes
      }
    }) ?? 0
  ) : 0;
}
function re(i, t, e) {
  if (i.length === 0) return 0;
  let r = i[0], s = i.at(-1) ?? i[0];
  for (const d of i) {
    const l = Date.parse(d.last_changed ?? d.last_updated ?? "");
    if (Number.isFinite(l) && (l <= t && (r = d), l >= t)) {
      s = d;
      break;
    }
  }
  const o = Date.parse(r.last_changed ?? r.last_updated ?? ""), n = Date.parse(s.last_changed ?? s.last_updated ?? ""), c = dt(r, e), a = dt(s, e);
  if (!Number.isFinite(o) || !Number.isFinite(n) || o === n)
    return c;
  const h = Math.min(
    1,
    Math.max(0, (t - o) / (n - o))
  );
  return c + (a - c) * h;
}
async function ie(i, t, e, r = /* @__PURE__ */ new Date()) {
  const s = r, o = Math.min(30, Math.max(1, e)), n = new Date(s.getTime() - o * 24 * 60 * 60 * 1e3), c = `history/period/${encodeURIComponent(n.toISOString())}?end_time=${encodeURIComponent(s.toISOString())}&filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only=0`, h = (await i.callApi("GET", c)).find(
    (d) => d.some((l) => l.entity_id === t)
  ) ?? [];
  return Array.from({ length: ct }, (d, l) => {
    const u = n.getTime() + l / (ct - 1) * (s.getTime() - n.getTime());
    return {
      timestamp: u,
      volume: re(h, u, i.states[t])
    };
  });
}
const se = St`
  :host {
    --rainwater-blue: #1689c8;
    --rainwater-deep: #075c8f;
    --rainwater-aqua: #45c6d9;
    --rainwater-soft: color-mix(in srgb, var(--rainwater-blue) 12%, transparent);
    display: block;
    container-type: inline-size;
  }

  * {
    box-sizing: border-box;
  }

  ha-card {
    overflow: hidden;
    color: var(--primary-text-color, #17212b);
    background:
      radial-gradient(circle at 92% 2%, var(--rainwater-soft), transparent 38%),
      var(--ha-card-background, var(--card-background-color, #fff));
  }

  .card {
    padding: clamp(18px, 5cqw, 28px);
  }

  .header,
  .title-group,
  .status,
  .section-heading,
  .legend,
  .footer {
    display: flex;
    align-items: center;
  }

  .header {
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
  }

  .title-group {
    min-width: 0;
    gap: 13px;
  }

  .icon-tile {
    display: grid;
    width: 46px;
    height: 46px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 15px;
    color: var(--rainwater-blue);
    background: var(--rainwater-soft);
  }

  .icon-tile svg {
    width: 25px;
    height: 25px;
    fill: currentColor;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    overflow: hidden;
    color: var(--primary-text-color, #17212b);
    font-size: clamp(20px, 5.5cqw, 28px);
    font-weight: 760;
    letter-spacing: -0.8px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subtitle {
    margin-top: 3px;
    color: var(--secondary-text-color, #657181);
    font-size: 13px;
  }

  .status {
    flex: 0 0 auto;
    gap: 8px;
    min-height: 34px;
    padding: 0 13px;
    border-radius: 999px;
    color: var(--rainwater-deep);
    background: var(--rainwater-soft);
    font-size: 12px;
    font-weight: 750;
  }

  .status.low {
    color: #8a5a00;
    background: color-mix(in srgb, var(--warning-color, #f4a100) 16%, transparent);
  }

  .status.critical,
  .status.unavailable {
    color: var(--error-color, #c62828);
    background: color-mix(in srgb, var(--error-color, #c62828) 13%, transparent);
  }

  .status .dot,
  .footer .dot {
    width: 8px;
    height: 8px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: currentColor;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(150px, 0.8fr) minmax(210px, 1.2fr);
    gap: clamp(20px, 6cqw, 34px);
    align-items: center;
    padding: clamp(18px, 4.5cqw, 25px);
    border: 1px solid color-mix(in srgb, var(--rainwater-blue) 24%, var(--divider-color, #ddd));
    border-radius: 22px;
    background: color-mix(
      in srgb,
      var(--ha-card-background, var(--card-background-color, #fff)) 88%,
      var(--rainwater-blue) 12%
    );
  }

  .tank-button {
    display: grid;
    width: 100%;
    padding: 0;
    border: 0;
    place-items: center;
    color: inherit;
    background: transparent;
    cursor: pointer;
  }

  .tank {
    position: relative;
    width: min(100%, 168px);
    aspect-ratio: 0.76;
    overflow: hidden;
    border: 4px solid color-mix(in srgb, var(--primary-text-color, #17212b) 76%, transparent);
    border-radius: 42% 42% 18px 18px / 16% 16% 18px 18px;
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--primary-text-color, #17212b) 4%, transparent),
        transparent 30% 70%,
        color-mix(in srgb, var(--primary-text-color, #17212b) 5%, transparent)
      ),
      color-mix(in srgb, var(--card-background-color, #fff) 72%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, white 55%, transparent),
      0 18px 34px color-mix(in srgb, var(--rainwater-deep) 15%, transparent);
  }

  .tank::before {
    position: absolute;
    z-index: 3;
    top: 11px;
    right: 21%;
    left: 21%;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, white 48%, transparent);
    content: "";
  }

  .tank-water {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: max(0%, min(100%, var(--fill, 0%)));
    background:
      linear-gradient(180deg, var(--rainwater-aqua), var(--rainwater-blue) 52%, var(--rainwater-deep));
    transition: height 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .tank-water::before,
  .tank-water::after {
    position: absolute;
    top: -9px;
    width: 65%;
    height: 19px;
    border-radius: 50%;
    content: "";
  }

  .tank-water::before {
    left: -7%;
    background: color-mix(in srgb, var(--rainwater-aqua) 82%, white);
    transform: rotate(3deg);
  }

  .tank-water::after {
    right: -8%;
    background: var(--rainwater-aqua);
    transform: rotate(-4deg);
  }

  .tank-shine {
    position: absolute;
    z-index: 2;
    top: 18%;
    bottom: 14%;
    left: 15%;
    width: 9%;
    border-radius: 999px;
    background: linear-gradient(180deg, color-mix(in srgb, white 70%, transparent), transparent);
    opacity: 0.75;
  }

  .tank-label {
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 50%;
    display: grid;
    width: 76px;
    height: 76px;
    border: 1px solid color-mix(in srgb, white 60%, transparent);
    place-items: center;
    border-radius: 50%;
    color: white;
    background: color-mix(in srgb, var(--rainwater-deep) 74%, transparent);
    box-shadow: 0 8px 22px color-mix(in srgb, black 18%, transparent);
    font-size: 18px;
    font-weight: 780;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(8px);
  }

  .tank.no-capacity .tank-label {
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  .volume {
    color: var(--primary-text-color, #17212b);
    font-size: clamp(38px, 11cqw, 60px);
    font-weight: 790;
    letter-spacing: -2.6px;
    line-height: 0.95;
  }

  .volume-note {
    margin-top: 8px;
    color: var(--rainwater-deep);
    font-size: 14px;
    font-weight: 720;
  }

  .meter {
    height: 8px;
    margin: 18px 0 20px;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--secondary-text-color, #657181) 16%, transparent);
  }

  .meter > span {
    display: block;
    width: var(--fill, 0%);
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--rainwater-deep), var(--rainwater-aqua));
    transition: width 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    overflow: hidden;
    border: 1px solid var(--divider-color, #e3e7eb);
    border-radius: 14px;
    background: var(--divider-color, #e3e7eb);
  }

  .stat {
    min-width: 0;
    padding: 13px 14px;
    background: var(--ha-card-background, var(--card-background-color, #fff));
  }

  .stat span {
    display: block;
    color: var(--secondary-text-color, #657181);
    font-size: 11px;
    font-weight: 650;
  }

  .stat strong {
    display: block;
    overflow: hidden;
    margin-top: 4px;
    color: var(--primary-text-color, #17212b);
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .history {
    margin-top: 22px;
    padding-top: 20px;
    border-top: 1px solid var(--divider-color, #e3e7eb);
  }

  .section-heading {
    justify-content: space-between;
    gap: 16px;
  }

  .section-heading h2 {
    color: var(--primary-text-color, #17212b);
    font-size: 14px;
    font-weight: 760;
  }

  .section-heading span {
    color: var(--secondary-text-color, #657181);
    font-size: 12px;
  }

  .chart-wrap {
    height: 128px;
    margin-top: 12px;
  }

  .chart-wrap svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .grid-line {
    stroke: var(--divider-color, #e3e7eb);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .area {
    fill: url("#water-area");
  }

  .line {
    fill: none;
    stroke: var(--rainwater-blue);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    vector-effect: non-scaling-stroke;
  }

  .end-dot {
    fill: var(--rainwater-aqua);
    stroke: var(--ha-card-background, var(--card-background-color, #fff));
    stroke-width: 2.5;
    vector-effect: non-scaling-stroke;
  }

  .chart-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: var(--secondary-text-color, #657181);
    font-size: 11px;
  }

  .history-note {
    margin-top: 10px;
    color: var(--secondary-text-color, #657181);
    font-size: 11px;
  }

  .footer {
    gap: 10px;
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid var(--divider-color, #e3e7eb);
    color: var(--secondary-text-color, #657181);
    font-size: 12px;
  }

  .footer .dot {
    color: var(--rainwater-aqua);
  }

  @container (max-width: 430px) {
    .header {
      align-items: flex-start;
    }

    .status {
      min-height: 30px;
      padding: 0 10px;
      font-size: 11px;
    }

    .hero {
      grid-template-columns: 112px minmax(0, 1fr);
      gap: 16px;
      padding: 16px;
    }

    .tank {
      width: 108px;
      border-width: 3px;
    }

    .tank-label {
      width: 58px;
      height: 58px;
      font-size: 15px;
    }

    .volume {
      font-size: clamp(32px, 10cqw, 44px);
      letter-spacing: -1.8px;
    }

    .stat {
      padding: 11px 10px;
    }

    .stat strong {
      font-size: 13px;
    }
  }

  @container (max-width: 330px) {
    .hero {
      grid-template-columns: 1fr;
    }

    .tank {
      width: 126px;
    }
  }
`, b = 480, _ = 126, oe = 600 * 1e3;
function F(i, t, e) {
  return Math.min(e, Math.max(t, i));
}
function ne(i) {
  return i.length === 0 ? "" : i.length === 1 ? `M 0 ${i[0][1]} L ${b} ${i[0][1]}` : i.slice(1).reduce((t, [e, r], s) => {
    const [o, n] = i[s], c = (o + e) / 2;
    return `${t} C ${c} ${n}, ${c} ${r}, ${e} ${r}`;
  }, `M ${i[0][0]} ${i[0][1]}`);
}
function ae(i, t, e = Date.now()) {
  return Array.from({ length: 12 }, (r, s) => ({
    timestamp: e - (11 - s) * (t * 24 * 60 * 60 * 1e3) / 11,
    volume: i
  }));
}
function le(i, t) {
  return i === void 0 ? "unavailable" : t === void 0 ? "monitoring" : t <= 10 ? "critical" : t <= 25 ? "low" : t >= 98 ? "full" : "healthy";
}
function ce(i) {
  switch (i) {
    case "critical":
      return "Critical";
    case "low":
      return "Low";
    case "full":
      return "Full";
    case "monitoring":
      return "Monitoring";
    case "unavailable":
      return "Unavailable";
    default:
      return "Healthy";
  }
}
const R = class R extends P {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static getConfigForm() {
    return Jt();
  }
  static getStubConfig(t) {
    return Yt(t);
  }
  setConfig(t) {
    yt(t), this._config = $t({ ...t });
  }
  getCardSize() {
    return this._config?.show_history === !1 ? 6 : 9;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6
    };
  }
  updated(t) {
    (t.has("hass") || t.has("_config")) && queueMicrotask(() => {
      this._loadHistoryIfNeeded();
    });
  }
  async _loadHistoryIfNeeded() {
    const t = this._config, e = this.hass;
    if (!t || !e || t.show_history === !1) return;
    const r = F(t.history_days ?? 7, 1, 30), s = `${t.entity}|${r}`, o = Date.now();
    if (!(this._historyLoading || s === this._lastHistoryKey && o - this._lastHistoryFetch < oe)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = s, this._lastHistoryFetch = o;
      try {
        this._history = await ie(e, t.entity, r);
      } catch {
        this._history = [], this._historyFailed = !0;
      } finally {
        this._historyLoading = !1;
      }
    }
  }
  _openMoreInfo() {
    this._config && this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this._config.entity },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _renderChart(t) {
    const e = t.map((m) => m.volume), r = Math.min(...e), s = Math.max(...e), o = Math.max(100, (s - r) * 0.16), n = Math.max(0, r - o), c = Math.max(n + 1, s + o), a = c - n, h = t.map((m, f) => [
      f / Math.max(1, t.length - 1) * b,
      4 + (c - m.volume) / a * (_ - 8)
    ]), d = ne(h), l = h.length ? `${d} L ${b} ${_} L 0 ${_} Z` : "", u = h.at(-1) ?? [b, _];
    return C`
      <div class="chart-wrap">
        <svg
          viewBox="0 0 ${b} ${_}"
          role="img"
          aria-label="Stored rainwater volume history"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="water-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--rainwater-blue)" stop-opacity="0.28"></stop>
              <stop offset="100%" stop-color="var(--rainwater-blue)" stop-opacity="0.02"></stop>
            </linearGradient>
          </defs>
          ${[0, 1, 2, 3].map((m) => {
      const f = m / 3 * _;
      return nt`<line class="grid-line" x1="0" y1=${f} x2=${b} y2=${f}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((m) => {
      const f = m / 4 * b;
      return nt`<line class="grid-line" x1=${f} y1="0" x2=${f} y2=${_}></line>`;
    })}
          <path class="area" d=${l}></path>
          <path class="line" d=${d}></path>
          <circle class="end-dot" cx=${u[0]} cy=${u[1]} r="5"></circle>
        </svg>
      </div>
    `;
  }
  render() {
    const t = this._config;
    if (!t) return p;
    const e = this.hass?.locale?.language ?? this.hass?.language, r = _t(te(this.hass, t.entity)), s = t.capacity !== void 0 && t.capacity > 0 ? t.capacity : void 0, o = Math.max(0, Math.min(t.reserve ?? 0, s ?? 1 / 0)), n = r !== void 0 && s !== void 0 ? F(r / s * 100, 0, 100) : void 0, c = n ?? 0, a = le(r, n), h = r !== void 0 ? Math.max(0, r - o) : void 0, d = r !== void 0 && s !== void 0 ? Math.max(0, s - r) : void 0, l = F(t.history_days ?? 7, 1, 30), u = this._history.length > 1 ? this._history : ae(r ?? 0, l), m = Date.now() - 1440 * 60 * 1e3, f = [...u].reverse().find((wt) => wt.timestamp <= m) ?? u[0], y = r !== void 0 && this._history.length > 1 && f ? r - f.volume : void 0, bt = new Intl.DateTimeFormat(e, {
      month: "short",
      day: "numeric"
    }), Z = u[0]?.timestamp, xt = r === void 0 ? "Stored water sensor is unavailable" : s === void 0 ? "Add total capacity to enable fill level and headroom" : r <= o ? "Protected reserve is currently in use" : y !== void 0 && y > 10 ? `Storage increased by ${g(y, e)} in 24 hours` : y !== void 0 && y < -10 ? `${g(Math.abs(y), e)} used in the past 24 hours` : "Stored rainwater level is steady";
    return C`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${At}></path></svg>
              </div>
              <div>
                <h1>${t.title || "Rainwater"}</h1>
                <p class="subtitle">Total stored volume</p>
              </div>
            </div>
            <div class="status ${a}">
              <span class="dot"></span>
              ${ce(a)}
            </div>
          </header>

          <section class="hero">
            <button
              class="tank-button"
              type="button"
              aria-label="Open stored water entity details"
              @click=${this._openMoreInfo}
            >
              <div
                class="tank ${s === void 0 ? "no-capacity" : ""}"
                style="--fill: ${c}%"
              >
                <div class="tank-water"></div>
                <div class="tank-shine"></div>
                <div class="tank-label">
                  ${s === void 0 ? "Set capacity" : lt(n, e)}
                </div>
              </div>
            </button>

            <div class="summary">
              <p class="volume">${g(r, e)}</p>
              <p class="volume-note">
                ${s === void 0 ? "Combined rainwater storage" : `${lt(n, e)} of ${g(s, e)}`}
              </p>
              <div class="meter" style="--fill: ${c}%"><span></span></div>
              <div class="stats">
                <div class="stat">
                  <span>Available</span>
                  <strong>${g(h, e)}</strong>
                </div>
                <div class="stat">
                  <span>24-hour change</span>
                  <strong>${g(y, e, { signed: !0 })}</strong>
                </div>
                <div class="stat">
                  <span>Protected reserve</span>
                  <strong>${g(o, e)}</strong>
                </div>
                <div class="stat">
                  <span>Headroom</span>
                  <strong>${g(d, e)}</strong>
                </div>
              </div>
            </div>
          </section>

          ${t.show_history === !1 ? p : C`
                <section class="history">
                  <div class="section-heading">
                    <h2>Stored water · ${l} ${l === 1 ? "day" : "days"}</h2>
                    <span>${g(r, e)}</span>
                  </div>
                  ${this._renderChart(u)}
                  <div class="chart-axis">
                    <span>${Z ? bt.format(Z) : ""}</span>
                    <span>Now</span>
                  </div>
                  ${this._historyLoading ? C`<p class="history-note">Loading Home Assistant history…</p>` : this._historyFailed ? C`<p class="history-note">History unavailable · showing current level</p>` : p}
                </section>
              `}

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${xt}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
};
R.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 }
}, R.styles = se;
let j = R;
customElements.get("rainwater-card") || customElements.define("rainwater-card", j);
window.customCards = window.customCards || [];
window.customCards.some((i) => i.type === "rainwater-card") || window.customCards.push({
  type: "rainwater-card",
  name: "Rainwater Card",
  preview: !0,
  description: "A single-reservoir rainwater volume, reserve and history card."
});
export {
  j as RainwaterCard
};
//# sourceMappingURL=rainwater-card.js.map
