import http from "node:http";

const port=Number(process.env.PORT||3000);
const required=["APP_BASE_URL"];
const missing=required.filter(k=>!process.env[k]);

function json(res,status,payload){
  res.writeHead(status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"});
  res.end(JSON.stringify(payload));
}

const server=http.createServer((req,res)=>{
  if(req.method==="GET" && req.url==="/api/health"){
    return json(res,200,{status:"ok",service:"sovereignaqua-global-institute-api",version:"1.0.0",configuration:{appBaseUrlConfigured:Boolean(process.env.APP_BASE_URL),missingRequired:missing}});
  }
  if(req.method==="GET" && req.url==="/api"){
    return json(res,200,{service:"SovereignAqua Global Institute API",version:"1.0.0",documentation:"/api/openapi.yaml"});
  }
  return json(res,404,{error:"not_found"});
});

if(process.argv.includes("--health")){
  if(missing.length){console.error("Missing configuration:",missing.join(","));process.exit(1);}
  console.log("Configuration check passed.");
  process.exit(0);
}

server.listen(port,()=>console.log("API listening on port "+port));
