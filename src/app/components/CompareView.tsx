import { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { DecisionCard } from './DecisionCard';

export function CompareView() {
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([
    'price', 'noise', 'battery', 'weight'
  ]);

  const products = [
    { id: '1', name: '索尼WH-1000XM5', image: '🎧' },
    { id: '2', name: 'Bose QC45', image: '🎧' },
    { id: '3', name: 'AirPods Max', image: '🎧' }
  ];

  const dimensions = [
    { id: 'price', label: '价格' },
    { id: 'noise', label: '降噪等级' },
    { id: 'battery', label: '续航时间' },
    { id: 'weight', label: '重量' },
    { id: 'bluetooth', label: '蓝牙版本' },
    { id: 'codec', label: '音质编码' }
  ];

  const compareData = {
    price: ['¥2,499', '¥2,299', '¥4,399'],
    noise: ['ANC Pro', 'ANC Premium', 'ANC'],
    battery: ['30小时', '24小时', '20小时'],
    weight: ['250g', '240g', '384g'],
    bluetooth: ['5.2', '5.1', '5.0'],
    codec: ['LDAC/AAC', 'AAC', 'AAC']
  };

  const highlights = {
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
    <div className="space-y-4">
      {/* 已选择商品 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">对比商品</h3>
          <span className="text-sm text-gray-600">{products.length} 个商品</span>
        </div>
        <div className="flex gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-1 relative bg-gray-50 rounded-lg p-3 border-2 border-[#0052D9]"
            >
              <button className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center">
                <X className="w-3 h-3" />
              </button>
              <div className="text-3xl text-center mb-2">{product.image}</div>
              <p className="text-xs text-center text-gray-700">{product.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 维度筛选 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">对比维度</h3>
        <div className="flex flex-wrap gap-3">
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
        <div className="p-4 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">详细对比</h3>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4 mr-1" />
            全屏查看
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50">
                  对比项
                </th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    className="px-4 py-3 text-center text-sm font-semibold text-gray-900"
                  >
                    {product.name}
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
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-inherit">
                      {dimension.label}
                    </td>
                    {products.map((product, colIndex) => (
                      <td
                        key={product.id}
                        className={`px-4 py-3 text-sm text-center ${
                          highlights[dimension.id as keyof typeof highlights]?.[colIndex]
                            ? 'bg-green-50 font-semibold text-green-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {compareData[dimension.id as keyof typeof compareData]?.[colIndex]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 决策建议 */}
      <DecisionCard />
    </div>
  );
}
