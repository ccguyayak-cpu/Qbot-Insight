import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function BottomInput() {
  const [input, setInput] = useState('');

  const suggestions = [
    '帮我总结这篇文章的核心观点',
    '这个商品值得购买吗？',
    '对比一下这几款产品的优劣势'
  ];

  const handleSend = () => {
    if (input.trim()) {
      console.log('发送消息:', input);
      setInput('');
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      {/* 智能推荐气泡 */}
      <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setInput(suggestion)}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm text-gray-700 hover:border-[#0052D9] hover:shadow-sm transition-all whitespace-nowrap flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0052D9]" />
            {suggestion}
          </button>
        ))}
      </div>

      {/* 输入框 */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="向QBot提问任何问题..."
          className="flex-1 rounded-lg border-gray-300 focus:border-[#0052D9] focus:ring-[#0052D9]"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-[#0052D9] hover:bg-[#0041B3] px-6 rounded-lg"
        >
          <Send className="w-4 h-4 mr-1" />
          发送
        </Button>
      </div>
    </div>
  );
}
