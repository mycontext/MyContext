/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { IOptions, RuleFailure, Rules } from 'tslint';
import * as ts from 'typescript';
import { ExternalResource } from '../../tslint/component-file';
import { ComponentWalker } from '../../tslint/component-walker';
/**
 * Rule that walks through every inline or external stylesheet and replaces outdated CSS selectors
 * that query for an @Input() with the new input name.
 *
 * Note that inputs inside of stylesheets usually don't make sense, but if developers use an
 * input as a plain one-time attribute, it can be targeted through CSS selectors.
 *
 * e.g. `<my-component color="primary">` becomes `my-component[color]`
 */
export declare class Rule extends Rules.AbstractRule {
    apply(sourceFile: ts.SourceFile): RuleFailure[];
}
export declare class Walker extends ComponentWalker {
    /** Change data that upgrades to the specified target version. */
    data: import("../../data/input-names").InputNameUpgradeData[];
    constructor(sourceFile: ts.SourceFile, options: IOptions);
    visitInlineStylesheet(node: ts.StringLiteralLike): void;
    visitExternalStylesheet(node: ExternalResource): void;
    /**
     * Searches for outdated attribute selectors in the specified content and creates replacements
     * with the according messages that can be added to a rule failure.
     */
    private _createReplacementsForContent;
}
