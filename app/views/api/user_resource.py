# -*- coding: utf-8 -*-
#
# (c) 2013-2015 Wishtack
#
# $Id: $
#

from tastypie_mongoengine import fields

from ...lib.resources.advanced_authorization import AdvancedAuthorization, AdvancedAuthorizationRule
from ...lib.resources.bases import RootModelResource
from ...lib.resources.conditions.condition_everybody import ConditionEverybody
from ...lib.utils import Utils
from ...models.user import User
from .user.wish_resource import WishResource


class UserResource(RootModelResource):

    wishes = fields.EmbeddedListField(
        of=WishResource,
        attribute='wishes',
        full=False,
        readonly=True,
        null=True,
        use_in=Utils().return_false # Don't include in detail and list display.
    )

    class Meta:
        authorization = AdvancedAuthorization(
            rule_list=[
                AdvancedAuthorizationRule(
                    allowed_method_list=['create_detail', 'delete_detail', 'read_detail', 'read_list', 'update_detail'],
                    condition=ConditionEverybody(),
                    field_editable_list=[
                        User.email.name,
                        User.first_name.name,
                        User.last_name.name
                    ],
                    field_readable_list=[
                        User.id.name
                    ]
                )
            ])
        queryset = User.objects.all()
        resource_key = u"user"
        resource_name = u"users"
