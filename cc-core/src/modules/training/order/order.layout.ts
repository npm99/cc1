
import { LayoutEntity } from "@shopstack/cc-core-lib/core";

export const TrainingOrderLayout: LayoutEntity[] = [
    {
        "name": "Order",
        "code": "default",
        "type": [
            "standard"
        ],
        "detail": {
            "title": {
                "format": "${ order_date }"
            },
            "blocks": [
                {
                    "key": "a97f1cae11c8bfc69b50",
                    "type": "column",
                    "layout": {
                        "num_of_col": 1,
                        "fields": [
                            [
                                {
                                    "field": "select",
                                    "type": "standard_component",
                                    "unique_key": "standard_component_select_d12cde451abf8d58bb81",
                                    "key": "customer_id",
                                    "label": "customer",
                                    "link_type": "key",
                                    "entity": "other_entity",
                                    "entity_system": true,
                                    "key_value": "_id",
                                    "display_template": "${ customer_name }",
                                    "list_template": "",
                                    "options": [],
                                    "internal_actions": [],
                                    "relate_ref": "training_customer",
                                    "mode": "single",
                                    "trigger": [],
                                    "allow_field": [],
                                    "_translates": {
                                        "en-US": {
                                            "label": "customer",
                                            "placeholder": "",
                                            "description": ""
                                        }
                                    }
                                }
                            ]
                        ]
                    }
                },
                {
                    "key": "84999c89d9b28b68ed4c",
                    "type": "column",
                    "layout": {
                        "num_of_col": 2,
                        "fields": [
                            [
                                {
                                    "field": "order_date",
                                    "label": "Order Date",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": false
                                }
                            ],
                            [
                                {
                                    "field": "total_amoung",
                                    "label": "Total Amoung",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": true
                                }
                            ]
                        ]
                    }
                },
                {
                    "key": "1c55cf2c168cbcd793f2",
                    "type": "column",
                    "layout": {
                        "num_of_col": 2,
                        "fields": [
                            [
                                {
                                    "field": "select",
                                    "type": "standard_component",
                                    "unique_key": "standard_component_select_37e8aa1431ff3fe51b33",
                                    "key": "product_id",
                                    "label": "Product",
                                    "link_type": "key",
                                    "entity": "other_entity",
                                    "entity_system": true,
                                    "key_value": "_id",
                                    "display_template": "${ product_name } ( ${ product_price } )",
                                    "list_template": "",
                                    "options": [],
                                    "internal_actions": [],
                                    "read_only": true,
                                    "permission_layout_read_only_allow_actions": "update",
                                    "relate_ref": "training_product",
                                    "mode": "single",
                                    "trigger": [],
                                    "allow_field": [],
                                    "_translates": {
                                        "en-US": {
                                            "label": "Product",
                                            "placeholder": "",
                                            "description": ""
                                        }
                                    }
                                }
                            ],
                            [
                                {
                                    "field": "amount",
                                    "label": "Amount",
                                    "read_only": true,
                                    "permission_layout_read_only": [],
                                    "permission_layout_read_only_allow_actions": "update",
                                    "restrict": false,
                                    "required": true,
                                    "description": "",
                                    "placeholder": "",
                                    "trigger": [],
                                    "_translates": {
                                        "en-US": {
                                            "label": "Amount",
                                            "placeholder": "",
                                            "description": ""
                                        }
                                    },
                                    "hide_label": false
                                }
                            ]
                        ]
                    }
                }
            ]
        },
        "list": {
            "allow_search": false,
            "allow_sort": false,
            "allow_filter": false,
            "allow_bulk": false,
            "entries_per_page": 10,
            "default_sort": "-order_date",
            "columns": [
                {
                    "field": "id",
                    "label": "Id",
                    "allow_sort": true,
                    "allow_search": true,
                    "allow_filter": true,
                    "align": "left"
                },
                {
                    "field": "order_date",
                    "label": "Order Date",
                    "allow_sort": true,
                    "allow_search": false,
                    "allow_filter": true,
                    "align": "left"
                }
            ],
            "row_conditions": []
        },
        "allow_import_export_raw_json": false,
        "allow_clone": false,
        "hide_activity_log": false,
        "hide_save": false,
        "show_refresh": true,
        "filters": {
            "filters": [],
            "value": ""
        },
        "allow_actions": [
            {
                "action": "create",
                "role_restrictions": []
            },
            {
                "action": "update",
                "role_restrictions": []
            },
            {
                "action": "delete",
                "role_restrictions": []
            },
            {
                "action": "print",
                "role_restrictions": []
            },
            {
                "action": "export/import",
                "role_restrictions": []
            }
        ],
        "restriction": []
    }
];

