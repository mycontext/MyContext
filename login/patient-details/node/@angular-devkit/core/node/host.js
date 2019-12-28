"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const fs = require("fs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const src_1 = require("../src");
const { FSWatcher } = require('chokidar');
function _callFs(fn, ...args) {
    return new rxjs_1.Observable(obs => {
        fn(...args, (err, result) => {
            if (err) {
                obs.error(err);
            }
            else {
                obs.next(result);
                obs.complete();
            }
        });
    });
}
/**
 * An implementation of the Virtual FS using Node as the background. There are two versions; one
 * synchronous and one asynchronous.
 */
class NodeJsAsyncHost {
    get capabilities() {
        return { synchronous: false };
    }
    write(path, content) {
        return new rxjs_1.Observable(obs => {
            // Create folders if necessary.
            const _createDir = (path) => {
                if (fs.existsSync(src_1.getSystemPath(path))) {
                    return;
                }
                if (src_1.dirname(path) === path) {
                    throw new Error();
                }
                _createDir(src_1.dirname(path));
                fs.mkdirSync(src_1.getSystemPath(path));
            };
            _createDir(src_1.dirname(path));
            _callFs(fs.writeFile, src_1.getSystemPath(path), new Uint8Array(content)).subscribe(obs);
        });
    }
    read(path) {
        return _callFs(fs.readFile, src_1.getSystemPath(path)).pipe(operators_1.map(buffer => new Uint8Array(buffer).buffer));
    }
    delete(path) {
        return this.isDirectory(path).pipe(operators_1.mergeMap(isDirectory => {
            if (isDirectory) {
                const allFiles = [];
                const allDirs = [];
                const _recurseList = (path) => {
                    for (const fragment of fs.readdirSync(src_1.getSystemPath(path))) {
                        if (fs.statSync(src_1.getSystemPath(src_1.join(path, fragment))).isDirectory()) {
                            _recurseList(src_1.join(path, fragment));
                            allDirs.push(src_1.join(path, fragment));
                        }
                        else {
                            allFiles.push(src_1.join(path, fragment));
                        }
                    }
                };
                _recurseList(path);
                return rxjs_1.concat(rxjs_1.from(allFiles).pipe(operators_1.mergeMap(p => _callFs(fs.unlink, src_1.getSystemPath(p))), operators_1.ignoreElements()), rxjs_1.from(allDirs).pipe(operators_1.concatMap(p => _callFs(fs.rmdir, src_1.getSystemPath(p))), operators_1.map(() => { })));
            }
            else {
                return _callFs(fs.unlink, src_1.getSystemPath(path));
            }
        }));
    }
    rename(from, to) {
        return _callFs(fs.rename, src_1.getSystemPath(from), src_1.getSystemPath(to));
    }
    list(path) {
        return _callFs(fs.readdir, src_1.getSystemPath(path)).pipe(operators_1.map(names => names.map(name => src_1.fragment(name))));
    }
    exists(path) {
        // Exists is a special case because it cannot error.
        return new rxjs_1.Observable(obs => {
            fs.exists(path, exists => {
                obs.next(exists);
                obs.complete();
            });
        });
    }
    isDirectory(path) {
        return _callFs(fs.stat, src_1.getSystemPath(path)).pipe(operators_1.map(stat => stat.isDirectory()));
    }
    isFile(path) {
        return _callFs(fs.stat, src_1.getSystemPath(path)).pipe(operators_1.map(stat => stat.isDirectory()));
    }
    // Some hosts may not support stat.
    stat(path) {
        return _callFs(fs.stat, src_1.getSystemPath(path));
    }
    // Some hosts may not support watching.
    watch(path, _options) {
        return new rxjs_1.Observable(obs => {
            const watcher = new FSWatcher({ persistent: true }).add(src_1.getSystemPath(path));
            watcher
                .on('change', path => {
                obs.next({
                    path: src_1.normalize(path),
                    time: new Date(),
                    type: 0 /* Changed */,
                });
            })
                .on('add', path => {
                obs.next({
                    path: src_1.normalize(path),
                    time: new Date(),
                    type: 1 /* Created */,
                });
            })
                .on('unlink', path => {
                obs.next({
                    path: src_1.normalize(path),
                    time: new Date(),
                    type: 2 /* Deleted */,
                });
            });
            return () => watcher.close();
        }).pipe(operators_1.publish(), operators_1.refCount());
    }
}
exports.NodeJsAsyncHost = NodeJsAsyncHost;
/**
 * An implementation of the Virtual FS using Node as the backend, synchronously.
 */
