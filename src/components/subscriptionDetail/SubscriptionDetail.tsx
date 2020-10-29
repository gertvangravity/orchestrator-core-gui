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

import "./SubscriptionDetail.scss";

import {
    dienstafnameBySubscription,
    parentSubscriptions,
    processSubscriptionsBySubscriptionId,
    productById,
    subscriptionWorkflows,
    subscriptionsDetailWithModel
} from "api";
import CheckBox from "components/CheckBox";
import NetworkDiagram from "components/Diagram";
import SubscriptionDetails from "components/subscriptionDetail/SubscriptionDetails";
import SubscriptionInstance from "components/subscriptionDetail/SubscriptionInstance";
import I18n from "i18n-js";
import { isArray } from "lodash";
import React from "react";
import ApplicationContext from "utils/ApplicationContext";
import { enrichSubscription, organisationNameByUuid, renderDate, renderDateTime } from "utils/Lookups";
import {
    Dienstafname,
    Product,
    Subscription,
    SubscriptionModel,
    SubscriptionProcesses,
    SubscriptionWithDetails,
    WorkflowReasons
} from "utils/types";
import { applyIdNamingConvention, isEmpty, stop } from "utils/Utils";

interface IProps {
    subscriptionId: string;
    confirmation?: (question: string, action: (e: React.MouseEvent) => void) => void;
}

interface IState {
    subscription?: SubscriptionModel;
    product?: Product;
    subscriptionProcesses?: SubscriptionProcesses[];
    notFound: boolean;
    workflows?: WorkflowReasons;
    parentSubscriptions?: SubscriptionWithDetails[];
    dienstafname?: Dienstafname;
}

function SubscriptionDetailSection({
    name,
    children,
    className = ""
}: React.PropsWithChildren<{
    name: string;
    className?: string;
}>) {
    return (
        <section className="details">
            <h2>{I18n.t(name)}</h2>
            <div className={className}>{children}</div>
        </section>
    );
}

export default class SubscriptionDetail extends React.PureComponent<IProps, IState> {
    context!: React.ContextType<typeof ApplicationContext>;

    state: IState = {
        notFound: false
    };

    componentDidMount = () => {
        this.refreshSubscription(this.props.subscriptionId);
    };

