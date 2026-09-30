import http from "node:http";
import crypto from "node:crypto";

const port=Number(process.env.PORT||3000);
const appBaseUrl=process.env.APP_BASE_URL||"";
const allowedOrigin=appBaseUrl.replace(/\/$/,"");
const required=["APP_BASE_URL"];
const missing=required.filter(k=>!process.env[k]);
const migrationFiles=[
"001_initial.sql",
"002_entity_network.sql",
"003_global_network.sql",
"004_funding.sql",
"005_global_operations.sql"
];

function json(res,status,payload,requestId){
  res.writeHead(status,{
    "content-type":"application/json; charset=utf-8",
    "cache-control":"no-store",
    "x-request-id":requestId
  });
  res.end(JSON.stringify(payload));
}

function cors(req,res){
  const origin=req.headers.origin;
  if(origin && allowedOrigin && origin===allowedOrigin){
    res.setHeader("access-control-allow-origin",origin);
    res.setHeader("vary","Origin");
    res.setHeader("access-control-allow-credentials","true");
  }
  res.setHeader("access-control-allow-methods","GET,POST,PATCH,OPTIONS");
  res.setHeader("access-control-allow-headers","content-type,authorization,x-request-id");
}

function requestId(req){
  const supplied=req.headers["x-request-id"];
  return typeof supplied==="string" && supplied.length<=120 ? supplied : crypto.randomUUID();
}

const server=http.createServer((req,res)=>{
  const id=requestId(req);
  cors(req,res);
  if(req.method==="OPTIONS") return json(res,204,{},id);

  if(req.method==="GET" && req.url==="/api/health"){
    return json(res,200,{
      status:"ok",
      service:"sovereignaqua-global-institute-api",
      version:"1.0.0",
      configuration:{
        appBaseUrlConfigured:Boolean(appBaseUrl),
        productionDatabaseConfigured:Boolean(process.env.DATABASE_URL),
        authConfigured:Boolean(process.env.AUTH_ISSUER),
        missingRequired:missing
      }
    },id);
  }

  if(req.method==="GET" && req.url==="/api"){
    return json(res,200,{
      service:"SovereignAqua Global Institute API",
      version:"1.0.0",
      openapi:"/api/openapi.yaml"
    },id);
  }

  if(req.method==="GET" && req.url==="/api/migrations"){
    return json(res,200,{
      status:"migration_plan",
      count:migrationFiles.length,
      order:migrationFiles,
      applied:false,
      note:"Production migration execution requires a configured database and controlled deployment job."
    },id);
  }

  return json(res,404,{error:"not_found",requestId:id},id);
});

if(process.argv.includes("--health")){
  if(missing.length){
    console.error("Missing configuration:",missing.join(","));
    process.exit(1);
  }
  console.log("Configuration check passed.");
  process.exit(0);
}

server.listen(port,()=>console.log("API listening on port "+port));
