let static_assets = "static-v1";

let assets = [
  "/",
  "index.html",
  "script.js",
  "style.css",
  "banana.jpg"
]

self.addEventListener("install", install);
self.addEventListener("fetch", handleFetch)

function install(e){
  console.log("install sw");
  e.waitUntil(

    caches.open(static_assets).then(c=>{

      c.addAll(assets);
      console.log("static assets stored")
    }).catch(err=>{
      
      console.log(err.message);
    
    })
  )
}
function handleFetch(e){
  e.respondWith(
    fetch(e.request).then(response=>{
      return response;
    })
    .catch(err=>{
      return caches.match(e.request)
    })
  )
}