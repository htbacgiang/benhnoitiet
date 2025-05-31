'use client'; // Đánh dấu đây là Client Component trong Next.js

import { useState } from 'react';

export default function GestationalDiabetesCalculator() {
  const [fasting, setFasting] = useState('');
  const [oneHour, setOneHour] = useState('');
  const [twoHour, setTwoHour] = useState('');
  const [result, setResult] = useState(null);

  const checkGestationalDiabetes = () => {
    if (!fasting && !oneHour && !twoHour) {
      alert('Vui lòng nhập ít nhất một giá trị đường huyết!');
      return;
    }

    const fastingValue = parseFloat(fasting) || 0;
    const oneHourValue = parseFloat(oneHour) || 0;
    const twoHourValue = parseFloat(twoHour) || 0;

    let diagnosis = '';
    let hasGestationalDiabetes = false;

    if (fastingValue >= 5.1 || oneHourValue >= 10.0 || twoHourValue >= 8.5) {
      hasGestationalDiabetes = true;
      diagnosis = 'Dựa trên giá trị bạn nhập, có khả năng bạn bị <strong>tiểu đường thai kỳ</strong>. Vui lòng tham khảo ý kiến bác sĩ để được chẩn đoán và điều trị chính xác.';
    } else {
      diagnosis = 'Dựa trên giá trị bạn nhập, bạn <strong>không có dấu hiệu tiểu đường thai kỳ</strong>. Tuy nhiên, hãy tiếp tục theo dõi và tham khảo ý kiến bác sĩ.';
    }

    setResult({
      diagnosis,
      targets: [
        { label: 'Lúc đói', value: '≤ 5.3 mmol/L' },
        { label: 'Sau ăn 1 giờ', value: '≤ 7.8 mmol/L' },
        { label: 'Sau ăn 2 giờ', value: '≤ 6.7 mmol/L' },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkGestationalDiabetes();
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Reference Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ngưỡng chẩn đoán tiểu đường thai kỳ</h2>
            <div className="space-y-4">
              <div className="flex items-center bg-blue-100 p-4 rounded-lg">
                <span className="w-1/3 text-gray-700 font-medium">Lúc đói</span>
                <span className="w-2/3 text-blue-600 font-semibold">≥ 5.1 mmol/L (≥ 92 mg/dL)</span>
              </div>
              <div className="flex items-center bg-blue-100 p-4 rounded-lg">
                <span className="w-1/3 text-gray-700 font-medium">Sau 1 giờ</span>
                <span className="w-2/3 text-blue-600 font-semibold">≥ 10.0 mmol/L (≥ 180 mg/dL)</span>
              </div>
              <div className="flex items-center bg-blue-100 p-4 rounded-lg">
                <span className="w-1/3 text-gray-700 font-medium">Sau 2 giờ</span>
                <span className="w-2/3 text-blue-600 font-semibold">≥ 8.5 mmol/L (≥ 153 mg/dL)</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 flex-1">
              * Chỉ cần 1 trong 3 giá trị vượt ngưỡng là được chẩn đoán tiểu đường thai kỳ (theo Bộ Y tế Việt Nam, 2020).
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kiểm tra tiểu đường thai kỳ</h2>
            <p className="text-sm text-gray-600 mb-6">
              Nhập các giá trị đường huyết (mmol/L) để kiểm tra nguy cơ tiểu đường thai kỳ. Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-600">Đường huyết lúc đói (mmol/L)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fasting}
                  onChange={(e) => setFasting(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800"
                  placeholder="Ví dụ: 5.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Đường huyết sau 1 giờ (mmol/L)</label>
                <input
                  type="number"
                  step="0.1"
                  value={oneHour}
                  onChange={(e) => setOneHour(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800"
                  placeholder="Ví dụ: 10.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Đường huyết sau 2 giờ (mmol/L)</label>
                <input
                  type="number"
                  step="0.1"
                  value={twoHour}
                  onChange={(e) => setTwoHour(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800"
                  placeholder="Ví dụ: 8.5"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all mt-6"
              >
                KIỂM TRA +
              </button>
            </form>

            {/* Result */}
            {result && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800">Kết quả tham khảo:</h3>
                <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: result.diagnosis }} />
                <h4 className="text-sm font-semibold text-gray-800 mt-4">Mục tiêu kiểm soát đường huyết:</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {result.targets.map((target, index) => (
                    <li key={index}>
                      {target.label}: <span className="font-semibold">{target.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red Circular Icon */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
