/// <reference path="daterange.ts" />
/// <reference path="../enums.ts" />
/// <reference path="../primitives/calendarbutton.ts" />
/// <reference path="../primitives/calendardaybutton.ts" />

module Fayde.Controls {

    export class Calendar extends Control {
        
        static FirstDayOfWeekProperty: DependencyProperty = DependencyProperty.Register("FirstDayOfWeek", () => DayOfWeek, Calendar, Fayde.Localization.DateTimeFormatInfo.Instance.FirstDayOfWeek, (d, args) => (<Calendar>d)._OnFirstDayOfWeekChanged);
        static DisplayDateProperty: DependencyProperty = DependencyProperty.Register("DisplayDate", () => DateTime, Calendar, DateTime.MinValue, (d, args) => (<Calendar>d)._OnDisplayDateChanged);

        static DisplayDateStartProperty: DependencyProperty = DependencyProperty.Register("DisplayDateStart", () => DateTime, Calendar, DateTime.MinValue, (d, args) => (<Calendar>d)._OnDisplayDateStartChanged);
        static DisplayDateEndProperty: DependencyProperty = DependencyProperty.Register("DisplayDateEnd", () => DateTime, Calendar, DateTime.MaxValue, (d, args) => (<Calendar>d)._OnDisplayDateEndChanged);
        static IsTodayHighlightedProperty: DependencyProperty = DependencyProperty.Register("IsTodayHighlighted", () => Boolean, Calendar, true);
        static SelectedDateProperty: DependencyProperty = DependencyProperty.Register("SelectedDate", () => DateTime, Calendar, DateTime.Today, (d, args) => (<Calendar>d)._OnSelectedDateChanged);
        static DisplayModeProperty: DependencyProperty = DependencyProperty.Register("DisplayMode", () => CalendarMode, Calendar, CalendarMode.Month, (d, args) => (<Calendar>d)._OnDisplayModeChanged);
        static SelectionModeProperty: DependencyProperty = DependencyProperty.Register("SelectionMode", () => CalendarSelectionMode, Calendar, CalendarSelectionMode.SingleDate, (d, args) => (<Calendar>d)._OnSelectiondModeChanged);
        static CalendarButtonStyleProperty: DependencyProperty = DependencyProperty.Register("CalendarButtonStyle", () => Style, Calendar, null);
        static CalendarDayButtonStyleProperty: DependencyProperty = DependencyProperty.Register("CalendarDayButtonStyle", () => Style, Calendar, null);

        static CalendarStyleProperty: DependencyProperty = DependencyProperty.Register("CalendarStyle", () => Style, Calendar, null);
        
        get IsTodayHighlighted(): boolean {
            return this.GetValue(Calendar.IsTodayHighlightedProperty);
        }
        set IsTodayHighlighted(value: boolean) {
            this.SetValue(Calendar.IsTodayHighlightedProperty, value);
        }

        get FirstDayOfWeek(): DayOfWeek {
            return this.GetValue(Calendar.FirstDayOfWeekProperty);
        }
        set FirstDayOfWeek(value: DayOfWeek) {
            this.SetValue(Calendar.FirstDayOfWeekProperty, value);
        }

        get DisplayDateStart(): DateTime {
            return this.GetValue(Calendar.DisplayDateStartProperty);
        }
        set DisplayDateStart(value: DateTime) {
            this.SetValue(Calendar.DisplayDateStartProperty, value);
        }

        get DisplayDateEnd(): DateTime {
            return this.GetValue(Calendar.DisplayDateEndProperty);
        }
        set DisplayDateEnd(value: DateTime) {
            this.SetValue(Calendar.DisplayDateEndProperty, value);
        }

        get DisplayDate(): DateTime {
            return this.GetValue(Calendar.DisplayDateProperty);
        }
        set DisplayDate(value: DateTime) {
            this.SetValue(Calendar.DisplayDateProperty, value);
        }

