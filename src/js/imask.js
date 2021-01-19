(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * dist/inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2020 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.5-beta.0
 */
!function webpackUniversalModuleDefinition(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(); else if ("function" == typeof define && define.amd) define([], factory); else {
        var a = factory();
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
    }
}(window, function() {
    return modules = [ function(module) {
        module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17,"KEY_229":229}');
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0, __webpack_require__(10);
        var _mask = __webpack_require__(11), _inputmask = _interopRequireDefault(__webpack_require__(9)), _window = _interopRequireDefault(__webpack_require__(6)), _maskLexer = __webpack_require__(19), _validationTests = __webpack_require__(3), _positioning = __webpack_require__(2), _validation = __webpack_require__(4), _inputHandling = __webpack_require__(5), _eventruler = __webpack_require__(12), _definitions = _interopRequireDefault(__webpack_require__(20)), _defaults = _interopRequireDefault(__webpack_require__(21));
        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj;
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _typeof(obj);
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var document = _window.default.document, dataKey = "_inputmask_opts";
        function Inputmask(alias, options, internal) {
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.dependencyLib = _inputmask.default, this.el = void 0, this.events = {}, this.maskset = void 0, 
            !0 !== internal && ("[object Object]" === Object.prototype.toString.call(alias) ? options = alias : (options = options || {}, 
            alias && (options.alias = alias)), this.opts = _inputmask.default.extend(!0, {}, this.defaults, options), 
            this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, 
            resolveAlias(this.opts.alias, options, this.opts)), this.refreshValue = !1, this.undoValue = void 0, 
            this.$el = void 0, this.skipKeyPressEvent = !1, this.skipInputEvent = !1, this.validationEvent = !1, 
            this.ignorable = !1, this.maxLength, this.mouseEnter = !1, this.originalPlaceholder = void 0, 
            this.isComposing = !1;
        }
        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
            _inputmask.default.extend(!0, opts, aliasDefinition), _inputmask.default.extend(!0, opts, options), 
            !0) : (null === opts.mask && (opts.mask = aliasStr), !1);
        }
        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
                var attrOption = "" === dataAttribute ? option : dataAttribute + "-" + option;
                optionData = void 0 !== optionData ? optionData : npt.getAttribute(attrOption), 
                null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = _window.default[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
                userOptions[option] = optionData);
            }
            if (!0 === opts.importDataAttributes) {
                var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;
                if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), 
                dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, 
                dataoptions) if ("alias" === p.toLowerCase()) {
                    optionData = dataoptions[p];
                    break;
                }
                for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), 
                opts) {
                    if (dataoptions) for (p in optionData = void 0, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                        optionData = dataoptions[p];
                        break;
                    }
                    importOption(option, optionData);
                }
            }
            return _inputmask.default.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), 
            "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), 
            opts.isRTL = !0), Object.keys(userOptions).length;
        }
        Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults: _defaults.default,
            definitions: _definitions.default,
            aliases: {},
            masksCache: {},
            get isRTL() {
                return this.opts.isRTL || this.opts.numericInput;
            },
            mask: function mask(elems) {
                var that = this;
                return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
                elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el, ndx) {
                    var scopedOpts = _inputmask.default.extend(!0, {}, that.opts);
                    if (importAttributeOptions(el, scopedOpts, _inputmask.default.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                        var maskset = (0, _maskLexer.generateMaskSet)(scopedOpts, that.noMasksCache);
                        void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, 
                        el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, 
                        el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = _inputmask.default.extend(!0, {}, that.userOptions), 
                        el.inputmask.el = el, el.inputmask.$el = (0, _inputmask.default)(el), el.inputmask.maskset = maskset, 
                        _inputmask.default.data(el, dataKey, that.userOptions), _mask.mask.call(el.inputmask));
                    }
                }), elems && elems[0] && elems[0].inputmask || this;
            },
            option: function option(options, noremask) {
                return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? (_inputmask.default.extend(this.userOptions, options), 
                this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
            },
            unmaskedvalue: function unmaskedvalue(value) {
                if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
                void 0 === this.el || void 0 !== value) {
                    var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
                    _inputHandling.checkVal.call(this, void 0, !1, !1, valueBuffer), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, _positioning.getBuffer.call(this), 0, this.opts);
                }
                return _inputHandling.unmaskedvalue.call(this, this.el);
            },
            remove: function remove() {
                if (this.el) {
                    _inputmask.default.data(this.el, dataKey, null);
                    var cv = this.opts.autoUnmask ? (0, _inputHandling.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask), valueProperty;
                    cv !== _positioning.getBufferTemplate.call(this).join("") ? this._valueSet(cv, this.opts.autoUnmask) : this._valueSet(""), 
                    _eventruler.EventRuler.off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value"), 
                    valueProperty && this.__valueGet && Object.defineProperty(this.el, "value", {
                        get: this.__valueGet,
                        set: this.__valueSet,
                        configurable: !0
                    })) : document.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), 
                    this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0;
                }
                return this.el;
            },
            getemptymask: function getemptymask() {
                return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
                _positioning.getBufferTemplate.call(this).join("");
            },
            hasMaskedValue: function hasMaskedValue() {
                return !this.opts.autoUnmask;
            },
            isComplete: function isComplete() {
                return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
                _validation.isComplete.call(this, _positioning.getBuffer.call(this));
            },
            getmetadata: function getmetadata() {
                if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
                Array.isArray(this.maskset.metadata)) {
                    var maskTarget = _validationTests.getMaskTemplate.call(this, !0, 0, !1).join("");
                    return this.maskset.metadata.forEach(function(mtdt) {
                        return mtdt.mask !== maskTarget || (maskTarget = mtdt, !1);
                    }), maskTarget;
                }
                return this.maskset.metadata;
            },
            isValid: function isValid(value) {
                if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), 
                value) {
                    var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
                    _inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
                } else value = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
                for (var buffer = _positioning.getBuffer.call(this), rl = _positioning.determineLastRequiredPosition.call(this), lmib = buffer.length - 1; rl < lmib && !_positioning.isMask.call(this, lmib); lmib--) ;
                return buffer.splice(rl, lmib + 1 - rl), _validation.isComplete.call(this, buffer) && value === (this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join(""));
            },
            format: function format(value, metadata) {
                this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
                var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
                _inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
                var formattedValue = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
                return metadata ? {
                    value: formattedValue,
                    metadata: this.getmetadata()
                } : formattedValue;
            },
            setValue: function setValue(value) {
                this.el && (0, _inputmask.default)(this.el).trigger("setvalue", [ value ]);
            },
            analyseMask: _maskLexer.analyseMask
        }, Inputmask.extendDefaults = function(options) {
            _inputmask.default.extend(!0, Inputmask.prototype.defaults, options);
        }, Inputmask.extendDefinitions = function(definition) {
            _inputmask.default.extend(!0, Inputmask.prototype.definitions, definition);
        }, Inputmask.extendAliases = function(alias) {
            _inputmask.default.extend(!0, Inputmask.prototype.aliases, alias);
        }, Inputmask.format = function(value, options, metadata) {
            return Inputmask(options).format(value, metadata);
        }, Inputmask.unmask = function(value, options) {
            return Inputmask(options).unmaskedvalue(value);
        }, Inputmask.isValid = function(value, options) {
            return Inputmask(options).isValid(value);
        }, Inputmask.remove = function(elems) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
            elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el) {
                el.inputmask && el.inputmask.remove();
            });
        }, Inputmask.setValue = function(elems, value) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
            elems = elems.nodeName ? [ elems ] : elems, elems.forEach(function(el) {
                el.inputmask ? el.inputmask.setValue(value) : (0, _inputmask.default)(el).trigger("setvalue", [ value ]);
            });
        }, Inputmask.dependencyLib = _inputmask.default, _window.default.Inputmask = Inputmask;
        var _default = Inputmask;
        exports.default = _default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.caret = caret, exports.determineLastRequiredPosition = determineLastRequiredPosition, 
        exports.determineNewCaretPosition = determineNewCaretPosition, exports.getBuffer = getBuffer, 
        exports.getBufferTemplate = getBufferTemplate, exports.getLastValidPosition = getLastValidPosition, 
        exports.isMask = isMask, exports.resetMaskSet = resetMaskSet, exports.seekNext = seekNext, 
        exports.seekPrevious = seekPrevious, exports.translatePosition = translatePosition;
        var _validationTests = __webpack_require__(3), _validation = __webpack_require__(4), _mask = __webpack_require__(11);
        function caret(input, begin, end, notranslate, isDelete) {
            var inputmask = this, opts = this.opts, range;
            if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, 
            end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
            range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, 
            end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), 
            end = begin + range.text.length), {
                begin: notranslate ? begin : translatePosition.call(this, begin),
                end: notranslate ? end : translatePosition.call(this, end)
            };
            if (Array.isArray(begin) && (end = this.isRTL ? begin[0] : begin[1], begin = this.isRTL ? begin[1] : begin[0]), 
            void 0 !== begin.begin && (end = this.isRTL ? begin.begin : begin.end, begin = this.isRTL ? begin.end : begin.begin), 
            "number" == typeof begin) {
                begin = notranslate ? begin : translatePosition.call(this, begin), end = notranslate ? end : translatePosition.call(this, end), 
                end = "number" == typeof end ? end : begin;
                var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
                    begin: begin,
                    end: end
                }, opts.insertModeVisual && !1 === opts.insertMode && begin === end && (isDelete || end++), 
                input === (input.inputmask.shadowRoot || document).activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end); else if (window.getSelection) {
                    if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                        var textNode = document.createTextNode("");
                        input.appendChild(textNode);
                    }
                    range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                    range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                    range.collapse(!0);
                    var sel = window.getSelection();
                    sel.removeAllRanges(), sel.addRange(range);
                } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), 
                range.moveEnd("character", end), range.moveStart("character", begin), range.select());
            }
        }
        function determineLastRequiredPosition(returnDefinition) {
            var inputmask = this, maskset = this.maskset, $ = this.dependencyLib, buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0, !0), bl = buffer.length, pos, lvp = getLastValidPosition.call(this), positions = {}, lvTest = maskset.validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0, testPos;
            for (pos = lvp + 1; pos < buffer.length; pos++) testPos = _validationTests.getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
            var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
            for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && _validation.checkAlternationMatch.call(this, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== _validationTests.getTests.call(this, pos)[0].def)) && buffer[pos] === _validationTests.getPlaceholder.call(this, pos, testPos.match)); pos--) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : void 0
            } : bl;
        }
        function determineNewCaretPosition(selectedCaret, tabbed) {
            var inputmask = this, maskset = this.maskset, opts = this.opts;
            function doRadixFocus(clickPos) {
                if ("" !== opts.radixPoint && 0 !== opts.digits) {
                    var vps = maskset.validPositions;
                    if (void 0 === vps[clickPos] || vps[clickPos].input === _validationTests.getPlaceholder.call(inputmask, clickPos)) {
                        if (clickPos < seekNext.call(inputmask, -1)) return !0;
                        var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
                        if (-1 !== radixPos) {
                            for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== _validationTests.getPlaceholder.call(inputmask, vp)) return !1;
                            return !0;
                        }
                    }
                }
                return !1;
            }
            if (tabbed && (inputmask.isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), 
            selectedCaret.begin === selectedCaret.end) {
                switch (opts.positionCaretOnClick) {
                  case "none":
                    break;

                  case "select":
                    selectedCaret = {
                        begin: 0,
                        end: getBuffer.call(inputmask).length
                    };
                    break;

                  case "ignore":
                    selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
                    break;

                  case "radixFocus":
                    if (doRadixFocus(selectedCaret.begin)) {
                        var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
                        selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
                        break;
                    }

                  default:
                    var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, !0), lastPosition = seekNext.call(inputmask, -1 !== lvclickPosition || isMask.call(inputmask, 0) ? lvclickPosition : -1);
                    if (clickPosition <= lastPosition) selectedCaret.end = selectedCaret.begin = isMask.call(inputmask, clickPosition, !1, !0) ? clickPosition : seekNext.call(inputmask, clickPosition); else {
                        var lvp = maskset.validPositions[lvclickPosition], tt = _validationTests.getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : void 0, lvp), placeholder = _validationTests.getPlaceholder.call(inputmask, lastPosition, tt.match);
                        if ("" !== placeholder && getBuffer.call(inputmask)[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask.call(inputmask, lastPosition, opts.keepStatic, !0) && tt.match.def === placeholder) {
                            var newPos = seekNext.call(inputmask, lastPosition);
                            (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos);
                        }
                        selectedCaret.end = selectedCaret.begin = lastPosition;
                    }
                }
                return selectedCaret;
            }
        }
        function getBuffer(noCache) {
            var inputmask = this, maskset = this.maskset;
            return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0), 
            void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer;
        }
        function getBufferTemplate() {
            var inputmask = this, maskset = this.maskset;
            return void 0 === maskset._buffer && (maskset._buffer = _validationTests.getMaskTemplate.call(this, !1, 1), 
            void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer;
        }
        function getLastValidPosition(closestTo, strict, validPositions) {
            var maskset = this.maskset, before = -1, after = -1, valids = validPositions || maskset.validPositions;
            for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
                var psNdx = parseInt(posNdx);
                valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), 
                closestTo <= psNdx && (after = psNdx));
            }
            return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
        }
        function isMask(pos, strict, fuzzy) {
            var inputmask = this, maskset = this.maskset, test = _validationTests.getTestTemplate.call(this, pos).match;
            if ("" === test.def && (test = _validationTests.getTest.call(this, pos).match), 
            !0 !== test.static) return test.fn;
            if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
            if (!0 !== strict && -1 < pos) {
                if (fuzzy) {
                    var tests = _validationTests.getTests.call(this, pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
                }
                var testTemplate = _validationTests.determineTestTemplate.call(this, pos, _validationTests.getTests.call(this, pos)), testPlaceHolder = _validationTests.getPlaceholder.call(this, pos, testTemplate.match);
                return testTemplate.match.def !== testPlaceHolder;
            }
            return !1;
        }
        function resetMaskSet(soft) {
            var maskset = this.maskset;
            maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
        }
        function seekNext(pos, newBlock, fuzzy) {
            var inputmask = this;
            void 0 === fuzzy && (fuzzy = !0);
            for (var position = pos + 1; "" !== _validationTests.getTest.call(this, position).match.def && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, fuzzy)); ) position++;
            return position;
        }
        function seekPrevious(pos, newBlock) {
            var inputmask = this, position = pos - 1;
            if (pos <= 0) return 0;
            for (;0 < position && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, !0)); ) position--;
            return position;
        }
        function translatePosition(pos) {
            var inputmask = this, opts = this.opts, el = this.el;
            return !this.isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = this._valueGet().length - pos), 
            pos;
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function getLocator(tst, align) {
            var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
            if ("" !== locator) for (;locator.length < align; ) locator += "0";
            return locator;
        }
        function getDecisionTaker(tst) {
            var decisionTaker = tst.locator[tst.alternation];
            return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), 
            void 0 !== decisionTaker ? decisionTaker.toString() : "";
        }
        function getPlaceholder(pos, test, returnPL) {
            var inputmask = this, opts = this.opts, maskset = this.maskset;
            if (test = test || getTest.call(this, pos).match, void 0 !== test.placeholder || !0 === returnPL) return "function" == typeof test.placeholder ? test.placeholder(opts) : test.placeholder;
            if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
            if (-1 < pos && void 0 === maskset.validPositions[pos]) {
                var tests = getTests.call(this, pos), staticAlternations = [], prevTest;
                if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if ("" !== tests[i].match.def && !0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), 
                !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
            }
            return test.def;
        }
        function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
            var inputmask = this, opts = this.opts, maskset = this.maskset, greedy = opts.greedy;
            clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
            var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos, jitRenderStatic;
            do {
                if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], 
                test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)); else {
                    testPos = getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), test = testPos.match, 
                    ndxIntlzr = testPos.locator.slice();
                    var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                    jitRenderStatic = jitRenderStatic && test.static && test.def !== opts.groupSeparator && null === test.fn || maskset.validPositions[pos - 1] && test.static && test.def !== opts.groupSeparator && null === test.fn, 
                    jitRenderStatic || !1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking ? maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)) : jitRenderStatic = !1;
                }
                pos++;
            } while ((void 0 === this.maxLength || pos < this.maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
            return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), 
            opts.greedy = greedy, maskTemplate;
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            var inputmask = this, maskset = this.maskset;
            return maskset.validPositions[pos] || determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
        }
        function determineTestTemplate(pos, tests) {
            var inputmask = this, opts = this.opts;
            pos = 0 < pos ? pos - 1 : 0;
            for (var altTest = getTest.call(this, pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
                var tst = tests[ndx];
                tstLocator = getLocator(tst, targetLocator.length);
                var distance = Math.abs(tstLocator - targetLocator);
                (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, 
                bestMatch = tst);
            }
            return bestMatch;
        }
        function getTest(pos, tests) {
            var inputmask = this, maskset = this.maskset;
            return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests.call(this, pos))[0];
        }
        function getTests(pos, ndxIntlzr, tstPs) {
            var inputmask = this, $ = this.dependencyLib, maskset = this.maskset, opts = this.opts, el = this.el, maskTokens = maskset.maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, latestMatch, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    function isFirstMatch(latestMatch, tokenGroup) {
                        var firstMatch = 0 === tokenGroup.matches.indexOf(latestMatch);
                        return firstMatch || tokenGroup.matches.every(function(match, ndx) {
                            return !0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), 
                            !firstMatch;
                        }), firstMatch;
                    }
                    function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                        var bestMatch, indexPos;
                        if ((maskset.tests[pos] || maskset.validPositions[pos]) && (maskset.tests[pos] || [ maskset.validPositions[pos] ]).every(function(lmnt, ndx) {
                            if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                            var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation, ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                            return (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, 
                            indexPos = ndxPos), !0;
                        }), bestMatch) {
                            var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation], locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                            return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1);
                        }
                        return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
                    }
                    function isSubsetOf(source, target) {
                        function expand(pattern) {
                            for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end; ) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i), 
                            expanded.push(pattern.charAt(i));
                            return expanded.join("");
                        }
                        return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")));
                    }
                    function staticCanMatchDefinition(source, target) {
                        return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1);
                    }
                    function setMergeLocators(targetMatch, altMatch) {
                        var alternationNdx = targetMatch.alternation, shouldMerge = void 0 === altMatch || alternationNdx === altMatch.alternation && -1 === targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]);
                        if (!shouldMerge && alternationNdx > altMatch.alternation) for (var i = altMatch.alternation; i < alternationNdx; i++) if (targetMatch.locator[i] !== altMatch.locator[i]) {
                            alternationNdx = i, shouldMerge = !0;
                            break;
                        }
                        if (shouldMerge) {
                            targetMatch.mloc = targetMatch.mloc || {};
                            var locNdx = targetMatch.locator[alternationNdx];
                            if (void 0 !== locNdx) {
                                if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), 
                                void 0 !== altMatch) {
                                    for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), 
                                    void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                    targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
                                }
                                return !0;
                            }
                            targetMatch.alternation = void 0;
                        }
                        return !1;
                    }
                    function isSameLevel(targetMatch, altMatch) {
                        if (targetMatch.locator.length !== altMatch.locator.length) return !1;
                        for (var locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) return !1;
                        return !0;
                    }
                    if (testPos > pos + opts._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
                    if (testPos === pos && void 0 === match.matches) return matches.push({
                        match: match,
                        locator: loopNdx.reverse(),
                        cd: cacheDependency,
                        mloc: {}
                    }), !0;
                    if (void 0 !== match.matches) {
                        if (match.isGroup && quantifierRecurse !== match) {
                            if (match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse), 
                            match) return !0;
                        } else if (match.isOptional) {
                            var optionalToken = match, mtchsNdx = matches.length;
                            if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), 
                            match) {
                                if (matches.forEach(function(mtch, ndx) {
                                    mtchsNdx <= ndx && (mtch.match.optionality = !0);
                                }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                                insertStop = !0, testPos = pos;
                            }
                        } else if (match.isAlternator) {
                            var alternateToken = match, malternateMatches = [], maltMatches, currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                            if (-1 === altIndex || "string" == typeof altIndex) {
                                var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [], amndx;
                                if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                                if (void 0 !== maskset.excludes[pos]) {
                                    for (var altIndexArrClone = altIndexArr.slice(), i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
                                        var excludeSet = maskset.excludes[pos][i].toString().split(":");
                                        loopNdx.length == excludeSet[1] && altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                                    }
                                    0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone);
                                }
                                (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                                for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                    amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), 
                                    alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), 
                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1], dropMatch = !1;
                                        altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, 
                                        setMergeLocators(altMatch);
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if ("string" != typeof altIndex || void 0 !== altMatch.alternation && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString())) {
                                                if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                    dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                                    break;
                                                }
                                                if (isSubsetOf(altMatch, altMatch2)) {
                                                    setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                    break;
                                                }
                                                if (isSubsetOf(altMatch2, altMatch)) {
                                                    setMergeLocators(altMatch2, altMatch);
                                                    break;
                                                }
                                                if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                    isSameLevel(altMatch, altMatch2) || void 0 !== el.inputmask.userOptions.keepStatic ? setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, 
                                                    malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch)) : opts.keepStatic = !0;
                                                    break;
                                                }
                                            }
                                        }
                                        dropMatch || malternateMatches.push(altMatch);
                                    }
                                }
                                matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, 
                                match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice();
                            } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                            if (match) return !0;
                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                            var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
                            if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup), match) {
                                if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, 
                                latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, 
                                latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                    insertStop = !0, testPos = pos;
                                    break;
                                }
                                return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), 
                                !0;
                            }
                        } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), 
                        match) return !0;
                    } else testPos++;
                }
                for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                    if (match && testPos === pos) return match;
                    if (pos < testPos) break;
                }
            }
            function mergeLocators(pos, tests) {
                var locator = [], alternation;
                return Array.isArray(tests) || (tests = [ tests ]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice(), 
                0 === locator.length && (locator = tests[0].locator.slice())) : tests.forEach(function(tst) {
                    "" !== tst.def && (0 === locator.length ? (alternation = tst.alternation, locator = tst.locator.slice()) : tst.locator[alternation] && -1 === locator[alternation].toString().indexOf(tst.locator[alternation]) && (locator[alternation] += "," + tst.locator[alternation]));
                })), locator;
            }
            if (-1 < pos && (void 0 === inputmask.maxLength || pos < inputmask.maxLength)) {
                if (void 0 === ndxIntlzr) {
                    for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos; ) previousPos--;
                    void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), 
                    cacheDependency = ndxInitializer.join(""), testPos = previousPos);
                }
                if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                    var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                    if (match && testPos === pos || pos < testPos) break;
                }
            }
            return 0 !== matches.length && !insertStop || matches.push({
                match: {
                    fn: null,
                    static: !0,
                    optionality: !1,
                    casing: null,
                    def: "",
                    placeholder: ""
                },
                locator: [],
                mloc: {},
                cd: cacheDependency
            }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), 
            maskset.tests[pos]);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.determineTestTemplate = determineTestTemplate, exports.getDecisionTaker = getDecisionTaker, 
        exports.getMaskTemplate = getMaskTemplate, exports.getPlaceholder = getPlaceholder, 
        exports.getTest = getTest, exports.getTests = getTests, exports.getTestTemplate = getTestTemplate;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.alternate = alternate, exports.checkAlternationMatch = checkAlternationMatch, 
        exports.isComplete = isComplete, exports.isValid = isValid, exports.refreshFromBuffer = refreshFromBuffer, 
        exports.revalidateMask = revalidateMask, exports.handleRemove = handleRemove;
        var _validationTests = __webpack_require__(3), _keycode = _interopRequireDefault(__webpack_require__(0)), _positioning = __webpack_require__(2), _eventhandlers = __webpack_require__(7);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
            var inputmask = this, $ = this.dependencyLib, opts = this.opts, maskset = this.maskset, validPsClone = $.extend(!0, {}, maskset.validPositions), tstClone = $.extend(!0, {}, maskset.tests), lastAlt, alternation, isValidRslt = !1, returnRslt = !1, altPos, prevAltPos, i, validPos, decisionPos, lAltPos = void 0 !== rAltPos ? rAltPos : _positioning.getLastValidPosition.call(this), nextPos, input, begin, end;
            if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, 
            end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = _validationTests.getTest.call(this, lastAlt), 
            alternation = prevAltPos.alternation; else for (;0 <= lAltPos; lAltPos--) if (altPos = maskset.validPositions[lAltPos], 
            altPos && void 0 !== altPos.alternation) {
                if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos;
            }
            if (void 0 !== alternation) {
                decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], 
                !0 !== maskPos && maskset.excludes[decisionPos].push((0, _validationTests.getDecisionTaker)(prevAltPos) + ":" + prevAltPos.alternation);
                var validInputs = [], resultPos = -1;
                for (i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), 
                resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), 
                delete maskset.validPositions[i];
                for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10; ) {
                    for (maskset.tests = {}, _positioning.resetMaskSet.call(this, !0), isValidRslt = !0, 
                    i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || _positioning.getLastValidPosition.call(this, void 0, !0) + 1, 
                    input = validInputs[i], isValidRslt = isValid.call(this, nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt), 
                    1 == maskPos && isValidRslt && (returnRslt = {
                        caretPos: i
                    });
                    if (isValidRslt) break;
                    if (_positioning.resetMaskSet.call(this), prevAltPos = _validationTests.getTest.call(this, decisionPos), 
                    maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), 
                    !maskset.excludes[decisionPos]) {
                        returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                        break;
                    }
                    var decisionTaker = (0, _validationTests.getDecisionTaker)(prevAltPos);
                    if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation)) {
                        returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                        break;
                    }
                    for (maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation), 
                    i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) delete maskset.validPositions[i];
                }
            }
            return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], 
            returnRslt;
        }
        function casing(elem, test, pos) {
            var opts = this.opts, maskset = this.maskset;
            switch (opts.casing || test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;

              case "lower":
                elem = elem.toLowerCase();
                break;

              case "title":
                var posBefore = maskset.validPositions[pos - 1];
                elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(_keycode.default.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                break;

              default:
                if ("function" == typeof opts.casing) {
                    var args = Array.prototype.slice.call(arguments);
                    args.push(maskset.validPositions), elem = opts.casing.apply(this, args);
                }
            }
            return elem;
        }
        function checkAlternationMatch(altArr1, altArr2, na) {
            for (var opts = this.opts, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
            for (var alndx = 0; alndx < altArr1.length; alndx++) if (altArrC.includes(altArr1[alndx])) {
                isMatch = !0;
                break;
            }
            return isMatch;
        }
        function handleRemove(input, k, pos, strict, fromIsValid) {
            var inputmask = this, maskset = this.maskset, opts = this.opts;
            if ((opts.numericInput || this.isRTL) && (k === _keycode.default.BACKSPACE ? k = _keycode.default.DELETE : k === _keycode.default.DELETE && (k = _keycode.default.BACKSPACE), 
            this.isRTL)) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            var lvp = _positioning.getLastValidPosition.call(this, void 0, !0), offset;
            if (pos.end >= _positioning.getBuffer.call(this).length && lvp >= pos.end && (pos.end = lvp + 1), 
            k === _keycode.default.BACKSPACE ? pos.end - pos.begin < 1 && (pos.begin = _positioning.seekPrevious.call(this, pos.begin)) : k === _keycode.default.DELETE && pos.begin === pos.end && (pos.end = _positioning.isMask.call(this, pos.end, !0, !0) ? pos.end + 1 : _positioning.seekNext.call(this, pos.end) + 1), 
            !1 !== (offset = revalidateMask.call(this, pos))) {
                if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== _validationTests.getTest.call(this, pos.begin).match.def.indexOf("|")) {
                    var result = alternate.call(this, !0);
                    if (result) {
                        var newPos = void 0 !== result.caret ? result.caret : result.pos ? _positioning.seekNext.call(this, result.pos.begin ? result.pos.begin : result.pos) : _positioning.getLastValidPosition.call(this, -1, !0);
                        (k !== _keycode.default.DELETE || pos.begin > newPos) && pos.begin;
                    }
                }
                !0 !== strict && (maskset.p = k === _keycode.default.DELETE ? pos.begin + offset : pos.begin);
            }
        }
        function isComplete(buffer) {
            var inputmask = this, opts = this.opts, maskset = this.maskset;
            if ("function" == typeof opts.isComplete) return opts.isComplete(buffer, opts);
            if ("*" !== opts.repeat) {
                var complete = !1, lrp = _positioning.determineLastRequiredPosition.call(this, !0), aml = _positioning.seekPrevious.call(this, lrp.l);
                if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                    complete = !0;
                    for (var i = 0; i <= aml; i++) {
                        var test = _validationTests.getTestTemplate.call(this, i).match;
                        if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== _validationTests.getPlaceholder.call(this, i, test)) {
                            complete = !1;
                            break;
                        }
                    }
                }
                return complete;
            }
        }
        function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
            var inputmask = this, $ = this.dependencyLib, opts = this.opts, el = inputmask.el, maskset = inputmask.maskset;
            function isSelection(posObj) {
                return inputmask.isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
            }
            strict = !0 === strict;
            var maskPos = pos;
            function processCommandObject(commandObj) {
                if (void 0 !== commandObj) {
                    if (void 0 !== commandObj.remove && (Array.isArray(commandObj.remove) || (commandObj.remove = [ commandObj.remove ]), 
                    commandObj.remove.sort(function(a, b) {
                        return b.pos - a.pos;
                    }).forEach(function(lmnt) {
                        revalidateMask.call(inputmask, {
                            begin: lmnt,
                            end: lmnt + 1
                        });
                    }), commandObj.remove = void 0), void 0 !== commandObj.insert && (Array.isArray(commandObj.insert) || (commandObj.insert = [ commandObj.insert ]), 
                    commandObj.insert.sort(function(a, b) {
                        return a.pos - b.pos;
                    }).forEach(function(lmnt) {
                        "" !== lmnt.c && isValid.call(inputmask, lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid);
                    }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
                        var refresh = commandObj.refreshFromBuffer;
                        refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), 
                        commandObj.refreshFromBuffer = void 0;
                    }
                    void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, 
                    commandObj = !0);
                }
                return commandObj;
            }
            function _isValid(position, c, strict) {
                var rslt = !1;
                return _validationTests.getTests.call(inputmask, position).every(function(tst, ndx) {
                    var test = tst.match;
                    if (_positioning.getBuffer.call(inputmask, !0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                        c: _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def,
                        pos: position
                    }, !1 === rslt) return !0;
                    var elem = void 0 !== rslt.c ? rslt.c : c, validatedPos = position;
                    return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def : elem, 
                    rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), 
                    !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c || !1 === revalidateMask.call(inputmask, pos, $.extend({}, tst, {
                        input: casing.call(inputmask, elem, test, validatedPos)
                    }), fromIsValid, validatedPos) && (rslt = !1), !1;
                }), rslt;
            }
            void 0 !== pos.begin && (maskPos = inputmask.isRTL ? pos.end : pos.begin);
            var result = !0, positionsClone = $.extend(!0, {}, maskset.validPositions);
            if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid) for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, 
            delete maskset.tests[i]);
            if ("function" == typeof opts.preValidation && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation.call(el, _positioning.getBuffer.call(inputmask), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), 
            result = processCommandObject(result)), !0 === result) {
                if (void 0 === inputmask.maxLength || maskPos < inputmask.maxLength) {
                    if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
                        var currentPosValid = maskset.validPositions[maskPos];
                        if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                            if (opts.insertMode || void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] || pos.end > maskPos) {
                                var skip = !1;
                                if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] && (result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, !0), 
                                !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), 
                                pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !_positioning.isMask.call(inputmask, maskPos, opts.keepStatic && 0 === maskPos)) for (var nPos = maskPos + 1, snPos = _positioning.seekNext.call(inputmask, maskPos, !1, 0 !== maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), 
                                !1 !== result) {
                                    result = trackbackPositions.call(inputmask, maskPos, void 0 !== result.pos ? result.pos : nPos) || result, 
                                    maskPos = nPos;
                                    break;
                                }
                            }
                        } else result = {
                            caret: _positioning.seekNext.call(inputmask, maskPos)
                        };
                    }
                } else result = !1;
                !1 !== result || !opts.keepStatic || !isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate.call(inputmask, !0)) : result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, void 0, pos), 
                !0 === result && (result = {
                    pos: maskPos
                });
            }
            if ("function" == typeof opts.postValidation && !0 !== fromIsValid && !0 !== validateOnly) {
                var postResult = opts.postValidation.call(el, _positioning.getBuffer.call(inputmask, !0), void 0 !== pos.begin ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval);
                void 0 !== postResult && (result = !0 === postResult ? result : postResult);
            }
            result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (_positioning.resetMaskSet.call(inputmask, !0), 
            maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions.call(inputmask, void 0, maskPos, !0);
            var endResult = processCommandObject(result);
            return endResult;
        }
        function positionCanMatchDefinition(pos, testDefinition, opts) {
            for (var inputmask = this, maskset = this.maskset, valid = !1, tests = _validationTests.getTests.call(this, pos), tndx = 0; tndx < tests.length; tndx++) {
                if (tests[tndx].match && (!(tests[tndx].match.nativeDef !== testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] || opts.shiftPositions && testDefinition.match.static) || tests[tndx].match.nativeDef === testDefinition.match.nativeDef)) {
                    valid = !0;
                    break;
                }
                if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
                    valid = void 0;
                    break;
                }
            }
            return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition.call(this, pos + maskset.jitOffset[pos], testDefinition, opts)), 
            valid;
        }
        function refreshFromBuffer(start, end, buffer) {
            var inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib, el = this.el, i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter, bffr = this.isRTL ? buffer.slice().reverse() : buffer;
            if (opts.skipOptionalPartCharacter = "", !0 === start) _positioning.resetMaskSet.call(this), 
            maskset.tests = {}, start = 0, end = buffer.length, p = _positioning.determineNewCaretPosition.call(this, {
                begin: 0,
                end: 0
            }, !1).begin; else {
                for (i = start; i < end; i++) delete maskset.validPositions[i];
                p = start;
            }
            var keypress = new $.Event("keypress");
            for (i = start; i < end; i++) {
                keypress.which = bffr[i].toString().charCodeAt(0), this.ignorable = !1;
                var valResult = _eventhandlers.EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
                !1 !== valResult && (p = valResult.forwardPosition);
            }
            opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
        }
        function trackbackPositions(originalPos, newPos, fillOnly) {
            var inputmask = this, maskset = this.maskset, $ = this.dependencyLib;
            if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) ;
            for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !_positioning.isMask.call(this, ps, !0)) {
                var vp = 0 == ps ? _validationTests.getTest.call(this, ps) : maskset.validPositions[ps - 1];
                if (vp) {
                    var tests = _validationTests.getTests.call(this, ps).slice();
                    "" === tests[tests.length - 1].match.def && tests.pop();
                    var bestMatch = _validationTests.determineTestTemplate.call(this, ps, tests), np;
                    if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {
                        input: _validationTests.getPlaceholder.call(this, ps, bestMatch.match, !0) || bestMatch.match.def
                    }), bestMatch.generatedInput = !0, revalidateMask.call(this, ps, bestMatch, !0), 
                    !0 !== fillOnly)) {
                        var cvpInput = maskset.validPositions[newPos].input;
                        return maskset.validPositions[newPos] = void 0, isValid.call(this, newPos, cvpInput, !0, !0);
                    }
                }
            }
        }
        function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
            var inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib;
            function IsEnclosedStatic(pos, valids, selection) {
                var posMatch = valids[pos];
                if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
                var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1], nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
                return prevMatch && nextMatch;
            }
            var offset = 0, begin = void 0 !== pos.begin ? pos.begin : pos, end = void 0 !== pos.end ? pos.end : pos;
            if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), validatedPos = void 0 !== validatedPos ? validatedPos : begin, 
            begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
                var positionsClone = $.extend(!0, {}, maskset.validPositions), lvp = _positioning.getLastValidPosition.call(this, void 0, !0), i;
                for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], 
                void 0 === validTest && delete maskset.tests[i + 1];
                var valid = !0, j = validatedPos, posMatch = j, t, canMatch;
                for (validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), 
                posMatch++, j++), i = validTest ? end : end - 1; i <= lvp; i++) {
                    if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
                        begin: begin,
                        end: end
                    }))) {
                        for (;"" !== _validationTests.getTest.call(this, posMatch).match.def; ) {
                            if (!1 !== (canMatch = positionCanMatchDefinition.call(this, posMatch, t, opts)) || "+" === t.match.def) {
                                "+" === t.match.def && _positioning.getBuffer.call(this, !0);
                                var result = isValid.call(this, posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                                if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid && canMatch) break;
                            } else valid = !1;
                            if (valid) {
                                void 0 === validTest && t.match.static && i === pos.begin && offset++;
                                break;
                            }
                            if (!valid && posMatch > maskset.maskLength) break;
                            posMatch++;
                        }
                        "" == _validationTests.getTest.call(this, posMatch).match.def && (valid = !1), posMatch = j;
                    }
                    if (!valid) break;
                }
                if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), _positioning.resetMaskSet.call(this, !0), 
                !1;
            } else validTest && _validationTests.getTest.call(this, validatedPos).match.cd === validTest.match.cd && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
            return _positioning.resetMaskSet.call(this, !0), offset;
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.applyInputValue = applyInputValue, exports.clearOptionalTail = clearOptionalTail, 
        exports.checkVal = checkVal, exports.HandleNativePlaceholder = HandleNativePlaceholder, 
        exports.unmaskedvalue = unmaskedvalue, exports.writeBuffer = writeBuffer;
        var _keycode = _interopRequireDefault(__webpack_require__(0)), _validationTests = __webpack_require__(3), _positioning = __webpack_require__(2), _validation = __webpack_require__(4), _environment = __webpack_require__(8), _eventhandlers = __webpack_require__(7);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function applyInputValue(input, value) {
            var inputmask = input ? input.inputmask : this, opts = inputmask.opts;
            input.inputmask.refreshValue = !1, "function" == typeof opts.onBeforeMask && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), 
            value = value.toString().split(""), checkVal(input, !0, !1, value), inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), 
            (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && -1 === _positioning.getLastValidPosition.call(inputmask) && input.inputmask._valueSet("");
        }
        function clearOptionalTail(buffer) {
            var inputmask = this;
            buffer.length = 0;
            for (var template = _validationTests.getMaskTemplate.call(this, !0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift()); ) buffer.push(lmnt);
            return buffer;
        }
        function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
            var inputmask = input ? input.inputmask : this, maskset = inputmask.maskset, opts = inputmask.opts, $ = inputmask.dependencyLib, inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = void 0, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
            function isTemplateMatch(ndx, charCodes) {
                for (var targetTemplate = _validationTests.getMaskTemplate.call(inputmask, !0, 0).slice(ndx, _positioning.seekNext.call(inputmask, ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1]; ) charCodeNdx--;
                var match = 0 === charCodeNdx && !_positioning.isMask.call(inputmask, ndx) && (_validationTests.getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx).match.static && _validationTests.getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === _validationTests.getTest.call(inputmask, ndx).match.nativeDef && (_validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx + 1).match.static && _validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
                if (!match && 0 < charCodeNdx && !_positioning.isMask.call(inputmask, ndx, !1, !0)) {
                    var nextPos = _positioning.seekNext.call(inputmask, ndx);
                    inputmask.caretPos.begin < nextPos && (inputmask.caretPos = {
                        begin: nextPos
                    });
                }
                return match;
            }
            opts.skipOptionalPartCharacter = "", _positioning.resetMaskSet.call(inputmask), 
            maskset.tests = {}, initialNdx = opts.radixPoint ? _positioning.determineNewCaretPosition.call(inputmask, {
                begin: 0,
                end: 0
            }).begin : 0, maskset.p = initialNdx, inputmask.caretPos = {
                begin: initialNdx
            };
            var staticMatches = [], prevCaretPos = inputmask.caretPos;
            if (inputValue.forEach(function(charCode, ndx) {
                if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === _validationTests.getPlaceholder.call(inputmask, ndx) && _positioning.isMask.call(inputmask, ndx, !0) && !1 === _validation.isValid.call(inputmask, ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++; else {
                    var keypress = new $.Event("_checkval");
                    keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
                    var lvp = _positioning.getLastValidPosition.call(inputmask, void 0, !0);
                    isTemplateMatch(initialNdx, charCodes) ? result = _eventhandlers.EventHandlers.keypressEvent.call(input || inputmask, keypress, !0, !1, strict, lvp + 1) : (result = _eventhandlers.EventHandlers.keypressEvent.call(input || inputmask, keypress, !0, !1, strict, inputmask.caretPos.begin), 
                    result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), 
                    inputmask.isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer.call(inputmask, void 0, _positioning.getBuffer.call(inputmask), result.forwardPosition, keypress, !1), 
                    inputmask.caretPos = {
                        begin: result.forwardPosition,
                        end: result.forwardPosition
                    }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos;
                }
            }), 0 < staticMatches.length) {
                var sndx, validPos, nextValid = _positioning.seekNext.call(inputmask, -1, void 0, !1);
                if (!_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && staticMatches.length <= nextValid || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0]) for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift()); ) {
                    var keypress = new $.Event("_checkval");
                    if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), 
                    result = _eventhandlers.EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), 
                    result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos); else if (!result) break;
                    nextSndx++;
                }
            }
            writeOut && writeBuffer.call(inputmask, input, _positioning.getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("")), 
            opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
        }
        function HandleNativePlaceholder(npt, value) {
            var inputmask = npt ? npt.inputmask : this;
            if (_environment.ie) {
                if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
                    var buffer = _positioning.getBuffer.call(inputmask).slice(), nptValue = npt.inputmask._valueGet();
                    if (nptValue !== value) {
                        var lvp = _positioning.getLastValidPosition.call(inputmask);
                        -1 === lvp && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : -1 !== lvp && clearOptionalTail.call(inputmask, buffer), 
                        writeBuffer(npt, buffer);
                    }
                }
            } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"));
        }
        function unmaskedvalue(input) {
            var inputmask = input ? input.inputmask : this, opts = inputmask.opts, maskset = inputmask.maskset;
            if (input) {
                if (void 0 === input.inputmask) return input.value;
                input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0));
            }
            var umValue = [], vps = maskset.validPositions;
            for (var pndx in vps) vps[pndx] && vps[pndx].match && (1 != vps[pndx].match.static || Array.isArray(maskset.metadata) && !0 !== vps[pndx].generatedInput) && umValue.push(vps[pndx].input);
            var unmaskedValue = 0 === umValue.length ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
            if ("function" == typeof opts.onUnMask) {
                var bufferValue = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join("");
                unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
            }
            return unmaskedValue;
        }
        function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
            var inputmask = input ? input.inputmask : this, opts = inputmask.opts, $ = inputmask.dependencyLib;
            if (event && "function" == typeof opts.onBeforeWrite) {
                var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        _validation.refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                        buffer = _positioning.getBuffer.call(inputmask, !0);
                    }
                    void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
                }
            }
            if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || _positioning.caret.call(inputmask, input, caretPos, void 0, void 0, void 0 !== event && "keydown" === event.type && (event.keyCode === _keycode.default.DELETE || event.keyCode === _keycode.default.BACKSPACE)), 
            !0 === triggerEvents)) {
                var $input = $(input), nptVal = input.inputmask._valueGet();
                input.inputmask.skipInputEvent = !0, $input.trigger("input"), setTimeout(function() {
                    nptVal === _positioning.getBufferTemplate.call(inputmask).join("") ? $input.trigger("cleared") : !0 === _validation.isComplete.call(inputmask, buffer) && $input.trigger("complete");
                }, 0);
            }
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var _default = "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;
        exports.default = _default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.EventHandlers = void 0;
        var _positioning = __webpack_require__(2), _keycode = _interopRequireDefault(__webpack_require__(0)), _environment = __webpack_require__(8), _validation = __webpack_require__(4), _inputHandling = __webpack_require__(5), _validationTests = __webpack_require__(3);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var EventHandlers = {
            keydownEvent: function keydownEvent(e) {
                var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset, input = this, $input = $(input), k = e.keyCode, pos = _positioning.caret.call(inputmask, input), kdResult = opts.onKeyDown.call(this, e, _positioning.getBuffer.call(inputmask), pos, opts);
                if (void 0 !== kdResult) return kdResult;
                if (k === _keycode.default.BACKSPACE || k === _keycode.default.DELETE || _environment.iphone && k === _keycode.default.BACKSPACE_SAFARI || e.ctrlKey && k === _keycode.default.X && !("oncut" in input)) e.preventDefault(), 
                _validation.handleRemove.call(inputmask, input, k, pos), (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask, !0), maskset.p, e, input.inputmask._valueGet() !== _positioning.getBuffer.call(inputmask).join("")); else if (k === _keycode.default.END || k === _keycode.default.PAGE_DOWN) {
                    e.preventDefault();
                    var caretPos = _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask));
                    _positioning.caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
                } else k === _keycode.default.HOME && !e.shiftKey || k === _keycode.default.PAGE_UP ? (e.preventDefault(), 
                _positioning.caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === _keycode.default.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? ((0, 
                _inputHandling.checkVal)(input, !0, !1, inputmask.undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === _keycode.default.TAB ? !0 === e.shiftKey ? (pos.end = _positioning.seekPrevious.call(inputmask, pos.end, !0), 
                !0 === _validationTests.getTest.call(inputmask, pos.end - 1).match.static && pos.end--, 
                pos.begin = _positioning.seekPrevious.call(inputmask, pos.end, !0), 0 <= pos.begin && 0 < pos.end && (e.preventDefault(), 
                _positioning.caret.call(inputmask, input, pos.begin, pos.end))) : (pos.begin = _positioning.seekNext.call(inputmask, pos.begin, !0), 
                pos.end = _positioning.seekNext.call(inputmask, pos.begin, !0), pos.end < maskset.maskLength && pos.end--, 
                pos.begin <= maskset.maskLength && (e.preventDefault(), _positioning.caret.call(inputmask, input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === _keycode.default.RIGHT ? setTimeout(function() {
                    var caretPos = _positioning.caret.call(inputmask, input);
                    _positioning.caret.call(inputmask, input, caretPos.begin);
                }, 0) : k === _keycode.default.LEFT && setTimeout(function() {
                    var caretPos_begin = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.begin), caretPos_end = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.end);
                    inputmask.isRTL ? _positioning.caret.call(inputmask, input, caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1)) : _positioning.caret.call(inputmask, input, caretPos_begin - (0 === caretPos_begin ? 0 : 1));
                }, 0));
                inputmask.ignorable = opts.ignorables.includes(k);
            },
            keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
                var inputmask = this.inputmask || this, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset, input = inputmask.el, $input = $(input), k = e.which || e.charCode || e.keyCode;
                if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) return k === _keycode.default.ENTER && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), 
                setTimeout(function() {
                    $input.trigger("change");
                }, 0)), inputmask.skipInputEvent = !0, !0;
                if (k) {
                    44 !== k && 46 !== k || 3 !== e.location || "" === opts.radixPoint || (k = opts.radixPoint.charCodeAt(0));
                    var pos = checkval ? {
                        begin: ndx,
                        end: ndx
                    } : _positioning.caret.call(inputmask, input), forwardPosition, c = String.fromCharCode(k);
                    maskset.writeOutBuffer = !0;
                    var valResult = _validation.isValid.call(inputmask, pos, c, strict, void 0, void 0, void 0, checkval);
                    if (!1 !== valResult && (_positioning.resetMaskSet.call(inputmask, !0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : _positioning.seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos), 
                    maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? _positioning.seekPrevious.call(inputmask, forwardPosition) : forwardPosition, 
                    !1 !== writeOut && (setTimeout(function() {
                        opts.onKeyValidation.call(input, k, valResult);
                    }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
                        var buffer = _positioning.getBuffer.call(inputmask);
                        (0, _inputHandling.writeBuffer)(input, buffer, forwardPosition, e, !0 !== checkval);
                    }
                    if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), 
                    valResult;
                }
            },
            keyupEvent: function keyupEvent(e) {
                var inputmask = this.inputmask;
                !inputmask.isComposing || e.keyCode !== _keycode.default.KEY_229 && e.keyCode !== _keycode.default.ENTER || inputmask.$el.trigger("input");
            },
            pasteEvent: function pasteEvent(e) {
                var inputmask = this.inputmask, opts = inputmask.opts, input = this, inputValue = inputmask._valueGet(!0), caretPos = _positioning.caret.call(inputmask, this), tempValue;
                inputmask.isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                if (valueBeforeCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
                valueAfterCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
                window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                    if (!e.clipboardData || !e.clipboardData.getData) return !0;
                    inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
                }
                var pasteValue = inputValue;
                if ("function" == typeof opts.onBeforePaste) {
                    if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
                    pasteValue = pasteValue || inputValue;
                }
                return (0, _inputHandling.checkVal)(this, !0, !1, pasteValue.toString().split(""), e), 
                e.preventDefault();
            },
            inputFallBackEvent: function inputFallBackEvent(e) {
                var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
                function ieMobileHandler(input, inputValue, caretPos) {
                    if (_environment.iemobile) {
                        var inputChar = inputValue.replace(_positioning.getBuffer.call(inputmask).join(""), "");
                        if (1 === inputChar.length) {
                            var iv = inputValue.split("");
                            iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
                        }
                    }
                    return inputValue;
                }
                function analyseChanges(inputValue, buffer, caretPos) {
                    for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl; ) frontPart.push("~");
                    for (;frontBufferPart.length < fpl; ) frontBufferPart.push("~");
                    for (;backPart.length < bpl; ) backPart.unshift("~");
                    for (;backBufferPart.length < bpl; ) backBufferPart.unshift("~");
                    var newBuffer = frontPart.concat(backPart), oldBuffer = frontBufferPart.concat(backBufferPart);
                    for (i = 0, bl = newBuffer.length; i < bl; i++) switch (placeholder = _validationTests.getPlaceholder.call(inputmask, _positioning.translatePosition.call(inputmask, i)), 
                    action) {
                      case "insertText":
                        oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1 && data.push(newBuffer[i]), 
                        i = bl;
                        break;

                      case "insertReplacementText":
                        "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                        break;

                      case "deleteContentBackward":
                        "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                        break;

                      default:
                        newBuffer[i] !== oldBuffer[i] && ("~" !== newBuffer[i + 1] && newBuffer[i + 1] !== placeholder && void 0 !== newBuffer[i + 1] || (oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) && "~" !== oldBuffer[i] ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", 
                        data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", 
                        data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", 
                        !_positioning.isMask.call(inputmask, _positioning.translatePosition.call(inputmask, i), !0) && oldBuffer[i] !== opts.radixPoint || caretPos.end++) : i = bl : (action = "insertText", 
                        data.push(newBuffer[i]), caretPos.begin--, caretPos.end--));
                        break;
                    }
                    return {
                        action: action,
                        data: data,
                        caret: caretPos
                    };
                }
                var input = this, inputValue = input.inputmask._valueGet(!0), buffer = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join(""), caretPos = _positioning.caret.call(inputmask, input, void 0, void 0, !0);
                if (buffer !== inputValue) {
                    inputValue = ieMobileHandler(input, inputValue, caretPos);
                    var changes = analyseChanges(inputValue, buffer, caretPos);
                    switch ((input.inputmask.shadowRoot || document).activeElement !== input && input.focus(), 
                    (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask)), 
                    _positioning.caret.call(inputmask, input, caretPos.begin, caretPos.end, !0), changes.action) {
                      case "insertText":
                      case "insertReplacementText":
                        changes.data.forEach(function(entry, ndx) {
                            var keypress = new $.Event("keypress");
                            keypress.which = entry.charCodeAt(0), inputmask.ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                        }), setTimeout(function() {
                            inputmask.$el.trigger("keyup");
                        }, 0);
                        break;

                      case "deleteContentBackward":
                        var keydown = new $.Event("keydown");
                        keydown.keyCode = _keycode.default.BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);
                        break;

                      default:
                        (0, _inputHandling.applyInputValue)(input, inputValue);
                        break;
                    }
                    e.preventDefault();
                }
            },
            compositionendEvent: function compositionendEvent(e) {
                var inputmask = this.inputmask;
                inputmask.isComposing = !1, inputmask.$el.trigger("input");
            },
            setValueEvent: function setValueEvent(e, argument_1, argument_2) {
                var inputmask = this.inputmask, input = this, value = e && e.detail ? e.detail[0] : argument_1;
                void 0 === value && (value = this.inputmask._valueGet(!0)), (0, _inputHandling.applyInputValue)(this, value), 
                (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && _positioning.caret.call(inputmask, this, e.detail ? e.detail[1] : argument_2);
            },
            focusEvent: function focusEvent(e) {
                var inputmask = this.inputmask, opts = inputmask.opts, input = this, nptValue = this.inputmask._valueGet();
                opts.showMaskOnFocus && nptValue !== _positioning.getBuffer.call(inputmask).join("") && (0, 
                _inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask))), 
                !0 !== opts.positionCaretOnTab || !1 !== inputmask.mouseEnter || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && -1 !== _positioning.getLastValidPosition.call(inputmask) || EventHandlers.clickEvent.apply(this, [ e, !0 ]), 
                inputmask.undoValue = _positioning.getBuffer.call(inputmask).join("");
            },
            invalidEvent: function invalidEvent(e) {
                this.inputmask.validationEvent = !0;
            },
            mouseleaveEvent: function mouseleaveEvent() {
                var inputmask = this.inputmask, opts = inputmask.opts, input = this;
                inputmask.mouseEnter = !1, opts.clearMaskOnLostFocus && (this.inputmask.shadowRoot || document).activeElement !== this && (0, 
                _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
            },
            clickEvent: function clickEvent(e, tabbed) {
                var inputmask = this.inputmask, input = this;
                if ((this.inputmask.shadowRoot || document).activeElement === this) {
                    var newCaretPosition = _positioning.determineNewCaretPosition.call(inputmask, _positioning.caret.call(inputmask, this), tabbed);
                    void 0 !== newCaretPosition && _positioning.caret.call(inputmask, this, newCaretPosition);
                }
            },
            cutEvent: function cutEvent(e) {
                var inputmask = this.inputmask, maskset = inputmask.maskset, input = this, pos = _positioning.caret.call(inputmask, this), clipboardData = window.clipboardData || e.clipboardData, clipData = inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice(pos.end, pos.begin) : _positioning.getBuffer.call(inputmask).slice(pos.begin, pos.end);
                clipboardData.setData("text", inputmask.isRTL ? clipData.reverse().join("") : clipData.join("")), 
                document.execCommand && document.execCommand("copy"), _validation.handleRemove.call(inputmask, this, _keycode.default.DELETE, pos), 
                (0, _inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join(""));
            },
            blurEvent: function blurEvent(e) {
                var inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib, $input = $(this), input = this;
                if (this.inputmask) {
                    (0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
                    var nptValue = this.inputmask._valueGet(), buffer = _positioning.getBuffer.call(inputmask).slice();
                    "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === _positioning.getLastValidPosition.call(inputmask) && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), 
                    !1 === _validation.isComplete.call(inputmask, buffer) && (setTimeout(function() {
                        $input.trigger("incomplete");
                    }, 0), opts.clearIncomplete && (_positioning.resetMaskSet.call(inputmask), buffer = opts.clearMaskOnLostFocus ? [] : _positioning.getBufferTemplate.call(inputmask).slice())), 
                    (0, _inputHandling.writeBuffer)(this, buffer, void 0, e)), inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), 
                    $input.trigger("change"));
                }
            },
            mouseenterEvent: function mouseenterEvent() {
                var inputmask = this.inputmask, opts = inputmask.opts, input = this;
                inputmask.mouseEnter = !0, (this.inputmask.shadowRoot || document).activeElement !== this && (null == inputmask.originalPlaceholder && this.placeholder !== inputmask.originalPlaceholder && (inputmask.originalPlaceholder = this.placeholder), 
                opts.showMaskOnHover && (0, _inputHandling.HandleNativePlaceholder)(this, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")));
            },
            submitEvent: function submitEvent() {
                var inputmask = this.inputmask, opts = inputmask.opts;
                inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && inputmask.$el.trigger("change"), 
                opts.clearMaskOnLostFocus && -1 === _positioning.getLastValidPosition.call(inputmask) && inputmask._valueGet && inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && inputmask._valueSet(""), 
                opts.clearIncomplete && !1 === _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && inputmask._valueSet(""), 
                opts.removeMaskOnSubmit && (inputmask._valueSet(inputmask.unmaskedvalue(), !0), 
                setTimeout(function() {
                    (0, _inputHandling.writeBuffer)(inputmask.el, _positioning.getBuffer.call(inputmask));
                }, 0));
            },
            resetEvent: function resetEvent() {
                var inputmask = this.inputmask;
                inputmask.refreshValue = !0, setTimeout(function() {
                    (0, _inputHandling.applyInputValue)(inputmask.el, inputmask._valueGet(!0));
                }, 0);
            }
        };
        exports.EventHandlers = EventHandlers;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.iphone = exports.iemobile = exports.mobile = exports.ie = exports.ua = void 0;
        var ua = window.navigator && window.navigator.userAgent || "", ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"), mobile = "ontouchstart" in window, iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
        exports.iphone = iphone, exports.iemobile = iemobile, exports.mobile = mobile, exports.ie = ie, 
        exports.ua = ua;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var _extend = _interopRequireDefault(__webpack_require__(13)), _window = _interopRequireDefault(__webpack_require__(6)), _data = _interopRequireDefault(__webpack_require__(17)), _events = __webpack_require__(18);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var document = _window.default.document;
        function DependencyLib(elem) {
            return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void (null != elem && elem !== _window.default && (this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : document.querySelector(elem), 
            void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(elem);
        }
        DependencyLib.prototype = {
            on: _events.on,
            off: _events.off,
            trigger: _events.trigger
        }, DependencyLib.extend = _extend.default, DependencyLib.data = _data.default, DependencyLib.Event = _events.Event;
        var _default = DependencyLib;
        exports.default = _default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj;
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _typeof(obj);
        }
        "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function(object) {
            return object.__proto__;
        } : function(object) {
            return object.constructor.prototype;
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.mask = mask, __webpack_require__(10);
        var _keycode = _interopRequireDefault(__webpack_require__(0)), _positioning = __webpack_require__(2), _inputHandling = __webpack_require__(5), _eventruler = __webpack_require__(12), _environment = __webpack_require__(8), _validation = __webpack_require__(4), _eventhandlers = __webpack_require__(7);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function mask() {
            var inputmask = this, opts = this.opts, el = this.el, $ = this.dependencyLib;
            function isElementTypeSupported(input, opts) {
                function patchValueProperty(npt) {
                    var valueGet, valueSet;
                    function patchValhook(type) {
                        if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
                            var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                                return elem.value;
                            }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                                return elem.value = value, elem;
                            };
                            $.valHooks[type] = {
                                get: function get(elem) {
                                    if (elem.inputmask) {
                                        if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                        var result = valhookGet(elem);
                                        return -1 !== _positioning.getLastValidPosition.call(inputmask, void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                    }
                                    return valhookGet(elem);
                                },
                                set: function set(elem, value) {
                                    var result = valhookSet(elem, value);
                                    return elem.inputmask && (0, _inputHandling.applyInputValue)(elem, value), result;
                                },
                                inputmaskpatch: !0
                            };
                        }
                    }
                    function getter() {
                        return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== _positioning.getLastValidPosition.call(inputmask) || !0 !== opts.nullable ? (this.inputmask.shadowRoot || document.activeElement) === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice()).reverse() : _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                    }
                    function setter(value) {
                        valueSet.call(this, value), this.inputmask && (0, _inputHandling.applyInputValue)(this, value);
                    }
                    function installNativeValueSetFallback(npt) {
                        _eventruler.EventRuler.on(npt, "mouseenter", function() {
                            var input = this, value = this.inputmask._valueGet(!0);
                            value !== (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).reverse() : _positioning.getBuffer.call(inputmask)).join("") && (0, 
                            _inputHandling.applyInputValue)(this, value);
                        });
                    }
                    if (!npt.inputmask.__valueGet) {
                        if (!0 !== opts.noValuePatching) {
                            if (Object.getOwnPropertyDescriptor) {
                                var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                                valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
                                valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                    get: getter,
                                    set: setter,
                                    configurable: !0
                                })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                                    return this.textContent;
                                }, valueSet = function valueSet(value) {
                                    this.textContent = value;
                                }, Object.defineProperty(npt, "value", {
                                    get: getter,
                                    set: setter,
                                    configurable: !0
                                }));
                            } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
                            valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                            npt.__defineSetter__("value", setter));
                            npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                        }
                        npt.inputmask._valueGet = function(overruleRTL) {
                            return inputmask.isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                        }, npt.inputmask._valueSet = function(value, overruleRTL) {
                            valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && inputmask.isRTL ? value.split("").reverse().join("") : value);
                        }, void 0 === valueGet && (valueGet = function valueGet() {
                            return this.value;
                        }, valueSet = function valueSet(value) {
                            this.value = value;
                        }, patchValhook(npt.type), installNativeValueSetFallback(npt));
                    }
                }
                "textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(_keycode.default.ENTER);
                var elementType = input.getAttribute("type"), isSupported = "input" === input.tagName.toLowerCase() && opts.supportsInputType.includes(elementType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
                if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
                    var el = document.createElement("input");
                    el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
                } else isSupported = "partial";
                return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, 
                isSupported;
            }
            _eventruler.EventRuler.off(el);
            var isSupported = isElementTypeSupported(el, opts);
            if (!1 !== isSupported) {
                inputmask.originalPlaceholder = el.placeholder, inputmask.maxLength = void 0 !== el ? el.maxLength : void 0, 
                -1 === inputmask.maxLength && (inputmask.maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, 
                el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === [ "cc-number", "cc-exp" ].indexOf(el.autocomplete), 
                _environment.iphone && (opts.insertModeVisual = !1), _eventruler.EventRuler.on(el, "submit", _eventhandlers.EventHandlers.submitEvent), 
                _eventruler.EventRuler.on(el, "reset", _eventhandlers.EventHandlers.resetEvent), 
                _eventruler.EventRuler.on(el, "blur", _eventhandlers.EventHandlers.blurEvent), _eventruler.EventRuler.on(el, "focus", _eventhandlers.EventHandlers.focusEvent), 
                _eventruler.EventRuler.on(el, "invalid", _eventhandlers.EventHandlers.invalidEvent), 
                _eventruler.EventRuler.on(el, "click", _eventhandlers.EventHandlers.clickEvent), 
                _eventruler.EventRuler.on(el, "mouseleave", _eventhandlers.EventHandlers.mouseleaveEvent), 
                _eventruler.EventRuler.on(el, "mouseenter", _eventhandlers.EventHandlers.mouseenterEvent), 
                _eventruler.EventRuler.on(el, "paste", _eventhandlers.EventHandlers.pasteEvent), 
                _eventruler.EventRuler.on(el, "cut", _eventhandlers.EventHandlers.cutEvent), _eventruler.EventRuler.on(el, "complete", opts.oncomplete), 
                _eventruler.EventRuler.on(el, "incomplete", opts.onincomplete), _eventruler.EventRuler.on(el, "cleared", opts.oncleared), 
                !0 !== opts.inputEventOnly && (_eventruler.EventRuler.on(el, "keydown", _eventhandlers.EventHandlers.keydownEvent), 
                _eventruler.EventRuler.on(el, "keypress", _eventhandlers.EventHandlers.keypressEvent), 
                _eventruler.EventRuler.on(el, "keyup", _eventhandlers.EventHandlers.keyupEvent)), 
                (_environment.mobile || opts.inputEventOnly) && el.removeAttribute("maxLength"), 
                _eventruler.EventRuler.on(el, "input", _eventhandlers.EventHandlers.inputFallBackEvent), 
                _eventruler.EventRuler.on(el, "compositionend", _eventhandlers.EventHandlers.compositionendEvent)), 
                _eventruler.EventRuler.on(el, "setvalue", _eventhandlers.EventHandlers.setValueEvent), 
                inputmask.undoValue = _positioning.getBufferTemplate.call(inputmask).join("");
                var activeElement = (el.inputmask.shadowRoot || document).activeElement;
                if ("" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || activeElement === el) {
                    (0, _inputHandling.applyInputValue)(el, el.inputmask._valueGet(!0), opts);
                    var buffer = _positioning.getBuffer.call(inputmask).slice();
                    !1 === _validation.isComplete.call(inputmask, buffer) && opts.clearIncomplete && _positioning.resetMaskSet.call(inputmask), 
                    opts.clearMaskOnLostFocus && activeElement !== el && (-1 === _positioning.getLastValidPosition.call(inputmask) ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), 
                    (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && activeElement === el || "" !== el.inputmask._valueGet(!0)) && (0, 
                    _inputHandling.writeBuffer)(el, buffer), activeElement === el && _positioning.caret.call(inputmask, el, _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask)));
                }
            }
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.EventRuler = void 0;
        var _inputmask = _interopRequireDefault(__webpack_require__(1)), _keycode = _interopRequireDefault(__webpack_require__(0)), _positioning = __webpack_require__(2), _inputHandling = __webpack_require__(5);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var EventRuler = {
            on: function on(input, eventName, eventHandler) {
                var $ = input.inputmask.dependencyLib, ev = function ev(e) {
                    e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);
                    var that = this, args, inputmask = that.inputmask, opts = inputmask ? inputmask.opts : void 0, $ = inputmask.dependencyLib;
                    if (void 0 === inputmask && "FORM" !== this.nodeName) {
                        var imOpts = $.data(that, "_inputmask_opts");
                        $(that).off(), imOpts && new _inputmask.default(imOpts).mask(that);
                    } else {
                        if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === _keycode.default.TAB))) {
                            switch (e.type) {
                              case "input":
                                if (!0 === inputmask.skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return inputmask.skipInputEvent = !1, 
                                e.preventDefault();
                                break;

                              case "keydown":
                                inputmask.skipKeyPressEvent = !1, inputmask.skipInputEvent = inputmask.isComposing = e.keyCode === _keycode.default.KEY_229;
                                break;

                              case "keyup":
                              case "compositionend":
                                inputmask.isComposing && (inputmask.skipInputEvent = !1);
                                break;

                              case "keypress":
                                if (!0 === inputmask.skipKeyPressEvent) return e.preventDefault();
                                inputmask.skipKeyPressEvent = !0;
                                break;

                              case "click":
                              case "focus":
                                return inputmask.validationEvent ? (inputmask.validationEvent = !1, input.blur(), 
                                (0, _inputHandling.HandleNativePlaceholder)(input, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")), 
                                setTimeout(function() {
                                    input.focus();
                                }, 3e3)) : (args = arguments, setTimeout(function() {
                                    input.inputmask && eventHandler.apply(that, args);
                                }, 0)), !1;
                            }
                            var returnVal = eventHandler.apply(that, arguments);
                            return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                        }
                        e.preventDefault();
                    }
                };
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
                [ "submit", "reset" ].includes(eventName) ? null !== input.form && $(input.form).on(eventName, ev.bind(input)) : $(input).on(eventName, ev);
            },
            off: function off(input, event) {
                if (input.inputmask && input.inputmask.events) {
                    var $ = input.inputmask.dependencyLib, events = input.inputmask.events;
                    for (var eventName in event && (events = [], events[event] = input.inputmask.events[event]), 
                    events) {
                        for (var evArr = events[eventName]; 0 < evArr.length; ) {
                            var ev = evArr.pop();
                            [ "submit", "reset" ].includes(eventName) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                        }
                        delete input.inputmask.events[eventName];
                    }
                }
            }
        };
        exports.EventRuler = EventRuler;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj;
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _typeof(obj);
        }
        function extend() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
            i++), "object" !== _typeof(target) && "function" != typeof target && (target = {}); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
            copy = options[name], target !== copy && (deep && copy && ("[object Object]" === Object.prototype.toString.call(copy) || (copyIsArray = Array.isArray(copy))) ? (clone = copyIsArray ? (copyIsArray = !1, 
            src && Array.isArray(src) ? src : []) : src && "[object Object]" === Object.prototype.toString.call(src) ? src : {}, 
            target[name] = extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
            return target;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = extend;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = _default;
        var escapeRegexRegex = new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ].join("|\\") + ")", "gim");
        function _default(str) {
            return str.replace(escapeRegexRegex, "\\$1");
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0, __webpack_require__(16), __webpack_require__(22), 
        __webpack_require__(23), __webpack_require__(24);
        var _inputmask2 = _interopRequireDefault(__webpack_require__(1));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var _default = _inputmask2.default;
        exports.default = _default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _inputmask = _interopRequireDefault(__webpack_require__(1));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        _inputmask.default.extendDefinitions({
            A: {
                validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                casing: "upper"
            },
            "&": {
                validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                casing: "upper"
            },
            "#": {
                validator: "[0-9A-Fa-f]",
                casing: "upper"
            }
        });
        var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
        function ipValidator(chrs, maskset, pos, strict, opts) {
            return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
            -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, 
            ipValidatorRegex.test(chrs);
        }
        _inputmask.default.extendAliases({
            cssunit: {
                regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
            },
            url: {
                regex: "(https?|ftp)://.*",
                autoUnmask: !1,
                keepStatic: !1,
                tabThrough: !0
            },
            ip: {
                mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                definitions: {
                    i: {
                        validator: ipValidator
                    },
                    j: {
                        validator: ipValidator
                    },
                    k: {
                        validator: ipValidator
                    },
                    l: {
                        validator: ipValidator
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                casing: "lower",
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
                },
                definitions: {
                    "*": {
                        validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
                    },
                    "-": {
                        validator: "[0-9A-Za-z-]"
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "email"
            },
            mac: {
                mask: "##:##:##:##:##:##"
            },
            vin: {
                mask: "V{13}9{4}",
                definitions: {
                    V: {
                        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                        casing: "upper"
                    }
                },
                clearIncomplete: !0,
                autoUnmask: !0
            },
            ssn: {
                mask: "999-99-9999",
                postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
                    return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(buffer.join(""));
                }
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _default(owner, key, value) {
            if (void 0 === value) return owner.__data ? owner.__data[key] : null;
            owner.__data = owner.__data || {}, owner.__data[key] = value;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = _default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.on = on, exports.off = off, exports.trigger = trigger, exports.Event = void 0;
        var _extend = _interopRequireDefault(__webpack_require__(13)), _window = _interopRequireDefault(__webpack_require__(6)), _inputmask = _interopRequireDefault(__webpack_require__(9)), Event;
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function isValidElement(elem) {
            return elem instanceof Element;
        }
        function on(events, handler) {
            function addEvent(ev, namespace) {
                elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler), 
                eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], 
                eventRegistry[ev][namespace].push(handler);
            }
            if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
                var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                addEvent(ev, namespace);
            }
            return this;
        }
        function off(events, handler) {
            var eventRegistry, elem;
            function removeEvent(ev, namespace, handler) {
                if (ev in eventRegistry == !0) if (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler), 
                "global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1); else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
            }
            function resolveNamespace(ev, namespace) {
                var evts = [], hndx, hndL;
                if (0 < ev.length) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
                    ev: ev,
                    namespace: namespace && 0 < namespace.length ? namespace : "global",
                    handler: eventRegistry[ev][namespace][hndx]
                }); else evts.push({
                    ev: ev,
                    namespace: namespace && 0 < namespace.length ? namespace : "global",
                    handler: handler
                }); else if (0 < namespace.length) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (hndx = 0, 
                hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: eventRegistry[evNdx][nmsp][hndx]
                }); else evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: handler
                });
                return evts;
            }
            if (isValidElement(this[0])) {
                eventRegistry = this[0].eventRegistry, elem = this[0];
                for (var _events = events.split(" "), endx = 0; endx < _events.length; endx++) for (var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; i < offEventsL; i++) removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
            }
            return this;
        }
        function trigger(events) {
            if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = "string" == typeof events ? events.split(" ") : [ events.type ], endx = 0; endx < _events.length; endx++) {
                var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                if (void 0 !== document && "global" === namespace) {
                    var evnt, i, params = {
                        bubbles: !0,
                        cancelable: !0,
                        detail: arguments[1]
                    };
                    if (document.createEvent) {
                        try {
                            evnt = new CustomEvent(ev, params);
                        } catch (e) {
                            evnt = document.createEvent("CustomEvent"), evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                        }
                        events.type && (0, _extend.default)(evnt, events), elem.dispatchEvent(evnt);
                    } else evnt = document.createEventObject(), evnt.eventType = ev, evnt.detail = arguments[1], 
                    events.type && (0, _extend.default)(evnt, events), elem.fireEvent("on" + evnt.eventType, evnt);
                } else if (void 0 !== eventRegistry[ev]) if (arguments[0] = arguments[0].type ? arguments[0] : _inputmask.default.Event(arguments[0]), 
                arguments[0].detail = arguments.slice(1), "global" === namespace) for (var nmsp in eventRegistry[ev]) for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments); else for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments);
            }
            return this;
        }
        exports.Event = Event, "function" == typeof _window.default.CustomEvent ? exports.Event = Event = _window.default.CustomEvent : (exports.Event = Event = function Event(event, params) {
            params = params || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var evt = document.createEvent("CustomEvent");
            return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), 
            evt;
        }, Event.prototype = _window.default.Event.prototype);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.generateMaskSet = generateMaskSet, exports.analyseMask = analyseMask;
        var _inputmask = _interopRequireDefault(__webpack_require__(9));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function generateMaskSet(opts, nocache) {
            var ms;
            function generateMask(mask, metadata, opts) {
                var regexMask = !1, masksetDefinition, maskdefKey;
                if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, 
                mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 
                0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
                }
                return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, 
                !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    excludes: {},
                    metadata: metadata,
                    maskLength: void 0,
                    jitOffset: {}
                }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, 
                masksetDefinition = _inputmask.default.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = _inputmask.default.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), 
                masksetDefinition;
            }
            if ("function" == typeof opts.mask && (opts.mask = opts.mask(opts)), Array.isArray(opts.mask)) {
                if (1 < opts.mask.length) {
                    null === opts.keepStatic && (opts.keepStatic = !0);
                    var altMask = opts.groupmarker[0];
                    return (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function(msk) {
                        1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), 
                        void 0 !== msk.mask && "function" != typeof msk.mask ? altMask += msk.mask : altMask += msk;
                    }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts);
                }
                opts.mask = opts.mask.pop();
            }
            return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && "function" != typeof opts.mask.mask ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), 
            ms;
        }
        function analyseMask(mask, regexMask, opts) {
            var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), match, m, openenings = [], maskTokens = [], openingToken, currentOpeningToken, alternator, lastMatch, closeRegexGroup = !1;
            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, 
                this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                    fn: new RegExp(element, opts.casing ? "i" : ""),
                    static: !1,
                    optionality: !1,
                    newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: void 0,
                    nativeDef: element
                }) : (escaped && (element = element[element.length - 1]), element.split("").forEach(function(lmnt, ndx) {
                    prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                        nativeDef: (escaped ? "'" : "") + lmnt
                    });
                })), escaped = !1; else {
                    var maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && Inputmask.prototype.definitions[element];
                    maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                            this.test = maskdef.validator;
                        }() : new RegExp("."),
                        static: maskdef.static || !1,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        nativeDef: element,
                        generated: maskdef.generated
                    }) : (mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || element,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                        nativeDef: (escaped ? "'" : "") + element
                    }), escaped = !1);
                }
            }
            function verifyGroupMarker(maskToken) {
                maskToken && maskToken.matches && maskToken.matches.forEach(function(token, ndx) {
                    var nextToken = maskToken.matches[ndx + 1];
                    (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, 
                    regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), 
                    verifyGroupMarker(token);
                });
            }
            function defaultCase() {
                if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else insertTestDefinition(currentToken, m);
            }
            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), 
                    st;
                }
                for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                    }
                    void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                }
                return maskToken;
            }
            function groupify(matches) {
                var groupToken = new MaskToken(!0);
                return groupToken.openGroup = !1, groupToken.matches = matches, groupToken;
            }
            function closeGroup() {
                if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, 
                        alternator.matches[mndx].alternatorGroup = !1;
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else currentToken.matches.push(openingToken); else defaultCase();
            }
            function groupQuantifier(matches) {
                var lastMatch = matches.pop();
                return lastMatch.isQuantifier && (lastMatch = groupify([ matches.pop(), lastMatch ])), 
                lastMatch;
            }
            for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask); ) {
                if (m = match[0], regexMask) switch (m.charAt(0)) {
                  case "?":
                    m = "{0,1}";
                    break;

                  case "+":
                  case "*":
                    m = "{" + m + "}";
                    break;

                  case "|":
                    if (0 === openenings.length) {
                        var altRegexGroup = groupify(currentToken.matches);
                        altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], 
                        closeRegexGroup = !0;
                    }
                    break;
                }
                if (escaped) defaultCase(); else switch (m.charAt(0)) {
                  case "$":
                  case "^":
                    regexMask || defaultCase();
                    break;

                  case "(?=":
                    break;

                  case "(?!":
                    break;

                  case "(?<=":
                    break;

                  case "(?<!":
                    break;

                  case opts.escapeChar:
                    escaped = !0, regexMask && defaultCase();
                    break;

                  case opts.optionalmarker[1]:
                  case opts.groupmarker[1]:
                    closeGroup();
                    break;

                  case opts.optionalmarker[0]:
                    openenings.push(new MaskToken(!1, !0));
                    break;

                  case opts.groupmarker[0]:
                    openenings.push(new MaskToken(!0));
                    break;

                  case opts.quantifiermarker[0]:
                    var quantifier = new MaskToken(!1, !1, !0);
                    m = m.replace(/[{}]/g, "");
                    var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                    "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                        min: mq0,
                        max: mq1,
                        jit: mqj[1]
                    };
                    var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
                    if (match = matches.pop(), match.isAlternator) {
                        matches.push(match), matches = match.matches;
                        var groupToken = new MaskToken(!0), tmpMatch = matches.pop();
                        matches.push(groupToken), matches = groupToken.matches, match = tmpMatch;
                    }
                    match.isGroup || (match = groupify([ match ])), matches.push(match), matches.push(quantifier);
                    break;

                  case opts.alternatormarker:
                    if (0 < openenings.length) {
                        currentOpeningToken = openenings[openenings.length - 1];
                        var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                        lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches);
                    } else lastMatch = groupQuantifier(currentToken.matches);
                    if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), 
                    lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), 
                    openenings.push(alternator), lastMatch.openGroup) {
                        lastMatch.openGroup = !1;
                        var alternatorGroup = new MaskToken(!0);
                        alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                    }
                    break;

                  default:
                    defaultCase();
                }
            }
            for (closeRegexGroup && closeGroup(); 0 < openenings.length; ) openingToken = openenings.pop(), 
            currentToken.matches.push(openingToken);
            return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), 
            (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var _default = {
            9: {
                validator: "[0-9\uff10-\uff19]",
                definitionSymbol: "*"
            },
            a: {
                validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                definitionSymbol: "*"
            },
            "*": {
                validator: "[0-9\uff10-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
            }
        };
        exports.default = _default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var _default = {
            _maxTestPos: 500,
            placeholder: "_",
            optionalmarker: [ "[", "]" ],
            quantifiermarker: [ "{", "}" ],
            groupmarker: [ "(", ")" ],
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            regex: null,
            oncomplete: function oncomplete() {},
            onincomplete: function onincomplete() {},
            oncleared: function oncleared() {},
            repeat: 0,
            greedy: !1,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            insertModeVisual: !0,
            clearIncomplete: !1,
            alias: null,
            onKeyDown: function onKeyDown() {},
            onBeforeMask: null,
            onBeforePaste: function onBeforePaste(pastedValue, opts) {
                return "function" == typeof opts.onBeforeMask ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: function onKeyValidation() {},
            skipOptionalPartCharacter: " ",
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            _radixDance: !1,
            groupSeparator: "",
            keepStatic: null,
            positionCaretOnTab: !0,
            tabThrough: !1,
            supportsInputType: [ "text", "tel", "url", "password", "search" ],
            ignorables: [ 8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
            isComplete: null,
            preValidation: null,
            postValidation: null,
            staticDefinitionSymbol: void 0,
            jitMasking: !1,
            nullable: !0,
            inputEventOnly: !1,
            noValuePatching: !1,
            positionCaretOnClick: "lvp",
            casing: null,
            inputmode: "text",
            importDataAttributes: !0,
            shiftPositions: !0,
            usePrototypeDefinitions: !0
        };
        exports.default = _default;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _inputmask = _interopRequireDefault(__webpack_require__(1)), _keycode = _interopRequireDefault(__webpack_require__(0)), _escapeRegex = _interopRequireDefault(__webpack_require__(14));
        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj;
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _typeof(obj);
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var $ = _inputmask.default.dependencyLib, currentYear = new Date().getFullYear(), formatCode = {
            d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
            dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
                return pad(Date.prototype.getDate.call(this), 2);
            } ],
            ddd: [ "" ],
            dddd: [ "" ],
            m: [ "[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
                return Date.prototype.getMonth.call(this) + 1;
            } ],
            mm: [ "0[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
                return pad(Date.prototype.getMonth.call(this) + 1, 2);
            } ],
            mmm: [ "" ],
            mmmm: [ "" ],
            yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
                return pad(Date.prototype.getFullYear.call(this), 2);
            } ],
            yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
                return pad(Date.prototype.getFullYear.call(this), 4);
            } ],
            h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
            hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
                return pad(Date.prototype.getHours.call(this), 2);
            } ],
            hx: [ function(x) {
                return "[0-9]{".concat(x, "}");
            }, Date.prototype.setHours, "hours", function(x) {
                return Date.prototype.getHours;
            } ],
            H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
            HH: [ "0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
                return pad(Date.prototype.getHours.call(this), 2);
            } ],
            Hx: [ function(x) {
                return "[0-9]{".concat(x, "}");
            }, Date.prototype.setHours, "hours", function(x) {
                return function() {
                    return pad(Date.prototype.getHours.call(this), x);
                };
            } ],
            M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
            MM: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function() {
                return pad(Date.prototype.getMinutes.call(this), 2);
            } ],
            s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
            ss: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function() {
                return pad(Date.prototype.getSeconds.call(this), 2);
            } ],
            l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
                return pad(Date.prototype.getMilliseconds.call(this), 3);
            } ],
            L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
                return pad(Date.prototype.getMilliseconds.call(this), 2);
            } ],
            t: [ "[ap]" ],
            tt: [ "[ap]m" ],
            T: [ "[AP]" ],
            TT: [ "[AP]M" ],
            Z: [ "" ],
            o: [ "" ],
            S: [ "" ]
        }, formatAlias = {
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };
        function formatcode(match) {
            var dynMatches = new RegExp("\\d+$").exec(match[0]);
            if (dynMatches && void 0 !== dynMatches[0]) {
                var fcode = formatCode[match[0][0] + "x"].slice("");
                return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode;
            }
            if (formatCode[match[0]]) return formatCode[match[0]];
        }
        function getTokenizer(opts) {
            if (!opts.tokenizer) {
                var tokens = [], dyntokens = [];
                for (var ndx in formatCode) if (/\.*x$/.test(ndx)) {
                    var dynToken = ndx[0] + "\\d+";
                    -1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken);
                } else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
                opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", 
                opts.tokenizer = new RegExp(opts.tokenizer, "g");
            }
            return opts.tokenizer;
        }
        function prefillYear(dateParts, currentResult, opts) {
            if (dateParts.year !== dateParts.rawyear) {
                var crrntyear = currentYear.toString(), enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""), currentYearPart = crrntyear.slice(0, enteredPart.length), currentYearNextPart = crrntyear.slice(enteredPart.length);
                if (2 === enteredPart.length && enteredPart === currentYearPart) {
                    var entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
                    dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime()) && (dateParts.date.setFullYear(currentYear), 
                    dateParts.year = crrntyear, currentResult.insert = [ {
                        pos: currentResult.pos + 1,
                        c: currentYearNextPart[0]
                    }, {
                        pos: currentResult.pos + 2,
                        c: currentYearNextPart[1]
                    } ]);
                }
            }
            return currentResult;
        }
        function isValidDate(dateParts, currentResult, opts) {
            if (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) return currentResult;
            if ("29" == dateParts.day) {
                var tokenMatch = getTokenMatch(currentResult.pos, opts);
                if ("yyyy" === tokenMatch.targetMatch[0] && currentResult.pos - tokenMatch.targetMatchIndex == 2) return currentResult.remove = currentResult.pos + 1, 
                currentResult;
            }
            return !1;
        }
        function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
            if (!result) return result;
            if (opts.min) {
                if (dateParts.rawyear) {
                    var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""), minYear = opts.min.year.substr(0, rawYear.length), maxYear;
                    if (rawYear < minYear) {
                        var tokenMatch = getTokenMatch(result.pos, opts);
                        if (rawYear = dateParts.rawyear.substr(0, result.pos - tokenMatch.targetMatchIndex + 1), 
                        minYear = opts.min.year.substr(0, rawYear.length), minYear <= rawYear) return result.remove = tokenMatch.targetMatchIndex + rawYear.length, 
                        result;
                        if (rawYear = "yyyy" === tokenMatch.targetMatch[0] ? dateParts.rawyear.substr(1, 1) : dateParts.rawyear.substr(0, 1), 
                        minYear = opts.min.year.substr(2, 1), maxYear = opts.max ? opts.max.year.substr(2, 1) : rawYear, 
                        1 === rawYear.length && minYear <= rawYear <= maxYear && !0 !== fromCheckval) return "yyyy" === tokenMatch.targetMatch[0] ? (result.insert = [ {
                            pos: result.pos + 1,
                            c: rawYear,
                            strict: !0
                        } ], result.caret = result.pos + 2, maskset.validPositions[result.pos].input = opts.min.year[1]) : (result.insert = [ {
                            pos: result.pos + 1,
                            c: opts.min.year[1],
                            strict: !0
                        }, {
                            pos: result.pos + 2,
                            c: rawYear,
                            strict: !0
                        } ], result.caret = result.pos + 3, maskset.validPositions[result.pos].input = opts.min.year[0]), 
                        result;
                        result = !1;
                    }
                }
                result && dateParts.year && dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime());
            }
            return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), 
            result;
        }
        function parse(format, dateObjValue, opts, raw) {
            var mask = "", match, fcode;
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format); ) if (void 0 === dateObjValue) if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")"; else switch (match[0]) {
              case "[":
                mask += "(";
                break;

              case "]":
                mask += ")?";
                break;

              default:
                mask += (0, _escapeRegex.default)(match[0]);
            } else if (fcode = formatcode(match)) if (!0 !== raw && fcode[3]) {
                var getFn = fcode[3];
                mask += getFn.call(dateObjValue.date);
            } else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0]; else mask += match[0];
            return mask;
        }
        function pad(val, len) {
            for (val = String(val), len = len || 2; val.length < len; ) val = "0" + val;
            return val;
        }
        function analyseMask(maskString, format, opts) {
            var dateObj = {
                date: new Date(1, 0, 1)
            }, targetProp, mask = maskString, match, dateOperation;
            function setValue(dateObj, value, opts) {
                dateObj[targetProp] = value.replace(/[^0-9]/g, "0"), dateObj["raw" + targetProp] = value, 
                void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
            }
            if ("string" == typeof mask) {
                for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format); ) {
                    var dynMatches = new RegExp("\\d+$").exec(match[0]), fcode = dynMatches ? match[0][0] + "x" : match[0], value = void 0;
                    if (dynMatches) {
                        var lastIndex = getTokenizer(opts).lastIndex, tokanMatch = getTokenMatch(match.index, opts);
                        getTokenizer(opts).lastIndex = lastIndex, value = mask.slice(0, mask.indexOf(tokanMatch.nextMatch[0]));
                    } else value = mask.slice(0, fcode.length);
                    Object.prototype.hasOwnProperty.call(formatCode, fcode) && (targetProp = formatCode[fcode][2], 
                    dateOperation = formatCode[fcode][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length);
                }
                return dateObj;
            }
            if (mask && "object" === _typeof(mask) && Object.prototype.hasOwnProperty.call(mask, "date")) return mask;
        }
        function importDate(dateObj, opts) {
            return parse(opts.inputFormat, {
                date: dateObj
            }, opts);
        }
        function getTokenMatch(pos, opts) {
            var calcPos = 0, targetMatch, match, matchLength = 0;
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat); ) {
                var dynMatches = new RegExp("\\d+$").exec(match[0]);
                if (matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length, calcPos += matchLength, 
                pos <= calcPos) {
                    targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
                    break;
                }
            }
            return {
                targetMatchIndex: calcPos - matchLength,
                nextMatch: match,
                targetMatch: targetMatch
            };
        }
        _inputmask.default.extendAliases({
            datetime: {
                mask: function mask(opts) {
                    return opts.numericInput = !1, formatCode.S = opts.i18n.ordinalSuffix.join("|"), 
                    opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, 
                    opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, 
                    opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), 
                    opts.regex = parse(opts.inputFormat, void 0, opts), opts.min = analyseMask(opts.min, opts.inputFormat, opts), 
                    opts.max = analyseMask(opts.max, opts.inputFormat, opts), null;
                },
                placeholder: "",
                inputFormat: "isoDateTime",
                displayFormat: void 0,
                outputFormat: void 0,
                min: null,
                max: null,
                skipOptionalPartCharacter: "",
                i18n: {
                    dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                    monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    ordinalSuffix: [ "st", "nd", "rd", "th" ]
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (strict) return !0;
                    if (isNaN(c) && buffer[pos] !== c) {
                        var tokenMatch = getTokenMatch(pos, opts);
                        if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && 1 < tokenMatch.targetMatch[0].length) {
                            var validator = formatCode[tokenMatch.targetMatch[0]][0];
                            if (new RegExp(validator).test("0" + buffer[pos - 1])) return buffer[pos] = buffer[pos - 1], 
                            buffer[pos - 1] = "0", {
                                fuzzy: !0,
                                buffer: buffer,
                                refreshFromBuffer: {
                                    start: pos - 1,
                                    end: pos + 1
                                },
                                pos: pos + 1
                            };
                        }
                    }
                    return !0;
                },
                postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
                    if (strict) return !0;
                    var tokenMatch, validator;
                    if (!1 === currentResult) return tokenMatch = getTokenMatch(pos + 1, opts), tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && 1 < tokenMatch.targetMatch[0].length && void 0 !== formatCode[tokenMatch.targetMatch[0]] && (validator = formatCode[tokenMatch.targetMatch[0]][0], 
                    new RegExp(validator).test("0" + c)) ? {
                        insert: [ {
                            pos: pos,
                            c: "0"
                        }, {
                            pos: pos + 1,
                            c: c
                        } ],
                        pos: pos + 1
                    } : currentResult;
                    if (currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos), 
                    tokenMatch = getTokenMatch(pos, opts), tokenMatch.targetMatch && tokenMatch.targetMatch[0] && void 0 !== formatCode[tokenMatch.targetMatch[0]]) {
                        validator = formatCode[tokenMatch.targetMatch[0]][0];
                        var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
                        !1 === new RegExp(validator).test(part.join("")) && 2 === tokenMatch.targetMatch[0].length && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1] && (maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0");
                    }
                    var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                    return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = prefillYear(dateParts, result, opts), 
                    result = isValidDate(dateParts, result, opts), result = isDateInRange(dateParts, result, opts, maskset, fromCheckval)), 
                    pos && result && currentResult.pos !== pos ? {
                        buffer: parse(opts.inputFormat, dateParts, opts).split(""),
                        refreshFromBuffer: {
                            start: pos,
                            end: currentResult.pos
                        }
                    } : result;
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var input = this;
                    e.ctrlKey && e.keyCode === _keycode.default.RIGHT && (this.inputmask._valueSet(importDate(new Date(), opts)), 
                    $(this).trigger("setvalue"));
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue;
                },
                casing: function casing(elem, test, pos, validPositions) {
                    return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
                },
                onBeforeMask: function onBeforeMask(initialValue, opts) {
                    return "[object Date]" === Object.prototype.toString.call(initialValue) && (initialValue = importDate(initialValue, opts)), 
                    initialValue;
                },
                insertMode: !1,
                shiftPositions: !1,
                keepStatic: !1,
                inputmode: "numeric"
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _inputmask = _interopRequireDefault(__webpack_require__(1)), _keycode = _interopRequireDefault(__webpack_require__(0)), _escapeRegex = _interopRequireDefault(__webpack_require__(14));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var $ = _inputmask.default.dependencyLib;
        function autoEscape(txt, opts) {
            for (var escapedTxt = "", i = 0; i < txt.length; i++) _inputmask.default.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
            return escapedTxt;
        }
        function alignDigits(buffer, digits, opts, force) {
            if (0 < buffer.length && 0 < digits && (!opts.digitsOptional || force)) {
                var radixPosition = buffer.indexOf(opts.radixPoint), negationBack = !1;
                opts.negationSymbol.back === buffer[buffer.length - 1] && (negationBack = !0, buffer.length--), 
                -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
                for (var i = 1; i <= digits; i++) isFinite(buffer[radixPosition + i]) || (buffer[radixPosition + i] = "0");
            }
            return negationBack && buffer.push(opts.negationSymbol.back), buffer;
        }
        function findValidator(symbol, maskset) {
            var posNdx = 0;
            if ("+" === symbol) {
                for (posNdx in maskset.validPositions) ;
                posNdx = parseInt(posNdx);
            }
            for (var tstNdx in maskset.tests) if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
            return posNdx;
        }
        function findValid(symbol, maskset) {
            var ret = -1;
            for (var ndx in maskset.validPositions) {
                var tst = maskset.validPositions[ndx];
                if (tst && tst.match.def === symbol) {
                    ret = parseInt(ndx);
                    break;
                }
            }
            return ret;
        }
        function parseMinMaxOptions(opts) {
            void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp((0, 
            _escapeRegex.default)(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), 
            opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), 
            null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator), "g"), ""), 
            "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), 
            opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), 
            opts.parseMinMaxOptions = "done");
        }
        function genMask(opts) {
            opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
            " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), 
            "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
            var decimalDef = "0", radixPointDef = opts.radixPoint;
            !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", 
            opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, 
            opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1, 
            radixPointDef = "," === opts.radixPoint ? "?" : "!", "" !== opts.radixPoint && void 0 === opts.definitions[radixPointDef] && (opts.definitions[radixPointDef] = {}, 
            opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]", opts.definitions[radixPointDef].placeholder = opts.radixPoint, 
            opts.definitions[radixPointDef].static = !0, opts.definitions[radixPointDef].generated = !0)) : (opts.__financeInput = !1, 
            opts.numericInput = !0);
            var mask = "[+]", altMask;
            if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? (void 0 === opts.definitions[opts.groupSeparator] && (opts.definitions[opts.groupSeparator] = {}, 
            opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]", 
            opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator, opts.definitions[opts.groupSeparator].static = !0, 
            opts.definitions[opts.groupSeparator].generated = !0), mask += opts._mask(opts)) : mask += "9{+}", 
            void 0 !== opts.digits && 0 !== opts.digits) {
                var dq = opts.digits.toString().split(",");
                isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += radixPointDef + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}", 
                opts.keepStatic = !0) : mask += radixPointDef + decimalDef + "{" + opts.digits + "}");
            }
            return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [ altMask + autoEscape(opts.suffix, opts) + "[-]", mask ]), 
            opts.greedy = !1, parseMinMaxOptions(opts), mask;
        }
        function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
            return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), 
            pos;
        }
        function decimalValidator(chrs, maskset, pos, strict, opts) {
            var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1, result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
            return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
                insert: {
                    pos: radixPos === pos ? radixPos + 1 : radixPos,
                    c: opts.radixPoint
                },
                pos: pos
            } : result;
        }
        function checkForLeadingZeroes(buffer, opts) {
            var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?" : "") + (0, 
            _escapeRegex.default)(opts.prefix) + ")(.*)(" + (0, _escapeRegex.default)(opts.suffix) + ("" != opts.negationSymbol.back ? (0, 
            _escapeRegex.default)(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")), number = numberMatches ? numberMatches[2] : "", leadingzeroes = !1;
            return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), 
            !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes;
        }
        _inputmask.default.extendAliases({
            numeric: {
                mask: genMask,
                _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "999){+|1}";
                },
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                _radixDance: !0,
                groupSeparator: "",
                allowMinus: !0,
                negationSymbol: {
                    front: "-",
                    back: ""
                },
                prefix: "",
                suffix: "",
                min: null,
                max: null,
                SetMaxOnOverflow: !1,
                step: 1,
                inputType: "text",
                unmaskAsNumber: !1,
                roundingFN: Math.round,
                inputmode: "numeric",
                shortcuts: {
                    k: "000",
                    m: "000000"
                },
                placeholder: "0",
                greedy: !1,
                rightAlign: !0,
                insertMode: !0,
                autoUnmask: !1,
                skipOptionalPartCharacter: "",
                definitions: {
                    0: {
                        validator: decimalValidator
                    },
                    1: {
                        validator: decimalValidator,
                        definitionSymbol: "9"
                    },
                    "+": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
                        }
                    },
                    "-": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && chrs === opts.negationSymbol.back;
                        }
                    }
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
                    var pattern;
                    if (pattern = opts.shortcuts && opts.shortcuts[c]) {
                        if (1 < pattern.length) for (var inserts = [], i = 0; i < pattern.length; i++) inserts.push({
                            pos: pos + i,
                            c: pattern[i],
                            strict: !1
                        });
                        return {
                            insert: inserts
                        };
                    }
                    var radixPos = buffer.indexOf(opts.radixPoint), initPos = pos;
                    if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" === c || c === opts.negationSymbol.front) {
                        if (!0 !== opts.allowMinus) return !1;
                        var isNegative = !1, front = findValid("+", maskset), back = findValid("-", maskset);
                        return -1 !== front && (isNegative = [ front, back ]), !1 !== isNegative ? {
                            remove: isNegative,
                            caret: initPos - opts.negationSymbol.front.length
                        } : {
                            insert: [ {
                                pos: findValidator("+", maskset),
                                c: opts.negationSymbol.front,
                                fromIsValid: !0
                            }, {
                                pos: findValidator("-", maskset),
                                c: opts.negationSymbol.back,
                                fromIsValid: void 0
                            } ],
                            caret: initPos + opts.negationSymbol.back.length
                        };
                    }
                    if (c === opts.groupSeparator) return {
                        caret: initPos
                    };
                    if (strict) return !0;
                    if (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos) return {
                        caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
                    };
                    if (!1 === opts.__financeInput) if (isSelection) {
                        if (opts.digitsOptional) return {
                            rewritePosition: caretPos.end
                        };
                        if (!opts.digitsOptional) {
                            if (caretPos.begin > radixPos && caretPos.end <= radixPos) return c === opts.radixPoint ? {
                                insert: {
                                    pos: radixPos + 1,
                                    c: "0",
                                    fromIsValid: !0
                                },
                                rewritePosition: radixPos
                            } : {
                                rewritePosition: radixPos + 1
                            };
                            if (caretPos.begin < radixPos) return {
                                rewritePosition: caretPos.begin - 1
                            };
                        }
                    } else if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && 0 < opts.digits && "" === this.inputmask.__valueGet.call(this)) return {
                        rewritePosition: radixPos
                    };
                    return {
                        rewritePosition: pos
                    };
                },
                postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
                    if (!1 === currentResult) return currentResult;
                    if (strict) return !0;
                    if (null !== opts.min || null !== opts.max) {
                        var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                            unmaskAsNumber: !0
                        }));
                        if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length > opts.min.toString().length || unmasked < 0)) return !1;
                        if (null !== opts.max && unmasked > opts.max) return !!opts.SetMaxOnOverflow && {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        };
                    }
                    return currentResult;
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp((0, 
                    _escapeRegex.default)(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), 
                    opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(_escapeRegex.default.call(this, opts.radixPoint), ".")), 
                    processValue = processValue.replace(new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)), "-"), 
                    processValue = processValue.replace(new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"), ""), 
                    Number(processValue)) : processValue;
                },
                isComplete: function isComplete(buffer, opts) {
                    var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                    return maskedValue = maskedValue.replace(new RegExp("^" + (0, _escapeRegex.default)(opts.negationSymbol.front)), "-"), 
                    maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex.default)(opts.negationSymbol.back) + "$"), ""), 
                    maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), 
                    maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex.default)(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), 
                    "," === opts.radixPoint && (maskedValue = maskedValue.replace((0, _escapeRegex.default)(opts.radixPoint), ".")), 
                    isFinite(maskedValue);
                },
                onBeforeMask: function onBeforeMask(initialValue, opts) {
                    var radixPoint = opts.radixPoint || ",";
                    isFinite(opts.digits) && (opts.digits = parseInt(opts.digits)), "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
                    var isNagtive = "-" === initialValue.charAt(0) || initialValue.charAt(0) === opts.negationSymbol.front, valueParts = initialValue.split(radixPoint), integerPart = valueParts[0].replace(/[^\-0-9]/g, ""), decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "", forceDigits = 1 < valueParts.length;
                    initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
                    var digits = 0;
                    if ("" !== radixPoint && (digits = opts.digitsOptional ? opts.digits < decimalPart.length ? opts.digits : decimalPart.length : opts.digits, 
                    "" !== decimalPart || !opts.digitsOptional)) {
                        var digitsFactor = Math.pow(10, digits || 1);
                        initialValue = initialValue.replace((0, _escapeRegex.default)(radixPoint), "."), 
                        isNaN(parseFloat(initialValue)) || (initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits)), 
                        initialValue = initialValue.toString().replace(".", radixPoint);
                    }
                    if (0 === opts.digits && -1 !== initialValue.indexOf(radixPoint) && (initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint))), 
                    null !== opts.min || null !== opts.max) {
                        var numberValue = initialValue.toString().replace(radixPoint, ".");
                        null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint));
                    }
                    return isNagtive && "-" !== initialValue.charAt(0) && (initialValue = "-" + initialValue), 
                    alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
                },
                onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
                    function stripBuffer(buffer, stripRadix) {
                        if (!1 !== opts.__financeInput || stripRadix) {
                            var position = buffer.indexOf(opts.radixPoint);
                            -1 !== position && buffer.splice(position, 1);
                        }
                        if ("" !== opts.groupSeparator) for (;-1 !== (position = buffer.indexOf(opts.groupSeparator)); ) buffer.splice(position, 1);
                        return buffer;
                    }
                    var result, leadingzeroes = checkForLeadingZeroes(buffer, opts);
                    if (leadingzeroes) for (var caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1), offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0, i = leadingzeroes[0].length - offset; 0 < i; i--) delete this.maskset.validPositions[caretNdx + i], 
                    delete buffer[caretNdx + i];
                    if (e) switch (e.type) {
                      case "blur":
                      case "checkval":
                        if (null !== opts.min) {
                            var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                                unmaskAsNumber: !0
                            }));
                            if (null !== opts.min && unmasked < opts.min) return {
                                refreshFromBuffer: !0,
                                buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                            };
                        }
                        if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                            var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? (0, _escapeRegex.default)(opts.negationSymbol.front) + "?" : "") + (0, 
                            _escapeRegex.default)(opts.prefix) + ")(.*)(" + (0, _escapeRegex.default)(opts.suffix) + ("" != opts.negationSymbol.back ? (0, 
                            _escapeRegex.default)(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")), number = nmbrMtchs ? nmbrMtchs[2] : "";
                            0 == number && (result = {
                                refreshFromBuffer: !0,
                                buffer: [ 0 ]
                            });
                        } else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), 
                        result = {
                            refreshFromBuffer: !0,
                            buffer: stripBuffer(buffer)
                        }));
                        if (opts.enforceDigitsOnBlur) {
                            result = result || {};
                            var bffr = result && result.buffer || buffer.slice().reverse();
                            result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse();
                        }
                    }
                    return result;
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var $input = $(this), bffr;
                    if (e.ctrlKey) switch (e.keyCode) {
                      case _keycode.default.UP:
                        return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), 
                        $input.trigger("setvalue"), !1;

                      case _keycode.default.DOWN:
                        return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), 
                        $input.trigger("setvalue"), !1;
                    }
                    if (!e.shiftKey && (e.keyCode === _keycode.default.DELETE || e.keyCode === _keycode.default.BACKSPACE || e.keyCode === _keycode.default.BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
                        if (buffer[e.keyCode === _keycode.default.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), 
                        "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), 
                        $input.trigger("setvalue", [ bffr.join(""), caretPos.begin ]), !1;
                        if (!0 === opts._radixDance) {
                            var radixPos = buffer.indexOf(opts.radixPoint);
                            if (opts.digitsOptional) {
                                if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [ bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin ]), 
                                !1;
                            } else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === _keycode.default.DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== _keycode.default.BACKSPACE && e.keyCode !== _keycode.default.BACKSPACE_SAFARI || caretPos.begin++, 
                            bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), 
                            bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [ bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin ]), 
                            !1;
                        }
                    }
                }
            },
            currency: {
                prefix: "",
                groupSeparator: ",",
                alias: "numeric",
                digits: 2,
                digitsOptional: !1
            },
            decimal: {
                alias: "numeric"
            },
            integer: {
                alias: "numeric",
                digits: 0
            },
            percentage: {
                alias: "numeric",
                min: 0,
                max: 100,
                suffix: " %",
                digits: 0,
                allowMinus: !1
            },
            indianns: {
                alias: "numeric",
                _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
                },
                groupSeparator: ",",
                radixPoint: ".",
                placeholder: "0",
                digits: 2,
                digitsOptional: !1
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _window = _interopRequireDefault(__webpack_require__(6)), _inputmask = _interopRequireDefault(__webpack_require__(1));
        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj;
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }
        function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
                var Super = _getPrototypeOf(Derived), result;
                if (hasNativeReflectConstruct) {
                    var NewTarget = _getPrototypeOf(this).constructor;
                    result = Reflect.construct(Super, arguments, NewTarget);
                } else result = Super.apply(this, arguments);
                return _possibleConstructorReturn(this, result);
            };
        }
        function _possibleConstructorReturn(self, call) {
            return !call || "object" !== _typeof(call) && "function" != typeof call ? _assertThisInitialized(self) : call;
        }
        function _assertThisInitialized(self) {
            if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return self;
        }
        function _wrapNativeSuper(Class) {
            var _cache = "function" == typeof Map ? new Map() : void 0;
            return _wrapNativeSuper = function _wrapNativeSuper(Class) {
                if (null === Class || !_isNativeFunction(Class)) return Class;
                if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
                if ("undefined" != typeof _cache) {
                    if (_cache.has(Class)) return _cache.get(Class);
                    _cache.set(Class, Wrapper);
                }
                function Wrapper() {
                    return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                }
                return Wrapper.prototype = Object.create(Class.prototype, {
                    constructor: {
                        value: Wrapper,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), _setPrototypeOf(Wrapper, Class);
            }, _wrapNativeSuper(Class);
        }
        function _construct(Parent, args, Class) {
            return _construct = _isNativeReflectConstruct() ? Reflect.construct : function _construct(Parent, args, Class) {
                var a = [ null ];
                a.push.apply(a, args);
                var Constructor = Function.bind.apply(Parent, a), instance = new Constructor();
                return Class && _setPrototypeOf(instance, Class.prototype), instance;
            }, _construct.apply(null, arguments);
        }
        function _isNativeReflectConstruct() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                !0;
            } catch (e) {
                return !1;
            }
        }
        function _isNativeFunction(fn) {
            return -1 !== Function.toString.call(fn).indexOf("[native code]");
        }
        function _setPrototypeOf(o, p) {
            return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                return o.__proto__ = p, o;
            }, _setPrototypeOf(o, p);
        }
        function _getPrototypeOf(o) {
            return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            }, _getPrototypeOf(o);
        }
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var document = _window.default.document;
        if (document && document.head && document.head.attachShadow && _window.default.customElements && void 0 === _window.default.customElements.get("input-mask")) {
            var InputmaskElement = function(_HTMLElement) {
                _inherits(InputmaskElement, _HTMLElement);
                var _super = _createSuper(InputmaskElement);
                function InputmaskElement() {
                    var _this;
                    _classCallCheck(this, InputmaskElement), _this = _super.call(this);
                    var attributeNames = _this.getAttributeNames(), shadow = _this.attachShadow({
                        mode: "closed"
                    }), input = document.createElement("input");
                    for (var attr in input.type = "text", shadow.appendChild(input), attributeNames) Object.prototype.hasOwnProperty.call(attributeNames, attr) && input.setAttribute(attributeNames[attr], _this.getAttribute(attributeNames[attr]));
                    var im = new _inputmask.default();
                    return im.dataAttribute = "", im.mask(input), input.inputmask.shadowRoot = shadow, 
                    _this;
                }
                return InputmaskElement;
            }(_wrapNativeSuper(HTMLElement));
            _window.default.customElements.define("input-mask", InputmaskElement);
        }
    } ], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module.default;
        } : function getModuleExports() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 15);
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    var modules, installedModules;
});
},{}],2:[function(require,module,exports){
module.exports = require("./dist/inputmask");

},{"./dist/inputmask":1}],3:[function(require,module,exports){
const Inputmask = require('inputmask');
},{"inputmask":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9pbnB1dG1hc2svZGlzdC9pbnB1dG1hc2suanMiLCJub2RlX21vZHVsZXMvaW5wdXRtYXNrL2luZGV4LmpzIiwic3JjL2pzL2lucHV0bWFzay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdDdGQTtBQUNBOztBQ0RBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyohXG4gKiBkaXN0L2lucHV0bWFza1xuICogaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAqIENvcHlyaWdodCAoYykgMjAxMCAtIDIwMjAgUm9iaW4gSGVyYm90c1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBWZXJzaW9uOiA1LjAuNS1iZXRhLjBcbiAqL1xuIWZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAoXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUpIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpOyBlbHNlIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoW10sIGZhY3RvcnkpOyBlbHNlIHtcbiAgICAgICAgdmFyIGEgPSBmYWN0b3J5KCk7XG4gICAgICAgIGZvciAodmFyIGkgaW4gYSkgKFwib2JqZWN0XCIgPT0gdHlwZW9mIGV4cG9ydHMgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuICAgIH1cbn0od2luZG93LCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9kdWxlcyA9IFsgZnVuY3Rpb24obW9kdWxlKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gSlNPTi5wYXJzZSgne1wiQkFDS1NQQUNFXCI6OCxcIkJBQ0tTUEFDRV9TQUZBUklcIjoxMjcsXCJERUxFVEVcIjo0NixcIkRPV05cIjo0MCxcIkVORFwiOjM1LFwiRU5URVJcIjoxMyxcIkVTQ0FQRVwiOjI3LFwiSE9NRVwiOjM2LFwiSU5TRVJUXCI6NDUsXCJMRUZUXCI6MzcsXCJQQUdFX0RPV05cIjozNCxcIlBBR0VfVVBcIjozMyxcIlJJR0hUXCI6MzksXCJTUEFDRVwiOjMyLFwiVEFCXCI6OSxcIlVQXCI6MzgsXCJYXCI6ODgsXCJDT05UUk9MXCI6MTcsXCJLRVlfMjI5XCI6MjI5fScpO1xuICAgIH0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgfSksIGV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMCwgX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG4gICAgICAgIHZhciBfbWFzayA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpLCBfaW5wdXRtYXNrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDkpKSwgX3dpbmRvdyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXyg2KSksIF9tYXNrTGV4ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KSwgX3ZhbGlkYXRpb25UZXN0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMyksIF9wb3NpdGlvbmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMiksIF92YWxpZGF0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KSwgX2lucHV0SGFuZGxpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLCBfZXZlbnRydWxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpLCBfZGVmaW5pdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMjApKSwgX2RlZmF1bHRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKSk7XG4gICAgICAgIGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgICAgICAgICB9IDogZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgICAgICAgICAgfSwgX3R5cGVvZihvYmopO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZG9jdW1lbnQgPSBfd2luZG93LmRlZmF1bHQuZG9jdW1lbnQsIGRhdGFLZXkgPSBcIl9pbnB1dG1hc2tfb3B0c1wiO1xuICAgICAgICBmdW5jdGlvbiBJbnB1dG1hc2soYWxpYXMsIG9wdGlvbnMsIGludGVybmFsKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSW5wdXRtYXNrKSkgcmV0dXJuIG5ldyBJbnB1dG1hc2soYWxpYXMsIG9wdGlvbnMsIGludGVybmFsKTtcbiAgICAgICAgICAgIHRoaXMuZGVwZW5kZW5jeUxpYiA9IF9pbnB1dG1hc2suZGVmYXVsdCwgdGhpcy5lbCA9IHZvaWQgMCwgdGhpcy5ldmVudHMgPSB7fSwgdGhpcy5tYXNrc2V0ID0gdm9pZCAwLCBcbiAgICAgICAgICAgICEwICE9PSBpbnRlcm5hbCAmJiAoXCJbb2JqZWN0IE9iamVjdF1cIiA9PT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFsaWFzKSA/IG9wdGlvbnMgPSBhbGlhcyA6IChvcHRpb25zID0gb3B0aW9ucyB8fCB7fSwgXG4gICAgICAgICAgICBhbGlhcyAmJiAob3B0aW9ucy5hbGlhcyA9IGFsaWFzKSksIHRoaXMub3B0cyA9IF9pbnB1dG1hc2suZGVmYXVsdC5leHRlbmQoITAsIHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zKSwgXG4gICAgICAgICAgICB0aGlzLm5vTWFza3NDYWNoZSA9IG9wdGlvbnMgJiYgdm9pZCAwICE9PSBvcHRpb25zLmRlZmluaXRpb25zLCB0aGlzLnVzZXJPcHRpb25zID0gb3B0aW9ucyB8fCB7fSwgXG4gICAgICAgICAgICByZXNvbHZlQWxpYXModGhpcy5vcHRzLmFsaWFzLCBvcHRpb25zLCB0aGlzLm9wdHMpKSwgdGhpcy5yZWZyZXNoVmFsdWUgPSAhMSwgdGhpcy51bmRvVmFsdWUgPSB2b2lkIDAsIFxuICAgICAgICAgICAgdGhpcy4kZWwgPSB2b2lkIDAsIHRoaXMuc2tpcEtleVByZXNzRXZlbnQgPSAhMSwgdGhpcy5za2lwSW5wdXRFdmVudCA9ICExLCB0aGlzLnZhbGlkYXRpb25FdmVudCA9ICExLCBcbiAgICAgICAgICAgIHRoaXMuaWdub3JhYmxlID0gITEsIHRoaXMubWF4TGVuZ3RoLCB0aGlzLm1vdXNlRW50ZXIgPSAhMSwgdGhpcy5vcmlnaW5hbFBsYWNlaG9sZGVyID0gdm9pZCAwLCBcbiAgICAgICAgICAgIHRoaXMuaXNDb21wb3NpbmcgPSAhMTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlQWxpYXMoYWxpYXNTdHIsIG9wdGlvbnMsIG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBhbGlhc0RlZmluaXRpb24gPSBJbnB1dG1hc2sucHJvdG90eXBlLmFsaWFzZXNbYWxpYXNTdHJdO1xuICAgICAgICAgICAgcmV0dXJuIGFsaWFzRGVmaW5pdGlvbiA/IChhbGlhc0RlZmluaXRpb24uYWxpYXMgJiYgcmVzb2x2ZUFsaWFzKGFsaWFzRGVmaW5pdGlvbi5hbGlhcywgdm9pZCAwLCBvcHRzKSwgXG4gICAgICAgICAgICBfaW5wdXRtYXNrLmRlZmF1bHQuZXh0ZW5kKCEwLCBvcHRzLCBhbGlhc0RlZmluaXRpb24pLCBfaW5wdXRtYXNrLmRlZmF1bHQuZXh0ZW5kKCEwLCBvcHRzLCBvcHRpb25zKSwgXG4gICAgICAgICAgICAhMCkgOiAobnVsbCA9PT0gb3B0cy5tYXNrICYmIChvcHRzLm1hc2sgPSBhbGlhc1N0ciksICExKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpbXBvcnRBdHRyaWJ1dGVPcHRpb25zKG5wdCwgb3B0cywgdXNlck9wdGlvbnMsIGRhdGFBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGltcG9ydE9wdGlvbihvcHRpb24sIG9wdGlvbkRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0ck9wdGlvbiA9IFwiXCIgPT09IGRhdGFBdHRyaWJ1dGUgPyBvcHRpb24gOiBkYXRhQXR0cmlidXRlICsgXCItXCIgKyBvcHRpb247XG4gICAgICAgICAgICAgICAgb3B0aW9uRGF0YSA9IHZvaWQgMCAhPT0gb3B0aW9uRGF0YSA/IG9wdGlvbkRhdGEgOiBucHQuZ2V0QXR0cmlidXRlKGF0dHJPcHRpb24pLCBcbiAgICAgICAgICAgICAgICBudWxsICE9PSBvcHRpb25EYXRhICYmIChcInN0cmluZ1wiID09IHR5cGVvZiBvcHRpb25EYXRhICYmICgwID09PSBvcHRpb24uaW5kZXhPZihcIm9uXCIpID8gb3B0aW9uRGF0YSA9IF93aW5kb3cuZGVmYXVsdFtvcHRpb25EYXRhXSA6IFwiZmFsc2VcIiA9PT0gb3B0aW9uRGF0YSA/IG9wdGlvbkRhdGEgPSAhMSA6IFwidHJ1ZVwiID09PSBvcHRpb25EYXRhICYmIChvcHRpb25EYXRhID0gITApKSwgXG4gICAgICAgICAgICAgICAgdXNlck9wdGlvbnNbb3B0aW9uXSA9IG9wdGlvbkRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEwID09PSBvcHRzLmltcG9ydERhdGFBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJPcHRpb25zID0gbnB0LmdldEF0dHJpYnV0ZShkYXRhQXR0cmlidXRlKSwgb3B0aW9uLCBkYXRhb3B0aW9ucywgb3B0aW9uRGF0YSwgcDtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ck9wdGlvbnMgJiYgXCJcIiAhPT0gYXR0ck9wdGlvbnMgJiYgKGF0dHJPcHRpb25zID0gYXR0ck9wdGlvbnMucmVwbGFjZSgvJy9nLCAnXCInKSwgXG4gICAgICAgICAgICAgICAgZGF0YW9wdGlvbnMgPSBKU09OLnBhcnNlKFwie1wiICsgYXR0ck9wdGlvbnMgKyBcIn1cIikpLCBkYXRhb3B0aW9ucykgZm9yIChwIGluIG9wdGlvbkRhdGEgPSB2b2lkIDAsIFxuICAgICAgICAgICAgICAgIGRhdGFvcHRpb25zKSBpZiAoXCJhbGlhc1wiID09PSBwLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uRGF0YSA9IGRhdGFvcHRpb25zW3BdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChvcHRpb24gaW4gaW1wb3J0T3B0aW9uKFwiYWxpYXNcIiwgb3B0aW9uRGF0YSksIHVzZXJPcHRpb25zLmFsaWFzICYmIHJlc29sdmVBbGlhcyh1c2VyT3B0aW9ucy5hbGlhcywgdXNlck9wdGlvbnMsIG9wdHMpLCBcbiAgICAgICAgICAgICAgICBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhb3B0aW9ucykgZm9yIChwIGluIG9wdGlvbkRhdGEgPSB2b2lkIDAsIGRhdGFvcHRpb25zKSBpZiAocC50b0xvd2VyQ2FzZSgpID09PSBvcHRpb24udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uRGF0YSA9IGRhdGFvcHRpb25zW3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW1wb3J0T3B0aW9uKG9wdGlvbiwgb3B0aW9uRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9pbnB1dG1hc2suZGVmYXVsdC5leHRlbmQoITAsIG9wdHMsIHVzZXJPcHRpb25zKSwgXCJydGxcIiAhPT0gbnB0LmRpciAmJiAhb3B0cy5yaWdodEFsaWduIHx8IChucHQuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiKSwgXG4gICAgICAgICAgICBcInJ0bFwiICE9PSBucHQuZGlyICYmICFvcHRzLm51bWVyaWNJbnB1dCB8fCAobnB0LmRpciA9IFwibHRyXCIsIG5wdC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXJcIiksIFxuICAgICAgICAgICAgb3B0cy5pc1JUTCA9ICEwKSwgT2JqZWN0LmtleXModXNlck9wdGlvbnMpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBJbnB1dG1hc2sucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZGF0YUF0dHJpYnV0ZTogXCJkYXRhLWlucHV0bWFza1wiLFxuICAgICAgICAgICAgZGVmYXVsdHM6IF9kZWZhdWx0cy5kZWZhdWx0LFxuICAgICAgICAgICAgZGVmaW5pdGlvbnM6IF9kZWZpbml0aW9ucy5kZWZhdWx0LFxuICAgICAgICAgICAgYWxpYXNlczoge30sXG4gICAgICAgICAgICBtYXNrc0NhY2hlOiB7fSxcbiAgICAgICAgICAgIGdldCBpc1JUTCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRzLmlzUlRMIHx8IHRoaXMub3B0cy5udW1lcmljSW5wdXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFzazogZnVuY3Rpb24gbWFzayhlbGVtcykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2YgZWxlbXMgJiYgKGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbXMpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbXMpKSwgXG4gICAgICAgICAgICAgICAgZWxlbXMgPSBlbGVtcy5ub2RlTmFtZSA/IFsgZWxlbXMgXSA6IGVsZW1zLCBlbGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBuZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3BlZE9wdHMgPSBfaW5wdXRtYXNrLmRlZmF1bHQuZXh0ZW5kKCEwLCB7fSwgdGhhdC5vcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydEF0dHJpYnV0ZU9wdGlvbnMoZWwsIHNjb3BlZE9wdHMsIF9pbnB1dG1hc2suZGVmYXVsdC5leHRlbmQoITAsIHt9LCB0aGF0LnVzZXJPcHRpb25zKSwgdGhhdC5kYXRhQXR0cmlidXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tzZXQgPSAoMCwgX21hc2tMZXhlci5nZW5lcmF0ZU1hc2tTZXQpKHNjb3BlZE9wdHMsIHRoYXQubm9NYXNrc0NhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gbWFza3NldCAmJiAodm9pZCAwICE9PSBlbC5pbnB1dG1hc2sgJiYgKGVsLmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2sgPSAhMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sucmVtb3ZlKCkpLCBlbC5pbnB1dG1hc2sgPSBuZXcgSW5wdXRtYXNrKHZvaWQgMCwgdm9pZCAwLCAhMCksIGVsLmlucHV0bWFzay5vcHRzID0gc2NvcGVkT3B0cywgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2subm9NYXNrc0NhY2hlID0gdGhhdC5ub01hc2tzQ2FjaGUsIGVsLmlucHV0bWFzay51c2VyT3B0aW9ucyA9IF9pbnB1dG1hc2suZGVmYXVsdC5leHRlbmQoITAsIHt9LCB0aGF0LnVzZXJPcHRpb25zKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2suZWwgPSBlbCwgZWwuaW5wdXRtYXNrLiRlbCA9ICgwLCBfaW5wdXRtYXNrLmRlZmF1bHQpKGVsKSwgZWwuaW5wdXRtYXNrLm1hc2tzZXQgPSBtYXNrc2V0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pbnB1dG1hc2suZGVmYXVsdC5kYXRhKGVsLCBkYXRhS2V5LCB0aGF0LnVzZXJPcHRpb25zKSwgX21hc2subWFzay5jYWxsKGVsLmlucHV0bWFzaykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIGVsZW1zICYmIGVsZW1zWzBdICYmIGVsZW1zWzBdLmlucHV0bWFzayB8fCB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbjogZnVuY3Rpb24gb3B0aW9uKG9wdGlvbnMsIG5vcmVtYXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCIgPT0gdHlwZW9mIG9wdGlvbnMgPyB0aGlzLm9wdHNbb3B0aW9uc10gOiBcIm9iamVjdFwiID09PSBfdHlwZW9mKG9wdGlvbnMpID8gKF9pbnB1dG1hc2suZGVmYXVsdC5leHRlbmQodGhpcy51c2VyT3B0aW9ucywgb3B0aW9ucyksIFxuICAgICAgICAgICAgICAgIHRoaXMuZWwgJiYgITAgIT09IG5vcmVtYXNrICYmIHRoaXMubWFzayh0aGlzLmVsKSwgdGhpcykgOiB2b2lkIDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5tYXNrZWR2YWx1ZTogZnVuY3Rpb24gdW5tYXNrZWR2YWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgKDAsIF9tYXNrTGV4ZXIuZ2VuZXJhdGVNYXNrU2V0KSh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgdm9pZCAwID09PSB0aGlzLmVsIHx8IHZvaWQgMCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlQnVmZmVyID0gKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vcHRzLm9uQmVmb3JlTWFzayAmJiB0aGlzLm9wdHMub25CZWZvcmVNYXNrLmNhbGwodGhpcywgdmFsdWUsIHRoaXMub3B0cykgfHwgdmFsdWUpLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBfaW5wdXRIYW5kbGluZy5jaGVja1ZhbC5jYWxsKHRoaXMsIHZvaWQgMCwgITEsICExLCB2YWx1ZUJ1ZmZlciksIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vcHRzLm9uQmVmb3JlV3JpdGUgJiYgdGhpcy5vcHRzLm9uQmVmb3JlV3JpdGUuY2FsbCh0aGlzLCB2b2lkIDAsIF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbCh0aGlzKSwgMCwgdGhpcy5vcHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9pbnB1dEhhbmRsaW5nLnVubWFza2VkdmFsdWUuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbCkge1xuICAgICAgICAgICAgICAgICAgICBfaW5wdXRtYXNrLmRlZmF1bHQuZGF0YSh0aGlzLmVsLCBkYXRhS2V5LCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN2ID0gdGhpcy5vcHRzLmF1dG9Vbm1hc2sgPyAoMCwgX2lucHV0SGFuZGxpbmcudW5tYXNrZWR2YWx1ZSkodGhpcy5lbCkgOiB0aGlzLl92YWx1ZUdldCh0aGlzLm9wdHMuYXV0b1VubWFzayksIHZhbHVlUHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgIGN2ICE9PSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbCh0aGlzKS5qb2luKFwiXCIpID8gdGhpcy5fdmFsdWVTZXQoY3YsIHRoaXMub3B0cy5hdXRvVW5tYXNrKSA6IHRoaXMuX3ZhbHVlU2V0KFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vZmYodGhpcy5lbCksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzLmVsKSwgXCJ2YWx1ZVwiKSwgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcGVydHkgJiYgdGhpcy5fX3ZhbHVlR2V0ICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmVsLCBcInZhbHVlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogdGhpcy5fX3ZhbHVlR2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiB0aGlzLl9fdmFsdWVTZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgIH0pKSA6IGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgdGhpcy5lbC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIikgJiYgdGhpcy5fX3ZhbHVlR2V0ICYmICh0aGlzLmVsLl9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCB0aGlzLl9fdmFsdWVHZXQpLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgdGhpcy5fX3ZhbHVlU2V0KSksIHRoaXMuZWwuaW5wdXRtYXNrID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRlbXB0eW1hc2s6IGZ1bmN0aW9uIGdldGVtcHR5bWFzaygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8ICgwLCBfbWFza0xleGVyLmdlbmVyYXRlTWFza1NldCkodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKHRoaXMpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzTWFza2VkVmFsdWU6IGZ1bmN0aW9uIGhhc01hc2tlZFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5vcHRzLmF1dG9Vbm1hc2s7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24gaXNDb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8ICgwLCBfbWFza0xleGVyLmdlbmVyYXRlTWFza1NldCkodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIF92YWxpZGF0aW9uLmlzQ29tcGxldGUuY2FsbCh0aGlzLCBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwodGhpcykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldG1ldGFkYXRhOiBmdW5jdGlvbiBnZXRtZXRhZGF0YSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8ICgwLCBfbWFza0xleGVyLmdlbmVyYXRlTWFza1NldCkodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodGhpcy5tYXNrc2V0Lm1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFza1RhcmdldCA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0TWFza1RlbXBsYXRlLmNhbGwodGhpcywgITAsIDAsICExKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0Lm1ldGFkYXRhLmZvckVhY2goZnVuY3Rpb24obXRkdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG10ZHQubWFzayAhPT0gbWFza1RhcmdldCB8fCAobWFza1RhcmdldCA9IG10ZHQsICExKTtcbiAgICAgICAgICAgICAgICAgICAgfSksIG1hc2tUYXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQubWV0YWRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNWYWxpZDogZnVuY3Rpb24gaXNWYWxpZCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgKDAsIF9tYXNrTGV4ZXIuZ2VuZXJhdGVNYXNrU2V0KSh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlQnVmZmVyID0gKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vcHRzLm9uQmVmb3JlTWFzayAmJiB0aGlzLm9wdHMub25CZWZvcmVNYXNrLmNhbGwodGhpcywgdmFsdWUsIHRoaXMub3B0cykgfHwgdmFsdWUpLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBfaW5wdXRIYW5kbGluZy5jaGVja1ZhbC5jYWxsKHRoaXMsIHZvaWQgMCwgITAsICExLCB2YWx1ZUJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHZhbHVlID0gdGhpcy5pc1JUTCA/IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbCh0aGlzKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKHRoaXMpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYnVmZmVyID0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKHRoaXMpLCBybCA9IF9wb3NpdGlvbmluZy5kZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbi5jYWxsKHRoaXMpLCBsbWliID0gYnVmZmVyLmxlbmd0aCAtIDE7IHJsIDwgbG1pYiAmJiAhX3Bvc2l0aW9uaW5nLmlzTWFzay5jYWxsKHRoaXMsIGxtaWIpOyBsbWliLS0pIDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyLnNwbGljZShybCwgbG1pYiArIDEgLSBybCksIF92YWxpZGF0aW9uLmlzQ29tcGxldGUuY2FsbCh0aGlzLCBidWZmZXIpICYmIHZhbHVlID09PSAodGhpcy5pc1JUTCA/IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbCh0aGlzKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKHRoaXMpLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gZm9ybWF0KHZhbHVlLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCAoMCwgX21hc2tMZXhlci5nZW5lcmF0ZU1hc2tTZXQpKHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUJ1ZmZlciA9IChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRoaXMub3B0cy5vbkJlZm9yZU1hc2sgJiYgdGhpcy5vcHRzLm9uQmVmb3JlTWFzay5jYWxsKHRoaXMsIHZhbHVlLCB0aGlzLm9wdHMpIHx8IHZhbHVlKS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICBfaW5wdXRIYW5kbGluZy5jaGVja1ZhbC5jYWxsKHRoaXMsIHZvaWQgMCwgITAsICExLCB2YWx1ZUJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5pc1JUTCA/IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbCh0aGlzKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKHRoaXMpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGFkYXRhID8ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybWF0dGVkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB0aGlzLmdldG1ldGFkYXRhKClcbiAgICAgICAgICAgICAgICB9IDogZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbCAmJiAoMCwgX2lucHV0bWFzay5kZWZhdWx0KSh0aGlzLmVsKS50cmlnZ2VyKFwic2V0dmFsdWVcIiwgWyB2YWx1ZSBdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmFseXNlTWFzazogX21hc2tMZXhlci5hbmFseXNlTWFza1xuICAgICAgICB9LCBJbnB1dG1hc2suZXh0ZW5kRGVmYXVsdHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICBfaW5wdXRtYXNrLmRlZmF1bHQuZXh0ZW5kKCEwLCBJbnB1dG1hc2sucHJvdG90eXBlLmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgfSwgSW5wdXRtYXNrLmV4dGVuZERlZmluaXRpb25zID0gZnVuY3Rpb24oZGVmaW5pdGlvbikge1xuICAgICAgICAgICAgX2lucHV0bWFzay5kZWZhdWx0LmV4dGVuZCghMCwgSW5wdXRtYXNrLnByb3RvdHlwZS5kZWZpbml0aW9ucywgZGVmaW5pdGlvbik7XG4gICAgICAgIH0sIElucHV0bWFzay5leHRlbmRBbGlhc2VzID0gZnVuY3Rpb24oYWxpYXMpIHtcbiAgICAgICAgICAgIF9pbnB1dG1hc2suZGVmYXVsdC5leHRlbmQoITAsIElucHV0bWFzay5wcm90b3R5cGUuYWxpYXNlcywgYWxpYXMpO1xuICAgICAgICB9LCBJbnB1dG1hc2suZm9ybWF0ID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMsIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5wdXRtYXNrKG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSwgbWV0YWRhdGEpO1xuICAgICAgICB9LCBJbnB1dG1hc2sudW5tYXNrID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dG1hc2sob3B0aW9ucykudW5tYXNrZWR2YWx1ZSh2YWx1ZSk7XG4gICAgICAgIH0sIElucHV0bWFzay5pc1ZhbGlkID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dG1hc2sob3B0aW9ucykuaXNWYWxpZCh2YWx1ZSk7XG4gICAgICAgIH0sIElucHV0bWFzay5yZW1vdmUgPSBmdW5jdGlvbihlbGVtcykge1xuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2YgZWxlbXMgJiYgKGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbXMpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbXMpKSwgXG4gICAgICAgICAgICBlbGVtcyA9IGVsZW1zLm5vZGVOYW1lID8gWyBlbGVtcyBdIDogZWxlbXMsIGVsZW1zLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sgJiYgZWwuaW5wdXRtYXNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIElucHV0bWFzay5zZXRWYWx1ZSA9IGZ1bmN0aW9uKGVsZW1zLCB2YWx1ZSkge1xuICAgICAgICAgICAgXCJzdHJpbmdcIiA9PSB0eXBlb2YgZWxlbXMgJiYgKGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbXMpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbXMpKSwgXG4gICAgICAgICAgICBlbGVtcyA9IGVsZW1zLm5vZGVOYW1lID8gWyBlbGVtcyBdIDogZWxlbXMsIGVsZW1zLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5pbnB1dG1hc2sgPyBlbC5pbnB1dG1hc2suc2V0VmFsdWUodmFsdWUpIDogKDAsIF9pbnB1dG1hc2suZGVmYXVsdCkoZWwpLnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIHZhbHVlIF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIElucHV0bWFzay5kZXBlbmRlbmN5TGliID0gX2lucHV0bWFzay5kZWZhdWx0LCBfd2luZG93LmRlZmF1bHQuSW5wdXRtYXNrID0gSW5wdXRtYXNrO1xuICAgICAgICB2YXIgX2RlZmF1bHQgPSBJbnB1dG1hc2s7XG4gICAgICAgIGV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgfSksIGV4cG9ydHMuY2FyZXQgPSBjYXJldCwgZXhwb3J0cy5kZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbiA9IGRldGVybWluZUxhc3RSZXF1aXJlZFBvc2l0aW9uLCBcbiAgICAgICAgZXhwb3J0cy5kZXRlcm1pbmVOZXdDYXJldFBvc2l0aW9uID0gZGV0ZXJtaW5lTmV3Q2FyZXRQb3NpdGlvbiwgZXhwb3J0cy5nZXRCdWZmZXIgPSBnZXRCdWZmZXIsIFxuICAgICAgICBleHBvcnRzLmdldEJ1ZmZlclRlbXBsYXRlID0gZ2V0QnVmZmVyVGVtcGxhdGUsIGV4cG9ydHMuZ2V0TGFzdFZhbGlkUG9zaXRpb24gPSBnZXRMYXN0VmFsaWRQb3NpdGlvbiwgXG4gICAgICAgIGV4cG9ydHMuaXNNYXNrID0gaXNNYXNrLCBleHBvcnRzLnJlc2V0TWFza1NldCA9IHJlc2V0TWFza1NldCwgZXhwb3J0cy5zZWVrTmV4dCA9IHNlZWtOZXh0LCBcbiAgICAgICAgZXhwb3J0cy5zZWVrUHJldmlvdXMgPSBzZWVrUHJldmlvdXMsIGV4cG9ydHMudHJhbnNsYXRlUG9zaXRpb24gPSB0cmFuc2xhdGVQb3NpdGlvbjtcbiAgICAgICAgdmFyIF92YWxpZGF0aW9uVGVzdHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpLCBfdmFsaWRhdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNCksIF9tYXNrID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG4gICAgICAgIGZ1bmN0aW9uIGNhcmV0KGlucHV0LCBiZWdpbiwgZW5kLCBub3RyYW5zbGF0ZSwgaXNEZWxldGUpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLCBvcHRzID0gdGhpcy5vcHRzLCByYW5nZTtcbiAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IGJlZ2luKSByZXR1cm4gXCJzZWxlY3Rpb25TdGFydFwiIGluIGlucHV0ICYmIFwic2VsZWN0aW9uRW5kXCIgaW4gaW5wdXQgPyAoYmVnaW4gPSBpbnB1dC5zZWxlY3Rpb25TdGFydCwgXG4gICAgICAgICAgICBlbmQgPSBpbnB1dC5zZWxlY3Rpb25FbmQpIDogd2luZG93LmdldFNlbGVjdGlvbiA/IChyYW5nZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLCBcbiAgICAgICAgICAgIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLnBhcmVudE5vZGUgIT09IGlucHV0ICYmIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyICE9PSBpbnB1dCB8fCAoYmVnaW4gPSByYW5nZS5zdGFydE9mZnNldCwgXG4gICAgICAgICAgICBlbmQgPSByYW5nZS5lbmRPZmZzZXQpKSA6IGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UgJiYgKHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCksIFxuICAgICAgICAgICAgYmVnaW4gPSAwIC0gcmFuZ2UuZHVwbGljYXRlKCkubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC1pbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKSwgXG4gICAgICAgICAgICBlbmQgPSBiZWdpbiArIHJhbmdlLnRleHQubGVuZ3RoKSwge1xuICAgICAgICAgICAgICAgIGJlZ2luOiBub3RyYW5zbGF0ZSA/IGJlZ2luIDogdHJhbnNsYXRlUG9zaXRpb24uY2FsbCh0aGlzLCBiZWdpbiksXG4gICAgICAgICAgICAgICAgZW5kOiBub3RyYW5zbGF0ZSA/IGVuZCA6IHRyYW5zbGF0ZVBvc2l0aW9uLmNhbGwodGhpcywgZW5kKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJlZ2luKSAmJiAoZW5kID0gdGhpcy5pc1JUTCA/IGJlZ2luWzBdIDogYmVnaW5bMV0sIGJlZ2luID0gdGhpcy5pc1JUTCA/IGJlZ2luWzFdIDogYmVnaW5bMF0pLCBcbiAgICAgICAgICAgIHZvaWQgMCAhPT0gYmVnaW4uYmVnaW4gJiYgKGVuZCA9IHRoaXMuaXNSVEwgPyBiZWdpbi5iZWdpbiA6IGJlZ2luLmVuZCwgYmVnaW4gPSB0aGlzLmlzUlRMID8gYmVnaW4uZW5kIDogYmVnaW4uYmVnaW4pLCBcbiAgICAgICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIGJlZ2luKSB7XG4gICAgICAgICAgICAgICAgYmVnaW4gPSBub3RyYW5zbGF0ZSA/IGJlZ2luIDogdHJhbnNsYXRlUG9zaXRpb24uY2FsbCh0aGlzLCBiZWdpbiksIGVuZCA9IG5vdHJhbnNsYXRlID8gZW5kIDogdHJhbnNsYXRlUG9zaXRpb24uY2FsbCh0aGlzLCBlbmQpLCBcbiAgICAgICAgICAgICAgICBlbmQgPSBcIm51bWJlclwiID09IHR5cGVvZiBlbmQgPyBlbmQgOiBiZWdpbjtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsQ2FsYyA9IHBhcnNlSW50KCgoaW5wdXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUgPyAoaW5wdXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUoaW5wdXQsIG51bGwpIDogaW5wdXQuY3VycmVudFN0eWxlKS5mb250U2l6ZSkgKiBlbmQ7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnNjcm9sbExlZnQgPSBzY3JvbGxDYWxjID4gaW5wdXQuc2Nyb2xsV2lkdGggPyBzY3JvbGxDYWxjIDogMCwgaW5wdXQuaW5wdXRtYXNrLmNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbjogYmVnaW4sXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgICAgICAgICAgfSwgb3B0cy5pbnNlcnRNb2RlVmlzdWFsICYmICExID09PSBvcHRzLmluc2VydE1vZGUgJiYgYmVnaW4gPT09IGVuZCAmJiAoaXNEZWxldGUgfHwgZW5kKyspLCBcbiAgICAgICAgICAgICAgICBpbnB1dCA9PT0gKGlucHV0LmlucHV0bWFzay5zaGFkb3dSb290IHx8IGRvY3VtZW50KS5hY3RpdmVFbGVtZW50KSBpZiAoXCJzZXRTZWxlY3Rpb25SYW5nZVwiIGluIGlucHV0KSBpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZShiZWdpbiwgZW5kKTsgZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLCB2b2lkIDAgPT09IGlucHV0LmZpcnN0Q2hpbGQgfHwgbnVsbCA9PT0gaW5wdXQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoaW5wdXQuZmlyc3RDaGlsZCwgYmVnaW4gPCBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoID8gYmVnaW4gOiBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKSwgXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnNldEVuZChpbnB1dC5maXJzdENoaWxkLCBlbmQgPCBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoID8gZW5kIDogaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCksIFxuICAgICAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSghMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKSwgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaW5wdXQuY3JlYXRlVGV4dFJhbmdlICYmIChyYW5nZSA9IGlucHV0LmNyZWF0ZVRleHRSYW5nZSgpLCByYW5nZS5jb2xsYXBzZSghMCksIFxuICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgZW5kKSwgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIGJlZ2luKSwgcmFuZ2Uuc2VsZWN0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRldGVybWluZUxhc3RSZXF1aXJlZFBvc2l0aW9uKHJldHVybkRlZmluaXRpb24pIHtcbiAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLCBtYXNrc2V0ID0gdGhpcy5tYXNrc2V0LCAkID0gdGhpcy5kZXBlbmRlbmN5TGliLCBidWZmZXIgPSBfdmFsaWRhdGlvblRlc3RzLmdldE1hc2tUZW1wbGF0ZS5jYWxsKHRoaXMsICEwLCBnZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKHRoaXMpLCAhMCwgITApLCBibCA9IGJ1ZmZlci5sZW5ndGgsIHBvcywgbHZwID0gZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh0aGlzKSwgcG9zaXRpb25zID0ge30sIGx2VGVzdCA9IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbbHZwXSwgbmR4SW50bHpyID0gdm9pZCAwICE9PSBsdlRlc3QgPyBsdlRlc3QubG9jYXRvci5zbGljZSgpIDogdm9pZCAwLCB0ZXN0UG9zO1xuICAgICAgICAgICAgZm9yIChwb3MgPSBsdnAgKyAxOyBwb3MgPCBidWZmZXIubGVuZ3RoOyBwb3MrKykgdGVzdFBvcyA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdFRlbXBsYXRlLmNhbGwodGhpcywgcG9zLCBuZHhJbnRsenIsIHBvcyAtIDEpLCBcbiAgICAgICAgICAgIG5keEludGx6ciA9IHRlc3RQb3MubG9jYXRvci5zbGljZSgpLCBwb3NpdGlvbnNbcG9zXSA9ICQuZXh0ZW5kKCEwLCB7fSwgdGVzdFBvcyk7XG4gICAgICAgICAgICB2YXIgbHZUZXN0QWx0ID0gbHZUZXN0ICYmIHZvaWQgMCAhPT0gbHZUZXN0LmFsdGVybmF0aW9uID8gbHZUZXN0LmxvY2F0b3JbbHZUZXN0LmFsdGVybmF0aW9uXSA6IHZvaWQgMDtcbiAgICAgICAgICAgIGZvciAocG9zID0gYmwgLSAxOyBsdnAgPCBwb3MgJiYgKHRlc3RQb3MgPSBwb3NpdGlvbnNbcG9zXSwgKHRlc3RQb3MubWF0Y2gub3B0aW9uYWxpdHkgfHwgdGVzdFBvcy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgdGVzdFBvcy5tYXRjaC5uZXdCbG9ja01hcmtlciB8fCBsdlRlc3RBbHQgJiYgKGx2VGVzdEFsdCAhPT0gcG9zaXRpb25zW3Bvc10ubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dICYmIDEgIT0gdGVzdFBvcy5tYXRjaC5zdGF0aWMgfHwgITAgPT09IHRlc3RQb3MubWF0Y2guc3RhdGljICYmIHRlc3RQb3MubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dICYmIF92YWxpZGF0aW9uLmNoZWNrQWx0ZXJuYXRpb25NYXRjaC5jYWxsKHRoaXMsIHRlc3RQb3MubG9jYXRvcltsdlRlc3QuYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpLCBsdlRlc3RBbHQudG9TdHJpbmcoKS5zcGxpdChcIixcIikpICYmIFwiXCIgIT09IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdHMuY2FsbCh0aGlzLCBwb3MpWzBdLmRlZikpICYmIGJ1ZmZlcltwb3NdID09PSBfdmFsaWRhdGlvblRlc3RzLmdldFBsYWNlaG9sZGVyLmNhbGwodGhpcywgcG9zLCB0ZXN0UG9zLm1hdGNoKSk7IHBvcy0tKSBibC0tO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVybkRlZmluaXRpb24gPyB7XG4gICAgICAgICAgICAgICAgbDogYmwsXG4gICAgICAgICAgICAgICAgZGVmOiBwb3NpdGlvbnNbYmxdID8gcG9zaXRpb25zW2JsXS5tYXRjaCA6IHZvaWQgMFxuICAgICAgICAgICAgfSA6IGJsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRldGVybWluZU5ld0NhcmV0UG9zaXRpb24oc2VsZWN0ZWRDYXJldCwgdGFiYmVkKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgbWFza3NldCA9IHRoaXMubWFza3NldCwgb3B0cyA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvUmFkaXhGb2N1cyhjbGlja1Bvcykge1xuICAgICAgICAgICAgICAgIGlmIChcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgMCAhPT0gb3B0cy5kaWdpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZwcyA9IG1hc2tzZXQudmFsaWRQb3NpdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IHZwc1tjbGlja1Bvc10gfHwgdnBzW2NsaWNrUG9zXS5pbnB1dCA9PT0gX3ZhbGlkYXRpb25UZXN0cy5nZXRQbGFjZWhvbGRlci5jYWxsKGlucHV0bWFzaywgY2xpY2tQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tQb3MgPCBzZWVrTmV4dC5jYWxsKGlucHV0bWFzaywgLTEpKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3MgPSBnZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gcmFkaXhQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB2cCBpbiB2cHMpIGlmICh2cHNbdnBdICYmIHJhZGl4UG9zIDwgdnAgJiYgdnBzW3ZwXS5pbnB1dCAhPT0gX3ZhbGlkYXRpb25UZXN0cy5nZXRQbGFjZWhvbGRlci5jYWxsKGlucHV0bWFzaywgdnApKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YWJiZWQgJiYgKGlucHV0bWFzay5pc1JUTCA/IHNlbGVjdGVkQ2FyZXQuZW5kID0gc2VsZWN0ZWRDYXJldC5iZWdpbiA6IHNlbGVjdGVkQ2FyZXQuYmVnaW4gPSBzZWxlY3RlZENhcmV0LmVuZCksIFxuICAgICAgICAgICAgc2VsZWN0ZWRDYXJldC5iZWdpbiA9PT0gc2VsZWN0ZWRDYXJldC5lbmQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJub25lXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FyZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJpZ25vcmVcIjpcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJldC5lbmQgPSBzZWxlY3RlZENhcmV0LmJlZ2luID0gc2Vla05leHQuY2FsbChpbnB1dG1hc2ssIGdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwoaW5wdXRtYXNrKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIFwicmFkaXhGb2N1c1wiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9SYWRpeEZvY3VzKHNlbGVjdGVkQ2FyZXQuYmVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3MgPSBnZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLmpvaW4oXCJcIikuaW5kZXhPZihvcHRzLnJhZGl4UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJldC5lbmQgPSBzZWxlY3RlZENhcmV0LmJlZ2luID0gb3B0cy5udW1lcmljSW5wdXQgPyBzZWVrTmV4dC5jYWxsKGlucHV0bWFzaywgcmFkaXhQb3MpIDogcmFkaXhQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tQb3NpdGlvbiA9IHNlbGVjdGVkQ2FyZXQuYmVnaW4sIGx2Y2xpY2tQb3NpdGlvbiA9IGdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwoaW5wdXRtYXNrLCBjbGlja1Bvc2l0aW9uLCAhMCksIGxhc3RQb3NpdGlvbiA9IHNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCAtMSAhPT0gbHZjbGlja1Bvc2l0aW9uIHx8IGlzTWFzay5jYWxsKGlucHV0bWFzaywgMCkgPyBsdmNsaWNrUG9zaXRpb24gOiAtMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGlja1Bvc2l0aW9uIDw9IGxhc3RQb3NpdGlvbikgc2VsZWN0ZWRDYXJldC5lbmQgPSBzZWxlY3RlZENhcmV0LmJlZ2luID0gaXNNYXNrLmNhbGwoaW5wdXRtYXNrLCBjbGlja1Bvc2l0aW9uLCAhMSwgITApID8gY2xpY2tQb3NpdGlvbiA6IHNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCBjbGlja1Bvc2l0aW9uKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbHZwID0gbWFza3NldC52YWxpZFBvc2l0aW9uc1tsdmNsaWNrUG9zaXRpb25dLCB0dCA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdFRlbXBsYXRlLmNhbGwoaW5wdXRtYXNrLCBsYXN0UG9zaXRpb24sIGx2cCA/IGx2cC5tYXRjaC5sb2NhdG9yIDogdm9pZCAwLCBsdnApLCBwbGFjZWhvbGRlciA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0UGxhY2Vob2xkZXIuY2FsbChpbnB1dG1hc2ssIGxhc3RQb3NpdGlvbiwgdHQubWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IHBsYWNlaG9sZGVyICYmIGdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaylbbGFzdFBvc2l0aW9uXSAhPT0gcGxhY2Vob2xkZXIgJiYgITAgIT09IHR0Lm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAmJiAhMCAhPT0gdHQubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgIWlzTWFzay5jYWxsKGlucHV0bWFzaywgbGFzdFBvc2l0aW9uLCBvcHRzLmtlZXBTdGF0aWMsICEwKSAmJiB0dC5tYXRjaC5kZWYgPT09IHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BvcyA9IHNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCBsYXN0UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuZXdQb3MgPD0gY2xpY2tQb3NpdGlvbiB8fCBjbGlja1Bvc2l0aW9uID09PSBsYXN0UG9zaXRpb24pICYmIChsYXN0UG9zaXRpb24gPSBuZXdQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJldC5lbmQgPSBzZWxlY3RlZENhcmV0LmJlZ2luID0gbGFzdFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZENhcmV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEJ1ZmZlcihub0NhY2hlKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgbWFza3NldCA9IHRoaXMubWFza3NldDtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDAgIT09IG1hc2tzZXQuYnVmZmVyICYmICEwICE9PSBub0NhY2hlIHx8IChtYXNrc2V0LmJ1ZmZlciA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0TWFza1RlbXBsYXRlLmNhbGwodGhpcywgITAsIGdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwodGhpcyksICEwKSwgXG4gICAgICAgICAgICB2b2lkIDAgPT09IG1hc2tzZXQuX2J1ZmZlciAmJiAobWFza3NldC5fYnVmZmVyID0gbWFza3NldC5idWZmZXIuc2xpY2UoKSkpLCBtYXNrc2V0LmJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRCdWZmZXJUZW1wbGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLCBtYXNrc2V0ID0gdGhpcy5tYXNrc2V0O1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMCA9PT0gbWFza3NldC5fYnVmZmVyICYmIChtYXNrc2V0Ll9idWZmZXIgPSBfdmFsaWRhdGlvblRlc3RzLmdldE1hc2tUZW1wbGF0ZS5jYWxsKHRoaXMsICExLCAxKSwgXG4gICAgICAgICAgICB2b2lkIDAgPT09IG1hc2tzZXQuYnVmZmVyICYmIChtYXNrc2V0LmJ1ZmZlciA9IG1hc2tzZXQuX2J1ZmZlci5zbGljZSgpKSksIG1hc2tzZXQuX2J1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRMYXN0VmFsaWRQb3NpdGlvbihjbG9zZXN0VG8sIHN0cmljdCwgdmFsaWRQb3NpdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBtYXNrc2V0ID0gdGhpcy5tYXNrc2V0LCBiZWZvcmUgPSAtMSwgYWZ0ZXIgPSAtMSwgdmFsaWRzID0gdmFsaWRQb3NpdGlvbnMgfHwgbWFza3NldC52YWxpZFBvc2l0aW9ucztcbiAgICAgICAgICAgIGZvciAodmFyIHBvc05keCBpbiB2b2lkIDAgPT09IGNsb3Nlc3RUbyAmJiAoY2xvc2VzdFRvID0gLTEpLCB2YWxpZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHNOZHggPSBwYXJzZUludChwb3NOZHgpO1xuICAgICAgICAgICAgICAgIHZhbGlkc1twc05keF0gJiYgKHN0cmljdCB8fCAhMCAhPT0gdmFsaWRzW3BzTmR4XS5nZW5lcmF0ZWRJbnB1dCkgJiYgKHBzTmR4IDw9IGNsb3Nlc3RUbyAmJiAoYmVmb3JlID0gcHNOZHgpLCBcbiAgICAgICAgICAgICAgICBjbG9zZXN0VG8gPD0gcHNOZHggJiYgKGFmdGVyID0gcHNOZHgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMSA9PT0gYmVmb3JlIHx8IGJlZm9yZSA9PSBjbG9zZXN0VG8gPyBhZnRlciA6IC0xID09IGFmdGVyID8gYmVmb3JlIDogY2xvc2VzdFRvIC0gYmVmb3JlIDwgYWZ0ZXIgLSBjbG9zZXN0VG8gPyBiZWZvcmUgOiBhZnRlcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpc01hc2socG9zLCBzdHJpY3QsIGZ1enp5KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgbWFza3NldCA9IHRoaXMubWFza3NldCwgdGVzdCA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdFRlbXBsYXRlLmNhbGwodGhpcywgcG9zKS5tYXRjaDtcbiAgICAgICAgICAgIGlmIChcIlwiID09PSB0ZXN0LmRlZiAmJiAodGVzdCA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdC5jYWxsKHRoaXMsIHBvcykubWF0Y2gpLCBcbiAgICAgICAgICAgICEwICE9PSB0ZXN0LnN0YXRpYykgcmV0dXJuIHRlc3QuZm47XG4gICAgICAgICAgICBpZiAoITAgPT09IGZ1enp5ICYmIHZvaWQgMCAhPT0gbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdICYmICEwICE9PSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10uZ2VuZXJhdGVkSW5wdXQpIHJldHVybiAhMDtcbiAgICAgICAgICAgIGlmICghMCAhPT0gc3RyaWN0ICYmIC0xIDwgcG9zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZ1enp5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0cyA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdHMuY2FsbCh0aGlzLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVzdHMubGVuZ3RoID4gMSArIChcIlwiID09PSB0ZXN0c1t0ZXN0cy5sZW5ndGggLSAxXS5tYXRjaC5kZWYgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ZXN0VGVtcGxhdGUgPSBfdmFsaWRhdGlvblRlc3RzLmRldGVybWluZVRlc3RUZW1wbGF0ZS5jYWxsKHRoaXMsIHBvcywgX3ZhbGlkYXRpb25UZXN0cy5nZXRUZXN0cy5jYWxsKHRoaXMsIHBvcykpLCB0ZXN0UGxhY2VIb2xkZXIgPSBfdmFsaWRhdGlvblRlc3RzLmdldFBsYWNlaG9sZGVyLmNhbGwodGhpcywgcG9zLCB0ZXN0VGVtcGxhdGUubWF0Y2gpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0VGVtcGxhdGUubWF0Y2guZGVmICE9PSB0ZXN0UGxhY2VIb2xkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVzZXRNYXNrU2V0KHNvZnQpIHtcbiAgICAgICAgICAgIHZhciBtYXNrc2V0ID0gdGhpcy5tYXNrc2V0O1xuICAgICAgICAgICAgbWFza3NldC5idWZmZXIgPSB2b2lkIDAsICEwICE9PSBzb2Z0ICYmIChtYXNrc2V0LnZhbGlkUG9zaXRpb25zID0ge30sIG1hc2tzZXQucCA9IDApO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNlZWtOZXh0KHBvcywgbmV3QmxvY2ssIGZ1enp5KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcztcbiAgICAgICAgICAgIHZvaWQgMCA9PT0gZnV6enkgJiYgKGZ1enp5ID0gITApO1xuICAgICAgICAgICAgZm9yICh2YXIgcG9zaXRpb24gPSBwb3MgKyAxOyBcIlwiICE9PSBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbCh0aGlzLCBwb3NpdGlvbikubWF0Y2guZGVmICYmICghMCA9PT0gbmV3QmxvY2sgJiYgKCEwICE9PSBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbCh0aGlzLCBwb3NpdGlvbikubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgIWlzTWFzay5jYWxsKHRoaXMsIHBvc2l0aW9uLCB2b2lkIDAsICEwKSkgfHwgITAgIT09IG5ld0Jsb2NrICYmICFpc01hc2suY2FsbCh0aGlzLCBwb3NpdGlvbiwgdm9pZCAwLCBmdXp6eSkpOyApIHBvc2l0aW9uKys7XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2Vla1ByZXZpb3VzKHBvcywgbmV3QmxvY2spIHtcbiAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLCBwb3NpdGlvbiA9IHBvcyAtIDE7XG4gICAgICAgICAgICBpZiAocG9zIDw9IDApIHJldHVybiAwO1xuICAgICAgICAgICAgZm9yICg7MCA8IHBvc2l0aW9uICYmICghMCA9PT0gbmV3QmxvY2sgJiYgKCEwICE9PSBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbCh0aGlzLCBwb3NpdGlvbikubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgIWlzTWFzay5jYWxsKHRoaXMsIHBvc2l0aW9uLCB2b2lkIDAsICEwKSkgfHwgITAgIT09IG5ld0Jsb2NrICYmICFpc01hc2suY2FsbCh0aGlzLCBwb3NpdGlvbiwgdm9pZCAwLCAhMCkpOyApIHBvc2l0aW9uLS07XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdHJhbnNsYXRlUG9zaXRpb24ocG9zKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgb3B0cyA9IHRoaXMub3B0cywgZWwgPSB0aGlzLmVsO1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzUlRMIHx8IFwibnVtYmVyXCIgIT0gdHlwZW9mIHBvcyB8fCBvcHRzLmdyZWVkeSAmJiBcIlwiID09PSBvcHRzLnBsYWNlaG9sZGVyIHx8ICFlbCB8fCAocG9zID0gdGhpcy5fdmFsdWVHZXQoKS5sZW5ndGggLSBwb3MpLCBcbiAgICAgICAgICAgIHBvcztcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gZ2V0TG9jYXRvcih0c3QsIGFsaWduKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRvciA9IChudWxsICE9IHRzdC5hbHRlcm5hdGlvbiA/IHRzdC5tbG9jW2dldERlY2lzaW9uVGFrZXIodHN0KV0gOiB0c3QubG9jYXRvcikuam9pbihcIlwiKTtcbiAgICAgICAgICAgIGlmIChcIlwiICE9PSBsb2NhdG9yKSBmb3IgKDtsb2NhdG9yLmxlbmd0aCA8IGFsaWduOyApIGxvY2F0b3IgKz0gXCIwXCI7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXREZWNpc2lvblRha2VyKHRzdCkge1xuICAgICAgICAgICAgdmFyIGRlY2lzaW9uVGFrZXIgPSB0c3QubG9jYXRvclt0c3QuYWx0ZXJuYXRpb25dO1xuICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCIgPT0gdHlwZW9mIGRlY2lzaW9uVGFrZXIgJiYgMCA8IGRlY2lzaW9uVGFrZXIubGVuZ3RoICYmIChkZWNpc2lvblRha2VyID0gZGVjaXNpb25UYWtlci5zcGxpdChcIixcIilbMF0pLCBcbiAgICAgICAgICAgIHZvaWQgMCAhPT0gZGVjaXNpb25UYWtlciA/IGRlY2lzaW9uVGFrZXIudG9TdHJpbmcoKSA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXIocG9zLCB0ZXN0LCByZXR1cm5QTCkge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMsIG9wdHMgPSB0aGlzLm9wdHMsIG1hc2tzZXQgPSB0aGlzLm1hc2tzZXQ7XG4gICAgICAgICAgICBpZiAodGVzdCA9IHRlc3QgfHwgZ2V0VGVzdC5jYWxsKHRoaXMsIHBvcykubWF0Y2gsIHZvaWQgMCAhPT0gdGVzdC5wbGFjZWhvbGRlciB8fCAhMCA9PT0gcmV0dXJuUEwpIHJldHVybiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRlc3QucGxhY2Vob2xkZXIgPyB0ZXN0LnBsYWNlaG9sZGVyKG9wdHMpIDogdGVzdC5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgIGlmICghMCAhPT0gdGVzdC5zdGF0aWMpIHJldHVybiBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdChwb3MgJSBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoLTEgPCBwb3MgJiYgdm9pZCAwID09PSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10pIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdHMgPSBnZXRUZXN0cy5jYWxsKHRoaXMsIHBvcyksIHN0YXRpY0FsdGVybmF0aW9ucyA9IFtdLCBwcmV2VGVzdDtcbiAgICAgICAgICAgICAgICBpZiAodGVzdHMubGVuZ3RoID4gMSArIChcIlwiID09PSB0ZXN0c1t0ZXN0cy5sZW5ndGggLSAxXS5tYXRjaC5kZWYgPyAxIDogMCkpIGZvciAodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspIGlmIChcIlwiICE9PSB0ZXN0c1tpXS5tYXRjaC5kZWYgJiYgITAgIT09IHRlc3RzW2ldLm1hdGNoLm9wdGlvbmFsaXR5ICYmICEwICE9PSB0ZXN0c1tpXS5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgKCEwID09PSB0ZXN0c1tpXS5tYXRjaC5zdGF0aWMgfHwgdm9pZCAwID09PSBwcmV2VGVzdCB8fCAhMSAhPT0gdGVzdHNbaV0ubWF0Y2guZm4udGVzdChwcmV2VGVzdC5tYXRjaC5kZWYsIG1hc2tzZXQsIHBvcywgITAsIG9wdHMpKSAmJiAoc3RhdGljQWx0ZXJuYXRpb25zLnB1c2godGVzdHNbaV0pLCBcbiAgICAgICAgICAgICAgICAhMCA9PT0gdGVzdHNbaV0ubWF0Y2guc3RhdGljICYmIChwcmV2VGVzdCA9IHRlc3RzW2ldKSwgMSA8IHN0YXRpY0FsdGVybmF0aW9ucy5sZW5ndGggJiYgL1swLTlhLWJBLVpdLy50ZXN0KHN0YXRpY0FsdGVybmF0aW9uc1swXS5tYXRjaC5kZWYpKSkgcmV0dXJuIG9wdHMucGxhY2Vob2xkZXIuY2hhckF0KHBvcyAlIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXN0LmRlZjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRNYXNrVGVtcGxhdGUoYmFzZU9uSW5wdXQsIG1pbmltYWxQb3MsIGluY2x1ZGVNb2RlLCBub0ppdCwgY2xlYXJPcHRpb25hbFRhaWwpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLCBvcHRzID0gdGhpcy5vcHRzLCBtYXNrc2V0ID0gdGhpcy5tYXNrc2V0LCBncmVlZHkgPSBvcHRzLmdyZWVkeTtcbiAgICAgICAgICAgIGNsZWFyT3B0aW9uYWxUYWlsICYmIChvcHRzLmdyZWVkeSA9ICExKSwgbWluaW1hbFBvcyA9IG1pbmltYWxQb3MgfHwgMDtcbiAgICAgICAgICAgIHZhciBtYXNrVGVtcGxhdGUgPSBbXSwgbmR4SW50bHpyLCBwb3MgPSAwLCB0ZXN0LCB0ZXN0UG9zLCBqaXRSZW5kZXJTdGF0aWM7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgaWYgKCEwID09PSBiYXNlT25JbnB1dCAmJiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10pIHRlc3RQb3MgPSBjbGVhck9wdGlvbmFsVGFpbCAmJiAhMCA9PT0gbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdLm1hdGNoLm9wdGlvbmFsaXR5ICYmIHZvaWQgMCA9PT0gbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3MgKyAxXSAmJiAoITAgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXS5nZW5lcmF0ZWRJbnB1dCB8fCBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10uaW5wdXQgPT0gb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyICYmIDAgPCBwb3MpID8gZGV0ZXJtaW5lVGVzdFRlbXBsYXRlLmNhbGwodGhpcywgcG9zLCBnZXRUZXN0cy5jYWxsKHRoaXMsIHBvcywgbmR4SW50bHpyLCBwb3MgLSAxKSkgOiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Bvc10sIFxuICAgICAgICAgICAgICAgIHRlc3QgPSB0ZXN0UG9zLm1hdGNoLCBuZHhJbnRsenIgPSB0ZXN0UG9zLmxvY2F0b3Iuc2xpY2UoKSwgbWFza1RlbXBsYXRlLnB1c2goITAgPT09IGluY2x1ZGVNb2RlID8gdGVzdFBvcy5pbnB1dCA6ICExID09PSBpbmNsdWRlTW9kZSA/IHRlc3QubmF0aXZlRGVmIDogZ2V0UGxhY2Vob2xkZXIuY2FsbCh0aGlzLCBwb3MsIHRlc3QpKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3RQb3MgPSBnZXRUZXN0VGVtcGxhdGUuY2FsbCh0aGlzLCBwb3MsIG5keEludGx6ciwgcG9zIC0gMSksIHRlc3QgPSB0ZXN0UG9zLm1hdGNoLCBcbiAgICAgICAgICAgICAgICAgICAgbmR4SW50bHpyID0gdGVzdFBvcy5sb2NhdG9yLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqaXRNYXNraW5nID0gITAgIT09IG5vSml0ICYmICghMSAhPT0gb3B0cy5qaXRNYXNraW5nID8gb3B0cy5qaXRNYXNraW5nIDogdGVzdC5qaXQpO1xuICAgICAgICAgICAgICAgICAgICBqaXRSZW5kZXJTdGF0aWMgPSBqaXRSZW5kZXJTdGF0aWMgJiYgdGVzdC5zdGF0aWMgJiYgdGVzdC5kZWYgIT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IgJiYgbnVsbCA9PT0gdGVzdC5mbiB8fCBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3BvcyAtIDFdICYmIHRlc3Quc3RhdGljICYmIHRlc3QuZGVmICE9PSBvcHRzLmdyb3VwU2VwYXJhdG9yICYmIG51bGwgPT09IHRlc3QuZm4sIFxuICAgICAgICAgICAgICAgICAgICBqaXRSZW5kZXJTdGF0aWMgfHwgITEgPT09IGppdE1hc2tpbmcgfHwgdm9pZCAwID09PSBqaXRNYXNraW5nIHx8IFwibnVtYmVyXCIgPT0gdHlwZW9mIGppdE1hc2tpbmcgJiYgaXNGaW5pdGUoaml0TWFza2luZykgJiYgcG9zIDwgaml0TWFza2luZyA/IG1hc2tUZW1wbGF0ZS5wdXNoKCExID09PSBpbmNsdWRlTW9kZSA/IHRlc3QubmF0aXZlRGVmIDogZ2V0UGxhY2Vob2xkZXIuY2FsbCh0aGlzLCBwb3MsIHRlc3QpKSA6IGppdFJlbmRlclN0YXRpYyA9ICExO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIH0gd2hpbGUgKCh2b2lkIDAgPT09IHRoaXMubWF4TGVuZ3RoIHx8IHBvcyA8IHRoaXMubWF4TGVuZ3RoKSAmJiAoITAgIT09IHRlc3Quc3RhdGljIHx8IFwiXCIgIT09IHRlc3QuZGVmKSB8fCBwb3MgPCBtaW5pbWFsUG9zKTtcbiAgICAgICAgICAgIHJldHVybiBcIlwiID09PSBtYXNrVGVtcGxhdGVbbWFza1RlbXBsYXRlLmxlbmd0aCAtIDFdICYmIG1hc2tUZW1wbGF0ZS5wb3AoKSwgITEgPT09IGluY2x1ZGVNb2RlICYmIHZvaWQgMCAhPT0gbWFza3NldC5tYXNrTGVuZ3RoIHx8IChtYXNrc2V0Lm1hc2tMZW5ndGggPSBwb3MgLSAxKSwgXG4gICAgICAgICAgICBvcHRzLmdyZWVkeSA9IGdyZWVkeSwgbWFza1RlbXBsYXRlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFRlc3RUZW1wbGF0ZShwb3MsIG5keEludGx6ciwgdHN0UHMpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLCBtYXNrc2V0ID0gdGhpcy5tYXNrc2V0O1xuICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXSB8fCBkZXRlcm1pbmVUZXN0VGVtcGxhdGUuY2FsbCh0aGlzLCBwb3MsIGdldFRlc3RzLmNhbGwodGhpcywgcG9zLCBuZHhJbnRsenIgPyBuZHhJbnRsenIuc2xpY2UoKSA6IG5keEludGx6ciwgdHN0UHMpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkZXRlcm1pbmVUZXN0VGVtcGxhdGUocG9zLCB0ZXN0cykge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMsIG9wdHMgPSB0aGlzLm9wdHM7XG4gICAgICAgICAgICBwb3MgPSAwIDwgcG9zID8gcG9zIC0gMSA6IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBhbHRUZXN0ID0gZ2V0VGVzdC5jYWxsKHRoaXMsIHBvcyksIHRhcmdldExvY2F0b3IgPSBnZXRMb2NhdG9yKGFsdFRlc3QpLCB0c3RMb2NhdG9yLCBjbG9zZXN0LCBiZXN0TWF0Y2gsIG5keCA9IDA7IG5keCA8IHRlc3RzLmxlbmd0aDsgbmR4KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdHN0ID0gdGVzdHNbbmR4XTtcbiAgICAgICAgICAgICAgICB0c3RMb2NhdG9yID0gZ2V0TG9jYXRvcih0c3QsIHRhcmdldExvY2F0b3IubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyh0c3RMb2NhdG9yIC0gdGFyZ2V0TG9jYXRvcik7XG4gICAgICAgICAgICAgICAgKHZvaWQgMCA9PT0gY2xvc2VzdCB8fCBcIlwiICE9PSB0c3RMb2NhdG9yICYmIGRpc3RhbmNlIDwgY2xvc2VzdCB8fCBiZXN0TWF0Y2ggJiYgIW9wdHMuZ3JlZWR5ICYmIGJlc3RNYXRjaC5tYXRjaC5vcHRpb25hbGl0eSAmJiBcIm1hc3RlclwiID09PSBiZXN0TWF0Y2gubWF0Y2gubmV3QmxvY2tNYXJrZXIgJiYgKCF0c3QubWF0Y2gub3B0aW9uYWxpdHkgfHwgIXRzdC5tYXRjaC5uZXdCbG9ja01hcmtlcikgfHwgYmVzdE1hdGNoICYmIGJlc3RNYXRjaC5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIgJiYgIXRzdC5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIpICYmIChjbG9zZXN0ID0gZGlzdGFuY2UsIFxuICAgICAgICAgICAgICAgIGJlc3RNYXRjaCA9IHRzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmVzdE1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFRlc3QocG9zLCB0ZXN0cykge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMsIG1hc2tzZXQgPSB0aGlzLm1hc2tzZXQ7XG4gICAgICAgICAgICByZXR1cm4gbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdID8gbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3NdIDogKHRlc3RzIHx8IGdldFRlc3RzLmNhbGwodGhpcywgcG9zKSlbMF07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0VGVzdHMocG9zLCBuZHhJbnRsenIsIHRzdFBzKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgJCA9IHRoaXMuZGVwZW5kZW5jeUxpYiwgbWFza3NldCA9IHRoaXMubWFza3NldCwgb3B0cyA9IHRoaXMub3B0cywgZWwgPSB0aGlzLmVsLCBtYXNrVG9rZW5zID0gbWFza3NldC5tYXNrVG9rZW4sIHRlc3RQb3MgPSBuZHhJbnRsenIgPyB0c3RQcyA6IDAsIG5keEluaXRpYWxpemVyID0gbmR4SW50bHpyID8gbmR4SW50bHpyLnNsaWNlKCkgOiBbIDAgXSwgbWF0Y2hlcyA9IFtdLCBpbnNlcnRTdG9wID0gITEsIGxhdGVzdE1hdGNoLCBjYWNoZURlcGVuZGVuY3kgPSBuZHhJbnRsenIgPyBuZHhJbnRsenIuam9pbihcIlwiKSA6IFwiXCI7XG4gICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlVGVzdEZyb21Ub2tlbihtYXNrVG9rZW4sIG5keEluaXRpYWxpemVyLCBsb29wTmR4LCBxdWFudGlmaWVyUmVjdXJzZSkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZU1hdGNoKG1hdGNoLCBsb29wTmR4LCBxdWFudGlmaWVyUmVjdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdE1hdGNoID0gMCA9PT0gdG9rZW5Hcm91cC5tYXRjaGVzLmluZGV4T2YobGF0ZXN0TWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0TWF0Y2ggfHwgdG9rZW5Hcm91cC5tYXRjaGVzLmV2ZXJ5KGZ1bmN0aW9uKG1hdGNoLCBuZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITAgPT09IG1hdGNoLmlzUXVhbnRpZmllciA/IGZpcnN0TWF0Y2ggPSBpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIHRva2VuR3JvdXAubWF0Y2hlc1tuZHggLSAxXSkgOiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWF0Y2gsIFwibWF0Y2hlc1wiKSAmJiAoZmlyc3RNYXRjaCA9IGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgbWF0Y2gpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWZpcnN0TWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgZmlyc3RNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXNvbHZlTmR4SW5pdGlhbGl6ZXIocG9zLCBhbHRlcm5hdGVOZHgsIHRhcmdldEFsdGVybmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmVzdE1hdGNoLCBpbmRleFBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWFza3NldC50ZXN0c1twb3NdIHx8IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXSkgJiYgKG1hc2tzZXQudGVzdHNbcG9zXSB8fCBbIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zXSBdKS5ldmVyeShmdW5jdGlvbihsbW50LCBuZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG1udC5tbG9jW2FsdGVybmF0ZU5keF0pIHJldHVybiBiZXN0TWF0Y2ggPSBsbW50LCAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0ZXJuYXRpb24gPSB2b2lkIDAgIT09IHRhcmdldEFsdGVybmF0aW9uID8gdGFyZ2V0QWx0ZXJuYXRpb24gOiBsbW50LmFsdGVybmF0aW9uLCBuZHhQb3MgPSB2b2lkIDAgIT09IGxtbnQubG9jYXRvclthbHRlcm5hdGlvbl0gPyBsbW50LmxvY2F0b3JbYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuaW5kZXhPZihhbHRlcm5hdGVOZHgpIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2b2lkIDAgPT09IGluZGV4UG9zIHx8IG5keFBvcyA8IGluZGV4UG9zKSAmJiAtMSAhPT0gbmR4UG9zICYmIChiZXN0TWF0Y2ggPSBsbW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleFBvcyA9IG5keFBvcyksICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksIGJlc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXN0TWF0Y2hBbHRJbmRleCA9IGJlc3RNYXRjaC5sb2NhdG9yW2Jlc3RNYXRjaC5hbHRlcm5hdGlvbl0sIGxvY2F0b3IgPSBiZXN0TWF0Y2gubWxvY1thbHRlcm5hdGVOZHhdIHx8IGJlc3RNYXRjaC5tbG9jW2Jlc3RNYXRjaEFsdEluZGV4XSB8fCBiZXN0TWF0Y2gubG9jYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRvci5zbGljZSgodm9pZCAwICE9PSB0YXJnZXRBbHRlcm5hdGlvbiA/IHRhcmdldEFsdGVybmF0aW9uIDogYmVzdE1hdGNoLmFsdGVybmF0aW9uKSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMCAhPT0gdGFyZ2V0QWx0ZXJuYXRpb24gPyByZXNvbHZlTmR4SW5pdGlhbGl6ZXIocG9zLCBhbHRlcm5hdGVOZHgpIDogdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlzU3Vic2V0T2Yoc291cmNlLCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGV4cGFuZChwYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZXhwYW5kZWQgPSBbXSwgc3RhcnQgPSAtMSwgZW5kLCBpID0gMCwgbCA9IHBhdHRlcm4ubGVuZ3RoOyBpIDwgbDsgaSsrKSBpZiAoXCItXCIgPT09IHBhdHRlcm4uY2hhckF0KGkpKSBmb3IgKGVuZCA9IHBhdHRlcm4uY2hhckNvZGVBdChpICsgMSk7ICsrc3RhcnQgPCBlbmQ7ICkgZXhwYW5kZWQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHN0YXJ0KSk7IGVsc2Ugc3RhcnQgPSBwYXR0ZXJuLmNoYXJDb2RlQXQoaSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkLnB1c2gocGF0dGVybi5jaGFyQXQoaSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHBhbmRlZC5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5tYXRjaC5kZWYgPT09IHRhcmdldC5tYXRjaC5uYXRpdmVEZWYgfHwgISghKG9wdHMucmVnZXggfHwgc291cmNlLm1hdGNoLmZuIGluc3RhbmNlb2YgUmVnRXhwICYmIHRhcmdldC5tYXRjaC5mbiBpbnN0YW5jZW9mIFJlZ0V4cCkgfHwgITAgPT09IHNvdXJjZS5tYXRjaC5zdGF0aWMgfHwgITAgPT09IHRhcmdldC5tYXRjaC5zdGF0aWMpICYmIC0xICE9PSBleHBhbmQodGFyZ2V0Lm1hdGNoLmZuLnRvU3RyaW5nKCkucmVwbGFjZSgvW1tcXF0vXS9nLCBcIlwiKSkuaW5kZXhPZihleHBhbmQoc291cmNlLm1hdGNoLmZuLnRvU3RyaW5nKCkucmVwbGFjZSgvW1tcXF0vXS9nLCBcIlwiKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHN0YXRpY0Nhbk1hdGNoRGVmaW5pdGlvbihzb3VyY2UsIHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwID09PSBzb3VyY2UubWF0Y2guc3RhdGljICYmICEwICE9PSB0YXJnZXQubWF0Y2guc3RhdGljICYmIHRhcmdldC5tYXRjaC5mbi50ZXN0KHNvdXJjZS5tYXRjaC5kZWYsIG1hc2tzZXQsIHBvcywgITEsIG9wdHMsICExKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXRNZXJnZUxvY2F0b3JzKHRhcmdldE1hdGNoLCBhbHRNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdGVybmF0aW9uTmR4ID0gdGFyZ2V0TWF0Y2guYWx0ZXJuYXRpb24sIHNob3VsZE1lcmdlID0gdm9pZCAwID09PSBhbHRNYXRjaCB8fCBhbHRlcm5hdGlvbk5keCA9PT0gYWx0TWF0Y2guYWx0ZXJuYXRpb24gJiYgLTEgPT09IHRhcmdldE1hdGNoLmxvY2F0b3JbYWx0ZXJuYXRpb25OZHhdLnRvU3RyaW5nKCkuaW5kZXhPZihhbHRNYXRjaC5sb2NhdG9yW2FsdGVybmF0aW9uTmR4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNob3VsZE1lcmdlICYmIGFsdGVybmF0aW9uTmR4ID4gYWx0TWF0Y2guYWx0ZXJuYXRpb24pIGZvciAodmFyIGkgPSBhbHRNYXRjaC5hbHRlcm5hdGlvbjsgaSA8IGFsdGVybmF0aW9uTmR4OyBpKyspIGlmICh0YXJnZXRNYXRjaC5sb2NhdG9yW2ldICE9PSBhbHRNYXRjaC5sb2NhdG9yW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRpb25OZHggPSBpLCBzaG91bGRNZXJnZSA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZE1lcmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2gubWxvYyA9IHRhcmdldE1hdGNoLm1sb2MgfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY05keCA9IHRhcmdldE1hdGNoLmxvY2F0b3JbYWx0ZXJuYXRpb25OZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGxvY05keCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgbG9jTmR4ICYmIChsb2NOZHggPSBsb2NOZHguc3BsaXQoXCIsXCIpWzBdKSwgdm9pZCAwID09PSB0YXJnZXRNYXRjaC5tbG9jW2xvY05keF0gJiYgKHRhcmdldE1hdGNoLm1sb2NbbG9jTmR4XSA9IHRhcmdldE1hdGNoLmxvY2F0b3Iuc2xpY2UoKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAgIT09IGFsdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHggaW4gYWx0TWF0Y2gubWxvYykgXCJzdHJpbmdcIiA9PSB0eXBlb2YgbmR4ICYmIChuZHggPSBuZHguc3BsaXQoXCIsXCIpWzBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAgPT09IHRhcmdldE1hdGNoLm1sb2NbbmR4XSAmJiAodGFyZ2V0TWF0Y2gubWxvY1tuZHhdID0gYWx0TWF0Y2gubWxvY1tuZHhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoLmxvY2F0b3JbYWx0ZXJuYXRpb25OZHhdID0gT2JqZWN0LmtleXModGFyZ2V0TWF0Y2gubWxvYykuam9pbihcIixcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaC5hbHRlcm5hdGlvbiA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc1NhbWVMZXZlbCh0YXJnZXRNYXRjaCwgYWx0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRNYXRjaC5sb2NhdG9yLmxlbmd0aCAhPT0gYWx0TWF0Y2gubG9jYXRvci5sZW5ndGgpIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGxvY05keCA9IHRhcmdldE1hdGNoLmFsdGVybmF0aW9uICsgMTsgbG9jTmR4IDwgdGFyZ2V0TWF0Y2gubG9jYXRvci5sZW5ndGg7IGxvY05keCsrKSBpZiAodGFyZ2V0TWF0Y2gubG9jYXRvcltsb2NOZHhdICE9PSBhbHRNYXRjaC5sb2NhdG9yW2xvY05keF0pIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFBvcyA+IHBvcyArIG9wdHMuX21heFRlc3RQb3MpIHRocm93IFwiSW5wdXRtYXNrOiBUaGVyZSBpcyBwcm9iYWJseSBhbiBlcnJvciBpbiB5b3VyIG1hc2sgZGVmaW5pdGlvbiBvciBpbiB0aGUgY29kZS4gQ3JlYXRlIGFuIGlzc3VlIG9uIGdpdGh1YiB3aXRoIGFuIGV4YW1wbGUgb2YgdGhlIG1hc2sgeW91IGFyZSB1c2luZy4gXCIgKyBtYXNrc2V0Lm1hc2s7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zID09PSBwb3MgJiYgdm9pZCAwID09PSBtYXRjaC5tYXRjaGVzKSByZXR1cm4gbWF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiBtYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0b3I6IGxvb3BOZHgucmV2ZXJzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2Q6IGNhY2hlRGVwZW5kZW5jeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1sb2M6IHt9XG4gICAgICAgICAgICAgICAgICAgIH0pLCAhMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gbWF0Y2gubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoLmlzR3JvdXAgJiYgcXVhbnRpZmllclJlY3Vyc2UgIT09IG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoID0gaGFuZGxlTWF0Y2gobWFza1Rva2VuLm1hdGNoZXNbbWFza1Rva2VuLm1hdGNoZXMuaW5kZXhPZihtYXRjaCkgKyAxXSwgbG9vcE5keCwgcXVhbnRpZmllclJlY3Vyc2UpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaC5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbmFsVG9rZW4gPSBtYXRjaCwgbXRjaHNOZHggPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSByZXNvbHZlVGVzdEZyb21Ub2tlbihtYXRjaCwgbmR4SW5pdGlhbGl6ZXIsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMuZm9yRWFjaChmdW5jdGlvbihtdGNoLCBuZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG10Y2hzTmR4IDw9IG5keCAmJiAobXRjaC5tYXRjaC5vcHRpb25hbGl0eSA9ICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGxhdGVzdE1hdGNoID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdLm1hdGNoLCB2b2lkIDAgIT09IHF1YW50aWZpZXJSZWN1cnNlIHx8ICFpc0ZpcnN0TWF0Y2gobGF0ZXN0TWF0Y2gsIG9wdGlvbmFsVG9rZW4pKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFN0b3AgPSAhMCwgdGVzdFBvcyA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRlcm5hdGVUb2tlbiA9IG1hdGNoLCBtYWx0ZXJuYXRlTWF0Y2hlcyA9IFtdLCBtYWx0TWF0Y2hlcywgY3VycmVudE1hdGNoZXMgPSBtYXRjaGVzLnNsaWNlKCksIGxvb3BOZHhDbnQgPSBsb29wTmR4Lmxlbmd0aCwgYWx0SW5kZXggPSAwIDwgbmR4SW5pdGlhbGl6ZXIubGVuZ3RoID8gbmR4SW5pdGlhbGl6ZXIuc2hpZnQoKSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSA9PT0gYWx0SW5kZXggfHwgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYWx0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSB0ZXN0UG9zLCBuZHhJbml0aWFsaXplckNsb25lID0gbmR4SW5pdGlhbGl6ZXIuc2xpY2UoKSwgYWx0SW5kZXhBcnIgPSBbXSwgYW1uZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBhbHRJbmRleCkgYWx0SW5kZXhBcnIgPSBhbHRJbmRleC5zcGxpdChcIixcIik7IGVsc2UgZm9yIChhbW5keCA9IDA7IGFtbmR4IDwgYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlcy5sZW5ndGg7IGFtbmR4KyspIGFsdEluZGV4QXJyLnB1c2goYW1uZHgudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IG1hc2tzZXQuZXhjbHVkZXNbcG9zXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYWx0SW5kZXhBcnJDbG9uZSA9IGFsdEluZGV4QXJyLnNsaWNlKCksIGkgPSAwLCBleGwgPSBtYXNrc2V0LmV4Y2x1ZGVzW3Bvc10ubGVuZ3RoOyBpIDwgZXhsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhjbHVkZVNldCA9IG1hc2tzZXQuZXhjbHVkZXNbcG9zXVtpXS50b1N0cmluZygpLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wTmR4Lmxlbmd0aCA9PSBleGNsdWRlU2V0WzFdICYmIGFsdEluZGV4QXJyLnNwbGljZShhbHRJbmRleEFyci5pbmRleE9mKGV4Y2x1ZGVTZXRbMF0pLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT09IGFsdEluZGV4QXJyLmxlbmd0aCAmJiAoZGVsZXRlIG1hc2tzZXQuZXhjbHVkZXNbcG9zXSwgYWx0SW5kZXhBcnIgPSBhbHRJbmRleEFyckNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoITAgPT09IG9wdHMua2VlcFN0YXRpYyB8fCBpc0Zpbml0ZShwYXJzZUludChvcHRzLmtlZXBTdGF0aWMpKSAmJiBjdXJyZW50UG9zID49IG9wdHMua2VlcFN0YXRpYykgJiYgKGFsdEluZGV4QXJyID0gYWx0SW5kZXhBcnIuc2xpY2UoMCwgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB1bk1hdGNoZWRBbHRlcm5hdGlvbiA9ICExLCBuZHggPSAwOyBuZHggPCBhbHRJbmRleEFyci5sZW5ndGg7IG5keCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW5keCA9IHBhcnNlSW50KGFsdEluZGV4QXJyW25keF0pLCBtYXRjaGVzID0gW10sIG5keEluaXRpYWxpemVyID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgYWx0SW5kZXggJiYgcmVzb2x2ZU5keEluaXRpYWxpemVyKHRlc3RQb3MsIGFtbmR4LCBsb29wTmR4Q250KSB8fCBuZHhJbml0aWFsaXplckNsb25lLnNsaWNlKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlc1thbW5keF0gJiYgaGFuZGxlTWF0Y2goYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlc1thbW5keF0sIFsgYW1uZHggXS5jb25jYXQobG9vcE5keCksIHF1YW50aWZpZXJSZWN1cnNlKSA/IG1hdGNoID0gITAgOiAwID09PSBuZHggJiYgKHVuTWF0Y2hlZEFsdGVybmF0aW9uID0gITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbHRNYXRjaGVzID0gbWF0Y2hlcy5zbGljZSgpLCB0ZXN0UG9zID0gY3VycmVudFBvcywgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4MSA9IDA7IG5keDEgPCBtYWx0TWF0Y2hlcy5sZW5ndGg7IG5keDErKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRNYXRjaCA9IG1hbHRNYXRjaGVzW25keDFdLCBkcm9wTWF0Y2ggPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRNYXRjaC5tYXRjaC5qaXQgPSBhbHRNYXRjaC5tYXRjaC5qaXQgfHwgdW5NYXRjaGVkQWx0ZXJuYXRpb24sIGFsdE1hdGNoLmFsdGVybmF0aW9uID0gYWx0TWF0Y2guYWx0ZXJuYXRpb24gfHwgbG9vcE5keENudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVyZ2VMb2NhdG9ycyhhbHRNYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmR4MiA9IDA7IG5keDIgPCBtYWx0ZXJuYXRlTWF0Y2hlcy5sZW5ndGg7IG5keDIrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0TWF0Y2gyID0gbWFsdGVybmF0ZU1hdGNoZXNbbmR4Ml07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiICE9IHR5cGVvZiBhbHRJbmRleCB8fCB2b2lkIDAgIT09IGFsdE1hdGNoLmFsdGVybmF0aW9uICYmIGFsdEluZGV4QXJyLmluY2x1ZGVzKGFsdE1hdGNoLmxvY2F0b3JbYWx0TWF0Y2guYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWx0TWF0Y2gubWF0Y2gubmF0aXZlRGVmID09PSBhbHRNYXRjaDIubWF0Y2gubmF0aXZlRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE1hdGNoID0gITAsIHNldE1lcmdlTG9jYXRvcnMoYWx0TWF0Y2gyLCBhbHRNYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdWJzZXRPZihhbHRNYXRjaCwgYWx0TWF0Y2gyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1lcmdlTG9jYXRvcnMoYWx0TWF0Y2gsIGFsdE1hdGNoMikgJiYgKGRyb3BNYXRjaCA9ICEwLCBtYWx0ZXJuYXRlTWF0Y2hlcy5zcGxpY2UobWFsdGVybmF0ZU1hdGNoZXMuaW5kZXhPZihhbHRNYXRjaDIpLCAwLCBhbHRNYXRjaCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3Vic2V0T2YoYWx0TWF0Y2gyLCBhbHRNYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXJnZUxvY2F0b3JzKGFsdE1hdGNoMiwgYWx0TWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRpY0Nhbk1hdGNoRGVmaW5pdGlvbihhbHRNYXRjaCwgYWx0TWF0Y2gyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FtZUxldmVsKGFsdE1hdGNoLCBhbHRNYXRjaDIpIHx8IHZvaWQgMCAhPT0gZWwuaW5wdXRtYXNrLnVzZXJPcHRpb25zLmtlZXBTdGF0aWMgPyBzZXRNZXJnZUxvY2F0b3JzKGFsdE1hdGNoLCBhbHRNYXRjaDIpICYmIChkcm9wTWF0Y2ggPSAhMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFsdGVybmF0ZU1hdGNoZXMuc3BsaWNlKG1hbHRlcm5hdGVNYXRjaGVzLmluZGV4T2YoYWx0TWF0Y2gyKSwgMCwgYWx0TWF0Y2gpKSA6IG9wdHMua2VlcFN0YXRpYyA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BNYXRjaCB8fCBtYWx0ZXJuYXRlTWF0Y2hlcy5wdXNoKGFsdE1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gY3VycmVudE1hdGNoZXMuY29uY2F0KG1hbHRlcm5hdGVNYXRjaGVzKSwgdGVzdFBvcyA9IHBvcywgaW5zZXJ0U3RvcCA9IDAgPCBtYXRjaGVzLmxlbmd0aCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gMCA8IG1hbHRlcm5hdGVNYXRjaGVzLmxlbmd0aCwgbmR4SW5pdGlhbGl6ZXIgPSBuZHhJbml0aWFsaXplckNsb25lLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIG1hdGNoID0gaGFuZGxlTWF0Y2goYWx0ZXJuYXRlVG9rZW4ubWF0Y2hlc1thbHRJbmRleF0gfHwgbWFza1Rva2VuLm1hdGNoZXNbYWx0SW5kZXhdLCBbIGFsdEluZGV4IF0uY29uY2F0KGxvb3BOZHgpLCBxdWFudGlmaWVyUmVjdXJzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoLmlzUXVhbnRpZmllciAmJiBxdWFudGlmaWVyUmVjdXJzZSAhPT0gbWFza1Rva2VuLm1hdGNoZXNbbWFza1Rva2VuLm1hdGNoZXMuaW5kZXhPZihtYXRjaCkgLSAxXSkgZm9yICh2YXIgcXQgPSBtYXRjaCwgcW5keCA9IDAgPCBuZHhJbml0aWFsaXplci5sZW5ndGggPyBuZHhJbml0aWFsaXplci5zaGlmdCgpIDogMDsgcW5keCA8IChpc05hTihxdC5xdWFudGlmaWVyLm1heCkgPyBxbmR4ICsgMSA6IHF0LnF1YW50aWZpZXIubWF4KSAmJiB0ZXN0UG9zIDw9IHBvczsgcW5keCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuR3JvdXAgPSBtYXNrVG9rZW4ubWF0Y2hlc1ttYXNrVG9rZW4ubWF0Y2hlcy5pbmRleE9mKHF0KSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IGhhbmRsZU1hdGNoKHRva2VuR3JvdXAsIFsgcW5keCBdLmNvbmNhdChsb29wTmR4KSwgdG9rZW5Hcm91cCksIG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3RNYXRjaCA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXS5tYXRjaCwgbGF0ZXN0TWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyID0gcW5keCA+PSBxdC5xdWFudGlmaWVyLm1pbiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVzdE1hdGNoLmppdCA9IChxbmR4IHx8IDEpICogdG9rZW5Hcm91cC5tYXRjaGVzLmluZGV4T2YobGF0ZXN0TWF0Y2gpID49IHF0LnF1YW50aWZpZXIuaml0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0TWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmIGlzRmlyc3RNYXRjaChsYXRlc3RNYXRjaCwgdG9rZW5Hcm91cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFN0b3AgPSAhMCwgdGVzdFBvcyA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsYXRlc3RNYXRjaC5qaXQgJiYgKG1hc2tzZXQuaml0T2Zmc2V0W3Bvc10gPSB0b2tlbkdyb3VwLm1hdGNoZXMubGVuZ3RoIC0gdG9rZW5Hcm91cC5tYXRjaGVzLmluZGV4T2YobGF0ZXN0TWF0Y2gpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2ggPSByZXNvbHZlVGVzdEZyb21Ub2tlbihtYXRjaCwgbmR4SW5pdGlhbGl6ZXIsIGxvb3BOZHgsIHF1YW50aWZpZXJSZWN1cnNlKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdGVzdFBvcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0bmR4ID0gMCA8IG5keEluaXRpYWxpemVyLmxlbmd0aCA/IG5keEluaXRpYWxpemVyLnNoaWZ0KCkgOiAwOyB0bmR4IDwgbWFza1Rva2VuLm1hdGNoZXMubGVuZ3RoOyB0bmR4KyspIGlmICghMCAhPT0gbWFza1Rva2VuLm1hdGNoZXNbdG5keF0uaXNRdWFudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGhhbmRsZU1hdGNoKG1hc2tUb2tlbi5tYXRjaGVzW3RuZHhdLCBbIHRuZHggXS5jb25jYXQobG9vcE5keCksIHF1YW50aWZpZXJSZWN1cnNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIHRlc3RQb3MgPT09IHBvcykgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zIDwgdGVzdFBvcykgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gbWVyZ2VMb2NhdG9ycyhwb3MsIHRlc3RzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0b3IgPSBbXSwgYWx0ZXJuYXRpb247XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGVzdHMpIHx8ICh0ZXN0cyA9IFsgdGVzdHMgXSksIDAgPCB0ZXN0cy5sZW5ndGggJiYgKHZvaWQgMCA9PT0gdGVzdHNbMF0uYWx0ZXJuYXRpb24gfHwgITAgPT09IG9wdHMua2VlcFN0YXRpYyA/IChsb2NhdG9yID0gZGV0ZXJtaW5lVGVzdFRlbXBsYXRlLmNhbGwoaW5wdXRtYXNrLCBwb3MsIHRlc3RzLnNsaWNlKCkpLmxvY2F0b3Iuc2xpY2UoKSwgXG4gICAgICAgICAgICAgICAgMCA9PT0gbG9jYXRvci5sZW5ndGggJiYgKGxvY2F0b3IgPSB0ZXN0c1swXS5sb2NhdG9yLnNsaWNlKCkpKSA6IHRlc3RzLmZvckVhY2goZnVuY3Rpb24odHN0KSB7XG4gICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IHRzdC5kZWYgJiYgKDAgPT09IGxvY2F0b3IubGVuZ3RoID8gKGFsdGVybmF0aW9uID0gdHN0LmFsdGVybmF0aW9uLCBsb2NhdG9yID0gdHN0LmxvY2F0b3Iuc2xpY2UoKSkgOiB0c3QubG9jYXRvclthbHRlcm5hdGlvbl0gJiYgLTEgPT09IGxvY2F0b3JbYWx0ZXJuYXRpb25dLnRvU3RyaW5nKCkuaW5kZXhPZih0c3QubG9jYXRvclthbHRlcm5hdGlvbl0pICYmIChsb2NhdG9yW2FsdGVybmF0aW9uXSArPSBcIixcIiArIHRzdC5sb2NhdG9yW2FsdGVybmF0aW9uXSkpO1xuICAgICAgICAgICAgICAgIH0pKSwgbG9jYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgtMSA8IHBvcyAmJiAodm9pZCAwID09PSBpbnB1dG1hc2subWF4TGVuZ3RoIHx8IHBvcyA8IGlucHV0bWFzay5tYXhMZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gbmR4SW50bHpyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByZXZpb3VzUG9zID0gcG9zIC0gMSwgdGVzdDsgdm9pZCAwID09PSAodGVzdCA9IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcHJldmlvdXNQb3NdIHx8IG1hc2tzZXQudGVzdHNbcHJldmlvdXNQb3NdKSAmJiAtMSA8IHByZXZpb3VzUG9zOyApIHByZXZpb3VzUG9zLS07XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gdGVzdCAmJiAtMSA8IHByZXZpb3VzUG9zICYmIChuZHhJbml0aWFsaXplciA9IG1lcmdlTG9jYXRvcnMocHJldmlvdXNQb3MsIHRlc3QpLCBcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVEZXBlbmRlbmN5ID0gbmR4SW5pdGlhbGl6ZXIuam9pbihcIlwiKSwgdGVzdFBvcyA9IHByZXZpb3VzUG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hc2tzZXQudGVzdHNbcG9zXSAmJiBtYXNrc2V0LnRlc3RzW3Bvc11bMF0uY2QgPT09IGNhY2hlRGVwZW5kZW5jeSkgcmV0dXJuIG1hc2tzZXQudGVzdHNbcG9zXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBtdG5keCA9IG5keEluaXRpYWxpemVyLnNoaWZ0KCk7IG10bmR4IDwgbWFza1Rva2Vucy5sZW5ndGg7IG10bmR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gcmVzb2x2ZVRlc3RGcm9tVG9rZW4obWFza1Rva2Vuc1ttdG5keF0sIG5keEluaXRpYWxpemVyLCBbIG10bmR4IF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgdGVzdFBvcyA9PT0gcG9zIHx8IHBvcyA8IHRlc3RQb3MpIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwICE9PSBtYXRjaGVzLmxlbmd0aCAmJiAhaW5zZXJ0U3RvcCB8fCBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1hdGNoOiB7XG4gICAgICAgICAgICAgICAgICAgIGZuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzdGF0aWM6ICEwLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogITEsXG4gICAgICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZGVmOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbG9jYXRvcjogW10sXG4gICAgICAgICAgICAgICAgbWxvYzoge30sXG4gICAgICAgICAgICAgICAgY2Q6IGNhY2hlRGVwZW5kZW5jeVxuICAgICAgICAgICAgfSksIHZvaWQgMCAhPT0gbmR4SW50bHpyICYmIG1hc2tzZXQudGVzdHNbcG9zXSA/ICQuZXh0ZW5kKCEwLCBbXSwgbWF0Y2hlcykgOiAobWFza3NldC50ZXN0c1twb3NdID0gJC5leHRlbmQoITAsIFtdLCBtYXRjaGVzKSwgXG4gICAgICAgICAgICBtYXNrc2V0LnRlc3RzW3Bvc10pO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgIH0pLCBleHBvcnRzLmRldGVybWluZVRlc3RUZW1wbGF0ZSA9IGRldGVybWluZVRlc3RUZW1wbGF0ZSwgZXhwb3J0cy5nZXREZWNpc2lvblRha2VyID0gZ2V0RGVjaXNpb25UYWtlciwgXG4gICAgICAgIGV4cG9ydHMuZ2V0TWFza1RlbXBsYXRlID0gZ2V0TWFza1RlbXBsYXRlLCBleHBvcnRzLmdldFBsYWNlaG9sZGVyID0gZ2V0UGxhY2Vob2xkZXIsIFxuICAgICAgICBleHBvcnRzLmdldFRlc3QgPSBnZXRUZXN0LCBleHBvcnRzLmdldFRlc3RzID0gZ2V0VGVzdHMsIGV4cG9ydHMuZ2V0VGVzdFRlbXBsYXRlID0gZ2V0VGVzdFRlbXBsYXRlO1xuICAgIH0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgfSksIGV4cG9ydHMuYWx0ZXJuYXRlID0gYWx0ZXJuYXRlLCBleHBvcnRzLmNoZWNrQWx0ZXJuYXRpb25NYXRjaCA9IGNoZWNrQWx0ZXJuYXRpb25NYXRjaCwgXG4gICAgICAgIGV4cG9ydHMuaXNDb21wbGV0ZSA9IGlzQ29tcGxldGUsIGV4cG9ydHMuaXNWYWxpZCA9IGlzVmFsaWQsIGV4cG9ydHMucmVmcmVzaEZyb21CdWZmZXIgPSByZWZyZXNoRnJvbUJ1ZmZlciwgXG4gICAgICAgIGV4cG9ydHMucmV2YWxpZGF0ZU1hc2sgPSByZXZhbGlkYXRlTWFzaywgZXhwb3J0cy5oYW5kbGVSZW1vdmUgPSBoYW5kbGVSZW1vdmU7XG4gICAgICAgIHZhciBfdmFsaWRhdGlvblRlc3RzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKSwgX2tleWNvZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMCkpLCBfcG9zaXRpb25pbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLCBfZXZlbnRoYW5kbGVycyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhbHRlcm5hdGUobWFza1BvcywgYywgc3RyaWN0LCBmcm9tSXNWYWxpZCwgckFsdFBvcywgc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgJCA9IHRoaXMuZGVwZW5kZW5jeUxpYiwgb3B0cyA9IHRoaXMub3B0cywgbWFza3NldCA9IHRoaXMubWFza3NldCwgdmFsaWRQc0Nsb25lID0gJC5leHRlbmQoITAsIHt9LCBtYXNrc2V0LnZhbGlkUG9zaXRpb25zKSwgdHN0Q2xvbmUgPSAkLmV4dGVuZCghMCwge30sIG1hc2tzZXQudGVzdHMpLCBsYXN0QWx0LCBhbHRlcm5hdGlvbiwgaXNWYWxpZFJzbHQgPSAhMSwgcmV0dXJuUnNsdCA9ICExLCBhbHRQb3MsIHByZXZBbHRQb3MsIGksIHZhbGlkUG9zLCBkZWNpc2lvblBvcywgbEFsdFBvcyA9IHZvaWQgMCAhPT0gckFsdFBvcyA/IHJBbHRQb3MgOiBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh0aGlzKSwgbmV4dFBvcywgaW5wdXQsIGJlZ2luLCBlbmQ7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uICYmIChiZWdpbiA9IHNlbGVjdGlvbi5iZWdpbiwgZW5kID0gc2VsZWN0aW9uLmVuZCwgc2VsZWN0aW9uLmJlZ2luID4gc2VsZWN0aW9uLmVuZCAmJiAoYmVnaW4gPSBzZWxlY3Rpb24uZW5kLCBcbiAgICAgICAgICAgIGVuZCA9IHNlbGVjdGlvbi5iZWdpbikpLCAtMSA9PT0gbEFsdFBvcyAmJiB2b2lkIDAgPT09IHJBbHRQb3MpIGxhc3RBbHQgPSAwLCBwcmV2QWx0UG9zID0gX3ZhbGlkYXRpb25UZXN0cy5nZXRUZXN0LmNhbGwodGhpcywgbGFzdEFsdCksIFxuICAgICAgICAgICAgYWx0ZXJuYXRpb24gPSBwcmV2QWx0UG9zLmFsdGVybmF0aW9uOyBlbHNlIGZvciAoOzAgPD0gbEFsdFBvczsgbEFsdFBvcy0tKSBpZiAoYWx0UG9zID0gbWFza3NldC52YWxpZFBvc2l0aW9uc1tsQWx0UG9zXSwgXG4gICAgICAgICAgICBhbHRQb3MgJiYgdm9pZCAwICE9PSBhbHRQb3MuYWx0ZXJuYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldkFsdFBvcyAmJiBwcmV2QWx0UG9zLmxvY2F0b3JbYWx0UG9zLmFsdGVybmF0aW9uXSAhPT0gYWx0UG9zLmxvY2F0b3JbYWx0UG9zLmFsdGVybmF0aW9uXSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgbGFzdEFsdCA9IGxBbHRQb3MsIGFsdGVybmF0aW9uID0gbWFza3NldC52YWxpZFBvc2l0aW9uc1tsYXN0QWx0XS5hbHRlcm5hdGlvbiwgcHJldkFsdFBvcyA9IGFsdFBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGFsdGVybmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGVjaXNpb25Qb3MgPSBwYXJzZUludChsYXN0QWx0KSwgbWFza3NldC5leGNsdWRlc1tkZWNpc2lvblBvc10gPSBtYXNrc2V0LmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXSB8fCBbXSwgXG4gICAgICAgICAgICAgICAgITAgIT09IG1hc2tQb3MgJiYgbWFza3NldC5leGNsdWRlc1tkZWNpc2lvblBvc10ucHVzaCgoMCwgX3ZhbGlkYXRpb25UZXN0cy5nZXREZWNpc2lvblRha2VyKShwcmV2QWx0UG9zKSArIFwiOlwiICsgcHJldkFsdFBvcy5hbHRlcm5hdGlvbik7XG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkSW5wdXRzID0gW10sIHJlc3VsdFBvcyA9IC0xO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IGRlY2lzaW9uUG9zOyBpIDwgX3Bvc2l0aW9uaW5nLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwodGhpcywgdm9pZCAwLCAhMCkgKyAxOyBpKyspIC0xID09PSByZXN1bHRQb3MgJiYgbWFza1BvcyA8PSBpICYmIHZvaWQgMCAhPT0gYyAmJiAodmFsaWRJbnB1dHMucHVzaChjKSwgXG4gICAgICAgICAgICAgICAgcmVzdWx0UG9zID0gdmFsaWRJbnB1dHMubGVuZ3RoIC0gMSksIHZhbGlkUG9zID0gbWFza3NldC52YWxpZFBvc2l0aW9uc1tpXSwgdmFsaWRQb3MgJiYgITAgIT09IHZhbGlkUG9zLmdlbmVyYXRlZElucHV0ICYmICh2b2lkIDAgPT09IHNlbGVjdGlvbiB8fCBpIDwgYmVnaW4gfHwgZW5kIDw9IGkpICYmIHZhbGlkSW5wdXRzLnB1c2godmFsaWRQb3MuaW5wdXQpLCBcbiAgICAgICAgICAgICAgICBkZWxldGUgbWFza3NldC52YWxpZFBvc2l0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICBmb3IgKC0xID09PSByZXN1bHRQb3MgJiYgdm9pZCAwICE9PSBjICYmICh2YWxpZElucHV0cy5wdXNoKGMpLCByZXN1bHRQb3MgPSB2YWxpZElucHV0cy5sZW5ndGggLSAxKTsgdm9pZCAwICE9PSBtYXNrc2V0LmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXSAmJiBtYXNrc2V0LmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXS5sZW5ndGggPCAxMDsgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobWFza3NldC50ZXN0cyA9IHt9LCBfcG9zaXRpb25pbmcucmVzZXRNYXNrU2V0LmNhbGwodGhpcywgITApLCBpc1ZhbGlkUnNsdCA9ICEwLCBcbiAgICAgICAgICAgICAgICAgICAgaSA9IDA7IGkgPCB2YWxpZElucHV0cy5sZW5ndGggJiYgKG5leHRQb3MgPSBpc1ZhbGlkUnNsdC5jYXJldCB8fCBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh0aGlzLCB2b2lkIDAsICEwKSArIDEsIFxuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IHZhbGlkSW5wdXRzW2ldLCBpc1ZhbGlkUnNsdCA9IGlzVmFsaWQuY2FsbCh0aGlzLCBuZXh0UG9zLCBpbnB1dCwgITEsIGZyb21Jc1ZhbGlkLCAhMCkpOyBpKyspIGkgPT09IHJlc3VsdFBvcyAmJiAocmV0dXJuUnNsdCA9IGlzVmFsaWRSc2x0KSwgXG4gICAgICAgICAgICAgICAgICAgIDEgPT0gbWFza1BvcyAmJiBpc1ZhbGlkUnNsdCAmJiAocmV0dXJuUnNsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zOiBpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFJzbHQpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3Bvc2l0aW9uaW5nLnJlc2V0TWFza1NldC5jYWxsKHRoaXMpLCBwcmV2QWx0UG9zID0gX3ZhbGlkYXRpb25UZXN0cy5nZXRUZXN0LmNhbGwodGhpcywgZGVjaXNpb25Qb3MpLCBcbiAgICAgICAgICAgICAgICAgICAgbWFza3NldC52YWxpZFBvc2l0aW9ucyA9ICQuZXh0ZW5kKCEwLCB7fSwgdmFsaWRQc0Nsb25lKSwgbWFza3NldC50ZXN0cyA9ICQuZXh0ZW5kKCEwLCB7fSwgdHN0Q2xvbmUpLCBcbiAgICAgICAgICAgICAgICAgICAgIW1hc2tzZXQuZXhjbHVkZXNbZGVjaXNpb25Qb3NdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Sc2x0ID0gYWx0ZXJuYXRlLmNhbGwodGhpcywgbWFza1BvcywgYywgc3RyaWN0LCBmcm9tSXNWYWxpZCwgZGVjaXNpb25Qb3MgLSAxLCBzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY2lzaW9uVGFrZXIgPSAoMCwgX3ZhbGlkYXRpb25UZXN0cy5nZXREZWNpc2lvblRha2VyKShwcmV2QWx0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC0xICE9PSBtYXNrc2V0LmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXS5pbmRleE9mKGRlY2lzaW9uVGFrZXIgKyBcIjpcIiArIHByZXZBbHRQb3MuYWx0ZXJuYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Sc2x0ID0gYWx0ZXJuYXRlLmNhbGwodGhpcywgbWFza1BvcywgYywgc3RyaWN0LCBmcm9tSXNWYWxpZCwgZGVjaXNpb25Qb3MgLSAxLCBzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChtYXNrc2V0LmV4Y2x1ZGVzW2RlY2lzaW9uUG9zXS5wdXNoKGRlY2lzaW9uVGFrZXIgKyBcIjpcIiArIHByZXZBbHRQb3MuYWx0ZXJuYXRpb24pLCBcbiAgICAgICAgICAgICAgICAgICAgaSA9IGRlY2lzaW9uUG9zOyBpIDwgX3Bvc2l0aW9uaW5nLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwodGhpcywgdm9pZCAwLCAhMCkgKyAxOyBpKyspIGRlbGV0ZSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Sc2x0ICYmICExID09PSBvcHRzLmtlZXBTdGF0aWMgfHwgZGVsZXRlIG1hc2tzZXQuZXhjbHVkZXNbZGVjaXNpb25Qb3NdLCBcbiAgICAgICAgICAgIHJldHVyblJzbHQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FzaW5nKGVsZW0sIHRlc3QsIHBvcykge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLm9wdHMsIG1hc2tzZXQgPSB0aGlzLm1hc2tzZXQ7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdHMuY2FzaW5nIHx8IHRlc3QuY2FzaW5nKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJ1cHBlclwiOlxuICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSBcImxvd2VyXCI6XG4gICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIFwidGl0bGVcIjpcbiAgICAgICAgICAgICAgICB2YXIgcG9zQmVmb3JlID0gbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3MgLSAxXTtcbiAgICAgICAgICAgICAgICBlbGVtID0gMCA9PT0gcG9zIHx8IHBvc0JlZm9yZSAmJiBwb3NCZWZvcmUuaW5wdXQgPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoX2tleWNvZGUuZGVmYXVsdC5TUEFDRSkgPyBlbGVtLnRvVXBwZXJDYXNlKCkgOiBlbGVtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBvcHRzLmNhc2luZykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChtYXNrc2V0LnZhbGlkUG9zaXRpb25zKSwgZWxlbSA9IG9wdHMuY2FzaW5nLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWx0ZXJuYXRpb25NYXRjaChhbHRBcnIxLCBhbHRBcnIyLCBuYSkge1xuICAgICAgICAgICAgZm9yICh2YXIgb3B0cyA9IHRoaXMub3B0cywgYWx0QXJyQyA9IG9wdHMuZ3JlZWR5ID8gYWx0QXJyMiA6IGFsdEFycjIuc2xpY2UoMCwgMSksIGlzTWF0Y2ggPSAhMSwgbmFBcnIgPSB2b2lkIDAgIT09IG5hID8gbmEuc3BsaXQoXCIsXCIpIDogW10sIG5hTmR4LCBpID0gMDsgaSA8IG5hQXJyLmxlbmd0aDsgaSsrKSAtMSAhPT0gKG5hTmR4ID0gYWx0QXJyMS5pbmRleE9mKG5hQXJyW2ldKSkgJiYgYWx0QXJyMS5zcGxpY2UobmFOZHgsIDEpO1xuICAgICAgICAgICAgZm9yICh2YXIgYWxuZHggPSAwOyBhbG5keCA8IGFsdEFycjEubGVuZ3RoOyBhbG5keCsrKSBpZiAoYWx0QXJyQy5pbmNsdWRlcyhhbHRBcnIxW2FsbmR4XSkpIHtcbiAgICAgICAgICAgICAgICBpc01hdGNoID0gITA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNNYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcywgc3RyaWN0LCBmcm9tSXNWYWxpZCkge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMsIG1hc2tzZXQgPSB0aGlzLm1hc2tzZXQsIG9wdHMgPSB0aGlzLm9wdHM7XG4gICAgICAgICAgICBpZiAoKG9wdHMubnVtZXJpY0lucHV0IHx8IHRoaXMuaXNSVEwpICYmIChrID09PSBfa2V5Y29kZS5kZWZhdWx0LkJBQ0tTUEFDRSA/IGsgPSBfa2V5Y29kZS5kZWZhdWx0LkRFTEVURSA6IGsgPT09IF9rZXljb2RlLmRlZmF1bHQuREVMRVRFICYmIChrID0gX2tleWNvZGUuZGVmYXVsdC5CQUNLU1BBQ0UpLCBcbiAgICAgICAgICAgIHRoaXMuaXNSVEwpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBlbmQgPSBwb3MuZW5kO1xuICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW4sIHBvcy5iZWdpbiA9IHBlbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbHZwID0gX3Bvc2l0aW9uaW5nLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwodGhpcywgdm9pZCAwLCAhMCksIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChwb3MuZW5kID49IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbCh0aGlzKS5sZW5ndGggJiYgbHZwID49IHBvcy5lbmQgJiYgKHBvcy5lbmQgPSBsdnAgKyAxKSwgXG4gICAgICAgICAgICBrID09PSBfa2V5Y29kZS5kZWZhdWx0LkJBQ0tTUEFDRSA/IHBvcy5lbmQgLSBwb3MuYmVnaW4gPCAxICYmIChwb3MuYmVnaW4gPSBfcG9zaXRpb25pbmcuc2Vla1ByZXZpb3VzLmNhbGwodGhpcywgcG9zLmJlZ2luKSkgOiBrID09PSBfa2V5Y29kZS5kZWZhdWx0LkRFTEVURSAmJiBwb3MuYmVnaW4gPT09IHBvcy5lbmQgJiYgKHBvcy5lbmQgPSBfcG9zaXRpb25pbmcuaXNNYXNrLmNhbGwodGhpcywgcG9zLmVuZCwgITAsICEwKSA/IHBvcy5lbmQgKyAxIDogX3Bvc2l0aW9uaW5nLnNlZWtOZXh0LmNhbGwodGhpcywgcG9zLmVuZCkgKyAxKSwgXG4gICAgICAgICAgICAhMSAhPT0gKG9mZnNldCA9IHJldmFsaWRhdGVNYXNrLmNhbGwodGhpcywgcG9zKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoITAgIT09IHN0cmljdCAmJiAhMSAhPT0gb3B0cy5rZWVwU3RhdGljIHx8IG51bGwgIT09IG9wdHMucmVnZXggJiYgLTEgIT09IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdC5jYWxsKHRoaXMsIHBvcy5iZWdpbikubWF0Y2guZGVmLmluZGV4T2YoXCJ8XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBhbHRlcm5hdGUuY2FsbCh0aGlzLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb3MgPSB2b2lkIDAgIT09IHJlc3VsdC5jYXJldCA/IHJlc3VsdC5jYXJldCA6IHJlc3VsdC5wb3MgPyBfcG9zaXRpb25pbmcuc2Vla05leHQuY2FsbCh0aGlzLCByZXN1bHQucG9zLmJlZ2luID8gcmVzdWx0LnBvcy5iZWdpbiA6IHJlc3VsdC5wb3MpIDogX3Bvc2l0aW9uaW5nLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwodGhpcywgLTEsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIChrICE9PSBfa2V5Y29kZS5kZWZhdWx0LkRFTEVURSB8fCBwb3MuYmVnaW4gPiBuZXdQb3MpICYmIHBvcy5iZWdpbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAhMCAhPT0gc3RyaWN0ICYmIChtYXNrc2V0LnAgPSBrID09PSBfa2V5Y29kZS5kZWZhdWx0LkRFTEVURSA/IHBvcy5iZWdpbiArIG9mZnNldCA6IHBvcy5iZWdpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNDb21wbGV0ZShidWZmZXIpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLCBvcHRzID0gdGhpcy5vcHRzLCBtYXNrc2V0ID0gdGhpcy5tYXNrc2V0O1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygb3B0cy5pc0NvbXBsZXRlKSByZXR1cm4gb3B0cy5pc0NvbXBsZXRlKGJ1ZmZlciwgb3B0cyk7XG4gICAgICAgICAgICBpZiAoXCIqXCIgIT09IG9wdHMucmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRlID0gITEsIGxycCA9IF9wb3NpdGlvbmluZy5kZXRlcm1pbmVMYXN0UmVxdWlyZWRQb3NpdGlvbi5jYWxsKHRoaXMsICEwKSwgYW1sID0gX3Bvc2l0aW9uaW5nLnNlZWtQcmV2aW91cy5jYWxsKHRoaXMsIGxycC5sKTtcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBscnAuZGVmIHx8IGxycC5kZWYubmV3QmxvY2tNYXJrZXIgfHwgbHJwLmRlZi5vcHRpb25hbGl0eSB8fCBscnAuZGVmLm9wdGlvbmFsUXVhbnRpZmllcikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSA9ICEwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBhbWw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3RUZW1wbGF0ZS5jYWxsKHRoaXMsIGkpLm1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwICE9PSB0ZXN0LnN0YXRpYyAmJiB2b2lkIDAgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbaV0gJiYgITAgIT09IHRlc3Qub3B0aW9uYWxpdHkgJiYgITAgIT09IHRlc3Qub3B0aW9uYWxRdWFudGlmaWVyIHx8ICEwID09PSB0ZXN0LnN0YXRpYyAmJiBidWZmZXJbaV0gIT09IF92YWxpZGF0aW9uVGVzdHMuZ2V0UGxhY2Vob2xkZXIuY2FsbCh0aGlzLCBpLCB0ZXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWQocG9zLCBjLCBzdHJpY3QsIGZyb21Jc1ZhbGlkLCBmcm9tQWx0ZXJuYXRlLCB2YWxpZGF0ZU9ubHksIGZyb21DaGVja3ZhbCkge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMsICQgPSB0aGlzLmRlcGVuZGVuY3lMaWIsIG9wdHMgPSB0aGlzLm9wdHMsIGVsID0gaW5wdXRtYXNrLmVsLCBtYXNrc2V0ID0gaW5wdXRtYXNrLm1hc2tzZXQ7XG4gICAgICAgICAgICBmdW5jdGlvbiBpc1NlbGVjdGlvbihwb3NPYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXRtYXNrLmlzUlRMID8gMSA8IHBvc09iai5iZWdpbiAtIHBvc09iai5lbmQgfHwgcG9zT2JqLmJlZ2luIC0gcG9zT2JqLmVuZCA9PSAxIDogMSA8IHBvc09iai5lbmQgLSBwb3NPYmouYmVnaW4gfHwgcG9zT2JqLmVuZCAtIHBvc09iai5iZWdpbiA9PSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyaWN0ID0gITAgPT09IHN0cmljdDtcbiAgICAgICAgICAgIHZhciBtYXNrUG9zID0gcG9zO1xuICAgICAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc0NvbW1hbmRPYmplY3QoY29tbWFuZE9iaikge1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGNvbW1hbmRPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gY29tbWFuZE9iai5yZW1vdmUgJiYgKEFycmF5LmlzQXJyYXkoY29tbWFuZE9iai5yZW1vdmUpIHx8IChjb21tYW5kT2JqLnJlbW92ZSA9IFsgY29tbWFuZE9iai5yZW1vdmUgXSksIFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kT2JqLnJlbW92ZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiLnBvcyAtIGEucG9zO1xuICAgICAgICAgICAgICAgICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uKGxtbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGVNYXNrLmNhbGwoaW5wdXRtYXNrLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGxtbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBsbW50ICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLCBjb21tYW5kT2JqLnJlbW92ZSA9IHZvaWQgMCksIHZvaWQgMCAhPT0gY29tbWFuZE9iai5pbnNlcnQgJiYgKEFycmF5LmlzQXJyYXkoY29tbWFuZE9iai5pbnNlcnQpIHx8IChjb21tYW5kT2JqLmluc2VydCA9IFsgY29tbWFuZE9iai5pbnNlcnQgXSksIFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kT2JqLmluc2VydC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnBvcyAtIGIucG9zO1xuICAgICAgICAgICAgICAgICAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uKGxtbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IGxtbnQuYyAmJiBpc1ZhbGlkLmNhbGwoaW5wdXRtYXNrLCBsbW50LnBvcywgbG1udC5jLCB2b2lkIDAgPT09IGxtbnQuc3RyaWN0IHx8IGxtbnQuc3RyaWN0LCB2b2lkIDAgIT09IGxtbnQuZnJvbUlzVmFsaWQgPyBsbW50LmZyb21Jc1ZhbGlkIDogZnJvbUlzVmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICB9KSwgY29tbWFuZE9iai5pbnNlcnQgPSB2b2lkIDApLCBjb21tYW5kT2JqLnJlZnJlc2hGcm9tQnVmZmVyICYmIGNvbW1hbmRPYmouYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmcmVzaCA9IGNvbW1hbmRPYmoucmVmcmVzaEZyb21CdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlci5jYWxsKGlucHV0bWFzaywgITAgPT09IHJlZnJlc2ggPyByZWZyZXNoIDogcmVmcmVzaC5zdGFydCwgcmVmcmVzaC5lbmQsIGNvbW1hbmRPYmouYnVmZmVyKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kT2JqLnJlZnJlc2hGcm9tQnVmZmVyID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gY29tbWFuZE9iai5yZXdyaXRlUG9zaXRpb24gJiYgKG1hc2tQb3MgPSBjb21tYW5kT2JqLnJld3JpdGVQb3NpdGlvbiwgXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRPYmogPSAhMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kT2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gX2lzVmFsaWQocG9zaXRpb24sIGMsIHN0cmljdCkge1xuICAgICAgICAgICAgICAgIHZhciByc2x0ID0gITE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdHMuY2FsbChpbnB1dG1hc2ssIHBvc2l0aW9uKS5ldmVyeShmdW5jdGlvbih0c3QsIG5keCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IHRzdC5tYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2ssICEwKSwgcnNsdCA9IG51bGwgIT0gdGVzdC5mbiA/IHRlc3QuZm4udGVzdChjLCBtYXNrc2V0LCBwb3NpdGlvbiwgc3RyaWN0LCBvcHRzLCBpc1NlbGVjdGlvbihwb3MpKSA6IChjID09PSB0ZXN0LmRlZiB8fCBjID09PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpICYmIFwiXCIgIT09IHRlc3QuZGVmICYmIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IF92YWxpZGF0aW9uVGVzdHMuZ2V0UGxhY2Vob2xkZXIuY2FsbChpbnB1dG1hc2ssIHBvc2l0aW9uLCB0ZXN0LCAhMCkgfHwgdGVzdC5kZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIH0sICExID09PSByc2x0KSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtID0gdm9pZCAwICE9PSByc2x0LmMgPyByc2x0LmMgOiBjLCB2YWxpZGF0ZWRQb3MgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPSBlbGVtID09PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgJiYgITAgPT09IHRlc3Quc3RhdGljID8gX3ZhbGlkYXRpb25UZXN0cy5nZXRQbGFjZWhvbGRlci5jYWxsKGlucHV0bWFzaywgcG9zaXRpb24sIHRlc3QsICEwKSB8fCB0ZXN0LmRlZiA6IGVsZW0sIFxuICAgICAgICAgICAgICAgICAgICByc2x0ID0gcHJvY2Vzc0NvbW1hbmRPYmplY3QocnNsdCksICEwICE9PSByc2x0ICYmIHZvaWQgMCAhPT0gcnNsdC5wb3MgJiYgcnNsdC5wb3MgIT09IHBvc2l0aW9uICYmICh2YWxpZGF0ZWRQb3MgPSByc2x0LnBvcyksIFxuICAgICAgICAgICAgICAgICAgICAhMCAhPT0gcnNsdCAmJiB2b2lkIDAgPT09IHJzbHQucG9zICYmIHZvaWQgMCA9PT0gcnNsdC5jIHx8ICExID09PSByZXZhbGlkYXRlTWFzay5jYWxsKGlucHV0bWFzaywgcG9zLCAkLmV4dGVuZCh7fSwgdHN0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogY2FzaW5nLmNhbGwoaW5wdXRtYXNrLCBlbGVtLCB0ZXN0LCB2YWxpZGF0ZWRQb3MpXG4gICAgICAgICAgICAgICAgICAgIH0pLCBmcm9tSXNWYWxpZCwgdmFsaWRhdGVkUG9zKSAmJiAocnNsdCA9ICExKSwgITE7XG4gICAgICAgICAgICAgICAgfSksIHJzbHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2b2lkIDAgIT09IHBvcy5iZWdpbiAmJiAobWFza1BvcyA9IGlucHV0bWFzay5pc1JUTCA/IHBvcy5lbmQgOiBwb3MuYmVnaW4pO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICEwLCBwb3NpdGlvbnNDbG9uZSA9ICQuZXh0ZW5kKCEwLCB7fSwgbWFza3NldC52YWxpZFBvc2l0aW9ucyk7XG4gICAgICAgICAgICBpZiAoITEgPT09IG9wdHMua2VlcFN0YXRpYyAmJiB2b2lkIDAgIT09IG1hc2tzZXQuZXhjbHVkZXNbbWFza1Bvc10gJiYgITAgIT09IGZyb21BbHRlcm5hdGUgJiYgITAgIT09IGZyb21Jc1ZhbGlkKSBmb3IgKHZhciBpID0gbWFza1BvczsgaSA8IChpbnB1dG1hc2suaXNSVEwgPyBwb3MuYmVnaW4gOiBwb3MuZW5kKTsgaSsrKSB2b2lkIDAgIT09IG1hc2tzZXQuZXhjbHVkZXNbaV0gJiYgKG1hc2tzZXQuZXhjbHVkZXNbaV0gPSB2b2lkIDAsIFxuICAgICAgICAgICAgZGVsZXRlIG1hc2tzZXQudGVzdHNbaV0pO1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygb3B0cy5wcmVWYWxpZGF0aW9uICYmICEwICE9PSBmcm9tSXNWYWxpZCAmJiAhMCAhPT0gdmFsaWRhdGVPbmx5ICYmIChyZXN1bHQgPSBvcHRzLnByZVZhbGlkYXRpb24uY2FsbChlbCwgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzayksIG1hc2tQb3MsIGMsIGlzU2VsZWN0aW9uKHBvcyksIG9wdHMsIG1hc2tzZXQsIHBvcywgc3RyaWN0IHx8IGZyb21BbHRlcm5hdGUpLCBcbiAgICAgICAgICAgIHJlc3VsdCA9IHByb2Nlc3NDb21tYW5kT2JqZWN0KHJlc3VsdCkpLCAhMCA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gaW5wdXRtYXNrLm1heExlbmd0aCB8fCBtYXNrUG9zIDwgaW5wdXRtYXNrLm1heExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID0gX2lzVmFsaWQobWFza1BvcywgYywgc3RyaWN0KSwgKCFzdHJpY3QgfHwgITAgPT09IGZyb21Jc1ZhbGlkKSAmJiAhMSA9PT0gcmVzdWx0ICYmICEwICE9PSB2YWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UG9zVmFsaWQgPSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW21hc2tQb3NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50UG9zVmFsaWQgfHwgITAgIT09IGN1cnJlbnRQb3NWYWxpZC5tYXRjaC5zdGF0aWMgfHwgY3VycmVudFBvc1ZhbGlkLm1hdGNoLmRlZiAhPT0gYyAmJiBjICE9PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pbnNlcnRNb2RlIHx8IHZvaWQgMCA9PT0gbWFza3NldC52YWxpZFBvc2l0aW9uc1tfcG9zaXRpb25pbmcuc2Vla05leHQuY2FsbChpbnB1dG1hc2ssIG1hc2tQb3MpXSB8fCBwb3MuZW5kID4gbWFza1Bvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2tpcCA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza3NldC5qaXRPZmZzZXRbbWFza1Bvc10gJiYgdm9pZCAwID09PSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW19wb3NpdGlvbmluZy5zZWVrTmV4dC5jYWxsKGlucHV0bWFzaywgbWFza1BvcyldICYmIChyZXN1bHQgPSBpc1ZhbGlkLmNhbGwoaW5wdXRtYXNrLCBtYXNrUG9zICsgbWFza3NldC5qaXRPZmZzZXRbbWFza1Bvc10sIGMsICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICExICE9PSByZXN1bHQgJiYgKCEwICE9PSBmcm9tQWx0ZXJuYXRlICYmIChyZXN1bHQuY2FyZXQgPSBtYXNrUG9zKSwgc2tpcCA9ICEwKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID4gbWFza1BvcyAmJiAobWFza3NldC52YWxpZFBvc2l0aW9uc1ttYXNrUG9zXSA9IHZvaWQgMCksICFza2lwICYmICFfcG9zaXRpb25pbmcuaXNNYXNrLmNhbGwoaW5wdXRtYXNrLCBtYXNrUG9zLCBvcHRzLmtlZXBTdGF0aWMgJiYgMCA9PT0gbWFza1BvcykpIGZvciAodmFyIG5Qb3MgPSBtYXNrUG9zICsgMSwgc25Qb3MgPSBfcG9zaXRpb25pbmcuc2Vla05leHQuY2FsbChpbnB1dG1hc2ssIG1hc2tQb3MsICExLCAwICE9PSBtYXNrUG9zKTsgblBvcyA8PSBzblBvczsgblBvcysrKSBpZiAocmVzdWx0ID0gX2lzVmFsaWQoblBvcywgYywgc3RyaWN0KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICExICE9PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyYWNrYmFja1Bvc2l0aW9ucy5jYWxsKGlucHV0bWFzaywgbWFza1Bvcywgdm9pZCAwICE9PSByZXN1bHQucG9zID8gcmVzdWx0LnBvcyA6IG5Qb3MpIHx8IHJlc3VsdCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrUG9zID0gblBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogX3Bvc2l0aW9uaW5nLnNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCBtYXNrUG9zKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSAhMTtcbiAgICAgICAgICAgICAgICAhMSAhPT0gcmVzdWx0IHx8ICFvcHRzLmtlZXBTdGF0aWMgfHwgIWlzQ29tcGxldGUuY2FsbChpbnB1dG1hc2ssIF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spKSAmJiAwICE9PSBtYXNrUG9zIHx8IHN0cmljdCB8fCAhMCA9PT0gZnJvbUFsdGVybmF0ZSA/IGlzU2VsZWN0aW9uKHBvcykgJiYgbWFza3NldC50ZXN0c1ttYXNrUG9zXSAmJiAxIDwgbWFza3NldC50ZXN0c1ttYXNrUG9zXS5sZW5ndGggJiYgb3B0cy5rZWVwU3RhdGljICYmICFzdHJpY3QgJiYgITAgIT09IGZyb21BbHRlcm5hdGUgJiYgKHJlc3VsdCA9IGFsdGVybmF0ZS5jYWxsKGlucHV0bWFzaywgITApKSA6IHJlc3VsdCA9IGFsdGVybmF0ZS5jYWxsKGlucHV0bWFzaywgbWFza1BvcywgYywgc3RyaWN0LCBmcm9tSXNWYWxpZCwgdm9pZCAwLCBwb3MpLCBcbiAgICAgICAgICAgICAgICAhMCA9PT0gcmVzdWx0ICYmIChyZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBvczogbWFza1Bvc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygb3B0cy5wb3N0VmFsaWRhdGlvbiAmJiAhMCAhPT0gZnJvbUlzVmFsaWQgJiYgITAgIT09IHZhbGlkYXRlT25seSkge1xuICAgICAgICAgICAgICAgIHZhciBwb3N0UmVzdWx0ID0gb3B0cy5wb3N0VmFsaWRhdGlvbi5jYWxsKGVsLCBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrLCAhMCksIHZvaWQgMCAhPT0gcG9zLmJlZ2luID8gaW5wdXRtYXNrLmlzUlRMID8gcG9zLmVuZCA6IHBvcy5iZWdpbiA6IHBvcywgYywgcmVzdWx0LCBvcHRzLCBtYXNrc2V0LCBzdHJpY3QsIGZyb21DaGVja3ZhbCk7XG4gICAgICAgICAgICAgICAgdm9pZCAwICE9PSBwb3N0UmVzdWx0ICYmIChyZXN1bHQgPSAhMCA9PT0gcG9zdFJlc3VsdCA/IHJlc3VsdCA6IHBvc3RSZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ICYmIHZvaWQgMCA9PT0gcmVzdWx0LnBvcyAmJiAocmVzdWx0LnBvcyA9IG1hc2tQb3MpLCAhMSA9PT0gcmVzdWx0IHx8ICEwID09PSB2YWxpZGF0ZU9ubHkgPyAoX3Bvc2l0aW9uaW5nLnJlc2V0TWFza1NldC5jYWxsKGlucHV0bWFzaywgITApLCBcbiAgICAgICAgICAgIG1hc2tzZXQudmFsaWRQb3NpdGlvbnMgPSAkLmV4dGVuZCghMCwge30sIHBvc2l0aW9uc0Nsb25lKSkgOiB0cmFja2JhY2tQb3NpdGlvbnMuY2FsbChpbnB1dG1hc2ssIHZvaWQgMCwgbWFza1BvcywgITApO1xuICAgICAgICAgICAgdmFyIGVuZFJlc3VsdCA9IHByb2Nlc3NDb21tYW5kT2JqZWN0KHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gZW5kUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBvc2l0aW9uQ2FuTWF0Y2hEZWZpbml0aW9uKHBvcywgdGVzdERlZmluaXRpb24sIG9wdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGlucHV0bWFzayA9IHRoaXMsIG1hc2tzZXQgPSB0aGlzLm1hc2tzZXQsIHZhbGlkID0gITEsIHRlc3RzID0gX3ZhbGlkYXRpb25UZXN0cy5nZXRUZXN0cy5jYWxsKHRoaXMsIHBvcyksIHRuZHggPSAwOyB0bmR4IDwgdGVzdHMubGVuZ3RoOyB0bmR4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGVzdHNbdG5keF0ubWF0Y2ggJiYgKCEodGVzdHNbdG5keF0ubWF0Y2gubmF0aXZlRGVmICE9PSB0ZXN0RGVmaW5pdGlvbi5tYXRjaFtvcHRzLnNoaWZ0UG9zaXRpb25zID8gXCJkZWZcIiA6IFwibmF0aXZlRGVmXCJdIHx8IG9wdHMuc2hpZnRQb3NpdGlvbnMgJiYgdGVzdERlZmluaXRpb24ubWF0Y2guc3RhdGljKSB8fCB0ZXN0c1t0bmR4XS5tYXRjaC5uYXRpdmVEZWYgPT09IHRlc3REZWZpbml0aW9uLm1hdGNoLm5hdGl2ZURlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZXN0c1t0bmR4XS5tYXRjaCAmJiB0ZXN0c1t0bmR4XS5tYXRjaC5kZWYgPT09IHRlc3REZWZpbml0aW9uLm1hdGNoLm5hdGl2ZURlZikge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICExID09PSB2YWxpZCAmJiB2b2lkIDAgIT09IG1hc2tzZXQuaml0T2Zmc2V0W3Bvc10gJiYgKHZhbGlkID0gcG9zaXRpb25DYW5NYXRjaERlZmluaXRpb24uY2FsbCh0aGlzLCBwb3MgKyBtYXNrc2V0LmppdE9mZnNldFtwb3NdLCB0ZXN0RGVmaW5pdGlvbiwgb3B0cykpLCBcbiAgICAgICAgICAgIHZhbGlkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hGcm9tQnVmZmVyKHN0YXJ0LCBlbmQsIGJ1ZmZlcikge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMsIG1hc2tzZXQgPSB0aGlzLm1hc2tzZXQsIG9wdHMgPSB0aGlzLm9wdHMsICQgPSB0aGlzLmRlcGVuZGVuY3lMaWIsIGVsID0gdGhpcy5lbCwgaSwgcCwgc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciA9IG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciwgYmZmciA9IHRoaXMuaXNSVEwgPyBidWZmZXIuc2xpY2UoKS5yZXZlcnNlKCkgOiBidWZmZXI7XG4gICAgICAgICAgICBpZiAob3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyID0gXCJcIiwgITAgPT09IHN0YXJ0KSBfcG9zaXRpb25pbmcucmVzZXRNYXNrU2V0LmNhbGwodGhpcyksIFxuICAgICAgICAgICAgbWFza3NldC50ZXN0cyA9IHt9LCBzdGFydCA9IDAsIGVuZCA9IGJ1ZmZlci5sZW5ndGgsIHAgPSBfcG9zaXRpb25pbmcuZGV0ZXJtaW5lTmV3Q2FyZXRQb3NpdGlvbi5jYWxsKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBiZWdpbjogMCxcbiAgICAgICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgICAgIH0sICExKS5iZWdpbjsgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykgZGVsZXRlIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgcCA9IHN0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGtleXByZXNzID0gbmV3ICQuRXZlbnQoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgICBrZXlwcmVzcy53aGljaCA9IGJmZnJbaV0udG9TdHJpbmcoKS5jaGFyQ29kZUF0KDApLCB0aGlzLmlnbm9yYWJsZSA9ICExO1xuICAgICAgICAgICAgICAgIHZhciB2YWxSZXN1bHQgPSBfZXZlbnRoYW5kbGVycy5FdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQuY2FsbChlbCwga2V5cHJlc3MsICEwLCAhMSwgITEsIHApO1xuICAgICAgICAgICAgICAgICExICE9PSB2YWxSZXN1bHQgJiYgKHAgPSB2YWxSZXN1bHQuZm9yd2FyZFBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdHMuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciA9IHNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdHJhY2tiYWNrUG9zaXRpb25zKG9yaWdpbmFsUG9zLCBuZXdQb3MsIGZpbGxPbmx5KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgbWFza3NldCA9IHRoaXMubWFza3NldCwgJCA9IHRoaXMuZGVwZW5kZW5jeUxpYjtcbiAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IG9yaWdpbmFsUG9zKSBmb3IgKG9yaWdpbmFsUG9zID0gbmV3UG9zIC0gMTsgMCA8IG9yaWdpbmFsUG9zICYmICFtYXNrc2V0LnZhbGlkUG9zaXRpb25zW29yaWdpbmFsUG9zXTsgb3JpZ2luYWxQb3MtLSkgO1xuICAgICAgICAgICAgZm9yICh2YXIgcHMgPSBvcmlnaW5hbFBvczsgcHMgPCBuZXdQb3M7IHBzKyspIGlmICh2b2lkIDAgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcHNdICYmICFfcG9zaXRpb25pbmcuaXNNYXNrLmNhbGwodGhpcywgcHMsICEwKSkge1xuICAgICAgICAgICAgICAgIHZhciB2cCA9IDAgPT0gcHMgPyBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbCh0aGlzLCBwcykgOiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3BzIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHZwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0cyA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdHMuY2FsbCh0aGlzLCBwcykuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgXCJcIiA9PT0gdGVzdHNbdGVzdHMubGVuZ3RoIC0gMV0ubWF0Y2guZGVmICYmIHRlc3RzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmVzdE1hdGNoID0gX3ZhbGlkYXRpb25UZXN0cy5kZXRlcm1pbmVUZXN0VGVtcGxhdGUuY2FsbCh0aGlzLCBwcywgdGVzdHMpLCBucDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RNYXRjaCAmJiAoITAgIT09IGJlc3RNYXRjaC5tYXRjaC5qaXQgfHwgXCJtYXN0ZXJcIiA9PT0gYmVzdE1hdGNoLm1hdGNoLm5ld0Jsb2NrTWFya2VyICYmIChucCA9IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcHMgKyAxXSkgJiYgITAgPT09IG5wLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllcikgJiYgKGJlc3RNYXRjaCA9ICQuZXh0ZW5kKHt9LCBiZXN0TWF0Y2gsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBfdmFsaWRhdGlvblRlc3RzLmdldFBsYWNlaG9sZGVyLmNhbGwodGhpcywgcHMsIGJlc3RNYXRjaC5tYXRjaCwgITApIHx8IGJlc3RNYXRjaC5tYXRjaC5kZWZcbiAgICAgICAgICAgICAgICAgICAgfSksIGJlc3RNYXRjaC5nZW5lcmF0ZWRJbnB1dCA9ICEwLCByZXZhbGlkYXRlTWFzay5jYWxsKHRoaXMsIHBzLCBiZXN0TWF0Y2gsICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICEwICE9PSBmaWxsT25seSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdnBJbnB1dCA9IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbbmV3UG9zXS5pbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW25ld1Bvc10gPSB2b2lkIDAsIGlzVmFsaWQuY2FsbCh0aGlzLCBuZXdQb3MsIGN2cElucHV0LCAhMCwgITApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJldmFsaWRhdGVNYXNrKHBvcywgdmFsaWRUZXN0LCBmcm9tSXNWYWxpZCwgdmFsaWRhdGVkUG9zKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcywgbWFza3NldCA9IHRoaXMubWFza3NldCwgb3B0cyA9IHRoaXMub3B0cywgJCA9IHRoaXMuZGVwZW5kZW5jeUxpYjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIElzRW5jbG9zZWRTdGF0aWMocG9zLCB2YWxpZHMsIHNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBwb3NNYXRjaCA9IHZhbGlkc1twb3NdO1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IHBvc01hdGNoIHx8ICEwICE9PSBwb3NNYXRjaC5tYXRjaC5zdGF0aWMgfHwgITAgPT09IHBvc01hdGNoLm1hdGNoLm9wdGlvbmFsaXR5IHx8IHZvaWQgMCAhPT0gdmFsaWRzWzBdICYmIHZvaWQgMCAhPT0gdmFsaWRzWzBdLmFsdGVybmF0aW9uKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZNYXRjaCA9IHNlbGVjdGlvbi5iZWdpbiA8PSBwb3MgLSAxID8gdmFsaWRzW3BvcyAtIDFdICYmICEwID09PSB2YWxpZHNbcG9zIC0gMV0ubWF0Y2guc3RhdGljICYmIHZhbGlkc1twb3MgLSAxXSA6IHZhbGlkc1twb3MgLSAxXSwgbmV4dE1hdGNoID0gc2VsZWN0aW9uLmVuZCA+IHBvcyArIDEgPyB2YWxpZHNbcG9zICsgMV0gJiYgITAgPT09IHZhbGlkc1twb3MgKyAxXS5tYXRjaC5zdGF0aWMgJiYgdmFsaWRzW3BvcyArIDFdIDogdmFsaWRzW3BvcyArIDFdO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2TWF0Y2ggJiYgbmV4dE1hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IDAsIGJlZ2luID0gdm9pZCAwICE9PSBwb3MuYmVnaW4gPyBwb3MuYmVnaW4gOiBwb3MsIGVuZCA9IHZvaWQgMCAhPT0gcG9zLmVuZCA/IHBvcy5lbmQgOiBwb3M7XG4gICAgICAgICAgICBpZiAocG9zLmJlZ2luID4gcG9zLmVuZCAmJiAoYmVnaW4gPSBwb3MuZW5kLCBlbmQgPSBwb3MuYmVnaW4pLCB2YWxpZGF0ZWRQb3MgPSB2b2lkIDAgIT09IHZhbGlkYXRlZFBvcyA/IHZhbGlkYXRlZFBvcyA6IGJlZ2luLCBcbiAgICAgICAgICAgIGJlZ2luICE9PSBlbmQgfHwgb3B0cy5pbnNlcnRNb2RlICYmIHZvaWQgMCAhPT0gbWFza3NldC52YWxpZFBvc2l0aW9uc1t2YWxpZGF0ZWRQb3NdICYmIHZvaWQgMCA9PT0gZnJvbUlzVmFsaWQgfHwgdm9pZCAwID09PSB2YWxpZFRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zQ2xvbmUgPSAkLmV4dGVuZCghMCwge30sIG1hc2tzZXQudmFsaWRQb3NpdGlvbnMpLCBsdnAgPSBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh0aGlzLCB2b2lkIDAsICEwKSwgaTtcbiAgICAgICAgICAgICAgICBmb3IgKG1hc2tzZXQucCA9IGJlZ2luLCBpID0gbHZwOyBiZWdpbiA8PSBpOyBpLS0pIGRlbGV0ZSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW2ldLCBcbiAgICAgICAgICAgICAgICB2b2lkIDAgPT09IHZhbGlkVGVzdCAmJiBkZWxldGUgbWFza3NldC50ZXN0c1tpICsgMV07XG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkID0gITAsIGogPSB2YWxpZGF0ZWRQb3MsIHBvc01hdGNoID0gaiwgdCwgY2FuTWF0Y2g7XG4gICAgICAgICAgICAgICAgZm9yICh2YWxpZFRlc3QgJiYgKG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbdmFsaWRhdGVkUG9zXSA9ICQuZXh0ZW5kKCEwLCB7fSwgdmFsaWRUZXN0KSwgXG4gICAgICAgICAgICAgICAgcG9zTWF0Y2grKywgaisrKSwgaSA9IHZhbGlkVGVzdCA/IGVuZCA6IGVuZCAtIDE7IGkgPD0gbHZwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gKHQgPSBwb3NpdGlvbnNDbG9uZVtpXSkgJiYgITAgIT09IHQuZ2VuZXJhdGVkSW5wdXQgJiYgKGVuZCA8PSBpIHx8IGJlZ2luIDw9IGkgJiYgSXNFbmNsb3NlZFN0YXRpYyhpLCBwb3NpdGlvbnNDbG9uZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGJlZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgICAgICAgICAgfSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDtcIlwiICE9PSBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbCh0aGlzLCBwb3NNYXRjaCkubWF0Y2guZGVmOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgIT09IChjYW5NYXRjaCA9IHBvc2l0aW9uQ2FuTWF0Y2hEZWZpbml0aW9uLmNhbGwodGhpcywgcG9zTWF0Y2gsIHQsIG9wdHMpKSB8fCBcIitcIiA9PT0gdC5tYXRjaC5kZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIrXCIgPT09IHQubWF0Y2guZGVmICYmIF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbCh0aGlzLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpc1ZhbGlkLmNhbGwodGhpcywgcG9zTWF0Y2gsIHQuaW5wdXQsIFwiK1wiICE9PSB0Lm1hdGNoLmRlZiwgXCIrXCIgIT09IHQubWF0Y2guZGVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkID0gITEgIT09IHJlc3VsdCwgaiA9IChyZXN1bHQucG9zIHx8IHBvc01hdGNoKSArIDEsICF2YWxpZCAmJiBjYW5NYXRjaCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHZhbGlkID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gdmFsaWRUZXN0ICYmIHQubWF0Y2guc3RhdGljICYmIGkgPT09IHBvcy5iZWdpbiAmJiBvZmZzZXQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQgJiYgcG9zTWF0Y2ggPiBtYXNrc2V0Lm1hc2tMZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc01hdGNoKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlwiID09IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdC5jYWxsKHRoaXMsIHBvc01hdGNoKS5tYXRjaC5kZWYgJiYgKHZhbGlkID0gITEpLCBwb3NNYXRjaCA9IGo7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHJldHVybiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zID0gJC5leHRlbmQoITAsIHt9LCBwb3NpdGlvbnNDbG9uZSksIF9wb3NpdGlvbmluZy5yZXNldE1hc2tTZXQuY2FsbCh0aGlzLCAhMCksIFxuICAgICAgICAgICAgICAgICExO1xuICAgICAgICAgICAgfSBlbHNlIHZhbGlkVGVzdCAmJiBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbCh0aGlzLCB2YWxpZGF0ZWRQb3MpLm1hdGNoLmNkID09PSB2YWxpZFRlc3QubWF0Y2guY2QgJiYgKG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbdmFsaWRhdGVkUG9zXSA9ICQuZXh0ZW5kKCEwLCB7fSwgdmFsaWRUZXN0KSk7XG4gICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uaW5nLnJlc2V0TWFza1NldC5jYWxsKHRoaXMsICEwKSwgb2Zmc2V0O1xuICAgICAgICB9XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICB9KSwgZXhwb3J0cy5hcHBseUlucHV0VmFsdWUgPSBhcHBseUlucHV0VmFsdWUsIGV4cG9ydHMuY2xlYXJPcHRpb25hbFRhaWwgPSBjbGVhck9wdGlvbmFsVGFpbCwgXG4gICAgICAgIGV4cG9ydHMuY2hlY2tWYWwgPSBjaGVja1ZhbCwgZXhwb3J0cy5IYW5kbGVOYXRpdmVQbGFjZWhvbGRlciA9IEhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyLCBcbiAgICAgICAgZXhwb3J0cy51bm1hc2tlZHZhbHVlID0gdW5tYXNrZWR2YWx1ZSwgZXhwb3J0cy53cml0ZUJ1ZmZlciA9IHdyaXRlQnVmZmVyO1xuICAgICAgICB2YXIgX2tleWNvZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMCkpLCBfdmFsaWRhdGlvblRlc3RzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKSwgX3Bvc2l0aW9uaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKSwgX3ZhbGlkYXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLCBfZW52aXJvbm1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLCBfZXZlbnRoYW5kbGVycyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcHBseUlucHV0VmFsdWUoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gaW5wdXQgPyBpbnB1dC5pbnB1dG1hc2sgOiB0aGlzLCBvcHRzID0gaW5wdXRtYXNrLm9wdHM7XG4gICAgICAgICAgICBpbnB1dC5pbnB1dG1hc2sucmVmcmVzaFZhbHVlID0gITEsIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygb3B0cy5vbkJlZm9yZU1hc2sgJiYgKHZhbHVlID0gb3B0cy5vbkJlZm9yZU1hc2suY2FsbChpbnB1dG1hc2ssIHZhbHVlLCBvcHRzKSB8fCB2YWx1ZSksIFxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KFwiXCIpLCBjaGVja1ZhbChpbnB1dCwgITAsICExLCB2YWx1ZSksIGlucHV0bWFzay51bmRvVmFsdWUgPSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKS5qb2luKFwiXCIpLCBcbiAgICAgICAgICAgIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzIHx8IG9wdHMuY2xlYXJJbmNvbXBsZXRlKSAmJiBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgPT09IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSAmJiAtMSA9PT0gX3Bvc2l0aW9uaW5nLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwoaW5wdXRtYXNrKSAmJiBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyT3B0aW9uYWxUYWlsKGJ1ZmZlcikge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXM7XG4gICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIHRlbXBsYXRlID0gX3ZhbGlkYXRpb25UZXN0cy5nZXRNYXNrVGVtcGxhdGUuY2FsbCh0aGlzLCAhMCwgMCwgITAsIHZvaWQgMCwgITApLCBsbW50OyB2b2lkIDAgIT09IChsbW50ID0gdGVtcGxhdGUuc2hpZnQoKSk7ICkgYnVmZmVyLnB1c2gobG1udCk7XG4gICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrVmFsKGlucHV0LCB3cml0ZU91dCwgc3RyaWN0LCBucHR2bCwgaW5pdGlhdGluZ0V2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gaW5wdXQgPyBpbnB1dC5pbnB1dG1hc2sgOiB0aGlzLCBtYXNrc2V0ID0gaW5wdXRtYXNrLm1hc2tzZXQsIG9wdHMgPSBpbnB1dG1hc2sub3B0cywgJCA9IGlucHV0bWFzay5kZXBlbmRlbmN5TGliLCBpbnB1dFZhbHVlID0gbnB0dmwuc2xpY2UoKSwgY2hhckNvZGVzID0gXCJcIiwgaW5pdGlhbE5keCA9IC0xLCByZXN1bHQgPSB2b2lkIDAsIHNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgPSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXI7XG4gICAgICAgICAgICBmdW5jdGlvbiBpc1RlbXBsYXRlTWF0Y2gobmR4LCBjaGFyQ29kZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0YXJnZXRUZW1wbGF0ZSA9IF92YWxpZGF0aW9uVGVzdHMuZ2V0TWFza1RlbXBsYXRlLmNhbGwoaW5wdXRtYXNrLCAhMCwgMCkuc2xpY2UobmR4LCBfcG9zaXRpb25pbmcuc2Vla05leHQuY2FsbChpbnB1dG1hc2ssIG5keCkpLmpvaW4oXCJcIikucmVwbGFjZSgvJy9nLCBcIlwiKSwgY2hhckNvZGVOZHggPSB0YXJnZXRUZW1wbGF0ZS5pbmRleE9mKGNoYXJDb2Rlcyk7IDAgPCBjaGFyQ29kZU5keCAmJiBcIiBcIiA9PT0gdGFyZ2V0VGVtcGxhdGVbY2hhckNvZGVOZHggLSAxXTsgKSBjaGFyQ29kZU5keC0tO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IDAgPT09IGNoYXJDb2RlTmR4ICYmICFfcG9zaXRpb25pbmcuaXNNYXNrLmNhbGwoaW5wdXRtYXNrLCBuZHgpICYmIChfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbChpbnB1dG1hc2ssIG5keCkubWF0Y2gubmF0aXZlRGVmID09PSBjaGFyQ29kZXMuY2hhckF0KDApIHx8ICEwID09PSBfdmFsaWRhdGlvblRlc3RzLmdldFRlc3QuY2FsbChpbnB1dG1hc2ssIG5keCkubWF0Y2guc3RhdGljICYmIF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdC5jYWxsKGlucHV0bWFzaywgbmR4KS5tYXRjaC5uYXRpdmVEZWYgPT09IFwiJ1wiICsgY2hhckNvZGVzLmNoYXJBdCgwKSB8fCBcIiBcIiA9PT0gX3ZhbGlkYXRpb25UZXN0cy5nZXRUZXN0LmNhbGwoaW5wdXRtYXNrLCBuZHgpLm1hdGNoLm5hdGl2ZURlZiAmJiAoX3ZhbGlkYXRpb25UZXN0cy5nZXRUZXN0LmNhbGwoaW5wdXRtYXNrLCBuZHggKyAxKS5tYXRjaC5uYXRpdmVEZWYgPT09IGNoYXJDb2Rlcy5jaGFyQXQoMCkgfHwgITAgPT09IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdC5jYWxsKGlucHV0bWFzaywgbmR4ICsgMSkubWF0Y2guc3RhdGljICYmIF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdC5jYWxsKGlucHV0bWFzaywgbmR4ICsgMSkubWF0Y2gubmF0aXZlRGVmID09PSBcIidcIiArIGNoYXJDb2Rlcy5jaGFyQXQoMCkpKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoICYmIDAgPCBjaGFyQ29kZU5keCAmJiAhX3Bvc2l0aW9uaW5nLmlzTWFzay5jYWxsKGlucHV0bWFzaywgbmR4LCAhMSwgITApKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0UG9zID0gX3Bvc2l0aW9uaW5nLnNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCBuZHgpO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dG1hc2suY2FyZXRQb3MuYmVnaW4gPCBuZXh0UG9zICYmIChpbnB1dG1hc2suY2FyZXRQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogbmV4dFBvc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyID0gXCJcIiwgX3Bvc2l0aW9uaW5nLnJlc2V0TWFza1NldC5jYWxsKGlucHV0bWFzayksIFxuICAgICAgICAgICAgbWFza3NldC50ZXN0cyA9IHt9LCBpbml0aWFsTmR4ID0gb3B0cy5yYWRpeFBvaW50ID8gX3Bvc2l0aW9uaW5nLmRldGVybWluZU5ld0NhcmV0UG9zaXRpb24uY2FsbChpbnB1dG1hc2ssIHtcbiAgICAgICAgICAgICAgICBiZWdpbjogMCxcbiAgICAgICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgICAgIH0pLmJlZ2luIDogMCwgbWFza3NldC5wID0gaW5pdGlhbE5keCwgaW5wdXRtYXNrLmNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgIGJlZ2luOiBpbml0aWFsTmR4XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHN0YXRpY01hdGNoZXMgPSBbXSwgcHJldkNhcmV0UG9zID0gaW5wdXRtYXNrLmNhcmV0UG9zO1xuICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUuZm9yRWFjaChmdW5jdGlvbihjaGFyQ29kZSwgbmR4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gY2hhckNvZGUpIGlmICh2b2lkIDAgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbbmR4XSAmJiBpbnB1dFZhbHVlW25keF0gPT09IF92YWxpZGF0aW9uVGVzdHMuZ2V0UGxhY2Vob2xkZXIuY2FsbChpbnB1dG1hc2ssIG5keCkgJiYgX3Bvc2l0aW9uaW5nLmlzTWFzay5jYWxsKGlucHV0bWFzaywgbmR4LCAhMCkgJiYgITEgPT09IF92YWxpZGF0aW9uLmlzVmFsaWQuY2FsbChpbnB1dG1hc2ssIG5keCwgaW5wdXRWYWx1ZVtuZHhdLCAhMCwgdm9pZCAwLCB2b2lkIDAsICEwKSkgbWFza3NldC5wKys7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5cHJlc3MgPSBuZXcgJC5FdmVudChcIl9jaGVja3ZhbFwiKTtcbiAgICAgICAgICAgICAgICAgICAga2V5cHJlc3Mud2hpY2ggPSBjaGFyQ29kZS50b1N0cmluZygpLmNoYXJDb2RlQXQoMCksIGNoYXJDb2RlcyArPSBjaGFyQ29kZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IF9wb3NpdGlvbmluZy5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGlucHV0bWFzaywgdm9pZCAwLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgIGlzVGVtcGxhdGVNYXRjaChpbml0aWFsTmR4LCBjaGFyQ29kZXMpID8gcmVzdWx0ID0gX2V2ZW50aGFuZGxlcnMuRXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQgfHwgaW5wdXRtYXNrLCBrZXlwcmVzcywgITAsICExLCBzdHJpY3QsIGx2cCArIDEpIDogKHJlc3VsdCA9IF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGlucHV0IHx8IGlucHV0bWFzaywga2V5cHJlc3MsICEwLCAhMSwgc3RyaWN0LCBpbnB1dG1hc2suY2FyZXRQb3MuYmVnaW4pLCBcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICYmIChpbml0aWFsTmR4ID0gaW5wdXRtYXNrLmNhcmV0UG9zLmJlZ2luICsgMSwgY2hhckNvZGVzID0gXCJcIikpLCByZXN1bHQgPyAodm9pZCAwICE9PSByZXN1bHQucG9zICYmIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcmVzdWx0LnBvc10gJiYgITAgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcmVzdWx0LnBvc10ubWF0Y2guc3RhdGljICYmIHZvaWQgMCA9PT0gbWFza3NldC52YWxpZFBvc2l0aW9uc1tyZXN1bHQucG9zXS5hbHRlcm5hdGlvbiAmJiAoc3RhdGljTWF0Y2hlcy5wdXNoKHJlc3VsdC5wb3MpLCBcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRtYXNrLmlzUlRMIHx8IChyZXN1bHQuZm9yd2FyZFBvc2l0aW9uID0gcmVzdWx0LnBvcyArIDEpKSwgd3JpdGVCdWZmZXIuY2FsbChpbnB1dG1hc2ssIHZvaWQgMCwgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzayksIHJlc3VsdC5mb3J3YXJkUG9zaXRpb24sIGtleXByZXNzLCAhMSksIFxuICAgICAgICAgICAgICAgICAgICBpbnB1dG1hc2suY2FyZXRQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogcmVzdWx0LmZvcndhcmRQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogcmVzdWx0LmZvcndhcmRQb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICB9LCBwcmV2Q2FyZXRQb3MgPSBpbnB1dG1hc2suY2FyZXRQb3MpIDogaW5wdXRtYXNrLmNhcmV0UG9zID0gcHJldkNhcmV0UG9zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCAwIDwgc3RhdGljTWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc25keCwgdmFsaWRQb3MsIG5leHRWYWxpZCA9IF9wb3NpdGlvbmluZy5zZWVrTmV4dC5jYWxsKGlucHV0bWFzaywgLTEsIHZvaWQgMCwgITEpO1xuICAgICAgICAgICAgICAgIGlmICghX3ZhbGlkYXRpb24uaXNDb21wbGV0ZS5jYWxsKGlucHV0bWFzaywgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykpICYmIHN0YXRpY01hdGNoZXMubGVuZ3RoIDw9IG5leHRWYWxpZCB8fCBfdmFsaWRhdGlvbi5pc0NvbXBsZXRlLmNhbGwoaW5wdXRtYXNrLCBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKSkgJiYgMCA8IHN0YXRpY01hdGNoZXMubGVuZ3RoICYmIHN0YXRpY01hdGNoZXMubGVuZ3RoICE9PSBuZXh0VmFsaWQgJiYgMCA9PT0gc3RhdGljTWF0Y2hlc1swXSkgZm9yICh2YXIgbmV4dFNuZHggPSBuZXh0VmFsaWQ7IHZvaWQgMCAhPT0gKHNuZHggPSBzdGF0aWNNYXRjaGVzLnNoaWZ0KCkpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleXByZXNzID0gbmV3ICQuRXZlbnQoXCJfY2hlY2t2YWxcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZFBvcyA9IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbc25keF0sIHZhbGlkUG9zLmdlbmVyYXRlZElucHV0ID0gITAsIGtleXByZXNzLndoaWNoID0gdmFsaWRQb3MuaW5wdXQuY2hhckNvZGVBdCgwKSwgXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCBrZXlwcmVzcywgITAsICExLCBzdHJpY3QsIG5leHRTbmR4KSwgXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCAmJiB2b2lkIDAgIT09IHJlc3VsdC5wb3MgJiYgcmVzdWx0LnBvcyAhPT0gc25keCAmJiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Jlc3VsdC5wb3NdICYmICEwID09PSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Jlc3VsdC5wb3NdLm1hdGNoLnN0YXRpYykgc3RhdGljTWF0Y2hlcy5wdXNoKHJlc3VsdC5wb3MpOyBlbHNlIGlmICghcmVzdWx0KSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNuZHgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3cml0ZU91dCAmJiB3cml0ZUJ1ZmZlci5jYWxsKGlucHV0bWFzaywgaW5wdXQsIF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLCByZXN1bHQgPyByZXN1bHQuZm9yd2FyZFBvc2l0aW9uIDogaW5wdXRtYXNrLmNhcmV0UG9zLmJlZ2luLCBpbml0aWF0aW5nRXZlbnQgfHwgbmV3ICQuRXZlbnQoXCJjaGVja3ZhbFwiKSwgaW5pdGlhdGluZ0V2ZW50ICYmIFwiaW5wdXRcIiA9PT0gaW5pdGlhdGluZ0V2ZW50LnR5cGUgJiYgaW5wdXRtYXNrLnVuZG9WYWx1ZSAhPT0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSksIFxuICAgICAgICAgICAgb3B0cy5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyID0gc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBIYW5kbGVOYXRpdmVQbGFjZWhvbGRlcihucHQsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gbnB0ID8gbnB0LmlucHV0bWFzayA6IHRoaXM7XG4gICAgICAgICAgICBpZiAoX2Vudmlyb25tZW50LmllKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5wdC5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgIT09IHZhbHVlICYmIChucHQucGxhY2Vob2xkZXIgIT09IHZhbHVlIHx8IFwiXCIgPT09IG5wdC5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLnNsaWNlKCksIG5wdFZhbHVlID0gbnB0LmlucHV0bWFzay5fdmFsdWVHZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5wdFZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IF9wb3NpdGlvbmluZy5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGlucHV0bWFzayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAtMSA9PT0gbHZwICYmIG5wdFZhbHVlID09PSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChpbnB1dG1hc2spLmpvaW4oXCJcIikgPyBidWZmZXIgPSBbXSA6IC0xICE9PSBsdnAgJiYgY2xlYXJPcHRpb25hbFRhaWwuY2FsbChpbnB1dG1hc2ssIGJ1ZmZlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIobnB0LCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIG5wdC5wbGFjZWhvbGRlciAhPT0gdmFsdWUgJiYgKG5wdC5wbGFjZWhvbGRlciA9IHZhbHVlLCBcIlwiID09PSBucHQucGxhY2Vob2xkZXIgJiYgbnB0LnJlbW92ZUF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1bm1hc2tlZHZhbHVlKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gaW5wdXQgPyBpbnB1dC5pbnB1dG1hc2sgOiB0aGlzLCBvcHRzID0gaW5wdXRtYXNrLm9wdHMsIG1hc2tzZXQgPSBpbnB1dG1hc2subWFza3NldDtcbiAgICAgICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IGlucHV0LmlucHV0bWFzaykgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LmlucHV0bWFzayAmJiBpbnB1dC5pbnB1dG1hc2sucmVmcmVzaFZhbHVlICYmIGFwcGx5SW5wdXRWYWx1ZShpbnB1dCwgaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHVtVmFsdWUgPSBbXSwgdnBzID0gbWFza3NldC52YWxpZFBvc2l0aW9ucztcbiAgICAgICAgICAgIGZvciAodmFyIHBuZHggaW4gdnBzKSB2cHNbcG5keF0gJiYgdnBzW3BuZHhdLm1hdGNoICYmICgxICE9IHZwc1twbmR4XS5tYXRjaC5zdGF0aWMgfHwgQXJyYXkuaXNBcnJheShtYXNrc2V0Lm1ldGFkYXRhKSAmJiAhMCAhPT0gdnBzW3BuZHhdLmdlbmVyYXRlZElucHV0KSAmJiB1bVZhbHVlLnB1c2godnBzW3BuZHhdLmlucHV0KTtcbiAgICAgICAgICAgIHZhciB1bm1hc2tlZFZhbHVlID0gMCA9PT0gdW1WYWx1ZS5sZW5ndGggPyBcIlwiIDogKGlucHV0bWFzay5pc1JUTCA/IHVtVmFsdWUucmV2ZXJzZSgpIDogdW1WYWx1ZSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIG9wdHMub25Vbk1hc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyVmFsdWUgPSAoaW5wdXRtYXNrLmlzUlRMID8gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuc2xpY2UoKS5yZXZlcnNlKCkgOiBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICB1bm1hc2tlZFZhbHVlID0gb3B0cy5vblVuTWFzay5jYWxsKGlucHV0bWFzaywgYnVmZmVyVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVubWFza2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlciwgY2FyZXRQb3MsIGV2ZW50LCB0cmlnZ2VyRXZlbnRzKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gaW5wdXQgPyBpbnB1dC5pbnB1dG1hc2sgOiB0aGlzLCBvcHRzID0gaW5wdXRtYXNrLm9wdHMsICQgPSBpbnB1dG1hc2suZGVwZW5kZW5jeUxpYjtcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIG9wdHMub25CZWZvcmVXcml0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBvcHRzLm9uQmVmb3JlV3JpdGUuY2FsbChpbnB1dG1hc2ssIGV2ZW50LCBidWZmZXIsIGNhcmV0UG9zLCBvcHRzKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVmcmVzaEZyb21CdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZyZXNoID0gcmVzdWx0LnJlZnJlc2hGcm9tQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbGlkYXRpb24ucmVmcmVzaEZyb21CdWZmZXIuY2FsbChpbnB1dG1hc2ssICEwID09PSByZWZyZXNoID8gcmVmcmVzaCA6IHJlZnJlc2guc3RhcnQsIHJlZnJlc2guZW5kLCByZXN1bHQuYnVmZmVyIHx8IGJ1ZmZlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaywgITApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gY2FyZXRQb3MgJiYgKGNhcmV0UG9zID0gdm9pZCAwICE9PSByZXN1bHQuY2FyZXQgPyByZXN1bHQuY2FyZXQgOiBjYXJldFBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gaW5wdXQgJiYgKGlucHV0LmlucHV0bWFzay5fdmFsdWVTZXQoYnVmZmVyLmpvaW4oXCJcIikpLCB2b2lkIDAgPT09IGNhcmV0UG9zIHx8IHZvaWQgMCAhPT0gZXZlbnQgJiYgXCJibHVyXCIgPT09IGV2ZW50LnR5cGUgfHwgX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCwgY2FyZXRQb3MsIHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAgIT09IGV2ZW50ICYmIFwia2V5ZG93blwiID09PSBldmVudC50eXBlICYmIChldmVudC5rZXlDb2RlID09PSBfa2V5Y29kZS5kZWZhdWx0LkRFTEVURSB8fCBldmVudC5rZXlDb2RlID09PSBfa2V5Y29kZS5kZWZhdWx0LkJBQ0tTUEFDRSkpLCBcbiAgICAgICAgICAgICEwID09PSB0cmlnZ2VyRXZlbnRzKSkge1xuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKGlucHV0KSwgbnB0VmFsID0gaW5wdXQuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xuICAgICAgICAgICAgICAgIGlucHV0LmlucHV0bWFzay5za2lwSW5wdXRFdmVudCA9ICEwLCAkaW5wdXQudHJpZ2dlcihcImlucHV0XCIpLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBucHRWYWwgPT09IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSA/ICRpbnB1dC50cmlnZ2VyKFwiY2xlYXJlZFwiKSA6ICEwID09PSBfdmFsaWRhdGlvbi5pc0NvbXBsZXRlLmNhbGwoaW5wdXRtYXNrLCBidWZmZXIpICYmICRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgIH0pLCBleHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG4gICAgICAgIHZhciBfZGVmYXVsdCA9IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IG5ldyAoZXZhbChcInJlcXVpcmUoJ2pzZG9tJykuSlNET01cIikpKFwiXCIpLndpbmRvdztcbiAgICAgICAgZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICB9KSwgZXhwb3J0cy5FdmVudEhhbmRsZXJzID0gdm9pZCAwO1xuICAgICAgICB2YXIgX3Bvc2l0aW9uaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKSwgX2tleWNvZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMCkpLCBfZW52aXJvbm1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLCBfdmFsaWRhdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNCksIF9pbnB1dEhhbmRsaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KSwgX3ZhbGlkYXRpb25UZXN0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgRXZlbnRIYW5kbGVycyA9IHtcbiAgICAgICAgICAgIGtleWRvd25FdmVudDogZnVuY3Rpb24ga2V5ZG93bkV2ZW50KGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcy5pbnB1dG1hc2ssIG9wdHMgPSBpbnB1dG1hc2sub3B0cywgJCA9IGlucHV0bWFzay5kZXBlbmRlbmN5TGliLCBtYXNrc2V0ID0gaW5wdXRtYXNrLm1hc2tzZXQsIGlucHV0ID0gdGhpcywgJGlucHV0ID0gJChpbnB1dCksIGsgPSBlLmtleUNvZGUsIHBvcyA9IF9wb3NpdGlvbmluZy5jYXJldC5jYWxsKGlucHV0bWFzaywgaW5wdXQpLCBrZFJlc3VsdCA9IG9wdHMub25LZXlEb3duLmNhbGwodGhpcywgZSwgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzayksIHBvcywgb3B0cyk7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0ga2RSZXN1bHQpIHJldHVybiBrZFJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gX2tleWNvZGUuZGVmYXVsdC5CQUNLU1BBQ0UgfHwgayA9PT0gX2tleWNvZGUuZGVmYXVsdC5ERUxFVEUgfHwgX2Vudmlyb25tZW50LmlwaG9uZSAmJiBrID09PSBfa2V5Y29kZS5kZWZhdWx0LkJBQ0tTUEFDRV9TQUZBUkkgfHwgZS5jdHJsS2V5ICYmIGsgPT09IF9rZXljb2RlLmRlZmF1bHQuWCAmJiAhKFwib25jdXRcIiBpbiBpbnB1dCkpIGUucHJldmVudERlZmF1bHQoKSwgXG4gICAgICAgICAgICAgICAgX3ZhbGlkYXRpb24uaGFuZGxlUmVtb3ZlLmNhbGwoaW5wdXRtYXNrLCBpbnB1dCwgaywgcG9zKSwgKDAsIF9pbnB1dEhhbmRsaW5nLndyaXRlQnVmZmVyKShpbnB1dCwgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaywgITApLCBtYXNrc2V0LnAsIGUsIGlucHV0LmlucHV0bWFzay5fdmFsdWVHZXQoKSAhPT0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSk7IGVsc2UgaWYgKGsgPT09IF9rZXljb2RlLmRlZmF1bHQuRU5EIHx8IGsgPT09IF9rZXljb2RlLmRlZmF1bHQuUEFHRV9ET1dOKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gX3Bvc2l0aW9uaW5nLnNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChpbnB1dG1hc2spKTtcbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IGNhcmV0UG9zLCBjYXJldFBvcywgITApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBrID09PSBfa2V5Y29kZS5kZWZhdWx0LkhPTUUgJiYgIWUuc2hpZnRLZXkgfHwgayA9PT0gX2tleWNvZGUuZGVmYXVsdC5QQUdFX1VQID8gKGUucHJldmVudERlZmF1bHQoKSwgXG4gICAgICAgICAgICAgICAgX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCwgMCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IDAsICEwKSkgOiAob3B0cy51bmRvT25Fc2NhcGUgJiYgayA9PT0gX2tleWNvZGUuZGVmYXVsdC5FU0NBUEUgfHwgOTAgPT09IGsgJiYgZS5jdHJsS2V5KSAmJiAhMCAhPT0gZS5hbHRLZXkgPyAoKDAsIFxuICAgICAgICAgICAgICAgIF9pbnB1dEhhbmRsaW5nLmNoZWNrVmFsKShpbnB1dCwgITAsICExLCBpbnB1dG1hc2sudW5kb1ZhbHVlLnNwbGl0KFwiXCIpKSwgJGlucHV0LnRyaWdnZXIoXCJjbGlja1wiKSkgOiAhMCA9PT0gb3B0cy50YWJUaHJvdWdoICYmIGsgPT09IF9rZXljb2RlLmRlZmF1bHQuVEFCID8gITAgPT09IGUuc2hpZnRLZXkgPyAocG9zLmVuZCA9IF9wb3NpdGlvbmluZy5zZWVrUHJldmlvdXMuY2FsbChpbnB1dG1hc2ssIHBvcy5lbmQsICEwKSwgXG4gICAgICAgICAgICAgICAgITAgPT09IF92YWxpZGF0aW9uVGVzdHMuZ2V0VGVzdC5jYWxsKGlucHV0bWFzaywgcG9zLmVuZCAtIDEpLm1hdGNoLnN0YXRpYyAmJiBwb3MuZW5kLS0sIFxuICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IF9wb3NpdGlvbmluZy5zZWVrUHJldmlvdXMuY2FsbChpbnB1dG1hc2ssIHBvcy5lbmQsICEwKSwgMCA8PSBwb3MuYmVnaW4gJiYgMCA8IHBvcy5lbmQgJiYgKGUucHJldmVudERlZmF1bHQoKSwgXG4gICAgICAgICAgICAgICAgX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCwgcG9zLmJlZ2luLCBwb3MuZW5kKSkpIDogKHBvcy5iZWdpbiA9IF9wb3NpdGlvbmluZy5zZWVrTmV4dC5jYWxsKGlucHV0bWFzaywgcG9zLmJlZ2luLCAhMCksIFxuICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBfcG9zaXRpb25pbmcuc2Vla05leHQuY2FsbChpbnB1dG1hc2ssIHBvcy5iZWdpbiwgITApLCBwb3MuZW5kIDwgbWFza3NldC5tYXNrTGVuZ3RoICYmIHBvcy5lbmQtLSwgXG4gICAgICAgICAgICAgICAgcG9zLmJlZ2luIDw9IG1hc2tzZXQubWFza0xlbmd0aCAmJiAoZS5wcmV2ZW50RGVmYXVsdCgpLCBfcG9zaXRpb25pbmcuY2FyZXQuY2FsbChpbnB1dG1hc2ssIGlucHV0LCBwb3MuYmVnaW4sIHBvcy5lbmQpKSkgOiBlLnNoaWZ0S2V5IHx8IG9wdHMuaW5zZXJ0TW9kZVZpc3VhbCAmJiAhMSA9PT0gb3B0cy5pbnNlcnRNb2RlICYmIChrID09PSBfa2V5Y29kZS5kZWZhdWx0LlJJR0hUID8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbmluZy5jYXJldC5jYWxsKGlucHV0bWFzaywgaW5wdXQsIGNhcmV0UG9zLmJlZ2luKTtcbiAgICAgICAgICAgICAgICB9LCAwKSA6IGsgPT09IF9rZXljb2RlLmRlZmF1bHQuTEVGVCAmJiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3NfYmVnaW4gPSBfcG9zaXRpb25pbmcudHJhbnNsYXRlUG9zaXRpb24uY2FsbChpbnB1dG1hc2ssIGlucHV0LmlucHV0bWFzay5jYXJldFBvcy5iZWdpbiksIGNhcmV0UG9zX2VuZCA9IF9wb3NpdGlvbmluZy50cmFuc2xhdGVQb3NpdGlvbi5jYWxsKGlucHV0bWFzaywgaW5wdXQuaW5wdXRtYXNrLmNhcmV0UG9zLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0bWFzay5pc1JUTCA/IF9wb3NpdGlvbmluZy5jYXJldC5jYWxsKGlucHV0bWFzaywgaW5wdXQsIGNhcmV0UG9zX2JlZ2luICsgKGNhcmV0UG9zX2JlZ2luID09PSBtYXNrc2V0Lm1hc2tMZW5ndGggPyAwIDogMSkpIDogX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCwgY2FyZXRQb3NfYmVnaW4gLSAoMCA9PT0gY2FyZXRQb3NfYmVnaW4gPyAwIDogMSkpO1xuICAgICAgICAgICAgICAgIH0sIDApKTtcbiAgICAgICAgICAgICAgICBpbnB1dG1hc2suaWdub3JhYmxlID0gb3B0cy5pZ25vcmFibGVzLmluY2x1ZGVzKGspO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleXByZXNzRXZlbnQ6IGZ1bmN0aW9uIGtleXByZXNzRXZlbnQoZSwgY2hlY2t2YWwsIHdyaXRlT3V0LCBzdHJpY3QsIG5keCkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLmlucHV0bWFzayB8fCB0aGlzLCBvcHRzID0gaW5wdXRtYXNrLm9wdHMsICQgPSBpbnB1dG1hc2suZGVwZW5kZW5jeUxpYiwgbWFza3NldCA9IGlucHV0bWFzay5tYXNrc2V0LCBpbnB1dCA9IGlucHV0bWFzay5lbCwgJGlucHV0ID0gJChpbnB1dCksIGsgPSBlLndoaWNoIHx8IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGlmICghKCEwID09PSBjaGVja3ZhbCB8fCBlLmN0cmxLZXkgJiYgZS5hbHRLZXkpICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGlucHV0bWFzay5pZ25vcmFibGUpKSByZXR1cm4gayA9PT0gX2tleWNvZGUuZGVmYXVsdC5FTlRFUiAmJiBpbnB1dG1hc2sudW5kb1ZhbHVlICE9PSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKS5qb2luKFwiXCIpICYmIChpbnB1dG1hc2sudW5kb1ZhbHVlID0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSwgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICAgICAgICAgICAgfSwgMCkpLCBpbnB1dG1hc2suc2tpcElucHV0RXZlbnQgPSAhMCwgITA7XG4gICAgICAgICAgICAgICAgaWYgKGspIHtcbiAgICAgICAgICAgICAgICAgICAgNDQgIT09IGsgJiYgNDYgIT09IGsgfHwgMyAhPT0gZS5sb2NhdGlvbiB8fCBcIlwiID09PSBvcHRzLnJhZGl4UG9pbnQgfHwgKGsgPSBvcHRzLnJhZGl4UG9pbnQuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBjaGVja3ZhbCA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBuZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG5keFxuICAgICAgICAgICAgICAgICAgICB9IDogX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCksIGZvcndhcmRQb3NpdGlvbiwgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoayk7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tzZXQud3JpdGVPdXRCdWZmZXIgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbFJlc3VsdCA9IF92YWxpZGF0aW9uLmlzVmFsaWQuY2FsbChpbnB1dG1hc2ssIHBvcywgYywgc3RyaWN0LCB2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBjaGVja3ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghMSAhPT0gdmFsUmVzdWx0ICYmIChfcG9zaXRpb25pbmcucmVzZXRNYXNrU2V0LmNhbGwoaW5wdXRtYXNrLCAhMCksIGZvcndhcmRQb3NpdGlvbiA9IHZvaWQgMCAhPT0gdmFsUmVzdWx0LmNhcmV0ID8gdmFsUmVzdWx0LmNhcmV0IDogX3Bvc2l0aW9uaW5nLnNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCB2YWxSZXN1bHQucG9zLmJlZ2luID8gdmFsUmVzdWx0LnBvcy5iZWdpbiA6IHZhbFJlc3VsdC5wb3MpLCBcbiAgICAgICAgICAgICAgICAgICAgbWFza3NldC5wID0gZm9yd2FyZFBvc2l0aW9uKSwgZm9yd2FyZFBvc2l0aW9uID0gb3B0cy5udW1lcmljSW5wdXQgJiYgdm9pZCAwID09PSB2YWxSZXN1bHQuY2FyZXQgPyBfcG9zaXRpb25pbmcuc2Vla1ByZXZpb3VzLmNhbGwoaW5wdXRtYXNrLCBmb3J3YXJkUG9zaXRpb24pIDogZm9yd2FyZFBvc2l0aW9uLCBcbiAgICAgICAgICAgICAgICAgICAgITEgIT09IHdyaXRlT3V0ICYmIChzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5vbktleVZhbGlkYXRpb24uY2FsbChpbnB1dCwgaywgdmFsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCksIG1hc2tzZXQud3JpdGVPdXRCdWZmZXIgJiYgITEgIT09IHZhbFJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCBfaW5wdXRIYW5kbGluZy53cml0ZUJ1ZmZlcikoaW5wdXQsIGJ1ZmZlciwgZm9yd2FyZFBvc2l0aW9uLCBlLCAhMCAhPT0gY2hlY2t2YWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KCksIGNoZWNrdmFsKSByZXR1cm4gITEgIT09IHZhbFJlc3VsdCAmJiAodmFsUmVzdWx0LmZvcndhcmRQb3NpdGlvbiA9IGZvcndhcmRQb3NpdGlvbiksIFxuICAgICAgICAgICAgICAgICAgICB2YWxSZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleXVwRXZlbnQ6IGZ1bmN0aW9uIGtleXVwRXZlbnQoZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLmlucHV0bWFzaztcbiAgICAgICAgICAgICAgICAhaW5wdXRtYXNrLmlzQ29tcG9zaW5nIHx8IGUua2V5Q29kZSAhPT0gX2tleWNvZGUuZGVmYXVsdC5LRVlfMjI5ICYmIGUua2V5Q29kZSAhPT0gX2tleWNvZGUuZGVmYXVsdC5FTlRFUiB8fCBpbnB1dG1hc2suJGVsLnRyaWdnZXIoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXN0ZUV2ZW50OiBmdW5jdGlvbiBwYXN0ZUV2ZW50KGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcy5pbnB1dG1hc2ssIG9wdHMgPSBpbnB1dG1hc2sub3B0cywgaW5wdXQgPSB0aGlzLCBpbnB1dFZhbHVlID0gaW5wdXRtYXNrLl92YWx1ZUdldCghMCksIGNhcmV0UG9zID0gX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCB0aGlzKSwgdGVtcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0bWFzay5pc1JUTCAmJiAodGVtcFZhbHVlID0gY2FyZXRQb3MuZW5kLCBjYXJldFBvcy5lbmQgPSBjYXJldFBvcy5iZWdpbiwgY2FyZXRQb3MuYmVnaW4gPSB0ZW1wVmFsdWUpO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUJlZm9yZUNhcmV0ID0gaW5wdXRWYWx1ZS5zdWJzdHIoMCwgY2FyZXRQb3MuYmVnaW4pLCB2YWx1ZUFmdGVyQ2FyZXQgPSBpbnB1dFZhbHVlLnN1YnN0cihjYXJldFBvcy5lbmQsIGlucHV0VmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVCZWZvcmVDYXJldCA9PSAoaW5wdXRtYXNrLmlzUlRMID8gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoaW5wdXRtYXNrKS5zbGljZSgpLnJldmVyc2UoKSA6IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykpLnNsaWNlKDAsIGNhcmV0UG9zLmJlZ2luKS5qb2luKFwiXCIpICYmICh2YWx1ZUJlZm9yZUNhcmV0ID0gXCJcIiksIFxuICAgICAgICAgICAgICAgIHZhbHVlQWZ0ZXJDYXJldCA9PSAoaW5wdXRtYXNrLmlzUlRMID8gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoaW5wdXRtYXNrKS5zbGljZSgpLnJldmVyc2UoKSA6IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykpLnNsaWNlKGNhcmV0UG9zLmVuZCkuam9pbihcIlwiKSAmJiAodmFsdWVBZnRlckNhcmV0ID0gXCJcIiksIFxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGlwYm9hcmREYXRhICYmIHdpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEpIGlucHV0VmFsdWUgPSB2YWx1ZUJlZm9yZUNhcmV0ICsgd2luZG93LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcIlRleHRcIikgKyB2YWx1ZUFmdGVyQ2FyZXQ7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWUuY2xpcGJvYXJkRGF0YSB8fCAhZS5jbGlwYm9hcmREYXRhLmdldERhdGEpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IHZhbHVlQmVmb3JlQ2FyZXQgKyBlLmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHQvcGxhaW5cIikgKyB2YWx1ZUFmdGVyQ2FyZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwYXN0ZVZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBvcHRzLm9uQmVmb3JlUGFzdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3RlVmFsdWUgPSBvcHRzLm9uQmVmb3JlUGFzdGUuY2FsbChpbnB1dG1hc2ssIGlucHV0VmFsdWUsIG9wdHMpLCAhMSA9PT0gcGFzdGVWYWx1ZSkgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcGFzdGVWYWx1ZSA9IHBhc3RlVmFsdWUgfHwgaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBfaW5wdXRIYW5kbGluZy5jaGVja1ZhbCkodGhpcywgITAsICExLCBwYXN0ZVZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoXCJcIiksIGUpLCBcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5wdXRGYWxsQmFja0V2ZW50OiBmdW5jdGlvbiBpbnB1dEZhbGxCYWNrRXZlbnQoZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLmlucHV0bWFzaywgb3B0cyA9IGlucHV0bWFzay5vcHRzLCAkID0gaW5wdXRtYXNrLmRlcGVuZGVuY3lMaWI7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaWVNb2JpbGVIYW5kbGVyKGlucHV0LCBpbnB1dFZhbHVlLCBjYXJldFBvcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2Vudmlyb25tZW50LmllbW9iaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXRDaGFyID0gaW5wdXRWYWx1ZS5yZXBsYWNlKF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLmpvaW4oXCJcIiksIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT09IGlucHV0Q2hhci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXYgPSBpbnB1dFZhbHVlLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl2LnNwbGljZShjYXJldFBvcy5iZWdpbiwgMCwgaW5wdXRDaGFyKSwgaW5wdXRWYWx1ZSA9IGl2LmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFuYWx5c2VDaGFuZ2VzKGlucHV0VmFsdWUsIGJ1ZmZlciwgY2FyZXRQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZnJvbnRQYXJ0ID0gaW5wdXRWYWx1ZS5zdWJzdHIoMCwgY2FyZXRQb3MuYmVnaW4pLnNwbGl0KFwiXCIpLCBiYWNrUGFydCA9IGlucHV0VmFsdWUuc3Vic3RyKGNhcmV0UG9zLmJlZ2luKS5zcGxpdChcIlwiKSwgZnJvbnRCdWZmZXJQYXJ0ID0gYnVmZmVyLnN1YnN0cigwLCBjYXJldFBvcy5iZWdpbikuc3BsaXQoXCJcIiksIGJhY2tCdWZmZXJQYXJ0ID0gYnVmZmVyLnN1YnN0cihjYXJldFBvcy5iZWdpbikuc3BsaXQoXCJcIiksIGZwbCA9IGZyb250UGFydC5sZW5ndGggPj0gZnJvbnRCdWZmZXJQYXJ0Lmxlbmd0aCA/IGZyb250UGFydC5sZW5ndGggOiBmcm9udEJ1ZmZlclBhcnQubGVuZ3RoLCBicGwgPSBiYWNrUGFydC5sZW5ndGggPj0gYmFja0J1ZmZlclBhcnQubGVuZ3RoID8gYmFja1BhcnQubGVuZ3RoIDogYmFja0J1ZmZlclBhcnQubGVuZ3RoLCBibCwgaSwgYWN0aW9uID0gXCJcIiwgZGF0YSA9IFtdLCBtYXJrZXIgPSBcIn5cIiwgcGxhY2Vob2xkZXI7IGZyb250UGFydC5sZW5ndGggPCBmcGw7ICkgZnJvbnRQYXJ0LnB1c2goXCJ+XCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDtmcm9udEJ1ZmZlclBhcnQubGVuZ3RoIDwgZnBsOyApIGZyb250QnVmZmVyUGFydC5wdXNoKFwiflwiKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7YmFja1BhcnQubGVuZ3RoIDwgYnBsOyApIGJhY2tQYXJ0LnVuc2hpZnQoXCJ+XCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDtiYWNrQnVmZmVyUGFydC5sZW5ndGggPCBicGw7ICkgYmFja0J1ZmZlclBhcnQudW5zaGlmdChcIn5cIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdCdWZmZXIgPSBmcm9udFBhcnQuY29uY2F0KGJhY2tQYXJ0KSwgb2xkQnVmZmVyID0gZnJvbnRCdWZmZXJQYXJ0LmNvbmNhdChiYWNrQnVmZmVyUGFydCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGJsID0gbmV3QnVmZmVyLmxlbmd0aDsgaSA8IGJsOyBpKyspIHN3aXRjaCAocGxhY2Vob2xkZXIgPSBfdmFsaWRhdGlvblRlc3RzLmdldFBsYWNlaG9sZGVyLmNhbGwoaW5wdXRtYXNrLCBfcG9zaXRpb25pbmcudHJhbnNsYXRlUG9zaXRpb24uY2FsbChpbnB1dG1hc2ssIGkpKSwgXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbnNlcnRUZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRCdWZmZXJbaSAtIDFdID09PSBuZXdCdWZmZXJbaV0gJiYgY2FyZXRQb3MuYmVnaW4gPT0gbmV3QnVmZmVyLmxlbmd0aCAtIDEgJiYgZGF0YS5wdXNoKG5ld0J1ZmZlcltpXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5zZXJ0UmVwbGFjZW1lbnRUZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIn5cIiA9PT0gbmV3QnVmZmVyW2ldID8gY2FyZXRQb3MuZW5kKysgOiBpID0gYmw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZWxldGVDb250ZW50QmFja3dhcmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiflwiID09PSBuZXdCdWZmZXJbaV0gPyBjYXJldFBvcy5lbmQrKyA6IGkgPSBibDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0J1ZmZlcltpXSAhPT0gb2xkQnVmZmVyW2ldICYmIChcIn5cIiAhPT0gbmV3QnVmZmVyW2kgKyAxXSAmJiBuZXdCdWZmZXJbaSArIDFdICE9PSBwbGFjZWhvbGRlciAmJiB2b2lkIDAgIT09IG5ld0J1ZmZlcltpICsgMV0gfHwgKG9sZEJ1ZmZlcltpXSAhPT0gcGxhY2Vob2xkZXIgfHwgXCJ+XCIgIT09IG9sZEJ1ZmZlcltpICsgMV0pICYmIFwiflwiICE9PSBvbGRCdWZmZXJbaV0gPyBcIn5cIiA9PT0gb2xkQnVmZmVyW2kgKyAxXSAmJiBvbGRCdWZmZXJbaV0gPT09IG5ld0J1ZmZlcltpICsgMV0gPyAoYWN0aW9uID0gXCJpbnNlcnRUZXh0XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKG5ld0J1ZmZlcltpXSksIGNhcmV0UG9zLmJlZ2luLS0sIGNhcmV0UG9zLmVuZC0tKSA6IG5ld0J1ZmZlcltpXSAhPT0gcGxhY2Vob2xkZXIgJiYgXCJ+XCIgIT09IG5ld0J1ZmZlcltpXSAmJiAoXCJ+XCIgPT09IG5ld0J1ZmZlcltpICsgMV0gfHwgb2xkQnVmZmVyW2ldICE9PSBuZXdCdWZmZXJbaV0gJiYgb2xkQnVmZmVyW2kgKyAxXSA9PT0gbmV3QnVmZmVyW2kgKyAxXSkgPyAoYWN0aW9uID0gXCJpbnNlcnRSZXBsYWNlbWVudFRleHRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2gobmV3QnVmZmVyW2ldKSwgY2FyZXRQb3MuYmVnaW4tLSkgOiBcIn5cIiA9PT0gbmV3QnVmZmVyW2ldID8gKGFjdGlvbiA9IFwiZGVsZXRlQ29udGVudEJhY2t3YXJkXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgIV9wb3NpdGlvbmluZy5pc01hc2suY2FsbChpbnB1dG1hc2ssIF9wb3NpdGlvbmluZy50cmFuc2xhdGVQb3NpdGlvbi5jYWxsKGlucHV0bWFzaywgaSksICEwKSAmJiBvbGRCdWZmZXJbaV0gIT09IG9wdHMucmFkaXhQb2ludCB8fCBjYXJldFBvcy5lbmQrKykgOiBpID0gYmwgOiAoYWN0aW9uID0gXCJpbnNlcnRUZXh0XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKG5ld0J1ZmZlcltpXSksIGNhcmV0UG9zLmJlZ2luLS0sIGNhcmV0UG9zLmVuZC0tKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGNhcmV0UG9zXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsIGlucHV0VmFsdWUgPSBpbnB1dC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSwgYnVmZmVyID0gKGlucHV0bWFzay5pc1JUTCA/IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLnNsaWNlKCkucmV2ZXJzZSgpIDogX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykpLmpvaW4oXCJcIiksIGNhcmV0UG9zID0gX3Bvc2l0aW9uaW5nLmNhcmV0LmNhbGwoaW5wdXRtYXNrLCBpbnB1dCwgdm9pZCAwLCB2b2lkIDAsICEwKTtcbiAgICAgICAgICAgICAgICBpZiAoYnVmZmVyICE9PSBpbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSBpZU1vYmlsZUhhbmRsZXIoaW5wdXQsIGlucHV0VmFsdWUsIGNhcmV0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoYW5nZXMgPSBhbmFseXNlQ2hhbmdlcyhpbnB1dFZhbHVlLCBidWZmZXIsIGNhcmV0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICgoaW5wdXQuaW5wdXRtYXNrLnNoYWRvd1Jvb3QgfHwgZG9jdW1lbnQpLmFjdGl2ZUVsZW1lbnQgIT09IGlucHV0ICYmIGlucHV0LmZvY3VzKCksIFxuICAgICAgICAgICAgICAgICAgICAoMCwgX2lucHV0SGFuZGxpbmcud3JpdGVCdWZmZXIpKGlucHV0LCBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKSksIFxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb25pbmcuY2FyZXQuY2FsbChpbnB1dG1hc2ssIGlucHV0LCBjYXJldFBvcy5iZWdpbiwgY2FyZXRQb3MuZW5kLCAhMCksIGNoYW5nZXMuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImluc2VydFRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5zZXJ0UmVwbGFjZW1lbnRUZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihlbnRyeSwgbmR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleXByZXNzID0gbmV3ICQuRXZlbnQoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlwcmVzcy53aGljaCA9IGVudHJ5LmNoYXJDb2RlQXQoMCksIGlucHV0bWFzay5pZ25vcmFibGUgPSAhMSwgRXZlbnRIYW5kbGVycy5rZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIGtleXByZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bWFzay4kZWwudHJpZ2dlcihcImtleXVwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZWxldGVDb250ZW50QmFja3dhcmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlkb3duID0gbmV3ICQuRXZlbnQoXCJrZXlkb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5ZG93bi5rZXlDb2RlID0gX2tleWNvZGUuZGVmYXVsdC5CQUNLU1BBQ0UsIEV2ZW50SGFuZGxlcnMua2V5ZG93bkV2ZW50LmNhbGwoaW5wdXQsIGtleWRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgKDAsIF9pbnB1dEhhbmRsaW5nLmFwcGx5SW5wdXRWYWx1ZSkoaW5wdXQsIGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wb3NpdGlvbmVuZEV2ZW50OiBmdW5jdGlvbiBjb21wb3NpdGlvbmVuZEV2ZW50KGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcy5pbnB1dG1hc2s7XG4gICAgICAgICAgICAgICAgaW5wdXRtYXNrLmlzQ29tcG9zaW5nID0gITEsIGlucHV0bWFzay4kZWwudHJpZ2dlcihcImlucHV0XCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbHVlRXZlbnQ6IGZ1bmN0aW9uIHNldFZhbHVlRXZlbnQoZSwgYXJndW1lbnRfMSwgYXJndW1lbnRfMikge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLmlucHV0bWFzaywgaW5wdXQgPSB0aGlzLCB2YWx1ZSA9IGUgJiYgZS5kZXRhaWwgPyBlLmRldGFpbFswXSA6IGFyZ3VtZW50XzE7XG4gICAgICAgICAgICAgICAgdm9pZCAwID09PSB2YWx1ZSAmJiAodmFsdWUgPSB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoITApKSwgKDAsIF9pbnB1dEhhbmRsaW5nLmFwcGx5SW5wdXRWYWx1ZSkodGhpcywgdmFsdWUpLCBcbiAgICAgICAgICAgICAgICAoZS5kZXRhaWwgJiYgdm9pZCAwICE9PSBlLmRldGFpbFsxXSB8fCB2b2lkIDAgIT09IGFyZ3VtZW50XzIpICYmIF9wb3NpdGlvbmluZy5jYXJldC5jYWxsKGlucHV0bWFzaywgdGhpcywgZS5kZXRhaWwgPyBlLmRldGFpbFsxXSA6IGFyZ3VtZW50XzIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvY3VzRXZlbnQ6IGZ1bmN0aW9uIGZvY3VzRXZlbnQoZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLmlucHV0bWFzaywgb3B0cyA9IGlucHV0bWFzay5vcHRzLCBpbnB1dCA9IHRoaXMsIG5wdFZhbHVlID0gdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XG4gICAgICAgICAgICAgICAgb3B0cy5zaG93TWFza09uRm9jdXMgJiYgbnB0VmFsdWUgIT09IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLmpvaW4oXCJcIikgJiYgKDAsIFxuICAgICAgICAgICAgICAgIF9pbnB1dEhhbmRsaW5nLndyaXRlQnVmZmVyKSh0aGlzLCBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKSwgX3Bvc2l0aW9uaW5nLnNlZWtOZXh0LmNhbGwoaW5wdXRtYXNrLCBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChpbnB1dG1hc2spKSksIFxuICAgICAgICAgICAgICAgICEwICE9PSBvcHRzLnBvc2l0aW9uQ2FyZXRPblRhYiB8fCAhMSAhPT0gaW5wdXRtYXNrLm1vdXNlRW50ZXIgfHwgX3ZhbGlkYXRpb24uaXNDb21wbGV0ZS5jYWxsKGlucHV0bWFzaywgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykpICYmIC0xICE9PSBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChpbnB1dG1hc2spIHx8IEV2ZW50SGFuZGxlcnMuY2xpY2tFdmVudC5hcHBseSh0aGlzLCBbIGUsICEwIF0pLCBcbiAgICAgICAgICAgICAgICBpbnB1dG1hc2sudW5kb1ZhbHVlID0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnZhbGlkRXZlbnQ6IGZ1bmN0aW9uIGludmFsaWRFdmVudChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dG1hc2sudmFsaWRhdGlvbkV2ZW50ID0gITA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW91c2VsZWF2ZUV2ZW50OiBmdW5jdGlvbiBtb3VzZWxlYXZlRXZlbnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMuaW5wdXRtYXNrLCBvcHRzID0gaW5wdXRtYXNrLm9wdHMsIGlucHV0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBpbnB1dG1hc2subW91c2VFbnRlciA9ICExLCBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmICh0aGlzLmlucHV0bWFzay5zaGFkb3dSb290IHx8IGRvY3VtZW50KS5hY3RpdmVFbGVtZW50ICE9PSB0aGlzICYmICgwLCBcbiAgICAgICAgICAgICAgICBfaW5wdXRIYW5kbGluZy5IYW5kbGVOYXRpdmVQbGFjZWhvbGRlcikodGhpcywgaW5wdXRtYXNrLm9yaWdpbmFsUGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsaWNrRXZlbnQ6IGZ1bmN0aW9uIGNsaWNrRXZlbnQoZSwgdGFiYmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMuaW5wdXRtYXNrLCBpbnB1dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmlucHV0bWFzay5zaGFkb3dSb290IHx8IGRvY3VtZW50KS5hY3RpdmVFbGVtZW50ID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdDYXJldFBvc2l0aW9uID0gX3Bvc2l0aW9uaW5nLmRldGVybWluZU5ld0NhcmV0UG9zaXRpb24uY2FsbChpbnB1dG1hc2ssIF9wb3NpdGlvbmluZy5jYXJldC5jYWxsKGlucHV0bWFzaywgdGhpcyksIHRhYmJlZCk7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gbmV3Q2FyZXRQb3NpdGlvbiAmJiBfcG9zaXRpb25pbmcuY2FyZXQuY2FsbChpbnB1dG1hc2ssIHRoaXMsIG5ld0NhcmV0UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXRFdmVudDogZnVuY3Rpb24gY3V0RXZlbnQoZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLmlucHV0bWFzaywgbWFza3NldCA9IGlucHV0bWFzay5tYXNrc2V0LCBpbnB1dCA9IHRoaXMsIHBvcyA9IF9wb3NpdGlvbmluZy5jYXJldC5jYWxsKGlucHV0bWFzaywgdGhpcyksIGNsaXBib2FyZERhdGEgPSB3aW5kb3cuY2xpcGJvYXJkRGF0YSB8fCBlLmNsaXBib2FyZERhdGEsIGNsaXBEYXRhID0gaW5wdXRtYXNrLmlzUlRMID8gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuc2xpY2UocG9zLmVuZCwgcG9zLmJlZ2luKSA6IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLnNsaWNlKHBvcy5iZWdpbiwgcG9zLmVuZCk7XG4gICAgICAgICAgICAgICAgY2xpcGJvYXJkRGF0YS5zZXREYXRhKFwidGV4dFwiLCBpbnB1dG1hc2suaXNSVEwgPyBjbGlwRGF0YS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IGNsaXBEYXRhLmpvaW4oXCJcIikpLCBcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCAmJiBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIiksIF92YWxpZGF0aW9uLmhhbmRsZVJlbW92ZS5jYWxsKGlucHV0bWFzaywgdGhpcywgX2tleWNvZGUuZGVmYXVsdC5ERUxFVEUsIHBvcyksIFxuICAgICAgICAgICAgICAgICgwLCBfaW5wdXRIYW5kbGluZy53cml0ZUJ1ZmZlcikodGhpcywgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzayksIG1hc2tzZXQucCwgZSwgaW5wdXRtYXNrLnVuZG9WYWx1ZSAhPT0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmx1ckV2ZW50OiBmdW5jdGlvbiBibHVyRXZlbnQoZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dG1hc2sgPSB0aGlzLmlucHV0bWFzaywgb3B0cyA9IGlucHV0bWFzay5vcHRzLCAkID0gaW5wdXRtYXNrLmRlcGVuZGVuY3lMaWIsICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dG1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIF9pbnB1dEhhbmRsaW5nLkhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyKSh0aGlzLCBpbnB1dG1hc2sub3JpZ2luYWxQbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBucHRWYWx1ZSA9IHRoaXMuaW5wdXRtYXNrLl92YWx1ZUdldCgpLCBidWZmZXIgPSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBucHRWYWx1ZSAmJiAob3B0cy5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiAoLTEgPT09IF9wb3NpdGlvbmluZy5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGlucHV0bWFzaykgJiYgbnB0VmFsdWUgPT09IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSA/IGJ1ZmZlciA9IFtdIDogX2lucHV0SGFuZGxpbmcuY2xlYXJPcHRpb25hbFRhaWwuY2FsbChpbnB1dG1hc2ssIGJ1ZmZlcikpLCBcbiAgICAgICAgICAgICAgICAgICAgITEgPT09IF92YWxpZGF0aW9uLmlzQ29tcGxldGUuY2FsbChpbnB1dG1hc2ssIGJ1ZmZlcikgJiYgKHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImluY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApLCBvcHRzLmNsZWFySW5jb21wbGV0ZSAmJiAoX3Bvc2l0aW9uaW5nLnJlc2V0TWFza1NldC5jYWxsKGlucHV0bWFzayksIGJ1ZmZlciA9IG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgPyBbXSA6IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykuc2xpY2UoKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgKDAsIF9pbnB1dEhhbmRsaW5nLndyaXRlQnVmZmVyKSh0aGlzLCBidWZmZXIsIHZvaWQgMCwgZSkpLCBpbnB1dG1hc2sudW5kb1ZhbHVlICE9PSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKS5qb2luKFwiXCIpICYmIChpbnB1dG1hc2sudW5kb1ZhbHVlID0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY2hhbmdlXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW91c2VlbnRlckV2ZW50OiBmdW5jdGlvbiBtb3VzZWVudGVyRXZlbnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMuaW5wdXRtYXNrLCBvcHRzID0gaW5wdXRtYXNrLm9wdHMsIGlucHV0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBpbnB1dG1hc2subW91c2VFbnRlciA9ICEwLCAodGhpcy5pbnB1dG1hc2suc2hhZG93Um9vdCB8fCBkb2N1bWVudCkuYWN0aXZlRWxlbWVudCAhPT0gdGhpcyAmJiAobnVsbCA9PSBpbnB1dG1hc2sub3JpZ2luYWxQbGFjZWhvbGRlciAmJiB0aGlzLnBsYWNlaG9sZGVyICE9PSBpbnB1dG1hc2sub3JpZ2luYWxQbGFjZWhvbGRlciAmJiAoaW5wdXRtYXNrLm9yaWdpbmFsUGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKSwgXG4gICAgICAgICAgICAgICAgb3B0cy5zaG93TWFza09uSG92ZXIgJiYgKDAsIF9pbnB1dEhhbmRsaW5nLkhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyKSh0aGlzLCAoaW5wdXRtYXNrLmlzUlRMID8gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoaW5wdXRtYXNrKS5zbGljZSgpLnJldmVyc2UoKSA6IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykpLmpvaW4oXCJcIikpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJtaXRFdmVudDogZnVuY3Rpb24gc3VibWl0RXZlbnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMuaW5wdXRtYXNrLCBvcHRzID0gaW5wdXRtYXNrLm9wdHM7XG4gICAgICAgICAgICAgICAgaW5wdXRtYXNrLnVuZG9WYWx1ZSAhPT0gX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSAmJiBpbnB1dG1hc2suJGVsLnRyaWdnZXIoXCJjaGFuZ2VcIiksIFxuICAgICAgICAgICAgICAgIG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgJiYgLTEgPT09IF9wb3NpdGlvbmluZy5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGlucHV0bWFzaykgJiYgaW5wdXRtYXNrLl92YWx1ZUdldCAmJiBpbnB1dG1hc2suX3ZhbHVlR2V0KCkgPT09IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykuam9pbihcIlwiKSAmJiBpbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpLCBcbiAgICAgICAgICAgICAgICBvcHRzLmNsZWFySW5jb21wbGV0ZSAmJiAhMSA9PT0gX3ZhbGlkYXRpb24uaXNDb21wbGV0ZS5jYWxsKGlucHV0bWFzaywgX3Bvc2l0aW9uaW5nLmdldEJ1ZmZlci5jYWxsKGlucHV0bWFzaykpICYmIGlucHV0bWFzay5fdmFsdWVTZXQoXCJcIiksIFxuICAgICAgICAgICAgICAgIG9wdHMucmVtb3ZlTWFza09uU3VibWl0ICYmIChpbnB1dG1hc2suX3ZhbHVlU2V0KGlucHV0bWFzay51bm1hc2tlZHZhbHVlKCksICEwKSwgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIF9pbnB1dEhhbmRsaW5nLndyaXRlQnVmZmVyKShpbnB1dG1hc2suZWwsIF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spKTtcbiAgICAgICAgICAgICAgICB9LCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXRFdmVudDogZnVuY3Rpb24gcmVzZXRFdmVudCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRtYXNrID0gdGhpcy5pbnB1dG1hc2s7XG4gICAgICAgICAgICAgICAgaW5wdXRtYXNrLnJlZnJlc2hWYWx1ZSA9ICEwLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAoMCwgX2lucHV0SGFuZGxpbmcuYXBwbHlJbnB1dFZhbHVlKShpbnB1dG1hc2suZWwsIGlucHV0bWFzay5fdmFsdWVHZXQoITApKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZXhwb3J0cy5FdmVudEhhbmRsZXJzID0gRXZlbnRIYW5kbGVycztcbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgIH0pLCBleHBvcnRzLmlwaG9uZSA9IGV4cG9ydHMuaWVtb2JpbGUgPSBleHBvcnRzLm1vYmlsZSA9IGV4cG9ydHMuaWUgPSBleHBvcnRzLnVhID0gdm9pZCAwO1xuICAgICAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50IHx8IFwiXCIsIGllID0gMCA8IHVhLmluZGV4T2YoXCJNU0lFIFwiKSB8fCAwIDwgdWEuaW5kZXhPZihcIlRyaWRlbnQvXCIpLCBtb2JpbGUgPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdywgaWVtb2JpbGUgPSAvaWVtb2JpbGUvaS50ZXN0KHVhKSwgaXBob25lID0gL2lwaG9uZS9pLnRlc3QodWEpICYmICFpZW1vYmlsZTtcbiAgICAgICAgZXhwb3J0cy5pcGhvbmUgPSBpcGhvbmUsIGV4cG9ydHMuaWVtb2JpbGUgPSBpZW1vYmlsZSwgZXhwb3J0cy5tb2JpbGUgPSBtb2JpbGUsIGV4cG9ydHMuaWUgPSBpZSwgXG4gICAgICAgIGV4cG9ydHMudWEgPSB1YTtcbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgIH0pLCBleHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG4gICAgICAgIHZhciBfZXh0ZW5kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKSksIF93aW5kb3cgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oNikpLCBfZGF0YSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygxNykpLCBfZXZlbnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZG9jdW1lbnQgPSBfd2luZG93LmRlZmF1bHQuZG9jdW1lbnQ7XG4gICAgICAgIGZ1bmN0aW9uIERlcGVuZGVuY3lMaWIoZWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW0gaW5zdGFuY2VvZiBEZXBlbmRlbmN5TGliID8gZWxlbSA6IHRoaXMgaW5zdGFuY2VvZiBEZXBlbmRlbmN5TGliID8gdm9pZCAobnVsbCAhPSBlbGVtICYmIGVsZW0gIT09IF93aW5kb3cuZGVmYXVsdCAmJiAodGhpc1swXSA9IGVsZW0ubm9kZU5hbWUgPyBlbGVtIDogdm9pZCAwICE9PSBlbGVtWzBdICYmIGVsZW1bMF0ubm9kZU5hbWUgPyBlbGVtWzBdIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtKSwgXG4gICAgICAgICAgICB2b2lkIDAgIT09IHRoaXNbMF0gJiYgbnVsbCAhPT0gdGhpc1swXSAmJiAodGhpc1swXS5ldmVudFJlZ2lzdHJ5ID0gdGhpc1swXS5ldmVudFJlZ2lzdHJ5IHx8IHt9KSkpIDogbmV3IERlcGVuZGVuY3lMaWIoZWxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgRGVwZW5kZW5jeUxpYi5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBvbjogX2V2ZW50cy5vbixcbiAgICAgICAgICAgIG9mZjogX2V2ZW50cy5vZmYsXG4gICAgICAgICAgICB0cmlnZ2VyOiBfZXZlbnRzLnRyaWdnZXJcbiAgICAgICAgfSwgRGVwZW5kZW5jeUxpYi5leHRlbmQgPSBfZXh0ZW5kLmRlZmF1bHQsIERlcGVuZGVuY3lMaWIuZGF0YSA9IF9kYXRhLmRlZmF1bHQsIERlcGVuZGVuY3lMaWIuRXZlbnQgPSBfZXZlbnRzLkV2ZW50O1xuICAgICAgICB2YXIgX2RlZmF1bHQgPSBEZXBlbmRlbmN5TGliO1xuICAgICAgICBleHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgICAgICAgICB9IDogZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgICAgICAgICAgfSwgX3R5cGVvZihvYmopO1xuICAgICAgICB9XG4gICAgICAgIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YgPSBcIm9iamVjdFwiID09PSBfdHlwZW9mKFwidGVzdFwiLl9fcHJvdG9fXykgPyBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QuX19wcm90b19fO1xuICAgICAgICB9IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICB9KSwgZXhwb3J0cy5tYXNrID0gbWFzaywgX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG4gICAgICAgIHZhciBfa2V5Y29kZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygwKSksIF9wb3NpdGlvbmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMiksIF9pbnB1dEhhbmRsaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KSwgX2V2ZW50cnVsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSwgX2Vudmlyb25tZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KSwgX3ZhbGlkYXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLCBfZXZlbnRoYW5kbGVycyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtYXNrKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0bWFzayA9IHRoaXMsIG9wdHMgPSB0aGlzLm9wdHMsIGVsID0gdGhpcy5lbCwgJCA9IHRoaXMuZGVwZW5kZW5jeUxpYjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzRWxlbWVudFR5cGVTdXBwb3J0ZWQoaW5wdXQsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYXRjaFZhbHVlUHJvcGVydHkobnB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUdldCwgdmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhdGNoVmFsaG9vayh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC52YWxIb29rcyAmJiAodm9pZCAwID09PSAkLnZhbEhvb2tzW3R5cGVdIHx8ICEwICE9PSAkLnZhbEhvb2tzW3R5cGVdLmlucHV0bWFza3BhdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWxob29rR2V0ID0gJC52YWxIb29rc1t0eXBlXSAmJiAkLnZhbEhvb2tzW3R5cGVdLmdldCA/ICQudmFsSG9va3NbdHlwZV0uZ2V0IDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB2YWxob29rU2V0ID0gJC52YWxIb29rc1t0eXBlXSAmJiAkLnZhbEhvb2tzW3R5cGVdLnNldCA/ICQudmFsSG9va3NbdHlwZV0uc2V0IDogZnVuY3Rpb24oZWxlbSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0udmFsdWUgPSB2YWx1ZSwgZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQudmFsSG9va3NbdHlwZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLmlucHV0bWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2spIHJldHVybiBlbGVtLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbGhvb2tHZXQoZWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xICE9PSBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChpbnB1dG1hc2ssIHZvaWQgMCwgdm9pZCAwLCBlbGVtLmlucHV0bWFzay5tYXNrc2V0LnZhbGlkUG9zaXRpb25zKSB8fCAhMCAhPT0gb3B0cy5udWxsYWJsZSA/IHJlc3VsdCA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaG9va0dldChlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoZWxlbSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWxob29rU2V0KGVsZW0sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmlucHV0bWFzayAmJiAoMCwgX2lucHV0SGFuZGxpbmcuYXBwbHlJbnB1dFZhbHVlKShlbGVtLCB2YWx1ZSksIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRtYXNrcGF0Y2g6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXR0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dG1hc2sgPyB0aGlzLmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2sgPyB0aGlzLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkgOiAtMSAhPT0gX3Bvc2l0aW9uaW5nLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwoaW5wdXRtYXNrKSB8fCAhMCAhPT0gb3B0cy5udWxsYWJsZSA/ICh0aGlzLmlucHV0bWFzay5zaGFkb3dSb290IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB0aGlzICYmIG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgPyAoaW5wdXRtYXNrLmlzUlRMID8gX2lucHV0SGFuZGxpbmcuY2xlYXJPcHRpb25hbFRhaWwuY2FsbChpbnB1dG1hc2ssIF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLnNsaWNlKCkpLnJldmVyc2UoKSA6IF9pbnB1dEhhbmRsaW5nLmNsZWFyT3B0aW9uYWxUYWlsLmNhbGwoaW5wdXRtYXNrLCBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKS5zbGljZSgpKSkuam9pbihcIlwiKSA6IHZhbHVlR2V0LmNhbGwodGhpcykgOiBcIlwiIDogdmFsdWVHZXQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXR0ZXIodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgdmFsdWUpLCB0aGlzLmlucHV0bWFzayAmJiAoMCwgX2lucHV0SGFuZGxpbmcuYXBwbHlJbnB1dFZhbHVlKSh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5zdGFsbE5hdGl2ZVZhbHVlU2V0RmFsbGJhY2sobnB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKG5wdCwgXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsIHZhbHVlID0gdGhpcy5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSAhPT0gKGlucHV0bWFzay5pc1JUTCA/IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spLnJldmVyc2UoKSA6IF9wb3NpdGlvbmluZy5nZXRCdWZmZXIuY2FsbChpbnB1dG1hc2spKS5qb2luKFwiXCIpICYmICgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5wdXRIYW5kbGluZy5hcHBseUlucHV0VmFsdWUpKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0LmlucHV0bWFzay5fX3ZhbHVlR2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgIT09IG9wdHMubm9WYWx1ZVBhdGNoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihucHQpLCBcInZhbHVlXCIpIDogdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVByb3BlcnR5ICYmIHZhbHVlUHJvcGVydHkuZ2V0ICYmIHZhbHVlUHJvcGVydHkuc2V0ID8gKHZhbHVlR2V0ID0gdmFsdWVQcm9wZXJ0eS5nZXQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldCA9IHZhbHVlUHJvcGVydHkuc2V0LCBPYmplY3QuZGVmaW5lUHJvcGVydHkobnB0LCBcInZhbHVlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA6IFwiaW5wdXRcIiAhPT0gbnB0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAmJiAodmFsdWVHZXQgPSBmdW5jdGlvbiB2YWx1ZUdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB2YWx1ZVNldCA9IGZ1bmN0aW9uIHZhbHVlU2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucHQsIFwidmFsdWVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IHNldHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fICYmIG5wdC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIikgJiYgKHZhbHVlR2V0ID0gbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQgPSBucHQuX19sb29rdXBTZXR0ZXJfXyhcInZhbHVlXCIpLCBucHQuX19kZWZpbmVHZXR0ZXJfXyhcInZhbHVlXCIsIGdldHRlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgc2V0dGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnB0LmlucHV0bWFzay5fX3ZhbHVlR2V0ID0gdmFsdWVHZXQsIG5wdC5pbnB1dG1hc2suX192YWx1ZVNldCA9IHZhbHVlU2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0LmlucHV0bWFzay5fdmFsdWVHZXQgPSBmdW5jdGlvbihvdmVycnVsZVJUTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dG1hc2suaXNSVEwgJiYgITAgIT09IG92ZXJydWxlUlRMID8gdmFsdWVHZXQuY2FsbCh0aGlzLmVsKS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IHZhbHVlR2V0LmNhbGwodGhpcy5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBucHQuaW5wdXRtYXNrLl92YWx1ZVNldCA9IGZ1bmN0aW9uKHZhbHVlLCBvdmVycnVsZVJUTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcy5lbCwgbnVsbCA9PSB2YWx1ZSA/IFwiXCIgOiAhMCAhPT0gb3ZlcnJ1bGVSVEwgJiYgaW5wdXRtYXNrLmlzUlRMID8gdmFsdWUuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB2b2lkIDAgPT09IHZhbHVlR2V0ICYmICh2YWx1ZUdldCA9IGZ1bmN0aW9uIHZhbHVlR2V0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsdWVTZXQgPSBmdW5jdGlvbiB2YWx1ZVNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHBhdGNoVmFsaG9vayhucHQudHlwZSksIGluc3RhbGxOYXRpdmVWYWx1ZVNldEZhbGxiYWNrKG5wdCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFwidGV4dGFyZWFcIiAhPT0gaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICYmIG9wdHMuaWdub3JhYmxlcy5wdXNoKF9rZXljb2RlLmRlZmF1bHQuRU5URVIpO1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZShcInR5cGVcIiksIGlzU3VwcG9ydGVkID0gXCJpbnB1dFwiID09PSBpbnB1dC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgJiYgb3B0cy5zdXBwb3J0c0lucHV0VHlwZS5pbmNsdWRlcyhlbGVtZW50VHlwZSkgfHwgaW5wdXQuaXNDb250ZW50RWRpdGFibGUgfHwgXCJ0ZXh0YXJlYVwiID09PSBpbnB1dC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkgaWYgKFwiaW5wdXRcIiA9PT0gaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBlbGVtZW50VHlwZSksIGlzU3VwcG9ydGVkID0gXCJ0ZXh0XCIgPT09IGVsLnR5cGUsIGVsID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaXNTdXBwb3J0ZWQgPSBcInBhcnRpYWxcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gITEgIT09IGlzU3VwcG9ydGVkID8gcGF0Y2hWYWx1ZVByb3BlcnR5KGlucHV0KSA6IGlucHV0LmlucHV0bWFzayA9IHZvaWQgMCwgXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9mZihlbCk7XG4gICAgICAgICAgICB2YXIgaXNTdXBwb3J0ZWQgPSBpc0VsZW1lbnRUeXBlU3VwcG9ydGVkKGVsLCBvcHRzKTtcbiAgICAgICAgICAgIGlmICghMSAhPT0gaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBpbnB1dG1hc2sub3JpZ2luYWxQbGFjZWhvbGRlciA9IGVsLnBsYWNlaG9sZGVyLCBpbnB1dG1hc2subWF4TGVuZ3RoID0gdm9pZCAwICE9PSBlbCA/IGVsLm1heExlbmd0aCA6IHZvaWQgMCwgXG4gICAgICAgICAgICAgICAgLTEgPT09IGlucHV0bWFzay5tYXhMZW5ndGggJiYgKGlucHV0bWFzay5tYXhMZW5ndGggPSB2b2lkIDApLCBcImlucHV0TW9kZVwiIGluIGVsICYmIG51bGwgPT09IGVsLmdldEF0dHJpYnV0ZShcImlucHV0bW9kZVwiKSAmJiAoZWwuaW5wdXRNb2RlID0gb3B0cy5pbnB1dG1vZGUsIFxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImlucHV0bW9kZVwiLCBvcHRzLmlucHV0bW9kZSkpLCAhMCA9PT0gaXNTdXBwb3J0ZWQgJiYgKG9wdHMuc2hvd01hc2tPbkZvY3VzID0gb3B0cy5zaG93TWFza09uRm9jdXMgJiYgLTEgPT09IFsgXCJjYy1udW1iZXJcIiwgXCJjYy1leHBcIiBdLmluZGV4T2YoZWwuYXV0b2NvbXBsZXRlKSwgXG4gICAgICAgICAgICAgICAgX2Vudmlyb25tZW50LmlwaG9uZSAmJiAob3B0cy5pbnNlcnRNb2RlVmlzdWFsID0gITEpLCBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcInN1Ym1pdFwiLCBfZXZlbnRoYW5kbGVycy5FdmVudEhhbmRsZXJzLnN1Ym1pdEV2ZW50KSwgXG4gICAgICAgICAgICAgICAgX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vbihlbCwgXCJyZXNldFwiLCBfZXZlbnRoYW5kbGVycy5FdmVudEhhbmRsZXJzLnJlc2V0RXZlbnQpLCBcbiAgICAgICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcImJsdXJcIiwgX2V2ZW50aGFuZGxlcnMuRXZlbnRIYW5kbGVycy5ibHVyRXZlbnQpLCBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcImZvY3VzXCIsIF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMuZm9jdXNFdmVudCksIFxuICAgICAgICAgICAgICAgIF9ldmVudHJ1bGVyLkV2ZW50UnVsZXIub24oZWwsIFwiaW52YWxpZFwiLCBfZXZlbnRoYW5kbGVycy5FdmVudEhhbmRsZXJzLmludmFsaWRFdmVudCksIFxuICAgICAgICAgICAgICAgIF9ldmVudHJ1bGVyLkV2ZW50UnVsZXIub24oZWwsIFwiY2xpY2tcIiwgX2V2ZW50aGFuZGxlcnMuRXZlbnRIYW5kbGVycy5jbGlja0V2ZW50KSwgXG4gICAgICAgICAgICAgICAgX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vbihlbCwgXCJtb3VzZWxlYXZlXCIsIF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMubW91c2VsZWF2ZUV2ZW50KSwgXG4gICAgICAgICAgICAgICAgX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vbihlbCwgXCJtb3VzZWVudGVyXCIsIF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMubW91c2VlbnRlckV2ZW50KSwgXG4gICAgICAgICAgICAgICAgX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vbihlbCwgXCJwYXN0ZVwiLCBfZXZlbnRoYW5kbGVycy5FdmVudEhhbmRsZXJzLnBhc3RlRXZlbnQpLCBcbiAgICAgICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcImN1dFwiLCBfZXZlbnRoYW5kbGVycy5FdmVudEhhbmRsZXJzLmN1dEV2ZW50KSwgX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vbihlbCwgXCJjb21wbGV0ZVwiLCBvcHRzLm9uY29tcGxldGUpLCBcbiAgICAgICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcImluY29tcGxldGVcIiwgb3B0cy5vbmluY29tcGxldGUpLCBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcImNsZWFyZWRcIiwgb3B0cy5vbmNsZWFyZWQpLCBcbiAgICAgICAgICAgICAgICAhMCAhPT0gb3B0cy5pbnB1dEV2ZW50T25seSAmJiAoX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vbihlbCwgXCJrZXlkb3duXCIsIF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMua2V5ZG93bkV2ZW50KSwgXG4gICAgICAgICAgICAgICAgX2V2ZW50cnVsZXIuRXZlbnRSdWxlci5vbihlbCwgXCJrZXlwcmVzc1wiLCBfZXZlbnRoYW5kbGVycy5FdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQpLCBcbiAgICAgICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcImtleXVwXCIsIF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMua2V5dXBFdmVudCkpLCBcbiAgICAgICAgICAgICAgICAoX2Vudmlyb25tZW50Lm1vYmlsZSB8fCBvcHRzLmlucHV0RXZlbnRPbmx5KSAmJiBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJtYXhMZW5ndGhcIiksIFxuICAgICAgICAgICAgICAgIF9ldmVudHJ1bGVyLkV2ZW50UnVsZXIub24oZWwsIFwiaW5wdXRcIiwgX2V2ZW50aGFuZGxlcnMuRXZlbnRIYW5kbGVycy5pbnB1dEZhbGxCYWNrRXZlbnQpLCBcbiAgICAgICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcImNvbXBvc2l0aW9uZW5kXCIsIF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMuY29tcG9zaXRpb25lbmRFdmVudCkpLCBcbiAgICAgICAgICAgICAgICBfZXZlbnRydWxlci5FdmVudFJ1bGVyLm9uKGVsLCBcInNldHZhbHVlXCIsIF9ldmVudGhhbmRsZXJzLkV2ZW50SGFuZGxlcnMuc2V0VmFsdWVFdmVudCksIFxuICAgICAgICAgICAgICAgIGlucHV0bWFzay51bmRvVmFsdWUgPSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChpbnB1dG1hc2spLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSAoZWwuaW5wdXRtYXNrLnNoYWRvd1Jvb3QgfHwgZG9jdW1lbnQpLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IGVsLmlucHV0bWFzay5fdmFsdWVHZXQoITApIHx8ICExID09PSBvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzIHx8IGFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICgwLCBfaW5wdXRIYW5kbGluZy5hcHBseUlucHV0VmFsdWUpKGVsLCBlbC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXIgPSBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyLmNhbGwoaW5wdXRtYXNrKS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAhMSA9PT0gX3ZhbGlkYXRpb24uaXNDb21wbGV0ZS5jYWxsKGlucHV0bWFzaywgYnVmZmVyKSAmJiBvcHRzLmNsZWFySW5jb21wbGV0ZSAmJiBfcG9zaXRpb25pbmcucmVzZXRNYXNrU2V0LmNhbGwoaW5wdXRtYXNrKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgJiYgYWN0aXZlRWxlbWVudCAhPT0gZWwgJiYgKC0xID09PSBfcG9zaXRpb25pbmcuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChpbnB1dG1hc2spID8gYnVmZmVyID0gW10gOiBfaW5wdXRIYW5kbGluZy5jbGVhck9wdGlvbmFsVGFpbC5jYWxsKGlucHV0bWFzaywgYnVmZmVyKSksIFxuICAgICAgICAgICAgICAgICAgICAoITEgPT09IG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgfHwgb3B0cy5zaG93TWFza09uRm9jdXMgJiYgYWN0aXZlRWxlbWVudCA9PT0gZWwgfHwgXCJcIiAhPT0gZWwuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkpICYmICgwLCBcbiAgICAgICAgICAgICAgICAgICAgX2lucHV0SGFuZGxpbmcud3JpdGVCdWZmZXIpKGVsLCBidWZmZXIpLCBhY3RpdmVFbGVtZW50ID09PSBlbCAmJiBfcG9zaXRpb25pbmcuY2FyZXQuY2FsbChpbnB1dG1hc2ssIGVsLCBfcG9zaXRpb25pbmcuc2Vla05leHQuY2FsbChpbnB1dG1hc2ssIF9wb3NpdGlvbmluZy5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGlucHV0bWFzaykpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgIH0pLCBleHBvcnRzLkV2ZW50UnVsZXIgPSB2b2lkIDA7XG4gICAgICAgIHZhciBfaW5wdXRtYXNrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSwgX2tleWNvZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMCkpLCBfcG9zaXRpb25pbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLCBfaW5wdXRIYW5kbGluZyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgRXZlbnRSdWxlciA9IHtcbiAgICAgICAgICAgIG9uOiBmdW5jdGlvbiBvbihpbnB1dCwgZXZlbnROYW1lLCBldmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCA9IGlucHV0LmlucHV0bWFzay5kZXBlbmRlbmN5TGliLCBldiA9IGZ1bmN0aW9uIGV2KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5vcmlnaW5hbEV2ZW50ICYmIChlID0gZS5vcmlnaW5hbEV2ZW50IHx8IGUsIGFyZ3VtZW50c1swXSA9IGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGFyZ3MsIGlucHV0bWFzayA9IHRoYXQuaW5wdXRtYXNrLCBvcHRzID0gaW5wdXRtYXNrID8gaW5wdXRtYXNrLm9wdHMgOiB2b2lkIDAsICQgPSBpbnB1dG1hc2suZGVwZW5kZW5jeUxpYjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gaW5wdXRtYXNrICYmIFwiRk9STVwiICE9PSB0aGlzLm5vZGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1PcHRzID0gJC5kYXRhKHRoYXQsIFwiX2lucHV0bWFza19vcHRzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGF0KS5vZmYoKSwgaW1PcHRzICYmIG5ldyBfaW5wdXRtYXNrLmRlZmF1bHQoaW1PcHRzKS5tYXNrKHRoYXQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwic2V0dmFsdWVcIiA9PT0gZS50eXBlIHx8IFwiRk9STVwiID09PSB0aGlzLm5vZGVOYW1lIHx8ICEodGhhdC5kaXNhYmxlZCB8fCB0aGF0LnJlYWRPbmx5ICYmICEoXCJrZXlkb3duXCIgPT09IGUudHlwZSAmJiBlLmN0cmxLZXkgJiYgNjcgPT09IGUua2V5Q29kZSB8fCAhMSA9PT0gb3B0cy50YWJUaHJvdWdoICYmIGUua2V5Q29kZSA9PT0gX2tleWNvZGUuZGVmYXVsdC5UQUIpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBpbnB1dG1hc2suc2tpcElucHV0RXZlbnQgfHwgZS5pbnB1dFR5cGUgJiYgXCJpbnNlcnRDb21wb3NpdGlvblRleHRcIiA9PT0gZS5pbnB1dFR5cGUpIHJldHVybiBpbnB1dG1hc2suc2tpcElucHV0RXZlbnQgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrZXlkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bWFzay5za2lwS2V5UHJlc3NFdmVudCA9ICExLCBpbnB1dG1hc2suc2tpcElucHV0RXZlbnQgPSBpbnB1dG1hc2suaXNDb21wb3NpbmcgPSBlLmtleUNvZGUgPT09IF9rZXljb2RlLmRlZmF1bHQuS0VZXzIyOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJrZXl1cFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbXBvc2l0aW9uZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bWFzay5pc0NvbXBvc2luZyAmJiAoaW5wdXRtYXNrLnNraXBJbnB1dEV2ZW50ID0gITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImtleXByZXNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gaW5wdXRtYXNrLnNraXBLZXlQcmVzc0V2ZW50KSByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dG1hc2suc2tpcEtleVByZXNzRXZlbnQgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGlja1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvY3VzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dG1hc2sudmFsaWRhdGlvbkV2ZW50ID8gKGlucHV0bWFzay52YWxpZGF0aW9uRXZlbnQgPSAhMSwgaW5wdXQuYmx1cigpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIF9pbnB1dEhhbmRsaW5nLkhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyKShpbnB1dCwgKGlucHV0bWFzay5pc1JUTCA/IF9wb3NpdGlvbmluZy5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGlucHV0bWFzaykuc2xpY2UoKS5yZXZlcnNlKCkgOiBfcG9zaXRpb25pbmcuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChpbnB1dG1hc2spKS5qb2luKFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAzZTMpKSA6IChhcmdzID0gYXJndW1lbnRzLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuaW5wdXRtYXNrICYmIGV2ZW50SGFuZGxlci5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCkpLCAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbCA9IGV2ZW50SGFuZGxlci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMSA9PT0gcmV0dXJuVmFsICYmIChlLnByZXZlbnREZWZhdWx0KCksIGUuc3RvcFByb3BhZ2F0aW9uKCkpLCByZXR1cm5WYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXSA9IGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnROYW1lXSB8fCBbXSwgaW5wdXQuaW5wdXRtYXNrLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZXYpLCBcbiAgICAgICAgICAgICAgICBbIFwic3VibWl0XCIsIFwicmVzZXRcIiBdLmluY2x1ZGVzKGV2ZW50TmFtZSkgPyBudWxsICE9PSBpbnB1dC5mb3JtICYmICQoaW5wdXQuZm9ybSkub24oZXZlbnROYW1lLCBldi5iaW5kKGlucHV0KSkgOiAkKGlucHV0KS5vbihldmVudE5hbWUsIGV2KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvZmY6IGZ1bmN0aW9uIG9mZihpbnB1dCwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuaW5wdXRtYXNrICYmIGlucHV0LmlucHV0bWFzay5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICQgPSBpbnB1dC5pbnB1dG1hc2suZGVwZW5kZW5jeUxpYiwgZXZlbnRzID0gaW5wdXQuaW5wdXRtYXNrLmV2ZW50cztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZXZlbnROYW1lIGluIGV2ZW50ICYmIChldmVudHMgPSBbXSwgZXZlbnRzW2V2ZW50XSA9IGlucHV0LmlucHV0bWFzay5ldmVudHNbZXZlbnRdKSwgXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZXZBcnIgPSBldmVudHNbZXZlbnROYW1lXTsgMCA8IGV2QXJyLmxlbmd0aDsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ID0gZXZBcnIucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWyBcInN1Ym1pdFwiLCBcInJlc2V0XCIgXS5pbmNsdWRlcyhldmVudE5hbWUpID8gbnVsbCAhPT0gaW5wdXQuZm9ybSAmJiAkKGlucHV0LmZvcm0pLm9mZihldmVudE5hbWUsIGV2KSA6ICQoaW5wdXQpLm9mZihldmVudE5hbWUsIGV2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5pbnB1dG1hc2suZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGV4cG9ydHMuRXZlbnRSdWxlciA9IEV2ZW50UnVsZXI7XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgICAgICAgICAgfSA6IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICAgICAgICAgIH0sIF90eXBlb2Yob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSwgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGRlZXAgPSAhMTtcbiAgICAgICAgICAgIGZvciAoXCJib29sZWFuXCIgPT0gdHlwZW9mIHRhcmdldCAmJiAoZGVlcCA9IHRhcmdldCwgdGFyZ2V0ID0gYXJndW1lbnRzW2ldIHx8IHt9LCBcbiAgICAgICAgICAgIGkrKyksIFwib2JqZWN0XCIgIT09IF90eXBlb2YodGFyZ2V0KSAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIHRhcmdldCAmJiAodGFyZ2V0ID0ge30pOyBpIDwgbGVuZ3RoOyBpKyspIGlmIChudWxsICE9IChvcHRpb25zID0gYXJndW1lbnRzW2ldKSkgZm9yIChuYW1lIGluIG9wdGlvbnMpIHNyYyA9IHRhcmdldFtuYW1lXSwgXG4gICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1tuYW1lXSwgdGFyZ2V0ICE9PSBjb3B5ICYmIChkZWVwICYmIGNvcHkgJiYgKFwiW29iamVjdCBPYmplY3RdXCIgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGNvcHkpKSkgPyAoY2xvbmUgPSBjb3B5SXNBcnJheSA/IChjb3B5SXNBcnJheSA9ICExLCBcbiAgICAgICAgICAgIHNyYyAmJiBBcnJheS5pc0FycmF5KHNyYykgPyBzcmMgOiBbXSkgOiBzcmMgJiYgXCJbb2JqZWN0IE9iamVjdF1cIiA9PT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNyYykgPyBzcmMgOiB7fSwgXG4gICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpKSA6IHZvaWQgMCAhPT0gY29weSAmJiAodGFyZ2V0W25hbWVdID0gY29weSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICB9KSwgZXhwb3J0cy5kZWZhdWx0ID0gZXh0ZW5kO1xuICAgIH0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgfSksIGV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuICAgICAgICB2YXIgZXNjYXBlUmVnZXhSZWdleCA9IG5ldyBSZWdFeHAoXCIoXFxcXFwiICsgWyBcIi9cIiwgXCIuXCIsIFwiKlwiLCBcIitcIiwgXCI/XCIsIFwifFwiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBcIlxcXFxcIiwgXCIkXCIsIFwiXlwiIF0uam9pbihcInxcXFxcXCIpICsgXCIpXCIsIFwiZ2ltXCIpO1xuICAgICAgICBmdW5jdGlvbiBfZGVmYXVsdChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShlc2NhcGVSZWdleFJlZ2V4LCBcIlxcXFwkMVwiKTtcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgfSksIGV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMCwgX193ZWJwYWNrX3JlcXVpcmVfXygxNiksIF9fd2VicGFja19yZXF1aXJlX18oMjIpLCBcbiAgICAgICAgX193ZWJwYWNrX3JlcXVpcmVfXygyMyksIF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuICAgICAgICB2YXIgX2lucHV0bWFzazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMSkpO1xuICAgICAgICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9kZWZhdWx0ID0gX2lucHV0bWFzazIuZGVmYXVsdDtcbiAgICAgICAgZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgX2lucHV0bWFzayA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXygxKSk7XG4gICAgICAgIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBfaW5wdXRtYXNrLmRlZmF1bHQuZXh0ZW5kRGVmaW5pdGlvbnMoe1xuICAgICAgICAgICAgQToge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS16XFx1MDQxMC1cXHUwNDRmXFx1MDQwMVxcdTA0NTFcXHhjMC1cXHhmZlxceGI1XVwiLFxuICAgICAgICAgICAgICAgIGNhc2luZzogXCJ1cHBlclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCImXCI6IHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEtelxcdTA0MTAtXFx1MDQ0ZlxcdTA0MDFcXHUwNDUxXFx4YzAtXFx4ZmZcXHhiNV1cIixcbiAgICAgICAgICAgICAgICBjYXNpbmc6IFwidXBwZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiI1wiOiB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLUZhLWZdXCIsXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpcFZhbGlkYXRvclJlZ2V4ID0gbmV3IFJlZ0V4cChcIjI1WzAtNV18MlswLTRdWzAtOV18WzAxXVswLTldWzAtOV1cIik7XG4gICAgICAgIGZ1bmN0aW9uIGlwVmFsaWRhdG9yKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hycyA9IC0xIDwgcG9zIC0gMSAmJiBcIi5cIiAhPT0gbWFza3NldC5idWZmZXJbcG9zIC0gMV0gPyAoY2hycyA9IG1hc2tzZXQuYnVmZmVyW3BvcyAtIDFdICsgY2hycywgXG4gICAgICAgICAgICAtMSA8IHBvcyAtIDIgJiYgXCIuXCIgIT09IG1hc2tzZXQuYnVmZmVyW3BvcyAtIDJdID8gbWFza3NldC5idWZmZXJbcG9zIC0gMl0gKyBjaHJzIDogXCIwXCIgKyBjaHJzKSA6IFwiMDBcIiArIGNocnMsIFxuICAgICAgICAgICAgaXBWYWxpZGF0b3JSZWdleC50ZXN0KGNocnMpO1xuICAgICAgICB9XG4gICAgICAgIF9pbnB1dG1hc2suZGVmYXVsdC5leHRlbmRBbGlhc2VzKHtcbiAgICAgICAgICAgIGNzc3VuaXQ6IHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJbKy1dP1swLTldK1xcXFwuPyhbMC05XSspPyhweHxlbXxyZW18ZXh8JXxpbnxjbXxtbXxwdHxwYylcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVybDoge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihodHRwcz98ZnRwKTovLy4qXCIsXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogITEsXG4gICAgICAgICAgICAgICAga2VlcFN0YXRpYzogITEsXG4gICAgICAgICAgICAgICAgdGFiVGhyb3VnaDogITBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpcDoge1xuICAgICAgICAgICAgICAgIG1hc2s6IFwiaVtpW2ldXS5qW2pbal1dLmtba1trXV0ubFtsW2xdXVwiLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXBWYWxpZGF0b3JcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgajoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBpcFZhbGlkYXRvclxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBrOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGlwVmFsaWRhdG9yXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogaXBWYWxpZGF0b3JcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uIG9uVW5NYXNrKG1hc2tlZFZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNrZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJudW1lcmljXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgICAgIG1hc2s6IFwiKnsxLDY0fVsuKnsxLDY0fV1bLip7MSw2NH1dWy4qezEsNjN9XUAtezEsNjN9Li17MSw2M31bLi17MSw2M31dWy4tezEsNjN9XVwiLFxuICAgICAgICAgICAgICAgIGdyZWVkeTogITEsXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBcImxvd2VyXCIsXG4gICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24gb25CZWZvcmVQYXN0ZShwYXN0ZWRWYWx1ZSwgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpLCBwYXN0ZWRWYWx1ZS5yZXBsYWNlKFwibWFpbHRvOlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiKlwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOVxcdWZmMTEtXFx1ZmYxOUEtWmEtelxcdTA0MTAtXFx1MDQ0ZlxcdTA0MDFcXHUwNDUxXFx4YzAtXFx4ZmZcXHhiNSEjJCUmJyorLz0/Xl9ge3x9fi1dXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCItXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16LV1cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24gb25Vbk1hc2sobWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tlZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcImVtYWlsXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYWM6IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBcIiMjOiMjOiMjOiMjOiMjOiMjXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aW46IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBcIlZ7MTN9OXs0fVwiLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIFY6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1ISi1OUFItWmEtaGotbnByLXpcXFxcZF1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogXCJ1cHBlclwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogITAsXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogITBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzc246IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBcIjk5OS05OS05OTk5XCIsXG4gICAgICAgICAgICAgICAgcG9zdFZhbGlkYXRpb246IGZ1bmN0aW9uIHBvc3RWYWxpZGF0aW9uKGJ1ZmZlciwgcG9zLCBjLCBjdXJyZW50UmVzdWx0LCBvcHRzLCBtYXNrc2V0LCBzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC9eKD8hMjE5LTA5LTk5OTl8MDc4LTA1LTExMjApKD8hNjY2fDAwMHw5LnsyfSkuezN9LSg/ITAwKS57Mn0tKD8hMHs0fSkuezR9JC8udGVzdChidWZmZXIuam9pbihcIlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIF9kZWZhdWx0KG93bmVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodm9pZCAwID09PSB2YWx1ZSkgcmV0dXJuIG93bmVyLl9fZGF0YSA/IG93bmVyLl9fZGF0YVtrZXldIDogbnVsbDtcbiAgICAgICAgICAgIG93bmVyLl9fZGF0YSA9IG93bmVyLl9fZGF0YSB8fCB7fSwgb3duZXIuX19kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICB9KSwgZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICB9KSwgZXhwb3J0cy5vbiA9IG9uLCBleHBvcnRzLm9mZiA9IG9mZiwgZXhwb3J0cy50cmlnZ2VyID0gdHJpZ2dlciwgZXhwb3J0cy5FdmVudCA9IHZvaWQgMDtcbiAgICAgICAgdmFyIF9leHRlbmQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMTMpKSwgX3dpbmRvdyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXyg2KSksIF9pbnB1dG1hc2sgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oOSkpLCBFdmVudDtcbiAgICAgICAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KGVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtIGluc3RhbmNlb2YgRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEV2ZW50KGV2LCBuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIgPyBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGhhbmRsZXIsICExKSA6IGVsZW0uYXR0YWNoRXZlbnQgJiYgZWxlbS5hdHRhY2hFdmVudChcIm9uXCIgKyBldiwgaGFuZGxlciksIFxuICAgICAgICAgICAgICAgIGV2ZW50UmVnaXN0cnlbZXZdID0gZXZlbnRSZWdpc3RyeVtldl0gfHwge30sIGV2ZW50UmVnaXN0cnlbZXZdW25hbWVzcGFjZV0gPSBldmVudFJlZ2lzdHJ5W2V2XVtuYW1lc3BhY2VdIHx8IFtdLCBcbiAgICAgICAgICAgICAgICBldmVudFJlZ2lzdHJ5W2V2XVtuYW1lc3BhY2VdLnB1c2goaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQodGhpc1swXSkpIGZvciAodmFyIGV2ZW50UmVnaXN0cnkgPSB0aGlzWzBdLmV2ZW50UmVnaXN0cnksIGVsZW0gPSB0aGlzWzBdLCBfZXZlbnRzID0gZXZlbnRzLnNwbGl0KFwiIFwiKSwgZW5keCA9IDA7IGVuZHggPCBfZXZlbnRzLmxlbmd0aDsgZW5keCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5zRXZlbnQgPSBfZXZlbnRzW2VuZHhdLnNwbGl0KFwiLlwiKSwgZXYgPSBuc0V2ZW50WzBdLCBuYW1lc3BhY2UgPSBuc0V2ZW50WzFdIHx8IFwiZ2xvYmFsXCI7XG4gICAgICAgICAgICAgICAgYWRkRXZlbnQoZXYsIG5hbWVzcGFjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvZmYoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRSZWdpc3RyeSwgZWxlbTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGV2LCBuYW1lc3BhY2UsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXYgaW4gZXZlbnRSZWdpc3RyeSA9PSAhMCkgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciA/IGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldiwgaGFuZGxlciwgITEpIDogZWxlbS5kZXRhY2hFdmVudCAmJiBlbGVtLmRldGFjaEV2ZW50KFwib25cIiArIGV2LCBoYW5kbGVyKSwgXG4gICAgICAgICAgICAgICAgXCJnbG9iYWxcIiA9PT0gbmFtZXNwYWNlKSBmb3IgKHZhciBubXNwIGluIGV2ZW50UmVnaXN0cnlbZXZdKSBldmVudFJlZ2lzdHJ5W2V2XVtubXNwXS5zcGxpY2UoZXZlbnRSZWdpc3RyeVtldl1bbm1zcF0uaW5kZXhPZihoYW5kbGVyKSwgMSk7IGVsc2UgZXZlbnRSZWdpc3RyeVtldl1bbmFtZXNwYWNlXS5zcGxpY2UoZXZlbnRSZWdpc3RyeVtldl1bbmFtZXNwYWNlXS5pbmRleE9mKGhhbmRsZXIpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmVOYW1lc3BhY2UoZXYsIG5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgIHZhciBldnRzID0gW10sIGhuZHgsIGhuZEw7XG4gICAgICAgICAgICAgICAgaWYgKDAgPCBldi5sZW5ndGgpIGlmICh2b2lkIDAgPT09IGhhbmRsZXIpIGZvciAoaG5keCA9IDAsIGhuZEwgPSBldmVudFJlZ2lzdHJ5W2V2XVtuYW1lc3BhY2VdLmxlbmd0aDsgaG5keCA8IGhuZEw7IGhuZHgrKykgZXZ0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXY6IGV2LFxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZSAmJiAwIDwgbmFtZXNwYWNlLmxlbmd0aCA/IG5hbWVzcGFjZSA6IFwiZ2xvYmFsXCIsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGV2ZW50UmVnaXN0cnlbZXZdW25hbWVzcGFjZV1baG5keF1cbiAgICAgICAgICAgICAgICB9KTsgZWxzZSBldnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBldjogZXYsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlICYmIDAgPCBuYW1lc3BhY2UubGVuZ3RoID8gbmFtZXNwYWNlIDogXCJnbG9iYWxcIixcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgICAgICAgICAgICAgIH0pOyBlbHNlIGlmICgwIDwgbmFtZXNwYWNlLmxlbmd0aCkgZm9yICh2YXIgZXZOZHggaW4gZXZlbnRSZWdpc3RyeSkgZm9yICh2YXIgbm1zcCBpbiBldmVudFJlZ2lzdHJ5W2V2TmR4XSkgaWYgKG5tc3AgPT09IG5hbWVzcGFjZSkgaWYgKHZvaWQgMCA9PT0gaGFuZGxlcikgZm9yIChobmR4ID0gMCwgXG4gICAgICAgICAgICAgICAgaG5kTCA9IGV2ZW50UmVnaXN0cnlbZXZOZHhdW25tc3BdLmxlbmd0aDsgaG5keCA8IGhuZEw7IGhuZHgrKykgZXZ0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXY6IGV2TmR4LFxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5tc3AsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGV2ZW50UmVnaXN0cnlbZXZOZHhdW25tc3BdW2huZHhdXG4gICAgICAgICAgICAgICAgfSk7IGVsc2UgZXZ0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZXY6IGV2TmR4LFxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5tc3AsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZ0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudCh0aGlzWzBdKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50UmVnaXN0cnkgPSB0aGlzWzBdLmV2ZW50UmVnaXN0cnksIGVsZW0gPSB0aGlzWzBdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9ldmVudHMgPSBldmVudHMuc3BsaXQoXCIgXCIpLCBlbmR4ID0gMDsgZW5keCA8IF9ldmVudHMubGVuZ3RoOyBlbmR4KyspIGZvciAodmFyIG5zRXZlbnQgPSBfZXZlbnRzW2VuZHhdLnNwbGl0KFwiLlwiKSwgb2ZmRXZlbnRzID0gcmVzb2x2ZU5hbWVzcGFjZShuc0V2ZW50WzBdLCBuc0V2ZW50WzFdKSwgaSA9IDAsIG9mZkV2ZW50c0wgPSBvZmZFdmVudHMubGVuZ3RoOyBpIDwgb2ZmRXZlbnRzTDsgaSsrKSByZW1vdmVFdmVudChvZmZFdmVudHNbaV0uZXYsIG9mZkV2ZW50c1tpXS5uYW1lc3BhY2UsIG9mZkV2ZW50c1tpXS5oYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnRzKSB7XG4gICAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQodGhpc1swXSkpIGZvciAodmFyIGV2ZW50UmVnaXN0cnkgPSB0aGlzWzBdLmV2ZW50UmVnaXN0cnksIGVsZW0gPSB0aGlzWzBdLCBfZXZlbnRzID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgZXZlbnRzID8gZXZlbnRzLnNwbGl0KFwiIFwiKSA6IFsgZXZlbnRzLnR5cGUgXSwgZW5keCA9IDA7IGVuZHggPCBfZXZlbnRzLmxlbmd0aDsgZW5keCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5zRXZlbnQgPSBfZXZlbnRzW2VuZHhdLnNwbGl0KFwiLlwiKSwgZXYgPSBuc0V2ZW50WzBdLCBuYW1lc3BhY2UgPSBuc0V2ZW50WzFdIHx8IFwiZ2xvYmFsXCI7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gZG9jdW1lbnQgJiYgXCJnbG9iYWxcIiA9PT0gbmFtZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldm50LCBpLCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVzOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2bnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXYsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIiksIGV2bnQuaW5pdEN1c3RvbUV2ZW50KGV2LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnR5cGUgJiYgKDAsIF9leHRlbmQuZGVmYXVsdCkoZXZudCwgZXZlbnRzKSwgZWxlbS5kaXNwYXRjaEV2ZW50KGV2bnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZXZudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCksIGV2bnQuZXZlbnRUeXBlID0gZXYsIGV2bnQuZGV0YWlsID0gYXJndW1lbnRzWzFdLCBcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnR5cGUgJiYgKDAsIF9leHRlbmQuZGVmYXVsdCkoZXZudCwgZXZlbnRzKSwgZWxlbS5maXJlRXZlbnQoXCJvblwiICsgZXZudC5ldmVudFR5cGUsIGV2bnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodm9pZCAwICE9PSBldmVudFJlZ2lzdHJ5W2V2XSkgaWYgKGFyZ3VtZW50c1swXSA9IGFyZ3VtZW50c1swXS50eXBlID8gYXJndW1lbnRzWzBdIDogX2lucHV0bWFzay5kZWZhdWx0LkV2ZW50KGFyZ3VtZW50c1swXSksIFxuICAgICAgICAgICAgICAgIGFyZ3VtZW50c1swXS5kZXRhaWwgPSBhcmd1bWVudHMuc2xpY2UoMSksIFwiZ2xvYmFsXCIgPT09IG5hbWVzcGFjZSkgZm9yICh2YXIgbm1zcCBpbiBldmVudFJlZ2lzdHJ5W2V2XSkgZm9yIChpID0gMDsgaSA8IGV2ZW50UmVnaXN0cnlbZXZdW25tc3BdLmxlbmd0aDsgaSsrKSBldmVudFJlZ2lzdHJ5W2V2XVtubXNwXVtpXS5hcHBseShlbGVtLCBhcmd1bWVudHMpOyBlbHNlIGZvciAoaSA9IDA7IGkgPCBldmVudFJlZ2lzdHJ5W2V2XVtuYW1lc3BhY2VdLmxlbmd0aDsgaSsrKSBldmVudFJlZ2lzdHJ5W2V2XVtuYW1lc3BhY2VdW2ldLmFwcGx5KGVsZW0sIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzLkV2ZW50ID0gRXZlbnQsIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgX3dpbmRvdy5kZWZhdWx0LkN1c3RvbUV2ZW50ID8gZXhwb3J0cy5FdmVudCA9IEV2ZW50ID0gX3dpbmRvdy5kZWZhdWx0LkN1c3RvbUV2ZW50IDogKGV4cG9ydHMuRXZlbnQgPSBFdmVudCA9IGZ1bmN0aW9uIEV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogITEsXG4gICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogITEsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB2b2lkIDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgIHJldHVybiBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpLCBcbiAgICAgICAgICAgIGV2dDtcbiAgICAgICAgfSwgRXZlbnQucHJvdG90eXBlID0gX3dpbmRvdy5kZWZhdWx0LkV2ZW50LnByb3RvdHlwZSk7XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICB9KSwgZXhwb3J0cy5nZW5lcmF0ZU1hc2tTZXQgPSBnZW5lcmF0ZU1hc2tTZXQsIGV4cG9ydHMuYW5hbHlzZU1hc2sgPSBhbmFseXNlTWFzaztcbiAgICAgICAgdmFyIF9pbnB1dG1hc2sgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oOSkpO1xuICAgICAgICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXNrU2V0KG9wdHMsIG5vY2FjaGUpIHtcbiAgICAgICAgICAgIHZhciBtcztcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWFzayhtYXNrLCBtZXRhZGF0YSwgb3B0cykge1xuICAgICAgICAgICAgICAgIHZhciByZWdleE1hc2sgPSAhMSwgbWFza3NldERlZmluaXRpb24sIG1hc2tkZWZLZXk7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IG1hc2sgJiYgXCJcIiAhPT0gbWFzayB8fCAocmVnZXhNYXNrID0gbnVsbCAhPT0gb3B0cy5yZWdleCwgbWFzayA9IHJlZ2V4TWFzayA/IChtYXNrID0gb3B0cy5yZWdleCwgXG4gICAgICAgICAgICAgICAgbWFzay5yZXBsYWNlKC9eKFxcXikoLiopKFxcJCkkLywgXCIkMlwiKSkgOiAocmVnZXhNYXNrID0gITAsIFwiLipcIikpLCAxID09PSBtYXNrLmxlbmd0aCAmJiAhMSA9PT0gb3B0cy5ncmVlZHkgJiYgMCAhPT0gb3B0cy5yZXBlYXQgJiYgKG9wdHMucGxhY2Vob2xkZXIgPSBcIlwiKSwgXG4gICAgICAgICAgICAgICAgMCA8IG9wdHMucmVwZWF0IHx8IFwiKlwiID09PSBvcHRzLnJlcGVhdCB8fCBcIitcIiA9PT0gb3B0cy5yZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGVhdFN0YXJ0ID0gXCIqXCIgPT09IG9wdHMucmVwZWF0ID8gMCA6IFwiK1wiID09PSBvcHRzLnJlcGVhdCA/IDEgOiBvcHRzLnJlcGVhdDtcbiAgICAgICAgICAgICAgICAgICAgbWFzayA9IG9wdHMuZ3JvdXBtYXJrZXJbMF0gKyBtYXNrICsgb3B0cy5ncm91cG1hcmtlclsxXSArIG9wdHMucXVhbnRpZmllcm1hcmtlclswXSArIHJlcGVhdFN0YXJ0ICsgXCIsXCIgKyBvcHRzLnJlcGVhdCArIG9wdHMucXVhbnRpZmllcm1hcmtlclsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tkZWZLZXkgPSByZWdleE1hc2sgPyBcInJlZ2V4X1wiICsgb3B0cy5yZWdleCA6IG9wdHMubnVtZXJpY0lucHV0ID8gbWFzay5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSA6IG1hc2ssIFxuICAgICAgICAgICAgICAgICExICE9PSBvcHRzLmtlZXBTdGF0aWMgJiYgKG1hc2tkZWZLZXkgPSBcImtzX1wiICsgbWFza2RlZktleSksIHZvaWQgMCA9PT0gSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW21hc2tkZWZLZXldIHx8ICEwID09PSBub2NhY2hlID8gKG1hc2tzZXREZWZpbml0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBtYXNrOiBtYXNrLFxuICAgICAgICAgICAgICAgICAgICBtYXNrVG9rZW46IElucHV0bWFzay5wcm90b3R5cGUuYW5hbHlzZU1hc2sobWFzaywgcmVnZXhNYXNrLCBvcHRzKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRQb3NpdGlvbnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBfYnVmZmVyOiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICB0ZXN0czoge30sXG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICBtYXNrTGVuZ3RoOiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgIGppdE9mZnNldDoge31cbiAgICAgICAgICAgICAgICB9LCAhMCAhPT0gbm9jYWNoZSAmJiAoSW5wdXRtYXNrLnByb3RvdHlwZS5tYXNrc0NhY2hlW21hc2tkZWZLZXldID0gbWFza3NldERlZmluaXRpb24sIFxuICAgICAgICAgICAgICAgIG1hc2tzZXREZWZpbml0aW9uID0gX2lucHV0bWFzay5kZWZhdWx0LmV4dGVuZCghMCwge30sIElucHV0bWFzay5wcm90b3R5cGUubWFza3NDYWNoZVttYXNrZGVmS2V5XSkpKSA6IG1hc2tzZXREZWZpbml0aW9uID0gX2lucHV0bWFzay5kZWZhdWx0LmV4dGVuZCghMCwge30sIElucHV0bWFzay5wcm90b3R5cGUubWFza3NDYWNoZVttYXNrZGVmS2V5XSksIFxuICAgICAgICAgICAgICAgIG1hc2tzZXREZWZpbml0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2Ygb3B0cy5tYXNrICYmIChvcHRzLm1hc2sgPSBvcHRzLm1hc2sob3B0cykpLCBBcnJheS5pc0FycmF5KG9wdHMubWFzaykpIHtcbiAgICAgICAgICAgICAgICBpZiAoMSA8IG9wdHMubWFzay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbnVsbCA9PT0gb3B0cy5rZWVwU3RhdGljICYmIChvcHRzLmtlZXBTdGF0aWMgPSAhMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbHRNYXNrID0gb3B0cy5ncm91cG1hcmtlclswXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChvcHRzLmlzUlRMID8gb3B0cy5tYXNrLnJldmVyc2UoKSA6IG9wdHMubWFzaykuZm9yRWFjaChmdW5jdGlvbihtc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDEgPCBhbHRNYXNrLmxlbmd0aCAmJiAoYWx0TWFzayArPSBvcHRzLmdyb3VwbWFya2VyWzFdICsgb3B0cy5hbHRlcm5hdG9ybWFya2VyICsgb3B0cy5ncm91cG1hcmtlclswXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwICE9PSBtc2subWFzayAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIG1zay5tYXNrID8gYWx0TWFzayArPSBtc2subWFzayA6IGFsdE1hc2sgKz0gbXNrO1xuICAgICAgICAgICAgICAgICAgICB9KSwgYWx0TWFzayArPSBvcHRzLmdyb3VwbWFya2VyWzFdLCBnZW5lcmF0ZU1hc2soYWx0TWFzaywgb3B0cy5tYXNrLCBvcHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0cy5tYXNrID0gb3B0cy5tYXNrLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGwgPT09IG9wdHMua2VlcFN0YXRpYyAmJiAob3B0cy5rZWVwU3RhdGljID0gITEpLCBtcyA9IG9wdHMubWFzayAmJiB2b2lkIDAgIT09IG9wdHMubWFzay5tYXNrICYmIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2Ygb3B0cy5tYXNrLm1hc2sgPyBnZW5lcmF0ZU1hc2sob3B0cy5tYXNrLm1hc2ssIG9wdHMubWFzaywgb3B0cykgOiBnZW5lcmF0ZU1hc2sob3B0cy5tYXNrLCBvcHRzLm1hc2ssIG9wdHMpLCBcbiAgICAgICAgICAgIG1zO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFuYWx5c2VNYXNrKG1hc2ssIHJlZ2V4TWFzaywgb3B0cykge1xuICAgICAgICAgICAgdmFyIHRva2VuaXplciA9IC8oPzpbPyorXXxcXHtbMC05KypdKyg/OixbMC05KypdKik/KD86XFx8WzAtOSsqXSopP1xcfSl8W14uPyorXiR7W10oKXxcXFxcXSt8Li9nLCByZWdleFRva2VuaXplciA9IC9cXFtcXF4/XT8oPzpbXlxcXFxcXF1dK3xcXFxcW1xcU1xcc10/KSpdP3xcXFxcKD86MCg/OlswLTNdWzAtN117MCwyfXxbNC03XVswLTddPyk/fFsxLTldWzAtOV0qfHhbMC05QS1GYS1mXXsyfXx1WzAtOUEtRmEtZl17NH18Y1tBLVphLXpdfFtcXFNcXHNdPyl8XFwoKD86XFw/Wzo9IV0/KT98KD86Wz8qK118XFx7WzAtOV0rKD86LFswLTldKik/XFx9KVxcPz98W14uPyorXiR7WygpfFxcXFxdK3wuL2csIGVzY2FwZWQgPSAhMSwgY3VycmVudFRva2VuID0gbmV3IE1hc2tUb2tlbigpLCBtYXRjaCwgbSwgb3BlbmVuaW5ncyA9IFtdLCBtYXNrVG9rZW5zID0gW10sIG9wZW5pbmdUb2tlbiwgY3VycmVudE9wZW5pbmdUb2tlbiwgYWx0ZXJuYXRvciwgbGFzdE1hdGNoLCBjbG9zZVJlZ2V4R3JvdXAgPSAhMTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIE1hc2tUb2tlbihpc0dyb3VwLCBpc09wdGlvbmFsLCBpc1F1YW50aWZpZXIsIGlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdLCB0aGlzLm9wZW5Hcm91cCA9IGlzR3JvdXAgfHwgITEsIHRoaXMuYWx0ZXJuYXRvckdyb3VwID0gITEsIHRoaXMuaXNHcm91cCA9IGlzR3JvdXAgfHwgITEsIFxuICAgICAgICAgICAgICAgIHRoaXMuaXNPcHRpb25hbCA9IGlzT3B0aW9uYWwgfHwgITEsIHRoaXMuaXNRdWFudGlmaWVyID0gaXNRdWFudGlmaWVyIHx8ICExLCB0aGlzLmlzQWx0ZXJuYXRvciA9IGlzQWx0ZXJuYXRvciB8fCAhMSwgXG4gICAgICAgICAgICAgICAgdGhpcy5xdWFudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpbnNlcnRUZXN0RGVmaW5pdGlvbihtdG9rZW4sIGVsZW1lbnQsIHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB2b2lkIDAgIT09IHBvc2l0aW9uID8gcG9zaXRpb24gOiBtdG9rZW4ubWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZNYXRjaCA9IG10b2tlbi5tYXRjaGVzW3Bvc2l0aW9uIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHJlZ2V4TWFzaykgMCA9PT0gZWxlbWVudC5pbmRleE9mKFwiW1wiKSB8fCBlc2NhcGVkICYmIC9cXFxcZHxcXFxcc3xcXFxcd10vaS50ZXN0KGVsZW1lbnQpIHx8IFwiLlwiID09PSBlbGVtZW50ID8gbXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgZm46IG5ldyBSZWdFeHAoZWxlbWVudCwgb3B0cy5jYXNpbmcgPyBcImlcIiA6IFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICBzdGF0aWM6ICExLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogITEsXG4gICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiB2b2lkIDAgPT09IHByZXZNYXRjaCA/IFwibWFzdGVyXCIgOiBwcmV2TWF0Y2guZGVmICE9PSBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGRlZjogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlRGVmOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgfSkgOiAoZXNjYXBlZCAmJiAoZWxlbWVudCA9IGVsZW1lbnRbZWxlbWVudC5sZW5ndGggLSAxXSksIGVsZW1lbnQuc3BsaXQoXCJcIikuZm9yRWFjaChmdW5jdGlvbihsbW50LCBuZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldk1hdGNoID0gbXRva2VuLm1hdGNoZXNbcG9zaXRpb24gLSAxXSwgbXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuOiAvW2Etel0vaS50ZXN0KG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCBsbW50KSA/IG5ldyBSZWdFeHAoXCJbXCIgKyAob3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sIHx8IGxtbnQpICsgXCJdXCIsIG9wdHMuY2FzaW5nID8gXCJpXCIgOiBcIlwiKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWM6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXI6IHZvaWQgMCA9PT0gcHJldk1hdGNoID8gXCJtYXN0ZXJcIiA6IHByZXZNYXRjaC5kZWYgIT09IGxtbnQgJiYgITAgIT09IHByZXZNYXRjaC5zdGF0aWMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWY6IG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCBsbW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHZvaWQgMCAhPT0gb3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sID8gbG1udCA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogKGVzY2FwZWQgPyBcIidcIiA6IFwiXCIpICsgbG1udFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSksIGVzY2FwZWQgPSAhMTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXNrZGVmID0gb3B0cy5kZWZpbml0aW9ucyAmJiBvcHRzLmRlZmluaXRpb25zW2VsZW1lbnRdIHx8IG9wdHMudXNlUHJvdG90eXBlRGVmaW5pdGlvbnMgJiYgSW5wdXRtYXNrLnByb3RvdHlwZS5kZWZpbml0aW9uc1tlbGVtZW50XTtcbiAgICAgICAgICAgICAgICAgICAgbWFza2RlZiAmJiAhZXNjYXBlZCA/IG10b2tlbi5tYXRjaGVzLnNwbGljZShwb3NpdGlvbisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbjogbWFza2RlZi52YWxpZGF0b3IgPyBcInN0cmluZ1wiID09IHR5cGVvZiBtYXNrZGVmLnZhbGlkYXRvciA/IG5ldyBSZWdFeHAobWFza2RlZi52YWxpZGF0b3IsIG9wdHMuY2FzaW5nID8gXCJpXCIgOiBcIlwiKSA6IG5ldyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3QgPSBtYXNrZGVmLnZhbGlkYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0oKSA6IG5ldyBSZWdFeHAoXCIuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljOiBtYXNrZGVmLnN0YXRpYyB8fCAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsaXR5OiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiB2b2lkIDAgPT09IHByZXZNYXRjaCA/IFwibWFzdGVyXCIgOiBwcmV2TWF0Y2guZGVmICE9PSAobWFza2RlZi5kZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBtYXNrZGVmLmNhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogbWFza2RlZi5kZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogbWFza2RlZi5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlZDogbWFza2RlZi5nZW5lcmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgfSkgOiAobXRva2VuLm1hdGNoZXMuc3BsaWNlKHBvc2l0aW9uKyssIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuOiAvW2Etel0vaS50ZXN0KG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCBlbGVtZW50KSA/IG5ldyBSZWdFeHAoXCJbXCIgKyAob3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sIHx8IGVsZW1lbnQpICsgXCJdXCIsIG9wdHMuY2FzaW5nID8gXCJpXCIgOiBcIlwiKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWM6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXI6IHZvaWQgMCA9PT0gcHJldk1hdGNoID8gXCJtYXN0ZXJcIiA6IHByZXZNYXRjaC5kZWYgIT09IGVsZW1lbnQgJiYgITAgIT09IHByZXZNYXRjaC5zdGF0aWMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWY6IG9wdHMuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHZvaWQgMCAhPT0gb3B0cy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sID8gZWxlbWVudCA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogKGVzY2FwZWQgPyBcIidcIiA6IFwiXCIpICsgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KSwgZXNjYXBlZCA9ICExKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB2ZXJpZnlHcm91cE1hcmtlcihtYXNrVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBtYXNrVG9rZW4gJiYgbWFza1Rva2VuLm1hdGNoZXMgJiYgbWFza1Rva2VuLm1hdGNoZXMuZm9yRWFjaChmdW5jdGlvbih0b2tlbiwgbmR4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VG9rZW4gPSBtYXNrVG9rZW4ubWF0Y2hlc1tuZHggKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgKHZvaWQgMCA9PT0gbmV4dFRva2VuIHx8IHZvaWQgMCA9PT0gbmV4dFRva2VuLm1hdGNoZXMgfHwgITEgPT09IG5leHRUb2tlbi5pc1F1YW50aWZpZXIpICYmIHRva2VuICYmIHRva2VuLmlzR3JvdXAgJiYgKHRva2VuLmlzR3JvdXAgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4TWFzayB8fCAoaW5zZXJ0VGVzdERlZmluaXRpb24odG9rZW4sIG9wdHMuZ3JvdXBtYXJrZXJbMF0sIDApLCAhMCAhPT0gdG9rZW4ub3Blbkdyb3VwICYmIGluc2VydFRlc3REZWZpbml0aW9uKHRva2VuLCBvcHRzLmdyb3VwbWFya2VyWzFdKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5R3JvdXBNYXJrZXIodG9rZW4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZGVmYXVsdENhc2UoKSB7XG4gICAgICAgICAgICAgICAgaWYgKDAgPCBvcGVuZW5pbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXSwgaW5zZXJ0VGVzdERlZmluaXRpb24oY3VycmVudE9wZW5pbmdUb2tlbiwgbSksIFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50T3BlbmluZ1Rva2VuLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWx0ZXJuYXRvciA9IG9wZW5lbmluZ3MucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtbmR4ID0gMDsgbW5keCA8IGFsdGVybmF0b3IubWF0Y2hlcy5sZW5ndGg7IG1uZHgrKykgYWx0ZXJuYXRvci5tYXRjaGVzW21uZHhdLmlzR3JvdXAgJiYgKGFsdGVybmF0b3IubWF0Y2hlc1ttbmR4XS5pc0dyb3VwID0gITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgMCA8IG9wZW5lbmluZ3MubGVuZ3RoID8gKGN1cnJlbnRPcGVuaW5nVG9rZW4gPSBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE9wZW5pbmdUb2tlbi5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcikpIDogY3VycmVudFRva2VuLm1hdGNoZXMucHVzaChhbHRlcm5hdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpbnNlcnRUZXN0RGVmaW5pdGlvbihjdXJyZW50VG9rZW4sIG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZVRva2VucyhtYXNrVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXZlcnNlU3RhdGljKHN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdCA9PT0gb3B0cy5vcHRpb25hbG1hcmtlclswXSA/IHN0ID0gb3B0cy5vcHRpb25hbG1hcmtlclsxXSA6IHN0ID09PSBvcHRzLm9wdGlvbmFsbWFya2VyWzFdID8gc3QgPSBvcHRzLm9wdGlvbmFsbWFya2VyWzBdIDogc3QgPT09IG9wdHMuZ3JvdXBtYXJrZXJbMF0gPyBzdCA9IG9wdHMuZ3JvdXBtYXJrZXJbMV0gOiBzdCA9PT0gb3B0cy5ncm91cG1hcmtlclsxXSAmJiAoc3QgPSBvcHRzLmdyb3VwbWFya2VyWzBdKSwgXG4gICAgICAgICAgICAgICAgICAgIHN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBtYXRjaCBpbiBtYXNrVG9rZW4ubWF0Y2hlcyA9IG1hc2tUb2tlbi5tYXRjaGVzLnJldmVyc2UoKSwgbWFza1Rva2VuLm1hdGNoZXMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWFza1Rva2VuLm1hdGNoZXMsIG1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW50TWF0Y2ggPSBwYXJzZUludChtYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0uaXNRdWFudGlmaWVyICYmIG1hc2tUb2tlbi5tYXRjaGVzW2ludE1hdGNoICsgMV0gJiYgbWFza1Rva2VuLm1hdGNoZXNbaW50TWF0Y2ggKyAxXS5pc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXQgPSBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF07XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVG9rZW4ubWF0Y2hlcy5zcGxpY2UobWF0Y2gsIDEpLCBtYXNrVG9rZW4ubWF0Y2hlcy5zcGxpY2UoaW50TWF0Y2ggKyAxLCAwLCBxdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwICE9PSBtYXNrVG9rZW4ubWF0Y2hlc1ttYXRjaF0ubWF0Y2hlcyA/IG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSA9IHJldmVyc2VUb2tlbnMobWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdKSA6IG1hc2tUb2tlbi5tYXRjaGVzW21hdGNoXSA9IHJldmVyc2VTdGF0aWMobWFza1Rva2VuLm1hdGNoZXNbbWF0Y2hdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tUb2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdyb3VwaWZ5KG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXBUb2tlbiA9IG5ldyBNYXNrVG9rZW4oITApO1xuICAgICAgICAgICAgICAgIHJldHVybiBncm91cFRva2VuLm9wZW5Hcm91cCA9ICExLCBncm91cFRva2VuLm1hdGNoZXMgPSBtYXRjaGVzLCBncm91cFRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2VHcm91cCgpIHtcbiAgICAgICAgICAgICAgICBpZiAob3BlbmluZ1Rva2VuID0gb3BlbmVuaW5ncy5wb3AoKSwgb3BlbmluZ1Rva2VuLm9wZW5Hcm91cCA9ICExLCB2b2lkIDAgIT09IG9wZW5pbmdUb2tlbikgaWYgKDAgPCBvcGVuZW5pbmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3Nbb3BlbmVuaW5ncy5sZW5ndGggLSAxXSwgY3VycmVudE9wZW5pbmdUb2tlbi5tYXRjaGVzLnB1c2gob3BlbmluZ1Rva2VuKSwgXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRPcGVuaW5nVG9rZW4uaXNBbHRlcm5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdG9yID0gb3BlbmVuaW5ncy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG1uZHggPSAwOyBtbmR4IDwgYWx0ZXJuYXRvci5tYXRjaGVzLmxlbmd0aDsgbW5keCsrKSBhbHRlcm5hdG9yLm1hdGNoZXNbbW5keF0uaXNHcm91cCA9ICExLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0b3IubWF0Y2hlc1ttbmR4XS5hbHRlcm5hdG9yR3JvdXAgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIDAgPCBvcGVuZW5pbmdzLmxlbmd0aCA/IChjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcy5wdXNoKGFsdGVybmF0b3IpKSA6IGN1cnJlbnRUb2tlbi5tYXRjaGVzLnB1c2goYWx0ZXJuYXRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgY3VycmVudFRva2VuLm1hdGNoZXMucHVzaChvcGVuaW5nVG9rZW4pOyBlbHNlIGRlZmF1bHRDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBncm91cFF1YW50aWZpZXIobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0TWF0Y2ggPSBtYXRjaGVzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBsYXN0TWF0Y2guaXNRdWFudGlmaWVyICYmIChsYXN0TWF0Y2ggPSBncm91cGlmeShbIG1hdGNoZXMucG9wKCksIGxhc3RNYXRjaCBdKSksIFxuICAgICAgICAgICAgICAgIGxhc3RNYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAocmVnZXhNYXNrICYmIChvcHRzLm9wdGlvbmFsbWFya2VyWzBdID0gdm9pZCAwLCBvcHRzLm9wdGlvbmFsbWFya2VyWzFdID0gdm9pZCAwKTsgbWF0Y2ggPSByZWdleE1hc2sgPyByZWdleFRva2VuaXplci5leGVjKG1hc2spIDogdG9rZW5pemVyLmV4ZWMobWFzayk7ICkge1xuICAgICAgICAgICAgICAgIGlmIChtID0gbWF0Y2hbMF0sIHJlZ2V4TWFzaykgc3dpdGNoIChtLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcIj9cIjpcbiAgICAgICAgICAgICAgICAgICAgbSA9IFwiezAsMX1cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgXCIrXCI6XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiKlwiOlxuICAgICAgICAgICAgICAgICAgICBtID0gXCJ7XCIgKyBtICsgXCJ9XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIFwifFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gb3BlbmVuaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRSZWdleEdyb3VwID0gZ3JvdXBpZnkoY3VycmVudFRva2VuLm1hdGNoZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWx0UmVnZXhHcm91cC5vcGVuR3JvdXAgPSAhMCwgb3BlbmVuaW5ncy5wdXNoKGFsdFJlZ2V4R3JvdXApLCBjdXJyZW50VG9rZW4ubWF0Y2hlcyA9IFtdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUmVnZXhHcm91cCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXNjYXBlZCkgZGVmYXVsdENhc2UoKTsgZWxzZSBzd2l0Y2ggKG0uY2hhckF0KDApKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiJFwiOlxuICAgICAgICAgICAgICAgICAgY2FzZSBcIl5cIjpcbiAgICAgICAgICAgICAgICAgICAgcmVnZXhNYXNrIHx8IGRlZmF1bHRDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiKD89XCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiKD8hXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiKD88PVwiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSBcIig/PCFcIjpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5lc2NhcGVDaGFyOlxuICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gITAsIHJlZ2V4TWFzayAmJiBkZWZhdWx0Q2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLm9wdGlvbmFsbWFya2VyWzFdOlxuICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLmdyb3VwbWFya2VyWzFdOlxuICAgICAgICAgICAgICAgICAgICBjbG9zZUdyb3VwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIG9wdHMub3B0aW9uYWxtYXJrZXJbMF06XG4gICAgICAgICAgICAgICAgICAgIG9wZW5lbmluZ3MucHVzaChuZXcgTWFza1Rva2VuKCExLCAhMCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLmdyb3VwbWFya2VyWzBdOlxuICAgICAgICAgICAgICAgICAgICBvcGVuZW5pbmdzLnB1c2gobmV3IE1hc2tUb2tlbighMCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSBvcHRzLnF1YW50aWZpZXJtYXJrZXJbMF06XG4gICAgICAgICAgICAgICAgICAgIHZhciBxdWFudGlmaWVyID0gbmV3IE1hc2tUb2tlbighMSwgITEsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgbSA9IG0ucmVwbGFjZSgvW3t9XS9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1xaiA9IG0uc3BsaXQoXCJ8XCIpLCBtcSA9IG1xalswXS5zcGxpdChcIixcIiksIG1xMCA9IGlzTmFOKG1xWzBdKSA/IG1xWzBdIDogcGFyc2VJbnQobXFbMF0pLCBtcTEgPSAxID09PSBtcS5sZW5ndGggPyBtcTAgOiBpc05hTihtcVsxXSkgPyBtcVsxXSA6IHBhcnNlSW50KG1xWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgXCIqXCIgIT09IG1xMCAmJiBcIitcIiAhPT0gbXEwIHx8IChtcTAgPSBcIipcIiA9PT0gbXExID8gMCA6IDEpLCBxdWFudGlmaWVyLnF1YW50aWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IG1xMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogbXExLFxuICAgICAgICAgICAgICAgICAgICAgICAgaml0OiBtcWpbMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAwIDwgb3BlbmVuaW5ncy5sZW5ndGggPyBvcGVuZW5pbmdzW29wZW5lbmluZ3MubGVuZ3RoIC0gMV0ubWF0Y2hlcyA6IGN1cnJlbnRUb2tlbi5tYXRjaGVzO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSBtYXRjaGVzLnBvcCgpLCBtYXRjaC5pc0FsdGVybmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChtYXRjaCksIG1hdGNoZXMgPSBtYXRjaC5tYXRjaGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwVG9rZW4gPSBuZXcgTWFza1Rva2VuKCEwKSwgdG1wTWF0Y2ggPSBtYXRjaGVzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGdyb3VwVG9rZW4pLCBtYXRjaGVzID0gZ3JvdXBUb2tlbi5tYXRjaGVzLCBtYXRjaCA9IHRtcE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLmlzR3JvdXAgfHwgKG1hdGNoID0gZ3JvdXBpZnkoWyBtYXRjaCBdKSksIG1hdGNoZXMucHVzaChtYXRjaCksIG1hdGNoZXMucHVzaChxdWFudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5hbHRlcm5hdG9ybWFya2VyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IG9wZW5lbmluZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50T3BlbmluZ1Rva2VuID0gb3BlbmVuaW5nc1tvcGVuZW5pbmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlRva2VuID0gY3VycmVudE9wZW5pbmdUb2tlbi5tYXRjaGVzW2N1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IGN1cnJlbnRPcGVuaW5nVG9rZW4ub3Blbkdyb3VwICYmICh2b2lkIDAgPT09IHN1YlRva2VuLm1hdGNoZXMgfHwgITEgPT09IHN1YlRva2VuLmlzR3JvdXAgJiYgITEgPT09IHN1YlRva2VuLmlzQWx0ZXJuYXRvcikgPyBvcGVuZW5pbmdzLnBvcCgpIDogZ3JvdXBRdWFudGlmaWVyKGN1cnJlbnRPcGVuaW5nVG9rZW4ubWF0Y2hlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBsYXN0TWF0Y2ggPSBncm91cFF1YW50aWZpZXIoY3VycmVudFRva2VuLm1hdGNoZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdE1hdGNoLmlzQWx0ZXJuYXRvcikgb3BlbmVuaW5ncy5wdXNoKGxhc3RNYXRjaCk7IGVsc2UgaWYgKGxhc3RNYXRjaC5hbHRlcm5hdG9yR3JvdXAgPyAoYWx0ZXJuYXRvciA9IG9wZW5lbmluZ3MucG9wKCksIFxuICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2guYWx0ZXJuYXRvckdyb3VwID0gITEpIDogYWx0ZXJuYXRvciA9IG5ldyBNYXNrVG9rZW4oITEsICExLCAhMSwgITApLCBhbHRlcm5hdG9yLm1hdGNoZXMucHVzaChsYXN0TWF0Y2gpLCBcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVuaW5ncy5wdXNoKGFsdGVybmF0b3IpLCBsYXN0TWF0Y2gub3Blbkdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2gub3Blbkdyb3VwID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0ZXJuYXRvckdyb3VwID0gbmV3IE1hc2tUb2tlbighMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHRlcm5hdG9yR3JvdXAuYWx0ZXJuYXRvckdyb3VwID0gITAsIG9wZW5lbmluZ3MucHVzaChhbHRlcm5hdG9yR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2FzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY2xvc2VSZWdleEdyb3VwICYmIGNsb3NlR3JvdXAoKTsgMCA8IG9wZW5lbmluZ3MubGVuZ3RoOyApIG9wZW5pbmdUb2tlbiA9IG9wZW5lbmluZ3MucG9wKCksIFxuICAgICAgICAgICAgY3VycmVudFRva2VuLm1hdGNoZXMucHVzaChvcGVuaW5nVG9rZW4pO1xuICAgICAgICAgICAgcmV0dXJuIDAgPCBjdXJyZW50VG9rZW4ubWF0Y2hlcy5sZW5ndGggJiYgKHZlcmlmeUdyb3VwTWFya2VyKGN1cnJlbnRUb2tlbiksIG1hc2tUb2tlbnMucHVzaChjdXJyZW50VG9rZW4pKSwgXG4gICAgICAgICAgICAob3B0cy5udW1lcmljSW5wdXQgfHwgb3B0cy5pc1JUTCkgJiYgcmV2ZXJzZVRva2VucyhtYXNrVG9rZW5zWzBdKSwgbWFza1Rva2VucztcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgfSksIGV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbiAgICAgICAgdmFyIF9kZWZhdWx0ID0ge1xuICAgICAgICAgICAgOToge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05XFx1ZmYxMC1cXHVmZjE5XVwiLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25TeW1ib2w6IFwiKlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS16XFx1MDQxMC1cXHUwNDRmXFx1MDQwMVxcdTA0NTFcXHhjMC1cXHhmZlxceGI1XVwiLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25TeW1ib2w6IFwiKlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIqXCI6IHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOVxcdWZmMTAtXFx1ZmYxOUEtWmEtelxcdTA0MTAtXFx1MDQ0ZlxcdTA0MDFcXHUwNDUxXFx4YzAtXFx4ZmZcXHhiNV1cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBleHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgIH0pLCBleHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG4gICAgICAgIHZhciBfZGVmYXVsdCA9IHtcbiAgICAgICAgICAgIF9tYXhUZXN0UG9zOiA1MDAsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJfXCIsXG4gICAgICAgICAgICBvcHRpb25hbG1hcmtlcjogWyBcIltcIiwgXCJdXCIgXSxcbiAgICAgICAgICAgIHF1YW50aWZpZXJtYXJrZXI6IFsgXCJ7XCIsIFwifVwiIF0sXG4gICAgICAgICAgICBncm91cG1hcmtlcjogWyBcIihcIiwgXCIpXCIgXSxcbiAgICAgICAgICAgIGFsdGVybmF0b3JtYXJrZXI6IFwifFwiLFxuICAgICAgICAgICAgZXNjYXBlQ2hhcjogXCJcXFxcXCIsXG4gICAgICAgICAgICBtYXNrOiBudWxsLFxuICAgICAgICAgICAgcmVnZXg6IG51bGwsXG4gICAgICAgICAgICBvbmNvbXBsZXRlOiBmdW5jdGlvbiBvbmNvbXBsZXRlKCkge30sXG4gICAgICAgICAgICBvbmluY29tcGxldGU6IGZ1bmN0aW9uIG9uaW5jb21wbGV0ZSgpIHt9LFxuICAgICAgICAgICAgb25jbGVhcmVkOiBmdW5jdGlvbiBvbmNsZWFyZWQoKSB7fSxcbiAgICAgICAgICAgIHJlcGVhdDogMCxcbiAgICAgICAgICAgIGdyZWVkeTogITEsXG4gICAgICAgICAgICBhdXRvVW5tYXNrOiAhMSxcbiAgICAgICAgICAgIHJlbW92ZU1hc2tPblN1Ym1pdDogITEsXG4gICAgICAgICAgICBjbGVhck1hc2tPbkxvc3RGb2N1czogITAsXG4gICAgICAgICAgICBpbnNlcnRNb2RlOiAhMCxcbiAgICAgICAgICAgIGluc2VydE1vZGVWaXN1YWw6ICEwLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiAhMSxcbiAgICAgICAgICAgIGFsaWFzOiBudWxsLFxuICAgICAgICAgICAgb25LZXlEb3duOiBmdW5jdGlvbiBvbktleURvd24oKSB7fSxcbiAgICAgICAgICAgIG9uQmVmb3JlTWFzazogbnVsbCxcbiAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uIG9uQmVmb3JlUGFzdGUocGFzdGVkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJmdW5jdGlvblwiID09IHR5cGVvZiBvcHRzLm9uQmVmb3JlTWFzayA/IG9wdHMub25CZWZvcmVNYXNrLmNhbGwodGhpcywgcGFzdGVkVmFsdWUsIG9wdHMpIDogcGFzdGVkVmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25CZWZvcmVXcml0ZTogbnVsbCxcbiAgICAgICAgICAgIG9uVW5NYXNrOiBudWxsLFxuICAgICAgICAgICAgc2hvd01hc2tPbkZvY3VzOiAhMCxcbiAgICAgICAgICAgIHNob3dNYXNrT25Ib3ZlcjogITAsXG4gICAgICAgICAgICBvbktleVZhbGlkYXRpb246IGZ1bmN0aW9uIG9uS2V5VmFsaWRhdGlvbigpIHt9LFxuICAgICAgICAgICAgc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcjogXCIgXCIsXG4gICAgICAgICAgICBudW1lcmljSW5wdXQ6ICExLFxuICAgICAgICAgICAgcmlnaHRBbGlnbjogITEsXG4gICAgICAgICAgICB1bmRvT25Fc2NhcGU6ICEwLFxuICAgICAgICAgICAgcmFkaXhQb2ludDogXCJcIixcbiAgICAgICAgICAgIF9yYWRpeERhbmNlOiAhMSxcbiAgICAgICAgICAgIGdyb3VwU2VwYXJhdG9yOiBcIlwiLFxuICAgICAgICAgICAga2VlcFN0YXRpYzogbnVsbCxcbiAgICAgICAgICAgIHBvc2l0aW9uQ2FyZXRPblRhYjogITAsXG4gICAgICAgICAgICB0YWJUaHJvdWdoOiAhMSxcbiAgICAgICAgICAgIHN1cHBvcnRzSW5wdXRUeXBlOiBbIFwidGV4dFwiLCBcInRlbFwiLCBcInVybFwiLCBcInBhc3N3b3JkXCIsIFwic2VhcmNoXCIgXSxcbiAgICAgICAgICAgIGlnbm9yYWJsZXM6IFsgOCwgOSwgMTksIDI3LCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDQ1LCA0NiwgOTMsIDExMiwgMTEzLCAxMTQsIDExNSwgMTE2LCAxMTcsIDExOCwgMTE5LCAxMjAsIDEyMSwgMTIyLCAxMjMsIDAsIDIyOSBdLFxuICAgICAgICAgICAgaXNDb21wbGV0ZTogbnVsbCxcbiAgICAgICAgICAgIHByZVZhbGlkYXRpb246IG51bGwsXG4gICAgICAgICAgICBwb3N0VmFsaWRhdGlvbjogbnVsbCxcbiAgICAgICAgICAgIHN0YXRpY0RlZmluaXRpb25TeW1ib2w6IHZvaWQgMCxcbiAgICAgICAgICAgIGppdE1hc2tpbmc6ICExLFxuICAgICAgICAgICAgbnVsbGFibGU6ICEwLFxuICAgICAgICAgICAgaW5wdXRFdmVudE9ubHk6ICExLFxuICAgICAgICAgICAgbm9WYWx1ZVBhdGNoaW5nOiAhMSxcbiAgICAgICAgICAgIHBvc2l0aW9uQ2FyZXRPbkNsaWNrOiBcImx2cFwiLFxuICAgICAgICAgICAgY2FzaW5nOiBudWxsLFxuICAgICAgICAgICAgaW5wdXRtb2RlOiBcInRleHRcIixcbiAgICAgICAgICAgIGltcG9ydERhdGFBdHRyaWJ1dGVzOiAhMCxcbiAgICAgICAgICAgIHNoaWZ0UG9zaXRpb25zOiAhMCxcbiAgICAgICAgICAgIHVzZVByb3RvdHlwZURlZmluaXRpb25zOiAhMFxuICAgICAgICB9O1xuICAgICAgICBleHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBfaW5wdXRtYXNrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSwgX2tleWNvZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMCkpLCBfZXNjYXBlUmVnZXggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMTQpKTtcbiAgICAgICAgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICAgICAgICAgIH0gOiBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgICAgICAgICB9LCBfdHlwZW9mKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciAkID0gX2lucHV0bWFzay5kZWZhdWx0LmRlcGVuZGVuY3lMaWIsIGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBmb3JtYXRDb2RlID0ge1xuICAgICAgICAgICAgZDogWyBcIlsxLTldfFsxMl1bMC05XXwzWzAxXVwiLCBEYXRlLnByb3RvdHlwZS5zZXREYXRlLCBcImRheVwiLCBEYXRlLnByb3RvdHlwZS5nZXREYXRlIF0sXG4gICAgICAgICAgICBkZDogWyBcIjBbMS05XXxbMTJdWzAtOV18M1swMV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RGF0ZSwgXCJkYXlcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXREYXRlLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgZGRkOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIGRkZGQ6IFsgXCJcIiBdLFxuICAgICAgICAgICAgbTogWyBcIlsxLTldfDFbMDEyXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNb250aCwgXCJtb250aFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZS5wcm90b3R5cGUuZ2V0TW9udGguY2FsbCh0aGlzKSArIDE7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBtbTogWyBcIjBbMS05XXwxWzAxMl1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TW9udGgsIFwibW9udGhcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRNb250aC5jYWxsKHRoaXMpICsgMSwgMik7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBtbW06IFsgXCJcIiBdLFxuICAgICAgICAgICAgbW1tbTogWyBcIlwiIF0sXG4gICAgICAgICAgICB5eTogWyBcIlswLTldezJ9XCIsIERhdGUucHJvdG90eXBlLnNldEZ1bGxZZWFyLCBcInllYXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRGdWxsWWVhci5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIHl5eXk6IFsgXCJbMC05XXs0fVwiLCBEYXRlLnByb3RvdHlwZS5zZXRGdWxsWWVhciwgXCJ5ZWFyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0RnVsbFllYXIuY2FsbCh0aGlzKSwgNCk7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBoOiBbIFwiWzEtOV18MVswLTJdXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIERhdGUucHJvdG90eXBlLmdldEhvdXJzIF0sXG4gICAgICAgICAgICBoaDogWyBcIjBbMS05XXwxWzAtMl1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRIb3Vycy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIGh4OiBbIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbMC05XXtcIi5jb25jYXQoeCwgXCJ9XCIpO1xuICAgICAgICAgICAgfSwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEYXRlLnByb3RvdHlwZS5nZXRIb3VycztcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIEg6IFsgXCIxP1swLTldfDJbMC0zXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRIb3VycyBdLFxuICAgICAgICAgICAgSEg6IFsgXCIwWzAtOV18MVswLTldfDJbMC0zXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldEhvdXJzLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgSHg6IFsgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlswLTlde1wiLmNvbmNhdCh4LCBcIn1cIik7XG4gICAgICAgICAgICB9LCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldEhvdXJzLmNhbGwodGhpcyksIHgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBNOiBbIFwiWzEtNV0/WzAtOV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWludXRlcywgXCJtaW51dGVzXCIsIERhdGUucHJvdG90eXBlLmdldE1pbnV0ZXMgXSxcbiAgICAgICAgICAgIE1NOiBbIFwiMFswLTldfDFbMC05XXwyWzAtOV18M1swLTldfDRbMC05XXw1WzAtOV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWludXRlcywgXCJtaW51dGVzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWQoRGF0ZS5wcm90b3R5cGUuZ2V0TWludXRlcy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIHM6IFsgXCJbMS01XT9bMC05XVwiLCBEYXRlLnByb3RvdHlwZS5zZXRTZWNvbmRzLCBcInNlY29uZHNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0U2Vjb25kcyBdLFxuICAgICAgICAgICAgc3M6IFsgXCIwWzAtOV18MVswLTldfDJbMC05XXwzWzAtOV18NFswLTldfDVbMC05XVwiLCBEYXRlLnByb3RvdHlwZS5zZXRTZWNvbmRzLCBcInNlY29uZHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRTZWNvbmRzLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgbDogWyBcIlswLTldezN9XCIsIERhdGUucHJvdG90eXBlLnNldE1pbGxpc2Vjb25kcywgXCJtaWxsaXNlY29uZHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhZChEYXRlLnByb3RvdHlwZS5nZXRNaWxsaXNlY29uZHMuY2FsbCh0aGlzKSwgMyk7XG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBMOiBbIFwiWzAtOV17Mn1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWlsbGlzZWNvbmRzLCBcIm1pbGxpc2Vjb25kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFkKERhdGUucHJvdG90eXBlLmdldE1pbGxpc2Vjb25kcy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIHQ6IFsgXCJbYXBdXCIgXSxcbiAgICAgICAgICAgIHR0OiBbIFwiW2FwXW1cIiBdLFxuICAgICAgICAgICAgVDogWyBcIltBUF1cIiBdLFxuICAgICAgICAgICAgVFQ6IFsgXCJbQVBdTVwiIF0sXG4gICAgICAgICAgICBaOiBbIFwiXCIgXSxcbiAgICAgICAgICAgIG86IFsgXCJcIiBdLFxuICAgICAgICAgICAgUzogWyBcIlwiIF1cbiAgICAgICAgfSwgZm9ybWF0QWxpYXMgPSB7XG4gICAgICAgICAgICBpc29EYXRlOiBcInl5eXktbW0tZGRcIixcbiAgICAgICAgICAgIGlzb1RpbWU6IFwiSEg6TU06c3NcIixcbiAgICAgICAgICAgIGlzb0RhdGVUaW1lOiBcInl5eXktbW0tZGQnVCdISDpNTTpzc1wiLFxuICAgICAgICAgICAgaXNvVXRjRGF0ZVRpbWU6IFwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdGNvZGUobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBkeW5NYXRjaGVzID0gbmV3IFJlZ0V4cChcIlxcXFxkKyRcIikuZXhlYyhtYXRjaFswXSk7XG4gICAgICAgICAgICBpZiAoZHluTWF0Y2hlcyAmJiB2b2lkIDAgIT09IGR5bk1hdGNoZXNbMF0pIHtcbiAgICAgICAgICAgICAgICB2YXIgZmNvZGUgPSBmb3JtYXRDb2RlW21hdGNoWzBdWzBdICsgXCJ4XCJdLnNsaWNlKFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmY29kZVswXSA9IGZjb2RlWzBdKGR5bk1hdGNoZXNbMF0pLCBmY29kZVszXSA9IGZjb2RlWzNdKGR5bk1hdGNoZXNbMF0pLCBmY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXRDb2RlW21hdGNoWzBdXSkgcmV0dXJuIGZvcm1hdENvZGVbbWF0Y2hbMF1dO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFRva2VuaXplcihvcHRzKSB7XG4gICAgICAgICAgICBpZiAoIW9wdHMudG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IFtdLCBkeW50b2tlbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZHggaW4gZm9ybWF0Q29kZSkgaWYgKC9cXC4qeCQvLnRlc3QobmR4KSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHluVG9rZW4gPSBuZHhbMF0gKyBcIlxcXFxkK1wiO1xuICAgICAgICAgICAgICAgICAgICAtMSA9PT0gZHludG9rZW5zLmluZGV4T2YoZHluVG9rZW4pICYmIGR5bnRva2Vucy5wdXNoKGR5blRva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgLTEgPT09IHRva2Vucy5pbmRleE9mKG5keFswXSkgJiYgdG9rZW5zLnB1c2gobmR4WzBdKTtcbiAgICAgICAgICAgICAgICBvcHRzLnRva2VuaXplciA9IFwiKFwiICsgKDAgPCBkeW50b2tlbnMubGVuZ3RoID8gZHludG9rZW5zLmpvaW4oXCJ8XCIpICsgXCJ8XCIgOiBcIlwiKSArIHRva2Vucy5qb2luKFwiK3xcIikgKyBcIikrP3wuXCIsIFxuICAgICAgICAgICAgICAgIG9wdHMudG9rZW5pemVyID0gbmV3IFJlZ0V4cChvcHRzLnRva2VuaXplciwgXCJnXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9wdHMudG9rZW5pemVyO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZWZpbGxZZWFyKGRhdGVQYXJ0cywgY3VycmVudFJlc3VsdCwgb3B0cykge1xuICAgICAgICAgICAgaWYgKGRhdGVQYXJ0cy55ZWFyICE9PSBkYXRlUGFydHMucmF3eWVhcikge1xuICAgICAgICAgICAgICAgIHZhciBjcnJudHllYXIgPSBjdXJyZW50WWVhci50b1N0cmluZygpLCBlbnRlcmVkUGFydCA9IGRhdGVQYXJ0cy5yYXd5ZWFyLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgY3VycmVudFllYXJQYXJ0ID0gY3JybnR5ZWFyLnNsaWNlKDAsIGVudGVyZWRQYXJ0Lmxlbmd0aCksIGN1cnJlbnRZZWFyTmV4dFBhcnQgPSBjcnJudHllYXIuc2xpY2UoZW50ZXJlZFBhcnQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAoMiA9PT0gZW50ZXJlZFBhcnQubGVuZ3RoICYmIGVudGVyZWRQYXJ0ID09PSBjdXJyZW50WWVhclBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJ5Q3VycmVudFllYXIgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgZGF0ZVBhcnRzLm1vbnRoIC0gMSwgZGF0ZVBhcnRzLmRheSk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cy5kYXkgPT0gZW50cnlDdXJyZW50WWVhci5nZXREYXRlKCkgJiYgKCFvcHRzLm1heCB8fCBvcHRzLm1heC5kYXRlLmdldFRpbWUoKSA+PSBlbnRyeUN1cnJlbnRZZWFyLmdldFRpbWUoKSkgJiYgKGRhdGVQYXJ0cy5kYXRlLnNldEZ1bGxZZWFyKGN1cnJlbnRZZWFyKSwgXG4gICAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cy55ZWFyID0gY3JybnR5ZWFyLCBjdXJyZW50UmVzdWx0Lmluc2VydCA9IFsge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBjdXJyZW50UmVzdWx0LnBvcyArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBjOiBjdXJyZW50WWVhck5leHRQYXJ0WzBdXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczogY3VycmVudFJlc3VsdC5wb3MgKyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzogY3VycmVudFllYXJOZXh0UGFydFsxXVxuICAgICAgICAgICAgICAgICAgICB9IF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWREYXRlKGRhdGVQYXJ0cywgY3VycmVudFJlc3VsdCwgb3B0cykge1xuICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShkYXRlUGFydHMucmF3ZGF5KSB8fCBcIjI5XCIgPT0gZGF0ZVBhcnRzLmRheSAmJiAhaXNGaW5pdGUoZGF0ZVBhcnRzLnJhd3llYXIpIHx8IG5ldyBEYXRlKGRhdGVQYXJ0cy5kYXRlLmdldEZ1bGxZZWFyKCksIGlzRmluaXRlKGRhdGVQYXJ0cy5yYXdtb250aCkgPyBkYXRlUGFydHMubW9udGggOiBkYXRlUGFydHMuZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpID49IGRhdGVQYXJ0cy5kYXkpIHJldHVybiBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgaWYgKFwiMjlcIiA9PSBkYXRlUGFydHMuZGF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuTWF0Y2ggPSBnZXRUb2tlbk1hdGNoKGN1cnJlbnRSZXN1bHQucG9zLCBvcHRzKTtcbiAgICAgICAgICAgICAgICBpZiAoXCJ5eXl5XCIgPT09IHRva2VuTWF0Y2gudGFyZ2V0TWF0Y2hbMF0gJiYgY3VycmVudFJlc3VsdC5wb3MgLSB0b2tlbk1hdGNoLnRhcmdldE1hdGNoSW5kZXggPT0gMikgcmV0dXJuIGN1cnJlbnRSZXN1bHQucmVtb3ZlID0gY3VycmVudFJlc3VsdC5wb3MgKyAxLCBcbiAgICAgICAgICAgICAgICBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzRGF0ZUluUmFuZ2UoZGF0ZVBhcnRzLCByZXN1bHQsIG9wdHMsIG1hc2tzZXQsIGZyb21DaGVja3ZhbCkge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICBpZiAob3B0cy5taW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZVBhcnRzLnJhd3llYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhd1llYXIgPSBkYXRlUGFydHMucmF3eWVhci5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIiksIG1pblllYXIgPSBvcHRzLm1pbi55ZWFyLnN1YnN0cigwLCByYXdZZWFyLmxlbmd0aCksIG1heFllYXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXdZZWFyIDwgbWluWWVhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuTWF0Y2ggPSBnZXRUb2tlbk1hdGNoKHJlc3VsdC5wb3MsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhd1llYXIgPSBkYXRlUGFydHMucmF3eWVhci5zdWJzdHIoMCwgcmVzdWx0LnBvcyAtIHRva2VuTWF0Y2gudGFyZ2V0TWF0Y2hJbmRleCArIDEpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblllYXIgPSBvcHRzLm1pbi55ZWFyLnN1YnN0cigwLCByYXdZZWFyLmxlbmd0aCksIG1pblllYXIgPD0gcmF3WWVhcikgcmV0dXJuIHJlc3VsdC5yZW1vdmUgPSB0b2tlbk1hdGNoLnRhcmdldE1hdGNoSW5kZXggKyByYXdZZWFyLmxlbmd0aCwgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmF3WWVhciA9IFwieXl5eVwiID09PSB0b2tlbk1hdGNoLnRhcmdldE1hdGNoWzBdID8gZGF0ZVBhcnRzLnJhd3llYXIuc3Vic3RyKDEsIDEpIDogZGF0ZVBhcnRzLnJhd3llYXIuc3Vic3RyKDAsIDEpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblllYXIgPSBvcHRzLm1pbi55ZWFyLnN1YnN0cigyLCAxKSwgbWF4WWVhciA9IG9wdHMubWF4ID8gb3B0cy5tYXgueWVhci5zdWJzdHIoMiwgMSkgOiByYXdZZWFyLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIDEgPT09IHJhd1llYXIubGVuZ3RoICYmIG1pblllYXIgPD0gcmF3WWVhciA8PSBtYXhZZWFyICYmICEwICE9PSBmcm9tQ2hlY2t2YWwpIHJldHVybiBcInl5eXlcIiA9PT0gdG9rZW5NYXRjaC50YXJnZXRNYXRjaFswXSA/IChyZXN1bHQuaW5zZXJ0ID0gWyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiByZXN1bHQucG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiByYXdZZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogITBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXSwgcmVzdWx0LmNhcmV0ID0gcmVzdWx0LnBvcyArIDIsIG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcmVzdWx0LnBvc10uaW5wdXQgPSBvcHRzLm1pbi55ZWFyWzFdKSA6IChyZXN1bHQuaW5zZXJ0ID0gWyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiByZXN1bHQucG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiBvcHRzLm1pbi55ZWFyWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogITBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHJlc3VsdC5wb3MgKyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IHJhd1llYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBdLCByZXN1bHQuY2FyZXQgPSByZXN1bHQucG9zICsgMywgbWFza3NldC52YWxpZFBvc2l0aW9uc1tyZXN1bHQucG9zXS5pbnB1dCA9IG9wdHMubWluLnllYXJbMF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9ICExO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCAmJiBkYXRlUGFydHMueWVhciAmJiBkYXRlUGFydHMueWVhciA9PT0gZGF0ZVBhcnRzLnJhd3llYXIgJiYgb3B0cy5taW4uZGF0ZS5nZXRUaW1lKCkgPT0gb3B0cy5taW4uZGF0ZS5nZXRUaW1lKCkgJiYgKHJlc3VsdCA9IG9wdHMubWluLmRhdGUuZ2V0VGltZSgpIDw9IGRhdGVQYXJ0cy5kYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIG9wdHMubWF4ICYmIG9wdHMubWF4LmRhdGUuZ2V0VGltZSgpID09IG9wdHMubWF4LmRhdGUuZ2V0VGltZSgpICYmIChyZXN1bHQgPSBvcHRzLm1heC5kYXRlLmdldFRpbWUoKSA+PSBkYXRlUGFydHMuZGF0ZS5nZXRUaW1lKCkpLCBcbiAgICAgICAgICAgIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwYXJzZShmb3JtYXQsIGRhdGVPYmpWYWx1ZSwgb3B0cywgcmF3KSB7XG4gICAgICAgICAgICB2YXIgbWFzayA9IFwiXCIsIG1hdGNoLCBmY29kZTtcbiAgICAgICAgICAgIGZvciAoZ2V0VG9rZW5pemVyKG9wdHMpLmxhc3RJbmRleCA9IDA7IG1hdGNoID0gZ2V0VG9rZW5pemVyKG9wdHMpLmV4ZWMoZm9ybWF0KTsgKSBpZiAodm9pZCAwID09PSBkYXRlT2JqVmFsdWUpIGlmIChmY29kZSA9IGZvcm1hdGNvZGUobWF0Y2gpKSBtYXNrICs9IFwiKFwiICsgZmNvZGVbMF0gKyBcIilcIjsgZWxzZSBzd2l0Y2ggKG1hdGNoWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJbXCI6XG4gICAgICAgICAgICAgICAgbWFzayArPSBcIihcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIFwiXVwiOlxuICAgICAgICAgICAgICAgIG1hc2sgKz0gXCIpP1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbWFzayArPSAoMCwgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG1hdGNoWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmNvZGUgPSBmb3JtYXRjb2RlKG1hdGNoKSkgaWYgKCEwICE9PSByYXcgJiYgZmNvZGVbM10pIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0Rm4gPSBmY29kZVszXTtcbiAgICAgICAgICAgICAgICBtYXNrICs9IGdldEZuLmNhbGwoZGF0ZU9ialZhbHVlLmRhdGUpO1xuICAgICAgICAgICAgfSBlbHNlIGZjb2RlWzJdID8gbWFzayArPSBkYXRlT2JqVmFsdWVbXCJyYXdcIiArIGZjb2RlWzJdXSA6IG1hc2sgKz0gbWF0Y2hbMF07IGVsc2UgbWFzayArPSBtYXRjaFswXTtcbiAgICAgICAgICAgIHJldHVybiBtYXNrO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBhZCh2YWwsIGxlbikge1xuICAgICAgICAgICAgZm9yICh2YWwgPSBTdHJpbmcodmFsKSwgbGVuID0gbGVuIHx8IDI7IHZhbC5sZW5ndGggPCBsZW47ICkgdmFsID0gXCIwXCIgKyB2YWw7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFuYWx5c2VNYXNrKG1hc2tTdHJpbmcsIGZvcm1hdCwgb3B0cykge1xuICAgICAgICAgICAgdmFyIGRhdGVPYmogPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoMSwgMCwgMSlcbiAgICAgICAgICAgIH0sIHRhcmdldFByb3AsIG1hc2sgPSBtYXNrU3RyaW5nLCBtYXRjaCwgZGF0ZU9wZXJhdGlvbjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZhbHVlKGRhdGVPYmosIHZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgZGF0ZU9ialt0YXJnZXRQcm9wXSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XS9nLCBcIjBcIiksIGRhdGVPYmpbXCJyYXdcIiArIHRhcmdldFByb3BdID0gdmFsdWUsIFxuICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gZGF0ZU9wZXJhdGlvbiAmJiBkYXRlT3BlcmF0aW9uLmNhbGwoZGF0ZU9iai5kYXRlLCBcIm1vbnRoXCIgPT0gdGFyZ2V0UHJvcCA/IHBhcnNlSW50KGRhdGVPYmpbdGFyZ2V0UHJvcF0pIC0gMSA6IGRhdGVPYmpbdGFyZ2V0UHJvcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIG1hc2spIHtcbiAgICAgICAgICAgICAgICBmb3IgKGdldFRva2VuaXplcihvcHRzKS5sYXN0SW5kZXggPSAwOyBtYXRjaCA9IGdldFRva2VuaXplcihvcHRzKS5leGVjKGZvcm1hdCk7ICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHluTWF0Y2hlcyA9IG5ldyBSZWdFeHAoXCJcXFxcZCskXCIpLmV4ZWMobWF0Y2hbMF0pLCBmY29kZSA9IGR5bk1hdGNoZXMgPyBtYXRjaFswXVswXSArIFwieFwiIDogbWF0Y2hbMF0sIHZhbHVlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHluTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RJbmRleCA9IGdldFRva2VuaXplcihvcHRzKS5sYXN0SW5kZXgsIHRva2FuTWF0Y2ggPSBnZXRUb2tlbk1hdGNoKG1hdGNoLmluZGV4LCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFRva2VuaXplcihvcHRzKS5sYXN0SW5kZXggPSBsYXN0SW5kZXgsIHZhbHVlID0gbWFzay5zbGljZSgwLCBtYXNrLmluZGV4T2YodG9rYW5NYXRjaC5uZXh0TWF0Y2hbMF0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHZhbHVlID0gbWFzay5zbGljZSgwLCBmY29kZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZm9ybWF0Q29kZSwgZmNvZGUpICYmICh0YXJnZXRQcm9wID0gZm9ybWF0Q29kZVtmY29kZV1bMl0sIFxuICAgICAgICAgICAgICAgICAgICBkYXRlT3BlcmF0aW9uID0gZm9ybWF0Q29kZVtmY29kZV1bMV0sIHNldFZhbHVlKGRhdGVPYmosIHZhbHVlLCBvcHRzKSksIG1hc2sgPSBtYXNrLnNsaWNlKHZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlT2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hc2sgJiYgXCJvYmplY3RcIiA9PT0gX3R5cGVvZihtYXNrKSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWFzaywgXCJkYXRlXCIpKSByZXR1cm4gbWFzaztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpbXBvcnREYXRlKGRhdGVPYmosIG9wdHMpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZShvcHRzLmlucHV0Rm9ybWF0LCB7XG4gICAgICAgICAgICAgICAgZGF0ZTogZGF0ZU9ialxuICAgICAgICAgICAgfSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0VG9rZW5NYXRjaChwb3MsIG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBjYWxjUG9zID0gMCwgdGFyZ2V0TWF0Y2gsIG1hdGNoLCBtYXRjaExlbmd0aCA9IDA7XG4gICAgICAgICAgICBmb3IgKGdldFRva2VuaXplcihvcHRzKS5sYXN0SW5kZXggPSAwOyBtYXRjaCA9IGdldFRva2VuaXplcihvcHRzKS5leGVjKG9wdHMuaW5wdXRGb3JtYXQpOyApIHtcbiAgICAgICAgICAgICAgICB2YXIgZHluTWF0Y2hlcyA9IG5ldyBSZWdFeHAoXCJcXFxcZCskXCIpLmV4ZWMobWF0Y2hbMF0pO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaExlbmd0aCA9IGR5bk1hdGNoZXMgPyBwYXJzZUludChkeW5NYXRjaGVzWzBdKSA6IG1hdGNoWzBdLmxlbmd0aCwgY2FsY1BvcyArPSBtYXRjaExlbmd0aCwgXG4gICAgICAgICAgICAgICAgcG9zIDw9IGNhbGNQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2ggPSBtYXRjaCwgbWF0Y2ggPSBnZXRUb2tlbml6ZXIob3B0cykuZXhlYyhvcHRzLmlucHV0Rm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaEluZGV4OiBjYWxjUG9zIC0gbWF0Y2hMZW5ndGgsXG4gICAgICAgICAgICAgICAgbmV4dE1hdGNoOiBtYXRjaCxcbiAgICAgICAgICAgICAgICB0YXJnZXRNYXRjaDogdGFyZ2V0TWF0Y2hcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgX2lucHV0bWFzay5kZWZhdWx0LmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgZGF0ZXRpbWU6IHtcbiAgICAgICAgICAgICAgICBtYXNrOiBmdW5jdGlvbiBtYXNrKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMubnVtZXJpY0lucHV0ID0gITEsIGZvcm1hdENvZGUuUyA9IG9wdHMuaTE4bi5vcmRpbmFsU3VmZml4LmpvaW4oXCJ8XCIpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5pbnB1dEZvcm1hdCA9IGZvcm1hdEFsaWFzW29wdHMuaW5wdXRGb3JtYXRdIHx8IG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMuZGlzcGxheUZvcm1hdCA9IGZvcm1hdEFsaWFzW29wdHMuZGlzcGxheUZvcm1hdF0gfHwgb3B0cy5kaXNwbGF5Rm9ybWF0IHx8IG9wdHMuaW5wdXRGb3JtYXQsIFxuICAgICAgICAgICAgICAgICAgICBvcHRzLm91dHB1dEZvcm1hdCA9IGZvcm1hdEFsaWFzW29wdHMub3V0cHV0Rm9ybWF0XSB8fCBvcHRzLm91dHB1dEZvcm1hdCB8fCBvcHRzLmlucHV0Rm9ybWF0LCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wbGFjZWhvbGRlciA9IFwiXCIgIT09IG9wdHMucGxhY2Vob2xkZXIgPyBvcHRzLnBsYWNlaG9sZGVyIDogb3B0cy5pbnB1dEZvcm1hdC5yZXBsYWNlKC9bW1xcXV0vLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucmVnZXggPSBwYXJzZShvcHRzLmlucHV0Rm9ybWF0LCB2b2lkIDAsIG9wdHMpLCBvcHRzLm1pbiA9IGFuYWx5c2VNYXNrKG9wdHMubWluLCBvcHRzLmlucHV0Rm9ybWF0LCBvcHRzKSwgXG4gICAgICAgICAgICAgICAgICAgIG9wdHMubWF4ID0gYW5hbHlzZU1hc2sob3B0cy5tYXgsIG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMpLCBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgaW5wdXRGb3JtYXQ6IFwiaXNvRGF0ZVRpbWVcIixcbiAgICAgICAgICAgICAgICBkaXNwbGF5Rm9ybWF0OiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgb3V0cHV0Rm9ybWF0OiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgbWluOiBudWxsLFxuICAgICAgICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICAgICAgICBza2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgIGkxOG46IHtcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXM6IFsgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIiwgXCJTdW5cIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiLCBcIlN1bmRheVwiIF0sXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsgXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIiwgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiIF0sXG4gICAgICAgICAgICAgICAgICAgIG9yZGluYWxTdWZmaXg6IFsgXCJzdFwiLCBcIm5kXCIsIFwicmRcIiwgXCJ0aFwiIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByZVZhbGlkYXRpb246IGZ1bmN0aW9uIHByZVZhbGlkYXRpb24oYnVmZmVyLCBwb3MsIGMsIGlzU2VsZWN0aW9uLCBvcHRzLCBtYXNrc2V0LCBjYXJldFBvcywgc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpY3QpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKGMpICYmIGJ1ZmZlcltwb3NdICE9PSBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5NYXRjaCA9IGdldFRva2VuTWF0Y2gocG9zLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbk1hdGNoLm5leHRNYXRjaCAmJiB0b2tlbk1hdGNoLm5leHRNYXRjaFswXSA9PT0gYyAmJiAxIDwgdG9rZW5NYXRjaC50YXJnZXRNYXRjaFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWRhdG9yID0gZm9ybWF0Q29kZVt0b2tlbk1hdGNoLnRhcmdldE1hdGNoWzBdXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3IFJlZ0V4cCh2YWxpZGF0b3IpLnRlc3QoXCIwXCIgKyBidWZmZXJbcG9zIC0gMV0pKSByZXR1cm4gYnVmZmVyW3Bvc10gPSBidWZmZXJbcG9zIC0gMV0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltwb3MgLSAxXSA9IFwiMFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1enp5OiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBidWZmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcG9zIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogcG9zICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHBvcyArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc3RWYWxpZGF0aW9uOiBmdW5jdGlvbiBwb3N0VmFsaWRhdGlvbihidWZmZXIsIHBvcywgYywgY3VycmVudFJlc3VsdCwgb3B0cywgbWFza3NldCwgc3RyaWN0LCBmcm9tQ2hlY2t2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmljdCkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5NYXRjaCwgdmFsaWRhdG9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IGN1cnJlbnRSZXN1bHQpIHJldHVybiB0b2tlbk1hdGNoID0gZ2V0VG9rZW5NYXRjaChwb3MgKyAxLCBvcHRzKSwgdG9rZW5NYXRjaC50YXJnZXRNYXRjaCAmJiB0b2tlbk1hdGNoLnRhcmdldE1hdGNoSW5kZXggPT09IHBvcyAmJiAxIDwgdG9rZW5NYXRjaC50YXJnZXRNYXRjaFswXS5sZW5ndGggJiYgdm9pZCAwICE9PSBmb3JtYXRDb2RlW3Rva2VuTWF0Y2gudGFyZ2V0TWF0Y2hbMF1dICYmICh2YWxpZGF0b3IgPSBmb3JtYXRDb2RlW3Rva2VuTWF0Y2gudGFyZ2V0TWF0Y2hbMF1dWzBdLCBcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cCh2YWxpZGF0b3IpLnRlc3QoXCIwXCIgKyBjKSkgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6IFsge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IFwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBwb3MgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IGNcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zICsgMVxuICAgICAgICAgICAgICAgICAgICB9IDogY3VycmVudFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRSZXN1bHQuZnV6enkgJiYgKGJ1ZmZlciA9IGN1cnJlbnRSZXN1bHQuYnVmZmVyLCBwb3MgPSBjdXJyZW50UmVzdWx0LnBvcyksIFxuICAgICAgICAgICAgICAgICAgICB0b2tlbk1hdGNoID0gZ2V0VG9rZW5NYXRjaChwb3MsIG9wdHMpLCB0b2tlbk1hdGNoLnRhcmdldE1hdGNoICYmIHRva2VuTWF0Y2gudGFyZ2V0TWF0Y2hbMF0gJiYgdm9pZCAwICE9PSBmb3JtYXRDb2RlW3Rva2VuTWF0Y2gudGFyZ2V0TWF0Y2hbMF1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSBmb3JtYXRDb2RlW3Rva2VuTWF0Y2gudGFyZ2V0TWF0Y2hbMF1dWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBidWZmZXIuc2xpY2UodG9rZW5NYXRjaC50YXJnZXRNYXRjaEluZGV4LCB0b2tlbk1hdGNoLnRhcmdldE1hdGNoSW5kZXggKyB0b2tlbk1hdGNoLnRhcmdldE1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAhMSA9PT0gbmV3IFJlZ0V4cCh2YWxpZGF0b3IpLnRlc3QocGFydC5qb2luKFwiXCIpKSAmJiAyID09PSB0b2tlbk1hdGNoLnRhcmdldE1hdGNoWzBdLmxlbmd0aCAmJiBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3Rva2VuTWF0Y2gudGFyZ2V0TWF0Y2hJbmRleF0gJiYgbWFza3NldC52YWxpZFBvc2l0aW9uc1t0b2tlbk1hdGNoLnRhcmdldE1hdGNoSW5kZXggKyAxXSAmJiAobWFza3NldC52YWxpZFBvc2l0aW9uc1t0b2tlbk1hdGNoLnRhcmdldE1hdGNoSW5kZXggKyAxXS5pbnB1dCA9IFwiMFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY3VycmVudFJlc3VsdCwgZGF0ZVBhcnRzID0gYW5hbHlzZU1hc2soYnVmZmVyLmpvaW4oXCJcIiksIG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIGRhdGVQYXJ0cy5kYXRlLmdldFRpbWUoKSA9PSBkYXRlUGFydHMuZGF0ZS5nZXRUaW1lKCkgJiYgKHJlc3VsdCA9IHByZWZpbGxZZWFyKGRhdGVQYXJ0cywgcmVzdWx0LCBvcHRzKSwgXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGlzVmFsaWREYXRlKGRhdGVQYXJ0cywgcmVzdWx0LCBvcHRzKSwgcmVzdWx0ID0gaXNEYXRlSW5SYW5nZShkYXRlUGFydHMsIHJlc3VsdCwgb3B0cywgbWFza3NldCwgZnJvbUNoZWNrdmFsKSksIFxuICAgICAgICAgICAgICAgICAgICBwb3MgJiYgcmVzdWx0ICYmIGN1cnJlbnRSZXN1bHQucG9zICE9PSBwb3MgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXI6IHBhcnNlKG9wdHMuaW5wdXRGb3JtYXQsIGRhdGVQYXJ0cywgb3B0cykuc3BsaXQoXCJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBwb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBjdXJyZW50UmVzdWx0LnBvc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IDogcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiBmdW5jdGlvbiBvbktleURvd24oZSwgYnVmZmVyLCBjYXJldFBvcywgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBlLmN0cmxLZXkgJiYgZS5rZXlDb2RlID09PSBfa2V5Y29kZS5kZWZhdWx0LlJJR0hUICYmICh0aGlzLmlucHV0bWFzay5fdmFsdWVTZXQoaW1wb3J0RGF0ZShuZXcgRGF0ZSgpLCBvcHRzKSksIFxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24gb25Vbk1hc2sobWFza2VkVmFsdWUsIHVubWFza2VkVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVubWFza2VkVmFsdWUgPyBwYXJzZShvcHRzLm91dHB1dEZvcm1hdCwgYW5hbHlzZU1hc2sobWFza2VkVmFsdWUsIG9wdHMuaW5wdXRGb3JtYXQsIG9wdHMpLCBvcHRzLCAhMCkgOiB1bm1hc2tlZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2FzaW5nOiBmdW5jdGlvbiBjYXNpbmcoZWxlbSwgdGVzdCwgcG9zLCB2YWxpZFBvc2l0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMCA9PSB0ZXN0Lm5hdGl2ZURlZi5pbmRleE9mKFwiW2FwXVwiKSA/IGVsZW0udG9Mb3dlckNhc2UoKSA6IDAgPT0gdGVzdC5uYXRpdmVEZWYuaW5kZXhPZihcIltBUF1cIikgPyBlbGVtLnRvVXBwZXJDYXNlKCkgOiBlbGVtO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25CZWZvcmVNYXNrOiBmdW5jdGlvbiBvbkJlZm9yZU1hc2soaW5pdGlhbFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIltvYmplY3QgRGF0ZV1cIiA9PT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGluaXRpYWxWYWx1ZSkgJiYgKGluaXRpYWxWYWx1ZSA9IGltcG9ydERhdGUoaW5pdGlhbFZhbHVlLCBvcHRzKSksIFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiAhMSxcbiAgICAgICAgICAgICAgICBzaGlmdFBvc2l0aW9uczogITEsXG4gICAgICAgICAgICAgICAga2VlcFN0YXRpYzogITEsXG4gICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcIm51bWVyaWNcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBfaW5wdXRtYXNrID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfX3dlYnBhY2tfcmVxdWlyZV9fKDEpKSwgX2tleWNvZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMCkpLCBfZXNjYXBlUmVnZXggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMTQpKTtcbiAgICAgICAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciAkID0gX2lucHV0bWFzay5kZWZhdWx0LmRlcGVuZGVuY3lMaWI7XG4gICAgICAgIGZ1bmN0aW9uIGF1dG9Fc2NhcGUodHh0LCBvcHRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBlc2NhcGVkVHh0ID0gXCJcIiwgaSA9IDA7IGkgPCB0eHQubGVuZ3RoOyBpKyspIF9pbnB1dG1hc2suZGVmYXVsdC5wcm90b3R5cGUuZGVmaW5pdGlvbnNbdHh0LmNoYXJBdChpKV0gfHwgb3B0cy5kZWZpbml0aW9uc1t0eHQuY2hhckF0KGkpXSB8fCBvcHRzLm9wdGlvbmFsbWFya2VyWzBdID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMub3B0aW9uYWxtYXJrZXJbMV0gPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5xdWFudGlmaWVybWFya2VyWzBdID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMucXVhbnRpZmllcm1hcmtlclsxXSA9PT0gdHh0LmNoYXJBdChpKSB8fCBvcHRzLmdyb3VwbWFya2VyWzBdID09PSB0eHQuY2hhckF0KGkpIHx8IG9wdHMuZ3JvdXBtYXJrZXJbMV0gPT09IHR4dC5jaGFyQXQoaSkgfHwgb3B0cy5hbHRlcm5hdG9ybWFya2VyID09PSB0eHQuY2hhckF0KGkpID8gZXNjYXBlZFR4dCArPSBcIlxcXFxcIiArIHR4dC5jaGFyQXQoaSkgOiBlc2NhcGVkVHh0ICs9IHR4dC5jaGFyQXQoaSk7XG4gICAgICAgICAgICByZXR1cm4gZXNjYXBlZFR4dDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhbGlnbkRpZ2l0cyhidWZmZXIsIGRpZ2l0cywgb3B0cywgZm9yY2UpIHtcbiAgICAgICAgICAgIGlmICgwIDwgYnVmZmVyLmxlbmd0aCAmJiAwIDwgZGlnaXRzICYmICghb3B0cy5kaWdpdHNPcHRpb25hbCB8fCBmb3JjZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3NpdGlvbiA9IGJ1ZmZlci5pbmRleE9mKG9wdHMucmFkaXhQb2ludCksIG5lZ2F0aW9uQmFjayA9ICExO1xuICAgICAgICAgICAgICAgIG9wdHMubmVnYXRpb25TeW1ib2wuYmFjayA9PT0gYnVmZmVyW2J1ZmZlci5sZW5ndGggLSAxXSAmJiAobmVnYXRpb25CYWNrID0gITAsIGJ1ZmZlci5sZW5ndGgtLSksIFxuICAgICAgICAgICAgICAgIC0xID09PSByYWRpeFBvc2l0aW9uICYmIChidWZmZXIucHVzaChvcHRzLnJhZGl4UG9pbnQpLCByYWRpeFBvc2l0aW9uID0gYnVmZmVyLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGRpZ2l0czsgaSsrKSBpc0Zpbml0ZShidWZmZXJbcmFkaXhQb3NpdGlvbiArIGldKSB8fCAoYnVmZmVyW3JhZGl4UG9zaXRpb24gKyBpXSA9IFwiMFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZWdhdGlvbkJhY2sgJiYgYnVmZmVyLnB1c2gob3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSwgYnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGZpbmRWYWxpZGF0b3Ioc3ltYm9sLCBtYXNrc2V0KSB7XG4gICAgICAgICAgICB2YXIgcG9zTmR4ID0gMDtcbiAgICAgICAgICAgIGlmIChcIitcIiA9PT0gc3ltYm9sKSB7XG4gICAgICAgICAgICAgICAgZm9yIChwb3NOZHggaW4gbWFza3NldC52YWxpZFBvc2l0aW9ucykgO1xuICAgICAgICAgICAgICAgIHBvc05keCA9IHBhcnNlSW50KHBvc05keCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciB0c3ROZHggaW4gbWFza3NldC50ZXN0cykgaWYgKHRzdE5keCA9IHBhcnNlSW50KHRzdE5keCksIHBvc05keCA8PSB0c3ROZHgpIGZvciAodmFyIG5keCA9IDAsIG5keGwgPSBtYXNrc2V0LnRlc3RzW3RzdE5keF0ubGVuZ3RoOyBuZHggPCBuZHhsOyBuZHgrKykgaWYgKCh2b2lkIDAgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbdHN0TmR4XSB8fCBcIi1cIiA9PT0gc3ltYm9sKSAmJiBtYXNrc2V0LnRlc3RzW3RzdE5keF1bbmR4XS5tYXRjaC5kZWYgPT09IHN5bWJvbCkgcmV0dXJuIHRzdE5keCArICh2b2lkIDAgIT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbdHN0TmR4XSAmJiBcIi1cIiAhPT0gc3ltYm9sID8gMSA6IDApO1xuICAgICAgICAgICAgcmV0dXJuIHBvc05keDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBmaW5kVmFsaWQoc3ltYm9sLCBtYXNrc2V0KSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gLTE7XG4gICAgICAgICAgICBmb3IgKHZhciBuZHggaW4gbWFza3NldC52YWxpZFBvc2l0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciB0c3QgPSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW25keF07XG4gICAgICAgICAgICAgICAgaWYgKHRzdCAmJiB0c3QubWF0Y2guZGVmID09PSBzeW1ib2wpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gcGFyc2VJbnQobmR4KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwYXJzZU1pbk1heE9wdGlvbnMob3B0cykge1xuICAgICAgICAgICAgdm9pZCAwID09PSBvcHRzLnBhcnNlTWluTWF4T3B0aW9ucyAmJiAobnVsbCAhPT0gb3B0cy5taW4gJiYgKG9wdHMubWluID0gb3B0cy5taW4udG9TdHJpbmcoKS5yZXBsYWNlKG5ldyBSZWdFeHAoKDAsIFxuICAgICAgICAgICAgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpLCBcIixcIiA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIChvcHRzLm1pbiA9IG9wdHMubWluLnJlcGxhY2Uob3B0cy5yYWRpeFBvaW50LCBcIi5cIikpLCBcbiAgICAgICAgICAgIG9wdHMubWluID0gaXNGaW5pdGUob3B0cy5taW4pID8gcGFyc2VGbG9hdChvcHRzLm1pbikgOiBOYU4sIGlzTmFOKG9wdHMubWluKSAmJiAob3B0cy5taW4gPSBOdW1iZXIuTUlOX1ZBTFVFKSksIFxuICAgICAgICAgICAgbnVsbCAhPT0gb3B0cy5tYXggJiYgKG9wdHMubWF4ID0gb3B0cy5tYXgudG9TdHJpbmcoKS5yZXBsYWNlKG5ldyBSZWdFeHAoKDAsIF9lc2NhcGVSZWdleC5kZWZhdWx0KShvcHRzLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICBcIixcIiA9PT0gb3B0cy5yYWRpeFBvaW50ICYmIChvcHRzLm1heCA9IG9wdHMubWF4LnJlcGxhY2Uob3B0cy5yYWRpeFBvaW50LCBcIi5cIikpLCBcbiAgICAgICAgICAgIG9wdHMubWF4ID0gaXNGaW5pdGUob3B0cy5tYXgpID8gcGFyc2VGbG9hdChvcHRzLm1heCkgOiBOYU4sIGlzTmFOKG9wdHMubWF4KSAmJiAob3B0cy5tYXggPSBOdW1iZXIuTUFYX1ZBTFVFKSksIFxuICAgICAgICAgICAgb3B0cy5wYXJzZU1pbk1heE9wdGlvbnMgPSBcImRvbmVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2VuTWFzayhvcHRzKSB7XG4gICAgICAgICAgICBvcHRzLnJlcGVhdCA9IDAsIG9wdHMuZ3JvdXBTZXBhcmF0b3IgPT09IG9wdHMucmFkaXhQb2ludCAmJiBvcHRzLmRpZ2l0cyAmJiBcIjBcIiAhPT0gb3B0cy5kaWdpdHMgJiYgKFwiLlwiID09PSBvcHRzLnJhZGl4UG9pbnQgPyBvcHRzLmdyb3VwU2VwYXJhdG9yID0gXCIsXCIgOiBcIixcIiA9PT0gb3B0cy5yYWRpeFBvaW50ID8gb3B0cy5ncm91cFNlcGFyYXRvciA9IFwiLlwiIDogb3B0cy5ncm91cFNlcGFyYXRvciA9IFwiXCIpLCBcbiAgICAgICAgICAgIFwiIFwiID09PSBvcHRzLmdyb3VwU2VwYXJhdG9yICYmIChvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgPSB2b2lkIDApLCAxIDwgb3B0cy5wbGFjZWhvbGRlci5sZW5ndGggJiYgKG9wdHMucGxhY2Vob2xkZXIgPSBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSksIFxuICAgICAgICAgICAgXCJyYWRpeEZvY3VzXCIgPT09IG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2sgJiYgXCJcIiA9PT0gb3B0cy5wbGFjZWhvbGRlciAmJiAob3B0cy5wb3NpdGlvbkNhcmV0T25DbGljayA9IFwibHZwXCIpO1xuICAgICAgICAgICAgdmFyIGRlY2ltYWxEZWYgPSBcIjBcIiwgcmFkaXhQb2ludERlZiA9IG9wdHMucmFkaXhQb2ludDtcbiAgICAgICAgICAgICEwID09PSBvcHRzLm51bWVyaWNJbnB1dCAmJiB2b2lkIDAgPT09IG9wdHMuX19maW5hbmNlSW5wdXQgPyAoZGVjaW1hbERlZiA9IFwiMVwiLCBcbiAgICAgICAgICAgIG9wdHMucG9zaXRpb25DYXJldE9uQ2xpY2sgPSBcInJhZGl4Rm9jdXNcIiA9PT0gb3B0cy5wb3NpdGlvbkNhcmV0T25DbGljayA/IFwibHZwXCIgOiBvcHRzLnBvc2l0aW9uQ2FyZXRPbkNsaWNrLCBcbiAgICAgICAgICAgIG9wdHMuZGlnaXRzT3B0aW9uYWwgPSAhMSwgaXNOYU4ob3B0cy5kaWdpdHMpICYmIChvcHRzLmRpZ2l0cyA9IDIpLCBvcHRzLl9yYWRpeERhbmNlID0gITEsIFxuICAgICAgICAgICAgcmFkaXhQb2ludERlZiA9IFwiLFwiID09PSBvcHRzLnJhZGl4UG9pbnQgPyBcIj9cIiA6IFwiIVwiLCBcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgdm9pZCAwID09PSBvcHRzLmRlZmluaXRpb25zW3JhZGl4UG9pbnREZWZdICYmIChvcHRzLmRlZmluaXRpb25zW3JhZGl4UG9pbnREZWZdID0ge30sIFxuICAgICAgICAgICAgb3B0cy5kZWZpbml0aW9uc1tyYWRpeFBvaW50RGVmXS52YWxpZGF0b3IgPSBcIltcIiArIG9wdHMucmFkaXhQb2ludCArIFwiXVwiLCBvcHRzLmRlZmluaXRpb25zW3JhZGl4UG9pbnREZWZdLnBsYWNlaG9sZGVyID0gb3B0cy5yYWRpeFBvaW50LCBcbiAgICAgICAgICAgIG9wdHMuZGVmaW5pdGlvbnNbcmFkaXhQb2ludERlZl0uc3RhdGljID0gITAsIG9wdHMuZGVmaW5pdGlvbnNbcmFkaXhQb2ludERlZl0uZ2VuZXJhdGVkID0gITApKSA6IChvcHRzLl9fZmluYW5jZUlucHV0ID0gITEsIFxuICAgICAgICAgICAgb3B0cy5udW1lcmljSW5wdXQgPSAhMCk7XG4gICAgICAgICAgICB2YXIgbWFzayA9IFwiWytdXCIsIGFsdE1hc2s7XG4gICAgICAgICAgICBpZiAobWFzayArPSBhdXRvRXNjYXBlKG9wdHMucHJlZml4LCBvcHRzKSwgXCJcIiAhPT0gb3B0cy5ncm91cFNlcGFyYXRvciA/ICh2b2lkIDAgPT09IG9wdHMuZGVmaW5pdGlvbnNbb3B0cy5ncm91cFNlcGFyYXRvcl0gJiYgKG9wdHMuZGVmaW5pdGlvbnNbb3B0cy5ncm91cFNlcGFyYXRvcl0gPSB7fSwgXG4gICAgICAgICAgICBvcHRzLmRlZmluaXRpb25zW29wdHMuZ3JvdXBTZXBhcmF0b3JdLnZhbGlkYXRvciA9IFwiW1wiICsgb3B0cy5ncm91cFNlcGFyYXRvciArIFwiXVwiLCBcbiAgICAgICAgICAgIG9wdHMuZGVmaW5pdGlvbnNbb3B0cy5ncm91cFNlcGFyYXRvcl0ucGxhY2Vob2xkZXIgPSBvcHRzLmdyb3VwU2VwYXJhdG9yLCBvcHRzLmRlZmluaXRpb25zW29wdHMuZ3JvdXBTZXBhcmF0b3JdLnN0YXRpYyA9ICEwLCBcbiAgICAgICAgICAgIG9wdHMuZGVmaW5pdGlvbnNbb3B0cy5ncm91cFNlcGFyYXRvcl0uZ2VuZXJhdGVkID0gITApLCBtYXNrICs9IG9wdHMuX21hc2sob3B0cykpIDogbWFzayArPSBcIjl7K31cIiwgXG4gICAgICAgICAgICB2b2lkIDAgIT09IG9wdHMuZGlnaXRzICYmIDAgIT09IG9wdHMuZGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRxID0gb3B0cy5kaWdpdHMudG9TdHJpbmcoKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgaXNGaW5pdGUoZHFbMF0pICYmIGRxWzFdICYmIGlzRmluaXRlKGRxWzFdKSA/IG1hc2sgKz0gcmFkaXhQb2ludERlZiArIGRlY2ltYWxEZWYgKyBcIntcIiArIG9wdHMuZGlnaXRzICsgXCJ9XCIgOiAoaXNOYU4ob3B0cy5kaWdpdHMpIHx8IDAgPCBwYXJzZUludChvcHRzLmRpZ2l0cykpICYmIChvcHRzLmRpZ2l0c09wdGlvbmFsID8gKGFsdE1hc2sgPSBtYXNrICsgcmFkaXhQb2ludERlZiArIGRlY2ltYWxEZWYgKyBcInswLFwiICsgb3B0cy5kaWdpdHMgKyBcIn1cIiwgXG4gICAgICAgICAgICAgICAgb3B0cy5rZWVwU3RhdGljID0gITApIDogbWFzayArPSByYWRpeFBvaW50RGVmICsgZGVjaW1hbERlZiArIFwie1wiICsgb3B0cy5kaWdpdHMgKyBcIn1cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWFzayArPSBhdXRvRXNjYXBlKG9wdHMuc3VmZml4LCBvcHRzKSwgbWFzayArPSBcIlstXVwiLCBhbHRNYXNrICYmIChtYXNrID0gWyBhbHRNYXNrICsgYXV0b0VzY2FwZShvcHRzLnN1ZmZpeCwgb3B0cykgKyBcIlstXVwiLCBtYXNrIF0pLCBcbiAgICAgICAgICAgIG9wdHMuZ3JlZWR5ID0gITEsIHBhcnNlTWluTWF4T3B0aW9ucyhvcHRzKSwgbWFzaztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYW5uZGxlUmFkaXhEYW5jZShwb3MsIGMsIHJhZGl4UG9zLCBtYXNrc2V0LCBvcHRzKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0cy5fcmFkaXhEYW5jZSAmJiBvcHRzLm51bWVyaWNJbnB1dCAmJiBjICE9PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2sgJiYgcG9zIDw9IHJhZGl4UG9zICYmICgwIDwgcmFkaXhQb3MgfHwgYyA9PSBvcHRzLnJhZGl4UG9pbnQpICYmICh2b2lkIDAgPT09IG1hc2tzZXQudmFsaWRQb3NpdGlvbnNbcG9zIC0gMV0gfHwgbWFza3NldC52YWxpZFBvc2l0aW9uc1twb3MgLSAxXS5pbnB1dCAhPT0gb3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrKSAmJiAocG9zIC09IDEpLCBcbiAgICAgICAgICAgIHBvcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkZWNpbWFsVmFsaWRhdG9yKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XG4gICAgICAgICAgICB2YXIgcmFkaXhQb3MgPSBtYXNrc2V0LmJ1ZmZlciA/IG1hc2tzZXQuYnVmZmVyLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KSA6IC0xLCByZXN1bHQgPSAtMSAhPT0gcmFkaXhQb3MgJiYgbmV3IFJlZ0V4cChcIlswLTlcXHVmZjExLVxcdWZmMTldXCIpLnRlc3QoY2hycyk7XG4gICAgICAgICAgICByZXR1cm4gb3B0cy5fcmFkaXhEYW5jZSAmJiByZXN1bHQgJiYgbnVsbCA9PSBtYXNrc2V0LnZhbGlkUG9zaXRpb25zW3JhZGl4UG9zXSA/IHtcbiAgICAgICAgICAgICAgICBpbnNlcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zOiByYWRpeFBvcyA9PT0gcG9zID8gcmFkaXhQb3MgKyAxIDogcmFkaXhQb3MsXG4gICAgICAgICAgICAgICAgICAgIGM6IG9wdHMucmFkaXhQb2ludFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zOiBwb3NcbiAgICAgICAgICAgIH0gOiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tGb3JMZWFkaW5nWmVyb2VzKGJ1ZmZlciwgb3B0cykge1xuICAgICAgICAgICAgdmFyIG51bWJlck1hdGNoZXMgPSBuZXcgUmVnRXhwKFwiKF5cIiArIChcIlwiICE9PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250ID8gKDAsIF9lc2NhcGVSZWdleC5kZWZhdWx0KShvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSArIFwiP1wiIDogXCJcIikgKyAoMCwgXG4gICAgICAgICAgICBfZXNjYXBlUmVnZXguZGVmYXVsdCkob3B0cy5wcmVmaXgpICsgXCIpKC4qKShcIiArICgwLCBfZXNjYXBlUmVnZXguZGVmYXVsdCkob3B0cy5zdWZmaXgpICsgKFwiXCIgIT0gb3B0cy5uZWdhdGlvblN5bWJvbC5iYWNrID8gKDAsIFxuICAgICAgICAgICAgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKyBcIj9cIiA6IFwiXCIpICsgXCIkKVwiKS5leGVjKGJ1ZmZlci5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpKSwgbnVtYmVyID0gbnVtYmVyTWF0Y2hlcyA/IG51bWJlck1hdGNoZXNbMl0gOiBcIlwiLCBsZWFkaW5nemVyb2VzID0gITE7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyICYmIChudW1iZXIgPSBudW1iZXIuc3BsaXQob3B0cy5yYWRpeFBvaW50LmNoYXJBdCgwKSlbMF0sIGxlYWRpbmd6ZXJvZXMgPSBuZXcgUmVnRXhwKFwiXlswXCIgKyBvcHRzLmdyb3VwU2VwYXJhdG9yICsgXCJdKlwiKS5leGVjKG51bWJlcikpLCBcbiAgICAgICAgICAgICEoIWxlYWRpbmd6ZXJvZXMgfHwgISgxIDwgbGVhZGluZ3plcm9lc1swXS5sZW5ndGggfHwgMCA8IGxlYWRpbmd6ZXJvZXNbMF0ubGVuZ3RoICYmIGxlYWRpbmd6ZXJvZXNbMF0ubGVuZ3RoIDwgbnVtYmVyLmxlbmd0aCkpICYmIGxlYWRpbmd6ZXJvZXM7XG4gICAgICAgIH1cbiAgICAgICAgX2lucHV0bWFzay5kZWZhdWx0LmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgbnVtZXJpYzoge1xuICAgICAgICAgICAgICAgIG1hc2s6IGdlbk1hc2ssXG4gICAgICAgICAgICAgICAgX21hc2s6IGZ1bmN0aW9uIF9tYXNrKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiKFwiICsgb3B0cy5ncm91cFNlcGFyYXRvciArIFwiOTk5KXsrfDF9XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaWdpdHM6IFwiKlwiLFxuICAgICAgICAgICAgICAgIGRpZ2l0c09wdGlvbmFsOiAhMCxcbiAgICAgICAgICAgICAgICBlbmZvcmNlRGlnaXRzT25CbHVyOiAhMSxcbiAgICAgICAgICAgICAgICByYWRpeFBvaW50OiBcIi5cIixcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkNhcmV0T25DbGljazogXCJyYWRpeEZvY3VzXCIsXG4gICAgICAgICAgICAgICAgX3JhZGl4RGFuY2U6ICEwLFxuICAgICAgICAgICAgICAgIGdyb3VwU2VwYXJhdG9yOiBcIlwiLFxuICAgICAgICAgICAgICAgIGFsbG93TWludXM6ICEwLFxuICAgICAgICAgICAgICAgIG5lZ2F0aW9uU3ltYm9sOiB7XG4gICAgICAgICAgICAgICAgICAgIGZyb250OiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgYmFjazogXCJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJlZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJcIixcbiAgICAgICAgICAgICAgICBtaW46IG51bGwsXG4gICAgICAgICAgICAgICAgbWF4OiBudWxsLFxuICAgICAgICAgICAgICAgIFNldE1heE9uT3ZlcmZsb3c6ICExLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICAgICAgaW5wdXRUeXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICB1bm1hc2tBc051bWJlcjogITEsXG4gICAgICAgICAgICAgICAgcm91bmRpbmdGTjogTWF0aC5yb3VuZCxcbiAgICAgICAgICAgICAgICBpbnB1dG1vZGU6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHNob3J0Y3V0czoge1xuICAgICAgICAgICAgICAgICAgICBrOiBcIjAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBtOiBcIjAwMDAwMFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwXCIsXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiAhMSxcbiAgICAgICAgICAgICAgICByaWdodEFsaWduOiAhMCxcbiAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiAhMCxcbiAgICAgICAgICAgICAgICBhdXRvVW5tYXNrOiAhMSxcbiAgICAgICAgICAgICAgICBza2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIDA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZGVjaW1hbFZhbGlkYXRvclxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAxOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGRlY2ltYWxWYWxpZGF0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uU3ltYm9sOiBcIjlcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIitcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbiB2YWxpZGF0b3IoY2hycywgbWFza3NldCwgcG9zLCBzdHJpY3QsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5hbGxvd01pbnVzICYmIChcIi1cIiA9PT0gY2hycyB8fCBjaHJzID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCItXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24gdmFsaWRhdG9yKGNocnMsIG1hc2tzZXQsIHBvcywgc3RyaWN0LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMuYWxsb3dNaW51cyAmJiBjaHJzID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByZVZhbGlkYXRpb246IGZ1bmN0aW9uIHByZVZhbGlkYXRpb24oYnVmZmVyLCBwb3MsIGMsIGlzU2VsZWN0aW9uLCBvcHRzLCBtYXNrc2V0LCBjYXJldFBvcywgc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghMSAhPT0gb3B0cy5fX2ZpbmFuY2VJbnB1dCAmJiBjID09PSBvcHRzLnJhZGl4UG9pbnQpIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdHRlcm47XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuID0gb3B0cy5zaG9ydGN1dHMgJiYgb3B0cy5zaG9ydGN1dHNbY10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxIDwgcGF0dGVybi5sZW5ndGgpIGZvciAodmFyIGluc2VydHMgPSBbXSwgaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSBpbnNlcnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcG9zICsgaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiBwYXR0ZXJuW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogITFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6IGluc2VydHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4UG9zID0gYnVmZmVyLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KSwgaW5pdFBvcyA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA9IGhhbm5kbGVSYWRpeERhbmNlKHBvcywgYywgcmFkaXhQb3MsIG1hc2tzZXQsIG9wdHMpLCBcIi1cIiA9PT0gYyB8fCBjID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgIT09IG9wdHMuYWxsb3dNaW51cykgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzTmVnYXRpdmUgPSAhMSwgZnJvbnQgPSBmaW5kVmFsaWQoXCIrXCIsIG1hc2tzZXQpLCBiYWNrID0gZmluZFZhbGlkKFwiLVwiLCBtYXNrc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMSAhPT0gZnJvbnQgJiYgKGlzTmVnYXRpdmUgPSBbIGZyb250LCBiYWNrIF0pLCAhMSAhPT0gaXNOZWdhdGl2ZSA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmU6IGlzTmVnYXRpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IGluaXRQb3MgLSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6IFsge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IGZpbmRWYWxpZGF0b3IoXCIrXCIsIG1hc2tzZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tSXNWYWxpZDogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogZmluZFZhbGlkYXRvcihcIi1cIiwgbWFza3NldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IG9wdHMubmVnYXRpb25TeW1ib2wuYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUlzVmFsaWQ6IHZvaWQgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogaW5pdFBvcyArIG9wdHMubmVnYXRpb25TeW1ib2wuYmFjay5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT09IG9wdHMuZ3JvdXBTZXBhcmF0b3IpIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogaW5pdFBvc1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaWN0KSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gcmFkaXhQb3MgJiYgITAgPT09IG9wdHMuX3JhZGl4RGFuY2UgJiYgITEgPT09IGlzU2VsZWN0aW9uICYmIGMgPT09IG9wdHMucmFkaXhQb2ludCAmJiB2b2lkIDAgIT09IG9wdHMuZGlnaXRzICYmIChpc05hTihvcHRzLmRpZ2l0cykgfHwgMCA8IHBhcnNlSW50KG9wdHMuZGlnaXRzKSkgJiYgcmFkaXhQb3MgIT09IHBvcykgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBvcHRzLl9yYWRpeERhbmNlICYmIHBvcyA9PT0gcmFkaXhQb3MgLSAxID8gcmFkaXhQb3MgKyAxIDogcmFkaXhQb3NcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCExID09PSBvcHRzLl9fZmluYW5jZUlucHV0KSBpZiAoaXNTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmRpZ2l0c09wdGlvbmFsKSByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld3JpdGVQb3NpdGlvbjogY2FyZXRQb3MuZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLmRpZ2l0c09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmV0UG9zLmJlZ2luID4gcmFkaXhQb3MgJiYgY2FyZXRQb3MuZW5kIDw9IHJhZGl4UG9zKSByZXR1cm4gYyA9PT0gb3B0cy5yYWRpeFBvaW50ID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogcmFkaXhQb3MgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tSXNWYWxpZDogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3cml0ZVBvc2l0aW9uOiByYWRpeFBvc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld3JpdGVQb3NpdGlvbjogcmFkaXhQb3MgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZXRQb3MuYmVnaW4gPCByYWRpeFBvcykgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3cml0ZVBvc2l0aW9uOiBjYXJldFBvcy5iZWdpbiAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFvcHRzLnNob3dNYXNrT25Ib3ZlciAmJiAhb3B0cy5zaG93TWFza09uRm9jdXMgJiYgIW9wdHMuZGlnaXRzT3B0aW9uYWwgJiYgMCA8IG9wdHMuZGlnaXRzICYmIFwiXCIgPT09IHRoaXMuaW5wdXRtYXNrLl9fdmFsdWVHZXQuY2FsbCh0aGlzKSkgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld3JpdGVQb3NpdGlvbjogcmFkaXhQb3NcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld3JpdGVQb3NpdGlvbjogcG9zXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3N0VmFsaWRhdGlvbjogZnVuY3Rpb24gcG9zdFZhbGlkYXRpb24oYnVmZmVyLCBwb3MsIGMsIGN1cnJlbnRSZXN1bHQsIG9wdHMsIG1hc2tzZXQsIHN0cmljdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IGN1cnJlbnRSZXN1bHQpIHJldHVybiBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaWN0KSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBvcHRzLm1pbiB8fCBudWxsICE9PSBvcHRzLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVubWFza2VkID0gb3B0cy5vblVuTWFzayhidWZmZXIuc2xpY2UoKS5yZXZlcnNlKCkuam9pbihcIlwiKSwgdm9pZCAwLCAkLmV4dGVuZCh7fSwgb3B0cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWFza0FzTnVtYmVyOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IG9wdHMubWluICYmIHVubWFza2VkIDwgb3B0cy5taW4gJiYgKHVubWFza2VkLnRvU3RyaW5nKCkubGVuZ3RoID4gb3B0cy5taW4udG9TdHJpbmcoKS5sZW5ndGggfHwgdW5tYXNrZWQgPCAwKSkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IG9wdHMubWF4ICYmIHVubWFza2VkID4gb3B0cy5tYXgpIHJldHVybiAhIW9wdHMuU2V0TWF4T25PdmVyZmxvdyAmJiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEZyb21CdWZmZXI6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogYWxpZ25EaWdpdHMob3B0cy5tYXgudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpLnNwbGl0KFwiXCIpLCBvcHRzLmRpZ2l0cywgb3B0cykucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uIG9uVW5NYXNrKG1hc2tlZFZhbHVlLCB1bm1hc2tlZFZhbHVlLCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIlwiID09PSB1bm1hc2tlZFZhbHVlICYmICEwID09PSBvcHRzLm51bGxhYmxlKSByZXR1cm4gdW5tYXNrZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NWYWx1ZSA9IG1hc2tlZFZhbHVlLnJlcGxhY2Uob3B0cy5wcmVmaXgsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2Uob3B0cy5zdWZmaXgsIFwiXCIpLCBwcm9jZXNzVmFsdWUgPSBwcm9jZXNzVmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKCgwLCBcbiAgICAgICAgICAgICAgICAgICAgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpLCBcIlwiICE9PSBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSAmJiAocHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSwgXCJnXCIpLCBcIjBcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgb3B0cy51bm1hc2tBc051bWJlciA/IChcIlwiICE9PSBvcHRzLnJhZGl4UG9pbnQgJiYgLTEgIT09IHByb2Nlc3NWYWx1ZS5pbmRleE9mKG9wdHMucmFkaXhQb2ludCkgJiYgKHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKF9lc2NhcGVSZWdleC5kZWZhdWx0LmNhbGwodGhpcywgb3B0cy5yYWRpeFBvaW50KSwgXCIuXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NWYWx1ZSA9IHByb2Nlc3NWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIgKyAoMCwgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpKSwgXCItXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlID0gcHJvY2Vzc1ZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cCgoMCwgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKyBcIiRcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHByb2Nlc3NWYWx1ZSkpIDogcHJvY2Vzc1ZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24gaXNDb21wbGV0ZShidWZmZXIsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tlZFZhbHVlID0gKG9wdHMubnVtZXJpY0lucHV0ID8gYnVmZmVyLnNsaWNlKCkucmV2ZXJzZSgpIDogYnVmZmVyKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza2VkVmFsdWUgPSBtYXNrZWRWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIgKyAoMCwgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMubmVnYXRpb25TeW1ib2wuZnJvbnQpKSwgXCItXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgbWFza2VkVmFsdWUgPSBtYXNrZWRWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoKDAsIF9lc2NhcGVSZWdleC5kZWZhdWx0KShvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2spICsgXCIkXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgIG1hc2tlZFZhbHVlID0gbWFza2VkVmFsdWUucmVwbGFjZShvcHRzLnByZWZpeCwgXCJcIiksIG1hc2tlZFZhbHVlID0gbWFza2VkVmFsdWUucmVwbGFjZShvcHRzLnN1ZmZpeCwgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICBtYXNrZWRWYWx1ZSA9IG1hc2tlZFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cCgoMCwgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMuZ3JvdXBTZXBhcmF0b3IpICsgXCIoWzAtOV17M30pXCIsIFwiZ1wiKSwgXCIkMVwiKSwgXG4gICAgICAgICAgICAgICAgICAgIFwiLFwiID09PSBvcHRzLnJhZGl4UG9pbnQgJiYgKG1hc2tlZFZhbHVlID0gbWFza2VkVmFsdWUucmVwbGFjZSgoMCwgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMucmFkaXhQb2ludCksIFwiLlwiKSksIFxuICAgICAgICAgICAgICAgICAgICBpc0Zpbml0ZShtYXNrZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZU1hc2s6IGZ1bmN0aW9uIG9uQmVmb3JlTWFzayhpbml0aWFsVmFsdWUsIG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGl4UG9pbnQgPSBvcHRzLnJhZGl4UG9pbnQgfHwgXCIsXCI7XG4gICAgICAgICAgICAgICAgICAgIGlzRmluaXRlKG9wdHMuZGlnaXRzKSAmJiAob3B0cy5kaWdpdHMgPSBwYXJzZUludChvcHRzLmRpZ2l0cykpLCBcIm51bWJlclwiICE9IHR5cGVvZiBpbml0aWFsVmFsdWUgJiYgXCJudW1iZXJcIiAhPT0gb3B0cy5pbnB1dFR5cGUgfHwgXCJcIiA9PT0gcmFkaXhQb2ludCB8fCAoaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgcmFkaXhQb2ludCkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNOYWd0aXZlID0gXCItXCIgPT09IGluaXRpYWxWYWx1ZS5jaGFyQXQoMCkgfHwgaW5pdGlhbFZhbHVlLmNoYXJBdCgwKSA9PT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCwgdmFsdWVQYXJ0cyA9IGluaXRpYWxWYWx1ZS5zcGxpdChyYWRpeFBvaW50KSwgaW50ZWdlclBhcnQgPSB2YWx1ZVBhcnRzWzBdLnJlcGxhY2UoL1teXFwtMC05XS9nLCBcIlwiKSwgZGVjaW1hbFBhcnQgPSAxIDwgdmFsdWVQYXJ0cy5sZW5ndGggPyB2YWx1ZVBhcnRzWzFdLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSA6IFwiXCIsIGZvcmNlRGlnaXRzID0gMSA8IHZhbHVlUGFydHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSBpbnRlZ2VyUGFydCArIChcIlwiICE9PSBkZWNpbWFsUGFydCA/IHJhZGl4UG9pbnQgKyBkZWNpbWFsUGFydCA6IGRlY2ltYWxQYXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9PSByYWRpeFBvaW50ICYmIChkaWdpdHMgPSBvcHRzLmRpZ2l0c09wdGlvbmFsID8gb3B0cy5kaWdpdHMgPCBkZWNpbWFsUGFydC5sZW5ndGggPyBvcHRzLmRpZ2l0cyA6IGRlY2ltYWxQYXJ0Lmxlbmd0aCA6IG9wdHMuZGlnaXRzLCBcbiAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gZGVjaW1hbFBhcnQgfHwgIW9wdHMuZGlnaXRzT3B0aW9uYWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlnaXRzRmFjdG9yID0gTWF0aC5wb3coMTAsIGRpZ2l0cyB8fCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZS5yZXBsYWNlKCgwLCBfZXNjYXBlUmVnZXguZGVmYXVsdCkocmFkaXhQb2ludCksIFwiLlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBpc05hTihwYXJzZUZsb2F0KGluaXRpYWxWYWx1ZSkpIHx8IChpbml0aWFsVmFsdWUgPSAob3B0cy5yb3VuZGluZ0ZOKHBhcnNlRmxvYXQoaW5pdGlhbFZhbHVlKSAqIGRpZ2l0c0ZhY3RvcikgLyBkaWdpdHNGYWN0b3IpLnRvRml4ZWQoZGlnaXRzKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgcmFkaXhQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG9wdHMuZGlnaXRzICYmIC0xICE9PSBpbml0aWFsVmFsdWUuaW5kZXhPZihyYWRpeFBvaW50KSAmJiAoaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlLnN1YnN0cmluZygwLCBpbml0aWFsVmFsdWUuaW5kZXhPZihyYWRpeFBvaW50KSkpLCBcbiAgICAgICAgICAgICAgICAgICAgbnVsbCAhPT0gb3B0cy5taW4gfHwgbnVsbCAhPT0gb3B0cy5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXJWYWx1ZSA9IGluaXRpYWxWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UocmFkaXhQb2ludCwgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAhPT0gb3B0cy5taW4gJiYgbnVtYmVyVmFsdWUgPCBvcHRzLm1pbiA/IGluaXRpYWxWYWx1ZSA9IG9wdHMubWluLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgcmFkaXhQb2ludCkgOiBudWxsICE9PSBvcHRzLm1heCAmJiBudW1iZXJWYWx1ZSA+IG9wdHMubWF4ICYmIChpbml0aWFsVmFsdWUgPSBvcHRzLm1heC50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIHJhZGl4UG9pbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNOYWd0aXZlICYmIFwiLVwiICE9PSBpbml0aWFsVmFsdWUuY2hhckF0KDApICYmIChpbml0aWFsVmFsdWUgPSBcIi1cIiArIGluaXRpYWxWYWx1ZSksIFxuICAgICAgICAgICAgICAgICAgICBhbGlnbkRpZ2l0cyhpbml0aWFsVmFsdWUudG9TdHJpbmcoKS5zcGxpdChcIlwiKSwgZGlnaXRzLCBvcHRzLCBmb3JjZURpZ2l0cykuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlV3JpdGU6IGZ1bmN0aW9uIG9uQmVmb3JlV3JpdGUoZSwgYnVmZmVyLCBjYXJldFBvcywgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzdHJpcEJ1ZmZlcihidWZmZXIsIHN0cmlwUmFkaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMSAhPT0gb3B0cy5fX2ZpbmFuY2VJbnB1dCB8fCBzdHJpcFJhZGl4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gYnVmZmVyLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMSAhPT0gcG9zaXRpb24gJiYgYnVmZmVyLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPT0gb3B0cy5ncm91cFNlcGFyYXRvcikgZm9yICg7LTEgIT09IChwb3NpdGlvbiA9IGJ1ZmZlci5pbmRleE9mKG9wdHMuZ3JvdXBTZXBhcmF0b3IpKTsgKSBidWZmZXIuc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgbGVhZGluZ3plcm9lcyA9IGNoZWNrRm9yTGVhZGluZ1plcm9lcyhidWZmZXIsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGVhZGluZ3plcm9lcykgZm9yICh2YXIgY2FyZXROZHggPSBidWZmZXIuam9pbihcIlwiKS5sYXN0SW5kZXhPZihsZWFkaW5nemVyb2VzWzBdLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpKSAtIChsZWFkaW5nemVyb2VzWzBdID09IGxlYWRpbmd6ZXJvZXMuaW5wdXQgPyAwIDogMSksIG9mZnNldCA9IGxlYWRpbmd6ZXJvZXNbMF0gPT0gbGVhZGluZ3plcm9lcy5pbnB1dCA/IDEgOiAwLCBpID0gbGVhZGluZ3plcm9lc1swXS5sZW5ndGggLSBvZmZzZXQ7IDAgPCBpOyBpLS0pIGRlbGV0ZSB0aGlzLm1hc2tzZXQudmFsaWRQb3NpdGlvbnNbY2FyZXROZHggKyBpXSwgXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBidWZmZXJbY2FyZXROZHggKyBpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImJsdXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2hlY2t2YWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBvcHRzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bm1hc2tlZCA9IG9wdHMub25Vbk1hc2soYnVmZmVyLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIiksIHZvaWQgMCwgJC5leHRlbmQoe30sIG9wdHMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXNrQXNOdW1iZXI6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBvcHRzLm1pbiAmJiB1bm1hc2tlZCA8IG9wdHMubWluKSByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogYWxpZ25EaWdpdHMob3B0cy5taW4udG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBvcHRzLnJhZGl4UG9pbnQpLnNwbGl0KFwiXCIpLCBvcHRzLmRpZ2l0cywgb3B0cykucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJbYnVmZmVyLmxlbmd0aCAtIDFdID09PSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmZyb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5tYnJNdGNocyA9IG5ldyBSZWdFeHAoXCIoXlwiICsgKFwiXCIgIT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCA/ICgwLCBfZXNjYXBlUmVnZXguZGVmYXVsdCkob3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkgKyBcIj9cIiA6IFwiXCIpICsgKDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lc2NhcGVSZWdleC5kZWZhdWx0KShvcHRzLnByZWZpeCkgKyBcIikoLiopKFwiICsgKDAsIF9lc2NhcGVSZWdleC5kZWZhdWx0KShvcHRzLnN1ZmZpeCkgKyAoXCJcIiAhPSBvcHRzLm5lZ2F0aW9uU3ltYm9sLmJhY2sgPyAoMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2VzY2FwZVJlZ2V4LmRlZmF1bHQpKG9wdHMubmVnYXRpb25TeW1ib2wuYmFjaykgKyBcIj9cIiA6IFwiXCIpICsgXCIkKVwiKS5leGVjKHN0cmlwQnVmZmVyKGJ1ZmZlci5zbGljZSgpLCAhMCkucmV2ZXJzZSgpLmpvaW4oXCJcIikpLCBudW1iZXIgPSBubWJyTXRjaHMgPyBubWJyTXRjaHNbMl0gOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gbnVtYmVyICYmIChyZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBbIDAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIFwiXCIgIT09IG9wdHMucmFkaXhQb2ludCAmJiBidWZmZXJbMF0gPT09IG9wdHMucmFkaXhQb2ludCAmJiAocmVzdWx0ICYmIHJlc3VsdC5idWZmZXIgPyByZXN1bHQuYnVmZmVyLnNoaWZ0KCkgOiAoYnVmZmVyLnNoaWZ0KCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXI6IHN0cmlwQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmVuZm9yY2VEaWdpdHNPbkJsdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJmZnIgPSByZXN1bHQgJiYgcmVzdWx0LmJ1ZmZlciB8fCBidWZmZXIuc2xpY2UoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlZnJlc2hGcm9tQnVmZmVyID0gITAsIHJlc3VsdC5idWZmZXIgPSBhbGlnbkRpZ2l0cyhiZmZyLCBvcHRzLmRpZ2l0cywgb3B0cywgITApLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiBmdW5jdGlvbiBvbktleURvd24oZSwgYnVmZmVyLCBjYXJldFBvcywgb3B0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgYmZmcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY3RybEtleSkgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIF9rZXljb2RlLmRlZmF1bHQuVVA6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dG1hc2suX192YWx1ZVNldC5jYWxsKHRoaXMsIHBhcnNlRmxvYXQodGhpcy5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpKSArIHBhcnNlSW50KG9wdHMuc3RlcCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIiksICExO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBfa2V5Y29kZS5kZWZhdWx0LkRPV046XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dG1hc2suX192YWx1ZVNldC5jYWxsKHRoaXMsIHBhcnNlRmxvYXQodGhpcy5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpKSAtIHBhcnNlSW50KG9wdHMuc3RlcCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIiksICExO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZS5zaGlmdEtleSAmJiAoZS5rZXlDb2RlID09PSBfa2V5Y29kZS5kZWZhdWx0LkRFTEVURSB8fCBlLmtleUNvZGUgPT09IF9rZXljb2RlLmRlZmF1bHQuQkFDS1NQQUNFIHx8IGUua2V5Q29kZSA9PT0gX2tleWNvZGUuZGVmYXVsdC5CQUNLU1BBQ0VfU0FGQVJJKSAmJiBjYXJldFBvcy5iZWdpbiAhPT0gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcltlLmtleUNvZGUgPT09IF9rZXljb2RlLmRlZmF1bHQuREVMRVRFID8gY2FyZXRQb3MuYmVnaW4gLSAxIDogY2FyZXRQb3MuZW5kXSA9PT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCkgcmV0dXJuIGJmZnIgPSBidWZmZXIuc2xpY2UoKS5yZXZlcnNlKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gb3B0cy5uZWdhdGlvblN5bWJvbC5mcm9udCAmJiBiZmZyLnNoaWZ0KCksIFwiXCIgIT09IG9wdHMubmVnYXRpb25TeW1ib2wuYmFjayAmJiBiZmZyLnBvcCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwic2V0dmFsdWVcIiwgWyBiZmZyLmpvaW4oXCJcIiksIGNhcmV0UG9zLmJlZ2luIF0pLCAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gb3B0cy5fcmFkaXhEYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRpeFBvcyA9IGJ1ZmZlci5pbmRleE9mKG9wdHMucmFkaXhQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuZGlnaXRzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IHJhZGl4UG9zKSByZXR1cm4gYmZmciA9IGJ1ZmZlci5zbGljZSgpLnJldmVyc2UoKSwgYmZmci5wb3AoKSwgJGlucHV0LnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIGJmZnIuam9pbihcIlwiKSwgY2FyZXRQb3MuYmVnaW4gPj0gYmZmci5sZW5ndGggPyBiZmZyLmxlbmd0aCA6IGNhcmV0UG9zLmJlZ2luIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgtMSAhPT0gcmFkaXhQb3MgJiYgKGNhcmV0UG9zLmJlZ2luIDwgcmFkaXhQb3MgfHwgY2FyZXRQb3MuZW5kIDwgcmFkaXhQb3MgfHwgZS5rZXlDb2RlID09PSBfa2V5Y29kZS5kZWZhdWx0LkRFTEVURSAmJiBjYXJldFBvcy5iZWdpbiA9PT0gcmFkaXhQb3MpKSByZXR1cm4gY2FyZXRQb3MuYmVnaW4gIT09IGNhcmV0UG9zLmVuZCB8fCBlLmtleUNvZGUgIT09IF9rZXljb2RlLmRlZmF1bHQuQkFDS1NQQUNFICYmIGUua2V5Q29kZSAhPT0gX2tleWNvZGUuZGVmYXVsdC5CQUNLU1BBQ0VfU0FGQVJJIHx8IGNhcmV0UG9zLmJlZ2luKyssIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJmZnIgPSBidWZmZXIuc2xpY2UoKS5yZXZlcnNlKCksIGJmZnIuc3BsaWNlKGJmZnIubGVuZ3RoIC0gY2FyZXRQb3MuYmVnaW4sIGNhcmV0UG9zLmJlZ2luIC0gY2FyZXRQb3MuZW5kICsgMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJmZnIgPSBhbGlnbkRpZ2l0cyhiZmZyLCBvcHRzLmRpZ2l0cywgb3B0cykuam9pbihcIlwiKSwgJGlucHV0LnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIGJmZnIsIGNhcmV0UG9zLmJlZ2luID49IGJmZnIubGVuZ3RoID8gcmFkaXhQb3MgKyAxIDogY2FyZXRQb3MuYmVnaW4gXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgICAgICAgICAgcHJlZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIGdyb3VwU2VwYXJhdG9yOiBcIixcIixcbiAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgZGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgIGRpZ2l0c09wdGlvbmFsOiAhMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlY2ltYWw6IHtcbiAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnRlZ2VyOiB7XG4gICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIGRpZ2l0czogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBlcmNlbnRhZ2U6IHtcbiAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgICAgIHN1ZmZpeDogXCIgJVwiLFxuICAgICAgICAgICAgICAgIGRpZ2l0czogMCxcbiAgICAgICAgICAgICAgICBhbGxvd01pbnVzOiAhMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluZGlhbm5zOiB7XG4gICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIF9tYXNrOiBmdW5jdGlvbiBfbWFzayhvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIihcIiArIG9wdHMuZ3JvdXBTZXBhcmF0b3IgKyBcIjk5KXsqfDF9KFwiICsgb3B0cy5ncm91cFNlcGFyYXRvciArIFwiOTk5KXsxfDF9XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncm91cFNlcGFyYXRvcjogXCIsXCIsXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCIuXCIsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiMFwiLFxuICAgICAgICAgICAgICAgIGRpZ2l0czogMixcbiAgICAgICAgICAgICAgICBkaWdpdHNPcHRpb25hbDogITFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgX3dpbmRvdyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX193ZWJwYWNrX3JlcXVpcmVfXyg2KSksIF9pbnB1dG1hc2sgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9fd2VicGFja19yZXF1aXJlX18oMSkpO1xuICAgICAgICBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgICAgICAgICAgfSA6IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICAgICAgICAgIH0sIF90eXBlb2Yob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIHN1cGVyQ2xhc3MgJiYgbnVsbCAhPT0gc3VwZXJDbGFzcykgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogITAsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgc3VwZXJDbGFzcyAmJiBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7XG4gICAgICAgICAgICB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gIWNhbGwgfHwgXCJvYmplY3RcIiAhPT0gX3R5cGVvZihjYWxsKSAmJiBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIGNhbGwgPyBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIDogY2FsbDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IHNlbGYpIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHtcbiAgICAgICAgICAgIHZhciBfY2FjaGUgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIE1hcCA/IG5ldyBNYXAoKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiBfd3JhcE5hdGl2ZVN1cGVyID0gZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcihDbGFzcykge1xuICAgICAgICAgICAgICAgIGlmIChudWxsID09PSBDbGFzcyB8fCAhX2lzTmF0aXZlRnVuY3Rpb24oQ2xhc3MpKSByZXR1cm4gQ2xhc3M7XG4gICAgICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgQ2xhc3MpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgX2NhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfY2FjaGUuaGFzKENsYXNzKSkgcmV0dXJuIF9jYWNoZS5nZXQoQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBfY2FjaGUuc2V0KENsYXNzLCBXcmFwcGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gV3JhcHBlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb25zdHJ1Y3QoQ2xhc3MsIGFyZ3VtZW50cywgX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFdyYXBwZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDbGFzcy5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBXcmFwcGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgX3NldFByb3RvdHlwZU9mKFdyYXBwZXIsIENsYXNzKTtcbiAgICAgICAgICAgIH0sIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIF9jb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgPyBSZWZsZWN0LmNvbnN0cnVjdCA6IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgICAgICAgICAgIHZhciBhID0gWyBudWxsIF07XG4gICAgICAgICAgICAgICAgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKSwgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xhc3MgJiYgX3NldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpLCBpbnN0YW5jZTtcbiAgICAgICAgICAgIH0sIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkge1xuICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIFJlZmxlY3QgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gITE7XG4gICAgICAgICAgICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuICExO1xuICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgUHJveHkpIHJldHVybiAhMDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uKCkge30pKSwgXG4gICAgICAgICAgICAgICAgITA7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9pc05hdGl2ZUZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gLTEgIT09IEZ1bmN0aW9uLnRvU3RyaW5nLmNhbGwoZm4pLmluZGV4T2YoXCJbbmF0aXZlIGNvZGVdXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8uX19wcm90b19fID0gcCwgbztcbiAgICAgICAgICAgIH0sIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgICAgICAgICAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgICAgICAgICAgIH0sIF9nZXRQcm90b3R5cGVPZihvKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRvY3VtZW50ID0gX3dpbmRvdy5kZWZhdWx0LmRvY3VtZW50O1xuICAgICAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuaGVhZCAmJiBkb2N1bWVudC5oZWFkLmF0dGFjaFNoYWRvdyAmJiBfd2luZG93LmRlZmF1bHQuY3VzdG9tRWxlbWVudHMgJiYgdm9pZCAwID09PSBfd2luZG93LmRlZmF1bHQuY3VzdG9tRWxlbWVudHMuZ2V0KFwiaW5wdXQtbWFza1wiKSkge1xuICAgICAgICAgICAgdmFyIElucHV0bWFza0VsZW1lbnQgPSBmdW5jdGlvbihfSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBfaW5oZXJpdHMoSW5wdXRtYXNrRWxlbWVudCwgX0hUTUxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKElucHV0bWFza0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIElucHV0bWFza0VsZW1lbnQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcztcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElucHV0bWFza0VsZW1lbnQpLCBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlTmFtZXMgPSBfdGhpcy5nZXRBdHRyaWJ1dGVOYW1lcygpLCBzaGFkb3cgPSBfdGhpcy5hdHRhY2hTaGFkb3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJjbG9zZWRcIlxuICAgICAgICAgICAgICAgICAgICB9KSwgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGF0dHIgaW4gaW5wdXQudHlwZSA9IFwidGV4dFwiLCBzaGFkb3cuYXBwZW5kQ2hpbGQoaW5wdXQpLCBhdHRyaWJ1dGVOYW1lcykgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGF0dHJpYnV0ZU5hbWVzLCBhdHRyKSAmJiBpbnB1dC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZXNbYXR0cl0sIF90aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lc1thdHRyXSkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW0gPSBuZXcgX2lucHV0bWFzay5kZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbS5kYXRhQXR0cmlidXRlID0gXCJcIiwgaW0ubWFzayhpbnB1dCksIGlucHV0LmlucHV0bWFzay5zaGFkb3dSb290ID0gc2hhZG93LCBcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBJbnB1dG1hc2tFbGVtZW50O1xuICAgICAgICAgICAgfShfd3JhcE5hdGl2ZVN1cGVyKEhUTUxFbGVtZW50KSk7XG4gICAgICAgICAgICBfd2luZG93LmRlZmF1bHQuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiaW5wdXQtbWFza1wiLCBJbnB1dG1hc2tFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH0gXSwgaW5zdGFsbGVkTW9kdWxlcyA9IHt9LCBfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzLCBcbiAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiAgICAgICAgX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgICAgICAgIGdldDogZ2V0dGVyXG4gICAgICAgIH0pO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiAgICAgICAgXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIFN5bWJvbC50b1N0cmluZ1RhZyAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgICAgICB2YWx1ZTogXCJNb2R1bGVcIlxuICAgICAgICB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgfSk7XG4gICAgfSwgX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiAgICAgICAgaWYgKDEgJiBtb2RlICYmICh2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpKSwgOCAmIG1vZGUpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgaWYgKDQgJiBtb2RlICYmIFwib2JqZWN0XCIgPT0gdHlwZW9mIHZhbHVlICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgaWYgKF9fd2VicGFja19yZXF1aXJlX18ucihucyksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pLCAyICYgbW9kZSAmJiBcInN0cmluZ1wiICE9IHR5cGVvZiB2YWx1ZSkgZm9yICh2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVba2V5XTtcbiAgICAgICAgfS5iaW5kKG51bGwsIGtleSkpO1xuICAgICAgICByZXR1cm4gbnM7XG4gICAgfSwgX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gICAgICAgIHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgPyBmdW5jdGlvbiBnZXREZWZhdWx0KCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5kZWZhdWx0O1xuICAgICAgICB9IDogZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCBcImFcIiwgZ2V0dGVyKSwgZ2V0dGVyO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTtcbiAgICB9LCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE1KTtcbiAgICBmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4gICAgICAgIGlmIChpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkgcmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gICAgICAgIHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiAgICAgICAgICAgIGk6IG1vZHVsZUlkLFxuICAgICAgICAgICAgbDogITEsXG4gICAgICAgICAgICBleHBvcnRzOiB7fVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyksIFxuICAgICAgICBtb2R1bGUubCA9ICEwLCBtb2R1bGUuZXhwb3J0cztcbiAgICB9XG4gICAgdmFyIG1vZHVsZXMsIGluc3RhbGxlZE1vZHVsZXM7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2Rpc3QvaW5wdXRtYXNrXCIpO1xuIiwiY29uc3QgSW5wdXRtYXNrID0gcmVxdWlyZSgnaW5wdXRtYXNrJyk7Il19
