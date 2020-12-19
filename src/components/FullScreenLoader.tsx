export const FullScreenLoader: React.FC = () => {
  return (
    // TODO:Make this loader look better
    <div className="h-full w-full flex flex-col p-5">
      <div>
        <h1 className="text-3xl">Sentinel</h1>
      </div>
      <div className="flex flex-grow items-center justify-center">
        Loading application...
      </div>
    </div>
  );
};
