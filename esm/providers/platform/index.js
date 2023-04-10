import { createPlatformFactory } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { applicationContext } from '@fm/csr/providers/platform';
import { Injector } from '@fm/di';
import { Platform } from './platform';
const _CORE_PLATFORM_PROVIDERS = [
    { provide: Platform, deps: [Injector] },
    { provide: PLATFORM, useExisting: Platform }
];
const createPlatform = createPlatformFactory(null, _CORE_PLATFORM_PROVIDERS);
export const dynamicPlatform = (providers = []) => createPlatform(applicationContext, providers);
applicationContext.registerStart(() => dynamicPlatform().bootstrapRender(applicationContext.providers));
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export { Application, Input, Prov } from '@fm/csr/providers/platform';
