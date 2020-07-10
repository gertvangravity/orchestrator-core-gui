/*
 * Copyright 2019-2020 SURF.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
interface Window {
    __env__: {
        BACKEND_URL: string;
        OAUTH2_ENABLED: string;
        OAUTH2_OPENID_CONNECT_URL: string;
        OAUTH2_CLIENT_ID: string;
        OAUTH2_SCOPE: string;
        CHECK_STATUS_INTERVAL: number;
    };
}

// We normally load env from window.__env__ as defined in public/env.js which
// is generated on server startup (see Dockerfile) for development we fall back to process.env
// @ts-ignore
export const ENV = window.__env__ || {
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    OAUTH2_ENABLED: ["true", "1", "yes", "on"].includes(
        (process.env.REACT_APP_OAUTH2_ENABLED || "true").toLocaleLowerCase()
    ),
    OAUTH2_OPENID_CONNECT_URL: process.env.REACT_APP_OAUTH2_OPENID_CONNECT_URL,
    OAUTH2_CLIENT_ID: process.env.REACT_APP_OAUTH2_CLIENT_ID,
    OAUTH2_SCOPE: process.env.REACT_APP_OAUTH2_SCOPE,
    CHECK_STATUS_INTERVAL: parseInt(process.env.REACT_APP_CHECK_STATUS_INTERVAL ?? "0")
};
