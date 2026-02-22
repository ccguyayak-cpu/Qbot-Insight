import { Activity, Settings, Share2 } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  viewMode: 'single' | 'compare';
  onViewModeChange: (mode: 'single' | 'compare') => void;
}

export function Header({ viewMode, onViewModeChange }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        {/* 品牌Logo和状态指示 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0052D9] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QB</span>
            </div>
            <span className="font-semibold text-gray-900">QBot Insight</span>
          </div>
          
          {/* 状态指示灯 */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-700">在线</span>
          </div>
        </div>
        
        {/* 功能按钮 */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* 模式切换Tab */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => onViewModeChange('single')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            viewMode === 'single'
              ? 'bg-white text-[#0052D9] shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          单页洞察
        </button>
        <button
          onClick={() => onViewModeChange('compare')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            viewMode === 'compare'
              ? 'bg-white text-[#0052D9] shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          多页对比
        </button>
      </div>
    </div>
  );
}