        get SelectedDate(): DateTime {
            return this.GetValue(Calendar.SelectedDateProperty);
        }
        set SelectedDate(value: DateTime) {
            this.SetValue(Calendar.SelectedDateProperty, value);
        }

        get DisplayMode(): CalendarMode {
            return this.GetValue(Calendar.DisplayModeProperty);
        }
        set DisplayMode(value: CalendarMode) {
            this.SetValue(Calendar.DisplayModeProperty, value);
        }
        get SelectionMode(): CalendarSelectionMode {
            return this.GetValue(Calendar.SelectionModeProperty);
        }
        set SelectionMode(value: CalendarSelectionMode) {
            this.SetValue(Calendar.SelectionModeProperty, value);
        }

        get CalendarButtonStyle(): Style {
            return this.GetValue(Calendar.CalendarButtonStyleProperty);
        }
        set CalendarButtonStyle(value: Style) {
            this.SetValue(Calendar.CalendarButtonStyleProperty, value);
        }

        get CalendarDayButtonStyle(): Style {
            return this.GetValue(Calendar.CalendarDayButtonStyleProperty);
        }
        set CalendarDayButtonStyle(value: Style) {
            this.SetValue(Calendar.CalendarDayButtonStyleProperty, value);
        }

        get CalendarStyle(): Style {
            return this.GetValue(Calendar.CalendarStyleProperty);
        }
        set CalendarStyle(value: Style) {
            this.SetValue(Calendar.CalendarStyleProperty, value);
        }

        SelectedDates: Fayde.Collections.ObservableCollection<DateTime> = new Fayde.Collections.ObservableCollection<DateTime>();
        BlackoutDates: BlackDatesCollection = new BlackDatesCollection();

        private _OnFirstDayOfWeekChanged(oldValue: DayOfWeek, newValue: DayOfWeek) {
        }

        private _OnDisplayDateChanged(oldValue: DateTime, newValue: DateTime) {

        }
        private _OnDisplayDateStartChanged(oldValue: DateTime, newValue: DateTime) {

        }
        private _OnDisplayDateEndChanged(oldValue: DateTime, newValue: DateTime) {
        }

        private _OnDisplayModeChanged(oldValue: CalendarMode, newValue: CalendarMode) {
        }

        private _OnSelectiondModeChanged(oldValue: CalendarMode, newValue: CalendarMode) {

        }
        private _OnSelectedDateChanged(oldValue: DateTime, newValue: DateTime) {
        }

        //#region Public Members
        MonthView: Grid;
        YearView: Grid;
        HeaderButton: Button;
        PreviousButton: Button;
        NextButton: Button;

        private _FocusButton: Primitives.CalendarDayButton;
        get FocusButton(): Primitives.CalendarDayButton {
            return this._FocusButton;
        }

        set FocusButton(val: Primitives.CalendarDayButton)  {
            if (this._FocusButton != null && this._FocusButton != val) {
                this._FocusButton.IsFocused = false;
                this._FocusButton.IsSelected = false;
            }
            this._FocusButton = val;     
            val.IsFocused = true;
            val.IsSelected = true;
        }
            
        get HasFocus(): boolean {
            return this.FocusButton != null;
        }


        //#endregion

        //#region Private Members
        private _CurrentMonth: DateTime = DateTime.Today;  
        private _DayTitleTemplate: DataTemplate;
        private _DisabledVisual: FrameworkElement;       
        //#endregion

        constructor() {
            super();
            this.DefaultStyleKey = Calendar;
            this.KeyDown.on(this._HandleKeyDown, this);    
            this.SelectedDate = new DateTime(2015, 6, 15);
        }

