import React, { useRef, useState } from 'react'
import Card from './Card'
import { AddDocumentIcon, SearchDocumentIcon } from './Icons'
import AddDocumentModal from './AddDocumentModal';
import NotificationPopup from './NotificationPopup';
import { motion } from 'framer-motion'

const cardTemplates = [
  { close: false, tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green" } },
  { close: false, tag: { isOpen: true, tagTitle: "Download Now", tagColor: "blue" } },
  { close: false, tag: { isOpen: false, tagTitle: "Download Now", tagColor: "green" } }
];

function Foreground() {
  const ref = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([
    {id: 1, desc: "Onboarding guide for new pet owners", filesize: ".9mb", close: false, tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green"}},
    {id: 2, desc: "Service contract (valid till Dec 2025)", filesize: ".9mb", close: false, tag: { isOpen: true, tagTitle: "Download Now", tagColor: "blue"}},
    {id: 3, desc: "This is a test no. 3", filesize: ".9mb", close: false, tag: { isOpen: false, tagTitle: "Download Now", tagColor: "green"}},
  ]);
  const [notification, setNotification] = useState('');

  // Helper to format file size
  function formatSize(bytes) {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(1)} MB`;
  }

  // Add new document
  function handleAddDocument(file, desc) {
    if (file && desc) {
      // Log details to the terminal when both file and description are present
      console.log("New Document Added:", {
        description: desc,
        fileName: file.name,
        fileSize: formatSize(file.size),
      });

      // Pick a random template for file upload
      const randomTemplate = cardTemplates[Math.floor(Math.random() * cardTemplates.length)];
      setData(prev => [
        ...prev,
        {
          desc,
          id: Date.now(),
          filesize: formatSize(file.size),
          file,
          ...randomTemplate
        }
      ]);
    } else if (desc && !file) {
      // Log details to the terminal when only description is present
      console.log("New Description Added:", desc);

      // Only description, use default template (no file, isOpen: false)
      setData(prev => [
        ...prev,
        {
          desc,
          id: Date.now(),
          filesize: ".9mb",
          close: false,
          tag: { isOpen: false, tagTitle: "Download Now", tagColor: "green" }
        }
      ]);
    }
  }

  // Delete document
  function handleDelete(idToDelete) {
    setData(prevData => prevData.filter(item => item.id !== idToDelete));
    setNotification('File deleted successfully!');
    setTimeout(() => setNotification(''), 1500);
  }

  // Filter documents based on search term
  const filteredData = data.filter(item =>
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={ref} className='fixed top-0 left-0 z-[3] w-full h-full flex gap-6 flex-wrap p-4'>
      <div className="absolute top-6 right-6 flex flex-col gap-4 items-end">
        <motion.button
          whileHover={{ scale: 1.2, backgroundColor: "#27272a" }}
          className="rounded-full p-1"
          onClick={() => setShowAdd(true)}
          title="Add Document (Upload a file)"
        >
          <AddDocumentIcon size={52} className="text-zinc-500" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2, backgroundColor: "#27272a" }}
          className="rounded-full p-1"
          onClick={() => setShowSearch(true)}
          title="Search Documents"
        >
          <SearchDocumentIcon size={40} className="text-zinc-500" />
        </motion.button>
      </div>

      <AddDocumentModal show={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAddDocument} />

      {/* Search Modal */}
      {showSearch && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-zinc-900/70 rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
            <input
              type="text"
              placeholder="Search documents..."
              className="bg-transparent border-b border-zinc-400 text-white px-2 py-1 outline-none w-40"
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.08 }}
              className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => { setShowSearch(false); setSearchTerm(''); }}
            >
              Close
            </motion.button>
          </div>
        </div>
      )}

      {filteredData.map((item, index) => (
        <Card
          key={item.id}
          data={item}
          reference={ref}
          onDelete={() => handleDelete(item.id)}
        />
      ))}

      <NotificationPopup message={notification} />
    </div>
  )
}

export default Foreground