import { generate } from 'ant-design-palettes';
import { DOCUMENT, CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Optional, RendererFactory2, SecurityContext, Directive, ElementRef, Input, Renderer2, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { catchError, finalize, map, share, tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const antIconConsolePrefix = '[@ant-design/icons-angular]: ';
/**
 * @param {?} message
 * @return {?}
 */
function printErr(message) {
    console.error(`${antIconConsolePrefix}${message}.`);
}
/**
 * @param {?} message
 * @return {?}
 */
function printWarn(message) {
    console.warn(`${antIconConsolePrefix}${message}.`);
}
/**
 * @param {?} primaryColor
 * @return {?}
 */
function getSecondaryColor(primaryColor) {
    return generate(primaryColor)[0];
}
/**
 * @param {?} name
 * @param {?} theme
 * @return {?}
 */
function withSuffix(name, theme) {
    switch (theme) {
        case 'fill': return `${name}-fill`;
        case 'outline': return `${name}-o`;
        case 'twotone': return `${name}-twotone`;
        case undefined: return name;
        default: throw new Error(`${antIconConsolePrefix}Theme "${theme}" is not a recognized theme!`);
    }
}
/**
 * @param {?} name
 * @param {?} theme
 * @param {?} pri
 * @param {?} sec
 * @return {?}
 */
function withSuffixAndColor(name, theme, pri, sec) {
    return `${withSuffix(name, theme)}-${pri}-${sec}`;
}
/**
 * @param {?} abbr
 * @return {?}
 */
function mapAbbrToTheme(abbr) {
    return abbr === 'o' ? 'outline' : (/** @type {?} */ (abbr));
}
/**
 * @param {?} name
 * @return {?}
 */
function alreadyHasAThemeSuffix(name) {
    return name.endsWith('-fill') || name.endsWith('-o') || name.endsWith('-twotone');
}
/**
 * @param {?} target
 * @return {?}
 */
function isIconDefinition(target) {
    return (typeof target === 'object' &&
        typeof target.name === 'string' &&
        (typeof target.theme === 'string' || target.theme === undefined) &&
        typeof target.icon === 'string');
}
/**
 * Get an `IconDefinition` object from abbreviation type, like `account-book-fill`.
 * @param {?} str
 * @return {?}
 */
function getIconDefinitionFromAbbr(str) {
    /** @type {?} */
    const arr = str.split('-');
    /** @type {?} */
    const theme = mapAbbrToTheme(arr.splice(arr.length - 1, 1)[0]);
    /** @type {?} */
    const name = arr.join('-');
    return (/** @type {?} */ ({
        name,
        theme,
        icon: ''
    }));
}
/**
 * @param {?} svg
 * @return {?}
 */
function cloneSVG(svg) {
    return (/** @type {?} */ (svg.cloneNode(true)));
}
/**
 * Parse inline SVG string and replace colors with placeholders. For twotone icons only.
 * @param {?} raw
 * @return {?}
 */
function replaceFillColor(raw) {
    return raw
        .replace(/['"]#333['"]/g, '"primaryColor"')
        .replace(/['"]#E6E6E6['"]/g, '"secondaryColor"')
        .replace(/['"]#D9D9D9['"]/g, '"secondaryColor"')
        .replace(/['"]#D8D8D8['"]/g, '"secondaryColor"');
}
/**
 * Split a name with namespace in it into a tuple like [ name, namespace ].
 * @param {?} type
 * @return {?}
 */
function getNameAndNamespace(type) {
    /** @type {?} */
    const split = type.split(':');
    switch (split.length) {
        case 1: return [type, ''];
        case 2: return [split[1], split[0]];
        default: throw new Error(`${antIconConsolePrefix}The icon type ${type} is not valid!`);
    }
}
/**
 * @param {?} type
 * @return {?}
 */
function hasNamespace(type) {
    return getNameAndNamespace(type)[1] !== '';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NameSpaceIsNotSpecifyError() {
    return new Error(`${antIconConsolePrefix}Type should have a namespace. Try "namespace:${name}".`);
}
/**
 * @param {?} icon
 * @return {?}
 */
function IconNotFoundError(icon) {
    return new Error(`${antIconConsolePrefix}the icon ${icon} does not exist or is not registered.`);
}
/**
 * @return {?}
 */
function HttpModuleNotImport() {
    printErr(`you need to import "HttpClientModule" to use dynamic importing`);
    return null;
}
/**
 * @param {?} url
 * @return {?}
 */
function UrlNotSafeError(url) {
    return new Error(`${antIconConsolePrefix}The url "${url}" is unsafe.`);
}
/**
 * @return {?}
 */
function SVGTagNotFoundError() {
    return new Error(`${antIconConsolePrefix}<svg> tag not found`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconService {
    /**
     * @param {?} _rendererFactory
     * @param {?} _handler
     * @param {?} _document
     * @param {?} sanitizer
     */
    constructor(_rendererFactory, _handler, _document, sanitizer) {
        this._rendererFactory = _rendererFactory;
        this._handler = _handler;
        this._document = _document;
        this.sanitizer = sanitizer;
        this.defaultTheme = 'outline';
        /**
         * All icon definitions would be registered here.
         */
        this._svgDefinitions = new Map();
        /**
         * Cache all rendered icons. Icons are identified by name, theme,
         * and for twotone icons, primary color and secondary color.
         */
        this._svgRenderedDefinitions = new Map();
        this._inProgressFetches = new Map();
        /**
         * Url prefix for fetching inline SVG by dynamic importing.
         */
        this._assetsUrlRoot = '';
        this._twoToneColorPalette = {
            primaryColor: '#333333',
            secondaryColor: '#E6E6E6'
        };
        this._renderer = this._rendererFactory.createRenderer(null, null);
        if (this._handler) {
            this._http = new HttpClient(this._handler);
        }
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    set twoToneColor({ primaryColor, secondaryColor }) {
        this._twoToneColorPalette.primaryColor = primaryColor;
        this._twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
    }
    /**
     * @return {?}
     */
    get twoToneColor() {
        return (/** @type {?} */ (Object.assign({}, this._twoToneColorPalette))); // Make a copy to avoid unexpected changes.
    }
    /**
     * Change the prefix of the inline svg resources, so they could be deployed elsewhere, like CDN.
     * @param {?} prefix
     * @return {?}
     */
    changeAssetsSource(prefix) {
        this._assetsUrlRoot = prefix.endsWith('/') ? prefix : prefix + '/';
    }
    /**
     * Add icons provided by ant design.
     * @param {...?} icons
     * @return {?}
     */
    addIcon(...icons) {
        icons.forEach((/**
         * @param {?} icon
         * @return {?}
         */
        icon => {
            this._svgDefinitions.set(withSuffix(icon.name, icon.theme), icon);
        }));
    }
    /**
     * Register an icon. Namespace is required.
     * @param {?} type
     * @param {?} literal
     * @return {?}
     */
    addIconLiteral(type, literal) {
        const [name, namespace] = getNameAndNamespace(type);
        if (!namespace) {
            throw NameSpaceIsNotSpecifyError();
        }
        this.addIcon({ name: type, icon: literal });
    }
    /**
     * Remove all cache.
     * @return {?}
     */
    clear() {
        this._svgDefinitions.clear();
        this._svgRenderedDefinitions.clear();
    }
    /**
     * Get a rendered `SVGElement`.
     * @param {?} icon
     * @param {?=} twoToneColor
     * @return {?}
     */
    getRenderedContent(icon, twoToneColor) {
        // If `icon` is a `IconDefinition`, go to the next step. If not, try to fetch it from cache.
        /** @type {?} */
        const definition = isIconDefinition(icon) ? (/** @type {?} */ (icon)) : this._svgDefinitions.get((/** @type {?} */ (icon)));
        // If `icon` is a `IconDefinition` of successfully fetch, wrap it in an `Observable`. Otherwise try to fetch it from remote.
        /** @type {?} */
        const $iconDefinition = definition ? of(definition) : this._getFromRemote((/** @type {?} */ (icon)));
        // If finally get an `IconDefinition`, render and return it. Otherwise throw an error.
        return $iconDefinition.pipe(map((/**
         * @param {?} i
         * @return {?}
         */
        i => {
            if (!i) {
                throw IconNotFoundError((/** @type {?} */ (icon)));
            }
            return this._loadSVGFromCacheOrCreateNew(i, twoToneColor);
        })));
    }
    /**
     * @return {?}
     */
    getCachedIcons() {
        return this._svgDefinitions;
    }
    /**
     * Get raw svg and assemble a `IconDefinition` object.
     * @protected
     * @param {?} type
     * @return {?}
     */
    _getFromRemote(type) {
        if (!this._http) {
            return of(HttpModuleNotImport());
        }
        // If multi directive ask for the same icon at the same time, http request should only be fired once.
        /** @type {?} */
        let inProgress = this._inProgressFetches.get(type);
        // If there's no other directive asking for the same icon, fire a request.
        if (!inProgress) {
            const [name, namespace] = getNameAndNamespace(type);
            // If the string has a namespace within, create a simple `IconDefinition`.
            /** @type {?} */
            const icon = namespace
                ? { name: type, icon: '' }
                : getIconDefinitionFromAbbr(name);
            /** @type {?} */
            const url = namespace
                ? `${this._assetsUrlRoot}assets/${namespace}/${name}.svg`
                : `${this._assetsUrlRoot}assets/${icon.theme}/${icon.name}.svg`;
            /** @type {?} */
            const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
            if (!safeUrl) {
                throw UrlNotSafeError(url);
            }
            // Wrap a `IconDefinition`, cache it, delete the shared work.
            inProgress = this._http.get(safeUrl, { responseType: 'text' }).pipe(map((/**
             * @param {?} literal
             * @return {?}
             */
            literal => (Object.assign({}, icon, { icon: literal })))), tap((/**
             * @param {?} definition
             * @return {?}
             */
            definition => this.addIcon(definition))), finalize((/**
             * @return {?}
             */
            () => this._inProgressFetches.delete(type))), catchError((/**
             * @return {?}
             */
            () => of(null))), share());
            this._inProgressFetches.set(type, inProgress);
        }
        // Otherwise just reuse other directive's request.
        return inProgress;
    }
    /**
     * Render a new `SVGElement` for given `IconDefinition`, or make a copy from cache.
     * @protected
     * @param {?} icon
     * @param {?=} twoToneColor
     * @return {?}
     */
    _loadSVGFromCacheOrCreateNew(icon, twoToneColor) {
        /** @type {?} */
        let svg;
        /** @type {?} */
        const pri = twoToneColor || this._twoToneColorPalette.primaryColor;
        /** @type {?} */
        const sec = getSecondaryColor(pri) || this._twoToneColorPalette.secondaryColor;
        /** @type {?} */
        const key = icon.theme === 'twotone'
            ? withSuffixAndColor(icon.name, icon.theme, pri, sec)
            : icon.theme === undefined ? icon.name : withSuffix(icon.name, icon.theme);
        // Try to make a copy from cache.
        /** @type {?} */
        const cached = this._svgRenderedDefinitions.get(key);
        if (cached) {
            svg = cached.icon;
        }
        else {
            svg = this._setSVGAttribute(this._colorizeSVGIcon(
            // Icons provided by ant design should be refined to remove preset colors.
            this._createSVGElementFromString(hasNamespace(icon.name) ? icon.icon : replaceFillColor(icon.icon)), icon.theme === 'twotone', pri, sec));
            // Cache it.
            this._svgRenderedDefinitions.set(key, (/** @type {?} */ (Object.assign({}, icon, { icon: svg }))));
        }
        return cloneSVG(svg);
    }
    /**
     * @protected
     * @param {?} str
     * @return {?}
     */
    _createSVGElementFromString(str) {
        /** @type {?} */
        const div = this._document.createElement('div');
        div.innerHTML = str;
        /** @type {?} */
        const svg = div.querySelector('svg');
        if (!svg) {
            throw SVGTagNotFoundError;
        }
        return svg;
    }
    /**
     * @protected
     * @param {?} svg
     * @return {?}
     */
    _setSVGAttribute(svg) {
        this._renderer.setAttribute(svg, 'width', '1em');
        this._renderer.setAttribute(svg, 'height', '1em');
        return svg;
    }
    /**
     * @protected
     * @param {?} svg
     * @param {?} twotone
     * @param {?} pri
     * @param {?} sec
     * @return {?}
     */
    _colorizeSVGIcon(svg, twotone, pri, sec) {
        if (twotone) {
            /** @type {?} */
            const children = svg.childNodes;
            /** @type {?} */
            const length = children.length;
            for (let i = 0; i < length; i++) {
                /** @type {?} */
                const child = (/** @type {?} */ (children[i]));
                if (child.getAttribute('fill') === 'secondaryColor') {
                    this._renderer.setAttribute(child, 'fill', sec);
                }
                else {
                    this._renderer.setAttribute(child, 'fill', pri);
                }
            }
        }
        this._renderer.setAttribute(svg, 'fill', 'currentColor');
        return svg;
    }
}
/** @nocollapse */
IconService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: HttpBackend, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconDirective {
    /**
     * @param {?} _iconService
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_iconService, _elementRef, _renderer) {
        this._iconService = _iconService;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.type || changes.theme || changes.twoToneColor) {
            this._changeIcon();
        }
    }
    /**
     * Render a new icon in the current element. Remove the icon when `type` is falsy.
     * @protected
     * @return {?}
     */
    _changeIcon() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (!this.type) {
                this._clearSVGElement();
                resolve(null);
            }
            else {
                this._iconService.getRenderedContent(this._parseIconType(this.type, this.theme), this.twoToneColor).subscribe((/**
                 * @param {?} svg
                 * @return {?}
                 */
                svg => {
                    this._setSVGElement(svg);
                    resolve(svg);
                }));
            }
        }));
    }
    /**
     * Parse a icon to the standard form, an `IconDefinition` or a string like 'account-book-fill` (with a theme suffixed).
     * If namespace is specified, ignore theme because it meaningless for users' icons.
     * @protected
     * @param {?} type
     * @param {?} theme
     * @return {?}
     */
    _parseIconType(type, theme) {
        if (isIconDefinition(type)) {
            return type;
        }
        else {
            const [name, namespace] = getNameAndNamespace(type);
            if (namespace) {
                return type;
            }
            if (alreadyHasAThemeSuffix(name)) {
                if (!!theme) {
                    printWarn(`'type' ${name} already gets a theme inside so 'theme' ${theme} would be ignored`);
                }
                return name;
            }
            else {
                return withSuffix(name, theme || this._iconService.defaultTheme);
            }
        }
    }
    /**
     * @protected
     * @param {?} svg
     * @return {?}
     */
    _setSVGElement(svg) {
        this._clearSVGElement();
        this._renderer.appendChild(this._elementRef.nativeElement, svg);
    }
    /**
     * @protected
     * @return {?}
     */
    _clearSVGElement() {
        /** @type {?} */
        const el = this._elementRef.nativeElement;
        /** @type {?} */
        const children = el.childNodes;
        /** @type {?} */
        const length = children.length;
        for (let i = length - 1; i >= 0; i--) {
            /** @type {?} */
            const child = (/** @type {?} */ (children[i]));
            if (child.tagName.toLowerCase() === 'svg') {
                this._renderer.removeChild(el, child);
            }
        }
    }
}
IconDirective.decorators = [
    { type: Directive, args: [{
                selector: '[antIcon]'
            },] }
];
/** @nocollapse */
IconDirective.ctorParameters = () => [
    { type: IconService },
    { type: ElementRef },
    { type: Renderer2 }
];
IconDirective.propDecorators = {
    type: [{ type: Input }],
    theme: [{ type: Input }],
    twoToneColor: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconModule {
}
IconModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [IconDirective],
                declarations: [IconDirective],
                providers: [IconService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This icon file is generated by build/generate.ts
// tslint:disable
/** @type {?} */
const manifest = {
    fill: [
        'account-book',
        'alert',
        'alipay-circle',
        'aliwangwang',
        'alipay-square',
        'amazon-circle',
        'amazon-square',
        'android',
        'api',
        'apple',
        'appstore',
        'audio',
        'backward',
        'bank',
        'behance-circle',
        'behance-square',
        'bell',
        'book',
        'box-plot',
        'build',
        'bulb',
        'calendar',
        'calculator',
        'camera',
        'car',
        'caret-down',
        'caret-left',
        'caret-right',
        'caret-up',
        'carry-out',
        'check-circle',
        'check-square',
        'chrome',
        'ci-circle',
        'clock-circle',
        'close-circle',
        'close-square',
        'cloud',
        'code-sandbox-circle',
        'code-sandbox-square',
        'code',
        'codepen-circle',
        'codepen-square',
        'compass',
        'contacts',
        'control',
        'container',
        'credit-card',
        'copy',
        'copyright-circle',
        'crown',
        'customer-service',
        'dashboard',
        'database',
        'delete',
        'diff',
        'dingtalk-circle',
        'dingtalk-square',
        'dislike',
        'dollar-circle',
        'down-circle',
        'down-square',
        'dribbble-circle',
        'dribbble-square',
        'dropbox-circle',
        'dropbox-square',
        'edit',
        'environment',
        'euro-circle',
        'exclamation-circle',
        'experiment',
        'eye',
        'facebook',
        'eye-invisible',
        'fast-backward',
        'fast-forward',
        'file-add',
        'file-excel',
        'file-exclamation',
        'file-image',
        'file-markdown',
        'file-pdf',
        'file-ppt',
        'file-text',
        'file-unknown',
        'file-word',
        'file-zip',
        'file',
        'filter',
        'fire',
        'flag',
        'folder-add',
        'folder-open',
        'folder',
        'forward',
        'frown',
        'fund',
        'funnel-plot',
        'gift',
        'gitlab',
        'github',
        'golden',
        'google-circle',
        'google-plus-circle',
        'google-plus-square',
        'google-square',
        'hdd',
        'heart',
        'highlight',
        'home',
        'hourglass',
        'html5',
        'idcard',
        'ie-circle',
        'ie-square',
        'info-circle',
        'instagram',
        'insurance',
        'interation',
        'layout',
        'left-circle',
        'left-square',
        'like',
        'linkedin',
        'lock',
        'mail',
        'medicine-box',
        'medium-circle',
        'medium-square',
        'meh',
        'message',
        'minus-circle',
        'minus-square',
        'mobile',
        'money-collect',
        'notification',
        'pause-circle',
        'pay-circle',
        'phone',
        'picture',
        'pie-chart',
        'play-circle',
        'play-square',
        'plus-circle',
        'plus-square',
        'pound-circle',
        'printer',
        'profile',
        'project',
        'property-safety',
        'pushpin',
        'qq-circle',
        'qq-square',
        'question-circle',
        'read',
        'reconciliation',
        'red-envelope',
        'reddit-circle',
        'reddit-square',
        'rest',
        'right-circle',
        'right-square',
        'rocket',
        'safety-certificate',
        'save',
        'schedule',
        'security-scan',
        'setting',
        'shop',
        'shopping',
        'sketch-circle',
        'sketch-square',
        'skin',
        'skype',
        'slack-circle',
        'slack-square',
        'sliders',
        'smile',
        'snippets',
        'sound',
        'star',
        'step-backward',
        'step-forward',
        'stop',
        'switcher',
        'tablet',
        'tag',
        'tags',
        'taobao-circle',
        'taobao-square',
        'thunderbolt',
        'tool',
        'trademark-circle',
        'trophy',
        'twitter-circle',
        'twitter-square',
        'unlock',
        'up-circle',
        'up-square',
        'usb',
        'video-camera',
        'wallet',
        'warning',
        'wechat',
        'weibo-circle',
        'weibo-square',
        'windows',
        'yahoo',
        'youtube',
        'yuque',
        'zhihu-circle',
        'zhihu-square'
    ],
    outline: [
        'account-book',
        'alert',
        'alipay-circle',
        'aliwangwang',
        'android',
        'api',
        'apple',
        'appstore',
        'audio',
        'backward',
        'bank',
        'behance-square',
        'bell',
        'book',
        'box-plot',
        'build',
        'bulb',
        'calendar',
        'calculator',
        'camera',
        'car',
        'caret-down',
        'caret-left',
        'caret-right',
        'caret-up',
        'carry-out',
        'check-circle',
        'check-square',
        'chrome',
        'clock-circle',
        'close-circle',
        'close-square',
        'cloud',
        'code',
        'codepen-circle',
        'compass',
        'contacts',
        'control',
        'container',
        'credit-card',
        'copy',
        'crown',
        'customer-service',
        'dashboard',
        'database',
        'delete',
        'diff',
        'dislike',
        'down-circle',
        'down-square',
        'dribbble-square',
        'edit',
        'environment',
        'exclamation-circle',
        'experiment',
        'eye',
        'facebook',
        'eye-invisible',
        'fast-backward',
        'fast-forward',
        'file-add',
        'file-excel',
        'file-exclamation',
        'file-image',
        'file-markdown',
        'file-pdf',
        'file-ppt',
        'file-text',
        'file-unknown',
        'file-word',
        'file-zip',
        'file',
        'filter',
        'fire',
        'flag',
        'folder-add',
        'folder-open',
        'folder',
        'forward',
        'frown',
        'fund',
        'funnel-plot',
        'gift',
        'gitlab',
        'github',
        'hdd',
        'heart',
        'highlight',
        'home',
        'hourglass',
        'html5',
        'idcard',
        'info-circle',
        'instagram',
        'insurance',
        'interation',
        'layout',
        'left-circle',
        'left-square',
        'like',
        'linkedin',
        'lock',
        'mail',
        'medicine-box',
        'meh',
        'message',
        'minus-circle',
        'minus-square',
        'mobile',
        'money-collect',
        'notification',
        'pause-circle',
        'pay-circle',
        'phone',
        'picture',
        'pie-chart',
        'play-circle',
        'play-square',
        'plus-circle',
        'plus-square',
        'printer',
        'profile',
        'project',
        'property-safety',
        'pushpin',
        'question-circle',
        'read',
        'reconciliation',
        'red-envelope',
        'rest',
        'right-circle',
        'right-square',
        'rocket',
        'safety-certificate',
        'save',
        'schedule',
        'security-scan',
        'setting',
        'shop',
        'shopping',
        'skin',
        'skype',
        'slack-square',
        'sliders',
        'smile',
        'snippets',
        'sound',
        'star',
        'step-backward',
        'step-forward',
        'stop',
        'switcher',
        'tablet',
        'tag',
        'tags',
        'taobao-circle',
        'thunderbolt',
        'tool',
        'trophy',
        'unlock',
        'up-circle',
        'up-square',
        'usb',
        'video-camera',
        'wallet',
        'warning',
        'wechat',
        'weibo-circle',
        'weibo-square',
        'windows',
        'yahoo',
        'youtube',
        'yuque',
        'alibaba',
        'align-center',
        'align-left',
        'align-right',
        'alipay',
        'aliyun',
        'amazon',
        'ant-cloud',
        'ant-design',
        'apartment',
        'area-chart',
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrows-alt',
        'audit',
        'bar-chart',
        'barcode',
        'bars',
        'behance',
        'bg-colors',
        'block',
        'bold',
        'border-bottom',
        'border-horizontal',
        'border-inner',
        'border-left',
        'border-outer',
        'border-right',
        'border-top',
        'border-verticle',
        'border',
        'branches',
        'check',
        'ci',
        'close',
        'cloud-download',
        'cloud-server',
        'cloud-sync',
        'cloud-upload',
        'cluster',
        'code-sandbox',
        'codepen',
        'coffee',
        'colum-height',
        'column-width',
        'copyright',
        'dash',
        'deployment-unit',
        'desktop',
        'dingding',
        'disconnect',
        'dollar',
        'dot-chart',
        'double-left',
        'double-right',
        'down',
        'drag',
        'download',
        'dropbox',
        'dribbble',
        'ellipsis',
        'enter',
        'euro',
        'exception',
        'exclamation',
        'export',
        'fall',
        'file-done',
        'file-jpg',
        'file-protect',
        'file-search',
        'file-sync',
        'font-colors',
        'font-size',
        'fork',
        'form',
        'fullscreen-exit',
        'fullscreen',
        'gateway',
        'global',
        'gold',
        'google-plus',
        'google',
        'heat-map',
        'ie',
        'import',
        'inbox',
        'info',
        'issues-close',
        'italic',
        'key',
        'laptop',
        'left',
        'line-chart',
        'line-height',
        'line',
        'link',
        'loading-3-quarters',
        'loading',
        'login',
        'logout',
        'man',
        'medium-workmark',
        'medium',
        'menu-fold',
        'menu-unfold',
        'menu',
        'minus',
        'monitor',
        'more',
        'mr',
        'number',
        'ordered-list',
        'paper-clip',
        'pause',
        'percentage',
        'pic-center',
        'pic-left',
        'pic-right',
        'plus',
        'pound',
        'poweroff',
        'qq',
        'qrcode',
        'question',
        'radar-chart',
        'radius-bottomleft',
        'radius-bottomright',
        'radius-setting',
        'radius-upleft',
        'radius-upright',
        'reddit',
        'redo',
        'reload-time',
        'reload',
        'retweet',
        'right',
        'rise',
        'robot',
        'rollback',
        'safety',
        'scan',
        'scissor',
        'search',
        'select',
        'shake',
        'share-alt',
        'shopping-cart',
        'shrink',
        'sketch',
        'slack',
        'small-dash',
        'solution',
        'sort-ascending',
        'sort-descending',
        'stock',
        'strikethrough',
        'swap-left',
        'swap-right',
        'swap',
        'sync',
        'table',
        'taobao',
        'team',
        'to-top',
        'trademark',
        'transaction',
        'twitter',
        'underline',
        'undo',
        'unordered-list',
        'up',
        'upload',
        'user-add',
        'user-delete',
        'user',
        'usergroup-add',
        'usergroup-delete',
        'vertical-align-bottom',
        'vertical-align-middle',
        'vertical-align-top',
        'vertical-left',
        'vertical-right',
        'weibo',
        'wifi',
        'woman',
        'zhihu',
        'zoom-in',
        'zoom-out'
    ],
    twotone: [
        'account-book',
        'alert',
        'api',
        'appstore',
        'audio',
        'bank',
        'bell',
        'book',
        'box-plot',
        'build',
        'bulb',
        'calculator',
        'camera',
        'car',
        'carry-out',
        'check-circle',
        'check-square',
        'clock-circle',
        'close-circle',
        'close-square',
        'cloud',
        'code',
        'compass',
        'contacts',
        'control',
        'container',
        'credit-card',
        'copy',
        'crown',
        'customer-service',
        'dashboard',
        'database',
        'delete',
        'diff',
        'dislike',
        'down-circle',
        'down-square',
        'edit',
        'environment',
        'exclamation-circle',
        'experiment',
        'eye',
        'eye-invisible',
        'file-add',
        'file-excel',
        'file-exclamation',
        'file-image',
        'file-markdown',
        'file-pdf',
        'file-ppt',
        'file-text',
        'file-unknown',
        'file-word',
        'file-zip',
        'file',
        'filter',
        'fire',
        'flag',
        'folder-add',
        'folder-open',
        'folder',
        'frown',
        'fund',
        'funnel-plot',
        'gift',
        'hdd',
        'heart',
        'highlight',
        'home',
        'hourglass',
        'html5',
        'idcard',
        'info-circle',
        'insurance',
        'interation',
        'layout',
        'left-circle',
        'left-square',
        'like',
        'lock',
        'mail',
        'medicine-box',
        'meh',
        'message',
        'minus-circle',
        'minus-square',
        'mobile',
        'money-collect',
        'notification',
        'pause-circle',
        'phone',
        'picture',
        'pie-chart',
        'play-circle',
        'play-square',
        'plus-circle',
        'plus-square',
        'pound-circle',
        'printer',
        'profile',
        'project',
        'property-safety',
        'pushpin',
        'question-circle',
        'reconciliation',
        'red-envelope',
        'rest',
        'right-circle',
        'right-square',
        'rocket',
        'safety-certificate',
        'save',
        'schedule',
        'security-scan',
        'setting',
        'shop',
        'shopping',
        'skin',
        'sliders',
        'smile',
        'snippets',
        'sound',
        'star',
        'stop',
        'switcher',
        'tablet',
        'tag',
        'tags',
        'thunderbolt',
        'tool',
        'trademark-circle',
        'trophy',
        'unlock',
        'up-circle',
        'up-square',
        'usb',
        'video-camera',
        'wallet',
        'warning',
        'ci',
        'copyright',
        'dollar',
        'euro',
        'gold',
        'canlendar'
    ]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { IconModule, IconService, IconDirective, NameSpaceIsNotSpecifyError, IconNotFoundError, HttpModuleNotImport, UrlNotSafeError, SVGTagNotFoundError, printErr, printWarn, getSecondaryColor, withSuffix, withSuffixAndColor, mapAbbrToTheme, alreadyHasAThemeSuffix, isIconDefinition, getIconDefinitionFromAbbr, cloneSVG, replaceFillColor, getNameAndNamespace, hasNamespace, antIconConsolePrefix, manifest };

//# sourceMappingURL=ant-design-icons-angular.js.map