export interface IConfig {
    path: string;
    name: string;
    sha: string;
    content?: string;
    type: string;
    size: number;
    url: string;
    git_url: string;
    html_url: string;
    download_url?: string;
    dataPartnerName?: string;
    feedName?: string;
}

export default class Config {
    private _dataPartnerName: string;
    private _feedName: string;
    constructor(config: IConfig) {
        for (const name in config) {
            if (config.hasOwnProperty(name)) {
                this[name] = config[name];
            }
        }
        if (config.name) {
            const fileInfo = config.name.split('_');
            // first word before underscore
            this._dataPartnerName = fileInfo.shift();
            // join all word after first underscope to file extension
            this._feedName = fileInfo.join('_').split('.')[0];
        }
    }

    public get dataPartnerName() {
        return this._dataPartnerName;
    }

    public get feedName() {
        return this._dataPartnerName;
    }

    public get content() {
        return this.content || '';
    }
}
