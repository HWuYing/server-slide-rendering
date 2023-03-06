import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable, Injector } from '@fm/di';
import { AppContextService as SharedAppContextService } from '@fm/shared';
import { RESOURCE } from '../../token';
let AppContextService = class AppContextService extends SharedAppContextService {
    constructor(injector) {
        super(injector);
        this.pageFileSource = {};
        this.microMiddlewareList = [];
        this.resource = this.injector.get(RESOURCE);
    }
    setPageSource(url, sourceCache) {
        this.pageFileSource[url] = sourceCache;
    }
    cacheToArray(map) {
        return Object.keys(map).map((key) => (Object.assign({ url: key }, map[key])));
    }
    proxyFetch(url, init) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.resource.proxyFetch(url, init).then((res) => {
                res.clone().arrayBuffer().then((text) => {
                    const source = Buffer.from(text).toString('base64');
                    const fetchCache = { type: 'fetch-cache', method: init === null || init === void 0 ? void 0 : init.method, source };
                    this.setPageSource(url, fetchCache);
                });
                return res;
            });
        });
    }
    readStaticFile(url) {
        const fileCache = this.resource.readStaticFile(url);
        this.setPageSource(url, fileCache);
        return fileCache.source;
    }
    registryMicroMidder(middleware) {
        this.microMiddlewareList.push(middleware);
    }
    getPageFileSource() {
        return JSON.stringify(this.cacheToArray(this.pageFileSource));
    }
    getAllFileSource() {
        return JSON.stringify(this.cacheToArray(Object.assign(Object.assign({}, this.getContext().resource), this.pageFileSource)));
    }
    getpageMicroMiddleware() {
        return this.microMiddlewareList;
    }
    get fetch() {
        return this.proxyFetch.bind(this);
    }
};
AppContextService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Injector])
], AppContextService);
export { AppContextService };
