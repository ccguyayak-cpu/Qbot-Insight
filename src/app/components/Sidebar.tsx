import { X } from 'lucide-react';
import { Button } from './ui/button';
import { SinglePageContent } from './SinglePageContent';
import { CompareContent } from './CompareContent';
import type { SidebarMode, SelectedPage } from '../App';

interface SidebarProps {
  mode: SidebarMode;
  selectedPages: SelectedPage[];
  onClose: () => void;
}

export function Sidebar({ mode, selectedPages, onClose }: SidebarProps) {
  if (mode === 'hidden') {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-full sm:w-[400px] bg-[#F5F7FA] border-l border-gray-200 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
      {/* 侧边栏头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0052D9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">QB</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">QBot Insight</h2>
            <p className="text-xs text-gray-600">
              {mode === 'single' ? '单页洞察' : '多页对比'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* 侧边栏内容 */}
      <div className="flex-1 overflow-y-auto">
        {mode === 'single' && selectedPages[0] && (
          <SinglePageContent page={selectedPages[0]} />
        )}
        {mode === 'compare' && (
          <CompareContent pages={selectedPages} />
        )}
      </div>
    </div>
  );
}