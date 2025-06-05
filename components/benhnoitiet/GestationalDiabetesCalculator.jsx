'use client'; // Đánh dấu đây là Client Component trong Next.js

import { useState, useEffect } from 'react';

export default function GestationalDiabetesCalculator() {
  const [fasting, setFasting] = useState('');
  const [oneHour, setOneHour] = useState('');
  const [twoHour, setTwoHour] = useState('');
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState('mmol/L'); // Default unit for calculator
  const [convertValue, setConvertValue] = useState('');
  const [convertUnit, setConvertUnit] = useState('mmol/L'); // Default unit for conversion form
  const [convertedResult, setConvertedResult] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  // Conversion factors
  const toMgDL = (mmol) => Math.round(mmol * 18);
  const toMmolL = (mgdl) => (mgdl / 18).toFixed(1);

  // Handle toast display for errors only
  const showToast = (message) => {
    setToast({ message, type: 'error', visible: true });
  };

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle conversion
  const handleConversion = (value, unit) => {
    if (!value) {
      setConvertedResult('');
      return;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      setConvertedResult('');
      showToast('Vui lòng nhập giá trị hợp lệ (số không âm)!');
      return;
    }
    const result = unit === 'mmol/L' ? toMgDL(numValue) : toMmolL(numValue);
    setConvertedResult(`${result} ${unit === 'mmol/L' ? 'mg/dL' : 'mmol/L'}`);
  };

  // Reset conversion form
  const handleConvertReset = () => {
    setConvertValue('');
    setConvertedResult('');
  };

  const checkGestationalDiabetes = () => {
    if (!fasting && !oneHour && !twoHour) {
      showToast('Vui lòng nhập ít nhất một giá trị đường huyết!');
      return;
    }

    const fastingValue = parseFloat(fasting);
    const oneHourValue = parseFloat(oneHour);
    const twoHourValue = parseFloat(twoHour);

    if (
      (fasting && (isNaN(fastingValue) || fastingValue < 0)) ||
      (oneHour && (isNaN(oneHourValue) || oneHourValue < 0)) ||
      (twoHour && (isNaN(twoHourValue) || twoHourValue < 0))
    ) {
      showToast('Vui lòng nhập giá trị hợp lệ (số không âm)!');
      return;
    }

    // Convert to mmol/L if input is in mg/dL
    const fastingMmol = unit === 'mg/dL' ? toMmolL(fastingValue) : fastingValue;
    const oneHourMmol = unit === 'mg/dL' ? toMmolL(oneHourValue) : oneHourValue;
    const twoHourMmol = unit === 'mg/dL' ? toMmolL(twoHourValue) : twoHourValue;

    let hasGestationalDiabetes = false;
    if (fastingMmol >= 5.1 || oneHourMmol >= 10.0 || twoHourMmol >= 8.5) {
      hasGestationalDiabetes = true;
    }

    setResult({
      hasGestationalDiabetes,
      unit,
      fasting: fastingValue || 0,
      oneHour: oneHourValue || 0,
      twoHour: twoHourValue || 0,
      targets: [
        { label: 'Lúc đói', value: unit === 'mmol/L' ? '≤ 5.1 mmol/L' : '≤ 92 mg/dL' },
        { label: 'Sau ăn 1 giờ', value: unit === 'mmol/L' ? '≤ 10.0 mmol/L' : '≤ 180 mg/dL' },
        { label: 'Sau ăn 2 giờ', value: unit === 'mmol/L' ? '≤ 8.5 mmol/L' : '≤ 153 mg/dL' },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkGestationalDiabetes();
  };

  const handleReset = () => {
    setFasting('');
    setOneHour('');
    setTwoHour('');
    setResult(null);
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
            <p className="mt-6 text-sm text-gray-500">
              * Chỉ cần 1 trong 3 giá trị vượt ngưỡng là được chẩn đoán tiểu đường thai kỳ (theo Bộ Y tế Việt Nam, 2020).
            </p>
            {/* Conversion Form */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quy đổi đơn vị đường huyết</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="convert-value" className="block text-sm font-medium text-gray-600">
                      Giá trị đường huyết
                    </label>
                    <input
                      id="convert-value"
                      type="number"
                      step="0.1"
                      value={convertValue}
                      onChange={(e) => {
                        setConvertValue(e.target.value);
                        handleConversion(e.target.value, convertUnit);
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800"
                      placeholder="Nhập giá trị"
                      aria-describedby="convert-value-desc"
                    />
                    <p id="convert-value-desc" className="text-xs text-gray-500 mt-1">
                      Nhập giá trị đường huyết để quy đổi.
                    </p>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="convert-unit" className="block text-sm font-medium text-gray-600">
                      Đơn vị
                    </label>
                    <select
                      id="convert-unit"
                      value={convertUnit}
                      onChange={(e) => {
                        setConvertUnit(e.target.value);
                        handleConversion(convertValue, e.target.value);
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800"
                      aria-describedby="convert-unit-desc"
                    >
                      <option value="mmol/L">mmol/L</option>
                      <option value="mg/dL">mg/dL</option>
                    </select>
                    <p id="convert-unit-desc" className="text-xs text-gray-500 mt-1">
                      Chọn đơn vị của giá trị nhập.
                    </p>
                  </div>
                </div>
                {convertedResult && (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Kết quả quy đổi: <span className="font-semibold">{convertedResult}</span>
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleConvertReset}
                  className="w-full rounded-md bg-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-400 transition-all"
                >
                  XÓA QUY ĐỔI
                </button>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-white p-6 rounded-md shadow-sm flex flex-col relative">
            <h2 id="calculator-title" className="text-2xl font-bold text-gray-800 mb-3xl">
              Kiểm tra tiểu đường thai kỳ
            </h2>
            <p className="text-sm font-medium text-gray-600 mb-6">
              Nhập các giá trị đường huyết ({unit}) để kiểm tra nguy cơ tiểu đường thai kỳ. Kết quả chỉ mang tính tham khảo.
            </p>
            <div className="mb-4">
              <label htmlFor="unit-select" className="block text-sm font-medium text-gray-600 mb-2">
                Đơn vị
              </label>
              <select id="unit-select"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  setFasting('');
                  setOneHour('');
                  setTwoHour('');
                  setResult(null);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800"
                aria-describedby="unit-desc"
              >
                <option value="mmol/L">mmol/L</option>
                <option value="mg/dL">mg/dL</option>
              </select>
              <p id="unit-desc" className="text-xs text-gray-500 mt-1">
                Chọn đơn vị đo đường huyết.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 flex-1" aria-labelledby="calculator-title">
              <div>
                <label htmlFor="fasting" className="block text-sm font-medium text-gray-700">
                  Đường huyết lúc đói ({unit})
                </label>
                <input id="fasting"
                  type="number"
                  step="0.1"
                  value={fasting}
                  onChange={(e) => setFasting(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 rounded-md p-2.5 text-sm"
                  placeholder={unit === 'mmol/L' ? 'Ví dụ: 5.1' : 'Ví dụ: 92'}
                    aria-describedby="fasting-desc"
                />
                <p id="fasting-desc" className="text-xs text-gray-500 mt-1">
                  Nhập giá trị đường huyết lúc đói ({unit}).
                </p>
              </div>
              <div>
                <label htmlFor="oneHour" className="block text-sm font-medium text-gray-700">
                  Đường huyết sau 1 giờ ({unit})
                </label>
                <input
                  id="oneHour"
                  type="number"
                  step="0.1"
                  value={oneHour}
                  onChange={(e) => setOneHour(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 rounded-md p-2.5 text-sm"
                  placeholder={unit === 'mmol/L' ? 'Ví dụ: 10.0' : 'Ví dụ: 180'}
                  aria-describedby="oneHour-desc"
                />
                <p id="oneHour-desc" className="text-xs text-gray-500 mt-1">
                  Nhập giá trị đường huyết sau 1 giờ ({unit}).
                </p>
              </div>
              <div>
                <label htmlFor="twoHour" className="block text-sm font-medium text-gray-700">
                  Đường huyết sau 2 giờ ({unit})
                </label>
                <input
                  id="twoHour"
                  type="number"
                  step="0.1"
                  value={twoHour}
                  onChange={(e) => setTwoHour(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 rounded-md p-2.5 text-sm"
                  placeholder={unit === 'mmol/L' ? 'Ví dụ: 8.5' : 'Ví dụ: 153'}
                  aria-describedby="twoHour-desc"
                />
                <p id="twoHour-desc" className="text-xs text-gray-500 mt-1">
                  Nhập giá trị đường huyết sau 2 giờ ({unit}).
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all"
                >
                  KIỂM TRA +
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition-all"
                >
                  XÓA DỮ LIỆU
                </button>
              </div>
            </form>

            {/* Result */}
            {result && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800">Kết quả tham khảo:</h3>
                <p className="text-sm text-gray-600">
                  Dựa trên giá trị bạn nhập (
                  {result.unit === 'mmol/L'
                    ? `Lúc đói: ${result.fasting} mmol/L, Sau 1 giờ: ${result.oneHour} mmol/L, Sau 2 giờ: ${result.twoHour} mmol/L`
                    : `Lúc đói: ${result.fasting} mg/dL, Sau 1 giờ: ${result.oneHour} mg/dL, Sau 2 giờ: ${result.twoHour} mg/dL`}
                  ), bạn{' '}
                  {result.hasGestationalDiabetes ? (
                    <strong className="text-red-600">bị tiểu đường thai kỳ</strong>
                  ) : (
                    <strong className="text-green-600">không có dấu hiệu tiểu đường thai kỳ</strong>
                  )}
                  . Vui lòng tham khảo ý kiến bác sĩ để được chẩn đoán và điều trị chính xác.
                </p>
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
            <div
              className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              title="Thông tin tham khảo, vui lòng tư vấn bác sĩ"
              role="img"
              aria-label="Biểu tượng thông tin"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
            </div>

            {/* Toast Notification */}
            {toast.visible && (
              <div
                className="fixed top-4 right-4 p-4 z-50 rounded-lg shadow-lg text-white bg-red-600 transition-opacity duration-300"
                role="alert"
                aria-live="assertive"
              >
                {toast.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}