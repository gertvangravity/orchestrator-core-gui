// Interpolation works as follows:
//
// Make a key with the translation and enclose the variable with {{}}
// ie "Hello {{name}}" Do not add any spaces around the variable name.
// Provide the values as: I18n.t("key", {name: "John Doe"})
import I18n from "i18n-js";

export const randomCrmIdentifier = () => ("0000" + Math.floor(Math.random() * 99999) + 1).slice(-5);

I18n.translations.en = {
    code: "EN",
    name: "English",
    select_locale: "Select English",
    EntityId: "",

    header: {
        title: "Orchestrator",
        links: {
            help_html: "<a href=\"https://gitlab.surfnet.nl/automation/workflows/wikis/home\" target=\"_blank\">Help</a>",
            logout: "Logout",
            exit: "Exit"
        },
        role: "Role"
    },

    navigation: {
        processes: "Processes",
        validations: "Validations",
        subscriptions: "Subscriptions",
        metadata: "Metadata",
        tasks: "Tasks",
        cache: "Cache"
    },

    processes: {
        changes: "Changes",
        system: "System",
        noc: "NOC Engineers",
        customer_support: "Klant support",
        searchPlaceHolder: "Search for processes...",
        new: "New Process",
        assignee: "Assignee",
        step: "Step",
        status: "Status",
        customer: "Customer",
        product: "product",
        workflow_name: "Workflow",
        started: "started",
        last_modified: "Last modified",
        actions: "",
        none: "",
        submit: "Submit",
        cancel: "Cancel",
        delete: "Delete",
        details: "Details",
        user_input: "User input",
        abort: "Abort",
        retry: "Retry",
        deleteConfirmation: "Are you sure you want to delete {{name}} process for {{customer}}?",
        abortConfirmation: "Are you sure you want to abort {{name}} process for {{customer}}?",
        retryConfirmation: "Are you sure you want to retry {{name}} process for {{customer}}?",
        no_found: "No processes",
        flash: {
            delete: "Process {{name}} is deleted",
            abort: "Process {{name}} is aborted",
            retry: "Process {{name}} has been retried"
        },
        refresh: "Refresh automatically every 3 seconds?"
    },
    process: {
        workflow: "Process instance of workflow {{name}}",
        cancel: "Cancel",
        submit: "Submit",
        notFound: "No Process found (e.g. 404)",
        format_error: "Required input / invalid format",
        uniquenessViolation: "Value selected more than once",
        userInput: "User input for step {{name}} for product {{product}}",
        tabs: {
            user_input: "User input",
            process: "process"
        },
        port_id: "Port",
        port_id_info: "Select a port",
        port_id_1: "Port",
        port_id_1_info: "Select a port",
        port_id_2: "Second port",
        port_id_2_info: "Select a port",
        port_id_redundant: "Redundant port",
        port_id_redundant_info: "Select a port",
        product: "Product",
        product_info: "Search and select the product",
        organisation: "Customer",
        organisation_info: "Search and select the customer for the product",
        lightpath_msp: "The MSP in this LP",
        lightpath_ssp: "The SSP in this LP",
        lightpath_msp_1: "The first MSP in this LP",
        lightpath_ssp_1: "The first SSP in this LP",
        lightpath_msp_2: "The second MSP in this LP",
        lightpath_ssp_2: "The second SSP in this LP",
        first_lightpath: "The first lightpath in this redundant LP",
        second_lightpath: "The second lightpath in this redundant LP",
        first_msp: "The first port in this redundant MSP",
        second_msp: "The second port in this redundant MSP",
        first_service_port: "The first {{product_tag}} in this redundant {{product_tag}}",
        second_service_port: "The second {{product_tag}} in this redundant {{product_tag}}",
        source: "MSP left",
        source_info: "The left MSP in the lightpath",
        source_vlan: "Port VLAN left ",
        source_vlan_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
        destination: "MSP right",
        destination_info: "The right MSP in the lightpath",
        destination_vlan: "Port VLAN Right",
        destination_vlan_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
        source_1: "First Lightpath: MSP left",
        source_1_info: "The left MSP in the first lightpath",
        source_vlan_1: "First Lightpath: Port VLAN Left",
        source_vlan_1_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
        destination_1: "First Lightpath: MSP right",
        destination_1_info: "The right MSP in the first lightpath",
        destination_vlan_1: "First Lightpath: VLAN Port Right",
        destination_vlan_1_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
        source_2: "Second Lightpath: MSP left",
        source_2_info: "The left MSP in the second lightpath",
        source_vlan_2: "Second Lightpath: VLAN Port Left",
        source_vlan_2_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
        destination_2: "Second Lightpath: MSP right",
        destination_2_info: "The right MSP in the second lightpath",
        destination_vlan_2: "Second Lightpath: VLAN Port Right",
        destination_vlan_2_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
        capacity: "Capacity",
        capacity_info: "The capacity / speed of the lightpath in megabit per second",
        contact_persons: "Customer contact persons",
        contact_persons_info: "The persons to notify when the process is finished. You can add multiple emails, names and phone numbers",
        service_port: {
            location_code: "Location code",
            location_code_info: "Provide a valid location code",
            crm_port_id: 'The CRM identifier for a port',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            ieee_interface_type: "IEEE interface type",
            ieee_interface_type_info: "Choose an IEEE interface type",
        },
        service_port_redundant: {
            location_code: "Location code",
            location_code_info: "Provide a valid location code",
            crm_port_id: 'The CRM identifier for a port',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            ieee_interface_type: "IEEE interface type",
            ieee_interface_type_info: "Choose an IEEE interface type",
        },
        msp: {
            location_code: "Location code",
            location_code_info: "Provide a valid location code",
            crm_port_id: 'The CRM identifier for a port',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            ieee_interface_type: "IEEE interface type",
            ieee_interface_type_info: "Choose an IEEE interface type",
        },
        ims_info_msp: {
            device_port_name: "Device port name",
            device_port_name_info: "Port name to configure on the physical device",
        },
        ims_info: {
            device_port_name: "Device port name",
            device_port_name_info: "Port name to configure on the physical device",
        },
        msp_1: {
            location_code: "First MSP location code",
            location_code_info: "Provide a valid location code",
            crm_port_id: 'First MSP the CRM identifier for a port',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            ieee_interface_type: "First MSP IEEE interface type",
            ieee_interface_type_info: "Choose an IEEE interface type",
            device_port_name: "Device port name",
            device_port_name_info: "Port name to configure on the physical device",

        },
        ims_info_msp_1: {
            device_port_name: "Device port name",
            device_port_name_info: "Port name to configure on the physical device",
        },
        msp_2: {
            location_code: "Second MSP location code",
            location_code_info: "Provide a valid location code",
            crm_port_id: 'Second MSP the CRM identifier for a port',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            ieee_interface_type: "Second MSP IEEE interface type",
            ieee_interface_type_info: "Choose an IEEE interface type",
            device_port_name: "Second device port name",
            device_port_name_info: "Port name to configure on the physical device",

        },
        ims_info_msp_2: {
            device_port_name: "Second device port name",
            device_port_name_info: "Port name to configure on the physical device",
        },
        crm_port_id_2: 'Second MSP the CRM identifier for a port',
        crm_port_id_2_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
        ims_id: "IMS identifier",
        ims_id_info: "The IMS identifier stored in the IMS database",
        dienstafname: "Dienstafname",
        dienstafname_info: "The dienstafname of the service - must be valid GUID like 6769d05f-3b11-e511-80d0-005056956c1a",
        ieee_interface_type_select: "First select a product type...",
        ims_port_id: "IMS port id",
        ims_port_id_info: "The IMS port id",
        new_product: "The new Product",
        new_product_info: "Please select the product with the new speed",
        new_interface_type: "The new interface type of the port",
        new_interface_type_info: "Please select the new interface type of the port",
        nms_service_id: "NMS service id",
        nms_service_id_info: "The id of the service on the network (0000-9999)",
        nms_service_id_1: "NMS service id of the first lightpath",
        nms_service_id_1_info: "The id of the service on the network (0000-9999)",
        nms_service_id_2: "NMS service id of the second lightpath",
        nms_service_id_2_info: "The id of the service on the network (0000-9999)",
        noc_customer_confirmation: "The customer has confirmed the successful delivery of the service",
        noc_customer_confirmation_info: "Has the customer confirmed that the service was successfully delivered?",
        noc_remove_lichtpad_confirmation: "Confirmation of the successful removal of the LightPath and any child SSP's subscriptions",
        noc_remove_lichtpad_confirmation_info: "Are the LightPath of the subscription and any child SSP's subscriptions removed?",
        noc_remove_port_confirmation: "Are the port(s) of the subscription removed from the live network?",
        noc_downgrade_lichtpad_confirmation: "Confirmation of the downgrade of the redundant LightPath",
        noc_downgrade_lichtpad_confirmation_info: "Is the redundant LightPath downgraded to a non-redundant LightPath and are SSP circuits disabled?",
        noc_confirmation: "Confirmed",
        bandwidth: "Bandwidth",
        bandwidth_info: "Desired bandwidth in Mbit/s",
        new_process: "New process",
        configuration_ready: "Configuration ready",
        configuration_ready_info: "All of the work entailed is successfully configured",
        nms_service_updated: "NMS Service has been updated",
        nms_service_updated_info: "Confirmation that the NMS Service on the physical network has been updated",
        cleanup_ready: "Cleanup ready",
        product_validation: "Product / Workflow validation",
        flash: {
            create: "Created process for workflow {{name}}",
            update: "Resumed process for workflow {{name}}"
        },
        subscription: "Subscription",
        subscription_info: "Subscription GUID",
        subscription_id: "Subscription",
        subscription_id_info: "The subscription that will be terminated",
        subscription_link: "Subscription",
        subscription_link_txt: "Show Subscription related by this {{target}} Process",
        service_ports: "Service Ports",
        service_ports_info: "The two Service Ports that will be connected to each other in this LP",
        service_ports_primary: "Service Ports",
        service_ports_primary_info: "The two Service Ports of the primary LP in this redundant LP",
        service_ports_secondary: "Service Ports",
        service_ports_secondary_info: "The two Service Ports of the secondary LP in this redundant LP",
        elan_service_ports: "ELAN Service Ports",
        elan_service_ports_info: "All off the Service Ports that will be connected to each other in this E-LAN virtual private network - minimum is 2",
        nsi_isalias: "NSI isAlias",
        nsi_isalias_info: "",
        ssp_a: {
            port_id: "Port SSP site A",
            port_id_info: "Select a port for SSP site A",
            vlan: "VLAN site A",
            vlan_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
            location_code: "Location code site A",
            location_code_info: "Select a location code for site A.",
            crm_port_id: 'The CRM identifier for the SSP on site A',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            interface_type: "Interface type for SSP on site A",
            interface_type_info: "Choose an IEEE interface type",
            product: "SSP site A",
            product_info: "Choose an SSP product",
            device_port_name: "Device port name for SSP site A",
            device_port_name_info: "Port name to configure on the physical device",
        },
        ssp_b: {
            port_id: "Port SSP site B",
            port_id_info: "Select a port for SSP site b",
            vlan: "VLAN site B",
            vlan_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
            location_code: "Location code site B",
            location_code_info: "Select a location code for site B.",
            crm_port_id: 'The CRM identifier for the SSP on site B',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            interface_type: "Interface type for SSP on site B",
            interface_type_info: "Choose an IEEE interface type",
            product: "SSP site B",
            product_info: "Choose an SSP product",
            device_port_name: "Device port name for SSP site B",
            device_port_name_info: "Port name to configure on the physical device",
        },
        ssp_c: {
            port_id: "Port SSP site C",
            port_id_info: "Select a port for SSP site C",
            vlan: "VLAN site C",
            vlan_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
            location_code: "Location code site C",
            location_code_info: "Select a location code for site C.",
            crm_port_id: 'The CRM identifier for the SSP on site C',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            interface_type: "Interface type for SSP on site C",
            interface_type_info: "Choose an IEEE interface type",
            product: "SSP site C",
            product_info: "Choose an SSP product",
            device_port_name: "Device port name for SSP site C",
            device_port_name_info: "Port name to configure on the physical device",
        },
        ssp_d: {
            port_id: "Port SSP site D",
            port_id_info: "Select a port for SSP site D",
            vlan: "VLAN site D",
            vlan_info: "VLAN range - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
            location_code: "Location code site D",
            location_code_info: "Select a location code for site D.",
            crm_port_id: 'The CRM identifier for the SSP on site D',
            crm_port_id_info: 'Provide a valid, 5 digit, CRM Port ID (Surfnet7), for example {{example}}',
            interface_type: "Interface type for SSP on site D",
            interface_type_info: "Choose an IEEE interface type",
            product: "SSP site D",
            product_info: "Choose an SSP product",
            device_port_name: "Device port name for SSP site D",
            device_port_name_info: "Port name to configure on the physical device",
        },
        subscription_id1: "Subscription",
        subscription_id1_info: "The first subscription to use",
        subscription_id2: "Subscription",
        subscription_id2_info: "The second subscription to use",
        downgrade_redundant_lp_choice: "Redundant LP Subscription",
        downgrade_redundant_lp_choice_info: "Choose one of the Lightpaths of the redundant Lightpath to be de-activated",
        transition_product_downgrade: "Choose New Product",
        transition_product_downgrade_info: "Choose the new Product for this subscription after the downgrade (scoped by the current product)",
        transition_product_upgrade: "Choose New Product",
        transition_product_upgrade_info: "Choose the new Product for this subscription after the upgrade (scoped by the current product)"
    },
    process_state: {
        copy: "Copy to clipboard",
        copied: "Copied",
        raw: "Show raw JSON",
        details: "Show details",
        stateChanges: "Show state input",
        wording: "Process {{product}} of workflow {{workflow}} for {{customer}}",
        summary: {
            status: "Status",
            assignee: "Assignee",
            step: "Current step",
            started: "Started",
            last_modified: "Last updated"
        }

    },
    task_state: {
        copy: "Copy to clipboard",
        copied: "Copied",
        raw: "Show raw JSON",
        details: "Show details",
        stateChanges: "Show state input",
        wording: "Task of workflow {{workflow}}",
        summary: {
            last_status: "Status",
            created_by: "Created by",
            last_step: "Current step",
            started_at: "Started",
            last_modified_at: "Last modified"
        }

    },
    validations: {
        help: "Explain",
        product: "Product",
        name: "Name",
        description: "Description",
        workflow: "Workflow",
        valid: "Valid",
        mapping: "Workflow mapping configuration ",
        no_mapping: "The '{{name}}' workflow has no 'workflow_subscription_mapping'. This workflow can not go into production without a mapping",
        product_block: "Product Block",
        resource_type: "Resource Types",
        resource_type_sub: "(Resource type ID vs Workflow ID)",
        errors: "Errors",
        error_name: "Resource block: <span>{{name}}</span>",
        block_missing: "Resource block <span>{{name}}</span> is not configured in the Product <span>{{product}}</span>",
        resource_type_missing: "Resource type <span>{{name}}</span> is not configured in the Resource Block <span>{{block}}</span>",
        hide_valids: "Hide valid product configurations",
        hide_valid_subscriptions_types: "Hide workflows with no invalid subscriptions",
        resource_blocks: "Resource blocks",
        resource_types: "Resource types",
        tabs: {
            subscriptions: "Subscriptions",
            workflows: "Workflows",
            dienstafnames: "Dienstafnames",
            fixedInputs: "Fixed Inputs"
        },
        no_subscriptions: "No invalid subscriptions",
        workflow_key: "Invalid subscriptions for workflow {{workflow}}",
        no_fixed_inputs: "There are no products that are either missing required fixed inputs, have incorrect values or have unknown fixed inputs",
        no_dienstafnames: "No mismatches in dienstafname vs. subscriptions tables",
        dienstafname_matches: "Dienstafnames not present in Subscriptions table",
        subscription_matches: "Subscriptions not present in Dienstafname table",
        fetchingCRMData: "Loading CRM data. Hang on tight...",
        fixedInput: {
            title: "Invalid FixedInput settings for product {{name}}",
            fixed_input_name: "Fixed Input name",
            fixed_input_error: "Error",
            error: {
                required_not_present: "Required FixedInput, but not present",
                invalid_value: "Invalid value for FixedInput: {{value}}",
                missing_configuration: "FixedInput for product is not configured"
            }
        }
    },
    filter: {
        CHANGES: "Changes",
        NOC: "NOC",
        KLANT_SUPPORT: "Klant Support",
        SYSTEM: "System",
        all: "ALL",
        selected: "FILTERED",
        aborted: "Aborted",
        completed: "Completed",
        suspended: "Suspended",
        running: "Running",
        failed: "Failed",
        LP: "LP",
        MSP1G: "MSP1G",
        MSP10G: "MSP10G",
        MSP40G: "MSP40G",
        MSP100G: "MSP100G",
        PLP50M: "PLP50M",
        RMSP1G: "RMSP1G",
        SSP1G: "SSP1G",
        SSP10G: "SSP10G",
        LightPath: "Light-paths",
        ELAN: "E-LAN Light-paths",
        Port: "Port",
        MSP: "MSP",
        SSP: "SSP",
        LPNLNSI: "NSI Light-paths",
        MSPNL: "MSP NL",
        RMSP: "Redundant MSP",
        initial: "Initial",
        provisioning: "Provisioning",
        active: "Active",
        disabled: "Disabled",
        terminated: "Terminated"
    },
    subscriptions: {
        customer_name: "Customer",
        description: "Description",
        insync: "In sync",
        product_name: "Product",
        status: "Status",
        start_date: "Start date",
        end_date: "End date",
        start_date_epoch: "Start date",
        end_date_epoch: "End date",
        name: "Name",
        no_found: "No subscriptions",
        searchPlaceHolder: "Search for subscriptions...",
        noop: "",
        deleteConfirmation: "Are you sure you want to delete {{name}} subscription for {{customer}}?",
        product: "Product",
        flash: {
            delete: "Subscription {{name}} was deleted",
        }
    },
    subscription: {
        notFound: "No Subscription found (e.g. 404)",
        subscription: "Subscription",
        child_subscriptions: "The following child subscriptions are used in this parent subscription - {{product}}",
        parent_subscriptions: "The following parent subscriptions are using this child subscription - {{product}}",
        resource_types: "Subscription Instance Values",
        resource_types_info: "The resource types of the associated product block(s) of this subscription",
        product_title: "Product",
        process_link: "Process",
        notFoundRelatedObjects: "Subscription resource references NOT found / deleted",
        process_link_text: "Show related {{target}} process for this subscription",
        no_process_link_text: "This subscription has NOT been created by a workflow or the Process has been deleted.",
        ims_services: "IMS Services",
        link_subscription: "Show Subscription",
        modify_modify_service_port: "Modify Service Port",
        product: {
            name: "Name",
            description: "Description",
            workflow: "Workflow-key",
            created: "Created",
            end_date: "End date",
            product_type: "Product type",
            status: "Status",
            tag: "Tag"
        },
        ims_service: {
            id: "IMS service ID ({{index}})",
            customer: "Customer",
            extra_info: "Extra info",
            name: "Name",
            product: "Product",
            speed: "Speed",
            status: "Status"
        },
        fetchingImsData: "Please wait until we have loaded all IMS information...",
        terminate: "Terminate Subscription",
        terminateConfirmation: "Are you sure you want to terminate {{name}} subscription for {{customer}}?",
        no_termination_parent_subscription: "This child subscription can not be terminated as it is used in parent subscriptions.",
        no_termination_deleted_related_objects: "This subscription can not be terminated because it contains references to other systems (e.g. IMS) that are deleted.",
        no_termination_workflow: "This subscription can not be terminated as the product has no termination workflow-key.",
        no_termination_invalid_status: "This subscription can not be terminated because of the status: {{status}}. Only active and provisioning subscriptions can be terminated.",
        modify_modify_ssp_msp_lichtpad: "Modify bandwidth",
        modify_downgrade_redundant_lichtpad_to_unprotected_workflow: "Downgrade to Unprotected LP",
        modify_upgrade_lichtpad_to_redundant_workflow: "Upgrade to Redundant LP",
        modify_modify_elan: "Modify ELAN",
        modifyConfirmation: "Are you sure you want to {{change}} of {{name}} subscription for {{customer}}. This will start a new modify process immediately!",
        no_modify_workflow: "This subscription can not be modified as the product has no modify workflow-key.",
        no_modify_invalid_status: "This subscription can not be modified because of the status: {{status}}. Only active subscriptions can be modified.",
        no_modify_deleted_related_objects: "This subscription can not be modified because it contains references to other systems (e.g. IMS) that are deleted.",
        not_in_sync: "This subscription can not be modified because it is not in sync. This means there is some error in the registration of the subscription or that it is being modified by another workflow.",
    },
    terminate_subscription: {
        cancel: "Cancel",
        submit: "Terminate",
        subscription_childs: "Child subscriptions - ports used in {{product}}"
    },
    dienstafname: {
        dienst: "Dienst",
        dienstafname: "Dienstafname",
        subscription: "Subscription",
        statuscode: "Status",
        dienstcode: "Dienstcode",
        organisatiecode: "Code",
        organisatienaam: "Organisation",
        description: "Description"
    },
    contact_persons: {
        email: "Email",
        name: "Name",
        phone: "Phone number",
        invalid_email: "Invalid email",
        namePlaceholder: "Search and add contact persons..."
    },
    vlan: {
        vlansInUseError: "VLAN ports {{vlans}} are already in use for the selected MSP",
        vlansInUse: "Already used VLAN ranges for this MSP: {{vlans}}",
        allPortsAvailable: "This MSP has no ports in use (yet)."
    },
    clipboard: {
        copied: "Copied!",
        copy: "Copy to clipboard"
    },
    downgrade_redundant_lp: {
        choice: "Which one the LP should be removed from this redundant LP?",
        choosen: "The LP which should removed from this redundant LP",
        subscription_childs: "The ports in this redundant LP",
        primary: "Primary LP",
        secondary: "Secondary LP",
        ims_circuit_id: "IMS Circuit ID",
        ims_protection_circuit_id: "IMS Protection Circuit ID",
        description: "Description",
        connector_type: "Connector type",
        customer_name: "Customer name",
        location: "Location",
        node: "Node",
        patch_position: "Patch position",
        msp: "MSP",
        ssp: "SSP",
    },
    metadata: {
        tabs: {
            products: "Products",
            product_blocks: "Product Blocks",
            resource_types: "Resource Types",
            fixed_inputs: "Fixed Inputs"
        },
        deleteConfirmation: "Are you sure you want to delete {{type}} {{name}}?",
        flash: {
            updated: "{{type}} {{name}} successfully updated",
            created: "{{type}} {{name}} successfully created.",
            delete: "{{type}} {{name}} successfully deleted."
        },
        products: {
            searchPlaceHolder: "Search for Products",
            new: "New Product",
            name: "Name",
            name_info: "The name of this Product.",
            description: "Description",
            description_info: "Free formatted description of this Product",
            tag: "Tag",
            tag_info: "The Tag of this Product",
            product_type: "Type",
            product_type_info: "The Type of this Product",
            status: "Status",
            status_info: "The status of this Product. This is currently not used",
            crm_prod_id: "CRM Id",
            crm_prod_id_info: "The unique reference of this Product in the CRM",
            create_subscription_workflow_key: "Create Workflow",
            create_subscription_workflow_key_info: "The unique reference to the workflow responsible for the creation of a subscription based on this product",
            modify_subscription_workflow_key: "Modify Workflows",
            modify_subscription_workflow_key_info: "The references to the workflows responsible for modifications of a subscription based on this product",
            terminate_subscription_workflow_key: "Terminate Workflow",
            terminate_subscription_workflow_key_info: "The unique reference to the workflow responsible for the termination of a subscription based on this product",
            created_at: "Create Date",
            created_at_info: "The date this Product was created",
            end_date: "End Date",
            end_date_info: "The end date of this Product. This is currently not used",
            product_blocks: "Product Blocks",
            product_blocks_string: "Product Blocks",
            product_blocks_info: "They define which values are stored on the subscriptions of the Products linked to the Product Block(s)",
            fixed_inputs: "Fixed Inputs",
            fixed_inputs_info: "These name / value pairs are used in the workflows for this Product" +
            ". Do not change this without syncing the code",
            fixed_inputs_name: "Name",
            fixed_inputs_value: "Value",
            add_fixed_input: "Add Fixed Input",
            duplicate_fixed_input_name: "Duplicate Fixed Input names are not allowed",
            actions: "",
            back: "Back to Product Blocks",
            view: "View",
            edit: "Edit",
            delete: "Delete",
            clone: "Clone",
            select_add_product_block: "Add a Product Block...",
            select_no_more_product_blocks: "No more Product Blocks to add",
            no_found: "No Products",
            duplicate_name: "This name is already taken. Product names need to be unique.",
            select_add_fixed_input: "Add a Fixed Input...",
            select_no_more_fixed_inputs: "No more Fixed Inputs to add",
        },
        productBlocks: {
            searchPlaceHolder: "Search for Product Blocks",
            new: "New Product Block",
            name: "Name",
            name_info: "The name of this Product Block. Note that this name is used in the workflow code. Do not change this without syncing the code",
            description: "Description",
            description_info: "Free formatted description of this Product Block",
            tag: "Tag",
            tag_info: "The Tag of this Product Block. This is currently not used",
            resource_types: "Resource Types",
            created_at: "Created",
            created_at_info: "The date this Product Block was created",
            end_date: "End Data",
            end_date_info: "The end data of this Product Block. This is currently not used",
            status: "Status",
            status_info: "The status of this Product Block. This is currently not used",
            actions: "",
            back: "Back to Product Blocks",
            view: "View",
            edit: "Edit",
            delete: "Delete",
            resourceTypes: "Resource Types",
            resourceTypes_info: "The Resource Types of this Product Block. They define which values are stored on the subscriptions of the Products linked to the Product Block(s)",
            select_add_resource_type: "Add a Resource Type...",
            select_no_more_resource_types: "No more Resource Types to add",
            no_found: "No Product Blocks",
            duplicate_name: "This name is already taken. Product Block names need to be unique"
        },
        resourceTypes: {
            searchPlaceHolder: "Search for Resource Types",
            new: "New Resource Type",
            resource_type: "Type",
            resource_type_info: "The type of this Resource Type. Note that this value is used in the workflow code. Do not change this without syncing the code",
            description: "Description",
            description_info: "Free formatted description of this Resource Type",
            actions: "",
            back: "Back to Resource Types",
            view: "View",
            edit: "Edit",
            delete: "Delete",
            no_found: "No Resource Types",
            duplicate_name: "This type is already taken. Resource Types types need to be unique"
        },
        fixedInputs: {
            tags: "Fixed Inputs for Product tag: {{tag}}",
            inputs: "Fixed Inputs and values",
            description: "Description",
            name: "Name",
            fixedInput: "Fixed Input name",
            values: "Values",
            required: "Required"
        },
        results: "{{type}} found: {{count}}",
    },
    tasks: {
        searchPlaceHolder: "Search for tasks...",
        new: "New Task",
        last_step: "Current step",
        last_status: "Status",
        workflow: "Workflow",
        started_at: "Started",
        failed_reason: "Failed reason",
        last_modified_at: "Last modified",
        created_by: "Created by",
        actions: "",
        none: "",
        submit: "Submit",
        cancel: "Cancel",
        delete: "Delete",
        details: "Details",
        user_input: "User input",
        abort: "Abort",
        retry: "Retry",
        deleteConfirmation: "Are you sure you want to delete {{name}} task?",
        abortConfirmation: "Are you sure you want to abort {{name}} task?",
        retryConfirmation: "Are you sure you want to retry {{name}} task?",
        no_found: "No tasks",
        flash: {
            delete: "Task {{name}} is deleted",
            abort: "Task {{name}} is aborted",
            retry: "Task {{name}} has been retried"
        },
        refresh: "Refresh automatically every 3 seconds?"
    },
    task: {
        workflow: "Workflow",
        workflow_info: "Select a task workflow to run",
        cancel: "Cancel",
        submit: "Submit",
        notFound: "No Task found (e.g. 404)",
        format_error: "Required input / invalid format",
        userInput: "User input for step {{name}}",
        tabs: {
            user_input: "User input",
            task: "Task"
        },
        new_task: "New task",
        flash: {
            create: "Created task for workflow {{name}}",
            update: "Resumed task for workflow {{name}}"
        }
    },
    subscription_select: {
        placeholder: "Search and select a subscription",
        select_product: "First select a Product",
    },
    cache: {
        name: {
            ims: "IMS locations",
            crm: "CRM organisations, contacts and locations",
            api: "Workflow endpoints (combined caches)",
            all: "All caches"
        },
        remove: "Flush Cache",
        remove_info: "Select a Cache to flush",
        clear: "Flush",
        flushed: "Cache {{name}} was flushed"
    },
    error_dialog: {
        title: "Unexpected error",
        body: "This is embarrassing; an unexpected error has occurred. It has been logged and reported. Please try again. Still doesn't work? Please click 'Help'.",
        ok: "Close"
    },

    not_found: {
        title: "404",
        description_html: "The requested page could not be found"
    },
    server_error: {
        title: "500",
        description_html: "An unexpected error occurred. It has been logged and reported. Please try again. Still doesn't" +
        " work? Get Help."
    },
    not_allowed: {
        title: "403",
        description_html: "This page is restricted. You don't have access based on your group memberships and / or SAB roles"
    },
    confirmation_dialog: {
        title: "Please confirm",
        confirm: "Confirm",
        cancel: "Cancel",
        leavePage: "Do you really want to leave this page?",
        leavePageSub: "Changes that you made will not be saved.",
        stay: "Stay",
        leave: "Leave"
    },
    FreePortSelect: {
        "noFreePortsAvailable": "No free ports with interface type {{interfaceType}} available at location {{location}}",
        "freePortsLoading": "Please be patient, the query for free ports with interface type {{interfaceType}} available at location {{location}} can take a while ...",
        "noFreePortsPlaceholder": "No free ports available",
        "selectPort": "Select a port"
    },
    service_ports: {
        servicePort: "Service Port",
        vlan: "Port Vlan",
        invalid_vlan: "Invalid VLAN - must be a range of valid [2-4094] VLAN integers, for example '2, 5-6, 1048-1052'",
        used_ssp: "The selected SSP is already used in a different LP(s): {{descriptions}}"
    },
    bandwidth: {
        invalid: "Invalid bandwidth. The maximum based on the selected ports / products is {{max}} Mbit/s"
    }
};

export default I18n.translations.en;
