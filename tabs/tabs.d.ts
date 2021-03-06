import { ModuleWithProviders, NgZone, EventEmitter, QueryList, TemplateRef, ViewContainerRef, OnInit, AnimationTransitionEvent, ElementRef, Renderer } from '@angular/core';
import { TemplatePortal, PortalHostDirective, Dir, LayoutDirection } from '../core';
import { MdTabLabel } from './tab-label';
import { MdTabLabelWrapper } from './tab-label-wrapper';
import { MdInkBar } from './ink-bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/** A simple change event emitted on focus or selection changes. */
export declare class MdTabChangeEvent {
    index: number;
    tab: MdTab;
}
export declare class MdTab implements OnInit {
    private _viewContainerRef;
    /** Content for the tab label given by <template md-tab-label>. */
    templateLabel: MdTabLabel;
    /** Template inside the MdTab view that contains an <ng-content>. */
    _content: TemplateRef<any>;
    /** The plain text label for the tab, used when there is no template label. */
    textLabel: string;
    private _contentPortal;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    private _disabled;
    disabled: boolean;
    readonly content: TemplatePortal;
}
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
export declare class MdTabGroup {
    private _zone;
    private _renderer;
    _tabs: QueryList<MdTab>;
    _labelWrappers: QueryList<MdTabLabelWrapper>;
    _inkBar: QueryList<MdInkBar>;
    _tabBodyWrapper: ElementRef;
    private _isInitialized;
    /** Snapshot of the height of the tab body wrapper before another tab is activated. */
    private _tabBodyWrapperHeight;
    /** Whether the tab group should grow to the size of the active tab */
    private _dynamicHeight;
    dynamicHeight: boolean;
    /** The index of the active tab. */
    private _selectedIndex;
    selectedIndex: number;
    /** Output to enable support for two-way binding on `selectedIndex`. */
    readonly selectedIndexChange: Observable<number>;
    private _onFocusChange;
    readonly focusChange: Observable<MdTabChangeEvent>;
    private _onSelectChange;
    readonly selectChange: Observable<MdTabChangeEvent>;
    private _focusIndex;
    private _groupId;
    constructor(_zone: NgZone, _renderer: Renderer);
    /**
     * Waits one frame for the view to update, then updates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop
     * TODO: internal
     */
    ngAfterViewChecked(): void;
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    isValidIndex(index: number): boolean;
    /** Tells the ink-bar to align itself to the current label wrapper */
    private _updateInkBar();
    /**
     * Reference to the current label wrapper; defaults to null for initial render before the
     * ViewChildren references are ready.
     */
    private readonly _currentLabelWrapper;
    /** Tracks which element has focus; used for keyboard navigation */
    /** When the focus index is set, we must manually send focus to the correct label */
    focusIndex: number;
    handleKeydown(event: KeyboardEvent): void;
    /**
     * Moves the focus left or right depending on the offset provided.  Valid offsets are 1 and -1.
     */
    moveFocus(offset: number): void;
    /** Increment the focus index by 1 until a valid tab is found. */
    focusNextTab(): void;
    /** Decrement the focus index by 1 until a valid tab is found. */
    focusPreviousTab(): void;
    private _createChangeEvent(index);
    /** Returns a unique id for each tab label element */
    _getTabLabelId(i: number): string;
    /** Returns a unique id for each tab content element */
    _getTabContentId(i: number): string;
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    _setTabBodyWrapperHeight(tabHeight: number): void;
    /** Removes the height of the tab body wrapper. */
    _removeTabBodyWrapperHeight(): void;
}
export declare type MdTabBodyActiveState = 'left' | 'center' | 'right';
export declare class MdTabBody implements OnInit {
    private _elementRef;
    private _dir;
    /** The portal host inside of this container into which the tab body content will be loaded. */
    _portalHost: PortalHostDirective;
    /** Event emitted when the tab begins to animate towards the center as the active tab. */
    onTabBodyCentering: EventEmitter<number>;
    /** Event emitted when the tab completes its animation towards the center. */
    onTabBodyCentered: EventEmitter<void>;
    /** The tab body content to display. */
    _content: TemplatePortal;
    /** The shifted index position of the tab body, where zero represents the active center tab. */
    _position: MdTabBodyActiveState;
    position: number;
    constructor(_elementRef: ElementRef, _dir: Dir);
    ngOnInit(): void;
    _onTranslateTabStarted(e: AnimationTransitionEvent): void;
    _onTranslateTabComplete(e: AnimationTransitionEvent): void;
    /** The text direction of the containing app. */
    getLayoutDirection(): LayoutDirection;
}
export declare class MdTabsModule {
    static forRoot(): ModuleWithProviders;
}
