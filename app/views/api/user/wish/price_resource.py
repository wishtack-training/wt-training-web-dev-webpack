# -*- coding: utf-8 -*-
#
# (c) 2013-2015 Wishtack
#
# $Id: $
#

from .....lib.resources.advanced_authorization import AdvancedAuthorization, AdvancedAuthorizationRule
from .....lib.resources.bases import ChildModelResource
from .....lib.resources.conditions.condition_everybody import ConditionEverybody
from .....models.price import Price


class PriceResource(ChildModelResource):

    class Meta:
        authorization = AdvancedAuthorization(
            rule_list=[
                AdvancedAuthorizationRule(
                    allowed_method_list=['read_detail'],
                    condition=ConditionEverybody(),
                    field_editable_list=[
                        Price.coefficient.name,
                        Price.currency.name,
                        Price.exponent.name
                    ]
                )
            ])
        object_class = Price
        resource_key = u"price"
