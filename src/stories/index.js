import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {Button, Welcome} from '@storybook/react/demo';
import SubscriptionProductTagSelect from "../components/SubscriptionProductTagSelect";
import "../pages/App.scss"
import "./storybook.scss"
import GenericSelect from "../components/GenericSelect";
import TableSummary from "../components/TableSummary";
import UserInputContainer from "./UserInputContainer";
import UserInputForm from "../components/UserInputForm";
import {
    allSubscriptionsWithTags, contactPersons,
    LOCATION_CODES,
    ORGANISATIONS,
    PRODUCTS,
    subscriptions_by_tag_msp,
    subscriptionsWithTagSp
} from "./data";
import LocationCodeSelect from "../components/LocationCodeSelect";

import fetchMock from 'fetch-mock';


const genericSelectChoices = ['SAP 1', 'SAP 2', 'SAP 3'];
const tableSummaryDataDefinition = [
    {labels: ["Label1", "Label 2", "Label 3"]},
    {columns: [["value1", "value2", "value3 with slightly longer text"]]}];

const tableSummaryDataWithHeaders = [
    {headers: ["Old Values", "New Values"]},
    {
        columns: [
            ["value1", "value2", "value3"],
            ["new value1", "new value2", "new value3"]]
    }
];

const tableSummaryDataDefinitionWithHeaders = [
    {labels: ["Label1", "Label 2", "Label 3"]},
    {headers: ["Old Values", "New Values"]},
    {
        columns: [
            ["value1", "value2", "value3"],
            ["new value1", "new value2", "new value3"]]
    }
];


const contactPersonSteps = [
    {"name": "organisation", "type": "organisation"},
    {"name": "contact_persons", "organisation_key": "organisation", "type": "contact_persons"},
];


const corelinkInputSteps = [
    {"interface_type_key": "corelink_service_speed", "name": "ims_port_id_1", "type": "corelink", "location_code_key": "location_code"},
    {"interface_type_key": "corelink_service_speed", "name": "ims_port_id_2", "type": "corelink", "location_code_key": "location_code"}
    ];

const sn8PortSelectInputStepsAllOrganisations = [
    {"name": "organisation", "type": "organisation"},
    {"name": "bandwidth", "ports_key": ["service_ports"], "readonly": false, "type": "bandwidth", "value": null},
    {"maximum": 6, "minimum": 1, "name": "bgp_ip_service_ports", "organisationPortsOnly": false, "organisation_key": "organisation", "type": "service_ports_sn8", "visiblePortMode": "normal"}];

const sn7PortSelectInputStepsAllOrganisations = [
    {"name": "organisation", "type": "organisation"},
    {"name": "bandwidth", "ports_key": ["service_ports"], "readonly": false, "type": "bandwidth", "value": null},
    {"maximum": 6, "minimum": 1, "name": "bgp_ip_service_ports", "organisationPortsOnly": false, "organisation_key": "organisation", "type": "service_ports", "mspOnly": false}];

const sn8PortSelectInputStepsSelectedOrganisation = [
    {"name": "organisation", "type": "organisation"},
    {"name": "bandwidth", "ports_key": ["service_ports"], "readonly": false, "type": "bandwidth", "value": null},
    {"maximum": 6, "minimum": 1, "name": "bgp_ip_service_ports", "organisationPortsOnly": true, "organisation_key": "organisation", "type": "service_ports_sn8", "visiblePortMode": "normal"}];

const sn7PortSelectInputStepsSelectedOrganisation = [
    {"name": "organisation", "type": "organisation"},
    {"name": "bandwidth", "ports_key": ["service_ports"], "readonly": false, "type": "bandwidth", "value": null},
    {"maximum": 6, "minimum": 1, "name": "bgp_ip_service_ports", "organisationPortsOnly": true, "organisation_key": "organisation", "type": "service_ports", "mspOnly": false}];


storiesOf('Welcome', module).add('to Storybook', () =>
    <div>
        <h1>Workflows client storybook</h1>
        <p>Welcome to the root of the storybook. We will demonstrate some of the components here.
            The storybook will try to use the data from dev soon.</p>
        <p><b>But for now it uses mocks that will needs some dynamic stuff (ORGANISATIONS, PRODUCTS etc), to get it
            working with dev's data </b></p>
    </div>
);

storiesOf("SubscriptionProductTagSelect", module)
    .add("Only tags", () =>
        <SubscriptionProductTagSelect onChange={(e) => {
            action("clicked");
            debugger;
            e;
        }} tags={["SP", "MSP"]}/>)
    .add("Filtered on Product", () =>
        <SubscriptionProductTagSelect
            onChange={action("clicked")}
            tags={["IPS"]}
            productId="077e6583-a1f8-42bd-87b0-60f7051c8d42"/>)
    .add("Filtered on Product with excluded subs", () =>
        <SubscriptionProductTagSelect
            onChange={action("clicked")}
            tags={["IPS"]}
            productId="077e6583-a1f8-42bd-87b0-60f7051c8d42"
            excludedSubscriptionIds={["08ac5baa-4053-4d01-98e0-505e957d73c7"]}
        />);


