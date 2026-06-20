import { useState, useRef, useCallback } from 'react'
import {
  RiUploadCloud2Line,
  RiFileTextLine,
  RiDeleteBin6Line,
  RiCheckLine,
  RiErrorWarningLine,
  RiDragDropLine,
} from 'react-icons/ri'

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_SIZE_BYTES = 5 * 1024 * 1024   // 5 MB
const ACCEPTED_TYPES = ['application/pdf']
const ACCEPTED_EXT   = '.pdf'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBytes = (bytes) => {
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// ─── Upload States ────────────────────────────────────────────────────────────
// 'empty' | 'dragging' | 'uploading' | 'success' | 'error'

const FileUpload = ({ onFileReady }) => {
  const [uploadState, setUploadState] = useState('empty')
  const [file, setFile]               = useState(null)
  const [progress, setProgress]       = useState(0)
  const [errorMsg, setErrorMsg]       = useState('')
  const inputRef                      = useRef(null)
  const timerRef                      = useRef(null)

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (f) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return 'Only PDF files are accepted.'
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File is too large. Maximum size is 5 MB (your file: ${formatBytes(f.size)}).`
    }
    return null
  }

  // ── Mock progress simulation ────────────────────────────────────────────────
  const simulateUpload = useCallback((f) => {
    setFile(f)
    setProgress(0)
    setUploadState('uploading')

    let pct = 0
    timerRef.current = setInterval(() => {
      // Simulate uneven chunked upload
      const increment = Math.random() * 18 + 4
      pct = Math.min(pct + increment, 100)
      setProgress(Math.floor(pct))

      if (pct >= 100) {
        clearInterval(timerRef.current)
        setProgress(100)
        setUploadState('success')
        if (onFileReady) onFileReady(f)
      }
    }, 250)
  }, [onFileReady])

  // ── Process a dropped / selected file ──────────────────────────────────────
  const processFile = useCallback((f) => {
    const err = validate(f)
    if (err) {
      setFile(f)
      setErrorMsg(err)
      setUploadState('error')
      return
    }
    simulateUpload(f)
  }, [simulateUpload])

  // ── Drag handlers ───────────────────────────────────────────────────────────
  const onDragOver = (e) => {
    e.preventDefault()
    if (uploadState !== 'uploading') setUploadState('dragging')
  }
  const onDragLeave = (e) => {
    e.preventDefault()
    if (uploadState === 'dragging') setUploadState('empty')
  }
  const onDrop = (e) => {
    e.preventDefault()
    if (uploadState === 'uploading') return
    const dropped = e.dataTransfer.files[0]
    if (dropped) processFile(dropped)
  }

  // ── Input change ────────────────────────────────────────────────────────────
  const onInputChange = (e) => {
    const selected = e.target.files[0]
    if (selected) processFile(selected)
    // Reset so the same file can be re-selected after delete
    e.target.value = ''
  }

  // ── Delete / reset ──────────────────────────────────────────────────────────
  const handleDelete = () => {
    clearInterval(timerRef.current)
    setFile(null)
    setProgress(0)
    setErrorMsg('')
    setUploadState('empty')
  }

  // ── Click on drop zone ──────────────────────────────────────────────────────
  const handleZoneClick = () => {
    if (uploadState !== 'uploading' && uploadState !== 'success') {
      inputRef.current?.click()
    }
  }

  // ═══════════════════════════════════════════════════════
  //  Render helpers
  // ═══════════════════════════════════════════════════════

  // ── Empty & Dragging state ──────────────────────────────────────────────────
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center select-none">
      <div className={`
        w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300
        ${uploadState === 'dragging'
          ? 'bg-indigo-500/25 scale-110'
          : 'bg-indigo-500/10 group-hover:bg-indigo-500/20'}
      `}>
        {uploadState === 'dragging'
          ? <RiDragDropLine  size={38} className="text-indigo-400 animate-bounce" />
          : <RiUploadCloud2Line size={38} className="text-indigo-400" />
        }
      </div>

      {uploadState === 'dragging' ? (
        <>
          <p className="text-lg font-semibold text-indigo-300 mb-1">Drop it here!</p>
          <p className="text-sm text-indigo-400/70">Release to start uploading</p>
        </>
      ) : (
        <>
          <p className="text-base font-semibold text-gray-200 mb-1">
            Drag &amp; drop your resume here
          </p>
          <p className="text-sm text-gray-500 mb-5">
            PDF only &mdash; maximum 5 MB
          </p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-gray-200 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <RiFileTextLine size={16} />
            Browse Files
          </button>
        </>
      )}
    </div>
  )

  // ── Uploading state ─────────────────────────────────────────────────────────
  const UploadingState = () => (
    <div className="py-10 px-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
          <RiFileTextLine size={22} className="text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-200 truncate">{file?.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{formatBytes(file?.size ?? 0)}</p>
        </div>
        <span className="text-sm font-bold text-indigo-400 tabular-nums flex-shrink-0">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-gray-800 rounded-md overflow-hidden">
        <div
          className="h-full rounded-md bg-indigo-600"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">Uploading… please wait</p>
    </div>
  )

  // ── Success state ───────────────────────────────────────────────────────────
  const SuccessState = () => (
    <div className="py-8 px-6">
      {/* File preview card */}
      <div className="flex items-center gap-4 bg-gray-800/60 border border-gray-700 rounded-2xl px-5 py-4 mb-6 group">
        {/* PDF icon */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-16 bg-gray-900 border border-gray-700 rounded-xl flex flex-col items-center justify-center shadow-md">
            <div className="w-full bg-red-500/80 rounded-t-xl py-1 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white tracking-widest">PDF</span>
            </div>
            <RiFileTextLine size={22} className="text-gray-400 mt-2" />
          </div>
          {/* Success badge */}
          <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center">
            <RiCheckLine size={11} className="text-white" />
          </span>
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-100 truncate">{file?.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{formatBytes(file?.size ?? 0)}</p>
          <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full">
            <RiCheckLine size={11} />
            Upload complete
          </span>
        </div>

        {/* Delete */}
        <button
          type="button"
          onClick={handleDelete}
          title="Remove file"
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-700/60 hover:bg-red-500/20 hover:text-red-400 text-gray-500 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <RiDeleteBin6Line size={16} />
        </button>
      </div>

      {/* Full progress bar – complete */}
      <div className="w-full h-2 bg-gray-800 rounded-md overflow-hidden">
        <div className="h-full w-full rounded-md bg-green-500" />
      </div>
      <p className="text-xs text-green-400/80 text-center mt-2 font-medium">Ready to analyze</p>
    </div>
  )

  // ── Error state ─────────────────────────────────────────────────────────────
  const ErrorState = () => (
    <div className="py-10 px-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
        <RiErrorWarningLine size={32} className="text-red-400" />
      </div>
      <p className="text-base font-semibold text-gray-200 mb-1">Upload failed</p>
      <p className="text-sm text-red-400 mb-1">{file?.name}</p>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{errorMsg}</p>
      <button
        type="button"
        onClick={handleDelete}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Try again
      </button>
    </div>
  )

  // ═══════════════════════════════════════════════════════
  //  Main render
  // ═══════════════════════════════════════════════════════
  const isDragging   = uploadState === 'dragging'
  const isUploading  = uploadState === 'uploading'
  const isSuccess    = uploadState === 'success'
  const isError      = uploadState === 'error'
  const isInteractive = !isUploading && !isSuccess

  return (
    <div className="w-full">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXT}
        className="hidden"
        onChange={onInputChange}
      />

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-label="File upload area"
        onClick={isInteractive ? handleZoneClick : undefined}
        onKeyDown={(e) => e.key === 'Enter' && isInteractive && handleZoneClick()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          group relative w-full rounded-2xl border-2 transition-all duration-300 outline-none
          focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
          ${isInteractive ? 'cursor-pointer' : 'cursor-default'}
          ${isDragging  ? 'border-indigo-400 bg-indigo-500/8 shadow-lg shadow-indigo-500/10' : ''}
          ${isUploading ? 'border-indigo-500/40 bg-gray-800/30' : ''}
          ${isSuccess   ? 'border-green-500/40 bg-green-500/5' : ''}
          ${isError     ? 'border-red-500/40 bg-red-500/5' : ''}
          ${!isDragging && !isUploading && !isSuccess && !isError
              ? 'border-gray-700 bg-gray-800/20 hover:border-indigo-500/50 hover:bg-indigo-500/5'
              : ''}
        `}
      >
        {uploadState === 'empty'     && <EmptyState />}
        {uploadState === 'dragging'  && <EmptyState />}
        {uploadState === 'uploading' && <UploadingState />}
        {uploadState === 'success'   && <SuccessState />}
        {uploadState === 'error'     && <ErrorState />}
      </div>
    </div>
  )
}

export default FileUpload
