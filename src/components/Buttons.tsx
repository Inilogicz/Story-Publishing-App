export default function Button({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return (
      <button 
        onClick={onClick} 
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
        {children}
      </button>
    );
  }
  