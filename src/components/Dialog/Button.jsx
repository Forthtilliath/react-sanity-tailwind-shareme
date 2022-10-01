export default function Button({ children, onClick = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center p-2 rounded-full shadow-md outline-none hocus:bg-red-500 hocus:text-white">
      {children}
    </button>
  );
}
