(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

/**
 * Debugging assertions for Carrot Search Circles.
 */

(function() {
  /**
   * Attribute constraints.
   */
  var attributeDefinitions = function() {
    var args = {}

    // Special.
    args["dataObject"] = {
      type: "object",
      asserts: Or(IsObject(), IsNull(), IsUndefined())
    };

    args["imageData"] = {
      type: "string",
      asserts: ReadOnly()
    };

    args["times"] = {
      type: "object",
      asserts: ReadOnly()
    };

    args["layout"] = {
      type: "object",
      asserts: ReadOnly()
    };

    ([
      "selection",
      "open",
      "zoom"
    ]).forEach(function(key) {
        args[key] = {
          type: "mixed"
        }
      });

    // Unconstrained strings
    ([
      "attributionLogo",
      "attributionUrl",
      "groupFontFamily",
      "titleBarFontFamily"
    ]).forEach(function(key) {
        args[key] = {
          type: "string",
          asserts: Or(IsString(), IsNull(), IsUndefined())
        }
      });

    // Element identifier
    ([
      "id"
    ]).forEach(function(key) {
        args[key] = {
          type: "string",
          asserts: And(IsString(), IdentifiesExistingElement())
        };
      });

    // DOM element
    ([
      "element"
    ]).forEach(function(key) {
        args[key] = {
          type: "object",
          asserts: IsElement()
        };
      });

    // Numbers or percentages.
    ([
      "attributionPositionX",
      "attributionPositionY",
      "groupMinFontSize",
      "groupMaxFontSize",
      "titleBarMinFontSize",
      "titleBarMaxFontSize"
    ]).forEach(function(key) {
        args[key] = {
          type: "mixed",
          asserts: And(NotEmpty(), Or(IsNumeric(), Matches(/^[0-9]+%$/)))
        }
      });

    // Numbers, percentages or functions
    ([
      "centerx",
      "centery",
      "diameter"
    ]).forEach(function(key) {
        args[key] = {
          type: "mixed",
          asserts: And(NotEmpty(), Or(IsNumeric(), Matches(/^[0-9]+%$/), IsFunction()))
        }
      });

    // Booleans
    ([
      "supported",
      "logging",
      "textureMappingMesh",
      "showZeroWeightGroups",
      "groupHoverHierarchy",
      "captureMouseEvents"
    ]).forEach(function(key) {
        args[key] = {
          type: "boolean",
          asserts: IsBoolean()
        }
      });

    // enums
    args["rolloutAnimation"] = {
      type: "string",
      asserts: And(NotEmpty(), OneOf([
        "implode",
        "rollout",
        "tumbler",
        "fadein",
        "random"
      ]))
    };

    args["pullbackAnimation"] = {
      type: "string",
      asserts: And(NotEmpty(), OneOf([
        "explode",
        "rollin",
        "tumbler",
        "fadeout",
        "random"
      ]))
    };

    args["modelChangeAnimations"] = {
      type: "string",
      asserts: And(NotEmpty(), OneOf([
        "auto",
        "sequential",
        "parallel"
      ]))
    };

    args["titleBar"] = {
      type: "string",
      asserts: And(NotEmpty(), OneOf([
        "none",
        "inscribed",
        "topbottom",
        "top",
        "bottom"
      ]))
    };

    // CSS colors
    ([
      "backgroundColor",
      "groupOutlineColor",
      "rainbowStartColor",
      "rainbowEndColor",
      "labelDarkColor",
      "labelLightColor",
      "expanderOutlineColor",
      "expanderColor",
      "groupSelectionColor",
      "groupSelectionOutlineColor",
      "groupHoverColor",
      "groupHoverOutlineColor",
      "titleBarBackgroundColor",
      "titleBarTextColor",
      "zoomDecorationFillColor",
      "zoomDecorationStrokeColor"
    ]).forEach(function(key) {
        args[key] = {
          type: "string",
          asserts: And(NotEmpty(), CssColor())
        }
      });

    // Functions
    ([
      "groupColorDecorator",
      "groupLabelDecorator",
      "isGroupVisible",
      "ringShape",
      "attributionSize",
      "titleBarLabelDecorator"
    ]).forEach(function(key) {
        args[key] = {
          type: "function",
          asserts: IsFunction()
        }
      });

    // Callbacks
    ([
      "onModelChanged",
      "onRolloutStart",
      "onRolloutComplete",
      "onRedraw",
      "onLayout",
      "onGroupHover",
      "onGroupZoom",
      "onGroupOpenOrClose",
      "onGroupSelectionChanging",
      "onGroupSelectionChanged",
      "onGroupClick",
      "onGroupDoubleClick",
      "onBeforeZoom",
      "onBeforeSelection"
    ]).forEach(function(key) {
        args[key] = {
          type: "function | Array",
          asserts: Or(IsFunction(), IsArrayOfFunctions())
        }
      });

    // Numbers.
    ([
      "visibleGroupCount",
      "deferLabelRedraws",
      "labelRedrawFadeInTime",
      "textureOverlapFudge",
      "expanderOutlineWidth",
      "minAngularPadding",
      "minRadialPadding",
      "groupHoverOutlineWidth",
      "groupSelectionOutlineWidth",
      "groupOutlineWidth",
      "expandTime",
      "zoomTime",
      "pullbackTime",
      "rolloutTime",
      "updateTime",
      "attributionFadeOutTime",
      "ratioAspectSwap",
      "titleBarTextPaddingTopBottom",
      "titleBarTextPaddingLeftRight"
    ]).forEach(function(key) {
        args[key] = {
          type: "number",
          asserts: And(NotEmpty(), IsNumeric("[0,∞)"))
        }
      });

    ([
      "radialTextureStep",
      "angularTextureStep",
      "pixelRatio",
      "ringScaling"
    ]).forEach(function(key) {
        args[key] = {
          type: "number",
          asserts: And(NotEmpty(), IsNumeric("(0,∞)"))
        }
      });

    ([
      "minExpanderAngle",
      "angleStart",
      "expanderAngle"
    ]).forEach(function(key) {
        args[key] = {
          type: "number",
          asserts: And(NotEmpty(), IsNumeric("[0,360)"))
        }
      });

    ([
      "zoomedFraction",
      "labelColorThreshold",
      "noTexturingCurvature",
      "ratioAngularPadding",
      "ratioRadialPadding"
    ]).forEach(function(key) {
        args[key] = {
          type: "number",
          asserts: And(NotEmpty(), IsNumeric("[0,1]"))
        }
      });

    // unconstrained floats (undefined values not allowed)
    ([
      "angleWidth",
      "groupLinePadding"
    ]).forEach(function(key) {
        args[key] = {
          type: "number",
          asserts: And(NotEmpty(), IsNumeric())
        }
      });

    // floats (undefined values allowed).
    args["attributionStayOnTime"] = {
      type: "number",
      asserts: Or(IsUndefined(), IsNumeric("[0,∞)"))
    };

    args["angleEnd"] = {
      type: "number",
      asserts: Or(IsUndefined(), IsNumeric("[0,360]"))
    };

    args["attributionFadeInTime"] = {
      type: "number",
      asserts: Or(IsUndefined(), IsNumeric("[0,5]"))
    };

    // API changes, 2.1.0
    ([
      "captureMouseEvents",
      "angleWidth",
      "isGroupVisible",
      "ringShape",
      "attributionSize",
      "ratioAspectSwap",
      "attributionFadeInTime"
    ]).forEach(function(key) {
        args[key].since = "2.1.0";
      });

    ([
      "angleEnd"
    ]).forEach(function(key) {
        args[key].deprecated = "2.1.0";
      });

    // API changes, 2.2.0
    ([
      "layout",
      "titleBar",
      "titleBarFontFamily",
      "titleBarMinFontSize",
      "titleBarMaxFontSize",
      "titleBarBackgroundColor",
      "titleBarTextColor",
      "titleBarTextPaddingLeftRight",
      "titleBarTextPaddingTopBottom",
      "titleBarLabelDecorator"
    ]).forEach(function(key) {
        args[key].since = "2.2.0";
      });

    // API changes, 2.3.0
    ([
      "zoomDecorationStrokeColor",
      "zoomDecorationFillColor"
    ]).forEach(function(key) {
        args[key].since = "2.3.0";
      });

    // API changes, 2.3.1
    ([
      "updateTime"
    ]).forEach(function(key) {
          args[key].since = "2.3.1";
        });

    return args;
  };



  /**
   * Constraint definitions.
   */

  function valueOf(v) {
    if (typeof v == "function") {
      return "[function]";
    } else {
      return "'" + v + "'";
    }
  }


  var NotEmpty = (function() {
    function NotEmpty() {
      if (this === window) return new NotEmpty();
    }

    NotEmpty.prototype.validate = function(value) {
      if ((typeof value == "undefined") || value == null || ("" + value) === "") {
        throw valueOf(value) + " is empty";
      }
    };

    NotEmpty.prototype.toString = function() {
      return "value is not empty"
    };

    return NotEmpty;
  })();


  var IsNull = (function() {
    function IsNull() {
      if (this === window) return new IsNull();
    }

    IsNull.prototype.validate = function(value) {
      if (value !== null) {
        throw valueOf(value) + " is not null";
      }
    };

    IsNull.prototype.toString = function() {
      return "value is null"
    };

    return IsNull;
  })();


  var IsUndefined = (function() {
    function IsUndefined() {
      if (this === window) return new IsUndefined();
    }

    IsUndefined.prototype.validate = function(value) {
      if (typeof value !== "undefined") {
        throw valueOf(value) + " is not undefined";
      }
    };

    IsUndefined.prototype.toString = function() {
      return "value is undefined"
    };

    return IsUndefined;
  })();


  var IsObject = (function() {
    function IsObject() {
      if (this === window) return new IsObject();
    }

    IsObject.prototype.validate = function(value) {
      if (value !== Object(value)) {
        throw valueOf(value) + " is not an object";
      }
    };

    IsObject.prototype.toString = function() {
      return "value is an object"
    };

    return IsObject;
  })();


  var ReadOnly = (function() {
    function ReadOnly() {
      if (this === window) return new ReadOnly();
    }

    ReadOnly.prototype.validate = function(value) {
      throw "attribute is read-only";
    };

    ReadOnly.prototype.toString = function() {
      return "attribute is read-only";
    };

    return ReadOnly;
  })();


  var IsNumeric = (function() {
    function IsNumeric(range) {
      if (this === window) return new IsNumeric(range);

      function inclusiveBracket(v) {
        switch (v) {
          case '[':
          case ']':
            return true;
          case '(':
          case ')':
            return false;
          default:
            throw "Unrecognized bracket op: " + v;
        }
      }

      function parseRange(v) {
        if (v == "∞")  { return Number.POSITIVE_INFINITY; }
        if (v == "-∞") { return Number.NEGATIVE_INFINITY; }
        if (isNaN(parseFloat(v))) throw "Not a number in range: " + v;
        return parseFloat(v);
      }

      // Simplistic range parsing.
      if (range) {
        // "(x,y)" => ["(", "0", ",", "∞", ")"]
        var comps = range.replace(/[\[\]\(\),]/g, " $& ").trim().split(/\s+/);
        this.left = parseRange(comps[1]);
        this.leftInclusive = inclusiveBracket(comps[0]);
        this.right = parseRange(comps[3]);
        this.rightInclusive = inclusiveBracket(comps[4]);
        this.range = range.replace("∞", "infinity");
      }
    }

    IsNumeric.prototype.validate = function(value) {
      if (isNaN(parseFloat(value))) {
        throw valueOf(value) + " is not a number";
      }

      if (!isFinite(value)) {
        throw valueOf(value) + " is not a finite number";
      }

      if (this.range) {
        if ((value < this.left  || (value == this.left  && !this.leftInclusive)) ||
            (value > this.right || (value == this.right && !this.rightInclusive))) {
          throw valueOf(value) + " is not within " + this.range;
        }
      }
    };

    IsNumeric.prototype.toString = function() {
      if (this.range) {
        return "value is a number in range " + this.range;
      } else {
        return "value is a number";
      }
    };

    return IsNumeric;
  })();


  var IsString = (function() {
    function IsString() {
      if (this === window) return new IsString();
    }

    IsString.prototype.validate = function(value) {
      var toString = Object.prototype.toString;
      if (value != null && toString.call(value) != "[object String]") {
        throw valueOf(value) + " is not a string";
      }
    };

    IsString.prototype.toString = function() {
      return "value is a string"
    };

    return IsString;
  })();


  var IsBoolean = (function() {
    function IsBoolean() {
      if (this === window) return new IsBoolean();
    }

    IsBoolean.prototype.validate = function(value) {
      if (value != null && typeof value !== "undefined") {
        if (value !== true && value !== false) {
          throw valueOf(value) + " is not a boolean";
        }
      }
    };

    IsBoolean.prototype.toString = function() {
      return "value is a boolean"
    };

    return IsBoolean;
  })();

  var IsFunction = (function() {
    function IsFunction() {
      if (this === window) return new IsFunction();
    }

    IsFunction.prototype.validate = function(value) {
      if (value != null && value != undefined) {
        if (typeof value !== "function") {
          throw valueOf(value) + " [" + (typeof value) + "] is not a function";
        }
      }
    };

    IsFunction.prototype.toString = function() {
      return "value is a function"
    };

    return IsFunction;
  })();

  var IsArrayOfFunctions = (function() {
    function IsArrayOfFunctions() {
      if (this === window) return new IsArrayOfFunctions();
    }

    IsArrayOfFunctions.prototype.validate = function(value) {
      if (value != null && value != undefined) {
        var arrayOfFunctions = Array.isArray(value);
        if (arrayOfFunctions) {
          value.forEach(function(key) {
            if (typeof key !== "function") {
              arrayOfFunctions = false;
            }
          });
        }
        if (!arrayOfFunctions) {
          throw valueOf(value) + " [" + (typeof value) + "] is not an array of functions";
        }
      }
    };

    IsArrayOfFunctions.prototype.toString = function() {
      return "value is an array of functions"
    };

    return IsArrayOfFunctions;
  })();

  var Matches = (function() {
    function Matches(regexp) {
      if (this === window) { return new Matches(regexp); }
      this.regexp = regexp;
    }

    Matches.prototype.validate = function(value) {
      if (!this.regexp.test(value)) throw valueOf(value) + " does not match " + this.regexp;
    };

    Matches.prototype.toString = function() {
      return "value matches " + this.regexp
    };

    return Matches;
  })();

  var IdentifiesExistingElement = (function() {
    function IdentifiesExistingElement() {
      if (this === window) return new IdentifiesExistingElement();
    }

    IdentifiesExistingElement.prototype.validate = function(value) {
      var element = document.getElementById(value);
      if (!element) {
        throw valueOf(value) + " is not an identifier of an existing DOM element";
      }
    };

    IdentifiesExistingElement.prototype.toString = function() {
      return "value is an identifier of an existing DOM element";
    };

    return IdentifiesExistingElement;
  })();


  var IsElement = (function() {
    function IsElement() {
      if (this === window) return new IsElement();
    }

    IsElement.prototype.validate = function(value) {
      if (!(value instanceof HTMLElement)) {
        throw valueOf(value) + " is not a DOM element";
      }
    };

    IsElement.prototype.toString = function() {
      return "value is a DOM element";
    };

    return IsElement;
  })();

  var CssColor = (function() {
    function CssColor() {
      if (this === window) { return new CssColor(); }
    }

    var predefinedColorsRegexp = new RegExp("^(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)$", "i");

    CssColor.prototype.validate = function(value) {
      if (/^rgba\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)$/.test(value)) {
        return;
      }
      if (/^rgb\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)$/.test(value)) {
        return;
      }
      if (/^hsla\(\s*([^,\s]+)\s*,\s*([^,%\s]+)%\s*,\s*([^,\s%]+)%\s*,\s*([^,\s]+)\s*\)$/.test(value)) {
        return;
      }
      if (/^hsl\(\s*([^,\s]+)\s*,\s*([^,\s%]+)%\s*,\s*([^,\s%]+)%\s*\)$/.test(value)) {
        return;
      }
      if (/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.test(value)) {
        return;
      }
      if (/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.test(value)) {
        return;
      }
      if (predefinedColorsRegexp.test(value)) {
        return;
      }

      throw valueOf(value) + " is not a CSS color specification";
    };

    CssColor.prototype.toString = function() {
      return "value is a CSS color";
    };

    return CssColor;
  })();


  var OneOf = (function() {
    function OneOf(values) {
      if (this === window) { return new OneOf(values); }
      this.values = values;
    }

    OneOf.prototype.validate = function(value) {
      if (this.values.indexOf(value) < 0) {
        throw valueOf(value) + " not one of [" + this.values.join(", ") + "]";
      }
    };

    OneOf.prototype.toString = function() {
      return "value one of [" + this.values.join(", ") + "]";
    };

    return OneOf;
  })();


  var Or = (function() {
    function Or() {
      if (this === window) { return Or.apply(new Or(), arguments); }
      this.clauses = Array.prototype.slice.call(arguments);
      return this;
    }

    Or.prototype.validate = function(value) {
      var vetoes = [];
      for (var i = 0; i < this.clauses.length; i++) {
        try {
          this.clauses[i].validate(value);
        } catch (e) {
          vetoes.push(e);
        }
      }

      if (vetoes.length == this.clauses.length) {
        throw vetoes.map(function(e) {return "(" + e + ")";}).join(" and ");
      }
    };

    Or.prototype.toString = function() {
      return this.clauses.map(function(e) {return "(" + e + ")";}).join(" or ");
    };

    return Or;
  })();


  var And = (function() {
    function And() {
      if (this === window) { return And.apply(new And(), arguments); }
      this.clauses = Array.prototype.slice.call(arguments);
      return this;
    }

    And.prototype.validate = function(value) {
      var vetoes = [];
      for (var i = 0; i < this.clauses.length; i++) {
        try {
          this.clauses[i].validate(value);
        } catch (e) {
          vetoes.push(e);
          break;  // fastpath, no need to evaluate further.
        }
      }

      if (vetoes.length != 0) {
        throw vetoes.map(function(e) {return "(" + e + ")";}).join(" and ");
      }
    };

    And.prototype.toString = function() {
      return this.clauses.map(function(e) {return "(" + e + ")";}).join(" and ");
    };

    return And;
  })();

  // Install attributes or defer until Circles is loaded.
  var args = attributeDefinitions();
  if (window["CarrotSearchCircles"]) {
    window["CarrotSearchCircles"]["attributes"] = args;
  } else {
    window["CarrotSearchCircles.attributes"] = args;
  }
})();

