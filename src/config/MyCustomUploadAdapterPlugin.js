import { axiosClientWithToken } from "apis/axiosClient";

export class MyUploadAdapter {
    constructor(loader, token) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;
        this.token = 'Bearer ' + token;
        // URL where to send files.
        this.url = process.env.REACT_APP_BASEURL + 'api/upload/image';
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                //this._initRequest();
                //this._initListeners( resolve, reject, file );
                this._sendRequest(file, resolve, reject);
            }));
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', this.url, true);
        xhr.setRequestHeader("Authorization", this.token);
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;
        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest(file, resolve, reject) {
        const genericErrorText = 'Couldn\'t upload file:' + ` ${file.name}.`;
        const data = new FormData();

        data.append('upload', file);

        //this.xhr.send( data );

        axiosClientWithToken.post('/upload/image', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                resolve({ default: res.data?.url });
            })
            .catch(err => reject(genericErrorText)
            )

    }
}

export default function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}