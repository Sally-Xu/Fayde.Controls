module Fayde.Controls {

    export class BlackoutDatesCollection extends Fayde.Collections.ObservableCollection<DateRange> {

        public CalendarBlackoutDatesCollection() {
        }

        AddDatesInPast()
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
        
        Contains(range: DateRange) : boolean {
            for (var i = 0; i < this.Count; i++) {
                var r = this.GetValueAt(i);
                if ((DateTime.Compare(r.Start, range.Start) == 0) && (DateTime.Compare(r.End, range.End) == 0)) {
                    return true;
                }
            }
            return false;
        }                                     
    }
}