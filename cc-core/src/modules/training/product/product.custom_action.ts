
export const TrainingProductCustomAction = [
    {
        "system": false,
        "name": "Stock",
        "code": "stock",
        "allow_layouts": [
            "default"
        ],
        "type": "form",
        "internal_actions": [
            {
                "type": "internal",
                "path": "training_product/update-stock/:id",
                "method": "patch",
                "params": {
                    "id": "${ id }"
                },
                "body": {
                    "stock_quantity": "${ stock_quantity }"
                }
            }
        ],
        "show_on": "detail",
        "entity": "training_product",
        "entity_layout": "update_stock",
        "enabled": false,
        "icon": "Box",
        "redirect": "none",
        "show_in_list": true,
        "show_bulk_only": false,
        "allow_bulk": false,
        "direct": true,
        "conditions": [
            [
                "id",
                "is_not_empty"
            ]
        ],
        "execute_mode": "custom"
    }
];

