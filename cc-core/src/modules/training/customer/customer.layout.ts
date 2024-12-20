
import { LayoutEntity } from "@shopstack/cc-core-lib/core";

export const TrainingCustomerLayout: LayoutEntity[] = [
    {
        "name": "Customer",
        "code": "default",
        "type": [
            "standard"
        ],
        "detail": {
            "title": {
                "format": "customer"
            },
            "blocks": [
                {
                    "key": "27c9f388027e967fd7eb",
                    "type": "column",
                    "layout": {
                        "num_of_col": 2,
                        "fields": [
                            [
                                {
                                    "field": "customer_name",
                                    "label": "Customer Name",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": true
                                }
                            ],
                            [
                                {
                                    "field": "customer_email",
                                    "label": "Customer Email",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": true
                                }
                            ]
                        ]
                    }
                },
                {
                    "key": "c7854a35a033639eb062",
                    "type": "column",
                    "layout": {
                        "num_of_col": 2,
                        "fields": [
                            [
                                {
                                    "field": "customer_telephone",
                                    "label": "Customer Telephone",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": true
                                }
                            ],
                            []
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
            "entries_per_page": 20,
            "default_sort": "updatedAt",
            "columns": [
                {
                    "field": "customer_name",
                    "label": "Name",
                    "allow_sort": true,
                    "allow_search": true,
                    "allow_filter": true,
                    "align": "left",
                    "_translates": {
                        "en-US": {
                            "label": "Name"
                        }
                    }
                },
                {
                    "field": "customer_telephone",
                    "label": "Telephone",
                    "allow_sort": true,
                    "allow_search": true,
                    "allow_filter": true,
                    "align": "left",
                    "_translates": {
                        "en-US": {
                            "label": "Telephone"
                        }
                    }
                },
                {
                    "field": "customer_email",
                    "label": "Email",
                    "allow_sort": true,
                    "allow_search": true,
                    "allow_filter": true,
                    "align": "left",
                    "_translates": {
                        "en-US": {
                            "label": "Email"
                        }
                    }
                },
                {
                    "field": "createdAt",
                    "label": "Created At",
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

