import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    FileItem,
    NxFileUploader,
    NxFileUploadResult,
} from '@aposin/ng-aquila/file-uploader';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';

export const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader template-driven example */
@Component({
    selector: 'file-uploader-template-driven-example',
    templateUrl: './file-uploader-template-driven-example.html',
    styleUrls: ['./file-uploader-template-driven-example.css'],
})
export class FileUploaderTemplateDrivenExampleComponent {
    myFiles: FileItem[] = [];
    uploader: NxFileUploader;
    uploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
    };

    constructor(
        private messageToastService: NxMessageToastService,
        private http: HttpClient,
    ) {
        this.uploader = new NxFileUploader(this.uploadConfig, this.http);

        this.uploader.response.subscribe((result: NxFileUploadResult) => {
            if (result.success) {
                this.messageToastService.open(
                    'All files were uploaded successfully!',
                    myCustomConfig,
                );
            } else if (result.error) {
                // error handling
                console.log(result.error);
            }
        });
    }
}
