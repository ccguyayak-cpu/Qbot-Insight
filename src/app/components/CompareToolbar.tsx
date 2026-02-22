import { Check, X } from 'lucide-react';
import { Button } from './ui/button';

interface CompareToolbarProps {
  selectedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CompareToolbar({ selectedCount, onConfirm, onCancel }: CompareToolbarProps) {
  return (
    <div className="sticky top-[73px] bg-gradient-to-r from-[#0052D9] to-[#0041B3] border-b border-blue-700 z-10 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">
                多页对比模式
              </p>
              <p className="text-blue-100 text-sm">
                已选择 {selectedCount} 个页面 {selectedCount < 2 && '(至少选择2个)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={onConfirm}
              disabled={selectedCount < 2}
              className="bg-white text-[#0052D9] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              开始对比
            </Button>
            <Button
              onClick={onCancel}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4 mr-1" />
              取消
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
