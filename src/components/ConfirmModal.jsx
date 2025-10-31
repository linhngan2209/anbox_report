
import React from 'react'

export default function ConfirmModal({open, title='Confirm', message, onConfirm, onCancel}){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 border rounded">Hủy</button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">Xác nhận</button>
        </div>
      </div>
    </div>
  )
}
