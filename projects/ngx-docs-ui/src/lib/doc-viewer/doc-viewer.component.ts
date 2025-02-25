import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Input, Output, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'nxv-doc-viewer',
    template: 'Loading document...',
    styleUrls: ['./doc-viewer.component.css'],
})
export class DocViewerComponent {
    private _loadedContent: any;
    @Output() contentLoaded = new EventEmitter<any>();

    constructor(
        private _appRef: ApplicationRef,
        private _http: HttpClient,
        private _elementRef: ElementRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _viewContainerRef: ViewContainerRef,
        private _injector: Injector,
    ) {}

    private _fetchDocument(url: string) {
        const httpRequest$ = this._http.get(url, { responseType: 'text' });

        httpRequest$.subscribe(
            document => this.updateContent(document),
            error => this.handleError(url, error),
        );
    }

    updateContent(content: string) {
        if (content) {
            this._elementRef.nativeElement.innerHTML = content;
        } else {
            const codeType = this.id ? this.id : 'code';
            this._elementRef.nativeElement.innerHTML = `<span class="hljs-comment">/** no ${codeType} available for this example. */</span>`;
        }
        this._loadedContent = this._elementRef.nativeElement.textContent;
        this.contentLoaded.emit();
    }

    get content() {
        return this._loadedContent;
    }

    get id() {
        return this._elementRef.nativeElement.id;
    }

    handleError(url: string, error: any) {
        console.log('error', url, error);
    }

    @Input()
    set fileUrl(url: string) {
        this._fetchDocument(url);
    }
}
