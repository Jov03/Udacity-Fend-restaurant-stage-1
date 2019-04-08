let staticCacheName='resturant-review-v1';

//Install Steps
self.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            return cache.addAll([
                '/',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
            ]);
        })
    )
});

//Activate Steps
self.addEventListener('activate',event=>{
    event.waitUntil(caches.keys().then(cacheNames=>{
        return Promise.all(
            cacheNames.filter(cacheName=>{
                return cacheName.startsWith('resturant-review-')&&cacheName!=staticCacheName;
            }).map(cacheName=>{
                return caches['delete'](cacheName);
            })
        );
    }));
});

//Service Worker Handles Requests
self.addEventListener('fetch',event=>{
    event.respondWith(caches.match(event.request).then(res=>{
        return res || fetch(event.request);
    }));
});