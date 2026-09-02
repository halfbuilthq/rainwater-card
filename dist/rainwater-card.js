var Ct = "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";
const D = globalThis, Y = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = /* @__PURE__ */ Symbol(), rt = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Y && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const St = (i) => new gt(typeof i == "string" ? i : i + "", void 0, J), Pt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((r, s, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new gt(e, i, J);
}, Mt = (i, t) => {
  if (Y) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), s = D.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, i.appendChild(r);
  }
}, it = Y ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return St(e);
})(i) : i;
const { is: Tt, defineProperty: Ht, getOwnPropertyDescriptor: Lt, getOwnPropertyNames: It, getOwnPropertySymbols: Nt, getPrototypeOf: Ut } = Object, j = globalThis, st = j.trustedTypes, Ot = st ? st.emptyScript : "", zt = j.reactiveElementPolyfillSupport, I = (i, t) => i, Z = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ot : null;
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
} }, vt = (i, t) => !Tt(i, t), ot = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, r, e);
      s !== void 0 && Ht(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: s, set: o } = Lt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const l = s?.call(this);
      o?.call(this, a), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, r = [...It(e), ...Nt(e)];
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
      for (const s of r) e.unshift(it(s));
    } else t !== void 0 && e.push(it(t));
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
    return Mt(t, this.constructor.elementStyles), t;
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
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : Z).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = r.getPropertyOptions(s), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Z;
      this._$Em = s;
      const l = a.fromAttribute(e, o.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, s = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? vt)(o, e) || r.useDefault && r.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: s, wrapped: o }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: a } = o, l = this[s];
        a !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[I("elementProperties")] = /* @__PURE__ */ new Map(), P[I("finalized")] = /* @__PURE__ */ new Map(), zt?.({ ReactiveElement: P }), (j.reactiveElementVersions ??= []).push("2.1.2");
const Q = globalThis, at = (i) => i, F = Q.trustedTypes, nt = F ? F.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, yt = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + x, Rt = `<${$t}>`, C = document, U = () => C.createComment(""), O = (i) => i === null || typeof i != "object" && typeof i != "function", tt = Array.isArray, Dt = (i) => tt(i) || typeof i?.[Symbol.iterator] == "function", G = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, lt = />/g, A = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, dt = /"/g, xt = /^(?:script|style|textarea|title)$/i, _t = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), S = _t(1), K = _t(2), M = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function bt(i, t) {
  if (!tt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt !== void 0 ? nt.createHTML(t) : t;
}
const Ft = (i, t) => {
  const e = i.length - 1, r = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = H;
  for (let l = 0; l < e; l++) {
    const n = i[l];
    let d, h, c = -1, u = 0;
    for (; u < n.length && (a.lastIndex = u, h = a.exec(n), h !== null); ) u = a.lastIndex, a === H ? h[1] === "!--" ? a = ct : h[1] !== void 0 ? a = lt : h[2] !== void 0 ? (xt.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = A) : h[3] !== void 0 && (a = A) : a === A ? h[0] === ">" ? (a = s ?? H, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? A : h[3] === '"' ? dt : ht) : a === dt || a === ht ? a = A : a === ct || a === lt ? a = H : (a = A, s = void 0);
    const f = a === A && i[l + 1].startsWith("/>") ? " " : "";
    o += a === H ? n + Rt : c >= 0 ? (r.push(d), n.slice(0, c) + yt + n.slice(c) + x + f) : n + x + (c === -2 ? l : f);
  }
  return [bt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class z {
  constructor({ strings: t, _$litType$: e }, r) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, n = this.parts, [d, h] = Ft(t, e);
    if (this.el = z.createElement(d, r), E.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = E.nextNode()) !== null && n.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(yt)) {
          const u = h[a++], f = s.getAttribute(c).split(x), m = /([.?@])?(.*)/.exec(u);
          n.push({ type: 1, index: o, name: m[2], strings: f, ctor: m[1] === "." ? jt : m[1] === "?" ? Bt : m[1] === "@" ? Vt : B }), s.removeAttribute(c);
        } else c.startsWith(x) && (n.push({ type: 6, index: o }), s.removeAttribute(c));
        if (xt.test(s.tagName)) {
          const c = s.textContent.split(x), u = c.length - 1;
          if (u > 0) {
            s.textContent = F ? F.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(c[f], U()), E.nextNode(), n.push({ type: 2, index: ++o });
            s.append(c[u], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === $t) n.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(x, c + 1)) !== -1; ) n.push({ type: 7, index: o }), c += x.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const r = C.createElement("template");
    return r.innerHTML = t, r;
  }
}
function T(i, t, e = i, r) {
  if (t === M) return t;
  let s = r !== void 0 ? e._$Co?.[r] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(i), s._$AT(i, e, r)), r !== void 0 ? (e._$Co ??= [])[r] = s : e._$Cl = s), s !== void 0 && (t = T(i, s._$AS(i, t.values), s, r)), t;
}
class qt {
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
    const { el: { content: e }, parts: r } = this._$AD, s = (t?.creationScope ?? C).importNode(e, !0);
    E.currentNode = s;
    let o = E.nextNode(), a = 0, l = 0, n = r[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let d;
        n.type === 2 ? d = new R(o, o.nextSibling, this, t) : n.type === 1 ? d = new n.ctor(o, n.name, n.strings, this, t) : n.type === 6 && (d = new Wt(o, this, t)), this._$AV.push(d), n = r[++l];
      }
      a !== n?.index && (o = E.nextNode(), a++);
    }
    return E.currentNode = C, s;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class R {
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
    t = T(this, t, e), O(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== M && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Dt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = z.createElement(bt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new qt(s, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const o of t) s === e.length ? e.push(r = new R(this.O(U()), this.O(U()), this, this.options)) : r = e[s], r._$AI(o), s++;
    s < e.length && (this._$AR(r && r._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const r = at(t).nextSibling;
      at(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class B {
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
    let a = !1;
    if (o === void 0) t = T(this, t, e, 0), a = !O(t) || t !== this._$AH && t !== M, a && (this._$AH = t);
    else {
      const l = t;
      let n, d;
      for (t = o[0], n = 0; n < o.length - 1; n++) d = T(this, l[r + n], e, n), d === M && (d = this._$AH[n]), a ||= !O(d) || d !== this._$AH[n], d === p ? t = p : t !== p && (t += (d ?? "") + o[n + 1]), this._$AH[n] = d;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Bt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Vt extends B {
  constructor(t, e, r, s, o) {
    super(t, e, r, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? p) === M) return;
    const r = this._$AH, s = t === p && r !== p || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== p && (r === p || s);
    s && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Wt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const Gt = Q.litHtmlPolyfillSupport;
Gt?.(z, R), (Q.litHtmlVersions ??= []).push("3.3.3");
const Kt = (i, t, e) => {
  const r = e?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    r._$litPart$ = s = new R(t.insertBefore(U(), o), o, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
const et = globalThis;
class N extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Kt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return M;
  }
}
N._$litElement$ = !0, N.finalized = !0, et.litElementHydrateSupport?.({ LitElement: N });
const Zt = et.litElementPolyfillSupport;
Zt?.({ LitElement: N });
(et.litElementVersions ??= []).push("4.2.2");
const Xt = {
  title: "Rainwater",
  history_days: 7,
  show_history: !0
}, Yt = {
  title: "Title",
  entity: "Total stored water",
  capacity: "Total storage capacity",
  reserve: "Protected reserve",
  history_days: "History period",
  show_history: "Show volume history"
}, Jt = {
  entity: "A single sensor containing the combined stored volume.",
  capacity: "Optional. Enables percentage, fill level and remaining headroom.",
  reserve: "Optional. Water below this volume is treated as protected reserve.",
  history_days: "Number of days displayed in the volume trend."
};
function Qt() {
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
    computeLabel: (i) => i.name ? Yt[i.name] : void 0,
    computeHelper: (i) => i.name ? Jt[i.name] : void 0,
    assertConfig: (i) => wt(i)
  };
}
function wt(i) {
  if (!i.entity || typeof i.entity != "string")
    throw new Error("Total stored water is required.");
  if (i.capacity !== void 0 && i.capacity <= 0)
    throw new Error("Total storage capacity must be greater than zero.");
  if (i.reserve !== void 0 && i.reserve < 0)
    throw new Error("Protected reserve cannot be negative.");
}
function At(i) {
  return {
    ...Xt,
    ...i,
    type: i.type || "custom:rainwater-card"
  };
}
function te(i) {
  const e = Object.values(i?.states ?? {}).find((r) => {
    const s = `${r.entity_id} ${r.attributes.friendly_name ?? ""}`.toLowerCase();
    return s.includes("total water volume") || s.includes("total_water_volume") || s.includes("rainwater total");
  });
  return At({
    type: "custom:rainwater-card",
    entity: e?.entity_id ?? ""
  });
}
function ee(i, t, e, r) {
  if (r <= 1 || e <= 0) return 0;
  const s = Math.min(1, Math.max(0, (i - t) / e));
  return Math.round(s * (r - 1));
}
function re(i, t) {
  return t <= 1 ? 0 : Math.min(t - 1, Math.max(0, i)) / (t - 1) * 100;
}
function ie(i, t, e, r, s = 154, o = 70, a = 14) {
  const l = Math.min(e, Math.max(0, i)), n = Math.min(
    Math.max(4, r - o - 4),
    Math.max(4, t - o / 2)
  );
  return {
    x: l,
    top: n,
    placement: l + a + s > e ? "place-left" : "place-right"
  };
}
const se = 3.785411784, oe = 4.54609;
function ae(i, t) {
  return t ? i?.states[t] : void 0;
}
function ne(i) {
  if (!i || ["unknown", "unavailable", "none", ""].includes(i.state.toLowerCase()))
    return;
  const t = Number(i.state);
  return Number.isFinite(t) ? t : void 0;
}
function kt(i) {
  const t = ne(i);
  if (t === void 0) return;
  switch ((i?.attributes.unit_of_measurement ?? "L").trim().toLowerCase().replace("³", "3")) {
    case "kl":
      return t * 1e3;
    case "m3":
      return t * 1e3;
    case "gal":
    case "us gal":
      return t * se;
    case "imp gal":
      return t * oe;
    default:
      return t;
  }
}
function y(i, t, e = {}) {
  if (i === void 0 || !Number.isFinite(i)) return "—";
  const r = Math.abs(i), s = e.compact !== !1 && r >= 1e3, o = s ? i / 1e3 : i, a = s ? r >= 1e4 ? 1 : 2 : 0;
  return `${new Intl.NumberFormat(t, {
    maximumFractionDigits: a,
    minimumFractionDigits: s && r < 1e4 ? 1 : 0,
    signDisplay: e.signed ? "always" : "auto"
  }).format(o)} ${s ? "kL" : "L"}`;
}
function ut(i, t) {
  return i === void 0 || !Number.isFinite(i) ? "—" : `${new Intl.NumberFormat(t, { maximumFractionDigits: 0 }).format(i)}%`;
}
const mt = 96;
function ft(i, t) {
  return i ? Math.max(
    0,
    kt({
      ...i,
      attributes: {
        ...t?.attributes,
        ...i.attributes
      }
    }) ?? 0
  ) : 0;
}
function ce(i, t, e) {
  if (i.length === 0) return 0;
  let r = i[0], s = i.at(-1) ?? i[0];
  for (const h of i) {
    const c = Date.parse(h.last_changed ?? h.last_updated ?? "");
    if (Number.isFinite(c) && (c <= t && (r = h), c >= t)) {
      s = h;
      break;
    }
  }
  const o = Date.parse(r.last_changed ?? r.last_updated ?? ""), a = Date.parse(s.last_changed ?? s.last_updated ?? ""), l = ft(r, e), n = ft(s, e);
  if (!Number.isFinite(o) || !Number.isFinite(a) || o === a)
    return l;
  const d = Math.min(
    1,
    Math.max(0, (t - o) / (a - o))
  );
  return l + (n - l) * d;
}
async function le(i, t, e, r = /* @__PURE__ */ new Date()) {
  const s = r, o = Math.min(30, Math.max(1, e)), a = new Date(s.getTime() - o * 24 * 60 * 60 * 1e3), l = `history/period/${encodeURIComponent(a.toISOString())}?end_time=${encodeURIComponent(s.toISOString())}&filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only=0`, d = (await i.callApi("GET", l)).find(
    (h) => h.some((c) => c.entity_id === t)
  ) ?? [];
  return Array.from({ length: mt }, (h, c) => {
    const u = a.getTime() + c / (mt - 1) * (s.getTime() - a.getTime());
    return {
      timestamp: u,
      volume: ce(d, u, i.states[t])
    };
  });
}
const he = Pt`
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
      color-mix(
        in srgb,
        var(--ha-card-background, var(--card-background-color, #fff)) 72%,
        transparent
      );
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
    position: relative;
    height: 128px;
    margin-top: 12px;
    border-radius: 5px;
    outline: none;
    touch-action: pan-y;
    user-select: none;
  }

  .chart-wrap:focus-visible {
    outline: 2px solid var(--rainwater-blue);
    outline-offset: 3px;
  }

  .chart-wrap svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
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

  .inspection-line {
    stroke: var(--primary-text-color, #17212b);
    stroke-dasharray: 3 4;
    stroke-opacity: 0.42;
    stroke-width: 1.5;
    vector-effect: non-scaling-stroke;
  }

  .inspection-dot {
    fill: var(--rainwater-aqua);
    stroke: var(--ha-card-background, var(--card-background-color, #fff));
    stroke-width: 2.5;
    vector-effect: non-scaling-stroke;
  }

  .chart-tooltip {
    position: absolute;
    z-index: 3;
    width: 154px;
    padding: 9px 10px;
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color, #17212b) 14%, transparent);
    border-radius: 10px;
    color: var(--primary-text-color, #17212b);
    background: color-mix(
      in srgb,
      var(--ha-card-background, var(--card-background-color, #fff)) 95%,
      transparent
    );
    box-shadow: 0 7px 22px rgba(18, 26, 42, 0.18);
    pointer-events: none;
    backdrop-filter: blur(8px);
  }

  .chart-tooltip.place-right {
    margin-left: 14px;
  }

  .chart-tooltip.place-left {
    margin-left: -14px;
    transform: translateX(-100%);
  }

  .chart-tooltip time {
    display: block;
    margin-bottom: 5px;
    color: var(--secondary-text-color, #657181);
    font-size: 10px;
    font-weight: 700;
  }

  .tooltip-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 9px;
    font-size: 11px;
  }

  .tooltip-item span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--rainwater-blue);
    font-weight: 700;
  }

  .tooltip-item i {
    width: 7px;
    height: 7px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: currentColor;
  }

  .tooltip-item strong {
    color: var(--primary-text-color, #17212b);
    font-size: 11px;
    white-space: nowrap;
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
`, k = 480, $ = 126, de = 600 * 1e3;
function L(i, t, e) {
  return Math.min(e, Math.max(t, i));
}
function pe(i) {
  return i.length === 0 ? "" : i.length === 1 ? `M 0 ${i[0][1]} L ${k} ${i[0][1]}` : i.slice(1).reduce((t, [e, r], s) => {
    const [o, a] = i[s], l = (o + e) / 2;
    return `${t} C ${l} ${a}, ${l} ${r}, ${e} ${r}`;
  }, `M ${i[0][0]} ${i[0][1]}`);
}
function ue(i, t, e = Date.now()) {
  return Array.from({ length: 12 }, (r, s) => ({
    timestamp: e - (11 - s) * (t * 24 * 60 * 60 * 1e3) / 11,
    volume: i
  }));
}
function me(i, t) {
  return i === void 0 ? "unavailable" : t === void 0 ? "monitoring" : t <= 10 ? "critical" : t <= 25 ? "low" : t >= 98 ? "full" : "healthy";
}
function fe(i) {
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
const q = class q extends N {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static getConfigForm() {
    return Qt();
  }
  static getStubConfig(t) {
    return te(t);
  }
  setConfig(t) {
    wt(t), this._config = At({ ...t });
  }
  getCardSize() {
    return this._config?.show_history === !1 ? 6 : 9;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 3
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
    const r = L(t.history_days ?? 7, 1, 30), s = `${t.entity}|${r}`, o = Date.now();
    if (!(this._historyLoading || s === this._lastHistoryKey && o - this._lastHistoryFetch < de)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = s, this._lastHistoryFetch = o;
      try {
        this._history = await le(e, t.entity, r);
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
  _inspectChart(t, e) {
    const r = t.currentTarget.getBoundingClientRect();
    this._chartPointer = ie(
      t.clientX - r.left,
      t.clientY - r.top,
      r.width,
      r.height
    );
    const s = ee(
      t.clientX,
      r.left,
      r.width,
      e
    );
    s !== this._activeChartIndex && (this._activeChartIndex = s);
  }
  _leaveChart(t) {
    t.pointerType === "mouse" && this._clearChartInspection();
  }
  _clearChartInspection() {
    this._activeChartIndex = void 0, this._chartPointer = void 0;
  }
  _navigateChart(t, e) {
    if (this._chartPointer = void 0, t.key === "Escape") {
      this._activeChartIndex = void 0;
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key)) return;
    t.preventDefault();
    const r = this._activeChartIndex ?? e - 1;
    this._activeChartIndex = t.key === "Home" ? 0 : t.key === "End" ? e - 1 : L(r + (t.key === "ArrowLeft" ? -1 : 1), 0, e - 1);
  }
  _renderChart(t, e) {
    const r = t.map((g) => g.volume), s = Math.min(...r), o = Math.max(...r), a = Math.max(100, (o - s) * 0.16), l = Math.max(0, s - a), n = Math.max(l + 1, o + a), d = n - l, h = t.map((g, w) => [
      w / Math.max(1, t.length - 1) * k,
      4 + (n - g.volume) / d * ($ - 8)
    ]), c = pe(h), u = h.length ? `${c} L ${k} ${$} L 0 ${$} Z` : "", f = h.at(-1) ?? [k, $], m = this._activeChartIndex === void 0 ? void 0 : L(this._activeChartIndex, 0, t.length - 1), v = m === void 0 ? void 0 : t[m], _ = m === void 0 ? void 0 : h[m], b = m === void 0 ? void 0 : re(m, t.length), V = this._chartPointer?.placement ?? (b !== void 0 && b > 64 ? "place-left" : "place-right"), W = this._chartPointer ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px` : `left: ${b ?? 0}%`, Et = v ? new Intl.DateTimeFormat(e, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(v.timestamp) : "";
    return S`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label="Inspect stored rainwater volume history"
        @pointerdown=${(g) => this._inspectChart(g, t.length)}
        @pointermove=${(g) => this._inspectChart(g, t.length)}
        @pointerleave=${this._leaveChart}
        @pointercancel=${this._clearChartInspection}
        @keydown=${(g) => this._navigateChart(g, t.length)}
        @blur=${this._clearChartInspection}
      >
        <svg
          viewBox="0 0 ${k} ${$}"
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
          ${[0, 1, 2, 3].map((g) => {
      const w = g / 3 * $;
      return K`<line class="grid-line" x1="0" y1=${w} x2=${k} y2=${w}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((g) => {
      const w = g / 4 * k;
      return K`<line class="grid-line" x1=${w} y1="0" x2=${w} y2=${$}></line>`;
    })}
          <path class="area" d=${u}></path>
          <path class="line" d=${c}></path>
          <circle class="end-dot" cx=${f[0]} cy=${f[1]} r="5"></circle>
          ${_ ? K`
                <line
                  class="inspection-line"
                  x1=${_[0]}
                  y1="0"
                  x2=${_[0]}
                  y2=${$}
                ></line>
                <circle
                  class="inspection-dot"
                  cx=${_[0]}
                  cy=${_[1]}
                  r="5"
                ></circle>
              ` : p}
        </svg>
        ${v && b !== void 0 ? S`
              <div
                class="chart-tooltip ${V}"
                style=${W}
                aria-live="polite"
              >
                <time>${Et}</time>
                <div class="tooltip-item">
                  <span><i></i>Stored water</span>
                  <strong>${y(v.volume, e)}</strong>
                </div>
              </div>
            ` : p}
      </div>
    `;
  }
  render() {
    const t = this._config;
    if (!t) return p;
    const e = this.hass?.locale?.language ?? this.hass?.language, r = kt(ae(this.hass, t.entity)), s = t.capacity !== void 0 && t.capacity > 0 ? t.capacity : void 0, o = Math.max(0, Math.min(t.reserve ?? 0, s ?? 1 / 0)), a = r !== void 0 && s !== void 0 ? L(r / s * 100, 0, 100) : void 0, l = a ?? 0, n = me(r, a), d = r !== void 0 ? Math.max(0, r - o) : void 0, h = r !== void 0 && s !== void 0 ? Math.max(0, s - r) : void 0, c = L(t.history_days ?? 7, 1, 30), u = this._history.length > 1 ? this._history : ue(r ?? 0, c), f = Date.now() - 1440 * 60 * 1e3, m = [...u].reverse().find((W) => W.timestamp <= f) ?? u[0], v = r !== void 0 && this._history.length > 1 && m ? r - m.volume : void 0, _ = new Intl.DateTimeFormat(e, {
      month: "short",
      day: "numeric"
    }), b = u[0]?.timestamp, V = r === void 0 ? "Stored water sensor is unavailable" : s === void 0 ? "Add total capacity to enable fill level and headroom" : r <= o ? "Protected reserve is currently in use" : v !== void 0 && v > 10 ? `Storage increased by ${y(v, e)} in 24 hours` : v !== void 0 && v < -10 ? `${y(Math.abs(v), e)} used in the past 24 hours` : "Stored rainwater level is steady";
    return S`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${Ct}></path></svg>
              </div>
              <div>
                <h1>${t.title || "Rainwater"}</h1>
                <p class="subtitle">Total stored volume</p>
              </div>
            </div>
            <div class="status ${n}">
              <span class="dot"></span>
              ${fe(n)}
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
                style="--fill: ${l}%"
              >
                <div class="tank-water"></div>
                <div class="tank-shine"></div>
                <div class="tank-label">
                  ${s === void 0 ? "Set capacity" : ut(a, e)}
                </div>
              </div>
            </button>

            <div class="summary">
              <p class="volume">${y(r, e)}</p>
              <p class="volume-note">
                ${s === void 0 ? "Combined rainwater storage" : `${ut(a, e)} of ${y(s, e)}`}
              </p>
              <div class="meter" style="--fill: ${l}%"><span></span></div>
              <div class="stats">
                <div class="stat">
                  <span>Available</span>
                  <strong>${y(d, e)}</strong>
                </div>
                <div class="stat">
                  <span>24-hour change</span>
                  <strong>${y(v, e, { signed: !0 })}</strong>
                </div>
                <div class="stat">
                  <span>Protected reserve</span>
                  <strong>${y(o, e)}</strong>
                </div>
                <div class="stat">
                  <span>Headroom</span>
                  <strong>${y(h, e)}</strong>
                </div>
              </div>
            </div>
          </section>

          ${t.show_history === !1 ? p : S`
                <section class="history">
                  <div class="section-heading">
                    <h2>Stored water · ${c} ${c === 1 ? "day" : "days"}</h2>
                    <span>${y(r, e)}</span>
                  </div>
                  ${this._renderChart(u, e)}
                  <div class="chart-axis">
                    <span>${b ? _.format(b) : ""}</span>
                    <span>Now</span>
                  </div>
                  ${this._historyLoading ? S`<p class="history-note">Loading Home Assistant history…</p>` : this._historyFailed ? S`<p class="history-note">History unavailable · showing current level</p>` : p}
                </section>
              `}

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${V}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
};
q.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 },
  _activeChartIndex: { state: !0 },
  _chartPointer: { state: !0 }
}, q.styles = he;
let X = q;
customElements.get("rainwater-card") || customElements.define("rainwater-card", X);
window.customCards = window.customCards || [];
window.customCards.some((i) => i.type === "rainwater-card") || window.customCards.push({
  type: "rainwater-card",
  name: "Rainwater Card",
  preview: !0,
  description: "A single-reservoir rainwater volume, reserve and history card."
});
export {
  X as RainwaterCard
};
//# sourceMappingURL=rainwater-card.js.map