        OnApplyTemplate() {           
            super.OnApplyTemplate();
            var day = new DateTime(2015, 11, 1);   
            var day2 = day.AddDays(1);

            this.HeaderButton = <Button>this.GetTemplateChild("HeaderButton");
            if (this.HeaderButton != null) {
                this.HeaderButton.Click.on(this._HandleHeaderButtonClick, this);
                this.HeaderButton.IsTabStop = false;
            }
            this.PreviousButton = <Button>this.GetTemplateChild("PreviousButton");
            if (this.PreviousButton != null) {
                this.PreviousButton.Click.on(this._HandlePreviousButtonClick, this);
                this.PreviousButton.IsTabStop = false;
                this.PreviousButton.Visibility = Visibility.Visible;
            }
            this.NextButton = <Button>this.GetTemplateChild("NextButton");     
            if (this.NextButton != null) {
                this.NextButton.Click.on(this._HandleNextButtonClick, this);
                this.NextButton.IsTabStop = false;
                this.NextButton.Visibility = Visibility.Visible;
            }      
            this.MonthView = <Grid>this.GetTemplateChild("MonthView");            
            this.YearView = <Grid>this.GetTemplateChild("YearView");
           
            this._DayTitleTemplate = <DataTemplate>this.GetTemplateChild("DayTitleTemplate");
            this._DisabledVisual = <FrameworkElement>this.GetTemplateChild("DisabledVisual");
     
            this.UpdateDisabledGrid(this.IsEnabled);                     
            this.PopulateGrids();            
            this.ChangeVisualState(); 
            this.Focus();                                       
        }

        get CurrentMonth() : DateTime {
            return this._CurrentMonth;
        }

        set CurrentMonth(val: DateTime) {
            this._CurrentMonth = val;                
            this.ChangeVisualState();
        }

        private SetButtonState(childButton: Primitives.CalendarDayButton, dateToAdd: DateTime ) {   
            if (DateTime.Compare(dateToAdd, this.DisplayDateStart) < 0 || DateTime.Compare(dateToAdd, this.DisplayDateEnd) > 0) {
                childButton.Opacity = 0;
                childButton.IsEnabled = false;
                childButton.IsSelected = false;
                childButton.IsFocused = false;  
            }
            else {
                if (this.BlackoutDates.ContainsDate(dateToAdd)) {
                    childButton.IsBlackout = true;
                }
                else {
                    childButton.IsBlackout = false;
                }
                childButton.Opacity = 1;
                childButton.IsEnabled = true;
                childButton.IsInactive = dateToAdd.Month != this._CurrentMonth.Month;     
                childButton.IsSelected = false;    
                childButton.IsFocused = false;               
                childButton.IsToday = this.IsTodayHighlighted && DateTime.Compare(dateToAdd.Date, DateTime.Today) == 0;
                for (var i = 0; i < this.SelectedDates.Count; i++)
                {
                    var time = this.SelectedDates.GetValueAt(i);
                    childButton.IsSelected = DateTime.Compare(dateToAdd, time.Date) == 0;
                }                    
                if (this.SelectedDate != null && this.SelectedDate.Month == this._CurrentMonth.Month) {
                    if (DateTime.Compare(this.SelectedDate, dateToAdd) == 0) {
                        if (this.FocusButton != null) {
                            this.FocusButton.IsFocused = false;
                        }
                        this.FocusButton = childButton;
                    }                   
                }
                else if (DateTime.Compare(dateToAdd, new DateTime(this._CurrentMonth.Year, this._CurrentMonth.Month, 1)) == 0)
                    childButton.IsFocused = true;
            }

        }
        
        private SetDayButtons()
        {
            var day;
            var firstDayOfMonth = new DateTime(this.CurrentMonth.Year, this.CurrentMonth.Month, 1);
            var num = this.PreviousMonthDays(firstDayOfMonth);
            if (firstDayOfMonth != DateTime.MinValue) {
                day = firstDayOfMonth.AddDays(-num);
            }
            else {
                day = firstDayOfMonth;
            }            
            var num2 = 0x31;
            for (var i = 7; i < num2; i++)
            {
                var childButton = <Primitives.CalendarDayButton>this.MonthView.Children.GetValueAt(i);                
                this.SetButtonState(childButton, day);               
                childButton.Content = day.Day;
                childButton.DataContext = day;
                if (day.Date < DateTime.MaxValue) {
                    day = day.AddDays(1);
                }
                else {
                    i++;
                    for (var j = i; j < num2; j++)
                    {
                        childButton = <Primitives.CalendarDayButton>this.MonthView.Children.GetValueAt(j);
                        childButton.Content = j;
                        childButton.IsEnabled = false;
                    }
                    return;
                }
            }            
        }
        
