import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { LuDownload } from "react-icons/lu"
import { IoClose } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { motion } from 'framer-motion'

function Card({ data, reference, onDelete }) {
  // Download handler
  const handleDownload = () => {
    if (!data.file) return;
    const url = URL.createObjectURL(data.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.desc || 'document'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div drag dragConstraints={reference} dragElastic={.1} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileDrag dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }} className='relative flex-shrink-0 w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-5 py-10 overflow-hidden'>
      <FaRegFileAlt />
      <p className='text-sm leading-tight mt-5 font-semibold'>{data.desc}</p>
      <div className='footer absolute bottom-0 w-full left-0'>
        <div className='flex items-center justify-between px-8 py-3 mb-3'>
          <h5>{data.filesize}</h5>
          <span className='flex gap-2'>
            <motion.span
              whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9 }} whileDrag
              className='w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer'
              onClick={handleDownload}
              title={`Download (${data.filesize})`}
            >
              {data.close ? <IoClose /> : <LuDownload size=".7em" color='#fff' />}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.2, backgroundColor: "#27272a" }}
              className='w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer'
              onClick={onDelete}
              title="Delete"
            >
              <MdDelete size="1em" className="text-zinc-500" />
            </motion.span>
          </span>
        </div>
        {data.tag.isOpen && (
          <div
            className={`tag w-full py-5 ${data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"} flex items-center justify-center cursor-pointer hover:opacity-90 transition`}
            onClick={handleDownload}
            title="Download Now"
          >
            <h3 className='text-sm font-semibold'>{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Card