storiesOf("GenericSelect", module)
    .add("Default", () =>
        <GenericSelect onChange={(e) => {
            action("clicked");
            this.selected = e.value;
            e;
        }} choices={genericSelectChoices}/>);

storiesOf("LocationCodeSelect", module)
    .add("Default", () =>
        <LocationCodeSelect locationCodes={LOCATION_CODES} onChange={(e) => {
            action("clicked");
            this.selected = e.value;
            e;
        }}/>
    )


storiesOf("TableSummary", module)
    .add("Definition", () =>
        <TableSummary onChange={(e) => {
            action("clicked");
            this.selected = e.value;
            e;
        }} data={tableSummaryDataDefinition}/>)
    .add("Summary with headers", () =>
        <TableSummary onChange={(e) => {
            action("clicked");
            this.selected = e.value;
            e;
        }} data={tableSummaryDataWithHeaders}/>)
    .add("Summary with definition and headers", () =>
        <TableSummary onChange={(e) => {
            action("clicked");
            this.selected = e.value;
            e;
        }} data={tableSummaryDataDefinitionWithHeaders}/>);

storiesOf("UserInputForm", module)
    .add("Contactpersons", () => {
        fetchMock.restore();
        fetchMock.get('/api/subscriptions/tag/MSP%2CSSP%2CMSPNL', subscriptions_by_tag_msp);
        fetchMock.get('/api/subscriptions/tag/SP%2CSPNL', subscriptionsWithTagSp);
        fetchMock.get('/api/v2/all-subscriptions-with-tags', allSubscriptionsWithTags);
        fetchMock.get('glob:*/api/crm/contacts/*', contactPersons);
        return <UserInputContainer formName="Organisation and contacts" stepUserInput={contactPersonSteps}
                                   history="" currentUser="" organisations={ORGANISATIONS} locationCodes={LOCATION_CODES}
                                   products={PRODUCTS}/>
        }
    )
    .add("Corelink", () => {
        // const currentState = {"asn":1,"corelink_service_speed":"100000","description":"Corelink for SURFnetnetwerk","dns_zone":"dev.vtb","infra_vrf":1,"ipv4_prefix":"10.1.16.0/20","ipv6_prefix":"fd00:0:101::/48","isis_metric":"20","nso_service_id":"42344f8f-d2b5-4628-ab45-740f27239a0e","organisation":"c9b5e717-0b11-e511-80d0-005056956c1a","organisation_abbrev":"SURFnetnetwerk","organisation_name":"SURFnet netwerk","process_id":"db04bfc7-0d89-4677-95d3-69b0e0c2bee9","product":"f5f5c099-506b-4be1-a476-65891b49919d","reporter":"SYSTEM","subscription_id":"344d007d-c1a4-48d5-b7b8-79eaff39246c","workflow_target":"CREATE"}
        fetchMock.restore();
        fetchMock.get('/api/subscriptions/tag/MSP%2CSSP%2CMSPNL', subscriptions_by_tag_msp);
        fetchMock.get('/api/subscriptions/tag/SP%2CSPNL', subscriptionsWithTagSp);
        fetchMock.get('/api/v2/all-subscriptions-with-tags', allSubscriptionsWithTags);
        return <UserInputContainer formName="Corelink form" stepUserInput={corelinkInputSteps}
                                   currentState={{"corelink_service_speed":"100000", "location_code":"MT001A"}}
                                   history="" currentUser="" organisations={ORGANISATIONS} locationCodes={LOCATION_CODES}
                                   products={PRODUCTS}/>
    })
    .add("SN7 Portselect all organisations", () => {
        return <UserInputContainer formName="SN7 portselect form, showing all ports" stepUserInput={sn7PortSelectInputStepsAllOrganisations}
                                   history="" currentUser="" organisations={ORGANISATIONS} locationCodes={LOCATION_CODES}
                                   products={PRODUCTS}/>
    })
    .add("SN7 Portselect selected organisation", () => {
        return <UserInputContainer formName="SN7 portselect, showing only ports for selected organisation" stepUserInput={sn7PortSelectInputStepsSelectedOrganisation}
                                   history=""
                                   history="" currentUser="" organisations={ORGANISATIONS} locationCodes={LOCATION_CODES}
                                   products={PRODUCTS}/>
    })
    .add("SN8 Portselect all organisations", () => {
        return <UserInputContainer formName="SN8 portselect form, showing all ports" stepUserInput={sn8PortSelectInputStepsAllOrganisations}
                                   history=""
                                   history="" currentUser="" organisations={ORGANISATIONS} locationCodes={LOCATION_CODES}
                                   products={PRODUCTS}/>
    })
    .add("SN8 Portselect selected organisation", () => {
        return <UserInputContainer formName="SN8 portselect, showing only ports for selected organisation" stepUserInput={sn8PortSelectInputStepsSelectedOrganisation}
                                   history="" currentUser="" organisations={ORGANISATIONS} locationCodes={LOCATION_CODES}
                                   products={PRODUCTS}/>
    })
