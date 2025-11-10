"use client";

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborationModal({
  isOpen,
  onClose,
}: CollaborationModalProps) {
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
        <h2 className="text-2xl font-light text-slate-900 mb-6">【コラボについて】</h2>
        <div className="space-y-4 text-slate-700 font-light">
          <p>
            カメラマンオプションをご利用いただく際に、コラボタイプを選択いただけます。
          </p>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">顔出し有りコラボ</h3>
              <p className="text-sm text-slate-600">
                写真にご本人様が写るコラボです。基本料金（¥8,800/時間）から25%の割引が適用されます。
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 mb-2">顔出し無しコラボ</h3>
              <p className="text-sm text-slate-600">
                写真にご本人様が写らないコラボです。基本料金（¥8,800/時間）から10%の割引が適用されます。
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 mb-2">コラボ無し</h3>
              <p className="text-sm text-slate-600">
                コラボを希望されない場合です。割引は適用されません。
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <p className="text-sm text-slate-600">
              ※コラボが適用されている時間は長時間パック割引の対象外となります。
            </p>
            <p className="text-sm text-slate-500">
              ※割引額はプランや利用時間によって異なります。詳細は料金シミュレーターでご確認ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

