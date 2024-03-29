interface HistoryContainerProps {
    children: React.ReactNode;
  }
  
  export function RecipeContainer({ children }: HistoryContainerProps) {
    return (
      <div className="grid grid-cols-1 gap-4 rounded-3xl bg-primary-foreground p-2 dark:bg-slate-900 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    );
  }
  