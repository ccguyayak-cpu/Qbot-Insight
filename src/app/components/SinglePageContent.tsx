import { useState } from 'react';
import { CheckCircle2, Clock, Send, Sparkles, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import type { SelectedPage } from '../App';

interface SinglePageContentProps {
  page: SelectedPage;
}

export function SinglePageContent({ page }: SinglePageContentProps) {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string; sources?: string[] }>>([]);
  const [input, setInput] = useState('');

  // 模拟内容数据
  const mockContent = {
    summary: page.snippet,
    readTime: 5,
    relevance: 92,
    corePoints: [
      '业界领先的降噪技术，支持自适应场景切换',
      '30小时超长续航，快充3分钟可用3小时',
      'LDAC高清音质传输，支持多设备连接',
      '轻量化设计，佩戴舒适度提升15%'
    ],
    params: [
      { label: '价格', value: '¥2,499', highlight: false },
      { label: '降噪等级', value: 'ANC Pro', highlight: true },
      { label: '续航时间', value: '30小时', highlight: true },
      { label: '重量', value: '250g', highlight: false },
      { label: '蓝牙版本', value: '5.2', highlight: false },
      { label: '音质编码', value: 'LDAC/AAC', highlight: true }
    ]
  };

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
        content: '根据页面内容分析，这款产品的主要优势在于降噪技术和续航表现。降噪等级达到ANC Pro级别，在嘈杂环境下能有效隔绝90%以上的环境噪音。',
        sources: ['参数对比章节', '用户评价区域']
      }
    ]);
    setInput('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* L1 轻度概览卡片 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-50 text-[#0052D9] text-xs rounded border border-blue-200">
            {page.type}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-xs text-green-700">已分析</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 leading-snug">
          {page.title}
        </h3>

        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          {mockContent.summary}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>预计阅读 {mockContent.readTime} 分钟</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>内容相关性</span>
              <span>{mockContent.relevance}%</span>
            </div>
            <Progress value={mockContent.relevance} className="h-1.5" />
          </div>
        </div>

        <Button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-[#0052D9] hover:bg-[#0041B3]"
          size="sm"
        >
          <span>{expanded ? '收起详情' : '展开详情'}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          )}
        </Button>
      </div>

      {/* L2 深度交互界面 */}
      {expanded && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* 结构化摘要 */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0052D9]" />
              核心要点
            </h4>
            <ul className="space-y-2 mb-4">
              {mockContent.corePoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-gray-900 mb-3">关键参数</h4>
            <div className="grid grid-cols-2 gap-2">
              {mockContent.params.map((param, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm ${
                    param.highlight
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="text-xs text-gray-600">{param.label}</div>
                  <div className={`font-semibold ${
                    param.highlight ? 'text-green-700' : 'text-gray-900'
                  }`}>
                    {param.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 智能问答 */}
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">智能问答</h4>
            
            {messages.length > 0 && (
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[90%] p-2 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-[#0052D9] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      {message.sources && (
                        <div className="mt-1 pt-1 border-t border-gray-200 flex flex-wrap gap-1">
                          {message.sources.map((source, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-gray-600 flex items-center gap-0.5"
                            >
                              <ExternalLink className="w-2.5 h-2.5" />
                              {source}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 快捷操作 */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInput(action)}
                  className="px-2 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:border-[#0052D9] hover:text-[#0052D9] transition-colors"
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
                className="flex-1 text-sm"
              />
              <Button 
                onClick={handleSend} 
                size="sm"
                className="bg-[#0052D9] hover:bg-[#0041B3]"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
