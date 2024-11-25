const Filter = async (props: any) => {
  const total = 500;

  return (
    <div className="min-w-100 sticky top-5 z-50 mb-8 flex items-center justify-between rounded-xl bg-blue-50 p-4 shadow-xl">
      <div className="shadow-inset-box flex items-center gap-1 rounded-full px-2 py-1 font-bold text-slate-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="bi"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.6667 1.14286H3.33333C2.689 1.14286 2.16667 1.65453 2.16667 2.28571V13.7143C2.16667 14.3455 2.689 14.8571 3.33333 14.8571H12.6667C13.311 14.8571 13.8333 14.3455 13.8333 13.7143V2.28571C13.8333 1.65453 13.311 1.14286 12.6667 1.14286ZM3.33333 0C2.04467 0 1 1.02335 1 2.28571V13.7143C1 14.9767 2.04467 16 3.33333 16H12.6667C13.9553 16 15 14.9767 15 13.7143V2.28571C15 1.02335 13.9553 0 12.6667 0H3.33333Z"
          />
          <path
            fillRule="evenodd"
            d="M11.75 3.75H4.25V8.25H11.75V3.75ZM3 3V9H13V3H3Z"
          />
        </svg>
        <span className="text-sm leading-none text-slate-800">{total}</span>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
    </div>
  );
};

export default Filter;
