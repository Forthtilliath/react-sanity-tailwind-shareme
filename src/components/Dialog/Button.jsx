export default function Button({ children, onClick = {}, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`focus:outline-none focus:border-none hover:bg-gray-400 hover:bg-opacity-25 p-2 rounded-full inline-flex items-center ${className}`}>
      {children}
    </button>
  );
}
