module Fayde.Controls {

    export class BlackDatesCollection extends Fayde.Collections.ObservableCollection<DateRange> {

        private _Owner : Calendar;

        public CalendarBlackoutDatesCollection(owner: Calendar) {
            this._Owner = owner;
        }

        public AddDatesInPast()
        {
            this.Add(new DateRange(DateTime.MinValue, DateTime.Today.AddDays(-1)));
        }
               
        ContainsDate(date: DateTime ): boolean {
            for (var i = 0; i < this.Count; i++)
            {
                if (this.GetValueAt(i).IsInRange(date))
                    return true;                 
            }
            return false;
        }
        
        //    public bool Contains(DateTime start, DateTime end)
        //{
        //    DateTime time;
        //    DateTime time2;
        //    if (DateTime.Compare(end, start) > -1) {
        //        time = DateTimeHelper.DiscardTime(new DateTime ? (start)).get_Value();
        //        time2 = DateTimeHelper.DiscardTime(new DateTime ? (end)).get_Value();
        //    }
        //    else {
        //        time = DateTimeHelper.DiscardTime(new DateTime ? (end)).get_Value();
        //        time2 = DateTimeHelper.DiscardTime(new DateTime ? (start)).get_Value();
        //    }
        //    int num = base.get_Count();
        //    for (int i = 0; i < num; i++)
        //    {
        //        CalendarDateRange range = base.get_Item(i);
        //        if ((DateTime.Compare(range.Start, time) == 0) && (DateTime.Compare(range.End, time2) == 0)) {
        //            return true;
        //        }
        //    }
        //    return false;
        //}
        
        //    public bool ContainsAny(CalendarDateRange range)
        //{
        //    return ((IEnumerable<CalendarDateRange>) this).Any<CalendarDateRange>(r => r.ContainsAny(range));
        //}
        
        //    private void EnsureValidThread()
        //{
        //    if (Thread.get_CurrentThread() != this._dispatcherThread) {
        //        throw new NotSupportedException(Resources.CalendarCollection_MultiThreadedCollectionChangeNotSupported);
        //    }
        //}
        
        //    protected override void InsertItem(int index, CalendarDateRange item)
        //{
        //    this.EnsureValidThread();
        //    if (!this.IsValid(item)) {
        //        throw new ArgumentOutOfRangeException(Resources.Calendar_UnSelectableDates);
        //    }
        //    base.InsertItem(index, item);
        //    this._owner.UpdateMonths();
        //}
        
        //    private bool IsValid(CalendarDateRange item)
        //{
        //    using(IEnumerator < DateTime > enumerator = this._owner.SelectedDates.GetEnumerator())
        //    {
        //        while (enumerator.MoveNext()) {
        //            if (DateTimeHelper.InRange(enumerator.get_Current(), item)) {
        //                return false;
        //            }
        //        }
        //    }
        //    return true;
        //}
        
        //    protected override void RemoveItem(int index)
        //{
        //    this.EnsureValidThread();
        //    base.RemoveItem(index);
        //    this._owner.UpdateMonths();
        //}
        
        //    protected override void SetItem(int index, CalendarDateRange item)
        //{
        //    this.EnsureValidThread();
        //    if (!this.IsValid(item)) {
        //        throw new ArgumentOutOfRangeException(Resources.Calendar_UnSelectableDates);
        //    }
        //    base.SetItem(index, item);
        //    this._owner.UpdateMonths();
        //}
    }
}