        private SetDayTitles() {
            for (var i = 0; i < 7; i++)
            {
                var element = this.MonthView.Children.GetValueAt(i);
                if (element != null) {
                    element.DataContext = Fayde.Localization.DateTimeFormatInfo.Instance.ShortestDayNames[(<DayOfWeek>i + this.FirstDayOfWeek) % (<DayOfWeek> DayOfWeek.Saturday| DayOfWeek.Monday)];                   
                }
            }
        }
        
        private SetDecadeModeHeaderButton(decade: number, decadeEnd: number)
        {
            if (this.HeaderButton != null) {
                this.HeaderButton.Content = decade + "-" + decadeEnd;
                this.HeaderButton.IsEnabled = false;
            }
        }
        
        private SetDecadeModeNextButton(decadeEnd : number) {
            if (this.NextButton != null) {
                this.NextButton.IsEnabled = this.DisplayDateEnd.Year > decadeEnd;
            }
        }
        
        private SetDecadeModePreviousButton(decade: number) {
            if (this.PreviousButton != null) {
                this.PreviousButton.IsEnabled = decade > this.DisplayDateStart.Year;
            }
        }
        
        private SetMonthButtons() {
            for (var i = 0; i < this.YearView.Children.Count; i++)
            {
                var button = <Primitives.CalendarButton>this.YearView.Children.GetValueAt(i);
                var time = new DateTime(this._CurrentMonth.Year, i + 1, 1);
                button.DataContext = time;
                button.Content = Fayde.Localization.DateTimeFormatInfo.Instance.AbbreviatedMonthNames[i];
                button.Visibility = Visibility.Visible;
                button.IsInactive = false;

                if (DateTime.Compare(time, this.DisplayDateStart.Date) < 0 || DateTime.Compare(time, this.DisplayDateEnd.Date) > 0) {
                    button.IsEnabled = false;
                }
                else {
                    button.IsEnabled = true;
                }    
                if (time.Year == this._CurrentMonth.Year && time.Month == this._CurrentMonth.Month) {
                    button.IsFocused = true;
                }
                else {
                    button.IsFocused = false;
                }
                if (time.Year == this.SelectedDate.Year && time.Month == this.SelectedDate.Month) {
                    button.IsSelected = true;
                }
                else {
                    button.IsSelected = false;
                }                            
            }
        }
        
        private SetMonthModeHeaderButton()
        {
            if (this.HeaderButton != null) {
                this.HeaderButton.Content = this._CurrentMonth.toString("MMMM yyyy");
                this.HeaderButton.IsEnabled = true;                
            }
        }
        
        private SetMonthModeNextButton() {
            if (this.NextButton != null) {
                this.NextButton.IsEnabled = DateTime.Compare(this.DisplayDateEnd, this.CurrentMonth.AddMonths(1)) > 0;
            }
        }
        
        private SetMonthModePreviousButton() {
            if (this.PreviousButton != null) {
                this.PreviousButton.IsEnabled = DateTime.Compare(this.DisplayDateStart, this.CurrentMonth.AddMonths(-1)) < 0;
            }
        }
        
