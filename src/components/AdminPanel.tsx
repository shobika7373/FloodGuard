import { useState, useEffect } from "react";
import { Settings, CheckCircle, XCircle, CheckCircle2, AlertTriangle, RefreshCw, Database } from "lucide-react";
import { getApiBaseUrl } from "../services/api";
const API_URL = getApiBaseUrl();
export default function AdminPanel(){
  const [checks,setChecks]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [statusMessage,setStatusMessage]=useState<{type:string,text:string}|null>(null);
  const [loadingAction,setLoadingAction]=useState<string|null>(null);
  const [lastRefresh,setLastRefresh]=useState<string|null>(null);
  const [dataSources,setDataSources]=useState<any[]>([]);
  const [showConfiguration,setShowConfiguration]=useState(false);
  useEffect(()=>{
    const run=async()=>{
      const eps=[{name:"Dashboard API",url:`${API_URL}/api/dashboard`},{name:"Rainfall API",url:`${API_URL}/api/rainfall`},{name:"Water Levels API",url:`${API_URL}/api/water-levels`},{name:"Flood Risk API",url:`${API_URL}/api/flood-risk`},{name:"Drainage API",url:`${API_URL}/api/drainage`},{name:"Alerts API",url:`${API_URL}/api/alerts`},{name:"AI Prediction API",url:`${API_URL}/api/ai-prediction`},{name:"Community Reports API",url:`${API_URL}/api/community-reports`}];
      const res=[];
      for(const ep of eps){try{const r=await fetch(ep.url); const d=await r.json(); res.push({...ep,status:r.ok?"OK":"FAIL",mode:d.status||"Live",ok:r.ok});}catch{res.push({...ep,status:"FAIL",mode:"Error",ok:false});}}
      setChecks(res); setLoading(false);
    }; run();
  },[]);
  const handleRefreshSystem=async()=>{
    setLoadingAction("refresh");
    try{await fetch(`${API_URL}/api/dashboard`); setLastRefresh(new Date().toLocaleString()); setStatusMessage({type:"success",text:"System refreshed successfully!"});}catch{setStatusMessage({type:"error",text:"Failed to refresh system"});}
    setLoadingAction(null); setTimeout(()=>setStatusMessage(null),4000);
  };
  const handleCheckDataSources=async()=>{
    setLoadingAction("datasources");
    const eps=[{name:"Rainfall Data",url:`${API_URL}/api/rainfall`},{name:"Water Levels",url:`${API_URL}/api/water-levels`},{name:"Drainage Network",url:`${API_URL}/api/drainage`},{name:"AI Predictions",url:`${API_URL}/api/ai-prediction`},{name:"Community Reports",url:`${API_URL}/api/community-reports`}];
    const rs=[];
    for(const ep of eps){try{const r=await fetch(ep.url); rs.push({name:ep.name,status:r.ok?"Available":"Unavailable",mode:r.ok?"Live/Demo":"Offline"});}catch{rs.push({name:ep.name,status:"Unavailable",mode:"Error"});}}
    setDataSources(rs); setStatusMessage({type:"info",text:`Checked ${rs.length} data sources`}); setLoadingAction(null); setTimeout(()=>setStatusMessage(null),4000);
  };
  const handleConfiguration=()=>setShowConfiguration(!showConfiguration);
  return (
    <div className="p-6 space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white"><div className="flex items-center gap-4"><div className="rounded-xl bg-white/15 p-3"><Settings size={28}/></div><div><span className="rounded-full bg-white/20 px-3 py-1 text-xs">Connected | CLOUD</span><h1 className="text-3xl font-bold mt-2">Admin Panel</h1><p className="mt-2 text-sm text-indigo-100">Manage system configuration</p></div></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{loading?<div className="col-span-3 text-center py-10">Checking...</div>:checks.map((c,i)=><div key={i} className="rounded-xl border bg-white p-4"><div className="flex justify-between"><h3 className="font-semibold text-sm">{c.name}</h3>{c.ok?<CheckCircle className="text-green-500" size={20}/>:<XCircle className="text-red-500" size={20}/>}</div><p className="text-[11px] text-gray-500 mt-2 truncate">{c.url}</p></div>)}</div>
      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">Administrative Actions</h2>
        {statusMessage && (<div className={`mt-4 flex gap-2 rounded-lg border p-3 text-sm ${statusMessage.type==="success"?"border-green-200 bg-green-50 text-green-800":statusMessage.type==="error"?"border-red-200 bg-red-50 text-red-800":"border-blue-200 bg-blue-50 text-blue-800"}`}>{statusMessage.type==="error"?<AlertTriangle size={18} className="mt-0.5 shrink-0"/>:<CheckCircle2 size={18} className="mt-0.5 shrink-0"/>}<p>{statusMessage.text}</p></div>)}
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={handleRefreshSystem} disabled={!!loadingAction} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"><RefreshCw size={17}/>{loadingAction==="refresh"?"Refreshing...":"Refresh System"}</button>
          <button onClick={handleCheckDataSources} disabled={!!loadingAction} className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-gray-700 disabled:opacity-50"><Database size={17}/>{loadingAction==="datasources"?"Checking...":"Check Data Sources"}</button>
          <button onClick={handleConfiguration} disabled={!!loadingAction} className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-gray-700"><Settings size={17}/>{showConfiguration?"Hide Configuration":"Configuration"}</button>
        </div>
        {lastRefresh && <p className="mt-4 text-sm text-gray-500">Last successful refresh: {lastRefresh}</p>}
        {dataSources.length>0 && (<div className="mt-6 overflow-x-auto rounded-xl border bg-white"><div className="border-b px-4 py-3"><h3 className="font-semibold">Data Source Status</h3><p className="text-sm text-gray-500">Status is based on actual backend requests.</p></div><table className="w-full text-left text-sm"><thead className="bg-gray-50"><tr><th className="px-4 py-3">Data Source</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Mode</th></tr></thead><tbody>{dataSources.map((s)=><tr key={s.name} className="border-t"><td className="px-4 py-3 font-medium">{s.name}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.status==="Available"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{s.status}</span></td><td className="px-4 py-3 text-gray-600">{s.mode}</td></tr>)}</tbody></table></div>)}
        {showConfiguration && (<div className="mt-6 rounded-xl border bg-white p-5"><h3 className="font-semibold">Application Configuration</h3><div className="mt-4 space-y-3"><div className="rounded-lg bg-gray-50 p-4"><p className="text-sm text-gray-500">API Base URL</p><p className="mt-1 break-all font-semibold">{getApiBaseUrl()}</p></div><div className="rounded-lg bg-gray-50 p-4"><p className="text-sm text-gray-500">Configuration Status</p><p className="mt-1 font-semibold text-green-700">Configured</p></div><div className="rounded-lg bg-gray-50 p-4"><p className="text-sm text-gray-500">Configuration Access</p><p className="mt-1 font-semibold">Read-only</p></div><p className="text-xs text-gray-500">Server configuration and secrets are not exposed or editable from the browser.</p></div></div>)}
      </div>
    </div>
  );
}

