import http from "node:http";
import crypto from "node:crypto";
import { getApiRoute, apiRouteIndex } from "./routes.js";

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

export function createServer(){
  return http.createServer((req,res)=>{
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

  if(req.method==="GET" && req.url==="/api/routes"){
    return json(res,200,{routes:apiRouteIndex()},id);
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

  const pathname=(req.url||"").split("?")[0];
  const apiRoute=getApiRoute(req.method,pathname);
  if(apiRoute){
    Promise.resolve(apiRoute.handler({req,res,requestId:id}))
      .then(result=>{
        if(res.writableEnded) return;
        const status=result?.status||200;
        return json(res,status,result?.body||{},id);
      })
      .catch(error=>{
        if(res.writableEnded) return;
        const status=Number(error?.statusCode)||500;
        return json(res,status,{error:status===500?"internal_error":error.message},id);
      });
    return;
  }

  return json(res,404,{error:"not_found",requestId:id},id);
  });
}

if(process.argv.includes("--health")){
  if(missing.length){
    console.error("Missing configuration:",missing.join(","));
    process.exit(1);
  }
  console.log("Configuration check passed.");
  process.exit(0);
}

if(process.env.NODE_ENV!=="test"){
  createServer().listen(port,()=>console.log("API listening on port "+port));
}
