/// <reference path="primitives/draggablecontrol.ts" />

module Fayde.Controls {

    export class ChildWindow extends Primitives.DraggableControl {
        constructor() {
            super();
            this.DefaultStyleKey = ChildWindow;
        }
    
        private _ContentContainer: Fayde.Controls.Panel = null;
        private _ModalMask: Fayde.Shapes.Rectangle = null;
        private _CloseButton: Fayde.Controls.Button = null;
        private _MaximizeButton: Fayde.Controls.Primitives.ToggleButton = null;
        private _MinimizeButton: Fayde.Controls.Button = null;

        private _size0: Size;
        private _p0: Point;

        static HeaderProperty = DependencyProperty.Register("Header", () => Object, ChildWindow, undefined, (d, args) => (<ChildWindow>d)._OnHeaderChanged(args.OldValue, args.NewValue));
        Header: any;
        private _OnHeaderChanged(oldHeader: any, newHeader: any) {
        }

        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => Fayde.DataTemplate, ChildWindow, undefined, (d, args) => (<ChildWindow>d)._OnHeaderTemplateChanged(args.OldValue, args.NewValue));
        HeaderTemplate: Fayde.DataTemplate;

        private _OnHeaderTemplateChanged(oldHeaderTemplate: Fayde.DataTemplate, newHeaderTemplate: Fayde.DataTemplate) {
        }

        static IsModalProperty: DependencyProperty = DependencyProperty.Register("IsModal", () => Boolean, ChildWindow, false, null);
        IsModal: boolean;

        static ShowMaximizeButtonProperty: DependencyProperty = DependencyProperty.
            Register("ShowMaximizeButton", () => Boolean, ChildWindow, false, null);
        ShowMaximizeButton: boolean;

        static ShowMinimizeButtonProperty: DependencyProperty = DependencyProperty.
            Register("ShowMinimizeButton", () => Boolean, ChildWindow, false, null);
        ShowMinimizeButton: boolean;

        static IsOpenProperty: DependencyProperty = DependencyProperty.
            Register("IsOpen", () => Boolean, ChildWindow, true, (d, args) => (<ChildWindow>d)._OnIsOpenChanged(args.OldValue, args.NewValue));

        IsOpen: boolean;

        private _OnIsOpenChanged(oldValue: boolean, newValue: boolean) {
            if (oldValue !== newValue) {
                if (newValue === true) {
                    this.Visibility = Fayde.Visibility.Visible;
                    if (this.IsModal) {
                        if (this._ModalMask == null) {
                            this._AddMask();
                        }
                        this._ModalMask.Visibility = Fayde.Visibility.Visible;
                    }
                } else {
                    this.Visibility = Fayde.Visibility.Collapsed;
                    if (this.IsModal) {
                        this._ModalMask.Visibility = Fayde.Visibility.Collapsed;
                    }
                }
            }
        }
    
        OnApplyTemplate() {
            if (this.IsModal) {
                this.ShowMaximizeButton = false;
                this.ShowMinimizeButton = false;
            } else if (this.CanResize) {
                this.ShowMaximizeButton = true;
                this.ShowMinimizeButton = true;
            }
            this._CloseButton = <Fayde.Controls.Button>this.GetTemplateChild("CloseButton", Fayde.Controls.Button);
            if (this._CloseButton != null) {
                this._CloseButton.Click.on(this._OnClose, this);
            }
            this._MinimizeButton = <Fayde.Controls.Button>this.GetTemplateChild("MinimizeButton", Fayde.Controls.Button);
            if (this._MinimizeButton != null) {
                if (this.ShowMinimizeButton) {
                    this._MinimizeButton.Click.on(this._OnMinimize, this);
                } else {
                    this._MinimizeButton.Visibility = Fayde.Visibility.Collapsed;
                }
            }
            this._MaximizeButton = <Fayde.Controls.Primitives.ToggleButton>this.GetTemplateChild("MaximizeButton", Fayde.Controls.Primitives.ToggleButton);
            if (this._MaximizeButton != null) {
                if (this.ShowMaximizeButton) {
                    this._MaximizeButton.Click.on(this._OnMaximize, this);
                } else {
                    this._MaximizeButton.Visibility = Fayde.Visibility.Collapsed;
                }
            }

            this._ContentContainer = <Fayde.Controls.Panel>this.GetTemplateChild("ContentContainer", Fayde.Controls.Panel);
            if (this._ContentContainer != null) {
                this._ContentContainer.MouseLeftButtonDown.on((sender: any, e: Fayde.Input.MouseButtonEventArgs) => { e.Handled = true; }, this);
            }
            if (this.IsModal && this.IsOpen) {
                this._AddMask();
            }
            super.OnApplyTemplate();
        }

