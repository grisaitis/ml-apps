/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2-oof!';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/offline.html',
  '/models/add.onnx',
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    // to do: what are the limitations of caches?
    // can this cache javascript libraries? wasm modules?
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened a cache and storing stuff to it!!! uhhh.. wheeee!!!!");
      return cache.addAll(FILES_TO_CACHE)
      // .then(() => {console.log("done installing the cache!")})
      // .catch((error) => {console.log("cache install failed, wtf???")});
    })
  )

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log("[ServiceWorker] oh snap! deleting an old cash! #trachethecache");
          return caches.delete(key)}
      }));
    })
  );
  self.clients.claim();  // to do: what does this do?
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.mode !== 'navigation') {
    console.log("peace out, don't care. navigate? more like navi-nope!");
    return;  // ciaooo!!!
  }
  evt.respondWith(
    fetch(evt.request)
    .then(() => {console.log("whee! request succeeded")})
    .catch(() => {
      console.log("oh snap, request failed. does we got cash?");
      return caches.open(CACHE_NAME).then((cache) => {
        console.log("cache rules everything around meee");
        return cache.match('offline.html');
      });
    })
  )
});
