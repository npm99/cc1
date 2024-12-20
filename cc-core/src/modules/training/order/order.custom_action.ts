
export const TrainingOrderCustomAction = [
    {
        "system": true,
        "name": "payment",
        "code": "payment",
        "allow_layouts": [
            "default"
        ],
        "type": "form",
        "internal_actions": [
            {
                "type": "internal",
                "path": "training_payment/create_payment/:id",
                "method": "patch",
                "params": {
                    "id": "${ id }"
                },
                "body": {
                    "order_id": "${ id }",
                    "payment_method": "${ payment_method }",
                    "payment_amount": "${ payment_amount } "
                }
            }
        ],
        "show_on": "detail",
        "entity": "training_payment",
        "entity_layout": "payment_order",
        "enabled": true,
        "icon": "",
        "redirect": "none",
        "show_in_list": true,
        "show_bulk_only": false,
        "allow_bulk": false,
        "direct": true,
        "execute_mode": "custom"
    }
];

