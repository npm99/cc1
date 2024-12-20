
import { LayoutEntity } from "@shopstack/cc-core-lib/core";

export const TrainingPaymentLayout: LayoutEntity[] = [
  {
    "name": "Payment",
    "code": "default",
    "type": [
      "standard"
    ],
    "detail": {
      "title": {
        "format": ""
      },
      "blocks": []
    },
    "list": {
      "allow_search": false,
      "allow_sort": false,
      "allow_filter": false,
      "allow_bulk": false,
      "entries_per_page": 10,
      "default_sort": "-createdAt",
      "columns": [
        {
          "field": "order_id",
          "label": "Order Id",
          "allow_sort": true,
          "allow_search": true,
          "allow_filter": true,
          "align": "left"
        },
        {
          "field": "payment_amount",
          "label": "Payment Amount",
          "allow_sort": true,
          "allow_search": false,
          "allow_filter": true,
          "align": "left"
        },
        {
          "field": "payment_status",
          "label": "Payment Status",
          "allow_sort": true,
          "allow_search": false,
          "allow_filter": true,
          "align": "left"
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
  },
  {
    "detail": {
      "title": {
        "format": "${ order_id }"
      },
      "blocks": [
        {
          "key": "eedeaa00e8834c72a9a7",
          "type": "column",
          "layout": {
            "num_of_col": 2,
            "fields": [
              [
                {
                  "field": "payment_method",
                  "label": "Payment Method",
                  "read_only": false,
                  "restrict": false,
                  "required": true
                }
              ],
              [
                {
                  "field": "payment_amount",
                  "label": "Payment Amount",
                  "read_only": false,
                  "restrict": false,
                  "required": true
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
    "name": "payment order",
    "code": "payment_order",
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
    "show_refresh": true,
    "restriction": []
  },
  {
    "detail": {
      "title": {
        "format": "${ order_id }"
      },
      "blocks": [
        {
          "key": "6a33f6ac404e10366041",
          "type": "column",
          "layout": {
            "num_of_col": 1,
            "fields": [
              [
                {
                  "field": "select",
                  "type": "standard_component",
                  "unique_key": "standard_component_select_0fe95adc61b0d96026be",
                  "name": "payment_status",
                  "label": "payment status",
                  "required": true,
                  "link_type": "field",
                  "options": [
                    "pending",
                    "pay",
                    "cancle"
                  ],
                  "internal_actions": [],
                  "mode": "single",
                  "trigger": [],
                  "_translates": {
                    "en-US": {
                      "label": "payment status",
                      "placeholder": "",
                      "description": ""
                    }
                  }
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
    "name": "status",
    "code": "status",
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
    "show_refresh": true,
    "restriction": []
  }
];

