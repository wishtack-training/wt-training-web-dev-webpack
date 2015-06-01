# -*- coding: utf-8 -*-
#
# (c) 2013-2015 Wishtack
#
# $Id: $
#
from tastypie_mongoengine import fields

from ....lib.resources.conditions.condition_everybody import ConditionEverybody
from ....lib.resources.advanced_authorization import AdvancedAuthorization, AdvancedAuthorizationRule
from ....lib.resources.bases import ChildModelResource
from ....models.wish import Wish
from .wish.price_resource import PriceResource

class WishResource(ChildModelResource):

    price = fields.EmbeddedDocumentField(
        embedded=PriceResource,
        attribute='price',
        null=True
    )

    class Meta:
        id_field = u"id"
        authorization = AdvancedAuthorization(
            rule_list=[
                AdvancedAuthorizationRule(
                    allowed_method_list=['create_detail', 'delete_detail', 'read_detail', 'read_list', 'update_detail'],
                    condition=ConditionEverybody(),
                    field_editable_list=[
                        Wish.price.name,
                        Wish.title.name
                    ],
                    field_readable_list=[
                        Wish.id.name,
                        Wish.creation_date_time.name
                    ]
                )
            ])
        object_class = Wish
        resource_key = u"wish"
        resource_name = u"wishes"
