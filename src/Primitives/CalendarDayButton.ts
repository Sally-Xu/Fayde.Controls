module Fayde.Controls.Primitives {

    export class CalendarDayButton extends CalendarButton {
        private _IsBlackout: boolean;
        get IsBlackout(): boolean {
            return this._IsBlackout;
        }
        set IsBlackout(val: boolean) {
            if (val != this._IsBlackout) {
                this._IsBlackout = val;
                this.ChangeVisualState(true, "BlackoutStates");
            }
        }

        private _IsToday: boolean;
        get IsToday(): boolean {
            return this._IsToday;
        }
        set IsToday(val: boolean) {
            if (val != this._IsToday) {
                this._IsToday = val;
                this.ChangeVisualState(true, "DayStates");
            }
        }

        constructor() {
            super();
            this.DefaultStyleKey = CalendarDayButton;
        }
               
        protected ChangeVisualState(useTransitions: boolean, stateGroup: string = null) {                  
            super.ChangeVisualState(useTransitions);          
            if (stateGroup == null || stateGroup == "DayStates") {
                if (this.IsToday) {
                    Media.VSM.VisualStateManager.GoToState(this, "Today", useTransitions);
                }
                else {
                    Media.VSM.VisualStateManager.GoToState(this, "RegularDay", useTransitions);
                }
            }

            if (stateGroup == null || stateGroup == "BlackoutStates") {
                if (this.IsBlackout) {
                    Media.VSM.VisualStateManager.GoToState(this, "BlackoutDay", useTransitions);
                }
                else {
                    Media.VSM.VisualStateManager.GoToState(this, "NormalDay", useTransitions);
                }
            }             
        }     
    }
    TemplateVisualStates(CalendarDayButton,
        { Name: "Normal", GroupName: "CommonStates" },
        { Name: "Disabled", GroupName: "CommonStates" },
        { Name: "MouseOver", GroupName: "CommonStates" },
        { Name: "Pressed", GroupName: "CommonStates" },
        { Name: "Unfocused", GroupName: "FocusStates" },
        { Name: "Focused", GroupName: "FocusStates" },
        { Name: "Selected", GroupName: "SelectionStates" },
        { Name: "Unselected", GroupName: "SelectionStates" },
        { Name: "Active", GroupName: "ActiveStates" },
        { Name: "Inactive", GroupName: "ActiveStates" },
        { Name: "BlackoutDay", GroupName: "BlackoutDayStates" },
        { Name: "NormalDay", GroupName: "BlackoutDayStates" },
        { Name: "Today", GroupName: "DayStates" },
        { Name: "RegularDay", GroupName: "DayStates" });
}