        private SetYearButtons(decade: number, decadeEnd: number)
        {
            var num2 = -1;
            for (var i = 0; i < this.YearView.Children.Count; i++)
            {
                var button = <Primitives.CalendarButton>this.YearView.Children.GetValueAt(i);
                var num = decade + num2;
                if ((num <= DateTime.MaxValue.Year) && (num >= DateTime.MinValue.Year)) {
                    var time = new DateTime(num, 1, 1);
                    button.DataContext = time;
                    button.Content = time.toString('yyyy');                  
                    if (num == this.CurrentMonth.Year) {
                        button.IsFocused = true;
                    }
                    else {
                        button.IsFocused = false;
                    }
                    if (num == this.SelectedDate.Year) {
                        button.IsSelected = true;
                    }
                    else {
                        button.IsSelected = false;
                    }
                    if ((num < this.DisplayDateStart.Year) || (num > this.DisplayDateEnd.Year)) {
                        button.IsEnabled = false;
                    }
                    else {
                        button.IsEnabled = true;
                    }
                   
                    button.IsInactive = (num < decade) || (num > decadeEnd);
                }
                else {
                    button.IsEnabled = false;
                }
                num2++;
            }
        }
        
        private SetYearModeHeaderButton()
        {
            if (this.HeaderButton != null) {
                this.HeaderButton.IsEnabled = true;
                this.HeaderButton.Content = this._CurrentMonth.Year.toString();
            }
        }
        
        private SetYearModeNextButton()
        {
            if (this.NextButton != null) {
                this.NextButton.IsEnabled = this.DisplayDateEnd.Year > this._CurrentMonth.Year;
            }
        }
        
        private SetYearModePreviousButton() {
            if (this.PreviousButton != null) {
                this.PreviousButton.IsEnabled = this.DisplayDateStart.Year < this._CurrentMonth.Year;
            }
        }

        private PopulateGrids() {
            if (this.MonthView != null) {
                for (var i = 0; i < 7; i++)
                {
                    if (this._DayTitleTemplate != null) {                        
                        var element = new ContentControl();
                        element.SetValue(Button.TemplateProperty, this._DayTitleTemplate);
                        element.SetValue(Grid.RowProperty, 0);
                        element.SetValue(Grid.ColumnProperty, i);
                        this.MonthView.Children.Add(element);
                    }
                }
                for (var j = 1; j < 7; j++)
                {
                    for (var k = 0; k < 7; k++)
                    {
                        var button = new Primitives.CalendarDayButton();                       
                        if (this.CalendarDayButtonStyle != null) {
                            button.Style = this.CalendarDayButtonStyle;
                        }                        
                        button.SetValue(Grid.RowProperty, j);
                        button.SetValue(Grid.ColumnProperty, k);
                        button.Click.on(this._HandleCellClick, this);
                        this.MonthView.Children.Add(button);
                    }
                }
            }
            if (this.YearView != null) {
                var num4 = 0;
                for (var m = 0; m < 3; m++)
                {
                    for (var n = 0; n < 4; n++)
                    {
                        var button2 = new Fayde.Controls.Primitives.CalendarButton();
                        if (this.CalendarButtonStyle != null) {
                            button.Style = this.CalendarButtonStyle;
                        }
                        button2.SetValue(Grid.RowProperty, m);
                        button2.SetValue(Grid.ColumnProperty, n);
                        button2.Click.on(this._HandleCellClick, this);
                        this.YearView.Children.Add(button2);
                        num4++;
                    }
                } 
            }
        }

        UpdateDisabledGrid(isEnabled: boolean)
        {
            if (isEnabled) {
                if (this._DisabledVisual != null) {
                    this._DisabledVisual.Visibility = Visibility.Collapsed;
                }
                Media.VSM.VisualStateManager.GoToState(this, "Normal", true);
            }
            else {
                if (this._DisabledVisual != null) {
                    this._DisabledVisual.Visibility = Visibility.Visible;
                }                
                Media.VSM.VisualStateManager.GoToState(this, "Normal", true);  
                Media.VSM.VisualStateManager.GoToState(this, "Disabled", true);     
            }
        }

        private UpdateMonthMode() {                        
            this.SetMonthModeHeaderButton();
            this.SetMonthModePreviousButton();
            this.SetMonthModeNextButton();
            if (this.MonthView != null) {
                this.SetDayTitles();
                this.SetDayButtons();
            }
        }

        private UpdateYearMode() {            
            this.SetYearModeHeaderButton();
            this.SetYearModePreviousButton();
            this.SetYearModeNextButton();
            if (this.YearView != null) {
                this.SetMonthButtons();
            }
        } 
        
