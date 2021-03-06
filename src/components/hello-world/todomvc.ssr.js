! function() {
	"use strict";

	function e(e, t, n) {
		this.nodeName = e, this.attributes = t, this.children = n, this.key = t && t.key
	}

	function t(t, n) {
		var o = [],
			r = void 0,
			i = void 0,
			l = void 0,
			a = void 0;
		for(a = arguments.length; a-- > 2;) K.push(arguments[a]);
		for(n && n.children && (K.length || K.push(n.children), delete n.children); K.length;)
			if((i = K.pop()) instanceof Array)
				for(a = i.length; a--;) K.push(i[a]);
			else null != i && i !== !1 && ("number" != typeof i && i !== !0 || (i += ""), l = "string" == typeof i, l && r ? o[o.length - 1] += i : (o.push(i), r = l));
		var s = new e(t, n || void 0, o);
		return z.vnode && z.vnode(s), s
	}

	function n(e, t) {
		if(t)
			for(var n in t) e[n] = t[n];
		return e
	}

	function o(e) {
		return n({}, e)
	}

	function r(e, t) {
		for(var n = t.split("."), o = 0; o < n.length && e; o++) e = e[n[o]];
		return e
	}

	function i(e) {
		return "function" == typeof e
	}

	function l(e) {
		return "string" == typeof e
	}

	function a(e) {
		var t = "";
		for(var n in e) e[n] && (t && (t += " "), t += n);
		return t
	}

	function s(e, t, n) {
		var o = t.split(".");
		return function(t) {
			for(var i = t && t.target || this, a = {}, s = a, c = l(n) ? r(t, n) : i.nodeName ? i.type.match(/^che|rad/) ? i.checked : i.value : t, u = 0; u < o.length - 1; u++) s = s[o[u]] || (s[o[u]] = !u && e.state[o[u]] || {});
			s[o[u]] = c, e.setState(a)
		}
	}

	function c(e) {
		!e._dirty && (e._dirty = !0) && 1 == ee.push(e) && (z.debounceRendering || F)(u)
	}

	function u() {
		var e = void 0,
			t = ee;
		for(ee = []; e = t.pop();) e._dirty && O(e)
	}

	function d(e) {
		var t = e && e.nodeName;
		return t && i(t) && !(t.prototype && t.prototype.render)
	}

	function f(e, t) {
		return e.nodeName(m(e), t || X)
	}

	function p(e, t) {
		return l(t) ? e instanceof Text : l(t.nodeName) ? !e._componentConstructor && h(e, t.nodeName) : i(t.nodeName) ? !e._componentConstructor || e._componentConstructor === t.nodeName || d(t) : void 0
	}

	function h(e, t) {
		return e.normalizedNodeName === t || H(e.nodeName) === H(t)
	}

	function m(e) {
		var t = o(e.attributes);
		t.children = e.children;
		var n = e.nodeName.defaultProps;
		if(n)
			for(var r in n) void 0 === t[r] && (t[r] = n[r]);
		return t
	}

	function v(e) {
		var t = e.parentNode;
		t && t.removeChild(e)
	}

	function y(e, t, n, o, r) {
		if("className" === t && (t = "class"), "class" === t && o && "object" === (void 0 === o ? "undefined" : te(o)) && (o = a(o)), "key" === t);
		else if("class" !== t || r)
			if("style" === t) {
				if((!o || l(o) || l(n)) && (e.style.cssText = o || ""), o && "object" === (void 0 === o ? "undefined" : te(o))) {
					if(!l(n))
						for(var s in n) s in o || (e.style[s] = "");
					for(var c in o) e.style[c] = "number" != typeof o[c] || Z[c] ? o[c] : o[c] + "px"
				}
			} else if("dangerouslySetInnerHTML" === t) e.innerHTML = o && o.__html || "";
		else if("o" == t[0] && "n" == t[1]) {
			var u = e._listeners || (e._listeners = {});
			t = H(t.substring(2)), o ? u[t] || e.addEventListener(t, b, !!$[t]) : u[t] && e.removeEventListener(t, b, !!$[t]), u[t] = o
		} else if("list" !== t && "type" !== t && !r && t in e) g(e, t, null == o ? "" : o), null != o && o !== !1 || e.removeAttribute(t);
		else {
			var d = r && t.match(/^xlink\:?(.+)/);
			null == o || o === !1 ? d ? e.removeAttributeNS("http://www.w3.org/1999/xlink", H(d[1])) : e.removeAttribute(t) : "object" === (void 0 === o ? "undefined" : te(o)) || i(o) || (d ? e.setAttributeNS("http://www.w3.org/1999/xlink", H(d[1]), o) : e.setAttribute(t, o))
		} else e.className = o || ""
	}

	function g(e, t, n) {
		try {
			e[t] = n
		} catch(e) {}
	}

	function b(e) {
		return this._listeners[e.type](z.event && z.event(e) || e)
	}

	function _(e) {
		if(v(e), e instanceof Element) {
			e._component = e._componentConstructor = null;
			var t = e.normalizedNodeName || H(e.nodeName);
			(le[t] || (le[t] = [])).push(e)
		}
	}

	function C(e, t) {
		var n = H(e),
			o = le[n] && le[n].pop() || (t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e));
		return o.normalizedNodeName = n, o
	}

	function w() {
		for(var e = void 0; e = ae.pop();) z.afterMount && z.afterMount(e), e.componentDidMount && e.componentDidMount()
	}

	function x(e, t, n, o, r, i) {
		se++ || (ce = r instanceof SVGElement, ue = e && !(Y in e));
		var l = S(e, t, n, o);
		return r && l.parentNode !== r && r.appendChild(l), --se || (ue = !1, i || w()), l
	}

	function S(e, t, n, o) {
		for(var r = t && t.attributes; d(t);) t = f(t, n);
		if(null == t && (t = ""), l(t)) return e && e instanceof Text ? e.nodeValue != t && (e.nodeValue = t) : (e && k(e), e = document.createTextNode(t)), e[Y] = !0, e;
		if(i(t.nodeName)) return A(e, t, n, o);
		var a = e,
			s = t.nodeName + "",
			c = ce,
			u = t.children;
		if(ce = "svg" === s || "foreignObject" !== s && ce, e) {
			if(!h(e, s)) {
				for(a = C(s, ce); e.firstChild;) a.appendChild(e.firstChild);
				e.parentNode && e.parentNode.replaceChild(a, e), k(e)
			}
		} else a = C(s, ce);
		var p = a.firstChild,
			m = a[Y];
		if(!m) {
			a[Y] = m = {};
			for(var v = a.attributes, y = v.length; y--;) m[v[y].name] = v[y].value
		}
		return T(a, t.attributes, m), !ue && u && 1 === u.length && "string" == typeof u[0] && p && p instanceof Text && !p.nextSibling ? p.nodeValue != u[0] && (p.nodeValue = u[0]) : (u && u.length || p) && N(a, u, n, o), r && "function" == typeof r.ref && (m.ref = r.ref)(a), ce = c, a
	}

	function N(e, t, n, o) {
		var r = e.childNodes,
			i = [],
			l = {},
			a = 0,
			s = 0,
			c = r.length,
			u = 0,
			d = t && t.length,
			f = void 0,
			h = void 0,
			m = void 0,
			y = void 0;
		if(c)
			for(var g = 0; g < c; g++) {
				var b = r[g],
					_ = b[Y],
					C = d ? (h = b._component) ? h.__key : _ ? _.key : null : null;
				null != C ? (a++, l[C] = b) : (ue || _) && (i[u++] = b)
			}
		if(d)
			for(var w = 0; w < d; w++) {
				m = t[w], y = null;
				var x = m.key;
				if(null != x) a && x in l && (y = l[x], l[x] = void 0, a--);
				else if(!y && s < u)
					for(f = s; f < u; f++)
						if(h = i[f], h && p(h, m)) {
							y = h, i[f] = void 0, f === u - 1 && u--, f === s && s++;
							break
						}
				y = S(y, m, n, o), y && y !== e && (w >= c ? e.appendChild(y) : y !== r[w] && (y === r[w + 1] && v(r[w]), e.insertBefore(y, r[w] || null)))
			}
		if(a)
			for(var N in l) l[N] && k(l[N]);
		for(; s <= u;) y = i[u--], y && k(y)
	}

	function k(e, t) {
		var n = e._component;
		if(n) P(n, !t);
		else {
			e[Y] && e[Y].ref && e[Y].ref(null), t || _(e);
			for(var o = void 0; o = e.lastChild;) k(o, t)
		}
	}

	function T(e, t, n) {
		for(var o in n) t && o in t || null == n[o] || y(e, o, n[o], n[o] = void 0, ce);
		if(t)
			for(var r in t) "children" === r || "innerHTML" === r || r in n && t[r] === ("value" === r || "checked" === r ? e[r] : n[r]) || y(e, r, n[r], n[r] = t[r], ce)
	}

	function D(e) {
		var t = e.constructor.name,
			n = de[t];
		n ? n.push(e) : de[t] = [e]
	}

	function U(e, t, n) {
		var o = new e(t, n),
			r = de[e.name];
		if(B.call(o, t, n), r)
			for(var i = r.length; i--;)
				if(r[i].constructor === e) {
					o.nextBase = r[i].nextBase, r.splice(i, 1);
					break
				}
		return o
	}

	function E(e, t, n, o, r) {
		e._disable || (e._disable = !0, (e.__ref = t.ref) && delete t.ref, (e.__key = t.key) && delete t.key, !e.base || r ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.prevContext || (e.prevContext = e.context), e.context = o), e.prevProps || (e.prevProps = e.props), e.props = t, e._disable = !1, n !== G && (n !== J && z.syncComponentUpdates === !1 && e.base ? c(e) : O(e, J, r)), e.__ref && e.__ref(e))
	}

	function O(e, t, r, l) {
		if(!e._disable) {
			var a = void 0,
				s = void 0,
				c = e.props,
				u = e.state,
				p = e.context,
				h = e.prevProps || c,
				v = e.prevState || u,
				y = e.prevContext || p,
				g = e.base,
				b = e.nextBase,
				_ = g || b,
				C = e._component,
				S = void 0,
				N = void 0;
			if(g && (e.props = h, e.state = v, e.context = y, t !== q && e.shouldComponentUpdate && e.shouldComponentUpdate(c, u, p) === !1 ? a = !0 : e.componentWillUpdate && e.componentWillUpdate(c, u, p), e.props = c, e.state = u, e.context = p), e.prevProps = e.prevState = e.prevContext = e.nextBase = null, e._dirty = !1, !a) {
				for(e.render && (s = e.render(c, u, p)), e.getChildContext && (p = n(o(p), e.getChildContext())); d(s);) s = f(s, p);
				var T = s && s.nodeName,
					D = void 0,
					A = void 0;
				if(i(T)) {
					var B = m(s);
					S = C, S && S.constructor === T && B.key == S.__key ? E(S, B, J, p) : (D = S, S = U(T, B, p), S.nextBase = S.nextBase || b, S._parentComponent = e, e._component = S, E(S, B, G, p), O(S, J, r, !0)), A = S.base
				} else N = _, D = C, D && (N = e._component = null), (_ || t === J) && (N && (N._component = null), A = x(N, s, p, r || !g, _ && _.parentNode, !0));
				if(_ && A !== _ && S !== C) {
					var j = _.parentNode;
					j && A !== j && (j.replaceChild(A, _), D || (_._component = null, k(_)))
				}
				if(D && P(D, A !== _), e.base = A, A && !l) {
					for(var M = e, W = e; W = W._parentComponent;)(M = W).base = A;
					A._component = M, A._componentConstructor = M.constructor
				}
			}!g || r ? ae.unshift(e) : a || (e.componentDidUpdate && e.componentDidUpdate(h, v, y), z.afterUpdate && z.afterUpdate(e));
			var L = e._renderCallbacks,
				R = void 0;
			if(L)
				for(; R = L.pop();) R.call(e);
			se || l || w()
		}
	}

	function A(e, t, n, o) {
		for(var r = e && e._component, i = e, l = r && e._componentConstructor === t.nodeName, a = l, s = m(t); r && !a && (r = r._parentComponent);) a = r.constructor === t.nodeName;
		return r && a && (!o || r._component) ? (E(r, s, Q, n, o), e = r.base) : (r && !l && (P(r, !0), e = i = null), r = U(t.nodeName, s, n), e && !r.nextBase && (r.nextBase = e, i = null), E(r, s, J, n, o), e = r.base, i && e !== i && (i._component = null, k(i))), e
	}

	function P(e, t) {
		z.beforeUnmount && z.beforeUnmount(e);
		var n = e.base;
		e._disable = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
		var o = e._component;
		if(o) P(o, t);
		else if(n) {
			n[Y] && n[Y].ref && n[Y].ref(null), e.nextBase = n, t && (v(n), D(e));
			for(var r = void 0; r = n.lastChild;) k(r, !t)
		}
		e.__ref && e.__ref(null), e.componentDidUnmount && e.componentDidUnmount()
	}

	function B(e, t) {
		this._dirty = !0, this.context = t, this.props = e, this.state || (this.state = {})
	}

	function j(e, t, n) {
		return x(n, e, {}, !1, t)
	}

	function M() {
		for(var e = "", t = 0; t < 32; t++) {
			var n = 16 * Math.random() | 0;
			8 !== t && 12 !== t && 16 !== t && 20 !== t || (e += "-"), e += (12 === t ? 4 : 16 === t ? 3 & n | 8 : n).toString(16)
		}
		return e
	}

	function W(e, t) {
		return 1 === e ? t : t + "s"
	}

	function L(e, t) {
		if(t) return localStorage[e] = JSON.stringify(t);
		var n = localStorage[e];
		return n && JSON.parse(n) || []
	}

	function R(e, t) {
		return j(e, t, t.firstElementChild)
	}
	var z = {},
		K = [],
		V = {},
		H = function(e) {
			return V[e] || (V[e] = e.toLowerCase())
		},
		I = "undefined" != typeof Promise && Promise.resolve(),
		F = I ? function(e) {
			I.then(e)
		} : setTimeout,
		G = 0,
		J = 1,
		q = 2,
		Q = 3,
		X = {},
		Y = "undefined" != typeof Symbol ? Symbol.for("preactattr") : "__preactattr_",
		Z = {
			boxFlex: 1,
			boxFlexGroup: 1,
			columnCount: 1,
			fillOpacity: 1,
			flex: 1,
			flexGrow: 1,
			flexPositive: 1,
			flexShrink: 1,
			flexNegative: 1,
			fontWeight: 1,
			lineClamp: 1,
			lineHeight: 1,
			opacity: 1,
			order: 1,
			orphans: 1,
			strokeOpacity: 1,
			widows: 1,
			zIndex: 1,
			zoom: 1
		},
		$ = {
			blur: 1,
			error: 1,
			focus: 1,
			load: 1,
			resize: 1,
			scroll: 1
		},
		ee = [],
		te = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		},
		ne = Object.assign || function(e) {
			for(var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for(var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
			}
			return e
		},
		oe = function(e, t) {
			if("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
		},
		re = function(e) {
			if(null == e) throw new TypeError("Cannot destructure undefined")
		},
		ie = function(e, t) {
			if(!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		},
		le = {},
		ae = [],
		se = 0,
		ce = !1,
		ue = !1,
		de = {};
	n(B.prototype, {
		linkState: function(e, t) {
			var n = this._linkedStates || (this._linkedStates = {});
			return n[e + t] || (n[e + t] = s(this, e, t))
		},
		setState: function(e, t) {
			var r = this.state;
			this.prevState || (this.prevState = o(r)), n(r, i(e) ? e(r, this.props) : e), t && (this._renderCallbacks = this._renderCallbacks || []).push(t), c(this)
		},
		forceUpdate: function() {
			O(this, q)
		},
		render: function() {}
	});
	var fe = function() {
			function e(e, t) {
				this.key = e, this.todos = L(e) || [], this.onChanges = [t]
			}
			return e.prototype.inform = function() {
				L(this.key, this.todos), this.onChanges.forEach(function(e) {
					return e()
				})
			}, e.prototype.addTodo = function(e) {
				this.todos = this.todos.concat({
					id: M(),
					title: e,
					completed: !1
				}), this.inform()
			}, e.prototype.toggleAll = function(e) {
				this.todos = this.todos.map(function(t) {
					return ne({}, t, {
						completed: e
					})
				}), this.inform()
			}, e.prototype.toggle = function(e) {
				this.todos = this.todos.map(function(t) {
					return t !== e ? t : ne({}, t, {
						completed: !t.completed
					})
				}), this.inform()
			}, e.prototype.destroy = function(e) {
				this.todos = this.todos.filter(function(t) {
					return t !== e
				}), this.inform()
			}, e.prototype.save = function(e, t) {
				this.todos = this.todos.map(function(n) {
					return n !== e ? n : ne({}, n, {
						title: t
					})
				}), this.inform()
			}, e.prototype.clearCompleted = function() {
				this.todos = this.todos.filter(function(e) {
					return !e.completed
				}), this.inform()
			}, e
		}(),
		pe = function(e) {
			function n() {
				return ie(this, e.apply(this, arguments))
			}
			return oe(n, e), n.prototype.render = function(e) {
				var n = e.nowShowing,
					o = e.count,
					r = e.completedCount,
					i = e.onClearCompleted;
				return t("footer", {
					class: "footer"
				}, t("span", {
					class: "todo-count"
				}, t("strong", null, o), " ", W(o, "item"), " left"), t("ul", {
					class: "filters"
				}, t("li", null, t("a", {
					href: "#/",
					class: "all" == n && "selected"
				}, "All")), " ", t("li", null, t("a", {
					href: "#/active",
					class: "active" == n && "selected"
				}, "Active")), " ", t("li", null, t("a", {
					href: "#/completed",
					class: "completed" == n && "selected"
				}, "Completed"))), r > 0 && t("button", {
					class: "clear-completed",
					onClick: i
				}, "Clear completed"))
			}, n
		}(B),
		he = 27,
		me = 13,
		ve = function(e) {
			function n() {
				for(var t, n, o, r = arguments.length, i = Array(r), l = 0; l < r; l++) i[l] = arguments[l];
				return t = n = ie(this, e.call.apply(e, [this].concat(i))), n.handleSubmit = function() {
					var e = n.props,
						t = e.onSave,
						o = e.onDestroy,
						r = e.todo,
						i = n.state.editText.trim();
					i ? (t(r, i), n.setState({
						editText: i
					})) : o(r)
				}, n.handleEdit = function() {
					var e = n.props,
						t = e.onEdit,
						o = e.todo;
					t(o), n.setState({
						editText: o.title
					})
				}, n.toggle = function(e) {
					var t = n.props;
					(0, t.onToggle)(t.todo), e.preventDefault()
				}, n.handleKeyDown = function(e) {
					if(e.which === he) {
						var t = n.props.todo;
						n.setState({
							editText: t.title
						}), n.props.onCancel(t)
					} else e.which === me && n.handleSubmit()
				}, n.handleDestroy = function() {
					n.props.onDestroy(n.props.todo)
				}, o = t, ie(n, o)
			}
			return oe(n, e), n.prototype.componentDidUpdate = function() {
				var e = this.base && this.base.querySelector(".edit");
				e && e.focus()
			}, n.prototype.render = function(e, n) {
				var o = e.todo,
					r = o.title,
					i = o.completed,
					l = e.editing,
					a = n.editText;
				return t("li", {
					class: {
						completed: i, editing: l
					}
				}, t("div", {
					class: "view"
				}, t("input", {
					class: "toggle",
					type: "checkbox",
					checked: i,
					onChange: this.toggle
				}), t("label", {
					onDblClick: this.handleEdit
				}, r), t("button", {
					class: "destroy",
					onClick: this.handleDestroy
				})), l && t("input", {
					class: "edit",
					value: a,
					onBlur: this.handleSubmit,
					onInput: this.linkState("editText"),
					onKeyDown: this.handleKeyDown
				}))
			}, n
		}(B),
		ye = {
			all: function() {
				return !0
			},
			active: function(e) {
				return !e.completed
			},
			completed: function(e) {
				return e.completed
			}
		};
	R(t(function(e) {
		function n() {
			var t = ie(this, e.call(this));
			return t.handleNewTodoKeyDown = function(e) {
				if(13 === e.keyCode) {
					e.preventDefault();
					var n = t.state.newTodo.trim();
					n && (t.model.addTodo(n), t.setState({
						newTodo: ""
					}))
				}
			}, t.toggleAll = function(e) {
				t.model.toggleAll(e.target.checked)
			}, t.toggle = function(e) {
				t.model.toggle(e)
			}, t.destroy = function(e) {
				t.model.destroy(e)
			}, t.edit = function(e) {
				t.setState({
					editing: e.id
				})
			}, t.save = function(e, n) {
				t.model.save(e, n), t.setState({
					editing: null
				})
			}, t.cancel = function() {
				t.setState({
					editing: null
				})
			}, t.clearCompleted = function() {
				t.model.clearCompleted()
			}, t.model = new fe("preact-todos", function() {
				return t.setState({})
			}), addEventListener("hashchange", t.handleRoute.bind(t)), t.handleRoute(), t
		}
		return oe(n, e), n.prototype.handleRoute = function() {
			var e = ((location.hash || "") + "").split("/").pop();
			ye[e] || (e = "all"), this.setState({
				nowShowing: e
			})
		}, n.prototype.render = function(e, n) {
			var o = this,
				r = n.nowShowing,
				i = void 0 === r ? ALL_TODOS : r,
				l = n.newTodo,
				a = n.editing;
			re(e);
			var s = this.model.todos,
				c = s.filter(ye[i]),
				u = s.reduce(function(e, t) {
					return e + (t.completed ? 0 : 1)
				}, 0),
				d = s.length - u;
			return t("div", null, t("header", {
				class: "header"
			}, t("h1", null, "todos"), t("input", {
				class: "new-todo",
				placeholder: "What needs to be done?",
				value: l,
				onKeyDown: this.handleNewTodoKeyDown,
				onInput: this.linkState("newTodo"),
				autoFocus: !0
			})), s.length ? t("section", {
				class: "main"
			}, t("input", {
				class: "toggle-all",
				type: "checkbox",
				onChange: this.toggleAll,
				checked: 0 === u
			}), t("ul", {
				class: "todo-list"
			}, c.map(function(e) {
				return t(ve, {
					todo: e,
					onToggle: o.toggle,
					onDestroy: o.destroy,
					onEdit: o.edit,
					editing: a === e.id,
					onSave: o.save,
					onCancel: o.cancel
				})
			}))) : null, u || d ? t(pe, {
				count: u,
				completedCount: d,
				nowShowing: i,
				onClearCompleted: this.clearCompleted
			}) : null)
		}, n
	}(B), null), document.body)
}();
//# sourceMappingURL=app.js.map

// !function(){"use strict";function e(e,t,n){this.nodeName=e,this.attributes=t,this.children=n,this.key=t&&t.key}function t(t,n){var o=[],r=void 0,i=void 0,l=void 0,a=void 0;for(a=arguments.length;a-- >2;)K.push(arguments[a]);for(n&&n.children&&(K.length||K.push(n.children),delete n.children);K.length;)if((i=K.pop())instanceof Array)for(a=i.length;a--;)K.push(i[a]);else null!=i&&i!==!1&&("number"!=typeof i&&i!==!0||(i+=""),l="string"==typeof i,l&&r?o[o.length-1]+=i:(o.push(i),r=l));var s=new e(t,n||void 0,o);return z.vnode&&z.vnode(s),s}function n(e,t){if(t)for(var n in t)e[n]=t[n];return e}function o(e){return n({},e)}function r(e,t){for(var n=t.split("."),o=0;o<n.length&&e;o++)e=e[n[o]];return e}function i(e){return"function"==typeof e}function l(e){return"string"==typeof e}function a(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function s(e,t,n){var o=t.split(".");return function(t){for(var i=t&&t.target||this,a={},s=a,c=l(n)?r(t,n):i.nodeName?i.type.match(/^che|rad/)?i.checked:i.value:t,u=0;u<o.length-1;u++)s=s[o[u]]||(s[o[u]]=!u&&e.state[o[u]]||{});s[o[u]]=c,e.setState(a)}}function c(e){!e._dirty&&(e._dirty=!0)&&1==ee.push(e)&&(z.debounceRendering||F)(u)}function u(){var e=void 0,t=ee;for(ee=[];e=t.pop();)e._dirty&&O(e)}function d(e){var t=e&&e.nodeName;return t&&i(t)&&!(t.prototype&&t.prototype.render)}function f(e,t){return e.nodeName(m(e),t||X)}function p(e,t){return l(t)?e instanceof Text:l(t.nodeName)?!e._componentConstructor&&h(e,t.nodeName):i(t.nodeName)?!e._componentConstructor||e._componentConstructor===t.nodeName||d(t):void 0}function h(e,t){return e.normalizedNodeName===t||H(e.nodeName)===H(t)}function m(e){var t=o(e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function v(e){var t=e.parentNode;t&&t.removeChild(e)}function y(e,t,n,o,r){if("className"===t&&(t="class"),"class"===t&&o&&"object"===(void 0===o?"undefined":te(o))&&(o=a(o)),"key"===t);else if("class"!==t||r)if("style"===t){if((!o||l(o)||l(n))&&(e.style.cssText=o||""),o&&"object"===(void 0===o?"undefined":te(o))){if(!l(n))for(var s in n)s in o||(e.style[s]="");for(var c in o)e.style[c]="number"!=typeof o[c]||Z[c]?o[c]:o[c]+"px"}}else if("dangerouslySetInnerHTML"===t)e.innerHTML=o&&o.__html||"";else if("o"==t[0]&&"n"==t[1]){var u=e._listeners||(e._listeners={});t=H(t.substring(2)),o?u[t]||e.addEventListener(t,b,!!$[t]):u[t]&&e.removeEventListener(t,b,!!$[t]),u[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e)g(e,t,null==o?"":o),null!=o&&o!==!1||e.removeAttribute(t);else{var d=r&&t.match(/^xlink\:?(.+)/);null==o||o===!1?d?e.removeAttributeNS("http://www.w3.org/1999/xlink",H(d[1])):e.removeAttribute(t):"object"===(void 0===o?"undefined":te(o))||i(o)||(d?e.setAttributeNS("http://www.w3.org/1999/xlink",H(d[1]),o):e.setAttribute(t,o))}else e.className=o||""}function g(e,t,n){try{e[t]=n}catch(e){}}function b(e){return this._listeners[e.type](z.event&&z.event(e)||e)}function _(e){if(v(e),e instanceof Element){e._component=e._componentConstructor=null;var t=e.normalizedNodeName||H(e.nodeName);(le[t]||(le[t]=[])).push(e)}}function C(e,t){var n=H(e),o=le[n]&&le[n].pop()||(t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e));return o.normalizedNodeName=n,o}function w(){for(var e=void 0;e=ae.pop();)z.afterMount&&z.afterMount(e),e.componentDidMount&&e.componentDidMount()}function x(e,t,n,o,r,i){se++||(ce=r instanceof SVGElement,ue=e&&!(Y in e));var l=S(e,t,n,o);return r&&l.parentNode!==r&&r.appendChild(l),--se||(ue=!1,i||w()),l}function S(e,t,n,o){for(var r=t&&t.attributes;d(t);)t=f(t,n);if(null==t&&(t=""),l(t))return e&&e instanceof Text?e.nodeValue!=t&&(e.nodeValue=t):(e&&k(e),e=document.createTextNode(t)),e[Y]=!0,e;if(i(t.nodeName))return A(e,t,n,o);var a=e,s=t.nodeName+"",c=ce,u=t.children;if(ce="svg"===s||"foreignObject"!==s&&ce,e){if(!h(e,s)){for(a=C(s,ce);e.firstChild;)a.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(a,e),k(e)}}else a=C(s,ce);var p=a.firstChild,m=a[Y];if(!m){a[Y]=m={};for(var v=a.attributes,y=v.length;y--;)m[v[y].name]=v[y].value}return T(a,t.attributes,m),!ue&&u&&1===u.length&&"string"==typeof u[0]&&p&&p instanceof Text&&!p.nextSibling?p.nodeValue!=u[0]&&(p.nodeValue=u[0]):(u&&u.length||p)&&N(a,u,n,o),r&&"function"==typeof r.ref&&(m.ref=r.ref)(a),ce=c,a}function N(e,t,n,o){var r=e.childNodes,i=[],l={},a=0,s=0,c=r.length,u=0,d=t&&t.length,f=void 0,h=void 0,m=void 0,y=void 0;if(c)for(var g=0;g<c;g++){var b=r[g],_=b[Y],C=d?(h=b._component)?h.__key:_?_.key:null:null;null!=C?(a++,l[C]=b):(ue||_)&&(i[u++]=b)}if(d)for(var w=0;w<d;w++){m=t[w],y=null;var x=m.key;if(null!=x)a&&x in l&&(y=l[x],l[x]=void 0,a--);else if(!y&&s<u)for(f=s;f<u;f++)if(h=i[f],h&&p(h,m)){y=h,i[f]=void 0,f===u-1&&u--,f===s&&s++;break}y=S(y,m,n,o),y&&y!==e&&(w>=c?e.appendChild(y):y!==r[w]&&(y===r[w+1]&&v(r[w]),e.insertBefore(y,r[w]||null)))}if(a)for(var N in l)l[N]&&k(l[N]);for(;s<=u;)y=i[u--],y&&k(y)}function k(e,t){var n=e._component;if(n)P(n,!t);else{e[Y]&&e[Y].ref&&e[Y].ref(null),t||_(e);for(var o=void 0;o=e.lastChild;)k(o,t)}}function T(e,t,n){for(var o in n)t&&o in t||null==n[o]||y(e,o,n[o],n[o]=void 0,ce);if(t)for(var r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||y(e,r,n[r],n[r]=t[r],ce)}function D(e){var t=e.constructor.name,n=de[t];n?n.push(e):de[t]=[e]}function U(e,t,n){var o=new e(t,n),r=de[e.name];if(B.call(o,t,n),r)for(var i=r.length;i--;)if(r[i].constructor===e){o.nextBase=r[i].nextBase,r.splice(i,1);break}return o}function E(e,t,n,o,r){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o),o&&o!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=o),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,n!==G&&(n!==J&&z.syncComponentUpdates===!1&&e.base?c(e):O(e,J,r)),e.__ref&&e.__ref(e))}function O(e,t,r,l){if(!e._disable){var a=void 0,s=void 0,c=e.props,u=e.state,p=e.context,h=e.prevProps||c,v=e.prevState||u,y=e.prevContext||p,g=e.base,b=e.nextBase,_=g||b,C=e._component,S=void 0,N=void 0;if(g&&(e.props=h,e.state=v,e.context=y,t!==q&&e.shouldComponentUpdate&&e.shouldComponentUpdate(c,u,p)===!1?a=!0:e.componentWillUpdate&&e.componentWillUpdate(c,u,p),e.props=c,e.state=u,e.context=p),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!a){for(e.render&&(s=e.render(c,u,p)),e.getChildContext&&(p=n(o(p),e.getChildContext()));d(s);)s=f(s,p);var T=s&&s.nodeName,D=void 0,A=void 0;if(i(T)){var B=m(s);S=C,S&&S.constructor===T&&B.key==S.__key?E(S,B,J,p):(D=S,S=U(T,B,p),S.nextBase=S.nextBase||b,S._parentComponent=e,e._component=S,E(S,B,G,p),O(S,J,r,!0)),A=S.base}else N=_,D=C,D&&(N=e._component=null),(_||t===J)&&(N&&(N._component=null),A=x(N,s,p,r||!g,_&&_.parentNode,!0));if(_&&A!==_&&S!==C){var j=_.parentNode;j&&A!==j&&(j.replaceChild(A,_),D||(_._component=null,k(_)))}if(D&&P(D,A!==_),e.base=A,A&&!l){for(var M=e,W=e;W=W._parentComponent;)(M=W).base=A;A._component=M,A._componentConstructor=M.constructor}}!g||r?ae.unshift(e):a||(e.componentDidUpdate&&e.componentDidUpdate(h,v,y),z.afterUpdate&&z.afterUpdate(e));var L=e._renderCallbacks,R=void 0;if(L)for(;R=L.pop();)R.call(e);se||l||w()}}function A(e,t,n,o){for(var r=e&&e._component,i=e,l=r&&e._componentConstructor===t.nodeName,a=l,s=m(t);r&&!a&&(r=r._parentComponent);)a=r.constructor===t.nodeName;return r&&a&&(!o||r._component)?(E(r,s,Q,n,o),e=r.base):(r&&!l&&(P(r,!0),e=i=null),r=U(t.nodeName,s,n),e&&!r.nextBase&&(r.nextBase=e,i=null),E(r,s,J,n,o),e=r.base,i&&e!==i&&(i._component=null,k(i))),e}function P(e,t){z.beforeUnmount&&z.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var o=e._component;if(o)P(o,t);else if(n){n[Y]&&n[Y].ref&&n[Y].ref(null),e.nextBase=n,t&&(v(n),D(e));for(var r=void 0;r=n.lastChild;)k(r,!t)}e.__ref&&e.__ref(null),e.componentDidUnmount&&e.componentDidUnmount()}function B(e,t){this._dirty=!0,this.context=t,this.props=e,this.state||(this.state={})}function j(e,t,n){return x(n,e,{},!1,t)}function M(){for(var e="",t=0;t<32;t++){var n=16*Math.random()|0;8!==t&&12!==t&&16!==t&&20!==t||(e+="-"),e+=(12===t?4:16===t?3&n|8:n).toString(16)}return e}function W(e,t){return 1===e?t:t+"s"}function L(e,t){if(t)return localStorage[e]=JSON.stringify(t);var n=localStorage[e];return n&&JSON.parse(n)||[]}function R(e,t){return j(e,t,t.firstElementChild)}var z={},K=[],V={},H=function(e){return V[e]||(V[e]=e.toLowerCase())},I="undefined"!=typeof Promise&&Promise.resolve(),F=I?function(e){I.then(e)}:setTimeout,G=0,J=1,q=2,Q=3,X={},Y="undefined"!=typeof Symbol?Symbol.for("preactattr"):"__preactattr_",Z={boxFlex:1,boxFlexGroup:1,columnCount:1,fillOpacity:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,fontWeight:1,lineClamp:1,lineHeight:1,opacity:1,order:1,orphans:1,strokeOpacity:1,widows:1,zIndex:1,zoom:1},$={blur:1,error:1,focus:1,load:1,resize:1,scroll:1},ee=[],te="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},oe=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},re=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")},ie=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},le={},ae=[],se=0,ce=!1,ue=!1,de={};n(B.prototype,{linkState:function(e,t){var n=this._linkedStates||(this._linkedStates={});return n[e+t]||(n[e+t]=s(this,e,t))},setState:function(e,t){var r=this.state;this.prevState||(this.prevState=o(r)),n(r,i(e)?e(r,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),c(this)},forceUpdate:function(){O(this,q)},render:function(){}});var fe=function(){function e(e,t){this.key=e,this.todos=L(e)||[],this.onChanges=[t]}return e.prototype.inform=function(){L(this.key,this.todos),this.onChanges.forEach(function(e){return e()})},e.prototype.addTodo=function(e){this.todos=this.todos.concat({id:M(),title:e,completed:!1}),this.inform()},e.prototype.toggleAll=function(e){this.todos=this.todos.map(function(t){return ne({},t,{completed:e})}),this.inform()},e.prototype.toggle=function(e){this.todos=this.todos.map(function(t){return t!==e?t:ne({},t,{completed:!t.completed})}),this.inform()},e.prototype.destroy=function(e){this.todos=this.todos.filter(function(t){return t!==e}),this.inform()},e.prototype.save=function(e,t){this.todos=this.todos.map(function(n){return n!==e?n:ne({},n,{title:t})}),this.inform()},e.prototype.clearCompleted=function(){this.todos=this.todos.filter(function(e){return!e.completed}),this.inform()},e}(),pe=function(e){function n(){return ie(this,e.apply(this,arguments))}return oe(n,e),n.prototype.render=function(e){var n=e.nowShowing,o=e.count,r=e.completedCount,i=e.onClearCompleted;return t("footer",{class:"footer"},t("span",{class:"todo-count"},t("strong",null,o)," ",W(o,"item")," left"),t("ul",{class:"filters"},t("li",null,t("a",{href:"#/",class:"all"==n&&"selected"},"All"))," ",t("li",null,t("a",{href:"#/active",class:"active"==n&&"selected"},"Active"))," ",t("li",null,t("a",{href:"#/completed",class:"completed"==n&&"selected"},"Completed"))),r>0&&t("button",{class:"clear-completed",onClick:i},"Clear completed"))},n}(B),he=27,me=13,ve=function(e){function n(){for(var t,n,o,r=arguments.length,i=Array(r),l=0;l<r;l++)i[l]=arguments[l];return t=n=ie(this,e.call.apply(e,[this].concat(i))),n.handleSubmit=function(){var e=n.props,t=e.onSave,o=e.onDestroy,r=e.todo,i=n.state.editText.trim();i?(t(r,i),n.setState({editText:i})):o(r)},n.handleEdit=function(){var e=n.props,t=e.onEdit,o=e.todo;t(o),n.setState({editText:o.title})},n.toggle=function(e){var t=n.props;(0,t.onToggle)(t.todo),e.preventDefault()},n.handleKeyDown=function(e){if(e.which===he){var t=n.props.todo;n.setState({editText:t.title}),n.props.onCancel(t)}else e.which===me&&n.handleSubmit()},n.handleDestroy=function(){n.props.onDestroy(n.props.todo)},o=t,ie(n,o)}return oe(n,e),n.prototype.componentDidUpdate=function(){var e=this.base&&this.base.querySelector(".edit");e&&e.focus()},n.prototype.render=function(e,n){var o=e.todo,r=o.title,i=o.completed,l=e.editing,a=n.editText;return t("li",{class:{completed:i,editing:l}},t("div",{class:"view"},t("input",{class:"toggle",type:"checkbox",checked:i,onChange:this.toggle}),t("label",{onDblClick:this.handleEdit},r),t("button",{class:"destroy",onClick:this.handleDestroy})),l&&t("input",{class:"edit",value:a,onBlur:this.handleSubmit,onInput:this.linkState("editText"),onKeyDown:this.handleKeyDown}))},n}(B),ye={all:function(){return!0},active:function(e){return!e.completed},completed:function(e){return e.completed}};R(t(function(e){function n(){var t=ie(this,e.call(this));return t.handleNewTodoKeyDown=function(e){if(13===e.keyCode){e.preventDefault();var n=t.state.newTodo.trim();n&&(t.model.addTodo(n),t.setState({newTodo:""}))}},t.toggleAll=function(e){t.model.toggleAll(e.target.checked)},t.toggle=function(e){t.model.toggle(e)},t.destroy=function(e){t.model.destroy(e)},t.edit=function(e){t.setState({editing:e.id})},t.save=function(e,n){t.model.save(e,n),t.setState({editing:null})},t.cancel=function(){t.setState({editing:null})},t.clearCompleted=function(){t.model.clearCompleted()},t.model=new fe("preact-todos",function(){return t.setState({})}),addEventListener("hashchange",t.handleRoute.bind(t)),t.handleRoute(),t}return oe(n,e),n.prototype.handleRoute=function(){var e=((location.hash||"")+"").split("/").pop();ye[e]||(e="all"),this.setState({nowShowing:e})},n.prototype.render=function(e,n){var o=this,r=n.nowShowing,i=void 0===r?ALL_TODOS:r,l=n.newTodo,a=n.editing;re(e);var s=this.model.todos,c=s.filter(ye[i]),u=s.reduce(function(e,t){return e+(t.completed?0:1)},0),d=s.length-u;return t("div",null,t("header",{class:"header"},t("h1",null,"todos"),t("input",{class:"new-todo",placeholder:"What needs to be done?",value:l,onKeyDown:this.handleNewTodoKeyDown,onInput:this.linkState("newTodo"),autoFocus:!0})),s.length?t("section",{class:"main"},t("input",{class:"toggle-all",type:"checkbox",onChange:this.toggleAll,checked:0===u}),t("ul",{class:"todo-list"},c.map(function(e){return t(ve,{todo:e,onToggle:o.toggle,onDestroy:o.destroy,onEdit:o.edit,editing:a===e.id,onSave:o.save,onCancel:o.cancel})}))):null,u||d?t(pe,{count:u,completedCount:d,nowShowing:i,onClearCompleted:this.clearCompleted}):null)},n}(B),null),document.body)}();
//# sourceMappingURL=app.js.map