import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Database,
  MapPin,
  Globe
} from 'lucide-react';
import { CardParticipa, CardHeader, CardContent } from '@/src/components/ui/CardParticipa';
import { supabase } from '@/src/lib/supabase';

interface IBGEData {
  id_uf: string;
  nome_uf: string;
  sigla_uf: string;
  id_regiao_interm: string;
  nome_regiao_interm: string;
  id_regiao_imed: string;
  nome_regiao_imed: string;
  id_munic: string;
  id_munic_comp: string;
  nome_municipio: string;
  ativo: string;
}

export const EntityRegistration = () => {
  const [csvText, setCsvText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const processIBGEData = async () => {
    if (!csvText.trim()) return;

    setIsProcessing(true);
    setStatus('processing');
    setLogs([]);
    addLog('Iniciando processamento de dados IBGE...');

    try {
      const lines = csvText.split('\n');
      const headers = lines[0].split(';').map(h => h.trim().toLowerCase());
      
      const data: IBGEData[] = lines.slice(1)
        .filter(line => line.trim() !== '')
        .map(line => {
          const values = line.split(';');
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header.replace(/\s+/g, '_')] = values[index]?.trim();
          });
          return obj as IBGEData;
        });

      addLog(`Encontrados ${data.length} registros para processar.`);

      for (const item of data) {
        addLog(`Processando Município: ${item.nome_municipio} (${item.sigla_uf})`);

        // Salvar na nova tabela de municípios
        const { error: municError } = await supabase
          .from('municipios')
          .upsert({
            id_uf: parseInt(item.id_uf),
            nome_uf: item.nome_uf,
            sigla_uf: item.sigla_uf,
            id_regiao_interm: parseInt(item.id_regiao_interm),
            nome_regiao_interm: item.nome_regiao_interm,
            id_regiao_imed: parseInt(item.id_regiao_imed),
            nome_regiao_imed: item.nome_regiao_imed,
            id_munic: item.id_munic,
            id_munic_comp: item.id_munic_comp,
            nome_municipio: item.nome_municipio,
            ativo: item.ativo.toLowerCase() === 'ativo'
          }, { onConflict: 'id_munic_comp' });

        if (municError) {
          addLog(`Erro ao salvar município ${item.nome_municipio}: ${municError.message}`);
        }
      }

      addLog('Processamento concluído com sucesso!');
      setStatus('success');
    } catch (error: any) {
      addLog(`ERRO CRÍTICO: ${error.message}`);
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <CardParticipa>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="text-blue-600" size={20} />
              <h3 className="font-bold">Importar Dados IBGE</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-500">
              Cole abaixo os dados no formato CSV (separado por ponto e vírgula) conforme o padrão do IBGE.
            </p>
            
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="ID_UF;NOME_UF;SIGLA_UF;ID_REGIAO_INTERM;..."
              className="w-full h-64 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              disabled={isProcessing}
            />

            <div className="flex gap-2">
              <button
                onClick={processIBGEData}
                disabled={isProcessing || !csvText.trim()}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                {isProcessing ? 'Processando...' : 'Processar e Salvar'}
              </button>
              <button
                onClick={() => setCsvText('')}
                disabled={isProcessing}
                className="px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
              >
                Limpar
              </button>
            </div>
          </CardContent>
        </CardParticipa>

        <CardParticipa className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Globe className="text-blue-600 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-sm text-blue-900 dark:text-blue-100">Dica de Formato</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  O sistema identifica automaticamente o Estado pela sigla e vincula a cidade à sua respectiva Região Imediata e Intermediária.
                </p>
              </div>
            </div>
          </CardContent>
        </CardParticipa>
      </div>

      <CardParticipa className="flex flex-col h-[600px]">
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="text-zinc-400" size={20} />
              <h3 className="font-bold">Logs de Processamento</h3>
            </div>
            {status === 'success' && <CheckCircle2 className="text-emerald-500" size={20} />}
            {status === 'error' && <AlertCircle className="text-red-500" size={20} />}
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-1 bg-zinc-950 text-zinc-400 rounded-b-2xl">
          {logs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
              <Loader2 size={32} className="mb-2" />
              <p>Aguardando dados...</p>
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className={cn(
                "py-0.5 border-l-2 pl-2",
                log.includes('ERRO') ? "border-red-500 text-red-400" : 
                log.includes('concluído') ? "border-emerald-500 text-emerald-400" : "border-zinc-800"
              )}>
                {log}
              </div>
            ))
          )}
        </CardContent>
      </CardParticipa>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
