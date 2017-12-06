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
        console.log("Access token");
        console.log(this._accessToken);
    }
    public async getAccessToken(clientId: string, clientSecret: string, code: string): Promise<IAccessToken> {
        const params = { client_id: clientId, client_secret: clientSecret, code: code };
        const url = `${this.baseAuthUrl}/login/oauth/access_token`;
        const accessToken: any = await requestExecutor('post', url, params, null);

        this._accessToken = accessToken.access_token;

        return accessToken as IAccessToken;
    }
    public async getBranches(repoOwner: string, repoName: string): Promise<IBranch[]> {
        console.log("Access token");
        console.log(this._accessToken);

        const params = { access_token: this._accessToken };
        const url = `${this.baseAPIUrl}/repos/${repoOwner}/${repoName}/branches`;
        const branches = await requestExecutor('get', url, params, null);
        return branches as IBranch[];
    }
    public async getContents(repoOwner: string, repoName: string, path: string, branchName: string): Promise<IFile[]> {
        console.log("Access token");
        console.log(this._accessToken);

        const params = { access_token: this._accessToken, ref: branchName };
        const url = `${this.baseAPIUrl}/repos/${repoOwner}/${repoName}/contents/${path}`;
        const files = await requestExecutor('get', url, params, null);
        return files as IFile[];
    }

    public async updateContents(repoOwner: string,
        repoName: string,
        path: string,
        branchName: string,
        fileContents: string,
        fileSha: string): Promise<void> {
        const params = { access_token: this._accessToken };
        const url = `${this.baseAPIUrl}/repos/${repoOwner}/${repoName}/contents/${path}`;
        
        var base64EncodedContent: string = btoa(fileContents);

        var data = {
            "message": "my commit message",
            "committer": {
                "name": "Ram anam",
                "email": "ram@introp.net"
            },
            "content": base64EncodedContent,
            "sha": fileSha,
            "branch": branchName
        };

        const result: any = await requestExecutor('put', url, params, data);
    }

    public async putContents() {

    }
}