/*
 * Build information
 * -----------------
 * 
 * Build type    : Carrot Search Circles HTML5 (demo variant)
 * Build version : 2.3.6
 * Build number  : CIRCLES-SOFTWARE-DIST-57
 * Build time    : Dec 16, 2016
 * Built by      : bamboo
 * Build revision: 903dbc847f249112dce68481ca74028db9bc68ee/903dbc84
 */
},{}],2:[function(require,module,exports){
/**
 * Carrot Search Circles HTML5 (demo variant)
 * v2.3.6, 903dbc847f249112dce68481ca74028db9bc68ee/903dbc84, build CIRCLES-SOFTWARE-DIST-57, Dec 16, 2016
 * 
 * Carrot Search confidential.
 * Copyright 2002-2016, Carrot Search s.c, All Rights Reserved.
 */
(function() {
    /*
     Includes Hammer.JS (1.0.3), http://eightmedia.github.com/hammer.js
     Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>, MIT license.
    */
    var aa = {
            stop_browser_behavior: {
                userSelect: "none",
                touchCallout: "none",
                touchAction: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        },
        ca = navigator.pointerEnabled || navigator.msPointerEnabled,
        da = {},
        ea = "move",
        p = "end",
        fa = !1;

    function ha(a) {
        return function() {
            if (1 <= arguments.length) {
                var c = arguments[0];
                if ("pageX" in c && !c.pageX && c.clientX) {
                    var b = c.target.ownerDocument || document,
                        e = b.documentElement,
                        b = b.body;
                    c.pageX_ || (c.pageX_ = c.clientX + (e && e.scrollLeft || b && b.scrollLeft || 0) - (e && e.clientLeft || b && b.clientLeft || 0));
                    c.pageY_ || (c.pageY_ = c.clientY + (e && e.scrollTop || b && b.scrollTop || 0) - (e && e.clientTop || b && b.clientTop || 0))
                }
            }
            a.apply(this, arguments)
        }
    }

    function u(a) {
        return "pageX_" in a ? a.pageX_ : a.pageX
    }

    function G(a) {
        return "pageY_" in a ? a.pageY_ : a.pageY
    }

    function ja() {
        if (!fa) {
            ka.Dd();
            for (var a in I) I.hasOwnProperty(a) && J.Ee(I[a]);
            ka.Db(document, ea, J.ib);
            ka.Db(document, p, J.Kd);
            fa = !0
        }
    }

    function la(a, c) {
        var b = this;
        ja();
        this.element = a;
        this.enabled = !0;
        this.options = K.extend(K.extend({}, aa), c || {});
        this.options.Qe && K.Pe(this.element, this.options.Qe);
        ka.Db(a, "start", function(a) {
            b.enabled && J.Oe(b, a)
        });
        return this
    }
    la.prototype = {
        ma: function(a, c) {
            for (var b = a.split(" "), e = 0; e < b.length; e++) this.element.addEventListener(b[e], ha(c), !1);
            return this
        }
    };

    function P(a, c, b) {
        var e = document.createEvent("Event");
        e.initEvent(c, !0, !0);
        e.gc = b;
        a.element.dispatchEvent(e)
    }
    var ma = null,
        na = !1,
        oa = !1,
        ka = function() {
            var a = {
                td: function(a, b, e) {
                    b = b.split(" ");
                    for (var d = 0; d < b.length; d++) a.addEventListener(b[d], ha(e), !1)
                },
                Db: function(c, b, e) {
                    a.td(c, da[b], function(d) {
                        var f = d.type.toLowerCase();
                        if (f.match(/mouseup/) && oa) oa = !1;
                        else {
                            if (f.match(/touch/) || f.match(/mouse/) && 1 === d.which || ca && f.match(/down/)) na = !0;
                            f.match(/touch|pointer/) && (oa = !0);
                            !na || oa && f.match(/mouse/) || (ca && b != p && pa.hd(b, d), b === p && null !== ma ? d = ma : ma = d, e.call(J, a.vd(c, b, d)), ca && b == p && pa.hd(b, d));
                            f.match(/up|cancel|end/) &&
                                (na = !1, ma = null, pa.reset())
                        }
                    })
                },
                Dd: function() {
                    var a;
                    a = ca ? ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"];
                    da.start = a[0];
                    da[ea] = a[1];
                    da[p] = a[2]
                },
                mb: function(a) {
                    return ca ? pa.mb() : a.touches ? a.touches : [{
                        identifier: 1,
                        pageX: u(a),
                        pageY: G(a),
                        target: a.target
                    }]
                },
                vd: function(c, b, e) {
                    c = a.mb(e, b);
                    var d = "touch";
                    if (e.type.match(/mouse/) || pa.ie("mouse", e)) d = "mouse";
                    return {
                        I: K.Rd(c),
                        timestamp: e.timestamp || (new Date).getTime(),
                        target: e.target,
                        touches: c,
                        aa: b,
                        pointerType: d,
                        Ne: e,
                        preventDefault: function() {
                            e.re && e.re();
                            e.preventDefault && e.preventDefault()
                        },
                        stopPropagation: function() {
                            e.stopPropagation()
                        },
                        Wa: function() {
                            return J.Wa()
                        }
                    }
                }
            };
            return a
        }(),
        pa = function() {
            var a = {
                Sa: {},
                mb: function() {
                    var c = a.Sa,
                        b = [];
                    null != c && Object.keys(c).sort().forEach(function(a) {
                        b.push(c[a])
                    });
                    return b
                },
                hd: function(c, b) {
                    c == p ? delete a.Sa[b.pointerId] : (b.identifier = b.pointerId, a.Sa[b.pointerId] = b)
                },
                ie: function(a,
                    b) {
                    if (!b.pointerType) return !1;
                    var e = {};
                    e.mouse = b.pointerType == b.MSPOINTER_TYPE_MOUSE || "mouse" == b.pointerType;
                    e.touch = b.pointerType == b.MSPOINTER_TYPE_TOUCH || "touch" == b.pointerType;
                    e.pen = b.pointerType == b.MSPOINTER_TYPE_PEN || "pen" == b.pointerType;
                    return e[a]
                },
                of: function() {
                    return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
                },
                reset: function() {
                    a.Sa = {}
                }
            };
            return a
        }(),
        K = function() {
            var a = {
                extend: function(a, b) {
                    for (var e in b) a[e] = b[e];
                    return a
                },
                Rd: function(a) {
                    for (var b = [], e = [], d = 0, f = a.length; d < f; d++) b.push(u(a[d])), e.push(G(a[d]));
                    return {
                        pageX: (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
                        pageY: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2
                    }
                },
                Vd: function(a, b, e) {
                    return {
                        x: Math.abs(b / a) || 0,
                        y: Math.abs(e / a) || 0
                    }
                },
                lb: function(a, b) {
                    return 180 * Math.atan2(G(b) - G(a), u(b) - u(a)) / Math.PI
                },
                Sd: function(a, b) {
                    return Math.abs(u(a) - u(b)) >= Math.abs(G(a) - G(b)) ? 0 < u(a) - u(b) ? "left" : "right" : 0 < G(a) - G(b) ? "up" : "down"
                },
                Ka: function(a, b) {
                    var e = u(b) - u(a),
                        d = G(b) -
                        G(a);
                    return Math.sqrt(e * e + d * d)
                },
                Ud: function(c, b) {
                    return 2 <= c.length && 2 <= b.length ? a.Ka(b[0], b[1]) / a.Ka(c[0], c[1]) : 1
                },
                Td: function(c, b) {
                    return 2 <= c.length && 2 <= b.length ? a.lb(b[1], b[0]) - a.lb(c[1], c[0]) : 0
                },
                sb: function(a) {
                    return "up" == a || "down" == a
                },
                Pe: function(a, b) {
                    var e, d = "webkit khtml moz ms o ".split(" ");
                    if (b && a.style) {
                        for (var f = 0; f < d.length; f++)
                            for (var l in b) b.hasOwnProperty(l) && (e = l, d[f] && (e = d[f] + e.substring(0, 1).toUpperCase() + e.substring(1)), a.style[e] = b[l]);
                        "none" == b.Bf && (a.onselectstart = function() {
                            return !1
                        })
                    }
                }
            };
            return a
        }(),
        J = function() {
            var a = {
                xa: [],
                i: null,
                Qc: null,
                Xa: !1,
                Oe: function(c, b) {
                    a.i || (a.Xa = !1, a.i = {
                        sc: c,
                        Mb: K.extend({}, b),
                        wb: !1,
                        name: ""
                    }, a.ib(b))
                },
                ib: function(c) {
                    if (a.i && !J.Xa) {
                        c = a.Nd(c);
                        for (var b = a.i.sc.options, e = 0, d = a.xa.length; e < d; e++) {
                            var f = a.xa[e];
                            if (!a.Xa && !1 !== b[f.name] && !1 === f.ca.call(f, c, a.i.sc)) {
                                a.Wa();
                                break
                            }
                        }
                        a.i && (a.i.wb = c)
                    }
                },
                Kd: function(c) {
                    a.ib(c);
                    a.Wa()
                },
                Wa: function() {
                    a.Qc = K.extend({}, a.i);
                    a.i = null;
                    a.Xa = !0
                },
                Nd: function(c) {
                    var b = a.i.Mb;
                    if (b && (c.touches.length != b.touches.length || c.touches ===
                            b.touches)) {
                        b.touches = [];
                        for (var e = 0, d = c.touches.length; e < d; e++) b.touches.push(K.extend({}, c.touches[e]))
                    }
                    var e = c.timestamp - b.timestamp,
                        d = u(c.I) - u(b.I),
                        f = G(c.I) - G(b.I),
                        l = K.Vd(e, d, f);
                    K.extend(c, {
                        zd: e,
                        Ad: d,
                        Bd: f,
                        velocityX: l.x,
                        velocityY: l.y,
                        jb: K.Ka(b.I, c.I),
                        Da: K.lb(b.I, c.I),
                        direction: K.Sd(b.I, c.I),
                        scale: K.Ud(b.touches, c.touches),
                        rotation: K.Td(b.touches, c.touches),
                        Mb: b
                    });
                    return c
                },
                Ee: function(c) {
                    var b = c.J || {};
                    "undefined" == typeof b[c.name] && (b[c.name] = !0);
                    K.extend(aa, b);
                    c.index = c.index || 1E3;
                    a.xa.push(c);
                    a.xa.sort(function(a, b) {
                        return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
                    });
                    return a.xa
                }
            };
            return a
        }(),
        I = I || {};
    I.df = function() {
        var a = {
            name: "hold",
            index: 10,
            J: {
                be: 500,
                ae: 1
            },
            Ya: null,
            ca: function(c, b) {
                switch (c.aa) {
                    case "start":
                        clearTimeout(a.Ya);
                        J.i.name = a.name;
                        a.Ya = setTimeout(function() {
                            J.i.name == a.name && P(b, a.name, c)
                        }, b.options.be);
                        break;
                    case ea:
                        c.jb > b.options.ae && clearTimeout(a.Ya);
                        break;
                    case p:
                        clearTimeout(a.Ya)
                }
            }
        };
        return a
    }();
    I.gf = {
        name: "tap",
        index: 100,
        J: {
            Se: 250,
            Re: 10,
            Ed: 20,
            Fd: 300
        },
        ca: function(a, c) {
            if (a.aa == p) {
                var b = J.Qc;
                a.zd > c.options.Se || a.jb > c.options.Re || (J.i.name = b && "tap" == b.name && a.timestamp - b.wb.timestamp < c.options.Fd && K.Ka(a.I, b.Mb.I) < c.options.Ed ? "doubletap" : "tap", P(c, J.i.name, a))
            }
        }
    };
    I.ff = function() {
        var a = {
            name: "swipe",
            index: 40,
            J: {
                Tc: 1,
                Uc: 0.7
            },
            ca: function(c, b) {
                c.aa != p || 0 < b.options.Tc && c.touches.length > b.options.Tc || !(c.velocityX > b.options.Uc || c.velocityY > b.options.Uc) || (P(b, a.name, c), P(b, a.name + c.direction, c))
            }
        };
        return a
    }();
    I.cf = function() {
        var a = {
            name: "drag",
            index: 50,
            J: {
                Jd: 10,
                ac: 1,
                Gd: !1,
                Hd: !1,
                Id: !1
            },
            A: !1,
            ca: function(c, b) {
                if (J.i.name != a.name && a.A) P(b, a.name + "end", c), a.A = !1;
                else if (!(0 < b.options.ac && c.touches.length > b.options.ac)) switch (c.aa) {
                    case "start":
                        a.A = !1;
                        break;
                    case ea:
                        if (c.jb < b.options.Jd && J.i.name != a.name) break;
                        J.i.name = a.name;
                        var e = J.i.wb.direction;
                        b.options.Id && e !== c.direction && (c.direction = K.sb(e) ? 0 > c.Bd ? "up" : "down" : 0 > c.Ad ? "left" : "right");
                        a.A || (P(b, a.name + "start", c), a.A = !0);
                        P(b, a.name, c);
                        P(b, a.name + c.direction,
                            c);
                        (b.options.Hd && K.sb(c.direction) || b.options.Gd && !K.sb(c.direction)) && c.preventDefault();
                        break;
                    case p:
                        a.A && P(b, a.name + "end", c), a.A = !1
                }
            }
        };
        return a
    }();
    I.jf = function() {
        var a = {
            name: "transform",
            index: 45,
            J: {
                gd: 0.01,
                fd: 1,
                Ye: !1
            },
            A: !1,
            ca: function(c, b) {
                if (J.i.name != a.name && a.A) P(b, a.name + "end", c), a.A = !1;
                else if (!(2 > c.touches.length)) switch (b.options.Ye && c.preventDefault(), c.aa) {
                    case "start":
                        a.A = !1;
                        break;
                    case ea:
                        var e = Math.abs(1 - c.scale),
                            d = Math.abs(c.rotation);
                        if (e < b.options.gd && d < b.options.fd) break;
                        J.i.name = a.name;
                        a.A || (P(b, a.name + "start", c), a.A = !0);
                        P(b, a.name, c);
                        d > b.options.fd && P(b, "rotate", c);
                        e > b.options.gd && (P(b, "pinch", c), P(b, "pinch" + (1 > c.scale ? "in" :
                            "out"), c));
                        break;
                    case p:
                        a.A && P(b, a.name + "end", c), a.A = !1
                }
            }
        };
        return a
    }();
    I.hf = function() {
        var a = {
            name: "touch",
            index: -Infinity,
            J: {
                Fb: !1
            },
            ca: function(c, b) {
                b.options.Fb && c.preventDefault();
                "start" == c.aa && P(b, a.name, c)
            }
        };
        return a
    }();
    I.ef = function() {
        var a = {
            name: "release",
            index: Infinity,
            ca: function(c, b) {
                c.aa == p && P(b, a.name, c)
            }
        };
        return a
    }();
    var Q = function() {
        var a = {},
            c = Array.prototype,
            b = Object.prototype,
            e = c.slice,
            d = c.concat,
            f = b.toString,
            l = b.hasOwnProperty,
            b = Object.keys,
            g = c.forEach,
            k = c.filter,
            m = c.map;
        a.isArray = Array.isArray || function(a) {
            return "[object Array]" == f.call(a)
        };
        a.uf = function(a) {
            return "[object Arguments]" == f.call(a)
        };
        a.X = function(a) {
            return "[object Function]" == f.call(a)
        };
        a.rb = function(a) {
            return "[object String]" == f.call(a)
        };
        a.Oa = function(a) {
            return "[object Number]" == f.call(a)
        };
        a.vf = function(a) {
            return "[object Date]" == f.call(a)
        };
        a.wf =
            function(a) {
                return "[object RegExp]" == f.call(a)
            };
        a.j = function(a) {
            return void 0 === a
        };
        a.da = function(a) {
            return a === Object(a)
        };
        a.lf = function(a, b, c) {
            c || (c = 1E-6);
            a -= b;
            return a < c && a > -c
        };
        a.N = function(b, c) {
            return a.da(b) ? c in b : !1
        };
        a.hasOwnProperty = function(a, b) {
            return l.call(a, b)
        };
        a.forEach = function(b, c, d) {
            if (null != b)
                if (g && b.forEach === g) b.forEach(c, d);
                else if (b.length === +b.length)
                for (var e = 0, f = b.length; e < f; e++) c.call(d, b[e], e, b);
            else
                for (e in b) a.hasOwnProperty(b, e) && c.call(d, b[e], e, b)
        };
        a.filter = function(b,
            c, d) {
            if (null == b) return [];
            if (k && b.filter === k) return b.filter(c, d);
            var e = [];
            a.forEach(b, function(a, b, f) {
                c.call(d, a, b, f) && e.push(a)
            });
            return e
        };
        a.map = function(b, c, d) {
            if (null == b) return [];
            if (m && b.map === m) return b.map(c, d);
            var e = [];
            a.forEach(b, function(a, b, f) {
                e.push(c.call(d, a, b, f))
            });
            return e
        };
        a.extend = function(a, b) {
            for (var c = 1, d = arguments.length; c < d; c++) {
                var e = arguments[c],
                    f;
                for (f in e) a[f] = e[f]
            }
            return a
        };
        a.keys = b || function(b) {
            if (!a.da(b)) throw new TypeError;
            var c = [],
                d;
            for (d in b) a.hasOwnProperty(b, d) &&
                c.push(d);
            return c
        };
        a.oe = function(a, b) {
            for (var f = {}, l = d.apply(c, e.call(arguments, 1)), g = 0, k = l.length; g < k; g++) {
                var m = l[g];
                m in a && (f[m] = a[m])
            }
            return f
        };
        a.ta = function(b) {
            return a.isArray(b) ? b.slice() : a.extend({}, b)
        };
        a.J = function(b, c) {
            a.forEach(e.call(arguments, 1), function(a) {
                for (var c in a) null == b[c] && (b[c] = a[c])
            });
            return b
        };
        a.contains = function(a, b) {
            return null == a ? !1 : -1 != a.indexOf(b)
        };
        a.Od = function(b) {
            for (var c = 0, d = arguments.length; c < d; c++)
                if (!a.j(arguments[c])) return arguments[c]
        };
        return a
    }();
    var qa = function() {
        var a = window.performance && (window.performance.now || window.performance.mozNow || window.performance.msNow || window.performance.oNow || window.performance.webkitNow);
        return function() {
            return a && a.call(window.performance) || (new Date).getTime()
        }
    }();
    var R, ra, sa, ta, ua;
    (function() {
        function a(a) {
            return function(b) {
                return 1 > (b *= 2) ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
            }
        }
        R = function(a) {
            return a
        };
        ra = function(a) {
            return function(b) {
                return Math.pow(b, a)
            }
        }(3);
        sa = function(a) {
            return function(b) {
                return 1 - Math.pow(1 - b, a)
            }
        }(3);
        ta = a(3);
        ua = a(2)
    })();

    function va() {
        function a(a) {
            if (!a.type) throw "Events must have a type.";
            for (var b = "on" + a.type.substr(0, 1).toUpperCase() + a.type.substring(1), f = c.slice(0), l = 0; l < f.length; l++) {
                var g = f[l][b];
                g && g.call(g, a);
                if (!0 === a.stopPropagation) break
            }
        }
        var c = [],
            b;
        this.addEventListener = function(a) {
            c.push(a)
        };
        this.removeEventListener = function(a) {
            for (var b = 0; b < c.length; b++) c[b] === a && c.splice(b, 1)
        };
        this.Lb = function(a) {
            b = a
        };
        this.F = function(b) {
            a(b);
            !0 !== b.stopPropagation && wa(this, function(a) {
                a.F && a.F(b)
            })
        };
        this.W = function(c) {
            a(c);
            b && b.W(c)
        };
        return this
    }

    function xa() {
        va.call(this);
        var a = this;
        a.addEventListener({
            onAddedToStage: function(c) {
                a.Aa = c.Aa;
                a.Lb(c.Aa)
            },
            onRemovedFromStage: function() {
                a.Aa = void 0;
                a.Lb(void 0)
            }
        });
        a.C = function() {
            a.W({
                type: "dirty",
                target: this
            })
        };
        return a
    }

    function ya() {
        va.call(this);
        this.vc = this.children = [];
        this.ge = {};
        this.Rb = function(a, c) {
            this.vc.push(c);
            this.ge[a] = c;
            c.Lb(this)
        }
    }

    function za(a, c) {
        function b() {
            e.F({
                type: "paint"
            })
        }
        va.call(this);
        this.children = [];
        this.name = c ? c : "unnamed";
        this.canvas = a;
        this.L = a.getContext("2d");
        var e = this,
            d = !1;
        this.addEventListener({
            onDirty: function() {
                d || (d = !0, Aa.Pc(b))
            },
            onPaint: function(b) {
                a = a || this.canvas;
                var c = a.getContext("2d");
                c.clearRect(0, 0, a.width, a.height);
                b.L = c;
                d = !1
            },
            onLayout: function(a) {
                var b = e.canvas;
                if (b.width != a.e || b.height != a.d) b.width = a.e, b.height = a.d
            }
        });
        this.ab = function(a) {
            for (var b = 0; b < arguments.length; b++) this.children.push(arguments[b]),
                arguments[b].F({
                    type: "addedToStage",
                    Aa: e
                })
        };
        this.Ib = function(a) {
            for (var b = 0; b < arguments.length; b++)
                for (var c = 0; c < this.children.length;) this.children[c] === arguments[b] ? (this.children.splice(c, 1), arguments[b].F({
                    type: "removedFromStage",
                    Aa: e
                })) : c++
        }
    };
    var Ba = new function() {
        this.pe = function(a, c) {
            for (var b = 0; b < a.length; b++) {
                var e = a[b],
                    d = a[b + 1] || a[0];
                if (0 > (c.y - e.y) * (d.x - e.x) - (c.x - e.x) * (d.y - e.y)) return !1
            }
            return !0
        };
        this.qe = function(a, c) {
            return a.x >= c.x && a.y >= c.y && a.x <= c.x + c.e && a.y <= c.y + c.d
        };
        this.Pd = function(a, c) {
            a.beginPath();
            var b = c[0];
            a.moveTo(b.x, b.y);
            for (var e = 1; e < c.length; e++) b = c[e], a.lineTo(b.x, b.y)
        };
        return this
    };
    var Ca = new function() {
        function a(a, b, f, l, g, k) {
            a.font = f + "px " + l;
            l = 0;
            for (var m = [], x = !0; !(0 == b.length || l + g > k.d);) {
                var s = c(a, b, k.e);
                s.x = 0;
                s.y = l;
                m.push(s);
                b = s.Vc;
                x = x && s.Ha;
                l += g
            }
            return {
                t: m,
                va: f,
                Pb: 0 < b.length,
                Ha: x
            }
        }

        function c(a, b, c) {
            b = b.trim();
            for (var l = 0, g = b.length + 1; 1 < g - l;) {
                var k = Math.floor((g + l) / 2),
                    m = a.measureText(b.substring(0, k)).width;
                if (m == c) {
                    l = k;
                    break
                }
                m < c ? l = k : g = k
            }
            c = !0;
            if (l < b.length) {
                for (g = l; 0 < g && " " != b.charAt(g);) g--;
                (c = 0 < g) && (l = g)
            }
            g = b.substring(0, l);
            return {
                text: g,
                width: a.measureText(g).width,
                Vc: b.substring(l).trim(),
                Ha: c
            }
        }
        this.fc = function(e, d, f, l, g, k, m, x, s) {
            if (Q.rb(d)) {
                m = Number(m);
                var n = String.fromCharCode(8230),
                    q = s ? s.Qa : void 0;
                if (!q) {
                    e.textBaseline = "top";
                    g = Math.floor(g);
                    k = Math.floor(k);
                    var y, t;
                    if (1 >= k - g)
                        for (y = k; y >= g; y--) {
                            if (t = a(e, d, y, l, y + m, f), !t.Pb && t.Ha) {
                                q = t;
                                break
                            }
                        } else
                            for (; 1 < k - g;) y = Math.floor((k + g) / 2), t = a(e, d, y, l, y + m, f), t.Pb || !t.Ha ? k = y : (g = y, q = t);
                    q || (q = t);
                    if (q) {
                        if (q.Pb && 0 < q.t.length)
                            for (e.font = q.va + "px " + l, t = q.t[q.t.length - 1], g = t.text; 0 < g.length;) {
                                for (d = g.length - 1; 0 < d && " " == g.charCodeAt(d);) d--;
                                g = g.substring(0,
                                    d);
                                d = c(e, g + n, f.e);
                                if (0 == d.Vc.length) {
                                    q.t.pop();
                                    d.x = 0;
                                    d.y = t.y;
                                    q.t.push(d);
                                    break
                                }
                            }
                        t = 0;
                        g = q.va + m;
                        for (n = 0; n < q.t.length; n++) d = q.t[n], t = Math.max(d.y + g, t);
                        d = (f.d - t) / 2;
                        for (n = 0; n < q.t.length; n++) q.t[n].y += d;
                        for (n = 0; n < q.t.length; n++) d = q.t[n], d.x = (f.e - d.width) / 2;
                        if (s) {
                            d = q.t;
                            if (0 < d.length)
                                for (m = q.Ub = {
                                        x: d[0].x,
                                        y: d[0].y,
                                        e: d[0].width,
                                        d: (q.va + m) * d.length
                                    }, n = 1; n < d.length; n++) m.x = Math.min(m.x, d[n].x), m.e = Math.max(m.e, d[n].width);
                            s.Qa = q
                        }
                    }
                }
                if (q)
                    for (e.font = q.va + "px " + l, e.fillStyle = x, n = 0; n < q.t.length; n++) d = q.t[n], e.fillText(d.text,
                        f.x + d.x, f.y + d.y + (b ? 0.1 : -0.1) * q.va)
            }
        };
        var b = /Firefox/.test(navigator.userAgent);
        return this
    };
    var Da = 2 * Math.PI,
        Ea = "SE",
        Fa = "SW",
        Ga = "NE",
        Ha = "NW";

    function S(a) {
        return a * Math.PI / 180
    }

    function Ia(a) {
        if (0 <= a && 360 > a) return a;
        a %= 360;
        return 0 > a ? a + 360 : a
    }

    function Ja(a) {
        if (0 <= a && a < Da) return a;
        a %= Da;
        return 0 > a ? Da + a : a
    }

    function Ka(a, c) {
        if (a == c) return 0;
        if (0 > a || a > Da) a = Ja(a);
        if (0 > c || c > Da) c = Ja(c);
        return a < c ? c - a : a > Math.PI ? Da - a + c : Da - c + a
    };
    var Aa = function() {
        function a() {
            if (!k) throw "Panic. onFrame called from unregistered state?";
            var a = qa();
            g = g.filter(function(a) {
                return null !== a
            });
            e.frames++;
            e.ve = g.length;
            e.Ac = Math.max(e.Ac, g.length);
            for (var b = 0; b < g.length; b++) {
                var s = g[b];
                null !== s && (s.Wb.call(s.L), Q.Oa(s.repeat) && (s.repeat -= 1, 0 >= s.repeat && (g[b] = null)))
            }
            a = qa() - a;
            e.totalTime += a;
            e.zc = Math.max(e.zc, a);
            d += a;
            for (e.wa.push(a); e.wa.length > f;) d -= e.wa.shift();
            e.Qd = e.wa.length / (d / 1E3);
            e.Xe = d / e.wa.length;
            g = g.filter(function(a) {
                return null !== a
            });
            k = !1;
            c()
        }

        function c() {
            0 < g.length && !k && (k = !0, l(a))
        }
        var b = {},
            e = b.Af = {
                frames: 0,
                totalTime: 0,
                Xe: 0,
                Qd: 0,
                ve: 0,
                Ac: 0,
                zc: 0,
                wa: []
            },
            d = 0,
            f = 100,
            l = function() {
                return /iPad|iPhone/.test(window.navigator.userAgent) ? function(a) {
                    window.setTimeout(a, 0)
                } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                    var b = 0;
                    window.setTimeout(function() {
                        var c = qa();
                        a();
                        b = qa() - c
                    }, 16 > b ? 16 - b : 0)
                }
            }(),
            g = [],
            k = !1;
        b.repeat =
            function(a, d, e) {
                b.cancel(a);
                g.push({
                    Wb: a,
                    L: e,
                    repeat: d
                });
                c()
            };
        b.Pc = function(a) {
            b.repeat(a, 1, void 0)
        };
        b.cancel = function(a) {
            for (var b = 0; b < g.length; b++) {
                var c = g[b];
                null !== c && c.Wb === a && (g[b] = null)
            }
        };
        return b
    }();
    var W = function() {
        function a(a, b, k) {
            var m = this,
                x;
            this.id = d++;
            this.name = k ? k : "{unnamed on " + a + "}";
            this.target = function() {
                return a
            };
            this.pb = function() {
                return -1 != f.indexOf(m)
            };
            this.start = function() {
                if (!m.pb()) {
                    if (-1 == f.indexOf(m)) {
                        var a = qa();
                        !0 === m.Hc(a) && (f = f.slice(), f.push(m))
                    }
                    0 < f.length && Aa.repeat(c)
                }
                return this
            };
            this.stop = function() {
                e(m);
                return this
            };
            this.Rc = function() {
                x = void 0
            };
            this.Hc = function(a) {
                if (0 !== b.length) {
                    var c;
                    Q.j(x) ? (x = 0, c = b[x], c.ia && c.ia.call(c, a, m)) : c = b[x];
                    for (; x < b.length;) {
                        if (c.la &&
                            c.la.call(c, a, m)) return !0;
                        c.od && c.od.call(c, a, m);
                        Q.j(x) && (x = -1);
                        ++x < b.length && (c = b[x], c.ia && c.ia.call(c, a, m))
                    }
                }
                return !1
            }
        }

        function c() {
            b();
            0 == f.length && Aa.cancel(c)
        }

        function b() {
            var a = qa();
            f.forEach(function(b) {
                !0 !== b.Hc(a) && e(b)
            })
        }

        function e(a) {
            f = f.filter(function(b) {
                return b !== a
            })
        }
        var d = 0,
            f = [];
        a.nd = function(a) {
            return Q.j(a) ? f.slice() : f.filter(function(b) {
                return b.target() === a
            })
        };
        a.H = function() {
            function b() {
                throw "No instances.";
            }

            function c(a) {
                var b = a.target,
                    d = a.duration,
                    e = a.O,
                    f, k;
                this.ia = function() {
                    f = {};
                    for (var c in a.k) c in b && (f[c] = {
                        start: Q.j(a.k[c].start) ? b[c] : Q.X(a.k[c].start) ? a.k[c].start.call(void 0) : a.k[c].start,
                        end: Q.j(a.k[c].end) ? b[c] : Q.X(a.k[c].end) ? a.k[c].end.call(void 0) : a.k[c].end,
                        f: Q.j(a.k[c].f) ? R : a.k[c].f
                    });
                    k = qa()
                };
                this.la = function() {
                    var a = qa() - k,
                        a = 0 === d ? 1 : Math.min(d, a) / d,
                        c;
                    for (c in f) {
                        var g = f[c];
                        b[c] = g.start + (g.end - g.start) * g.f(a)
                    }
                    e && e.call(b, a);
                    return 1 > a
                }
            }

            function d(a, b) {
                this.la = function() {
                    a.call(b);
                    return !1
                }
            }

            function e(a) {
                var b;
                this.ia = function(c) {
                    b = c + a
                };
                this.la = function(a) {
                    return a <
                        b
                }
            }

            function f(a) {
                if (!Array.isArray(a)) throw "An array of timelines required.";
                this.ia = function() {
                    a.forEach(function(a) {
                        a.start()
                    })
                };
                this.la = function() {
                    for (var b = 0; b < a.length; b++)
                        if (a[b].pb()) return !0;
                    return !1
                }
            }
            b.ma = function(b, l) {
                return new function() {
                    var q = [];
                    this.sa = function(a) {
                        q.push(a);
                        return this
                    };
                    this.kd = function(a) {
                        return this.sa(new e(a))
                    };
                    this.call = function(a, c) {
                        Q.j(c) && (c = b);
                        return this.sa(new d(a, c))
                    };
                    this.V = function(a) {
                        Q.j(a.target) && (a.target = b);
                        return this.sa(new c(a))
                    };
                    this.Eb = function(a) {
                        return this.sa(new f(a))
                    };
                    this.Rc = function() {
                        return this.sa({
                            la: function(a, b) {
                                b.Rc();
                                return !0
                            }
                        })
                    };
                    this.Ja = function() {
                        return new a(b, q, l)
                    };
                    this.start = function() {
                        return this.Ja().start()
                    }
                }
            };
            b.K = function(c, d) {
                a.nd(c).forEach(function(a) {
                    a.stop()
                });
                return b.ma(c, d)
            };
            return b
        }();
        return a
    }();
    var La = new function() {
        function a(a, b, e, d, f, l, g, k, m, x, s, n, q, y) {
            var t, M;
            a.save();
            a.beginPath();
            a.moveTo(e, d);
            a.lineTo(f, l);
            a.lineTo(g, k);
            a.clip();
            f -= e;
            l -= d;
            g -= e;
            k -= d;
            s -= m;
            n -= x;
            q -= m;
            y -= x;
            t = s * y - q * n;
            0 != t && (M = 1 / t, t = (y * f - n * g) * M, n = (y * l - n * k) * M, f = (s * g - q * f) * M, l = (s * k - q * l) * M, a.transform(t, n, f, l, e - t * m - f * x, d - n * m - l * x), a.drawImage(b, 0, 0));
            a.restore()
        }
        this.he = function(c, b, e, d, f, l, g, k, m, x, s, n, q, y, t, M, ga, N) {
            m = Math.ceil((k - g) / m);
            l = Math.ceil((f - d) / l);
            if (!(0 >= m || 0 >= l)) {
                var O = function(a, c) {
                        var r = (a - g) / (k - g),
                            ba = (c - d) / (f -
                                d);
                        M && (r = 1 - r);
                        ga || (ba = 1 - ba);
                        if (t) var Xa = r,
                            r = ba,
                            ba = Xa;
                        return {
                            x: b + c * Math.cos(a),
                            y: e + c * Math.sin(a),
                            oa: s + q * r,
                            pa: n + y * ba
                        }
                    },
                    Z = N && N.Wc;
                N = N.Te;
                for (var H = (k - g) / m, h = (f - d) / l, A = 0; A < l; A++)
                    for (var z = d + A * h, E = d + (A + 1) * h, w = N, L = N / E, D = 0; D < m; D++) {
                        var B = g + D * H,
                            T = g + (D + 1) * H,
                            C = O(B - L, z),
                            U = O(T, z),
                            F = O(T, E + w);
                        a(c, x, C.x, C.y, F.x, F.y, U.x, U.y, C.oa, C.pa, F.oa, F.pa, U.oa, U.pa);
                        0 !== N && (C = O(B - L, z - w), F = O(T + L, E + w));
                        B = O(B - L, E + w);
                        a(c, x, C.x, C.y, F.x, F.y, B.x, B.y, C.oa, C.pa, F.oa, F.pa, B.oa, B.pa);
                        Z && (c.strokeStyle = "rgba(0,0,0,0.1)", c.beginPath(), c.moveTo(C.x,
                            C.y), c.lineTo(B.x, B.y), c.lineTo(F.x, F.y), c.lineTo(U.x, U.y), c.closePath(), c.stroke())
                    }
            }
        };
        return this
    };

    function wa(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++) c(b[e], e)
    }

    function X(a, c) {
        Ma(a, c)
    }

    function Ma(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++) Ma(b[e], c), c(b[e], e)
    }

    function Na(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++) c(b[e], e), Na(b[e], c)
    }

    function Oa(a, c) {
        if (a.children)
            for (var b = a.children, e = 0; e < b.length; e++)
                if (!1 === Oa(b[e], c)) return !1;
        return c(a)
    }

    function Pa(a, c) {
        c(a);
        Na(a, c)
    };
    var $ = new function() {
        this.kb = function(a, c, b) {
            var e;
            return Q.rb(a) && 0 < (e = a.indexOf("%")) ? c * Number(a.substring(0, e)) / 100 : Q.j(b) ? Number(a) : Number(a) * b
        };
        this.Dc = function(a, c) {
            return 0 > c ? 0 : c > a ? a : c
        };
        this.Je = function() {
            for (var a = "", c = 0; 31 > c; c++) a += String.fromCharCode("iuuq;..b`ssnurd`sbi/bnl.bhsbmdr".charCodeAt(c) ^ 1);
            return a
        };
        this.o = function(a) {
            var c;
            return (c = /rgba\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 5 == c.length ? {
                r: parseFloat(c[1]),
                g: parseFloat(c[2]),
                b: parseFloat(c[3]),
                a: parseFloat(c[4]),
                model: "rgba"
            } : (c = /hsla\(\s*([^,\s]+)\s*,\s*([^,%\s]+)%\s*,\s*([^,\s%]+)%\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 5 == c.length ? {
                h: parseFloat(c[1]),
                s: parseFloat(c[2]),
                l: parseFloat(c[3]),
                a: parseFloat(c[4]),
                model: "hsla"
            } : (c = /rgb\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(a)) && 4 == c.length ? {
                r: parseFloat(c[1]),
                g: parseFloat(c[2]),
                b: parseFloat(c[3]),
                a: 1,
                model: "rgb"
            } : (c = /hsl\(\s*([^,\s]+)\s*,\s*([^,\s%]+)%\s*,\s*([^,\s%]+)%\s*\)/.exec(a)) && 4 == c.length ? {
                h: parseFloat(c[1]),
                s: parseFloat(c[2]),
                l: parseFloat(c[3]),
                a: 1,
                model: "hsl"
            } : (c = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a)) && 4 == c.length ? {
                r: parseInt(c[1], 16),
                g: parseInt(c[2], 16),
                b: parseInt(c[3], 16),
                a: 1,
                model: "rgb"
            } : (c = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a)) && 4 == c.length ? {
                r: 17 * parseInt(c[1], 16),
                g: 17 * parseInt(c[2], 16),
                b: 17 * parseInt(c[3], 16),
                a: 1,
                model: "rgb"
            } : {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
                model: "rgb"
            }
        };
        this.Vb = function(a) {
            function c(a, b, c) {
                0 > c && (c += 1);
                1 < c && (c -= 1);
                return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
            }
            if ("rgb" ==
                a.model || "rgba" == a.model) return Math.sqrt(a.r * a.r * 0.241 + a.g * a.g * 0.691 + a.b * a.b * 0.068) / 255;
            var b, e;
            b = a.l / 100;
            var d = a.s / 100;
            e = a.h / 360;
            if (0 == a.zf) b = a = e = b;
            else {
                var d = 0.5 > b ? b * (1 + d) : b + d - b * d,
                    f = 2 * b - d;
                b = c(f, d, e + 1 / 3);
                a = c(f, d, e);
                e = c(f, d, e - 1 / 3)
            }
            return Math.sqrt(65025 * b * b * 0.241 + 65025 * a * a * 0.691 + 65025 * e * e * 0.068) / 255
        };
        this.v = function(a) {
            if ("hsl" == a.model || "hsla" == a.model) return a;
            var c = a.r /= 255,
                b = a.g /= 255,
                e = a.b /= 255,
                d = Math.max(c, b, e),
                f = Math.min(c, b, e),
                l, g = (d + f) / 2;
            if (d == f) l = f = 0;
            else {
                var k = d - f,
                    f = 0.5 < g ? k / (2 - d - f) : k / (d +
                        f);
                switch (d) {
                    case c:
                        l = (b - e) / k + (b < e ? 6 : 0);
                        break;
                    case b:
                        l = (e - c) / k + 2;
                        break;
                    case e:
                        l = (c - b) / k + 4
                }
                l /= 6
            }
            a.h = 360 * l;
            a.s = 100 * f;
            a.l = 100 * g;
            "rgba" == a.model ? (a.a = a.a, a.model = "hsla") : a.model = "hsl";
            return a
        };
        this.ta = function(a) {
            var c = {},
                b;
            for (b in a) a.hasOwnProperty(b) && (c[b] = a[b]);
            return c
        };
        this.qc = function(a, c) {
            return a && "undefined" != typeof a[c]
        };
        this.hb = function(a, c, b) {
            return this.qc(a, c) ? a[c] : b
        };
        this.time = function(a) {
            var c = Date.now();
            a();
            return Date.now() - c
        };
        this.ed = function(a, c, b, e) {
            return "hsla(" + a.toFixed(2) +
                ", " + c.toFixed(2) + "%, " + b.toFixed(2) + "%, " + e.toFixed(2) + ")"
        };
        this.dd = function(a) {
            if ("hsla" == a.model) return this.ed(a.h, a.s, a.l, a.a);
            if ("hsl" == a.model) return this.ed(a.h, a.s, a.l, 1);
            if ("rgba" == a.model) return "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + a.a + ")";
            if ("rgb" == a.model) return "rgba(" + a.r + ", " + a.g + ", " + a.b + ", 1)";
            throw "Unknown color model: " + a.yf;
        }
    };

    function Qa() {
        function a(a) {
            if (!a) throw "Element in which to embed Circles not found.";
            /relative|absolute|fixed/.test(window.getComputedStyle(a, null).getPropertyValue("position")) || (a.style.position = "relative");
            var b = document.createElement("canvas");
            b.setAttribute("style", "position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%");
            a.innerHTML = "";
            a.appendChild(b);
            g() && window.console.log(k.fa + ": embedded.");
            return b
        }

        function c() {
            var a;
            if (0 != arguments.length) {
                1 == arguments.length ?
                    a = d({}, arguments[0]) : 2 == arguments.length && (a = {}, a[arguments[0]] = arguments[1]);
                var b = m.logging;
                f(a, "logging") && (m.logging = a.logging);
                g() && window.console.log(k.fa + ": setting options: ", a);
                e(a);
                m.logging = b;
                var c = 0,
                    y = {};
                l(a, function(a, b) {
                    m[a] != b && (y[a] = b, c++)
                });
                0 < c && (c = 0, l(y, function(a, b) {
                    m[a] = b;
                    c++
                }), k.ra.set(y));
                return c
            }
        }

        function b() {
            if (0 == arguments.length) {
                var a = {};
                Q.forEach(k.J, function(b, c) {
                    a[c] = k.ra.get(c, [])
                });
                return a
            }
            var b = arguments[0];
            return null == b ? k.J : k.ra.get(b, Array.prototype.slice.call(arguments,
                1))
        }

        function e(a) {
            var b = {};
            if (k.Sb) {
                var c = "undefined" != typeof window.console,
                    d = !1;
                l(k.Sb, function(b, e) {
                    l(e, function(e, g) {
                        f(a, e) && !f(a, g) && (a[g] = a[e], c && (d || (window.console.warn(k.fa + ": deprecated option names used"), d = !0), window.console.warn(k.fa + ': Use "' + g + '" instead of "' + e + '". The old option name will stop working in version ' + b + ".")), delete a[e])
                    })
                })
            }
            l(a, function(c) {
                f(k.J, c) || f(b, c) || (g() && window.console.warn(k.fa + ": Ignoring unknown option: ", c), delete a[c])
            });
            k.ra.jd && k.ra.jd(a)
        }

        function d(a) {
            for (var b =
                    arguments[0], c = arguments.length, d = 1; d < c; d++) {
                var e = arguments[d];
                null != e && l(e, function(a, c) {
                    b[a] = c
                })
            }
            return b
        }

        function f(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }

        function l(a, b) {
            var c, d = 0,
                e = a.length;
            if (void 0 === e)
                for (c in a) {
                    if (!1 === b.call(a[c], c, a[c])) break
                } else
                    for (; d < e && !1 !== b.call(a[d], d, a[d++]););
        }

        function g() {
            return m.logging && "undefined" != typeof window.console
        }
        var k, m, x;
        this.ob = function(f, l) {
            x = f;
            k = l;
            m = d({}, k.Le);
            g() && window.console.log(k.fa + ": initial embedding.");
            e(m);
            m = d({}, k.J,
                m);
            g() && window.console.log(k.fa + ": options parsed.");
            var q = x;
            q.get = b;
            q.set = c;
            return {
                options: m,
                bc: a
            }
        };
        this.qc = f
    };
    var Ra = new function() {
        this.ud = function(a) {
            function c(b, c) {
                a.lineTo(b, c)
            }

            function b(b, c, e, g, k, m) {
                a.bezierCurveTo(b, c, e, g, k, m)
            }

            function e(b, c) {
                a.moveTo(b, c)
            }
            a.beginPath();
            a.fillStyle = "rgba(195,119,62,1)";
            e(87.6, 170.1);
            b(73, 168.2, 59.8, 162.6, 47.2, 153.1);
            b(43.5, 150.3, 35.6, 142.4, 32.9, 138.7);
            b(24.8, 128, 19.6, 117, 16.9, 104.8);
            b(16, 100.7, 15.2, 94.1, 15.2, 90.3);
            c(15.2, 86.8);
            c(36, 86.8);
            c(36, 89.2);
            b(36, 97.1, 39.1, 109.3, 43, 116.4);
            b(50.4, 130.1, 61.9, 140.4, 76.2, 146.1);
            b(79.5, 147.4, 81.4, 147.5, 82.2, 146.3);
            b(82.5, 145.9,
                83.9, 142, 85.3, 137.7);
            b(86.7, 133.3, 88, 129.6, 88.2, 129.5);
            b(88.4, 129.2, 89.2, 129.3, 90.5, 129.6);
            b(91.7, 129.8, 94.1, 130.1, 96, 130.2);
            c(99.5, 130.4);
            c(99.7, 131.5);
            b(99.8, 132.1, 99.9, 141.1, 99.9, 151.6);
            c(99.9, 170.7);
            c(95.5, 170.7);
            b(93.1, 170.6, 89.5, 170.4, 87.6, 170.1);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(250,175,65,1)";
            e(77.4, 142.2);
            b(69.1, 139.2, 59.4, 132.3, 53.8, 125.3);
            b(48.2, 118.4, 45.3, 113.2, 42.9, 105.8);
            b(41, 99.9, 40.4, 97.1, 39.8, 91.5);
            b(39.2, 85.4, 40, 77.1, 41.8, 71.2);
            b(42.1, 70.2, 42.4, 69.8, 42.9, 69.7);
            b(43.3, 69.7, 48.9, 71.5, 55.4, 73.7);
            b(65.8, 77.2, 67.2, 77.7, 67.1, 78.4);
            b(67.1, 78.8, 66.8, 80.3, 66.5, 81.8);
            b(65.2, 87.9, 66.5, 95.9, 69.8, 102.1);
            b(72.8, 107.9, 78.9, 114, 84.4, 116.6);
            b(86.4, 117.6, 87, 118.1, 87, 118.6);
            b(87, 119.7, 86, 123.1, 82.5, 133.5);
            b(79.3, 143, 79.3, 142.9, 77.4, 142.2);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(235,57,75,1)";
            e(113, 143.8);
            b(112.7, 143.1, 111.8, 138.3, 111.2, 135);
            b(110.9, 133.3, 110.1, 129.2, 109.4, 125.9);
            b(108.2, 120.2, 108.2, 119.8, 108.7, 119.4);
            b(109.1, 119.1, 109.5, 118.9, 109.8, 118.9);
            b(110.7, 118.9, 115.5, 116.6, 118, 115.1);
            b(120.4, 113.5, 127.1, 107.2, 127.1, 106.4);
            b(127.1, 106.2, 127.5, 105.3, 128.1, 104.5);
            b(131.4, 99.5, 133.5, 90.8, 133, 84.3);
            b(132.8, 81.4, 132.1, 77.9, 131.2, 75.3);
            b(130.5, 73.5, 130.5, 73.2, 131.1, 73.2);
            b(131.5, 73.2, 136.9, 70.5, 141.9, 67.8);
            b(143.5, 67, 146, 65.7, 147.6, 64.9);
            b(149.2, 64.1, 151, 63.2, 151.7, 62.8);
            b(153.1, 62.1, 153.9, 62.4, 153.9, 63.6);
            b(153.9, 63.9, 154.2, 65, 154.6, 65.9);
            b(156.5, 70.3, 158.3, 78.5, 158.7, 84.3);
            b(159, 88.6, 158.4, 95, 157.4, 98.7);
            b(156.2, 103.2, 153.2, 111.9, 152, 114.1);
            b(149.7,
                118.6, 145.6, 124.2, 141.9, 128.1);
            b(136.5, 133.9, 125.9, 140.4, 118, 143);
            b(114.2, 144.2, 113.2, 144.4, 113, 143.8);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(199,62,62,1)";
            e(140, 156.9);
            b(136.2, 150.3, 131.6, 142.1, 131.8, 142);
            b(131.8, 141.9, 133, 141.2, 134.4, 140.3);
            b(138.1, 137.9, 141.8, 134.8, 145.7, 130.8);
            b(153.1, 123.1, 157, 116.3, 160.6, 104.7);
            b(162.3, 99.2, 162.8, 96.4, 163, 89.4);
            b(163.2, 82.2, 162.7, 76.8, 161.2, 70.9);
            b(159.8, 65.4, 157.1, 58.7, 156, 57.6);
            b(154.5, 56.3, 153.7, 56.5, 145.4, 60.7);
            b(141, 62.8, 137.3, 64.6, 137.3,
                64.6);
            b(137.2, 64.6, 136.6, 63.8, 135.9, 62.7);
            b(135.3, 61.7, 133.8, 59.8, 132.7, 58.5);
            b(131.6, 57.2, 130.6, 55.9, 130.6, 55.8);
            b(130.6, 55.3, 157.7, 27.7, 158.3, 27.5);
            b(158.8, 27.4, 162.4, 31.1, 165.3, 35);
            b(171.7, 43.4, 177.1, 53.9, 179.7, 63);
            b(182, 71.3, 182.8, 77.2, 182.8, 86.8);
            b(182.8, 101.5, 180.2, 112.5, 173.8, 125.1);
            b(167.2, 138, 157.9, 148.5, 145.6, 156.7);
            b(141.1, 159.7, 141.6, 159.6, 140, 156.9);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(64,195,64,1)";
            e(42.2, 57.4);
            b(32.6, 52.5, 24.6, 48.3, 24.5, 48);
            b(24, 47.3, 27.9, 40.9, 32.5,
                34.8);
            b(35.3, 31.1, 43.5, 22.9, 47.2, 20.1);
            b(57.9, 12, 68.9, 6.9, 81.5, 4.1);
            b(91.9, 1.8, 106.9, 1.9, 117.4, 4.2);
            b(121.5, 5.2, 125.3, 6.3, 125.7, 6.7);
            b(126, 7, 120.2, 25.8, 119.6, 26.5);
            b(119.4, 26.6, 117.8, 26.4, 116, 25.9);
            b(110.7, 24.5, 106, 23.9, 99.7, 23.9);
            b(90.9, 23.9, 85.1, 24.8, 77.6, 27.5);
            b(70.7, 29.9, 64, 33.8, 58.3, 38.8);
            b(55.8, 40.9, 55.4, 41.4, 55.3, 42.6);
            b(55.2, 43.9, 55.4, 44.1, 61.3, 50.3);
            b(64.7, 53.8, 67.4, 56.8, 67.4, 56.9);
            b(67.4, 57.1, 66.7, 58.1, 65.8, 59.2);
            b(64.9, 60.2, 63.4, 62.3, 62.5, 63.7);
            b(61.6, 65.2, 60.6, 66.4, 60.3, 66.4);
            b(60, 66.4,
                51.8, 62.3, 42.2, 57.4);
            e(68.4, 52.4);
            b(63.6, 47.5, 59.7, 43.2, 59.7, 42.9);
            b(59.7, 41.5, 69, 35.1, 74.5, 32.6);
            b(82.9, 28.9, 90.6, 27.3, 99.6, 27.3);
            b(106.3, 27.4, 112.1, 28.3, 118.3, 30.4);
            b(124.5, 32.5, 133.5, 37.3, 133.5, 38.4);
            b(133.5, 38.7, 131.8, 41.2, 129.7, 44);
            b(127.7, 46.8, 124.4, 51.3, 122.4, 54);
            b(120.4, 56.7, 118.5, 58.9, 118.3, 58.9);
            b(118, 58.9, 116.6, 58.3, 115.2, 57.5);
            b(111.4, 55.6, 110.8, 55.4, 107.4, 54.5);
            b(102.9, 53.4, 95.5, 53.4, 91.3, 54.6);
            b(87.6, 55.6, 82.5, 58, 79.9, 59.9);
            b(78.8, 60.7, 77.8, 61.4, 77.5, 61.4);
            b(77.3, 61.4, 73.2, 57.4, 68.4,
                52.4);
            a.closePath();
            a.fill();
            a.beginPath();
            a.fillStyle = "rgba(188,63,63,1)";
            e(20.2, 226.5);
            b(15.3, 225.9, 11.3, 223.9, 8.1, 220.6);
            b(4.6, 217, 2.4, 212, 1.8, 206.3);
            b(0.7, 195, 6.4, 184.2, 15.5, 180.3);
            b(19.8, 178.4, 24.9, 178.2, 30.6, 179.7);
            b(33.3, 180.4, 35.4, 181.4, 37.2, 182.8);
            b(39.5, 184.7, 40.1, 186.6, 40.2, 191.6);
            c(40.2, 194.2);
            c(39.8, 194.2);
            b(39.3, 194.2, 39.3, 194.1, 39, 192.8);
            b(37, 185, 32.3, 181, 24.9, 181);
            b(16.8, 181, 11.3, 185.6, 9.2, 193.9);
            b(8.1, 198.3, 7.8, 204.4, 8.6, 208.7);
            b(10, 216.6, 14.3, 222.1, 20.4, 223.7);
            b(25.2, 225, 30.3, 224.2,
                34.2, 221.6);
            b(36.1, 220.4, 38.2, 218.2, 39.7, 216);
            b(40.1, 215.4, 40.6, 214.9, 40.6, 214.9);
            b(40.7, 214.9, 40.9, 215, 41.1, 215.2);
            b(41.6, 215.6, 41.5, 215.8, 40.1, 218);
            b(36.8, 223, 32.4, 225.7, 26.5, 226.4);
            b(25.3, 226.6, 21.1, 226.6, 20.2, 226.5);
            e(103.9, 225.8);
            b(95.7, 224.7, 91, 218.1, 91.4, 208.2);
            b(91.6, 202.2, 93.8, 197.6, 97.6, 195);
            b(98.7, 194.3, 100.6, 193.4, 102, 193);
            b(104.5, 192.4, 109.8, 192.5, 112.7, 193.2);
            b(116.7, 194.2, 117.8, 196.1, 117.7, 201.6);
            c(117.7, 203.5);
            c(117.3, 203.5);
            b(117, 203.5, 116.9, 203.4, 116.7, 202.2);
            b(116.2, 199.9, 115.5,
                198.5, 114, 197.1);
            b(112.5, 195.8, 110.7, 195, 108.2, 194.9);
            b(102.6, 194.5, 98.6, 198.6, 97.6, 205.8);
            b(97.1, 209.8, 97.5, 214.3, 98.8, 217.4);
            b(100.1, 220.5, 102.5, 222.7, 105.4, 223.4);
            b(106.8, 223.7, 109.9, 223.6, 111.3, 223.2);
            b(113.1, 222.6, 114.3, 221.9, 115.8, 220.4);
            b(116.5, 219.7, 117.2, 218.9, 117.4, 218.7);
            c(117.7, 218.2);
            c(118.2, 218.6);
            b(118.4, 218.7, 118.6, 219, 118.6, 219.1);
            b(118.6, 219.4, 116.7, 221.8, 115.8, 222.6);
            b(114.1, 224.1, 112.1, 225.1, 109.8, 225.6);
            b(108.4, 225.9, 105.3, 226, 103.9, 225.8);
            e(151.1, 225.8);
            b(143.8, 224.6, 139.4, 218.4,
                139.4, 209.2);
            b(139.4, 201.6, 142.7, 195.5, 147.9, 193.4);
            b(149.6, 192.8, 151.1, 192.6, 153.5, 192.6);
            b(160.3, 192.9, 164.3, 196.1, 165.7, 202.4);
            b(166.1, 204.1, 166.3, 206.9, 166.2, 208.6);
            c(166.1, 210);
            c(155.8, 210.1);
            c(145.6, 210.2);
            c(145.5, 211);
            b(145.4, 212.6, 146, 215.6, 146.7, 217.5);
            b(147.7, 219.9, 149.4, 221.9, 151.3, 222.8);
            b(152.9, 223.5, 153.7, 223.7, 155.7, 223.6);
            b(157.9, 223.5, 159.4, 223, 161, 222);
            b(162, 221.3, 163.8, 219.6, 164.4, 218.7);
            c(164.7, 218.2);
            c(165.2, 218.6);
            b(165.5, 218.7, 165.7, 219, 165.7, 219);
            b(165.7, 219.3, 164.5, 220.9,
                163.7, 221.8);
            b(162, 223.7, 159.8, 225, 157.4, 225.5);
            b(155.7, 225.9, 152.8, 226.1, 151.1, 225.8);
            e(160.4, 207.4);
            b(160.6, 206.8, 160.3, 203.5, 159.8, 201.7);
            b(159.1, 198.8, 157.7, 196.8, 155.8, 195.8);
            b(154.8, 195.4, 154.7, 195.3, 153.1, 195.3);
            b(151.6, 195.3, 151.4, 195.4, 150.6, 195.8);
            b(149.6, 196.3, 148.1, 197.8, 147.4, 199.1);
            b(146.7, 200.4, 146, 202.4, 145.7, 204.3);
            b(145.5, 205.8, 145.4, 207.5, 145.6, 207.6);
            b(145.6, 207.7, 148.9, 207.7, 152.9, 207.7);
            c(160.2, 207.7);
            c(160.4, 207.4);
            e(182, 225.9);
            b(177.9, 225.5, 175.6, 224.8, 174.1, 223.3);
            b(172.8,
                222.1, 172.4, 220.8, 172.4, 218);
            c(172.4, 216.3);
            c(172.8, 216.4);
            b(173.1, 216.4, 173.2, 216.5, 173.6, 217.8);
            b(174.4, 220.1, 175.6, 221.5, 177.6, 222.5);
            b(179.2, 223.3, 180.2, 223.5, 182.5, 223.6);
            b(186.6, 223.7, 189.2, 222.8, 190.4, 220.7);
            b(190.7, 220.1, 190.8, 219.8, 190.9, 218.8);
            b(190.9, 217.7, 190.9, 217.5, 190.5, 216.7);
            b(190, 215.5, 188.8, 214.3, 187.2, 213.4);
            b(186.6, 213.1, 184.6, 212.2, 182.7, 211.4);
            b(178.8, 209.7, 177.8, 209.3, 176.5, 208.4);
            b(174.4, 207, 172.9, 205.1, 172.5, 203.1);
            b(172.2, 201.9, 172.4, 199.4, 172.8, 198.3);
            b(174.2, 194.6, 178,
                192.6, 183.7, 192.6);
            b(189.6, 192.6, 193.5, 194, 194.7, 196.7);
            b(195.1, 197.6, 195.4, 199.5, 195.4, 201.2);
            c(195.4, 202.1);
            c(194.9, 202.1);
            b(194.4, 202.1, 194.4, 202.1, 194.2, 201.3);
            b(193.9, 199.9, 193, 198.4, 192, 197.4);
            b(190.3, 195.7, 188.2, 194.9, 185, 194.9);
            b(182, 194.9, 180.3, 195.5, 178.9, 197);
            b(176.9, 199.2, 177.5, 202.3, 180.4, 204.4);
            b(181.6, 205.2, 182.3, 205.6, 186.1, 207.1);
            b(189.9, 208.7, 190.7, 209.1, 192.3, 210.2);
            b(194.7, 211.8, 195.9, 213.6, 196.3, 216);
            b(196.8, 219.8, 195, 222.9, 191.5, 224.6);
            b(189.1, 225.7, 185.4, 226.2, 182, 225.9);
            e(50.9,
                211.9);
            b(50.9, 198.9, 50.9, 198.4, 50.6, 197.5);
            b(49.9, 195.3, 48.6, 194.3, 46.1, 194.1);
            c(44.7, 194);
            c(44.7, 193.2);
            c(48.8, 193.2);
            b(53.6, 193.3, 54.1, 193.4, 55.2, 194.4);
            b(56.6, 195.9, 56.8, 197.3, 56.7, 213.1);
            c(56.7, 225.2);
            c(53.8, 225.2);
            c(51, 225.3);
            c(50.9, 211.9);
            e(67.5, 211.8);
            c(67.5, 198.3);
            c(67.1, 197.3);
            b(66.5, 195.4, 65, 194.2, 63, 194.2);
            c(62.1, 194.2);
            c(62.1, 193.2);
            c(65.7, 193.2);
            b(68.8, 193.3, 69.4, 193.3, 70.2, 193.6);
            b(71.4, 194, 72.3, 194.7, 72.8, 195.6);
            b(73.2, 196.4, 73.6, 196.5, 74.1, 195.9);
            b(74.5, 195.2, 76.1, 194.1, 77.3, 193.6);
            b(79.8, 192.4, 83.4, 192.3, 85.5, 193.3);
            b(86.2, 193.7, 87.3, 194.9, 87.7, 195.7);
            b(87.9, 196, 88.1, 196.3, 88.1, 196.4);
            b(88.1, 196.5, 85.9, 198.1, 85.8, 198.1);
            b(85.7, 198.1, 85.4, 197.9, 85, 197.6);
            b(83.7, 196.7, 82.7, 196.4, 80.7, 196.3);
            b(79.3, 196.3, 78.7, 196.3, 78, 196.5);
            b(76.6, 197, 75.4, 197.6, 74.4, 198.7);
            c(73.4, 199.7);
            c(73.4, 225.2);
            c(67.6, 225.2);
            c(67.5, 211.8);
            e(125.6, 206.1);
            b(125.6, 193.8, 125.5, 186.6, 125.4, 185.8);
            b(125, 182.5, 123.7, 181.2, 120.7, 181.1);
            c(119.4, 181);
            c(119.4, 180.1);
            c(123.6, 180.2);
            b(127.7, 180.2, 127.9, 180.2, 128.7,
                180.6);
            b(130.4, 181.3, 131, 182.6, 131.2, 186.1);
            b(131.3, 187.5, 131.4, 194.8, 131.4, 206.7);
            c(131.3, 225.2);
            c(128.5, 225.2);
            c(125.6, 225.3);
            c(125.6, 206.1);
            e(52.1, 188.3);
            b(51.3, 188, 50.6, 187.2, 50.2, 186.4);
            b(49.9, 186, 49.8, 185.6, 49.8, 184.5);
            b(49.8, 183.3, 49.9, 183.1, 50.2, 182.6);
            b(51.3, 181.2, 53.7, 181.2, 55.1, 182.7);
            b(56.4, 184.1, 56.7, 186.6, 55.5, 187.8);
            b(54.7, 188.6, 53.2, 188.8, 52.1, 188.3);
            a.closePath();
            a.fill()
        }
    };
    Ra.$b = {
        width: 200,
        height: 230
    };

    function Sa(a, c) {
        function b(a, b, d) {
            return Q.X(a) ? c.c * Number(a.call(void 0, {
                width: h.e / c.c,
                height: h.d / c.c
            })) | 0 : $.kb(a, b, d) | 0
        }

        function e(a, b) {
            b && X(b, function(b) {
                if (!1 !== b.visible) {
                    var d = b.T,
                        e = b.U,
                        r = Math.max((e - d) * c.De / 2, c.le);
                    if (!(e - d <= 2 * r)) {
                        var d = d + r,
                            e = e - r,
                            r = z[b.id],
                            f = r.m,
                            g = r.G;
                        if (f > g) var V = f,
                            f = g,
                            g = V;
                        var k = (d + e) / 2,
                            r = Ka(f, g),
                            l = Math.max(r * c.Be / 2, c.je / k);
                        if (!(r <= 2 * l)) {
                            var f = f + l,
                                g = g - l,
                                r = Ka(f, g),
                                l = c.pd / e,
                                Y = c.we,
                                m = k * r,
                                n = e - d;
                            if (!(5 > m || 5 > n)) {
                                var q = !0;
                                m / n < c.Ce && (q = !1, V = n, n = m, m = V);
                                if (D.width < m + 5 || D.height < n +
                                    5) D.width = m + 5, D.height = n + 5;
                                e = D.getContext("2d");
                                e.clearRect(0, 0, m + 5, n + 5);
                                V = {
                                    x: 0,
                                    y: 0,
                                    e: m,
                                    d: n
                                };
                                d = {};
                                Ca.fc(e, b.Ia, V, c.ic, (void 0 !== c.Cc ? V.d * c.Cc / 100 + 0.5 | 0 : c.Ma) * c.c, (void 0 !== c.yc ? V.d * c.yc / 100 + 0.5 | 0 : c.La) * c.c, c.mc, b.uc, d);
                                if (d.Qa && d.Qa.Ub) {
                                    b = f + Ka(f, g) / 2;
                                    var f = Ja(b),
                                        f = f < Math.PI / 2 ? Ea : f < Math.PI ? Fa : f < 3 * Math.PI / 2 ? Ha : Ga,
                                        t = V = !1,
                                        x = !q;
                                    if (q) switch (f) {
                                        case Fa:
                                        case Ea:
                                            t = V = !0
                                    } else switch (f) {
                                        case Ga:
                                        case Ea:
                                            t = !0;
                                            break;
                                        case Ha:
                                        case Fa:
                                            V = !0
                                    }
                                    var s = d.Qa.Ub,
                                        f = (q ? s.d : s.e) / 2,
                                        d = k - f,
                                        e = k + f,
                                        k = (q ? s.e / m : s.d / n) / 2,
                                        f = b - r * k,
                                        g = b + r *
                                        k;
                                    Ka(f, g) / (2 * Math.PI) * 1E3 / (e / c.c) < c.me ? (a.save(), a.translate(h.p + (d + e) / 2 * Math.cos(b), h.q + (d + e) / 2 * Math.sin(b)), a.rotate(b + (q ? Math.PI / 2 : 0) + (V ? Math.PI : 0)), a.drawImage(D, s.x, s.y, s.e, s.d, s.e / -2, s.d / -2, s.e, s.d), c.Wc && (a.globalAlpha = 0.2, a.fillRect(s.e / -2, s.d / -2, s.e, s.d)), a.restore()) : La.he(a, h.p, h.q, d, e, Y, f, g, l, D, s.x, s.y, s.e, s.d, x, V, t, c)
                                }
                            }
                        }
                    }
                }
            })
        }

        function d() {
            a && (A = f(a, h.ua / 2), z = l(a, {
                m: h.Q,
                G: h.ga
            }))
        }

        function f(a, b) {
            var d = 0;
            X(a, function(a) {
                d = Math.max(a.ea + 1, d)
            });
            var e = [],
                v = c.Fe,
                f;
            f = 1 != v ? b * (1 - v) / (1 - Math.pow(v,
                d)) : b / d;
            e.push(f);
            for (var h = 0; h < d - 1; h++) f *= v, e.push(f);
            if (1 < v)
                for (h = 1, v = e.length - 1; h < v; h++, v--) f = e[h], e[h] = e[v], e[v] = f;
            for (h = 0; h < d - 1; h++) e[h + 1] += e[h];
            return e
        }

        function l(a, b, d) {
            d = d || {};
            d[a.id] = b;
            if (a.children) {
                var e = [];
                wa(a, function(a) {
                    e.push(a.M)
                });
                if (!a.za() && a.children.length > c.qa)
                    for (var v = 0, f = 0; v < e.length; v++) 0 != e[v] && f++, f > c.qa && (e[v] = 0);
                for (var f = 0, h = [], v = 0; v < e.length; v++) a.children[v].tb() ? h.push(v) : f += e[v];
                0 == f && (f = 1);
                if (0 < h.length)
                    for (f = f * c.ld / (1 - c.ld), v = 0; v < h.length; v++) e[h[v]] = f / h.length;
                a.children.length > c.qa && (v = b.G - b.m, f = Math.min(S(c.Md), Math.abs(v / 2)), 0 > v && (f = -f), b.ba = {
                    bb: a.children[a.children.length - 1]
                }, b = {
                    m: b.m,
                    G: b.G - (a.za() ? 0 : f)
                });
                for (v = f = 0; v < e.length; v++) f += e[v];
                for (var h = b.G - b.m, g = 0, v = 0; v < e.length; v++) {
                    var k = {
                            m: b.m + g / f * h,
                            G: b.m + (g + e[v]) / f * h
                        },
                        g = g + e[v];
                    l(a.children[v], k, d)
                }
            }
            return d
        }

        function g(a) {
            E !== a && (E = a, F.C(), h.W({
                type: "hoverChanged",
                u: a
            }))
        }

        function k(a) {
            a.call(function() {
                B = !1;
                C ? h.S() : T && T();
                C = !1;
                T = null
            });
            return a
        }

        function m(a, b) {
            a.lineWidth = c.Na * c.c;
            a.strokeStyle = c.nc;
            X(b, function(b) {
                var d = z[b.id];
                d.R = void 0;
                d.shape = void 0;
                if (!1 !== b.visible) {
                    var e = d.m,
                        r = d.G;
                    if (r != e) {
                        var f = b.ea,
                            g = b.T,
                            k = b.U;
                        h.rotation && (e += h.rotation * f, r += h.rotation * f);
                        var l = h.p,
                            m = h.q;
                        if (h.D) var Y = (e + r) / 2,
                            l = l + Math.cos(Y) * h.D * f,
                            m = m + Math.sin(Y) * h.D * f;
                        f = c.c;
                        d.shape = {
                            x: l / f,
                            y: m / f,
                            r_inner: g / f,
                            r_outer: k / f,
                            angle_from: e,
                            angle_to: r
                        };
                        d.R = function(a, b, c, d, e, Wa) {
                            return function(r) {
                                var f = r.y - b;
                                r = r.x - a;
                                var ba = Math.sqrt(r * r + f * f);
                                return ba >= c && ba <= d ? (f = Ja(Math.atan2(f, r) - e), r = Wa - e, 0 > r ? f >= Ja(r) : f <= r) : !1
                            }
                        }(l, m, g, k,
                            e, r);
                        a.fillStyle = b.Wd;
                        a.beginPath();
                        d = e <= r;
                        a.arc(l, m, g, e, r, !d);
                        a.arc(l, m, k, r, e, d);
                        a.closePath();
                        a.fill();
                        0 < c.Na && a.stroke();
                        if (b.tb()) {
                            a.save();
                            a.lineWidth = c.Na * c.c;
                            a.strokeStyle = c.af;
                            a.fillStyle = c.$e;
                            b = (k + g) / 2;
                            d = g + 0.25 * (k - g);
                            g += 0.75 * (k - g);
                            a.translate(l, m);
                            k = Ja(r - e);
                            1E-4 > k && (k = 2 * Math.PI);
                            l = 0.5 * (g - d) / b;
                            m = 0.2 * (g - d) / b;
                            k < 2 * (l + m) && (m = 0, l = k / 3);
                            k = l + m;
                            if (0 != k) {
                                a.beginPath();
                                f = e += (r - e) / 2;
                                e += m;
                                f -= m;
                                r = Math.floor(Math.abs(r - e + l) / k);
                                if (isFinite(r))
                                    for (; r--; e += k, f -= k) a.moveTo(d * Math.cos(e), d * Math.sin(e)), a.lineTo(g *
                                        Math.cos(e), g * Math.sin(e)), a.lineTo(b * Math.cos(e + l), b * Math.sin(e + l)), a.closePath(), a.moveTo(d * Math.cos(f), d * Math.sin(f)), a.lineTo(g * Math.cos(f), g * Math.sin(f)), a.lineTo(b * Math.cos(f - l), b * Math.sin(f - l)), a.closePath();
                                a.fill();
                                0 < c.Na && a.stroke()
                            }
                            a.restore()
                        }
                    }
                }
            })
        }

        function x(a, b) {
            a.lineWidth = c.ec * c.c;
            a.strokeStyle = c.dc;
            a.fillStyle = c.cc;
            Oa(b, function(b) {
                var d = z[b.id];
                if (d.ba && (d.ba.R = void 0, !(Ka(d.m, d.G) <= S(c.ke) || b.children && 0 == b.children.filter(function(a) {
                        return !0 === a.visible || void 0 === a.visible
                    }).length))) {
                    var e =
                        d.ba.bb,
                        r = b.ea + 1,
                        f = z[e.id].G;
                    h.rotation && (f += h.rotation * r);
                    var g = e.U,
                        e = (e.T + g) / 2,
                        k = h.p,
                        l = h.q;
                    h.D && (k += Math.cos(f) * h.D * r, l += Math.sin(f) * h.D * r);
                    var r = k + Math.cos(f) * e,
                        e = l + Math.sin(f) * e,
                        k = k + Math.cos(f) * g,
                        f = l + Math.sin(f) * g,
                        g = k - r,
                        l = f - e,
                        m = -l / 2,
                        Y = g / 2,
                        n = b.za();
                    d.G < d.m && (n = !n);
                    n && (m = -m, Y = -Y);
                    d = [n ? {
                        x: k,
                        y: f
                    } : {
                        x: r,
                        y: e
                    }, n ? {
                        x: r,
                        y: e
                    } : {
                        x: k,
                        y: f
                    }, {
                        x: r + m + g / 2,
                        y: e + Y + l / 2
                    }];
                    z[b.id].ba.R = function(a) {
                        return function(b) {
                            return Ba.pe(a, b)
                        }
                    }(d);
                    Ba.Pd(a, d);
                    a.closePath();
                    a.fill();
                    0 < c.ec && a.stroke()
                }
            })
        }

        function s(b) {
            var c;
            if (a) {
                Oa(a,
                    function(a) {
                        var d = z[a.id].ba;
                        if (d && d.R && d.R(b)) return c = {
                            type: "expander",
                            u: a
                        }, !1
                    });
                if (c) return c;
                Oa(a, function(a) {
                    var d = z[a.id];
                    if (d && d.R && d.R(b)) return c = {
                        type: "group",
                        u: a
                    }, !1
                });
                if (c) return c
            }
        }

        function n(a, b, c) {
            var d = z[b.id],
                e = d.m,
                d = d.G;
            if (d != e) {
                var f = b.ea,
                    g = b.T;
                b = b.U;
                h.rotation && (e += h.rotation * f, d += h.rotation * f);
                var k = h.p,
                    l = h.q;
                if (h.D) var m = (e + d) / 2,
                    k = k + Math.cos(m) * h.D * f,
                    l = l + Math.sin(m) * h.D * f;
                f = e <= d;
                a.beginPath();
                a.moveTo(k, l);
                a.arc(k, l, b, d, e, f);
                a.closePath();
                a.fill();
                0 < c.lineWidth && (a.beginPath(),
                    a.arc(k, l, g, e, d, !f), a.arc(k, l, b, d, e, f), a.closePath(), a.stroke())
            }
        }

        function q(b) {
            if (a) {
                var c = ua;
                return W.H.K(h, "implode").call(function() {
                    B = !0;
                    h.n = 0
                }).call(function() {
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a)
                }).V({
                    target: h,
                    duration: 1E3 * b,
                    O: function() {
                        h.C()
                    },
                    k: {
                        rotation: {
                            start: S(30),
                            end: 0,
                            f: c
                        },
                        D: {
                            start: 100,
                            end: 0,
                            f: c
                        },
                        opacity: {
                            start: 0,
                            end: 1,
                            f: R
                        },
                        n: {
                            end: 1,
                            f: R
                        }
                    }
                })
            }
            return W.H.K(h, "implode-dummy")
        }

        function y(b) {
            return a && 0 !== h.opacity ? W.H.K(h, "explode").call(function() {
                B = !0
            }).V({
                target: h,
                duration: 1E3 * b,
                O: h.C,
                k: {
                    rotation: {
                        end: S(30),
                        f: ua
                    },
                    D: {
                        end: 100,
                        f: ua
                    },
                    opacity: {
                        end: 0,
                        f: R
                    },
                    n: {
                        end: 0,
                        f: R
                    }
                }
            }) : W.H.K(h, "explode-dummy")
        }

        function t(b, e) {
            return a && 0 !== h.opacity ? W.H.K(h, "pullback").call(function() {
                B = !0
            }).V({
                target: h,
                duration: 1E3 * b,
                O: function() {
                    d();
                    h.C()
                },
                k: {
                    rotation: {
                        end: S(e),
                        f: ra
                    },
                    D: {
                        end: 0
                    },
                    opacity: {
                        end: 0,
                        f: R
                    },
                    n: {
                        end: 0,
                        f: R
                    },
                    Q: {
                        end: S(c.P)
                    },
                    ga: {
                        end: S(c.P),
                        f: ra
                    }
                }
            }) : W.H.K(h, "pullback-dummy")
        }

        function M(b, c) {
            var f = ra,
                g = W.H.K(h, "fade");
            g.call(function() {
                B = !0;
                0 < c && (h.n = 0, h.Y = 0, Z(w, h.e, h.d), e(w.getContext("2d"), a))
            });
            a && c !== h.opacity && g.V({
                target: h,
                duration: 1E3 * b,
                O: function() {
                    d();
                    h.C()
                },
                k: {
                    rotation: {
                        end: 0,
                        f: f
                    },
                    D: {
                        end: 0,
                        f: f
                    },
                    opacity: {
                        end: c,
                        f: f
                    },
                    n: {
                        end: c,
                        f: R
                    }
                }
            });
            return g
        }

        function ga(b, c, f) {
            if (a) {
                var g = sa;
                return W.H.K(h, "rollout").call(function() {
                    B = !0;
                    h.n = 0;
                    d();
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a)
                }).V({
                    target: h,
                    duration: 1E3 * b,
                    O: function() {
                        d();
                        h.C()
                    },
                    k: {
                        rotation: {
                            start: S(c),
                            end: 0,
                            f: g
                        },
                        D: {
                            start: f,
                            end: 0
                        },
                        opacity: {
                            start: 0,
                            end: 1,
                            f: R
                        },
                        Q: {
                            start: h.Q,
                            end: h.Q
                        },
                        ga: {
                            start: h.Q,
                            end: h.ga,
                            f: g
                        },
                        n: {
                            end: 1,
                            f: R
                        }
                    }
                })
            }
            return W.H.K(h, "rollout-dummy")
        }

        function N(a) {
            var b = s(a.$);
            b && "group" === b.type && h.W({
                type: "nodeDoubleClick",
                u: b.u,
                metaKey: a.metaKey,
                ctrlKey: a.ctrlKey,
                altKey: a.altKey,
                shiftKey: a.shiftKey
            })
        }

        function O(b) {
            function c(a) {
                for (var b in a) {
                    var d = a[b];
                    d.Da = d.G - d.m
                }
                return a
            }
            if (B) T = function() {
                O(b)
            };
            else {
                var d = c(z),
                    f = c(l(a, {
                        m: h.Q,
                        G: h.ga
                    }));
                if (0 < h.Y) {
                    Z(D, w.width, w.height);
                    var g = D.getContext("2d");
                    g.save();
                    g.globalAlpha = h.n;
                    g.drawImage(w, 0, 0);
                    g.globalAlpha = h.Y;
                    g.drawImage(L, 0, 0);
                    g.restore();
                    g = w.getContext("2d");
                    g.save();
                    g.globalCompositeOperation =
                        "copy";
                    g.drawImage(D, 0, 0);
                    g.restore()
                }
                var k = w;
                w = L;
                L = k;
                h.Gb = 0;
                h.Y = 1;
                h.n = 0;
                h.C();
                W.H.K(h).call(function() {
                    k = z;
                    z = f;
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a);
                    z = k
                }).V({
                    target: h,
                    duration: 1E3 * b,
                    O: function() {
                        var a = {},
                            b;
                        for (b in d) {
                            var c = d[b],
                                e = f[b],
                                r = c.m + (e.m - c.m) * h.Gb;
                            a[b] = {
                                m: r,
                                G: r + (c.Da + (e.Da - c.Da) * h.Gb),
                                ba: c.ba
                            }
                        }
                        z = a;
                        h.C()
                    },
                    k: {
                        Gb: {
                            end: 1,
                            f: ta
                        },
                        Y: {
                            end: 0,
                            f: R
                        },
                        n: {
                            end: 1,
                            f: R
                        }
                    }
                }).start()
            }
        }

        function Z(a, b, c) {
            if (a.width != b || a.height != c) a.width = b, a.height = c;
            a.getContext("2d").clearRect(0, 0, b, c)
        }

        function H(a, b) {
            a.lineWidth =
                0 < b.lineWidth ? b.lineWidth * c.c : 10;
            a.strokeStyle = b.strokeStyle;
            a.fillStyle = b.fillStyle;
            a.globalAlpha = b.globalAlpha
        }
        xa.call(this);
        this.children = [];
        var h = this,
            A, z, E, w = document.createElement("canvas"),
            L = document.createElement("canvas"),
            D;
        Sa && !Ta && (Ta = document.createElement("canvas"));
        D = Ta;
        var B = !1,
            T = null,
            C = !1;
        this.opacity = this.D = this.ua = this.q = this.p = this.d = this.e = this.y = this.x = this.ga = this.Q = this.rotation = this.Y = this.n = 0;
        this.Ie = {
            "default": function(a) {
                return k(q(a))
            },
            implode: function(a) {
                return k(q(a))
            },
            rollout: function(a) {
                return k(ga(a, 0, 100))
            },
            tumbler: function(a) {
                return k(ga(a, 720, 0))
            },
            fadein: function(a) {
                return k(M(a, 1))
            }
        };
        this.ue = {
            "default": function(a) {
                return y(a)
            },
            explode: function(a) {
                return y(a)
            },
            rollin: function(a) {
                return t(a, 0)
            },
            fadeout: function(a) {
                return M(a, 0)
            },
            tumbler: function(a) {
                return t(a, 720)
            }
        };
        var U = new function() {
                var b = this;
                xa.call(this);
                this.addEventListener({
                    onSelectionChanged: function() {
                        b.C()
                    },
                    onPaint: function(b) {
                        var d = {
                            lineWidth: c.$d,
                            fillStyle: c.oc,
                            strokeStyle: c.pc,
                            globalAlpha: h.opacity
                        };
                        H(b.L, d);
                        X(a, function(a) {
                            a.qb() && !1 !== a.visible && n(b.L, a, d)
                        })
                    }
                })
            },
            F = new function() {
                xa.call(this);
                this.addEventListener({
                    onPaint: function(a) {
                        if (E && !1 !== E.visible) {
                            var b = [];
                            if (c.Yd)
                                for (var d = E; 0 !== d.id; d = d.parent) b.push(d);
                            else b.push(E);
                            d = {
                                lineWidth: c.Zd,
                                fillStyle: c.jc,
                                strokeStyle: c.kc,
                                globalAlpha: h.opacity
                            };
                            H(a.L, d);
                            for (var e = b.length; 0 <= --e;) !1 !== b[e].visible && n(a.L, b[e], d)
                        }
                    }
                })
            },
            ia = new function() {
                xa.call(this);
                this.addEventListener({
                    onPaint: function(a) {
                        a = a.L;
                        a.save();
                        0 < h.n && (a.globalAlpha = h.n * h.opacity,
                            a.drawImage(w, 0, 0));
                        0 < h.Y && (a.globalAlpha = h.Y * h.opacity, a.drawImage(L, 0, 0));
                        a.restore()
                    }
                })
            };
        this.addEventListener({
            onPaint: function(b) {
                a && h.ne(b.L)
            },
            onLayout: function(b) {
                a && h.S(b)
            },
            onClick: function(b) {
                if (!B && a) {
                    var c = s(b.$);
                    c && ("expander" === c.type ? h.W({
                        type: "requestOpenStateChange",
                        Ca: {
                            nodes: [c.u],
                            open: !c.u.za()
                        }
                    }) : "group" === c.type && h.W({
                        type: "nodeClick",
                        u: c.u,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    }))
                }
            },
            onHold: function(b) {
                !B && a && N(b)
            },
            onDoubleClick: function(b) {
                !B &&
                    a && N(b)
            },
            onGroupOpenOrClose: function() {
                a && O(c.Ld)
            },
            onGroupZoom: function() {
                a && O(c.bf)
            },
            onMouseMove: function(b) {
                !a || E && z[E.id].R && z[E.id].R(b.$) || ((b = s(b.$)) && "group" === b.type ? g(b.u) : g(void 0))
            },
            onMouseOut: function() {
                a && g(void 0)
            }
        });
        this.S = function(b) {
            b && Q.extend(h, Q.oe(b, Q.keys(h)));
            if (B) C = !0;
            else if (this.rc(), a) {
                b && b.options && (c.c = b.options.c, c.ja = b.options.ja, c.ka = b.options.ka);
                Q.X(c.tc) && X(a, function(a) {
                    a.visible = !!c.tc.call(void 0, a.group)
                });
                d();
                X(a, function(a) {
                    a.T = A[a.ea - 1];
                    a.U = A[a.ea]
                });
                a.T =
                    0;
                a.U = A[0];
                if (Q.X(c.Sc)) {
                    var f = {
                            group: null,
                            maxRadius: h.ua / 2 / c.c,
                            centerx: h.p / c.c,
                            centery: h.q / c.c,
                            r_inner: void 0,
                            r_outer: void 0
                        },
                        g = c.Sc;
                    Pa(a, function(a) {
                        f.r_inner = a.T / c.c;
                        f.r_outer = a.U / c.c;
                        f.group = a.group;
                        g.call(void 0, f);
                        a.T = f.r_inner * c.c;
                        a.U = f.r_outer * c.c;
                        if (isNaN(a.T) || isNaN(a.U)) a.T = 0, a.U = 0
                    })
                }
                h.n = 0;
                h.Y = 0;
                W.H.K(h, "Label paint deferral").kd(1E3 * c.ja).call(function() {
                    Z(w, h.e, h.d);
                    e(w.getContext("2d"), a)
                }).V({
                    target: h,
                    duration: 1E3 * c.ka,
                    O: h.C,
                    k: {
                        n: {
                            end: 1
                        }
                    }
                }).start()
            }
        };
        this.Hb = function() {
            return A.slice()
        };
        this.nb = function(a) {
            return z[a].shape
        };
        this.ne = function(b) {
            a && (0 !== h.opacity && (c.backgroundColor && (b.save(), b.globalAlpha = h.opacity, b.fillStyle = c.backgroundColor, b.fillRect(h.x, h.y, h.e, h.d), b.restore()), b.save(), b.globalAlpha = h.opacity, m(b, a), x(b, a), b.restore()), c.Cb && c.Cb())
        };
        this.rc = function() {
            this.Q = Ja(S(c.P));
            this.ga = this.Q + S(c.Ea);
            this.rotation = 0;
            this.p = b(c.p, h.e, c.c) | 0;
            this.q = b(c.q, h.d, c.c) | 0;
            this.ua = b(c.ua, Math.min(h.e, h.d), c.c) | 0
        };
        this.update = function() {
            O(c.Ze)
        };
        a && this.children.push(F, U,
            ia);
        this.rc();
        return this
    }
    var Ta;

    function Ua(a) {
        function c(a) {
            var b, c;

            function d() {
                var e = f.naturalWidth,
                    g = f.naturalHeight,
                    e = e / a.c,
                    g = g / a.c;
                if (Q.X(a.Tb)) {
                    var k = {
                        imageWidth: e,
                        imageHeight: g,
                        layout: {
                            x: h.x,
                            y: h.y,
                            w: h.e,
                            h: h.d
                        }
                    };
                    try {
                        a.Tb.call(void 0, k)
                    } catch (l) {}
                    var v = k.imageWidth;
                    Q.Oa(v) && (e = Math.max(30, v));
                    v = k.imageHeight;
                    Q.Oa(v) && (g = Math.max(30, v))
                }
                b = h.x + $.Dc(h.e - e, $.kb(a.rd, h.e - e));
                c = h.y + $.Dc(h.d - g, $.kb(a.sd, h.d - g));
                b = Math.round(a.c * b);
                c = Math.round(a.c * c);
                f.width = e * a.c;
                f.height = g * a.c
            }
            xa.call(this);
            var e = this,
                f, h;
            c = b = void 0;
            var g;
            this.opacity =
                0;
            this.addEventListener({
                onLayout: function(k) {
                    Q.extend(a, U);
                    var l = document.createElement("canvas"),
                        m = 0.3 * a.c;
                    l.width = Ra.$b.width * m;
                    l.height = Ra.$b.height * m;
                    var Y = l.getContext("2d");
                    Y.scale(m, m);
                    Ra.ud(Y);
                    a.ha = l.toDataURL("image/png");
                    c = b = void 0;
                    a.ha ? (h = {
                        x: k.x / a.c,
                        y: k.y / a.c,
                        e: k.e / a.c,
                        d: k.d / a.c
                    }, f && g === a.ha ? f.naturalWidth && d() : (g = a.ha, f = new Image, f.src = a.ha, f.onload = function() {
                        d();
                        e.C()
                    })) : f = void 0
                },
                onClick: function(d) {
                    if (0 < e.opacity && f && Ba.qe(d.$, {
                            x: b,
                            y: c,
                            e: f.width,
                            d: f.height
                        })) return Q.extend(a, U),
                        a.eb && (document.location.href = a.eb), !1
                },
                onPaint: function(a) {
                    f && void 0 !== b && (a = a.L, a.save(), a.globalAlpha = e.opacity, a.drawImage(f, b, c, f.width, f.height), a.restore())
                }
            })
        }

        function b(a, b) {
            function c(a) {
                a.Bc = Math.round((void 0 !== b.ad ? a.d * b.ad / 100 + 0.5 | 0 : b.$a) * b.c);
                a.xc = Math.round((void 0 !== b.$c ? a.d * b.$c / 100 + 0.5 | 0 : b.Za) * b.c)
            }
            xa.call(this);
            var d = this,
                e, f, h = !0,
                g, k = a.Ba("selected"),
                l, m = {
                    onHoverChanged: function(a) {
                        g = a.u ? a.u : void 0;
                        d.Qb()
                    },
                    onPostChangeSelection: function(a) {
                        k = a.selected;
                        d.Qb()
                    }
                };
            this.bb = function(a) {
                a.addEventListener(m)
            };
            this.Cd = function(a) {
                a.removeEventListener(m)
            };
            this.Qb = function() {
                var a = void 0;
                g && (a = g.Ia);
                var c = k.Ec;
                Q.j(a) && 0 < c.length && (a = "[" + c[0].Ia + (1 < c.length ? ", ...+" + (c.length - 1) + "]" : "]"));
                b.Nb ? (a = {
                    hoverGroup: g ? g.group : void 0,
                    selectedGroups: k.ya,
                    label: a
                }, b.Nb && b.Nb(a), l = a.label) : l = a;
                d.C()
            };
            this.addEventListener({
                onPostLayout: function(a) {
                    f = {
                        x: a.x,
                        y: a.y,
                        e: a.e,
                        d: a.d,
                        p: a.p,
                        q: a.q
                    };
                    switch (b.Yc) {
                        case "none":
                            e = void 0;
                            break;
                        case "top":
                        case "bottom":
                        case "topbottom":
                            e = Q.ta(f);
                            c(e);
                            e.d = e.xc + 2 * b.Ob * b.c;
                            break;
                        case "inscribed":
                            var h =
                                S(35),
                                g = a.Hb[0] * a.c;
                            a = Math.cos(h) * g;
                            h = Math.sin(h) * g;
                            e = {
                                x: f.p - a,
                                y: f.q - h,
                                e: 2 * a,
                                d: 2 * h
                            };
                            c(e)
                    }
                    d.Qb()
                },
                onMouseMove: function(a) {
                    h = a.$.y >= f.d / 2
                },
                onClick: function() {},
                onPaint: function(a) {
                    if (e && l) {
                        a = a.L;
                        a.save();
                        switch (b.Yc) {
                            case "topbottom":
                                e.y = h ? 0 : f.d - e.d;
                                break;
                            case "top":
                                e.y = 0;
                                break;
                            case "bottom":
                                e.y = f.d - e.d
                        }
                        0 != b.Ue.md && (a.fillStyle = b.Zc, a.fillRect(e.x, e.y, e.e, e.d));
                        if (0 != b.We.md) {
                            var c = Q.ta(e);
                            c.x += b.cd * b.c;
                            c.y += b.Ob * b.c;
                            c.e -= 2 * b.cd * b.c;
                            c.d -= 2 * b.Ob * b.c;
                            if (0 >= c.e || c.d <= e.Bc) e = void 0;
                            a.fillStyle = b.bd;
                            Ca.fc(a,
                                l, c, Q.Od(b.Ve, b.ic), e.Bc, e.xc, b.mc, b.uc, {})
                        }
                        a.restore()
                    }
                }
            })
        }

        function e(b, c) {
            return function(e) {
                if (h) {
                    if ("mousemove" === e.type) {
                        var d = void 0,
                            g;
                        Q.N(e, "movementX") ? (d = "movementX", g = "movementY") : Q.N(e, "mozMovementX") ? (d = "mozMovementX", g = "mozMovementY") : Q.N(e, "webkitMovementX") && (d = "webkitMovementX", g = "webkitMovementY");
                        if (void 0 !== d && 0 == e[d] && 0 == e[g]) return
                    }
                    d = e.pageX;
                    g = e.pageY;
                    if (!d && e.clientX) {
                        d = e.target.ownerDocument || document;
                        g = d.documentElement;
                        var k = d.body,
                            d = e.clientX + (g && g.scrollLeft || k && k.scrollLeft ||
                                0) - (g && g.clientLeft || k && k.clientLeft || 0);
                        g = e.clientY + (g && g.scrollTop || k && k.scrollTop || 0) - (g && g.clientTop || k && k.clientTop || 0)
                    }
                    e = f(e, {
                        type: b,
                        $: ga(d, g, c, a.c)
                    });
                    w.F(e);
                    return !1
                }
            }
        }

        function d(b, c) {
            return function(e) {
                if (h) {
                    var d = e.gc.touches[0];
                    e = f(e.gc.Ne, {
                        type: b,
                        $: ga("pageX_" in d ? d.pageX_ : d.pageX, "pageY_" in d ? d.pageY_ : d.pageY, c, a.c)
                    });
                    w.F(e);
                    return !1
                }
            }
        }

        function f(a, b) {
            Q.N(a, "altKey") && (b.altKey = a.altKey);
            Q.N(a, "ctrlKey") && (b.ctrlKey = a.ctrlKey);
            Q.N(a, "metaKey") && (b.metaKey = a.metaKey);
            Q.N(a, "shiftKey") &&
                (b.shiftKey = a.shiftKey);
            return b
        }

        function l(b) {
            if (a.lc) {
                var c = {
                    labelText: null
                };
                X(b, function(b) {
                    c.labelText = b.group.label;
        //
        // Edited by JAS - try tyopick up title field
        //
                    if (   (b.group.title != undefined) && (b.group.title != "")   ) c.labelText = b.group.title;
                    a.lc(a, M(b), c);
                    b.Ia = c.labelText
                })
            } else X(b, function(a) {
                a.Ia = a.group.label
            })
        }

        function g(b) {
            function c(a) {
                if (a.children) {
                    var b = a.Xd,
                        d = a.children.length - 1,
                        f = Math.min(50, 7 * d),
                        g = Math.max(0, b.l - f / 2);
                    80 < g + f && (g = Math.max(0, 80 - f));
                    for (var h = 0; h <= d; h++) e(a.children[h], {
                        h: b.h,
                        s: 0.8 * b.s,
                        l: Math.ceil(0 == d ? g : g + f * (d - h) / d),
                        a: b.a,
                        model: "hsla"
                    }), c(a.children[h])
                }
            }

            function e(b, c) {
                var f = 0 === a.Pa ? a.ub :
                    1 === a.Pa ? a.vb : $.Vb(c) >= a.Pa ? a.ub : a.vb;
                a.hc && (f = {
                    labelColor: f,
                    groupColor: c
                }, a.hc(a, M(b), f), c = d(f, "groupColor"), f = "auto" === f.labelColor ? $.Vb(c) >= a.Pa ? a.ub : a.vb : d(f, "labelColor"));
                b.Xd = c;
                b.Wd = $.dd(c);
                b.xf = f;
                b.uc = $.dd(f)
            }

            function d(a, b) {
                var c = a[b];
                Q.rb(c) ? a[b] = c = $.o(c) : Q.j(c) && (a[b] = c = $.o("rgba(0,0,0,0)"));
                $.v(c);
                return c
            }

            function f(a, b, c, d) {
                b = b[d];
                return b + (c[d] - b) * a
            }
            for (var g = 0, h = b.children.length - 1; 0 <= --h;) g += b.children[h].M;
            0 == g && (g = 1);
            var k = a.Ae,
                l = a.ye,
                m = 0;
            wa(b, function(a) {
                var b = m / g;
                m += a.M;
                e(a, {
                    h: f(b,
                        k, l, "h"),
                    s: f(b, k, l, "s"),
                    l: f(b, k, l, "l"),
                    a: f(b, k, l, "a"),
                    model: "hsla"
                });
                c(a)
            })
        }

        function k(a) {
            function b(a, c) {
                var d = {
                    ea: c,
                    group: a,
                    M: 0,
                    tb: function() {
                        return a.zoomed || !1
                    },
                    qb: function() {
                        return a.selected || !1
                    },
                    za: function() {
                        return a.open || !1
                    }
                };
                a.id && (T[a.id] = d);
                var e = a.groups;
                if (e && 0 < e.length) {
                    for (var f = [], g = 0, h = 0; g < e.length; g++) {
                        var k = b(e[g], c + 1);
                        k.parent = d;
                        k.index = h++;
                        f.push(k)
                    }
                    d.children = f
                }
                return d
            }
            T = {};
            a = b(a, 0);
            m(a);
            x(a);
            s(a);
            var c = 0;
            a.id = 0;
            X(a, function(a) {
                a.id = ++c
            });
            a.children || (a.children = []);
            return a
        }

        function m(a) {
            X(a, function(a) {
                var b = a.group;
                a.M = Q.N(b, "weight") ? parseFloat(b.weight) : 1
            })
        }

        function x(b) {
            if (a.Me) {
                var c = Number.MAX_VALUE,
                    d = 0;
                wa(b, function(a) {
                    a = a.M;
                    0 < a ? c = Math.min(a, c) : d++
                });
                c == Number.MAX_VALUE && (c = 1);
                wa(b, function(a) {
                    0 >= a.M && (a.M = 0.9 * c);
                    a.children && x(a)
                })
            }
        }

        function s(a) {
            var b = 0;
            wa(a, function(a) {
                b = Math.max(a.M, b)
            });
            0 < b && wa(a, function(a) {
                a.M /= b;
                a.children && s(a.children)
            })
        }

        function n(a, b) {
            if ("random" === b) {
                var c = [],
                    d;
                for (d in a) "default" !== d && c.push(d);
                b = c[Math.floor(Math.random() * (c.length +
                    1))]
            }
            return a.hasOwnProperty(b) ? a[b] : a["default"]
        }

        function q(b) {
            if (h) {
                var c = y(h, b.Kb),
                    d = [];
                if (c) {
                    var e = b.Ta,
                        f = b.value,
                        g = b.Jb;
                    Oa(h, function(a) {
                        var b = a.group[e] || !1;
                        c[a.id] ? b !== f && (a.group[e] = f, d.push(a)) : void 0 !== g && b !== g && (a.group[e] = g, d.push(a))
                    });
                    if (b.Ra)
                        for (var k = 0; k < d.length; k++) {
                            var l = d[k],
                                m = {};
                            m.group = l.group;
                            m[e] = l.group[e];
                            a.wc && window.console && window.console.log("Circles: Triggering onChange(property=" + b.Ta + ") event", m);
                            b.Ra(m)
                        }
                    b.Va && w.F({
                        type: b.Va,
                        Ec: d
                    })
                }
                return d
            }
        }

        function y(a, b) {
            var c = {};
            if (Q.da(b) && b.all) return Oa(a, function(a) {
                c[a.id] = !0
            }), c;
            if (Q.da(b) && Q.isArray(b.nodes))
                for (var d = b.nodes, e = d.length; 0 <= --e;) c[d[e].id] = !0;
            var f = {};
            Q.da(b) && Q.N(b, "groups") && (b = Q.isArray(b.groups) ? b.groups : [b.groups]);
            if (Q.isArray(b))
                for (e = b.length; 0 <= --e;) f[b[e]] = !0;
            Q.da(b) || (f[b] = !0);
            Oa(a, function(a) {
                void 0 !== a.group.id && f[a.group.id] && (c[a.id] = !0)
            });
            return c
        }

        function t(a, b, c) {
            return Q.da(a) && b in a ? a[b] : c
        }

        function M(a) {
            var b = {};
            b.group = a.group;
            b.weightNormalized = a.M;
            b.level = a.ea - 1;
            b.index = a.index;
            b.siblingCount = a.parent.children.length;
            return b
        }

        function ga(a, b, c, d) {
            var e;
            var f = {
                    top: 0,
                    left: 0
                },
                g = c && c.ownerDocument;
            g ? (e = g.documentElement, "undefined" !== typeof c.getBoundingClientRect && (f = c.getBoundingClientRect()), c = null != g && g == g.window ? g : 9 === g.nodeType ? g.defaultView || g.parentWindow : !1, e = {
                top: f.top + (c.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: f.left + (c.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : e = void 0;
            return {
                x: (a - e.left) * d,
                y: (b - e.top) * d
            }
        }

        function N() {
            C = Q.ta(a);
            A = new Sa(h, C);
            L.ab(A);
            z && D.Ib(z);
            z = new c(C);
            D.ab(z);
            E && (E.Cd(w), D.Ib(E));
            E = new b(H, C);
            E.bb(w);
            D.ab(E)
        }
        var O = {},
            Z = {},
            H = this,
            h, A, z, E, w = new ya,
            L, D, B, T, C = {},
            U = {
                Ga: void 0,
                cb: void 0,
                eb: $.Je(),
                ha: void 0
            },
            F;
        this.ob = function(b) {
            var c = document.createElement("canvas");
            c.setAttribute("style", "position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;");
            b.parentNode.insertBefore(c, b.nextSibling);
            w.Rb("main", L = new za(b, "main"));
            w.Rb("overlay", D = new za(c, "overlay"));
            N();
            w.addEventListener({
                onHoverChanged: function(b) {
                    a.Ic({
                        group: b.u ? b.u.group : null
                    })
                },
                onRequestSelectionChange: function(a) {
                    H.Yb(a.Ca)
                },
                onRequestOpenStateChange: function(a) {
                    H.fb(a.Ca)
                },
                onRequestZoomStateChange: function(a) {
                    H.Zb(a.Ca)
                },
                onPostChangeSelection: function(b) {
                    b.Ke && a.Ab && (b = b.selected.ya, a.wc && window.console && window.console.log("Circles: Triggering onGroupSelectionChanged event", b), a.Ab({
                        groups: b
                    }))
                },
                onNodeDoubleClick: function(b) {
                    var c =
                        b.u;
                    Q.contains(a.Gc({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    }), !1) || w.W({
                        type: "requestZoomStateChange",
                        Ca: {
                            nodes: [c],
                            zoomed: !c.tb(),
                            resetValue: b.metaKey | b.ctrlKey ? !1 : void 0
                        }
                    });
                    a.zb && a.zb({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    })
                },
                onNodeClick: function(b) {
                    var c = b.u;
                    Q.contains(a.Fc({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    }), !1) || w.W({
                        type: "requestSelectionChange",
                        Ca: {
                            nodes: [c],
                            selected: !c.qb(),
                            resetValue: b.metaKey | b.ctrlKey ? void 0 : !1
                        }
                    });
                    a.yb && a.yb({
                        group: c.group,
                        metaKey: b.metaKey,
                        ctrlKey: b.ctrlKey,
                        altKey: b.altKey,
                        shiftKey: b.shiftKey
                    })
                }
            });
            F = new la(c, {
                Fb: a.Xb
            });
            F.ma("tap", d("click", c));
            F.ma("doubletap", d("doubleClick", c));
            F.ma("hold", d("hold", c));
            "ontouchstart" in window || (c.addEventListener("mousemove", e("mouseMove", c), !1), c.addEventListener("mouseout", e("mouseOut", c), !1))
        };
        var ia = [];
        this.reload = function() {
            var b = {
                root: h,
                na: A,
                options: C
            };
            h = a.gb ? k(a.gb) : void 0;
            N();
            a.Mc(a.gb);
            H.S();
            H.Ua();
            var c = {
                root: h,
                na: A,
                options: C
            };
            (function() {
                Q.extend(a, U);
                var b = W.H.K(Z, "attribution").V({
                    target: z,
                    duration: Q.j(a.Fa) ? 0 : 1E3 * Math.min(5, a.Fa),
                    k: {
                        opacity: {
                            end: 1,
                            f: R
                        }
                    },
                    O: z.C
                });
                !Q.j(a.Ga) && 0 < a.Ga && b.kd(1E3 * a.Ga).V({
                    target: z,
                    duration: Q.j(a.cb) ? 0 : 1E3 * a.cb,
                    k: {
                        opacity: {
                            end: 0,
                            f: R
                        }
                    },
                    O: z.C
                });
                b.start()
            })();
            (function(b, c) {
                ia = Q.filter(ia, function(a) {
                    return a.pb()
                });
                var d = ia.slice(),
                    e = [],
                    f = [],
                    g = a.xb,
                    d = W.H.ma(O, "Reload model").Eb(d).call(function() {
                        var a = n(b.na.ue, b.options.se)(b.root ? b.options.te :
                                0).Ja(),
                            d = n(c.na.Ie, c.options.Ge)(c.options.He).Ja();
                        e.push(a);
                        c.na === A && ("parallel" == g ? e.push(d) : f.push(d));
                        c.options.Oc()
                    }).Eb(e).call(function() {
                        L.Ib(b.na);
                        c.na !== A && (f.length = 0)
                    }).Eb(f).call(function() {
                        Aa.Pc(function() {
                            c.options.Nc(H.Xc())
                        })
                    }).Ja();
                "sequential" == g && ia.push(d);
                d.start()
            })(b, c)
        };
        this.Xc = function() {
            return {}
        };
        this.nb = function(a) {
            return h ? A.nb(T[a].id) : {}
        };
        this.S = function() {
            if (h) {
                var b = L.canvas,
                    c = b.clientWidth * a.c,
                    b = b.clientHeight * a.c;
                if (0 == c || 0 == b) b = c = 1;
                m(h);
                x(h);
                s(h);
                g(h);
                l(h);
                w.F({
                    type: "layout",
                    x: 0,
                    y: 0,
                    e: c,
                    d: b,
                    root: h,
                    options: a
                });
                var d = 1 / a.c,
                    e = Q.map(A.Hb(), function(a) {
                        return a * d
                    });
                w.F({
                    root: h,
                    type: "postLayout",
                    x: 0,
                    y: 0,
                    e: c,
                    d: b,
                    p: A.p,
                    q: A.q,
                    c: a.c,
                    Hb: e,
                    options: a
                });
                B = {
                    x: 0,
                    y: 0,
                    w: c * d,
                    h: b * d,
                    pixelRatio: a.c,
                    centerx: A.p * d,
                    centery: A.q * d,
                    radii: e
                };
                a.Bb && a.Bb(B)
            }
        };
        this.fe = function() {
            return h ? B : void 0
        };
        this.update = function() {
            h && A && (m(h), x(h), s(h), A.update())
        };
        this.Ua = function() {
            h && w.F({
                type: "dirty"
            })
        };
        this.fb = function(b, c) {
            h && (Q.j(c) && (c = !0), q({
                Kb: b,
                Ta: "open",
                value: t(b, "open", !0),
                Jb: t(b, "resetValue", void 0),
                Ra: c ? t(b, "onChange", a.Jc) : void 0,
                Va: "groupOpenOrClose"
            }))
        };
        this.Zb = function(b, c) {
            h && (Q.j(c) && (c = !0), q({
                Kb: b,
                Ta: "zoomed",
                value: t(b, "zoomed", !0),
                Jb: t(b, "resetValue", void 0),
                Ra: c ? t(b, "onChange", a.Lc) : void 0,
                Va: "groupZoom"
            }))
        };
        this.Yb = function(b, c) {
            if (h) {
                Q.j(c) && (c = !0);
                var d = q({
                    Kb: b,
                    Ta: "selected",
                    value: t(b, "selected", !0),
                    Jb: t(b, "resetValue", void 0),
                    Ra: c ? t(b, "onChange", a.Kc) : void 0,
                    Va: "selectionChanged"
                });
                if (!Q.N(b, "open") || b.open) {
                    var e = [];
                    d.forEach(function(b) {
                        if (b.qb())
                            for (; b.parent;) !b.parent.za() &&
                                b.index >= a.qa && e.push(b.parent), b = b.parent;
                        return !1
                    });
                    0 < e.length && this.fb({
                        nodes: e,
                        open: !0
                    }, c)
                }
                w.F({
                    type: "postChangeSelection",
                    selected: H.Ba("selected"),
                    Ke: c
                })
            }
        };
        this.wd = function() {
            return {
                groups: H.Ba("open").ya
            }
        };
        this.xd = function() {
            return {
                groups: H.Ba("selected").ya
            }
        };
        this.yd = function() {
            return {
                groups: H.Ba("zoomed").ya
            }
        };
        this.ce = function(b) {
            var c = $.hb(b, "format", "image/png"),
                d = $.hb(b, "quality", 0.8),
                e = A.n,
                f = a.ja,
                g = a.ka,
                k = a.c;
            b = $.hb(b, "pixelRatio", k);
            var l = document.createElement("canvas");
            if (h) try {
                a.ja =
                    0;
                a.ka = 0;
                a.c = b;
                H.S();
                w.F({
                    type: "paint"
                });
                var m = L.canvas;
                l.width = m.width;
                l.height = m.height;
                var n = l.getContext("2d");
                n.save();
                w.vc.forEach(function(a) {
                    n.globalAlpha = "" === a.canvas.style.opacity ? 1 : a.canvas.style.opacity;
                    n.drawImage(a.canvas, 0, 0)
                });
                n.restore()
            } finally {
                a.c = k, A.n = e, H.S(), w.F({
                    type: "paint"
                }), a.ka = g, a.ja = f
            }
            return l.toDataURL(c, d)
        };
        this.qd = function() {
            Q.extend(C, a);
            F && (F.options.Fb = C.Xb)
        };
        this.Ba = function(a) {
            var b = [],
                c = [];
            h && Oa(h, function(d) {
                d.group[a] && (b.push(d), c.push(d.group))
            });
            return {
                Ec: b,
                ya: c
            }
        }
    }

    function Va() {
        return {
            version: "2.3.6",
            build: "903dbc847f249112dce68481ca74028db9bc68ee/903dbc84",
            brandingAllowed: !1
        }
    };
    window.CarrotSearchCircles = function(a) {
        function c(a) {
            function c(a) {
                return /%$/.test(a) ? parseFloat(a.replace(/[%\s]/g, "")) : void 0
            }

            function g(a) {
                return Q.j(a) || Q.Oa(a) ? a : parseFloat(a.replace(/[%\s]/g, ""))
            }

            function l(a) {
                return function() {
                    return a ? a.apply(b, arguments) : void 0
                }
            }

            function n(a) {
                function c() {
                    var a = [],
                        e = arguments;
                    Q.forEach(d, function(c) {
                        a.push(c.apply(b, e))
                    });
                    return a
                }
                var d = [];
                Q.isArray(a) ? Q.forEach(a, function(a) {
                    Q.X(a) && d.push(a)
                }) : Q.X(a) && d.push(a);
                c.B = function() {
                    return Q.ta(d)
                };
                return c
            }(function() {
                d.id =
                    e.id;
                d.element = e.element;
                d.p = e.centerx;
                d.q = e.centery;
                d.ua = e.diameter;
                d.gb = e.dataObject;
                d.wc = e.logging;
                d.Wc = e.textureMappingMesh;
                d.backgroundColor = e.backgroundColor;
                d.kf = $.v($.o(d.backgroundColor));
                d.Fe = e.ringScaling;
                d.Sc = e.ringShape;
                d.qa = e.visibleGroupCount;
                d.ld = e.zoomedFraction;
                d.Ze = e.updateTime;
                d.Ld = e.expandTime;
                d.bf = e.zoomTime;
                d.Md = e.expanderAngle;
                d.ke = e.minExpanderAngle;
                d.ec = e.expanderOutlineWidth;
                d.dc = e.expanderOutlineColor;
                d.nf = $.v($.o(d.dc));
                d.cc = e.expanderColor;
                d.mf = $.v($.o(d.cc));
                d.af = e.zoomDecorationStrokeColor;
                d.$e = e.zoomDecorationFillColor;
                d.ja = e.deferLabelRedraws;
                d.ka = e.labelRedrawFadeInTime;
                d.P = e.angleStart;
                d.Z = e.angleEnd;
                d.Ea = e.angleWidth;
                if (!Q.j(d.Z)) {
                    d.P = Ia(d.P);
                    d.Z = Ia(d.Z);
                    if (d.P >= d.Z) {
                        var a = d.P;
                        d.P = d.Z;
                        d.Z = a
                    }
                    d.Ea = d.Z - d.P;
                    0 == Ia(d.Ea) && 0 != e.angleEnd && (d.Ea = 360)
                }
                d.Ge = e.rolloutAnimation;
                d.He = e.rolloutTime;
                d.se = e.pullbackAnimation;
                d.te = e.pullbackTime;
                d.ze = e.rainbowStartColor;
                d.Ae = $.v($.o(d.ze));
                d.xe = e.rainbowEndColor;
                d.ye = $.v($.o(d.xe));
                d.Yd = e.groupHoverHierarchy;
                d.jc = e.groupHoverColor;
                d.pf = $.v($.o(d.jc));
                d.Zd = e.groupHoverOutlineWidth;
                d.kc = e.groupHoverOutlineColor;
                d.qf = $.v($.o(d.kc));
                d.oc = e.groupSelectionColor;
                d.sf = $.v($.o(d.oc));
                d.$d = e.groupSelectionOutlineWidth;
                d.pc = e.groupSelectionOutlineColor;
                d.tf = $.v($.o(d.pc));
                d.Na = e.groupOutlineWidth;
                d.nc = e.groupOutlineColor;
                d.rf = $.v($.o(d.nc));
                d.ee = e.labelLightColor;
                d.vb = $.v($.o(d.ee));
                d.de = e.labelDarkColor;
                d.ub = $.v($.o(d.de));
                d.Pa = e.labelColorThreshold;
                d.ic = e.groupFontFamily;
                d.Ma = e.groupMinFontSize;
                d.La = e.groupMaxFontSize;
                d.mc = e.groupLinePadding;
                d.lc = l(e.groupLabelDecorator);
                d.hc = l(e.groupColorDecorator);
                d.pd = e.angularTextureStep;
                d.we = e.radialTextureStep;
                d.Te = e.textureOverlapFudge;
                d.me = e.noTexturingCurvature;
                d.De = e.ratioRadialPadding;
                d.le = e.minRadialPadding;
                d.Be = e.ratioAngularPadding;
                d.je = e.minAngularPadding;
                d.Ce = e.ratioAspectSwap;
                d.tc = e.isGroupVisible;
                d.Mc = n(e.onModelChanged);
                d.Oc = n(e.onRolloutStart);
                d.Nc = n(e.onRolloutComplete);
                d.Cb = n(e.onRedraw);
                d.Bb = n(e.onLayout);
                d.Ic = n(e.onGroupHover);
                d.Jc = n(e.onGroupOpenOrClose);
                d.Lc = n(e.onGroupZoom);
                d.Kc = n(e.onGroupSelectionChanging);
                d.Ab = n(e.onGroupSelectionChanged);
                d.Fc = n(e.onBeforeSelection);
                d.Gc = n(e.onBeforeZoom);
                d.yb = n(e.onGroupClick);
                d.zb = n(e.onGroupDoubleClick);
                d.Me = e.showZeroWeightGroups;
                d.c = e.pixelRatio;
                d.Xb = e.captureMouseEvents;
                d.ha = e.attributionLogo;
                d.eb = e.attributionUrl;
                d.rd = e.attributionPositionX;
                d.sd = e.attributionPositionY;
                d.cb = e.attributionFadeOutTime;
                d.Ga = e.attributionStayOnTime;
                d.Tb = e.attributionSize;
                d.Yc = e.titleBar;
                d.Ve = e.titleBarFontFamily;
                d.$a = e.titleBarMinFontSize;
                d.Za = e.titleBarMaxFontSize;
                d.Zc = e.titleBarBackgroundColor;
                d.Ue = $.v($.o(d.Zc));
                d.bd = e.titleBarTextColor;
                d.We = $.v($.o(d.bd));
                d.cd = e.titleBarTextPaddingLeftRight;
                d.Ob = e.titleBarTextPaddingTopBottom;
                d.Nb = e.titleBarLabelDecorator;
                d.Fa = Number(e.attributionFadeInTime);
                isNaN(d.Fa) && (d.Fa = 0);
                d.Cc = c(d.Ma);
                d.yc = c(d.La);
                d.Ma = g(d.Ma);
                d.La = g(d.La);
                d.ad = c(d.$a);
                d.$a = g(d.$a);
                d.$c = c(d.Za);
                d.Za = g(d.Za);
                d.qa || (d.qa = Number.MAX_VALUE);
                d.xb = e.modelChangeAnimations;
                "auto" == d.xb && (d.xb = /iPad|iPhone/.test(window.navigator.userAgent) ? "sequential" : "parallel")
            })();
            for (var q = "dataObject showZeroWeightGroups attributionLogo attributionStayOnTime attributionFadeOutTime attributionFadeInTime pixelRatio".split(" "),
                    y = !1, t = 0; t < q.length; t++)
                if ("undefined" != typeof a[q[t]]) {
                    f.reload();
                    y = !0;
                    break
                }
            f.qd();
            if (!y)
                for (q = "centerx centery diameter ringScaling ringShape visibleGroupCount zoomedFraction expanderAngle minExpanderAngle angleStart angleEnd angleWidth rainbowStartColor rainbowEndColor labelColorThreshold labelDarkColor labelLightColor groupFontFamily groupMinFontSize groupMaxFontSize groupLinePadding ratioRadialPadding minRadialPadding ratioAngularPadding minAngularPadding groupLabelDecorator groupColorDecorator textureMappingMesh radialTextureStep angularTextureStep textureOverlapFudge attributionLogo attributionUrl attributionPositionX attributionPositionY attributionSize attributionFadeOutTime attributionStayOnTime noTexturingCurvature isGroupVisible ratioAspectSwap titleBar titleBarFontFamily titleBarMinFontSize titleBarMaxFontSize titleBarBackgroundColor titleBarTextColor titleBarTextPaddingLeftRight titleBarTextPaddingTopBottom titleBarLabelDecorator zoomDecorationStrokeColor zoomDecorationFillColor".split(" "),
                    t = 0; t < q.length; t++)
                    if ("undefined" != typeof a[q[t]]) {
                        f.S();
                        f.Ua();
                        break
                    }
                    "undefined" !== typeof a.selection && (delete e.selection, f.Yb(a.selection, !1));
            "undefined" !== typeof a.open && (delete e.open, f.fb(a.open, !1));
            "undefined" !== typeof a.zoom && (delete e.zoom, f.Zb(a.zoom, !1))
        }
        if (window.CarrotSearchCircles.supported) {
            var b = this;
            a = (new Qa).ob(this, {
                fa: "Circles",
                Le: a,
                J: {
                    id: null,
                    element: null,
                    dataObject: null,
                    logging: !1,
                    times: null,
                    textureMappingMesh: !1,
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    centerx: "50%",
                    centery: "50%",
                    diameter: "99%",
                    layout: void 0,
                    ringScaling: 0.75,
                    ringShape: void 0,
                    angleStart: 0,
                    angleEnd: void 0,
                    angleWidth: 360,
                    showZeroWeightGroups: !0,
                    visibleGroupCount: 6,
                    zoomedFraction: 0.75,
                    groupOutlineWidth: 1,
                    groupOutlineColor: "rgba(0, 0, 0, 0.5)",
                    rainbowStartColor: "hsla(0, 100%, 50%, 0.7)",
                    rainbowEndColor: "hsla(300, 100%, 50%, 0.7)",
                    labelDarkColor: "rgba(0, 0, 0, 0.8)",
                    labelLightColor: "rgba(255, 255, 255, 0.8)",
                    labelColorThreshold: 0.35,
                    groupColorDecorator: null,
                    groupFontFamily: "Impact, Charcoal, sans-serif",
                    groupMinFontSize: "5",
                    groupMaxFontSize: "30",
                    groupLinePadding: 1,
                    groupLabelDecorator: null,
                    ratioAspectSwap: 0.8,
                    ratioRadialPadding: 0.1,
                    minRadialPadding: 4,
                    ratioAngularPadding: 0.2,
                    minAngularPadding: 2,
                    radialTextureStep: 30,
                    angularTextureStep: 25,
                    noTexturingCurvature: 0.1,
                    textureOverlapFudge: navigator.userAgent.match(/Chrome/i) ? 0 : 0.5,
                    deferLabelRedraws: 0.25,
                    labelRedrawFadeInTime: 0.5,
                    expanderAngle: 2,
                    minExpanderAngle: 1,
                    expanderOutlineWidth: 1,
                    expanderOutlineColor: "rgba(0, 0, 0, .2)",
                    expanderColor: "rgba(255, 136, 136, 0.8)",
                    expandTime: 1,
                    zoomDecorationStrokeColor: "hsla(0, 0%, 0%, 0.2)",
                    zoomDecorationFillColor: "hsla(0, 0%, 0%, 0.1)",
                    zoomTime: 1,
                    rolloutAnimation: "random",
                    rolloutTime: 1,
                    pullbackAnimation: "random",
                    pullbackTime: 0.5,
                    updateTime: 1,
                    modelChangeAnimations: "auto",
                    groupSelectionColor: "rgba(255, 128, 128, 0.1)",
                    groupSelectionOutlineColor: "rgba(255, 128, 128, 1)",
                    groupSelectionOutlineWidth: 3,
                    groupHoverColor: "rgba(0, 0, 227, 0.1)",
                    groupHoverOutlineColor: "rgba(0, 0, 227, 0.1)",
                    groupHoverOutlineWidth: 1,
                    groupHoverHierarchy: !0,
                    selection: null,
                    open: null,
                    zoom: null,
                    attributionLogo: "carrotsearch",
                    attributionUrl: "http://carrotsearch.com/circles",
                    attributionPositionX: "3%",
                    attributionPositionY: "97%",
                    attributionSize: void 0,
                    attributionStayOnTime: 3,
                    attributionFadeOutTime: 3,
                    attributionFadeInTime: 0.5,
                    titleBar: "none",
                    titleBarFontFamily: void 0,
                    titleBarMinFontSize: 8,
                    titleBarMaxFontSize: 40,
                    titleBarBackgroundColor: "rgba(0, 0, 0, 0)",
                    titleBarTextColor: "rgba(255, 255, 255, .7)",
                    titleBarTextPaddingLeftRight: 5,
                    titleBarTextPaddingTopBottom: 5,
                    titleBarLabelDecorator: void 0,
                    isGroupVisible: null,
                    onModelChanged: void 0,
                    onRolloutStart: void 0,
                    onRolloutComplete: void 0,
                    onRedraw: void 0,
                    onLayout: void 0,
                    onGroupHover: void 0,
                    onGroupZoom: void 0,
                    onGroupOpenOrClose: void 0,
                    onGroupSelectionChanging: void 0,
                    onGroupSelectionChanged: void 0,
                    onGroupClick: void 0,
                    onGroupDoubleClick: void 0,
                    onBeforeZoom: void 0,
                    onBeforeSelection: void 0,
                    pixelRatio: 1,
                    captureMouseEvents: !0
                },
                Sb: {},
                ra: {
                    get: function(a, b) {
                        switch (a) {
                            case "selection":
                                return f.xd();
                            case "open":
                                return f.wd();
                            case "zoom":
                                return f.yd();
                            case "times":
                                return f.Xc();
                            case "layout":
                                return f.fe();
                            case "imageData":
                                return f.ce(b[0]);
                            case "onModelChanged":
                                return d.Mc.B();
                            case "onRolloutStart":
                                return d.Oc.B();
                            case "onRolloutComplete":
                                return d.Nc.B();
                            case "onRedraw":
                                return d.Cb.B();
                            case "onLayout":
                                return d.Bb.B();
                            case "onGroupHover":
                                console.log('onGroupHover d:',d)
                                return d.Ic.B();
                            case "onGroupOpenOrClose":
                                return d.Jc.B();
                            case "onGroupZoom":
                                return d.Lc.B();
                            case "onBeforeSelection":
                                return d.Fc.B();
                            case "onBeforeZoom":
                                return d.Gc.B();
                            case "onGroupClick":
                                return d.yb.B();
                            case "onGroupDoubleClick":
                                return d.zb.B();
                            case "onGroupSelectionChanging":
                                return d.Kc.B();
                            case "onGroupSelectionChanged":
                                return d.Ab.B();
                            default:
                                return e[a]
                        }
                    },
                    set: c,
                    jd: function(a) {
                        var b = window.CarrotSearchCircles.attributes;
                        if (b) {
                            var c = Va().version;
                            Q.forEach(a, function(d, e) {
                                try {
                                    b[e] && b[e].asserts && (b[e].asserts.validate(d), b[e].deprecated && window.console && window.console.warn("Attribute '" + e + "' has been deprecated in version " + b[e].deprecated + " (you are using version " + c + ")"))
                                } catch (f) {
                                    window.console && (window.console.error("Attribute validation failed for '" +
                                        e + "': " + f), window.console.log("Expected value for '" + e + "': " + b[e].asserts)), delete a[e]
                                }
                            })
                        }
                    }
                }
            });
            var e = a.options,
                d = {},
                f = new Ua(d);
            c({});
            if (null == d.id && null == d.element) throw Error("Either an id or element attributes are required for embedding.");
            if (null != d.id && null != d.element) throw Error("Either an id or element attributes are required for embedding (never both).", d.id, d.element);
            var l;
            if (null != d.id) {
                var g = document.getElementById(d.id);
                if (null == g) throw Error("No such element in the document: " + d.id);
                l = a.bc(g)
            } else l = a.bc(d.element);
            this.resize = function() {
                var a = d.c;
                return l.width != l.clientWidth * a || l.height != l.clientHeight * a ? (f.S(), f.Ua(), !0) : !1
            };
            this.update = function() {
                f.update()
            };
            this.redraw = function() {
                f.Ua()
            };
            this.layout = function() {
                f.S()
            };
            this.dispose = function() {};
            this.version = Va;
            this.groupShape = function(a) {
                return f.nb(a)
            };
            f.ob(l);
            f.reload()
        }
    };
    var Ya = window.CarrotSearchCircles,
        Za, $a = document.createElement("canvas");
    Za = !(!$a.getContext || !$a.getContext("2d"));
    Ya.supported = Za;
    window.CarrotSearchCircles.version = Va;
    var ab = window.CarrotSearchCircles,
        bb;
    var cb = window["CarrotSearchCircles.attributes"];
    cb ? (delete window["CarrotSearchCircles.attributes"], bb = cb) : bb = {};
    ab.attributes = bb;
})();
},{}],3:[function(require,module,exports){

function installResizeHandlerFor(visualization, deferUpdateByMillis) {
  var fn = function() {
    var id = visualization.get("id"), element;
    if (id && (element = document.getElementById(id))) {
      visualization.resize();
    }
  };

  // Call fn at most once within a single minInterval.
  function defer(minInterval, fn) {
    var last;
    var deferId;
    return function() {
      var now = new Date().getTime();

      if (deferId) {
        window.clearTimeout(deferId);
        deferId = undefined;
      }

      if (!last || last + minInterval <= now) {
        last = now;
        fn();
      } else {
        deferId = window.setTimeout(arguments.callee, Math.min(1, minInterval / 5));
      }
    };
  }

  if (undefined === deferUpdateByMillis) {
    deferUpdateByMillis = 500;
  }

  window.addEventListener("resize", defer(deferUpdateByMillis, fn));
  window.addEventListener("orientationchange", defer(deferUpdateByMillis, fn));
}
},{}],4:[function(require,module,exports){

/** Set viewport size in such a way that CSS pixels correspond to physical pixels. */
function updateViewportDimensions() {
  var width, height, portrait = (window.orientation % 180) == 0;
  var iOs = /iPad|iPhone/.test(window.navigator.userAgent);
  var chrome = /Chrome/.test(window.navigator.userAgent);
  if (iOs) {
    width = portrait ? screen.width : screen.height;
  } else  {
    var pixelRatio = window.devicePixelRatio || 1;
    width = screen.width / pixelRatio;
  }
  var meta = document.getElementById("__viewport_meta");
  if (!meta) {
    meta = document.createElement("meta");
    meta.id = "__viewport_meta";
    meta.name = "viewport";
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
  meta.setAttribute("content", "width=" + width + (iOs || chrome ? ", initial-scale=1" : ""));
}

updateViewportDimensions();
window.addEventListener("orientationchange", updateViewportDimensions);

},{}],5:[function(require,module,exports){
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function() {
  'use strict';
  // global for (1) existence means `WebComponentsReady` will file,
  // (2) WebComponents.ready == true means event has fired.
  window.WebComponents = window.WebComponents || {};
  var name = 'webcomponents-loader.js';
  // Feature detect which polyfill needs to be imported.
  var polyfills = [];
  if (!('import' in document.createElement('link'))) {
    polyfills.push('hi');
  }
  if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||
    (window.ShadyDOM && window.ShadyDOM.force)) {
    polyfills.push('sd');
  }
  if (!window.customElements || window.customElements.forcePolyfill) {
    polyfills.push('ce');
  }
  // NOTE: any browser that does not have template or ES6 features
  // must load the full suite (called `lite` for legacy reasons) of polyfills.
  if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
    // Edge has broken fragment cloning which means you cannot clone template.content
    !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
    polyfills = ['lite'];
  }

  if (polyfills.length) {
    var script = document.querySelector('script[src*="' + name +'"]');
    var newScript = document.createElement('script');
    // Load it from the right place.
    var replacement = 'webcomponents-' + polyfills.join('-') + '.js';
    var url = script.src.replace(name, replacement);
    newScript.src = url;
    // NOTE: this is required to ensure the polyfills are loaded before
    // *native* html imports load on older Chrome versions. This *is* CSP
    // compliant since CSP rules must have allowed this script to run.
    // In all other cases, this can be async.
    if (document.readyState === 'loading' && ('import' in document.createElement('link'))) {
      document.write(newScript.outerHTML);
    } else {
      document.head.appendChild(newScript);
    }
  } else {
    // Ensure `WebComponentsReady` is fired also when there are no polyfills loaded.
    // however, we have to wait for the document to be in 'interactive' state,
    // otherwise a rAF may fire before scripts in <body>

    var fire = function() {
      requestAnimationFrame(function() {
        window.WebComponents.ready = true;
        document.dispatchEvent(new CustomEvent('WebComponentsReady', {bubbles: true}));
      });
    };

    if (document.readyState !== 'loading') {
      fire();
    } else {
      document.addEventListener('readystatechange', function wait() {
        fire();
        document.removeEventListener('readystatechange', wait);
      });
    }
  }
})();

},{}],6:[function(require,module,exports){
/**
 * Semantic Graph Utility functions
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
'use strict';
function dtstamp() {
    let d = new Date();
    let dt  = new Date().getTime();
    return dt;
} 

function getBreadCrumb(_graph,_node,cb) {
    console.log(dtstamp(),'starting getBreadCrumb _node',_node)
    let CrumbTrail = [] 
    
    try {
       
        // let nodes = []
        let crumbNodes = [] ;
        
        // let aNode = getNodeById(_graph,_node)
        let aNode = _node ;
        
        // add to crumbs if not null
        if (aNode != null) {
            crumbNodes.push(aNode)
        
            if (aNode["skos:broader"] != null) {
                let aBroader = aNode["skos:broader"] || null;
                if (aBroader instanceof Array) aBroader = aBroader[0] || null ;
                console.log('aBroader:',aBroader)
                
                let bNode = getNodeById(_graph,aBroader) || null
                console.log('bNode:',bNode)
                // add to crumbs if not null
                if (bNode != null) {
                    crumbNodes.push(bNode)
                
                    if (bNode["skos:broader"] != null) {
                        let bBroader = bNode["skos:broader"] || null;
                        if (bBroader instanceof Array) bBroader = bBroader[0] || null ;
                        console.log('bBroader:',bBroader)
                        
                        let cNode = getNodeById(_graph,bBroader) || null
                        console.log('cNode:',cNode)
                        // add to crumbs if not null
                        if (cNode != null) {
                            crumbNodes.push(cNode)
                        
                            if (cNode["skos:broader"] != null) {
                                let cBroader = cNode["skos:broader"] || null;
                                if (cBroader instanceof Array) cBroader = cBroader[0] || null ;
                                console.log('cBroader:',cBroader)
                                
                                let dNode = getNodeById(_graph,cBroader) || null
                                console.log('dNode:',dNode)
                                    
                                if (dNode != null) {
                                    crumbNodes.push(dNode)
                                        // if (dNode["skos:broader"] != null) {
                                        //     let dBroader = dNode["skos:broader"] || null;
                                        //     if (dBroader instanceof Array) dBroader = dBroader[0] || null ;
                                        //     console.log('dBroader:',dBroader)
                                        //     // add to crumbs array
                                            
                                            
                                        // } // end of dNode["skos:broader"]
                                } // end if dNode
                            } // end of cNode["skos:broader"]
                        } // end if cNode
                    } // end of bNode["skos:broader"]
                } // end of bNode
            } // end of aNode["skos:broader"]   
        } // end if aNode
        
        
        console.log('crumbNodes',crumbNodes)
        // aNode.crumbNodes = crumbNodes
        
        console.log('crumbNodes.length',crumbNodes.length)
        for (let c=crumbNodes.length; c>0; c--) {
            // console.log('c ',c)
            // console.log('c-1 crumbNodes[c-1]',c-1,crumbNodes[c-1])
            
            let crumbNode = crumbNodes[c-1]
            
            let crumbId = crumbNode["@id"]
            let crumbLabel =  crumbNode["skos:prefLabel"]  || crumbNode["rdfs:label"]
            let crumbDescription = crumbNode["dc:description"]
            
            let Crumb = {
                id: crumbId ,
                label: crumbLabel ,
                description: crumbDescription 
            }
            
            CrumbTrail.push(Crumb)
            
        }
        
        
        aNode.CrumbTrail = CrumbTrail
        
       
    } catch (e) {
        console.error(dtstamp(),'getBreadCrumb error',e)
              	
    } finally {
        
      	console.log(dtstamp(),'ending getBreadCrumb')
      	console.log('CrumbTrail',CrumbTrail)
      	if (cb) cb(CrumbTrail)
      	return CrumbTrail
          	
    } // end try catch    
} //end getBreadCrumb
      
      
function makeBreadCrumbs(_graph,cb) {
    console.log(dtstamp(),'starting makeCrumbs')
    let Crumbs = [] ;
      
    try {
       
        let crumb = {} 
        
        for (let n=0; n<_graph.length; n++) {
            let aNode = _graph[n] ;
            // console.log("aNode:",aNode)
            // aNode.breadcrumbs = [] ;

            getBreadCrumb(_graph,aNode)
        
        } // end for n
        
        Crumbs.push(crumb)
       
    } catch (e) {
        console.error(dtstamp(),'makeCrumbs error',e)
              	
    } finally {
        
      	console.log(dtstamp(),'ending makeCrumbs')
      	
      	if (cb) cb(Crumbs)
      	return Crumbs
          	
    } // end try catch    
} //end makeCrumbs
      
function makeTreeFromGraph(_graph,startid,cb) {
      console.log(dtstamp(),'starting makeTreeFromGraph')
    
      let Tree = [] ;
      
      try {
        
        // let tmp = []
        
        // get starting id node first
        let rootNode = getNodeById(_graph,startid)
        console.log('rootNode:',rootNode)
        
        // set root node of tree
        Tree = rootNode
        
        
        // FIRST LEVEL
        // (a) level
        rootNode.parentOf = [] ;
        for (let n=0; n<rootNode.children.length; n++) {
	          let aNodeId = rootNode.children[n] ;
	         // console.log("aNodeId:",aNodeId)
	          let aNode = getNodeById(_graph,aNodeId)
	         // console.log("aNode:",aNode)
	          rootNode.parentOf.push(aNode)
	          aNode.parentOf = [] ;
	          
            
            
            // then do next (b) level...
            let aChilderen = aNode.children || []  // in case it does not exist
            for (let p=0; p<aChilderen.length; p++) {
  	          let bNodeId = aNode.children[p] ;
  	          let bNode = getNodeById(_graph,bNodeId)
  	          aNode.parentOf.push(bNode)
  	          bNode.parentOf = [] ;
  	         // console.log("bNode:",bNode)
  	          
              
              
              // then do next (c) level...
              let bChilderen = bNode.children || []  // in case it does not exist
              for (let p=0; p<bChilderen.length; p++) {
    	          let cNodeId = bNode.children[p] ;
    	          let cNode = getNodeById(_graph,cNodeId)
    	          bNode.parentOf.push(cNode)
    	          cNode.parentOf = [] ;
    	         // console.log("cNode:",cNode)
    	          
            
                
              } // end for
            } // end for
            
        } // end for
        
        
    } catch (e) {
        console.error(dtstamp(),'makeTreeFromGraph error',e)
          	
    } finally {
          
        
      	console.log(dtstamp(),'ending makeTreeFromGraph')
      	
      	if (cb) cb(Tree)
      	return Tree
          	
    } // end try catch    
} //end makeTreeFromGraph
  



//
// get child nodes of node and add ids to group
//
function getChildren(graph, node) {
    // console.log('getChildren')
    // console.log('getChildren of node',node)
    
    let parent_id = node.id || node['@id'];
    // if (parent_id === "foafiaf:Mission_Value_0") console.log('getChildren node',node)
    
    let childNodeIds = [];
    
    // if parant of...
    let childids1 = getChildNodeIds(node) ;
    // console.log('childids1',childids1)
    for (let x=0; x<childids1.length; x++) {
        if (childids1[x] != null) {
            if (!childNodeIds.includes(childids1[x])) {
                childNodeIds.push(childids1[x]);
            }  
        }
    }
    
    // if child of...
    let childids2 = getNodesByParentId(graph, parent_id) ;
    // console.log('childids2',childids2)
    for (let y=0; y<childids2.length; y++) {
        if (childids2[y] != null) {
            if (!childNodeIds.includes(childids2[y])) {
                childNodeIds.push(childids2[y]);
            }  
        }
    }
    
    // console.log(' childNodeIds', childNodeIds)
    // if (parent_id === "foafiaf:Scorecard_Adjacency") console.log('getChildren childNodeIds',childNodeIds)
    
    return childNodeIds
} // end getChildren



// get array of ids for child nodes of node
function getChildNodeIds(node) {        // get nodes are childeren if not narrower
    // console.log('getChildNodeIds')
    // console.log('getChildNodeIds',node)

    let NodeIds = []
    
    let parent_id = node.id || node['@id'];
    
    let _narrower = node.narrower || node['skos:narrower'] || null;
    let _supports = node.supports || node['skos:supports'] || null;
    
    // if narrower add appropriate ids
    if (_narrower != null)  {
        
        if ( (typeof _narrower) === 'string') {	
            let _nn = _narrower ;
            // console.log('_nn', _nn)
            NodeIds.push(_nn) ;
            
        } else {
            // console.log('_narrower.length',_narrower.length)
            for (let n = 0; n < _narrower.length; n++) {
                let _nn = _narrower[n]
                // console.log('_nn', _nn)
                NodeIds.push(_nn) ;
            }
        }
    } // end if _narrow
    
    // if supports add appropriate ids
    if (_supports != null)  {
        
        if ( (typeof _supports) === 'string') {	
            let _ss = _supports ;
            // console.log('_ss', _ss)
            NodeIds.push(_ss) ;
            
        } else {
            // console.log('_supports.length',_supports.length)
            for (let s = 0; s < _supports.length; s++) {
                let _ss = _supports[s]
                // console.log('_ss', _ss)
                NodeIds.push(_ss) ;
            }
        }
    } // end if _narrow

    // console.log('getChildNodeIds child NodeIds', NodeIds)
    return NodeIds;
} // end getChildNodeIds




function getParents(graph, node) {
    // console.log('getParents')
    let node_id = node.id || node['@id'];

    let parentNodeIds = [];

    let parentIds1 = getParentNodeIds(graph,node_id) ;
    // console.log('parentIds1',parentIds1)
    for (let x=0; x<parentIds1.length; x++) {
        if (parentIds1[x] != null) {
            if (!parentNodeIds.includes(parentIds1[x])) {
                parentNodeIds.push(parentIds1[x]);
            }  
        }
    }
    
    // if (parentNodeIds.length>0) console.log('node_id parentIds',node_id,parentNodeIds)
    return parentNodeIds
} // end getParents


function getNodesByParentId(graph, parent_id) {        // get nodes that have parent of parent_id  then add supports, predeccesor .... if not broader
    // console.log('getNodesByParentId')
    // console.log('getNodesByParentId parent_id: ', parent_id)
    
    let NodeIds = []
     // loop over nodes to determine if parent_id is parent and add id, group, title, label
	  for (let i = 0; i < graph.length; i++) {
	      let node = graph[i]
	   //   console.log('getNodesByParentId parent node: ',node)
  		  let _id = graph[i]['@id'];
  		// let _type = graph[i]['@type'];
  		// let _dbotype = graph[i]['dbo:type'] || null;
  		
  		    // let _scheme = graph[i]['skos:inScheme'] || null;
          let _broader = graph[i]['skos:broader'] || null;
          let _monitors = graph[i]['foafiaf:monitors'] || node['foafiaf:Monitors'] || null;
          let _supports = graph[i]['foafiaf:supports'] || node['foafiaf:Supports'] || null;
        //   let _predecessor = graph[i]['tmo:PredecessorDependency'] || null;
          // let _seccessor = graph[i]['tmo:SuccessorDependency'] || null;
          
          // let _scorecard = graph[i]['foafiaf:Scorecard'] || null;
          // let _measure = graph[i]['foafiaf:Measure'] || null;
          // let _project = graph[i]['foafiaf:Project'] || null;
          // let _strategy = graph[i]['foafiaf:Strategy'] || null;
          // let _spoke = graph[i]['foafiaf:Spoke'] || null;
          // let _segment = graph[i]['foafiaf:Segment'] || null;
          let _parent = graph[i]['foafiaf:Parent'] || null;
          let _parents = graph[i]['foafiaf:Parents'] || null;
          
          let addNode = false;
          
          if ( !(_id === parent_id) ) {              // filter our self as parent
              
              if (_parent === parent_id) {                                       // else if broader == parent then add node as a childe
                  addNode = true;
              }
              
              if (_parents != null)  {
                  // console.log('_parents.length',_parents.length)
                  for (let n = 0; n < _parents.length; n++) {
                      let _nn = _parents[n]
                      console.log('_nn', _nn)
                      if ( _nn === parent_id ) {
                          addNode = true;
                      }
                  }
                  
              } // end if _parents
              
              //// Fix to ensure not just blank
              
              
            //   if (_broader === parent_id) {                                       // else if broader == parent then add node as a childe
            //       addNode = true;
            //     //   console.log('_broader _id: ', _broader, _id)
            //   }
            // //   if (_monitors === parent_id) {                                       // else if broader == parent then add node as a childe
            //   if (_monitors  != null) {      
            //       addNode = true;
            //       console.log('_monitors _id: ', _monitors, _id)
            //   }
            //   if (_supports === parent_id) {                                       // else if broader == parent then add node as a childe
            //       addNode = true;
            //     //   console.log('_supports _id: ', _supports, _id)
            //   }
            
          } // end if self
          
          if ( addNode ) {
              // console.log('_id ', _id)
              NodeIds.push(_id)
          }
          
  } // end for

//   console.log('getNodesByParentId  NodeIds: ',NodeIds)
  return NodeIds;
	
} // end getNodesByParentId	

  
function getParentNodeIds(graph, node_id) {        // get node ids that are parents of node
    // console.log('getParentNodeIds')
    // console.log('getParentNodeIds', node_id)
    
    let NodeIds = [] ;
    
    // loop over nodes to determine parent and and add ids
  	for (let i = 0; i < graph.length; i++) {
    	let _id = graph[i]['@id'];
    	let _broader = graph[i]['skos:broader'] || null;
        let _parent = graph[i]['foafiaf:Parent'] || null;
        let _parents = graph[i]['foafiaf:Parents'] || null;
          
        if ( (_id === node_id) ) {              // filter on node_id node
          
              NodeIds.push(_parent) ;
              
              if (_parents != null)  {
                  if ( (typeof _parents) === 'string') {	
                          NodeIds.push(_parents) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents',_id,_parents)
                  } else {
                      // console.log('_parents.length',_parents.length)
                      for (let n = 0; n < _parents.length; n++) {
                          NodeIds.push(_parents[n]) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents[n]',_id,_parents[n])
                      }
                  }
              } // end if _parents
              
              
              if (_broader != null)  {
                  if ( (typeof _broader) === 'string') {	
                          NodeIds.push(_broader) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader',_id,_broader)
                  } else {
                      // console.log('_broader.length',_broader.length)
                      for (let n = 0; n < _broader.length; n++) {
                          NodeIds.push(_broader[n]) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader[n]',_id,_broader[n])
                      }
                  }
              } // end if _parents

          } // end if self

  	} // end for
	
	return NodeIds;
	
} // end getParentNodeIds




function getNodeById(_nodes, _id) {
// 	console.log('start getNodeById', _id)
	try {
		var theNode = null;
		
		var obj = _nodes;
// 		var targetProp = 'id'
		var targetProp = '@id'
		var targetValue = _id
		var finalResults = [];
		var result = findFirstObject(obj, targetProp, targetValue, finalResults)

		theNode = finalResults[0] || null ;
		
// 		console.log('theNode',theNode)
// 		return theNode

	}
	catch(e) {
	    console.error(Math.floor(Date.now() / 1000), e)
	} 
	finally {
		// finally
// 		console.log('finally getNodeById theNode',theNode)
		return theNode;
	}
}

function findFirstObject(obj, targetProp, targetValue, finalResults) {
  // https://jsfiddle.net/alexQch/5u6q2ybc/
//   console.log('findFirstObject ')
//   console.log('findFirstObject obj: ', obj)
//   console.log('findFirstObject targetProp: ', targetProp)
//   console.log('findFirstObject targetValue: ', targetValue)
  
  function getObject(theObject) {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    }
    else {
      for (let prop in theObject) {
        if(theObject.hasOwnProperty(prop)){
          if (prop === targetProp) {
            // console.log('--found id');
            if (theObject[prop] === targetValue) {
            //   console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject);
              
              // return after first find... a change from original
              return theObject
              
            }
          }
          if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
            getObject(theObject[prop]);
          }
        }
      }
    }
  }

  getObject(obj);

}
},{}],7:[function(require,module,exports){
// <!--https://www.html5rocks.com/en/tutorials/webcomponents/imports/-->
// <!--EXAMPEL STUFF-->
// <!--<link rel="stylesheet" href="bootstrap.css">-->
// <!--<link rel="stylesheet" href="fonts.css">-->
// <!--<script src="jquery.js"></script>-->
// <!--<script src="bootstrap.js"></script>-->
// <!--<script src="bootstrap-tooltip.js"></script>-->
// <!--<script src="bootstrap-dropdown.js"></script>-->
var wcl= require('./components/webcomponentsjs/webcomponents-loader.js');

var crt1= require("./carrotsearch.circles.js");
var crt2= require("./carrotsearch.circles.asserts.js");
var crt3= require("./carrotsearch.examples.onresizehook.js");
var crt4= require("./carrotsearch.examples.viewport.js");
var res= require('./reset.css')

var guj= require("./graphUtils.js");
var tjj= require("./transformGroups.js");

var mpc = require('./metricpopup.css');
var mpj = require('./metricpopup.js');

// var sbc = require('./sunburst.css');
// var sbs = require('./sunburst.js');

},{"./carrotsearch.circles.asserts.js":1,"./carrotsearch.circles.js":2,"./carrotsearch.examples.onresizehook.js":3,"./carrotsearch.examples.viewport.js":4,"./components/webcomponentsjs/webcomponents-loader.js":5,"./graphUtils.js":6,"./metricpopup.css":8,"./metricpopup.js":9,"./reset.css":11,"./transformGroups.js":12}],8:[function(require,module,exports){
var inject = require('./node_modules/cssify');
var css = "/*body {*/\n/*  font-family: Arial, sans-serif;*/\n/*  background: url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat;*/\n/*  background-size: cover;*/\n/*  height: 100vh;*/\n/*}*/\n\n/*h1 {*/\n/*  text-align: center;*/\n/*  font-family: Tahoma, Arial, sans-serif;*/\n/*  color: #06D85F;*/\n/*  margin: 80px 0;*/\n/*}*/\n\nspan#statusText {\n   font-family: Monospace;\n   font-size: 25px;\n   font-weight: bold;\n}\nspan#grpRank {\n   margin-top: 25px;\n}\n\n.metrictoplevel {\n    /*position: absolute;*/\n    /*width: 17%;*/\n    float: left;\n    z-index:100;\n    margin-top: 20px;\n    /*cursor: move;*/\n    border-style: solid;\n}\n.metrictheme {\n    /*position: absolute;*/\n    /*width: 17%;*/\n    float: left;\n    z-index:100;\n    margin-top: 10px;\n    /*cursor: move;*/\n    border-style: solid;\n}\n.metricpopup {\n    /*position: absolute;*/\n    width: 17%;\n    float: left;\n    z-index:100;\n    margin-top: 5px;\n    cursor: move;\n}\n\ndiv#myPopupBox {\n    position: fixed;\n    width: 25%;\n    float: left;\n    z-index:100;\n    cursor: move;\n}\n#resizable { width: 150px; height: 150px; padding: 0.5em; }\n#resizable h3 { text-align: center; margin: 0; }\n.ui-draggable, .ui-droppable {\n\tbackground-position: top;\n}\n#draggable { width: 150px; height: 150px; padding: 0.5em; }\n  \n.popup {\n  margin-top: 1%;\n  margin-right: auto;\n  margin-bottom: auto;\n  margin-left: 1%;\n  padding: 12px;\n  background: #fff;\n  border-color: #ddd;\n  border: 1px solid grey;\n  border-radius: 5px;\n  width: 99%;\n  position: relative;\n  /*transition: all 5s ease-in-out;*/\n}\n/*h1 {*/\n/*  text-align: center;*/\n/*  font-family: Tahoma, Arial, sans-serif;*/\n/*  color: #06D85F;*/\n/*  margin: 80px 0;*/\n/*}*/\n.popup h2 {\n  margin-top: 0;\n  margin-bottom: 2px;\n  margin-right: 5px;\n  color: #333;\n  font-size: 20px;\n  font-weight: bold;\n  font-family: Tahoma, Arial, sans-serif;\n}\n.popup .close {\n  position: absolute;\n  top: 3px;\n  right: 5px;\n  transition: all 200ms;\n  font-size: 30px;\n  font-weight: bold;\n  text-decoration: none;\n  color: #333;\n}\n.popup .close:hover {\n  color: #06D85F;\n}\n.popup .content {\n  max-height: 30%;\n  padding-top: 4px;\n  /*overflow: auto;*/\n}\n\n@media screen and (max-width: 700px){\n  .box{\n    width: 70%;\n  }\n  .popup{\n    width: 70%;\n  }\n}";
inject(css, undefined, '_1t20pq4');
module.exports = css;

},{"./node_modules/cssify":10}],9:[function(require,module,exports){
/**
 * Semantic Data Metric Detials Card
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
 'use strict';

module.exports = {
  myPopupFunction: myPopupFunction,
  myPopupClose: myPopupClose,
  myPopupOpen: myPopupOpen,
  setGroupDetails: setGroupDetails
}
  
// });
$( function() {
    $( "#resizable" ).resizable();
    $( "#myPopupBox" ).resizable();
  } );
$( function() {
    $( "#draggable" ).draggable();
    $( "#myPopupBox" ).draggable();
    $( "metricpopup" ).draggable();
  } );
function myPopupFunction(group) {
    console.log('myPopupFunction',group)
    var x = document.getElementById("myPopupBox");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function myPopupClose(group) {
    console.log('myPopupClose')
    var x = document.getElementById("myPopupBox");
    x.style.display = "none"
}
function myPopupOpen(group) {
    console.log('myPopupOpen')
    var x = document.getElementById("myPopupBox");
    x.style.display = "block"
}

//
// 
//
function getGrpLabel(group){
    return group.label;
}
function getGrpFull(group){
    let _full = group.full  || null ;
    if (_full != null) {
        return group.full;
    } else {
        return ""
    }
}
function getGrpDescription(group){
    let _description = group.description  || null ;
    if (_description != null) {
        return group.description;
    } else {
        return ""
    }
}
function getGrpStatus(group){
    let _status = group.status  || null ;
    if (_status != null) {
        return '<em>status:</em> <span style="display: inline-block; width: 10px;"></span>    <span id="statusText" ><font color="'+ group.status + '">' + group.status + '</font></span>';
    } else {
        return ""
    }
}
function getGrpValue(group){
    let _value = group.value  || null ;
    if (_value != null) {
        return'<i>value:</i>  <span style="display: inline-block; width: 5px;"></span>' + group.value  ;
    } else {
        return ""
    }
}
//
// !!! add condition of increasing red and decresing green !!
//
function getGrpTrend(group){
    let _datatrend = group.datatrend  || null ;
    if ((_datatrend != null) && (_datatrend != undefined)){
        let _ico = null
        if (_datatrend.includes('Better')) _ico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' +_datatrend + '" aria-hidden style="color: Green;"></i>'
        if (_datatrend.includes('Steady')) _ico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' +_datatrend + '" aria-hidden style="color: Black;"></i>'
        if (_datatrend.includes('Worse'))  _ico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' +_datatrend + '"  aria-hidden style="color: Red;"></i>'
        if (_ico != null) return '<em>5-year Trend:</em> ' + _ico ;
    } else {
        return ""
    }
}
function getGrpRank(group){
    let _rank = group.rank  || null ;
    if (_rank!== null) {
        return '<em>rank:</em>  <span style="display: inline-block; width: 5px;"></span>' + group.rank ;
    } else {
        return ""
    }
}
function getGrpTrendRank(group){
    let _ranktrend = group.ranktrend || null ;
    if ((_ranktrend != null) && (_ranktrend != undefined)) {
        let _rankico = null
        if (_ranktrend.includes('Better')) _rankico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' +_ranktrend + '" aria-hidden style="color: Green;"></i>'
        if (_ranktrend.includes('Steady')) _rankico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' +_ranktrend + '" aria-hidden style="color: Black;"></i>'
        if (_ranktrend.includes('Worse'))  _rankico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' +_ranktrend + '"  aria-hidden style="color: Red;"></i>'
        if (_rankico != null) return'<i>Trend in rank:</i> '  + _rankico ;
    } else {
        return ""
    }
}
function setGroupDetails(group) {
    // console.log('setGroupDetails',group)
    var x = document.getElementById("myPopupBox");
    
    var grpLabel = document.getElementById("grpLabel");
    grpLabel.innerHTML = getGrpLabel(group);
    
    // var grpFull = document.getElementById("grpFull");
    // let _full = group.full  || null ;
    // if (_full != null) {
    //     grpFull.innerHTML = getGrpFull(group);
    // } else {
    //     grpFull.innerHTML = ""
    // }
    
    var grpDescription = document.getElementById("grpDescription");
    let _description = group.description  || null ;
    if (_description != null) {
        grpDescription.innerHTML = getGrpDescription(group);
    } else {
        grpDescription.innerHTML = ""
    }
    
    var grpStatus = document.getElementById("grpStatus");
    let _status = group.status  || null ;
    if (_status != null) {
        grpStatus.innerHTML = getGrpStatus(group) ;
    } else {
        grpStatus.innerHTML = ""
    }
    
    // var grpUnits = document.getElementById("grpUnits");
    // grpUnits.innerHTML = '<em>units:</em> ' + group.units;
    
    var grpValue = document.getElementById("grpValue");
    let _value = group.value  || null ;
    if (_value != null) {
        grpValue.innerHTML = getGrpValue(group) ;
    } else {
        grpValue.innerHTML = ""
    }
    
    var grpTrend = document.getElementById("grpTrend");
    let _trend = group.datatrend  || null ;
    if (_trend != null) {
        grpTrend.innerHTML =  getGrpTrend(group) ;
    } else {
        grpTrend.innerHTML = ""
    }
    
    var grpRank = document.getElementById("grpRank");
    let _rank = group.rank  || null ;
    if (_rank!== null) {
        grpRank.innerHTML = getGrpRank(group) ;
    } else {
        grpRank.innerHTML = ""
    }
    
    var grpTrendRank = document.getElementById("grpTrendRank");
    let _ranktrend = group.ranktrend || null ;
    if (_ranktrend != null) {
        let _rankico = null
        grpTrendRank.innerHTML = getGrpTrendRank(group) ;
    } else {
        grpTrendRank.innerHTML = ""
    }
    
    return true
}




},{}],10:[function(require,module,exports){
'use strict'

function injectStyleTag (document, fileName, cb) {
  var style = document.getElementById(fileName)

  if (style) {
    cb(style)
  } else {
    var head = document.getElementsByTagName('head')[0]

    style = document.createElement('style')
    if (fileName != null) style.id = fileName
    cb(style)
    head.appendChild(style)
  }

  return style
}

module.exports = function (css, customDocument, fileName) {
  var doc = customDocument || document
  /* istanbul ignore if: not supported by Electron */
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css
    return sheet.ownerNode
  } else {
    return injectStyleTag(doc, fileName, function (style) {
      /* istanbul ignore if: not supported by Electron */
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.innerHTML = css
      }
    })
  }
}

