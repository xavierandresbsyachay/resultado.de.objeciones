// DEMOSTRACIÓN: datos públicos ficticios. No colocar tokens, contraseñas o Excel privado aquí.
const MESES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
let registros=[],filtrados=[],graficoMensual,graficoEstados;
const porId=id=>document.getElementById(id);
const dinero=x=>new Intl.NumberFormat('es-EC',{style:'currency',currency:'USD'}).format(x);
const escapar=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 const mes=porId('mes').value,estado=porId('estado').value;
 filtrados=registros.filter(r=>(!mes||r.mes===mes)&&(!estado||r.estado===estado));
 const cantidad=filtrados.length,completados=filtrados.filter(r=>r.estado==='Completado').length,pendientes=filtrados.filter(r=>r.estado==='Pendiente').length;
 porId('total').textContent=cantidad;porId('completados').textContent=completados;porId('pendientes').textContent=pendientes;porId('tasa').textContent=(cantidad?Math.round(completados/cantidad*100):0)+'%';
 porId('tabla').innerHTML=filtrados.map(r=>`<tr><td>${escapar(r.id)}</td><td>${escapar(r.mes)}</td><td>${escapar(r.area)}</td><td><span class="status ${r.estado==='Completado'?'completado':r.estado==='Pendiente'?'pendiente':'en-revision'}">${escapar(r.estado)}</span></td><td>${dinero(Number(r.valor)||0)}</td></tr>`).join('');
 porId('vacio').hidden=!!cantidad;
 if(typeof Chart==='undefined')return;
 const labels=MESES.filter(m=>filtrados.some(r=>r.mes===m));const volumes=labels.map(m=>filtrados.filter(r=>r.mes===m).length);
 if(graficoMensual)graficoMensual.destroy();graficoMensual=new Chart(porId('graficoMensual'),{type:'bar',data:{labels,datasets:[{label:'Registros',data:volumes,backgroundColor:'#3b82f6',borderRadius:6,maxBarThickness:42}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0},grid:{color:'#eef1f6'}},x:{grid:{display:false}}}}});
 if(graficoEstados)graficoEstados.destroy();graficoEstados=new Chart(porId('graficoEstados'),{type:'doughnut',data:{labels:['Completado','Pendiente','En revisión'],datasets:[{data:['Completado','Pendiente','En revisión'].map(s=>filtrados.filter(r=>r.estado===s).length),backgroundColor:['#10b981','#f59e0b','#60a5fa'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'67%',plugins:{legend:{position:'bottom',labels:{boxWidth:10,padding:16}}}}});
}
function descargarCSV(){const encabezados=['id','mes','area','estado','valor'];const enc=x=>'"'+String(x).replaceAll('"','""')+'"';const texto='\uFEFF'+[encabezados.join(';'),...filtrados.map(r=>encabezados.map(k=>enc(r[k])).join(';'))].join('\r\n');const a=document.createElement('a');const url=URL.createObjectURL(new Blob([texto],{type:'text/csv;charset=utf-8'}));a.href=url;a.download='dashboard-demo.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function iniciar(){try{const respuesta=await fetch('./datos/ejemplo.json');if(!respuesta.ok)throw Error('No se pudo cargar el archivo JSON');registros=await respuesta.json();const meses=MESES.filter(m=>registros.some(r=>r.mes===m));porId('mes').innerHTML+=[...meses].map(m=>`<option value="${m}">${m}</option>`).join('');render();}catch(e){porId('vacio').hidden=false;porId('vacio').textContent='No se pudieron cargar los datos. Publica en GitHub Pages o abre con un servidor local (no usando file://).';console.error(e)}}
porId('mes').addEventListener('change',render);porId('estado').addEventListener('change',render);porId('limpiar').addEventListener('click',()=>{porId('mes').value='';porId('estado').value='';render()});porId('csv').addEventListener('click',descargarCSV);iniciar();
