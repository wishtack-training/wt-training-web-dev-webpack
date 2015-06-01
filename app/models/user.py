# -*- coding: utf-8 -*-
#
# (c) 2013-2015 Wishtack
#
# $Id: $
#

from mongoengine import Document, fields, EmbeddedDocumentField

from .wish import Wish


class User(Document):

    email = fields.EmailField()
    first_name = fields.StringField()
    last_name = fields.StringField()
    wishes = fields.ListField(field=EmbeddedDocumentField(Wish))
