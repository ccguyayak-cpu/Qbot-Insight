import { useState } from 'react';
import { Sparkles, ChevronRight, Check } from 'lucide-react';
import type { SelectedPage } from '../App';

interface SearchResultItemProps {
  result: SelectedPage;
  onSummarize: (page: SelectedPage) => void;
  onSelectForCompare: (page: SelectedPage) => void;
  compareMode: boolean;
  isSelected: boolean;
}

export function SearchResultItem({
  result,
  onSummarize,
  onSelectForCompare,
  compareMode,
  isSelected
}: SearchResultItemProps) {
  const [showAiPrompt, setShowAiPrompt] = useState(true);

  if (compareMode) {
    return (
      <div
        onClick={() => onSelectForCompare(result)}
        className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
          isSelected
            ? 'border-[#0052D9] bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        }`}
      >
        <div className="flex items-start gap-4">
          {/* 选择框 */}
          <div
            className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
              isSelected
                ? 'bg-[#0052D9] border-[#0052D9]'
                : 'border-gray-300'
            }`}
          >
            {isSelected && <Check className="w-4 h-4 text-white" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                {result.type}
              </span>
              <span className="text-sm text-gray-600">{result.url}</span>
            </div>
            <h3 className="text-xl text-[#1a0dab] hover:underline mb-2">
              {result.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {result.snippet}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl hover:bg-gray-50 transition-all group">
      <div className="p-4 sm:p-5 flex items-start gap-3">
        {/* 左侧内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
              {result.type}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 truncate">{result.url}</span>
          </div>
          <a href="#" className="block">
            <h3 className="text-lg sm:text-xl text-[#1a0dab] hover:underline mb-2 leading-snug">
              {result.title}
            </h3>
          </a>
          <p className="text-sm text-gray-700 leading-relaxed">
            {result.snippet}
          </p>
        </div>

        {/* 右侧AI按钮 */}
        <button
          onClick={() => onSummarize(result)}
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#0052D9] to-[#0041B3] flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 group-hover:animate-pulse"
          title="AI总结"
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </div>
  );
}