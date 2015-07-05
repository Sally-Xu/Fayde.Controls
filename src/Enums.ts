module Fayde.Controls {
    export enum ValidSpinDirections {
        None = 0,
        Increase = 1,
        Decrease = 2
    }
    Library.addEnum(ValidSpinDirections, "ValidSpinDirections");

    export enum SpinDirection {
        Increase,
        Decrease
    }
    Library.addEnum(SpinDirection, "SpinDirection");

    export enum InvalidInputAction {
        UseFallbackItem,
        TextBoxCannotLoseFocus
    }
    Library.addEnum(InvalidInputAction, "InvalidInputAction");

    export enum Dock {
        Left,
        Top,
        Right,
        Bottom
    }
    Library.addEnum(Dock, "Dock");

    export enum DatePickerFormat {
        Long,
        Short,
    }
    Library.addEnum(DatePickerFormat, "DatePickerFormat");

    export enum TimeDisplayMode {
        Regular,
        Military
    }
    Library.addEnum(TimeDisplayMode, "TimeDisplayMode");

    export enum ValidationSummaryFilters {
        None = 0,
        ObjectErrors = 1,
        PropertyErrors = 2,
        All = PropertyErrors | ObjectErrors,
    }
    Library.addEnum(ValidationSummaryFilters, "ValidationSummaryFilters");

    export enum ValidationSummaryItemType {
        ObjectError = 1,
        PropertyError = 2,
    }
    Library.addEnum(ValidationSummaryItemType, "ValidationSummaryItemType");

    export enum StretchDirection {
        UpOnly,
        DownOnly,
        Both,
    }
    Library.addEnum(StretchDirection, "StretchDirection");

    export enum CalendarMode {
        Month = 1,
        Year = 2,       
        Decade = 3
    }
    Library.addEnum(CalendarMode, "CalendarMode");

    export enum CalendarSelectionMode {
        SingleDate = 1,
        SingleRange = 2,
        MultipleRange = 3,
        None = 4,
    }
    Library.addEnum(CalendarSelectionMode, "CalendarSelectionMode");   
}