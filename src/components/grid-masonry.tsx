import React from "react";

interface Props<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
}
export function GridMasonry<T>({ items, render }: Props<T>) {
  if (!items || items.length === 0) {
    return <React.Fragment />;
  }

  return (
    <div className="columns-3 gap-6 w-full m-auto my-0">
      {(items || []).map((item) => {
        return render(item);
      })}
    </div>
  );
}
