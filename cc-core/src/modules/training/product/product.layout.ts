
import { LayoutEntity } from "@shopstack/cc-core-lib/core";

export const TrainingProductLayout: LayoutEntity[] = [
    {
        "name": "Product",
        "code": "default",
        "type": [
            "standard"
        ],
        "detail": {
            "title": {
                "format": "${ product_name }"
            },
            "blocks": [
                {
                    "key": "6a9b44f18b046068fbaa",
                    "type": "column",
                    "layout": {
                        "num_of_col": 1,
                        "fields": [
                            [
                                {
                                    "field": "product_name",
                                    "label": "Product Name",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": false
                                }
                            ]
                        ]
                    }
                },
                {
                    "key": "b07327613d35b809cd4b",
                    "type": "column",
                    "layout": {
                        "num_of_col": 2,
                        "fields": [
                            [
                                {
                                    "field": "product_code",
                                    "label": "Product Code",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": false
                                }
                            ],
                            [
                                {
                                    "field": "product_price",
                                    "label": "Product Price",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": true
                                }
                            ]
                        ]
                    }
                },
                {
                    "key": "458dc6f598d9997c39af",
                    "type": "column",
                    "layout": {
                        "num_of_col": 1,
                        "fields": [
                            [
                                {
                                    "field": "input",
                                    "type": "standard_component",
                                    "unique_key": "standard_component_input_add2cf03d5414a7d28c3",
                                    "name": "product_detail",
                                    "label": "product_detail",
                                    "required": true,
                                    "link_type": "field",
                                    "entity": "not_use",
                                    "input_type": "single_line",
                                    "internal_actions": [],
                                    "trigger": [],
                                    "use_function": false,
                                    "_translates": {
                                        "en-US": {
                                            "label": "",
                                            "placeholder": "",
                                            "description": ""
                                        }
                                    },
                                    "mask_checked": false
                                }
                            ]
                        ]
                    }
                },
                {
                    "key": "7eaa0aef1d0e2238811d",
                    "type": "column",
                    "layout": {
                        "num_of_col": 2,
                        "fields": [
                            [
                                {
                                    "field": "stock_quantity",
                                    "label": "Stock Quantity",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": false
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
            "default_sort": "-createdAt",
            "columns": [
                {
                    "field": "product_name",
                    "label": "Product Name",
                    "allow_sort": true,
                    "allow_search": true,
                    "allow_filter": true,
                    "align": "left"
                },
                {
                    "field": "product_code",
                    "label": "Product Code",
                    "allow_sort": true,
                    "allow_search": true,
                    "allow_filter": true,
                    "align": "left"
                },
                {
                    "field": "stock_quantity",
                    "label": "Stock Quantity",
                    "allow_sort": true,
                    "allow_filter": true,
                    "align": "left",
                    "format_type": "number",
                    "decimal_place": 0,
                    "allow_search": false,
                    "_translates": {
                        "en-US": {
                            "label": "Stock Quantity"
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
            "row_conditions": [
                {
                    "field": 0,
                    "font_color": "#d82020",
                    "background_color": "#ffffff",
                    "conditions": [
                        [
                            "stock_quantity",
                            "<",
                            "10"
                        ]
                    ]
                }
            ]
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
    },
    {
        "detail": {
            "title": {
                "format": "${ product_name }"
            },
            "blocks": [
                {
                    "key": "283c5bcfde01916d1145",
                    "type": "column",
                    "layout": {
                        "num_of_col": 1,
                        "fields": [
                            [
                                {
                                    "field": "stock_quantity",
                                    "label": "Stock Quantity",
                                    "read_only": false,
                                    "restrict": false,
                                    "required": false,
                                    "description": "",
                                    "placeholder": "",
                                    "trigger": [],
                                    "_translates": {
                                        "en-US": {
                                            "label": "Stock Quantity",
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
            ],
            "is_popup": true,
            "popup_mode": "saveandclose"
        },
        "list": {
            "allow_search": false,
            "allow_sort": false,
            "allow_filter": false,
            "allow_bulk": false,
            "entries_per_page": 10,
            "default_sort": "_translates",
            "columns": [],
            "row_conditions": []
        },
        "name": "Update Stock",
        "code": "update_stock",
        "type": [
            "form"
        ],
        "allow_workflow_actions": false,
        "allow_actions": [
            {
                "action": "create",
                "role_restrictions": []
            },
            {
                "action": "update",
                "role_restrictions": []
            }
        ],
        "show_refresh": false,
        "restriction": []
    }
];