        private GetDecadeBegin(date: DateTime): DateTime {
            return new DateTime(Math.floor(date.Year / 10) * 10, 1, 1);
        }

        private UpdateDecadeMode() {            
            var decade = this.GetDecadeBegin(this._CurrentMonth).Year;
            var decadeEnd = decade + 9;            
            this.SetDecadeModeHeaderButton(decade, decadeEnd);
            this.SetDecadeModePreviousButton(decade);
            this.SetDecadeModeNextButton(decadeEnd);
            if (this.YearView != null) {
                this.SetYearButtons(decade, decadeEnd);
            }
        }     

        private PreviousMonthDays(firstOfMonth: DateTime ) : number {
            var num = (((firstOfMonth.DayOfWeek - this.FirstDayOfWeek) + ((DayOfWeek.Saturday) | (DayOfWeek.Monday))) % (((DayOfWeek.Saturday | DayOfWeek.Monday))));            
            if (num == 0) {
                return 7;
            }
            return num;
        }

        private _HandleCellClick(sender: any, e: Fayde.RoutedEventArgs) {
            var button = <Button>sender;          
            if (this.DisplayMode == CalendarMode.Month) {    
                this.SelectedDate = <DateTime>button.DataContext;                           
                this.FocusButton = <Primitives.CalendarDayButton>button; 
                this.CurrentMonth = <DateTime>button.DataContext;                     
            }
            else if (this.DisplayMode == CalendarMode.Year) {
                this._CurrentMonth = <DateTime>button.DataContext;     
                this.SwitchCalendarMode(CalendarMode.Month);                              
            }
            else if (this.DisplayMode == CalendarMode.Decade) {
                this._CurrentMonth = <DateTime>button.DataContext;     
                this.SwitchCalendarMode(CalendarMode.Year);            
            }                              
        }  
       
        private _HandlePreviousButtonClick(sender: any, e: Fayde.RoutedEventArgs) {
            if (this.DisplayMode == CalendarMode.Month)
                this.CurrentMonth = this._CurrentMonth.AddMonths(-1);
            if (this.DisplayMode == CalendarMode.Year)
                this.CurrentMonth = this._CurrentMonth.AddYears(-1);
            if (this.DisplayMode == CalendarMode.Decade)
                this.CurrentMonth = this._CurrentMonth.AddYears(-10);
        }

        private _HandleNextButtonClick(sender: any, e: Fayde.RoutedEventArgs) {
            if(this.DisplayMode == CalendarMode.Month)
                this.CurrentMonth = this._CurrentMonth.AddMonths(1);
            if(this.DisplayMode == CalendarMode.Year)
                this.CurrentMonth = this._CurrentMonth.AddYears(1);
            if (this.DisplayMode == CalendarMode.Decade)
                this.CurrentMonth = this._CurrentMonth.AddYears(10);
        }

        private SwitchCalendarMode(newMode: CalendarMode) {
            var oldMode = this.DisplayMode;
            this.DisplayMode = newMode;
            if (oldMode == CalendarMode.Month && newMode == CalendarMode.Year) {                
                this.CurrentMonth = new DateTime(this.CurrentMonth.Year, this.CurrentMonth.Month, 1);
            }
            if (oldMode == CalendarMode.Year && newMode == CalendarMode.Month) {
                this.CurrentMonth = new DateTime(this._CurrentMonth.Year, this._CurrentMonth.Month, 1);
            }
            if (oldMode == CalendarMode.Year && newMode == CalendarMode.Decade) {
                this.CurrentMonth = this.GetDecadeBegin(this.SelectedDate);
            }
            if (oldMode == CalendarMode.Decade && newMode == CalendarMode.Year) {
                this.CurrentMonth = new DateTime(this.CurrentMonth.Year, this.CurrentMonth.Month, 1);
            }
        }

