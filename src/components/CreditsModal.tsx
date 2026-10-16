import React from 'react';
import { X, Award, Mail, BookOpen, Download, ShieldCheck, Heart } from 'lucide-react';
import { downloadStandaloneHtml } from '../utils/exportStandaloneHtml';
import { AppTheme } from '../types/game';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: AppTheme;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose, theme = 'light' }) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto ${
        isLight ? 'bg-slate-900/40 backdrop-blur-sm' : 'bg-black/85 backdrop-blur-md'
      }`}
      style={{ touchAction: 'auto' }}
    >
      <div className={`relative w-full max-w-lg border rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 max-h-[92vh] overflow-y-auto my-auto transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-700/80 text-slate-100'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/20 text-blue-400'}`}>
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Créditos y Datos Institucionales
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Recurso Educativo Digital Abierto (REDA)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'text-slate-400 hover:text-slate-800 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className={`py-4 space-y-4 text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {/* Main Institution Card */}
          <div className={`p-4 rounded-xl border space-y-2.5 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className={`flex items-center gap-2 font-bold text-sm ${isLight ? 'text-sky-800' : 'text-sky-400'}`}>
              <BookOpen className="w-4 h-4" />
              <span>Matemáticas A vs B (Carrera Dual)</span>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <div className="flex items-start gap-2">
                <span className={`font-semibold min-w-[120px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Autor:</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Hamilton Cabrera</span>
              </div>
              <div className="flex items-start gap-2">
                <span className={`font-semibold min-w-[120px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Contacto:</span>
                <a
                  href="mailto:soymitos@gmail.com"
                  className={`underline font-medium flex items-center gap-1 ${isLight ? 'text-blue-700 hover:text-blue-800' : 'text-sky-400 hover:text-sky-300'}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>soymitos@gmail.com</span>
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className={`font-semibold min-w-[120px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Institución / Proyecto:</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>RecursosHMCB</span>
              </div>
              <div className="flex items-start gap-2">
                <span className={`font-semibold min-w-[120px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Licencia:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  REDA - Distribución Gratuita
                </span>
              </div>
            </div>
          </div>

          {/* Educational Purpose */}
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
            isLight
              ? 'bg-blue-50/80 border-blue-200 text-blue-900'
              : 'bg-blue-950/30 border-blue-900/40 text-blue-200/90'
          }`}>
            <div className={`font-bold uppercase tracking-wider text-[10px] ${isLight ? 'text-blue-800' : 'text-blue-300'}`}>
              Propósito Pedagógico
            </div>
            <p>
              Diseñado para el desarrollo de la agilidad en cálculo mental, la concentración y la toma rápida de decisiones en un entorno gamificado y colaborativo. Optimizado para pantallas táctiles de aula, pizarras digitales interactivas (Smart Boards) y tabletas compartidas cara a cara.
            </p>
          </div>

          {/* Standalone HTML Download CTA */}
          <div className={`p-3.5 rounded-xl border space-y-2 ${
            isLight
              ? 'bg-emerald-50 border-emerald-300'
              : 'bg-emerald-950/30 border-emerald-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>
                  Descargar Archivo Único HTML5 (Offline)
                </div>
                <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Llévalo en una memoria USB y úsalo sin conexión a internet en cualquier aula.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={downloadStandaloneHtml}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Carrera_Matematica_REDA.html</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center justify-between text-xs ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
          <span className="flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-rose-500 fill-current inline" /> para la educación
          </span>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
