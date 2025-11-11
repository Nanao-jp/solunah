"use client";

import BaseModal from "@/components/ui/BaseModal";

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborationModal({
  isOpen,
  onClose,
}: CollaborationModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="【コラボについて】"
      maxWidth="md"
    >
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
    </BaseModal>
  );
}

