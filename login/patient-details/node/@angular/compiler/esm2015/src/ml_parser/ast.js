/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AstPath } from '../ast_path';
export class Text {
    constructor(value, sourceSpan, i18n) {
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.i18n = i18n;
    }
    visit(visitor, context) { return visitor.visitText(this, context); }
}
export class Expansion {
    constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan, i18n) {
        this.switchValue = switchValue;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
        this.switchValueSourceSpan = switchValueSourceSpan;
        this.i18n = i18n;
    }
    visit(visitor, context) { return visitor.visitExpansion(this, context); }
}
export class ExpansionCase {
    constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
        this.value = value;
        this.expression = expression;
        this.sourceSpan = sourceSpan;
        this.valueSourceSpan = valueSourceSpan;
        this.expSourceSpan = expSourceSpan;
    }
    visit(visitor, context) { return visitor.visitExpansionCase(this, context); }
}
export class Attribute {
    constructor(name, value, sourceSpan, valueSpan, i18n) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.valueSpan = valueSpan;
        this.i18n = i18n;
    }
    visit(visitor, context) { return visitor.visitAttribute(this, context); }
}
export class Element {
    constructor(name, attrs, children, sourceSpan, startSourceSpan = null, endSourceSpan = null, i18n) {
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.sourceSpan = sourceSpan;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
        this.i18n = i18n;
    }
    visit(visitor, context) { return visitor.visitElement(this, context); }
}
export class Comment {
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) { return visitor.visitComment(this, context); }
}
export function visitAll(visitor, nodes, context = null) {
    const result = [];
    const visit = visitor.visit ?
        (ast) => visitor.visit(ast, context) || ast.visit(visitor, context) :
        (ast) => ast.visit(visitor, context);
    nodes.forEach(ast => {
        const astResult = visit(ast);
        if (astResult) {
            result.push(astResult);
        }
    });
    return result;
}
export class RecursiveVisitor {
    constructor() { }
    visitElement(ast, context) {
        this.visitChildren(context, visit => {
            visit(ast.attrs);
            visit(ast.children);
        });
    }
    visitAttribute(ast, context) { }
    visitText(ast, context) { }
    visitComment(ast, context) { }
    visitExpansion(ast, context) {
        return this.visitChildren(context, visit => { visit(ast.cases); });
    }
    visitExpansionCase(ast, context) { }
    visitChildren(context, cb) {
        let results = [];
        let t = this;
        function visit(children) {
            if (children)
                results.push(visitAll(t, children, context));
        }
        cb(visit);
        return [].concat.apply([], results);
    }
}
function spanOf(ast) {
    const start = ast.sourceSpan.start.offset;
    let end = ast.sourceSpan.end.offset;
    if (ast instanceof Element) {
        if (ast.endSourceSpan) {
            end = ast.endSourceSpan.end.offset;
        }
        else if (ast.children && ast.children.length) {
            end = spanOf(ast.children[ast.children.length - 1]).end;
        }
    }
    return { start, end };
}
export function findNode(nodes, position) {
    const path = [];
    const visitor = new class extends RecursiveVisitor {
        visit(ast, context) {
            const span = spanOf(ast);
            if (span.start <= position && position < span.end) {
                path.push(ast);
            }
            else {
                // Returning a value here will result in the children being skipped.
                return true;
            }
        }
    };
    visitAll(visitor, nodes);
    return new AstPath(path, position);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL21sX3BhcnNlci9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQVNwQyxNQUFNLE9BQU8sSUFBSTtJQUNmLFlBQW1CLEtBQWEsRUFBUyxVQUEyQixFQUFTLElBQWM7UUFBeEUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBVTtJQUFHLENBQUM7SUFDL0YsS0FBSyxDQUFDLE9BQWdCLEVBQUUsT0FBWSxJQUFTLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hGO0FBRUQsTUFBTSxPQUFPLFNBQVM7SUFDcEIsWUFDVyxXQUFtQixFQUFTLElBQVksRUFBUyxLQUFzQixFQUN2RSxVQUEyQixFQUFTLHFCQUFzQyxFQUMxRSxJQUFjO1FBRmQsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDdkUsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFBUywwQkFBcUIsR0FBckIscUJBQXFCLENBQWlCO1FBQzFFLFNBQUksR0FBSixJQUFJLENBQVU7SUFBRyxDQUFDO0lBQzdCLEtBQUssQ0FBQyxPQUFnQixFQUFFLE9BQVksSUFBUyxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3RjtBQUVELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQ1csS0FBYSxFQUFTLFVBQWtCLEVBQVMsVUFBMkIsRUFDNUUsZUFBZ0MsRUFBUyxhQUE4QjtRQUR2RSxV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b3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXN0UGF0aH0gZnJvbSAnLi4vYXN0X3BhdGgnO1xuaW1wb3J0IHtBU1QgYXMgSTE4bkFTVH0gZnJvbSAnLi4vaTE4bi9pMThuX2FzdCc7XG5pbXBvcnQge1BhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi4vcGFyc2VfdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZSB7XG4gIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbjtcbiAgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dCBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGkxOG4/OiBJMThuQVNUKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFRleHQodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4cGFuc2lvbiBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzd2l0Y2hWYWx1ZTogc3RyaW5nLCBwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgY2FzZXM6IEV4cGFuc2lvbkNhc2VbXSxcbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBzd2l0Y2hWYWx1ZVNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyBpMThuPzogSTE4bkFTVCkge31cbiAgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRFeHBhbnNpb24odGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEV4cGFuc2lvbkNhc2UgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIGV4cHJlc3Npb246IE5vZGVbXSwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyB2YWx1ZVNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGV4cFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cblxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEV4cGFuc2lvbkNhc2UodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZSBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHZhbHVlU3Bhbj86IFBhcnNlU291cmNlU3BhbiwgcHVibGljIGkxOG4/OiBJMThuQVNUKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEF0dHJpYnV0ZSh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY2xhc3MgRWxlbWVudCBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBhdHRyczogQXR0cmlidXRlW10sIHB1YmxpYyBjaGlsZHJlbjogTm9kZVtdLFxuICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHN0YXJ0U291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFufG51bGwgPSBudWxsLFxuICAgICAgcHVibGljIGVuZFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsID0gbnVsbCwgcHVibGljIGkxOG4/OiBJMThuQVNUKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEVsZW1lbnQodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbW1lbnQgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmd8bnVsbCwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRDb21tZW50KHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlzaXRvciB7XG4gIC8vIFJldHVybmluZyBhIHRydXRoeSB2YWx1ZSBmcm9tIGB2aXNpdCgpYCB3aWxsIHByZXZlbnQgYHZpc2l0QWxsKClgIGZyb20gdGhlIGNhbGwgdG8gdGhlIHR5cGVkXG4gIC8vIG1ldGhvZCBhbmQgcmVzdWx0IHJldHVybmVkIHdpbGwgYmVjb21lIHRoZSByZXN1bHQgaW5jbHVkZWQgaW4gYHZpc2l0QWxsKClgcyByZXN1bHQgYXJyYXkuXG4gIHZpc2l0Pyhub2RlOiBOb2RlLCBjb250ZXh0OiBhbnkpOiBhbnk7XG5cbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBBdHRyaWJ1dGUsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRUZXh0KHRleHQ6IFRleHQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IENvbW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRFeHBhbnNpb24oZXhwYW5zaW9uOiBFeHBhbnNpb24sIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRFeHBhbnNpb25DYXNlKGV4cGFuc2lvbkNhc2U6IEV4cGFuc2lvbkNhc2UsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0QWxsKHZpc2l0b3I6IFZpc2l0b3IsIG5vZGVzOiBOb2RlW10sIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnlbXSB7XG4gIGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcblxuICBjb25zdCB2aXNpdCA9IHZpc2l0b3IudmlzaXQgP1xuICAgICAgKGFzdDogTm9kZSkgPT4gdmlzaXRvci52aXNpdCAhKGFzdCwgY29udGV4dCkgfHwgYXN0LnZpc2l0KHZpc2l0b3IsIGNvbnRleHQpIDpcbiAgICAgIChhc3Q6IE5vZGUpID0+IGFzdC52aXNpdCh2aXNpdG9yLCBjb250ZXh0KTtcbiAgbm9kZXMuZm9yRWFjaChhc3QgPT4ge1xuICAgIGNvbnN0IGFzdFJlc3VsdCA9IHZpc2l0KGFzdCk7XG4gICAgaWYgKGFzdFJlc3VsdCkge1xuICAgICAgcmVzdWx0LnB1c2goYXN0UmVzdWx0KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlVmlzaXRvciBpbXBsZW1lbnRzIFZpc2l0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgdmlzaXQoYXN0LmF0dHJzKTtcbiAgICAgIHZpc2l0KGFzdC5jaGlsZHJlbik7XG4gICAgfSk7XG4gIH1cblxuICB2aXNpdEF0dHJpYnV0ZShhc3Q6IEF0dHJpYnV0ZSwgY29udGV4dDogYW55KTogYW55IHt9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHQsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICB2aXNpdENvbW1lbnQoYXN0OiBDb21tZW50LCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICB2aXNpdEV4cGFuc2lvbihhc3Q6IEV4cGFuc2lvbiwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aXNpdENoaWxkcmVuKGNvbnRleHQsIHZpc2l0ID0+IHsgdmlzaXQoYXN0LmNhc2VzKTsgfSk7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoYXN0OiBFeHBhbnNpb25DYXNlLCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICBwcml2YXRlIHZpc2l0Q2hpbGRyZW48VCBleHRlbmRzIE5vZGU+KFxuICAgICAgY29udGV4dDogYW55LCBjYjogKHZpc2l0OiAoPFYgZXh0ZW5kcyBOb2RlPihjaGlsZHJlbjogVltdfHVuZGVmaW5lZCkgPT4gdm9pZCkpID0+IHZvaWQpIHtcbiAgICBsZXQgcmVzdWx0czogYW55W11bXSA9IFtdO1xuICAgIGxldCB0ID0gdGhpcztcbiAgICBmdW5jdGlvbiB2aXNpdDxUIGV4dGVuZHMgTm9kZT4oY2hpbGRyZW46IFRbXSB8IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNoaWxkcmVuKSByZXN1bHRzLnB1c2godmlzaXRBbGwodCwgY2hpbGRyZW4sIGNvbnRleHQpKTtcbiAgICB9XG4gICAgY2IodmlzaXQpO1xuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIHJlc3VsdHMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIEh0bWxBc3RQYXRoID0gQXN0UGF0aDxOb2RlPjtcblxuZnVuY3Rpb24gc3Bhbk9mKGFzdDogTm9kZSkge1xuICBjb25zdCBzdGFydCA9IGFzdC5zb3VyY2VTcGFuLnN0YXJ0Lm9mZnNldDtcbiAgbGV0IGVuZCA9IGFzdC5zb3VyY2VTcGFuLmVuZC5vZmZzZXQ7XG4gIGlmIChhc3QgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgaWYgKGFzdC5lbmRTb3VyY2VTcGFuKSB7XG4gICAgICBlbmQgPSBhc3QuZW5kU291cmNlU3Bhbi5lbmQub2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAoYXN0LmNoaWxkcmVuICYmIGFzdC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIGVuZCA9IHNwYW5PZihhc3QuY2hpbGRyZW5bYXN0LmNoaWxkcmVuLmxlbmd0aCAtIDFdKS5lbmQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB7c3RhcnQsIGVuZH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZShub2RlczogTm9kZVtdLCBwb3NpdGlvbjogbnVtYmVyKTogSHRtbEFzdFBhdGgge1xuICBjb25zdCBwYXRoOiBOb2RlW10gPSBbXTtcblxuICBjb25zdCB2aXNpdG9yID0gbmV3IGNsYXNzIGV4dGVuZHMgUmVjdXJzaXZlVmlzaXRvciB7XG4gICAgdmlzaXQoYXN0OiBOb2RlLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgICAgY29uc3Qgc3BhbiA9IHNwYW5PZihhc3QpO1xuICAgICAgaWYgKHNwYW4uc3RhcnQgPD0gcG9zaXRpb24gJiYgcG9zaXRpb24gPCBzcGFuLmVuZCkge1xuICAgICAgICBwYXRoLnB1c2goYXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybmluZyBhIHZhbHVlIGhlcmUgd2lsbCByZXN1bHQgaW4gdGhlIGNoaWxkcmVuIGJlaW5nIHNraXBwZWQuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2aXNpdEFsbCh2aXNpdG9yLCBub2Rlcyk7XG5cbiAgcmV0dXJuIG5ldyBBc3RQYXRoPE5vZGU+KHBhdGgsIHBvc2l0aW9uKTtcbn0iXX0=