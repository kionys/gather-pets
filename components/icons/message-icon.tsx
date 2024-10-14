export const MessageIcon = ({ isActive }: { isActive?: boolean }) => {
  return (
    <div className="relative">
      <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M28.5417 2H5.79167C3.69759 2 2 3.69759 2 5.79167V20.9583C2 23.0524 3.69759 24.75 5.79167 24.75H28.5417C30.6357 24.75 32.3333 23.0524 32.3333 20.9583V5.79167C32.3333 3.69759 30.6357 2 28.5417 2Z"
          stroke="#252525"
          stroke-width="2.4"
        />
        <path
          d="M2 7.6875L15.4718 14.4234C15.9981 14.6864 16.5783 14.8233 17.1667 14.8233C17.755 14.8233 18.3353 14.6864 18.8615 14.4234L32.3333 7.6875"
          stroke="#252525"
          stroke-width="2.4"
        />
      </svg>
      {isActive && (
        <span className="absolute top-[-5px] right-[-5px] inline-block w-3 h-3 bg-red-500 rounded-full"></span>
      )}
    </div>
  );
};
