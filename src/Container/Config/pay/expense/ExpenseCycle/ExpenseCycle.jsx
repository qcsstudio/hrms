import { useState } from "react";

const ExpenseCycle = () => {
  const [endDate, setEndDate] = useState("");
  const [processingDate, setProcessingDate] = useState("");
  const [transitionPeriod, setTransitionPeriod] = useState("");

  return (
    <div className="max-w-[760px]">
      <h1 className="text-xl font-semibold text-foreground">
        Expense Cycle Processing
      </h1>
      <p className="text-sm text-muted-foreground mt-1 mb-8">
        Manage employee directory, documents, and role-based actions.
      </p>

      {/* End Date */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          When does your monthly expense cycle end?
        </p>

        <label className="ml-3 block text-sm font-medium text-foreground mb-1">
          End date
        </label>

        <div className="ml-3 flex items-center gap-3">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-10 w-[200px] rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-sm text-muted-foreground">Date</span>
        </div>
      </div>

      {/* Processing Date */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          When do you process your expenses?
        </p>

        <label className="ml-3 block text-sm font-medium text-foreground mb-1">
          Processing date
        </label>

        <div className="ml-3 flex items-center gap-3">
          <input
            type="date"
            value={processingDate}
            onChange={(e) => setProcessingDate(e.target.value)}
            className="h-10 w-[200px] rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-sm text-muted-foreground">Date</span>
        </div>
      </div>

      {/* Transition Period */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2 max-w-[680px]">
          Transition period allows employees to file expenses from the last
          expense cycle. How long would you like this period to be?
        </p>

        <label className="ml-3 block text-sm font-medium text-foreground mb-1">
          Transition period
        </label>

        <div className="ml-3 flex items-center gap-3">
          <input
            type="number"
            min={0}
            value={transitionPeriod}
            onChange={(e) => setTransitionPeriod(e.target.value)}
            className="h-10 w-[200px] rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-sm text-muted-foreground">Days</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCycle;