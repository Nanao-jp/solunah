"use client";

import BaseModal from "@/components/ui/BaseModal";

interface RegularContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegularContractModal({
  isOpen,
  onClose,
}: RegularContractModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="【定期契約】"
      maxWidth="md"
    >
      <div className="space-y-4 text-slate-700 font-light">
        <p>ご契約内容により割引適用あり</p>
        <p className="text-sm text-slate-500">※詳細準備中※</p>
      </div>
    </BaseModal>
  );
}

