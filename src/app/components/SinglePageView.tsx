import { useState } from 'react';
import { L1Card } from './L1Card';
import { L2DetailView } from './L2DetailView';

export function SinglePageView() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const mockPages = [
    {
      id: '1',
      type: '商品评测',
      summary: '索尼WH-1000XM5是一款旗舰级降噪耳机，降噪性能提升20%，续航达30小时',
      keywords: ['降噪', '长续航', '音质优秀'],
      readTime: 5,
      relevance: 92,
      content: {
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
      }
    },
    {
      id: '2',
      type: '技术文章',
      summary: 'React 19新特性深度解析：服务端组件、并发渲染和自动批处理优化',
      keywords: ['React 19', '服务端组件', '性能优化'],
      readTime: 8,
      relevance: 85,
      content: {
        corePoints: [
          'Server Components实现零客户端JavaScript',
          '并发渲染提升交互响应速度',
          '自动批处理减少不必要的重渲染',
          'Suspense边界优化加载体验'
        ],
        params: [
          { label: '发布时间', value: '2024年12月', highlight: false },
          { label: '兼容性', value: 'Node 18+', highlight: false },
          { label: '性能提升', value: '+35%', highlight: true },
          { label: '打包体积', value: '-20%', highlight: true }
        ]
      }
    },
    {
      id: '3',
      type: '新闻资讯',
      summary: 'OpenAI发布GPT-5预览版，推理能力提升40%，支持多模态实时交互',
      keywords: ['GPT-5', '多模态', 'AI突破'],
      readTime: 3,
      relevance: 78,
      content: {
        corePoints: [
          '推理能力大幅提升，复杂问题解决准确率达95%',
          '支持图像、语音、视频多模态实时交互',
          '上下文窗口扩展至100万tokens',
          '响应速度提升60%，延迟降低至50ms'
        ],
        params: [
          { label: '发布日期', value: '2025年1月', highlight: false },
          { label: '模型参数', value: '1.8T', highlight: true },
          { label: '推理速度', value: '50ms', highlight: true },
          { label: '上下文长度', value: '100万', highlight: true }
        ]
      }
    }
  ];

  return (
    <div className="space-y-4">
      {mockPages.map((page) => (
        <div key={page.id}>
          {expandedCard === page.id ? (
            <L2DetailView
              page={page}
              onCollapse={() => setExpandedCard(null)}
            />
          ) : (
            <L1Card
              page={page}
              onExpand={() => setExpandedCard(page.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