class NodeJsSyncHost {
    get capabilities() {
        return { synchronous: true };
    }
    write(path, content) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                // Create folders if necessary.
                const _createDir = (path) => {
                    if (fs.existsSync(src_1.getSystemPath(path))) {
                        return;
                    }
                    _createDir(src_1.dirname(path));
                    fs.mkdirSync(src_1.getSystemPath(path));
                };
                _createDir(src_1.dirname(path));
                fs.writeFileSync(src_1.getSystemPath(path), new Uint8Array(content));
                obs.next();
                obs.complete();
            }
            catch (err) {
                obs.error(err);
            }
        });
    }
    read(path) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                const buffer = fs.readFileSync(src_1.getSystemPath(path));
                obs.next(new Uint8Array(buffer).buffer);
                obs.complete();
            }
            catch (err) {
                obs.error(err);
            }
        });
    }
    delete(path) {
        return this.isDirectory(path).pipe(operators_1.concatMap(isDir => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            if (isDir) {
                const dirPaths = fs.readdirSync(src_1.getSystemPath(path));
                const rmDirComplete = new rxjs_1.Observable((obs) => {
                    try {
                        fs.rmdirSync(src_1.getSystemPath(path));
                        obs.complete();
                    }
                    catch (e) {
                        obs.error(e);
                    }
                });
                return rxjs_1.concat(...dirPaths.map(name => this.delete(src_1.join(path, name))), rmDirComplete);
            }
            else {
                try {
                    fs.unlinkSync(src_1.getSystemPath(path));
                }
                catch (err) {
                    return rxjs_1.throwError(err);
                }
                return rxjs_1.EMPTY;
            }
        }));
    }
    rename(from, to) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                fs.renameSync(src_1.getSystemPath(from), src_1.getSystemPath(to));
                obs.next();
                obs.complete();
            }
            catch (err) {
                obs.error(err);
            }
        });
    }
    list(path) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                const names = fs.readdirSync(src_1.getSystemPath(path));
                obs.next(names.map(name => src_1.fragment(name)));
                obs.complete();
            }
            catch (err) {
                obs.error(err);
            }
        });
    }
    exists(path) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                obs.next(fs.existsSync(src_1.getSystemPath(path)));
                obs.complete();
            }
            catch (err) {
                obs.error(err);
            }
        });
    }
    isDirectory(path) {
        // tslint:disable-next-line:no-non-null-assertion
        return this.stat(path).pipe(operators_1.map(stat => stat.isDirectory()));
    }
    isFile(path) {
        // tslint:disable-next-line:no-non-null-assertion
        return this.stat(path).pipe(operators_1.map(stat => stat.isFile()));
    }
    // Some hosts may not support stat.
    stat(path) {
        return new rxjs_1.Observable(obs => {
            // TODO: remove this try+catch when issue https://github.com/ReactiveX/rxjs/issues/3740 is
            // fixed.
            try {
                obs.next(fs.statSync(src_1.getSystemPath(path)));
                obs.complete();
            }
            catch (err) {
                obs.error(err);
            }
        });
    }
    // Some hosts may not support watching.
    watch(path, _options) {
        return new rxjs_1.Observable(obs => {
            const opts = { persistent: false };
            const watcher = new FSWatcher(opts).add(src_1.getSystemPath(path));
            watcher
                .on('change', path => {
                obs.next({
                    path: src_1.normalize(path),
                    time: new Date(),
                    type: 0 /* Changed */,
                });
            })
                .on('add', path => {
                obs.next({
                    path: src_1.normalize(path),
                    time: new Date(),
                    type: 1 /* Created */,
                });
            })
                .on('unlink', path => {
                obs.next({
                    path: src_1.normalize(path),
                    time: new Date(),
                    type: 2 /* Deleted */,
                });
            });
            return () => watcher.close();
        }).pipe(operators_1.publish(), operators_1.refCount());
    }
}
exports.NodeJsSyncHost = NodeJsSyncHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9ub2RlL2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCx5QkFBeUI7QUFDekIsK0JBQXFGO0FBQ3JGLDhDQU93QjtBQUN4QixnQ0FTZ0I7QUFjaEIsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFtQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFhMUUsU0FBUyxPQUFPLENBQVUsRUFBWSxFQUFFLEdBQUcsSUFBVTtJQUNuRCxPQUFPLElBQUksaUJBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFXLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO1lBQzVDLElBQUksR0FBRyxFQUFFO2dCQUNQLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakIsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFHRDs7O0dBR0c7QUFDSCxNQUFhLGVBQWU7SUFDMUIsSUFBSSxZQUFZO1FBQ2QsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQVUsRUFBRSxPQUE2QjtRQUM3QyxPQUFPLElBQUksaUJBQVUsQ0FBTyxHQUFHLENBQUMsRUFBRTtZQUNoQywrQkFBK0I7WUFDL0IsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDdEMsT0FBTztpQkFD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Q0FBQyxFQUFFO2dCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNQLElBQUksRUFBRSxlQUFTLENBQUMsSUFBSSxDQUFDO29CQUNyQixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ2hCLElBQUksaUJBQXNDO2lCQUMzQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVMLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDTCxtQkFBTyxFQUFFLEVBQ1Qsb0JBQVEsRUFBRSxDQUNYLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFuTEQsd0NBbUxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIGNvbmNhdCwgZnJvbSBhcyBvYnNlcnZhYmxlRnJvbSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY29uY2F0TWFwLFxuICBpZ25vcmVFbGVtZW50cyxcbiAgbWFwLFxuICBtZXJnZU1hcCxcbiAgcHVibGlzaCxcbiAgcmVmQ291bnQsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIFBhdGgsXG4gIFBhdGhGcmFnbWVudCxcbiAgZGlybmFtZSxcbiAgZnJhZ21lbnQsXG4gIGdldFN5c3RlbVBhdGgsXG4gIGpvaW4sXG4gIG5vcm1hbGl6ZSxcbiAgdmlydHVhbEZzLFxufSBmcm9tICcuLi9zcmMnO1xuXG5cbmludGVyZmFjZSBDaG9raWRhcldhdGNoZXIge1xuICBuZXcgKG9wdGlvbnM6IHt9KTogQ2hva2lkYXJXYXRjaGVyO1xuXG4gIGFkZChwYXRoOiBzdHJpbmcpOiBDaG9raWRhcldhdGNoZXI7XG4gIG9uKHR5cGU6ICdjaGFuZ2UnLCBjYjogKHBhdGg6IHN0cmluZykgPT4gdm9pZCk6IENob2tpZGFyV2F0Y2hlcjtcbiAgb24odHlwZTogJ2FkZCcsIGNiOiAocGF0aDogc3RyaW5nKSA9PiB2b2lkKTogQ2hva2lkYXJXYXRjaGVyO1xuICBvbih0eXBlOiAndW5saW5rJywgY2I6IChwYXRoOiBzdHJpbmcpID0+IHZvaWQpOiBDaG9raWRhcldhdGNoZXI7XG5cbiAgY2xvc2UoKTogdm9pZDtcbn1cblxuY29uc3QgeyBGU1dhdGNoZXIgfTogeyBGU1dhdGNoZXI6IENob2tpZGFyV2F0Y2hlciB9ID0gcmVxdWlyZSgnY2hva2lkYXInKTtcblxuXG50eXBlIEZzRnVuY3Rpb24wPFI+ID0gKGNiOiAoZXJyPzogRXJyb3IsIHJlc3VsdD86IFIpID0+IHZvaWQpID0+IHZvaWQ7XG50eXBlIEZzRnVuY3Rpb24xPFIsIFQxPiA9IChwMTogVDEsIGNiOiAoZXJyPzogRXJyb3IsIHJlc3VsdD86IFIpID0+IHZvaWQpID0+IHZvaWQ7XG50eXBlIEZzRnVuY3Rpb24yPFIsIFQxLCBUMj5cbiAgPSAocDE6IFQxLCBwMjogVDIsIGNiOiAoZXJyPzogRXJyb3IsIHJlc3VsdD86IFIpID0+IHZvaWQpID0+IHZvaWQ7XG5cblxuZnVuY3Rpb24gX2NhbGxGczxSPihmbjogRnNGdW5jdGlvbjA8Uj4pOiBPYnNlcnZhYmxlPFI+O1xuZnVuY3Rpb24gX2NhbGxGczxSLCBUMT4oZm46IEZzRnVuY3Rpb24xPFIsIFQxPiwgcDE6IFQxKTogT2JzZXJ2YWJsZTxSPjtcbmZ1bmN0aW9uIF9jYWxsRnM8UiwgVDEsIFQyPihmbjogRnNGdW5jdGlvbjI8UiwgVDEsIFQyPiwgcDE6IFQxLCBwMjogVDIpOiBPYnNlcnZhYmxlPFI+O1xuXG5mdW5jdGlvbiBfY2FsbEZzPFJlc3VsdFQ+KGZuOiBGdW5jdGlvbiwgLi4uYXJnczoge31bXSk6IE9ic2VydmFibGU8UmVzdWx0VD4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzID0+IHtcbiAgICBmbiguLi5hcmdzLCAoZXJyPzogRXJyb3IsIHJlc3VsdD86IFJlc3VsdFQpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgb2JzLmVycm9yKGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnMubmV4dChyZXN1bHQpO1xuICAgICAgICBvYnMuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgVmlydHVhbCBGUyB1c2luZyBOb2RlIGFzIHRoZSBiYWNrZ3JvdW5kLiBUaGVyZSBhcmUgdHdvIHZlcnNpb25zOyBvbmVcbiAqIHN5bmNocm9ub3VzIGFuZCBvbmUgYXN5bmNocm9ub3VzLlxuICovXG5leHBvcnQgY2xhc3MgTm9kZUpzQXN5bmNIb3N0IGltcGxlbWVudHMgdmlydHVhbEZzLkhvc3Q8ZnMuU3RhdHM+IHtcbiAgZ2V0IGNhcGFiaWxpdGllcygpOiB2aXJ0dWFsRnMuSG9zdENhcGFiaWxpdGllcyB7XG4gICAgcmV0dXJuIHsgc3luY2hyb25vdXM6IGZhbHNlIH07XG4gIH1cblxuICB3cml0ZShwYXRoOiBQYXRoLCBjb250ZW50OiB2aXJ0dWFsRnMuRmlsZUJ1ZmZlcik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx2b2lkPihvYnMgPT4ge1xuICAgICAgLy8gQ3JlYXRlIGZvbGRlcnMgaWYgbmVjZXNzYXJ5LlxuICAgICAgY29uc3QgX2NyZWF0ZURpciA9IChwYXRoOiBQYXRoKSA9PiB7XG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGdldFN5c3RlbVBhdGgocGF0aCkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJuYW1lKHBhdGgpID09PSBwYXRoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgX2NyZWF0ZURpcihkaXJuYW1lKHBhdGgpKTtcbiAgICAgICAgZnMubWtkaXJTeW5jKGdldFN5c3RlbVBhdGgocGF0aCkpO1xuICAgICAgfTtcbiAgICAgIF9jcmVhdGVEaXIoZGlybmFtZShwYXRoKSk7XG5cbiAgICAgIF9jYWxsRnM8dm9pZCwgc3RyaW5nLCBVaW50OEFycmF5PihcbiAgICAgICAgZnMud3JpdGVGaWxlLFxuICAgICAgICBnZXRTeXN0ZW1QYXRoKHBhdGgpLFxuICAgICAgICBuZXcgVWludDhBcnJheShjb250ZW50KSxcbiAgICAgICkuc3Vic2NyaWJlKG9icyk7XG4gICAgfSk7XG4gIH1cblxuICByZWFkKHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPHZpcnR1YWxGcy5GaWxlQnVmZmVyPiB7XG4gICAgcmV0dXJuIF9jYWxsRnMoZnMucmVhZEZpbGUsIGdldFN5c3RlbVBhdGgocGF0aCkpLnBpcGUoXG4gICAgICBtYXAoYnVmZmVyID0+IG5ldyBVaW50OEFycmF5KGJ1ZmZlcikuYnVmZmVyIGFzIHZpcnR1YWxGcy5GaWxlQnVmZmVyKSxcbiAgICApO1xuICB9XG5cbiAgZGVsZXRlKHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc0RpcmVjdG9yeShwYXRoKS5waXBlKFxuICAgICAgbWVyZ2VNYXAoaXNEaXJlY3RvcnkgPT4ge1xuICAgICAgICBpZiAoaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICBjb25zdCBhbGxGaWxlczogUGF0aFtdID0gW107XG4gICAgICAgICAgY29uc3QgYWxsRGlyczogUGF0aFtdID0gW107XG4gICAgICAgICAgY29uc3QgX3JlY3Vyc2VMaXN0ID0gKHBhdGg6IFBhdGgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZnJhZ21lbnQgb2YgZnMucmVhZGRpclN5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSkpIHtcbiAgICAgICAgICAgICAgaWYgKGZzLnN0YXRTeW5jKGdldFN5c3RlbVBhdGgoam9pbihwYXRoLCBmcmFnbWVudCkpKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgX3JlY3Vyc2VMaXN0KGpvaW4ocGF0aCwgZnJhZ21lbnQpKTtcbiAgICAgICAgICAgICAgICBhbGxEaXJzLnB1c2goam9pbihwYXRoLCBmcmFnbWVudCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsbEZpbGVzLnB1c2goam9pbihwYXRoLCBmcmFnbWVudCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBfcmVjdXJzZUxpc3QocGF0aCk7XG5cbiAgICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgICAgb2JzZXJ2YWJsZUZyb20oYWxsRmlsZXMpLnBpcGUoXG4gICAgICAgICAgICAgIG1lcmdlTWFwKHAgPT4gX2NhbGxGcyhmcy51bmxpbmssIGdldFN5c3RlbVBhdGgocCkpKSxcbiAgICAgICAgICAgICAgaWdub3JlRWxlbWVudHMoKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvYnNlcnZhYmxlRnJvbShhbGxEaXJzKS5waXBlKFxuICAgICAgICAgICAgICBjb25jYXRNYXAocCA9PiBfY2FsbEZzKGZzLnJtZGlyLCBnZXRTeXN0ZW1QYXRoKHApKSksXG4gICAgICAgICAgICAgIG1hcCgoKSA9PiB7fSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9jYWxsRnMoZnMudW5saW5rLCBnZXRTeXN0ZW1QYXRoKHBhdGgpKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHJlbmFtZShmcm9tOiBQYXRoLCB0bzogUGF0aCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBfY2FsbEZzKGZzLnJlbmFtZSwgZ2V0U3lzdGVtUGF0aChmcm9tKSwgZ2V0U3lzdGVtUGF0aCh0bykpO1xuICB9XG5cbiAgbGlzdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxQYXRoRnJhZ21lbnRbXT4ge1xuICAgIHJldHVybiBfY2FsbEZzKGZzLnJlYWRkaXIsIGdldFN5c3RlbVBhdGgocGF0aCkpLnBpcGUoXG4gICAgICBtYXAobmFtZXMgPT4gbmFtZXMubWFwKG5hbWUgPT4gZnJhZ21lbnQobmFtZSkpKSxcbiAgICApO1xuICB9XG5cbiAgZXhpc3RzKHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAvLyBFeGlzdHMgaXMgYSBzcGVjaWFsIGNhc2UgYmVjYXVzZSBpdCBjYW5ub3QgZXJyb3IuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgICBmcy5leGlzdHMocGF0aCwgZXhpc3RzID0+IHtcbiAgICAgICAgb2JzLm5leHQoZXhpc3RzKTtcbiAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gX2NhbGxGcyhmcy5zdGF0LCBnZXRTeXN0ZW1QYXRoKHBhdGgpKS5waXBlKFxuICAgICAgbWFwKHN0YXQgPT4gc3RhdC5pc0RpcmVjdG9yeSgpKSxcbiAgICApO1xuICB9XG4gIGlzRmlsZShwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIF9jYWxsRnMoZnMuc3RhdCwgZ2V0U3lzdGVtUGF0aChwYXRoKSkucGlwZShcbiAgICAgIG1hcChzdGF0ID0+IHN0YXQuaXNEaXJlY3RvcnkoKSksXG4gICAgKTtcbiAgfVxuXG4gIC8vIFNvbWUgaG9zdHMgbWF5IG5vdCBzdXBwb3J0IHN0YXQuXG4gIHN0YXQocGF0aDogUGF0aCk6IE9ic2VydmFibGU8dmlydHVhbEZzLlN0YXRzPGZzLlN0YXRzPj4gfCBudWxsIHtcbiAgICByZXR1cm4gX2NhbGxGcyhmcy5zdGF0LCBnZXRTeXN0ZW1QYXRoKHBhdGgpKTtcbiAgfVxuXG4gIC8vIFNvbWUgaG9zdHMgbWF5IG5vdCBzdXBwb3J0IHdhdGNoaW5nLlxuICB3YXRjaChcbiAgICBwYXRoOiBQYXRoLFxuICAgIF9vcHRpb25zPzogdmlydHVhbEZzLkhvc3RXYXRjaE9wdGlvbnMsXG4gICk6IE9ic2VydmFibGU8dmlydHVhbEZzLkhvc3RXYXRjaEV2ZW50PiB8IG51bGwge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx2aXJ0dWFsRnMuSG9zdFdhdGNoRXZlbnQ+KG9icyA9PiB7XG4gICAgICBjb25zdCB3YXRjaGVyID0gbmV3IEZTV2F0Y2hlcih7IHBlcnNpc3RlbnQ6IHRydWUgfSkuYWRkKGdldFN5c3RlbVBhdGgocGF0aCkpO1xuXG4gICAgICB3YXRjaGVyXG4gICAgICAgIC5vbignY2hhbmdlJywgcGF0aCA9PiB7XG4gICAgICAgICAgb2JzLm5leHQoe1xuICAgICAgICAgICAgcGF0aDogbm9ybWFsaXplKHBhdGgpLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHR5cGU6IHZpcnR1YWxGcy5Ib3N0V2F0Y2hFdmVudFR5cGUuQ2hhbmdlZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdhZGQnLCBwYXRoID0+IHtcbiAgICAgICAgICBvYnMubmV4dCh7XG4gICAgICAgICAgICBwYXRoOiBub3JtYWxpemUocGF0aCksXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgdHlwZTogdmlydHVhbEZzLkhvc3RXYXRjaEV2ZW50VHlwZS5DcmVhdGVkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ3VubGluaycsIHBhdGggPT4ge1xuICAgICAgICAgIG9icy5uZXh0KHtcbiAgICAgICAgICAgIHBhdGg6IG5vcm1hbGl6ZShwYXRoKSxcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICB0eXBlOiB2aXJ0dWFsRnMuSG9zdFdhdGNoRXZlbnRUeXBlLkRlbGV0ZWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKCkgPT4gd2F0Y2hlci5jbG9zZSgpO1xuICAgIH0pLnBpcGUoXG4gICAgICBwdWJsaXNoKCksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cbn1cblxuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBWaXJ0dWFsIEZTIHVzaW5nIE5vZGUgYXMgdGhlIGJhY2tlbmQsIHN5bmNocm9ub3VzbHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb2RlSnNTeW5jSG9zdCBpbXBsZW1lbnRzIHZpcnR1YWxGcy5Ib3N0PGZzLlN0YXRzPiB7XG4gIGdldCBjYXBhYmlsaXRpZXMoKTogdmlydHVhbEZzLkhvc3RDYXBhYmlsaXRpZXMge1xuICAgIHJldHVybiB7IHN5bmNocm9ub3VzOiB0cnVlIH07XG4gIH1cblxuICB3cml0ZShwYXRoOiBQYXRoLCBjb250ZW50OiB2aXJ0dWFsRnMuRmlsZUJ1ZmZlcik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgdHJ5K2NhdGNoIHdoZW4gaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0aXZlWC9yeGpzL2lzc3Vlcy8zNzQwIGlzXG4gICAgICAvLyBmaXhlZC5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIENyZWF0ZSBmb2xkZXJzIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgY29uc3QgX2NyZWF0ZURpciA9IChwYXRoOiBQYXRoKSA9PiB7XG4gICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgX2NyZWF0ZURpcihkaXJuYW1lKHBhdGgpKTtcbiAgICAgICAgICBmcy5ta2RpclN5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSk7XG4gICAgICAgIH07XG4gICAgICAgIF9jcmVhdGVEaXIoZGlybmFtZShwYXRoKSk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSwgbmV3IFVpbnQ4QXJyYXkoY29udGVudCkpO1xuXG4gICAgICAgIG9icy5uZXh0KCk7XG4gICAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG9icy5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVhZChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTx2aXJ0dWFsRnMuRmlsZUJ1ZmZlcj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgdHJ5K2NhdGNoIHdoZW4gaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0aXZlWC9yeGpzL2lzc3Vlcy8zNzQwIGlzXG4gICAgICAvLyBmaXhlZC5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhnZXRTeXN0ZW1QYXRoKHBhdGgpKTtcblxuICAgICAgICBvYnMubmV4dChuZXcgVWludDhBcnJheShidWZmZXIpLmJ1ZmZlciBhcyB2aXJ0dWFsRnMuRmlsZUJ1ZmZlcik7XG4gICAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIG9icy5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlKHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc0RpcmVjdG9yeShwYXRoKS5waXBlKFxuICAgICAgY29uY2F0TWFwKGlzRGlyID0+IHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgdHJ5K2NhdGNoIHdoZW4gaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0aXZlWC9yeGpzL2lzc3Vlcy8zNzQwIGlzXG4gICAgICAgIC8vIGZpeGVkLlxuICAgICAgICBpZiAoaXNEaXIpIHtcbiAgICAgICAgICBjb25zdCBkaXJQYXRocyA9IGZzLnJlYWRkaXJTeW5jKGdldFN5c3RlbVBhdGgocGF0aCkpO1xuICAgICAgICAgIGNvbnN0IHJtRGlyQ29tcGxldGUgPSBuZXcgT2JzZXJ2YWJsZSgob2JzKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmcy5ybWRpclN5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSk7XG4gICAgICAgICAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBvYnMuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgICAgLi4uZGlyUGF0aHMubWFwKG5hbWUgPT4gdGhpcy5kZWxldGUoam9pbihwYXRoLCBuYW1lKSkpLFxuICAgICAgICAgICAgcm1EaXJDb21wbGV0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy51bmxpbmtTeW5jKGdldFN5c3RlbVBhdGgocGF0aCkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICByZW5hbWUoZnJvbTogUGF0aCwgdG86IFBhdGgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzID0+IHtcbiAgICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIHRyeStjYXRjaCB3aGVuIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9SZWFjdGl2ZVgvcnhqcy9pc3N1ZXMvMzc0MCBpc1xuICAgICAgLy8gZml4ZWQuXG4gICAgICB0cnkge1xuICAgICAgICBmcy5yZW5hbWVTeW5jKGdldFN5c3RlbVBhdGgoZnJvbSksIGdldFN5c3RlbVBhdGgodG8pKTtcbiAgICAgICAgb2JzLm5leHQoKTtcbiAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgb2JzLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBsaXN0KHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPFBhdGhGcmFnbWVudFtdPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyB0cnkrY2F0Y2ggd2hlbiBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RpdmVYL3J4anMvaXNzdWVzLzM3NDAgaXNcbiAgICAgIC8vIGZpeGVkLlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBmcy5yZWFkZGlyU3luYyhnZXRTeXN0ZW1QYXRoKHBhdGgpKTtcbiAgICAgICAgb2JzLm5leHQobmFtZXMubWFwKG5hbWUgPT4gZnJhZ21lbnQobmFtZSkpKTtcbiAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgb2JzLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBleGlzdHMocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgdHJ5K2NhdGNoIHdoZW4gaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0aXZlWC9yeGpzL2lzc3Vlcy8zNzQwIGlzXG4gICAgICAvLyBmaXhlZC5cbiAgICAgIHRyeSB7XG4gICAgICAgIG9icy5uZXh0KGZzLmV4aXN0c1N5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSkpO1xuICAgICAgICBvYnMuY29tcGxldGUoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBvYnMuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgcmV0dXJuIHRoaXMuc3RhdChwYXRoKSAhLnBpcGUobWFwKHN0YXQgPT4gc3RhdC5pc0RpcmVjdG9yeSgpKSk7XG4gIH1cbiAgaXNGaWxlKHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgcmV0dXJuIHRoaXMuc3RhdChwYXRoKSAhLnBpcGUobWFwKHN0YXQgPT4gc3RhdC5pc0ZpbGUoKSkpO1xuICB9XG5cbiAgLy8gU29tZSBob3N0cyBtYXkgbm90IHN1cHBvcnQgc3RhdC5cbiAgc3RhdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTx2aXJ0dWFsRnMuU3RhdHM8ZnMuU3RhdHM+PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgICAvLyBUT0RPOiByZW1vdmUgdGhpcyB0cnkrY2F0Y2ggd2hlbiBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RpdmVYL3J4anMvaXNzdWVzLzM3NDAgaXNcbiAgICAgIC8vIGZpeGVkLlxuICAgICAgdHJ5IHtcbiAgICAgICAgb2JzLm5leHQoZnMuc3RhdFN5bmMoZ2V0U3lzdGVtUGF0aChwYXRoKSkpO1xuICAgICAgICBvYnMuY29tcGxldGUoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBvYnMuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNvbWUgaG9zdHMgbWF5IG5vdCBzdXBwb3J0IHdhdGNoaW5nLlxuICB3YXRjaChcbiAgICBwYXRoOiBQYXRoLFxuICAgIF9vcHRpb25zPzogdmlydHVhbEZzLkhvc3RXYXRjaE9wdGlvbnMsXG4gICk6IE9ic2VydmFibGU8dmlydHVhbEZzLkhvc3RXYXRjaEV2ZW50PiB8IG51bGwge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx2aXJ0dWFsRnMuSG9zdFdhdGNoRXZlbnQ+KG9icyA9PiB7XG4gICAgICBjb25zdCBvcHRzID0geyBwZXJzaXN0ZW50OiBmYWxzZSB9O1xuICAgICAgY29uc3Qgd2F0Y2hlciA9IG5ldyBGU1dhdGNoZXIob3B0cykuYWRkKGdldFN5c3RlbVBhdGgocGF0aCkpO1xuXG4gICAgICB3YXRjaGVyXG4gICAgICAgIC5vbignY2hhbmdlJywgcGF0aCA9PiB7XG4gICAgICAgICAgb2JzLm5leHQoe1xuICAgICAgICAgICAgcGF0aDogbm9ybWFsaXplKHBhdGgpLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHR5cGU6IHZpcnR1YWxGcy5Ib3N0V2F0Y2hFdmVudFR5cGUuQ2hhbmdlZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdhZGQnLCBwYXRoID0+IHtcbiAgICAgICAgICBvYnMubmV4dCh7XG4gICAgICAgICAgICBwYXRoOiBub3JtYWxpemUocGF0aCksXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgdHlwZTogdmlydHVhbEZzLkhvc3RXYXRjaEV2ZW50VHlwZS5DcmVhdGVkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ3VubGluaycsIHBhdGggPT4ge1xuICAgICAgICAgIG9icy5uZXh0KHtcbiAgICAgICAgICAgIHBhdGg6IG5vcm1hbGl6ZShwYXRoKSxcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICB0eXBlOiB2aXJ0dWFsRnMuSG9zdFdhdGNoRXZlbnRUeXBlLkRlbGV0ZWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKCkgPT4gd2F0Y2hlci5jbG9zZSgpO1xuICAgIH0pLnBpcGUoXG4gICAgICBwdWJsaXNoKCksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==