module.exports.byUrl = function (url) {
  /* istanbul ignore if: not supported by Electron */
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode
  } else {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = url

    head.appendChild(link)
    return link
  }
}

},{}],11:[function(require,module,exports){
var inject = require('./node_modules/cssify');
var css = "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nhtml {\n  background-color: white;\n}";
inject(css, undefined, '_19ttkdj');
module.exports = css;

},{"./node_modules/cssify":10}],12:[function(require,module,exports){
'use strict';

    class Groups {
    
      
      transform(data, startid) {
    
          let transformed = transformGroups(data, startid, function(err, transformed) {
              if (err) {
                  return err;
              } else {
                  return transformed;
              }
            
          }); 
        
      };
      
    };
    module.exports = Groups;


    let GROUPS = {};
    function getGROUPS(data,cb) {
      	console.log('getGROUPS')
      	console.log(getGROUPS)
      // 	console.log('JSON',JSON.stringify(GROUPS))
      	
      	if (cb) cb(null, GROUPS)
      	return GROUPS
    }
    module.exports.getGROUPS = getGROUPS; 
    
// (function() {
//
// Process Scorecard and Metrics JSONLD to produce Cicle Groups hierarch
// Process only dbo:type foafiaf:Scorecard or foafiaf:Measure
//
  // temp data for testig    
  // let SCORECARD = {"@graph":[{"@id":"foafiaf:Scorecard_Top_25","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Community Transformation Scorecard","rdfs:label":"Top 25","dc:title":"A Top 25 Community","dc:description":"Informs us that are mission is to be a top 25 community","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_0","foafiaf:Parent":"","skos:broader":"foafiaf:Mission_Vision_0","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Top Level","@type":"skos:ConceptScheme","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecards","foaf:topic":"Scorecards: Indicator Scorecards","rdfs:label":"Top Level","dc:title":"Top Level Indicators","dc:description":"","skos:definition":"What does this top level indicator tell us about our transformation; what likey outcome or output does achieving this vision?","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Top Level","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_0","foafiaf:Parent":"","skos:broader":"foafiaf:Scorecard_0","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"foafiaf:perspective_TopLevel","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":"Top Level Indicators"},{"@id":"foafiaf:Scorecard_Recreate","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Recreate","rdfs:label":"Recreate","dc:title":"Recreating Sense of Place","dc:description":"Informs us of way we live and interact; A key to growing and sustaining our community","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Top Level","foafiaf:Parent":"foafiaf:Scorecard_0","skos:broader":"foafiaf:Scorecard_Top_25","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"3","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"foafiaf:perspective_TopLevel","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Reframe","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Reframe","rdfs:label":"Reframe","dc:title":"Reframing Our Opportunity","dc:description":"Informs us of our climate and hopes; A key to common vision for a better future","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Top Level","foafiaf:Parent":"foafiaf:Scorecard_0","skos:broader":"foafiaf:Scorecard_Top_25","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"foafiaf:perspective_TopLevel","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Renew","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Renew","rdfs:label":"Renew","dc:title":"Renewing Our People & Resiliency","dc:description":"Informs us about our people; A key to growth and resilience of our community","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Top Level","foafiaf:Parent":"foafiaf:Scorecard_0","skos:broader":"foafiaf:Scorecard_Top_25","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"foafiaf:perspective_TopLevel","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Resource","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Resource","rdfs:label":"Resource","dc:title":"Resourcing and Funding our Future","dc:description":"Informs us of way we fund and support our community; A key to enabling our transformation","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Top Level","foafiaf:Parent":"foafiaf:Scorecard_0","skos:broader":"foafiaf:Scorecard_Top_25","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"foafiaf:perspective_TopLevel","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Revitalize","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Revitalize","rdfs:label":"Revitalize","dc:title":"Revitalizing Our Economy & Infrastructure","dc:description":"Informs us of our economy and our infrastructure; A key support for successful and fulfilling lives","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Top Level","foafiaf:Parent":"foafiaf:Scorecard_0","skos:broader":"foafiaf:Scorecard_Top_25","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"foafiaf:perspective_TopLevel","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Themes","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Themes","rdfs:label":"Themes","dc:title":"Indictaor Themes","dc:description":"","skos:definition":"How does the theme inform us of intended outcomes? What key ourcomes or outputs does the theme monitor for us?","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Theme","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Top Level","foafiaf:Parent":"","skos:broader":"foafiaf:Scorecard_Top Level","skos:narrower":"","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:status":"","foafiaf:color":"","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Diversity","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Diversity","rdfs:label":"Diversity","dc:title":"","dc:description":"Informs us of the community's diverse populations by race, ethnicity, nationality, age and gender.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Recreate","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Recreate","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Equity","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Equity","rdfs:label":"Equity","dc:title":"","dc:description":"Informs us of differences in income and educational attainment of different socioeconomic groups in the community.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Recreate","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Recreate","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Neighborhoods","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Neighborhoods","rdfs:label":"Neighborhoods","dc:title":"","dc:description":"Informs us about the quality of housing and ammenities in our neighborhoods, as well as of the unity of neighborhoods.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Recreate","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Recreate","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"2","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Quality","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Quality","rdfs:label":"Quality","dc:title":"","dc:description":"Informs us of our dedication with quality in our community, our use of best practice to learn from, and our expectation of quality driven activities; key to the delivery of quality outcomes for all of us","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Recreate","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Recreate","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Citizenship","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Citizenship","rdfs:label":"Citizenship","dc:title":"","dc:description":"Informs us about civic engagement in our community in different forms.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Reframe","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Reframe","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Entertainment","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Entertainment","rdfs:label":"Entertainment","dc:title":"","dc:description":"Informs us of the communities’ ability to reveal and enhancecits identity through its history, culture, and the artistic expression of its members.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Reframe","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Reframe","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Pride","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Pride","rdfs:label":"Pride","dc:title":"","dc:description":"Informs us...","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Reframe","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Reframe","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Reputation","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Reputation","rdfs:label":"Reputation","dc:title":"","dc:description":"Informs us on the community’s ability to be recognized by national organizations for its affordable housing, safety, public spaces, job opportunities, health and educational attainment.  Public rankings are also a call for the community action and effective communication.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Reframe","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Reframe","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Education","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Education","rdfs:label":"Education","dc:title":"","dc:description":"Informs us on the evolution of educational attainment in our community and our capability of delivering Quality Education; A key to living filfilling lives","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Renew","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Renew","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"1","foafiaf:status":"Green","foafiaf:color":"#008000","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Safety","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Safety","rdfs:label":"Safety","dc:title":"","dc:description":"Informs us...","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Renew","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Renew","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"4","foafiaf:status":"Red","foafiaf:color":"#FF0000","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Services","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Services","rdfs:label":"Services","dc:title":"","dc:description":"Informs us of the community’s effort to address the needs of individuals through the actions of local organizations to achieve life changing results that improve the individuals and community’s situation.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Renew","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Renew","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Wellness","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Wellness","rdfs:label":"Wellness","dc:title":"","dc:description":"Informs us of our lifestyles and access to education and services to have good physical and behavioral health; key to healthy outcomes, thriving and having superior quality of live","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Renew","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Renew","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"2","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Funding","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Funding","rdfs:label":"Funding","dc:title":"","dc:description":"Informs us how our local governments and not for profits operating needs are supported financially and aligned with our community vision","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Resource","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Resource","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Growth","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Growth","rdfs:label":"Growth","dc:title":"","dc:description":"Informs us the regions growth rate and potential for business and payroll growth","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Resource","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Resource","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Investment","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Investment","rdfs:label":"Investment","dc:title":"","dc:description":"Informs us of capital investment in the community to stimulate growth.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Resource","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Resource","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Talent","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Talent","rdfs:label":"Talent","dc:title":"","dc:description":"Informs us of the region's available talent and skills to support future growth.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Resource","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Resource","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Economy","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Economy","rdfs:label":"Economy","dc:title":"","dc:description":"Informs us of our communities relative standard of living, cost of living and business growth versus comparable communities","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Revitalize","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Revitalize","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"3","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Employement","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Employement","rdfs:label":"Employement","dc:title":"","dc:description":"Informs us on the availability and quality of Jobs and the Sought-after Workforce; Key to Renessance of North American industry","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Revitalize","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Revitalize","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"3","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Environment","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Environment","rdfs:label":"Environment","dc:title":"","dc:description":"Informs us of the quality of the natural world around us and effectiveness of our efforts to protect and conserve; key to thriving, living healthy and pursuing happiness","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Revitalize","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Revitalize","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"0","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Infrastructure","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Infrastructure","rdfs:label":"Infrastructure","dc:title":"","dc:description":"Informs us of the robustness and accessibility of our public infrastructure; key to connecting with job opportunities and entertainment and recreation amenities","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Revitalize","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Revitalize","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"2","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Resilience","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Resilience","rdfs:label":"Resilience","dc:title":"","dc:description":"Informs us of economic Agility through deverisification the capability of people to be Engaged; Key to and Innovative economy","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Revitalize","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Themes","foafiaf:Parent":"foafiaf:Scorecard_Revitalize","skos:broader":"","skos:narrower":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"ROYG","foafiaf:targetvalue":"1","foafiaf:datavalues":"2","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""},{"@id":"foafiaf:Scorecard_Metrics","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Scorecard","foaf:topic":"Scorecard: Metrics","rdfs:label":"Metrics","dc:title":"Indictaor Metrics","dc:description":"","skos:definition":"How are indicator statuses determined? What metrics are used to compare our regions with others?","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Theme","foafiaf:categories":"Scorecard","skos:related":"","skos:inScheme":"foafiaf:Scorecard_Top Level","foafiaf:Parent":"","skos:broader":"foafiaf:Scorecard_Top Level","skos:narrower":"","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:status":"","foafiaf:color":"","foafiaf:monitors":"","foafiaf:supports":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","field33":"","field34":"","field35":"","field36":"","field37":""}],"@context":{},"@id":""}
  // let METRICS = {"@graph":[{"@id":"foafiaf:Measure_#_County_Health_Ranking_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# County Health Ranking","dc:title":"# / 102 IL county health outcome rank","dc:description":"# County Health Ranking","skos:definition":"http://www.countyhealthrankings.org/app/illinois/2018/rankings/winnebago/county/outcomes/overall/snapshot","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"1","foafiaf:datavalues":"85","foafiaf:datatrend":"","foafiaf:status":"Red","foafiaf:color":"#FF0000","foafiaf:rank":"85/102","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Wellness","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Wellness","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":"County Health Ranking"},{"@id":"foafiaf:Measure_#_Physical_Environment_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Physical Environment","dc:title":"# Physical Environment Ranking","dc:description":"# Physical Environment Ranking","skos:definition":"http://www.countyhealthrankings.org/app/illinois/2018/rankings/winnebago/county/outcomes/overall/snapshot","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"1","foafiaf:datavalues":"34","foafiaf:datatrend":"","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Wellness","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Wellness","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Obese_adults_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Obese adults","dc:title":"% Obese adults","dc:description":"Informs us of the percentage of adults that report BMI >= 30","skos:definition":"http://www.countyhealthrankings.org/app/illinois/2018/rankings/winnebago/county/outcomes/overall/snapshot","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Percent","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"69","foafiaf:datatrend":"Better","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:rank":"53/150","foafiaf:ranktrend":"","skos:related":"http://www.countyhealthrankings.org/sites/default/files/trends/Graphsv011/17_201_11_2018.png","foafiaf:monitors":"foafiaf:Scorecard_Wellness","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Wellness","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Physical_Inactivity_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Physical Inactivity","dc:title":"% Physical Inactivity","dc:description":"Percentage of adults age 20 and over reporting no leisure-time physical activity.","skos:definition":"http://www.countyhealthrankings.org/app/illinois/2018/rankings/winnebago/county/outcomes/overall/snapshot","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Percent","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"27","foafiaf:datatrend":"Stready","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:rank":"27/150","foafiaf:ranktrend":"","skos:related":"http://www.countyhealthrankings.org/sites/default/files/trends/Graphsv070/17_201_70_2018.png","foafiaf:monitors":"foafiaf:Scorecard_Wellness","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Wellness","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Uninsured_Rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Uninsured Rate","dc:title":"% Uninsured Rate","dc:description":"Informs us of the percentage of community members do not have health insurance, a key to wellness.","skos:definition":"http://www.countyhealthrankings.org/app/illinois/2018/rankings/winnebago/county/outcomes/overall/snapshot","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Percent","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"7","foafiaf:datatrend":"Better","foafiaf:status":"Green","foafiaf:color":"#008000","foafiaf:rank":"18/150","foafiaf:ranktrend":"","skos:related":"http://www.countyhealthrankings.org/sites/default/files/trends/Graphsv085/17_201_85_2018.png","foafiaf:monitors":"foafiaf:Scorecard_Wellness","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Wellness","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_With_Access_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% With Access","dc:title":"% With Access to exercise opportunities","dc:description":"Informs us of the percentage of the population with access to places for physical activity","skos:definition":"http://www.countyhealthrankings.org/app/illinois/2018/rankings/winnebago/county/outcomes/overall/snapshot","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Percent","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"93","foafiaf:datatrend":"","foafiaf:status":"Green","foafiaf:color":"#008000","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Wellness","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Wellness","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"2017","foafiaf:enddate":"2018","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Workforce_development_credentials_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Workforce development credentials","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Talent","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Talent","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Employment_growth_rates_in_largest_industries_by_employees_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Employment growth rates in largest industries by employees","dc:title":"","dc:description":"Informs us of ..","skos:definition":"Bureau of Labor Statistics, Occupational Employment Bureau of Labor Statistics, and Wages in Rockford, IL http://www.bls.gov/regions/midwest/news-release/occupationalemploymentandwages_rockford.htm","rdfs:comment":"Source: http://www.bls.gov/regions/midwest/news-release/occupationalemploymentandwages_rockford.htm","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Percent","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Talent","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Talent","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_with_Bachelor_Degree_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% with Bachelor Degree","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Percent","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Talent","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Talent","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_with_Post_Secondary_Degree_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% with Post Secondary Degree","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Percent","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Talent","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Talent","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Citizens_Assisting_Rockford_Police_(#_hours_$_value_#_events)_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Citizens Assisting Rockford Police (# hours, $ value, # events)","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"Rockstat https://rockfordil.gov/news/rockstat/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Safety","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Safety","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Domestic_Offences_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Domestic Offences","dc:title":"","dc:description":"Informs us of ..","skos:definition":"Illinois State Police - Crime in Illinois Annual Report http://www.isp.state.il.us/crime/ucrhome.cfm#anlrpts","rdfs:comment":"Source: http://www.isp.state.il.us/crime/ucrhome.cfm#anlrpts","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Safety","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Safety","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_per_1000000_Violent_Crime_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# per 1000,000 Violent Crime rate","dc:title":"","dc:description":"Informs us of the incidents of violent crime in a population area and is an indication of safety.","skos:definition":"FBI Crim in the US https://ucr.fbi.gov/crime-in-the-u.s","rdfs:comment":"Source: https://ucr.fbi.gov/crime-in-the-u.s","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Safety","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Safety","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_School_Incidents_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# School Incidents","dc:title":"","dc:description":"Informs us of ..","skos:definition":"Illinois State Police - Crime in Illinois Annual Report http://www.isp.state.il.us/crime/ucrhome.cfm#anlrpts","rdfs:comment":"Source: http://www.isp.state.il.us/crime/ucrhome.cfm#anlrpts","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Safety","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Safety","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Citizen_Survey_-_Do_I_feel_safe?_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Citizen Survey - Do I feel safe?","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Safety","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Safety","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Change_in_median_family_income_2000-2015_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Change in median family income, 2000-2015","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Resilience","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Resilience","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Change_labor_share_of_manufacturing_1970-2015_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Change, labor share of manufacturing, 1970-2015","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Resilience","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Resilience","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Labor_share_of_manufacturing_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Labor share of manufacturing","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Resilience","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Resilience","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Personal_per_capita_income_adjusted_for_inflation_(real_income)_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Personal per capita income adjusted for inflation (real income)","dc:title":"","dc:description":"Informs us of Real Personal Income","skos:definition":"","rdfs:comment":"Source: Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Resilience","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Resilience","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Wage_adjusted_for_inflation_(real_wage)_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Wage adjusted for inflation (real wage)","dc:title":"","dc:description":"Informs us of","skos:definition":"","rdfs:comment":"Source: Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Resilience","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Resilience","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Transit_Quality_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Transit Quality","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"Source: http://alltransit.cnt.org/metrics/#quality","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Quality","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Quality","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Regional_Organizations_Benchmarked_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Regional Organizations Benchmarked","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Quality","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Quality","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Results_from_RAVBC_Survey_-_Q#7_Q#11_Q#12_Q#13_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Results from RAVBC Survey - Q#7, Q#11, Q#12, Q#13","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"RAVBC Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Pride","foafiaf:TopLevel":"Reframe","foafiaf:Theme":"Pride","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Home_value_to_income_ratio_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Home value to income ratio","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Children_in_single_parent_households_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Children in single parent households","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"American Community Survey https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Homeownership_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Homeownership rate","dc:title":"","dc:description":"Informs us of percent of habitable housing that is unoccupied, excluding properties that are for seasonal, recreational, or occasional use","skos:definition":"American Community Survey https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml","rdfs:comment":"Source: The Distressed Communities Index (DCI)","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Neighborhoods_that_Self_Recognize/Total_Neighborhoods_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Neighborhoods that Self Recognize/Total Neighborhoods","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Severe_Housing_Problems_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Severe Housing Problems","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"County Health Rankings","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Vacancy_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Vacancy rate","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"American Community Survey https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Median_house_value_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Median house value","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"American Community Survey https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Median_monthly_housing_costs_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Median monthly housing costs","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Percent_rent-burdened_households_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Percent rent-burdened households","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"American Community Survey https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Neighborhoods","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Neighborhoods","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Patents_per_capita_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Patents per capita","dc:title":"","dc:description":"Informs us of the rate of innovation of our region","skos:definition":"USPTO http://www.patentsview.org/web/#viz/locations","rdfs:comment":"Source: USPTO http://www.patentsview.org/web/#viz/locations","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Investment","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Investment","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Capital_investment_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Capital investment","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"TR survey of RRS news, RAEDC survey of local businesses","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Investment","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Investment","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Aggregate_travel_time_to_work_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Aggregate travel time to work","dc:title":"","dc:description":"Informs us of ..","skos:definition":"American Community Survey","rdfs:comment":"Source: https://factfinder.census.gov/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Job_access_index_transit_access_index_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Job access index, transit access index","dc:title":"","dc:description":"Informs us of ..","skos:definition":"Housing and Transportation Index https://htaindex.cnt.org/","rdfs:comment":"Source: https://htaindex.cnt.org/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_bridges_structurally_deficient_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% bridges structurally deficient","dc:title":"","dc:description":"Informs us of the backlog of itransporations infrastructure that needs to be completed","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_of_highway_miles_in_good_condition_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% of highway miles in good condition","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"Source: http://www.idot.illinois.gov/Assets/uploads/files/Transportation-System/Reports/OP&P/Travel-Stats/FY%202016%20Condition%20Rating%20Survey%20Summary%20Report.pdf","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_Near_Transit_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population Near Transit","dc:title":"","dc:description":"Inform us of the ability of residents to get to work and entertainmnet vebues","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_without_internet_access_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population without internet access","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"Source: https://www.fcc.gov/reports-research/reports/broadband-progress-reports/2016-broadband-progress-report","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_roads_in_poor_condition_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% roads in poor condition","dc:title":"","dc:description":"Informs us of the backlog of critical road infrastructrue work that is neded","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Transport_to_work_by_walking_or_transit_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Transport to work by walking or transit","dc:title":"","dc:description":"Informs us of ..","skos:definition":"American Community Survey","rdfs:comment":"Source: https://factfinder.census.gov/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Infrastructure","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Infrastructure","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Business_payroll_growth_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Business payroll growth rate","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"County Business Patterns, US Census Bureau, https://www.census.gov/programs-surveys/cbp.html","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Growth","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Growth","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Change_in_Establishments_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Change in Establishments","dc:title":"","dc:description":"Informs us of percent change in the number of business establishments from 2011 to 2015","skos:definition":"","rdfs:comment":"County Business Patterns, US Census Bureau, https://www.census.gov/programs-surveys/cbp.html","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Growth","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Growth","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Growth_rate_of_Metropolitan_GDP_adjusted_for_inflation_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Growth rate of Metropolitan GDP adjusted for inflation","dc:title":"","dc:description":"Informs us of the percentage of change in GDP for the region. Key to economic prosperity and opportunity.","skos:definition":"Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/","rdfs:comment":"Source: Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Growth","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Growth","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_NONprofit_funding?_Gov_funding_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"NONprofit funding? Gov funding","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Funding","foafiaf:TopLevel":"Resource","foafiaf:Theme":"Funding","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Poverty_rate_by_race_ethnicity_gender_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Poverty rate by race, ethnicity, gender","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Equity","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Equity","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Educational_attainment_by_race_and_ethnicity_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Educational attainment by race and ethnicity","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Equity","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Equity","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Median_household_income_by_race_and_ethnicity_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Median household income by race and ethnicity","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Equity","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Equity","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Top_to_Bottom_Quintile_Income_Ratio_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Top to Bottom Quintile Income Ratio","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Equity","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Equity","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_tons_Annual_Greenhouse_Gases_per_Household_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# tons Annual Greenhouse Gases per Household","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"https://htaindex.cnt.org/fact-sheets/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Environment","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Environment","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#%_Participation_in_Arts/Rec_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"#% Participation in Arts/Rec","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"Annual Arts Basic Survey http://www.icpsr.umich.edu/icpsrweb/NADAC/studies/36424","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Entertainment","foafiaf:TopLevel":"Reframe","foafiaf:Theme":"Entertainment","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Jobs_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Jobs","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"Bureau of Labor Statistics, Occupational Employment Bureau of Labor Statistics, and Wages in Rockford, IL http://www.bls.gov/regions/midwest/news-release/occupationalemploymentandwages_rockford.htm","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Participation_in_Arts/Rec_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Participation in Arts/Rec","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Change_in_Employment_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Change in Employment","dc:title":"","dc:description":"Informs us of percent change in the number of jobs from 2011 to 2015","skos:definition":"","rdfs:comment":"Source: The Distressed Communities Index (DCI)","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Change_in_labor_force_participation_rate_2000-2015_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Change in labor force participation rate, 2000-2015","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Change_in_Real_GDP_for_Durable-goods_manufacturing_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Change in Real GDP for Durable-goods manufacturing","dc:title":"","dc:description":"Informs us of Percent Change in Real Gross Domestic Product (GDP) by Metropolitan Area, 2016* for Durable-goods manufacturing as compared to other regions","skos:definition":"","rdfs:comment":"Source: Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Labor_force_participation_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Labor force participation rate","dc:title":"","dc:description":"Informs us of Percent of our Population 16 years and over in the Civilian labor force","skos:definition":"Bureau of Labor Statistics","rdfs:comment":"Source: American Community Survey, US Census Bureau","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Unemployment_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Unemployment rate","dc:title":"","dc:description":"Informs us of Percent Unemployment Rate of region’s Civilian labor force","skos:definition":"Bureau of Labor Statistics","rdfs:comment":"Source: American Community Survey, US Census Bureau","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_with_Post-Secondary_Degree_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% with Post-Secondary Degree","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Median_Hourly_Wage_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Median Hourly Wage","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"Bureau of Labor Statistics, Occupational Employment Statistics https://www.bls.gov/oes/tables.htm","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Employement","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Employement","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_3rd_Graders_Read_at_Grade_Level_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% 3rd Graders Read at Grade Level","dc:title":"","dc:description":"Informs us of the percentage of students at each performance level on the PARCC assessments.","skos:definition":"Illinois Report Card by District: https://www.illinoisreportcard.com/","rdfs:comment":"Source: PARCC Includes 3rd Grade Scores Illinois Report Card by District https://www.illinoisreportcard.com/District.aspx?districtid=04101205025","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_8th_Grade_Math_at_grade_level_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% 8th Grade Math at grade level","dc:title":"","dc:description":"Informs us of the percentage of students at each performance level on the PARCC assessments.","skos:definition":"Source: Illinois Report Card by District https://www.illinoisreportcard.com/District.aspx?districtid=04101205025","rdfs:comment":"Illinois Report Card by District: https://www.illinoisreportcard.com/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Red","foafiaf:color":"#FF0000","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_College_or_Career_Ready_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"\"% College or Career Ready","dc:title":"","dc:description":"Informs us of ACT designated students with an ACT score of 21 or higher as being college ready.","skos:definition":"","rdfs:comment":"Source: College, but Not Career. College Readiness: https://www.illinoisreportcard.com/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_High_school_graduate_or_higher_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% High school graduate or higher","dc:title":"","dc:description":"Informs us of the percent of student who enroll have support and successfully complete requirements for high school graduation","skos:definition":"US Census Bureau - American Community Survey","rdfs:comment":"Source: Illinois Report Card by District https://www.illinoisreportcard.com/District.aspx?districtid=04101205025","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_with_a_bachelor’s_degree_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% with a bachelor’s degree","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_with_a_bachelor’s_degree_age_25_or_older_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% with a bachelor’s degree, age 25 or older","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_with_Bachelor_Degree_or_Higher_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% with Bachelor Degree or Higher","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Revitalizing_Our_Economy__Infrastructure_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Revitalizing Our Economy & Infrastructure","dc:title":"","dc:description":"Informs us of our economy and our infrastructure; A key support for successful and fulfilling lives\"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"","skos:inScheme":"","foafiaf:polarity":"17","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Education","foafiaf:TopLevel":"Renew","foafiaf:Theme":"Education","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Productivity_(output_per_worker)_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Productivity (output per worker)","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/ and Bureau of Labor Statistics","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_#_Regional_Price_Parities_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"# Regional Price Parities","dc:title":"","dc:description":"Informs us of cost of living relative to average US metro areas","skos:definition":"","rdfs:comment":"Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Poverty_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Poverty rate","dc:title":"","dc:description":"Informs us of the Poverty rate is reported here as the poverty rate for families, using the 2011-2015 5-year American Community Survey estimates.","skos:definition":"American Community Survey, US Census Bureau https://factfinder.census.gov/","rdfs:comment":"Source: https://factfinder.census.gov/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Median_household_income_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Median household income","dc:title":"","dc:description":"Informs us of an average of household income in dollars for a region.","skos:definition":"American Community Survey, US Census Bureau https://factfinder.census.gov/","rdfs:comment":"Source:  Median household income is drawn from 2011-2015 5-year American Community Survey estimates.","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$_Metropolitan_GDP_adjusted_for_inflation_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$ Metropolitan GDP adjusted for inflation","dc:title":"","dc:description":"Informs us of the size of economic output for a region. Key to size and scope of economic opportunity.","skos:definition":"","rdfs:comment":"Source: Bureau of Economic Analysis – Regional Economic Accounts http://www.bea.gov/regional/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_$(millions)_Metropolitan_GDP_adjusted_for_inflation_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"$(millions) Metropolitan GDP adjusted for inflation","dc:title":"","dc:description":"$14.8 billion in 2016 5-Year Trend: Better Peer Rank: 20 (1st Quartile) 5-Year Trend in Rank: Same","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"","skos:inScheme":"","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"$14,817","foafiaf:datatrend":"","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Median_Household_Income_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Median Household Income","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"","foafiaf:categories":"","skos:inScheme":"","foafiaf:polarity":"Increasing is good","foafiaf:timeperiodtype":"Quarter","foafiaf:unitofmeasure":"RYG","foafiaf:targetvalue":"Green","foafiaf:datavalues":"Green","foafiaf:datatrend":"","foafiaf:status":"Green","foafiaf:color":"#008000","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Poverty_Rate_(%_people)_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Poverty Rate (% people)","dc:title":"","dc:description":"Informs us of the Poverty rate is reported here as the poverty rate for families, using the 2011-2015 5-year American Community Survey estimates.","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"","skos:inScheme":"","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Yellow","foafiaf:color":"#FFFF00","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Productivity_(output_per_worker)_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Productivity (output per worker)","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"","skos:inScheme":"","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Regional_Price_Parity_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Regional Price Parity","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"","skos:inScheme":"","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Orange","foafiaf:color":"#FFA500","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Economy","foafiaf:TopLevel":"Revitalize","foafiaf:Theme":"Economy","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Foreign_born_population_share_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Foreign born population share","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Diversity","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Diversity","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_shares_by_age_(below_and_above_40)_and_gender_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population shares by age (below and above 40) and gender","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Diversity","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Diversity","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_shares_for_African_American_Asian_Hispanic_and_White_residents_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population shares for African American, Asian, Hispanic, and White residents","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau - American Community Survey","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Diversity","foafiaf:TopLevel":"Recreate","foafiaf:Theme":"Diversity","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_16+_Who_Volunteered_Past_Year_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population 16+ Who Volunteered Past Year","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"Number of respondents (16+) who reported having volunteered at least once in the last year/ Number of total residents (16+). U.S. Department of Labor, Bureau of Labor Statistics, Current Population Survey, Volunteer Supplement. http://www.volunteeringinamerica.gov/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Citizenship","foafiaf:TopLevel":"Reframe","foafiaf:Theme":"Citizenship","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_Younger_than_40_Who_Volunteered_Past_Year_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population Younger than 40 Who Volunteered Past Year","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"Number of respondents (16+) who reported having volunteered at least once in the last year/ Number of total residents (16+). U.S. Department of Labor, Bureau of Labor Statistics, Current Population Survey, Volunteer Supplement. http://www.volunteeringinamerica.gov/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Citizenship","foafiaf:TopLevel":"Reframe","foafiaf:Theme":"Citizenship","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Voter_Turnout_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Voter Turnout","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"US Census Bureau","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"foafiaf:Scorecard_Citizenship","foafiaf:TopLevel":"Reframe","foafiaf:Theme":"Citizenship","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Graduation_Rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Graduation Rate","dc:title":"","dc:description":"Informs us of the percent of public school students who graduate from high school","skos:definition":"","rdfs:comment":"Source: Illinois Report Card by District https://www.illinoisreportcard.com/District.aspx?districtid=04101205025","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Homeownership_rate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Homeownership rate","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Median_Income_Ratio_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Median Income Ratio","dc:title":"","dc:description":"Informs us of a geography’s median income expressed as a percentage of its state’s median income","skos:definition":"","rdfs:comment":"Source: The Distressed Communities Index (DCI)","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Meeting_Early_Grade_Reading_3rd_Grade_Standardized_Tests_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Meeting Early Grade Reading 3rd Grade Standardized Tests","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"https://www.illinoisreportcard.com/district.aspx?source=trends&source2=parcc.details&Districtid=04101205025","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_of_8th_grade_students_passing_Algebra_I_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% of 8th grade students passing Algebra I","dc:title":"","dc:description":"Informs us of the number of students who succeed in Algebra in middle school (measured by earning a C or above), which may put themselves on track for high school, college, and career readiness","skos:definition":"","rdfs:comment":"Source: Illinois Report Card by District https://www.illinoisreportcard.com/District.aspx?source=trends&source2=eighthgraderspassingalgebrai&Districtid=04101205025","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_of_Adults_w/o_a_High_School_Diploma_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% of Adults w/o a High School Diploma","dc:title":"","dc:description":"Informs us of percent of the population 25 years and older without a high school diploma or equivalent","skos:definition":"","rdfs:comment":"Source: The Distressed Communities Index (DCI)","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_of_grade_9_students_who_are_on_track_to_graduate_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% of grade 9 students who are on track to graduate","dc:title":"","dc:description":"Informs us of ..","skos:definition":"","rdfs:comment":"https://www.illinoisreportcard.com/District.aspx?source=trends&source2=freshmenontrack&Districtid=04101205025","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_of_Prime-Age_Adults_Not_in_Work_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% of Prime-Age Adults Not in Work","dc:title":"","dc:description":"Informs us of the percent of the prime-age population (ages 25-64) not currently in work","skos:definition":"","rdfs:comment":"Source: The Distressed Communities Index (DCI)","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_Completing_2__4_Year_Post-Secondary_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population Completing 2 & 4 Year Post-Secondary","dc:title":"","dc:description":"","skos:definition":"","rdfs:comment":"","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Population_Enrolled_in_1st_Year_Post-Secondary_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Population Enrolled in 1st Year Post-Secondary","dc:title":"","dc:description":"Informs us of","skos:definition":"","rdfs:comment":"Source: http://www.studentclearinghouse.org/colleges/enrollment_reporting/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Ready_for_College_Coursework_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Ready for College Coursework","dc:title":"","dc:description":"Informs us of high school graduate who are ready for college when they first enter into a school","skos:definition":"","rdfs:comment":"Source: Illinois Report Card by District https://www.illinoisreportcard.com/District.aspx?districtid=04101205025","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_%_Ready_for_Kindergarten_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"% Ready for Kindergarten","dc:title":"","dc:description":"Informs us of percentage of children who meet readiness milestones on the Kids Individual Development Survey (KIDS) as determined by teacher observations.","skos:definition":"","rdfs:comment":"Source: http://www.advanceillinois.org/2025/kindergarten.html","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"Year","foafiaf:unitofmeasure":"Value 0 Decimal","foafiaf:targetvalue":"100 %","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Income_inequality_(gini_coefficient)_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Income inequality (gini coefficient)","dc:title":"","dc:description":"Informs us of inequality in wages earned by full-time, full-year employed workers in each comparable city.","skos:definition":"","rdfs:comment":"Source: https://factfinder.census.gov/","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""},{"@id":"foafiaf:Measure_Regional_Price_Parities_","@type":"skos:Concept","rdf:type":"sioc:topic","dbo:type":"foafiaf:Measure","foaf:topic":"","rdfs:label":"Regional Price Parities","dc:title":"","dc:description":"Informs us of cost of living relative to average US metro areas","skos:definition":"","rdfs:comment":"Source: Bureau of Economic Analysis","dbo:abstract":"","foafiaf:keywords":"Indicator","foafiaf:categories":"Outcome","skos:inScheme":"foafiaf:Measure_0","foafiaf:polarity":"","foafiaf:timeperiodtype":"","foafiaf:unitofmeasure":"","foafiaf:targetvalue":"","foafiaf:datavalues":"","foafiaf:datatrend":"","foafiaf:status":"Cyan","foafiaf:color":"#00FFFF","foafiaf:rank":"","foafiaf:ranktrend":"","skos:related":"","foafiaf:monitors":"","foafiaf:TopLevel":"","foafiaf:Theme":"","foafiaf:Project":"","foafiaf:Strategy":"","foafiaf:Spoke":"","foafiaf:Segment":"","foafiaf:userdefinedfields":"","foafiaf:owner":"","foafiaf:ownedby":"","foafiaf:documents":"","foafiaf:image":"","tmo:PredecessorDependency":"","tmo:SuccessorDependency":"","foafiaf:startdate":"","foafiaf:enddate":"","foafiaf:shortname":""}],"@context":{},"@id":""}


  // GROUPS = transformGroups(SCORECARD,"")
    
   function transformGroups(data, startid, cb) {
      console.log('transformGroups')
      try {
        
        let d = new Date();
      	let starting  = new Date().getTime();
      	console.log('starting',starting)
      	
      	let defaultNodeId = startid || data['@id'] || "foafiaf:Scorecard_Top_25"
      	console.log('transformGroups defaultNodeId:', defaultNodeId)
      	
      	let graph = data['@graph'];
      // 	console.log ('transformGroups graph:', graph)
    	
        // 	prep node elements and define parents and children arrays
      	let gnodes = prepGraphNodes(graph)
      // 	console.log('transformGroups gnodes:',gnodes)
  	   // console.log('jsonNodes:',JSON.stringify(gnodes))
  	    
  	    let gtree = makeTreeOfNodes(gnodes,defaultNodeId)
  	   // console.log('transformGroups gtree:',gtree)
  	   // console.log('transformGroups gtree:',JSON.stringify(gtree))
  	    
  	    //
  	    // Remove Status Colors from wheel
  	    //
  	   // let StatusColors = {"group":"StatusColors","gcolor":"#ffffff","label":"Status Colors","weight":5,"groups":[{"label":"Cyan","full":"Color Cyan designates that data is not available or not updated","weight":1,"gcolor":"#00FFFF"},{"label":"Green","full":"Green status indicates top 25 percent of 1st quartile","weight":1,"gcolor":"#008000"},{"label":"Yellow","full":"Yellow status indicates top 50 percent of 2nd quartile","weight":1,"gcolor":"#FFFF00"},{"label":"Orange","full":"Orange status indicates top 75 percent of 3rd quartile","weight":1,"gcolor":"#FFA500"},{"label":"Red","full":"Red status indicates bottom 25 percent or 4th quartile","weight":1,"gcolor":"#FF0000"}]}
  	   // console.log('StatusColors:',StatusColors)
  	   // // console.log('jsonStatusColors:',JSON.stringify(StatusColors))
  	   // gtree[0].groups.push(StatusColors)
  	    
  	    GROUPS = {
  	        groups: gtree
  	    }
  	   // console.log('transformGroups GROUPS:',GROUPS)
  	   // console.log('jsonGROUPS:',JSON.stringify(GROUPS))
  	    
	    
      } catch (e) {
        console.error('transformGroups error',e)
        return e
          	
      } finally {
          
      	let ending = new Date().getTime();
      	console.log('transformGroups ending',ending)
      	
      	console.log('transformGroups returning GROUPS:',GROUPS)
      	if (cb) cb(null, GROUPS)
      	return GROUPS
          	
      } // end try catch    
   } //end transformGroups
   module.exports.transformGroups = transformGroups;
	
	
	
   //
   // Processing functions
   //
    	
  function makeTreeOfNodes(_nodes,startid,cb) {
      console.log('makeTreeOfNodes')
    
      let Tree = [] ;
      let Groups = [] ;
      let Children = [] ;    // sames as Groups
      
      try {
        
        // let tmp = []
        
        // get starting id node first
        let rootNode = getNodeById(_nodes,startid)
        // console.log('makeTreeOfNodes rootNode:',rootNode)
        
        // set root node of tree
        Tree = rootNode
        // console.log('makeTreeOfNodes rootNode:',rootNode)
        
        // Make groups at same time as node procssing
        let rootGroup = makeGroupFromNode(rootNode)
        // console.log('makeTreeOfNodes rootGroup:',JSON.stringify(rootGroup))
        
        Groups.push(rootGroup)
        // console.log('makeTreeOfNodes Groups.push(rootGroup):',JSON.stringify(Groups))
        
        Children.push(rootGroup)
        // console.log('makeTreeOfNodes Children.push(rootGroup):',Children)
        
        // FIRST LEVEL
        // (a) level
        rootNode.parentOf = [] ;
        for (let n=0; n<rootNode.children.length; n++) {
	          let aNodeId = rootNode.children[n] ;
	         // console.log("aNodeId:",aNodeId)
	          let aNode = getNodeById(_nodes,aNodeId)
	         // console.log("aNode:",aNode)
	          rootNode.parentOf.push(aNode)
	          aNode.parentOf = [] ;
	          
            let aGroup = makeGroupFromNode(aNode)
            rootGroup.groups.push(aGroup)
            rootGroup.children.push(aGroup)
            aGroup.groups = [] ;
            aGroup.children = [] ;
            
            // then do next (b) level...
            let aChilderen = aNode.children || []  // in case it does not exist
            for (let p=0; p<aChilderen.length; p++) {
  	          let bNodeId = aNode.children[p] ;
  	          let bNode = getNodeById(_nodes,bNodeId)
  	          aNode.parentOf.push(bNode)
  	          bNode.parentOf = [] ;
  	         // console.log("bNode:",bNode)
  	          
              let bGroup = makeGroupFromNode(bNode)
              aGroup.groups.push(bGroup)
              aGroup.children.push(bGroup)
              bGroup.groups = [] ;
              bGroup.children = [] ;
              
              // then do next (c) level...
              let bChilderen = bNode.children || []  // in case it does not exist
              for (let p=0; p<bChilderen.length; p++) {
    	          let cNodeId = bNode.children[p] ;
    	          let cNode = getNodeById(_nodes,cNodeId)
    	          bNode.parentOf.push(cNode)
    	          cNode.parentOf = [] ;
    	         // console.log("cNode:",cNode)
    	          
                let cGroup = makeGroupFromNode(cNode)
                bGroup.groups.push(cGroup)
                bGroup.children.push(cGroup)
                cGroup.groups = [] ;
                cGroup.children = [] ;
                
              } // end for
            } // end for
            
        } // end for
        
        
      } catch (e) {
        console.error('makeTreeOfNodes error',e)
          	
      } finally {
          
        
      	console.log('makeTreeOfNodes finished Tree:',Tree)
      	console.log('makeTreeOfNodes finished Groups:',Groups)
      	if (cb) cb(Groups)
      	return Groups
          	
      } // end try catch    
  } //end makeTreeOfNodes
  
  // function makeGroupsFromNodes(nodes,cb) {
  //   //   console.log('makeGroupsFromNodes')
  //     //
  //     // loop through nodes and organiza hierarchy of groups and child groups
  //     // remove node from array as processed...
      
  //     let Groups = [] ;
  //     try {
       
  //         for (let x=0; x < nodes.length; x++) {
	 //         let node = nodes[x] ;
	 //      //   console.log('makeGroupsFromNodes node:', node)
		          
	 //         let myGroup = {}
	          
	 //         let newGroup = makeGroupFromNode(node)
	 //      //   console.log('newGroup:',newGroup)
	 //         let groupID = newGroup.id
	 //      //   console.log('groupID:',groupID)
	          
	 //         // find current group if exists
	 //         let existingGroup = getNodeById(Groups,groupID) ;
	 //         //
	 //         // if group is already added to Groups.
	 //         // do not add again, modify the exiting one
	 //         //
	 //         if (existingGroup != null) {
	 //             myGroup = existingGroup
	 //            // console.log('myGroup existingGroup:', myGroup)
	 //         } else {
	 //             myGroup = newGroup
		//             Groups.push(myGroup)
		//             // console.log('myGroup newGroup',myGroup)
	 //         }
	          
	          
	 //         // develop hierarchy
	 //         let childGroups = []
	 //         if (node.children) {
	 //           for (let y=0; y < node.children.length; y++) {
  	              
  // 	              let childId = node.children[y] ;
  // 	              // console.log('makeGroupsFromNodes node[y] childId:', childId)
  	              
  // 	              let childNode = getNodeById(nodes,childId) ;
  // 	              // console.log('makeGroupsFromNodes node childNode:', childNode)
  	              
  // 	              let childGroup = makeGroupFromNode(childNode) ;
  // 	             // console.log('makeGroupsFromNodes node childGroup:', childGroup)
  	              
  // 	              childGroups.push(childGroup)
  // 	              myGroup.groups.push(childGroup)
  		           
	 //           } // end for node.children.length
	              
	 //         } // if node.childeren
		          
		          
		    
  //         } // end for nodes.length
       
           
  //     } catch (e) {
  //       console.error('makeGroupsFromNodes error',e)
          	
  //     } finally {
        
  //   //   	console.log('returning Groups:',Groups)
  //     	if (cb) cb(Groups)
  //     	return Groups
          	
  //     } // end try catch    
  // } //end makeGroupsFromNodes
   
      
   function makeGroupFromNode(node,cb) {
      // console.log('makeGroupFromNode', node)
      
      let Group = {} ;
      try {
 
          let _id = node['@id'];  
        
          if (_id != "./") {
            
              let newGroup = {};
      
              // newGroup.i = null;
              newGroup.id = node.id || node["@id"] ;
              newGroup.label = node.label ;
              newGroup.name = node.label ;
              newGroup.full = node.full ;
              newGroup.description = node.description ;
              
              newGroup.polarity = node.status ;
              
              newGroup.weight = 5 ;
              newGroup.status = node.status ;
              newGroup.gcolor = node.gcolor ;
              
              newGroup.polarity = node.polarity ;
              newGroup.units = node.unitofmeasure ;
              newGroup.target = node.targetvalue ;
              newGroup.value = node.datavalues ;
              // newGroup.year = node.datayear ;
              newGroup.datatrend = node.datatrend ;
              newGroup.rank = node.rank ;
              newGroup.ranktrend = node.ranktrend ;
              
              newGroup.ingroup = node.ingroup ;
              newGroup.group = node.ingroup ;
              
              newGroup.parent = null ;
              let pIds = node.parents || [] ;
              if (pIds[0] != undefined) {
                 let pid= pIds[0];
                 newGroup.parent = getNodeById(pid)
              }
              
              newGroup.groups = [] ;
              newGroup.children = [] ;
              
              Group = newGroup ;
          
          } // end if _id
          
          
      } catch (e) {
        console.error('makeGroupFromNode error',e)
          	
      } finally {
        
    //   	console.log('returning Group:',Group)
      	if (cb) cb(Group)
      	return Group
          	
      } // end try catch    
   } //end makeGroupFromNode
   
   
      
  function prepNewNode(node,cb) {
      // console.log('prepNewNode node:',node)     
      let Node = null ;
      try {
        
          let _id = node['@id'] || null;
        
          // filter nodes on  @type and dbo:type and align properties to Cicle 
          let _type = node['@type'] || null;  
          if (['skos:Concept','foafiaf:Concept'].indexOf(_type) >= 0) {
            
            let _dbotype = node['dbo:type'] || null;   
            if (['foafiaf:Scorecard', 'foafiaf:Metric'].indexOf(_dbotype) >= 0) {
              
              let _group = node['dbo:type'] || "Group";
              
            	let _label = node['rdfs:label'] || null;
            	let _title = node['dc:title'] || null;
            	let _description = node['dc:description'] || null;
            	
              let _broader = node['skos:broader'] || null;
              let _parent = node['foafiaf:Parent'] || null;
            	let _monitors = node['foafiaf:monitors'] || null;
            	
            	let _polarity = node['foafiaf:polarity'] || null;
            	let _timeperiodtype = node['foafiaf:timeperiodtype'] || null;
            	let _unitofmeasure = node['foafiaf:unitofmeasure'] || null;
            	let _targetvalue = node['foafiaf:targetvalue'] || null;
            	let _datavalues = node['foafiaf:datavalues'] || null;
            // 	let _datayear = node['foafiaf:datayear'] || null;
            	let _datatrend = node['foafiaf:datatrend'] || null;
            	let _rank = node['foafiaf:rank'] || null;
            	let _ranktrend = node['foafiaf:ranktrend'] || null;
            	let _status = node['foafiaf:status'] || null;
            	let _color = node['foafiaf:color'] || null;
     
     
              Node = node ;
              
              Node.id = _id ;
              Node.group = _group  ;
              Node.label = _label || _title ;
              Node.name = _title || _label ;
              Node.full = Node.name ;
              if (_description) Node.full = Node.name + ' - ' + _description ;
              Node.description = _description ;
              Node.weight = 10 ;
              
              Node.size = null ;
              
              Node.status = _status ;
              Node.gcolor = _color ;
              
              Node.polarity = _polarity ;
              Node.timeperiodtype = _timeperiodtype ;
              Node.unitofmeasure = _unitofmeasure ;
              Node.targetvalue = _targetvalue ;
              
              Node.datavalues = _datavalues ;
              // Node.datayear = _datayear
              Node.datatrend = _datatrend ;
              Node.rank = _rank ;
              Node.ranktrend = _ranktrend ;
              
              
              // console.log('_label',_label)
              // console.log('_monitors',_monitors)
              // console.log('_parent',_parent)
              // console.log('_broader',_broader)
              Node.ingroup = _monitors || _parent || _broader ;
              // console.log('Node.ingroup',Node.ingroup)
              // Node.groups = [] ;
              
              // console.log('Node.parent',Node.parent)
              // if (Node.ingroup = null) {
              //   Node = null ;
              //   return null ;
              // }
            } // end if in list	
          } // end if in list
          
      } catch (e) {
        console.error('prepNewNode error',e)
          	
      } finally {
        
      // 	console.log('returning Node:',Node)
      	if (cb) cb(Node)
      	return Node
          	
      } // end try catch    
   } //end prepNewNode
   
   
   function prepGraphNodes(graph) {
    //   console.log('prepGraphNodes')     
      let preppedNodes = [];
      
      for (let z = 0; z < graph.length; z++) {
		    let node = graph[z]
        // console.log('prepGraphNodes  z node',z,node)
        
        let _id = node['@id'];    
        
        if (_id != "./") {

            // let newNode = makeGroupFromNode(node) ;
            let newNode = prepNewNode(node) ;
            // console.log('prepGraphNodes returned newNode:',newNode)
            
            
            if (newNode != null) {
              // console.log('returned newNode.ingroup:',newNode.ingroup)
              
              
              
              //set i value
              newNode.i = z
            
            
            
              var childIds = getChildren(graph, node)
              if (childIds.length>0) {
                  // console.log('childIds',childIds)
                  newNode.children = childIds ;
                
              }
              
              var parentIds = getParents(graph, node)
              if (parentIds.length>0) {
                // console.log('node parentIds',node,parentIds)
                newNode.parents = parentIds;
              }
              
              
              preppedNodes.push(newNode)
              
            } // end if !null

        
        } // end if _id
      }
      
      
      // console.log('end preppedNodes',preppedNodes)
      // console.log('end prepGraphNode')
      return preppedNodes;
    } // end prepGraphNode
    
    
    //
    // get child nodes of node and add ids to group
    //
    function getChildren(graph, node) {
        // console.log('getChildren')
        // console.log('getChildren of node',node)
        
        let parent_id = node.id || node['@id'];
        // if (parent_id === "foafiaf:Mission_Value_0") console.log('getChildren node',node)
        
        let childNodeIds = [];
        
        // if parant of...
        let childids1 = getChildNodeIds(node) ;
        // console.log('childids1',childids1)
        for (let x=0; x<childids1.length; x++) {
            if (childids1[x] != null) {
                if (!childNodeIds.includes(childids1[x])) {
                    childNodeIds.push(childids1[x]);
                }  
            }
        }
        
        // if child of...
        let childids2 = getNodesByParentId(graph, parent_id) ;
        // console.log('childids2',childids2)
        for (let y=0; y<childids2.length; y++) {
            if (childids2[y] != null) {
                if (!childNodeIds.includes(childids2[y])) {
                    childNodeIds.push(childids2[y]);
                }  
            }
        }
        
        // console.log(' childNodeIds', childNodeIds)
        // if (parent_id === "foafiaf:Scorecard_Adjacency") console.log('getChildren childNodeIds',childNodeIds)
        
        return childNodeIds
    } // end getChildren
    
    
    
    // get array of ids for child nodes of node
    function getChildNodeIds(node) {        // get nodes are childeren if not narrower
        // console.log('getChildNodeIds')
        // console.log('getChildNodeIds',node)
    
        let NodeIds = []
        
        let parent_id = node.id || node['@id'];
        
        let _narrower = node.narrower || node['skos:narrower'] || null;
         
        // if narrower add appropriate ids
        if (_narrower != null)  {
            
            if ( (typeof _narrower) === 'string') {	
                let _nn = _narrower ;
                // console.log('_nn', _nn)
                NodeIds.push(_nn) ;
                
            } else {
                // console.log('_narrower.length',_narrower.length)
                for (let n = 0; n < _narrower.length; n++) {
                    let _nn = _narrower[n]
                    // console.log('_nn', _nn)
                    NodeIds.push(_nn) ;
                }
            }
        } // end if _narrow

        // console.log('getChildNodeIds child NodeIds', NodeIds)
        return NodeIds;
    } // end getChildNodeIds
    
    
    function getParents(graph, node) {
        // console.log('getParents')
        let node_id = node.id || node['@id'];

        let parentNodeIds = [];

        let parentIds1 = getParentNodeIds(graph,node_id) ;
        // console.log('parentIds1',parentIds1)
        for (let x=0; x<parentIds1.length; x++) {
            if (parentIds1[x] != null) {
                if (!parentNodeIds.includes(parentIds1[x])) {
                    parentNodeIds.push(parentIds1[x]);
                }  
            }
        }
        
        // if (parentNodeIds.length>0) console.log('node_id parentIds',node_id,parentNodeIds)
        return parentNodeIds
    } // end getParents
    
    
    function getNodesByParentId(graph, parent_id) {        // get nodes that have parent of parent_id  then add supports, predeccesor .... if not broader
        // console.log('getNodesByParentId')
        // console.log('getNodesByParentId', parent_id)
        
        // let listParentElements = ["skos:inScheme", "skos:broader"];         // so create list of child determinations and/or parent determinations?
        
        //let dboType = type || "";
        //console.log('dboType', type)
        //console.log('parent_id', parent_id)
        
        let NodeIds = []
        // loop over nodes to determine if parent_id is parent and add id, group, title, label
    	  for (let i = 0; i < graph.length; i++) {
    	      let node = graph[i]
      		  let _id = graph[i]['@id'];
      		// let _type = graph[i]['@type'];
      		// let _dbotype = graph[i]['dbo:type'] || null;
      		
      		    // let _scheme = graph[i]['skos:inScheme'] || null;
              let _broader = graph[i]['skos:broader'] || null;
              let _monitors = graph[i]['foafiaf:monitors'] || node['foafiaf:Monitors'] || null;
            //   let _supports = graph[i]['foafiaf:supports'] || node['foafiaf:Supports'] || null;
            //   let _predecessor = graph[i]['tmo:PredecessorDependency'] || null;
              // let _seccessor = graph[i]['tmo:SuccessorDependency'] || null;
              
              // let _scorecard = graph[i]['foafiaf:Scorecard'] || null;
              // let _measure = graph[i]['foafiaf:Measure'] || null;
              // let _project = graph[i]['foafiaf:Project'] || null;
              // let _strategy = graph[i]['foafiaf:Strategy'] || null;
              // let _spoke = graph[i]['foafiaf:Spoke'] || null;
              // let _segment = graph[i]['foafiaf:Segment'] || null;
              let _parent = graph[i]['foafiaf:Parent'] || null;
              let _parents = graph[i]['foafiaf:Parents'] || null;
              
              
              let addNode = false;
              
              if ( !(_id === parent_id) ) {              // filter our self as parent
                  
                  if (_parent === parent_id) {                                       // else if broader == parent then add node as a childe
                      addNode = true;
                      //console.log(_dbotype, _scheme, addNode)
                  }
                  
                  if (_parents != null)  {
                      // console.log('_parents.length',_parents.length)
                      for (let n = 0; n < _parents.length; n++) {
                          let _nn = _parents[n]
                          console.log('_nn', _nn)
                          if ( _nn === parent_id ) {
                              addNode = true;
                          }
                      }
                      
                  } // end if _parents
                  
                  if (_broader === parent_id) {                                       // else if broader == parent then add node as a childe
                      addNode = true;
                      //console.log(_dbotype, _broader, addNode)
                  }
                  if (_monitors === parent_id) {                                       // else if broader == parent then add node as a childe
                      addNode = true;
                      //console.log(_dbotype, _broader, addNode)
                  }
                //   if (_supports === parent_id) {                                       // else if broader == parent then add node as a childe
                //       addNode = true;
                //       //console.log(_dbotype, _broader, addNode)
                //   }
                  
                  
                
              } // end if self
              
              if ( addNode ) {
                  // console.log('_id ', _id)
                  NodeIds.push(_id)
              }
              
      } // end for
    
      return NodeIds;
    	
    } // end getNodesByParentId	
  
    
    
    function getParentNodeIds(graph, node_id) {        // get node ids that are parents of node
        // console.log('getParentNodeIds')
        // console.log('getParentNodeIds', node_id)
        
        let NodeIds = [] ;
        
        // loop over nodes to determine parent and and add ids
      	for (let i = 0; i < graph.length; i++) {
        		let _id = graph[i]['@id'];
        		
            
            let _broader = graph[i]['skos:broader'] || null;
              
            let _parent = graph[i]['foafiaf:Parent'] || null;
            let _parents = graph[i]['foafiaf:Parents'] || null;
              
            if ( (_id === node_id) ) {              // filter on node_id node
              
                  // if (_id === "foafiaf:Scorecard_Strong_Economy") console.log('getParentNodeIds node_id graph[i]',node_id,graph[i])
  
                  // NodeIds.push(_scheme) ;
                  // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _scheme',_id,_scheme)
                  
                  NodeIds.push(_parent) ;
                  // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parent',_id,_parent)
                  
                  if (_parents != null)  {
                      if ( (typeof _parents) === 'string') {	
                              NodeIds.push(_parents) ;
                              // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents',_id,_parents)
                      } else {
                          // console.log('_parents.length',_parents.length)
                          for (let n = 0; n < _parents.length; n++) {
                              NodeIds.push(_parents[n]) ;
                              // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents[n]',_id,_parents[n])
                          }
                      }
                  } // end if _parents
                  
                  
                  if (_broader != null)  {
                      if ( (typeof _broader) === 'string') {	
                              NodeIds.push(_broader) ;
                              // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader',_id,_broader)
                      } else {
                          // console.log('_broader.length',_broader.length)
                          for (let n = 0; n < _broader.length; n++) {
                              NodeIds.push(_broader[n]) ;
                              // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader[n]',_id,_broader[n])
                          }
                      }
                  } // end if _parents
                  
                  
                 
  
              } // end if self
  
      	} // end for
    	
    	return NodeIds;
    	
    } // end getParentNodeIds
    
   
function getNodeById(_nodes, _id) {
// 	console.log('start getNodeById', _id)
	try {
		var theNode = null;
		
		var obj = _nodes;
		var targetProp = 'id'
		var targetValue = _id
		var finalResults = [];
		var result = findFirstObject(obj, targetProp, targetValue, finalResults)
// 		var result = findObjects(myObject, 'id', '2', finalResults);
// 		console.log('findFirstObject finalResults:',finalResults)

		theNode = finalResults[0] || null ;
		
// 		console.log('theNode',theNode)
		return theNode

	}
	catch(e) {
	    console.error(Math.floor(Date.now() / 1000), e)
	} 
	finally {
		// finally
// 		console.log('finally getNodeById theNode',theNode)
		return theNode;
	}
}
function findFirstObject(obj, targetProp, targetValue, finalResults) {
  // https://jsfiddle.net/alexQch/5u6q2ybc/
  function getObject(theObject) {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    }
    else {
      for (let prop in theObject) {
        if(theObject.hasOwnProperty(prop)){
        //   console.log(prop + ': ' + theObject[prop]);
          if (prop === targetProp) {
            // console.log('--found id');
            if (theObject[prop] === targetValue) {
            //   console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject);
              
              // return after first find... a change from original
              return theObject
              
            }
          }
          if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
            getObject(theObject[prop]);
          }
        }
      }
    }
  }

  getObject(obj);

}
    
// })();
},{}]},{},[7]);
