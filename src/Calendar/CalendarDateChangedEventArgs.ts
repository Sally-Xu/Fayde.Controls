module Fayde.Controls {
    export class CalendarDateChangedEventArgs extends RoutedEventArgs {
        constructor(public RemoveData?: DateTime, public AddedDate?: DateTime) {
            super();
        }              
    }
}