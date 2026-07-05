interface Props {
  size?: number;
  length?: number;
  color?: string;
}

export const Loading = ({ size, length, color }: Props) => (
  <div
    style={{
      width: size,
      height: size,
      borderWidth: length,
      backgroundColor: color,
    }}
    className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
  ></div>
);
