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
      title="カメラマンオプションについて"
      maxWidth="md"
    >
      <div className="space-y-4 text-slate-700 font-light">
          <p>
            オプション利用される方限定で、弊社のHPやSNSでお写真提供していただける方に特別な割引をご用意させていただいております
          </p>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">お写真顔出しあり</h3>
              <p className="text-sm text-slate-600">
                写真提供に顔出しOKの際に使用できるオプションです。基本料金（¥8,800/時間）から25%の割引が適用されます。
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 mb-2">お写真顔出しなし</h3>
              <p className="text-sm text-slate-600">
                お写真提供に顔出しNG（お顔は見えないように編集）の際に使用できるオプションです。基本料金（¥8,800/時間）から10%の割引が適用されます。
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-slate-900 mb-2">写真提供NG</h3>
              <p className="text-sm text-slate-600">
                写真提供が難しい時は割引は適用されません
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <p className="text-sm text-slate-600">
              ※カメラオプション割引が適用されている時間帯は長時間割引と併用ができません。
            </p>
            <p className="text-sm text-slate-600">
              ※ご契約時間が3時間以上であれば、カメラマンオプションを引いた残りの時間も長時間パック対象となります。
            </p>
            <p className="text-sm text-slate-500">
              ※割引額はプランや利用時間によって異なります。詳細は料金シミュレーターでご確認ください。
            </p>
          </div>
        </div>
    </BaseModal>
  );
}