        private _OnClose(sender, e) {
            this.IsOpen = false;
        }

        private _OnDone(sender, e) {
            this.IsOpen = false;
        }

        private _OnMinimize(sender, e) {
            this.Visibility = Fayde.Visibility.Collapsed;
        }

        private _OnMaximize(sender, e) {
            var b = <Fayde.Controls.Primitives.ToggleButton>sender;
            if (b.IsChecked === true) {
                this._size0 = new Size();
                this._size0.width = this.ActualWidth;
                this._size0.height = this.ActualHeight;
                this._p0 = new Point(this.OffsetX, this.OffsetY);
                this.OffsetX = 0;
                this.OffsetY = 0;
                var p = <Fayde.Controls.Panel>this.VisualParent;
                this.Width = p.ActualWidth;
                this.Height = p.ActualHeight;
                this.Margin = new Thickness(0);
                //if (Maximized != null)
                //    Maximized(this, null);
            } else {
                this.Restore();
            }
        }

        Open() {
            this.IsOpen = true;
        }
        Close() {
            this.IsOpen = false;
        }

        Restore() {
            if (this._size0 != null) {
                this.Width = this._size0.width;
                this.Height = this._size0.height;
            }
            if (this._p0 != null) {
                this.OffsetX = this._p0.x;
                this.OffsetY = this._p0.y;
            }
        }

        private _AddMask() {
            var p = <Fayde.Controls.Panel>this.VisualParent;
            if (p == null) {
                this._ModalMask = <Fayde.Shapes.Rectangle>this._GetChildControl("ModelMask", Fayde.Shapes.Rectangle);
            } else {
                this._ModalMask = <Fayde.Shapes.Rectangle>this._GetChildControl("ModelMask", Fayde.Shapes.Rectangle, p);
            }
            this._ModalMask.VerticalAlignment = Fayde.VerticalAlignment.Stretch;
            this._ModalMask.HorizontalAlignment = Fayde.HorizontalAlignment.Stretch;
            this._ModalMask.Fill = new Fayde.Media.SolidColorBrush(Color.KnownColors.DimGray);
            this._ModalMask.Opacity = 0.4;
            this._ModalMask.SetValue(Fayde.Controls.Canvas.ZIndexProperty, ChildWindow.MaxZIndex);
            ChildWindow.MaxZIndex++;
            this.SetValue(Fayde.Controls.Canvas.ZIndexProperty, ChildWindow.MaxZIndex);
        }

        private _GetChildControl(childName: string, type?: Function, parent?: Fayde.Controls.Panel): Fayde.DependencyObject {
            if (parent == null) {
                parent = <Fayde.Controls.Panel>Fayde.Application.Current.RootVisual;
            }
            if (parent != null) {
                var xamlObject = parent.Children.FindName(name);
                if (xamlObject != null) {
                    var xobj = xamlObject.XamlNode.XObject;
                    if (!type || (xobj instanceof type)) {
                        return <Fayde.DependencyObject>xobj;
                    }
                }
                var control = new type.prototype.constructor();
                parent.Children.Add(<Fayde.UIElement>control);
                return control;
            } else {
                throw new Exception("LayoutRoot Panel in the MainWindow is missing. Make sure to name the Root Panel in the MainWindow as LayoutRoot.");
            }
        }
    }

    TemplateParts(ChildWindow,
        { Name: "WindowBorder", Type: Border },
        { Name: "TitleBar", Type: Panel },
        { Name: "Header", Type: ContentControl },
        { Name: "Content", Type: ContentPresenter },
        { Name: "MaximizeButton", Type: Fayde.Controls.Primitives.ToggleButton },
        { Name: "MinimizeButton", Type: Fayde.Controls.Primitives.ButtonBase },
        { Name: "CloseButton", Type: Fayde.Controls.Primitives.ButtonBase });

    TemplateVisualStates(ChildWindow,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "Maximized" },
        { GroupName: "CommonStates", Name: "Minimized" });   
} 