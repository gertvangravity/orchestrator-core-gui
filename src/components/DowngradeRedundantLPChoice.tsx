/*
 * Copyright 2019 SURF.
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

import React from "react";
import I18n from "i18n-js";
import PropTypes from "prop-types";
import { isEmpty } from "../utils/Utils";
import { getResourceTypeInfo, subscriptionsDetail, portByImsServiceId } from "../api/index";
import { enrichSubscription, productById } from "../utils/Lookups";
import { port_subscription_id, subscriptionInstanceValues } from "../validations/Subscriptions";

import "./DowngradeRedundantLPChoice.scss";
import CheckBox from "./CheckBox";
import {
    Product,
    Organization,
    SubscriptionWithDetails,
    FixedInput,
    IMSService,
    ServicePortSubscription
} from "../utils/types";

interface LRSubscription extends SubscriptionWithDetails, ServicePortSubscription {
    // Added by `enrichPrimarySubscription`
    nms_service_id_p?: string;
    nms_service_id_s?: string;
    nso_service_id_p?: string;
    nso_service_id_s?: string;
    service_speed: string;
}
interface PortSubscription extends LRSubscription {
    // Added by `enrichPortSubscription`
    ims_circuit_name: string;
    ims_node: string;
    ims_port: string;
    ims_iface_type: string;
    ims_patch_position: string;
    label: string;
    vlan: string;
}

function enrichPrimarySubscription(
    subscription: Partial<LRSubscription>,
    organisations: Organization[],
    products: Product[]
) {
    enrichSubscription(subscription, organisations, products);
    const product = productById(subscription.product_id!, products);
    const fi_domain = product.fixed_inputs.find((fi: FixedInput) => fi.name === "domain");

    const si_primary = subscription.instances!.find(si => si.label === "Primary");
    const si_secondary = subscription.instances!.find(si => si.label === "Secondary");

    let fi_service_speed;
    if (fi_domain!.value === "SURFNET8") {
        fi_service_speed = si_primary!.values.find(v => v.resource_type.resource_type === "service_speed");

        subscription.nso_service_id_p = si_primary!.values.find(
            v => v.resource_type.resource_type === "nso_service_id"
        )!.value;
        subscription.nso_service_id_s = si_secondary!.values.find(
            v => v.resource_type.resource_type === "nso_service_id"
        )!.value;
    } else {
        fi_service_speed = product.fixed_inputs.find((fi: FixedInput) => fi.name === "service_speed");

        subscription.nms_service_id_p = si_primary!.values.find(
            v => v.resource_type.resource_type === "nms_service_id"
        )!.value;
        subscription.nms_service_id_s = si_secondary!.values.find(
            v => v.resource_type.resource_type === "nms_service_id"
        )!.value;
    }
    subscription.service_speed = fi_service_speed ? fi_service_speed.value : "-";
}

function enrichPortSubscription(
    parentSubscription: SubscriptionWithDetails,
    subscription: Partial<PortSubscription>
): Promise<PortSubscription> {
    // fetch the label by subscription_id
    subscription.label = parentSubscription.instances.find(
        i =>
            (i.product_block.name === "Service Attach Point" ||
                i.product_block.name === "SN8 Light Path Service Attach Point") &&
            i.values.find(rt => rt.resource_type.resource_type === "port_subscription_id")!.value ===
                subscription.subscription_id
    )!.label;
    subscription.vlan = parentSubscription.instances
        .find(i => i.label === subscription.label)!
        .values.find(v => v.resource_type.resource_type === "vlanrange")!.value;
    const vc_label_part = subscription.label!.split("-")[0];
    const prim_sec_part = subscription.label!.split("-")[1] === "left" ? 0 : 1;
    const si = parentSubscription.instances.find(i => i.label === vc_label_part);
    const imsCircuitId = si!.values.find(v => v.resource_type.resource_type === "ims_circuit_id")!.value;
    const imsServicePromise = getResourceTypeInfo("ims_circuit_id", imsCircuitId);
    return new Promise((resolve, reject) => {
        imsServicePromise.then((result: any) => {
            let json = result.json as IMSService;
            portByImsServiceId(json.endpoints[prim_sec_part].id).then(imsPort => {
                subscription.ims_circuit_name = imsPort.line_name;
                subscription.ims_node = imsPort.node;
                subscription.ims_port = imsPort.port;
                subscription.ims_iface_type = imsPort.iface_type;
                subscription.ims_patch_position = imsPort.patchposition;
                resolve(subscription as PortSubscription);
            });
        });
    });
}

interface IProps {
    subscriptionId: string;
    organisations: Organization[];
    products: Product[];
    value: string;
    readOnly: boolean;
    onChange: (arg0: { target: { value: string } }) => {};
}

interface IState {
    subscription?: LRSubscription;
    childSubscriptions: SubscriptionWithDetails[];
    spPL?: PortSubscription;
    spPR?: PortSubscription;
    spSL?: PortSubscription;
    spSR?: PortSubscription;
    primarySelected: boolean;
}

export default class DowngradeRedundantLPChoice extends React.PureComponent<IProps, IState> {
    static propTypes: {};

    constructor(props: IProps) {
        super(props);
        this.state = {
            childSubscriptions: [],
            primarySelected: true
        };
    }

    componentWillMount() {
        const { subscriptionId, organisations, products } = this.props;
        subscriptionsDetail(subscriptionId).then(subscription => {
            enrichPrimarySubscription(subscription, organisations, products);
            this.setState({ subscription: subscription });
            const values = subscriptionInstanceValues(subscription);
            const portSubscriptionResourceTypes = values.filter(
                val => val.resource_type.resource_type === port_subscription_id
            );
            const promises = portSubscriptionResourceTypes.map(rt =>
                getResourceTypeInfo(port_subscription_id, rt.value)
            );
            Promise.all(promises).then(results => {
                const children: SubscriptionWithDetails[] = results.map((obj: any) => obj.json);
                children.forEach(sub => enrichSubscription(sub, organisations, products));
                const portPromises = children.map(sub => enrichPortSubscription(subscription, sub));
                Promise.all(portPromises).then((results: PortSubscription[]) => {
                    this.setState({
                        spPL: results.find(r => r.label.toLowerCase() === "primary-left"),
                        spPR: results.find(r => r.label.toLowerCase() === "primary-right"),
                        spSL: results.find(r => r.label.toLowerCase() === "secondary-left"),
                        spSR: results.find(r => r.label.toLowerCase() === "secondary-right")
                    });
                });
                this.setState({ childSubscriptions: children });
            });
        });
    }

    renderChild = (subscription: SubscriptionWithDetails, children: SubscriptionWithDetails[], label: string) => {
        const instance = subscription.instances.find(instance => instance.label.toLowerCase() === label);
        const child = children.find(child => instance!.values.find(value => value.value === child.subscription_id));
        return (
            <section className="subscription_child">
                <p className="child">{label}</p>
                <label className="title">{I18n.t("subscriptions.customer_name")}</label>
                <input type="text" readOnly={true} value={child!.customer_name} />
                <label className="title">{I18n.t("subscriptions.description")}</label>
                <input type="text" readOnly={true} value={child!.description} />
            </section>
        );
    };

    renderServicePort = (title: string, servicePort: PortSubscription) => {
        return (
            <tbody>
                <tr className="label">
                    <td colSpan={2}>{title}</td>
                </tr>
                {servicePort && this.renderValue("klant", servicePort.customer_name, 1)}
                {servicePort && servicePort.crm_port_id && this.renderValue("CRM port ID", servicePort.crm_port_id, 1)}
                {servicePort && servicePort.port_mode && this.renderValue("Port Mode", servicePort.port_mode, 1)}
                {servicePort && this.renderValue("IMS circuit name", servicePort.ims_circuit_name, 1)}
                {servicePort && this.renderValue("IMS node", servicePort.ims_node, 1)}
                {servicePort && this.renderValue("IMS port", servicePort.ims_port, 1)}
                {servicePort && this.renderValue("VLAN ID", servicePort.vlan, 1)}
                {servicePort && this.renderValue("interface type", servicePort.ims_iface_type, 1)}
                {servicePort && this.renderValue("patch position", servicePort.ims_patch_position, 1)}
                {servicePort &&
                    this.renderValue("port subscription", this.renderSubscriptionLink(servicePort.subscription_id), 1)}
            </tbody>
        );
    };

    renderValue = (name: string, value: JSX.Element | string, colspan: number) => {
        return (
            <tr>
                <td className="label">{name}</td>
                <td colSpan={colspan} className="value">
                    {value}
                </td>
            </tr>
        );
    };

    renderSubscriptionLink = (subscription_id: string) => {
        return (
            <a href={"/subscription/" + subscription_id} target="_blank" rel="noopener noreferrer">
                {subscription_id}
            </a>
        );
    };

    renderSubscription = (subscription: LRSubscription, children: SubscriptionWithDetails[]) => {
        if (isEmpty(children)) {
            return null;
        }
        const { spPL, spPR, spSL, spSR, primarySelected } = this.state;
        return (
            <section className="lightpaths">
                <div key={subscription.subscription_id} className={`form-container`}>
                    <div style={{ flexDirection: "column" }}>
                        <div className={"rlp_container"}>
                            <table className="rlp_heading">
                                <thead>
                                    <tr>
                                        <th colSpan={5}>
                                            <h3>{I18n.t("downgrade_redundant_lp.redundant_lightpath")}</h3>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderValue("klant", subscription.customer_name, 4)}
                                    {this.renderValue("protection", "redundant", 4)}
                                    {this.renderValue("speed", subscription.service_speed, 4)}
                                    {subscription.nms_service_id_p &&
                                        this.renderValue(
                                            "nms_service_id",
                                            subscription.nms_service_id_p + " en " + subscription.nms_service_id_s,
                                            4
                                        )}
                                    {subscription.nso_service_id_p &&
                                        this.renderValue(
                                            "nso_service_id",
                                            subscription.nso_service_id_p + " en " + subscription.nso_service_id_s,
                                            4
                                        )}
                                    {this.renderValue(
                                        "subscription",
                                        this.renderSubscriptionLink(subscription.subscription_id),
                                        4
                                    )}
                                    <tr>
                                        <td className="vspacer" colSpan={5} />
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className="border-off">
                                            <table className={primarySelected ? "highlight-on" : "highlight-off"}>
                                                <thead>
                                                    <tr>
                                                        <td>
                                                            <h3>Primary LP</h3>
                                                        </td>
                                                        <td>{subscription.nms_service_id_p}</td>
                                                    </tr>
                                                </thead>
                                                {this.renderServicePort("A1", spPL!)}
                                                {this.renderServicePort("B1", spPR!)}
                                            </table>
                                        </td>
                                        <td className="spacer" />
                                        <td colSpan={2}>
                                            <table className={primarySelected ? "highlight-off" : "highlight-on"}>
                                                <thead>
                                                    <tr>
                                                        <td>
                                                            <h3>Secondary LP</h3>
                                                        </td>
                                                        <td>{subscription.nms_service_id_s}</td>
                                                    </tr>
                                                </thead>
                                                {this.renderServicePort("A2", spSL!)}
                                                {this.renderServicePort("B2", spSR!)}
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    onChangeChoice = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const checked = target.checked;
        const isPrimary = target.name === "primary";
        this.setState({ primarySelected: isPrimary });
        const result = isPrimary ? (checked ? "Primary" : "Secondary") : checked ? "Secondary" : "Primary";
        this.props.onChange({ target: { value: result } });
    };

    renderChoice = () => {
        const { value, readOnly } = this.props;
        const primary = isEmpty(value) || value === "Primary";
        return (
            <section className="choice">
                <h3>{I18n.t("downgrade_redundant_lp.choice")}</h3>
                <CheckBox
                    name="primary"
                    value={primary}
                    onChange={this.onChangeChoice}
                    info={I18n.t("downgrade_redundant_lp.primary")}
                    readOnly={readOnly || false}
                />
                <CheckBox
                    name="secondary"
                    value={!primary}
                    onChange={this.onChangeChoice}
                    info={I18n.t("downgrade_redundant_lp.secondary")}
                    readOnly={readOnly || false}
                />
            </section>
        );
    };

    render() {
        const { childSubscriptions, subscription } = this.state;
        if (!subscription) {
            return null;
        }

        return (
            <div className="mod-downgrade-redundant-lp">
                {this.renderSubscription(subscription, childSubscriptions)}
                {this.renderChoice()}
            </div>
        );
    }
}

DowngradeRedundantLPChoice.propTypes = {
    organisations: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    subscriptionId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    readOnly: PropTypes.bool
};