        private _HandleHeaderButtonClick(sender: any, e: Fayde.RoutedEventArgs) {
            if (!this.HasFocus) {
                this.Focus();
            }
            var button = <Button>sender;
            if (button.IsEnabled) {
                if (this.DisplayMode == CalendarMode.Month) {
                    this.SwitchCalendarMode(CalendarMode.Year);                
                }
                else {
                    this.SwitchCalendarMode(CalendarMode.Decade);                                         
                }                
            }
        }

        private _HandleKeyDown(sender: Calendar, e: Fayde.Input.KeyEventArgs) {
            if (!e.Handled && sender.IsEnabled) {
                e.Handled = this.ProcessKey(e);
            }
        }

        private ChangeVisualState() {
            if (this.DisplayMode == Fayde.Controls.CalendarMode.Month) {                
                this.UpdateMonthMode();
                this.MonthView.Visibility = Visibility.Visible;
                this.YearView.Visibility = Visibility.Collapsed;
            }
            else {
                this.YearView.Visibility = Visibility.Visible;
                this.MonthView.Visibility = Visibility.Collapsed;                
                if (this.DisplayMode == CalendarMode.Year) {                   
                    this.UpdateYearMode();
                }
                else if (this.DisplayMode == CalendarMode.Decade) {
                    this.UpdateDecadeMode();
                }       
            }            
        }

        private ProcessKey(e: Fayde.Input.KeyEventArgs): boolean {            
            var logicalKey = Fayde.Input.InteractionHelper.GetLogicalKey(this.FlowDirection, e.Key);
            var colsPerRow = this.DisplayMode == CalendarMode.Month ? 7 : 4;
       
            switch (logicalKey) {
                case Fayde.Input.Key.Enter:
                case Fayde.Input.Key.Space:
                    if (this.DisplayMode == CalendarMode.Year) {                        
                        this.SwitchCalendarMode(CalendarMode.Month);                       
                    }
                    else if (this.DisplayMode == CalendarMode.Decade) {
                        this.SwitchCalendarMode(CalendarMode.Year);           
                    }    
                    break;
                case Fayde.Input.Key.PageUp:
                    this.GoToCell(-colsPerRow);
                    break;

                case Fayde.Input.Key.PageDown:
                    this.GoToCell(colsPerRow);
                    break;
                case Fayde.Input.Key.End:
                    this.GoToCell(31);
                    break;
                case Fayde.Input.Key.Home:
                    this.GoToCell(0);
                    return true;
                case Fayde.Input.Key.Left:
                    this.GoToCell(-1);
                    break;
                case Fayde.Input.Key.Right:
                    this.GoToCell(1);
                    break;
                case Fayde.Input.Key.Up:
                    this.GoToCell(-colsPerRow);
                    break;               
                case Fayde.Input.Key.Down:
                    this.GoToCell(colsPerRow);
                    break;
                default:
                    return false;
            }
            return true;
        }

        private GoToCell(delta: number) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
                    this.SelectedDate = this.SelectedDate.AddDays(delta);
                    this.CurrentMonth = new DateTime(this.SelectedDate.Year, this.SelectedDate.Month, 1);
                    break;
                case CalendarMode.Year:
                    this.CurrentMonth = this.CurrentMonth.AddMonths(delta);
                    break;
                case CalendarMode.Decade:
                    this.CurrentMonth = this.CurrentMonth.AddYears(delta);
                    break;
            }
        }
    }
    TemplateParts(Calendar,
        { Name: "Root", Type: FrameworkElement },
        { Name: "YearView", Type: Grid },
        { Name: "MonthView", Type: Grid },
        { Name: "HeaderButton", Type: Button },
        { Name: "PreviousButton", Type: Button },
        { Name: "NextButton", Type: Button },
        { Name: "DayTitleTemplate", Type: DataTemplate },
        { Name: "DisabledVisual", Type: FrameworkElement });

    TemplateVisualStates(Calendar,
        { Name: "Normal", GroupName: "CommonStates" },
        { Name: "Disabled", GroupName: "CommonStates" });
}