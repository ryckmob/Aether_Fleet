// Toast.tsx
type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
};

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  const bgColor = type === 'success' ? 'bg-white' : 'bg-red-500';

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className={`flex justify-between items-center px-4 py-3 rounded-xl text-gray-900 shadow-lg ${bgColor}`}>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 bg-white text-gray-900 border border-gray-900 px-3 py-1 rounded hover:bg-gray-100"
        >
          OK
        </button>
      </div>
    </div>
  );
}