/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// facebook pixel
tarteaucitron.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src', '_fbp'],
    "js": function () {
        "use strict";
        var n;
        if (window.fbq) return;
        n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        tarteaucitron.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', tarteaucitron.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof tarteaucitron.user.facebookpixelMore === 'function') {
            tarteaucitron.user.facebookpixelMore();
        }
    }
};

// google analytics
tarteaucitron.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (GA4)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gtagUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.gtagUa, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            if (tarteaucitron.user.gtagCrossdomain) {
                /**
                 * https://support.google.com/analytics/answer/7476333?hl=en
                 * https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
                 */
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info, { linker: { domains: tarteaucitron.user.gtagCrossdomain, } });
            } else {
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info);
            }

            if (typeof tarteaucitron.user.gtagMore === 'function') {
                tarteaucitron.user.gtagMore();
            }
        });
    }
};