    refreshSubscription(subscriptionId: string) {
        const { organisations, products } = this.context;

        const promises = [
            subscriptionsDetailWithModel(subscriptionId),
            processSubscriptionsBySubscriptionId(subscriptionId),
            subscriptionWorkflows(subscriptionId),
            parentSubscriptions(subscriptionId),
            dienstafnameBySubscription(subscriptionId)
        ];

        Promise.all<
            SubscriptionModel | SubscriptionProcesses[] | WorkflowReasons | Subscription[] | Dienstafname | undefined
        >(promises)
            .then(
                //@ts-ignore
                (
                    result: [
                        SubscriptionModel,
                        SubscriptionProcesses[],
                        WorkflowReasons,
                        Subscription[],
                        Dienstafname | undefined
                    ]
                ) => {
                    // Enrich parent subscriptions
                    let parentSubscriptions = result[3].map((sub: Subscription) =>
                        enrichSubscription(sub, organisations, products)
                    );
                    result[0].product_id = result[0].product.product_id;
                    const enrichedSubscription = enrichSubscription(result[0], organisations, products);

                    this.setState({
                        subscription: enrichedSubscription,
                        subscriptionProcesses: result[1],
                        workflows: result[2],
                        dienstafname: result[4],
                        parentSubscriptions: parentSubscriptions
                    });

                    productById(result[0].product_id).then(product => this.setState({ product: product }));
                }
            )
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    this.setState({ notFound: true });
                } else {
                    throw err;
                }
            });
    }

    componentDidUpdate(prevProps: IProps) {
        const prevId = prevProps.subscriptionId;
        const id = this.props.subscriptionId;
        if (prevId !== id) {
            this.refreshSubscription(id);
            window.scrollTo(0, 0);
        }
    }

    terminate = (subscription: SubscriptionModel) => (e: React.MouseEvent<HTMLElement>) => {
        stop(e);
        this.props.confirmation!(
            I18n.t("subscription.terminateConfirmation", {
                name: subscription.product.name,
                customer: organisationNameByUuid(subscription.customer_id, this.context.organisations)
            }),
            () => this.context.redirect(`/terminate-subscription?subscription=${subscription.subscription_id}`)
        );
    };

    modify = (subscription: SubscriptionModel, workflow_name: string) => (e: React.MouseEvent<HTMLElement>) => {
        stop(e);
        const change = I18n.t(`workflow.${workflow_name}`).toLowerCase();
        this.props.confirmation!(
            I18n.t("subscription.modifyConfirmation", {
                name: subscription.product.name,
                customer: organisationNameByUuid(subscription.customer_id, this.context.organisations),
                change: change
            }),
            () =>
                this.context.redirect(
                    `/modify-subscription?workflow=${workflow_name}&subscription=${subscription.subscription_id}`
                )
        );
    };

    renderDienstafname = () => {
        if (!this.state.dienstafname) {
            return null;
        }

        return (
            <SubscriptionDetailSection name="subscriptions.dienstafname" className="subscription-service">
                <table className={"detail-block"}>
                    <thead />
                    <tbody>
                        <tr>
                            <td>{I18n.t("subscriptions.dienstafnameGuid")}</td>
                            <td>{this.state.dienstafname.guid}</td>
                        </tr>
                        <tr>
                            <td>{I18n.t("subscriptions.dienstafnameCode")}</td>
                            <td>{this.state.dienstafname.code}</td>
                        </tr>
                        <tr>
                            <td>{I18n.t("subscriptions.dienstafnameStatus")}</td>
                            <td>{this.state.dienstafname.status}</td>
                        </tr>
                    </tbody>
                </table>
            </SubscriptionDetailSection>
        );
    };

    renderSubscriptions = (parentSubscriptions: SubscriptionWithDetails[], subscription: Subscription) => {
        if (isEmpty(parentSubscriptions)) {
            return null;
        }

        const columns = [
            "customer_name",
            "subscription_id",
            "description",
            "insync",
            "product_name",
            "status",
            "product_tag",
            "start_date"
        ];
        const th = (index: number) => {
            const name = columns[index];
            return (
                <th key={index} className={name}>
                    <span>{I18n.t(`subscriptions.${name}`)}</span>
                </th>
            );
        };
        return (
            <SubscriptionDetailSection
                name="subscription.parent_subscriptions"
                className="subscription-parent-subscriptions"
            >
                <table className="subscriptions">
                    <thead>
                        <tr>{columns.map((column, index) => th(index))}</tr>
                    </thead>
                    <tbody>
                        {parentSubscriptions.map((subscription: SubscriptionWithDetails, index: number) => (
                            <tr key={index}>
                                <td data-label={I18n.t("subscriptions.customer_name")} className="customer_name">
                                    {subscription.customer_name}
                                </td>
                                <td data-label={I18n.t("subscriptions.subscription_id")} className="subscription_id">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`/subscriptions/${subscription.subscription_id}`}
                                    >
                                        {subscription.subscription_id.substring(0, 8)}
                                    </a>
                                </td>
                                <td data-label={I18n.t("subscriptions.description")} className="description">
                                    {subscription.description}
                                </td>
                                <td data-label={I18n.t("subscriptions.insync")} className="insync">
                                    <CheckBox value={subscription.insync} name="insync" readOnly={true} />
                                </td>
                                <td data-label={I18n.t("subscriptions.product_name")} className="product_name">
                                    {subscription.product.name}
                                </td>
                                <td data-label={I18n.t("subscriptions.status")} className="status">
                                    {subscription.status}
                                </td>
                                <td data-label={I18n.t("subscriptions.product_tag")} className="tag">
                                    {subscription.product.tag}
                                </td>
                                <td data-label={I18n.t("subscriptions.start_date_epoch")} className="start_date_epoch">
                                    {renderDate(subscription.start_date)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </SubscriptionDetailSection>
        );
    };

    renderProduct = (product?: Product) => {
        if (!product) {
            return null;
        }
        return (
            <SubscriptionDetailSection name="subscription.product_title" className="subscription-product-information">
                <table className="detail-block">
                    <thead />
                    <tbody>
                        <tr>
                            <td id="sub-prod-name-k">{I18n.t("subscription.product.name")}</td>
                            <td id="sub-prod-name-v">
                                <a target="_blank" rel="noopener noreferrer" href={`/product/${product.product_id}`}>
                                    {product.name || ""}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td id="description-k">{I18n.t("subscription.product.description")}</td>
                            <td id="description-v">{product.description}</td>
                        </tr>
                        <tr>
                            <td id="product-type-k">{I18n.t("subscription.product.product_type")}</td>
                            <td id="product-type-v">{product.product_type}</td>
                        </tr>
                        <tr>
                            <td id="tag-k">{I18n.t("subscription.product.tag")}</td>
                            <td id="tag-v">{product.tag || ""}</td>
                        </tr>
                        <tr>
                            <td id="status-k">{I18n.t("subscription.product.status")}</td>
                            <td id="status-v">{product.status || ""}</td>
                        </tr>
                        <tr>
                            <td id="created-k">{I18n.t("subscription.product.created")}</td>
                            <td id="created-v">{renderDateTime(product.created_at)}</td>
                        </tr>
                        <tr>
                            <td id="end-date-k">{I18n.t("subscription.product.end_date")}</td>
                            <td id="end-date-v">{renderDateTime(product.end_date)}</td>
                        </tr>
                    </tbody>
                </table>
            </SubscriptionDetailSection>
        );
    };

    renderActions = (subscription: SubscriptionModel, workflows: WorkflowReasons) => {
        return (
            <SubscriptionDetailSection name="subscription.actions" className="subscription-actions">
                <table className="detail-block">
                    <thead />
                    <tbody>
                        {workflows.terminate.map((wf, index: number) => (
                            <tr key={index}>
                                <td id={`${index}-k`}>
                                    {!wf.reason && (
                                        <a
                                            id="terminate-link"
                                            href="/modify"
                                            key={wf.name}
                                            onClick={this.terminate(subscription)}
                                        >
                                            {I18n.t(`subscription.terminate`)}
                                        </a>
                                    )}
                                    {wf.reason && <span>{I18n.t(`subscription.terminate`)}</span>}
                                </td>
                                <td id={`${index}-v`}>
                                    {wf.reason && <em className="error">{I18n.t(wf.reason, wf)}</em>}
                                </td>
                            </tr>
                        ))}
                        {isEmpty(workflows.terminate) && (
                            <tr>
                                <td>
                                    <em className="error">{I18n.t("subscription.no_termination_workflow")}</em>
                                </td>
                            </tr>
                        )}
                        {workflows.modify.map((wf, index: number) => (
                            <tr key={index}>
                                <td>
                                    {!wf.reason && (
                                        <a
                                            id={`modify-link-${wf.name.replace(/_/g, "-")}`}
                                            href="/modify"
                                            key={wf.name}
                                            onClick={this.modify(subscription, wf.name)}
                                        >
                                            {I18n.t(`workflow.${wf.name}`)}
                                        </a>
                                    )}
                                    {wf.reason && <span>{I18n.t(`workflow.${wf.name}`)}</span>}
                                </td>
                                <td>{wf.reason && <em className="error">{I18n.t(wf.reason, wf)}</em>}</td>
                            </tr>
                        ))}
                        {isEmpty(workflows.modify) && (
                            <tr>
                                <td>
                                    <em className="error">{I18n.t("subscription.no_modify_workflow")}</em>
                                </td>
                            </tr>
                        )}
                        {workflows.system.map((wf, index: number) => (
                            <tr key={index}>
                                <td>
                                    {!wf.reason && (
                                        <a
                                            id={`validate-link-${wf.name.replace(/_/g, "-")}`}
                                            href="/modify"
                                            key={wf.name}
                                            onClick={this.modify(subscription, wf.name)}
                                        >
                                            {I18n.t(`workflow.${wf.name}`)}
                                        </a>
                                    )}
                                    {wf.reason && <span>{I18n.t(`workflow.${wf.name}`)}</span>}
                                </td>
                                <td>{wf.reason && <em className="error">{I18n.t(wf.reason, wf)}</em>}</td>
                            </tr>
                        ))}
                        {isEmpty(workflows.system) && (
                            <tr>
                                <td>
                                    <em className="error">{I18n.t("subscription.no_validate_workflow")}</em>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </SubscriptionDetailSection>
        );
    };

    renderProcesses = (subscriptionProcesses: SubscriptionProcesses[]) => {
        const columns = ["target", "name", "id", "status", "started_at", "modified_at"];

        const th = (index: number) => {
            const name = columns[index];
            return (
                <th key={index} className={name}>
                    <span>{I18n.t(`subscription.process.${name}`)}</span>
                </th>
            );
        };

        subscriptionProcesses = subscriptionProcesses.filter(sp => !sp.process.is_task);

        return (
            <SubscriptionDetailSection name="subscription.process_link" className="subscription-processes">
                <table className="processes">
                    <thead>
                        <tr>{columns.map((column, index) => th(index))}</tr>
                    </thead>
                    <tbody>
                        {subscriptionProcesses.map((ps, index) => (
                            <tr key={index}>
                                <td>{ps.workflow_target}</td>
                                <td>{ps.process.workflow}</td>
                                <td>
                                    <a target="_blank" rel="noopener noreferrer" href={`/processes/${ps.pid}`}>
                                        {ps.pid}
                                    </a>
                                </td>
                                <td>{ps.process.last_status}</td>
                                <td>{renderDateTime(ps.process.started_at)}</td>
                                <td>{renderDateTime(ps.process.last_modified_at)}</td>
                            </tr>
                        ))}
                        {isEmpty(subscriptionProcesses) && (
                            <tr>
                                <td colSpan={3}>
                                    <span className="no_process_link">
                                        {I18n.t("subscription.no_process_link_text")}
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </SubscriptionDetailSection>
        );
    };

    renderFixedInputs = (product?: Product) => {
        if (!product || !product.fixed_inputs.length) {
            return null;
        }
        return (
            <SubscriptionDetailSection name="subscriptions.fixedInputs" className="subscription-fixed-inputs">
                <table className="detail-block">
                    <thead />
                    <tbody>
                        {product.fixed_inputs
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((fi, index) => (
                                <tr key={index}>
                                    <td id={`${applyIdNamingConvention(fi.name)}-k`}>{fi.name}</td>
                                    <td id={`${applyIdNamingConvention(fi.name)}-v`}>{fi.value}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </SubscriptionDetailSection>
        );
    };

    renderDiagram = (subscription: SubscriptionModel) => {
        const { organisations, products } = this.context;
        const enrichedSubscription = enrichSubscription(subscription, organisations, products);

        return <NetworkDiagram type="patchpanel" subscription={enrichedSubscription} />;
    };

    render() {
        const { notFound, subscription, subscriptionProcesses, product, parentSubscriptions, workflows } = this.state;

        const subscription_instances = Object.entries(subscription ?? {})
            .filter(
                entry =>
                    typeof entry[1] === "object" &&
                    !["product", "customer_descriptions"].includes(entry[0]) &&
                    entry[1] !== null
            )
            .map(entry => entry[1])
            .flatMap(entry => (isArray(entry) ? entry : [entry]));

        if (!subscription || !workflows || !subscriptionProcesses || !parentSubscriptions) {
            return null;
        }

        if (notFound) {
            return <h2>{I18n.t("subscription.notFound")}</h2>;
        }

        return (
            <div className="mod-subscription-detail">
                <SubscriptionDetailSection name="subscription.subscription_title" className="subscription-details">
                    <SubscriptionDetails
                        subscription={subscription}
                        subscriptionProcesses={subscriptionProcesses}
                    ></SubscriptionDetails>
                </SubscriptionDetailSection>

                {this.renderDiagram(subscription)}
                {this.renderDienstafname()}
                {this.renderFixedInputs(product)}

                {subscription_instances && (
                    <SubscriptionDetailSection
                        name="subscriptions.productBlocks"
                        className="subscription-product-blocks"
                    >
                        {subscription_instances.map((instance, index) => (
                            <SubscriptionInstance
                                //@ts-ignore
                                key={index}
                                subscription_instance={instance}
                            />
                        ))}
                    </SubscriptionDetailSection>
                )}
                {this.props.confirmation && this.renderActions(subscription, workflows)}
                {this.renderProduct(product)}
                {this.renderProcesses(subscriptionProcesses)}
                {this.renderSubscriptions(parentSubscriptions, subscription!)}
            </div>
        );
    }
}

SubscriptionDetail.contextType = ApplicationContext;
