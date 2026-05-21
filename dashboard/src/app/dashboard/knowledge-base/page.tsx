"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

export default function KnowledgeBase() {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  return (
    <div className="fade-in-up pb-10">
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">{t.knowledgeBase.title}</h2>
        <p className="text-[var(--foreground)]/60 mt-2 text-sm">{t.knowledgeBase.desc}</p>
      </header>
      
      <div className="glass-panel p-10 mb-8 rounded-2xl">
        <h3 className="text-lg font-semibold mb-6">{t.knowledgeBase.dataSources}</h3>
        
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
            dragActive ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]" : "border-[var(--border)] hover:border-indigo-500/50 hover:bg-[var(--surface-hover)]"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          </div>
          <p className="font-semibold text-lg mb-2">{t.knowledgeBase.dropZone}</p>
          <p className="text-[var(--foreground)]/50 text-sm">{t.knowledgeBase.dropZoneDesc}</p>
        </div>

        {files.length > 0 && (
          <div className="mt-10 animate-fade-in">
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-[var(--foreground)]/60">{t.knowledgeBase.processingQueue} ({files.length})</h4>
            <ul className="space-y-3">
              {files.map((file, i) => (
                <li key={i} className="flex items-center justify-between bg-[var(--surface)] px-5 py-4 rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full font-bold uppercase tracking-wide">{t.knowledgeBase.statusReady}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-0.5">
                    {t.knowledgeBase.startTraining}
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
