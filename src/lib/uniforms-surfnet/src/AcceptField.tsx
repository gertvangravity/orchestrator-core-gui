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
import "./AcceptField.scss";

import CheckBox from "components/CheckBox";
import I18n, { TranslateOptions } from "i18n-js";
import React, { useReducer } from "react";
import { connectField } from "uniforms";

import { FieldProps } from "./types";

type AcceptItemType =
    | "info"
    | "label"
    | "warning"
    | "url"
    | "checkbox"
    | ">checkbox"
    | "checkbox?"
    | ">checkbox?"
    | "skip"
    | "margin"
    | "value";
type AcceptItem = [string, AcceptItemType, TranslateOptions?];
type AcceptValue = "SKIPPED" | "ACCEPTED" | "INCOMPLETE";

export type AcceptFieldProps = FieldProps<AcceptValue, { data?: AcceptItem[] }>;

interface AcceptState {
    checks: { [index: number]: boolean };
    skip: boolean;
    allChecked: boolean;
}

interface Action {
    field: number;
    type: string;
    value: boolean;
}

function Accept({
    disabled,
    id,
    name,
    onChange,
    value,
    error,
    showInlineError,
    errorMessage,
    data,
    ...props
}: AcceptFieldProps) {
    const legacy = !data;
    const i18nBaseKey = data ? `forms.fields.${name}_accept` : "forms.fields";

    data = data ?? [
        [name, "label", {}],
        [`${name}_info`, "info", {}],
        [name, "checkbox", {}]
    ];

    let [state, dispatch] = useReducer(
        (state: AcceptState, action: Action) => {
            if (action.type === "skip") {
                state.skip = action.value;
                state.checks = {};
            } else {
                state.checks[action.field] = action.value;
            }

            // We intentionally skip optional checkboxes here
            state.allChecked = data!
                .map(
                    (entry: AcceptItem, index: number) => [entry, state.checks[index] || false] as [AcceptItem, boolean]
                )
                .filter((entry: [AcceptItem, boolean]) => entry[0][1].endsWith("checkbox"))
                .map((entry: [AcceptItem, boolean]) => entry[1])
                .every((check: boolean) => check);

            onChange(state.skip ? "SKIPPED" : state.allChecked ? "ACCEPTED" : "INCOMPLETE");

            return { ...state };
        },
        { checks: {}, skip: false, allChecked: false }
    );

    return (
        <section id={id} className="accept-field">
            {data.map((entry: any[], index: number) => {
                const label = I18n.t(`${i18nBaseKey}.${entry[0]}`, entry[2]);

                switch (entry[1]) {
                    case "label":
                        return (
                            <div key={index}>
                                <label>{label}</label>
                            </div>
                        );
                    case "info":
                        return (
                            <div key={index}>
                                <em>{label}</em>
                            </div>
                        );
                    case "url":
                        return (
                            <div key={index}>
                                <a href={entry[0]} target="_blank" rel="noopener noreferrer">
                                    {entry[0]}
                                </a>
                            </div>
                        );
                    case "value":
                        return (
                            <div key={index}>
                                <input value={entry[0]} disabled={true} />
                            </div>
                        );
                    case "margin":
                        return <br />;
                    case "warning":
                        return (
                            <div key={index}>
                                <label className="warning">{label}</label>
                            </div>
                        );
                    case "skip":
                        return (
                            <CheckBox
                                key={index}
                                name={entry[0]}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    const target = e.target as HTMLInputElement;
                                    dispatch({ field: index, type: "skip", value: target.checked });
                                }}
                                value={state.skip}
                                info={label}
                                className={"skip"}
                            />
                        );
                    default:
                        return (
                            <CheckBox
                                key={index}
                                name={entry[0] + (legacy ? "" : index)} // Index needed to allow checkboxes with same name (we can skip this in legacy mode)
                                className={entry[1].startsWith(">") ? "level_2" : undefined}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    const target = e.target as HTMLInputElement;

                                    dispatch({ field: index, type: "check", value: target.checked });
                                }}
                                value={state.checks[index]}
                                info={label}
                                readOnly={state.skip || disabled}
                            />
                        );
                }
            })}

            {error && showInlineError && (
                <em className="error">
                    <div className="backend-validation">{errorMessage}</div>
                </em>
            )}
        </section>
    );
}

export default connectField(Accept);
