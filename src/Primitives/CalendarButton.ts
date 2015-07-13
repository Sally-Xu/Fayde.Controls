module Fayde.Controls.Primitives {

    export class CalendarButton extends Button {
        private _IsFocused: boolean;
        get IsFocused(): boolean {
            return this._IsFocused;
        }
        set IsFocused(val: boolean) {
            if (val != this._IsFocused) {
                this._IsFocused = val;
                this.ChangeVisualState(true, "FocusStates");
            }
        }

        private _IsSelected: boolean;
        get IsSelected(): boolean {
            return this._IsSelected;
        }
        set IsSelected(val: boolean) {
            if (val != this._IsSelected) {
                this._IsSelected = val;
                this.ChangeVisualState(true, "SelectionStates");
            }
        }

        private _IsInactive: boolean;
        get IsInactive(): boolean {
            return this._IsInactive;
        }
        set IsInactive(val: boolean) {
            if (val != this._IsInactive) {
                this._IsInactive = val;
                this.ChangeVisualState(true, "ActiveStates");
            }
        }

        constructor() {
            super();
            this.DefaultStyleKey = CalendarButton;
            this.IsTabStop = false;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.ChangeVisualState(false);
        }

        protected ChangeVisualState(useTransitions: boolean, stateGroup: string = null) {        
            if (this.IsPressed) {
                Media.VSM.VisualStateManager.GoToState(this, "Pressed", useTransitions);
            }
            if (this.IsEnabled) {
                Media.VSM.VisualStateManager.GoToState(this, "Normal", useTransitions);
            }
            else {
                Media.VSM.VisualStateManager.GoToState(this, "Disabled", useTransitions);
            }        
            if (stateGroup == null || stateGroup == "SelectionStates") {
                if (this.IsSelected) {
                    Media.VSM.VisualStateManager.GoToState(this, "Selected", useTransitions);
                }
                else {
                    Media.VSM.VisualStateManager.GoToState(this, "Unselected", useTransitions);
                }
            }
            if (stateGroup == null || stateGroup == "ActiveStates") {
                if (this.IsInactive) {
                    Media.VSM.VisualStateManager.GoToState(this, "Inactive", useTransitions);
                }
                else {
                    Media.VSM.VisualStateManager.GoToState(this, "Active", useTransitions);
                }
            }
            if (stateGroup == null || stateGroup == "FocusStates") {
                if (this.IsFocused && this.IsEnabled) {
                    Media.VSM.VisualStateManager.GoToState(this, "Focused", useTransitions);
                }
                else {
                    Media.VSM.VisualStateManager.GoToState(this, "Unfocused", useTransitions);
                }
            }
        }     
    }

    TemplateVisualStates(CalendarButton,
        { Name: "Normal", GroupName: "CommonStates" },
        { Name: "Disabled", GroupName: "CommonStates" },
        { Name: "MouseOver", GroupName: "CommonStates" },
        { Name: "Pressed", GroupName: "CommonStates" },
        { Name: "Unfocused", GroupName: "FocusStates" },
        { Name: "Focused", GroupName: "FocusStates" },
        { Name: "Selected", GroupName: "SelectionStates" },
        { Name: "Unselected", GroupName: "SelectionStates" },
        { Name: "Active", GroupName: "ActiveStates" },
        { Name: "Inactive", GroupName: "ActiveStates" });
}