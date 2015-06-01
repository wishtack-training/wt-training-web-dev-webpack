# -*- coding: utf-8 -*-
#
# (c) 2013-2015 Wishtack
#
# $Id: $
#

from bson import ObjectId
from mongoengine import EmbeddedDocument
from mongoengine import fields

from ..lib.utils import Utils

from .price import Price


class Wish(EmbeddedDocument):

    id = fields.ObjectIdField(default=ObjectId)
    creation_date_time = fields.DateTimeField(default=Utils().now)
    price = fields.EmbeddedDocumentField(Price)
    title = fields.StringField()
