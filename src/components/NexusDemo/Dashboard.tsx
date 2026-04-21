import React, { useState } from 'react';
import {
  Search, Clock, MessageSquare, Package, Bot,
  Home, Grid, Folder, Star, Settings, LogOut, User, Sparkles, FileText, CheckSquare, ChevronDown, ListTodo, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { StructuredTicket } from './types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface DashboardProps {
  tickets: StructuredTicket[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  activeTab: 'unresolved' | 'resolved';
  setActiveTab: (tab: 'unresolved' | 'resolved') => void;
  onUpdateStatus: (id: string, status: 'unresolved' | 'resolved') => void;
}

export default function Dashboard({
  tickets,
  selectedId,
  setSelectedId,
  activeTab,
  setActiveTab,
  onUpdateStatus
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = t.status === activeTab;
    const matchesSearch = t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedTicket = tickets.find(t => t.id === selectedId);

  const getCategoryColor = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('devolución')) return 'bg-orange-500/20 text-orange-400';
    if (c.includes('talla') || c.includes('cambio')) return 'bg-blue-500/20 text-blue-400';
    if (c.includes('facturación') || c.includes('pago')) return 'bg-red-500/20 text-red-400';
    if (c.includes('entrega')) return 'bg-purple-500/20 text-purple-400';
    return 'bg-gray-700/50 text-gray-300';
  };

  return (
    <div className="flex flex-1 min-h-0 bg-[#12161E] overflow-hidden text-slate-200 font-sans">
      {/* Narrow sidebar (Nav) */}
      <div className="w-16 bg-[#181C24] border-r border-[#262E3D] flex flex-col items-center py-6 gap-6 z-10 shrink-0">
         <div className="text-[#8FE331] mb-2"><Package size={28} /></div>
         <button className="text-gray-500 hover:text-gray-300 p-2"><Home size={20} /></button>
         <button className="text-gray-500 hover:text-gray-300 p-2"><Clock size={20} /></button>
         <button className="p-2 bg-[#262E3D] text-[#8FE331] rounded-lg shadow-sm"><Grid size={20} /></button>
         <button className="text-gray-500 hover:text-gray-300 p-2"><Folder size={20} /></button>
         <button className="text-gray-500 hover:text-gray-300 p-2"><Star size={20} /></button>
         <div className="mt-auto flex flex-col gap-4">
           <button className="text-gray-500 hover:text-gray-300 p-2"><Settings size={20} /></button>
           <button className="text-gray-500 hover:text-gray-300 p-2"><LogOut size={20} /></button>
         </div>
      </div>

      {/* Sidebar: Lista de Tickets */}
      <div className="w-[340px] border-r border-[#262E3D] bg-[#181C24] flex flex-col min-h-0 shrink-0">
        <div className="px-5 py-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Claims Agent
          </h2>
          <button className="text-gray-500 hover:text-gray-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
          </button>
        </div>

        <div className="px-5 pb-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <Input
              placeholder="Buscar Incidencia"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-[#11141A] border border-[#262E3D] rounded-lg text-xs placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-[#8FE331] text-white"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              INCIDENCIAS ABIERTAS
            </h3>
            <button className="text-gray-500 hover:text-white">+</button>
          </div>
          
          {/* Custom Tabs */}
          <div className="flex gap-4 border-b border-[#262E3D] pb-2">
            <button
              onClick={() => setActiveTab('unresolved')}
              className={cn(
                "text-[11px] font-medium transition-colors relative pb-2",
                activeTab === 'unresolved' ? "text-[#8FE331]" : "text-gray-500 hover:text-gray-300"
              )}
            >
              Abiertas
              {activeTab === 'unresolved' && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8FE331]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={cn(
                "text-[11px] font-medium transition-colors relative pb-2",
                activeTab === 'resolved' ? "text-[#8FE331]" : "text-gray-500 hover:text-gray-300"
              )}
            >
              Cerradas
              {activeTab === 'resolved' && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8FE331]" />
              )}
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 min-h-0">
          <div className="space-y-1 pb-4 cursor-pointer">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedId(ticket.id)}
                className={cn(
                  "px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 relative",
                  selectedId === ticket.id
                    ? "bg-[#262E3D]/40 text-white"
                    : "hover:bg-[#1C222B] text-gray-400"
                )}
              >
                {ticket.status === 'unresolved' ? (
                  <AlertTriangle size={14} className={selectedId === ticket.id ? "text-orange-400 opacity-80" : "text-gray-500"} />
                ) : (
                  <CheckCircle2 size={14} className={selectedId === ticket.id ? "text-[#8FE331] opacity-80" : "text-gray-500"} />
                )}
                <span className="text-sm font-medium">{ticket.id}</span>
                {selectedId === ticket.id && <div className="absolute left-0 w-1 h-5 bg-[#8FE331] rounded-r-md opacity-30" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Detail View */}
      <div className="flex-1 flex flex-col h-full bg-[#12161E] relative min-w-0">
        {selectedTicket ? (
          <div className="flex-1 overflow-hidden grid grid-cols-[1fr_360px] min-h-0">
            {/* Center Content */}
            <div className="flex flex-col h-full overflow-hidden">
               {/* Header / Topbar */}
               <div className="h-16 border-b border-[#262E3D] flex items-center justify-between px-8 bg-[#181C24]">
                 <h1 className="text-lg font-semibold text-white">Dashboard</h1>
                 <div className="flex items-center gap-4">
                   <button className="text-gray-500 hover:text-white relative">
                     <MessageSquare size={18} />
                   </button>
                   <button className="w-8 h-8 bg-[#2A3342] rounded-full text-xs font-bold text-white border border-[#3A4556] flex items-center justify-center">
                     AM
                   </button>
                 </div>
               </div>

               <ScrollArea className="flex-1 p-8">
                 <div className="max-w-4xl space-y-6">
                   <div className="flex items-center justify-between mb-4">
                     <h2 className="text-lg font-semibold text-white flex items-center gap-2 uppercase tracking-wide">
                       DETALLES DE LA INCIDENCIA: <span className="text-[#8FE331]">{selectedTicket.id}</span>
                     </h2>
                     <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1C222B] border border-[#2A3441] rounded-md text-xs font-medium text-gray-300 hover:bg-[#2A3441] transition-colors">
                       <FileText size={14} />
                       Incidencia
                       <ChevronDown size={14} />
                     </button>
                   </div>

                   {/* Grid 3 cards (Identificación, Categoría, Estado) */}
                   <div className="grid grid-cols-3 gap-6">
                     <div className="bg-[#1C222B] border border-[#2A3441] rounded-xl p-5 shadow-sm">
                       <h4 className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                         <User size={14}/> IDENTIFICACIÓN
                       </h4>
                       <div className="space-y-2 text-xs text-gray-300">
                         <p>Ref: <span className="text-white">{selectedTicket.orderNumber || selectedTicket.alternativeIdentifier || 'N/A'}</span></p>
                         <p>Score: <span className="text-white">{selectedTicket.completenessScore}% completado</span></p>
                       </div>
                     </div>
                     <div className="bg-[#1C222B] border border-[#2A3441] rounded-xl p-5 shadow-sm">
                       <h4 className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                         <Grid size={14}/> CATEGORÍA
                       </h4>
                       <div className="space-y-2 text-xs text-gray-300">
                         <p>Tipo: <span className="text-white">{selectedTicket.category}</span></p>
                         <p>Prioridad: <span className="text-white capitalize">{selectedTicket.priority || 'Normal'}</span></p>
                       </div>
                     </div>
                     <div className="bg-[#1C222B] border border-[#2A3441] rounded-xl p-5 shadow-sm">
                       <h4 className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                         <Clock size={14}/> ESTADO
                       </h4>
                       <div className="space-y-2 text-xs text-gray-300">
                         <p>Abierta: <span className="text-white">{format(selectedTicket.createdAt, 'dd/MM/yyyy HH:mm')}</span></p>
                         <p>Asignado: <span className="text-white">Nexus AI</span></p>
                       </div>
                     </div>
                   </div>

                   {/* AI Interpretation */}
                   <div className="bg-[#1A221C] border border-[#8FE331]/30 rounded-xl p-5 shadow-sm shadow-[#8FE331]/5 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-[#8FE331]"></div>
                     <h4 className="text-[11px] font-bold text-[#8FE331] tracking-wider mb-3 flex items-center gap-2">
                       <Sparkles size={14}/> INTERPRETACIÓN IA
                     </h4>
                     <p className="text-xs text-gray-300 leading-relaxed font-light">
                       {selectedTicket.aiInterpretation}
                     </p>
                   </div>

                   {/* Items / Incidencias identificadas */}
                   <div className="grid grid-cols-2 gap-6">
                     <div className="bg-[#1C222B] border border-[#2A3441] rounded-xl p-5 shadow-sm items-start content-start">
                       <h4 className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                         <Package size={14}/> ITEMS RELACIONADOS
                       </h4>
                       <div className="flex flex-wrap gap-2">
                         {selectedTicket.items?.length ? selectedTicket.items.map((item, i) => (
                           <React.Fragment key={i}>
                             <Badge variant="secondary" className="bg-[#2A3441] hover:bg-[#2A3441] text-gray-300 text-xs font-normal px-3 py-1 rounded-full border-none">
                               {item}
                             </Badge>
                           </React.Fragment>
                         )) : <span className="text-xs text-gray-500">Sin items específicos</span>}
                       </div>
                     </div>
                     <div className="bg-[#1C222B] border border-[#2A3441] rounded-xl p-5 shadow-sm items-start content-start">
                       <h4 className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 flex items-center gap-2">
                         <AlertTriangle size={14}/> INCIDENCIAS IDENTIFICADAS
                       </h4>
                       <div className="flex flex-wrap gap-2">
                         {selectedTicket.subIncidents?.length ? selectedTicket.subIncidents.map((sub, i) => (
                           <React.Fragment key={i}>
                             <Badge variant="default" className={cn("text-xs font-normal px-3 py-1 rounded-full border-none", getCategoryColor(sub.category))}>
                               {sub.category}
                             </Badge>
                           </React.Fragment>
                         )) : (
                            <Badge variant="default" className={cn("text-xs font-normal px-3 py-1 rounded-full border-none", getCategoryColor(selectedTicket.category))}>
                             {selectedTicket.category}
                           </Badge>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Resumen & Missing Info */}
                   <div className="grid grid-cols-2 gap-6">
                     <div className="bg-[#1C222B] border border-[#2A3441] rounded-xl p-5 shadow-sm">
                       <h4 className="text-[11px] font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-2">
                         <FileText size={14}/> RESOLUCIÓN PROPUESTA
                       </h4>
                       <p className="text-xs text-gray-300 leading-relaxed font-light">
                         {selectedTicket.summary}
                       </p>
                     </div>
                     <div className="bg-[#1C222B] border border-[#2A3441] rounded-xl p-5 shadow-sm">
                       <h4 className="text-[11px] font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-2">
                         <ListTodo size={14}/> ACCIONES A REALIZAR
                       </h4>
                       {(selectedTicket.missingInfo?.length ?? 0) > 0 ? (
                         <ul className="space-y-2">
                           {selectedTicket.missingInfo?.map((info, i) => (
                             <li key={i} className="text-xs text-gray-300 font-light flex items-start gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-orange-400/80 mt-1 shrink-0" />
                               Recopilar: {info}
                             </li>
                           ))}
                         </ul>
                       ) : (
                         <p className="text-xs text-gray-400 font-light">Evaluar incidencia para proceder con la asignación correspondiente en base a la información provista.</p>
                       )}
                     </div>
                   </div>

                   {/* Action Button */}
                   <div className="pt-4 pb-8">
                     <Button
                       onClick={() => {
                         const newStatus = selectedTicket.status === 'unresolved' ? 'resolved' : 'unresolved';
                         onUpdateStatus(selectedTicket.id, newStatus);
                       }}
                       className={cn(
                         "w-full rounded-xl py-6 tracking-widest text-[13px] font-bold transition-all shadow-sm",
                         selectedTicket.status === 'unresolved'
                           ? "bg-[#18261E] hover:bg-[#1A2E22] border border-[#8FE331]/30 text-[#8FE331]"
                           : "bg-[#262E3D] hover:bg-[#2A3441] border border-transparent text-white"
                       )}
                     >
                       {selectedTicket.status === 'unresolved' ? 'FINALIZAR' : 'REABRIR INCIDENCIA'}
                     </Button>
                   </div>
                 </div>
               </ScrollArea>
            </div>

            {/* Right Sidebar (Historial) */}
            <div className="bg-[#181C24] border-l border-[#262E3D] flex flex-col min-h-0 shrink-0 shadow-lg z-10 w-[360px]">
               <div className="h-16 border-b border-[#262E3D] flex items-center px-6 justify-between bg-[#181C24]">
                 <h3 className="text-xs font-semibold text-white tracking-wide">HISTORIAL DE CONVERSACIÓN</h3>
                 <button className="text-gray-500 hover:text-white pb-2 font-bold tracking-widest">...</button>
               </div>

               <ScrollArea className="flex-1 p-5 bg-[#1B2129]">
                 <div className="space-y-6">
                   {(selectedTicket.originalConversation?.length ?? 0) > 0 ? (
                     selectedTicket.originalConversation?.map((m, i) => {
                       const isUser = m.role === 'user';
                       return (
                         <div key={i} className={cn("flex flex-col", isUser ? "items-start" : "items-end")}>
                           <div className="flex items-center gap-2 mb-2">
                             {isUser ? (
                               <>
                                 <div className="w-5 h-5 rounded-full overflow-hidden bg-cover bg-center shrink-0 border border-[#81A832]" style={{ backgroundImage: 'url(https://ui-avatars.com/api/?name=User&background=F3F4F6&color=374151)' }}></div>
                                 <span className="text-xs font-semibold text-white">User</span>
                                 <span className="text-[10px] text-gray-500">{format(m.timestamp, 'HH:mm')}</span>
                               </>
                             ) : (
                               <>
                                 <span className="text-[10px] text-gray-500">Hace {format(m.timestamp, 'HH:mm')}</span>
                                 <div className="w-6 h-6 rounded-full bg-[#8FE331]/20 text-[#8FE331] flex items-center justify-center shrink-0 border border-[#8FE331]/30"><Bot size={13}/></div>
                               </>
                             )}
                           </div>
                           <div className={cn(
                             "px-4 py-3.5 shadow-sm max-w-[95%] text-[13px] font-normal leading-[1.6]",
                             isUser
                               ? "bg-[#283241] text-gray-200 rounded-2xl rounded-tl-sm border border-[#343F4F]"
                               : "bg-[#283241] text-gray-300 rounded-2xl rounded-tr-sm border border-[#3A4A3C] opacity-95"
                           )}>
                             {m.content}
                           </div>
                         </div>
                       );
                     })
                   ) : (
                     <p className="text-sm text-gray-500 text-center py-10">Sin historial</p>
                   )}
                 </div>
               </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <Package size={48} className="mb-4 opacity-20" />
            <p className="text-sm">Selecciona una incidencia para ver los detalles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
