import { Search, Sparkles } from 'lucide-react';
import { SearchResultItem } from './SearchResultItem';
import { CompareToolbar } from './CompareToolbar';
import type { SelectedPage } from '../App';

interface SearchResultsProps {
  onSummarize: (page: SelectedPage) => void;
  onStartCompare: () => void;
  onSelectForCompare: (page: SelectedPage) => void;
  compareMode: boolean;
  selectedPages: SelectedPage[];
  onConfirmCompare: () => void;
  onCancelCompare: () => void;
}

export function SearchResults({
  onSummarize,
  onStartCompare,
  onSelectForCompare,
  compareMode,
  selectedPages,
  onConfirmCompare,
  onCancelCompare
}: SearchResultsProps) {
  const mockResults: SelectedPage[] = [
    {
      id: '1',
      title: '索尼WH-1000XM5降噪耳机深度评测 - 音质与降噪的完美结合',
      url: 'www.techreview.com/sony-wh1000xm5',
      snippet: '索尼WH-1000XM5是2024年旗舰级降噪耳机的代表作品，采用全新的降噪芯片，降噪性能相比前代提升20%。30小时的超长续航、LDAC高清音质传输、轻量化设计...',
      type: '商品评测'
    },
    {
      id: '2',
      title: 'Bose QuietComfort 45评测：舒适度与降噪的平衡之选',
      url: 'www.audiogeek.com/bose-qc45-review',
      snippet: 'Bose QC45延续了QuietComfort系列一贯的舒适佩戴体验，采用ANC Premium降噪技术，虽然参数上略逊于索尼，但实际体验中的舒适度更胜一筹。24小时续航...',
      type: '商品评测'
    },
    {
      id: '3',
      title: 'AirPods Max完全指南 - 苹果生态的最佳选择',
      url: 'www.appleinsider.com/airpods-max-guide',
      snippet: 'AirPods Max作为苹果首款头戴式耳机，在苹果生态中有着无可比拟的优势。空间音频、无缝切换、H1芯片带来的低延迟体验，但4399元的价格和384g的重量...',
      type: '商品评测'
    },
    {
      id: '4',
      title: 'React 19新特性详解：服务端组件革命性变革',
      url: 'www.reactdev.io/react-19-features',
      snippet: 'React 19带来了服务端组件(Server Components)、并发渲染优化、自动批处理等重大更新。性能提升35%，打包体积减少20%，开发体验大幅改善...',
      type: '技术文章'
    },
    {
      id: '5',
      title: 'OpenAI发布GPT-5预览版，AI能力再次突破',
      url: 'www.ainews.com/gpt5-preview',
      snippet: 'OpenAI正式发布GPT-5预览版，推理能力提升40%，支持图像、语音、视频多模态实时交互。上下文窗口扩展至100万tokens，响应延迟降低至50ms...',
      type: '新闻资讯'
    },
    {
      id: '6',
      title: '2024年降噪耳机选购完全指南 - 从入门到高端',
      url: 'www.buyguide.com/headphones-2024',
      snippet: '本文全面对比了2024年市面上主流的降噪耳机产品，从价格、降噪性能、音质、续航等多个维度进行深度分析，帮助你选择最适合自己的降噪耳机...',
      type: '购物指南'
    }
  ];

  return (
    <div className="h-screen overflow-y-auto bg-white">
      {/* 搜索栏 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-full hover:shadow-md transition-shadow">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                defaultValue="降噪耳机推荐"
                className="flex-1 outline-none text-sm sm:text-base text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 多页对比工具栏 */}
      {compareMode && (
        <CompareToolbar
          selectedCount={selectedPages.length}
          onConfirm={onConfirmCompare}
          onCancel={onCancelCompare}
        />
      )}

      {/* AI助手提示横幅 - 只显示一次 */}
      {!compareMode && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0052D9] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  QBot AI 智能助手
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  点击搜索结果右侧的 <Sparkles className="w-3.5 h-3.5 inline text-[#0052D9]" /> 图标，即可获取AI总结
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    ✨ 快速提取核心信息
                  </span>
                  <span className="flex items-center gap-1">
                    🎯 智能问答互动
                  </span>
                  <span className="flex items-center gap-1">
                    📊 多页对比分析
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 搜索结果 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs sm:text-sm text-gray-600">
            找到约 1,230,000 条结果 (用时 0.42 秒)
          </p>
          {!compareMode && (
            <button
              onClick={onStartCompare}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0052D9] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0041B3] transition-colors"
            >
              多页对比
            </button>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          {mockResults.map((result) => (
            <SearchResultItem
              key={result.id}
              result={result}
              onSummarize={onSummarize}
              onSelectForCompare={onSelectForCompare}
              compareMode={compareMode}
              isSelected={selectedPages.some(p => p.id === result.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
