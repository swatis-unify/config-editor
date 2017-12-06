import * as _ from 'lodash';
import requestExecutor from './requestExecutor';

interface IBranch {
    name: string;
    commit: any;
}

interface IFile {
    type: string;
    name: string;
    path: string;
    sha: string;
    size: number;
    download_url?: string;
    git_url: string;
    html_url: string;
    url: string;
    _links: any;
}

interface IAccessToken {
    access_token: string;
    scope: string;
    token_type: string;
}

export default class Github {
    private baseAPIUrl: string = 'https://api.github.com';
    private baseAuthUrl: string = 'https://github.com';
    private _accessToken: string;
    private static _instance: Github;

    public static get instance(): Github {
        if (_.isNil(Github._instance)) {
            Github._instance = new Github();
        }
        return Github._instance;
    }

    public set accessToken(token) {
        this._accessToken = token;
    }
    public async getAccessToken(clientId: string, clientSecret: string, code: string): Promise<IAccessToken> {
        const params = { client_id: clientId, client_secret: clientSecret, code: code };
        const url = `${this.baseAuthUrl}/login/oauth/access_token`;
        const accessToken: any = await requestExecutor('post', url, params, null);
        this.accessToken = accessToken.access_token;
        return accessToken as IAccessToken;
    }
    public async getBranches(repoOwner: string, repoName: string): Promise<IBranch[]> {
        const params = { access_token: this._accessToken };
        const url = `${this.baseAPIUrl}/repos/${repoOwner}/${repoName}/branches`;
        const branches = await requestExecutor('get', url, params, null);
        return branches as IBranch[];
    }
    public async getConfig(url: string): Promise<any[]> {
        const params = { access_token: this._accessToken };
        const config = await requestExecutor('get', url, params, null);
        return config as any[];
    }
    public async getContents(repoOwner: string, repoName: string, path: string, branchName: string): Promise<IFile[]> {
        const data = [];
        const calls: Promise<any>[] = [];
        const params = { access_token: this._accessToken, ref: branchName };
        const url = `${this.baseAPIUrl}/repos/${repoOwner}/${repoName}/contents/${path}`;
        const files = await requestExecutor('get', url, params, null);
        return files as IFile[];
        // return requestExecutor('get', url, params, null).then(async (files: IFile[]) => {
        //     _.forEach(files, (file: IFile) => {
        //         if (file.download_url) {
        //             calls.push(requestExecutor('get', files[0].download_url, null, null).then((result) => data.push(result)));
        //         }
        //     });
        //     return Promise.all(calls).then(() => {
        //         return data;
        //     });
        // });
    }
}
