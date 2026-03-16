import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Lock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CardParticipa, CardHeader, CardContent, CardFooter } from '@/src/components/ui/CardParticipa';
import { cn } from '@/src/lib/utils';

interface Poll {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'aberta' | 'fechada' | 'arquivada';
  requiredLevel: 'cadastrado' | 'verificado_prata' | 'premium_ouro';
  votes: number;
}

export const EnquetesList = () => {
  const [userLevel] = useState<'verificado_prata'>('verificado_prata'); // Mock user level

  const polls: Poll[] = [
    {
      id: '1',
      title: 'Orçamento Participativo 2026',
      description: 'Defina as prioridades de investimento para o próximo ano fiscal da cidade.',
      category: 'Finanças',
      status: 'aberta',
      requiredLevel: 'premium_ouro',
      votes: 4500
    },
    {
      id: '2',
      title: 'Novo Plano Diretor de Arborização',
      description: 'Consulta sobre as espécies de árvores a serem plantadas nas calçadas do centro.',
      category: 'Meio Ambiente',
      status: 'aberta',
      requiredLevel: 'verificado_prata',
      votes: 1200
    },
    {
      id: '3',
      title: 'Horário de Funcionamento dos Parques',
      description: 'Você prefere que os parques fechem às 20h ou 22h durante o verão?',
      category: 'Lazer',
      status: 'aberta',
      requiredLevel: 'cadastrado',
      votes: 3200
    }
  ];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'premium_ouro': return { label: 'Ouro', color: 'text-amber-500 bg-amber-500/10' };
      case 'verificado_prata': return { label: 'Prata', color: 'text-zinc-400 bg-zinc-400/10' };
      default: return { label: 'Bronze', color: 'text-blue-500 bg-blue-500/10' };
    }
  };

  const canVote = (required: string) => {
    const levels = ['cadastrado', 'verificado_prata', 'premium_ouro'];
    return levels.indexOf(userLevel) >= levels.indexOf(required);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Enquetes e Consultas</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Participe ativamente das decisões da sua cidade.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Filtrar enquetes..."
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {polls.map((poll) => {
          const level = getLevelBadge(poll.requiredLevel);
          const allowed = canVote(poll.requiredLevel);

          return (
            <div key={poll.id}>
              <CardParticipa className="group">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 rounded">
                        {poll.category}
                      </span>
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1", level.color)}>
                        {allowed ? <CheckCircle2 size={10} /> : <Lock size={10} />}
                        Nível {level.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{poll.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-2xl">
                      {poll.description}
                    </p>
                  </div>
                  
                  <div className="p-6 md:border-l border-zinc-100 dark:border-zinc-800 flex flex-col justify-center items-center md:w-48 gap-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{poll.votes.toLocaleString()}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Votos Totais</p>
                    </div>
                    
                    {allowed ? (
                      <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                        Votar <ChevronRight size={16} />
                      </button>
                    ) : (
                      <div className="mt-2 w-full py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                        Bloqueado <Lock size={14} />
                      </div>
                    )}
                  </div>
                </div>
                
                {!allowed && (
                  <div className="px-6 py-2 bg-amber-500/5 border-t border-amber-500/10 flex items-center gap-2">
                    <AlertCircle size={14} className="text-amber-500" />
                    <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
                      Esta enquete requer nível <strong>{level.label}</strong>. Faça o upload do seu comprovante de residência para subir de nível.
                    </span>
                  </div>
                )}
              </CardParticipa>
            </div>
          );
        })}
      </div>
    </div>
  );
};
