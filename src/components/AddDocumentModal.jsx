import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function formatSize(bytes) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb < 1 ? `${(bytes / 1024).toFixed(2)} KB` : `${mb.toFixed(2)} MB`;
}

function AddDocumentModal({ show, onClose, onAdd }) {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!show) {
      setFile(null);
      setDesc('');
    }
  }, [show]);

  if (!show) return null;

  const handleSave = () => {
    onAdd(file, desc);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-zinc-900/90 rounded-xl p-6 shadow-lg flex flex-col gap-4 min-w-[300px]">
        <h2 className="text-lg font-semibold text-white">Add New Document</h2>
        <input
          type="file"
          className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-700 file:text-zinc-100 hover:file:bg-zinc-600"
          onChange={e => setFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Write a description..."
          className="bg-transparent border-b border-zinc-400 text-white px-2 py-1 outline-none"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        {file && <div className="text-zinc-200 text-sm">File size: {formatSize(file.size)}</div>}
        <div className="flex gap-2 mt-2 justify-end">
          <motion.button whileHover={{ scale: 1.08 }} className="px-3 py-1 bg-zinc-600 text-white rounded hover:bg-zinc-700 transition" onClick={onClose}>
            Cancel
          </motion.button>
          <motion.button whileHover={{ scale: 1.08 }} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={handleSave} disabled={!desc}>
            Save
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default AddDocumentModal;