import spinner from "../lib/Spin";
import {isEmpty} from "../utils/Utils";

const apiPath = "/api/";

let configuration = {};

function apiUrl(path) {
    return apiPath + path;
}

function validateResponse(showErrorDialog) {
    return res => {
        spinner.stop();

        if (!res.ok) {
            if (res.type === "opaqueredirect") {
                setTimeout(() => window.location.reload(true), 100);
                return res;
            }
            const error = new Error(res.statusText);
            error.response = res;

            if (showErrorDialog) {
                setTimeout(() => {
                    throw error;
                }, 250);
            }
            throw error;
        }
        return res;

    };
}

function validFetch(path, options, headers = {}, showErrorDialog = true) {
    const access_token = localStorage.getItem('access_token');
    const contentHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `bearer ${access_token}`,
        ...headers
    };
    const fetchOptions = Object.assign({}, {headers: contentHeaders}, options, {
        credentials: "same-origin",
        redirect: "manual",
    });
    spinner.start();

    const targetUrl = apiUrl(path);
    return fetch(targetUrl, fetchOptions)
        .catch(err => {
            spinner.stop();
            throw err;
        })
        .then(validateResponse(showErrorDialog));
}

function fetchJson(path, options = {}, headers = {}, showErrorDialog = true) {
    return validFetch(path, options, headers, showErrorDialog)
        .then(res => res.json());
}

function postPutJson(path, body, method) {
    return fetchJson(path, {method: method, body: JSON.stringify(body)});
}

//API
export function subscriptions(type) {
    return fetchJson("subscriptions?type=" + type);
}

export function organisations() {
    return fetchJson("crm/organisations");
}

export function products() {
    return fetchJson("products")
}

export function processes() {
    return fetchJson("processes");
}

export function process(id) {
    return fetchJson("processes/" + id);
}

export function startProcess(process) {
    return postPutJson("processes", process, "post");
}

export function resumeProcess(process) {
    return postPutJson("processes", process, "put");
}

export function reportError(error) {
    return postPutJson("user/error", error, "post");
}

export function ping() {
    return fetchJson("user/ping");
}

export function me() {
    return fetchJson("user/me", {}, {}, false);
}

export function config() {
    return isEmpty(configuration) ? fetchJson("user/config").then(conf => {
        configuration = conf;
        return Promise.resolve(conf);
    }) : Promise.resolve(configuration);
}

export function redirectToAuthorizationServer() {
    config().then(conf => {
        window.location.replace(
            `${conf.oauthAuthorizeUrl}?response_type=token&client_id=${conf.clientId}` +
            `&scope=${conf.scope.join("+")}&redirect_uri=${conf.redirectUri}`);

    });

}
