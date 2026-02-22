import { useState } from 'react';
import { X, Award, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import type { SelectedPage } from '../App';

interface CompareContentProps {
  pages: SelectedPage[];
}

export function CompareContent({ pages }: CompareContentProps) {
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([
    'price', 'noise', 'battery', 'weight'
  ]);

  const dimensions = [
    { id: 'price', label: '价格' },
    { id: 'noise', label: '降噪等级' },
    { id: 'battery', label: '续航时间' },
    { id: 'weight', label: '重量' },
    { id: 'bluetooth', label: '蓝牙版本' },
    { id: 'codec', label: '音质编码' }
  ];

  // 模拟对比数据
  const compareData: Record<string, string[]> = {
    price: ['¥2,499', '¥2,299', '¥4,399'],
    noise: ['ANC Pro', 'ANC Premium', 'ANC'],
    battery: ['30小时', '24小时', '20小时'],
    weight: ['250g', '240g', '384g'],
    bluetooth: ['5.2', '5.1', '5.0'],
    codec: ['LDAC/AAC', 'AAC', 'AAC']
  };

  const highlights: Record<string, boolean[]> = {
    price: [false, true, false],
    noise: [true, false, false],
    battery: [true, false, false],
    weight: [false, true, false],
    bluetooth: [true, false, false],
    codec: [true, false, false]
  };

  const toggleDimension = (dimensionId: string) => {
    setSelectedDimensions(prev =>
      prev.includes(dimensionId)
        ? prev.filter(id => id !== dimensionId)
        : [...prev, dimensionId]
    );
  };

  return (
    <div className="p-4 space-y-4">
      {/* 对比商品列表 */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">
          对比商品 ({pages.length})
        </h3>
        <div className="space-y-2">
          {pages.map((page) => (
            <div
              key={page.id}
              className="relative bg-gray-50 rounded-lg p-2 border border-[#0052D9]"
            >
              <div className="pr-6">
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                  {page.type}
                </span>
                <p className="text-sm text-gray-900 mt-1 line-clamp-2">
                  {page.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 维度筛选 */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">对比维度</h3>
        <div className="space-y-2">
          {dimensions.map((dimension) => (
            <label
              key={dimension.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedDimensions.includes(dimension.id)}
                onCheckedChange={() => toggleDimension(dimension.id)}
              />
              <span className="text-sm text-gray-700">{dimension.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 对比表格 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-3 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">详细对比</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left font-semibold text-gray-900 text-xs">
                  对比项
                </th>
                {pages.slice(0, 3).map((page, index) => (
                  <th
                    key={page.id}
                    className="px-3 py-2 text-center font-semibold text-gray-900 text-xs"
                  >
                    商品{index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensions
                .filter((dim) => selectedDimensions.includes(dim.id))
                .map((dimension, rowIndex) => (
                  <tr
                    key={dimension.id}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-3 py-2 font-medium text-gray-900 text-xs">
                      {dimension.label}
                    </td>
                    {pages.slice(0, 3).map((page, colIndex) => (
                      <td
                        key={page.id}
                        className={`px-3 py-2 text-center text-xs ${
                          highlights[dimension.id]?.[colIndex]
                            ? 'bg-green-50 font-semibold text-green-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {compareData[dimension.id]?.[colIndex] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI决策建议 */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 shadow-md border-2 border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Award className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-green-700 uppercase">
                强烈推荐
              </span>
              <Badge className="bg-green-600 text-white text-xs px-1.5 py-0">AI推荐</Badge>
            </div>
            <h3 className="font-bold text-gray-900">索尼WH-1000XM5</h3>
          </div>
        </div>

        {/* 推荐理由 */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
            推荐理由
          </h4>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5 text-xs text-gray-700">
              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
              <span>业界顶尖的降噪性能</span>
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-700">
              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
              <span>30小时超长续航</span>
            </li>
            <li className="flex items-start gap-1.5 text-xs text-gray-700">
              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
              <span>LDAC高清音质支持</span>
            </li>
          </ul>
        </div>

        {/* 置信度 */}
        <div className="mb-3 bg-white rounded-lg p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-900">置信度</span>
            <span className="text-lg font-bold text-green-600">92%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              style={{ width: '92%' }}
            />
          </div>
        </div>

        {/* 适用人群 */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-green-600" />
            适用人群
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {['发烧友', '通勤族', '商务人士'].map((audience, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-white border border-green-300 rounded-full text-xs text-green-700"
              >
                {audience}
              </span>
            ))}
          </div>
        </div>

        {/* 注意事项 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
          <h4 className="text-xs font-semibold text-yellow-900 mb-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            注意事项
          </h4>
          <p className="text-xs text-yellow-800">
            • 极寒环境（-10°C以下）续航会下降约20%
          </p>
        </div>
      </div>
    </div>
  );
}
