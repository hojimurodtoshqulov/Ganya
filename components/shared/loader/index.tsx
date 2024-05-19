import { FC } from "react";

const Loader: FC<{
  size?: number;
}> = ({ size = 16 }): JSX.Element => {
  return (
    <div
      className={`w-${size} h-${size} border-${size / 4} rounded-full animate-spin border-t-main-300`}
    ></div>
  );
};

export default Loader;
