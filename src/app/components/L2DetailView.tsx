import { useState } from 'react';
import { ChevronUp, CheckCircle2, Send, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface L2DetailViewProps {
  page: {
    id: string;
    type: string;
    summary: string;
    content: {
      corePoints: string[];
      params: Array<{
        label: string;
        value: string;
        highlight: boolean;
      }>;
    };
  };
  onCollapse: () => void;
}

export function L2DetailView({ page, onCollapse }: L2DetailViewProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string; sources?: string[] }>>([
    {
      role: 'ai',
      content: '你好！我已经分析了这个页面的内容。有什么我可以帮你深入了解的吗？',
    }
  ]);
  const [input, setInput] = useState('');

  const quickActions = [
    '优势和劣势分析',
    '与竞品对比',
    '适合什么人群',
    '有哪些注意事项'
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([
      ...messages,
      { role: 'user', content: input },
      {
        role: 'ai',
        content: '根据页面内容分析，这款产品的主要优势在于降噪技术和续航表现。降噪等级达到ANC Pro级别，在嘈杂环境下能有效隔绝90%以上的环境噪音。续航方面支持30小时持续播放，满足长途旅行需求。',
        sources: ['参数对比章节', '用户评价区域']
      }
    ]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center gap-2">
          <Badge className="bg-[#0052D9] text-white">{page.type}</Badge>
          <span className="text-sm text-gray-600">深度分析模式</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onCollapse}>
          <ChevronUp className="w-4 h-4 mr-1" />
          收起
        </Button>
      </div>

      {/* 结构化摘要区域 */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0052D9]" />
          核心要点
        </h3>
        <ul className="space-y-2 mb-4">
          {page.content.corePoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-gray-900 mb-3">关键参数</h3>
        <div className="grid grid-cols-2 gap-3">
          {page.content.params.map((param, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                param.highlight
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="text-xs text-gray-600 mb-1">{param.label}</div>
              <div className={`font-semibold ${
                param.highlight ? 'text-green-700' : 'text-gray-900'
              }`}>
                {param.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 对话交互区域 */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">智能问答</h3>
        
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block max-w-[85%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[#0052D9] text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.sources && (
                  <div className="mt-2 pt-2 border-t border-gray-200 flex flex-wrap gap-1">
                    {message.sources.map((source, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-600 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {source}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 快捷操作 */}
        <div className="flex flex-wrap gap-2 mb-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => setInput(action)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-[#0052D9] hover:text-[#0052D9] transition-colors"
            >
              {action}
            </button>
          ))}
        </div>

        {/* 输入框 */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="继续提问..."
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-[#0052D9] hover:bg-[#0041B3]">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
