export default function UploadButton({ onUploadClick }) {
  return (
    <button
      onClick={onUploadClick}
      className="group inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white font-normal py-5 px-10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden"
    >
      <span className="text-sm uppercase tracking-[0.2em] relative z-10">Upload</span>
      <div className="w-10 h-px bg-white transition-all duration-300 group-hover:w-12 relative z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
    </button>
  );
}