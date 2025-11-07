"use client";

interface RegularContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegularContractModal({
  isOpen,
  onClose,
}: RegularContractModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99997] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-light text-slate-900 mb-6">【定期契約】</h2>
        <div className="space-y-4 text-slate-700 font-light">
          <p>ご契約内容により割引適用あり</p>
          <p className="text-sm text-slate-500">※詳細準備中※</p>
        </div>
      </div>
    </div>
  );
}

