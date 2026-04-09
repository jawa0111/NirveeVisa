import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CiVerCvJ.mjs';
import { manifest } from './manifest_nxN2YqmX.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/send-email.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/business-immigration.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/eligibility.astro.mjs');
const _page7 = () => import('./pages/family-sponsorship.astro.mjs');
const _page8 = () => import('./pages/faq.astro.mjs');
const _page9 = () => import('./pages/permanent-residency.astro.mjs');
const _page10 = () => import('./pages/privacy.astro.mjs');
const _page11 = () => import('./pages/programs/australia-pr.astro.mjs');
const _page12 = () => import('./pages/programs/austria-job-seeker-visa.astro.mjs');
const _page13 = () => import('./pages/programs/canada-pr.astro.mjs');
const _page14 = () => import('./pages/programs/canada-student-visa.astro.mjs');
const _page15 = () => import('./pages/programs/germany-job-seeker-visa.astro.mjs');
const _page16 = () => import('./pages/programs/germany-student-visa.astro.mjs');
const _page17 = () => import('./pages/programs/ireland-student-visa.astro.mjs');
const _page18 = () => import('./pages/programs/netherlands-student-visa.astro.mjs');
const _page19 = () => import('./pages/programs/new-programs.astro.mjs');
const _page20 = () => import('./pages/programs/new-zealand-pr.astro.mjs');
const _page21 = () => import('./pages/programs/new-zealand-student-visa.astro.mjs');
const _page22 = () => import('./pages/programs/portugal-job-seeker-visa.astro.mjs');
const _page23 = () => import('./pages/programs/sweden-student-visa.astro.mjs');
const _page24 = () => import('./pages/programs/uae-job-seeker-visa.astro.mjs');
const _page25 = () => import('./pages/programs/uk-settlement.astro.mjs');
const _page26 = () => import('./pages/programs/uk-student-visa.astro.mjs');
const _page27 = () => import('./pages/services.astro.mjs');
const _page28 = () => import('./pages/terms.astro.mjs');
const _page29 = () => import('./pages/testimonials.astro.mjs');
const _page30 = () => import('./pages/visa.astro.mjs');
const _page31 = () => import('./pages/visitor-visa.astro.mjs');
const _page32 = () => import('./pages/work-visa.astro.mjs');
const _page33 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/send-email.ts", _page2],
    ["src/pages/blog.astro", _page3],
    ["src/pages/business-immigration.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/eligibility.astro", _page6],
    ["src/pages/family-sponsorship.astro", _page7],
    ["src/pages/faq.astro", _page8],
    ["src/pages/permanent-residency.astro", _page9],
    ["src/pages/privacy.astro", _page10],
    ["src/pages/programs/australia-pr.astro", _page11],
    ["src/pages/programs/austria-job-seeker-visa.astro", _page12],
    ["src/pages/programs/canada-pr.astro", _page13],
    ["src/pages/programs/canada-student-visa.astro", _page14],
    ["src/pages/programs/germany-job-seeker-visa.astro", _page15],
    ["src/pages/programs/germany-student-visa.astro", _page16],
    ["src/pages/programs/ireland-student-visa.astro", _page17],
    ["src/pages/programs/netherlands-student-visa.astro", _page18],
    ["src/pages/programs/new-programs.astro", _page19],
    ["src/pages/programs/new-zealand-pr.astro", _page20],
    ["src/pages/programs/new-zealand-student-visa.astro", _page21],
    ["src/pages/programs/portugal-job-seeker-visa.astro", _page22],
    ["src/pages/programs/sweden-student-visa.astro", _page23],
    ["src/pages/programs/uae-job-seeker-visa.astro", _page24],
    ["src/pages/programs/uk-settlement.astro", _page25],
    ["src/pages/programs/uk-student-visa.astro", _page26],
    ["src/pages/services.astro", _page27],
    ["src/pages/terms.astro", _page28],
    ["src/pages/testimonials.astro", _page29],
    ["src/pages/visa.astro", _page30],
    ["src/pages/visitor-visa.astro", _page31],
    ["src/pages/work-visa.astro", _page32],
    ["src/pages/index.astro", _page33]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9ddcd19e-d604-48a5-83a8-dceb29f9c916",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
