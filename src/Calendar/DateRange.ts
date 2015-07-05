module Fayde.Controls {

    export class DateRange {
        constructor(public Start: DateTime, public End: DateTime = null, public Description: string = null) {           
        }    

        IsInRange(date: DateTime): boolean {
            return DateTime.Compare(date, this.Start) >= 0 && (this.End == null || DateTime.Compare(date, this.End) <= 0);
        }
    }
}