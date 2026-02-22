import { ChevronDown, Clock, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface L1CardProps {
  page: {
    id: string;
    type: string;
    summary: string;
    keywords: string[];
    readTime: number;
    relevance: number;
  };
  onExpand: () => void;
}

export function L1Card({ page, onExpand }: L1CardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* 页面类型标签 */}
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="bg-blue-50 text-[#0052D9] border-blue-200">
          {page.type}
        </Badge>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <X className="w-4 h-4 text-gray-400" />
        </Button>
      </div>
      
      {/* 核心摘要 */}
      <p className="text-gray-900 mb-3 leading-relaxed">
        {page.summary}
      </p>
      
      {/* 关键词标签 */}
      <div className="flex flex-wrap gap-2 mb-3">
        {page.keywords.map((keyword, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
          >
            #{keyword}
          </span>
        ))}
      </div>
      
      {/* 预计阅读时间和相关性 */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>预计阅读 {page.readTime} 分钟</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>内容相关性</span>
            <span>{page.relevance}%</span>
          </div>
          <Progress value={page.relevance} className="h-1.5" />
        </div>
      </div>
      
      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button
          onClick={onExpand}
          className="flex-1 bg-[#0052D9] hover:bg-[#0041B3]"
          size="sm"
        >
          <span>展开详情</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
        <Button variant="outline" size="sm" className="px-4">
          暂不显示
        </Button>
      </div>
    </div>
  );
}
