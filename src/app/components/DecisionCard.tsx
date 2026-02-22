import { Award, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';

export function DecisionCard() {
  const recommendation = {
    product: '索尼WH-1000XM5',
    confidence: 92,
    reasons: [
      '业界顶尖的降噪性能，适合通勤和办公场景',
      '30小时超长续航，无需频繁充电',
      'LDAC高清音质支持,适合发烧友'
    ],
    targetAudience: ['发烧友', '通勤族', '商务人士'],
    warnings: ['极寒环境（-10°C以下）续航会下降约20%']
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-md border-2 border-green-200">
      {/* 推荐标识 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
              强烈推荐
            </span>
            <Badge className="bg-green-600 text-white">AI推荐</Badge>
          </div>
          <h3 className="font-bold text-gray-900 text-lg">{recommendation.product}</h3>
        </div>
      </div>

      {/* 推荐理由 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-green-600" />
          推荐理由
        </h4>
        <ul className="space-y-2">
          {recommendation.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 置信度仪表盘 */}
      <div className="mb-4 bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">置信度</span>
          <span className="text-2xl font-bold text-green-600">{recommendation.confidence}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
            style={{ width: `${recommendation.confidence}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          基于降噪、续航、音质等{' '}
          <span className="font-semibold">8个关键维度</span>综合分析
        </p>
      </div>

      {/* 适用人群 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
          <Users className="w-4 h-4 text-green-600" />
          适用人群
        </h4>
        <div className="flex flex-wrap gap-2">
          {recommendation.targetAudience.map((audience, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white border border-green-300 rounded-full text-sm text-green-700"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>

      {/* 注意事项 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          注意事项
        </h4>
        <ul className="space-y-1">
          {recommendation.warnings.map((warning, index) => (
            <li key={index} className="text-sm text-yellow-800">
              • {warning}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
